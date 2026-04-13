import { useEffect, useMemo, useState } from "react";
import { cs } from "./i18n";
import type {
  ApiaryContent,
  ContactContent,
  CookieConsentState,
  FishingContent,
  HomepageApitherapy,
  HomepageHero,
  HomepageOfferings,
  HomepageReviewsConfig,
  HomepageTrustbar,
  PermitFormConfig,
  Promotion,
  RoomContent,
  SurroundingPlace,
  SurroundingsPageContent,
  VoucherFormConfig,
} from "./types/content";
import { getCookieConsent, setCookieConsent } from "./utils/cookieConsent";
import { initAnalytics, disableAnalytics, trackPageView } from "./utils/analytics";
import {
  newRoomContent,
  subscribeApiaryContent,
  subscribeFishingContent,
  subscribePermitFormConfig,
  subscribePromotions,
  subscribeRoomContent,
  subscribeSurroundingPlaces,
  subscribeSurroundingsPageContent,
  subscribeVoucherFormConfig,
  subscribeContactContent,
  subscribeHomepageHero,
  subscribeHomepageOfferings,
  subscribeHomepageApitherapy,
  subscribeHomepageTrustbar,
  subscribeHomepageReviewsConfig,
  defaultHomepageHero as defaultHomepageHeroFn,
  defaultHomepageOfferings as defaultHomepageOfferingsFn,
  defaultHomepageApitherapy as defaultHomepageApitherapyFn,
  defaultHomepageTrustbar as defaultHomepageTrustbarFn,
  defaultHomepageReviewsConfig as defaultHomepageReviewsConfigFn,
} from "./utils/contentStorage";
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

const defaultFishing: FishingContent = {
  heroEyebrow: "Rybaření",
  heroTitle: "Rybník přímo u chalupy",
  heroHighlight: "pro hosty i veřejnost",
  heroDescription: "Klidné rybaření v přírodním prostředí s výhledem na lesy.",
  stepsTitle: "Jak si objednat povolení",
  steps: [],
  infoCards: [],
  ctaLabel: "Objednat povolení",
  ctaHref: "#povoleni",
  gallery: [],
};

const defaultVoucherConfig: VoucherFormConfig = {
  modalTitle: "Dárková poukázka",
  modalDesc: "Darujte nezapomenutelný zážitek. Poukázka na pobyt v 2P Hive House.",
  successMessage: "Poukázka byla odeslána! Potvrzení přijde na váš e-mail.",
  pricePerNight: 3500,
  nightOptions: [1, 2, 3, 4, 5, 7],
  validityMonths: 12,
  payButtonLabel: "Zaplatit a odeslat",
  cancelButtonLabel: "Zrušit",
};

const defaultPermitConfig: PermitFormConfig = {
  modalTitle: "Rybářská povolenka",
  modalDesc: "Sportovní rybolov na soukromém rybníku přímo u objektu.",
  successMessage: "Povolenka zarezervována! Potvrzení přijde na váš e-mail.",
  priceAdult: 150,
  priceFirefighter: 75,
  priceChild: 0,
  maxPersons: 4,
  discountFirefighterEnabled: true,
  discountFirefighterLabel: "Jsem hasič z Hojanovic",
  discountChildEnabled: true,
  discountChildLabel: "Jsem dítě z Hojanovic",
  payButtonLabel: "Zaplatit a rezervovat",
  cancelButtonLabel: "Zrušit",
};

const defaultHomepageHero: HomepageHero = defaultHomepageHeroFn();
const defaultHomepageOfferings: HomepageOfferings = defaultHomepageOfferingsFn();
const defaultHomepageApitherapy: HomepageApitherapy = defaultHomepageApitherapyFn();
const defaultHomepageTrustbar: HomepageTrustbar = defaultHomepageTrustbarFn();
const defaultHomepageReviewsConfig: HomepageReviewsConfig = defaultHomepageReviewsConfigFn();

const defaultSurroundingsPage: SurroundingsPageContent = {
  heroEyebrow: "Okolí",
  heroTitle: "Objevujte okolí",
  heroHighlight: "krok za krokem",
  heroDescription: "Hojnovice a okolí nabízejí spoustu zážitků.",
  sectionTitle: "Tipy na výlety",
  sectionSubtitle: "",
};

const defaultContact: ContactContent = {
  contactName: "", phone: "", email: "", companyName: "2P s.r.o.",
  ico: "", address: "Hojnovice, Česká republika",
  checkIn: "14:00", checkOut: "11:00", capacity: 2, notes: "", mapEmbedUrl: "",
};

const defaultApiary: ApiaryContent = {
  heroEyebrow: "Včelín & Glamping",
  heroTitle: "Příroda, klid",
  heroHighlight: "a vůně medu",
  heroDescription: "Glamping stan u lesa s přímým výhledem na včelín. Zažijte přírodu bez kompromisů.",
  glampingTitle: "Glamping pod hvězdami",
  glampingSubtitle: "Komfort v přírodě",
  glampingCards: [],
  beeLivingTitle: "Bydlení se včelami",
  beeLivingHighlight: "Harmonie člověka a přírody",
  beeLivingText: "Včely jsou naši nejbližší sousedé.",
  apiTherapyTitle: "API terapie",
  apiTherapyHighlight: "Léčba přírodou",
  apiTherapyText: "Apiterapie využívá produkty včel ke zlepšení zdraví a pohody.",
};

function App() {
  const location = useCurrentLocation();
  const gaMeasurementId = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;

  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [roomContent, setRoomContent] = useState<RoomContent>(newRoomContent());
  const [fishingContent, setFishingContent] = useState<FishingContent>(defaultFishing);
  const [surroundingsPage, setSurroundingsPage] = useState<SurroundingsPageContent>(defaultSurroundingsPage);
  const [surroundingPlaces, setSurroundingPlaces] = useState<SurroundingPlace[]>([]);
  const [apiaryContent, setApiaryContent] = useState<ApiaryContent>(defaultApiary);
  const [voucherConfig, setVoucherConfig] = useState<VoucherFormConfig>(defaultVoucherConfig);
  const [permitConfig, setPermitConfig] = useState<PermitFormConfig>(defaultPermitConfig);
  const [contactContent, setContactContent] = useState<ContactContent>(defaultContact);
  const [hpHero, setHpHero] = useState<HomepageHero>(defaultHomepageHero);
  const [hpOfferings, setHpOfferings] = useState<HomepageOfferings>(defaultHomepageOfferings);
  const [hpApitherapy, setHpApitherapy] = useState<HomepageApitherapy>(defaultHomepageApitherapy);
  const [hpTrustbar, setHpTrustbar] = useState<HomepageTrustbar>(defaultHomepageTrustbar);
  const [hpReviewsConfig, setHpReviewsConfig] = useState<HomepageReviewsConfig>(defaultHomepageReviewsConfig);
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
    const unsub = subscribeRoomContent(
      (room) => setRoomContent(room),
      () => setRoomContent(newRoomContent()),
    );
    return () => unsub();
  }, []);

  useEffect(() => {
    const unsub = subscribeFishingContent(
      (content) => setFishingContent(content),
      () => setFishingContent(defaultFishing),
    );
    return () => unsub();
  }, []);

  useEffect(() => {
    const unsub = subscribeApiaryContent(
      (content) => setApiaryContent(content),
      () => setApiaryContent(defaultApiary),
    );
    return () => unsub();
  }, []);

  useEffect(() => {
    const unsub = subscribeSurroundingsPageContent(
      (content) => setSurroundingsPage(content),
      () => setSurroundingsPage(defaultSurroundingsPage),
    );
    return () => unsub();
  }, []);

  useEffect(() => {
    const unsub = subscribeSurroundingPlaces(
      (places) => setSurroundingPlaces(places),
      () => setSurroundingPlaces([]),
    );
    return () => unsub();
  }, []);

  useEffect(() => {
    const unsub = subscribeVoucherFormConfig(
      (cfg) => setVoucherConfig(cfg),
      () => setVoucherConfig(defaultVoucherConfig),
    );
    return () => unsub();
  }, []);

  useEffect(() => {
    const unsub = subscribePermitFormConfig(
      (cfg) => setPermitConfig(cfg),
      () => setPermitConfig(defaultPermitConfig),
    );
    return () => unsub();
  }, []);

  useEffect(() => {
    const unsub = subscribeContactContent(
      (content) => setContactContent(content),
      () => setContactContent(defaultContact),
    );
    return () => unsub();
  }, []);

  // --- Homepage sekce ---
  useEffect(() => {
    const unsub = subscribeHomepageHero(
      (data) => setHpHero(data),
      () => setHpHero(defaultHomepageHero),
    );
    return () => unsub();
  }, []);

  useEffect(() => {
    const unsub = subscribeHomepageOfferings(
      (data) => setHpOfferings(data),
      () => setHpOfferings(defaultHomepageOfferings),
    );
    return () => unsub();
  }, []);

  useEffect(() => {
    const unsub = subscribeHomepageApitherapy(
      (data) => setHpApitherapy(data),
      () => setHpApitherapy(defaultHomepageApitherapy),
    );
    return () => unsub();
  }, []);

  useEffect(() => {
    const unsub = subscribeHomepageTrustbar(
      (data) => setHpTrustbar(data),
      () => setHpTrustbar(defaultHomepageTrustbar),
    );
    return () => unsub();
  }, []);

  useEffect(() => {
    const unsub = subscribeHomepageReviewsConfig(
      (data) => setHpReviewsConfig(data),
      () => setHpReviewsConfig(defaultHomepageReviewsConfig),
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

  let page = (
    <HomePage
      t={t}
      onVoucherClick={() => setShowVoucher(true)}
      hero={hpHero}
      offerings={hpOfferings}
      apitherapy={hpApitherapy}
      trustbar={hpTrustbar}
      reviewsConfig={hpReviewsConfig}
      contact={contactContent}
    />
  );
  if (location.pathname === "/ubytovani") {
    page = <AccommodationPage onVoucherClick={() => setShowVoucher(true)} room={roomContent} />;
  } else if (location.pathname === "/rybareni") {
    page = <FishingPage fishing={fishingContent} onFishingClick={() => setShowFishing(true)} />;
  } else if (location.pathname === "/vylety") {
    page = <TripsPage pageContent={surroundingsPage} places={surroundingPlaces} />;
  } else if (location.pathname === "/vcelin-glamping") {
    page = <ApiaryGlampingPage apiary={apiaryContent} />;
  } else if (location.pathname === "/rezervace") {
    page = <ReservationPage t={t} contact={contactContent} />;
  }

  return (
    <>
      <Navbar t={t} onVoucherClick={() => setShowVoucher(true)} />

      {page}

      <Footer t={t} onVoucherClick={() => setShowVoucher(true)} onFishingClick={() => setShowFishing(true)} />

      {showVoucher && <VoucherModal config={voucherConfig} onClose={() => setShowVoucher(false)} />}
      {showFishing && <FishingModal config={permitConfig} onClose={() => setShowFishing(false)} />}

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
