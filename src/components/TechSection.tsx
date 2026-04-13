import type { T } from "../i18n";

type Props = { t: T };

export function TechSection({ t }: Props) {
  const tt = t.tech;

  return (
    <section id="technologie" className="tech section-pad">
      <div className="container">
        <div className="reveal" style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 0" }}>
          <div className="section-eyebrow">{tt.eyebrow}</div>
          <h2 className="section-title">
            {tt.title} <em>{tt.titleAccent}</em>
          </h2>
          <p className="section-desc" style={{ margin: "0 auto" }}>{tt.desc}</p>
        </div>

        <div className="tech-grid">
          {tt.cards.map((card, idx) => (
            <div
              key={card.title}
              className="tech-card reveal"
              style={{ transitionDelay: `${idx * 0.07}s` }}
            >
              <div className="tech-card-icon">{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
