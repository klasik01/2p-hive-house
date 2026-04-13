// ============================================================
// 2P HIVE HOUSE — TypeScript typy
// ============================================================

export type Promotion = {
  id: string;
  enabled: boolean;
  startsAt?: string;   // YYYY-MM-DD
  endsAt?: string;     // YYYY-MM-DD
  badge: string;
  title: string;
  text: string;
  ctaLabel: string;
  ctaHref: string;
};

export type FishingPermit = {
  id: string;
  name: string;
  email: string;
  date: string;          // YYYY-MM-DD
  persons: number;
  isFirefighter: boolean;
  isHojanoviceChild: boolean;
  pricePaid: number;
  status: "pending" | "paid" | "cancelled";
  createdAt: string;     // ISO timestamp
};

export type GiftVoucher = {
  id: string;
  recipientName: string;
  recipientEmail: string;
  senderName: string;
  senderEmail: string;
  message?: string;
  nights: number;
  pricePaid: number;
  code: string;
  status: "pending" | "paid" | "used" | "expired";
  createdAt: string;     // ISO timestamp
  validUntil: string;    // YYYY-MM-DD (1 rok od vytvoření)
};

export type ManagedImage = {
  url: string;
  storagePath?: string;
  alt?: string;
};

export type SurroundingPlace = {
  id: string;
  enabled: boolean;
  sortOrder: number;
  title: string;
  subtitle: string;
  distance: string;
  description: string;
  imageUrl: string;
  imageStoragePath?: string;
  linkHref: string;
  tags: string[];
};

export type StorySectionLayout = "text" | "image-left";

export type RoomStorySection = {
  id: string;
  eyebrow: string;
  title: string;
  text: string;
  layout?: StorySectionLayout;
  image?: ManagedImage;
};

export type RoomContent = {
  id: string;
  heroEyebrow: string;
  heroTitle: string;
  heroHighlight: string;
  heroDescription: string;
  heroImage?: ManagedImage;
  detailEyebrow: string;
  title: string;
  detailHighlight: string;
  description: string;
  modalTitle: string;
  modalSubtitle: string;
  modalDescription: string;
  reserveLabel: string;
  galleryLabel: string;
  voucherLabel: string;
  labels: string[];
  images: ManagedImage[];
  sections: RoomStorySection[];
};

export type FishingStep = {
  id: string;
  icon: string;
  title: string;
  text: string;
};

export type FishingInfoCard = {
  id: string;
  label: string;
  value: string;
};

export type FishingContent = {
  heroEyebrow: string;
  heroTitle: string;
  heroHighlight: string;
  heroDescription: string;
  heroImage?: ManagedImage;
  stepsTitle: string;
  steps: FishingStep[];
  infoCards: FishingInfoCard[];
  ctaLabel: string;
  ctaHref: string;
};

export type SurroundingsPageContent = {
  heroEyebrow: string;
  heroTitle: string;
  heroHighlight: string;
  heroDescription: string;
  heroImage?: ManagedImage;
  sectionTitle: string;
  sectionSubtitle: string;
};

export type GlampingCard = {
  id: string;
  selected: boolean;
  sortOrder: number;
  title: string;
  subtitle: string;
  description: string;
  image?: ManagedImage;
};

export type ApiaryContent = {
  // Hlavní hero
  heroEyebrow: string;
  heroTitle: string;
  heroHighlight: string;
  heroDescription: string;
  heroImage?: ManagedImage;
  // Glamping sekce
  glampingTitle: string;
  glampingSubtitle: string;
  glampingCards: GlampingCard[];
  // Bydlení se včelami
  beeLivingTitle: string;
  beeLivingHighlight: string;
  beeLivingText: string;
  beeLivingImage?: ManagedImage;
  // API terapie
  apiTherapyTitle: string;
  apiTherapyHighlight: string;
  apiTherapyText: string;
  apiTherapyImage?: ManagedImage;
};

export type Review = {
  id: string;
  enabled: boolean;
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  date: string;           // YYYY-MM-DD
  source?: string;        // Booking.com, Airbnb, Google, ...
  sortOrder: number;
};

export type ContactContent = {
  contactName: string;
  phone: string;
  email: string;
  companyName: string;
  ico: string;
  address: string;
  checkIn: string;        // napr. "14:00"
  checkOut: string;       // napr. "11:00"
  capacity: number;
  notes: string;
  mapEmbedUrl?: string;
};

// ── Konfigurace formuláře dárkové poukázky ───────────────────────────────────
export type VoucherFormConfig = {
  modalTitle: string;
  modalDesc: string;
  successMessage: string;
  pricePerNight: number;        // Kč za noc, napr. 3500
  nightOptions: number[];       // nabídka počtu nocí, napr. [1,2,3,4,5,7]
  validityMonths: number;       // platnost poukázky v měsících, napr. 12
  payButtonLabel: string;
  cancelButtonLabel: string;
};

// ── Konfigurace formuláře rybářské povolenky ─────────────────────────────────
export type PermitFormConfig = {
  modalTitle: string;
  modalDesc: string;
  successMessage: string;
  priceAdult: number;               // cena pro běžného návštěvníka (Kč/osoba)
  priceFirefighter: number;         // cena pro hasiče (Kč/osoba), 0 = zdarma
  priceChild: number;               // cena pro děti (Kč/osoba), 0 = zdarma
  maxPersons: number;               // max počet osob v selectu
  discountFirefighterEnabled: boolean;
  discountFirefighterLabel: string;
  discountChildEnabled: boolean;
  discountChildLabel: string;
  payButtonLabel: string;
  cancelButtonLabel: string;
};

export type HiveHouseContent = {
  promotions: Promotion[];
};

export type AppId = "hive-house";

export type CookieConsentState = "unset" | "accepted" | "rejected";
