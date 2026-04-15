import type { AboutData } from "../types";
import { Icon } from "./Icon";

/**
 * Sekce „O Hive House" — editorial intro + 3 Q&A bloky.
 * Vizuálně laděná do palety hero (bílé pozadí, medové akcenty,
 * dekorativní hexagonální vzor v rohu).
 */
export function AboutSection({ data }: { data: AboutData }) {
  return (
    <section className="about-section section-pad" id="o-nas" aria-labelledby="about-title">
      <div className="about-section-bg" aria-hidden="true">
        <span className="hex hex-a" />
        <span className="hex hex-b" />
      </div>

      <div className="container">
        <div className="about-head reveal">
          <div className="section-eyebrow">{data.eyebrow}</div>
          <h2 id="about-title" className="section-title big-title">
            {data.title} <em>{data.titleAccent}</em>
          </h2>
          <p className="about-lead">{data.lead}</p>
        </div>

        <div className="about-grid">
          {data.blocks.map((b, i) => (
            <article key={b.id} className="about-card reveal" style={{ transitionDelay: `${i * 0.08}s` }}>
              <div className="about-card-icon" aria-hidden="true">
                <Icon name={b.icon} size={28} />
              </div>
              <h3 className="about-card-question">{b.question}</h3>
              <p className="about-card-answer">{b.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
