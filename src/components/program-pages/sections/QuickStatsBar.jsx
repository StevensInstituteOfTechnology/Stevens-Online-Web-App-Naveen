import React, { forwardRef } from "react";
import { BookOpen, Globe, Clock, GraduationCap } from "lucide-react";

/**
 * QuickStatsBar - A horizontal stats bar displaying key program metrics
 *
 * Design: Inspired by Purdue Global, adapted to Stevens design system
 * Features:
 * - Full-width light gray background
 * - 4 stats with icons, numbers, and labels
 * - Vertical dividers between stats
 * - Responsive: stacks on mobile, horizontal on desktop
 *
 * @param {Array} stats - Array of {value, label, icon?} objects
 */

// Default icon mapping based on common labels
const getDefaultIcon = (label) => {
  const labelLower = label?.toLowerCase() || "";
  if (labelLower.includes("credit") || labelLower.includes("course")) return BookOpen;
  if (labelLower.includes("online")) return Globe;
  if (labelLower.includes("week") || labelLower.includes("time")) return Clock;
  if (labelLower.includes("stack") || labelLower.includes("degree")) return GraduationCap;
  return BookOpen;
};

export const QuickStatsBar = forwardRef(function QuickStatsBar(
  { stats = [] },
  ref
) {
  if (!stats || stats.length === 0) return null;

  return (
    <div
      ref={ref}
      className="w-full bg-stevens-light-gray border-y border-stevens-gray/20"
    >
      <div className="max-w-stevens-content-max mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon || getDefaultIcon(stat.label);
            const isLastInRow = (index + 1) % 2 === 0; // For mobile 2-col grid
            const isLast = index === stats.length - 1;

            return (
              <div
                key={index}
                className={`
                  flex flex-col items-center justify-center py-6 lg:py-8 px-4
                  ${!isLast ? "lg:border-r lg:border-stevens-gray/20" : ""}
                  ${index % 2 === 0 && !isLastInRow ? "border-r border-stevens-gray/20 lg:border-r" : ""}
                  ${index < stats.length - 2 ? "border-b border-stevens-gray/20 lg:border-b-0" : ""}
                `}
              >
                {/* Icon */}
                <div className="mb-2 text-stevens-gray">
                  <Icon className="w-6 h-6 lg:w-7 lg:h-7" strokeWidth={1.5} />
                </div>

                {/* Value */}
                <p className="font-stevens-display text-2xl lg:text-3xl font-light text-stevens-black leading-none mb-1">
                  {stat.value}
                </p>

                {/* Label */}
                <p className="text-[10px] lg:text-xs text-stevens-gray uppercase tracking-wider font-medium">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});
