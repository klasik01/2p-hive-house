import type { T } from "../i18n";
import { footerConfig } from "../config/footer";

export function Footer({ t }: { t: T }) {
  const c = footerConfig;
  const year = new Date().getFullYear();

  return (
    <footer className="footer" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="visually-hidden">Patička</h2>
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <img src={c.logoSrc} alt={c.brandName} className="footer-logo" />
            <p>{c.tagline}</p>
            <div className="footer-socials">
              {c.socials.map((s) => (
                <a key={s.label} href={s.href} aria-label={s.label} target="_blank" rel="noopener noreferrer">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {c.columns.map((col) => (
            <div key={col.title} className="footer-col">
              <h4>{col.title}</h4>
              <ul>
                {col.links.map((l) => (
                  <li key={l.label}><a href={l.href}>{l.label}</a></li>
                ))}
              </ul>
            </div>
          ))}

          <div className="footer-col footer-contact">
            <h4>Kontakt</h4>
            <p><strong>E-mail:</strong> {c.contact.email}</p>
            <p><strong>Telefon:</strong> {c.contact.phone}</p>
            <p><strong>Adresa:</strong> {c.company.address}</p>
            <p><strong>Check-in:</strong> {c.checkInOut.checkIn} · <strong>Check-out:</strong> {c.checkInOut.checkOut}</p>
          </div>
        </div>

        <div className="footer-bottom">
          <div>© {year} {c.company.name}, IČO {c.company.ico}. {t.footer.rights}</div>
          <div className="footer-legal">
            {c.legalLinks.map((l) => (
              <a key={l.href} href={l.href}>{l.label}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
