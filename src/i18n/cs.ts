// České texty (default jazyk). Všechny labely tlačítek, hlášky a běžné fráze
// se definují zde, nikoliv přímo v komponentách.

export const cs = {
  nav: {
    brandAlt: "2P Hive House",
    vcelin: "Včelín & Glamping",
    ubytovani: "Ubytování",
    rybareni: "Rybaření",
    okoli: "Okolí",
    rezervace: "Rezervace",
    poukazka: "Dárková poukázka",
    menu: "Menu",
  },
  hero: {
    scrollHint: "Scroll",
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
    rights: "Všechna práva vyhrazena.",
    madeBy: "Vyrobeno s ♥ pro 2P Hive House.",
  },
} as const;

export type T = typeof cs;
