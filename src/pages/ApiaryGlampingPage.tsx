import type { T } from "../i18n";
import { ApiarySection } from "../components/ApiarySection";
import { GlampingSection } from "../components/GlampingSection";
import { RouteLink } from "../lib/router";

type Props = { t: T };

export function ApiaryGlampingPage({ t }: Props) {
  return (
    <>
      <section className="page-hero page-hero-apiary">
        <div className="container page-hero-inner">
          <div className="page-hero-copy reveal visible">
            <div className="section-eyebrow">Včelín & glamping</div>
            <h1 className="section-title">
              Samostatná stránka pro to, co dělá Hive House <em>nezaměnitelným</em>
            </h1>
            <p className="section-desc">
              Tady je prostor vysvětlit apiterapii, kontakt s přírodou i důvod, proč je pobyt nad úly zážitkem, který si
              hosté zapamatují.
            </p>
            <div className="page-hero-actions">
              <RouteLink to="/rezervace" className="btn btn-primary">Rezervovat pobyt</RouteLink>
              <RouteLink to="/ubytovani" className="btn btn-outline">Prohlédnout ubytování</RouteLink>
            </div>
          </div>
        </div>
      </section>

      <ApiarySection t={t} />
      <GlampingSection t={t} />
    </>
  );
}
