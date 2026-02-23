import React, { forwardRef } from "react";
import { Section } from "../../program-pages/primitives";

/**
 * DeadlinesSection - Key Dates & Deadlines Timeline
 *
 * Design: Timeline with horizontal layout on desktop, vertical on mobile
 * Features:
 * - Configurable term name
 * - Timeline with circle ring markers (accent on last milestone)
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
            <h3 className="font-stevens-display mb-6 md:mb-0 text-2xl md:text-3xl text-stevens-white font-bold uppercase tracking-wide text-left ">
              {term}
            </h3>
          )}
        </div>

        {/* Timeline Container */}
        <div className="relative ">
          {/* Horizontal Timeline Line - Desktop/Tablet */}
          <div className="hidden md:block absolute top-20 left-0 right-0 h-[2px] bg-white/60"></div>

          {/* Chevron arrow at the end of timeline - Desktop/Tablet */}
          <svg
            className="hidden md:block absolute top-20 right-0 translate-x-1/2 -translate-y-1/2"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 1L11 7L3 13"
              stroke="rgba(255,255,255,0.8)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* Vertical Timeline Line - Mobile Only */}
          <div className="md:hidden absolute top-[3.25rem] left-6 w-[2px] bg-white/60 h-[calc(100%-3.25rem)]"></div>

          {/* Timeline Items */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">
            {dates.map((item, index) => (
              <div key={index} className="relative">
                {/* Desktop/Tablet Timeline Marker */}
                {index === dates.length - 1 ? (
                  <div className="hidden md:flex absolute top-20 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-stevens-red border-2 border-white items-center justify-center">
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                ) : (
                  <div className="hidden md:flex absolute top-20 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-[2.5px] border-white bg-stevens-dark-gray items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  </div>
                )}

                {/* Mobile Timeline Marker - aligned with date text */}
                {index === dates.length - 1 ? (
                  <div className="md:hidden absolute top-[3.25rem] left-6 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-stevens-red border-2 border-white flex items-center justify-center">
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                ) : (
                  <div className="md:hidden absolute top-[3.25rem] left-6 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-[2.5px] border-white bg-stevens-dark-gray flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  </div>
                )}

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
