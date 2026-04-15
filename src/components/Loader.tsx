import type { T } from "../i18n";

export function Loader({ t }: { t: T }) {
  return (
    <div className="boot-splash" role="status" aria-live="polite">
      <img
        src="/logo.png"
        alt="2P Hive House"
        className="boot-splash-logo"
        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
      />
      <div className="boot-splash-spinner" aria-hidden="true" />
      <span className="visually-hidden">{t.common.loading}</span>
    </div>
  );
}
