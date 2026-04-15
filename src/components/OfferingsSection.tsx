import { useEffect, useState } from "react";
import type { OfferingArticle, OfferingsData } from "../types";
import { asset } from "../utils/asset";
import { OfferingArticleModal } from "./OfferingArticleModal";

export function OfferingsSection({ data }: { data: OfferingsData }) {
  const [activeArticle, setActiveArticle] = useState<OfferingArticle | null>(null);

  // Body lock při otevřené modálce — zabrání skrollu stránky za ní.
  useEffect(() => {
    document.body.classList.toggle("modal-open", !!activeArticle);
    return () => document.body.classList.remove("modal-open");
  }, [activeArticle]);

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

            // Karta s `article` se chová jako tlačítko a otevře modal.
            // Bez článku se chová jako klasický odkaz (fallback).
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
