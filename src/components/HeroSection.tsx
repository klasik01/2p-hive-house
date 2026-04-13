import { useEffect, useRef, useState } from "react";
import type { HomepageHero } from "../types/content";
import { RouteLink } from "../lib/router";

type Props = {
  hero: HomepageHero;
  onVoucherClick: () => void;
};

export function HeroSection({ hero, onVoucherClick }: Props) {
  const images = hero.images.map((img) => img.url);
  const [activeIdx, setActiveIdx] = useState(0);
  const [loadedImgs, setLoadedImgs] = useState<Set<number>>(new Set());
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (images.length === 0) return;
    timerRef.current = setInterval(() => {
      setActiveIdx((i) => (i + 1) % images.length);
    }, 6000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [images.length]);

  useEffect(() => {
    images.forEach((src, idx) => {
      const img = new Image();
      img.onload = () => setLoadedImgs((s) => new Set(s).add(idx));
      img.src = src;
    });
  }, [images]);

  return (
    <section id="uvod" className="hero">
      <div className="hero-bg-stack">
        {images.map((src, idx) => (
          <div
            key={src}
            className={`hero-bg${loadedImgs.has(idx) ? " loaded" : ""}${idx === activeIdx ? " is-active" : ""}`}
            style={{ backgroundImage: `url(${src})` }}
          />
        ))}
        <div className="hero-overlay" />
      </div>

      <div className="container">
        <div className="hero-content reveal visible">
          <div className="hero-eyebrow">
            <div className="hero-eyebrow-line" />
            <span>{hero.subtitle}</span>
          </div>

          <h1>
            {hero.title}
            <br />
            <em>{hero.titleAccent}</em>
          </h1>

          <p className="hero-desc">{hero.text}</p>

          <div className="hero-actions">
            <RouteLink to={hero.ctaReserveHref} className="btn btn-primary">
              {hero.ctaReserveLabel}
            </RouteLink>
            <button className="btn btn-white" onClick={onVoucherClick}>
              {hero.ctaVoucherLabel}
            </button>
          </div>

          <div className="hero-stats">
            <div>
              <div className="hero-stat-num">{hero.stat1Num}</div>
              <div className="hero-stat-label">{hero.stat1Label}</div>
            </div>
            <div>
              <div className="hero-stat-num">{hero.stat2Num}</div>
              <div className="hero-stat-label">{hero.stat2Label}</div>
            </div>
            <div>
              <div className="hero-stat-num">{hero.stat3Num}</div>
              <div className="hero-stat-label">{hero.stat3Label}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-scroll">
        <div className="scroll-line" />
      </div>

      <div className="hero-dots">
        {images.map((_, idx) => (
          <button
            key={idx}
            className={idx === activeIdx ? "active" : ""}
            onClick={() => {
              setActiveIdx(idx);
              if (timerRef.current) clearInterval(timerRef.current);
              timerRef.current = setInterval(() => {
                setActiveIdx((i) => (i + 1) % images.length);
              }, 6000);
            }}
            aria-label={`Snímek ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
