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
      <div className="max-w-stevens-content-max mx-auto grid lg:grid-cols-5 gap-stevens-gap-lg">
        {/* Left Column - Overview Content */}
        <div className="lg:col-span-3">
          {overview.title && (
            <h2 className="font-stevens-display text-stevens-3xl font-light mb-stevens-md text-stevens-dark-gray uppercase tracking-wide">
              {overview.title}
            </h2>
          )}
          {overview.description && (
            <div
              className="prose max-w-none text-stevens-dark-gray leading-relaxed"
              dangerouslySetInnerHTML={{ __html: overview.description }}
            />
          )}
          {/* Key Skills Developed */}
          {overview.keySkills && overview.keySkills.length > 0 && (
            <div className="mt-10">
              <h3 className="font-stevens-headers font-bold text-sm uppercase tracking-wider text-stevens-black mb-4">
                Key Skills Developed
              </h3>
              <div className="flex flex-wrap gap-3">
                {overview.keySkills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="outline-dark"
                    className="text-sm py-2 px-4"
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
              <h3 className="font-stevens-headers font-bold text-sm uppercase tracking-wider text-stevens-black mb-4">
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

        {/* Right Column - Simplified Quick Facts Card */}
        <div className="lg:col-span-2">
          <div className="bg-stevens-light-gray p-6 lg:p-8 sticky top-56">
            {/* Card Title */}
            <h3 className="font-stevens-display text-sm font-medium text-stevens-dark-gray uppercase tracking-[0.2em] mb-6">
              Quick Facts
            </h3>

            {/* Divider */}
            <div className="w-full h-px bg-stevens-gray/30 mb-6" />

            {/* Term Start */}
            {quickFacts?.termStart && (
              <div className="mb-4">
                <p className="text-xs uppercase tracking-wider text-stevens-gray mb-1">
                  Upcoming Start
                </p>
                <p className="font-stevens-display text-2xl lg:text-3xl font-light text-stevens-black italic">
                  {quickFacts.termStart}
                </p>
              </div>
            )}

            {/* Tuition */}
            {quickFacts?.tuition && (
              <div className="mb-6">
                <p className="text-xs uppercase tracking-wider text-stevens-gray mb-1">
                  Program Tuition
                </p>
                <p className="font-stevens-display text-2xl lg:text-3xl font-light text-stevens-red italic">
                  {quickFacts.tuition}
                </p>
              </div>
            )}

            {/* Apply Now Button */}
            <Button
              variant="dark"
              className="w-full py-3 text-sm uppercase tracking-wider"
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
    </Section>
  );
});
