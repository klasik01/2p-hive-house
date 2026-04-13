import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  setDoc,
  addDoc,
  updateDoc,
  query,
  orderBy,
  type Unsubscribe,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import type {
  Promotion, FishingPermit, GiftVoucher, RoomContent, RoomStorySection,
  FishingContent, FishingStep, FishingInfoCard,
  SurroundingsPageContent, SurroundingPlace,
  ApiaryContent, GlampingCard,
  Review, ContactContent,
  VoucherFormConfig, PermitFormConfig,
} from "../types/content";

// --- Konstanty ---
export const ADMIN_ROUTE = "#/admin";
export const ADMIN_SESSION_KEY = "hive-house-admin-session";
export const COLLECTION_PROMOTIONS = "hive-house-promotions";
export const COLLECTION_PERMITS = "hive-house-permits";
export const COLLECTION_VOUCHERS = "hive-house-vouchers";
export const COLLECTION_ROOM = "hive-house-room";
export const COLLECTION_FISHING = "hive-house-fishing";
export const COLLECTION_SURROUNDINGS = "hive-house-surroundings";
export const COLLECTION_SURROUNDINGS_PAGE = "hive-house-surroundings-page";
export const COLLECTION_APIARY = "hive-house-apiary";
export const COLLECTION_REVIEWS = "hive-house-reviews";
export const COLLECTION_CONTACT = "hive-house-contact";
export const COLLECTION_VOUCHER_CONFIG = "hive-house-voucher-config";
export const COLLECTION_PERMIT_CONFIG = "hive-house-permit-config";
export const ROOM_DOC_ID = "main";

export function newRoomContent(): RoomContent {
  return {
    id: ROOM_DOC_ID,
    heroEyebrow: "Ubytování",
    heroTitle: "Pokoj Hive House",
    heroHighlight: "na jedné stránce",
    heroDescription:
      "Tady najdou hosté konkrétní představu o interiéru, vybavení, soukromí i atmosféře pobytu. Hlavní stránka je navede, detail jim pomůže rozhodnout se.",
    detailEyebrow: "Co hosté uvidí",
    title: "Pokoj Hive House",
    detailHighlight: "bez zbytečného chaosu",
    description:
      "Detail ubytování má jasně ukázat, že nejde jen o hezkou fotku. Hosté potřebují rozumět tomu, co je čeká, jaké mají zázemí a proč je pobyt v Hive House jiný než běžné ubytování.",
    modalTitle: "Ubytování v Hive House",
    modalSubtitle: "Fotky a základní informace",
    modalDescription:
      "Popup slouží jako rychlý náhled přímo z homepage nebo z detailu. Návštěvník si díky němu udělá rychlou představu, aniž by ztratil kontext.",
    reserveLabel: "Rezervovat pobyt",
    galleryLabel: "Otevřít popup s fotkami",
    voucherLabel: "Koupit poukázku",
    labels: [
      "Ložnice pro odpočinek ve dvou",
      "Soukromá terasa s výhledem do přírody",
      "Koupelna, sprcha a základní kuchyňské zázemí",
      "Klid, soukromí a pohodlné parkování",
    ],
    images: [
      { url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1400&q=80&auto=format", alt: "Interiér ubytování" },
      { url: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1400&q=80&auto=format", alt: "Kuchyň a zázemí" },
      { url: "https://images.unsplash.com/photo-1494526585095-c41746248156?w=1400&q=80&auto=format", alt: "Ložnice" },
      { url: "https://images.unsplash.com/photo-1505693534291-5b8d23c1b92f?w=1400&q=80&auto=format", alt: "Terasa a posezení" },
    ],
    sections: [
      {
        id: "room-section-1",
        eyebrow: "Ráno v Hive House",
        title: "Klidný start dne bez rušivých podnětů",
        text: "Ranní káva na terase, výhled do krajiny a pocit, že nikam nemusíte. Tahle část stránky má prodávat atmosféru stejně silně jako samotné vybavení.",
      },
      {
        id: "room-section-2",
        eyebrow: "Večer a odpočinek",
        title: "Pobyt, který má být zážitkem, ne jen přespáním",
        text: "Komfortní interiér, klid a propojení s přírodou vytváří ideální prostor pro páry, které chtějí zpomalit a být chvíli mimo běžný provoz.",
      },
    ],
  };
}

// Merge sekcí pokoje z více Firestore dokumentů do jednoho RoomContent objektu
function buildRoomFromDocs(docs: Record<string, Record<string, unknown>>): RoomContent {
  const d = newRoomContent();
  const hero    = docs["hero"]     ?? {};
  const content = docs["content"]  ?? {};
  const gallery = docs["gallery"]  ?? {};
  const sections = docs["sections"] ?? {};

  // Fallback na starý "main" dokument pokud sekční dokumenty chybí
  const main = docs["main"] ?? {};
  const h = Object.keys(hero).length    ? hero    : main;
  const c = Object.keys(content).length ? content : main;
  const g = Object.keys(gallery).length ? gallery : main;
  const s = Object.keys(sections).length ? sections : main;

  return {
    ...d,
    id: ROOM_DOC_ID,
    heroEyebrow:      (h.heroEyebrow as string)      ?? d.heroEyebrow,
    heroTitle:        (h.heroTitle as string)        ?? d.heroTitle,
    heroHighlight:    (h.heroHighlight as string)    ?? d.heroHighlight,
    heroDescription:  (h.heroDescription as string)  ?? d.heroDescription,
    ...(h.heroImage ? { heroImage: h.heroImage as RoomContent["heroImage"] } : {}),
    detailEyebrow:    (c.detailEyebrow as string)    ?? d.detailEyebrow,
    title:            (c.title as string)            ?? d.title,
    detailHighlight:  (c.detailHighlight as string)  ?? d.detailHighlight,
    description:      (c.description as string)      ?? d.description,
    modalTitle:       (c.modalTitle as string)       ?? d.modalTitle,
    modalSubtitle:    (c.modalSubtitle as string)    ?? d.modalSubtitle,
    modalDescription: (c.modalDescription as string) ?? d.modalDescription,
    reserveLabel:     (c.reserveLabel as string)     ?? d.reserveLabel,
    galleryLabel:     (c.galleryLabel as string)     ?? d.galleryLabel,
    voucherLabel:     (c.voucherLabel as string)     ?? d.voucherLabel,
    labels: Array.isArray(c.labels) ? (c.labels as string[]) : d.labels,
    images: Array.isArray(g.images)
      ? (g.images as Array<string | RoomContent["images"][number]>).map((img) =>
          typeof img === "string" ? { url: img } : { url: img.url, storagePath: img.storagePath, alt: img.alt },
        )
      : d.images,
    sections: Array.isArray(s.sections)
      ? (s.sections as Array<Partial<RoomStorySection>>).map((sec, i) => ({
          id: sec.id || `room-section-${i}`,
          eyebrow: sec.eyebrow || "",
          title: sec.title || "",
          text: sec.text || "",
          layout: sec.layout,
          image: sec.image,
        }))
      : d.sections,
  } as RoomContent;
}

// Merge sekcí rybaření
function buildFishingFromDocs(docs: Record<string, Record<string, unknown>>): FishingContent {
  const d = defaultFishingContent();
  const hero  = docs["hero"]  ?? {};
  const steps = docs["steps"] ?? {};
  const info  = docs["info"]  ?? {};
  const main  = docs["main"]  ?? {};
  const h = Object.keys(hero).length  ? hero  : main;
  const st = Object.keys(steps).length ? steps : main;
  const inf = Object.keys(info).length ? info  : main;
  return {
    heroEyebrow:     (h.heroEyebrow as string)     ?? d.heroEyebrow,
    heroTitle:       (h.heroTitle as string)       ?? d.heroTitle,
    heroHighlight:   (h.heroHighlight as string)   ?? d.heroHighlight,
    heroDescription: (h.heroDescription as string) ?? d.heroDescription,
    ...(h.heroImage ? { heroImage: h.heroImage as FishingContent["heroImage"] } : {}),
    ctaLabel: (h.ctaLabel as string) ?? d.ctaLabel,
    ctaHref:  (h.ctaHref as string)  ?? d.ctaHref,
    stepsTitle: (st.stepsTitle as string) ?? d.stepsTitle,
    steps: Array.isArray(st.steps)
      ? (st.steps as Array<Partial<FishingStep>>).map((s, i) => ({ id: s.id || `step-${i}`, icon: s.icon || "", title: s.title || "", text: s.text || "" }))
      : d.steps,
    infoCards: Array.isArray(inf.infoCards)
      ? (inf.infoCards as Array<Partial<FishingInfoCard>>).map((c, i) => ({ id: c.id || `info-${i}`, label: c.label || "", value: c.value || "" }))
      : d.infoCards,
  };
}

// Merge sekcí včelína
function buildApiaryFromDocs(docs: Record<string, Record<string, unknown>>): ApiaryContent {
  const d = defaultApiaryContent();
  const hero     = docs["hero"]        ?? {};
  const glamping = docs["glamping"]    ?? {};
  const bee      = docs["bee-living"]  ?? {};
  const api      = docs["api-therapy"] ?? {};
  const main     = docs["main"]        ?? {};
  const h  = Object.keys(hero).length     ? hero     : main;
  const gl = Object.keys(glamping).length ? glamping : main;
  const b  = Object.keys(bee).length      ? bee      : main;
  const a  = Object.keys(api).length      ? api      : main;
  return {
    heroEyebrow:      (h.heroEyebrow as string)      ?? d.heroEyebrow,
    heroTitle:        (h.heroTitle as string)        ?? d.heroTitle,
    heroHighlight:    (h.heroHighlight as string)    ?? d.heroHighlight,
    heroDescription:  (h.heroDescription as string)  ?? d.heroDescription,
    ...(h.heroImage ? { heroImage: h.heroImage as ApiaryContent["heroImage"] } : {}),
    glampingTitle:    (gl.glampingTitle as string)    ?? d.glampingTitle,
    glampingSubtitle: (gl.glampingSubtitle as string) ?? d.glampingSubtitle,
    glampingCards: Array.isArray(gl.glampingCards)
      ? (gl.glampingCards as Array<Partial<GlampingCard>>).map((c, i) => ({
          id: c.id || `glamping-${i}`, selected: c.selected ?? false,
          sortOrder: c.sortOrder ?? i, title: c.title || "",
          subtitle: c.subtitle || "", description: c.description || "", image: c.image,
        }))
      : d.glampingCards,
    beeLivingTitle:     (b.beeLivingTitle as string)     ?? d.beeLivingTitle,
    beeLivingHighlight: (b.beeLivingHighlight as string) ?? d.beeLivingHighlight,
    beeLivingText:      (b.beeLivingText as string)      ?? d.beeLivingText,
    ...(b.beeLivingImage ? { beeLivingImage: b.beeLivingImage as ApiaryContent["beeLivingImage"] } : {}),
    apiTherapyTitle:     (a.apiTherapyTitle as string)     ?? d.apiTherapyTitle,
    apiTherapyHighlight: (a.apiTherapyHighlight as string) ?? d.apiTherapyHighlight,
    apiTherapyText:      (a.apiTherapyText as string)      ?? d.apiTherapyText,
    ...(a.apiTherapyImage ? { apiTherapyImage: a.apiTherapyImage as ApiaryContent["apiTherapyImage"] } : {}),
  };
}


// --- Session ---
export function isAdminSessionActive() {
  return window.sessionStorage.getItem(ADMIN_SESSION_KEY) === "true";
}

export function setAdminSession(active: boolean) {
  if (active) {
    window.sessionStorage.setItem(ADMIN_SESSION_KEY, "true");
  } else {
    window.sessionStorage.removeItem(ADMIN_SESSION_KEY);
  }
}

// --- Promotions ---
export function subscribePromotions(
  onData: (promos: Promotion[]) => void,
  onError?: () => void,
): Unsubscribe {
  return onSnapshot(
    collection(db, COLLECTION_PROMOTIONS),
    (snapshot) => {
      const promos = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Promotion);
      onData(promos);
    },
    () => onError?.(),
  );
}

export async function savePromotion(promo: Promotion): Promise<void> {
  const { id, ...data } = promo;
  await setDoc(doc(db, COLLECTION_PROMOTIONS, id), data);
}

export async function deletePromotion(id: string): Promise<void> {
  const { deleteDoc } = await import("firebase/firestore");
  await deleteDoc(doc(db, COLLECTION_PROMOTIONS, id));
}

// --- Room content ---
export function subscribeRoomContent(
  onData: (room: RoomContent) => void,
  onError?: () => void,
): Unsubscribe {
  return onSnapshot(
    collection(db, COLLECTION_ROOM),
    (snapshot) => {
      const docs: Record<string, Record<string, unknown>> = {};
      snapshot.docs.forEach((d) => { docs[d.id] = d.data() as Record<string, unknown>; });
      onData(buildRoomFromDocs(docs));
    },
    () => onError?.(),
  );
}

export async function loadRoomContent(): Promise<RoomContent> {
  const snap = await getDocs(collection(db, COLLECTION_ROOM));
  const docs: Record<string, Record<string, unknown>> = {};
  snap.docs.forEach((d) => { docs[d.id] = d.data() as Record<string, unknown>; });
  return buildRoomFromDocs(docs);
}

// --- Fishing Permits ---
export async function createFishingPermit(
  permit: Omit<FishingPermit, "id">,
): Promise<string> {
  const ref = await addDoc(collection(db, COLLECTION_PERMITS), permit);
  return ref.id;
}

export async function loadFishingPermits(): Promise<FishingPermit[]> {
  const snap = await getDocs(collection(db, COLLECTION_PERMITS));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as FishingPermit);
}

export async function updatePermitStatus(
  id: string,
  status: FishingPermit["status"],
): Promise<void> {
  await updateDoc(doc(db, COLLECTION_PERMITS, id), { status });
}

// --- Gift Vouchers ---
export async function createGiftVoucher(
  voucher: Omit<GiftVoucher, "id">,
): Promise<string> {
  const ref = await addDoc(collection(db, COLLECTION_VOUCHERS), voucher);
  return ref.id;
}

export async function loadGiftVouchers(): Promise<GiftVoucher[]> {
  const snap = await getDocs(collection(db, COLLECTION_VOUCHERS));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as GiftVoucher);
}

export async function updateVoucherStatus(
  id: string,
  status: GiftVoucher["status"],
): Promise<void> {
  await updateDoc(doc(db, COLLECTION_VOUCHERS, id), { status });
}

// --- Fishing PAGE content ---
function defaultFishingContent(): FishingContent {
  return {
    heroEyebrow: "Rybaření",
    heroTitle: "Rybník přímo u chalupy",
    heroHighlight: "pro hosty i veřejnost",
    heroDescription: "Klidné rybaření v přírodním prostředí s výhledem na lesy. Povolení si objednáte online ještě před příjezdem.",
    stepsTitle: "Jak si objednat povolení",
    steps: [
      { id: "step-1", icon: "📋", title: "Vyplňte formulář", text: "Zadejte jméno, datum a počet osob." },
      { id: "step-2", icon: "💳", title: "Uhraďte poplatek", text: "Platba probíhá bezpečně online nebo na místě." },
      { id: "step-3", icon: "🎣", title: "Přijďte rybařit", text: "Povolení dostanete e-mailem a platí na zvolený den." },
    ],
    infoCards: [
      { id: "info-1", label: "Denní povolení", value: "250 Kč / osoba" },
      { id: "info-2", label: "Hasiči z Hojnovic", value: "Zdarma" },
      { id: "info-3", label: "Otevřeno", value: "celoročně" },
    ],
    ctaLabel: "Objednat povolení",
    ctaHref: "#povoleni",
  };
}

export function subscribeFishingContent(
  onData: (content: FishingContent) => void,
  onError?: () => void,
): Unsubscribe {
  return onSnapshot(
    collection(db, COLLECTION_FISHING),
    (snapshot) => {
      const docs: Record<string, Record<string, unknown>> = {};
      snapshot.docs.forEach((d) => { docs[d.id] = d.data() as Record<string, unknown>; });
      onData(buildFishingFromDocs(docs));
    },
    () => onError?.(),
  );
}

// --- Surroundings ---
export function subscribeSurroundingPlaces(
  onData: (places: SurroundingPlace[]) => void,
  onError?: () => void,
): Unsubscribe {
  return onSnapshot(
    query(collection(db, COLLECTION_SURROUNDINGS), orderBy("sortOrder", "asc")),
    (snapshot) => {
      onData(snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as SurroundingPlace));
    },
    () => onError?.(),
  );
}

// --- Surroundings PAGE config ---
function defaultSurroundingsPageContent(): SurroundingsPageContent {
  return {
    heroEyebrow: "Okolí",
    heroTitle: "Objevujte okolí",
    heroHighlight: "krok za krokem",
    heroDescription: "Hojnovice a okolí nabízejí spoustu zážitků — od přírody přes historii až po gastronomii.",
    sectionTitle: "Tipy na výlety",
    sectionSubtitle: "Ručně vybraná místa v dosahu do hodiny jízdy",
  };
}

export function subscribeSurroundingsPageContent(
  onData: (content: SurroundingsPageContent) => void,
  onError?: () => void,
): Unsubscribe {
  return onSnapshot(
    doc(db, COLLECTION_SURROUNDINGS_PAGE, ROOM_DOC_ID),
    (snapshot) => {
      if (!snapshot.exists()) { onData(defaultSurroundingsPageContent()); return; }
      onData({ ...defaultSurroundingsPageContent(), ...(snapshot.data() as Partial<SurroundingsPageContent>) });
    },
    () => onError?.(),
  );
}

// --- Apiary / Glamping PAGE content ---
function defaultApiaryContent(): ApiaryContent {
  return {
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
}

export function subscribeApiaryContent(
  onData: (content: ApiaryContent) => void,
  onError?: () => void,
): Unsubscribe {
  return onSnapshot(
    collection(db, COLLECTION_APIARY),
    (snapshot) => {
      const docs: Record<string, Record<string, unknown>> = {};
      snapshot.docs.forEach((d) => { docs[d.id] = d.data() as Record<string, unknown>; });
      onData(buildApiaryFromDocs(docs));
    },
    () => onError?.(),
  );
}

// --- Reviews ---
export function subscribeReviews(
  onData: (reviews: Review[]) => void,
  onError?: () => void,
): Unsubscribe {
  return onSnapshot(
    query(collection(db, COLLECTION_REVIEWS), orderBy("sortOrder", "asc")),
    (snapshot) => {
      onData(snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Review));
    },
    () => onError?.(),
  );
}

// --- Contact ---
function defaultContactContent(): ContactContent {
  return {
    contactName: "", phone: "", email: "", companyName: "2P s.r.o.",
    ico: "", address: "Hojnovice, Česká republika",
    checkIn: "14:00", checkOut: "11:00", capacity: 2, notes: "", mapEmbedUrl: "",
  };
}

export function subscribeContactContent(
  onData: (content: ContactContent) => void,
  onError?: () => void,
): Unsubscribe {
  return onSnapshot(
    doc(db, COLLECTION_CONTACT, ROOM_DOC_ID),
    (snapshot) => {
      if (!snapshot.exists()) { onData(defaultContactContent()); return; }
      onData({ ...defaultContactContent(), ...(snapshot.data() as Partial<ContactContent>) });
    },
    () => onError?.(),
  );
}

// --- Voucher Form Config ---
const DEFAULT_VOUCHER_CONFIG: VoucherFormConfig = {
  modalTitle: "Dárková poukázka",
  modalDesc: "Darujte nezapomenutelný zážitek. Poukázka na pobyt v 2P Hive House.",
  successMessage: "Poukázka byla odeslána! Potvrzení přijde na váš e-mail.",
  pricePerNight: 3500,
  nightOptions: [1, 2, 3, 4, 5, 7],
  validityMonths: 12,
  payButtonLabel: "Zaplatit a odeslat",
  cancelButtonLabel: "Zrušit",
};

export function subscribeVoucherFormConfig(
  onData: (config: VoucherFormConfig) => void,
  onError?: () => void,
): Unsubscribe {
  return onSnapshot(
    doc(db, COLLECTION_VOUCHER_CONFIG, ROOM_DOC_ID),
    (snap) => {
      if (!snap.exists()) { onData(DEFAULT_VOUCHER_CONFIG); return; }
      const data = snap.data() as Partial<VoucherFormConfig>;
      onData({
        ...DEFAULT_VOUCHER_CONFIG,
        ...data,
        nightOptions: Array.isArray(data.nightOptions) ? data.nightOptions : DEFAULT_VOUCHER_CONFIG.nightOptions,
      });
    },
    () => onError?.(),
  );
}

// --- Permit Form Config ---
const DEFAULT_PERMIT_CONFIG: PermitFormConfig = {
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

export function subscribePermitFormConfig(
  onData: (config: PermitFormConfig) => void,
  onError?: () => void,
): Unsubscribe {
  return onSnapshot(
    doc(db, COLLECTION_PERMIT_CONFIG, ROOM_DOC_ID),
    (snap) => {
      if (!snap.exists()) { onData(DEFAULT_PERMIT_CONFIG); return; }
      onData({ ...DEFAULT_PERMIT_CONFIG, ...(snap.data() as Partial<PermitFormConfig>) });
    },
    () => onError?.(),
  );
}

// --- Helper: generovat unikátní kód pro voucher ---
export function generateVoucherCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "HH-";
  for (let i = 0; i < 8; i++) {
    if (i === 4) code += "-";
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}
