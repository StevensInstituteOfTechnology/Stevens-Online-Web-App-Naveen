import React, { forwardRef } from 'react';
import { Section, FacultyCard } from '../primitives';

/**
 * FacultySection - Meet the Faculty horizontal carousel
 * 
 * Design: CPE Brand Guidelines - Horizontal scroll carousel of faculty cards
 * Features:
 * - Optional description text
 * - Horizontal scroll with snap points
 * - Custom scrollbar styling
 * - Uses FacultyCard primitive for each member
 * 
 * Used in: Both Degree and Certificate pages
 * 
 * @param {Object} faculty - Faculty configuration
 * @param {string} faculty.title - Section title (default: "Meet the Faculty")
 * @param {string} faculty.description - Optional description text
 * @param {Array} faculty.members - Array of faculty member objects
 * @param {string} faculty.members[].name - Faculty name
 * @param {string} faculty.members[].title - Faculty title/position
 * @param {string} faculty.members[].image - Faculty photo URL (optional)
 */
export const FacultySection = forwardRef(function FacultySection(
  { faculty },
  ref
) {
  if (!faculty) return null;

  return (
    <Section
      id="faculty"
      title={faculty.title || 'Meet the Faculty'}
      ref={ref}
      container={false}
      paddingClassName="py-stevens-section-sm lg:py-stevens-section"
    >
      {faculty.description && (
        <p className="text-center text-stevens-xl text-stevens-dark-gray max-w-3xl mx-auto mb-stevens-xl px-stevens-md lg:px-stevens-lg">
          {faculty.description}
        </p>
      )}
      <div className="relative overflow-visible w-full max-w-[77rem] mx-auto">
        <div className="flex overflow-x-auto space-x-stevens-sm stevens-md:space-x-stevens-lg pb-stevens-lg pt-stevens-sm snap-x snap-mandatory scrollbar-thin scrollbar-thumb-stevens-dark-gray scrollbar-track-stevens-light-gray px-stevens-md">
          {faculty.members.map((member, i) => (
            <FacultyCard key={i} member={member} />
          ))}
        </div>
      </div>
    </Section>
  );
});
