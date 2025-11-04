import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import LeadCaptureForm from '../forms/LeadCaptureForm';

/**
 * RequestInfoModal - Modal wrapper for LeadCaptureForm
 * @param {boolean} isOpen - Modal open state
 * @param {Function} onClose - Close handler
 * @param {string} sourcePage - Source page identifier for tracking
 * @param {string} programOfInterest - Program code for pre-filling form
 */
export default function RequestInfoModal({ isOpen, onClose, sourcePage = 'unknown', programOfInterest = '' }) {
  const [mountKey, setMountKey] = useState(0);

  // Force remount of LeadCaptureForm when modal opens to ensure script loads
  useEffect(() => {
    if (isOpen) {
      setMountKey(prev => prev + 1);
    }
  }, [isOpen]);

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
          <div className="relative bg-gradient-to-r from-gray-600 to-red-800 text-stevens-white px-3 sm:px-stevens-md py-3 sm:py-stevens-lg rounded-t-stevens-lg">
            <h2 className="font-stevens-display text-lg sm:text-stevens-xl md:text-stevens-2xl lg:text-stevens-3xl font-stevens-bold text-center pr-6 sm:pr-8 leading-tight">
              Request Information
            </h2>
            <p className="text-center text-stevens-white/90 mt-1 sm:mt-stevens-xs text-xs sm:text-stevens-sm leading-tight">
              Take the next step in your career journey
            </p>
            {/* Close Button - Fixed to modal */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2  z-50 text-stevens-gray-400 hover:text-stevens-gray-600 transition-colors duration-stevens-fast bg-white rounded-full p-1 sm:p-stevens-xs shadow-stevens-md hover:shadow-stevens-lg"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          </div>

          {/* Content */}
          <div className="p-stevens-sm sm:p-stevens-md md:p-stevens-lg bg-stevens-gray-50">
            <LeadCaptureForm 
              key={`request-info-${mountKey}`}
              title="Get Program Details"
              subtitle="An admissions advisor will contact you shortly."
              sourcePage={sourcePage}
              programOfInterest={programOfInterest}
            />
          </div>

          {/* Footer */}
          <div className="bg-stevens-gray-50 px-stevens-sm sm:px-stevens-md py-2 sm:py-stevens-sm border-t border-stevens-gray-200 rounded-b-stevens-lg">
            <p className="text-[10px] sm:text-stevens-xs text-stevens-gray-600 text-center leading-tight">
              Have questions? <a href="https://outlook.office.com/book/CPEAdmissionsStevensedu@stevens0.onmicrosoft.com/?ismsaljsauthenabled" target="_blank" rel="noopener noreferrer" className="text-stevens-primary hover:underline font-stevens-semibold">Schedule a call</a> with our admissions team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

