import React, { useEffect, useRef, useState } from "react";
import { PageHero } from "@/components/shared";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Check,
  CheckCircle2,
  Clock,
  Zap,
  FileCheck,
  GraduationCap,
  Sparkles,
  Code,
  Briefcase,
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
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

export default function AcceleratedApplicationPage() {
  // Get program code from URL or sessionStorage
  const urlParams = new URLSearchParams(window.location.search);
  const programCode =
    urlParams.get("program") ||
    sessionStorage.getItem("accelerated_application_program") ||
    "meads"; // default to MEADS
  const formSubmittedRef = useRef(false); // Prevent double tracking

  usePageTracking({
    pageType: "application",
    programCode: programCode,
    additionalData: {
      page_name: "Accelerated Application",
      application_type: "accelerated",
      has_embedded_form: true,
      program_code: programCode,
    },
  });

  // Set SEO meta tags
  useEffect(() => {
    setPageTitle(
      "Accelerated Master's Application Requirements | Stevens Online"
    );
    setMetaDescription(
      "Apply to the Stevens Accelerated Master's program and start earning graduate credits sooner toward your future career goals."
    );
    setOpenGraphTags({
      title: "Accelerated Master's Application Requirements | Stevens Online",
      description:
        "Apply to the Stevens Accelerated Master's program and start earning graduate credits sooner toward your future career goals.",
      image: buildCanonicalUrl("/assets/images/shared/stevens-campus.webp"),
      url: buildCanonicalUrl("/accelerated-application/"),
      type: "website",
    });
  }, []);

  useEffect(() => {
    // Only run on client side
    if (typeof document === "undefined") return;

    if (document.getElementById("slate-form-script-accelerated")) return;

    // Create isolated container for external script
    const scriptContainer = document.createElement("div");
    scriptContainer.id = "external-script-container-accelerated";
    scriptContainer.style.cssText = `
      position: relative;
      z-index: 1;
      isolation: isolate;
      contain: layout style;
    `;

    const script = document.createElement("script");
    script.id = "slate-form-script-accelerated";
    script.src = buildSlateEmbedUrl(FORM_IDS.ACCELERATED);
    script.async = true;

    // Append container to body, then script to container
    document.body.appendChild(scriptContainer);
    scriptContainer.appendChild(script);

    // Add form submission tracking
    const submitHandlers = [];
    script.onload = () => {
      setTimeout(() => {
        const formContainer = document.getElementById(
          FORM_IDS.ACCELERATED
        );
        if (formContainer) {
          const forms = formContainer.querySelectorAll("form");
          forms.forEach((form) => {
            const submitHandler = () => {
              if (!formSubmittedRef.current) {
                formSubmittedRef.current = true;
                setTimeout(() => {
                  trackEvent("accelerated_application_submitted", {
                    form_name: "accelerated_application",
                    program_code: programCode,
                    application_type: "accelerated",
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

      const container = document.getElementById(
        "external-script-container-accelerated"
      );
      if (container) document.body.removeChild(container);
    };
  }, [programCode]);

  const benefits = [
    "No letters of recommendation required",
    "Upload unofficial transcripts to get started",
    "Submit your resume or LinkedIn profile",
    "Official transcripts due within 2 months of enrollment",
    "Faster application review process",
  ];

  // Organize programs by category
  const mastersPrograms = [
    {
      id: "mscs",
      name: "Master of Science in Computer Science",
      shortName: "M.S. Computer Science",
      path: "/online-masters-computer-science-mscs/",
      icon: Code,
      description: "Master advanced computer science and AI skills",
    },
    {
      id: "mba",
      name: "Master of Business Administration",
      shortName: "MBA",
      path: "/online-mba/",
      icon: Briefcase,
      description: "AACSB-accredited technology-driven business leadership",
    },
    {
      id: "meads",
      name: "M.Eng. in Applied Data Science",
      shortName: "M.Eng. in Applied Data Science",
      path: "/online-masters-engineering-applied-data-science/",
      icon: GraduationCap,
      description: "Master data science and AI engineering",
    },
  ];

  const certificatePrograms = [
    {
      id: "cert-eai",
      name: "Professional Graduate Certificate in Enterprise AI",
      shortName: "Enterprise AI",
      path: "/certificates/enterprise-ai/",
      icon: Sparkles,
      description: "Build AI workflows from strategy to deployment",
    },
    {
      id: "cert-ads",
      name: "Professional Graduate Certificate in Applied Data Science Foundations",
      shortName: "Applied Data Science Foundations",
      path: "/certificates/applied-data-science-foundations/",
      icon: Sparkles,
      description: "Master Python, SQL, and Data Science and AI foundations",
    },
  ];

  const programRequirements = {
    degrees: [
      {
        id: "mscs",
        name: "M.S. Computer Science",
        fullName: "Master of Science in Computer Science",
        description:
          "The M.S. in Computer Science is designed for professionals looking to deepen their expertise in software engineering, AI, and systems design.",
        keyDates: {
          semester: "Fall 2026",
          dates: [
            { label: "Application Opens", value: "January 15, 2026", isHighlighted: true },
            { label: "Priority Deadline", value: "April 1, 2026" },
            { label: "Final Deadline", value: "June 15, 2026" },
            { label: "Classes Start", value: "August 2026" },
          ],
        },
        atAGlance: [
          { label: "Credits", value: "30" },
          { label: "Format", value: "100% Online" },
          { label: "Est. Tuition", value: "$26,250" },
          { label: "Duration", value: "2 Years" },
        ],
        keySkills: ["AI & Machine Learning", "Software Engineering", "Systems Design", "Algorithms", "Cloud Computing"],
        ctaText: "Start Your MSCS Application",
        ctaLink: "/accelerated-application/?program=mscs",
      },
      {
        id: "mba",
        name: "MBA",
        fullName: "Master of Business Administration",
        description:
          "The online MBA program prepares technology-savvy leaders with an AACSB-accredited curriculum blending business strategy and innovation.",
        keyDates: {
          semester: "Fall 2026",
          dates: [
            { label: "Application Opens", value: "January 15, 2026", isHighlighted: true },
            { label: "Priority Deadline", value: "April 1, 2026" },
            { label: "Final Deadline", value: "June 15, 2026" },
            { label: "Classes Start", value: "August 2026" },
          ],
        },
        atAGlance: [
          { label: "Credits", value: "36-45" },
          { label: "Format", value: "100% Online" },
          { label: "Accreditation", value: "AACSB" },
          { label: "Duration", value: "2.5-3 years" },
        ],
        keySkills: ["Strategic Leadership", "Business Analytics", "Innovation Management", "Finance", "Technology Strategy"],
        ctaText: "Start Your MBA Application",
        ctaLink: "/accelerated-application/?program=mba",
      },
      {
        id: "meads",
        name: "M.Eng. Applied Data Science",
        fullName: "Master of Engineering in Applied Data Science",
        description:
          "The M.Eng. in Applied Data Science program equips professionals with advanced skills in data engineering, machine learning, and AI systems.",
        keyDates: {
          semester: "Fall 2026",
          dates: [
            { label: "Application Opens", value: "January 15, 2026", isHighlighted: true },
            { label: "Priority Deadline", value: "April 1, 2026" },
            { label: "Final Deadline", value: "June 15, 2026" },
            { label: "Classes Start", value: "August 2026" },
          ],
        },
        atAGlance: [
          { label: "Credits", value: "30" },
          { label: "Format", value: "100% Online" },
          { label: "Est. Tuition", value: "$24,000" },
          { label: "Duration", value: "2 Years" },
        ],
        keySkills: ["Machine Learning", "Data Engineering", "Python & R", "MLOps", "Data Pipelines"],
        ctaText: "Start Your MEADS Application",
        ctaLink: "/accelerated-application/?program=meads",
      },
    ],
    certificates: [
      {
        id: "cert-eai",
        name: "Enterprise AI",
        fullName: "Professional Graduate Certificate in Enterprise AI",
        description:
          "Build AI workflows from strategy to deployment. This certificate is ideal for professionals looking to lead AI initiatives in their organizations.",
        keyDates: {
          semester: "Summer 2026",
          dates: [
            { label: "Application Opens", value: "February 1, 2026", isHighlighted: true },
            { label: "Application Deadline", value: "April 15, 2026" },
            { label: "Decision Notification", value: "Rolling" },
            { label: "Classes Start", value: "May 2026" },
          ],
        },
        atAGlance: [
          { label: "Credits", value: "9" },
          { label: "Duration", value: "16-24 weeks" },
          { label: "Total Cost", value: "$5,250" },
          { label: "Format", value: "100% Online" },
        ],
        keySkills: ["AI Strategy", "LLMs & GenAI", "AI Deployment", "Workflow Design", "Prompt Engineering"],
        ctaText: "Start Your Certificate Application",
        ctaLink: "/accelerated-application/?program=cert-eai",
      },
      {
        id: "cert-ads",
        name: "Applied Data Science Foundations",
        fullName:
          "Professional Graduate Certificate in Applied Data Science Foundations",
        description:
          "Master Python, SQL, and foundational data science and AI concepts. Perfect for professionals transitioning into data-driven roles.",
        keyDates: {
          semester: "Summer 2026",
          dates: [
            { label: "Application Opens", value: "February 1, 2026", isHighlighted: true },
            { label: "Application Deadline", value: "April 15, 2026" },
            { label: "Decision Notification", value: "Rolling" },
            { label: "Classes Start", value: "May 2026" },
          ],
        },
        atAGlance: [
          { label: "Credits", value: "9" },
          { label: "Duration", value: "16-24 weeks" },
          { label: "Total Cost", value: "$5,250" },
          { label: "Format", value: "100% Online" },
        ],
        keySkills: ["Python", "SQL", "Data Visualization", "Statistical Analysis"],
        ctaText: "Start Your Certificate Application",
        ctaLink: "/accelerated-application/?program=cert-ads",
      },
    ],
  };

  const allPrograms = [
    ...programRequirements.degrees,
    ...programRequirements.certificates,
  ];
  const validProgramIds = allPrograms.map((p) => p.id);
  const initialProgram =
    validProgramIds.includes(programCode) ? programCode : allPrograms[0].id;
  const [activeProgram, setActiveProgram] = useState(initialProgram);
  const selectedProgram = allPrograms.find((p) => p.id === activeProgram);

  const sectionRef = useRef(null);
  const isInitialMount = useRef(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    const params = new URLSearchParams(location.search);
    params.set("program", activeProgram);
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
    sessionStorage.setItem("accelerated_application_program", activeProgram);
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [activeProgram, navigate, location.pathname, location.search]);

  return (
    <PageContextProvider
      pageType="application"
      pageName="AcceleratedApplication"
    >
      <div className="bg-stevens-light-gray font-stevens-body">
        <PageHero
          title="Accelerated Application"
          subtitle="Fast-Track Your Graduate Education at Stevens"
          bgImage="/assets/images/accelerated-application/accelerated-application-hero.webp"
        />

        {/* Speed Emphasis Section */}
        <div className="py-stevens-section-sm bg-stevens-black text-white">
          <div className="max-w-7xl mx-auto px-stevens-md lg:px-stevens-lg text-center">
            <div className="flex items-center justify-center gap-stevens-md mb-stevens-lg">
              <div className="w-14 h-14 bg-stevens-red rounded-full flex items-center justify-center">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h2 className="font-stevens-display text-stevens-3xl md:text-stevens-4xl font-light uppercase tracking-wide">
                Complete in Minutes, Not Hours
              </h2>
            </div>
            <p className="text-stevens-xl mb-stevens-xl max-w-3xl mx-auto leading-relaxed text-white/90">
              Our streamlined application takes just{" "}
              <span className="text-stevens-red font-bold">5-10 minutes</span>{" "}
              to complete. No letters of recommendation. No lengthy essays. Just
              your basics and you're done.
            </p>

            <div className="grid md:grid-cols-3 gap-stevens-lg max-w-4xl mx-auto">
              <div className="group bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-xl p-stevens-xl border border-white hover:border-stevens-red/50 transition-all duration-300">
                <div className="w-16 h-16 bg-stevens-red group-hover:bg-stevens-red rounded-full flex items-center justify-center mx-auto mb-stevens-md transition-all duration-300">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-stevens-xl mb-stevens-xs">
                  5-10 Minutes
                </h3>
                <p className="text-stevens-base text-white/70">
                  Quick application process
                </p>
              </div>
              <div className="group bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-xl p-stevens-xl border border-white hover:border-stevens-red/50 transition-all duration-300">
                <div className="w-16 h-16 bg-stevens-red group-hover:bg-stevens-red rounded-full flex items-center justify-center mx-auto mb-stevens-md transition-all duration-300">
                  <FileCheck className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-stevens-xl mb-stevens-xs">
                  Unofficial Transcripts
                </h3>
                <p className="text-stevens-base text-white/70">
                  Get started immediately
                </p>
              </div>
              <div className="group bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-xl p-stevens-xl border border-white hover:border-stevens-red/50 transition-all duration-300">
                <div className="w-16 h-16 bg-stevens-red group-hover:bg-stevens-red rounded-full flex items-center justify-center mx-auto mb-stevens-md transition-all duration-300">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-stevens-xl mb-stevens-xs">
                  Fast Review
                </h3>
                <p className="text-stevens-base text-white/70">
                  Hear back quickly
                </p>
              </div>
            </div>
            
          </div>
        </div>

        
        {/* Application Requirements by Program Section */}
        <div
          ref={sectionRef}
          className="py-stevens-section bg-stevens-light-gray scroll-mt-24"
        >
          {/* Accelerated Application form styles - shared across all form instances */}
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

            /* Submit button styling - Stevens Red */
            .${FORM_CLASSES.ACCELERATED}
              button[type="submit"],
            .${FORM_CLASSES.ACCELERATED}
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
            .${FORM_CLASSES.ACCELERATED}
              button[type="submit"]:hover,
            .${FORM_CLASSES.ACCELERATED}
              input[type="submit"]:hover {
              background: #8b1e2f !important;
              transform: translateY(-2px) !important;
              box-shadow: 0 6px 16px rgba(163, 38, 56, 0.35) !important;
            }

            /* Submit button active */
            .${FORM_CLASSES.ACCELERATED}
              button[type="submit"]:active,
            .${FORM_CLASSES.ACCELERATED}
              input[type="submit"]:active {
              transform: translateY(0) !important;
              box-shadow: 0 2px 4px rgba(163, 38, 56, 0.2) !important;
            }

            /* Secondary button styling */
            .${FORM_CLASSES.ACCELERATED}
              button[type="button"],
            .${FORM_CLASSES.ACCELERATED}
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

            .${FORM_CLASSES.ACCELERATED}
              button[type="button"]:hover {
              background: #1f2937 !important;
              transform: translateY(-2px) !important;
              box-shadow: 0 6px 16px rgba(55, 65, 81, 0.35) !important;
            }

            /* ===== BUTTON STYLING - END ===== */

            /* ===== FORM FIELD STYLING - WHITE BACKGROUND ===== */

            /* Form field enhancements - White background for all states */
            .${FORM_CLASSES.ACCELERATED}
              input[type="text"],
            .${FORM_CLASSES.ACCELERATED}
              input[type="email"],
            .${FORM_CLASSES.ACCELERATED}
              input[type="tel"],
            .${FORM_CLASSES.ACCELERATED}
              input[type="number"],
            .${FORM_CLASSES.ACCELERATED}
              input[type="date"],
            .${FORM_CLASSES.ACCELERATED}
              input[type="password"],
            .${FORM_CLASSES.ACCELERATED} select,
            .${FORM_CLASSES.ACCELERATED} textarea {
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
            .${FORM_CLASSES.ACCELERATED}
              input::placeholder,
            .${FORM_CLASSES.ACCELERATED}
              textarea::placeholder {
              color: #9ca3af !important;
            }

            /* Focus state - more specific selectors to override Slate styles */
            .${FORM_CLASSES.ACCELERATED} input:focus,
            .${FORM_CLASSES.ACCELERATED}
              input[type="text"]:focus,
            .${FORM_CLASSES.ACCELERATED}
              input[type="email"]:focus,
            .${FORM_CLASSES.ACCELERATED}
              input[type="tel"]:focus,
            .${FORM_CLASSES.ACCELERATED}
              input[type="number"]:focus,
            .${FORM_CLASSES.ACCELERATED}
              input[type="date"]:focus,
            .${FORM_CLASSES.ACCELERATED}
              input[type="password"]:focus,
            .${FORM_CLASSES.ACCELERATED} select:focus,
            .${FORM_CLASSES.ACCELERATED}
              textarea:focus {
              outline: none !important;
              background: #ffffff !important;
              background-color: #ffffff !important;
              border-color: #a32638 !important;
              box-shadow: 0 0 0 3px rgba(163, 38, 56, 0.1) !important;
            }

            /* Focus-within for parent containers */
            .${FORM_CLASSES.ACCELERATED}
              input:focus-within,
            .${FORM_CLASSES.ACCELERATED}
              *:focus
              input {
              background: #ffffff !important;
              background-color: #ffffff !important;
            }

            /* Override any inline styles or class-based dark backgrounds - Nuclear option */
            .${FORM_CLASSES.ACCELERATED} input,
            .${FORM_CLASSES.ACCELERATED} input[class],
            .${FORM_CLASSES.ACCELERATED} input[style],
            .${FORM_CLASSES.ACCELERATED}
              .form-control,
            .${FORM_CLASSES.ACCELERATED} .form-input,
            .${FORM_CLASSES.ACCELERATED}
              [class*="input"],
            .${FORM_CLASSES.ACCELERATED}
              [class*="field"]
              input {
              background: #ffffff !important;
              background-color: #ffffff !important;
            }

            /* Target active/focus states with high specificity */
            .${FORM_CLASSES.ACCELERATED} input:active,
            .${FORM_CLASSES.ACCELERATED} input.active,
            .${FORM_CLASSES.ACCELERATED}
              input.focused,
            .${FORM_CLASSES.ACCELERATED}
              input[aria-selected="true"],
            .${FORM_CLASSES.ACCELERATED}
              input:not(:placeholder-shown) {
              background: #ffffff !important;
              background-color: #ffffff !important;
              color: #1f2937 !important;
            }

            /* Slate form specific overrides */
            .${FORM_CLASSES.ACCELERATED}
              .slate-field
              input,
            .${FORM_CLASSES.ACCELERATED} .slate-input,
            .${FORM_CLASSES.ACCELERATED}
              [data-slate]
              input,
            .${FORM_CLASSES.ACCELERATED} form input {
              background: #ffffff !important;
              background-color: #ffffff !important;
            }

            /* iframe inner content override attempt */
            .${FORM_CLASSES.ACCELERATED} iframe {
              background: #ffffff !important;
            }

            /* Autofill override - keep white background */
            .${FORM_CLASSES.ACCELERATED}
              input:-webkit-autofill,
            .${FORM_CLASSES.ACCELERATED}
              input:-webkit-autofill:hover,
            .${FORM_CLASSES.ACCELERATED}
              input:-webkit-autofill:focus,
            .${FORM_CLASSES.ACCELERATED}
              input:-webkit-autofill:active {
              -webkit-box-shadow: 0 0 0 30px white inset !important;
              -webkit-text-fill-color: #1f2937 !important;
              background-color: #ffffff !important;
            }

            /* Select dropdown styling */
            .${FORM_CLASSES.ACCELERATED} select {
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
            .${FORM_CLASSES.ACCELERATED} label {
              font-weight: 500 !important;
              color: #374151 !important;
              font-size: 14px !important;
              margin-bottom: 0.5rem !important;
            }
          `}</style>
          <div className="max-w-7xl mx-auto px-stevens-md lg:px-stevens-lg">
            <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
              {/* Main Content - Left */}
              {selectedProgram && (
                <div className="lg:col-span-2 order-2 lg:order-1">
                  <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 md:p-10">
                  <h3 className="font-stevens-display text-2xl md:text-3xl font-semibold text-stevens-black mb-3">
                    {selectedProgram.fullName}
                  </h3>
                  <p className="font-stevens-body text-stevens-base text-stevens-dark-gray mb-6 leading-relaxed">
                    {selectedProgram.description}
                  </p>

                  {/* At-a-Glance Stats Bar */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-200 rounded-lg overflow-hidden mb-6">
                    {selectedProgram.atAGlance.map((stat, idx) => (
                      <div key={idx} className="bg-gray-50 px-4 py-3 text-center">
                        <p className="font-stevens-display text-lg font-bold text-stevens-red leading-tight">
                          {stat.value}
                        </p>
                        <p className="font-stevens-body text-xs text-stevens-gray uppercase tracking-wide mt-0.5">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Key Skills */}
                  {selectedProgram.keySkills && (
                    <div className="mb-2">
                      <p className="font-stevens-nav text-xs uppercase tracking-wider text-stevens-gray mb-2">
                        What You'll Learn
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {selectedProgram.keySkills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="font-stevens-body text-xs px-3 py-1.5 rounded-full bg-stevens-red/10 text-stevens-red font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Embedded Application Form */}
                  <div className="mt-10 pt-8 border-t border-gray-200">
                    <p className="font-stevens-body text-sm text-stevens-gray mb-6 text-center">
                      You do not need to have all of your materials to begin your
                      application. Get started by entering basic information!
                    </p>
                    <div className="bg-stevens-black px-6 py-5 rounded-t-lg">
                      <h4 className="font-stevens-display text-lg font-bold uppercase tracking-wide text-center text-white">
                        Submit Your Application
                      </h4>
                      <p className="font-stevens-body text-sm text-white/80 text-center mt-1">
                        Complete the form below to get started
                      </p>
                    </div>
                    <div className="border border-t-0 border-gray-200 rounded-b-lg bg-white">
                      <div className="p-4 sm:p-6">
                        <div
                          className={`${SLATE_FORM_WRAPPER} ${FORM_CLASSES.ACCELERATED}`}
                        >
                          <div
                            id={FORM_IDS.ACCELERATED}
                            className="min-h-[600px] w-full"
                          >
                            <div className="flex flex-col items-center justify-center h-96 bg-gray-50 rounded-lg border border-gray-200">
                              <div className="relative">
                                <div className="w-16 h-16 rounded-full border-4 border-gray-200"></div>
                                <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-transparent border-t-stevens-red animate-spin"></div>
                              </div>
                              <p className="font-stevens-body text-stevens-dark-gray font-semibold mt-6">
                                Loading Application Form...
                              </p>
                              <p className="font-stevens-body text-sm text-gray-500 mt-2">
                                Please wait while we prepare your application
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>
                </div>
              )}

              {/* Sticky Sidebar - Right (Program Selector) */}
              <div className="lg:col-span-1 order-1 lg:order-2">
                <div className="sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto space-y-6 pl-4">
                  <Card className="bg-white border-0 shadow-lg overflow-visible rounded-xl">
                    <CardHeader className="pb-3 bg-stevens-dark-gray rounded-t-xl">
                      <CardTitle className="font-stevens-display text-lg text-white">
                        Choose Your Program
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 rounded-b-xl [&>*:last-child]:rounded-b-xl">
                      <div className="bg-gray-600 text-white px-4 py-2">
                        <span className="font-stevens-nav text-xs font-bold uppercase tracking-widest">
                          Degrees
                        </span>
                      </div>
                      {programRequirements.degrees.map((program) => (
                        <button
                          key={program.id}
                          onClick={() => setActiveProgram(program.id)}
                          className={`font-stevens-body w-full text-left px-4 py-3 text-sm font-semibold transition-all duration-200 flex items-center ${
                            activeProgram === program.id
                              ? "relative bg-stevens-red text-white"
                              : "bg-gray-100 text-stevens-black hover:bg-gray-200"
                          }`}
                        >
                          {activeProgram === program.id && (
                            <svg
                              className="absolute right-full top-1/2 -translate-y-1/2 w-3 h-5 flex-shrink-0"
                              viewBox="0 0 12 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              aria-hidden
                            >
                              <path
                                d="M12 0 L0 10 L12 20 Z"
                                fill="#a32638"
                              />
                            </svg>
                          )}
                          {program.name}
                        </button>
                      ))}
                      <div className="bg-gray-600 text-white px-4 py-2">
                        <span className="font-stevens-nav text-xs font-bold uppercase tracking-widest">
                          Certificates
                        </span>
                      </div>
                      {programRequirements.certificates.map((program) => (
                        <button
                          key={program.id}
                          onClick={() => setActiveProgram(program.id)}
                          className={`font-stevens-body w-full text-left px-4 py-3 text-sm font-semibold transition-all duration-200 flex items-center ${
                            activeProgram === program.id
                              ? "relative bg-stevens-red text-white"
                              : "bg-gray-100 text-stevens-black hover:bg-gray-200"
                          }`}
                        >
                          {activeProgram === program.id && (
                            <svg
                              className="absolute right-full top-1/2 -translate-y-1/2 w-3 h-5 flex-shrink-0"
                              viewBox="0 0 12 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              aria-hidden
                            >
                              <path
                                d="M12 0 L0 10 L12 20 Z"
                                fill="#a32638"
                              />
                            </svg>
                          )}
                          {program.name}
                        </button>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Why Choose the Accelerated Application? */}
                  <Card className="bg-white border-0 shadow-lg rounded-xl overflow-hidden">
                    <CardHeader className="pb-3 border-b border-gray-200">
                      <CardTitle className="font-stevens-display text-base font-bold uppercase tracking-wider text-stevens-black">
                        Why Choose the Accelerated Application?
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <ul className="space-y-3">
                        {benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-stevens-red flex-shrink-0 mt-0.5" />
                            <span className="font-stevens-body text-sm text-stevens-dark-gray">
                              {benefit}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Application Form Section - COMMENTED OUT */}
        {false && (
        <div className="py-stevens-section bg-gray-50">
          <div className="max-w-7xl mx-auto px-stevens-sm stevens-md:px-stevens-lg stevens-xl:px-stevens-xl">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              {/* Left Column - Info */}
              <div>
                <h2 className="font-stevens-display text-stevens-3xl md:text-stevens-4xl font-light uppercase tracking-wide text-stevens-black mb-6">
                  Your Path to Graduate Success
                  <span className="block w-16 h-1 bg-stevens-red mt-4"></span>
                </h2>
                <p className="text-lg text-stevens-dark-gray mb-8 leading-relaxed">
                  Fast-track your application with our new{" "}
                  <span className="font-bold text-stevens-red">
                    Accelerated Application
                  </span>{" "}
                  designed for busy professionals. The Accelerated Application
                  streamlines the admissions process so you can get started
                  immediately on your graduate education journey.
                </p>

                {/* What Makes It Different Card */}
                <div className="bg-white rounded-xl p-6 shadow-lg mb-6 border-t-4 border-stevens-red">
                  <h3 className="font-stevens-display text-xl font-bold text-stevens-black mb-4">
                    What Makes It Different?
                  </h3>
                  <p className="text-stevens-base text-stevens-dark-gray leading-relaxed">
                    We recognize that working professionals have been vetted
                    through their employment and bring valuable experience to
                    the classroom. The Accelerated Application removes traditional
                    barriers while maintaining Stevens' academic standards.
                  </p>
                </div>

                {/* Why Choose Card */}
                <div className="bg-white rounded-xl p-6 shadow-lg mb-6 border-t-4 border-stevens-black">
                  <h3 className="font-stevens-display text-xl font-bold text-stevens-black mb-6">
                    Why Choose the Accelerated Application?
                  </h3>
                  <ul className="space-y-4">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-4">
                        <div className="w-6 h-6 bg-stevens-red/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-4 h-4 text-stevens-red" />
                        </div>
                        <span className="text-stevens-dark-gray leading-relaxed">
                          {benefit}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Note Callout */}
                <div className="bg-stevens-black/5 rounded-lg p-5 border border-gray-200">
                  <p className="text-sm text-stevens-dark-gray leading-relaxed">
                    <strong className="text-stevens-black">Note:</strong> The
                    Accelerated Application is available for select professional
                    online programs offered at Stevens. Stevens may request
                    additional documentation if needed to confirm your academic
                    or professional background.
                  </p>
                </div>
              </div>

              {/* Right Column - Form */}
              <div className="lg:sticky lg:top-8">
                <Card className="shadow-stevens-2xl bg-white rounded-lg overflow-hidden border border-gray-200">
                  {/* Header - Black with white text (matching AcceleratedFormEmbed style) */}
                  <div className="bg-stevens-black px-6 py-6 border-b border-stevens-black/20">
                    <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-wide text-center text-white">
                      Submit Your Application
                    </h2>
                    <p className="text-sm sm:text-base text-white/80 text-center mt-2">
                      Complete the form below to get started
                    </p>
                  </div>
                  <CardContent className="p-0">
                    <div className="relative bg-white">
                      {/* Form Container */}
                      <div className="p-4 sm:p-6">
                        <div
                          className={`${SLATE_FORM_WRAPPER} ${FORM_CLASSES.ACCELERATED}`}
                        >
                          <div
                            id={FORM_IDS.ACCELERATED}
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
        )}
      </div>
    </PageContextProvider>
  );
}
