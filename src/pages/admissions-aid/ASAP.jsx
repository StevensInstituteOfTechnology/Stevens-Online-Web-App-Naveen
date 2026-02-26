import React, { useEffect, useRef } from "react";
import { PageHero } from "@/components/shared";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";
import { usePageTracking } from "@/hooks/analytics/usePageTracking";
import { PageContextProvider } from "@/contexts/analytics/PageContext";
import { trackEvent } from "@/utils/analytics/vercelTracking";
import {
  setPageTitle,
  setMetaDescription,
  setOpenGraphTags,
  buildCanonicalUrl,
} from "@/utils";
import { BOOKING_URLS } from "@/config/constants";
import { FORM_IDS, FORM_CLASSES, SLATE_FORM_WRAPPER, buildSlateEmbedUrl } from "@/config/formIds";

export default function ASAPPage() {
  // Get program code from URL or sessionStorage
  const urlParams = new URLSearchParams(window.location.search);
  const programCode =
    urlParams.get("program") ||
    sessionStorage.getItem("asap_application_program") ||
    "unknown";
  const formSubmittedRef = useRef(false); // Prevent double tracking

  usePageTracking({
    pageType: "application",
    programCode: programCode,
    additionalData: {
      page_name: "ASAP Application",
      application_type: "asap",
      has_embedded_form: true,
      program_code: programCode,
    },
  });

  // Set SEO meta tags
  useEffect(() => {
    setPageTitle(
      "Accelerated Stevens Admission Process (ASAP)| Stevens Online"
    );
    setMetaDescription(
      "The Accelerated Stevens Admission Process (ASAP) allows you to start graduate courses early and fast-track your degree."
    );
    setOpenGraphTags({
      title: "Accelerated Stevens Admission Process (ASAP)| Stevens Online",
      description:
        "The Accelerated Stevens Admission Process (ASAP) allows you to start graduate courses early and fast-track your degree.",
      image: buildCanonicalUrl("/assets/images/shared/stevens-campus.webp"),
      url: buildCanonicalUrl("/asap/"),
      type: "website",
    });
  }, []);

  useEffect(() => {
    // Only run on client side
    if (typeof document === "undefined") return;

    if (document.getElementById("slate-form-script")) return;

    // Create isolated container for external script
    const scriptContainer = document.createElement("div");
    scriptContainer.id = "external-script-container";
    scriptContainer.style.cssText = `
      position: relative;
      z-index: 1;
      isolation: isolate;
      contain: layout style;
    `;

    const script = document.createElement("script");
    script.id = "slate-form-script";
    script.src = buildSlateEmbedUrl(FORM_IDS.ASAP);
    script.async = true;

    // Append container to body, then script to container
    document.body.appendChild(scriptContainer);
    scriptContainer.appendChild(script);

    // Add form submission tracking
    const submitHandlers = [];
    script.onload = () => {
      setTimeout(() => {
        const formContainer = document.getElementById(
          FORM_IDS.ASAP
        );
        if (formContainer) {
          const forms = formContainer.querySelectorAll("form");
          forms.forEach((form) => {
            const submitHandler = () => {
              if (!formSubmittedRef.current) {
                formSubmittedRef.current = true;
                setTimeout(() => {
                  trackEvent("asap_application_submitted", {
                    form_name: "asap_application",
                    program_code: programCode,
                    application_type: "asap",
                    is_conversion: true,
                  });
                }, 500);
              }
            };
            form.addEventListener("submit", submitHandler);
            submitHandlers.push({ form, handler: submitHandler });
          });
        }
      }, 2000);
    };

    return () => {
      // Clean up event listeners
      submitHandlers.forEach(({ form, handler }) => {
        form.removeEventListener("submit", handler);
      });

      const container = document.getElementById("external-script-container");
      if (container) document.body.removeChild(container);
    };
  }, [programCode]);

  const benefits = [
    "No letters of recommendation required",
    "No personal statements needed",
    "No prior coding experience necessary",
    "Earn credit toward your full degree",
  ];

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
                <h2 className="font-stevens-display text-stevens-3xl md:text-stevens-4xl font-light uppercase tracking-wide text-stevens-dark-gray mb-stevens-md">
                  Begin Your Graduate Journey
                </h2>
                <p className="text-stevens-lg text-stevens-dark-gray mb-stevens-lg leading-relaxed">
                  With our new ASAP (Accelerated Stevens Admission Process), you
                  can begin your graduate studies by enrolling in two
                  foundational courses. If you earn a B or better in both and
                  submit proof of a qualifying bachelor's degree, you'll earn
                  full admission into the degree program with credit already in
                  hand.
                </p>

                <div className="bg-stevens-white rounded-stevens-md p-stevens-md shadow-stevens-lg mb-stevens-lg border border-stevens-light-gray">
                  <h3 className="font-stevens-display text-stevens-xl font-light text-stevens-dark-gray mb-stevens-md">
                    Why Choose ASAP?
                  </h3>
                  <ul className="space-y-stevens-md">
                    {benefits.map((benefit, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-stevens-md"
                      >
                        <Check className="w-5 h-5 text-stevens-black mt-0.5 flex-shrink-0" />
                        <span className="text-stevens-dark-gray">
                          {benefit}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column - Form */}
              <div className="lg:sticky lg:top-8">
                <Card className="shadow-stevens-2xl bg-white rounded-lg overflow-hidden border border-gray-200">
                  {/* Header - Black with white text (matching AcceleratedApplication style) */}
                  <div className="bg-stevens-black px-6 py-6 border-b border-stevens-black/20">
                    <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-wide text-center text-white">
                      Submit Your ASAP Application
                    </h2>
                    <p className="text-sm sm:text-base text-white/80 text-center mt-2">
                      Complete the form below to get started
                    </p>
                  </div>
                  <CardContent className="p-0">
                    <div className="relative bg-white">
                      <style jsx>{`
                        .slate-form-asap {
                          max-width: 100% !important;
                          width: 100% !important;
                          overflow: hidden !important;
                          contain: layout style paint !important;
                          isolation: isolate !important;
                          position: relative !important;
                          z-index: 1 !important;
                        }

                        .slate-form-asap * {
                          max-width: 100% !important;
                          box-sizing: border-box !important;
                        }

                        .slate-form-asap iframe {
                          width: 100% !important;
                          max-width: 100% !important;
                          border: none !important;
                          min-height: 600px !important;
                          z-index: 1 !important;
                          position: relative !important;
                        }

                        .slate-form-asap form {
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

                        /* Submit button styling - Stevens Red */
                        .slate-form-asap
                          button[type="submit"],
                        .slate-form-asap
                          input[type="submit"] {
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

                        /* Submit button hover */
                        .slate-form-asap
                          button[type="submit"]:hover,
                        .slate-form-asap
                          input[type="submit"]:hover {
                          background: #8b1e2f !important;
                          transform: translateY(-2px) !important;
                          box-shadow: 0 6px 16px rgba(163, 38, 56, 0.35) !important;
                        }

                        /* Submit button active */
                        .slate-form-asap
                          button[type="submit"]:active,
                        .slate-form-asap
                          input[type="submit"]:active {
                          transform: translateY(0) !important;
                          box-shadow: 0 2px 4px rgba(163, 38, 56, 0.2) !important;
                        }

                        /* Secondary button styling */
                        .slate-form-asap
                          button[type="button"],
                        .slate-form-asap
                          button:not([type="submit"]) {
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

                        .slate-form-asap
                          button[type="button"]:hover {
                          background: #1f2937 !important;
                          transform: translateY(-2px) !important;
                          box-shadow: 0 6px 16px rgba(55, 65, 81, 0.35) !important;
                        }

                        /* ===== BUTTON STYLING - END ===== */

                        /* ===== FORM FIELD STYLING - WHITE BACKGROUND ===== */

                        /* Form field enhancements - White background for all states */
                        .slate-form-asap
                          input[type="text"],
                        .slate-form-asap
                          input[type="email"],
                        .slate-form-asap
                          input[type="tel"],
                        .slate-form-asap
                          input[type="number"],
                        .slate-form-asap
                          input[type="date"],
                        .slate-form-asap
                          input[type="password"],
                        .slate-form-asap select,
                        .slate-form-asap textarea {
                          background-color: #ffffff !important;
                          border: 1px solid #d1d5db !important;
                          border-radius: 6px !important;
                          padding: 0.75rem 1rem !important;
                          font-size: 14px !important;
                          color: #1f2937 !important;
                          transition: border-color 0.2s ease,
                            box-shadow 0.2s ease !important;
                        }

                        /* Ensure placeholder text is visible */
                        .slate-form-asap
                          input::placeholder,
                        .slate-form-asap
                          textarea::placeholder {
                          color: #9ca3af !important;
                        }

                        /* Focus state - more specific selectors to override Slate styles */
                        .slate-form-asap input:focus,
                        .slate-form-asap
                          input[type="text"]:focus,
                        .slate-form-asap
                          input[type="email"]:focus,
                        .slate-form-asap
                          input[type="tel"]:focus,
                        .slate-form-asap
                          input[type="number"]:focus,
                        .slate-form-asap
                          input[type="date"]:focus,
                        .slate-form-asap
                          input[type="password"]:focus,
                        .slate-form-asap select:focus,
                        .slate-form-asap
                          textarea:focus {
                          outline: none !important;
                          background: #ffffff !important;
                          background-color: #ffffff !important;
                          border-color: #a32638 !important;
                          box-shadow: 0 0 0 3px rgba(163, 38, 56, 0.1) !important;
                        }

                        /* Override any inline styles or class-based dark backgrounds */
                        .slate-form-asap input,
                        .slate-form-asap input[class],
                        .slate-form-asap input[style],
                        .slate-form-asap
                          .form-control,
                        .slate-form-asap .form-input,
                        .slate-form-asap
                          [class*="input"],
                        .slate-form-asap
                          [class*="field"]
                          input {
                          background: #ffffff !important;
                          background-color: #ffffff !important;
                        }

                        /* Target active/focus states with high specificity */
                        .slate-form-asap input:active,
                        .slate-form-asap input.active,
                        .slate-form-asap
                          input.focused,
                        .slate-form-asap
                          input[aria-selected="true"],
                        .slate-form-asap
                          input:not(:placeholder-shown) {
                          background: #ffffff !important;
                          background-color: #ffffff !important;
                          color: #1f2937 !important;
                        }

                        /* Slate form specific overrides */
                        .slate-form-asap
                          .slate-field
                          input,
                        .slate-form-asap .slate-input,
                        .slate-form-asap
                          [data-slate]
                          input,
                        .slate-form-asap form input {
                          background: #ffffff !important;
                          background-color: #ffffff !important;
                        }

                        /* iframe inner content override attempt */
                        .slate-form-asap iframe {
                          background: #ffffff !important;
                        }

                        /* Autofill override - keep white background */
                        .slate-form-asap
                          input:-webkit-autofill,
                        .slate-form-asap
                          input:-webkit-autofill:hover,
                        .slate-form-asap
                          input:-webkit-autofill:focus,
                        .slate-form-asap
                          input:-webkit-autofill:active {
                          -webkit-box-shadow: 0 0 0 30px white inset !important;
                          -webkit-text-fill-color: #1f2937 !important;
                          background-color: #ffffff !important;
                        }

                        /* Select dropdown styling */
                        .slate-form-asap select {
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
                        .slate-form-asap label {
                          font-weight: 500 !important;
                          color: #374151 !important;
                          font-size: 14px !important;
                          margin-bottom: 0.5rem !important;
                        }
                      `}</style>
                      {/* Form Container */}
                      <div className="p-4 sm:p-6">
                        <div
                          className={`${SLATE_FORM_WRAPPER} ${FORM_CLASSES.ASAP}`}
                        >
                          <div
                            id={FORM_IDS.ASAP}
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
                            <p className="text-stevens-dark-gray font-semibold mt-6">
                              Loading Application Form...
                            </p>
                            <p className="text-sm text-gray-500 mt-2">
                              Please wait while we prepare your application
                            </p>
                          </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>

                  {/* Footer - Help link */}
                  <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                    <p className="text-sm text-stevens-dark-gray text-center">
                      Have questions?{" "}
                      <a
                        href={BOOKING_URLS.SCHEDULE_CALL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-stevens-red hover:underline font-semibold"
                      >
                        Schedule a call
                      </a>{" "}
                      with our admissions team.
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContextProvider>
  );
}
