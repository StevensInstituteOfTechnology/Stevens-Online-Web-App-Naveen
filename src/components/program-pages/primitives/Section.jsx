import React, { forwardRef } from 'react';

/**
 * Section - Base wrapper component for program page sections
 * 
 * Provides consistent styling, spacing, and scroll-margin for all sections.
 * Uses forwardRef to allow parent components to attach refs for scroll tracking.
 * 
 * @param {string} id - Section ID for navigation and anchor links
 * @param {string} title - Optional section title (h2)
 * @param {React.ReactNode} children - Section content
 * @param {boolean} container - Whether to apply max-width container (default: true)
 * @param {string} el - HTML element to render (default: "section")
 * @param {string} bgClassName - Background color class (default: "bg-stevens-white")
 * @param {string} paddingClassName - Padding classes (default: section padding)
 */
export const Section = forwardRef(function Section(
  {
    id,
    title,
    children,
    container = true,
    el = 'section',
    bgClassName = 'bg-stevens-white',
    paddingClassName = 'py-stevens-section-sm lg:py-stevens-section',
  },
  ref
) {
  const Element = el;
  
  return (
    <Element
      id={id}
      ref={ref}
      className={`${bgClassName} ${paddingClassName} scroll-mt-20`}
    >
      <div
        className={
          container
            ? 'max-w-stevens-content-max mx-auto px-stevens-md lg:px-stevens-lg'
            : ''
        }
      >
        {title && (
          <h2 className="font-stevens-display text-stevens-3xl md:text-stevens-4xl font-light text-stevens-dark-gray mb-stevens-lg text-center uppercase tracking-wide">
            {title}
          </h2>
        )}
        {children}
      </div>
    </Element>
  );
});
