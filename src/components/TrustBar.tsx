import type { HomepageTrustbar } from "../types/content";

type Props = { trustbar: HomepageTrustbar };

export function TrustBar({ trustbar }: Props) {
  const items = [...trustbar.items, ...trustbar.items]; // duplikovat pro nekonečný marquee

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
