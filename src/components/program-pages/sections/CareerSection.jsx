import React, { forwardRef } from 'react';
import { Section } from '../primitives';

/**
 * CareerSection - Career Outlook description section
 * 
 * Design: CPE Brand Guidelines - Simple prose section with HTML content
 * Features:
 * - Renders HTML description content safely
 * - Prose styling for rich text formatting
 * 
 * Used in: Both Degree and Certificate pages
 * Note: Job titles table and salary data are in separate JobTitlesSection
 * 
 * @param {Object} career - Career data object
 * @param {string} career.description - HTML description content
 */
export const CareerSection = forwardRef(function CareerSection(
  { career },
  ref
) {
  if (!career) return null;

  return (
    <Section
      id="career"
      title="Career Outlook"
      bgClassName="bg-stevens-white"
      ref={ref}
    >
      {career.description && (
        <div
          className="prose max-w-none text-stevens-dark-gray leading-relaxed mb-10"
          dangerouslySetInnerHTML={{ __html: career.description }}
        />
      )}
    </Section>
  );
});
