import { useEffect, useState } from "react";
import type { T } from "../../i18n";
import { asset } from "../../utils/asset";
import { useHashRoute } from "../../hooks/useHashRoute";

type Props = {
  t: T;
  onVoucherClick: () => void;
};

/**
 * Navigace.
 * Každý odkaz má "match" — buď přesný route match (#/rezervace, #/kontakt),
 * nebo sekci v rámci homepage (začíná #). Podle aktuální routy (useHashRoute)
 * se u odpovídajícího odkazu aplikuje class "is-active".
 */
const navLinks: { key: keyof T["nav"]; href: string; match: "/" | "/rezervace" | "/kontakt" | "/rybareni" }[] = [
  // Úvod je schválně sloučený s "Včelín & Glamping" — to je homepage.
  { key: "vcelin", href: "#/", match: "/" },
  { key: "rybareni", href: "#/rybareni", match: "/rybareni" },
  { key: "rezervace", href: "#/rezervace", match: "/rezervace" },
  { key: "kontakt", href: "#/kontakt", match: "/kontakt" },
];

export function Navbar({ t, onVoucherClick }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const route = useHashRoute();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("modal-open", mobileOpen);
  }, [mobileOpen]);

  // Zavírá mobilní menu po kliknutí na odkaz nebo změně routy.
  const close = () => setMobileOpen(false);
  useEffect(() => { close(); }, [route]);

  const isActive = (match: string) => route === match;

  return (
    <>
      <nav className={`navbar${scrolled ? " scrolled" : ""}`} aria-label="Hlavní navigace">
        <div className="container">
          <div className="navbar-inner">
            <a href="#/" className="navbar-brand" onClick={close} aria-label={t.nav.brandAlt}>
              <span className="navbar-logo-badge">
                <img src={asset("/logo.png")} alt={t.nav.brandAlt} className="navbar-logo" />
              </span>
            </a>

            <ul className="navbar-nav">
              {navLinks.map(({ key, href, match }) => (
                <li key={key}>
                  <a
                    href={href}
                    className={isActive(match) ? "is-active" : undefined}
                    aria-current={isActive(match) ? "page" : undefined}
                  >
                    {t.nav[key]}
                  </a>
                </li>
              ))}
            </ul>

            <div className="navbar-actions">
              <button className="btn btn-outline-honey navbar-voucher" onClick={onVoucherClick}>
                {t.nav.poukazka}
              </button>
              <a href="#/rezervace" className="btn btn-primary navbar-cta">
                {t.nav.rezervace}
              </a>
              <button
                className={`navbar-hamburger${mobileOpen ? " open" : ""}`}
                onClick={() => setMobileOpen((o) => !o)}
                aria-label={t.nav.menu}
                aria-expanded={mobileOpen}
              >
                <span /><span /><span />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className={`navbar-mobile${mobileOpen ? " open" : ""}`}>
        {navLinks.map(({ key, href, match }) => (
          <a
            key={key}
            href={href}
            onClick={close}
            className={isActive(match) ? "is-active" : undefined}
            aria-current={isActive(match) ? "page" : undefined}
          >
            {t.nav[key]}
          </a>
        ))}
        <div className="mobile-actions">
          <button
            className="btn btn-outline-honey"
            onClick={() => { onVoucherClick(); close(); }}
          >
            {t.nav.poukazka}
          </button>
          <a href="#/rezervace" className="btn btn-primary" onClick={close}>
            {t.nav.rezervace}
          </a>
        </div>
      </div>
    </>
  );
}
