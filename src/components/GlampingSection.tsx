import type { ApiaryContent } from "../types/content";

// Fallback images when a glamping card has no image set
const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=600&q=80&auto=format",
  "https://images.unsplash.com/photo-1560180474-e8563fd75bab?w=600&q=80&auto=format",
  "https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=600&q=80&auto=format",
];

type Props = { apiary: ApiaryContent };

export function GlampingSection({ apiary }: Props) {
  const visibleCards = [...apiary.glampingCards]
    .filter((c) => c.selected !== false)
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));

  return (
    <section id="glamping" className="glamping section-pad">
      <div className="container">
        <div className="glamping-intro reveal">
          <div className="section-eyebrow">{apiary.glampingSubtitle}</div>
          <h2 className="section-title">
            {apiary.glampingTitle}
          </h2>
        </div>

        {visibleCards.length > 0 && (
          <div className="glamping-cards">
            {visibleCards.map((card, idx) => (
              <div
                key={card.id}
                className="glamping-card reveal"
                style={{ transitionDelay: `${idx * 0.1}s` }}
              >
                <img
                  src={card.image?.url || FALLBACK_IMAGES[idx % FALLBACK_IMAGES.length]}
                  alt={card.image?.alt || card.title}
                  loading="lazy"
                />
                <div className="glamping-card-overlay">
                  <div className="glamping-card-num">{String(idx + 1).padStart(2, "0")}</div>
                  <h3>{card.title}</h3>
                  <p>{card.subtitle || card.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
