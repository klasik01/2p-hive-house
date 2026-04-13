import { useState } from "react";
import type { T } from "../i18n";
import { ExperienceModal } from "../components/ExperienceModal";
import { RouteLink } from "../lib/router";

type Props = {
  t: T;
  onVoucherClick: () => void;
};

const gallery = [
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1400&q=80&auto=format",
  "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1400&q=80&auto=format",
  "https://images.unsplash.com/photo-1494526585095-c41746248156?w=1400&q=80&auto=format",
  "https://images.unsplash.com/photo-1505693534291-5b8d23c1b92f?w=1400&q=80&auto=format",
];

const bullets = [
  "Ložnice pro odpočinek ve dvou",
  "Soukromá terasa s výhledem do přírody",
  "Koupelna, sprcha a základní kuchyňské zázemí",
  "Klid, soukromí a pohodlné parkování",
];

export function AccommodationPage({ t, onVoucherClick }: Props) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <section className="page-hero page-hero-accommodation">
        <div className="container page-hero-inner">
          <div className="page-hero-copy reveal visible">
            <div className="section-eyebrow">Ubytování</div>
            <h1 className="section-title">
              {t.accommodation.title} na <em>jedné stránce</em>
            </h1>
            <p className="section-desc">
              Tady najdou hosté konkrétní představu o interiéru, vybavení, soukromí i atmosféře pobytu. Hlavní stránka
              je navede, detail jim pomůže rozhodnout se.
            </p>
            <div className="page-hero-actions">
              <RouteLink to="/rezervace" className="btn btn-primary">Rezervovat pobyt</RouteLink>
              <button type="button" className="btn btn-outline" onClick={() => setShowModal(true)}>
                Otevřít popup s fotkami
              </button>
              <button type="button" className="btn btn-outline-honey" onClick={onVoucherClick}>
                Koupit poukázku
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="detail-layout section-pad">
        <div className="container">
          <div className="detail-layout-grid">
            <div className="detail-copy reveal-left">
              <div className="section-eyebrow">Co hosté uvidí</div>
              <h2 className="section-title">Atmosféra, komfort a soukromí <em>bez zbytečného chaosu</em></h2>
              <p className="section-desc">
                Detail ubytování má jasně ukázat, že nejde jen o hezkou fotku. Hosté potřebují rozumět tomu, co je čeká,
                jaké mají zázemí a proč je pobyt v Hive House jiný než běžné ubytování.
              </p>
              <div className="detail-checklist">
                {bullets.map((item) => (
                  <div key={item} className="detail-checklist-item">
                    <span>⬡</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="detail-gallery reveal-right">
              {gallery.map((image, index) => (
                <img key={image} src={image} alt={`Ubytování ${index + 1}`} />
              ))}
            </div>
          </div>

          <div className="detail-story-grid">
            <article className="detail-story-card reveal">
              <div className="landing-card-eyebrow">Ráno v Hive House</div>
              <h3>Klidný start dne bez rušivých podnětů</h3>
              <p>
                Ranní káva na terase, výhled do krajiny a pocit, že nikam nemusíte. Tahle část stránky má prodávat
                atmosféru stejně silně jako samotné vybavení.
              </p>
            </article>

            <article className="detail-story-card reveal">
              <div className="landing-card-eyebrow">Večer a odpočinek</div>
              <h3>Pobyt, který má být zážitkem, ne jen přespáním</h3>
              <p>
                Komfortní interiér, klid a propojení s přírodou vytváří ideální prostor pro páry, které chtějí zpomalit
                a být chvíli mimo běžný provoz.
              </p>
            </article>
          </div>
        </div>
      </section>

      {showModal && (
        <ExperienceModal
          title="Ubytování v Hive House"
          subtitle="Fotky a základní informace"
          description="Popup slouží jako rychlý náhled přímo z homepage nebo z detailu. Návštěvník si díky němu udělá rychlou představu, aniž by ztratil kontext."
          images={gallery}
          highlights={bullets}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
