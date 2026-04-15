import type { OfferingsData } from "../types";

export function OfferingsSection({ data }: { data: OfferingsData }) {
  return (
    <section className="offerings section-pad" id="nabidka" aria-labelledby="offerings-title">
      <div className="container">
        <div className="offerings-head reveal">
          <div>
            <div className="section-eyebrow">{data.sectionEyebrow}</div>
            <h2 id="offerings-title" className="section-title">
              {data.sectionTitle} <em>{data.sectionTitleAccent}</em>
            </h2>
          </div>
          <p className="section-desc">{data.sectionDesc}</p>
        </div>

        <div className="offerings-grid">
          {data.cards.map((card, i) => (
            <a
              key={card.id}
              href={card.linkHref}
              className="offerings-card reveal"
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div className="offerings-card-media">
                <img src={card.image} alt={card.title} loading="lazy" />
              </div>
              <div className="offerings-card-body">
                <div className="offerings-card-eyebrow">{card.eyebrow}</div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                <span className="offerings-card-cta">{card.ctaLabel}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
