import React, { forwardRef } from "react";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Section } from "../primitives";

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
      <div className="max-w-7xl mx-auto grid lg:grid-cols-6 gap-x-16 gap-y-8">
        {/* Left Column - Overview Content */}
        <div className="lg:col-span-4">
          {/* Program Type Label */}
          {overview.programType && (
            <div className="flex items-center gap-2 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 text-stevens-gray"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span className="text-xs uppercase tracking-[0.2em] text-stevens-gray font-medium">
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

          {/* Tagline */}
          {overview.tagline && (
            <p className="font-stevens-body text-xl md:text-2xl text-stevens-dark-gray/80 font-light mb-8">
              {overview.tagline}
            </p>
          )}

          {/* Divider */}
          <div className="w-20 h-0.5 bg-stevens-gray/30 mb-8" />

          {/* Description */}
          {overview.description && (
            <div
              className="prose prose-lg max-w-none text-stevens-dark-gray leading-relaxed mb-10"
              dangerouslySetInnerHTML={{ __html: overview.description }}
            />
          )}
          {/* Key Skills Developed */}
          {overview.keySkills && overview.keySkills.length > 0 && (
            <div className="mt-10">
              <h3 className="font-stevens-headers font-bold text-stevens-xl uppercase tracking-wider text-stevens-black mb-4">
                Key Skills Developed
              </h3>
              <div className="flex flex-wrap gap-3">
                {overview.keySkills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="outline-dark"
                    className="text-xs font-medium py-2 px-4 border border-stevens-black bg-white text-stevens-black rounded-full"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Concentration Options - Two Column Grid */}
          {overview.concentrations && overview.concentrations.length > 0 && (
            <div className="mt-10">
              <h3 className="font-stevens-headers font-bold text-stevens-xl uppercase tracking-wider text-stevens-black mb-4">
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
        </div>

        {/* Right Column - Enhanced Quick Facts Card */}
        <div className="lg:col-span-2">
          <div className="bg-stevens-light-gray sticky  top-56 border border-stevens-gray/20 shadow-lg rounded-sm overflow-hidden">
            {/* Card Content */}
            <div className="p-6 lg:p-8">
              {/* Card Title */}
              <h3 className="font-stevens-headers font-bold text-stevens-xl text-stevens-black uppercase tracking-[0.15em] mb-6 mt-2">
                Quick Facts
              </h3>

              {/* Divider */}
              <div className="w-full h-px bg-stevens-gray/40 mb-6" />

              {/* Term Start */}
              {quickFacts?.termStart && (
                <div className="mb-5">
                  <p className="text-base uppercase tracking-wider text-stevens-gray font-medium mb-2">
                    Upcoming Start
                  </p>
                  <p className="font-stevens-display text-3xl lg:text-4xl font-light text-stevens-black">
                    {quickFacts.termStart}
                  </p>
                </div>
              )}

              {/* Tuition */}
              {quickFacts?.tuition && (
                <div className="mb-8">
                  <p className="text-base uppercase tracking-wider text-stevens-gray font-medium mb-2">
                    Program Tuition
                  </p>
                  <p className="font-stevens-display text-3xl lg:text-4xl font-bold text-stevens-red">
                    {quickFacts.tuition}
                  </p>
                </div>
              )}

              {/* Apply Now Button */}
              <Button
                variant="default"
                className="w-full py-4 text-base uppercase tracking-wider font-semibold shadow-md hover:shadow-lg transition-shadow"
                onClick={() => {
                  if (quickFacts?.applyUrl) {
                    window.open(quickFacts.applyUrl, "_blank");
                  }
                }}
              >
                Apply Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
});
