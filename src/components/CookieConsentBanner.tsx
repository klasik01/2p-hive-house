import type { T } from "../i18n";

type Props = {
  t: T;
  onAccept: () => void;
  onReject: () => void;
};

export function CookieConsentBanner({ t, onAccept, onReject }: Props) {
  return (
    <div className="cookie-banner">
      <div className="cookie-banner-inner">
        <p>{t.cookie.text}</p>
        <div className="cookie-banner-actions">
          <button className="btn btn-secondary" onClick={onReject} style={{ fontSize: "13px", padding: "10px 20px" }}>
            {t.cookie.reject}
          </button>
          <button className="btn btn-primary" onClick={onAccept} style={{ fontSize: "13px", padding: "10px 20px" }}>
            {t.cookie.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
