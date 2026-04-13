import type { T } from "../i18n";
import { BookingSection } from "../components/BookingSection";
import { ContactPanel } from "../components/ContactPanel";
import { RouteLink } from "../lib/router";

type Props = { t: T };

export function ReservationPage({ t }: Props) {
  return (
    <>
      <section className="page-hero page-hero-reservation">
        <div className="container page-hero-inner">
          <div className="page-hero-copy reveal visible">
            <div className="section-eyebrow">Rezervace</div>
            <h1 className="section-title">
              Tady host rovnou udělá <em>další krok</em>
            </h1>
            <p className="section-desc">
              Hlavní stránka prodává zážitek a detailní podstránky odpovídají na otázky. Tato stránka je čistě pro
              rezervaci pobytu bez rušivých prvků navíc.
            </p>
            <div className="page-hero-actions">
              <RouteLink to="/ubytovani" className="btn btn-outline">Prohlédnout ubytování</RouteLink>
              <RouteLink to="/vcelin-glamping" className="btn btn-outline-honey">Co je včelín</RouteLink>
            </div>
          </div>
        </div>
      </section>

      <BookingSection t={t} />
      <ContactPanel t={t} compact />
    </>
  );
}
