import { useEffect, useRef } from "react";
import type { ReservationData } from "../types";
import { asset } from "../utils/asset";

type Props = {
  data: ReservationData;
};

/**
 * Obsahový blok stránky REZERVACE.
 *
 * Layout:
 *  - Full-bleed hero s obrázkem jako pozadí + tmavý overlay (stejný princip
 *    jako .hero na homepage).
 *  - Pod hero plovoucí panel s embedem (iframe / widget třetí strany).
 *    Panel má negativní margin-top, takže vizuálně "zajíždí" do obrázku
 *    a vytváří "hustý" překryv (viz _reservation.scss).
 *
 * Embed kód se předává jako raw HTML v `data.embedHtml` a vkládá se přes
 * dangerouslySetInnerHTML. Případné <script> tagy z embed kódu se po
 * vložení re-inicializují, aby se widget skutečně spustil.
 */
export function ReservationSection({ data }: Props) {
  const embedRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = embedRef.current;
    if (!root) return;
    // Po vložení HTML přes dangerouslySetInnerHTML prohlížeč <script> tagy
    // nespouští. Tady je najdeme a naklonujeme, čímž se spustí.
    const scripts = Array.from(root.querySelectorAll("script"));
    scripts.forEach((oldScript) => {
      const s = document.createElement("script");
      Array.from(oldScript.attributes).forEach((attr) => {
        s.setAttribute(attr.name, attr.value);
      });
      s.text = oldScript.text;
      oldScript.parentNode?.replaceChild(s, oldScript);
    });
  }, [data.embedHtml]);

  const bg = asset(data.image);

  return (
    <section className="reservation-page" aria-labelledby="reservation-title">
      {/* Hero — full bleed background s overlay */}
      <div className="reservation-hero">
        <div
          className="reservation-hero-bg"
          style={{ backgroundImage: `url(${bg})` }}
          role="img"
          aria-label={data.imageAlt}
        />
        <div className="reservation-hero-overlay" aria-hidden="true" />

        <div className="container">
          <div className="reservation-hero-content">
            <div className="hero-eyebrow">
              <span className="hero-eyebrow-line" />
              <span>{data.eyebrow}</span>
            </div>
            <h1 id="reservation-title">
              <span className="hero-word hero-word-1">{data.title}</span>{" "}
              <span className="hero-word hero-word-2">{data.titleAccent}</span>
            </h1>
            <p className="reservation-lead">{data.text}</p>
          </div>
        </div>
      </div>

      {/* Embed panel — negativní margin-top = překryv do obrázku */}
      <div className="container">
        <div className="reservation-embed-wrap">
          <div
            ref={embedRef}
            className="reservation-embed"
            dangerouslySetInnerHTML={{ __html: data.embedHtml }}
          />
        </div>
      </div>
    </section>
  );
}
