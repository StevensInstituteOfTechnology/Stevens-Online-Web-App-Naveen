import React, { forwardRef } from "react";
import { Section } from "../primitives";
import { PromotionalCard } from "../../shared/cards/PromotionalCard";

/**
 * OverviewSection - Program overview with simplified Quick Facts card
 *
 * Design: CPE Brand Guidelines - Two-column layout
 * Features:
 * - Left column (3/5): Title, description (HTML), key skills badges, concentration list
 * - Right column (2/5): Simplified Quick Facts card (term start, tuition, apply button)
 *
 * Note: QuickStatsBar is now a separate component rendered before this section
 *
 * @param {Object} overview - Overview content
 * @param {string} overview.title - Section title
 * @param {string} overview.description - HTML description
 * @param {Array} overview.keySkills - Array of skill strings for badges
 * @param {Array} overview.concentrations - Array of concentration options
 * @param {string} overview.image - Image URL
 * @param {string} overview.imageAlt - Image alt text
 * @param {string} overview.imagePosition - CSS object-position value (e.g., "center", "top", "bottom", "left", "right", "center top", "20% 30%") - defaults to "center"
 * @param {Object} quickFacts - Quick facts data
 * @param {string} quickFacts.termStart - Term start info (e.g., "Spring 2026: Jan 20")
 * @param {string} quickFacts.tuition - Tuition info (e.g., "$5,250 Total")
 * @param {string} quickFacts.applyUrl - URL for Apply Now button
 */
export const OverviewSection = forwardRef(function OverviewSection(
  { overview, quickFacts },
  ref
) {
  if (!overview) return null;

  return (
    <Section id="overview" bgClassName="bg-stevens-white" ref={ref}>
      <div className="max-w-7xl mx-auto grid md:grid-cols-[1fr_327px] gap-x-16 gap-y-8">
        {/* Left Column - Overview Content */}
        <div className="min-w-0">
          {/* Program Type Label */}
          {overview.programType && (
            <div className="flex items-center gap-3 mb-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 text-stevens-red"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span className="text-sm uppercase tracking-[0.2em] text-stevens-red font-medium">
                {overview.programType}
              </span>
            </div>
          )}

          {/* Headline */}
          {(overview.headline || overview.title) && (
            <h2 className="font-stevens-display font-light text-4xl md:text-5xl lg:text-6xl text-stevens-black leading-[1.1] mb-6">
              {overview.headline || overview.title}
            </h2>
          )}

          {/* Divider */}
          <div className="w-16 h-1 bg-stevens-red mb-8" />

          {/* Description */}
          {overview.description && (
            <div
              className="prose prose-lg max-w-none text-stevens-dark-gray leading-relaxed mb-10 [&_strong]:text-stevens-black [&_b]:text-stevens-black"
              dangerouslySetInnerHTML={{ __html: overview.description }}
            />
          )}
          {/* Concentration Options - Two Column Grid */}
          {overview.concentrations && overview.concentrations.length > 0 && (
            <div className="mt-10">
              <h3 className="font-stevens-headers font-bold text-stevens-xl uppercase tracking-wider text-stevens-red mb-4">
                Concentration Options
              </h3>
              <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                {overview.concentrations.map((conc) => (
                  <div key={conc} className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-stevens-black rounded-full mt-1.5 flex-shrink-0" />
                    <span className="text-stevens-dark-gray text-sm leading-relaxed">
                      {conc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Overview Image */}
          <div className="mt-10">
            <div className="relative w-full aspect-video overflow-hidden shadow-md bg-gray-100">
              <img
                src={overview.image || "/assets/images/home/home-1.webp"}
                alt={overview.imageAlt || "Student learning online"}
                className="w-full h-full object-cover"
                style={{
                  objectPosition: overview.imagePosition || "center",
                }}
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Right Column - Enhanced Quick Facts Card */}
        <div className="min-w-0">
          {/* Promotional Card - Quick Facts with Image */}
          <div className="mt-8 sticky top-56">
            <PromotionalCard
              quickFacts={quickFacts}
              ctaText="APPLY NOW"
              image="/assets/images/shared/lab.png"
              imageAlt="Student in lab"
            />
          </div>
        </div>
      </div>
    </Section>
  );
});
