import type { HomepageData } from "../types";
import type { T } from "../i18n";
import { SEOHead } from "../components/SEOHead";
import { HeroSection } from "../components/HeroSection";
import { OfferingsSection } from "../components/OfferingsSection";
import { ApitherapySection } from "../components/ApitherapySection";
import { VideoSection } from "../components/VideoSection";
import { ContactPanel } from "../components/ContactPanel";

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
      <HeroSection hero={data.hero} onVoucherClick={onVoucherClick} />
      <OfferingsSection data={data.offerings} />
      <ApitherapySection data={data.apitherapy} />
      <VideoSection t={t} data={data.videoSection} />
      <ContactPanel contact={data.contact} />

      {/* CTA band pro rybářskou povolenku — otevře popup */}
      <section className="section-pad-sm" id="povolenka" style={{ background: "var(--white)" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <div className="section-eyebrow">Rybník přímo u chalupy</div>
          <h2>Chcete si zarybařit?</h2>
          <p className="section-desc" style={{ margin: "0 auto 24px" }}>
            Objednejte si povolenku na soukromý rybník u 2P Hive House.
          </p>
          <button type="button" className="btn btn-primary" onClick={onFishingClick}>
            {t.common.orderPermit}
          </button>
        </div>
      </section>
    </>
  );
}
