import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, GraduationCap } from 'lucide-react';

/**
 * ProgramCard - Beautiful card component for displaying program information
 * @param {Object} program - Program data object
 * @param {Function} onClick - Click handler to open program details
 */
const ProgramCard = ({ program, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className="group relative bg-stevens-white rounded-stevens-lg shadow-stevens-lg hover:shadow-stevens-2xl border border-stevens-gray-200 hover:border-stevens-primary overflow-hidden cursor-pointer transition-all duration-stevens-normal"
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-stevens-gray-100 to-stevens-gray-200">
        <img
          src={program.image}
          alt={program.name}
          className="w-full h-full object-cover transition-transform duration-stevens-slow group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Degree Badge */}
        <div className="absolute top-stevens-md left-stevens-md">
          <div className="bg-stevens-primary/90 backdrop-blur-sm text-stevens-white px-stevens-md py-stevens-xs rounded-stevens-md font-stevens-semibold text-stevens-sm">
            {program.degree}
          </div>
        </div>

        {/* Hover Arrow */}
        <div className="absolute bottom-stevens-md right-stevens-md opacity-0 group-hover:opacity-100 transition-opacity duration-stevens-normal">
          <div className="bg-stevens-white text-stevens-primary p-stevens-sm rounded-full">
            <ArrowRight className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-stevens-lg">
        {/* Title */}
        <h3 className="font-stevens-display text-stevens-xl font-stevens-bold text-stevens-gray-900 mb-stevens-xs group-hover:text-stevens-primary transition-colors duration-stevens-normal">
          {program.shortName}
        </h3>

        {/* Tagline */}
        <p className="text-stevens-sm text-stevens-primary font-stevens-semibold mb-stevens-md">
          {program.tagline}
        </p>

        {/* Description */}
        <p className="text-stevens-base text-stevens-gray-700 leading-relaxed mb-stevens-lg line-clamp-3">
          {program.description}
        </p>

        {/* Highlights */}
        <div className="flex flex-wrap gap-stevens-xs mb-stevens-md">
          {program.highlights.slice(0, 3).map((highlight, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-stevens-xs bg-stevens-gray-50 text-stevens-gray-700 px-stevens-sm py-stevens-xs rounded-stevens-sm text-stevens-xs font-stevens-medium"
            >
              <GraduationCap className="w-3 h-3 text-stevens-primary" />
              {highlight}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-stevens-md pt-stevens-md border-t border-stevens-gray-200">
          <div>
            <p className="text-stevens-xs text-stevens-gray-600 mb-stevens-xs">Duration</p>
            <p className="font-stevens-semibold text-stevens-gray-900">{program.stats.duration}</p>
          </div>
          <div>
            <p className="text-stevens-xs text-stevens-gray-600 mb-stevens-xs">Credits</p>
            <p className="font-stevens-semibold text-stevens-gray-900">{program.stats.credits}</p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-stevens-md pt-stevens-md border-t border-stevens-gray-200">
          <button className="w-full flex items-center justify-center gap-stevens-sm text-stevens-primary hover:text-stevens-maroon-dark font-stevens-semibold text-stevens-sm transition-colors duration-stevens-normal group-hover:gap-stevens-md">
            View Program Details
            <ArrowRight className="w-4 h-4 transition-transform duration-stevens-normal group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProgramCard;

