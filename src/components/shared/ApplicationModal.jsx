import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { X, ExternalLink, Zap, Check } from 'lucide-react';
import { createPageUrl } from '@/utils';
import { BOOKING_URLS } from '@/config/constants';
import { trackConversion, CONVERSION_LABELS } from '@/utils/gtmTracking';
import { trackEvent } from '@/utils/analytics/vercelTracking';
import { useProgramContext } from '@/contexts/analytics/ProgramContext';

/**
 * ApplicationModal - Shows two application options for MEM and MSCS pages
 * Option 1: Standard Application (redirect to Stevens website)
 * Option 2: ASAP Application (redirect to ASAP page)
 */
export default function ApplicationModal({ isOpen, onClose, traditionalLink }) {
  const modalOpenTime = useRef(null);
  const programContext = useProgramContext();
  const hasTrackedOpen = useRef(false);
  
  // Track modal open/close
  useEffect(() => {
    if (isOpen) {
      modalOpenTime.current = Date.now();
      
      // Track modal open (only once per open)
      if (!hasTrackedOpen.current) {
        trackEvent('application_modal_opened', {
          modal_name: 'application_options',
          program_code: programContext?.programCode || 'unknown',
          options_shown: 'standard,asap',
          options_count: 2
        });
        hasTrackedOpen.current = true;
      }
    } else if (modalOpenTime.current) {
      const timeOpen = Math.floor((Date.now() - modalOpenTime.current) / 1000);
      trackEvent('application_modal_closed', {
        modal_name: 'application_options',
        program_code: programContext?.programCode || 'unknown',
        time_open_seconds: timeOpen
      });
      modalOpenTime.current = null;
      hasTrackedOpen.current = false; // Reset for next open
    }
  }, [isOpen, programContext]);
  
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
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

  if (!isOpen) return null;

  const asapBenefits = [
    "No letters of recommendation required",
    "No personal statements needed",
    "No prior coding experience necessary",
    "Earn credit toward your full degree"
  ];

  return (
    <div 
      className="fixed inset-0 z-[99999] overflow-y-auto p-2 sm:p-4 bg-black/60 animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div className="min-h-full flex items-center justify-center py-4 sm:py-8">
        <div 
          className="relative w-full max-w-2xl bg-stevens-white rounded-stevens-lg shadow-stevens-2xl animate-in zoom-in-95 duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-gray-600 to-red-800 text-stevens-white px-3 sm:px-stevens-md py-3 sm:py-stevens-lg rounded-t-stevens-lg">
            <h2 className="font-stevens-display text-base sm:text-stevens-lg md:text-stevens-xl lg:text-stevens-2xl font-stevens-bold text-center leading-tight">
              Select the application option that works best for you
            </h2>
          </div>

          {/* Content */}
          <div className="p-stevens-sm sm:p-stevens-md">
            <div className="grid stevens-md:grid-cols-2 gap-stevens-sm sm:gap-stevens-md">

          {/* ASAP Application - Featured */}
          <div className="bg-gradient-to-br from-stevens-light-gray to-stevens-light-gray border-2 border-stevens-red rounded-stevens-md p-stevens-md hover:shadow-stevens-xl transition-all duration-stevens-normal relative overflow-hidden">
            {/* Recommended Badge */}
            <div className="absolute top-0 right-0 bg-stevens-red text-stevens-white px-stevens-sm py-stevens-xs text-[10px] font-stevens-bold uppercase tracking-wide">
              Recommended
            </div>

            <div className="flex items-start gap-stevens-sm mb-stevens-sm mt-stevens-sm">
              <div className="bg-stevens-light-gray p-stevens-sm rounded-stevens-md">
                <Zap className="w-5 h-5 text-stevens-red" />
              </div>
              <div className="flex-1">
                <h3 className="font-stevens-display text-stevens-lg font-stevens-bold text-stevens-dark-gray mb-stevens-xs">
                  ASAP Application
                </h3>
                <p className="text-stevens-xs text-stevens-red font-stevens-semibold">
                  Fast-track your admission
                </p>
              </div>
            </div>

            <p className="text-stevens-sm text-stevens-dark-gray mb-stevens-sm leading-relaxed">
              Begin your graduate studies immediately by enrolling in two foundational courses. Earn a B or better and get full admission with credit in hand.
            </p>

            <div className="bg-stevens-white rounded-stevens-md p-stevens-sm mb-stevens-md">
              <h4 className="font-stevens-bold text-stevens-xs uppercase tracking-wider text-stevens-dark-gray mb-stevens-xs">
                Why Choose ASAP?
              </h4>
              <ul className="space-y-stevens-xs">
                {asapBenefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-stevens-xs text-stevens-xs">
                    <Check className="w-3 h-3 text-stevens-red mt-0.5 flex-shrink-0" />
                    <span className="text-stevens-dark-gray">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link 
              to={createPageUrl('ASAP') + `?program=${programContext?.programCode || 'unknown'}`}
              className="btn-stevens-red w-full text-center inline-block"
              onClick={() => {
                // Store program in sessionStorage for persistence
                sessionStorage.setItem('asap_application_program', programContext?.programCode || 'unknown');
                sessionStorage.setItem('asap_application_source', 'modal');
                
                trackConversion(CONVERSION_LABELS.APPLY_NOW);
                trackEvent('application_option_selected', {
                  option: 'asap',
                  program_code: programContext?.programCode || 'unknown',
                  from_modal: 'application_options',
                  is_conversion: true
                });
              }}
            >
              Start ASAP Application
            </Link>
          </div>
          {/* Standard Application */}
          <div className="bg-stevens-white border-2 border-stevens-light-gray rounded-stevens-md p-stevens-md hover:border-stevens-red hover:shadow-stevens-lg transition-all duration-stevens-normal group">
            <div className="flex items-start gap-stevens-sm mb-stevens-sm">
              <div className="bg-stevens-light-gray p-stevens-sm rounded-stevens-md group-hover:bg-stevens-light-gray transition-colors duration-stevens-normal">
                <ExternalLink className="w-5 h-5 text-stevens-dark-gray group-hover:text-stevens-red transition-colors duration-stevens-normal" />
              </div>
              <div className="flex-1">
                <h3 className="font-stevens-display text-stevens-lg font-stevens-bold text-stevens-dark-gray mb-stevens-xs">
                  Standard Application
                </h3>
                <p className="text-stevens-xs text-stevens-dark-gray">
                  Standard graduate application process
                </p>
              </div>
            </div>

            <p className="text-stevens-sm text-stevens-dark-gray mb-stevens-md leading-relaxed">
              Complete the full graduate application with all Standard requirements including transcripts, recommendations, and personal statements.
            </p>

            <a 
              href={traditionalLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-stevens-outline w-full text-center inline-block group-hover:bg-stevens-red group-hover:text-stevens-white group-hover:border-stevens-red transition-all duration-stevens-normal"
              onClick={() => {
                trackEvent('application_option_selected', {
                  option: 'standard',
                  program_code: programContext?.programCode || 'unknown',
                  from_modal: 'application_options',
                  destination_url: traditionalLink,
                  is_conversion: true
                });
              }}
            >
              Standard Application
            </a>
          </div>

          
          </div>
          </div>

          {/* Footer */}
          <div className="bg-stevens-light-gray px-stevens-sm sm:px-stevens-md py-2 sm:py-stevens-sm border-t border-stevens-light-gray rounded-b-stevens-lg">
            <p className="text-[10px] sm:text-stevens-xs text-stevens-dark-gray text-center mb-2 sm:mb-stevens-sm leading-tight">
              Have questions? <a href={BOOKING_URLS.SCHEDULE_CALL} target="_blank" rel="noopener noreferrer" className="text-stevens-red hover:underline font-stevens-semibold">Contact our admissions team</a>
            </p>
            <button
              onClick={onClose}
              className="w-full px-stevens-sm sm:px-stevens-md py-2 sm:py-stevens-sm text-xs sm:text-stevens-sm rounded-stevens-md border-2 border-stevens-light-gray bg-stevens-white text-stevens-dark-gray font-stevens-semibold hover:bg-stevens-light-gray transition-colors duration-stevens-normal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

