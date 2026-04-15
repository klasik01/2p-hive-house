import type { ApitherapyData } from "../../types";
import type { T } from "../../i18n";
import { cs } from "../../i18n";
import { asset } from "../../utils/asset";
import { Icon } from "../ui/Icon";
import { apitherapyData as defaultData } from "../../data/homepage";

type Props = {
  data?: ApitherapyData;
  t?: T;
  id?: string;
};

/**
 * Sekce "Apiterapie — léčivá síla včel".
 * Plug-and-play: bez props vykreslí defaultní obsah z homepage.json.
 */
export function ApitherapySection({ data = defaultData, t = cs, id = "apiterapie" }: Props) {
  const titleId = `${id}-title`;
  return (
    <section className="section-pad apitherapy-section" id={id} aria-labelledby={titleId}>
      <div className="container">
        <div className="hook-grid">
          <div className="reveal-left">
            <div className="section-eyebrow">{data.eyebrow}</div>
            <h2 id={titleId} className="section-title apitherapy-title">
              {data.title} <em>{data.titleAccent}</em>
            </h2>

            <p className="apitherapy-text apitherapy-text-lead">{data.text1}</p>
            <p className="apitherapy-text">{data.text2}</p>

            <div className="apitherapy-benefits">
              {data.benefits.map((b) => (
                <div key={b.id} className="apitherapy-benefit-card">
                  <div className="apitherapy-benefit-icon" aria-hidden="true">
                    <Icon name={b.icon} size={22} />
                  </div>
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
