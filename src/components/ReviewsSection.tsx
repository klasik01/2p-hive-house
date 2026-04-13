import type { T } from "../i18n";

type Props = { t: T };

export function ReviewsSection({ t }: Props) {
  const tr = t.reviews;

  return (
    <section id="recenze" className="reviews section-pad">
      <div className="container">
        <div className="reviews-header reveal">
          <div className="section-eyebrow">{tr.eyebrow}</div>
          <h2 className="section-title">
            {tr.title} <em>{tr.titleAccent}</em>
          </h2>
          <div className="reviews-stars-display">
            <div className="stars">
              {"⭐".repeat(5)}
            </div>
            <div className="rating-text">{tr.rating}</div>
            <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", marginLeft: "8px" }}>
              {tr.rating_label}
            </div>
          </div>
        </div>

        <div className="reviews-grid">
          {tr.reviews.map((review, idx) => (
            <div
              key={review.author}
              className="reviews-card reveal"
              style={{ transitionDelay: `${idx * 0.07}s` }}
            >
              <div className="reviews-card-stars">
                {"⭐".repeat(review.rating)}
              </div>
              <p className="reviews-card-text">{review.text}</p>
              <div className="reviews-card-author">
                <div className="author-avatar">{review.initials}</div>
                <div>
                  <div className="author-name">{review.author}</div>
                  <div className="author-location">{review.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
