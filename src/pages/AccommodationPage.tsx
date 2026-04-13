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
      {/* ═══ HERO ═══ */}
      <section
        className="page-hero page-hero-accommodation"
        style={heroStyle}
      >
        <div className="container page-hero-inner">
          <div className="page-hero-copy reveal visible">
            <div className="section-eyebrow">{room.heroEyebrow}</div>
            <h1 className="section-title">
              {room.heroTitle} <em>{room.heroHighlight}</em>
            </h1>
            <p className="section-desc">{room.heroDescription}</p>
            <div className="page-hero-actions">
              {(room.buttonsOrder && room.buttonsOrder.length > 0
                ? room.buttonsOrder
                : (["reserve", "gallery", "voucher"] as const)
              ).map((key) => {
                if (key === "reserve" && room.showReserveBtn) {
                  return <RouteLink key="reserve" to="/rezervace" className="btn btn-primary">{room.reserveLabel}</RouteLink>;
                }
                if (key === "gallery" && room.showGalleryBtn) {
                  return (
                    <button key="gallery" type="button" className="btn btn-outline" onClick={() => setShowModal(true)} disabled={!hasGallery}>
                      {room.galleryLabel}
                    </button>
                  );
                }
                if (key === "voucher" && room.showVoucherBtn) {
                  return (
                    <button key="voucher" type="button" className="btn btn-outline-honey" onClick={onVoucherClick}>
                      {room.voucherLabel}
                    </button>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ EQUIPMENT GRID ═══ */}
      {room.equipment.length > 0 && (
        <section className="accom-equipment section-pad">
          <div className="container">
            <div className="accom-section-head">
              <div className="section-eyebrow">Vybavení</div>
              <h2 className="section-title">Co v Hive House <em>najdete</em></h2>
              <p className="section-desc">
                Vše, co potřebujete pro pohodlný pobyt uprostřed přírody — bez kompromisů.
              </p>
            </div>
            <div className="accom-equip-grid">
              {room.equipment.map((item) => (
                <div key={item.id} className="accom-equip-card reveal">
                  <div className="accom-equip-icon">{item.icon}</div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ FACILITIES + INTENTIONAL ═══ */}
      {(room.facilities.length > 0 || room.intentional.length > 0) && (
        <section className="accom-facilities section-pad" style={{ background: "var(--sunlight)" }}>
          <div className="container">
            <div className="accom-two-col">
              {/* Left — zázemí */}
              {room.facilities.length > 0 && (
                <div className="accom-facility-block reveal-left">
                  <div className="section-eyebrow">Zázemí a služby</div>
                  <h2 className="section-title">Vše na <em>dosah</em></h2>
                  <div className="accom-facility-list">
                    {room.facilities.map((item) => (
                      <div key={item.id} className="accom-facility-item">
                        <div className="accom-facility-icon">{item.icon}</div>
                        <div>
                          <strong>{item.title}</strong>
                          <p>{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Right — co tu nenajdete */}
              {room.intentional.length > 0 && (
                <div className="accom-intentional-block reveal-right">
                  <div className="section-eyebrow">Co u nás nenajdete</div>
                  <h2 className="section-title">A proč je to <em>záměr</em></h2>
                  <div className="accom-facility-list">
                    {room.intentional.map((item) => (
                      <div key={item.id} className="accom-facility-item accom-facility-item--muted">
                        <div className="accom-facility-icon">{item.icon}</div>
                        <div>
                          <strong>{item.title}</strong>
                          <p>{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ═══ GALLERY SHOWCASE ═══ */}
      {hasGallery && (
        <section className="accom-gallery-section section-pad">
          <div className="container">
            <div className="accom-section-head" style={{ textAlign: "center" }}>
              <div className="section-eyebrow" style={{ justifyContent: "center" }}>Galerie</div>
              <h2 className="section-title" style={{ textAlign: "center" }}>
                Nahlédněte <em>dovnitř</em>
              </h2>
            </div>
            <div className="accom-gallery-grid">
              {gallery.slice(0, 4).map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  className="accom-gallery-thumb"
                  onClick={() => setShowModal(true)}
                  aria-label={`Fotografie ${index + 1}`}
                >
                  <img src={image} alt={room.images[index]?.alt || `Ubytování ${index + 1}`} />
                  {index === 3 && gallery.length > 4 && (
                    <div className="accom-gallery-more">+{gallery.length - 4} fotek</div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ STORY SECTIONS ═══ */}
      {room.sections.length > 0 && (
        <section className="accom-stories section-pad" style={{ background: "var(--sunlight)" }}>
          <div className="container">
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
          </div>
        </section>
      )}

      {/* ═══ MODAL ═══ */}
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
