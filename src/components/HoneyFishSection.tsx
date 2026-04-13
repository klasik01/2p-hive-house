import type { T } from "../i18n";

type Props = {
  t: T;
  onFishingClick: () => void;
};

export function HoneyFishSection({ t, onFishingClick }: Props) {
  const th = t.honey_fish;

  return (
    <section id="med-rybareni" className="honey-fish section-pad">
      <div className="container">
        <div className="honey-fish-grid">
          {/* Med */}
          <div className="honey-fish-card reveal-left">
            <img
              src="https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=700&q=80&auto=format"
              alt="Vlastní med 2P Hive House"
              loading="lazy"
            />
            <div className="honey-fish-card-content">
              <h3>🍯 {th.honey_title}</h3>
              <p>{th.honey_desc}</p>
              <a href="#kontakt" className="card-cta">{th.honey_cta} →</a>
            </div>
          </div>

          {/* Rybaření */}
          <div className="honey-fish-card reveal-right">
            <img
              src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=700&q=80&auto=format"
              alt="Rybaření na rybníku"
              loading="lazy"
            />
            <div className="honey-fish-card-content">
              <h3>🎣 {th.fish_title}</h3>
              <p>{th.fish_desc}</p>
              <button className="card-cta" onClick={onFishingClick} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                {th.fish_cta} →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
