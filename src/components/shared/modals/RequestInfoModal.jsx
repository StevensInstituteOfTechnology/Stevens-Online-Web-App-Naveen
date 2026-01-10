import React, { useEffect, useState, useRef } from 'react';
import { X } from 'lucide-react';
import LeadCaptureForm from '@/components/forms/LeadCaptureForm';
import { trackEvent } from '@/utils/analytics/vercelTracking';

/**
 * RequestInfoModal - Modal wrapper for LeadCaptureForm
 * @param {boolean} isOpen - Modal open state
 * @param {Function} onClose - Close handler
 * @param {string} sourcePage - Source page identifier for tracking
 * @param {string} programOfInterest - Program code for pre-filling form
 * @param {Object} additionalUrlParams - Additional URL parameters for the form
 */
export default function RequestInfoModal({ isOpen, onClose, sourcePage = 'unknown', programOfInterest = '', additionalUrlParams = {} }) {
  const [mountKey, setMountKey] = useState(0);
  const modalOpenTime = useRef(null);
  const hasTrackedOpen = useRef(false);

  // Force remount of LeadCaptureForm when modal opens to ensure script loads
  useEffect(() => {
    if (isOpen) {
      setMountKey(prev => prev + 1);
      modalOpenTime.current = Date.now();
      
      // Track modal open (only once per open)
      if (!hasTrackedOpen.current) {
        trackEvent('rfi_modal_opened', {
          modal_name: 'request_info',
          source_page: sourcePage,
          program_code: programOfInterest || 'general'
        });
        hasTrackedOpen.current = true;
      }
    } else if (modalOpenTime.current) {
      // Track modal close
      const timeOpen = Math.floor((Date.now() - modalOpenTime.current) / 1000);
      trackEvent('rfi_modal_closed', {
        modal_name: 'request_info',
        source_page: sourcePage,
        program_code: programOfInterest || 'general',
        time_open_seconds: timeOpen
      });
      modalOpenTime.current = null;
      hasTrackedOpen.current = false; // Reset for next open
    }
  }, [isOpen, sourcePage, programOfInterest]);

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

  if (!isOpen) return null;

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
          <div className="relative bg-stevens-dark-gray text-stevens-white px-3 sm:px-stevens-md py-3 sm:py-stevens-lg rounded-t-stevens-lg">
            <h2 className="font-stevens-display text-lg sm:text-stevens-xl md:text-stevens-2xl lg:text-stevens-3xl font-light uppercase tracking-wide text-center pr-6 sm:pr-8 leading-tight">
              Request Information
            </h2>
            <p className="text-center text-stevens-white/90 mt-1 sm:mt-stevens-xs text-xs sm:text-stevens-sm leading-tight">
              Take the next step in your career journey
            </p>
            {/* Close Button - Fixed to modal */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2  z-50 text-stevens-gray hover:text-stevens-dark-gray transition-colors duration-stevens-fast bg-white rounded-full p-1 sm:p-stevens-xs shadow-stevens-md hover:shadow-stevens-lg"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          </div>

          {/* Content */}
          <div className="p-stevens-sm sm:p-stevens-md md:p-stevens-lg bg-stevens-white">
            <LeadCaptureForm 
              key={`request-info-${mountKey}`}
              title="Get Program Details"
              subtitle="An admissions advisor will contact you shortly."
              sourcePage={sourcePage}
              programOfInterest={programOfInterest}
              additionalUrlParams={additionalUrlParams}
              hideHeader={true}
            />
          </div>

          {/* Footer */}
          <div className="bg-stevens-light-gray px-stevens-sm sm:px-stevens-md py-2 sm:py-stevens-sm border-t border-stevens-light-gray rounded-b-stevens-lg">
            <p className="text-stevens-xs sm:text-stevens-sm text-stevens-dark-gray text-center leading-tight">
              Have questions? <a href="https://outlook.office.com/book/CPEAdmissionsStevensedu@stevens0.onmicrosoft.com/?ismsaljsauthenabled" target="_blank" rel="noopener noreferrer" className="text-stevens-red hover:underline font-stevens-semibold">Schedule a call</a> with our admissions team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

