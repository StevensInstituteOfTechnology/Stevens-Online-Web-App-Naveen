import React, { useEffect, useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trackConversion, CONVERSION_LABELS } from "@/utils/gtmTracking";
import { trackEvent } from "@/utils/analytics/vercelTracking";
import { useProgramContext } from "@/contexts/analytics/ProgramContext";
import { FORM_IDS } from "@/config/formIds";
// Import centralized form styles (supports all form IDs)
import "@/styles/form-overrides.css";

// ============ CONSTANTS ============
const FORM_LOAD_DELAY = 2000; // Wait for Slate form to fully load
const PHASE_CHECK_INTERVAL = 500; // How often to check form phase
const PHASE_TRANSITION_DELAY = 200; // Delay before setting up mirror buttons
const PHASE_LOCK_DURATION = 1000; // Lock duration when transitioning phases
const SUBMIT_COOLDOWN = 3000; // Cooldown after submit click

const DISCLAIMER_TEXT = `By submitting this form, you agree to be contacted by Stevens Institute of Technology via email, phone, or text for program information and application guidance. You grant us permission to call or text you at this number, and that contact may be made using automated dialing systems and/or an artificial or prerecorded voice.`;

export default function LeadCaptureForm({
  title = "Request Information",
  subtitle = "Take the next step in your career",
  sourcePage = "unknown",
  programOfInterest = "",
  useModal = false,
  triggerLabel = "Request Info",
  hideHeader = false,
  additionalUrlParams = {},
  theme = "light", // "light" or "dark" theme
}) {
  const isDark = theme === "dark";
  const [open, setOpen] = useState(false);
  const [showMirrorButtons, setShowMirrorButtons] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [disclaimerChecked, setDisclaimerChecked] = useState(false);
  const [showDisclaimerError, setShowDisclaimerError] = useState(false);
  const programContext = useProgramContext();
  const effectiveProgramCode =
    programOfInterest || programContext?.programCode || "unknown";
  const hasTrackedView = useRef(false);

  // Refs for original form buttons (for mirror button clicks)
  const originalSubmitRef = useRef(null);
  const originalBackRef = useRef(null);

  // Track current form phase (0: unknown, 1: phase 1, 2: phase 2, -1: transitioning)
  const currentPhaseRef = useRef(0);

  // Store message handler for cleanup
  const messageHandlerRef = useRef(null);

  useEffect(() => {
    // Track form view (only once)
    if (!hasTrackedView.current) {
      trackEvent("rfi_form_viewed", {
        form_name: "request_info",
        source_page: sourcePage,
        program_code: effectiveProgramCode,
        form_type: useModal ? "modal" : "embedded",
      });
      hasTrackedView.current = true;
    }

    // Only run on client side
    if (typeof document === "undefined") return;

    // Create the script element
    const script = document.createElement("script");
    script.id = `stevens-inquiry-form-script-${sourcePage}-${Date.now()}`;
    script.async = true;

    // Build the script URL with current page parameters
    // Use centralized form ID constant - extract the UUID from the form ID
    const formId = FORM_IDS.RFI;
    const formUuid = formId.replace("form_", ""); // Extract UUID from 'form_XXXX' format
    const baseUrl = `https://gradadmissions.stevens.edu/register/?id=${formUuid}&output=embed&div=${formId}`;
    const currentParams =
      location.search.length > 1 ? "&" + location.search.substring(1) : "";

    // Rename 'mode' to 'display_mode' if present in additionalUrlParams
    // But DO NOT mutate additionalUrlParams directly as it's a dependency
    const finalAdditionalParams = new URLSearchParams({
      source_page: sourcePage,
      ...(programOfInterest && { program_interest: programOfInterest }),
      ...additionalUrlParams,
    });

    if (finalAdditionalParams.has("mode")) {
      const modeValue = finalAdditionalParams.get("mode");
      finalAdditionalParams.delete("mode");
      finalAdditionalParams.set("display_mode", modeValue);
    }

    script.src = `${baseUrl}${currentParams}&${finalAdditionalParams.toString()}`;

    // Track form submission when iframe loads successfully and user submits
    script.onload = () => {
      // Track form loaded successfully
      trackEvent("rfi_form_loaded", {
        form_name: "request_info",
        source_page: sourcePage,
        program_code: effectiveProgramCode,
        load_time_ms: Date.now() - script.dataset.loadStart,
      });

      // Listen for messages from the iframe (if available)
      const handleMessage = (event) => {
        // Check if message is from Stevens form and indicates success
        if (
          event.data &&
          (event.data.type === "form-submit" || event.data.status === "success")
        ) {
          // GTM tracking
          trackConversion(CONVERSION_LABELS.GET_PROGRAM_DETAILS);

          // Vercel tracking with full context
          trackEvent("rfi_form_submitted", {
            form_name: "request_info",
            source_page: sourcePage,
            program_code: effectiveProgramCode,
            submission_method: "iframe_message",
            is_conversion: true,
          });
        }
      };
      messageHandlerRef.current = handleMessage;
      window.addEventListener("message", handleMessage);

      // Alternative: Listen for form submission on the embedded form
      setTimeout(() => {
        const formContainer = document.getElementById(FORM_IDS.RFI);
        if (formContainer) {
          const forms = formContainer.querySelectorAll("form");
          forms.forEach((form) => {
            // Add data attribute to mark this as RFI form
            form.setAttribute("data-form-type", "rfi");

            // Stop propagation to prevent interference with other forms
            const submitHandler = (e) => {
              e.stopPropagation();
              e.stopImmediatePropagation();

              // Track after a short delay to ensure submission went through
              setTimeout(() => {
                // GTM tracking
                trackConversion(CONVERSION_LABELS.GET_PROGRAM_DETAILS);

                // Vercel tracking
                trackEvent("rfi_form_submitted", {
                  form_name: "request_info",
                  source_page: sourcePage,
                  program_code: effectiveProgramCode,
                  submission_method: "form_submit",
                  is_conversion: true,
                });
              }, 500);
            };

            form.addEventListener("submit", submitHandler, true); // Use capture phase
          });

          // Function to setup mirror buttons (hide originals, store refs)
          const setupMirrorButtons = () => {
            const allButtons = formContainer.querySelectorAll("button");

            // Find Submit button (class: form_button_submit or contains "SUBMIT" text)
            let submitBtn = formContainer.querySelector(
              "button.form_button_submit"
            );
            if (!submitBtn) {
              submitBtn = Array.from(allButtons).find(
                (btn) => btn.textContent.toUpperCase().trim() === "SUBMIT"
              );
            }

            // Find Back button in Phase 2 (the last one with class form_action_back)
            const backButtons = formContainer.querySelectorAll(
              "button.form_action_back"
            );
            const backBtn =
              backButtons.length > 0
                ? backButtons[backButtons.length - 1]
                : null;

            // Store refs and hide original buttons
            if (submitBtn) {
              originalSubmitRef.current = submitBtn;
              submitBtn.style.display = "none";
            }
            if (backBtn) {
              originalBackRef.current = backBtn;
              backBtn.style.display = "none";
            }

            setShowMirrorButtons(true);
          };

          // Function to cleanup mirror buttons (show originals)
          const cleanupMirrorButtons = () => {
            if (originalSubmitRef.current) {
              originalSubmitRef.current.style.display = "";
            }
            if (originalBackRef.current) {
              originalBackRef.current.style.display = "";
            }
            originalSubmitRef.current = null;
            originalBackRef.current = null;
            setShowMirrorButtons(false);
            setIsSubmitting(false);
            setDisclaimerChecked(false);
            setShowDisclaimerError(false);
          };

          // Function to detect which phase the form is in
          const detectFormPhase = () => {
            // Skip detection if transitioning (locked)
            if (currentPhaseRef.current === -1) return;

            const formText =
              formContainer.innerText || formContainer.textContent || "";

            // Phase 2 indicators
            const hasPhone = formText.toLowerCase().includes("phone");
            const hasEmail = formText.toLowerCase().includes("email");
            const hasSubmit = formText.toUpperCase().includes("SUBMIT");

            // Phase 1 indicators
            const hasFirstName = formText.toLowerCase().includes("first name");
            const hasContinue = formText.toUpperCase().includes("CONTINUE");

            // Determine phase (PRIORITY: Check Phase 1 first)
            if (hasFirstName && hasContinue) {
              if (currentPhaseRef.current !== 1) {
                currentPhaseRef.current = 1;
                cleanupMirrorButtons();
              }
            } else if (hasPhone && hasEmail && hasSubmit) {
              if (currentPhaseRef.current !== 2) {
                currentPhaseRef.current = 2;
                setTimeout(() => {
                  setupMirrorButtons();
                }, PHASE_TRANSITION_DELAY);
              }
            }
          };

          // Use setInterval to periodically check form phase
          const phaseCheckInterval = setInterval(
            detectFormPhase,
            PHASE_CHECK_INTERVAL
          );

          // Initial check
          detectFormPhase();

          // Store interval for cleanup
          formContainer._phaseCheckInterval = phaseCheckInterval;
        }
      }, FORM_LOAD_DELAY);
    };

    // Track script load start time
    script.dataset.loadStart = Date.now().toString();

    // Insert the script
    const firstScript = document.getElementsByTagName("script")[0];
    firstScript.parentNode.insertBefore(script, firstScript);

    // Cleanup function
    return () => {
      // Remove message event listener
      if (messageHandlerRef.current) {
        window.removeEventListener("message", messageHandlerRef.current);
        messageHandlerRef.current = null;
      }

      if (script && script.parentNode) {
        script.remove();
      }

      // Clean up the form container
      const formContainer = document.getElementById(FORM_IDS.RFI);
      if (formContainer) {
        // Clear phase check interval if exists
        if (formContainer._phaseCheckInterval) {
          clearInterval(formContainer._phaseCheckInterval);
        }
        formContainer.innerHTML = "";
      }

      // Reset all states
      setShowMirrorButtons(false);
      setIsSubmitting(false);
      setDisclaimerChecked(false);
      setShowDisclaimerError(false);
      originalSubmitRef.current = null;
      originalBackRef.current = null;
      currentPhaseRef.current = 0;
    };
  }, [sourcePage, programOfInterest, JSON.stringify(additionalUrlParams)]);

  const FormCard = (
    <Card
      className={`w-full max-w-sm sm:max-w-md mx-auto overflow-hidden ${
        hideHeader ? "shadow-none border-0" : "shadow-stevens-xl"
      } ${
        isDark ? "bg-transparent border-0 shadow-none" : "rounded-stevens-lg"
      }`}
    >
      {!hideHeader && (
        <CardHeader className="flex flex-col space-y-1 p-3 sm:p-stevens-md bg-stevens-dark-gray text-stevens-white rounded-t-stevens-lg">
          <CardTitle className="text-base sm:text-stevens-lg md:text-stevens-xl font-stevens-bold leading-tight">
            {title}
          </CardTitle>
          {subtitle && (
            <p className="text-xs sm:text-stevens-sm text-stevens-white/90 leading-tight">
              {subtitle}
            </p>
          )}
        </CardHeader>
      )}
      <CardContent
        className={`p-0 ${hideHeader ? "rounded-stevens-lg" : ""} ${
          isDark ? "bg-transparent" : "bg-stevens-white"
        }`}
      >
        <div className="relative">
          <div
            className={
              isDark
                ? "bg-transparent text-white"
                : "bg-stevens-white text-stevens-dark-gray"
            }
          >
            <div
              id={FORM_IDS.RFI}
              data-theme={theme}
              className="min-h-[320px] w-full"
            >
              {/* Loading state */}
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div
                    className={`animate-spin rounded-full h-8 w-8 border-b-2 mx-auto mb-stevens-md ${
                      isDark ? "border-white" : "border-stevens-black"
                    }`}
                  ></div>
                  <p
                    className={`font-stevens-medium ${
                      isDark ? "text-white" : "text-stevens-dark-gray"
                    }`}
                  >
                    Loading Form...
                  </p>
                  <p
                    className={`text-stevens-xs mt-stevens-sm ${
                      isDark ? "text-gray-400" : "text-stevens-light-gray0"
                    }`}
                  >
                    This may take a moment
                  </p>
                </div>
              </div>
            </div>

            {/* Mirror Buttons - Custom styled buttons that proxy to original form buttons */}
            {showMirrorButtons && (
              <div className="flex flex-col px-6 pt-2 pb-6">
                {/* Disclaimer Checkbox */}
                <label className="flex items-start gap-3 mb-4 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={disclaimerChecked}
                    onChange={(e) => {
                      setDisclaimerChecked(e.target.checked);
                      if (e.target.checked) {
                        setShowDisclaimerError(false);
                      }
                    }}
                    className={`mt-1 w-4 h-4 rounded border-2 cursor-pointer transition-colors ${
                      showDisclaimerError
                        ? "border-red-500 ring-2 ring-red-500/30"
                        : isDark
                        ? "border-gray-500 bg-transparent"
                        : "border-gray-300 bg-white"
                    }`}
                  />
                  <span
                    className={`text-[11px] leading-[1.5] text-left ${
                      isDark ? "text-white/70" : "text-stevens-dark-gray/80"
                    }`}
                  >
                    {DISCLAIMER_TEXT}
                  </span>
                </label>

                {/* Error message */}
                {showDisclaimerError && (
                  <p className="text-red-500 text-xs mb-3 -mt-2 px-1">
                    Please agree to the terms above to continue.
                  </p>
                )}

                <div className="flex gap-3">
                  {/* Back Button */}
                  {originalBackRef.current && (
                    <button
                      type="button"
                      onClick={() => {
                        // Hide mirror buttons immediately when going back
                        setShowMirrorButtons(false);

                        // Lock detection for a moment to allow DOM to update
                        currentPhaseRef.current = -1;
                        setTimeout(() => {
                          currentPhaseRef.current = 0;
                        }, PHASE_LOCK_DURATION);

                        originalBackRef.current?.click();
                      }}
                      className={`flex-shrink-0 px-6 py-3 rounded-xl font-semibold text-sm uppercase tracking-wide transition-all duration-200 ${
                        isDark
                          ? "bg-transparent border border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-gray-500"
                          : "bg-transparent border border-gray-300 text-gray-600 hover:bg-gray-100 hover:border-gray-400"
                      }`}
                    >
                      Back
                    </button>
                  )}
                  {/* Submit Button */}
                  <button
                    type="button"
                    onClick={() => {
                      // Validate disclaimer checkbox first
                      if (!disclaimerChecked) {
                        setShowDisclaimerError(true);
                        return;
                      }

                      if (originalSubmitRef.current && !isSubmitting) {
                        setIsSubmitting(true);
                        originalSubmitRef.current.click();
                        setTimeout(
                          () => setIsSubmitting(false),
                          SUBMIT_COOLDOWN
                        );
                      }
                    }}
                    disabled={isSubmitting}
                    className={`flex-1 px-6 py-3 rounded-xl font-semibold text-sm uppercase tracking-wide transition-all duration-200 ${
                      isSubmitting
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:shadow-lg hover:-translate-y-0.5"
                    } bg-stevens-red text-white hover:bg-red-700`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
                        Submitting...
                      </span>
                    ) : (
                      "Submit"
                    )}
                  </button>
                </div>
              </div>
            )}
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
