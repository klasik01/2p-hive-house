import { useEffect, useRef, useState } from "react";
import type { T } from "../i18n";

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1920&q=85&auto=format",
  "https://images.unsplash.com/photo-1504700610630-ac6aba3536d3?w=1920&q=85&auto=format",
  "https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=1920&q=85&auto=format",
];

type Props = {
  t: T;
  onVoucherClick: () => void;
};

export function HeroSection({ t, onVoucherClick }: Props) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [loadedImgs, setLoadedImgs] = useState<Set<number>>(new Set());
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setActiveIdx((i) => (i + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  useEffect(() => {
    HERO_IMAGES.forEach((src, idx) => {
      const img = new Image();
      img.onload = () => setLoadedImgs((s) => new Set(s).add(idx));
      img.src = src;
    });
  }, []);

  return (
    <section id="uvod" className="hero">
      <div className="hero-bg-stack">
        {HERO_IMAGES.map((src, idx) => (
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
            <span>{t.hero.eyebrow}</span>
          </div>

          <h1>
            {t.hero.title}
            <br />
            <em>{t.hero.titleAccent}</em>
          </h1>

          <p className="hero-desc">{t.hero.desc}</p>

          <div className="hero-actions">
            <a href="#rezervace" className="btn btn-primary">
              🐝 {t.hero.cta_rezervace}
            </a>
            <button className="btn btn-outline" onClick={onVoucherClick}>
              🎁 {t.hero.cta_poukázka}
            </button>
          </div>

          <div className="hero-stats">
            <div>
              <div className="hero-stat-num">{t.hero.stat_1_num}</div>
              <div className="hero-stat-label">{t.hero.stat_1_label}</div>
            </div>
            <div>
              <div className="hero-stat-num">{t.hero.stat_2_num}</div>
              <div className="hero-stat-label">{t.hero.stat_2_label}</div>
            </div>
            <div>
              <div className="hero-stat-num">{t.hero.stat_3_num}</div>
              <div className="hero-stat-label">{t.hero.stat_3_label}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-scroll">
        <div className="scroll-line" />
      </div>

      <div className="hero-dots">
        {HERO_IMAGES.map((_, idx) => (
          <button
            key={idx}
            className={idx === activeIdx ? "active" : ""}
            onClick={() => {
              setActiveIdx(idx);
              if (timerRef.current) clearInterval(timerRef.current);
              timerRef.current = setInterval(() => {
                setActiveIdx((i) => (i + 1) % HERO_IMAGES.length);
              }, 6000);
            }}
            aria-label={`Snímek ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
