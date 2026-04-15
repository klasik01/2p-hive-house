// ============================================================
// Konfigurace stránky KONTAKT. Jediný zdroj pravdy pro kontakty,
// lidi a firemní údaje. Uprav hodnoty zde.
// ============================================================

export type ContactPerson = {
  id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  photo?: string;
};

export type ContactPageConfig = {
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
  people: ContactPerson[];
  general: {
    eyebrow: string;
    title: string;
    email: string;
    phone: string;
    address: string;
    checkIn: string;
    checkOut: string;
  };
  company: {
    eyebrow: string;
    title: string;
    name: string;
    ico: string;
    dic?: string;
    addressLines: string[];
    bankAccount?: string;
    note?: string;
  };
  map: {
    /** URL Google Maps embed (Share → Embed). */
    embedSrc: string;
    title: string;
    /** Otevřít v novém okně. */
    externalHref: string;
  };
};

export const contactPage: ContactPageConfig = {
  seo: {
    title: "Kontakt | 2P Hive House — Hojanovice",
    description:
      "Kontakt na 2P Hive House — glamping se včelami u nádrže Švihov. Pavel Pinkas, Jan Pinkas, telefon, e-mail, mapa a fakturační údaje.",
    keywords:
      "kontakt Hive House, 2P Hive House kontakt, Pavel Pinkas, Jan Pinkas, glamping Hojanovice kontakt",
    canonical: "https://hivehouse.2pmoment.cz/kontakt",
    ogImage: "https://hivehouse.2pmoment.cz/og-image.jpg",
  },
  hero: {
    eyebrow: "Kontakt",
    title: "Ozvěte se",
    titleAccent: "rádi vám poradíme",
    lead:
      "Jsme tu pro vás. Napište, zavolejte, nebo se rovnou stavte — poradíme s termínem, apiterapií i rybařením.",
    image: "/picture_2.jpg",
    imageAlt: "2P Hive House — kontakt",
  },
  people: [
    {
      id: "pavel",
      name: "Pavel Pinkas",
      role: "Majitel · provoz & rezervace",
      phone: "+420 774 110 224",
      email: "pavel@hivehouse.cz",
    },
    {
      id: "jan",
      name: "Jan Pinkas",
      role: "Provoz · apiterapie & rybaření",
      phone: "+420 774 110 225",
      email: "jan@hivehouse.cz",
    },
  ],
  general: {
    eyebrow: "Obecný kontakt",
    title: "Všeobecné dotazy",
    email: "info@hivehouse.cz",
    phone: "+420 774 110 224",
    address: "Hojanovice, 396 01",
    checkIn: "14:00",
    checkOut: "11:00",
  },
  company: {
    eyebrow: "Fakturace",
    title: "Fakturační údaje",
    name: "2P Moment s.r.o.",
    ico: "00000000",
    dic: "CZ00000000",
    addressLines: ["Hojanovice", "396 01 Hojanovice", "Česká republika"],
    note: "Společnost zapsaná v obchodním rejstříku.",
  },
  map: {
    // Výchozí embed na Hojanovice — po upřesnění polohy přepiš.
    embedSrc:
      "https://www.google.com/maps?q=Hojanovice&hl=cs&output=embed",
    title: "Mapa — 2P Hive House, Hojanovice",
    externalHref:
      "https://www.google.com/maps/search/?api=1&query=Hojanovice",
  },
};
