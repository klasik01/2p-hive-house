import type { T } from "../i18n";

type Props = { t: T };

export function BookingSection({ t }: Props) {
  const tb = t.booking;

  return (
    <section id="rezervace" className="booking section-pad">
      <div className="container">
        <div className="booking-wrapper">
          <div className="reveal">
            <div className="section-eyebrow">{tb.eyebrow}</div>
            <h2 className="section-title">
              {tb.title} <em>{tb.titleAccent}</em>
            </h2>
            <p className="section-desc" style={{ margin: "0 auto 32px" }}>
              {tb.desc}
            </p>
          </div>

          {/* Placeholder pro rezervační systém třetí strany */}
          <div className="booking-embed reveal">
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>📅</div>
              <p style={{ marginBottom: "8px", color: "rgba(255,255,255,0.6)", fontSize: "15px" }}>
                {tb.embed_placeholder}
              </p>
              <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", letterSpacing: "1px", textTransform: "uppercase" }}>
                Rezervační systém — vložit kód zde
              </p>
              {/*
                Sem vložte kód od Vašeho rezervačního systému.
                Např. Checkfront, Lodgify, Smoobu, apod.

                Příklad:
                <script src="https://..." />
                <div id="booking-widget" />
              */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
