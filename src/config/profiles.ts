// ============================================================
// Profily webu — přepínají chování a viditelnost prvků.
//
// VE_VYSTAVBE  → web je ve výstavbě, nepřijímá rezervace
// BEZ_REKLAMY  → žádná promo videa, žádné intro video v hero
//
// Aktivní profily se nastavují zde. Komponenty si je čtou
// přes helper `isActive("VE_VYSTAVBE")`.
// ============================================================

export type ProfileName = "VE_VYSTAVBE" | "BEZ_REKLAMY";

/** Aktivní profily — přidej / odeber řádek a web se přizpůsobí. */
const ACTIVE_PROFILES: ProfileName[] = [
  "VE_VYSTAVBE",
  "BEZ_REKLAMY",
];

const activeSet = new Set<ProfileName>(ACTIVE_PROFILES);

/** Je profil aktivní? */
export function isActive(name: ProfileName): boolean {
  return activeSet.has(name);
}

// ---- Nastavení pro VE_VYSTAVBE ----
export const constructionConfig = {
  /** Předpokládaný termín otevření. */
  expectedDate: "Srpen 2026",
  /** Badge text v hero sekci. */
  badge: "Již brzy",
  /** Text v popup modalu. */
  popupTitle: "Hive House je ve výstavbě",
  popupText:
    "Momentálně nepřijímáme rezervace. Předpokládaný termín otevření je srpen 2026. Zanechte nám svůj e-mail a my vám pošleme informace, jakmile bude vše připraveno.",
  popupCtaLabel: "Odebírat novinky",
  popupSuccessMessage: "Děkujeme! Dáme vám vědět, jakmile otevřeme.",
  popupEmailPlaceholder: "váš@email.cz",
  /** Firestore kolekce pro uložení e-mailů. */
  firestoreCollection: "subscriptions",
  /** CTA tlačítko v hero místo rezervace. */
  heroCtaLabel: "Dejte mi vědět",
} as const;
