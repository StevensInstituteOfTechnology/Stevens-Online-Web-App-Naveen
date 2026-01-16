import React, { useState } from "react";

/**
 * CourseCard - Expandable course card component
 *
 * Supports two variants:
 * - "degree": Simple format with description and optional note
 * - "certificate": Detailed format with faculty, focus, topics, deliverable, etc.
 *
 * @param {Object} course - Course data
 * @param {string} course.code - Course code (e.g., "CS 501")
 * @param {string} course.name - Course name
 * @param {number} course.credits - Number of credits
 * @param {string} course.description - Course description (for degree variant)
 * @param {string} course.note - Optional note (for degree variant)
 * @param {string} course.faculty - Faculty name (for certificate variant)
 * @param {string} course.focus - Course focus (for certificate variant)
 * @param {string} course.whatYouDo - What you'll do description (for certificate variant)
 * @param {Array} course.topics - Array of topics (for certificate variant)
 * @param {string} course.deliverable - Deliverable description (for certificate variant)
 * @param {string} course.labs - Labs description (for certificate variant)
 * @param {string} course.project - Project description (for certificate variant)
 * @param {string} course.modules - Modules content (for certificate variant)
 * @param {string} variant - "degree" or "certificate"
 * @param {boolean} defaultOpen - Whether to start expanded
 */
export const CourseCard = ({
  course,
  variant = "degree",
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  // Build display title
  const displayTitle = course.code
    ? `${course.code} – ${course.name}${course.credits ? ` (${course.credits} credits)` : ""}`
    : `${course.name}${course.credits ? ` (${course.credits} credits)` : ""}`;

  return (
    <div className="course-item border-b border-stevens-light-gray last:border-b-0">
      <button
        className="w-full flex items-center justify-between py-4 px-2 text-left hover:bg-stevens-light-gray/30 transition-colors duration-200"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="font-stevens-body font-medium text-stevens-dark-gray text-stevens-base md:text-stevens-lg pr-4">
          {displayTitle}
        </span>
        <span className="course-arrow text-stevens-gray flex-shrink-0 text-lg">
          {isOpen ? "▲" : "▼"}
        </span>
      </button>

      {isOpen && (
        <div className="course-content px-2 pb-4 pt-2 bg-stevens-light-gray/20 rounded-b-sm">
          {variant === "certificate" ? (
            // Certificate detailed format
            <div className="space-y-3">
              {course.faculty && (
                <p className="text-stevens-sm text-stevens-dark-gray leading-relaxed">
                  <strong className="font-semibold">Faculty:</strong>{" "}
                  {course.faculty}
                </p>
              )}
              {course.focus && (
                <p className="text-stevens-sm text-stevens-dark-gray leading-relaxed">
                  <strong className="font-semibold">Focus:</strong>{" "}
                  {course.focus}
                </p>
              )}
              {course.whatYouDo && (
                <p className="text-stevens-sm text-stevens-dark-gray leading-relaxed">
                  <strong className="font-semibold">What You'll Do:</strong>{" "}
                  {course.whatYouDo}
                </p>
              )}
              {course.topics && course.topics.length > 0 && (
                <p className="text-stevens-sm text-stevens-dark-gray leading-relaxed">
                  <strong className="font-semibold">Topics:</strong>{" "}
                  {course.topics.join(", ")}
                </p>
              )}
              {course.modules && (
                <div className="text-stevens-sm text-stevens-dark-gray leading-relaxed">
                  <strong className="font-semibold">Modules:</strong>
                  {Array.isArray(course.modules) ? (
                    <ol className="list-decimal ml-5 mt-2 space-y-1">
                      {course.modules.map((mod, i) => (
                        <li key={i}>{mod}</li>
                      ))}
                    </ol>
                  ) : (
                    <span> {course.modules}</span>
                  )}
                </div>
              )}
              {course.labs && (
                <p className="text-stevens-sm text-stevens-dark-gray leading-relaxed">
                  <strong className="font-semibold">Labs:</strong> {course.labs}
                </p>
              )}
              {course.practice && (
                <p className="text-stevens-sm text-stevens-dark-gray leading-relaxed">
                  <strong className="font-semibold">Practice:</strong>{" "}
                  {course.practice}
                </p>
              )}
              {course.project && (
                <p className="text-stevens-sm text-stevens-dark-gray leading-relaxed">
                  <strong className="font-semibold">Project:</strong>{" "}
                  {course.project}
                </p>
              )}
              {course.deliverable && (
                <p className="text-stevens-sm text-stevens-dark-gray leading-relaxed">
                  <strong className="font-semibold">Deliverable:</strong>{" "}
                  {course.deliverable}
                </p>
              )}
            </div>
          ) : (
            // Degree simple format
            <div className="space-y-2">
              {course.description && (
                <div className="text-stevens-sm text-stevens-dark-gray leading-relaxed space-y-2">
                  {course.description.split("\n\n").map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              )}
              {course.note && (
                <p className="text-stevens-sm text-stevens-dark-gray leading-relaxed italic mt-2">
                  Note: {course.note}
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
