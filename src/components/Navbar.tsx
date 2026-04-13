import { useEffect, useState } from "react";
import type { T } from "../i18n";

type Props = {
  t: T;
  onVoucherClick: () => void;
};

const navLinks = [
  { label: "vcelin" as const, href: "#vcelin" },
  { label: "glamping" as const, href: "#glamping" },
  { label: "ubytovani" as const, href: "#ubytovani" },
  { label: "okolí" as const, href: "#lokalita" },
  { label: "rezervace" as const, href: "#rezervace" },
];

export function Navbar({ t, onVoucherClick }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = ["uvod", "vcelin", "glamping", "ubytovani", "lokalita", "rezervace"];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
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
            <a href="#uvod" className="navbar-brand" onClick={closeMobile}>
              <span className="brand-hex">⬡</span>
              2P Hive House
            </a>

            <ul className="navbar-nav">
              {navLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className={activeSection === href.slice(1) ? "active" : ""}
                  >
                    {t.nav[label]}
                  </a>
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
              <a href="#rezervace" className="btn btn-primary navbar-cta">
                {t.nav.rezervace}
              </a>
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
          <a key={label} href={href} onClick={closeMobile}>
            {t.nav[label]}
          </a>
        ))}
        <div className="mobile-actions">
          <button
            className="btn btn-outline-honey"
            onClick={() => { onVoucherClick(); closeMobile(); }}
          >
            {t.nav.poukázka}
          </button>
          <a href="#rezervace" className="btn btn-primary" onClick={closeMobile}>
            {t.nav.rezervace}
          </a>
        </div>
      </div>
    </>
  );
}
