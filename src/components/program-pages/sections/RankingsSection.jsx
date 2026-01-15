import React, { forwardRef } from "react";

/**
 * RankingsSection - "By the Numbers" statistics grid
 *
 * Design: Minimalist monochrome with typography-first hierarchy
 * Uses Stevens Design System colors and fonts from tailwind.config.js
 *
 * Layout:
 * - Desktop: Hero stat (40% left) + secondary stats in columns (60% right)
 * - Mobile: Vertical stack with horizontal dividers
 *
 * Features:
 * - First ranking becomes the "Hero Stat" with 2x larger typography
 * - Thin 1px light-gray dividers between columns
 * - Generous white space for premium feel
 *
 * @param {Array} rankings - Array of ranking objects (first one becomes hero)
 * @param {string} rankings[].ranking - The main statistic
 * @param {string} rankings[].description - Short label (displayed uppercase)
 * @param {string} rankings[].source - Source citation
 * @param {string} rankings[].note - Optional footnote reference
 * @param {Array} footnotes - Optional array of footnote objects
 */
export const RankingsSection = forwardRef(function RankingsSection(
  { rankings, footnotes },
  ref
) {
  if (!rankings || rankings.length === 0) return null;

  // Split rankings: first is hero, rest are secondary
  const [heroStat, ...secondaryStats] = rankings;

  return (
    <section id="rankings" ref={ref} className="bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-stevens-md lg:px-stevens-xl py-stevens-section lg:py-stevens-gap-8xl">
        {/* Section Title */}
        <h2 className="font-stevens-display text-stevens-3xl md:text-stevens-4xl lg:text-stevens-5xl font-light text-stevens-black tracking-tight text-center mb-stevens-3xl lg:mb-stevens-gap-5xl">
          BY THE NUMBERS
        </h2>

        {/* Stats Grid - Vertical on mobile/tablet, Horizontal on desktop */}
        <div className="flex flex-col lg:flex-row">
          {/* Hero Stat - Top on mobile/tablet, Left Side (40%) on desktop */}
          <div className="pb-stevens-xl px-stevens-lg lg:px-0 lg:pb-0 lg:w-[40%] lg:pr-stevens-lg lg:border-r lg:border-b-0 border-b border-stevens-gray/30 flex flex-col h-full min-h-[280px] lg:min-h-[320px]">
            {/* Top accent bar */}
            <div className="w-full h-1 bg-stevens-gray/30 mb-stevens-lg" />

            {/* Main Content Container */}
            <div className="flex-grow">
              {/* Hero Number - Dynamic font size based on container width */}
              <p
                className="font-stevens-display font-bold text-stevens-red leading-[0.85] tracking-tighter"
                style={{ fontSize: "clamp(2.5rem, 10vw, 8rem)" }}
              >
                {heroStat.ranking}
              </p>

              {/* Hero Label */}
              <p className="font-stevens-headers text-stevens-xl md:text-stevens-2xl font-bold text-stevens-black uppercase tracking-wide mt-stevens-md">
                {heroStat.description}
              </p>
            </div>

            {/* Hero Source - Pinned to bottom */}
            {heroStat.source && (
              <p className="font-stevens-body text-stevens-sm text-stevens-gray mt-auto pt-stevens-md leading-relaxed max-w-xs">
                {heroStat.note && <sup className="mr-0.5">{heroStat.note}</sup>}
                {heroStat.source}
              </p>
            )}
          </div>

          {/* Secondary Stats - Below on mobile/tablet, Right Side (60%) on desktop */}
          <div className="lg:w-[60%] lg:mt-0 h-full">
            {/* Mobile/Tablet: 2-column grid, Desktop: Flex row */}
            <div className="grid grid-cols-2 lg:flex lg:flex-nowrap h-full">
              {secondaryStats.map((stat, index) => (
                <div
                  key={index}
                  className={`
                    flex flex-col flex-1 min-h-[200px] lg:min-h-[280px]
                    px-stevens-lg lg:px-stevens-xl py-stevens-lg lg:py-0
                    ${
                      // Mobile/Tablet: 2-column grid borders
                      index % 2 === 1 ? "border-l border-stevens-gray/30" : ""
                    }
                    ${
                      // Mobile/Tablet: rows after first row get top border
                      index >= 2 ? "border-t border-stevens-gray/30" : ""
                    }
                    ${
                      // Desktop: all get left border
                      "lg:border-l lg:border-t-0 border-stevens-gray/30"
                    }
                  `}
                >
                  {/* Top accent bar (desktop only, mobile uses border) */}
                  <div className="hidden lg:block w-full h-1 bg-stevens-gray/30 mb-stevens-lg" />

                  {/* Main Content Container */}
                  <div className="flex-grow">
                    {/* Secondary Number */}
                    <p className="font-stevens-display text-stevens-5xl md:text-stevens-6xl lg:text-stevens-7xl font-bold text-stevens-black leading-[0.9] tracking-tight">
                      {stat.ranking}
                    </p>

                    {/* Secondary Label */}
                    <p className="font-stevens-headers text-stevens-sm md:text-stevens-base font-bold text-stevens-black uppercase tracking-wide mt-stevens-sm leading-tight">
                      {stat.description}
                    </p>
                  </div>

                  {/* Secondary Source - Pinned to bottom */}
                  {stat.source && (
                    <p className="font-stevens-body text-stevens-xs text-stevens-gray mt-auto pt-stevens-md leading-relaxed">
                      {stat.note && <sup className="mr-0.5">{stat.note}</sup>}
                      {stat.source}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footnotes */}
        {footnotes && footnotes.length > 0 && (
          <div className="mt-stevens-3xl pt-stevens-lg border-t border-stevens-gray/30 max-w-4xl">
            <div className="font-stevens-body text-stevens-xs text-stevens-gray space-y-stevens-xs">
              {footnotes.map((footnote, i) => (
                <p key={i}>
                  <sup className="mr-1">{footnote.note}</sup>
                  {footnote.text}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
});
