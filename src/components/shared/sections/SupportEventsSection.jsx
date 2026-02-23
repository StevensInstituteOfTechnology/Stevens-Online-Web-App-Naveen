import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/shared";

/**
 * SupportEventsSection - Application Support Events Section
 *
 * Design: Dark background with glassmorphism event cards
 * Features:
 * - Animated sections with staggered delays
 * - Event cards with images, titles, and durations
 * - Hover effects with scale and color transitions
 * - Optional "View All Events" button
 *
 * Used in: Home page, Events page, Admissions page
 *
 * @param {string} title - Section title (default: "Application Support Events")
 * @param {string} subtitle - Section subtitle (default: "Join us for a live webinar to learn more.")
 * @param {Array} events - Array of event objects with { title, length, url, image }
 * @param {boolean} showViewAllButton - Whether to show the View All Events button (default: true)
 * @param {string} viewAllLink - Link for the View All button (default: "/events/")
 * @param {string} className - Additional class names for the section
 */
export function SupportEventsSection({
  title = "Application Support Events",
  subtitle = "Join us for a live webinar to learn more.",
  events = [],
  showViewAllButton = true,
  viewAllLink = "/events/",
  className = "",
}) {
  if (!events || events.length === 0) return null;

  return (
    <section className={`bg-stevens-black py-stevens-section ${className}`}>
      <div className="max-w-7xl mx-auto px-stevens-md lg:px-stevens-lg">
        {/* Header */}
        <AnimatedSection className="mb-12">
          <h2 className="font-stevens-display text-4xl lg:text-5xl font-light text-white mb-4">
            {title}
          </h2>
          <p className="text-stevens-lg text-white/70 mb-6">{subtitle}</p>
          <div className="w-16 h-1 bg-stevens-red"></div>
        </AnimatedSection>

        {/* Event Cards Grid */}
        <AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <AnimatedSection
                key={event.title}
                delay={0.1 * (index + 1)}
                className="group cursor-pointer"
              >
                <a
                  href={event.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-full flex flex-col bg-white/[0.08] backdrop-blur-md border border-white/10 overflow-hidden hover:bg-white/[0.12] hover:border-white/20 transition-all duration-300"
                >
                  {/* Event Image */}
                  <div className="aspect-video w-full overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover transform group-hover:scale-[1.08] transition-transform duration-500"
                    />
                  </div>

                  {/* Event Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex-grow">
                      <p className="text-sm text-stevens-red font-bold uppercase tracking-wider mb-3">
                        On-Demand Event
                      </p>
                      <h3 className="font-stevens-display text-lg lg:text-xl font-bold text-white mb-3 group-hover:text-white/90 transition-colors leading-tight">
                        {event.title}
                      </h3>
                      <div className="flex items-center text-xs text-white/50 uppercase tracking-wider font-medium">
                        <span>{event.length}</span>
                      </div>
                    </div>

                    {/* Watch Now Link */}
                    <div className="mt-6 pt-4 border-t border-white/10">
                      <span className="inline-flex items-center text-sm text-white/70 group-hover:text-stevens-red transition-colors font-medium">
                        Watch now
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </a>
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>

        {/* View All Events Button */}
        {showViewAllButton && (
          <AnimatedSection className="text-center mt-stevens-xl">
            <Link to={viewAllLink}>
              <Button
                variant="outline-white"
                className="border-white text-white hover:bg-white hover:text-stevens-black"
              >
                View All Events
              </Button>
            </Link>
          </AnimatedSection>
        )}
      </div>
    </section>
  );
}

export default SupportEventsSection;
