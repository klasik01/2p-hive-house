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

export type HomepageData = {
  seo: SeoMeta;
  hero: HeroData;
  offerings: OfferingsData;
  videoSection: VideoSectionData;
};
