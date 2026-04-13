import type { T } from "../i18n";

type Props = { t: T };

const GLAMPING_IMAGES = [
  "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=600&q=80&auto=format",
  "https://images.unsplash.com/photo-1560180474-e8563fd75bab?w=600&q=80&auto=format",
  "https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=600&q=80&auto=format",
];

export function GlampingSection({ t }: Props) {
  const tg = t.glamping;

  const cards = [
    { title: tg.card_1_title, desc: tg.card_1_desc, num: "01" },
    { title: tg.card_2_title, desc: tg.card_2_desc, num: "02" },
    { title: tg.card_3_title, desc: tg.card_3_desc, num: "03" },
  ];

  const stats = [
    { num: tg.stat_1, label: tg.stat_1_label },
    { num: tg.stat_2, label: tg.stat_2_label },
    { num: tg.stat_3, label: tg.stat_3_label },
    { num: tg.stat_4, label: tg.stat_4_label },
  ];

  return (
    <section id="glamping" className="glamping section-pad">
      <div className="container">
        <div className="glamping-intro reveal">
          <div className="section-eyebrow">{tg.eyebrow}</div>
          <h2 className="section-title">
            {tg.title} <em>{tg.titleAccent}</em>
          </h2>
          <p className="section-desc" style={{ margin: "0 auto" }}>
            {tg.desc}
          </p>
        </div>

        <div className="glamping-cards">
          {cards.map((card, idx) => (
            <div key={card.num} className="glamping-card reveal" style={{ transitionDelay: `${idx * 0.1}s` }}>
              <img
                src={GLAMPING_IMAGES[idx]}
                alt={card.title}
                loading="lazy"
              />
              <div className="glamping-card-overlay">
                <div className="glamping-card-num">{card.num}</div>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="glamping-stats">
          {stats.map((s) => (
            <div key={s.label} className="glamping-stat reveal">
              <div className="glamping-stat-num">{s.num}</div>
              <div className="glamping-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
