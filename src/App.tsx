import { useEffect, useMemo, useState } from "react";
import { cs } from "./i18n";
import type { CookieConsentState, HomepageData, Promotion } from "./types";
import { getCookieConsent, setCookieConsent } from "./utils/cookieConsent";
import { subscribePromotions } from "./api/promotions";

import { useRevealOnScroll } from "./hooks/useRevealOnScroll";
import { useAnalyticsPageView } from "./hooks/useAnalyticsPageView";
import { useBootReady } from "./hooks/useBootReady";
import { useBodyModalLock } from "./hooks/useBodyModalLock";
import { useHashRoute } from "./hooks/useHashRoute";

import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Loader } from "./components/Loader";
import { FishingModal } from "./components/FishingModal";
import { CookieConsentBanner } from "./components/CookieConsentBanner";
import { PromoPopup } from "./components/PromoPopup";
import { HomePage } from "./pages/HomePage";
import { ReservationPage } from "./pages/ReservationPage";
import { ContactPage } from "./pages/ContactPage";
import { RybareniPage } from "./pages/RybareniPage";

import homepageData from "./data/homepage.json";

import "./styles/main.scss";

const t = cs;
const data = homepageData as HomepageData;

// Klíče, které musí být "loaded" než aplikace zmizí loaderu.
// Zatím čekáme jen na první snapshot sezónních akcí (promotions).
const REQUIRED_KEYS = ["promotions"] as const;

function App() {
  const gaMeasurementId = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;

  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loadedKeys, setLoadedKeys] = useState<Set<string>>(new Set());
  const [cookieConsent, setCookieConsentState] = useState<CookieConsentState>(() => getCookieConsent());
  const [showFishing, setShowFishing] = useState(false);

  // Sezónní akce — subscribe z Firestore. Jakmile přijde první snapshot
  // (i prázdný), označíme "promotions" jako načtené a aplikace se zobrazí.
  useEffect(() => {
    const markLoaded = () => {
      setLoadedKeys((prev) => (prev.has("promotions") ? prev : new Set(prev).add("promotions")));
    };
    const unsub = subscribePromotions(
      (promos) => { setPromotions(promos); markLoaded(); },
      () => { setPromotions([]); markLoaded(); },
    );
    return () => unsub();
  }, []);

  // Filtrace aktivních akcí (enabled + v okně startsAt/endsAt).
  const activePromotions = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    return promotions.filter((p) => {
      if (!p.enabled) return false;
      if (p.startsAt && today < p.startsAt) return false;
      if (p.endsAt && today > p.endsAt) return false;
      return true;
    });
  }, [promotions]);

  const isReady = useBootReady(loadedKeys, REQUIRED_KEYS, 4000);
  const route = useHashRoute();
  const isReservation = route === "/rezervace";
  const isContact = route === "/kontakt";
  const isRybareni = route === "/rybareni";

  useRevealOnScroll(
    isReservation ? "reservation" :
    isContact ? "contact" :
    isRybareni ? "rybareni" : "home",
    isReady,
  );
  useAnalyticsPageView(route, cookieConsent, gaMeasurementId);
  useBodyModalLock(showFishing);

  if (!isReady) return <Loader t={t} />;

  // Mock voucher — zatím otevře pouze rybářský popup (dle zadání
  // je definován jako prázdný placeholder; voucher se dodělá později).
  const onVoucherClick = () => setShowFishing(true);

  return (
    <>
      <Navbar t={t} onVoucherClick={onVoucherClick} />

      <main>
        {isReservation ? (
          <ReservationPage data={data} />
        ) : isContact ? (
          <ContactPage />
        ) : isRybareni ? (
          <RybareniPage data={data} onFishingClick={() => setShowFishing(true)} />
        ) : (
          <HomePage
            t={t}
            data={data}
            onVoucherClick={onVoucherClick}
            onFishingClick={() => setShowFishing(true)}
          />
        )}
      </main>

      <Footer t={t} />

      {showFishing && <FishingModal t={t} onClose={() => setShowFishing(false)} />}

      <PromoPopup items={activePromotions} t={t} />

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
