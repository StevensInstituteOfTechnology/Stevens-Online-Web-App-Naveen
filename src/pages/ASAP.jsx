import React, { useEffect, useRef } from 'react';
import PageHero from '../components/shared/PageHero';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { usePageTracking } from '@/hooks/analytics/usePageTracking';
import { PageContextProvider } from '@/contexts/analytics/PageContext';
import { trackEvent } from '@/utils/analytics/vercelTracking';
import { setPageTitle, setMetaDescription, setOpenGraphTags, buildCanonicalUrl } from '@/utils';

export default function ASAPPage() {
  // Get program code from URL or sessionStorage
  const urlParams = new URLSearchParams(window.location.search);
  const programCode = urlParams.get('program') || 
                      sessionStorage.getItem('asap_application_program') ||
                      'unknown';
  const formSubmittedRef = useRef(false); // Prevent double tracking

  usePageTracking({
    pageType: 'application',
    programCode: programCode,
    additionalData: {
      page_name: 'ASAP Application',
      application_type: 'asap',
      has_embedded_form: true,
      program_code: programCode
    }
  });

  // Set SEO meta tags
  useEffect(() => {
    setPageTitle('Accelerated Stevens Admission Process (ASAP)| Stevens Online');
    setMetaDescription('The Accelerated Stevens Admission Process (ASAP) allows you to start graduate courses early and fast-track your degree.');
    setOpenGraphTags({
      title: 'Accelerated Stevens Admission Process (ASAP)| Stevens Online',
      description: 'The Accelerated Stevens Admission Process (ASAP) allows you to start graduate courses early and fast-track your degree.',
      image: buildCanonicalUrl('/assets/logos/stevens-crest.webp'),
      url: buildCanonicalUrl('/asap/'),
      type: 'website'
    });
  }, []);

  useEffect(() => {
    // Only run on client side
    if (typeof document === 'undefined') return;
    
    if (document.getElementById('slate-form-script')) return;
    
    // Create isolated container for external script
    const scriptContainer = document.createElement('div');
    scriptContainer.id = 'external-script-container';
    scriptContainer.style.cssText = `
      position: relative;
      z-index: 1;
      isolation: isolate;
      contain: layout style;
    `;
    
    const script = document.createElement('script');
    script.id = 'slate-form-script';
    script.src = 'https://gradadmissions.stevens.edu/register/?id=9268876a-a7c7-484d-a41e-7d0cb4c5613c&output=embed&div=form_9268876a-a7c7-484d-a41e-7d0cb4c5613c';
    script.async = true;
    
    // Append container to body, then script to container
    document.body.appendChild(scriptContainer);
    scriptContainer.appendChild(script);
    
    // Add form submission tracking
    const submitHandlers = [];
    script.onload = () => {
      setTimeout(() => {
        const formContainer = document.getElementById('form_9268876a-a7c7-484d-a41e-7d0cb4c5613c');
        if (formContainer) {
          const forms = formContainer.querySelectorAll('form');
          forms.forEach(form => {
            const submitHandler = () => {
              if (!formSubmittedRef.current) {
                formSubmittedRef.current = true;
                setTimeout(() => {
                  trackEvent('asap_application_submitted', {
                    form_name: 'asap_application',
                    program_code: programCode,
                    application_type: 'asap',
                    is_conversion: true
                  });
                }, 500);
              }
            };
            form.addEventListener('submit', submitHandler);
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
      
      const container = document.getElementById('external-script-container');
      if (container) document.body.removeChild(container);
    };
  }, [programCode]);

  // Continuous protection against external script interference
  useEffect(() => {
    // Only run on client side
    if (typeof document === 'undefined') return;
    
    const addPentagonProtection = () => {
      const style = document.createElement('style');
      style.id = 'asap-pentagon-protection';
      style.textContent = `
        /* ULTRA AGGRESSIVE Pentagon Badge Protection for ASAP page */
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
      const existing = document.getElementById('asap-pentagon-protection');
      if (existing) existing.remove();
      
      // Add new protection
      document.head.appendChild(style);
    };

    // Apply protection immediately
    addPentagonProtection();
    
    // Continuous protection every 5 seconds (reduced frequency due to containment)
    const protectionInterval = setInterval(addPentagonProtection, 5000);
    
    return () => {
      clearInterval(protectionInterval);
      const existing = document.getElementById('asap-pentagon-protection');
      if (existing) existing.remove();
    };
  }, []);

  const benefits = [
  "No letters of recommendation required",
  "No personal statements needed",
  "No prior coding experience necessary",
  "Earn credit toward your full degree"];


  return (
    <PageContextProvider pageType="application" pageName="ASAP">
    <div className="bg-stevens-light-gray font-stevens-body">
      <PageHero
        title="Advance Your Career with an Accelerated Master's Application (ASAP) Program"
        subtitle="Your Fast Track to a Master's Degree at Stevens" 
        bgImage="/assets/images/shared/asap-hero.webp"
        />

      <div className="py-stevens-section bg-stevens-light-gray">
        <div className="max-w-7xl mx-auto px-stevens-sm stevens-md:px-stevens-lg stevens-xl:px-stevens-xl">
          <div className="grid lg:grid-cols-2 gap-stevens-2xl items-start">
            
            {/* Left Column - Info */}
            <div>
              <h2 className="font-stevens-display text-stevens-3xl md:text-stevens-4xl font-stevens-bold text-stevens-dark-gray mb-stevens-md">
                Begin Your Graduate Journey
              </h2>
              <p className="text-stevens-lg text-stevens-dark-gray mb-stevens-lg leading-relaxed">
                With our new ASAP (Accelerated Stevens Admission Process), you can begin your graduate studies by enrolling in two foundational courses. If you earn a B or better in both and submit proof of a qualifying bachelor's degree, you'll earn full admission into the degree program with credit already in hand.
              </p>
              
              <div className="bg-stevens-white rounded-stevens-md p-stevens-md shadow-stevens-lg mb-stevens-lg border border-stevens-light-gray">
                <h3 className="font-stevens-display text-stevens-xl font-stevens-semibold text-stevens-dark-gray mb-stevens-md">Why Choose ASAP?</h3>
                <ul className="space-y-stevens-md">
                  {benefits.map((benefit, index) =>
                  <li key={index} className="flex items-start gap-stevens-md">
                      <Check className="w-5 h-5 text-stevens-red mt-0.5 flex-shrink-0" />
                      <span className="text-stevens-dark-gray">{benefit}</span>
                    </li>
                  )}
                </ul>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="lg:sticky lg:top-8">
              <Card className="shadow-stevens-2xl border-0 bg-stevens-white rounded-stevens-md overflow-hidden">
                <CardHeader className="flex flex-col space-y-1 p-3 sm:p-stevens-md bg-gradient-to-r from-gray-600 to-red-800 text-stevens-white rounded-t-stevens-md">
                  <CardTitle className="font-stevens-display text-base sm:text-stevens-lg md:text-stevens-xl text-center font-stevens-bold leading-tight">Submit Your ASAP Application</CardTitle>
                  <p className="text-xs sm:text-stevens-sm text-stevens-white/90 leading-tight">Complete the form below to get started</p>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="relative">
                    <style jsx>{`
                      #form_9268876a-a7c7-484d-a41e-7d0cb4c5613c {
                        max-width: 100% !important;
                        width: 100% !important;
                        overflow: hidden !important;
                        /* CSS Containment to prevent style leakage */
                        contain: layout style paint !important;
                        isolation: isolate !important;
                        position: relative !important;
                        z-index: 1 !important;
                      }
                      
                      #form_9268876a-a7c7-484d-a41e-7d0cb4c5613c * {
                        max-width: 100% !important;
                        box-sizing: border-box !important;
                      }
                      
                      #form_9268876a-a7c7-484d-a41e-7d0cb4c5613c iframe {
                        width: 100% !important;
                        max-width: 100% !important;
                        border: none !important;
                        min-height: 600px !important;
                        z-index: 1 !important;
                        position: relative !important;
                      }
                      
                      #form_9268876a-a7c7-484d-a41e-7d0cb4c5613c form {
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

                      /* Pentagon Badge Protection - ULTRA AGGRESSIVE for ASAP page */
                      div[class*="z-[9999]"] {
                        z-index: 9999 !important;
                        position: fixed !important;
                        top: 3.5rem !important; /* Force top-14 positioning */
                        width: 100% !important; /* Ensure full width for container alignment */
                        pointer-events: none !important; /* Container transparent to clicks */
                      }
                      
                      /* Pentagon badge link - make it clickable */
                      div[class*="z-[9999]"] a,
                      div[class*="z-[9999]"] a * {
                        pointer-events: auto !important;
                        z-index: inherit !important;
                      }
                      
                      /* Mobile pentagon badge protection */
                      @media (max-width: 1024px) {
                        div[class*="z-[9999]"] {
                          top: 1rem !important; /* Force top-4 positioning for mobile */
                        }
                      }
                      
                      /* ULTRA AGGRESSIVE: Override any external script interference */
                      div[class*="z-[9999]"] *:not(a):not(a *) {
                        pointer-events: none !important;
                      }
                      
                      header[class*="z-[9997]"] *,
                      div[class*="z-[9998]"] *,
                      div[class*="z-[9996]"] *,
                      div[class*="z-[9999]"] * {
                        z-index: inherit !important;
                        pointer-events: auto !important;
                      }
                      
                      @media (max-width: 768px) {
                        #form_9268876a-a7c7-484d-a41e-7d0cb4c5613c {
                          font-size: 14px !important;
                        }
                        
                        #form_9268876a-a7c7-484d-a41e-7d0cb4c5613c input,
                        #form_9268876a-a7c7-484d-a41e-7d0cb4c5613c select,
                        #form_9268876a-a7c7-484d-a41e-7d0cb4c5613c textarea {
                          width: 100% !important;
                          max-width: 100% !important;
                          font-size: 14px !important;
                        }
                      }
                    `}</style>
                    <div className="bg-stevens-light-gray text-stevens-dark-gray ">
                      <div
                        id="form_9268876a-a7c7-484d-a41e-7d0cb4c5613c"
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
            </div>
            
          </div>
        </div>
      </div>
      </div>
    </PageContextProvider>
  );
}