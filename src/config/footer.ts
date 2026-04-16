// ============================================================
// Konfigurace patičky — jediný zdroj pravdy pro kontakty,
// odkazy a texty v <Footer />. Uprav hodnoty zde, nic víc.
// ============================================================

export type FooterLink = { label: string; href: string };
export type FooterColumn = { title: string; links: FooterLink[] };

export type FooterConfig = {
  brandName: string;
  tagline: string;
  logoSrc: string;
  company: {
    name: string;
    ico: string;
    address: string;
  };
  contact: {
    email: string;
    phone: string;
  };
  checkInOut: {
    checkIn: string;
    checkOut: string;
  };
  /** `icon` musí odpovídat klíči v `src/components/Icon.tsx` (facebook, instagram). */
  socials: { label: string; href: string; icon: string }[];
  columns: FooterColumn[];
  legalLinks: FooterLink[];
};

export const footerConfig: FooterConfig = {
  brandName: "Hive House",
  tagline: "Hive House je unikátní glamping ve včelíně uprostřed přírody v srdci České republiky. Spěte nad živými včelími úly, rybařte v soukromém rybníku a nabijte se energií díky apiterapii. Zážitek, který jinde nenajdete.",
  logoSrc: "/logo.png",
  company: {
    name: "2P moment s.r.o.",
    ico: "22395512",
    address: "Hojanovice 17, 396 01 Hojanovice, Česká republika",
  },
  contact: {
    email: "info@2pmoment.cz",
    phone: "+420 774 110 224",
  },
  checkInOut: {
    checkIn: "14:00",
    checkOut: "11:00",
  },
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/hive.hojanovice?igsh=MTRtY3k1ZWFqMHAwYg==", icon: "instagram" },
  ],
  columns: [
    {
      title: "Navigace",
      links: [
        { label: "Včelín & Glamping", href: "#/" },
        { label: "Rybaření", href: "#/rybareni" },
        { label: "Rezervace", href: "#/rezervace" },
        { label: "Kontakt", href: "#/kontakt" },
      ],
    },
    {
      title: "Služby",
      links: [
        { label: "Rezervace pobytu", href: "#/rezervace" },
        { label: "Dárková poukázka", href: "#poukazka" },
        { label: "Rybářská povolenka", href: "#povolenka" },
      ],
    },
  ],
  legalLinks: [
    { label: "Obchodní podmínky", href: "#obchodni-podminky" },
    { label: "Ochrana osobních údajů", href: "#gdpr" },
    { label: "Cookies", href: "#cookies" },
  ],
};
