import { useState } from "react";
import type { Promotion } from "../types/content";

type Props = {
  items: Promotion[];
};

export function PromoPopup({ items }: Props) {
  const [dismissed, setDismissed] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);

  if (dismissed || items.length === 0) return null;

  const current = items[currentIdx];

  return (
    <div className="promo-popup">
      <button
        className="promo-popup-close"
        onClick={() => setDismissed(true)}
        aria-label="Zavřít"
      >
        ✕
      </button>

      <span className="badge badge-honey">🐝 {current.badge}</span>

      <h4>{current.title}</h4>
      <p>{current.text}</p>

      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        <a href={current.ctaHref} className="btn btn-primary" style={{ fontSize: "13px", padding: "10px 20px" }}>
          {current.ctaLabel}
        </a>
        {items.length > 1 && (
          <button
            className="btn btn-secondary"
            style={{ fontSize: "13px", padding: "10px 16px" }}
            onClick={() => setCurrentIdx((i) => (i + 1) % items.length)}
          >
            Další →
          </button>
        )}
      </div>

      {items.length > 1 && (
        <div style={{ display: "flex", gap: "6px", marginTop: "12px" }}>
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIdx(i)}
              style={{
                width: i === currentIdx ? "20px" : "6px",
                height: "6px",
                borderRadius: "9999px",
                background: i === currentIdx ? "var(--honey)" : "rgba(255,255,255,0.2)",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "0.3s ease",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
