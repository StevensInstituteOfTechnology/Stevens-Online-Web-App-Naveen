import React, { useEffect } from 'react';
import PageHero from '../components/shared/PageHero';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';

export default function AcceleratedApplicationPage() {
  useEffect(() => {
    // Only run on client side
    if (typeof document === 'undefined') return;
    
    if (document.getElementById('slate-form-script-accelerated')) return;
    
    // Create isolated container for external script
    const scriptContainer = document.createElement('div');
    scriptContainer.id = 'external-script-container-accelerated';
    scriptContainer.style.cssText = `
      position: relative;
      z-index: 1;
      isolation: isolate;
      contain: layout style;
    `;
    
    const script = document.createElement('script');
    script.id = 'slate-form-script-accelerated';
    script.src = 'https://gradadmissions.stevens.edu/register/?id=89080626-7bc4-4c48-9437-fd47479d7371&output=embed&div=form_89080626-7bc4-4c48-9437-fd47479d7371';
    script.async = true;
    
    // Append container to body, then script to container
    document.body.appendChild(scriptContainer);
    scriptContainer.appendChild(script);
    
    return () => {
      const container = document.getElementById('external-script-container-accelerated');
      if (container) document.body.removeChild(container);
    };
  }, []);

  // Continuous protection against external script interference
  useEffect(() => {
    // Only run on client side
    if (typeof document === 'undefined') return;
    
    const addPentagonProtection = () => {
      const style = document.createElement('style');
      style.id = 'accelerated-pentagon-protection';
      style.textContent = `
        /* ULTRA AGGRESSIVE Pentagon Badge Protection for Accelerated Application page */
        div[class*="z-[9999]"] {
          z-index: 9999 !important;
          position: fixed !important;
          top: 3.5rem !important;
          width: 100% !important;
          pointer-events: none !important;
        }
        
        div[class*="z-[9999]"] a,
        div[class*="z-[9999]"] a * {
          pointer-events: auto !important;
          z-index: inherit !important;
        }
        
        @media (max-width: 1024px) {
          div[class*="z-[9999]"] {
            top: 1rem !important;
          }
        }
        
        /* Override any external script interference */
        div[class*="z-[9999]"] *:not(a):not(a *) {
          pointer-events: none !important;
        }
      `;
      
      // Remove existing protection
      const existing = document.getElementById('accelerated-pentagon-protection');
      if (existing) existing.remove();
      
      // Add new protection
      document.head.appendChild(style);
    };

    // Apply protection immediately
    addPentagonProtection();
    
    // Continuous protection every 5 seconds
    const protectionInterval = setInterval(addPentagonProtection, 5000);
    
    return () => {
      clearInterval(protectionInterval);
      const existing = document.getElementById('accelerated-pentagon-protection');
      if (existing) existing.remove();
    };
  }, []);

  const benefits = [
    "No letters of recommendation required",
    "Upload unofficial transcripts to get started",
    "Submit your resume or LinkedIn profile",
    "Official transcripts due within one year of enrollment",
    "Faster application review process"
  ];

  return (
    <div className="bg-stevens-gray-50 font-stevens-body">
      <PageHero
        title="Accelerated Application"
        subtitle="Fast-Track Your Graduate Education at Stevens" 
        bgImage="/assets/images/asap-hero.avif"
      />

      <div className="py-stevens-section bg-stevens-gray-50">
        <div className="max-w-7xl mx-auto px-stevens-sm stevens-md:px-stevens-lg stevens-xl:px-stevens-xl">
          <div className="grid lg:grid-cols-2 gap-stevens-2xl items-start">
            
            {/* Left Column - Info */}
            <div>
              <h2 className="font-stevens-display text-stevens-3xl md:text-stevens-4xl font-stevens-bold text-stevens-gray-900 mb-stevens-md">
                Your Path to Graduate Success
              </h2>
              <p className="text-stevens-lg text-stevens-gray-900 mb-stevens-lg leading-relaxed">
                Fast-track your application with our new <strong>Accelerated App</strong> designed for busy professionals. The Accelerated App streamlines the admissions process so you can get started immediately on your graduate education journey.
              </p>
              
              <div className="bg-stevens-white rounded-stevens-md p-stevens-md shadow-stevens-lg mb-stevens-lg border border-stevens-gray-200">
                <h3 className="font-stevens-display text-stevens-xl font-stevens-semibold text-stevens-gray-900 mb-stevens-sm">What Makes It Different?</h3>
                <p className="text-stevens-base text-stevens-gray-700 mb-stevens-md">
                  We recognize that working professionals have been vetted through their employment and bring valuable experience to the classroom. The Accelerated App removes traditional barriers while maintaining Stevens' academic standards.
                </p>
              </div>

              <div className="bg-stevens-white rounded-stevens-md p-stevens-md shadow-stevens-lg mb-stevens-lg border border-stevens-gray-200">
                <h3 className="font-stevens-display text-stevens-xl font-stevens-semibold text-stevens-gray-900 mb-stevens-md">Why Choose the Accelerated App?</h3>
                <ul className="space-y-stevens-md">
                  {benefits.map((benefit, index) =>
                    <li key={index} className="flex items-start gap-stevens-md">
                      <Check className="w-5 h-5 text-stevens-primary mt-0.5 flex-shrink-0" />
                      <span className="text-stevens-gray-900">{benefit}</span>
                    </li>
                  )}
                </ul>
              </div>

              <div className="bg-stevens-primary/10 rounded-stevens-md p-stevens-md border border-stevens-primary/20">
                <p className="text-stevens-sm text-stevens-gray-700">
                  <strong>Note:</strong> The Accelerated Application is available for select professional online programs offered at Stevens. Stevens may request additional documentation if needed to confirm your academic or professional background.
                </p>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="lg:sticky lg:top-8">
              <Card className="shadow-stevens-2xl border-0 bg-stevens-white rounded-stevens-md">
                <CardHeader className="flex flex-col space-y-stevens-xs p-stevens-md bg-gradient-to-r from-gray-600 to-red-800 text-stevens-white rounded-t-stevens-md">
                  <CardTitle className="font-stevens-display text-stevens-2xl text-center font-stevens-bold">Submit Your Application</CardTitle>
                  <p className="mt-stevens-sm text-stevens-base text-stevens-white/90">Complete the form below to get started</p>
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
                        padding: 1rem !important;
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

                      /* Pentagon Badge Protection - ULTRA AGGRESSIVE */
                      div[class*="z-[9999]"] {
                        z-index: 9999 !important;
                        position: fixed !important;
                        top: 3.5rem !important;
                        width: 100% !important;
                        pointer-events: none !important;
                      }
                      
                      div[class*="z-[9999]"] a,
                      div[class*="z-[9999]"] a * {
                        pointer-events: auto !important;
                        z-index: inherit !important;
                      }
                      
                      @media (max-width: 1024px) {
                        div[class*="z-[9999]"] {
                          top: 1rem !important;
                        }
                      }
                      
                      div[class*="z-[9999]"] *:not(a):not(a *) {
                        pointer-events: none !important;
                      }

                      * {
                        z-index: auto !important;
                      }
                      
                      header[class*="z-[9997]"] *,
                      div[class*="z-[9998]"] *,
                      div[class*="z-[9996]"] *,
                      div[class*="z-[9999]"] * {
                        z-index: inherit !important;
                        pointer-events: auto !important;
                      }

                      /* ===== BUTTON STYLING - START ===== */
                      
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
                      
                      /* Submit button hover */
                      #form_89080626-7bc4-4c48-9437-fd47479d7371 button[type="submit"]:hover,
                      #form_89080626-7bc4-4c48-9437-fd47479d7371 input[type="submit"]:hover {
                        background: #8b1e2f !important;
                        transform: translateY(-1px) !important;
                        box-shadow: 0 4px 12px rgba(163, 38, 56, 0.3) !important;
                      }
                      
                      /* Submit button active */
                      #form_89080626-7bc4-4c48-9437-fd47479d7371 button[type="submit"]:active,
                      #form_89080626-7bc4-4c48-9437-fd47479d7371 input[type="submit"]:active {
                        transform: translateY(0) !important;
                        box-shadow: 0 2px 4px rgba(163, 38, 56, 0.2) !important;
                      }

                      /* Button container - ensures buttons have proper spacing */
                      #form_89080626-7bc4-4c48-9437-fd47479d7371 .button-container,
                      #form_89080626-7bc4-4c48-9437-fd47479d7371 .form-actions,
                      #form_89080626-7bc4-4c48-9437-fd47479d7371 div[class*="button"],
                      #form_89080626-7bc4-4c48-9437-fd47479d7371 div:has(> button[type="submit"]) {
                        display: flex !important;
                        gap: 1rem !important;
                        flex-wrap: wrap !important;
                      }

                      /* Back button styling to match submit button */
                      #form_89080626-7bc4-4c48-9437-fd47479d7371 button[type="button"],
                      #form_89080626-7bc4-4c48-9437-fd47479d7371 .back-button,
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

                      /* Back button hover */
                      #form_89080626-7bc4-4c48-9437-fd47479d7371 button[type="button"]:hover,
                      #form_89080626-7bc4-4c48-9437-fd47479d7371 .back-button:hover {
                        background: #4b5563 !important;
                        transform: translateY(-1px) !important;
                        box-shadow: 0 4px 12px rgba(107, 114, 128, 0.3) !important;
                      }

                      /* Ensure buttons are inline but with spacing */
                      #form_89080626-7bc4-4c48-9437-fd47479d7371 button {
                        margin-left: 0 !important;
                      }

                      #form_89080626-7bc4-4c48-9437-fd47479d7371 button + button {
                        margin-left: 1rem !important;
                      }

                      /* ===== BUTTON STYLING - END ===== */
                      
                      /* Mobile responsive - Tablet */
                      @media (max-width: 1024px) {
                        #form_89080626-7bc4-4c48-9437-fd47479d7371 button[type="submit"],
                        #form_89080626-7bc4-4c48-9437-fd47479d7371 input[type="submit"] {
                          padding: 0.75rem 1.5rem !important;
                          font-size: 14px !important;
                        }
                      }
                      
                      /* Mobile responsive - Mobile */
                      @media (max-width: 768px) {
                        #form_89080626-7bc4-4c48-9437-fd47479d7371 {
                          font-size: 13px !important;
                        }
                        
                        #form_89080626-7bc4-4c48-9437-fd47479d7371 input,
                        #form_89080626-7bc4-4c48-9437-fd47479d7371 select,
                        #form_89080626-7bc4-4c48-9437-fd47479d7371 textarea {
                          width: 100% !important;
                          max-width: 100% !important;
                          font-size: 16px !important;
                        }

                        #form_89080626-7bc4-4c48-9437-fd47479d7371 button[type="submit"],
                        #form_89080626-7bc4-4c48-9437-fd47479d7371 input[type="submit"] {
                          padding: 0.75rem 1.25rem !important;
                          font-size: 14px !important;
                        }
                      }
                      
                      /* Mobile responsive - Small Mobile */
                      @media (max-width: 480px) {
                        #form_89080626-7bc4-4c48-9437-fd47479d7371 button[type="submit"],
                        #form_89080626-7bc4-4c48-9437-fd47479d7371 input[type="submit"] {
                          padding: 0.75rem 1rem !important;
                          font-size: 13px !important;
                        }
                      }
                    `}</style>
                    <div className="bg-stevens-gray-50 text-stevens-gray-900 p-stevens-md">
                      <div
                        id="form_89080626-7bc4-4c48-9437-fd47479d7371"
                        className="min-h-[600px] w-full">
                        <div className="flex items-center justify-center h-96 border-2 border-dashed border-stevens-gray-300 rounded-stevens-md bg-stevens-white">
                          <div className="text-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-stevens-primary mx-auto mb-stevens-md"></div>
                            <p className="text-stevens-gray-600 font-stevens-medium">Loading Application Form...</p>
                            <p className="text-stevens-xs text-stevens-gray-500 mt-stevens-sm">This may take a moment</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
