import React, { useEffect } from 'react';
import { BOOKING_URLS } from '@/config/constants';

/**
 * AcceleratedFormEmbed - Branded wrapper for Slate accelerated application form
 * This uses the exact same embed method as the main accelerated app page
 * 
 * @param {string} title - Form title
 * @param {string} subtitle - Form subtitle
 * @param {object} urlParams - URL parameters to pass to the form (display_mode, utm_campaign, corporate_code, etc.)
 */
export default function AcceleratedFormEmbed({ 
  title = "Submit Your Application",
  subtitle = "Complete the form below to get started",
  urlParams = {}
}) {
  useEffect(() => {
    if (typeof document === 'undefined') return;
    
    const scriptId = 'accelerated-form-embed-script';
    if (document.getElementById(scriptId)) return;
    
    const script = document.createElement('script');
    script.id = scriptId;
    script.async = true;
    
    // Build URL with parameters
    const baseUrl = 'https://gradadmissions.stevens.edu/register/?id=89080626-7bc4-4c48-9437-fd47479d7371&output=embed&div=form_89080626-7bc4-4c48-9437-fd47479d7371';
    const params = new URLSearchParams(urlParams);
    
    script.src = `${baseUrl}&${params.toString()}`;
    
    const firstScript = document.getElementsByTagName('script')[0];
    firstScript.parentNode.insertBefore(script, firstScript);
    
    return () => {
      const scriptElement = document.getElementById(scriptId);
      if (scriptElement) scriptElement.remove();
      
      const formContainer = document.getElementById('form_89080626-7bc4-4c48-9437-fd47479d7371');
      if (formContainer) formContainer.innerHTML = '';
    };
  }, [JSON.stringify(urlParams)]);

  return (
    <div className="bg-white rounded-lg shadow-2xl overflow-hidden border border-gray-200">
      {/* Header - Black with white text (matching RequestInfoModal style) */}
      <div className="bg-stevens-black px-6 py-6 border-b border-stevens-black/20">
        <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-wide text-center text-white">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm sm:text-base text-white/80 text-center mt-2">
            {subtitle}
          </p>
        )}
       
      </div>

      {/* Form Content Area */}
      <div className="relative bg-white">
        <style jsx>{`
          #form_89080626-7bc4-4c48-9437-fd47479d7371 {
            max-width: 100% !important;
            width: 100% !important;
            overflow: hidden !important;
            contain: layout style paint !important;
            isolation: isolate !important;
            position: relative !important;
            z-index: 1 !important;
          }
          
          #form_89080626-7bc4-4c48-9437-fd47479d7371 * {
            max-width: 100% !important;
            box-sizing: border-box !important;
          }
          
          #form_89080626-7bc4-4c48-9437-fd47479d7371 iframe {
            width: 100% !important;
            max-width: 100% !important;
            border: none !important;
            min-height: 600px !important;
            z-index: 1 !important;
            position: relative !important;
          }
          
          #form_89080626-7bc4-4c48-9437-fd47479d7371 form {
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

          /* Submit button styling - Stevens Red */
          #form_89080626-7bc4-4c48-9437-fd47479d7371 button[type="submit"],
          #form_89080626-7bc4-4c48-9437-fd47479d7371 input[type="submit"] {
            background: #a32638 !important;
            color: #ffffff !important;
            border: none !important;
            padding: 0.875rem 1.5rem !important;
            border-radius: 6px !important;
            font-size: 14px !important;
            font-weight: 700 !important;
            cursor: pointer !important;
            transition: all 0.2s ease-in-out !important;
            text-transform: uppercase !important;
            letter-spacing: 0.05em !important;
            width: 100% !important;
            margin-top: 1rem !important;
          }
          
          #form_89080626-7bc4-4c48-9437-fd47479d7371 button[type="submit"]:hover,
          #form_89080626-7bc4-4c48-9437-fd47479d7371 input[type="submit"]:hover {
            background: #8b1e2f !important;
            transform: translateY(-2px) !important;
            box-shadow: 0 6px 16px rgba(163, 38, 56, 0.35) !important;
          }
          
          #form_89080626-7bc4-4c48-9437-fd47479d7371 button[type="submit"]:active,
          #form_89080626-7bc4-4c48-9437-fd47479d7371 input[type="submit"]:active {
            transform: translateY(0) !important;
            box-shadow: 0 2px 4px rgba(163, 38, 56, 0.2) !important;
          }

          /* Secondary button styling */
          #form_89080626-7bc4-4c48-9437-fd47479d7371 button[type="button"],
          #form_89080626-7bc4-4c48-9437-fd47479d7371 button:not([type="submit"]) {
            background: #374151 !important;
            color: #ffffff !important;
            border: none !important;
            padding: 0.875rem 1.5rem !important;
            border-radius: 6px !important;
            font-size: 14px !important;
            font-weight: 600 !important;
            cursor: pointer !important;
            transition: all 0.2s ease-in-out !important;
            text-transform: uppercase !important;
            letter-spacing: 0.025em !important;
            margin-top: 1rem !important;
            margin-right: 1rem !important;
          }

          #form_89080626-7bc4-4c48-9437-fd47479d7371 button[type="button"]:hover {
            background: #1f2937 !important;
            transform: translateY(-2px) !important;
            box-shadow: 0 6px 16px rgba(55, 65, 81, 0.35) !important;
          }

          /* Form field enhancements - White background for all states */
          #form_89080626-7bc4-4c48-9437-fd47479d7371 input[type="text"],
          #form_89080626-7bc4-4c48-9437-fd47479d7371 input[type="email"],
          #form_89080626-7bc4-4c48-9437-fd47479d7371 input[type="tel"],
          #form_89080626-7bc4-4c48-9437-fd47479d7371 input[type="number"],
          #form_89080626-7bc4-4c48-9437-fd47479d7371 input[type="date"],
          #form_89080626-7bc4-4c48-9437-fd47479d7371 input[type="password"],
          #form_89080626-7bc4-4c48-9437-fd47479d7371 select,
          #form_89080626-7bc4-4c48-9437-fd47479d7371 textarea {
            background-color: #ffffff !important;
            border: 1px solid #d1d5db !important;
            border-radius: 6px !important;
            padding: 0.75rem 1rem !important;
            font-size: 14px !important;
            color: #1f2937 !important;
            transition: border-color 0.2s ease, box-shadow 0.2s ease !important;
          }

          /* Ensure placeholder text is visible */
          #form_89080626-7bc4-4c48-9437-fd47479d7371 input::placeholder,
          #form_89080626-7bc4-4c48-9437-fd47479d7371 textarea::placeholder {
            color: #9ca3af !important;
          }

          /* Focus state - more specific selectors to override Slate styles */
          #form_89080626-7bc4-4c48-9437-fd47479d7371 input:focus,
          #form_89080626-7bc4-4c48-9437-fd47479d7371 input[type="text"]:focus,
          #form_89080626-7bc4-4c48-9437-fd47479d7371 input[type="email"]:focus,
          #form_89080626-7bc4-4c48-9437-fd47479d7371 input[type="tel"]:focus,
          #form_89080626-7bc4-4c48-9437-fd47479d7371 input[type="number"]:focus,
          #form_89080626-7bc4-4c48-9437-fd47479d7371 input[type="date"]:focus,
          #form_89080626-7bc4-4c48-9437-fd47479d7371 input[type="password"]:focus,
          #form_89080626-7bc4-4c48-9437-fd47479d7371 select:focus,
          #form_89080626-7bc4-4c48-9437-fd47479d7371 textarea:focus {
            outline: none !important;
            background: #ffffff !important;
            background-color: #ffffff !important;
            border-color: #a32638 !important;
            box-shadow: 0 0 0 3px rgba(163, 38, 56, 0.1) !important;
          }

          /* Focus-within for parent containers */
          #form_89080626-7bc4-4c48-9437-fd47479d7371 input:focus-within,
          #form_89080626-7bc4-4c48-9437-fd47479d7371 *:focus input {
            background: #ffffff !important;
            background-color: #ffffff !important;
          }

          /* Override any inline styles or class-based dark backgrounds - Nuclear option */
          #form_89080626-7bc4-4c48-9437-fd47479d7371 input,
          #form_89080626-7bc4-4c48-9437-fd47479d7371 input[class],
          #form_89080626-7bc4-4c48-9437-fd47479d7371 input[style],
          #form_89080626-7bc4-4c48-9437-fd47479d7371 .form-control,
          #form_89080626-7bc4-4c48-9437-fd47479d7371 .form-input,
          #form_89080626-7bc4-4c48-9437-fd47479d7371 [class*="input"],
          #form_89080626-7bc4-4c48-9437-fd47479d7371 [class*="field"] input {
            background: #ffffff !important;
            background-color: #ffffff !important;
          }

          /* Target active/focus states with high specificity */
          #form_89080626-7bc4-4c48-9437-fd47479d7371 input:active,
          #form_89080626-7bc4-4c48-9437-fd47479d7371 input.active,
          #form_89080626-7bc4-4c48-9437-fd47479d7371 input.focused,
          #form_89080626-7bc4-4c48-9437-fd47479d7371 input[aria-selected="true"],
          #form_89080626-7bc4-4c48-9437-fd47479d7371 input:not(:placeholder-shown) {
            background: #ffffff !important;
            background-color: #ffffff !important;
            color: #1f2937 !important;
          }

          /* Slate form specific overrides */
          #form_89080626-7bc4-4c48-9437-fd47479d7371 .slate-field input,
          #form_89080626-7bc4-4c48-9437-fd47479d7371 .slate-input,
          #form_89080626-7bc4-4c48-9437-fd47479d7371 [data-slate] input,
          #form_89080626-7bc4-4c48-9437-fd47479d7371 form input {
            background: #ffffff !important;
            background-color: #ffffff !important;
          }

          /* iframe inner content override attempt */
          #form_89080626-7bc4-4c48-9437-fd47479d7371 iframe {
            background: #ffffff !important;
          }

          /* Autofill override - keep white background */
          #form_89080626-7bc4-4c48-9437-fd47479d7371 input:-webkit-autofill,
          #form_89080626-7bc4-4c48-9437-fd47479d7371 input:-webkit-autofill:hover,
          #form_89080626-7bc4-4c48-9437-fd47479d7371 input:-webkit-autofill:focus,
          #form_89080626-7bc4-4c48-9437-fd47479d7371 input:-webkit-autofill:active {
            -webkit-box-shadow: 0 0 0 30px white inset !important;
            -webkit-text-fill-color: #1f2937 !important;
            background-color: #ffffff !important;
          }

          /* Select dropdown styling */
          #form_89080626-7bc4-4c48-9437-fd47479d7371 select {
            background-color: #ffffff !important;
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e") !important;
            background-position: right 0.5rem center !important;
            background-repeat: no-repeat !important;
            background-size: 1.5em 1.5em !important;
            padding-right: 2.5rem !important;
            -webkit-appearance: none !important;
            -moz-appearance: none !important;
            appearance: none !important;
          }

          /* Label styling */
          #form_89080626-7bc4-4c48-9437-fd47479d7371 label {
            font-weight: 500 !important;
            color: #374151 !important;
            font-size: 14px !important;
            margin-bottom: 0.5rem !important;
          }
        `}</style>
        
        {/* Form Container */}
        <div className="p-4 sm:p-6">
          <div
            id="form_89080626-7bc4-4c48-9437-fd47479d7371"
            className="min-h-[600px] w-full"
          >
            {/* Enhanced Loading State */}
            <div className="flex flex-col items-center justify-center h-96 bg-gray-50 rounded-lg border border-gray-200">
              <div className="relative">
                {/* Outer ring */}
                <div className="w-16 h-16 rounded-full border-4 border-gray-200"></div>
                {/* Spinning ring */}
                <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-transparent border-t-stevens-red animate-spin"></div>
              </div>
              <p className="text-stevens-dark-gray font-semibold mt-6">Loading Application Form...</p>
              <p className="text-sm text-gray-500 mt-2">Please wait while we prepare your application</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer - Help link */}
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
        <p className="text-sm text-stevens-dark-gray text-center">
          Have questions?{' '}
          <a 
            href={BOOKING_URLS.SCHEDULE_CALL} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-stevens-red hover:underline font-semibold"
          >
            Schedule a call
          </a>
          {' '}with our admissions team.
        </p>
      </div>
    </div>
  );
}

