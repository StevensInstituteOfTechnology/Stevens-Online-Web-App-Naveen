import React, { useEffect, useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trackConversion, CONVERSION_LABELS } from "@/utils/gtmTracking";
import { trackEvent } from "@/utils/analytics/vercelTracking";
import { useProgramContext } from "@/contexts/analytics/ProgramContext";
import { FORM_IDS } from "@/config/formIds";
// Import centralized form styles (supports all form IDs)
import "@/styles/form-overrides.css";

export default function LeadCaptureForm({
  title = "Request Information",
  subtitle = "Take the next step in your career",
  showEducationLevel = false,
  sourcePage = "unknown",
  programOfInterest = "",
  useModal = false,
  triggerLabel = "Request Info",
  hideHeader = false, // New prop to hide header when used in modal
  additionalUrlParams = {} // New prop for custom URL parameters (mode, utm, etc.)
}) {
  const [open, setOpen] = useState(false);
  const programContext = useProgramContext();
  const effectiveProgramCode = programOfInterest || programContext?.programCode || 'unknown';
  const hasTrackedView = useRef(false); // Prevent double tracking in StrictMode

  useEffect(() => {
    // Track form view (only once)
    if (!hasTrackedView.current) {
      trackEvent('rfi_form_viewed', {
        form_name: 'request_info',
        source_page: sourcePage,
        program_code: effectiveProgramCode,
        form_type: useModal ? 'modal' : 'embedded'
      });
      hasTrackedView.current = true;
    }

    // Only run on client side
    if (typeof document === 'undefined') return;

    // Create the script element
    const script = document.createElement('script');
    script.id = `stevens-inquiry-form-script-${sourcePage}-${Date.now()}`;
    script.async = true;

    // Build the script URL with current page parameters
    // Use centralized form ID constant - extract the UUID from the form ID
    const formId = FORM_IDS.RFI;
    const formUuid = formId.replace('form_', ''); // Extract UUID from 'form_XXXX' format
    const baseUrl = `https://gradadmissions.stevens.edu/register/?id=${formUuid}&output=embed&div=${formId}`;
    const currentParams = location.search.length > 1 ? '&' + location.search.substring(1) : '';

    // Rename 'mode' to 'display_mode' if present in additionalUrlParams
    // But DO NOT mutate additionalUrlParams directly as it's a dependency
    const finalAdditionalParams = new URLSearchParams({
      source_page: sourcePage,
      ...(programOfInterest && { program_interest: programOfInterest }),
      ...additionalUrlParams
    });

    if (finalAdditionalParams.has('mode')) {
      const modeValue = finalAdditionalParams.get('mode');
      finalAdditionalParams.delete('mode');
      finalAdditionalParams.set('display_mode', modeValue);
    }

    script.src = `${baseUrl}${currentParams}&${finalAdditionalParams.toString()}`;

    // Track form submission when iframe loads successfully and user submits
    script.onload = () => {
      // Track form loaded successfully
      trackEvent('rfi_form_loaded', {
        form_name: 'request_info',
        source_page: sourcePage,
        program_code: effectiveProgramCode,
        load_time_ms: Date.now() - script.dataset.loadStart
      });

      // Listen for messages from the iframe (if available)
      const handleMessage = (event) => {
        // Check if message is from Stevens form and indicates success
        if (event.data && (event.data.type === 'form-submit' || event.data.status === 'success')) {
          // GTM tracking
          trackConversion(CONVERSION_LABELS.GET_PROGRAM_DETAILS);

          // Vercel tracking with full context
          trackEvent('rfi_form_submitted', {
            form_name: 'request_info',
            source_page: sourcePage,
            program_code: effectiveProgramCode,
            submission_method: 'iframe_message',
            is_conversion: true
          });
        }
      };
      window.addEventListener('message', handleMessage);

      // Alternative: Listen for form submission on the embedded form
      setTimeout(() => {
        const formContainer = document.getElementById(FORM_IDS.RFI);
        if (formContainer) {
          const forms = formContainer.querySelectorAll('form');
          forms.forEach(form => {
            // Add data attribute to mark this as RFI form
            form.setAttribute('data-form-type', 'rfi');
            
            // Stop propagation to prevent interference with other forms
            const submitHandler = (e) => {
              e.stopPropagation();
              e.stopImmediatePropagation();
              
              // Track after a short delay to ensure submission went through
              setTimeout(() => {
                // GTM tracking
                trackConversion(CONVERSION_LABELS.GET_PROGRAM_DETAILS);

                // Vercel tracking
                trackEvent('rfi_form_submitted', {
                  form_name: 'request_info',
                  source_page: sourcePage,
                  program_code: effectiveProgramCode,
                  submission_method: 'form_submit',
                  is_conversion: true
                });
              }, 500);
            };
            
            form.addEventListener('submit', submitHandler, true); // Use capture phase
          });
        }
      }, 2000);
    };

    // Track script load start time
    script.dataset.loadStart = Date.now().toString();

    // Insert the script
    const firstScript = document.getElementsByTagName('script')[0];
    firstScript.parentNode.insertBefore(script, firstScript);

    // Cleanup function
    return () => {
      if (script && script.parentNode) {
        script.remove();
      }
      // Also clean up the form container
      const formContainer = document.getElementById(FORM_IDS.RFI);
      if (formContainer) {
        formContainer.innerHTML = '';
      }
    };
  }, [sourcePage, programOfInterest, JSON.stringify(additionalUrlParams)]);

  const FormCard = (
    <Card className={`w-full max-w-sm sm:max-w-md mx-auto shadow-stevens-xl rounded-stevens-lg overflow-hidden ${hideHeader ? 'shadow-none border-0' : ''}`}>
      {!hideHeader && (
        <CardHeader className="flex flex-col space-y-1 p-3 sm:p-stevens-md bg-stevens-dark-gray text-stevens-white rounded-t-stevens-lg">
          <CardTitle className="text-base sm:text-stevens-lg md:text-stevens-xl font-stevens-bold leading-tight">{title}</CardTitle>
          {subtitle && <p className="text-xs sm:text-stevens-sm text-stevens-white/90 leading-tight">{subtitle}</p>}
        </CardHeader>
      )}
      <CardContent className={`bg-stevens-white p-0 ${hideHeader ? 'rounded-stevens-lg' : ''}`}>
        <div className="relative">
          {/* Form styles are now in src/styles/form-overrides.css */}
          {/* Supports all form IDs: RFI, ASAP, Accelerated */}

          <div className="bg-stevens-white text-stevens-dark-gray">
            <div
              id={FORM_IDS.RFI}
              className="min-h-[320px] w-full">

              {/* Loading state */}
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-stevens-black mx-auto mb-stevens-md"></div>
                  <p className="text-stevens-dark-gray font-stevens-medium">Loading Form...</p>
                  <p className="text-stevens-xs text-stevens-light-gray0 mt-stevens-sm">This may take a moment</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (useModal) {
    return (
      <div className="w-full">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="btn-stevens-red px-stevens-xl py-stevens-md rounded-stevens-md"
        >
          {triggerLabel}
        </button>
        {open && (
          <div className="fixed inset-0 z-[1000] bg-black/60 flex items-center justify-center p-stevens-md">
            <div className="relative w-full max-w-3xl">
              <button
                type="button"
                aria-label="Close"
                onClick={() => setOpen(false)}
                className="absolute -top-3 -right-3 bg-stevens-white text-stevens-dark-gray rounded-full w-10 h-10 shadow-stevens-md"
              >
                ×
              </button>
              {FormCard}
            </div>
          </div>
        )}
      </div>
    );
  }

  return FormCard;
}