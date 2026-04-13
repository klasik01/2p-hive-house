import type { T } from "../i18n";
import { RouteLink } from "../lib/router";

type Props = {
  t: T;
  onFishingClick: () => void;
};

const permitSteps = [
  "Vyberte datum rybolovu a počet osob.",
  "Vyplňte kontaktní údaje a případnou slevu.",
  "Dokončete objednávku povolenky online.",
];

const permitInfo = [
  { title: "Soukromý rybník", text: "Rybolov probíhá přímo u objektu, bez dojíždění a složité organizace." },
  { title: "Jednoduchý nákup", text: "Povolenka je dostupná přímo z webu a hostům jasně vysvětluje celý postup." },
  { title: "Doplněk k pobytu", text: "Rybaření funguje jako samostatný zážitek i jako příjemné zpestření víkendu." },
];

export function FishingPage({ t, onFishingClick }: Props) {
  return (
    <>
      <section className="page-hero page-hero-fishing">
        <div className="container page-hero-inner">
          <div className="page-hero-copy reveal visible">
            <div className="section-eyebrow">Rybaření</div>
            <h1 className="section-title">
              Rybářská povolenka už není schovaná, ale <em>jasně nabídnutá</em>
            </h1>
            <p className="section-desc">
              Stránka vysvětluje, že hosté mohou na soukromém rybníku rybařit legálně a jednoduše. Nejde jen o zmínku
              ve footeru, ale o plnohodnotnou službu s vlastním detailem.
            </p>
            <div className="page-hero-actions">
              <button type="button" className="btn btn-primary" onClick={onFishingClick}>
                Koupit povolenku
              </button>
              <RouteLink to="/rezervace" className="btn btn-outline">
                Rezervovat pobyt
              </RouteLink>
            </div>
          </div>
        </div>
      </section>

      <section className="detail-layout section-pad">
        <div className="container">
          <div className="detail-layout-grid">
            <div className="detail-copy reveal-left">
              <div className="section-eyebrow">Jak to funguje</div>
              <h2 className="section-title">Jednoduchý proces od kliknutí po <em>rybářský klid</em></h2>
              <div className="detail-checklist">
                {permitSteps.map((item) => (
                  <div key={item} className="detail-checklist-item">
                    <span>0{permitSteps.indexOf(item) + 1}</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="permit-card-stack reveal-right">
              <div className="permit-card accent">
                <div className="landing-card-eyebrow">Cena</div>
                <h3>{t.fishing.price_adult} Kč / osoba</h3>
                <p>Zvýhodněná cena pro hasiče z Hojanovic a bezplatná varianta pro děti z Hojanovic zůstává zachovaná.</p>
              </div>
              <div className="permit-card">
                <div className="landing-card-eyebrow">Pro koho</div>
                <h3>Hosté i návštěvníci</h3>
                <p>Rybolov může být hlavní plán dne i příjemná součást pobytu v Hive House.</p>
              </div>
            </div>
          </div>

          <div className="landing-highlights-grid">
            {permitInfo.map((item, index) => (
              <article key={item.title} className="landing-card reveal" style={{ transitionDelay: `${index * 0.08}s` }}>
                <div className="landing-card-eyebrow">{item.title}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
