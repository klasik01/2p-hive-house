// České texty (default jazyk).
// Labely tlačítek, systémové / navigační hlášky, popisy modálů.
// Obsah stránek (odstavce, seznamy, CTA na stránce) je v data/homepage.json.

export const cs = {
  nav: {
    brandAlt: "Hive House",
    uvod: "Úvod",
    vcelin: "Včelín & Glamping",
    ubytovani: "Ubytování",
    rybareni: "Rybaření",
    okoli: "Okolí",
    rezervace: "Rezervace",
    kontakt: "Kontakt",
    poukazka: "Dárková poukázka",
    menu: "Menu",
  },
  hero: {
    scrollHint: "Scroll",
    logoAlt: "Hive House",
  },
  common: {
    close: "Zavřít",
    next: "Další",
    prev: "Zpět",
    loading: "Načítáme…",
    open: "Otevřít",
    reserve: "Rezervovat",
    orderPermit: "Objednat rybářskou povolenku",
    watchVideo: "Přehrát video",
    showMore: "Zobrazit více",
    showLess: "Sbalit",
  },
  cookies: {
    title: "Používáme cookies",
    text:
      "Pro analýzu návštěvnosti a vylepšení stránek používáme Google Analytics. Souhlas můžete kdykoliv odvolat.",
    accept: "Přijmout",
    reject: "Odmítnout",
  },
  fishing: {
    modalTitle: "Rybářská povolenka",
    modalDesc: "Formulář pro objednání bude brzy doplněn.",
    soon: "Brzy k dispozici",
  },
  footer: {
    heading: "Patička",
    contactTitle: "Kontakt",
    emailLabel: "E-mail",
    phoneLabel: "Telefon",
    addressLabel: "Adresa",
    checkInLabel: "Check-in",
    checkOutLabel: "Check-out",
    icoLabel: "IČO",
    rights: "Všechna práva vyhrazena.",
    madeBy: "Vyrobeno s ♥ pro Hive House.",
  },
  map: {
    iframeTitle: "Mapa lokality Hive House",
  },
  apitherapy: {
    imageAlt: "Glamping se včelami",
  },
} as const;

export type T = typeof cs;
