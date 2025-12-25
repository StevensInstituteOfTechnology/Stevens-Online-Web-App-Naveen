import React, { useEffect } from 'react';
import { X, ExternalLink, Check, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import ApplicationOptionsDisplay from './ApplicationOptionsDisplay';

/**
 * ProgramDetailModal - Shows detailed program information in a modal
 * @param {Object} program - Program data object
 * @param {boolean} isOpen - Modal open state
 * @param {Function} onClose - Close handler
 */
const ProgramDetailModal = ({ program, isOpen, onClose }) => {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !program) return null;

  return (
    <div 
      className="fixed inset-0 z-[99999] flex items-center justify-center p-stevens-sm bg-black/60 animate-in fade-in duration-300 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl my-stevens-md bg-stevens-white rounded-stevens-lg shadow-stevens-2xl overflow-hidden animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-stevens-md right-stevens-md z-10 bg-stevens-white/90 backdrop-blur-sm text-stevens-dark-gray hover:text-stevens-dark-gray rounded-full p-stevens-sm shadow-stevens-md transition-all duration-stevens-normal hover:scale-110"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Hero Image */}
        <div className="relative h-64 bg-gradient-to-br from-stevens-light-gray to-stevens-light-gray overflow-hidden">
          <img
            src={program.image}
            alt={program.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-stevens-lg">
            <div className="mb-stevens-sm">
              <span className="bg-stevens-red text-stevens-white px-stevens-md py-stevens-xs rounded-stevens-md font-stevens-semibold text-stevens-sm">
                {program.degree}
              </span>
            </div>
            <h2 className="font-stevens-display text-stevens-3xl font-stevens-bold text-stevens-white mb-stevens-xs">
              {program.name}
            </h2>
            <p className="text-stevens-lg text-stevens-white/90 font-stevens-medium">
              {program.tagline}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-stevens-lg stevens-md:p-stevens-xl">
          {/* Description */}
          <div className="mb-stevens-xl">
            <h3 className="font-stevens-display text-stevens-xl font-stevens-bold text-stevens-dark-gray mb-stevens-md">
              Program Overview
            </h3>
            <p className="text-stevens-base text-stevens-dark-gray leading-relaxed">
              {program.description}
            </p>
          </div>

          {/* Highlights */}
          <div className="mb-stevens-xl">
            <h3 className="font-stevens-display text-stevens-xl font-stevens-bold text-stevens-dark-gray mb-stevens-md">
              Program Highlights
            </h3>
            <div className="grid stevens-md:grid-cols-2 gap-stevens-md">
              {program.highlights.map((highlight, index) => (
                <div key={index} className="flex items-start gap-stevens-sm">
                  <Check className="w-5 h-5 text-stevens-red flex-shrink-0 mt-0.5" />
                  <span className="text-stevens-base text-stevens-dark-gray">{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="mb-stevens-xl">
            <h3 className="font-stevens-display text-stevens-xl font-stevens-bold text-stevens-dark-gray mb-stevens-md">
              Program Details
            </h3>
            <div className="grid grid-cols-2 stevens-md:grid-cols-4 gap-stevens-md">
              {Object.entries(program.stats).map(([key, value]) => (
                <div key={key} className="bg-stevens-light-gray rounded-stevens-md p-stevens-md text-center">
                  <p className="text-stevens-2xl font-stevens-bold text-stevens-red mb-stevens-xs">
                    {value}
                  </p>
                  <p className="text-stevens-sm text-stevens-dark-gray capitalize">
                    {key}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Application Options */}
          <div className="mb-stevens-lg">
            <ApplicationOptionsDisplay 
              applicationConfig={program.applicationConfig}
              programCode={program.code}
            />
          </div>

          {/* Links */}
          <div className="grid stevens-md:grid-cols-2 gap-stevens-md pt-stevens-lg border-t border-stevens-light-gray">
            <Link 
              to={program.programPage}
              className="btn-stevens-outline flex items-center justify-center gap-stevens-sm group"
            >
              <GraduationCap className="w-5 h-5" />
              View Full Program Page
              <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            <Link 
              to={program.explorePage}
              className="btn-stevens-outline flex items-center justify-center gap-stevens-sm group"
            >
              Explore This Program
              <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramDetailModal;

