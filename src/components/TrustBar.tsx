import type { T } from "../i18n";

type Props = { t: T };

export function TrustBar({ t }: Props) {
  const items = [...t.trust, ...t.trust]; // duplikovat pro nekonečný marquee

  return (
    <div className="trust-bar">
      <div className="trust-bar-track">
        {items.map((text, i) => (
          <div key={i} className="trust-bar-item">
            <span className="hex">⬡</span>
            <span>{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
