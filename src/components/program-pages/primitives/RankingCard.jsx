import React from 'react';

/**
 * RankingCard - Displays a ranking/statistic with source citation
 * 
 * Design: CPE Brand Guidelines - Clean B&W with red hover accent
 * Used in: RankingsSection ("By the Numbers")
 * 
 * @param {string} ranking - The main statistic (e.g., "#1", "100%", "$5,250")
 * @param {string} description - Short description of what the ranking means
 * @param {string} source - Citation/source text
 * @param {string} note - Optional footnote reference number
 */
export const RankingCard = ({ ranking, description, source, note }) => (
  <div className="group bg-stevens-white p-stevens-lg text-center h-full flex flex-col relative overflow-hidden border-t-4 border-stevens-black hover:border-stevens-red transition-all duration-300">
    {/* Top accent border - black default, red on hover */}

    <div className="flex-grow">
      {/* Large statistic number - B&W emphasis, red on hover */}
      <p className="font-stevens-display text-[3rem] md:text-[4rem] font-light text-stevens-black mb-stevens-sm leading-none transition-all duration-300 group-hover:text-stevens-red group-hover:scale-105">
        {ranking}
      </p>
      {/* Description text */}
      <p className="text-stevens-lg md:text-stevens-xl font-medium text-stevens-dark-gray mb-stevens-md leading-tight">
        {description}
      </p>
    </div>
    {/* Source text */}
    {source && (
      <p className="text-stevens-sm text-stevens-dark-gray mt-auto pt-stevens-sm">
        {source} {note && <sup>{note}</sup>}
      </p>
    )}
  </div>
);
