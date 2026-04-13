import type { ApiaryContent } from "../types/content";

const FALLBACK_BEE_IMAGE = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&auto=format";
const FALLBACK_API_IMAGE = "https://images.unsplash.com/photo-1585236904507-7a02e5f4d793?w=800&q=80&auto=format";

type Props = { apiary: ApiaryContent };

export function ApiarySection({ apiary }: Props) {
  return (
    <>
      {/* Bydlení se včelami */}
      <section id="vcelin" className="apiary section-pad">
        <div className="container">
          <div className="apiary-grid">
            <div className="apiary-images reveal-left">
              <img
                className="img-main"
                src={apiary.beeLivingImage?.url || FALLBACK_BEE_IMAGE}
                alt={apiary.beeLivingImage?.alt || apiary.beeLivingTitle}
              />
              <div className="img-badge">🐝</div>
            </div>

            <div className="reveal-right">
              <div className="section-eyebrow">{apiary.beeLivingHighlight}</div>
              <h2 className="section-title">{apiary.beeLivingTitle}</h2>
              <p className="section-desc" style={{ marginBottom: "32px" }}>
                {apiary.beeLivingText}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* API terapie */}
      <section id="apiterapie" className="apiary section-pad" style={{ background: "var(--color-surface, #f9f6f0)" }}>
        <div className="container">
          <div className="apiary-grid apiary-grid--reversed">
            <div className="reveal-left">
              <div className="section-eyebrow">{apiary.apiTherapyHighlight}</div>
              <h2 className="section-title">{apiary.apiTherapyTitle}</h2>
              <p className="section-desc" style={{ marginBottom: "32px" }}>
                {apiary.apiTherapyText}
              </p>
            </div>

            <div className="apiary-images reveal-right">
              <img
                className="img-main"
                src={apiary.apiTherapyImage?.url || FALLBACK_API_IMAGE}
                alt={apiary.apiTherapyImage?.alt || apiary.apiTherapyTitle}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
