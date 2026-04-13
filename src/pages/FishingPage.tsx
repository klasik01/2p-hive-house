import { useState } from "react";
import type { FishingContent } from "../types/content";

type Props = {
  fishing: FishingContent;
  onFishingClick: () => void;
};

export function FishingPage({ fishing, onFishingClick }: Props) {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const galleryUrls = (fishing.gallery ?? []).map((img) => img.url).filter(Boolean);
  const hasGallery = galleryUrls.length > 0;

  const heroStyle = fishing.heroImage?.url
    ? { backgroundImage: `linear-gradient(180deg, rgba(17,17,17,0.48) 0%, rgba(17,17,17,0.65) 100%), url(${fishing.heroImage.url})` }
    : undefined;

  return (
    <>
      {/* ── Hero: full-width background + dark overlay ── */}
      <section className="fishing-hero" style={heroStyle}>
        <div className="container">
          <div className="fishing-hero-inner reveal">
            <div className="section-eyebrow fishing-hero-eyebrow">{fishing.heroEyebrow}</div>
            <h1 className="fishing-hero-title">
              {fishing.heroTitle} <em>{fishing.heroHighlight}</em>
            </h1>
            <p className="fishing-hero-desc">{fishing.heroDescription}</p>
            <div className="fishing-hero-actions">
              <button type="button" className="btn btn-primary" onClick={onFishingClick}>
                {fishing.ctaLabel}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Info strip — orange bar like contact panel ── */}
      {(fishing.infoCards ?? []).length > 0 && (
        <div className="fishing-strip">
          <div className="container fishing-strip-inner">
            {(fishing.infoCards ?? []).map((card) => (
              <div key={card.id} className="fishing-strip-item">
                <strong>{card.value}</strong>
                <small>{card.label}</small>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Gallery ── */}
      {hasGallery && (
        <section className="fishing-gallery section-pad">
          <div className="container">
            <div className="section-eyebrow">Galerie</div>
            <div className="fishing-gallery-grid">
              {galleryUrls.map((url, idx) => (
                <button
                  key={`${url}-${idx}`}
                  type="button"
                  className="fishing-gallery-thumb"
                  onClick={() => setLightboxIdx(idx)}
                  aria-label={`Zobrazit fotografii ${idx + 1}`}
                >
                  <img src={url} alt={(fishing.gallery ?? [])[idx]?.alt || `Rybaření ${idx + 1}`} />
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Lightbox ── */}
      {lightboxIdx !== null && hasGallery && (
        <div
          className="fishing-lightbox"
          onClick={(e) => { if (e.target === e.currentTarget) setLightboxIdx(null); }}
        >
          <button className="fishing-lightbox-close" onClick={() => setLightboxIdx(null)} aria-label="Zavřít">
            &times;
          </button>
          <button
            className="fishing-lightbox-nav fishing-lightbox-prev"
            onClick={() => setLightboxIdx((i) => (i! <= 0 ? galleryUrls.length - 1 : i! - 1))}
            aria-label="Předchozí"
          >
            &#8249;
          </button>
          <img
            className="fishing-lightbox-img"
            src={galleryUrls[lightboxIdx]}
            alt={(fishing.gallery ?? [])[lightboxIdx]?.alt || `Rybaření ${lightboxIdx + 1}`}
          />
          <button
            className="fishing-lightbox-nav fishing-lightbox-next"
            onClick={() => setLightboxIdx((i) => (i! >= galleryUrls.length - 1 ? 0 : i! + 1))}
            aria-label="Další"
          >
            &#8250;
          </button>
          <div className="fishing-lightbox-counter">
            {lightboxIdx + 1} / {galleryUrls.length}
          </div>
        </div>
      )}
    </>
  );
}
