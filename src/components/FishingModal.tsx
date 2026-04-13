import { useState } from "react";
import type { T } from "../i18n";
import { createFishingPermit } from "../utils/contentStorage";

type Props = {
  t: T;
  onClose: () => void;
};

export function FishingModal({ t, onClose }: Props) {
  const tf = t.fishing;
  const BASE_PRICE = tf.price_adult;

  const [form, setForm] = useState({
    name: "",
    email: "",
    date: "",
    persons: 1,
    isFirefighter: false,
    isHojanoviceChild: false,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const calcPrice = () => {
    if (form.isHojanoviceChild) return 0;
    if (form.isFirefighter) return tf.price_firefighter * form.persons;
    return BASE_PRICE * form.persons;
  };

  const price = calcPrice();
  const hasDiscount = form.isFirefighter || form.isHojanoviceChild;
  const discountText = form.isHojanoviceChild
    ? "Dítě z Hojanovic — vstup ZDARMA 🎉"
    : form.isFirefighter
      ? "Hasič z Hojanovic — sleva 50 % 🚒"
      : "";

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.date) {
      setError("Vyplňte prosím všechna povinná pole.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      await createFishingPermit({
        name: form.name,
        email: form.email,
        date: form.date,
        persons: form.persons,
        isFirefighter: form.isFirefighter,
        isHojanoviceChild: form.isHojanoviceChild,
        pricePaid: price,
        status: "pending",
        createdAt: new Date().toISOString(),
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
          <h3>🎣 {tf.title}</h3>
          <button className="modal-close" onClick={onClose} aria-label="Zavřít">✕</button>
        </div>

        {success ? (
          <div style={{ textAlign: "center", padding: "32px 0" }}>
            <div style={{ fontSize: "64px", marginBottom: "16px" }}>✅</div>
            <h4 style={{ fontFamily: "var(--font-serif)", fontSize: "22px", color: "#fff", marginBottom: "8px" }}>
              Povolenka zarezervována!
            </h4>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px", marginBottom: "24px" }}>
              {tf.success}
            </p>
            <button className="btn btn-primary" onClick={onClose}>Zavřít</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", marginBottom: "24px" }}>
              {tf.desc}
            </p>

            <div className="form-group">
              <label>{tf.name_label} *</label>
              <input
                type="text"
                placeholder={tf.name_placeholder}
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>{tf.email_label} *</label>
              <input
                type="email"
                placeholder={tf.email_placeholder}
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>{tf.date_label} *</label>
              <input
                type="date"
                value={form.date}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => set("date", e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>{tf.persons_label}</label>
              <select
                value={form.persons}
                onChange={(e) => set("persons", Number(e.target.value))}
              >
                {[1, 2, 3, 4].map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? "osoba" : n < 5 ? "osoby" : "osob"}
                  </option>
                ))}
              </select>
            </div>

            {/* Slevy */}
            <div className="form-group">
              <label className="form-checkbox" style={{ marginBottom: "10px" }}>
                <input
                  type="checkbox"
                  checked={form.isFirefighter}
                  onChange={(e) => set("isFirefighter", e.target.checked)}
                />
                <span>{tf.discount_firefighter} <strong>(-50 %)</strong></span>
              </label>
              <label className="form-checkbox">
                <input
                  type="checkbox"
                  checked={form.isHojanoviceChild}
                  onChange={(e) => set("isHojanoviceChild", e.target.checked)}
                />
                <span>{tf.discount_child} <strong>(zdarma)</strong></span>
              </label>
            </div>

            {hasDiscount && (
              <div className="form-discount">
                ✅ {discountText}
              </div>
            )}

            <div className="form-price">
              <span>{tf.price_label}</span>
              <strong>
                {price === 0 ? "ZDARMA" : `${price.toLocaleString("cs-CZ")} Kč`}
              </strong>
            </div>

            {error && <div className="error-msg" style={{ marginBottom: "16px" }}>{error}</div>}

            <div className="form-actions">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                {tf.cancel_btn}
              </button>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? "Zpracovávám..." : `${price === 0 ? "✅" : "💳"} ${tf.pay_btn}`}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
