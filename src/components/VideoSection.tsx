import { useEffect, useState } from "react";
import type { VideoSectionData, VideoCard } from "../types";
import type { T } from "../i18n";
import { asset } from "../utils/asset";

type Props = {
  t: T;
  data: VideoSectionData;
};

/**
 * Stejná 3-sloupcová mřížka jako OfferingsSection (vizuálně shodné karty).
 * Klik na kartu otevře lightbox s přehrávačem.
 */
export function VideoSection({ t, data }: Props) {
  const [active, setActive] = useState<VideoCard | null>(null);

  // Zamknutí scrollu při otevřeném lightboxu + ESC zavření
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setActive(null); };
    document.body.classList.add("modal-open");
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <section className="video-section section-pad" id="videa" aria-labelledby="videos-title">
      <div className="container">
        <div className="offerings-head reveal">
          <div>
            <div className="section-eyebrow">{data.sectionEyebrow}</div>
            <h2 id="videos-title" className="section-title">
              {data.sectionTitle} <em>{data.sectionTitleAccent}</em>
            </h2>
          </div>
          <p className="section-desc">{data.sectionDesc}</p>
        </div>

        <div className="offerings-grid">
          {data.cards.map((card, i) => (
            <button
              key={card.id}
              type="button"
              className="offerings-card video-tile reveal"
              style={{ transitionDelay: `${i * 0.08}s` }}
              onClick={() => setActive(card)}
              aria-label={`${card.title} — ${t.common.watchVideo}`}
            >
              <div className="offerings-card-media video-tile-media">
                <img
                  src={asset(card.poster || "/logo.png")}
                  alt={card.title}
                  loading="lazy"
                />
                <span className="video-tile-play" aria-hidden="true">▶</span>
              </div>
              <div className="offerings-card-body">
                <div className="offerings-card-eyebrow">{card.eyebrow}</div>
                <h3>{card.title}</h3>
                <span className="offerings-card-cta">{t.common.watchVideo}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {active && <VideoLightbox card={active} t={t} onClose={() => setActive(null)} />}
    </section>
  );
}

function VideoLightbox({ card, t, onClose }: { card: VideoCard; t: T; onClose: () => void }) {
  const isMp4 = /\.mp4($|\?)/i.test(card.videoUrl);
  return (
    <div
      className="video-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={card.title}
      onClick={onClose}
    >
      <button className="video-lightbox-close" onClick={onClose} aria-label={t.common.close}>✕</button>
      <div className="video-lightbox-frame" onClick={(e) => e.stopPropagation()}>
        {isMp4 ? (
          <video controls autoPlay poster={card.poster ? asset(card.poster) : undefined}>
            <source src={asset(card.videoUrl)} type="video/mp4" />
          </video>
        ) : (
          <iframe
            src={`${card.videoUrl}${card.videoUrl.includes("?") ? "&" : "?"}autoplay=1`}
            title={card.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
    </div>
  );
}
