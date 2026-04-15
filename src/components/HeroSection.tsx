import { useEffect, useRef, useState } from "react";
import type { HeroData } from "../types";
import type { T } from "../i18n";
import { asset } from "../utils/asset";
import { VideoLightbox } from "./VideoLightbox";

type Props = {
  t: T;
  hero: HeroData;
  onVoucherClick: () => void;
  logoSrc?: string;
  logoAlt?: string;
};

export function HeroSection({
  t,
  hero,
  onVoucherClick,
  logoSrc = "/logo.png",
  logoAlt = "2P Hive House",
}: Props) {
  const images = hero.images.map(asset);
  const [activeIdx, setActiveIdx] = useState(0);
  const [showIntro, setShowIntro] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (images.length <= 1) return;
    timerRef.current = setInterval(() => {
      setActiveIdx((i) => (i + 1) % images.length);
    }, 6000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [images.length]);

  const hasIntroVideo = Boolean(hero.introVideoUrl);
  const introVideoLabel = hero.introVideoLabel || t.common.watchVideo;

  const Badge = hasIntroVideo ? "button" : "div";

  return (
    <section id="uvod" className="hero" aria-labelledby="hero-title">
      <div className="hero-bg-stack" aria-hidden="true">
        {images.map((src, idx) => (
          <div
            key={src + idx}
            className={`hero-bg${idx === activeIdx ? " is-active" : ""}`}
            style={{ backgroundImage: `url(${src})` }}
          />
        ))}
        <div className="hero-overlay" />
      </div>

      <div className="container">
        <div className="hero-content reveal visible">
          <Badge
            className={`hero-logo-badge${hasIntroVideo ? " is-playable" : ""}`}
            {...(hasIntroVideo
              ? {
                  type: "button" as const,
                  onClick: () => setShowIntro(true),
                  "aria-label": introVideoLabel,
                }
              : {})}
          >
            {hasIntroVideo && <span className="hero-logo-ring" aria-hidden="true" />}
            <img src={asset(logoSrc)} alt={logoAlt} className="hero-logo" />
            {hasIntroVideo && (
              <span className="hero-logo-play" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            )}
          </Badge>

          <div className="hero-eyebrow">
            <span className="hero-eyebrow-line" aria-hidden="true" />
            <span>{hero.subtitle}</span>
          </div>

          <h1 id="hero-title">
            <span className="hero-word hero-word-1">{hero.title}</span>{" "}
            <em className="hero-word hero-word-2">{hero.titleAccent}</em>
          </h1>

          <p className="hero-desc">{hero.text}</p>

          <div className="hero-actions">
            <a href={hero.ctaReserveHref} className="btn btn-primary">
              {hero.ctaReserveLabel}
            </a>
            <button type="button" className="btn btn-white" onClick={onVoucherClick}>
              {hero.ctaVoucherLabel}
            </button>
          </div>
        </div>
      </div>

      {images.length > 1 && (
        <div className="hero-dots">
          {images.map((_, idx) => (
            <button
              key={idx}
              className={idx === activeIdx ? "active" : ""}
              onClick={() => setActiveIdx(idx)}
              aria-label={`Snímek ${idx + 1}`}
            />
          ))}
        </div>
      )}

      {showIntro && hero.introVideoUrl && (
        <VideoLightbox
          url={hero.introVideoUrl}
          title={introVideoLabel}
          closeLabel={t.common.close}
          onClose={() => setShowIntro(false)}
        />
      )}
    </section>
  );
}
