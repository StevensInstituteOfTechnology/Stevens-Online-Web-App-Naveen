import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trackConversion, CONVERSION_LABELS } from "@/utils/gtmTracking";

export default function LeadCaptureForm({
  title = "Request Information",
  subtitle = "Take the next step in your career",
  showEducationLevel = false,
  sourcePage = "unknown",
  programOfInterest = "",
  useModal = false,
  triggerLabel = "Request Info"
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Prevent duplicate script loading
    if (document.getElementById('stevens-inquiry-form-script')) return;
    
    // Create the script element
    const script = document.createElement('script');
    script.id = 'stevens-inquiry-form-script';
    script.async = true;
    
    // Build the script URL with current page parameters
    const baseUrl = 'https://gradadmissions.stevens.edu/register/?id=f55a243b-abd6-45ea-8ff2-cd7f7af4d532&output=embed&div=form_f55a243b-abd6-45ea-8ff2-cd7f7af4d532';
    const currentParams = location.search.length > 1 ? '&' + location.search.substring(1) : '';
    
    // Add source page and program interest as URL parameters
    const additionalParams = new URLSearchParams({
        source_page: sourcePage,
      ...(programOfInterest && { program_interest: programOfInterest })
    });
    
    script.src = `${baseUrl}${currentParams}&${additionalParams.toString()}`;
    
    // Track form submission when iframe loads successfully and user submits
    script.onload = () => {
      // Listen for messages from the iframe (if available)
      const handleMessage = (event) => {
        // Check if message is from Stevens form and indicates success
        if (event.data && (event.data.type === 'form-submit' || event.data.status === 'success')) {
          trackConversion(CONVERSION_LABELS.GET_PROGRAM_DETAILS);
        }
      };
      window.addEventListener('message', handleMessage);
      
      // Alternative: Listen for form submission on the embedded form
      setTimeout(() => {
        const formContainer = document.getElementById('form_f55a243b-abd6-45ea-8ff2-cd7f7af4d532');
        if (formContainer) {
          const forms = formContainer.querySelectorAll('form');
          forms.forEach(form => {
            form.addEventListener('submit', () => {
              // Track after a short delay to ensure submission went through
              setTimeout(() => {
                trackConversion(CONVERSION_LABELS.GET_PROGRAM_DETAILS);
              }, 500);
            });
          });
        }
      }, 2000);
    };
    
    // Insert the script
    const firstScript = document.getElementsByTagName('script')[0];
    firstScript.parentNode.insertBefore(script, firstScript);
    
    // Cleanup function
    return () => {
      const existingScript = document.getElementById('stevens-inquiry-form-script');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [sourcePage, programOfInterest]);

  const FormCard = (
    <Card className="w-full max-w-xs sm:max-w-sm mx-auto shadow-stevens-xl rounded-stevens-lg overflow-hidden">
      <CardHeader className="flex flex-col space-y-stevens-xs p-stevens-md bg-gradient-to-r from-gray-600 to-red-800 text-stevens-white">
        <CardTitle className="text-stevens-xl stevens-md:text-stevens-2xl font-stevens-bold mt-stevens-xs">{title}</CardTitle>
        {subtitle && <p className="text-stevens-sm stevens-md:text-stevens-base text-stevens-white/90">{subtitle}</p>}
      </CardHeader>
      <CardContent className="bg-stevens-white p-0">
        <div className="relative">
          {/* Enhanced Stevens-themed form styling */}
          <style jsx>{`
            /* Container styling */
            #form_f55a243b-abd6-45ea-8ff2-cd7f7af4d532 {
              max-width: 100% !important;
              width: 100% !important;
              overflow: hidden !important;
              contain: layout style paint !important;
              isolation: isolate !important;
              position: relative !important;
              z-index: 1 !important;
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
            }
            
            #form_f55a243b-abd6-45ea-8ff2-cd7f7af4d532 * {
              max-width: 100% !important;
              box-sizing: border-box !important;
            }
            
            /* Iframe styling */
            #form_f55a243b-abd6-45ea-8ff2-cd7f7af4d532 iframe {
              width: 100% !important;
              max-width: 100% !important;
              border: none !important;
              min-height: 0 !important;
              z-index: 1 !important;
              position: relative !important;
              border-radius: 0 0 8px 8px !important;
            }
            
            /* Form container */
            #form_f55a243b-abd6-45ea-8ff2-cd7f7af4d532 form {
              width: 100% !important;
              max-width: 100% !important;
              padding: 3rem !important;
              background: #ffffff !important;
              border-radius: 0 !important;
            }
            
            /* Title/heading styling */
            #form_f55a243b-abd6-45ea-8ff2-cd7f7af4d532 h1,
            #form_f55a243b-abd6-45ea-8ff2-cd7f7af4d532 h2,
            #form_f55a243b-abd6-45ea-8ff2-cd7f7af4d532 h3 {
              display: none !important;
            }
            
            /* Form labels */
            #form_f55a243b-abd6-45ea-8ff2-cd7f7af4d532 label {
              color: #1f2937 !important;
              font-weight: 400 !important;
              font-size: 14px !important;
              margin-bottom: 0.375rem !important;
              display: block !important;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif !important;
            }
            
            /* Input fields styling */
            #form_f55a243b-abd6-45ea-8ff2-cd7f7af4d532 input[type="text"],
            #form_f55a243b-abd6-45ea-8ff2-cd7f7af4d532 input[type="email"],
            #form_f55a243b-abd6-45ea-8ff2-cd7f7af4d532 input[type="tel"],
            #form_f55a243b-abd6-45ea-8ff2-cd7f7af4d532 select,
            #form_f55a243b-abd6-45ea-8ff2-cd7f7af4d532 textarea {
              width: 100% !important;
              padding: 0.625rem 0.75rem !important;
              border: 1px solid #d1d5db !important;
              border-radius: 4px !important;
              font-size: 15px !important;
              color: #1f2937 !important;
              background-color: #f9fafb !important;
              transition: all 0.15s ease-in-out !important;
              outline: none !important;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif !important;
            }
            
            /* Input focus states */
            #form_f55a243b-abd6-45ea-8ff2-cd7f7af4d532 input[type="text"]:focus,
            #form_f55a243b-abd6-45ea-8ff2-cd7f7af4d532 input[type="email"]:focus,
            #form_f55a243b-abd6-45ea-8ff2-cd7f7af4d532 input[type="tel"]:focus,
            #form_f55a243b-abd6-45ea-8ff2-cd7f7af4d532 select:focus,
            #form_f55a243b-abd6-45ea-8ff2-cd7f7af4d532 textarea:focus {
              border-color: #9ca3af !important;
              background-color: #ffffff !important;
              box-shadow: none !important;
            }
            
            /* Error state styling */
            #form_f55a243b-abd6-45ea-8ff2-cd7f7af4d532 input.error,
            #form_f55a243b-abd6-45ea-8ff2-cd7f7af4d532 select.error {
              border-color: #dc2626 !important;
              box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1) !important;
            }
            
            /* Submit button styling */
            #form_f55a243b-abd6-45ea-8ff2-cd7f7af4d532 button[type="submit"],
            #form_f55a243b-abd6-45ea-8ff2-cd7f7af4d532 input[type="submit"] {
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
            #form_f55a243b-abd6-45ea-8ff2-cd7f7af4d532 button[type="submit"]:hover,
            #form_f55a243b-abd6-45ea-8ff2-cd7f7af4d532 input[type="submit"]:hover {
              background: #8b1e2f !important;
              transform: translateY(-1px) !important;
              box-shadow: 0 4px 12px rgba(163, 38, 56, 0.3) !important;
            }
            
            /* Submit button active */
            #form_f55a243b-abd6-45ea-8ff2-cd7f7af4d532 button[type="submit"]:active,
            #form_f55a243b-abd6-45ea-8ff2-cd7f7af4d532 input[type="submit"]:active {
              transform: translateY(0) !important;
              box-shadow: 0 2px 4px rgba(163, 38, 56, 0.2) !important;
            }
            
            /* Select dropdown styling */
            #form_f55a243b-abd6-45ea-8ff2-cd7f7af4d532 select {
              appearance: none !important;
              background-image: url("data:image/svg+xml;charset=US-ASCII,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'><path fill='%23666' d='M2 0L0 2h4zm0 5L0 3h4z'/></svg>") !important;
              background-repeat: no-repeat !important;
              background-position: right 0.7rem center !important;
              background-size: 0.65rem auto !important;
              padding-right: 2.5rem !important;
            }
            
            /* Checkbox styling */
            #form_f55a243b-abd6-45ea-8ff2-cd7f7af4d532 input[type="checkbox"] {
              accent-color: #a32638 !important;
              width: 1.25rem !important;
              height: 1.25rem !important;
              margin-right: 0.5rem !important;
            }
            
            /* Privacy text styling */
            #form_f55a243b-abd6-45ea-8ff2-cd7f7af4d532 .privacy-text,
            #form_f55a243b-abd6-45ea-8ff2-cd7f7af4d532 small {
              font-size: 13px !important;
              color: #6b7280 !important;
              line-height: 1.5 !important;
              margin-top: 1rem !important;
            }
            
            /* Link styling */
            #form_f55a243b-abd6-45ea-8ff2-cd7f7af4d532 a {
              color: #a32638 !important;
              text-decoration: underline !important;
            }
            
            #form_f55a243b-abd6-45ea-8ff2-cd7f7af4d532 a:hover {
              color: #8b1e2f !important;
            }
            
            /* Form field groups */
            #form_f55a243b-abd6-45ea-8ff2-cd7f7af4d532 .form-group,
            #form_f55a243b-abd6-45ea-8ff2-cd7f7af4d532 .field-group,
            #form_f55a243b-abd6-45ea-8ff2-cd7f7af4d532 > div {
              margin-bottom: 0.75rem !important;
            }
            
            /* Remove excessive top margins/padding */
            #form_f55a243b-abd6-45ea-8ff2-cd7f7af4d532 > *:first-child {
              margin-top: 0 !important;
              padding-top: 0 !important;
            }
            
            /* Phone field styling */
            #form_f55a243b-abd6-45ea-8ff2-cd7f7af4d532 .phone-input-container {
              position: relative !important;
            }
            
            #form_f55a243b-abd6-45ea-8ff2-cd7f7af4d532 .country-dropdown {
              position: absolute !important;
              left: 0.75rem !important;
              top: 50% !important;
              transform: translateY(-50%) !important;
              z-index: 2 !important;
            }
            
            /* Error messages */
            #form_f55a243b-abd6-45ea-8ff2-cd7f7af4d532 .error-message {
              color: #dc2626 !important;
              font-size: 13px !important;
              margin-top: 0.25rem !important;
            }
            
            /* Loading states */
            #form_f55a243b-abd6-45ea-8ff2-cd7f7af4d532 .loading {
              opacity: 0.6 !important;
              pointer-events: none !important;
            }
            
            /* Mobile responsive */
            @media (max-width: 1024px) {
              #form_f55a243b-abd6-45ea-8ff2-cd7f7af4d532 {
                font-size: 14px !important;
              }
              
              #form_f55a243b-abd6-45ea-8ff2-cd7f7af4d532 form {
                padding: 1.5rem !important;
              }
              
              #form_f55a243b-abd6-45ea-8ff2-cd7f7af4d532 input[type="text"],
              #form_f55a243b-abd6-45ea-8ff2-cd7f7af4d532 input[type="email"],
              #form_f55a243b-abd6-45ea-8ff2-cd7f7af4d532 input[type="tel"],
              #form_f55a243b-abd6-45ea-8ff2-cd7f7af4d532 select,
              #form_f55a243b-abd6-45ea-8ff2-cd7f7af4d532 textarea {
                font-size: 15px !important;
                padding: 0.625rem !important;
              }
              
              #form_f55a243b-abd6-45ea-8ff2-cd7f7af4d532 button[type="submit"],
              #form_f55a243b-abd6-45ea-8ff2-cd7f7af4d532 input[type="submit"] {
                padding: 0.75rem 1.5rem !important;
                font-size: 14px !important;
              }
            }
            
            @media (max-width: 768px) {
              #form_f55a243b-abd6-45ea-8ff2-cd7f7af4d532 {
                font-size: 13px !important;
              }
              
              #form_f55a243b-abd6-45ea-8ff2-cd7f7af4d532 form {
                padding: 1.25rem !important;
              }
              
              #form_f55a243b-abd6-45ea-8ff2-cd7f7af4d532 input[type="text"],
              #form_f55a243b-abd6-45ea-8ff2-cd7f7af4d532 input[type="email"],
              #form_f55a243b-abd6-45ea-8ff2-cd7f7af4d532 input[type="tel"],
              #form_f55a243b-abd6-45ea-8ff2-cd7f7af4d532 select,
              #form_f55a243b-abd6-45ea-8ff2-cd7f7af4d532 textarea {
                font-size: 16px !important;
                padding: 0.625rem !important;
              }
              
              #form_f55a243b-abd6-45ea-8ff2-cd7f7af4d532 button[type="submit"],
              #form_f55a243b-abd6-45ea-8ff2-cd7f7af4d532 input[type="submit"] {
                padding: 0.75rem 1.25rem !important;
                font-size: 14px !important;
              }
            }
            
            @media (max-width: 480px) {
              #form_f55a243b-abd6-45ea-8ff2-cd7f7af4d532 form {
                padding: 1rem !important;
              }
              
              #form_f55a243b-abd6-45ea-8ff2-cd7f7af4d532 input[type="text"],
              #form_f55a243b-abd6-45ea-8ff2-cd7f7af4d532 input[type="email"],
              #form_f55a243b-abd6-45ea-8ff2-cd7f7af4d532 input[type="tel"],
              #form_f55a243b-abd6-45ea-8ff2-cd7f7af4d532 select,
              #form_f55a243b-abd6-45ea-8ff2-cd7f7af4d532 textarea {
                font-size: 16px !important;
                padding: 0.5rem !important;
              }
              
              #form_f55a243b-abd6-45ea-8ff2-cd7f7af4d532 button[type="submit"],
              #form_f55a243b-abd6-45ea-8ff2-cd7f7af4d532 input[type="submit"] {
                padding: 0.75rem 1rem !important;
                font-size: 13px !important;
              }
            }
            
            /* Additional spacing fixes */
            #form_f55a243b-abd6-45ea-8ff2-cd7f7af4d532 fieldset {
              border: none !important;
              padding: 0 !important;
              margin: 0 !important;
            }
            
            #form_f55a243b-abd6-45ea-8ff2-cd7f7af4d532 legend {
              display: none !important;
            }
            
            /* Hide any extra headers or promotional text */
            #form_f55a243b-abd6-45ea-8ff2-cd7f7af4d532 .promo-text,
            #form_f55a243b-abd6-45ea-8ff2-cd7f7af4d532 .header-text {
              display: none !important;
            }
            
            /* Button container - ensures buttons have proper spacing */
            #form_f55a243b-abd6-45ea-8ff2-cd7f7af4d532 .button-container,
            #form_f55a243b-abd6-45ea-8ff2-cd7f7af4d532 .form-actions,
            #form_f55a243b-abd6-45ea-8ff2-cd7f7af4d532 div[class*="button"],
            #form_f55a243b-abd6-45ea-8ff2-cd7f7af4d532 div:has(> button[type="submit"]) {
              display: flex !important;
              gap: 1rem !important;
              flex-wrap: wrap !important;
            }

            /* Back button styling to match submit button */
            #form_f55a243b-abd6-45ea-8ff2-cd7f7af4d532 button[type="button"],
            #form_f55a243b-abd6-45ea-8ff2-cd7f7af4d532 .back-button,
            #form_f55a243b-abd6-45ea-8ff2-cd7f7af4d532 button:not([type="submit"]) {
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
            #form_f55a243b-abd6-45ea-8ff2-cd7f7af4d532 button[type="button"]:hover,
            #form_f55a243b-abd6-45ea-8ff2-cd7f7af4d532 .back-button:hover {
              background: #4b5563 !important;
              transform: translateY(-1px) !important;
              box-shadow: 0 4px 12px rgba(107, 114, 128, 0.3) !important;
            }

            /* Ensure buttons are inline but with spacing */
            #form_f55a243b-abd6-45ea-8ff2-cd7f7af4d532 button {
              margin-left: 0 !important;
            }

            #form_f55a243b-abd6-45ea-8ff2-cd7f7af4d532 button + button {
              margin-left: 1rem !important;
            }

            /* ===== STYLING FOR "GRE/GMAT Not Required" LABEL ===== */
            
            /* Target the "GRE/GMAT Not Required" text */
            #form_f55a243b-abd6-45ea-8ff2-cd7f7af4d532 #form_question_35db045c-d1d1-428c-86fe-55fd24c44d88 .form_label,
            #form_f55a243b-abd6-45ea-8ff2-cd7f7af4d532 .form_p .form_label {
              color: #a32638 !important; /* Stevens red color */
              font-size: 1rem !important; /* Font size */
              font-weight: 700 !important; /* Bold */
              text-transform: uppercase !important; /* Uppercase */
              letter-spacing: 0.05em !important; /* Spacing between letters */
              padding: 0.5rem 0 !important; /* Add some vertical padding */
              text-align: center !important; /* Center the text */
              margin-bottom: 1rem !important; /* Space below */
              margin-top: 1rem !important;
            }
          `}</style>
          
          <div className="bg-stevens-white text-stevens-gray-900">
            <div
              id="form_f55a243b-abd6-45ea-8ff2-cd7f7af4d532"
              className="min-h-[320px] w-full">
              
              {/* Loading state */}
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-stevens-primary mx-auto mb-stevens-md"></div>
                  <p className="text-stevens-gray-600 font-stevens-medium">Loading Form...</p>
                  <p className="text-stevens-xs text-stevens-gray-500 mt-stevens-sm">This may take a moment</p>
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
          className="btn-stevens-primary px-stevens-xl py-stevens-md rounded-stevens-md"
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
                className="absolute -top-3 -right-3 bg-stevens-white text-stevens-gray-700 rounded-full w-10 h-10 shadow-stevens-md"
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