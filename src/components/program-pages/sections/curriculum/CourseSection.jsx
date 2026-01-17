import React from "react";
import { CourseCard } from "./CourseCard";

/**
 * CourseSection - Container for a group of courses (e.g., Term 1, Term 2)
 *
 * @param {Object} section - Section data
 * @param {string} section.title - Section title (e.g., "Term 1", "Foundational Courses")
 * @param {string} section.intro - Optional intro text
 * @param {Array} section.courses - Array of course objects (renders as expandable cards)
 * @param {string} section.bulletTitle - Optional title for bullet list (e.g., "Sample Project Topics:")
 * @param {Array} section.bulletItems - Array of strings (renders as simple bullet list)
 * @param {string} variant - "degree" or "certificate"
 */
export const CourseSection = ({ section, variant = "degree" }) => {
  // Allow sections with either courses or bulletItems
  const hasCourses = section?.courses && section.courses.length > 0;
  const hasBulletItems = section?.bulletItems && section.bulletItems.length > 0;

  if (!section || (!hasCourses && !hasBulletItems)) {
    return null;
  }

  return (
    <div className="course-section mb-8">
      {section.title && (
        <h4 className="font-stevens-display text-stevens-xl md:text-stevens-2xl font-light text-stevens-dark-gray mb-4 uppercase tracking-wide">
          {section.title}
        </h4>
      )}

      {section.intro && (
        <p className="text-stevens-base text-stevens-dark-gray leading-relaxed mb-4">
          {section.intro}
        </p>
      )}

      {/* Render courses as card grid */}
      {hasCourses && (
        <div className="space-y-4">
          {section.courses.map((course, index) => (
            <CourseCard
              key={course.code || index}
              course={course}
              variant={variant}
            />
          ))}
        </div>
      )}

      {/* Render bullet items as simple list */}
      {hasBulletItems && (
        <div className="mt-4">
          {section.bulletTitle && (
            <h5 className="font-semibold text-stevens-dark-gray mb-3">
              {section.bulletTitle}
            </h5>
          )}
          <ul className="list-disc pl-5 space-y-2">
            {section.bulletItems.map((item, index) => (
              <li
                key={index}
                className="text-stevens-base text-stevens-dark-gray leading-relaxed"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
