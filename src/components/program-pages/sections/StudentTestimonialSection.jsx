import React, { forwardRef } from "react";

/**
 * StudentTestimonialSection - Student testimonial with background image
 *
 * Design: Card overlay on full-width background image (Penn State style)
 * Features:
 * - Desktop (>=768px): Background image with card overlay, aspect-ratio based
 * - Mobile (<768px): Stacked layout - image on top, dark content below
 * - Quote marks with attribution
 *
 * Used in: Degree pages only (not typically shown on certificate pages)
 *
 * @param {Object} studentTestimonial - Student testimonial data
 * @param {string} studentTestimonial.quote - Testimonial quote text
 * @param {string} studentTestimonial.name - Student name for attribution
 * @param {string} studentTestimonial.title - Optional title/program info
 * @param {string} studentTestimonial.backgroundImage - Background image URL
 * @param {string} studentTestimonial.bgPosition - CSS background-position (default: "center 40%")
 * @param {string} studentTestimonial.cardPosition - "left" or "right" (default: "right")
 */
// Default background image for testimonial section
const DEFAULT_BACKGROUND = "/assets/images/shared/stevens-campus.webp";

export const StudentTestimonialSection = forwardRef(
  function StudentTestimonialSection({ studentTestimonial }, ref) {
    if (!studentTestimonial) return null;

    const cardPosition = studentTestimonial.cardPosition || "right";
    const isRight = cardPosition === "right";
    const backgroundImage =
      studentTestimonial.backgroundImage || DEFAULT_BACKGROUND;

    return (
      <section
        id="student-testimonial"
        ref={ref}
        className="scroll-mt-20 overflow-hidden"
      >
        {/* Mobile Layout (<768px): Stacked - Image on top, content below */}
        <div className="md:hidden">
          {/* Background Image - Fixed height on mobile */}
          <div
            className="h-[300px] sm:h-[400px] bg-cover"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundPosition: studentTestimonial.bgPosition || "center 40%",
            }}
          />

          {/* Content - Dark background */}
          <div className="bg-stevens-dark-gray px-6 py-10 sm:px-8 sm:py-12">
            {/* Opening Quote Mark */}
            <svg
              className="w-8 h-8 sm:w-10 sm:h-10 text-stevens-light-gray/60 mb-4"
              viewBox="0 0 19 20"
              aria-hidden="true"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.4,10.3L15.3,0h3.3l-2.5,9.5H19V20h-7.6V10.3z M0,10.3L3.9,0h3.3L4.7,9.5h2.9V20H0V10.3z"
              />
            </svg>

            {/* Quote Text */}
            <blockquote className="font-stevens-display text-xl sm:text-2xl leading-relaxed font-light text-white mb-6">
              {studentTestimonial.quote}
              {/* Closing Quote Mark */}
              <svg
                className="inline-block w-6 h-6 sm:w-8 sm:h-8 text-stevens-light-gray/60 ml-2 align-text-bottom"
                viewBox="0 0 19 20"
                aria-hidden="true"
                style={{ transform: "rotate(180deg)" }}
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.4,10.3L15.3,0h3.3l-2.5,9.5H19V20h-7.6V10.3z M0,10.3L3.9,0h3.3L4.7,9.5h2.9V20H0V10.3z"
                />
              </svg>
            </blockquote>

            {/* Attribution */}
            <p className="text-white">
              <span className="font-bold">&mdash; {studentTestimonial.name}</span>
              {studentTestimonial.title && (
                <span className="text-stevens-light-gray">
                  , {studentTestimonial.title}
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Desktop Layout (>=768px): Background image with card overlay */}
        {/* Using flatter aspect ratios for shorter section height */}
        <div className="hidden md:block relative aspect-[21/9] lg:aspect-[2.5/1] xl:aspect-[3/1] min-h-[400px] lg:min-h-[450px]">
          {/* Background Image with responsive position */}
          <div
            className="absolute inset-0 bg-cover"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundPosition: studentTestimonial.bgPosition || "center 40%",
            }}
          >
            {/* Subtle overlay for better card contrast */}
            <div className="absolute inset-0 bg-black/20" />
          </div>

          {/* Content Container */}
          <div className="relative z-10 max-w-7xl mx-auto px-stevens-md lg:px-stevens-xl h-full flex items-center">
            {/* Testimonial Card */}
            <div
              className={`
                w-2/3 lg:w-1/2 xl:w-5/12
                ${isRight ? "ml-auto" : "mr-auto"}
              `}
            >
              <div className="bg-white/95 backdrop-blur-sm p-8 lg:p-10 shadow-2xl">
                {/* Opening Quote Mark */}
                <svg
                  className="w-10 h-10 lg:w-12 lg:h-12 text-stevens-red mb-4"
                  viewBox="0 0 19 20"
                  aria-hidden="true"
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.4,10.3L15.3,0h3.3l-2.5,9.5H19V20h-7.6V10.3z M0,10.3L3.9,0h3.3L4.7,9.5h2.9V20H0V10.3z"
                  />
                </svg>

                {/* Quote Text */}
                <blockquote className="font-stevens-display text-xl lg:text-2xl xl:text-[1.65rem] leading-relaxed font-light text-stevens-dark-gray mb-6">
                  {studentTestimonial.quote}
                </blockquote>

                {/* Attribution */}
                <div className="border-t border-stevens-gray/20 pt-4">
                  <p className="text-stevens-dark-gray">
                    <span className="font-bold">
                      &mdash; {studentTestimonial.name}
                    </span>
                    {studentTestimonial.title && (
                      <span className="text-stevens-gray">
                        , {studentTestimonial.title}
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
);
