import type { HomepageData } from "../types";
import type { T } from "../i18n";
import { SEOHead } from "../components/SEOHead";
import { HeroSection } from "../components/HeroSection";
import { OfferingsSection } from "../components/OfferingsSection";
import { ApitherapySection } from "../components/ApitherapySection";
import { HowItWorksSection } from "../components/HowItWorksSection";
import { AboutSection } from "../components/AboutSection";
import { VideoSection } from "../components/VideoSection";
import { ContactPanel } from "../components/ContactPanel";
import { FishingCtaBand } from "../components/FishingCtaBand";

type Props = {
  t: T;
  data: HomepageData;
  onVoucherClick: () => void;
  onFishingClick: () => void;
};

/**
 * Úvodní stránka 2P Hive House.
 * Skládá se z menších komponent (Hero / Offerings / Videos) a všechna
 * data dostává jako props ze souboru data/homepage.json.
 */
export function HomePage({ t, data, onVoucherClick, onFishingClick }: Props) {
  return (
    <>
      <SEOHead meta={data.seo} />
      <HeroSection t={t} hero={data.hero} onVoucherClick={onVoucherClick} />
      <AboutSection data={data.about} />
      <ApitherapySection t={t} data={data.apitherapy} />
      <HowItWorksSection data={data.howItWorks} />
      <OfferingsSection data={data.offerings} />
      <VideoSection t={t} data={data.videoSection} />
      <ContactPanel t={t} contact={data.contact} />

      {/* CTA band pro rybářskou povolenku — otevře popup */}
      <FishingCtaBand t={t} data={data.fishingCta} onClick={onFishingClick} />
    </>
  );
}
