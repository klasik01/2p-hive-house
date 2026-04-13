import type { T } from "../i18n";

type Props = {
  t: T;
  onVoucherClick: () => void;
  onFishingClick: () => void;
};

export function Footer({ t, onVoucherClick, onFishingClick }: Props) {
  const tf = t.footer;

  return (
    <footer className="footer" id="kontakt">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <div className="brand">
              <span className="hex">⬡</span>
              2P Hive House
            </div>
            <p>{tf.brand_desc}</p>
            <div className="footer-socials">
              <a
                href="https://www.instagram.com/2phivehouse/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                aria-label="Instagram"
              >
                📸
              </a>
              <a
                href="https://www.facebook.com/2phivehouse/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                aria-label="Facebook"
              >
                📘
              </a>
            </div>
          </div>

          {/* Navigace */}
          <div className="footer-col">
            <h4>{tf.links_title}</h4>
            <ul>
              <li><a href="#vcelin">Včelín & apiterapie</a></li>
              <li><a href="#glamping">Glamping</a></li>
              <li><a href="#ubytovani">Ubytování</a></li>
              <li><a href="#lokalita">Lokalita & okolí</a></li>
              <li><a href="#rezervace">Rezervace</a></li>
              <li>
                <button
                  onClick={onVoucherClick}
                  style={{ background: "none", border: "none", cursor: "pointer", padding: 0, color: "inherit", font: "inherit" }}
                >
                  Dárková poukázka
                </button>
              </li>
              <li>
                <button
                  onClick={onFishingClick}
                  style={{ background: "none", border: "none", cursor: "pointer", padding: 0, color: "inherit", font: "inherit" }}
                >
                  Rybářská povolenka
                </button>
              </li>
            </ul>
          </div>

          {/* Kontakt */}
          <div className="footer-col">
            <h4>{tf.contact_title}</h4>
            <div>
              <div className="footer-contact-item">
                📞 <a href={`tel:${tf.phone.replace(/\s/g, "")}`}>{tf.phone}</a>
              </div>
              <div className="footer-contact-item">
                ✉️ <a href={`mailto:${tf.email}`}>{tf.email}</a>
              </div>
              <div className="footer-contact-item">
                📍 {tf.address}
              </div>
              <div className="footer-contact-item" style={{ marginTop: "16px", opacity: 0.6 }}>
                {tf.company}
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>{tf.copyright}</p>
          <p>{tf.legal}</p>
        </div>
      </div>
    </footer>
  );
}
