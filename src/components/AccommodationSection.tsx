import { useState } from "react";
import type { T } from "../i18n";

type Props = { t: T };

const IMAGES = [
  "https://images.unsplash.com/photo-1565374395542-0ce18882c857?w=800&q=80&auto=format",
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80&auto=format",
  "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80&auto=format",
  "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80&auto=format",
];

export function AccommodationSection({ t }: Props) {
  const ta = t.accommodation;
  const [activeImg, setActiveImg] = useState(0);

  return (
    <section id="ubytovani" className="accommodation section-pad">
      <div className="container">
        <div className="reveal" style={{ marginBottom: "48px" }}>
          <div className="section-eyebrow">{ta.eyebrow}</div>
          <h2 className="section-title">
            {ta.title} <em>{ta.titleAccent}</em>
          </h2>
          <p className="section-desc">{ta.desc}</p>
        </div>

        <div className="accommodation-grid">
          {/* Galerie */}
          <div className="accommodation-media reveal-left">
            <img
              className="media-main"
              src={IMAGES[activeImg]}
              alt="Interiér 2P Hive House"
            />
            <div className="media-thumbs">
              {IMAGES.map((src, idx) => (
                <img
                  key={src}
                  src={src}
                  alt={`Pohled ${idx + 1}`}
                  className={idx === activeImg ? "active" : ""}
                  onClick={() => setActiveImg(idx)}
                  loading="lazy"
                />
              ))}
            </div>
          </div>

          {/* Popis */}
          <div className="reveal-right">
            <div className="accommodation-features">
              {ta.features.map((f) => (
                <div key={f.label} className="accommodation-feature">
                  <span className="feat-icon">{f.icon}</span>
                  <span>{f.label}</span>
                </div>
              ))}
            </div>

            <div className="accommodation-extras">
              {ta.extras.map((e) => (
                <div key={e.title} className="accommodation-extra">
                  <h4>{e.title}</h4>
                  <p>{e.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-xl">
              <a href="#rezervace" className="btn btn-primary">
                🐝 Rezervovat pobyt
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
