import type { T } from "../i18n";
import type {
  ContactContent,
  HomepageHero,
  HomepageOfferings,
  HomepageApitherapy,
  HomepageTrustbar,
  HomepageReviewsConfig,
} from "../types/content";
import { HeroSection } from "../components/HeroSection";
import { TrustBar } from "../components/TrustBar";
import { ReviewsSection } from "../components/ReviewsSection";
import { ContactPanel } from "../components/ContactPanel";
import { RouteLink } from "../lib/router";

type Props = {
  t: T;
  onVoucherClick: () => void;
  hero: HomepageHero;
  offerings: HomepageOfferings;
  apitherapy: HomepageApitherapy;
  trustbar: HomepageTrustbar;
  reviewsConfig: HomepageReviewsConfig;
  contact: ContactContent;
};

export function HomePage({ t, onVoucherClick, hero, offerings, apitherapy, trustbar, reviewsConfig, contact }: Props) {
  return (
    <>
      <HeroSection hero={hero} onVoucherClick={onVoucherClick} />
      <TrustBar trustbar={trustbar} />

      {/* ---- CO NABÍZÍME ---- */}
      <section className="offerings section-pad">
        <div className="container">
          <div className="offerings-head reveal">
            <div>
              <div className="section-eyebrow">{offerings.sectionEyebrow}</div>
              <h2 className="section-title">
                {offerings.sectionTitle} <em>{offerings.sectionTitleAccent}</em>
              </h2>
            </div>
            <p className="section-desc">{offerings.sectionDesc}</p>
          </div>

          <div className="offerings-grid">
            {offerings.cards.map((card, i) => (
              <RouteLink
                key={card.id}
                to={card.linkHref}
                className="offerings-card reveal"
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <div className="offerings-card-media">
                  <img src={card.image?.url || ""} alt={card.title} />
                </div>
                <div className="offerings-card-body">
                  <div className="offerings-card-eyebrow">{card.eyebrow}</div>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                  <span className="offerings-card-cta">{card.ctaLabel}</span>
                </div>
              </RouteLink>
            ))}
          </div>
        </div>
      </section>

      {/* ---- GLAMPING SE VČELAMI — ZDRAVÍ ---- */}
      <section className="section-pad" style={{ background: "#fff" }}>
        <div className="container">
          <div className="hook-grid">
            <div className="reveal-left">
              <div className="section-eyebrow">{apitherapy.eyebrow}</div>
              <h2 className="section-title">
                {apitherapy.title} <em>{apitherapy.titleAccent}</em>
              </h2>
              {apitherapy.text1 && (
                <p style={{ fontSize: 16, lineHeight: 1.85, color: "#5C4A2A", marginBottom: 20 }}>
                  {apitherapy.text1}
                </p>
              )}
              {apitherapy.text2 && (
                <p style={{ fontSize: 15, lineHeight: 1.8, color: "#5C4A2A", marginBottom: 28 }}>
                  {apitherapy.text2}
                </p>
              )}

              <div className="apitherapy-benefits">
                {apitherapy.benefits.map((b) => (
                  <div key={b.id} className="apitherapy-benefit-card">
                    <div className="apitherapy-benefit-icon">{b.icon}</div>
                    <p>{b.text}</p>
                  </div>
                ))}
              </div>

              <div className="page-hero-actions">
                <RouteLink to={apitherapy.ctaPrimaryHref} className="btn btn-primary">
                  {apitherapy.ctaPrimaryLabel}
                </RouteLink>
                <RouteLink to={apitherapy.ctaSecondaryHref} className="btn btn-outline">
                  {apitherapy.ctaSecondaryLabel}
                </RouteLink>
              </div>
            </div>

            <div className="hook-visual reveal-right">
              {apitherapy.imageMain?.url && (
                <img
                  src={apitherapy.imageMain.url}
                  alt={apitherapy.imageMain.alt || "Glamping se včelami"}
                  className="hook-visual-main"
                />
              )}
              <div className="hook-visual-stack">
                {apitherapy.imageSmall1?.url && (
                  <img src={apitherapy.imageSmall1.url} alt={apitherapy.imageSmall1.alt || ""} />
                )}
                {apitherapy.imageSmall2?.url && (
                  <img src={apitherapy.imageSmall2.url} alt={apitherapy.imageSmall2.alt || ""} />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- CTA BAND ---- */}
      <section className="conversion-band section-pad-sm">
        <div className="container">
          <div className="conversion-band-inner reveal">
            <div>
              <div className="section-eyebrow">Další krok</div>
              <h2 className="section-title">
                Připraveni na <em>nezapomenutelný zážitek?</em>
              </h2>
              <p className="section-desc">
                Rezervujte si pobyt nebo darujte poukázku svým blízkým.
              </p>
            </div>
            <div className="page-hero-actions">
              <RouteLink to="/rezervace" className="btn btn-primary">
                Rezervovat pobyt
              </RouteLink>
              <button type="button" className="btn btn-outline-honey" onClick={onVoucherClick}>
                Koupit poukázku
              </button>
            </div>
          </div>
        </div>
      </section>

      <ContactPanel contact={contact} />
      <ReviewsSection t={t} displayCount={reviewsConfig.displayCount} />
    </>
  );
}
