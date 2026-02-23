/**
 * Barrel exports for shared components
 *
 * Directory structure:
 *   shared/
 *   ├── layout/      - Page structure components (PageHero, AnimatedSection)
 *   ├── media/       - Media components (VideoPlayer, AngledImage)
 *   ├── testimonials/- Testimonial components
 *   ├── modals/      - Modal dialogs
 *   ├── cards/       - Card components
 *   ├── brand/       - Brand elements (Asterism)
 *   ├── sections/    - Page section components
 *   └── navigation/  - Navigation components (CarouselNavButton)
 *
 * Usage:
 *   import { AnimatedSection, PageHero, VideoPlayer } from "@/components/shared";
 *   import { AngledImage, AngledImageStack } from "@/components/shared";
 */

// Layout components
export { default as PageHero } from "./layout/PageHero";
export { default as AnimatedSection } from "./layout/AnimatedSection";

// Media components
export { default as VideoPlayer } from "./media/VideoPlayer";
export { default as ParallaxImage } from "./media/ParallaxImage"
export {
  AngledImage,
  AngledImageStack,
  AngledContainer,
} from "./media/AngledImage";

// Testimonial components
export { default as ImageTestimonial } from "./testimonials/ImageTestimonial";
export { default as PullQuoteTestimonial } from "./testimonials/PullQuoteTestimonial";
export { default as TestimonialCarousel } from "./testimonials/TestimonialCarousel";

// Modal components
export { default as ApplicationModal } from "./modals/ApplicationModal";
export { default as RequestInfoModal } from "./modals/RequestInfoModal";

// Card components
export { default as ProgramCard } from "./cards/ProgramCard";
export { PromotionalCard } from "./cards/PromotionalCard";

// Brand components
export { default as Asterism, AsterismPresets } from "./brand/Asterism";

// Section components
export { default as TopCompaniesSection } from "./sections/TopCompaniesSection";
export { default as SupportEventsSection } from "./sections/SupportEventsSection";
export { default as VideoSection } from "./sections/VideoSection";
export { default as LogoMarqueeSection, LogoMarqueeSectionDouble } from "./sections/LogoMarqueeSection";

// Navigation components
export { CarouselNavButton } from "./navigation";
