import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * ApplicationOptionsCards - Two-column image cards layout for application options
 *
 * Design: Full-bleed two-column layout with background images and floating glass cards
 * Features:
 * - Dark card (left) + Light card (right) with glass morphism effect
 * - Background images with overlay
 * - Optional footnote below description
 * - Optional consultation CTA bar at bottom
 * - Responsive: stacks on mobile
 *
 * @param {Object} props
 * @param {string} props.title - Section title (default: "Choose Your Application Option")
 * @param {string} props.subtitle - Optional section subtitle
 * @param {Array} props.options - Array of application option objects
 * @param {string} props.options[].title - Card title (e.g., "Standard Application")
 * @param {string} props.options[].subtitle - Card subtitle/tagline
 * @param {string} props.options[].theme - "dark" or "light" for card styling
 * @param {string} props.options[].image - Background image URL
 * @param {boolean} props.options[].featured - Whether to show featured ring
 * @param {string} props.options[].description - HTML content for bullet points
 * @param {string} props.options[].footnote - Optional footnote text
 * @param {string} props.options[].buttonText - CTA button text
 * @param {string} props.options[].url - CTA button link
 * @param {Object} props.consultation - Optional consultation CTA bar
 * @param {string} props.consultation.title - CTA bar title
 * @param {string} props.consultation.buttonText - CTA button text
 * @param {string} props.consultation.url - CTA button link
 */
const ApplicationOptionsCards = ({
  title = "Choose Your Application Option",
  subtitle,
  options = [],
  consultation,
}) => {
  if (!options || options.length === 0) return null;

  return (
    <section className="scroll-mt-20 relative bg-stevens-light-gray">
      {/* Section Title */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="font-stevens-display text-stevens-3xl md:text-stevens-4xl lg:text-stevens-5xl font-light text-stevens-black uppercase tracking-wide">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-4 text-lg text-stevens-dark-gray max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Two-column image cards */}
      <div className="grid lg:grid-cols-2 max-w-7xl mx-auto">
        {options.map((option, i) => {
          const isDark = option.theme === "dark";
          return (
            <div
              key={i}
              className="relative flex items-center justify-center py-16 lg:pt-20 lg:pb-48 px-6 min-h-[500px] lg:min-h-[700px]"
            >
              {/* Background Image - Absolute & Full Height */}
              <div className="absolute inset-0 z-0">
                <img
                  src={option.image || "/assets/images/shared/stevens-campus.webp"}
                  alt=""
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Floating Glass Card */}
              <div
                className={`relative z-10 w-full max-w-[440px] overflow-hidden shadow-2xl transition-transform duration-300 hover:-translate-y-1 backdrop-blur-md ${
                  isDark
                    ? "bg-black/50 border border-white/10"
                    : "bg-white/60 border border-white/30"
                } ${option.featured ? "ring-1 ring-stevens-red" : ""}`}
              >
                <div className="p-8 md:p-10">
                  {/* Title */}
                  <h3
                    className={`font-stevens-display text-3xl font-medium mb-4 leading-tight ${
                      isDark ? "text-white" : "text-stevens-black"
                    }`}
                  >
                    {option.title}
                  </h3>

                  {/* Subtitle */}
                  {option.subtitle && (
                    <p
                      className={`text-base md:text-lg mb-8 leading-relaxed font-light ${
                        isDark ? "text-white" : "text-stevens-dark-gray"
                      }`}
                    >
                      {option.subtitle}
                    </p>
                  )}

                  {/* Description/Bullets */}
                  <div
                    className={`prose prose-sm mb-6 max-w-none prose-li:my-1 [&_*]:no-underline [&_strong]:font-semibold ${
                      isDark
                        ? "prose-invert text-white [&_li]:text-white [&_p]:text-white [&_ul]:text-white [&_*]:text-white"
                        : "[&_li]:text-stevens-dark-gray [&_p]:text-stevens-dark-gray [&_strong]:text-stevens-black"
                    }`}
                    dangerouslySetInnerHTML={{ __html: option.description }}
                  />

                  {/* Footnote */}
                  {option.footnote && (
                    <p
                      className={`text-sm mb-6 leading-relaxed italic ${
                        isDark ? "text-white/90" : "text-stevens-dark-gray"
                      }`}
                    >
                      {option.footnote}
                    </p>
                  )}

                  {/* Button */}
                  {option.buttonText && (
                    <a
                      href={option.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block mt-auto"
                    >
                      <Button className="w-full h-12 text-lg font-bold tracking-wide bg-black text-white hover:bg-stevens-dark-gray border border-transparent">
                        {option.buttonText}
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Consultation CTA Bar - Static on mobile, floating on lg */}
      {consultation && (
        <div className="relative lg:absolute lg:bottom-12 lg:left-0 lg:right-0 z-20 px-4 py-8 lg:py-0 bg-white lg:bg-transparent">
          <div className="max-w-[90%] lg:max-w-6xl mx-auto">
            <div className="bg-gray-100/95 backdrop-blur-sm rounded-xl shadow-xl border border-gray-200 px-6 py-5 lg:px-10 lg:py-6 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-12">
              <h3 className="text-lg lg:text-xl font-bold text-stevens-dark-gray text-center sm:text-left">
                {consultation.title}
              </h3>
              <a
                href={consultation.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline-dark"
                  className="whitespace-nowrap px-8 bg-transparent border-stevens-dark-gray text-stevens-dark-gray hover:bg-stevens-dark-gray hover:text-white"
                >
                  {consultation.buttonText}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ApplicationOptionsCards;
