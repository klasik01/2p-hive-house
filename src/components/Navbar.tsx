import { useEffect, useState } from "react";
import type { T } from "../i18n";
import { asset } from "../utils/asset";

type Props = {
  t: T;
  onVoucherClick: () => void;
};

// Jednoduchá navigace — odkazy jsou kosmetické (nikam zatím nevedou).
const navLinks = [
  { label: "vcelin" as const, href: "#vcelin" },
  { label: "ubytovani" as const, href: "#ubytovani" },
  { label: "rybareni" as const, href: "#rybareni" },
  { label: "okoli" as const, href: "#okoli" },
  { label: "rezervace" as const, href: "#/rezervace" },
];

export function Navbar({ t, onVoucherClick }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("modal-open", mobileOpen);
  }, [mobileOpen]);

  const close = () => setMobileOpen(false);

  return (
    <>
      <nav className={`navbar${scrolled ? " scrolled" : ""}`} aria-label="Hlavní navigace">
        <div className="container">
          <div className="navbar-inner">
            <a href="#uvod" className="navbar-brand" onClick={close} aria-label={t.nav.brandAlt}>
              <span className="navbar-logo-badge">
                <img src={asset("/logo.png")} alt={t.nav.brandAlt} className="navbar-logo" />
              </span>
            </a>

            <ul className="navbar-nav">
              {navLinks.map(({ label, href }) => (
                <li key={label}>
                  <a href={href}>{t.nav[label]}</a>
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
        {navLinks.map(({ label, href }) => (
          <a key={label} href={href} onClick={close}>{t.nav[label]}</a>
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
