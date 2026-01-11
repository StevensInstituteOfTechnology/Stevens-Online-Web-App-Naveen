import React, { forwardRef } from 'react';
import { User } from 'lucide-react';
import { Section } from '../primitives';

/**
 * StudentSpotlightSection - Student testimonial quote
 * 
 * Design: CPE Brand Guidelines - Centered quote with attribution
 * Features:
 * - User icon header
 * - Blockquote with italic styling
 * - Student name citation
 * 
 * Used in: Degree pages only (not typically shown on certificate pages)
 * 
 * @param {Object} studentSpotlight - Student spotlight data
 * @param {string} studentSpotlight.quote - Testimonial quote text
 * @param {string} studentSpotlight.name - Student name for attribution
 */
export const StudentSpotlightSection = forwardRef(function StudentSpotlightSection(
  { studentSpotlight },
  ref
) {
  if (!studentSpotlight) return null;

  return (
    <Section
      id="student-spotlight"
      bgClassName="bg-stevens-light-gray"
      ref={ref}
    >
      <div className="mx-auto text-center">
        <User className="w-16 h-16 mx-auto mb-stevens-md text-stevens-red" />
        <h2 className="font-stevens-display text-stevens-3xl font-light mb-stevens-md uppercase tracking-wide">
          Student Testimonial Spotlight
        </h2>
        <blockquote className="text-stevens-2xl leading-snug italic text-stevens-dark-gray mb-stevens-md">
          "{studentSpotlight.quote}"
        </blockquote>
        <cite className="not-italic font-stevens-semibold text-stevens-dark-gray">
          - {studentSpotlight.name}
        </cite>
      </div>
    </Section>
  );
});
