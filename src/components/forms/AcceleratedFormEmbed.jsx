import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

/**
 * AcceleratedFormEmbed - Simple wrapper for Slate accelerated application form
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
    <Card className="shadow-stevens-2xl border-0 bg-stevens-white rounded-stevens-md overflow-hidden">
      <CardHeader className="flex flex-col space-y-1 p-3 sm:p-stevens-md bg-stevens-dark-gray text-stevens-white rounded-t-stevens-md">
        <CardTitle className="font-stevens-display text-base sm:text-stevens-lg md:text-stevens-xl text-center font-stevens-bold leading-tight">
          {title}
        </CardTitle>
        <p className="text-xs sm:text-stevens-sm text-stevens-white/90 leading-tight">
          {subtitle}
        </p>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative">
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

            /* Submit button styling */
            #form_89080626-7bc4-4c48-9437-fd47479d7371 button[type="submit"],
            #form_89080626-7bc4-4c48-9437-fd47479d7371 input[type="submit"] {
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
            
            #form_89080626-7bc4-4c48-9437-fd47479d7371 button[type="submit"]:hover,
            #form_89080626-7bc4-4c48-9437-fd47479d7371 input[type="submit"]:hover {
              background: #8b1e2f !important;
              transform: translateY(-1px) !important;
              box-shadow: 0 4px 12px rgba(163, 38, 56, 0.3) !important;
            }
            
            #form_89080626-7bc4-4c48-9437-fd47479d7371 button[type="submit"]:active,
            #form_89080626-7bc4-4c48-9437-fd47479d7371 input[type="submit"]:active {
              transform: translateY(0) !important;
              box-shadow: 0 2px 4px rgba(163, 38, 56, 0.2) !important;
            }

            #form_89080626-7bc4-4c48-9437-fd47479d7371 button[type="button"],
            #form_89080626-7bc4-4c48-9437-fd47479d7371 button:not([type="submit"]) {
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

            #form_89080626-7bc4-4c48-9437-fd47479d7371 button[type="button"]:hover {
              background: #4b5563 !important;
              transform: translateY(-1px) !important;
              box-shadow: 0 4px 12px rgba(107, 114, 128, 0.3) !important;
            }
          `}</style>
          <div className="bg-stevens-light-gray text-stevens-dark-gray ">
            <div
              id="form_89080626-7bc4-4c48-9437-fd47479d7371"
              className="min-h-[600px] w-full">
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
      </CardContent>
    </Card>
  );
}

