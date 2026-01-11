import React, { forwardRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Section } from '../primitives';

/**
 * OverviewSection - Program overview with Quick Facts sidebar
 * 
 * Design: CPE Brand Guidelines - Two-column layout
 * Features:
 * - Left column (3/5): Title, description (HTML), key skills badges, concentration list
 * - Right column (2/5): Quick Facts card with term start date, details, at-a-glance stats
 * 
 * Used in: Both Degree and Certificate pages (position 1 after Hero)
 * 
 * @param {Object} overview - Overview content
 * @param {string} overview.title - Section title
 * @param {string} overview.description - HTML description
 * @param {Array} overview.keySkills - Array of skill strings for badges
 * @param {Array} overview.concentrations - Array of concentration options
 * @param {Object} quickFacts - Quick facts sidebar data
 * @param {string} quickFacts.termStartDate - Next term start date
 * @param {string} quickFacts.details - HTML details content
 * @param {Array} quickFacts.atAGlance - Array of {value, label} stat objects
 */
export const OverviewSection = forwardRef(function OverviewSection(
  { overview, quickFacts },
  ref
) {
  if (!overview) return null;

  return (
    <Section
      id="overview"
      bgClassName="bg-stevens-white"
      ref={ref}
    >
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
          {overview.keySkills && overview.keySkills.length > 0 && (
            <div className="mt-8">
              <h3 className="font-semibold text-lg mb-2">
                Key Skills Developed:
              </h3>
              <div className="flex flex-wrap gap-2">
                {overview.keySkills.map((skill) => (
                  <Badge key={skill} variant="outline-dark">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          {overview.concentrations && overview.concentrations.length > 0 && (
            <div className="mt-8">
              <h3 className="font-semibold text-lg mb-2">
                Concentration Options:
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-stevens-dark-gray text-sm">
                {overview.concentrations.map((conc) => (
                  <li key={conc}>{conc}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right Column - Quick Facts */}
        <div className="lg:col-span-2">
          <Card className="shadow-stevens-xl rounded-stevens-md overflow-hidden bg-stevens-white">
            <CardHeader className="bg-stevens-black p-stevens-card">
              <CardTitle className="font-stevens-display text-stevens-2xl font-light text-stevens-white">
                QUICK FACTS
              </CardTitle>
            </CardHeader>
            <CardContent className="p-stevens-card pt-stevens-card bg-stevens-light-gray">
              {quickFacts?.termStartDate && (
                <div className="mb-stevens-lg">
                  <p className="font-stevens-bold text-stevens-base uppercase tracking-wider text-stevens-dark-gray mb-stevens-xs">
                    Term Start Date
                  </p>
                  <p className="font-stevens-bold text-stevens-lg text-stevens-red">
                    {quickFacts.termStartDate}
                  </p>
                </div>
              )}
              {quickFacts?.details && (
                <div className="border-t border-stevens-light-gray pt-stevens-md">
                  <h4 className="font-stevens-bold text-stevens-lg text-stevens-dark-gray mb-stevens-sm uppercase">
                    Overview
                  </h4>
                  <div
                    className="prose prose-sm text-stevens-dark-gray space-y-stevens-sm"
                    dangerouslySetInnerHTML={{ __html: quickFacts.details }}
                  />
                </div>
              )}
            </CardContent>
          </Card>
          {quickFacts?.atAGlance && quickFacts.atAGlance.length > 0 && (
            <div className="mt-8 grid grid-cols-3 gap-4">
              {quickFacts.atAGlance.map((fact, index) => (
                <div
                  key={index}
                  className="text-center bg-stevens-light-gray p-3 rounded-stevens-md"
                >
                  <p className="font-stevens-display text-lg md:text-xl font-light text-stevens-red leading-tight">
                    {fact.value}
                  </p>
                  <p className="text-[10px] md:text-xs uppercase tracking-wider text-stevens-dark-gray">
                    {fact.label}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Section>
  );
});
