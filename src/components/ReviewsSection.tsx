import { useEffect, useMemo, useRef, useState } from "react";
import type { T } from "../i18n";

type Props = { t: T; displayCount?: number };

export function ReviewsSection({ t, displayCount = 5 }: Props) {
  const tr = t.reviews;
  const reviews = useMemo(() => tr.reviews.slice(0, displayCount), [tr.reviews, displayCount]);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [visibleCount, setVisibleCount] = useState(3);
  const [activeIdx, setActiveIdx] = useState(0);
  const maxIndex = Math.max(0, reviews.length - visibleCount);

  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(1);
        return;
      }

      if (window.innerWidth < 1100) {
        setVisibleCount(2);
        return;
      }

      setVisibleCount(3);
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  useEffect(() => {
    setActiveIdx((current) => Math.min(current, maxIndex));
  }, [maxIndex]);

  useEffect(() => {
    if (maxIndex === 0) return;

    const timer = window.setInterval(() => {
      setActiveIdx((current) => (current >= maxIndex ? 0 : current + 1));
    }, 4500);

    return () => window.clearInterval(timer);
  }, [maxIndex]);

  useEffect(() => {
    const viewport = viewportRef.current;
    const firstCard = viewport?.querySelector<HTMLElement>(".reviews-card");

    if (!viewport || !firstCard) return;

    const gap = 24;
    const offset = activeIdx * (firstCard.offsetWidth + gap);
    viewport.scrollTo({ left: offset, behavior: "smooth" });
  }, [activeIdx, visibleCount]);

  const handlePrev = () => {
    setActiveIdx((current) => (current <= 0 ? maxIndex : current - 1));
  };

  const handleNext = () => {
    setActiveIdx((current) => (current >= maxIndex ? 0 : current + 1));
  };

  return (
    <section id="recenze" className="reviews section-pad">
      <div className="container">
        <div className="reviews-header reveal">
          <div className="section-eyebrow">{tr.eyebrow}</div>
          <h2 className="section-title">
            {tr.title} <em>{tr.titleAccent}</em>
          </h2>
        </div>

        <div className="reviews-slider reveal visible">
          <button type="button" className="reviews-nav reviews-nav-prev" onClick={handlePrev} aria-label="Předchozí recenze">
            ‹
          </button>

          <div className="reviews-viewport" ref={viewportRef}>
            <div className="reviews-track" style={{ ["--reviews-visible" as string]: visibleCount }}>
              {reviews.map((review, idx) => (
                <div
                  key={review.author}
                  className="reviews-card"
                  style={{ transitionDelay: `${idx * 0.07}s` }}
                >
                  <div className="reviews-card-top">
                    <div className="reviews-card-quote">“</div>
                    <div className="reviews-card-score">{review.rating}/5</div>
                  </div>
                  <p className="reviews-card-text">{review.text}</p>
                  <div className="reviews-card-author">
                    <div className="author-avatar">{review.initials}</div>
                    <div>
                      <div className="author-name">{review.author}</div>
                      <div className="author-location">{review.location}</div>
                    </div>
                  </div>
                  <div className="reviews-card-accent" />
                </div>
              ))}
            </div>
          </div>

          <button type="button" className="reviews-nav reviews-nav-next" onClick={handleNext} aria-label="Další recenze">
            ›
          </button>
        </div>

        <div className="reviews-dots" aria-label="Pozice slideru">
          {Array.from({ length: maxIndex + 1 }, (_, idx) => (
            <button
              key={idx}
              type="button"
              className={idx === activeIdx ? "active" : ""}
              onClick={() => setActiveIdx(idx)}
              aria-label={`Přejít na sadu recenzí ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
