import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

/**
 * CourseCard - Card-based course component with expandable description
 *
 * Design: Modern card layout with:
 * - Course code as red pill badge
 * - Course name as bold title
 * - Credits badge on the left of description (visible only when expanded)
 * - Badge and description hidden until expand arrow is clicked
 * - Smooth expand/collapse animation
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
  const [isExpanded, setIsExpanded] = useState(defaultOpen);

  const hasExpandableContent =
    variant === "degree"
      ? !!(course.description || course.note)
      : !!(
          course.faculty ||
          course.focus ||
          course.whatYouDo ||
          course.topics?.length ||
          course.modules ||
          course.labs ||
          course.practice ||
          course.project ||
          course.deliverable
        );

  return (
    <div className="course-card bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6">
      {/* Card Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        {/* Left: Course Code Badge + Title */}
        <div className="flex flex-wrap items-center gap-3 flex-1">
          {course.code && (
            <span className="inline-flex items-center px-3 py-1 text-sm font-semibold bg-stevens-red text-white rounded-full whitespace-nowrap">
              {course.code}
            </span>
          )}
          <h4 className="font-stevens-display text-lg md:text-xl font-bold text-stevens-dark-gray">
            {course.name}
          </h4>
        </div>

        {/* Right: Expand/collapse arrow icon */}
        {hasExpandableContent && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 text-stevens-dark-gray transition-colors duration-200"
            aria-expanded={isExpanded}
            aria-label={isExpanded ? "Collapse" : "Expand"}
          >
            <ChevronDown
              className={`w-5 h-5 transition-transform duration-300 ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </button>
        )}
      </div>

      {/* Expanded content: Credits badge on left, description on right (only visible after Read More) */}
      {isExpanded && (
        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-200 animate-in fade-in slide-in-from-top-2 duration-300">
          {/* Left: Credits Badge */}
          {course.credits && (
            <div className="flex-shrink-0 flex flex-col items-center justify-center w-20 py-3 px-4 bg-gray-50 rounded-lg border border-stevens-light-gray shadow-sm">
              <span className="text-3xl font-bold text-stevens-dark-gray leading-none">
                {course.credits}
              </span>
              <span className="text-xs font-semibold uppercase tracking-widest text-stevens-dark-gray mt-1">
                {course.credits === 1 ? "Credit" : "Credits"}
              </span>
            </div>
          )}
          {/* Right: Description / Content */}
          <div
            className={`flex-1 min-w-0 space-y-3 ${
              course.credits ? "border-l border-gray-200 pl-4" : ""
            }`}
          >
            {variant === "degree" && course.description && (
              <p className="text-stevens-dark-gray leading-relaxed">
                {course.description}
              </p>
            )}
            {variant === "certificate" && course.focus && (
              <p className="text-stevens-dark-gray leading-relaxed">
                {course.focus}
              </p>
            )}
            {variant === "certificate" && course.faculty && (
              <p className="text-stevens-sm text-stevens-dark-gray leading-relaxed">
                <strong className="font-semibold text-stevens-dark-gray">
                  Faculty:
                </strong>{" "}
                {course.faculty}
              </p>
            )}
            {variant === "certificate" && course.whatYouDo && (
              <p className="text-stevens-sm text-stevens-dark-gray leading-relaxed">
                <strong className="font-semibold text-stevens-dark-gray">
                  What You'll Do:
                </strong>{" "}
                {course.whatYouDo}
              </p>
            )}
            {variant === "certificate" && course.topics && course.topics.length > 0 && (
              <p className="text-stevens-sm text-stevens-dark-gray leading-relaxed">
                <strong className="font-semibold text-stevens-dark-gray">
                  Topics:
                </strong>{" "}
                {course.topics.join(", ")}
              </p>
            )}
            {variant === "certificate" && course.modules && (
              <div className="text-stevens-sm text-stevens-dark-gray leading-relaxed">
                <strong className="font-semibold text-stevens-dark-gray">
                  Modules:
                </strong>
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
            {variant === "certificate" && course.labs && (
              <p className="text-stevens-sm text-stevens-dark-gray leading-relaxed">
                <strong className="font-semibold text-stevens-dark-gray">
                  Labs:
                </strong>{" "}
                {course.labs}
              </p>
            )}
            {variant === "certificate" && course.practice && (
              <p className="text-stevens-sm text-stevens-dark-gray leading-relaxed">
                <strong className="font-semibold text-stevens-dark-gray">
                  Practice:
                </strong>{" "}
                {course.practice}
              </p>
            )}
            {variant === "certificate" && course.project && (
              <p className="text-stevens-sm text-stevens-dark-gray leading-relaxed">
                <strong className="font-semibold text-stevens-dark-gray">
                  Project:
                </strong>{" "}
                {course.project}
              </p>
            )}
            {variant === "certificate" && course.deliverable && (
              <p className="text-stevens-sm text-stevens-dark-gray leading-relaxed">
                <strong className="font-semibold text-stevens-dark-gray">
                  Deliverable:
                </strong>{" "}
                {course.deliverable}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Note (for degree variant, shown when expanded) */}
      {variant === "degree" && course.note && isExpanded && (
        <p className="text-stevens-sm text-gray-500 leading-relaxed italic mt-3 border-l-2 border-stevens-red pl-3 animate-in fade-in duration-300">
          Note: {course.note}
        </p>
      )}
    </div>
  );
};
