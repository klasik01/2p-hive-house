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
  socials: { label: string; href: string; icon: string }[];
  columns: FooterColumn[];
  legalLinks: FooterLink[];
};

export const footerConfig: FooterConfig = {
  brandName: "2P Hive House",
  tagline: "Glamping se včelami a soukromým rybníkem u nádrže Švihov.",
  logoSrc: "/logo.png",
  company: {
    name: "2P Moment s.r.o.",
    ico: "00000000",
    address: "Hojanovice, Česká republika",
  },
  contact: {
    email: "hivehouse@2pmoment.cz",
    phone: "+420 774 110 224",
  },
  checkInOut: {
    checkIn: "14:00",
    checkOut: "11:00",
  },
  socials: [
    { label: "Instagram", href: "https://instagram.com/", icon: "IG" },
    { label: "Facebook", href: "https://facebook.com/", icon: "FB" },
  ],
  columns: [
    {
      title: "Navigace",
      links: [
        { label: "Včelín & Glamping", href: "#vcelin" },
        { label: "Ubytování", href: "#ubytovani" },
        { label: "Rybaření", href: "#rybareni" },
        { label: "Okolí", href: "#okoli" },
      ],
    },
    {
      title: "Služby",
      links: [
        { label: "Rezervace pobytu", href: "#rezervace" },
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
