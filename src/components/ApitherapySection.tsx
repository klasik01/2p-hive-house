import type { ApitherapyData } from "../types";
import type { T } from "../i18n";
import { asset } from "../utils/asset";

/**
 * Sekce "Apiterapie — léčivá síla včel".
 * Strukturně + vizuálně shodná s hive-house (třídy hook-grid, hook-visual,
 * apitherapy-benefits). Data přijdou z homepage.json.
 */
export function ApitherapySection({ t, data }: { t: T; data: ApitherapyData }) {
  return (
    <section className="section-pad apitherapy-section" id="apiterapie" aria-labelledby="apitherapy-title">
      <div className="container">
        <div className="hook-grid">
          <div className="reveal-left">
            <div className="section-eyebrow">{data.eyebrow}</div>
            <h2 id="apitherapy-title" className="section-title apitherapy-title">
              {data.title} <em>{data.titleAccent}</em>
            </h2>

            <p className="apitherapy-text apitherapy-text-lead">{data.text1}</p>
            <p className="apitherapy-text">{data.text2}</p>

            <div className="apitherapy-benefits">
              {data.benefits.map((b) => (
                <div key={b.id} className="apitherapy-benefit-card">
                  <div className="apitherapy-benefit-icon" aria-hidden="true">{b.icon}</div>
                  <p>{b.text}</p>
                </div>
              ))}
            </div>

            <div className="apitherapy-actions">
              <a href={data.ctaPrimaryHref} className="btn btn-primary">
                {data.ctaPrimaryLabel}
              </a>
              <a href={data.ctaSecondaryHref} className="btn btn-outline">
                {data.ctaSecondaryLabel}
              </a>
            </div>
          </div>

          <div className="hook-visual reveal-right">
            <img src={asset(data.imageMain)} alt={t.apitherapy.imageAlt} className="hook-visual-main" />
            <div className="hook-visual-stack">
              {data.imageSmall1 && <img src={asset(data.imageSmall1)} alt="" />}
              {data.imageSmall2 && <img src={asset(data.imageSmall2)} alt="" />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
