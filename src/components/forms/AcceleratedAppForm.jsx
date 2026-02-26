import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { trackEvent } from '@/utils/analytics/vercelTracking';
import { FORM_IDS, FORM_CLASSES, SLATE_FORM_WRAPPER } from '@/config/formIds';

export default function AcceleratedAppForm({
  programCode = 'unknown',
  additionalUrlParams = {},
  hideHeader = false,
  title = "Submit Your Application",
  subtitle = "Complete the form below to get started"
}) {
  const formSubmittedRef = useRef(false);
  const formId = FORM_IDS.ACCELERATED;
  const rawId = formId.replace(/^form_/, '');

  useEffect(() => {
    // Only run on client side
    if (typeof document === 'undefined') return;
    
    // Check if script is already added to avoid duplicates
    // We use a unique ID based on params to allow re-initialization if params change essentially
    // But Slate forms are tricky. For now, we'll rely on the container ID.
    
    const scriptId = `slate-form-script-accelerated-${Date.now()}`;
    const containerId = `external-script-container-accelerated-${Date.now()}`;

    // Create isolated container for external script
    const scriptContainer = document.createElement('div');
    scriptContainer.id = containerId;
    scriptContainer.style.cssText = `
      position: relative;
      z-index: 1;
      isolation: isolate;
      contain: layout style;
    `;
    
    // Build URL with parameters
    // Convert 'mode' to 'display_mode' if present, similar to LeadCaptureForm
    const baseUrl = `https://gradadmissions.stevens.edu/register/?id=${rawId}&output=embed&div=${formId}`;
    const params = new URLSearchParams(additionalUrlParams);
    
    // Rename 'mode' to 'display_mode' if present
    if (params.has('mode')) {
      const modeValue = params.get('mode');
      params.delete('mode');
      params.set('display_mode', modeValue);
    }
    
    const scriptSrc = `${baseUrl}&${params.toString()}`;

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = scriptSrc;
    script.async = true;
    
    // Append container to body, then script to container
    // Note: Slate scripts often document.write or append to the div specified in 'div' param.
    // The 'div' param points to the ID of the element where the form should be rendered.
    // So we just need the script to execute.
    document.body.appendChild(scriptContainer);
    scriptContainer.appendChild(script);
    
    // Add form submission tracking
    const submitHandlers = [];
    script.onload = () => {
      setTimeout(() => {
        // Look for the specific accelerated form container by ID
        const formContainer = document.getElementById(formId);
        if (formContainer) {
          // Only select forms WITHIN this container
          const forms = formContainer.querySelectorAll('form');
          forms.forEach(form => {
            // Add data attribute to mark this as accelerated form
            form.setAttribute('data-form-type', 'accelerated');
            
            const submitHandler = (e) => {
              e.stopPropagation();
              e.stopImmediatePropagation();
              
              if (!formSubmittedRef.current) {
                formSubmittedRef.current = true;
                setTimeout(() => {
                  trackEvent('accelerated_application_submitted', {
                    form_name: 'accelerated_application',
                    program_code: programCode,
                    application_type: 'accelerated',
                    is_conversion: true,
                    ...additionalUrlParams
                  });
                }, 500);
              }
            };
            
            form.addEventListener('submit', submitHandler, true); // Use capture phase
            submitHandlers.push({ form, handler: submitHandler });
          });
        }
      }, 2000);
    };
    
    return () => {
      // Clean up event listeners
      submitHandlers.forEach(({ form, handler }) => {
        form.removeEventListener('submit', handler);
      });
      
      const container = document.getElementById(containerId);
      if (container) document.body.removeChild(container);
      
      const scriptElement = document.getElementById(scriptId);
      if (scriptElement) scriptElement.remove();

      // Also clean up the form container content to prevent duplicates/mess
      const formContainer = document.getElementById(formId);
      if (formContainer) {
        formContainer.innerHTML = '';
      }
    };
  }, [programCode, JSON.stringify(additionalUrlParams)]);

  return (
    <Card className={`shadow-stevens-2xl border-0 bg-stevens-white rounded-stevens-md overflow-hidden ${hideHeader ? 'shadow-none' : ''}`}>
      {!hideHeader && (
        <CardHeader className="flex flex-col space-y-1 p-3 sm:p-stevens-md bg-stevens-dark-gray text-stevens-white rounded-t-stevens-md">
          <CardTitle className="font-stevens-display text-base sm:text-stevens-lg md:text-stevens-xl text-center font-stevens-bold leading-tight">
            {title}
          </CardTitle>
          <p className="text-xs sm:text-stevens-sm text-stevens-white/90 leading-tight">
            {subtitle}
          </p>
        </CardHeader>
      )}
      <CardContent className="p-0">
        <div className="relative">
          <style jsx>{`
            .${FORM_CLASSES.ACCELERATED} {
              max-width: 100% !important;
              width: 100% !important;
              overflow: hidden !important;
              contain: layout style paint !important;
              isolation: isolate !important;
              position: relative !important;
              z-index: 1 !important;
            }
            
            .${FORM_CLASSES.ACCELERATED} * {
              max-width: 100% !important;
              box-sizing: border-box !important;
            }
            
            .${FORM_CLASSES.ACCELERATED} iframe {
              width: 100% !important;
              max-width: 100% !important;
              border: none !important;
              min-height: 600px !important;
              z-index: 1 !important;
              position: relative !important;
            }
            
            .${FORM_CLASSES.ACCELERATED} form {
              width: 100% !important;
              max-width: 100% !important;
              padding: 1.5rem !important;
            }

            /* Protect navigation elements from external script interference */
            header[class*="z-[9997]"] {
              z-index: 9997 !important;
              position: sticky !important;
            }
            
            div[class*="z-[9998]"] {
              z-index: 9998 !important;
              position: fixed !important;
            }
            
            div[class*="z-[9996]"] {
              z-index: 9996 !important;
              position: fixed !important;
            }
            
            header[class*="z-[9997]"] *,
            div[class*="z-[9998]"] *,
            div[class*="z-[9996]"] * {
              z-index: inherit !important;
              pointer-events: auto !important;
            }

            /* ===== BUTTON STYLING - START ===== */
            
            /* Submit button styling */
            .${FORM_CLASSES.ACCELERATED} button[type="submit"],
            .${FORM_CLASSES.ACCELERATED} input[type="submit"] {
              background: #a32638 !important;
              color: #ffffff !important;
              border: none !important;
              padding: 0.75rem 1.5rem !important;
              border-radius: 6px !important;
              font-size: 14px !important;
              font-weight: 600 !important;
              cursor: pointer !important;
              transition: all 0.2s ease-in-out !important;
              text-transform: uppercase !important;
              letter-spacing: 0.025em !important;
              width: 100% !important;
              margin-top: 0.75rem !important;
            }
            
            /* Submit button hover */
            .${FORM_CLASSES.ACCELERATED} button[type="submit"]:hover,
            .${FORM_CLASSES.ACCELERATED} input[type="submit"]:hover {
              background: #8b1e2f !important;
              transform: translateY(-1px) !important;
              box-shadow: 0 4px 12px rgba(163, 38, 56, 0.3) !important;
            }
            
            /* Submit button active */
            .${FORM_CLASSES.ACCELERATED} button[type="submit"]:active,
            .${FORM_CLASSES.ACCELERATED} input[type="submit"]:active {
              transform: translateY(0) !important;
              box-shadow: 0 2px 4px rgba(163, 38, 56, 0.2) !important;
            }

            /* Button container - ensures buttons have proper spacing */
            .${FORM_CLASSES.ACCELERATED} .button-container,
            .${FORM_CLASSES.ACCELERATED} .form-actions,
            .${FORM_CLASSES.ACCELERATED} div[class*="button"],
            .${FORM_CLASSES.ACCELERATED} div:has(> button[type="submit"]) {
              display: flex !important;
              gap: 1rem !important;
              flex-wrap: wrap !important;
            }

            /* Back button styling to match submit button */
            .${FORM_CLASSES.ACCELERATED} button[type="button"],
            .${FORM_CLASSES.ACCELERATED} .back-button,
            .${FORM_CLASSES.ACCELERATED} button:not([type="submit"]) {
              background: #6b7280 !important;
              color: #ffffff !important;
              border: none !important;
              padding: 0.75rem 1.5rem !important;
              border-radius: 6px !important;
              font-size: 14px !important;
              font-weight: 600 !important;
              cursor: pointer !important;
              transition: all 0.2s ease-in-out !important;
              text-transform: uppercase !important;
              letter-spacing: 0.025em !important;
              margin-top: 0.75rem !important;
              margin-right: 1rem !important;
            }

            /* Back button hover */
            .${FORM_CLASSES.ACCELERATED} button[type="button"]:hover,
            .${FORM_CLASSES.ACCELERATED} .back-button:hover {
              background: #4b5563 !important;
              transform: translateY(-1px) !important;
              box-shadow: 0 4px 12px rgba(107, 114, 128, 0.3) !important;
            }

            /* Ensure buttons are inline but with spacing */
            .${FORM_CLASSES.ACCELERATED} button {
              margin-left: 0 !important;
            }

            .${FORM_CLASSES.ACCELERATED} button + button {
              margin-left: 1rem !important;
            }

            /* ===== BUTTON STYLING - END ===== */
            
            /* ===== TEST STYLING FOR "Personal Information" LABEL ===== */
            
            /* Target the "Personal Information" header label */
            .${FORM_CLASSES.ACCELERATED} .form_header .form_label,
            .${FORM_CLASSES.ACCELERATED} #form_question_6ab6d516-ee1e-4066-8c7f-4f4872aadb21 .form_label {
              color: #a32638 !important; /* Stevens red color */
              font-size: 1.25rem !important; /* Larger font size */
              font-weight: 700 !important; /* Bold */
              text-transform: uppercase !important; /* Uppercase */
              letter-spacing: 0.05em !important; /* Spacing between letters */
              
              text-align: center !important; /* Center the text */
              margin-bottom: 1.25rem !important; /* Space below */
              background: transparent !important; /* Remove gray background */
              background-color: transparent !important; /* Remove gray background color */
            }
            
            /* Remove gray background from parent container */
            .${FORM_CLASSES.ACCELERATED} #form_question_6ab6d516-ee1e-4066-8c7f-4f4872aadb21,
            .${FORM_CLASSES.ACCELERATED} .form_header {
              background: transparent !important;
              background-color: transparent !important;
            }
            
            /* Mobile responsive - Tablet */
            @media (max-width: 1024px) {
              .${FORM_CLASSES.ACCELERATED} button[type="submit"],
              .${FORM_CLASSES.ACCELERATED} input[type="submit"] {
                padding: 0.75rem 1.5rem !important;
                font-size: 14px !important;
              }
            }
            
            /* Mobile responsive - Mobile */
            @media (max-width: 768px) {
              .${FORM_CLASSES.ACCELERATED} {
                font-size: 13px !important;
              }
              
              .${FORM_CLASSES.ACCELERATED} input,
              .${FORM_CLASSES.ACCELERATED} select,
              .${FORM_CLASSES.ACCELERATED} textarea {
                width: 100% !important;
                max-width: 100% !important;
                font-size: 16px !important;
              }

              .${FORM_CLASSES.ACCELERATED} button[type="submit"],
              .${FORM_CLASSES.ACCELERATED} input[type="submit"] {
                padding: 0.75rem 1.25rem !important;
                font-size: 14px !important;
              }
            }
            
            /* Mobile responsive - Small Mobile */
            @media (max-width: 480px) {
              .${FORM_CLASSES.ACCELERATED} button[type="submit"],
              .${FORM_CLASSES.ACCELERATED} input[type="submit"] {
                padding: 0.75rem 1rem !important;
                font-size: 13px !important;
              }
            }
          `}</style>
          <div className="bg-stevens-light-gray text-stevens-dark-gray ">
            <div
              className={`${SLATE_FORM_WRAPPER} ${FORM_CLASSES.ACCELERATED}`}
            >
              <div
                id={formId}
                className="min-h-[600px] w-full"
              >
              <div className="flex items-center justify-center h-96 border-2 border-dashed border-stevens-light-gray rounded-stevens-md bg-stevens-white">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-stevens-red mx-auto mb-stevens-md"></div>
                  <p className="text-stevens-dark-gray font-stevens-medium">Loading Application Form...</p>
                  <p className="text-stevens-xs text-stevens-light-gray0 mt-stevens-sm">This may take a moment</p>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

