import { useEffect, useState } from "react";

type Props = {
  title: string;
  subtitle?: string;
  description: string;
  images: string[];
  highlights?: string[];
  onClose: () => void;
};

export function ExperienceModal({ title, subtitle, description, images, highlights = [], onClose }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setActiveIndex((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft") setActiveIndex((i) => (i - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [images.length, onClose]);

  const prev = () => setActiveIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setActiveIndex((i) => (i + 1) % images.length);

  return (
    <div className="experience-modal-overlay" onClick={(event) => event.target === event.currentTarget && onClose()}>
      <div className="experience-modal" role="dialog" aria-modal="true" aria-label={title}>
        <button className="experience-modal-close" onClick={onClose} aria-label="Zavřít">✕</button>

        <div className="experience-modal-header">
          {subtitle && <div className="experience-modal-subtitle">{subtitle}</div>}
          <h3>{title}</h3>
        </div>

        <div className="experience-modal-body">
          <div className="experience-modal-stage">
            {images.length > 1 && (
              <button type="button" className="experience-modal-nav prev" onClick={prev} aria-label="Předchozí">‹</button>
            )}
            <img
              src={images[activeIndex]}
              alt={`${title} ${activeIndex + 1}`}
              className="experience-modal-main-image"
            />
            {images.length > 1 && (
              <button type="button" className="experience-modal-nav next" onClick={next} aria-label="Další">›</button>
            )}
            {images.length > 1 && (
              <div className="experience-modal-counter">{activeIndex + 1} / {images.length}</div>
            )}
          </div>

          {images.length > 1 && (
            <div className="experience-modal-thumbs">
              {images.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  className={`experience-modal-thumb${index === activeIndex ? " active" : ""}`}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Zobrazit fotografii ${index + 1}`}
                >
                  <img src={image} alt="" />
                </button>
              ))}
            </div>
          )}

          {(description || highlights.length > 0) && (
            <div className="experience-modal-content">
              {description && <p className="experience-modal-description">{description}</p>}
              {highlights.length > 0 && (
                <div className="experience-modal-highlights">
                  {highlights.map((highlight) => (
                    <div key={highlight} className="experience-modal-highlight">
                      <span className="experience-modal-highlight-mark">⬡</span>
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
