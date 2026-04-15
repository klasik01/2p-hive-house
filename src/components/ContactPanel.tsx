import type { ContactData } from "../types";

/**
 * Kontaktní sekce s mapou a medovým pruhem s údaji.
 * Vizuálně shodná s hive-house (.contact-panel).
 */
export function ContactPanel({ contact }: { contact: ContactData }) {
  const mapEmbedUrl =
    contact.mapEmbedUrl ||
    `https://maps.google.com/maps?q=${encodeURIComponent(contact.address)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  return (
    <section className="contact-panel section-pad-sm" id="kontakt" aria-labelledby="contact-title">
      <div className="container">
        <div className="contact-panel-inner reveal">
          <div className="contact-panel-copy">
            <div className="section-eyebrow">{contact.eyebrow}</div>
            <h2 id="contact-title" className="section-title big-title">
              {contact.title} <em>{contact.titleAccent}</em>
            </h2>
            <p className="section-desc">{contact.desc}</p>
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
              <small>{contact.phoneLabel}</small>
            </a>
          )}
          {contact.email && (
            <a className="contact-panel-strip-item" href={`mailto:${contact.email}`}>
              <strong>{contact.email}</strong>
              <small>{contact.emailLabel}</small>
            </a>
          )}
          {contact.address && (
            <div className="contact-panel-strip-item">
              <strong>{contact.address}</strong>
              <small>{contact.addressLabel}</small>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
