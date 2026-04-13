import type { ContactContent } from "../types/content";

type Props = {
  contact: ContactContent;
  compact?: boolean;
};

export function ContactPanel({ contact, compact = false }: Props) {
  const mapEmbedUrl =
    contact.mapEmbedUrl ||
    `https://maps.google.com/maps?q=${encodeURIComponent(contact.address)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  return (
    <section className={`contact-panel section-pad-sm${compact ? " compact" : ""}`}>
      <div className="container">
        <div className="contact-panel-inner reveal">
          <div className="contact-panel-copy">
            <div className="section-eyebrow">Kontakt</div>
            <h2 className="section-title">
              Chceš se nejdřív doptat? <em>Ozvi se nám přímo.</em>
            </h2>
            <p className="section-desc">
              Pokud si chce host před rezervací potvrdit termín, zeptat se na včelín, rybaření nebo průběh pobytu,
              všechno důležité najde hned tady.
            </p>
          </div>

          <div className="contact-panel-grid">
            <div className="contact-panel-map-frame">
              <iframe
                title="Mapa lokality 2P Hive House"
                src={mapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="contact-panel-strip">
        <div className="container contact-panel-strip-inner">
          {contact.phone && (
            <a className="contact-panel-strip-item" href={`tel:${contact.phone.replace(/\s/g, "")}`}>
              <strong>{contact.phone}</strong>
              <small>Telefon</small>
            </a>
          )}

          {contact.email && (
            <a className="contact-panel-strip-item" href={`mailto:${contact.email}`}>
              <strong>{contact.email}</strong>
              <small>E-mail</small>
            </a>
          )}

          {contact.address && (
            <div className="contact-panel-strip-item">
              <strong>{contact.address}</strong>
              <small>Lokalita</small>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
