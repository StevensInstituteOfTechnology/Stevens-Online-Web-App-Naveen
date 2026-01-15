import React, { forwardRef } from "react";

/**
 * QuickStatsBar
 *
 * Design: Multi-line stat items with title, value, description, and subtext
 * Features:
 * - Flexible data structure supporting various display patterns
 * - Dark theme with professional typography
 * - Responsive: stacks on mobile, horizontal on desktop
 *
 * Data structure options per stat:
 * - title: Main headline (e.g., "100% Online")
 * - value: Large prominent number/text (e.g., "15", "48")
 * - label: Label for the value (e.g., "Credits", "March")
 * - description: Supporting description text
 * - subtext: Additional info (e.g., "$800 per credit")
 * - supertext: Small text above value (e.g., "Apply by")
 *
 * @param {Array} stats - Array of stat objects
 * @param {string} variant - "dark" or "light" theme
 */

export const QuickStatsBar = forwardRef(function QuickStatsBar(
  { stats = [], variant = "dark" },
  ref
) {
  if (!stats || stats.length === 0) return null;

  const isDark = variant === "dark";

  // Theme styles
  // Theme styles using Stevens design system colors
  const styles = {
    container: isDark
      ? "bg-stevens-dark-gray" // #363D45 - Dark Gray from CPE Brand Guidelines
      : "bg-stevens-light-gray",
    title: isDark ? "text-white" : "text-stevens-black",
    supertext: isDark ? "text-stevens-light-gray" : "text-stevens-gray",
    value: isDark ? "text-white" : "text-stevens-black",
    label: isDark ? "text-stevens-light-gray" : "text-stevens-dark-gray",
    description: isDark ? "text-stevens-light-gray/80" : "text-stevens-gray",
    subtext: isDark ? "text-stevens-light-gray/60" : "text-stevens-gray",
    divider: isDark ? "border-stevens-light-gray/20" : "border-stevens-gray/20",
  };

  return (
    <div
      ref={ref}
      className={`w-full ${styles.container} border-y ${styles.divider} shadow-inner overflow-hidden`}
    >
      <div className="max-w-stevens-content-max mx-auto px-stevens-md py-8 lg:py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0">
          {stats.map((stat, index) => {
            const isLast = index === stats.length - 1;

            return (
              <div
                key={index}
                className={`
                  flex flex-col items-center text-center justify-center px-4 lg:px-8
                  ${!isLast ? `lg:border-r ${styles.divider}` : ""}
                `}
              >
                {/* Title (if provided) */}
                {stat.title && (
                  <h3
                    className={`font-stevens-headers font-bold text-lg lg:text-2xl ${styles.title} mb-2`}
                  >
                    {stat.title}
                  </h3>
                )}

                {/* Supertext (small text above value, e.g., "Apply by") */}
                {stat.supertext && (
                  <p
                    className={`text-base uppercase tracking-wider ${styles.supertext} mb-1`}
                  >
                    {stat.supertext}
                  </p>
                )}

                {/* Value Block */}
                {stat.value && (
                  <div className="mb-1">
                    {/* Label above value (e.g., "March") */}
                    {stat.labelAbove && (
                      <p
                        className={`text-base lg:text-lg font-medium ${styles.label}`}
                      >
                        {stat.labelAbove}
                      </p>
                    )}

                    {/* Large Value */}
                    <p
                      className={`font-stevens-display text-6xl lg:text-8xl font-medium ${styles.value} leading-none`}
                    >
                      {stat.value}
                    </p>

                    {/* Label below value (e.g., "Credits") */}
                    {stat.label && (
                      <p
                        className={`text-lg lg:text-xl font-medium ${styles.label} mt-1`}
                      >
                        {stat.label}
                      </p>
                    )}
                  </div>
                )}

                {/* Description */}
                {stat.description && (
                  <p
                    className={`text-base ${styles.description} mt-2 max-w-[200px] leading-relaxed`}
                  >
                    {stat.description}
                  </p>
                )}

                {/* Subtext (e.g., "$800 per credit") */}
                {stat.subtext && (
                  <p className={`text-base ${styles.subtext} mt-1`}>
                    {stat.subtext}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {/* Red Accent Stripe */}
      <div className="w-full h-1 bg-stevens-red" />
    </div>
  );
});
