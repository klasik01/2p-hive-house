import { useState } from "react";
import type { VideoSectionData, VideoCard } from "../types";

/**
 * Stejný layout jako Offerings (3 karty), ale každá karta je rozbalovací
 * a obsahuje pouze video. Žádný popis uvnitř.
 */
export function VideoSection({ data }: { data: VideoSectionData }) {
  const [openId, setOpenId] = useState<string | null>(null);

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

        <div className="video-grid">
          {data.cards.map((card) => {
            const isOpen = openId === card.id;
            return (
              <article key={card.id} className={`video-card${isOpen ? " open" : ""}`}>
                <button
                  className="video-card-header"
                  onClick={() => setOpenId(isOpen ? null : card.id)}
                  aria-expanded={isOpen}
                  aria-controls={`video-body-${card.id}`}
                >
                  <div className="video-card-header-title">
                    <span className="eyebrow">{card.eyebrow}</span>
                    <h3>{card.title}</h3>
                  </div>
                  <span className="video-card-toggle" aria-hidden="true">+</span>
                </button>
                <div id={`video-body-${card.id}`} className="video-card-body">
                  <div className="video-card-frame">
                    {isOpen && <VideoFrame card={card} />}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function VideoFrame({ card }: { card: VideoCard }) {
  const isMp4 = /\.mp4($|\?)/i.test(card.videoUrl);
  if (isMp4) {
    return (
      <video controls autoPlay poster={card.poster}>
        <source src={card.videoUrl} type="video/mp4" />
      </video>
    );
  }
  return (
    <iframe
      src={card.videoUrl}
      title={card.title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
}
