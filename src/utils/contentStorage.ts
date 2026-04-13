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
  Promotion, FishingPermit, GiftVoucher, RoomContent, RoomStorySection, RoomEquipmentItem, RoomFacilityItem,
  FishingContent, FishingStep, FishingInfoCard,
  SurroundingsPageContent, SurroundingPlace,
  ApiaryContent, GlampingCard,
  Review, ContactContent,
  VoucherFormConfig, PermitFormConfig,
  HomepageHero, HomepageOfferings, HomepageOfferingCard,
  HomepageApitherapy, HomepageApiBenefit,
  HomepageTrustbar, HomepageReviewsConfig,
  ManagedImage,
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
    heroTitle: "Ubytování v",
    heroHighlight: "Hive House",
    heroDescription:
      "Jednoduché, přírodní a klidné ubytování navržené pro relaxaci. Včelín s kapacitou 2 lůžka — prostor, kde se zastavíte a necháte na sebe působit přírodu.",
    detailEyebrow: "Vybavení",
    title: "Včelín Hive House",
    detailHighlight: "do detailu",
    description:
      "Vše, co potřebujete pro pohodlný pobyt uprostřed přírody. Klimatizace, Wi-Fi, kvalitní postele — a kolem vás jen ticho, příroda a včely.",
    modalTitle: "Ubytování v Hive House",
    modalSubtitle: "Včelín, 2 lůžka",
    modalDescription:
      "Nahlédněte do interiéru našeho unikátního ubytování přímo nad včelími úly. Přírodní materiály, klidný prostor a vše pro váš komfort.",
    reserveLabel: "Rezervovat pobyt",
    galleryLabel: "Zobrazit galerii",
    voucherLabel: "Koupit poukázku",
    showReserveBtn: true,
    showGalleryBtn: true,
    showVoucherBtn: true,
    buttonsOrder: ["reserve", "gallery", "voucher"],
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
    equipment: [
      { id: "eq-1", icon: "🛏️", title: "Postel 140 cm + 90 cm", desc: "Dvojlůžko a jednolůžko s kvalitní matrací pro klidný spánek" },
      { id: "eq-2", icon: "🗄️", title: "Skříň a stůl", desc: "Prostor pro osobní věci a pohodlné stolní zázemí" },
      { id: "eq-3", icon: "🌡️", title: "Klimatizace", desc: "Příjemná teplota v létě i v zimě — plně regulovatelná" },
      { id: "eq-4", icon: "💡", title: "Elektřina a osvětlení", desc: "Plnohodnotné elektrické rozvody a ambientní osvětlení" },
      { id: "eq-5", icon: "📶", title: "Wi-Fi připojení", desc: "Stabilní internetové připojení pro práci i zábavu" },
      { id: "eq-6", icon: "🔌", title: "Zásuvky pro nabíjení", desc: "Dostatek zásuvek pro mobily, notebooky a další elektroniku" },
    ],
    facilities: [
      { id: "fac-1", icon: "🍳", title: "Kuchyňka a jídelní kout", desc: "Společný prostor cca 5 metrů od domku s možností vlastního vaření" },
      { id: "fac-2", icon: "🚿", title: "Toaleta a umyvadlo", desc: "Samostatné sociální zařízení rovněž 5 metrů od ubytování" },
    ],
    intentional: [
      { id: "int-1", icon: "🌿", title: "Stravování", desc: "Není součástí pobytu — můžete si vařit sami z lokálních surovin v naší kuchyňce" },
      { id: "int-2", icon: "🌙", title: "Televize a rádio", desc: "Úmyslně. Pro zachování ticha a hlubšího vnímání přírody kolem vás" },
    ],
  };
}

// Merge sekcí pokoje z více Firestore dokumentů do jednoho RoomContent objektu
function buildRoomFromDocs(docs: Record<string, Record<string, unknown>>): RoomContent {
  const d = newRoomContent();
  const hero      = docs["hero"]       ?? {};
  const content   = docs["content"]    ?? {};
  const gallery   = docs["gallery"]    ?? {};
  const sections  = docs["sections"]   ?? {};
  const equipment = docs["equipment"]  ?? {};
  const facilities= docs["facilities"] ?? {};

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
    showReserveBtn: typeof c.showReserveBtn === "boolean" ? c.showReserveBtn : d.showReserveBtn,
    showGalleryBtn: typeof c.showGalleryBtn === "boolean" ? c.showGalleryBtn : d.showGalleryBtn,
    showVoucherBtn: typeof c.showVoucherBtn === "boolean" ? c.showVoucherBtn : d.showVoucherBtn,
    buttonsOrder: Array.isArray(c.buttonsOrder)
      ? ((c.buttonsOrder as string[]).filter((k): k is "reserve" | "gallery" | "voucher" =>
          k === "reserve" || k === "gallery" || k === "voucher"))
      : d.buttonsOrder,
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
    equipment: Array.isArray(equipment.equipment)
      ? (equipment.equipment as Array<Partial<RoomEquipmentItem>>).map((e, i) => ({
          id: e.id || `eq-${i}`,
          icon: e.icon || "🏠",
          title: e.title || "",
          desc: e.desc || "",
        }))
      : d.equipment,
    facilities: Array.isArray(facilities.facilities)
      ? (facilities.facilities as Array<Partial<RoomFacilityItem>>).map((f, i) => ({
          id: f.id || `fac-${i}`,
          icon: f.icon || "🏠",
          title: f.title || "",
          desc: f.desc || "",
        }))
      : d.facilities,
    intentional: Array.isArray(facilities.intentional)
      ? (facilities.intentional as Array<Partial<RoomFacilityItem>>).map((f, i) => ({
          id: f.id || `int-${i}`,
          icon: f.icon || "🌿",
          title: f.title || "",
          desc: f.desc || "",
        }))
      : d.intentional,
  } as RoomContent;
}

// Merge sekcí rybaření
function buildFishingFromDocs(docs: Record<string, Record<string, unknown>>): FishingContent {
  const d = defaultFishingContent();
  const hero  = docs["hero"]  ?? {};
  const steps = docs["steps"] ?? {};
  const info  = docs["info"]  ?? {};
  const gal   = docs["gallery"] ?? {};
  const main  = docs["main"]  ?? {};
  const h = Object.keys(hero).length  ? hero  : main;
  const st = Object.keys(steps).length ? steps : main;
  const inf = Object.keys(info).length ? info  : main;
  const g = Object.keys(gal).length    ? gal   : main;
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
    gallery: Array.isArray(g.gallery)
      ? (g.gallery as Array<Partial<ManagedImage>>).map((img) => ({ url: img.url || "", storagePath: img.storagePath, alt: img.alt }))
      : d.gallery,
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
    gallery: [],
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

// =====================================================================
// HOMEPAGE SEKCE — každá sekce ve vlastní kolekci
// =====================================================================

export const COLLECTION_HOMEPAGE = "hive-house-homepage";

// --- Defaults ---

export function defaultHomepageHero(): HomepageHero {
  return {
    title: "Usněte nad",
    titleAccent: "včelími úly",
    subtitle: "Glamping · Apiterapie · Příroda",
    text: "Unikátní glamping nedaleko vodní nádrže Švihov. Apiterapie, vlastní med, soukromý rybník — maximální pohodlí v srdci přírody.",
    ctaReserveLabel: "Rezervovat pobyt",
    ctaReserveHref: "/rezervace",
    ctaVoucherLabel: "Koupit poukázku",
    stat1Num: "27", stat1Label: "m² luxusního prostoru",
    stat2Num: "2",  stat2Label: "Osoby, naprosté soukromí",
    stat3Num: "∞",  stat3Label: "Klidu a přírody",
    images: [
      { url: "https://images.unsplash.com/photo-1504700610630-ac6aba3536d3?w=1920&q=85&auto=format", alt: "Hive House 1" },
      { url: "https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=1920&q=85&auto=format", alt: "Hive House 2" },
      { url: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1920&q=85&auto=format", alt: "Hive House 3" },
    ],
  };
}

export function defaultHomepageOfferings(): HomepageOfferings {
  return {
    sectionEyebrow: "Co nabízíme",
    sectionTitle: "Zážitek, který si",
    sectionTitleAccent: "zamilujete",
    sectionDesc: "Každá část Hive House má jinou atmosféru. Vyberte si, jestli chcete spát nad úly, vypnout v soukromí, strávit ráno u vody nebo vyrazit do okolí.",
    cards: [
      { id: "offer-1", sortOrder: 0, title: "Ubytování", description: "Komfortní dům pro dva s terasou, koupelnou a výhledem do krajiny.", eyebrow: "Komfort v přírodě", linkHref: "/ubytovani", ctaLabel: "Zjistit více", image: { url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&q=80&auto=format" } },
      { id: "offer-2", sortOrder: 1, title: "Rybaření", description: "Soukromý rybník u objektu. Kupte si povolenku a užijte si klid.", eyebrow: "Klid na vodě", linkHref: "/rybareni", ctaLabel: "Zjistit více", image: { url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80&auto=format" } },
      { id: "offer-3", sortOrder: 2, title: "Okolí & výlety", description: "Hrad Švihov, nádrž, cyklostezky a turistické trasy od prahu.", eyebrow: "Místa kolem", linkHref: "/vylety", ctaLabel: "Zjistit více", image: { url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&q=80&auto=format" } },
    ],
  };
}

export function defaultHomepageApitherapy(): HomepageApitherapy {
  return {
    eyebrow: "Glamping se včelami",
    title: "Apiterapie —",
    titleAccent: "léčivá síla včel",
    text1: "V Hive House spíte přímo nad živými včelími úly. Mikrovibrace a nízké frekvence, které včely přirozeně vytvářejí, procházejí podlahou do vašeho těla a navozují hluboký relaxační stav. Vůně propolisu, vosku a medu působí jako přirozená aromaterapie, která uklidňuje dýchací cesty a podporuje regeneraci organismu.",
    text2: "Apiterapie je staletími ověřená metoda využívající produkty včel ke zlepšení zdraví. Lidé s astmatem, alergiemi, chronickým stresem nebo problémy se spánkem pravidelně hlásí výrazné zlepšení už po prvním pobytu. Biorezonanční pole včelstva harmonizuje nervový systém a pomáhá tělu i mysli najít přirozenou rovnováhu.",
    benefits: [
      { id: "b1", icon: "🫁", text: "Zlepšení dýchacích cest a astmatu" },
      { id: "b2", icon: "😴", text: "Hlubší a kvalitnější spánek" },
      { id: "b3", icon: "🧘", text: "Snížení stresu a úzkosti" },
      { id: "b4", icon: "💪", text: "Posílení imunitního systému" },
      { id: "b5", icon: "🩺", text: "Zmírnění chronických bolestí" },
      { id: "b6", icon: "🧠", text: "Lepší soustředění a mentální klid" },
    ],
    ctaPrimaryLabel: "Více o apiterapii",
    ctaPrimaryHref: "/vcelin-glamping",
    ctaSecondaryLabel: "Rezervovat pobyt",
    ctaSecondaryHref: "/rezervace",
    imageMain: { url: "https://images.unsplash.com/photo-1504700610630-ac6aba3536d3?w=1200&q=80&auto=format", alt: "Glamping se včelami" },
    imageSmall1: { url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80&auto=format", alt: "Včely a úly" },
    imageSmall2: { url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&q=80&auto=format", alt: "Příroda v okolí" },
  };
}

export function defaultHomepageTrustbar(): HomepageTrustbar {
  return {
    items: [
      "Apiterapie pod postelí",
      "Soukromý rybník",
      "Vlastní med",
      "Blízko nádrže Švihov",
      "Moderní technologie",
      "Naprosté soukromí",
    ],
  };
}

export function defaultHomepageReviewsConfig(): HomepageReviewsConfig {
  return { displayCount: 5 };
}

// --- Subscriptions ---

export function subscribeHomepageHero(
  onData: (data: HomepageHero) => void,
  onError?: () => void,
): Unsubscribe {
  return onSnapshot(
    doc(db, COLLECTION_HOMEPAGE, "hero"),
    (snap) => {
      if (!snap.exists()) { onData(defaultHomepageHero()); return; }
      const raw = snap.data() as Partial<HomepageHero>;
      const d = defaultHomepageHero();
      onData({
        ...d,
        ...raw,
        images: Array.isArray(raw.images)
          ? (raw.images as Array<string | ManagedImage>).map((img) =>
              typeof img === "string" ? { url: img } : { url: img.url, storagePath: img.storagePath, alt: img.alt },
            )
          : d.images,
      });
    },
    () => onError?.(),
  );
}

export function subscribeHomepageOfferings(
  onData: (data: HomepageOfferings) => void,
  onError?: () => void,
): Unsubscribe {
  return onSnapshot(
    doc(db, COLLECTION_HOMEPAGE, "offerings"),
    (snap) => {
      if (!snap.exists()) { onData(defaultHomepageOfferings()); return; }
      const raw = snap.data() as Partial<HomepageOfferings>;
      const d = defaultHomepageOfferings();
      onData({
        ...d,
        ...raw,
        cards: Array.isArray(raw.cards)
          ? (raw.cards as Array<Partial<HomepageOfferingCard>>)
              .map((c, i) => ({
                id: c.id || `offer-${i}`,
                sortOrder: c.sortOrder ?? i,
                title: c.title || "",
                description: c.description || "",
                eyebrow: c.eyebrow || "",
                linkHref: c.linkHref || "",
                ctaLabel: c.ctaLabel || "Zjistit více",
                image: c.image,
              }))
              .sort((a, b) => a.sortOrder - b.sortOrder)
          : d.cards,
      });
    },
    () => onError?.(),
  );
}

export function subscribeHomepageApitherapy(
  onData: (data: HomepageApitherapy) => void,
  onError?: () => void,
): Unsubscribe {
  return onSnapshot(
    doc(db, COLLECTION_HOMEPAGE, "apitherapy"),
    (snap) => {
      if (!snap.exists()) { onData(defaultHomepageApitherapy()); return; }
      const raw = snap.data() as Partial<HomepageApitherapy>;
      const d = defaultHomepageApitherapy();
      onData({
        ...d,
        ...raw,
        benefits: Array.isArray(raw.benefits)
          ? (raw.benefits as Array<Partial<HomepageApiBenefit>>).map((b, i) => ({
              id: b.id || `b${i}`,
              icon: b.icon || "",
              text: b.text || "",
            }))
          : d.benefits,
      });
    },
    () => onError?.(),
  );
}

export function subscribeHomepageTrustbar(
  onData: (data: HomepageTrustbar) => void,
  onError?: () => void,
): Unsubscribe {
  return onSnapshot(
    doc(db, COLLECTION_HOMEPAGE, "trustbar"),
    (snap) => {
      if (!snap.exists()) { onData(defaultHomepageTrustbar()); return; }
      const raw = snap.data() as Partial<HomepageTrustbar>;
      onData({
        items: Array.isArray(raw.items) ? (raw.items as string[]).filter(Boolean) : defaultHomepageTrustbar().items,
      });
    },
    () => onError?.(),
  );
}

export function subscribeHomepageReviewsConfig(
  onData: (data: HomepageReviewsConfig) => void,
  onError?: () => void,
): Unsubscribe {
  return onSnapshot(
    doc(db, COLLECTION_HOMEPAGE, "reviews-config"),
    (snap) => {
      if (!snap.exists()) { onData(defaultHomepageReviewsConfig()); return; }
      const raw = snap.data() as Partial<HomepageReviewsConfig>;
      onData({
        displayCount: typeof raw.displayCount === "number" ? raw.displayCount : 5,
      });
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
