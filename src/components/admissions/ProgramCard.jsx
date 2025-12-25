import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, GraduationCap, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { trackConversion, CONVERSION_LABELS } from '@/utils/gtmTracking';
import ApplicationModal from '../shared/ApplicationModal';
import { trackEvent } from '@/utils/analytics/vercelTracking';

/**
 * ProgramCard - Beautiful card component for displaying program information
 * @param {Object} program - Program data object
 * @param {Function} onApplyClick - Optional override for Apply Now button behavior
 */
const ProgramCard = ({ program, onApplyClick }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Determine application link based on config
  const getApplicationLink = () => {
    if (program.applicationConfig.type === 'direct') {
      return program.applicationConfig.link;
    } else if (program.applicationConfig.type === 'modal') {
      return program.applicationConfig.standardLink;
    }
    return 'https://gradadmissions.stevens.edu/apply/?pk=GRNP';
  };

  const isInternalAppLink = program.applicationConfig.type === 'direct' && 
    program.applicationConfig.link.startsWith('/');

  return (
    <>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-stevens-white rounded-stevens-lg shadow-stevens-lg hover:shadow-stevens-2xl border border-stevens-light-gray hover:border-stevens-red overflow-hidden transition-all duration-stevens-normal"
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden bg-stevens-light-gray">
        <img
          src={program.image}
          alt={program.name}
          className="w-full h-full object-cover transition-transform duration-stevens-slow group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Degree Badge */}
        <div className="absolute top-stevens-md left-stevens-md">
          <div className="bg-stevens-dark-gray backdrop-blur-sm text-stevens-white px-stevens-md py-stevens-xs rounded-stevens-md font-stevens-semibold text-stevens-sm">
            {program.degree}
          </div>
        </div>

        
      </div>

      {/* Content Section */}
      <div className="p-stevens-lg">
        {/* Title */}
        <h3 className="font-stevens-display text-stevens-xl font-stevens-bold text-stevens-dark-gray mb-stevens-xs group-hover:text-stevens-red transition-colors duration-stevens-normal">
          {program.shortName}
        </h3>

        {/* Tagline */}
        <p className="text-stevens-sm text-stevens-red font-stevens-semibold mb-stevens-md">
          {program.tagline}
        </p>

        {/* Description */}
        <p className="text-stevens-base text-stevens-dark-gray leading-relaxed mb-stevens-lg line-clamp-3">
          {program.description}
        </p>

        {/* Highlights */}
        <div className="flex flex-wrap gap-stevens-xs mb-stevens-md">
          {program.highlights.slice(0, 3).map((highlight, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-stevens-xs bg-stevens-light-gray text-stevens-dark-gray px-stevens-sm py-stevens-xs rounded-stevens-sm text-stevens-xs font-stevens-medium"
            >
              <GraduationCap className="w-3 h-3 text-stevens-red" />
              {highlight}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-stevens-md pt-stevens-md border-t border-stevens-light-gray">
          <div>
            <p className="text-stevens-xs text-stevens-dark-gray mb-stevens-xs">Duration</p>
            <p className="font-stevens-semibold text-stevens-dark-gray">{program.stats.duration}</p>
          </div>
          <div>
            <p className="text-stevens-xs text-stevens-dark-gray mb-stevens-xs">Credits</p>
            <p className="font-stevens-semibold text-stevens-dark-gray">{program.stats.credits}</p>
          </div>
        </div>

        {/* CTAs - Two Buttons */}
        <div className="mt-stevens-lg pt-stevens-md border-t border-stevens-light-gray flex gap-stevens-sm">
          {/* Explore Program Button - White bg, red text, red border */}
          <Link
            to={program.explorePage}
            className="flex-1"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="w-full btn-stevens-outline text-stevens-sm">
              Explore
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </Link>

          {/* Apply Now Button - Different behavior based on application type */}
          {onApplyClick ? (
            // Custom override provided (e.g., Alumni page scrolls to embedded form)
            <button
              onClick={(e) => {
                e.stopPropagation();
                onApplyClick(program);
                trackConversion(CONVERSION_LABELS.APPLY_NOW);
                trackEvent('apply_button_clicked', {
                  program_code: program.code,
                  program_name: program.shortName,
                  button_location: 'admissions_card',
                  application_type: 'custom_override'
                });
              }}
              className="flex-1 btn-stevens-red text-stevens-sm"
            >
              Apply Now
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          ) : program.applicationConfig.type === 'modal' ? (
            // Modal type (MSCS, MEM) - Opens modal to choose Standard vs ASAP
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsModalOpen(true);
                trackConversion(CONVERSION_LABELS.APPLY_NOW);
                trackEvent('apply_button_clicked', {
                  program_code: program.code,
                  program_name: program.shortName,
                  button_location: 'admissions_card',
                  application_type: 'modal',
                  modal_options: 'standard,asap'
                });
              }}
              className="flex-1 btn-stevens-red text-stevens-sm"
            >
              Apply Now
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          ) : isInternalAppLink ? (
            // Internal link (MEADS, Certificates) - Direct link to accelerated app
            <Link
              to={getApplicationLink() + `?program=${program.code}`}
              className="flex-1"
              onClick={(e) => {
                e.stopPropagation();
                sessionStorage.setItem('accelerated_application_program', program.code);
                trackConversion(CONVERSION_LABELS.APPLY_NOW);
                trackEvent('apply_button_clicked', {
                  program_code: program.code,
                  program_name: program.shortName,
                  button_location: 'admissions_card',
                  application_type: 'accelerated',
                  destination: getApplicationLink()
                });
              }}
            >
              <button className="w-full btn-stevens-red text-stevens-sm">
                Apply Now
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </Link>
          ) : (
            // External link (MBA) - Direct link to standard app
            <a
              href={getApplicationLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
              onClick={(e) => {
                e.stopPropagation();
                trackConversion(CONVERSION_LABELS.APPLY_NOW);
                trackEvent('apply_button_clicked', {
                  program_code: program.code,
                  program_name: program.shortName,
                  button_location: 'admissions_card',
                  application_type: 'standard',
                  destination: getApplicationLink(),
                  is_external: true
                });
              }}
            >
              <button className="w-full btn-stevens-red text-stevens-sm">
                Apply Now
                <ExternalLink className="w-4 h-4 ml-1" />
          </button>
            </a>
          )}
        </div>
      </div>
    </motion.div>

    {/* Application Modal for MSCS and MEM - Rendered outside card */}
    {program.applicationConfig.type === 'modal' && (
      <ApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        traditionalLink={program.applicationConfig.standardLink}
      />
    )}
    </>
  );
};

export default ProgramCard;

