import { useState } from "react";
import type { T } from "../i18n";
import { ExperienceModal } from "../components/ExperienceModal";

type Props = { t: T };

const trips = [
  {
    title: "Vodní nádrž Švihov",
    subtitle: "Krátký výlet",
    text: "Výhledy, klidná krajina a možnost lehké procházky. Ideální program na ráno nebo podvečer.",
    description:
      "Švihov je perfektní cíl pro hosty, kteří chtějí spojit pobyt v Hive House s nenáročným výletem. V detailním popupu se dá ukázat atmosféra lokality, délka výletu i proč se vyplatí vyrazit sem.",
    highlights: ["5 až 15 minut autem podle místa", "Lehká trasa a výhledy", "Vhodné i pro klidný podvečerní program"],
    images: [
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80&auto=format",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80&auto=format",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&q=80&auto=format",
    ],
  },
  {
    title: "Hrad Švihov",
    subtitle: "Památka",
    text: "Silný historický bod výletu pro hosty, kteří chtějí během pobytu i kus kultury a architektury.",
    description:
      "Hrad Švihov dává webu obsah, který je konkrétní a zároveň působivý. V popupu můžeme ukázat atmosféru místa, proč se tam vydat a pro jaký typ hostů je výlet ideální.",
    highlights: ["Historický zážitek", "Dobře dostupné autem", "Skvělé i při horším počasí"],
    images: [
      "https://images.unsplash.com/photo-1520637836862-4d197d17c13a?w=1200&q=80&auto=format",
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=1200&q=80&auto=format",
      "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=1200&q=80&auto=format",
    ],
  },
  {
    title: "Zámek Klenová a galerie",
    subtitle: "Kulturní tip",
    text: "Dobrá volba pro hosty, kteří chtějí kombinaci historie, architektury a příjemného odpoledne.",
    description:
      "Tady může popup fungovat jako mini průvodce. Krátce vysvětlí, co na místě čekat, kolik času si rezervovat a proč se výlet hodí i jako klidnější program mezi odpočinkem v Hive House.",
    highlights: ["Kulturní zastávka na pár hodin", "Park a okolní prostředí", "Vhodné pro páry i menší skupiny"],
    images: [
      "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1200&q=80&auto=format",
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=1200&q=80&auto=format",
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1200&q=80&auto=format",
    ],
  },
  {
    title: "Klatovy a okolní trasy",
    subtitle: "Půldenní program",
    text: "Historické centrum, kavárny a možnost propojit město s krátkou vycházkou v okolí.",
    description:
      "Ne každý host chce strávit celý pobyt jen u ubytování. Klatovy dávají skvělou alternativu pro půldenní program a na webu je dobré to ukázat i jako civilnější typ výletu.",
    highlights: ["Historické centrum", "Dobré gastro zastávky", "Snadné naplánování na půlden"],
    images: [
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1200&q=80&auto=format",
      "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1200&q=80&auto=format&sat=-20",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=80&auto=format",
    ],
  },
];

export function TripsPage({ t }: Props) {
  const [activeTrip, setActiveTrip] = useState<(typeof trips)[number] | null>(null);

  return (
    <>
      <section className="page-hero page-hero-trips">
        <div className="container page-hero-inner">
          <div className="page-hero-copy reveal visible">
            <div className="section-eyebrow">{t.location.eyebrow}</div>
            <h1 className="section-title">
              Okolí Hive House má vlastní stránku plnou <em>tipů a inspirace</em>
            </h1>
            <p className="section-desc">
              Místo jedné stručné sekce dostanou návštěvníci konkrétní výlety, kratší programy i možnosti, co dělat při
              různém počasí nebo délce pobytu.
            </p>
          </div>
        </div>
      </section>

      <section className="landing-highlights section-pad">
        <div className="container">
          <div className="landing-highlights-grid">
            {trips.map((trip, index) => (
              <article key={trip.title} className="landing-card reveal" style={{ transitionDelay: `${index * 0.08}s` }}>
                <div className="landing-card-eyebrow">{trip.subtitle}</div>
                <h3>{trip.title}</h3>
                <p>{trip.text}</p>
                <div className="landing-card-actions">
                  <button type="button" className="btn btn-primary" onClick={() => setActiveTrip(trip)}>
                    Otevřít detail
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {activeTrip && (
        <ExperienceModal
          title={activeTrip.title}
          subtitle={activeTrip.subtitle}
          description={activeTrip.description}
          images={activeTrip.images}
          highlights={activeTrip.highlights}
          onClose={() => setActiveTrip(null)}
        />
      )}
    </>
  );
}
