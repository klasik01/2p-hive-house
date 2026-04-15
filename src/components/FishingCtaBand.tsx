import type { T } from "../i18n";
import type { FishingCtaData } from "../types";

type Props = {
  t: T;
  data: FishingCtaData;
  onClick: () => void;
};

/**
 * Sdílený CTA band pro rybářskou povolenku.
 * Stejný vizuál se používá na homepage i na stránce Rybaření — jediná
 * definice v jednom místě.
 */
export function FishingCtaBand({ t, data, onClick }: Props) {
  return (
    <section className="section-pad-sm fishing-cta" id="povolenka">
      <div className="container">
        <div className="section-eyebrow">{data.eyebrow}</div>
        <h2>{data.title}</h2>
        <p className="section-desc">{data.desc}</p>
        <button type="button" className="btn btn-primary" onClick={onClick}>
          {t.common.orderPermit}
        </button>
      </div>
    </section>
  );
}
