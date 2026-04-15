// ============================================================
// Konfigurace stránky RYBAŘENÍ. Jednoduchá stránka — hero + info
// + CTA na povolenku. Uprav hodnoty zde.
// ============================================================

export type FishingPageConfig = {
  seo: {
    title: string;
    description: string;
    keywords: string;
    canonical: string;
    ogImage: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    lead: string;
    image: string;
    imageAlt: string;
  };
  info: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    lead: string;
    cards: { id: string; icon: string; title: string; text: string }[];
  };
  cta: {
    eyebrow: string;
    title: string;
    desc: string;
    buttonLabel: string;
  };
};

export const fishingPage: FishingPageConfig = {
  seo: {
    title: "Rybaření u chalupy | 2P Hive House — soukromý rybník",
    description:
      "Rybaření u 2P Hive House — soukromý rybník přímo u chalupy. Kupte si povolenku a užijte si klidný den u vody.",
    keywords:
      "rybaření 2P Hive House, soukromý rybník, povolenka rybaření, rybaření Hojanovice, glamping s rybaříním",
    canonical: "https://hivehouse.2pmoment.cz/rybareni",
    ogImage: "https://hivehouse.2pmoment.cz/og-image.jpg",
  },
  hero: {
    eyebrow: "Rybaření",
    title: "Soukromý rybník",
    titleAccent: "přímo u chalupy",
    lead:
      "Užijte si klidný den u vody. Pro hosty i návštěvníky máme povolenky na rybaření v soukromém rybníku jen pár kroků od 2P Hive House.",
    image: "/picture_3.jpg",
    imageAlt: "Soukromý rybník u 2P Hive House",
  },
  info: {
    eyebrow: "O rybníku",
    title: "Rybaření",
    titleAccent: "bez davů, pár kroků od chalupy",
    lead:
      "Soukromý rybník přímo na našem pozemku. Klidná voda, čerstvý vzduch a žádní cizí rybáři okolo — ideální pro pohodový den u vody.",
    cards: [
      {
        id: "private",
        icon: "shield",
        title: "Jen pro vás",
        text: "Rybník je soukromý — žádné cizí pláštěnky mezi křovím, jen vy a voda.",
      },
      {
        id: "easy",
        icon: "leaf",
        title: "Bez cestování",
        text: "Pár kroků od Hive House. Nemusíte hledat veřejný revír, sedáte si rovnou.",
      },
      {
        id: "gear",
        icon: "sparkles",
        title: "Vybavení k zapůjčení",
        text: "Vlastní prut vítaný, ale pokud nic nemáte, základní výbavu vám rádi půjčíme.",
      },
    ],
  },
  cta: {
    eyebrow: "Povolenka",
    title: "Povolenka na soukromý rybník",
    desc: "Objednejte si povolenku online a vyrazte k vodě — vše vyřešíte za pár kliknutí.",
    buttonLabel: "Objednat rybářskou povolenku",
  },
};
