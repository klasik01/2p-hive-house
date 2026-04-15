import { SEOHead } from "../components/ui/SEOHead";
import { Icon } from "../components/ui/Icon";
import { PageHero } from "../components/layout/PageHero";
import { asset } from "../utils/asset";
import { contactPage } from "../config/contact";

/**
 * Stránka KONTAKT.
 *
 * Design:
 *  - Hero ve stejném duchu jako homepage / rezervace (full-bleed obrázek,
 *    tmavý overlay, bílý nadpis s medovým akcentem).
 *  - Pod hero 3 karty lidí / obecný kontakt, responzivně skládané pod sebe
 *    (mobile-first).
 *  - Velká mapa s odkazem do Google Maps.
 *  - Fakturační panel ve formě decentní info tabulky.
 *
 * Všechen obsah je v `src/config/contact.ts` — jediný zdroj pravdy.
 */
export function ContactPage() {
  const c = contactPage;

  return (
    <>
      <SEOHead meta={c.seo} />

      <section className="contact-page" aria-labelledby="contact-title">
        <PageHero titleId="contact-title" data={c.hero} />

        {/* ---------- LIDI + OBECNÝ KONTAKT ---------- */}
        <div className="container">
          <div className="contact-cards">
            {c.people.map((p) => (
              <article key={p.id} className="contact-card person-card">
                <div className="contact-card-avatar" aria-hidden="true">
                  {p.photo ? (
                    <img src={asset(p.photo)} alt="" />
                  ) : (
                    <span>{p.name.split(" ").map((s) => s[0]).slice(0, 2).join("")}</span>
                  )}
                </div>
                <div className="contact-card-body">
                  <h3 className="contact-card-name">{p.name}</h3>
                  <div className="contact-card-role">{p.role}</div>
                  <ul className="contact-card-lines">
                    <li>
                      <span className="contact-card-icon"><Icon name="phone" size={16} /></span>
                      <a href={`tel:${p.phone.replace(/\s/g, "")}`}>{p.phone}</a>
                    </li>
                    <li>
                      <span className="contact-card-icon"><Icon name="mail" size={16} /></span>
                      <a href={`mailto:${p.email}`}>{p.email}</a>
                    </li>
                  </ul>
                </div>
              </article>
            ))}

            <article className="contact-card general-card">
              <div className="contact-card-body">
                <div className="contact-card-eyebrow">{c.general.eyebrow}</div>
                <h3 className="contact-card-name">{c.general.title}</h3>
                <ul className="contact-card-lines">
                  <li>
                    <span className="contact-card-icon"><Icon name="mail" size={16} /></span>
                    <a href={`mailto:${c.general.email}`}>{c.general.email}</a>
                  </li>
                  <li>
                    <span className="contact-card-icon"><Icon name="phone" size={16} /></span>
                    <a href={`tel:${c.general.phone.replace(/\s/g, "")}`}>{c.general.phone}</a>
                  </li>
                  <li>
                    <span className="contact-card-icon"><Icon name="map-pin" size={16} /></span>
                    <span>{c.general.address}</span>
                  </li>
                  <li>
                    <span className="contact-card-icon"><Icon name="clock" size={16} /></span>
                    <span>Check-in {c.general.checkIn} · Check-out {c.general.checkOut}</span>
                  </li>
                </ul>
              </div>
            </article>
          </div>
        </div>

        {/* ---------- MAPA ---------- */}
        <div className="container">
          <div className="contact-map">
            <div className="contact-map-header">
              <div className="section-eyebrow">Kde nás najdete</div>
              <h2>Pozemek a okolí</h2>
              <p>
                Jsme kousek od vodní nádrže Švihov, v klidné obci Hojanovice.
                Klikni na mapu pro navigaci.
              </p>
              <a
                className="btn btn-outline-honey"
                href={c.map.externalHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                Otevřít v Google Maps
              </a>
            </div>
            <div className="contact-map-frame">
              <iframe
                title={c.map.title}
                src={c.map.embedSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>

        {/* ---------- FAKTURACE ---------- */}
        <div className="container">
          <div className="contact-company">
            <div className="section-eyebrow">{c.company.eyebrow}</div>
            <h2>{c.company.title}</h2>

            <dl className="contact-company-grid">
              <div>
                <dt>Společnost</dt>
                <dd>{c.company.name}</dd>
              </div>
              <div>
                <dt>IČO</dt>
                <dd>{c.company.ico}</dd>
              </div>
              {c.company.dic && (
                <div>
                  <dt>DIČ</dt>
                  <dd>{c.company.dic}</dd>
                </div>
              )}
              <div>
                <dt>Sídlo</dt>
                <dd>
                  {c.company.addressLines.map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < c.company.addressLines.length - 1 && <br />}
                    </span>
                  ))}
                </dd>
              </div>
              {c.company.bankAccount && (
                <div>
                  <dt>Bankovní spojení</dt>
                  <dd>{c.company.bankAccount}</dd>
                </div>
              )}
            </dl>

            {c.company.note && <p className="contact-company-note">{c.company.note}</p>}
          </div>
        </div>
      </section>
    </>
  );
}
