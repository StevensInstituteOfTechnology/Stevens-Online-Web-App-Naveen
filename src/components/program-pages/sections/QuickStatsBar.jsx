import React, { forwardRef } from "react";

/**
 * QuickStatsBar
 *
 * Design: Multi-line stat items with title, value, description, and subtext
 * Features:
 * - Flexible data structure supporting various display patterns
 * - Light gray background with professional typography
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
 */

export const QuickStatsBar = forwardRef(function QuickStatsBar(
  { stats = [] },
  ref
) {
  if (!stats || stats.length === 0) return null;

  return (
    <div
      ref={ref}
      className="w-full bg-stevens-light-gray border-y border-stevens-gray/20 shadow-inner overflow-hidden"
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
                  ${
                    !isLast
                      ? "lg:border-r lg:border-dashed border-stevens-gray/40"
                      : ""
                  }
                `}
              >
                {/* Title (if provided) */}
                {stat.title && (
                  <h3 className="font-stevens-headers font-bold text-lg lg:text-2xl text-stevens-black mb-2">
                    {stat.title}
                  </h3>
                )}

                {/* Supertext (small text above value, e.g., "Apply by") */}
                {stat.supertext && (
                    <p className="text-base uppercase tracking-wider text-stevens-dark-gray mb-1">
                    {stat.supertext}
                  </p>
                )}

                {/* Value Block */}
                {stat.value && (
                  <div className="mb-1">
                    {/* Label above value (e.g., "March") */}
                    {stat.labelAbove && (
                      <p className="text-base lg:text-lg font-medium text-stevens-dark-gray">
                        {stat.labelAbove}
                      </p>
                    )}

                    {/* Large Value */}
                    <p className="font-stevens-display text-6xl lg:text-8xl font-medium text-stevens-red leading-none">
                      {stat.value}
                    </p>

                    {/* Label below value (e.g., "Credits") */}
                    {stat.label && (
                      <p className="text-lg lg:text-xl font-medium text-stevens-dark-gray mt-1">
                        {stat.label}
                      </p>
                    )}
                  </div>
                )}

                {/* Description */}
                {stat.description && (
                  <p className="text-base text-stevens-dark-gray mt-2 max-w-[200px] leading-relaxed">
                    {stat.description}
                  </p>
                )}

                {/* Subtext (e.g., "$800 per credit") */}
                {stat.subtext && (
                    <p className="text-base text-stevens-dark-gray mt-1">
                    {stat.subtext}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {/* Red Accent Stripe */}
      {/* <div className="w-full h-1 bg-stevens-red" /> */}
    </div>
  );
});
