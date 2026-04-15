import type { T } from "../i18n";
import { footerConfig } from "../config/footer";
import { asset } from "../utils/asset";

export function Footer({ t }: { t: T }) {
  const c = footerConfig;
  const year = new Date().getFullYear();

  return (
    <footer className="footer" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="visually-hidden">{t.footer.heading}</h2>
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <span className="footer-logo-badge">
              <img src={asset(c.logoSrc)} alt={c.brandName} className="footer-logo" />
            </span>
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
            <h4>{t.footer.contactTitle}</h4>
            <p><strong>{t.footer.emailLabel}:</strong> {c.contact.email}</p>
            <p><strong>{t.footer.phoneLabel}:</strong> {c.contact.phone}</p>
            <p><strong>{t.footer.addressLabel}:</strong> {c.company.address}</p>
            <p>
              <strong>{t.footer.checkInLabel}:</strong> {c.checkInOut.checkIn} ·{" "}
              <strong>{t.footer.checkOutLabel}:</strong> {c.checkInOut.checkOut}
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            © {year} {c.company.name}, {t.footer.icoLabel} {c.company.ico}. {t.footer.rights}
          </div>
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
