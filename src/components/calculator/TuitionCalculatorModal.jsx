import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  X,
  Calculator,
  Send,
  Mail,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getProgramByCode } from "@/data/programsData";
import { getProgramPricing } from "@/utils/discountCalculator";
import { trackEvent } from "@/utils/analytics/vercelTracking";
import { trackConversion, CONVERSION_LABELS } from "@/utils/gtmTracking";
import { BOOKING_URLS } from "@/config/constants";
import TuitionCalculatorBody from "./TuitionCalculatorBody";

/**
 * TuitionCalculatorModal
 *
 * A reusable modal calculator that shows tuition breakdown with discount options.
 * Pre-configured for a specific program (no questionnaire needed).
 * Uses TuitionCalculatorBody for the core calculator UI.
 *
 * @param {string} programCode - The program code (e.g., 'mba', 'mscs', 'cert-eai')
 * @param {boolean} isOpen - Whether the modal is open
 * @param {function} onClose - Callback to close the modal
 */
export default function TuitionCalculatorModal({
  programCode,
  isOpen,
  onClose,
}) {
  // Cost result from the shared body (for footer CTAs)
  const [calculatedCost, setCalculatedCost] = useState(null);

  // Get program info for header
  const programPricing = getProgramPricing(programCode);
  const programData = getProgramByCode(programCode);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!programPricing || !programData) return null;

  // Build application URL
  // MEM uses ASAP application, all others use Accelerated Application
  const getApplicationUrl = () => {
    const utmParams = `utm_source=microsite&utm_medium=tuition_calculator&utm_campaign=calculator-modal&utm_content=${programCode}`;

    // MEM program uses ASAP application page
    if (programCode === "mem") {
      return {
        url: `/asap/?program=${programCode}&${utmParams}`,
        isExternal: false,
      };
    }

    // All other programs use Accelerated Application page
    return {
      url: `/accelerated-application/?program=${programCode}&${utmParams}`,
      isExternal: false,
    };
  };

  const applicationLink = getApplicationUrl();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-stevens-light-gray bg-white">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-stevens-dark-gray/10 flex items-center justify-center">
                  <Calculator className="w-4.5 h-4.5 text-stevens-dark-gray" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-stevens-dark-gray font-stevens-headers">
                    Tuition Calculator
                  </h2>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Badge className="bg-stevens-red text-white text-[11px] font-semibold tracking-wide">
                      {programData.degree}
                    </Badge>
                    <span className="text-sm text-stevens-gray">
                      {calculatedCost?.programName || programData.name}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center text-stevens-gray hover:text-stevens-dark-gray hover:bg-stevens-light-gray transition-colors"
                aria-label="Close calculator"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body - Scrollable, uses shared calculator component */}
            <div className="flex-1 overflow-y-auto">
              <TuitionCalculatorBody
                key={isOpen ? programCode : "closed"}
                programCode={programCode}
                onCostChange={setCalculatedCost}
              />
            </div>

            {/* Footer - CTAs */}
            {calculatedCost && (
              <div className="border-t border-stevens-light-gray bg-white px-6 py-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  {/* Primary CTA - Apply Now */}
                  {applicationLink.isExternal ? (
                    <a
                      href={applicationLink.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                      onClick={() => {
                        trackEvent("cta_click", {
                          cta_type: "apply_now",
                          cta_location: "tuition_calculator_modal",
                          program_code: programCode,
                          final_price: calculatedCost.finalPrice,
                          application_type: "external",
                        });
                        trackConversion(CONVERSION_LABELS.APPLY_NOW);
                      }}
                    >
                      <Button
                        size="lg"
                        className="w-full text-stevens-white bg-stevens-red group py-3"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Apply Now
                        <ExternalLink className="w-3.5 h-3.5 ml-2" />
                      </Button>
                    </a>
                  ) : (
                    <Link
                      to={applicationLink.url}
                      className="flex-1"
                      onClick={() => {
                        trackEvent("cta_click", {
                          cta_type: "apply_now",
                          cta_location: "tuition_calculator_modal",
                          program_code: programCode,
                          final_price: calculatedCost.finalPrice,
                          application_type:
                            programCode === "mem" ? "asap" : "accelerated",
                        });
                        trackConversion(CONVERSION_LABELS.APPLY_NOW);
                      }}
                    >
                      <Button
                        size="lg"
                        className="w-full text-stevens-white bg-stevens-red group py-3"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Apply Now
                        <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  )}

                  {/* Secondary CTA - Talk to advisor */}
                  <a
                    href={BOOKING_URLS.SCHEDULE_CALL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                    onClick={() => {
                      trackEvent("cta_click", {
                        cta_type: "schedule_call",
                        cta_location: "tuition_calculator_modal",
                        program_code: programCode,
                      });
                    }}
                  >
                    <Button size="lg" variant="outline" className="w-full py-3">
                      <Mail className="w-4 h-4 mr-2" />
                      Talk to an Advisor
                    </Button>
                  </a>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
