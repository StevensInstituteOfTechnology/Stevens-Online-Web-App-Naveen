import React from "react";
import { User } from "lucide-react";

/**
 * FacultyCard - Individual faculty member card with diagonal-cut corner
 *
 * Design: Modern card with diagonal-cut top-right corner
 * Features:
 * - Diagonal clip-path effect on entire card
 * - Portrait aspect ratio (3:4) for headshots
 * - object-top positioning to preserve faces
 * - Fallback to User icon if no image provided
 * - Hover shadow effect
 *
 * Used in: FacultySection (carousel/grid layout)
 *
 * @param {Object} member - Faculty member data
 * @param {string} member.name - Full name
 * @param {string} member.title - Job title / position
 * @param {string} member.image - Image URL (optional)
 */
export const FacultyCard = ({ member }) => {
  // Top-right corner diagonal cut - applied to entire card
  const clipPath = "polygon(0 0, 85% 0, 100% 15%, 100% 100%, 0 100%)";

  return (
    <div
      className="bg-stevens-light-gray overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
      style={{ clipPath }}
    >
      {/* Photo - portrait aspect ratio for headshots */}
      <div className="relative overflow-hidden aspect-[3/4]">
        {member.image ? (
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover object-top"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-stevens-gray/30 flex items-center justify-center">
            <User className="w-20 h-20 text-stevens-gray" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="px-6 py-8">
        <h3 className="font-stevens-display text-2xl lg:text-[1.75rem] font-medium text-stevens-black mb-2">
          {member.name}
        </h3>
        {member.title && (
          <p className="text-stevens-red text-base leading-relaxed">
            {member.title}
          </p>
        )}
      </div>
    </div>
  );
};
