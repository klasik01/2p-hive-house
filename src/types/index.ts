// Centrální typy pro 2P Hive House

export type CookieConsentState = "unset" | "accepted" | "rejected";

export type Promotion = {
  id: string;
  enabled: boolean;
  badge: string;
  title: string;
  text: string;
  ctaLabel: string;
  ctaHref: string;
  startsAt?: string; // ISO date YYYY-MM-DD
  endsAt?: string;
};

export type SeoMeta = {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  canonical?: string;
};

export type OfferingCard = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  linkHref: string;
  image: string;
};

export type VideoCard = {
  id: string;
  title: string;
  eyebrow: string;
  /** YouTube / Vimeo / vlastní MP4. Pokud MP4, komponenta použije <video>. */
  videoUrl: string;
  /** Náhledový obrázek před rozbalením. */
  poster?: string;
};

export type HeroData = {
  subtitle: string;
  title: string;
  titleAccent: string;
  text: string;
  images: string[];
  /** Volitelné: URL intro videa (YouTube/Vimeo embed nebo MP4).
   * Pokud vyplněno, logo v hero se chová jako play tlačítko. */
  introVideoUrl?: string;
  introVideoLabel?: string;
  ctaReserveLabel: string;
  ctaReserveHref: string;
  ctaVoucherLabel: string;
  stats: { num: string; label: string }[];
};

export type OfferingsData = {
  sectionEyebrow: string;
  sectionTitle: string;
  sectionTitleAccent: string;
  sectionDesc: string;
  cards: OfferingCard[];
};

export type VideoSectionData = {
  sectionEyebrow: string;
  sectionTitle: string;
  sectionTitleAccent: string;
  sectionDesc: string;
  cards: VideoCard[];
};

export type ApitherapyBenefit = {
  id: string;
  icon: string;
  text: string;
};

export type ApitherapyData = {
  eyebrow: string;
  title: string;
  titleAccent: string;
  text1: string;
  text2: string;
  benefits: ApitherapyBenefit[];
  ctaPrimaryLabel: string;
  ctaPrimaryHref: string;
  ctaSecondaryLabel: string;
  ctaSecondaryHref: string;
  imageMain: string;
  imageSmall1?: string;
  imageSmall2?: string;
};

export type ContactData = {
  eyebrow: string;
  title: string;
  titleAccent: string;
  desc: string;
  phone: string;
  phoneLabel: string;
  email: string;
  emailLabel: string;
  address: string;
  addressLabel: string;
  mapEmbedUrl?: string;
};

export type HowItWorksStep = {
  id: string;
  number: string;
  icon: string;
  title: string;
  text: string;
};

export type HowItWorksData = {
  eyebrow: string;
  title: string;
  titleAccent: string;
  desc: string;
  steps: HowItWorksStep[];
};

export type AboutBlock = {
  id: string;
  icon: string;
  question: string;
  answer: string;
};

export type AboutData = {
  eyebrow: string;
  title: string;
  titleAccent: string;
  lead: string;
  blocks: AboutBlock[];
};

export type FishingCtaData = {
  eyebrow: string;
  title: string;
  desc: string;
};

export type HomepageData = {
  seo: SeoMeta;
  hero: HeroData;
  howItWorks: HowItWorksData;
  about: AboutData;
  offerings: OfferingsData;
  apitherapy: ApitherapyData;
  videoSection: VideoSectionData;
  fishingCta: FishingCtaData;
  contact: ContactData;
};
