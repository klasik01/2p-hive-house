import { useEffect, useMemo, useState } from "react";
import { cs } from "./i18n";
import type { CookieConsentState, HomepageData, Promotion } from "./types";
import { getCookieConsent, setCookieConsent } from "./utils/cookieConsent";
import { subscribePromotions } from "./api/promotions";
import { isActive } from "./config/profiles";

import { useRevealOnScroll } from "./hooks/useRevealOnScroll";
import { useAnalyticsPageView } from "./hooks/useAnalyticsPageView";
import { useBootReady } from "./hooks/useBootReady";
import { useHashRoute } from "./hooks/useHashRoute";

import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Loader } from "./components/ui/Loader";
import { FishingModal } from "./components/modals/FishingModal";
import { VoucherModal } from "./components/modals/VoucherModal";
import { ConstructionModal } from "./components/modals/ConstructionModal";
import { CookieConsentBanner } from "./components/overlays/CookieConsentBanner";
import { PromoPopup } from "./components/overlays/PromoPopup";
import { HomePage } from "./pages/HomePage";
import { ReservationPage } from "./pages/ReservationPage";
import { ContactPage } from "./pages/ContactPage";
import { RybareniPage } from "./pages/RybareniPage";

import homepageData from "./data/homepage.json";

import "./styles/main.scss";

const t = cs;
const data = homepageData as HomepageData;

const underConstruction = isActive("VE_VYSTAVBE");

// Klíče, které musí být "loaded" než aplikace zmizí loaderu.
const REQUIRED_KEYS = ["promotions"] as const;

function App() {
  const gaMeasurementId = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;

  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loadedKeys, setLoadedKeys] = useState<Set<string>>(new Set());
  const [cookieConsent, setCookieConsentState] = useState<CookieConsentState>(() => getCookieConsent());
  const [showFishing, setShowFishing] = useState(false);
  const [showVoucher, setShowVoucher] = useState(false);
  // Construction modal se otevře automaticky při VE_VYSTAVBE
  const [showConstruction, setShowConstruction] = useState(underConstruction);

  // Sezónní akce — subscribe z Firestore.
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

  if (!isReady) return <Loader t={t} />;

  const onVoucherClick = () => setShowVoucher(true);
  const onConstructionClick = () => setShowConstruction(true);

  // Ve výstavbě: rezervace přesměruje na construction popup, ne na stránku
  const handleReservationRoute = underConstruction;

  return (
    <>
      <Navbar
        t={t}
        onVoucherClick={underConstruction ? onConstructionClick : onVoucherClick}
        onReservationClick={underConstruction ? onConstructionClick : undefined}
      />

      <main>
        {isReservation && !handleReservationRoute ? (
          <ReservationPage data={data} />
        ) : isContact ? (
          <ContactPage />
        ) : isRybareni ? (
          <RybareniPage onFishingClick={() => setShowFishing(true)} />
        ) : (
          <HomePage
            t={t}
            data={data}
            onVoucherClick={underConstruction ? onConstructionClick : onVoucherClick}
            onFishingClick={() => setShowFishing(true)}
            onConstructionClick={onConstructionClick}
          />
        )}
      </main>

      <Footer t={t} />

      {showFishing && <FishingModal t={t} onClose={() => setShowFishing(false)} />}
      {showVoucher && <VoucherModal t={t} onClose={() => setShowVoucher(false)} />}
      {showConstruction && <ConstructionModal t={t} onClose={() => setShowConstruction(false)} />}

      {/* Promo popup jen když NENÍ ve výstavbě */}
      {!underConstruction && <PromoPopup items={activePromotions} t={t} />}

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
