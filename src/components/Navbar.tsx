import { useEffect, useState } from "react";
import type { T } from "../i18n";
import { RouteLink, useCurrentLocation } from "../lib/router";

type Props = {
  t: T;
  onVoucherClick: () => void;
};

const navLinks = [
  { label: "vcelin" as const, href: "/vcelin-glamping" },
  { label: "ubytovani" as const, href: "/ubytovani" },
  { label: "rybareni" as const, href: "/rybareni" },
  { label: "okolí" as const, href: "/vylety" },
  { label: "rezervace" as const, href: "/rezervace" },
];

export function Navbar({ t, onVoucherClick }: Props) {
  const { pathname } = useCurrentLocation();
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

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
        <div className="container">
          <div className="navbar-inner">
            <RouteLink to="/" className="navbar-brand" onClick={closeMobile}>
              <span className="brand-hex">⬡</span>
              2P Hive House
            </RouteLink>

            <ul className="navbar-nav">
              {navLinks.map(({ label, href }) => (
                <li key={label}>
                  <RouteLink
                    to={href}
                    className={pathname === href ? "active" : ""}
                  >
                    {t.nav[label]}
                  </RouteLink>
                </li>
              ))}
            </ul>

            <div className="navbar-actions">
              <button
                className="btn btn-outline-honey navbar-voucher"
                onClick={onVoucherClick}
              >
                {t.nav.poukázka}
              </button>
              <RouteLink to="/rezervace" className="btn btn-primary navbar-cta">
                {t.nav.rezervace}
              </RouteLink>
              <button
                className={`navbar-hamburger${mobileOpen ? " open" : ""}`}
                onClick={() => setMobileOpen((o) => !o)}
                aria-label="Menu"
              >
                <span />
                <span />
                <span />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className={`navbar-mobile${mobileOpen ? " open" : ""}`}>
        {navLinks.map(({ label, href }) => (
          <RouteLink key={label} to={href} onClick={closeMobile}>
            {t.nav[label]}
          </RouteLink>
        ))}
        <div className="mobile-actions">
          <button
            className="btn btn-outline-honey"
            onClick={() => { onVoucherClick(); closeMobile(); }}
          >
            {t.nav.poukázka}
          </button>
          <RouteLink to="/rezervace" className="btn btn-primary" onClick={closeMobile}>
            {t.nav.rezervace}
          </RouteLink>
        </div>
      </div>
    </>
  );
}
