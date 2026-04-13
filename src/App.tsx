import { useEffect, useMemo, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { cs } from "./i18n";
import type { CookieConsentState, Promotion } from "./types/content";
import { getCookieConsent, setCookieConsent } from "./utils/cookieConsent";
import { initAnalytics, disableAnalytics, trackPageView } from "./utils/analytics";
import { subscribePromotions } from "./utils/contentStorage";

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

import "./styles/main.scss";

const t = cs;

// Vnitřní komponenta — má přístup k useLocation
function AppInner() {
  const location = useLocation();
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

  // Scroll na vrch při změně stránky
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  // Reveal animace — re-inicializace po navigaci
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
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  });

  // Google Analytics
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

  return (
    <>
      <Navbar t={t} onVoucherClick={() => setShowVoucher(true)} />

      <Routes>
        <Route path="/" element={<HomePage {...sharedProps} />} />
        <Route path="/ubytovani" element={<AccommodationPage {...sharedProps} />} />
        <Route path="/rybareni" element={<FishingPage {...sharedProps} />} />
        <Route path="/vylety" element={<TripsPage t={t} />} />
        <Route path="/vcelin-glamping" element={<ApiaryGlampingPage t={t} />} />
        {/* Fallback */}
        <Route path="*" element={<HomePage {...sharedProps} />} />
      </Routes>

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

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  );
}
