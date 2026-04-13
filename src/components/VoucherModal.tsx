import { useState } from "react";
import type { VoucherFormConfig } from "../types/content";
import { createGiftVoucher, generateVoucherCode } from "../utils/contentStorage";

type Props = {
  config: VoucherFormConfig;
  onClose: () => void;
};

export function VoucherModal({ config, onClose }: Props) {
  const [form, setForm] = useState({
    recipientName: "",
    recipientEmail: "",
    senderName: "",
    senderEmail: "",
    message: "",
    nights: config.nightOptions[0] ?? 1,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const price = form.nights * config.pricePerNight;

  const set = (k: keyof typeof form, v: string | number) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.recipientName || !form.recipientEmail || !form.senderName || !form.senderEmail) {
      setError("Vyplňte prosím všechna povinná pole.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const now = new Date();
      const validUntil = new Date(now);
      validUntil.setMonth(validUntil.getMonth() + config.validityMonths);

      await createGiftVoucher({
        recipientName: form.recipientName,
        recipientEmail: form.recipientEmail,
        senderName: form.senderName,
        senderEmail: form.senderEmail,
        message: form.message,
        nights: form.nights,
        pricePaid: price,
        code: generateVoucherCode(),
        status: "pending",
        createdAt: now.toISOString(),
        validUntil: validUntil.toISOString().slice(0, 10),
      });

      setSuccess(true);
    } catch {
      setError("Nepodařilo se zpracovat objednávku. Zkuste to znovu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal="true">
        <div className="modal-header">
          <h3>🎁 {config.modalTitle}</h3>
          <button className="modal-close" onClick={onClose} aria-label="Zavřít">✕</button>
        </div>

        {success ? (
          <div style={{ textAlign: "center", padding: "32px 0" }}>
            <div style={{ fontSize: "64px", marginBottom: "16px" }}>✅</div>
            <h4 style={{ fontFamily: "var(--font-serif)", fontSize: "22px", color: "#fff", marginBottom: "8px" }}>
              Poukázka odeslána!
            </h4>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px", marginBottom: "24px" }}>
              {config.successMessage}
            </p>
            <button className="btn btn-primary" onClick={onClose}>Zavřít</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", marginBottom: "24px" }}>
              {config.modalDesc}
            </p>

            <div className="form-group">
              <label>Jméno příjemce *</label>
              <input type="text" placeholder="Jana Nováková" value={form.recipientName}
                onChange={(e) => set("recipientName", e.target.value)} required />
            </div>

            <div className="form-group">
              <label>E-mail příjemce *</label>
              <input type="email" placeholder="jana@example.cz" value={form.recipientEmail}
                onChange={(e) => set("recipientEmail", e.target.value)} required />
            </div>

            <div className="form-group">
              <label>Vaše jméno (odesílatel) *</label>
              <input type="text" placeholder="Petr Novák" value={form.senderName}
                onChange={(e) => set("senderName", e.target.value)} required />
            </div>

            <div className="form-group">
              <label>Váš e-mail *</label>
              <input type="email" placeholder="petr@example.cz" value={form.senderEmail}
                onChange={(e) => set("senderEmail", e.target.value)} required />
            </div>

            <div className="form-group">
              <label>Počet nocí</label>
              <select value={form.nights} onChange={(e) => set("nights", Number(e.target.value))}>
                {config.nightOptions.map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? "noc" : n < 5 ? "noci" : "nocí"} — {(n * config.pricePerNight).toLocaleString("cs-CZ")} Kč
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Osobní vzkaz (nepovinné)</label>
              <textarea placeholder="Přeji krásný pobyt..." value={form.message}
                onChange={(e) => set("message", e.target.value)} rows={3} />
            </div>

            <div className="form-price">
              <span>Cena poukázky</span>
              <strong>{price.toLocaleString("cs-CZ")} Kč</strong>
            </div>

            {error && <div className="error-msg" style={{ marginBottom: "16px" }}>{error}</div>}

            <div className="form-actions">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                {config.cancelButtonLabel}
              </button>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? "Zpracovávám..." : `💳 ${config.payButtonLabel}`}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
