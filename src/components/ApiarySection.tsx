import type { T } from "../i18n";
import { RouteLink } from "../lib/router";

type Props = { t: T };

export function ApiarySection({ t }: Props) {
  const ta = t.apiary;

  return (
    <section id="vcelin" className="apiary section-pad">
      <div className="container">
        <div className="apiary-grid">
          {/* Obrázky */}
          <div className="apiary-images reveal-left">
            <img
              className="img-main"
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&auto=format"
              alt={ta.img_alt_main}
            />
            <img
              className="img-accent"
              src="https://images.unsplash.com/photo-1585236904507-7a02e5f4d793?w=400&q=80&auto=format"
              alt={ta.img_alt_accent}
            />
            <div className="img-badge">🐝 {ta.badge}</div>
          </div>

          {/* Text */}
          <div className="reveal-right">
            <div className="section-eyebrow">{ta.eyebrow}</div>
            <h2 className="section-title">
              {ta.title} <em>{ta.titleAccent}</em>
            </h2>
            <p className="section-desc" style={{ marginBottom: "32px" }}>
              {ta.desc}
            </p>

            <div className="apiary-features">
              {ta.features.map((feature) => (
                <div key={feature} className="apiary-feature">
                  <span className="feat-icon">⬡</span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <div className="mt-xl">
              <RouteLink to="/vcelin-glamping" className="btn btn-ghost">
                {ta.cta} →
              </RouteLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
