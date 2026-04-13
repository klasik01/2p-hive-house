import { useState } from "react";
import type { RoomContent } from "../types/content";
import { ExperienceModal } from "../components/ExperienceModal";
import { RouteLink } from "../lib/router";

type Props = {
  onVoucherClick: () => void;
  room: RoomContent;
};

export function AccommodationPage({ onVoucherClick, room }: Props) {
  const [showModal, setShowModal] = useState(false);
  const gallery = room.images.map((image) => image.url).filter(Boolean);
  const hasGallery = gallery.length > 0;

  const heroStyle = room.heroImage?.url
    ? { backgroundImage: `url(${room.heroImage.url})` }
    : undefined;

  return (
    <>
      <section
        className={`page-hero page-hero-accommodation${hasGallery ? " hero-clickable" : ""}`}
        style={heroStyle}
        onClick={hasGallery ? () => setShowModal(true) : undefined}
        role={hasGallery ? "button" : undefined}
        aria-label={hasGallery ? "Otevřít galerii" : undefined}
        tabIndex={hasGallery ? 0 : undefined}
        onKeyDown={hasGallery ? (e) => { if (e.key === "Enter" || e.key === " ") setShowModal(true); } : undefined}
      >
        {hasGallery && (
          <div className="hero-gallery-hint">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
            Zobrazit galerii
          </div>
        )}
        <div className="container page-hero-inner">
          <div className="page-hero-copy reveal visible" onClick={(e) => e.stopPropagation()}>
            <div className="section-eyebrow">{room.heroEyebrow}</div>
            <h1 className="section-title">
              {room.heroTitle} <em>{room.heroHighlight}</em>
            </h1>
            <p className="section-desc">
              {room.heroDescription}
            </p>
            <div className="page-hero-actions">
              <RouteLink to="/rezervace" className="btn btn-primary">{room.reserveLabel}</RouteLink>
              <button type="button" className="btn btn-outline" onClick={() => setShowModal(true)} disabled={!hasGallery}>
                {room.galleryLabel}
              </button>
              <button type="button" className="btn btn-outline-honey" onClick={onVoucherClick}>
                {room.voucherLabel}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="detail-layout section-pad">
        <div className="container">
          <div className="detail-layout-grid">
            <div className="detail-copy reveal-left">
              <div className="section-eyebrow">{room.detailEyebrow}</div>
              <h2 className="section-title">{room.title} <em>{room.detailHighlight}</em></h2>
              <p className="section-desc">
                {room.description}
              </p>
              <div className="detail-checklist">
                {room.labels.map((item) => (
                  <div key={item} className="detail-checklist-item">
                    <span>⬡</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="detail-gallery reveal-right">
              {gallery.map((image, index) => (
                <img key={`${image}-${index}`} src={image} alt={room.images[index]?.alt || `Ubytování ${index + 1}`} />
              ))}
            </div>
          </div>

          {/* Story sections — two layout types */}
          {room.sections.length > 0 && (
            <div className="detail-story-grid">
              {room.sections.map((section) => {
                if (section.layout === "image-left" && section.image?.url) {
                  return (
                    <article key={section.id} className="detail-story-card detail-story-card-image-left reveal">
                      <div className="detail-story-image-wrap">
                        <img src={section.image.url} alt={section.image.alt || section.title} className="detail-story-image" />
                      </div>
                      <div className="detail-story-copy">
                        <div className="landing-card-eyebrow">{section.eyebrow}</div>
                        <h3>{section.title}</h3>
                        <p>{section.text}</p>
                      </div>
                    </article>
                  );
                }
                return (
                  <article key={section.id} className="detail-story-card reveal">
                    <div className="landing-card-eyebrow">{section.eyebrow}</div>
                    <h3>{section.title}</h3>
                    <p>{section.text}</p>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {showModal && hasGallery && (
        <ExperienceModal
          title={room.modalTitle}
          subtitle={room.modalSubtitle}
          description={room.modalDescription}
          images={gallery}
          highlights={room.labels}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
