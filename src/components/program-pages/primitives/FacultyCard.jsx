import React from 'react';

/**
 * FacultyCard - Displays a faculty member with photo and title
 * 
 * Design: CPE Brand Guidelines - Clean B&W design
 * Features:
 * - Circular photo with hover shadow effect
 * - Fallback to initials if no image provided
 * - Responsive width (180px mobile, 220px desktop)
 * 
 * Used in: FacultySection (horizontal scroll carousel)
 * 
 * @param {Object} member - Faculty member data
 * @param {string} member.name - Full name
 * @param {string} member.title - Job title / position
 * @param {string} member.image - Image URL (optional)
 */
export const FacultyCard = ({ member }) => {
  const { name, title, image } = member;
  const hasImage = image && image.trim() !== '';
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className="text-center snap-center flex-shrink-0 w-[180px] stevens-md:w-[220px] group">
      {hasImage ? (
        <img
          src={image}
          alt={name}
          className="w-32 h-32 rounded-full mx-auto mb-stevens-md object-cover shadow-md transition-shadow duration-300 group-hover:shadow-lg"
          loading="lazy"
        />
      ) : (
        <div className="w-32 h-32 rounded-full mx-auto mb-stevens-md bg-stevens-dark-gray flex items-center justify-center shadow-md transition-shadow duration-300 group-hover:shadow-lg">
          <span className="text-stevens-white font-stevens-display font-light text-stevens-2xl">
            {initials}
          </span>
        </div>
      )}
      <h4 className="font-stevens-display font-light text-stevens-lg text-stevens-dark-gray">
        {name}
      </h4>
      <p className="text-stevens-sm text-stevens-gray">{title}</p>
    </div>
  );
};
