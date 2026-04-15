// ============================================================
// Barrel export pro všechny znovupoužitelné homepage sekce.
// Každá z nich funguje plug-and-play — bez props vykreslí defaultní
// obsah z homepage.json. Hero sekce je záměrně vynechána, protože
// je specifická pro úvodní stránku (pro podstránky používej <PageHero />).
//
// Použití:
//   import { AboutSection, OfferingsSection, ContactPanel } from "@/components/sections";
//   <AboutSection />                              // default data
//   <OfferingsSection id="nabidka-2" />           // override ID
//   <ContactPanel contact={customContact} />      // override data
// ============================================================

export { AboutSection } from "./AboutSection";
export { ApitherapySection } from "./ApitherapySection";
export { HowItWorksSection } from "./HowItWorksSection";
export { OfferingsSection } from "./OfferingsSection";
export { VideoSection } from "./VideoSection";
export { GallerySection } from "./GallerySection";
export { ContactPanel } from "./ContactPanel";
export { FishingCtaBand } from "./FishingCtaBand";
export { PageHero } from "./PageHero";
