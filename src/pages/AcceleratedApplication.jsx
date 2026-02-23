import React, { useEffect, useRef } from 'react';
import PageHero from '../components/shared/PageHero';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Clock, Zap, FileCheck, GraduationCap, Sparkles, Briefcase, Code, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePageTracking } from '@/hooks/analytics/usePageTracking';
import { PageContextProvider } from '@/contexts/analytics/PageContext';
import { trackEvent } from '@/utils/analytics/vercelTracking';
import { setPageTitle, setMetaDescription, setOpenGraphTags, buildCanonicalUrl } from '@/utils';

export default function AcceleratedApplicationPage() {
  // Get program code from URL or sessionStorage
  const urlParams = new URLSearchParams(window.location.search);
  const programCode = urlParams.get('program') || 
                      sessionStorage.getItem('accelerated_application_program') ||
                      'meads'; // default to MEADS
  const formSubmittedRef = useRef(false); // Prevent double tracking

  usePageTracking({
    pageType: 'application',
    programCode: programCode,
    additionalData: {
      page_name: 'Accelerated Application',
      application_type: 'accelerated',
      has_embedded_form: true,
      program_code: programCode
    }
  });

  // Set SEO meta tags
  useEffect(() => {
    setPageTitle('Accelerated Master\'s Application Requirements | Stevens Online');
    setMetaDescription('Apply to the Stevens Accelerated Master\'s program and start earning graduate credits sooner toward your future career goals.');
    setOpenGraphTags({
      title: 'Accelerated Master\'s Application Requirements | Stevens Online',
      description: 'Apply to the Stevens Accelerated Master\'s program and start earning graduate credits sooner toward your future career goals.',
      image: buildCanonicalUrl('/assets/logos/stevens-crest.webp'),
      url: buildCanonicalUrl('/accelerated-application/'),
      type: 'website'
    });
  }, []);

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
    
    // Add form submission tracking
    const submitHandlers = [];
    script.onload = () => {
      setTimeout(() => {
        const formContainer = document.getElementById('form_89080626-7bc4-4c48-9437-fd47479d7371');
        if (formContainer) {
          const forms = formContainer.querySelectorAll('form');
          forms.forEach(form => {
            const submitHandler = () => {
              if (!formSubmittedRef.current) {
                formSubmittedRef.current = true;
                setTimeout(() => {
                  trackEvent('accelerated_application_submitted', {
                    form_name: 'accelerated_application',
                    program_code: programCode,
                    application_type: 'accelerated',
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
      
      const container = document.getElementById('external-script-container-accelerated');
      if (container) document.body.removeChild(container);
    };
  }, [programCode]);

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
    "Official transcripts due within 2 months of enrollment",
    "Faster application review process"
  ];

  const degreePrograms = [
    {
      id: 'mba',
      name: 'Master of Business Administration',
      shortName: 'MBA',
      path: '/online-mba/',
      icon: Briefcase,
      description: 'Develop leadership and business strategy skills'
    },
    {
      id: 'mscs',
      name: 'Master of Science in Computer Science',
      shortName: 'M.S. in Computer Science',
      path: '/online-masters-computer-science-mscs/',
      icon: Code,
      description: 'Build advanced coding and AI skills'
    },
    {
      id: 'meads',
      name: 'M.Eng. in Applied Data Science',
      shortName: 'M.Eng. in Applied Data Science',
      path: '/online-masters-engineering-applied-data-science/',
      icon: GraduationCap,
      description: 'Master data science and AI engineering'
    }
  ];

  const certificatePrograms = [
    {
      id: 'cert-eai',
      name: 'Professional Graduate Certificate in Enterprise AI',
      shortName: 'Enterprise AI',
      path: '/certificates/enterprise-ai/',
      icon: Sparkles,
      description: 'Build AI workflows from strategy to deployment'
    },
    {
      id: 'cert-ads',
      name: 'Professional Graduate Certificate in Applied Data Science Foundations',
      shortName: 'Applied Data Science Foundations',
      path: '/certificates/applied-data-science-foundations/',
      icon: Award,
      description: 'Master Python, SQL, and Data Science and AI foundations'
    }
  ];

  return (
    <PageContextProvider pageType="application" pageName="AcceleratedApplication">
    <div className="bg-stevens-gray-50 font-stevens-body">
      <PageHero
        title="Accelerated Master's Application Requirements"
        subtitle="Fast-Track Your Graduate Education at Stevens" 
        bgImage="/assets/images/accelerated-application/AcceleratedApplication-3.webp"
      />

      {/* Speed Emphasis Section */}
      <div className="py-stevens-section-sm bg-gradient-to-br from-stevens-primary to-stevens-maroon-dark text-white">
        <div className="max-w-5xl mx-auto px-stevens-md lg:px-stevens-lg text-center">
          <div className="flex items-center justify-center gap-stevens-sm mb-stevens-md">
            <Zap className="w-8 h-8" />
            <h2 className="font-stevens-display text-stevens-3xl md:text-stevens-4xl font-stevens-bold">
              Complete in Minutes, Not Hours
            </h2>
          </div>
          <p className="text-stevens-xl mb-stevens-xl max-w-3xl mx-auto leading-relaxed">
            Our streamlined application takes just <strong>5-10 minutes</strong> to complete. No letters of recommendation. No lengthy essays. Just your basics and you're done.
          </p>
          
          <div className="grid md:grid-cols-3 gap-stevens-lg max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-stevens-lg p-stevens-lg">
              <Clock className="w-10 h-10 mx-auto mb-stevens-sm" />
              <h3 className="font-stevens-bold text-stevens-lg mb-stevens-xs">5-10 Minutes</h3>
              <p className="text-stevens-sm opacity-90">Quick application process</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-stevens-lg p-stevens-lg">
              <FileCheck className="w-10 h-10 mx-auto mb-stevens-sm" />
              <h3 className="font-stevens-bold text-stevens-lg mb-stevens-xs">Unofficial Transcripts</h3>
              <p className="text-stevens-sm opacity-90">Get started immediately</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-stevens-lg p-stevens-lg">
              <Zap className="w-10 h-10 mx-auto mb-stevens-sm" />
              <h3 className="font-stevens-bold text-stevens-lg mb-stevens-xs">Fast Review</h3>
              <p className="text-stevens-sm opacity-90">Hear back quickly</p>
            </div>
          </div>
        </div>
      </div>

      {/* Eligible Programs Section */}
      <div className="py-stevens-section bg-white">
        <div className="max-w-6xl mx-auto px-stevens-md lg:px-stevens-lg">
          <div className="text-center mb-stevens-xl">
            <h2 className="font-stevens-display text-stevens-3xl md:text-stevens-4xl font-stevens-bold text-stevens-gray-900 mb-stevens-md">
              Eligible Programs
            </h2>
            <p className="text-stevens-lg text-stevens-gray-700 max-w-3xl mx-auto">
              The Accelerated Application is available for the following programs. Choose your program and get started today.
            </p>
          </div>

          {/* Degree Programs */}
          <div className="mb-stevens-xl">
            <h3 className="font-stevens-display text-stevens-2xl font-stevens-bold text-stevens-gray-900 mb-stevens-lg text-center">
              <GraduationCap className="w-6 h-6 inline-block mr-2 text-stevens-primary" />
              Degree Programs
            </h3>
            <div className="grid md:grid-cols-3 gap-stevens-lg">
              {degreePrograms.map((program) => (
                <Link 
                  key={program.id}
                  to={program.path}
                  className="group bg-stevens-gray-50 border-2 border-stevens-gray-200 rounded-stevens-lg p-stevens-lg hover:border-stevens-primary hover:shadow-stevens-lg transition-all duration-200"
                >
                  <program.icon className="w-12 h-12 text-stevens-primary mb-stevens-md mx-auto" />
                  <h4 className="font-stevens-bold text-stevens-lg text-stevens-gray-900 mb-stevens-xs text-center group-hover:text-stevens-primary transition-colors">
                    {program.shortName}
                  </h4>
                  <p className="text-stevens-sm text-stevens-gray-700 text-center">
                    {program.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* Graduate Certificates */}
          <div className="mb-stevens-xl">
            <h3 className="font-stevens-display text-stevens-2xl font-stevens-bold text-stevens-gray-900 mb-stevens-lg text-center">
              <Award className="w-6 h-6 inline-block mr-2 text-stevens-primary" />
              Graduate Certificates
            </h3>
            <div className="grid md:grid-cols-2 gap-stevens-lg max-w-4xl mx-auto">
              {certificatePrograms.map((program) => (
                <Link 
                  key={program.id}
                  to={program.path}
                  className="group bg-stevens-gray-50 border-2 border-stevens-gray-200 rounded-stevens-lg p-stevens-lg hover:border-stevens-primary hover:shadow-stevens-lg transition-all duration-200"
                >
                  <program.icon className="w-10 h-10 text-stevens-primary mb-stevens-md mx-auto" />
                  <h4 className="font-stevens-bold text-stevens-base text-stevens-gray-900 mb-stevens-xs text-center group-hover:text-stevens-primary transition-colors">
                    {program.shortName}
                  </h4>
                  <p className="text-stevens-sm text-stevens-gray-700 text-center">
                    {program.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-stevens-primary/10 border-l-4 border-stevens-primary p-stevens-lg rounded-stevens-sm">
            <p className="text-stevens-base text-stevens-gray-900">
              <strong>Not sure which program is right for you?</strong> Visit each program page to learn more about curriculum, career outcomes, and what makes each program unique. All programs use the same fast, streamlined application below.
            </p>
          </div>
        </div>
      </div>

      <div className="py-stevens-section bg-stevens-gray-50">
        <div className="max-w-7xl mx-auto px-stevens-sm stevens-md:px-stevens-lg stevens-xl:px-stevens-xl">
          <div className="grid lg:grid-cols-2 gap-stevens-2xl items-start">
            
            {/* Left Column - Info */}
            <div>
              <h2 className="font-stevens-display text-stevens-3xl md:text-stevens-4xl font-stevens-bold text-stevens-gray-900 mb-stevens-md">
                Your Path to Graduate Success
              </h2>
              <p className="text-stevens-lg text-stevens-gray-900 mb-stevens-lg leading-relaxed">
                Fast-track your application with our new <strong>Accelerated Application</strong> designed for busy professionals. The Accelerated Application streamlines the admissions process so you can get started immediately on your graduate education journey.
              </p>
              
              <div className="bg-stevens-white rounded-stevens-md p-stevens-md shadow-stevens-lg mb-stevens-lg border border-stevens-gray-200">
                <h3 className="font-stevens-display text-stevens-xl font-stevens-semibold text-stevens-gray-900 mb-stevens-sm">What Makes It Different?</h3>
                <p className="text-stevens-base text-stevens-gray-700 mb-stevens-md">
                  We recognize that working professionals have been vetted through their employment and bring valuable experience to the classroom. The Accelerated Application removes traditional barriers while maintaining Stevens' academic standards.
                </p>
              </div>

              <div className="bg-stevens-white rounded-stevens-md p-stevens-md shadow-stevens-lg mb-stevens-lg border border-stevens-gray-200">
                <h3 className="font-stevens-display text-stevens-xl font-stevens-semibold text-stevens-gray-900 mb-stevens-md">Why Choose the Accelerated Application?</h3>
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
              <Card className="shadow-stevens-2xl border-0 bg-stevens-white rounded-stevens-md overflow-hidden">
                <CardHeader className="flex flex-col space-y-1 p-3 sm:p-stevens-md bg-gradient-to-r from-gray-600 to-red-800 text-stevens-white rounded-t-stevens-md">
                  <CardTitle className="font-stevens-display text-base sm:text-stevens-lg md:text-stevens-xl text-center font-stevens-bold leading-tight">Submit Your Application</CardTitle>
                  <p className="text-xs sm:text-stevens-sm text-stevens-white/90 leading-tight">Complete the form below to get started</p>
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
                      
                      /* ===== TEST STYLING FOR "Personal Information" LABEL ===== */
                      
                      /* Target the "Personal Information" header label */
                      #form_89080626-7bc4-4c48-9437-fd47479d7371 .form_header .form_label,
                      #form_89080626-7bc4-4c48-9437-fd47479d7371 #form_question_6ab6d516-ee1e-4066-8c7f-4f4872aadb21 .form_label {
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
                      #form_89080626-7bc4-4c48-9437-fd47479d7371 #form_question_6ab6d516-ee1e-4066-8c7f-4f4872aadb21,
                      #form_89080626-7bc4-4c48-9437-fd47479d7371 .form_header {
                        background: transparent !important;
                        background-color: transparent !important;
                      }
                      
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
                    <div className="bg-stevens-gray-50 text-stevens-gray-900 ">
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
    </PageContextProvider>
  );
}
