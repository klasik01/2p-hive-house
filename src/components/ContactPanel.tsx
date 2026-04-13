import type { T } from "../i18n";

type Props = {
  t: T;
  compact?: boolean;
};

export function ContactPanel({ t, compact = false }: Props) {
  const tf = t.footer;

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
            <a className="contact-panel-card" href={`tel:${tf.phone.replace(/\s/g, "")}`}>
              <span className="contact-panel-icon">📞</span>
              <span className="contact-panel-label">Telefon</span>
              <strong>{tf.phone}</strong>
            </a>

            <a className="contact-panel-card" href={`mailto:${tf.email}`}>
              <span className="contact-panel-icon">✉️</span>
              <span className="contact-panel-label">E-mail</span>
              <strong>{tf.email}</strong>
            </a>

            <div className="contact-panel-card">
              <span className="contact-panel-icon">📍</span>
              <span className="contact-panel-label">Lokalita</span>
              <strong>{tf.address}</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
