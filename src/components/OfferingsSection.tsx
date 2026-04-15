import { useState } from "react";
import type { OfferingArticle, OfferingsData } from "../types";
import { asset } from "../utils/asset";
import { OfferingArticleModal } from "./OfferingArticleModal";
import { offeringsData as defaultData } from "../data/homepage";

type Props = {
  data?: OfferingsData;
  id?: string;
};

/**
 * Karty nabídek (Glamping / Rybaření / Gastro). Klik otevře modal
 * s článkem, pokud karta má pole `article`.
 * Plug-and-play: bez props vykreslí defaultní obsah z homepage.json.
 */
export function OfferingsSection({ data = defaultData, id = "nabidka" }: Props) {
  const titleId = `${id}-title`;
  // Body lock + ESC řeší <OfferingArticleModal /> přes useModalOpen.
  const [activeArticle, setActiveArticle] = useState<OfferingArticle | null>(null);

  return (
    <section className="offerings section-pad" id={id} aria-labelledby={titleId}>
      <div className="container">
        <div className="offerings-head reveal">
          <div>
            <div className="section-eyebrow">{data.sectionEyebrow}</div>
            <h2 id={titleId} className="section-title">
              {data.sectionTitle} <em>{data.sectionTitleAccent}</em>
            </h2>
          </div>
          <p className="section-desc">{data.sectionDesc}</p>
        </div>

        <div className="offerings-grid">
          {data.cards.map((card, i) => {
            const hasArticle = !!card.article;
            const className = "offerings-card reveal";
            const style = { transitionDelay: `${i * 0.08}s` } as React.CSSProperties;

            const inner = (
              <>
                <div className="offerings-card-media">
                  <img src={asset(card.image)} alt={card.title} loading="lazy" />
                </div>
                <div className="offerings-card-body">
                  <div className="offerings-card-eyebrow">{card.eyebrow}</div>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                  <span className="offerings-card-cta">{card.ctaLabel}</span>
                </div>
              </>
            );

            return hasArticle ? (
              <button
                key={card.id}
                type="button"
                className={className}
                style={style}
                aria-label={card.title}
                onClick={() => setActiveArticle(card.article!)}
              >
                {inner}
              </button>
            ) : (
              <a
                key={card.id}
                href={card.linkHref}
                className={className}
                style={style}
                aria-label={card.title}
              >
                {inner}
              </a>
            );
          })}
        </div>
      </div>

      {activeArticle && (
        <OfferingArticleModal
          article={activeArticle}
          onClose={() => setActiveArticle(null)}
        />
      )}
    </section>
  );
}
