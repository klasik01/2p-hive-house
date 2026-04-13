import { useState } from "react";
import type { SurroundingPlace, SurroundingsPageContent } from "../types/content";
import { ExperienceModal } from "../components/ExperienceModal";

type Props = {
  pageContent: SurroundingsPageContent;
  places: SurroundingPlace[];
};

export function TripsPage({ pageContent, places }: Props) {
  const [activePlace, setActivePlace] = useState<SurroundingPlace | null>(null);
  const visiblePlaces = places.filter((p) => p.enabled);

  const heroStyle = pageContent.heroImage?.url
    ? { backgroundImage: `url(${pageContent.heroImage.url})` }
    : undefined;

  return (
    <>
      <section className="page-hero page-hero-trips" style={heroStyle}>
        <div className="container page-hero-inner">
          <div className="page-hero-copy reveal visible">
            <div className="section-eyebrow">{pageContent.heroEyebrow}</div>
            <h1 className="section-title">
              {pageContent.heroTitle} <em>{pageContent.heroHighlight}</em>
            </h1>
            <p className="section-desc">{pageContent.heroDescription}</p>
          </div>
        </div>
      </section>

      <section className="landing-highlights section-pad">
        <div className="container">
          {(pageContent.sectionTitle || pageContent.sectionSubtitle) && (
            <div className="section-header reveal" style={{ marginBottom: "48px", textAlign: "center" }}>
              {pageContent.sectionTitle && <h2 className="section-title">{pageContent.sectionTitle}</h2>}
              {pageContent.sectionSubtitle && <p className="section-desc" style={{ marginTop: "12px" }}>{pageContent.sectionSubtitle}</p>}
            </div>
          )}

          {visiblePlaces.length > 0 ? (
            <div className="landing-highlights-grid">
              {visiblePlaces.map((place, index) => (
                <article key={place.id} className="landing-card reveal" style={{ transitionDelay: `${index * 0.08}s` }}>
                  {place.imageUrl && (
                    <div className="landing-card-image" style={{ backgroundImage: `url(${place.imageUrl})` }} />
                  )}
                  <div className="landing-card-eyebrow">{place.subtitle}</div>
                  {place.distance && (
                    <div className="landing-card-meta">{place.distance}</div>
                  )}
                  <h3>{place.title}</h3>
                  <p>{place.description}</p>
                  {place.tags.length > 0 && (
                    <div className="landing-card-tags">
                      {place.tags.map((tag) => (
                        <span key={tag} className="landing-card-tag">{tag}</span>
                      ))}
                    </div>
                  )}
                  <div className="landing-card-actions">
                    <button type="button" className="btn btn-primary" onClick={() => setActivePlace(place)}>
                      Otevřít detail
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "64px 0", color: "rgba(17,17,17,0.4)" }}>
              Žádná místa zatím nejsou přidána.
            </div>
          )}
        </div>
      </section>

      {activePlace && (
        <ExperienceModal
          title={activePlace.title}
          subtitle={activePlace.subtitle}
          description={activePlace.description}
          images={activePlace.imageUrl ? [activePlace.imageUrl] : []}
          highlights={activePlace.tags}
          onClose={() => setActivePlace(null)}
        />
      )}
    </>
  );
}
