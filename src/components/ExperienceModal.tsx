import { useState } from "react";

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

  return (
    <div className="modal-overlay" onClick={(event) => event.target === event.currentTarget && onClose()}>
      <div className="modal modal-wide experience-modal" role="dialog" aria-modal="true" aria-label={title}>
        <div className="modal-header">
          <div>
            {subtitle && <div className="experience-modal-subtitle">{subtitle}</div>}
            <h3>{title}</h3>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Zavřít">✕</button>
        </div>

        <div className="experience-modal-grid">
          <div className="experience-modal-gallery">
            <img
              src={images[activeIndex]}
              alt={`${title} ${activeIndex + 1}`}
              className="experience-modal-main-image"
            />
            <div className="experience-modal-thumbs">
              {images.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  className={`experience-modal-thumb${index === activeIndex ? " active" : ""}`}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Zobrazit fotografii ${index + 1}`}
                >
                  <img src={image} alt="" />
                </button>
              ))}
            </div>
          </div>

          <div className="experience-modal-content">
            <p>{description}</p>
            {highlights.length > 0 && (
              <div className="experience-modal-highlights">
                {highlights.map((highlight) => (
                  <div key={highlight} className="experience-modal-highlight">
                    <span>⬡</span>
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
