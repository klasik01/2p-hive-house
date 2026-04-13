import type { T } from "../i18n";

type Props = { t: T };

export function LocationSection({ t }: Props) {
  const tl = t.location;

  return (
    <section id="lokalita" className="location section-pad">
      <div className="container">
        <div className="reveal" style={{ marginBottom: "40px" }}>
          <div className="section-eyebrow">{tl.eyebrow}</div>
          <h2 className="section-title">
            {tl.title} <em>{tl.titleAccent}</em>
          </h2>
          <p className="section-desc">{tl.desc}</p>
        </div>

        <div className="location-hero reveal">
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80&auto=format"
            alt="Krajina kolem 2P Hive House"
            loading="lazy"
          />
          <div className="location-hero-overlay">
            <div className="location-hero-text">
              <h2>{tl.hero_title}</h2>
              <p>{tl.hero_desc}</p>
            </div>
          </div>
        </div>

        <div className="location-attractions">
          {tl.attractions.map((attr, idx) => (
            <div key={attr.title} className="location-attraction reveal" style={{ transitionDelay: `${idx * 0.07}s` }}>
              <div className="location-attraction-icon">{attr.icon}</div>
              <div>
                <h4>{attr.title}</h4>
                <p>{attr.desc}</p>
                <span className="location-attraction-dist">📍 {attr.dist}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
