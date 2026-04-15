import { useEffect, useRef, useState } from "react";
import type { HeroData } from "../types";

type Props = {
  hero: HeroData;
  onVoucherClick: () => void;
  /** Cesta k logu zobrazenému uprostřed banneru (SEO + accessibility přes alt). */
  logoSrc?: string;
  logoAlt?: string;
};

export function HeroSection({ hero, onVoucherClick, logoSrc = "/logo.png", logoAlt = "2P Hive House" }: Props) {
  const images = hero.images;
  const [activeIdx, setActiveIdx] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (images.length <= 1) return;
    timerRef.current = setInterval(() => {
      setActiveIdx((i) => (i + 1) % images.length);
    }, 6000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [images.length]);

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
          <img src={logoSrc} alt={logoAlt} className="hero-logo" />

          <div className="hero-eyebrow">
            <span className="hero-eyebrow-line" aria-hidden="true" />
            <span>{hero.subtitle}</span>
          </div>

          <h1 id="hero-title">
            {hero.title}
            <br />
            <em>{hero.titleAccent}</em>
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

          <div className="hero-stats" role="list">
            {hero.stats.map((s, i) => (
              <div key={i} role="listitem">
                <div className="hero-stat-num">{s.num}</div>
                <div className="hero-stat-label">{s.label}</div>
              </div>
            ))}
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
    </section>
  );
}
