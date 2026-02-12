import React, { forwardRef } from "react";
import { Section } from "../../program-pages/primitives";

/**
 * DeadlinesSection - Key Dates & Deadlines Timeline
 *
 * Design: Timeline with horizontal layout on desktop, vertical on mobile
 * Features:
 * - Configurable term name
 * - Timeline with square markers
 * - Responsive layout (4 columns desktop, 1 column mobile)
 * - Optional subtitle and footnote
 *
 * Used in: Degree and Certificate pages
 *
 * @param {Object} keyDates - Key dates configuration
 * @param {string} keyDates.term - Term name (e.g., "SPRING 2026")
 * @param {string} keyDates.subtitle - Optional subtitle text
 * @param {Array} keyDates.dates - Array of date objects
 * @param {string} keyDates.dates[].label - Date label (e.g., "Early Submit")
 * @param {string} keyDates.dates[].date - Date value (e.g., "October 15, 2025")
 * @param {string} keyDates.dates[].description - Optional description
 * @param {string} keyDates.footnote - Optional footnote text
 */
export const DeadlinesSection = forwardRef(function DeadlinesSection(
  { keyDates },
  ref
) {
  if (!keyDates || !keyDates.dates || keyDates.dates.length === 0) return null;

  const { term, subtitle: _subtitle, dates, footnote } = keyDates;

  return (
    <Section
      id="deadlines"
      title={null}
      bgClassName="bg-stevens-dark-gray"
      ref={ref}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="">
          <h2 className="font-stevens-display text-3xl md:text-4xl lg:text-5xl text-white font-light uppercase tracking-wide mb-4 text-left">
            Key Dates & Deadlines
          </h2>

          {term && (
            <h3 className="font-stevens-display text-2xl md:text-3xl text-stevens-white font-bold uppercase tracking-wide text-left ">
              {term}
            </h3>
          )}
        </div>

        {/* Timeline Container */}
        <div className="relative ">
          {/* Horizontal Timeline Line - Desktop/Tablet */}
          <div className="hidden md:block absolute top-20 left-0 right-0 h-0.5 bg-white/40"></div>

          {/* Arrow at the end of timeline - Desktop/Tablet */}
          <div 
            className="hidden md:block absolute top-[81px] right-0 transform translate-x-1/2 -translate-y-1/2"
            style={{
              width: 0,
              height: 0,
              borderLeft: '16px solid rgba(255, 255, 255, 255)',
              borderTop: '8px solid transparent',
              borderBottom: '8px solid transparent',
            }}
          ></div>

          {/* Vertical Timeline Line - Mobile Only */}
          <div className="md:hidden absolute top-8 left-6 w-0.5 bg-white/40 h-[calc(100%-2rem)]"></div>

          {/* Timeline Items */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">
            {dates.map((item, index) => (
              <div key={index} className="relative">
                {/* Desktop/Tablet Timeline Marker */}
                <div className="hidden md:block absolute top-16 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white"></div>

                {/* Mobile Timeline Marker */}
                <div className="md:hidden absolute top-8 left-4 transform -translate-x-1/2 w-4 h-4 bg-white"></div>

                {/* Content with responsive spacing */}
                <div className="text-left md:text-center md:pt-24 pl-12 md:pl-0">
                  <h4 className="font-stevens-display text-lg text-white font-light uppercase tracking-wide mb-3">
                    {item.label}
                  </h4>
                  <p className="font-stevens-body text-base text-white font-medium mb-3">
                    {item.date}
                  </p>
                  {item.description && (
                    <p className="font-stevens-body text-sm text-white/70 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footnote */}
        {footnote && (
          <div className="mt-12">
            <p className="font-stevens-body text-sm text-white/70 leading-relaxed text-left max-w-4xl">
              {footnote}
            </p>
          </div>
        )}
      </div>
    </Section>
  );
});

export default DeadlinesSection;
