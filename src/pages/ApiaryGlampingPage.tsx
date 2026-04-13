import type { ApiaryContent } from "../types/content";
import { ApiarySection } from "../components/ApiarySection";
import { GlampingSection } from "../components/GlampingSection";
import { RouteLink } from "../lib/router";

type Props = { apiary: ApiaryContent };

export function ApiaryGlampingPage({ apiary }: Props) {
  return (
    <>
      <section
        className="page-hero page-hero-apiary"
        style={
          apiary.heroImage?.url
            ? { backgroundImage: `url(${apiary.heroImage.url})` }
            : undefined
        }
      >
        <div className="container page-hero-inner">
          <div className="page-hero-copy reveal visible">
            <div className="section-eyebrow">{apiary.heroEyebrow}</div>
            <h1 className="section-title">
              {apiary.heroTitle} <em>{apiary.heroHighlight}</em>
            </h1>
            <p className="section-desc">{apiary.heroDescription}</p>
            <div className="page-hero-actions">
              <RouteLink to="/rezervace" className="btn btn-primary">Rezervovat pobyt</RouteLink>
              <RouteLink to="/ubytovani" className="btn btn-outline">Prohlédnout ubytování</RouteLink>
            </div>
          </div>
        </div>
      </section>

      <GlampingSection apiary={apiary} />
      <ApiarySection apiary={apiary} />
    </>
  );
}
