import React, { useState, useEffect, forwardRef } from "react";

/**
 * RankingsSection - "By the Numbers" statistics grid
 *
 * Design: Minimalist monochrome with typography-first hierarchy
 * Uses Stevens Design System colors and fonts from tailwind.config.js
 *
 * Layout:
 * - Desktop (lg+): Single flex row. Hovered stat expands to ~40% with hero styling;
 *   others share ~60%. First stat is default hero. Staggered transitions.
 * - Mobile/Tablet (<lg): First stat is permanently the hero (full-width, top).
 *   Remaining stats in a 2-column grid below with dividers.
 *
 * Features:
 * - First ranking is the default "Active Stat" with hero typography
 * - Desktop: hover any stat to promote it to active with smooth staggered transitions
 * - Mobile: static layout, no hover interaction (touch devices)
 * - On mouse leave (desktop), resets to first stat
 *
 * @param {Array} rankings - Array of ranking objects (first one is default hero)
 * @param {string} rankings[].ranking - The main statistic
 * @param {string} rankings[].description - Short label (displayed uppercase)
 * @param {string} rankings[].source - Source citation
 * @param {string} rankings[].note - Optional footnote reference
 * @param {Array} footnotes - Optional array of footnote objects
 */

// Detect desktop breakpoint (lg = 1024px) to gate hover behavior
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined" ? window.innerWidth >= 1024 : true
  );

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    const handler = (e) => setIsDesktop(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return isDesktop;
}

export const RankingsSection = forwardRef(function RankingsSection(
  { rankings, footnotes },
  ref
) {
  // Track which stat is currently "active" (hero-styled). Default: first stat.
  const [activeIndex, setActiveIndex] = useState(0);
  const isDesktop = useIsDesktop();

  if (!rankings || rankings.length === 0) return null;

  return (
    <section id="rankings" ref={ref} className="bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-stevens-md lg:px-stevens-xl py-stevens-section lg:py-stevens-gap-8xl">
        {/* Section Title */}
        <h2 className="font-stevens-display text-stevens-3xl md:text-stevens-4xl lg:text-stevens-5xl font-light text-stevens-black tracking-tight text-left mb-stevens-3xl lg:mb-stevens-gap-5xl">
          BY THE NUMBERS
        </h2>

        {/* Stats Grid:
            - Mobile/Tablet: 2-col grid, first stat spans both cols as hero
            - Desktop: flex row with hover-driven active stat */}
        <div
          className="grid grid-cols-2 lg:flex lg:flex-row"
          onMouseLeave={isDesktop ? () => setActiveIndex(0) : undefined}
        >
          {rankings.map((stat, index) => {
            const isFirstStat = index === 0;
            // Desktop: active = hovered stat; Mobile: active = first stat only
            const isActive = isDesktop
              ? index === activeIndex
              : isFirstStat;
            // Secondary stat index for mobile 2-col grid border logic
            const secIndex = index - 1;

            return (
              <div
                key={index}
                onMouseEnter={
                  isDesktop ? () => setActiveIndex(index) : undefined
                }
                className={`
                  flex flex-col
                  ${isDesktop ? "cursor-pointer" : ""}
                  ${
                    isFirstStat
                      ? // Hero stat: full-width on mobile (col-span-2), border below on mobile
                        "col-span-2 min-h-[280px] lg:min-h-[320px] pb-stevens-xl px-stevens-lg lg:pb-0 lg:px-0 border-b border-stevens-gray/30 lg:border-b-0"
                      : // Secondary stat: single col on mobile
                        "col-span-1 min-h-[200px] lg:min-h-[320px] px-stevens-lg py-stevens-lg lg:px-0 lg:py-0"
                  }
                  ${
                    // Mobile: right-column items get left border
                    !isFirstStat && secIndex % 2 === 1
                      ? "border-l border-stevens-gray/30"
                      : ""
                  }
                  ${
                    // Mobile: second row+ items get top border
                    !isFirstStat && secIndex >= 2
                      ? "border-t border-stevens-gray/30 lg:border-t-0"
                      : ""
                  }
                  ${
                    // Desktop: all non-first stats get left border
                    !isFirstStat ? "lg:border-l lg:border-stevens-gray/30" : ""
                  }
                `}
                style={
                  isDesktop
                    ? {
                        // Desktop flex layout: active expands, inactive shrinks
                        flexGrow: isActive ? 2 : 1,
                        flexShrink: 1,
                        flexBasis: "0%",
                        // Width transition — slowest layer (500ms) for staggered feel
                        transition:
                          "flex-grow 500ms cubic-bezier(0.4, 0, 0.2, 1), padding 400ms cubic-bezier(0.4, 0, 0.2, 1)",
                        // Position-aware padding: first stat at edge needs no left padding;
                        // middle/right stats need both sides for breathing room from dividers
                        paddingLeft:
                          isActive && isFirstStat ? "0" : "2rem",
                        paddingRight: "2rem",
                      }
                    : undefined // Mobile: let Tailwind classes handle padding/layout
                }
              >
                {/* Top accent bar:
                    - Desktop: red for active, gray for inactive (always visible)
                    - Mobile: red for hero only, hidden for secondary */}
                <div
                  className={`w-full h-1 mb-stevens-lg ${
                    !isFirstStat && !isDesktop ? "hidden" : ""
                  }`}
                  style={{
                    backgroundColor: isActive
                      ? "#a32638"
                      : "rgba(127, 127, 127, 0.3)",
                    transition: isDesktop
                      ? "background-color 300ms ease"
                      : "none",
                  }}
                />

                {/* Main Content Container */}
                <div className="flex-grow">
                  {/* Stat Number — scales up and turns red when active */}
                  <p
                    className={`font-stevens-display font-bold leading-[0.85] tracking-tighter ${
                      // Mobile secondary: use Tailwind responsive classes for font size
                      !isDesktop && !isActive
                        ? "text-stevens-5xl md:text-stevens-6xl text-stevens-black"
                        : ""
                    }`}
                    style={
                      isDesktop
                        ? {
                            // Desktop: inline font-size for smooth transitions
                            fontSize: isActive
                              ? "clamp(2.5rem, 10vw, 8rem)"
                              : "4.5rem",
                            color: isActive ? "#a32638" : "#000000",
                            // Typography transition — middle layer (400ms)
                            transition:
                              "font-size 400ms cubic-bezier(0.4, 0, 0.2, 1), color 300ms ease",
                          }
                        : isActive
                          ? {
                              // Mobile hero: large red number
                              fontSize: "clamp(2.5rem, 10vw, 8rem)",
                              color: "#a32638",
                            }
                          : {
                              // Mobile secondary: color only, Tailwind handles size
                              color: "#000000",
                            }
                    }
                  >
                    {stat.ranking}
                  </p>

                  {/* Stat Label */}
                  <p
                    className={`font-stevens-headers font-bold text-stevens-black uppercase tracking-wide leading-tight ${
                      // Mobile: use Tailwind responsive classes for label sizing
                      !isDesktop && isActive
                        ? "text-stevens-xl md:text-stevens-2xl mt-stevens-md"
                        : !isDesktop
                          ? "text-stevens-sm md:text-stevens-base mt-stevens-sm"
                          : ""
                    }`}
                    style={
                      isDesktop
                        ? {
                            fontSize: isActive ? "1.5rem" : "1rem",
                            marginTop: isActive ? "1rem" : "0.75rem",
                            transition:
                              "font-size 400ms cubic-bezier(0.4, 0, 0.2, 1), margin 400ms cubic-bezier(0.4, 0, 0.2, 1)",
                          }
                        : undefined // Mobile: Tailwind classes handle sizing
                    }
                  >
                    {stat.description}
                  </p>
                </div>

                {/* Source - Pinned to bottom */}
                {stat.source && (
                  <p
                    className={`font-stevens-body text-stevens-dark-gray mt-auto pt-stevens-md leading-relaxed ${
                      // Mobile source sizing
                      !isDesktop && isActive
                        ? "text-stevens-sm max-w-xs"
                        : !isDesktop
                          ? "text-stevens-xs"
                          : ""
                    }`}
                    style={
                      isDesktop
                        ? {
                            fontSize: isActive ? "0.875rem" : "0.75rem",
                            maxWidth: isActive ? "20rem" : "none",
                            transition:
                              "font-size 400ms cubic-bezier(0.4, 0, 0.2, 1), max-width 400ms ease",
                          }
                        : undefined // Mobile: Tailwind classes handle sizing
                    }
                  >
                    {stat.note && (
                      <sup className="mr-0.5">{stat.note}</sup>
                    )}
                    {stat.source}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Footnotes + Rankings Link */}
        <div className="mt-stevens-3xl pt-stevens-lg border-t border-stevens-gray/30 max-w-4xl">
          {footnotes && footnotes.length > 0 && (
            <div className="font-stevens-body text-stevens-xs text-stevens-dark-gray space-y-stevens-xs">
              {footnotes.map((footnote, i) => (
                <p key={i}>
                  <sup className="mr-1">{footnote.note}</sup>
                  {footnote.text}
                </p>
              ))}
            </div>
          )}
          <a
            href="https://www.stevens.edu/discover-stevens/stevens-by-the-numbers/rankings-recognition"
            target="_blank"
            rel="noopener noreferrer"
            className="font-stevens-body text-stevens-sm text-stevens-dark-gray hover:text-stevens-red underline transition-colors duration-200 mt-stevens-md inline-block"
          >
            View all rankings and recognition
          </a>
        </div>
      </div>
    </section>
  );
});
