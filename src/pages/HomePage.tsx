import type { HomepageData } from "../types";
import type { T } from "../i18n";
import { SEOHead } from "../components/ui/SEOHead";
import { HeroSection } from "../components/layout/HeroSection";
import {
  AboutSection,
  ApitherapySection,
  HowItWorksSection,
  OfferingsSection,
  VideoSection,
  GallerySection,
  ContactPanel,
  FishingCtaBand,
} from "../components/sections";

type Props = {
  t: T;
  data: HomepageData;
  onVoucherClick: () => void;
  onFishingClick: () => void;
};

/**
 * Úvodní stránka 2P Hive House.
 * Sekce pod hero jsou znovupoužitelné — najdeš je v `components/sections.ts`
 * a můžeš je bez přeposílání props použít kdekoli jinde.
 */
export function HomePage({ t, data, onVoucherClick, onFishingClick }: Props) {
  return (
    <>
      <SEOHead meta={data.seo} />
      <HeroSection t={t} hero={data.hero} onVoucherClick={onVoucherClick} />

      <AboutSection />
      <ApitherapySection />
      <HowItWorksSection />
      <OfferingsSection />
      <VideoSection />
      <GallerySection />
      <ContactPanel />
      <FishingCtaBand onClick={onFishingClick} />
    </>
  );
}
