import { useEffect, useMemo, useState } from "react";
import { cs } from "./i18n";
import type { CookieConsentState, Promotion } from "./types/content";
import { getCookieConsent, setCookieConsent } from "./utils/cookieConsent";
import { initAnalytics, disableAnalytics, trackPageView } from "./utils/analytics";
import { subscribePromotions } from "./utils/contentStorage";
import { useCurrentLocation } from "./lib/router";

import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { PromoPopup } from "./components/PromoPopup";
import { CookieConsentBanner } from "./components/CookieConsentBanner";
import { VoucherModal } from "./components/VoucherModal";
import { FishingModal } from "./components/FishingModal";

import { HomePage } from "./pages/HomePage";
import { AccommodationPage } from "./pages/AccommodationPage";
import { FishingPage } from "./pages/FishingPage";
import { TripsPage } from "./pages/TripsPage";
import { ApiaryGlampingPage } from "./pages/ApiaryGlampingPage";
import { ReservationPage } from "./pages/ReservationPage";

import "./styles/main.scss";

const t = cs;

function App() {
  const location = useCurrentLocation();
  const gaMeasurementId = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;

  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [cookieConsent, setCookieConsentState] = useState<CookieConsentState>(() => getCookieConsent());
  const [showVoucher, setShowVoucher] = useState(false);
  const [showFishing, setShowFishing] = useState(false);

  const activePromotions = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    return promotions.filter((p) => {
      if (!p.enabled) return false;
      if (p.startsAt && today < p.startsAt) return false;
      if (p.endsAt && today > p.endsAt) return false;
      return true;
    });
  }, [promotions]);

  useEffect(() => {
    const unsub = subscribePromotions(
      (promos) => setPromotions(promos),
      () => setPromotions([]),
    );
    return () => unsub();
  }, []);

  useEffect(() => {
    if (location.hash) {
      requestAnimationFrame(() => {
        const target = document.getElementById(location.hash.slice(1));
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, idx) => {
          if (!entry.isIntersecting) return;
          setTimeout(() => entry.target.classList.add("visible"), idx * 80);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -50px 0px" },
    );
    document
      .querySelectorAll<HTMLElement>(".reveal, .reveal-left, .reveal-right")
      .forEach((el) => {
        el.classList.remove("visible");
        observer.observe(el);
      });
    return () => observer.disconnect();
  }, [location.pathname]);

  useEffect(() => {
    if (!gaMeasurementId) return;
    if (cookieConsent === "accepted") initAnalytics(gaMeasurementId);
    else disableAnalytics(gaMeasurementId);
  }, [cookieConsent, gaMeasurementId]);

  useEffect(() => {
    if (cookieConsent !== "accepted" || !gaMeasurementId) return;
    trackPageView(gaMeasurementId, location.pathname, document.title);
  }, [location.pathname, cookieConsent, gaMeasurementId]);

  // Modal overflow
  useEffect(() => {
    document.body.classList.toggle("modal-open", showVoucher || showFishing);
  }, [showVoucher, showFishing]);

  const sharedProps = {
    t,
    onVoucherClick: () => setShowVoucher(true),
    onFishingClick: () => setShowFishing(true),
  };

  let page = <HomePage {...sharedProps} />;
  if (location.pathname === "/ubytovani") {
    page = <AccommodationPage t={t} onVoucherClick={() => setShowVoucher(true)} />;
  } else if (location.pathname === "/rybareni") {
    page = <FishingPage t={t} onFishingClick={() => setShowFishing(true)} />;
  } else if (location.pathname === "/vylety") {
    page = <TripsPage t={t} />;
  } else if (location.pathname === "/vcelin-glamping") {
    page = <ApiaryGlampingPage t={t} />;
  } else if (location.pathname === "/rezervace") {
    page = <ReservationPage t={t} />;
  }

  return (
    <>
      <Navbar t={t} onVoucherClick={() => setShowVoucher(true)} />

      {page}

      <Footer t={t} onVoucherClick={() => setShowVoucher(true)} onFishingClick={() => setShowFishing(true)} />

      {showVoucher && <VoucherModal t={t} onClose={() => setShowVoucher(false)} />}
      {showFishing && <FishingModal t={t} onClose={() => setShowFishing(false)} />}

      <PromoPopup items={activePromotions} />

      {cookieConsent === "unset" && gaMeasurementId && (
        <CookieConsentBanner
          t={t}
          onAccept={() => { setCookieConsent("accepted"); setCookieConsentState("accepted"); }}
          onReject={() => { setCookieConsent("rejected"); setCookieConsentState("rejected"); }}
        />
      )}
    </>
  );
}
export default App;
