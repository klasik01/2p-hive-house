import type { T } from "../i18n";

/**
 * Prázdný popup pro rybářskou povolenku.
 * Formulář se dopíše později — zatím jen vizuální placeholder,
 * aby bylo vidět, že je napojený a stylovaný.
 */
export function FishingModal({ t, onClose }: { t: T; onClose: () => void }) {
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="fishing-title" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label={t.common.close}>✕</button>
        <h2 id="fishing-title" className="modal-title">{t.fishing.modalTitle}</h2>
        <p className="modal-desc">{t.fishing.modalDesc}</p>

        <div className="modal-placeholder">
          {t.fishing.soon}
        </div>
      </div>
    </div>
  );
}
