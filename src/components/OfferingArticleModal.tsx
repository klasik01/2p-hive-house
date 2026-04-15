import { useEffect } from "react";
import type { OfferingArticle } from "../types";
import { asset } from "../utils/asset";
import { Icon } from "./Icon";

type Props = {
  article: OfferingArticle;
  onClose: () => void;
};

/**
 * Dialog s článkem o konkrétní nabídce (Glamping / Rybaření / Gastronomie).
 *
 * Design:
 *  - Velký hero obrázek nahoře (cover).
 *  - Editorial typografie v duchu homepage .about-section.
 *  - Highlights v honey-tónovaných chipech.
 *  - Volitelný CTA button.
 *  - Mobile-first, na telefonu full-screen, na desktopu centrovaný panel.
 *  - Esc + klik mimo + křížek = zavřít.
 */
export function OfferingArticleModal({ article, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="article-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="article-modal-title"
      onClick={onClose}
    >
      <div className="article-modal" onClick={(e) => e.stopPropagation()}>
        <button
          className="article-modal-close"
          onClick={onClose}
          aria-label="Zavřít"
          type="button"
        >
          ✕
        </button>

        <div
          className="article-modal-hero"
          style={{ backgroundImage: `url(${asset(article.image)})` }}
          role="img"
          aria-label={article.title}
        >
          <div className="article-modal-hero-overlay" aria-hidden="true" />
          <div className="article-modal-hero-content">
            <div className="article-modal-eyebrow">{article.eyebrow}</div>
            <h2 id="article-modal-title" className="article-modal-title">
              {article.title}
            </h2>
          </div>
        </div>

        <div className="article-modal-body">
          <p className="article-modal-lead">{article.lead}</p>

          {article.paragraphs.map((p, i) => (
            <p key={i} className="article-modal-paragraph">{p}</p>
          ))}

          {article.highlights && article.highlights.length > 0 && (
            <ul className="article-modal-highlights">
              {article.highlights.map((h, i) => (
                <li key={i}>
                  <span className="article-modal-highlight-icon" aria-hidden="true">
                    <Icon name={h.icon} size={18} />
                  </span>
                  <span>{h.text}</span>
                </li>
              ))}
            </ul>
          )}

          {article.ctaLabel && article.ctaHref && (
            <div className="article-modal-actions">
              <a
                className="btn btn-primary"
                href={article.ctaHref}
                onClick={onClose}
              >
                {article.ctaLabel}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
