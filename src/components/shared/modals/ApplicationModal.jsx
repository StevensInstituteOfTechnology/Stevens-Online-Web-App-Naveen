import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { X, Zap, Check } from "lucide-react";
import { createPageUrl } from "@/utils";
import { BOOKING_URLS } from "@/config/constants";
import { trackConversion, CONVERSION_LABELS } from "@/utils/gtmTracking";
import { trackEvent } from "@/utils/analytics/vercelTracking";
import { useProgramContext } from "@/contexts/analytics/ProgramContext";

/**
 * ApplicationModal - Shows ASAP Application option for MEM program
 * Redirects to ASAP page for trial courses pathway
 */
export default function ApplicationModal({ isOpen, onClose }) {
  const modalOpenTime = useRef(null);
  const programContext = useProgramContext();
  const hasTrackedOpen = useRef(false);

  // Track modal open/close
  useEffect(() => {
    if (isOpen) {
      modalOpenTime.current = Date.now();

      // Track modal open (only once per open)
      if (!hasTrackedOpen.current) {
        trackEvent("application_modal_opened", {
          modal_name: "asap_application",
          program_code: programContext?.programCode || "mem",
          options_shown: "asap",
          options_count: 1,
        });
        hasTrackedOpen.current = true;
      }
    } else if (modalOpenTime.current) {
      const timeOpen = Math.floor((Date.now() - modalOpenTime.current) / 1000);
      trackEvent("application_modal_closed", {
        modal_name: "asap_application",
        program_code: programContext?.programCode || "mem",
        time_open_seconds: timeOpen,
      });
      modalOpenTime.current = null;
      hasTrackedOpen.current = false; // Reset for next open
    }
  }, [isOpen, programContext]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const asapBenefits = [
    "No letters of recommendation required",
    "No personal statements needed",
    "Complete two foundational courses",
    "Earn credit toward your full degree",
  ];

  return (
    <div
      role="button"
      tabIndex={0}
      className="fixed inset-0 z-[99999] overflow-y-auto p-3 sm:p-4 md:p-6 bg-black/60 animate-in fade-in duration-300 cursor-default"
      onClick={onClose}
      onKeyDown={(e) => { if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') onClose(); }}
      aria-label="Close modal"
    >
      <div className="min-h-full flex items-center justify-center py-4 sm:py-6 md:py-8">
        <div
          role="button"
          tabIndex={0}
          className="relative w-full max-w-lg bg-white rounded-lg shadow-2xl animate-in zoom-in-95 duration-300 mx-auto"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-stevens-dark-gray text-white px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 rounded-t-lg relative">
            <h2 className="font-stevens-display text-lg sm:text-xl md:text-2xl font-light uppercase tracking-wide text-center leading-tight pr-8 sm:pr-10">
              Apply Now
            </h2>
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 md:top-5 md:right-6 p-2 text-white hover:text-gray-300 transition-colors duration-200"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6 md:p-8">
            {/* ASAP Application */}
            <div className="bg-white">
              {/* Icon and Title */}
              <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="bg-stevens-light-gray p-2.5 sm:p-3 rounded-lg flex-shrink-0">
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-stevens-dark-gray" />
                </div>
                <div className="flex-1">
                  <h3 className="font-stevens-display text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-wide text-stevens-dark-gray mb-1">
                    ASAP Application
                  </h3>
                  <p className="text-xs sm:text-sm text-stevens-dark-gray font-medium">
                    Fast-track your admission
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base text-stevens-dark-gray mb-4 sm:mb-5 md:mb-6 leading-relaxed">
                Begin your graduate studies immediately by enrolling in two
                foundational courses. Earn a B or better and get full admission
                with credit in hand.
              </p>

              {/* Benefits List */}
              <div className="bg-gray-50 rounded-lg p-3 sm:p-4 mb-4 sm:mb-5 md:mb-6">
                <h4 className="font-bold text-xs sm:text-sm uppercase tracking-wider text-stevens-dark-gray mb-2 sm:mb-3">
                  Why Choose ASAP?
                </h4>
                <ul className="space-y-2 sm:space-y-2.5">
                  {asapBenefits.map((benefit, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 sm:gap-2.5 text-xs sm:text-sm"
                    >
                      <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stevens-red mt-0.5 flex-shrink-0" />
                      <span className="text-stevens-dark-gray leading-relaxed">
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Footnote */}
              <p className="text-xs text-gray-500 italic mb-4 sm:mb-5">
                Bachelor's degree is required. By earning a grade of B or better
                in each course, you demonstrate your readiness for the program.
              </p>

              {/* CTA Button */}
              <Link
                to={createPageUrl("ASAP") + "?program=mem"}
                className="block w-full bg-stevens-red text-white text-center font-semibold py-3 sm:py-3.5 px-4 sm:px-6 rounded-md hover:bg-red-700 transition-colors duration-200 text-sm sm:text-base"
                onClick={() => {
                  sessionStorage.setItem("asap_application_program", "mem");
                  sessionStorage.setItem("asap_application_source", "modal");

                  trackConversion(CONVERSION_LABELS.APPLY_NOW);
                  trackEvent("application_option_selected", {
                    option: "asap",
                    program_code: "mem",
                    from_modal: "application_modal",
                    is_conversion: true,
                  });
                }}
              >
                Start ASAP Application
              </Link>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-4 sm:px-6 md:px-8 py-4 sm:py-5 border-t border-gray-200 rounded-b-lg">
            <p className="text-xs sm:text-sm text-stevens-dark-gray text-center mb-3 sm:mb-4 leading-relaxed">
              Have questions?{" "}
              <a
                href={BOOKING_URLS.SCHEDULE_CALL}
                className="text-stevens-red hover:underline font-semibold"
              >
                Contact our admissions team
              </a>
            </p>
            <button
              onClick={onClose}
              className="w-full px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm rounded-md border-2 border-gray-300 bg-white text-stevens-dark-gray font-semibold hover:bg-gray-50 transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
