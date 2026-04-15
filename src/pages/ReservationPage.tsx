import type { HomepageData } from "../types";
import { SEOHead } from "../components/SEOHead";
import { ReservationSection } from "../components/ReservationSection";

type Props = {
  data: HomepageData;
};

/**
 * Samostatná stránka REZERVACE.
 * Má vlastní SEO (title/description/OG) a obsahuje pouze jeden hlavní blok
 * ReservationSection — hero s obrázkem + embed rezervačního widgetu.
 */
export function ReservationPage({ data }: Props) {
  const seo = {
    title: "Rezervace | 2P Hive House — zarezervujte si svůj termín",
    description:
      "Zarezervujte si svůj pobyt v 2P Hive House. Glamping se včelami u vodní nádrže Švihov — vyberte si volný termín online.",
    keywords: "rezervace Hive House, rezervace glamping, zarezervovat pobyt, 2P Hive House termíny",
    ogImage: data.seo.ogImage,
    canonical: "https://hivehouse.2pmoment.cz/rezervace",
  };

  return (
    <>
      <SEOHead meta={seo} />
      <ReservationSection data={data.reservation} />
    </>
  );
}
