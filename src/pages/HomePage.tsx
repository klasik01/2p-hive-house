import { useState } from "react";
import type { T } from "../i18n";
import { HeroSection } from "../components/HeroSection";
import { TrustBar } from "../components/TrustBar";
import { ReviewsSection } from "../components/ReviewsSection";
import { ExperienceModal } from "../components/ExperienceModal";
import { ContactPanel } from "../components/ContactPanel";
import { RouteLink } from "../lib/router";

type Props = {
  t: T;
  onVoucherClick: () => void;
  onFishingClick: () => void;
};

const accommodationPreview = {
  title: "Ubytování v Hive House",
  subtitle: "Rychlý náhled",
  description:
    "Samostatný dům v přírodě kombinuje klid, vůni dřeva, komfortní postel a zázemí pro hosty, kteří chtějí vypnout, odpočinout si a přitom mít všechno důležité po ruce.",
  highlights: [
    "Komfortní ložnice s výhledem do krajiny",
    "Soukromá terasa a venkovní posezení",
    "Koupelna, kuchyňský kout a parkování u objektu",
    "Intimní atmosféra pro pobyt ve dvou",
  ],
  images: [
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&q=80&auto=format",
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=900&q=80&auto=format&sat=-20",
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&q=80&auto=format",
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&q=80&auto=format&hue=15",
  ],
};

const tripsPreview = {
  title: "Výlety a akce v okolí",
  subtitle: "Co zažít kolem Hive House",
  description:
    "Okolí funguje jako kombinace klidu a lehce dostupných výletů. Během jednoho pobytu si můžete naplánovat pohodovou procházku, kulturní zastávku i delší výlet po okolních památkách.",
  highlights: [
    "Vodní nádrž Švihov a výhledy do krajiny",
    "Hrad Švihov a zámek Klenová",
    "Historické centrum Klatov",
    "Turistické a cyklo trasy od ubytování",
  ],
  images: [
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80&auto=format",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=80&auto=format",
    "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1200&q=80&auto=format",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&q=80&auto=format",
  ],
};

const highlights = [
  {
    eyebrow: "Ubytování",
    title: "Soukromé zázemí s atmosférou glampingu",
    text: "Na homepage zůstane jen to nejdůležitější. Všechny fotky, vybavení a detaily pobytu budou na vlastní stránce.",
    primary: { label: "Otevřít stránku", to: "/ubytovani" },
    secondary: "Rychlý náhled",
    preview: accommodationPreview,
  },
  {
    eyebrow: "Rybaření",
    title: "Povolenku si hosté koupí přímo na webu",
    text: "Nově je rybářská povolenka viditelná jako plnohodnotná služba. Vysvětlíme podmínky, průběh a přidáme jasné CTA.",
    primary: { label: "Detail rybaření", to: "/rybareni" },
    action: "Koupit povolenku",
  },
  {
    eyebrow: "Výlety po okolí",
    title: "Samostatná stránka pro tipy a akce v okolí",
    text: "Lidé se z hlavní stránky prokliknou na přehled výletů, zajímavostí a kratších i delších tras v okolí.",
    primary: { label: "Prozkoumat okolí", to: "/vylety" },
    secondary: "Otevřít popup",
    preview: tripsPreview,
  },
  {
    eyebrow: "Včelín & glamping",
    title: "Unikátní koncept dostane vlastní prostor",
    text: "Apiterapie, glamping a zážitek z pobytu nad úly budou soustředěné na jedné přehledné stránce.",
    primary: { label: "Zjistit více", to: "/vcelin-glamping" },
  },
];

const storyPhotos = [
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&q=80&auto=format",
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80&auto=format",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&q=80&auto=format",
];

export function HomePage({ t, onVoucherClick, onFishingClick }: Props) {
  const [activeModal, setActiveModal] = useState<null | typeof accommodationPreview>(null);

  return (
    <>
      <HeroSection t={t} onVoucherClick={onVoucherClick} />
      <TrustBar t={t} />

      <section className="hook-section section-pad">
        <div className="container">
          <div className="hook-grid">
            <div className="hook-copy reveal-left">
              <div className="section-eyebrow">Glamping se včelami</div>
              <h2 className="section-title">
                Co je vlastně <em>včelín</em> a proč je to zážitek?
              </h2>
              <p className="section-desc">
                Hive House není jen hezký glamping. Spíte v jedinečném prostoru spojeném s živým včelínem, kde se
                potkává klid přírody, vůně vosku a medu a pocit, že jste úplně mimo běžný svět.
              </p>
              <div className="detail-checklist">
                <div className="detail-checklist-item"><span>01</span><span>Včelín vytváří atmosféru, kterou běžné ubytování nemá.</span></div>
                <div className="detail-checklist-item"><span>02</span><span>Glamping přidává komfort, soukromí a designový pobyt ve dvou.</span></div>
                <div className="detail-checklist-item"><span>03</span><span>Okolí nabízí rybaření, výlety i klid na celý víkend.</span></div>
              </div>
              <div className="page-hero-actions">
                <RouteLink to="/vcelin-glamping" className="btn btn-primary">Co je včelín</RouteLink>
                <RouteLink to="/rezervace" className="btn btn-outline">Rezervovat pobyt</RouteLink>
              </div>
            </div>

            <div className="hook-visual reveal-right">
              <img src={storyPhotos[0]} alt="Interiér Hive House" className="hook-visual-main" />
              <div className="hook-visual-stack">
                <img src={storyPhotos[1]} alt="Včelín a včely" />
                <img src={storyPhotos[2]} alt="Okolí Hive House" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-highlights section-pad-sm">
        <div className="container">
          <div className="landing-highlights-head reveal">
            <div className="section-eyebrow">Proč zůstat déle</div>
            <h2 className="section-title">
              Návštěvník rychle pochopí, proč si má otevřít <em>další detail</em>
            </h2>
            <p className="section-desc">
              Každý blok vysvětlí jednu část zážitku a nabídne přímý proklik na specializovanou stránku s fotkami,
              detaily a dalšími informacemi.
            </p>
          </div>

          <div className="landing-highlights-grid">
            {highlights.map((item, index) => (
              <article key={item.title} className="landing-card reveal" style={{ transitionDelay: `${index * 0.08}s` }}>
                <div className="landing-card-eyebrow">{item.eyebrow}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <div className="landing-card-actions">
                  <RouteLink to={item.primary.to} className="btn btn-primary">
                    {item.primary.label}
                  </RouteLink>
                  {item.action && (
                    <button type="button" className="btn btn-outline-honey" onClick={onFishingClick}>
                      {item.action}
                    </button>
                  )}
                  {item.preview && item.secondary && (
                    <button type="button" className="btn btn-outline" onClick={() => setActiveModal(item.preview)}>
                      {item.secondary}
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="permit-strip">
        <div className="container">
          <div className="permit-strip-inner reveal">
            <div>
              <div className="permit-strip-eyebrow">Rybaření na rybníku</div>
              <h3>Na webu je nově jasně vidět, že si hosté mohou koupit rybářskou povolenku.</h3>
              <p>
                Sportovní rybolov je součástí zážitku. Na detailní stránce vysvětlíme podmínky, cenu i postup objednání,
                a zároveň necháme nákup dostupný jedním kliknutím.
              </p>
            </div>
            <div className="permit-strip-actions">
              <button type="button" className="btn btn-primary" onClick={onFishingClick}>
                Koupit povolenku
              </button>
              <RouteLink to="/rezervace" className="btn btn-outline-honey">
                Rezervovat pobyt
              </RouteLink>
              <RouteLink to="/rybareni" className="btn btn-outline">
                Detail rybaření
              </RouteLink>
            </div>
          </div>
        </div>
      </section>

      <section className="conversion-band section-pad-sm">
        <div className="container">
          <div className="conversion-band-inner reveal">
            <div>
              <div className="section-eyebrow">Další krok</div>
              <h2 className="section-title">
                Už teď je jasné, že nejde o běžné ubytování. <em>Teď stačí rezervovat.</em>
              </h2>
              <p className="section-desc">
                Pokud návštěvníka zaujal včelín, glamping, rybaření nebo výlety v okolí, na rezervaci se dostane bez
                rušení na samostatné stránce.
              </p>
            </div>
            <div className="page-hero-actions">
              <RouteLink to="/rezervace" className="btn btn-primary">Přejít na rezervaci</RouteLink>
              <button type="button" className="btn btn-outline-honey" onClick={onVoucherClick}>Koupit poukázku</button>
            </div>
          </div>
        </div>
      </section>

      <ContactPanel t={t} />

      <ReviewsSection t={t} />

      {activeModal && (
        <ExperienceModal
          title={activeModal.title}
          subtitle={activeModal.subtitle}
          description={activeModal.description}
          images={activeModal.images}
          highlights={activeModal.highlights}
          onClose={() => setActiveModal(null)}
        />
      )}
    </>
  );
}
