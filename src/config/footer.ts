// ============================================================
// Konfigurace patičky — jediný zdroj pravdy pro kontakty,
// odkazy a texty v <Footer />. Sdílí globální údaje z hive-house.json.
// ============================================================

import { hiveHouseConfig } from "../data/hive-house";

const cfg = hiveHouseConfig;

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
  brandName: cfg.name,
  tagline: `${cfg.name} je unikátní glamping ve včelíně uprostřed přírody v srdci České republiky. Spěte nad živými včelími úly, rybařte v soukromém rybníku a nabijte se energií díky apiterapii. Zážitek, který jinde nenajdete.`,
  logoSrc: "/logo.png",
  company: {
    name: cfg.company.name,
    ico: cfg.company.ico,
    address: cfg.contact.address,
  },
  contact: {
    email: cfg.contact.email,
    phone: cfg.contact.phone,
  },
  checkInOut: {
    checkIn: cfg.checkInOut.checkIn,
    checkOut: cfg.checkInOut.checkOut,
  },
  socials: [
    { label: "Instagram", href: cfg.socials.instagram, icon: "instagram" },
  ],
  columns: [
    {
      title: "Navigace",
      links: [
        { label: "Včelín & Glamping", href: "/" },
        { label: "Rybaření", href: "/fishing" },
        { label: "Rezervace", href: "/rezervace" },
        { label: "Kontakt", href: "/kontakt" },
      ],
    },
    {
      title: "Služby",
      links: [
        { label: "Rezervace pobytu", href: "/rezervace" },
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
