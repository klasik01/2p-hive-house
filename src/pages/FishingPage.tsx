import type { FishingContent } from "../types/content";
import { RouteLink } from "../lib/router";

type Props = {
  fishing: FishingContent;
  onFishingClick: () => void;
};

export function FishingPage({ fishing, onFishingClick }: Props) {
  const heroStyle = fishing.heroImage?.url
    ? { backgroundImage: `url(${fishing.heroImage.url})` }
    : undefined;

  return (
    <>
      <section className="page-hero page-hero-fishing" style={heroStyle}>
        <div className="container page-hero-inner">
          <div className="page-hero-copy reveal visible">
            <div className="section-eyebrow">{fishing.heroEyebrow}</div>
            <h1 className="section-title">
              {fishing.heroTitle} <em>{fishing.heroHighlight}</em>
            </h1>
            <p className="section-desc">{fishing.heroDescription}</p>
            <div className="page-hero-actions">
              <button type="button" className="btn btn-primary" onClick={onFishingClick}>
                {fishing.ctaLabel}
              </button>
              <RouteLink to="/rezervace" className="btn btn-outline">
                Rezervovat pobyt
              </RouteLink>
            </div>
          </div>
        </div>
      </section>

      {fishing.steps.length > 0 && (
        <section className="detail-layout section-pad">
          <div className="container">
            <div className="detail-layout-grid">
              <div className="detail-copy reveal-left">
                <div className="section-eyebrow">Jak to funguje</div>
                <h2 className="section-title">{fishing.stepsTitle}</h2>
                <div className="detail-checklist">
                  {fishing.steps.map((step, i) => (
                    <div key={step.id} className="detail-checklist-item">
                      <span>{step.icon || `0${i + 1}`}</span>
                      <span>{step.title} {step.text && <span className="detail-checklist-sub">{step.text}</span>}</span>
                    </div>
                  ))}
                </div>
              </div>

              {fishing.infoCards.length > 0 && (
                <div className="permit-card-stack reveal-right">
                  {fishing.infoCards.map((card) => (
                    <div key={card.id} className="permit-card">
                      <div className="landing-card-eyebrow">{card.label}</div>
                      <h3>{card.value}</h3>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
