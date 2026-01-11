import React, { forwardRef } from 'react';
import { Section, RankingCard } from '../primitives';

/**
 * RankingsSection - "By the Numbers" statistics grid
 * 
 * Design: CPE Brand Guidelines - Grid of ranking cards with optional footnotes
 * Features:
 * - Responsive flexbox grid (1 col mobile, 2 col tablet, 3 col desktop)
 * - Cards centered in last row for odd counts
 * - Optional footnotes below the grid
 * 
 * Used in: Both Degree and Certificate pages (position 2-3)
 * 
 * @param {Array} rankings - Array of ranking objects
 * @param {string} rankings[].ranking - The main statistic
 * @param {string} rankings[].description - Description text
 * @param {string} rankings[].source - Source citation
 * @param {string} rankings[].note - Optional footnote reference
 * @param {Array} footnotes - Optional array of footnote objects
 * @param {string} footnotes[].note - Footnote reference number
 * @param {string} footnotes[].text - Footnote text
 */
export const RankingsSection = forwardRef(function RankingsSection(
  { rankings, footnotes },
  ref
) {
  if (!rankings || rankings.length === 0) return null;

  return (
    <Section
      id="rankings"
      title="By the Numbers"
      bgClassName="bg-stevens-light-gray"
      container={false}
      el="div"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto py-stevens-2xl">
        <div className="px-stevens-lg">
          {/* Flexbox layout to center odd number of cards in last row */}
          <div className="flex flex-wrap justify-center gap-stevens-lg">
            {rankings.map((rank, i) => (
              <div
                key={i}
                className="w-full sm:w-[calc(100%-2rem)] md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.25rem)] max-w-[400px]"
              >
                <RankingCard {...rank} />
              </div>
            ))}
          </div>
          {footnotes && footnotes.length > 0 && (
            <div className="mt-stevens-xl max-w-4xl mx-auto text-stevens-sm text-stevens-dark-gray space-y-stevens-xs">
              {footnotes.map((footnote, i) => (
                <p key={i}>
                  <sup>{footnote.note}</sup> {footnote.text}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </Section>
  );
});
