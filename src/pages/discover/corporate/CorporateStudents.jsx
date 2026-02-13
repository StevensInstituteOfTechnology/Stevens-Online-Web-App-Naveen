import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import { getContentImageProps } from "@/utils/responsiveImage";
import {
  ArrowRight,
  CheckCircle,
  Clock,
  DollarSign,
  GraduationCap,
  Users,
  Award,
  BookOpen,
  Zap,
  TrendingUp,
  Target,
  Calculator,
  ChevronLeft,
  Wrench,
  BarChart3,
  Send,
  Mail,
  Phone,
  Calendar,
  ExternalLink,
} from "lucide-react";
import {
  PageHero,
  TestimonialCarousel,
  RequestInfoModal,
} from "@/components/shared";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { usePageTracking } from "@/hooks/analytics/usePageTracking";
import { PageContextProvider } from "@/contexts/analytics/PageContext";
import {
  setPageTitle,
  setMetaDescription,
  setOpenGraphTags,
  buildCanonicalUrl,
} from "@/utils";
import { trackConversion, CONVERSION_LABELS } from "@/utils/gtmTracking";
import { trackEvent } from "@/utils/analytics/vercelTracking";
import { PROGRAMS_DATA } from "@/data/programsData";
import { getProgramRecommendations } from "@/utils/discountCalculator";
import {
  BOOKING_URLS,
  KEY_DATES_SPRING2,
} from "@/config/constants";
import EmployerFaqSection from "@/components/corporate/EmployerFaqSection";
import ContactOptionsModal from "@/components/shared/modals/ContactOptionsModal";
import TuitionCalculatorBody from "@/components/calculator/TuitionCalculatorBody";

const CorporateStudents = () => {
  const [searchParams] = useSearchParams();
  const [showContactModal, setShowContactModal] = useState(false);
  const [showContactOptionsModal, setShowContactOptionsModal] = useState(false);
  const [companyName, setCompanyName] = useState(null);
  const [corporateCode, setCorporateCode] = useState(null);

  // Questionnaire States
  const [questionnaireStep, setQuestionnaireStep] = useState(0); // 0: interest, 1: credential, 2: program selection
  const [selectedInterest, setSelectedInterest] = useState(null); // 'management' or 'engineering'
  const [selectedCredentialType, setSelectedCredentialType] = useState(null); // 'masters' or 'certificate'
  const [recommendedPrograms, setRecommendedPrograms] = useState([]);

  // Cost Calculator States
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [calculatedCost, setCalculatedCost] = useState(null);
  const [showCalculator, setShowCalculator] = useState(false);

  usePageTracking({
    pageType: "landing",
    additionalData: {
      page_name: "Corporate Students",
      has_form: true,
      landing_page_type: "b2c",
      company: companyName || "unknown",
    },
  });

  // Set SEO meta tags - optimized for search and AI engines
  useEffect(() => {
    const canonical = buildCanonicalUrl("/corporate-students/");
    setPageTitle(
      "Corporate Tuition Benefits 2025 | Save Up to 50% | Stevens Online Masters"
    );
    setMetaDescription(
      `Use your ${KEY_DATES_SPRING2.TERM.year} employer tuition benefits. Stevens workforce partners save up to 50% on AACSB-accredited online MBA, M.S. Computer Science & M.Eng. degrees. $5,250 certificates align with IRS Section 127 limits. No GRE required.`
    );
    setOpenGraphTags({
      title:
        "Corporate Tuition Benefits | Save Up to 50% on Your Masters Degree | Stevens Online",
      description: `Stevens workforce development programs help employees maximize tuition benefits. 20% partner discount + 15% stackable discounts. ${KEY_DATES_SPRING2.TERM.name} enrollment open.`,
      image: buildCanonicalUrl(
        "/assets/images/corporate-students/corporate-students-hero.webp"
      ),
      url: canonical,
      type: "website",
    });
  }, []);

  // Detect company from URL parameters
  useEffect(() => {
    const company = searchParams.get("company");
    const code = searchParams.get("code");

    if (company) {
      setCompanyName(decodeURIComponent(company));
    }
    if (code) {
      setCorporateCode(code);
      sessionStorage.setItem("corporate_code", code);
    }

    trackEvent("corporate_student_landing", {
      company: company || "direct",
      has_code: !!code,
    });
  }, [searchParams]);

  // Update recommended programs when questionnaire answers change
  useEffect(() => {
    if (selectedInterest && selectedCredentialType) {
      const programCodes = getProgramRecommendations(
        selectedInterest,
        selectedCredentialType
      );
      const programs = programCodes
        .map((code) => PROGRAMS_DATA.find((p) => p.code === code))
        .filter(Boolean);
      setRecommendedPrograms(programs);
    }
  }, [selectedInterest, selectedCredentialType]);

  // Partner benefits
  const partnerBenefits = [
    {
      icon: Zap,
      title: "Accelerated Application",
      description:
        "Skip essays and recommendation letters. Apply in minutes, not weeks.",
    },
    {
      icon: DollarSign,
      title: "Tuition Reimbursement Friendly",
      description:
        "We work directly with your HR team to ensure seamless tuition assistance processing.",
    },
    {
      icon: Users,
      title: "Dedicated Corporate Support Team",
      description:
        "From application to graduation, our Corporate Care Advisors are your single point of contact.",
    },
    {
      icon: Target,
      title: "Customized Learning Pathways",
      description:
        "Programs and courses built around your company's real-world projects and skill needs.",
    },
    {
      icon: TrendingUp,
      title: "Immediate Career Impact",
      description:
        "Apply new skills right away and gain credentials that enhance your role and open opportunities.",
    },
  ];

  // Success stories / testimonials
  const testimonials = [
    {
      quote:
        "Stakeholder management and collaboration are important. The courses I have taken at Stevens help me apply the knowledge I've learned to my daily tasks...At bigger companies like Pfizer, managing cross-functional projects is critical.",
      author: "Gullnaz Saeedi",
      imageSrc:
        "/assets/images/corporate-students/corporate-students-testimonial-gullnaz.webp",
      imageAlt: "Gullnaz Saeedi",
      imageObjectPosition: "center 20%", // Center horizontally, 20% from top
    },
    {
      quote:
        "I feel like my education is helping me be a more well-rounded design participant, especially at a place that is a financial institution. Being able to empathize more with my business stakeholders and my management has been really helpful.",
      author: "Sara Swanson",

      imageSrc:
        "/assets/images/corporate-students/corporate-students-testimonial-sara.webp",
      imageAlt: "Sara Swanson",
      buttonText: "Read More",
      buttonLink: "https://www.stevens.edu/news/becoming-a-design-leader",
      imageObjectPosition: "center 10%", // Center horizontally, 10% from top
    },
    {
      quote:
        "I can confidently say that enrolling in the Stevens MBA program was one of my best decisions. Stevens offers a comprehensive curriculum that helps students develop invaluable skills to navigate the complex business world and improve their professional capabilities.",
      author: "Rupinder Bhullar",
      title: "Director of Enterprise Automation Services",
      company: "Pfizer",
      imageSrc:
        "/assets/images/corporate-students/corporate-students-testimonial-rupinder.webp",
      imageAlt:
        "Rupinder Bhullar, Director of Enterprise Automation Services at Pfizer",
      buttonText: "Read More",
      buttonLink:
        "https://www.stevens.edu/news/q-and-a-with-stevens-alum-and-pfizer-director-rupinder-bhullar",
    },
    {
      quote:
        "It [Technology Management program] just fit the bill so perfectly for me, because it was not all about coding. It was diverse and had everything from accounting, finance, how to display data with Tableau, how to be a leader, strategic management, pushing your team to achieve better – all of these checked all the boxes for me.",
      author: "Anagha Yerande",
      title: "Vice President",
      company: "JP Morgan",
      imageSrc:
        "/assets/images/corporate-students/corporate-students-testimonial-anagha.webp",
      imageAlt: "Anagha Yerande",
      buttonText: "Read More",
      buttonLink:
        "https://www.stevens.edu/news/student-spotlight-anagha-yerande",
    },
  ];

  // Learning journey steps - Application & Benefits
  const applicationSteps = [
    {
      step: 1,
      actionNeeded: "Answer two quick questions",
      forYourPlan:
        "Tell us about your career interests and credential preferences. We'll recommend the perfect program for you.",
      linkText: "Get Started",
      linkTarget: "#programs-section",
    },
    {
      step: 2,
      actionNeeded: "Select your recommended program",
      forYourPlan:
        "Choose from our personalized recommendations based on your interests, whether you're looking for a master's degree or a stackable certificate.",
    },
    {
      step: 3,
      actionNeeded: "Calculate your actual cost",
      forYourPlan:
        "Use our interactive calculator to see your out-of-pocket cost after workforce partner discounts and employer reimbursement.",
      linkText: "Try Calculator",
      linkTarget: "#cost-calculator",
    },
    {
      step: 4,
      actionNeeded: "Start your application",
      forYourPlan:
        'Click the "Apply Now" button to begin your application. If you have any questions or need assistance, feel free to ',
      linkText: "schedule a call with an advisor",
      linkTarget: BOOKING_URLS.SCHEDULE_CALL,
      isExternal: true,
    },
  ];

  // Handle scroll to section
  const scrollToSection = (targetId) => {
    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleCTAClick = (ctaType) => {
    trackEvent("corporate_student_cta_clicked", {
      page: "corporate_students",
      cta_type: ctaType,
      company: companyName || "unknown",
    });

    if (ctaType === "request_info") {
      trackConversion(CONVERSION_LABELS.GET_PROGRAM_DETAILS);
    }
  };

  // Handle questionnaire selection
  const handleInterestSelect = (interest) => {
    setSelectedInterest(interest);
    setQuestionnaireStep(1);
    trackEvent("questionnaire_interest_selected", { interest });
  };

  const handleCredentialSelect = (credentialType) => {
    setSelectedCredentialType(credentialType);
    setQuestionnaireStep(2);
    trackEvent("questionnaire_credential_selected", { credentialType });
  };

  const handleProgramSelect = (program) => {
    setSelectedProgram(program);
    setShowCalculator(true);

    // Scroll to calculator section after React has rendered the new calculator
    // Use requestAnimationFrame to ensure DOM updates are complete
    requestAnimationFrame(() => {
      setTimeout(() => {
        const calculatorSection = document.getElementById("cost-calculator");
        if (calculatorSection) {
          calculatorSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 150);
    });

    trackEvent("program_selected_from_questionnaire", {
      program_code: program.code,
      interest: selectedInterest,
      credential_type: selectedCredentialType,
    });
  };

  const resetQuestionnaire = () => {
    setQuestionnaireStep(0);
    setSelectedInterest(null);
    setSelectedCredentialType(null);
    setRecommendedPrograms([]);
  };

  // Lock body scroll when modal is open
  useEffect(() => {
    if (showContactModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showContactModal]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && showContactModal) {
        setShowContactModal(false);
      }
    };

    if (showContactModal) {
      window.addEventListener("keydown", handleEsc);
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [showContactModal]);

  // Workforce Development Commitment Section (Stevens Brand)
  const WorkforceCommitmentSection = () => (
    <section className="py-stevens-section-sm lg:py-stevens-section bg-stevens-black text-white overflow-hidden relative">
      <div className="max-w-stevens-content-max mx-auto px-stevens-md lg:px-stevens-lg relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-white font-semibold text-sm uppercase tracking-wider mb-stevens-sm">
              Our Commitment to Workforce Development
            </p>
            <h2 className="font-stevens-display text-stevens-3xl md:text-stevens-4xl font-stevens-bold mb-stevens-lg leading-tight text-white">
              Advancing America's Workforce, One Professional at a Time
            </h2>
            <p className="text-lg text-white/90 mb-stevens-xl leading-relaxed">
              Stevens Institute of Technology partners with the nation's leading
              employers to close the skills gap and empower working
              professionals. Our workforce development programs deliver
              world-class graduate education that's accessible, affordable, and
              designed for immediate career impact.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-stevens-xl">
              <div className="bg-white/5 rounded-lg p-5 border border-white/30">
                <p className="text-3xl lg:text-4xl font-bold text-stevens-white mb-1">
                  50+
                </p>
                <p className="text-sm text-white/90">Corporate Partners</p>
              </div>
              <div className="bg-white/5 rounded-lg p-5 border border-white/30">
                <p className="text-3xl lg:text-4xl font-bold text-stevens-white mb-1">
                  Up to $20,500
                </p>
                <p className="text-sm text-white/90">
                  Tuition Reimbursement Aligned
                </p>
              </div>
              <div className="bg-white/5 rounded-lg p-5 border border-white/30">
                <p className="text-3xl lg:text-4xl font-bold text-stevens-white mb-1">
                  100%
                </p>
                <p className="text-sm text-white/90">Online & Flexible</p>
              </div>
              <div className="bg-white/5 rounded-lg p-5 border border-white/30">
                <p className="text-3xl lg:text-4xl font-bold text-stevens-white mb-1">
                  Top 20
                </p>
                <p className="text-sm text-white/90">Nationally Ranked</p>
              </div>
            </div>

            {/* Value Props */}
            <div className="space-y-4">
              {[
                { text: "Dedicated corporate care advisors for every student" },
                { text: "Accelerated application: no essays or GRE required" },
                {
                  text: "Discounts stack: Partner + Hoboken + Alumni = up to 50% off",
                },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 text-white">
                  <CheckCircle className="w-5 h-5 text-stevens-red flex-shrink-0" />
                  <span className="text-sm">{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="flex flex-col rounded-xl overflow-hidden shadow-2xl bg-white">
              {/* Image */}
              <div className="relative">
                <img
                  {...getContentImageProps(
                    "/assets/images/shared/accreditation.webp"
                  )}
                  alt="Stevens Institute of Technology - Top-ranked university for working professionals"
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Deadline Card */}
              <div className="bg-white text-stevens-dark-gray p-5 rounded-b-xl">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-stevens-red flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg text-stevens-red">
                      {KEY_DATES_SPRING2.TERM.name} Deadlines
                    </p>
                    <p className="text-sm text-stevens-dark-gray">
                      Priority:{" "}
                      {new Date(
                        KEY_DATES_SPRING2.PRIORITY_SUBMIT.date
                      ).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}{" "}
                      • Final:{" "}
                      {new Date(
                        KEY_DATES_SPRING2.FINAL_SUBMIT.date
                      ).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );

  // Questionnaire Component
  const ProgramQuestionnaire = () => (
    <div className="max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        {/* Step 0: Interest Selection */}
        {questionnaireStep === 0 && (
          <motion.div
            key="step-0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center mb-stevens-xl">
              <Badge className="mb-stevens-md bg-stevens-red text-white border-none">
                Step 1 of 2
              </Badge>
              <h2 className="font-stevens-display text-stevens-3xl md:text-stevens-4xl font-light uppercase tracking-wide text-stevens-black mb-stevens-md">
                Find Your Perfect Program
              </h2>
              <p className="text-stevens-lg text-stevens-dark-gray">
                Select your primary career focus to see personalized program
                recommendations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-stevens-lg">
              {/* Management Option */}
              <motion.button
                whileHover={{ scale: 1.01, y: -2 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => handleInterestSelect("management")}
                className="group relative bg-stevens-white rounded-xl p-6 lg:p-8 border-2 border-stevens-light-gray hover:border-stevens-red hover:shadow-lg transition-all duration-200 text-left"
              >
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-stevens-red transition-colors">
                    <BarChart3 className="w-7 h-7 text-stevens-red group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-stevens-display text-lg lg:text-xl font-bold text-stevens-dark-gray mb-2 group-hover:text-stevens-red transition-colors">
                      Management & Business
                    </h4>
                    <p className="text-stevens-dark-gray text-sm leading-relaxed mb-3">
                      Leadership, strategy, and business analytics
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs px-2 py-1 bg-stevens-light-gray text-stevens-dark-gray rounded">
                        MBA
                      </span>
                      <span className="text-xs px-2 py-1 bg-stevens-light-gray text-stevens-dark-gray rounded">
                        Engineering Management
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-stevens-light-gray group-hover:text-stevens-red group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                </div>
              </motion.button>

              {/* Engineering Option */}
              <motion.button
                whileHover={{ scale: 1.01, y: -2 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => handleInterestSelect("engineering")}
                className="group relative bg-stevens-white rounded-xl p-6 lg:p-8 border-2 border-stevens-light-gray hover:border-stevens-red hover:shadow-lg transition-all duration-200 text-left"
              >
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-stevens-red transition-colors">
                    <Wrench className="w-7 h-7 text-stevens-red group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-stevens-display text-lg lg:text-xl font-bold text-stevens-dark-gray mb-2 group-hover:text-stevens-red transition-colors">
                      Engineering & Technology
                    </h4>
                    <p className="text-stevens-dark-gray text-sm leading-relaxed mb-3">
                      Computer science, data science, and AI
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs px-2 py-1 bg-stevens-light-gray text-stevens-dark-gray rounded">
                        Computer Science
                      </span>
                      <span className="text-xs px-2 py-1 bg-stevens-light-gray text-stevens-dark-gray rounded">
                        Data Science
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-stevens-light-gray group-hover:text-stevens-red group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                </div>
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Step 1: Credential Type Selection */}
        {questionnaireStep === 1 && (
          <motion.div
            key="step-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center mb-stevens-xl">
              <button
                onClick={() => setQuestionnaireStep(0)}
                className="inline-flex items-center text-stevens-red hover:text-stevens-red mb-stevens-md transition-colors"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back
              </button>
              <Badge className="mb-stevens-md bg-stevens-red text-white border-none ml-4">
                Step 2 of 2
              </Badge>
              <h2 className="font-stevens-display text-stevens-3xl md:text-stevens-4xl font-light uppercase tracking-wide text-stevens-black mb-stevens-md">
                Find Your Perfect Program
              </h2>
              <p className="text-stevens-lg text-stevens-dark-gray">
                Choose between a full master's degree or a stackable
                certificate.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Master's Degree Option */}
              <motion.button
                whileHover={{ scale: 1.01, y: -2 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => handleCredentialSelect("masters")}
                className="group relative bg-stevens-white rounded-xl p-6 lg:p-8 border-2 border-stevens-light-gray hover:border-stevens-red hover:shadow-lg transition-all duration-200 text-left"
              >
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-stevens-red transition-colors">
                    <GraduationCap className="w-7 h-7 text-stevens-red group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-stevens-display text-lg lg:text-xl font-bold text-stevens-dark-gray mb-2 group-hover:text-stevens-red transition-colors">
                      Master's Degree
                    </h4>
                    <p className="text-stevens-dark-gray text-sm leading-relaxed mb-3">
                      Full graduate degree with comprehensive curriculum
                    </p>
                    <div className="space-y-1 text-xs text-stevens-light-gray0">
                      <p>30-48 credits • 18-24 months</p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-stevens-light-gray group-hover:text-stevens-red group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                </div>
              </motion.button>

              {/* Certificate Option */}
              <motion.button
                whileHover={{ scale: 1.01, y: -2 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => handleCredentialSelect("certificate")}
                className="group relative bg-stevens-white rounded-xl p-6 lg:p-8 border-2 border-stevens-light-gray hover:border-stevens-red hover:shadow-lg transition-all duration-200 text-left"
              >
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-stevens-red transition-colors">
                    <Award className="w-7 h-7 text-stevens-red group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-stevens-display text-lg lg:text-xl font-bold text-stevens-dark-gray group-hover:text-stevens-red transition-colors">
                        Stackable Certificate
                      </h4>
                      <span className="text-[10px] px-2 py-0.5 bg-stevens-light-gray text-stevens-dark-gray rounded font-medium">
                        $5,250
                      </span>
                    </div>
                    <p className="text-stevens-dark-gray text-sm leading-relaxed mb-3">
                      Immediate credential that stacks toward a master's
                    </p>
                    <div className="space-y-1 text-xs text-stevens-light-gray0">
                      <p>9 credits • 16-24 weeks</p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-stevens-light-gray group-hover:text-stevens-red group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                </div>
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Step 2: Program Recommendations */}
        {questionnaireStep === 2 && (
          <motion.div
            key="step-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center mb-stevens-xl">
              <button
                onClick={() => setQuestionnaireStep(1)}
                className="inline-flex items-center text-stevens-red hover:text-stevens-red mb-stevens-md transition-colors"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back
              </button>
              <Badge className="mb-stevens-md bg-stevens-red text-white border-none ml-4">
                <CheckCircle className="w-3 h-3 mr-1" />
                Personalized Recommendations
              </Badge>
              <h2 className="font-stevens-display text-stevens-3xl md:text-stevens-4xl font-light uppercase tracking-wide text-stevens-black mb-stevens-md">
                Find Your Perfect Program
              </h2>
              <p className="text-stevens-lg text-stevens-dark-gray">
                Based on your interest in{" "}
                <span className="font-semibold text-stevens-red">
                  {selectedInterest === "management"
                    ? "Management & Business"
                    : "Engineering & Technology"}
                </span>{" "}
                and preference for a{" "}
                <span className="font-semibold text-stevens-red">
                  {selectedCredentialType === "masters"
                    ? "Master's Degree"
                    : "Stackable Certificate"}
                </span>
              </p>
            </div>

            <div
              className={`grid gap-stevens-lg ${
                recommendedPrograms.length === 1
                  ? "max-w-xl mx-auto"
                  : recommendedPrograms.length === 2
                  ? "grid-cols-1 md:grid-cols-2"
                  : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              }`}
            >
              {recommendedPrograms.map((program, index) => (
                <motion.div
                  key={program.code}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative bg-stevens-white rounded-stevens-xl shadow-stevens-lg hover:shadow-stevens-2xl border-2 border-stevens-light-gray hover:border-stevens-red overflow-hidden transition-all duration-300"
                >
                  {/* Image Section */}
                  <div className="relative h-40 overflow-hidden bg-stevens-light-gray">
                    {program.image ? (
                      <img
                        src={program.image}
                        alt={program.name}
                        className="w-full h-full object-cover transition-transform duration-stevens-slow group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-stevens-light-gray" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                    <div className="absolute top-stevens-md left-stevens-md">
                      <div className="bg-stevens-red backdrop-blur-sm text-stevens-white px-stevens-md py-stevens-xs rounded-stevens-md font-stevens-semibold text-stevens-sm">
                        {program.degree}
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-stevens-lg">
                    <h4 className="font-stevens-display text-stevens-lg font-stevens-bold text-stevens-dark-gray mb-stevens-sm group-hover:text-stevens-red transition-colors">
                      {program.shortName || program.name}
                    </h4>

                    {program.stats && (
                      <div className="flex flex-wrap gap-stevens-sm text-xs text-stevens-dark-gray mb-stevens-md">
                        {program.stats.duration && (
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {program.stats.duration}
                          </span>
                        )}
                        {program.stats.credits && (
                          <span className="flex items-center">
                            <BookOpen className="w-3 h-3 mr-1" />
                            {program.stats.credits} credits
                          </span>
                        )}
                      </div>
                    )}

                    <Button
                      variant="default"
                      className="w-full"
                      onClick={() => handleProgramSelect(program)}
                    >
                      <Calculator className="w-4 h-4 mr-2" />
                      Calculate Your Cost
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-stevens-xl">
              <button
                onClick={resetQuestionnaire}
                className="text-stevens-red hover:text-stevens-red underline text-sm transition-colors"
              >
                Start over with different preferences
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <PageContextProvider pageType="landing" pageName="Corporate Students">
      <div className="min-h-screen bg-stevens-white">
        {/* Hero Section */}
        <PageHero
          titleLines={["Invest in Your Future", "with Stevens Online"]}
          subtitle={
            companyName
              ? `As a ${companyName} employee, you have exclusive access to Stevens' workforce development programs. Save up to 50% with partner discounts and employer tuition benefits. ${KEY_DATES_SPRING2.TERM.name} enrollment is now open.`
              : `Stevens partners with America's leading employers to make graduate education accessible and affordable. ${KEY_DATES_SPRING2.TERM.name} enrollment is now open.`
          }
          bgImage="/assets/images/corporate-students/corporate-students-hero-background.webp"
          bgImagePosition="center 30%"
          primaryCta={{
            label: "Calculate My Savings",
            onClick: () => {
              handleCTAClick("calculate_savings");
              scrollToSection("#programs-section");
            },
          }}
          secondaryCta={{
            label: "Talk to an Advisor",
            onClick: () => {
              handleCTAClick("contact_us");
              setShowContactOptionsModal(true);
            },
          }}
          secondaryButtonClassName="text-white border-white hover:bg-white hover:text-stevens-dark-gray"
          badges={
            companyName
              ? [
                  {
                    text: `Exclusive benefits for ${companyName} employees`,
                    variant: "secondary",
                  },
                ]
              : [
                  {
                    text: `${KEY_DATES_SPRING2.TERM.name} Enrollment Open`,
                    variant: "secondary",
                  },
                ]
          }
        />

        {/* Partner Benefits Overview */}
        <section className="py-stevens-section-sm lg:py-stevens-section bg-stevens-light-gray">
          <div className="max-w-stevens-content-max mx-auto px-stevens-md lg:px-stevens-lg">
            <div className="text-center mb-stevens-2xl">
              <h2 className="font-stevens-display text-stevens-3xl md:text-stevens-4xl font-light uppercase tracking-wide text-stevens-black mb-stevens-md">
                Exclusive Benefits for Partner Employees
              </h2>
              <p className="text-stevens-lg text-stevens-dark-gray max-w-5xl mx-auto">
                Through your employer's partnership with Stevens Online, you can
                access a fast, flexible, and career-aligned path to earn a
                graduate certificate, master's degree, or professional
                credential.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-stevens-md lg:gap-stevens-lg">
              {partnerBenefits.map((benefit) => {
                const Icon = benefit.icon;
                return (
                  <div
                    key={benefit.title}
                    className="text-center p-stevens-md rounded-stevens-lg transition-all duration-300 hover:bg-stevens-white hover:shadow-stevens-md group border border-transparent hover:border-stevens-light-gray flex flex-col"
                  >
                    <div className="mb-stevens-md flex justify-center">
                      <div className="w-16 h-16 bg-stevens-red rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-red-700 group-hover:scale-105">
                        <Icon className="w-8 h-8 text-stevens-white" />
                      </div>
                    </div>

                    <h3 className="font-stevens-display text-stevens-base lg:text-stevens-lg font-light uppercase tracking-wide text-stevens-dark-gray group-hover:text-stevens-red transition-colors flex items-center justify-center text-center">
                      {benefit.title}
                    </h3>
                  </div>
                );
              })}
            </div>

            {/* Mid-section CTA - Enhanced with Date/Urgency Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mt-stevens-xl bg-stevens-light-gray border border-stevens-light-gray p-8 rounded-2xl"
            >
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                {/* Left: Icons and Messages */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-1">
                  {/* Icons */}
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-stevens-red rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-stevens-dark-gray text-base sm:text-lg mb-1">
                      {KEY_DATES_SPRING2.TERM.name} Enrollment Now Open, Use
                      your{" "}
                      <span className="text-stevens-red font-bold">
                        {KEY_DATES_SPRING2.TERM.year} tuition benefits
                      </span>{" "}
                      before they expire
                    </p>
                    <p className="text-sm text-stevens-dark-gray">
                      Answer 2 questions and calculate your cost
                    </p>
                  </div>
                </div>

                {/* Right: CTA Button */}
                <Button
                  size="lg"
                  className="bg-stevens-red hover:bg-red-700 text-white font-semibold whitespace-nowrap"
                  onClick={() => scrollToSection("#programs-section")}
                >
                  Get Started
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Workforce Development Commitment Section */}
        <WorkforceCommitmentSection />

        {/* Program Selection Questionnaire */}
        <section
          id="programs-section"
          className="py-stevens-section-sm lg:py-stevens-section bg-stevens-white"
        >
          <div className="max-w-stevens-content-max mx-auto px-stevens-md lg:px-stevens-lg">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-stevens-xl"
            ></motion.div>

            <ProgramQuestionnaire />
          </div>
        </section>

        {/* Interactive Cost Calculator */}
        <section
          id="cost-calculator"
          className="py-stevens-section-sm lg:py-stevens-section bg-stevens-white"
        >
          <div className="max-w-stevens-content-max mx-auto px-stevens-md lg:px-stevens-lg">
            <div className="text-center mb-stevens-2xl">
              <h2 className="font-stevens-display text-stevens-3xl md:text-stevens-4xl font-light uppercase tracking-wide text-stevens-black mb-stevens-md">
                Your Education, Made More Affordable
              </h2>
              <p className="text-stevens-lg text-stevens-dark-gray max-w-5xl mx-auto">
                Calculate your actual cost with workforce partner discounts and
                employer benefits.
              </p>
            </div>

            {showCalculator && selectedProgram ? (
              <div className="space-y-stevens-md">
                {/* Selected Program Card (page-specific) */}
                <Card className="border border-stevens-light-gray shadow-stevens-md overflow-hidden">
                  <CardContent className="p-stevens-md">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <Badge className="mb-1.5 bg-stevens-red text-white text-[11px] font-semibold tracking-wide">
                          {selectedProgram.degree}
                        </Badge>
                        <p className="font-semibold text-stevens-dark-gray leading-snug">
                          {selectedProgram.name}
                        </p>
                        <p className="text-xs text-stevens-gray mt-1.5 flex items-center gap-1.5">
                          <span>{selectedProgram.stats?.credits} credits</span>
                          <span className="w-1 h-1 rounded-full bg-stevens-gray/40" />
                          <span>
                            {calculatedCost?.durationYears === 1
                              ? "1 year"
                              : `${calculatedCost?.durationYears} years`}
                          </span>
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-stevens-red hover:text-stevens-red hover:bg-stevens-red/10 text-xs font-semibold shrink-0"
                        onClick={() => {
                          setSelectedProgram(null);
                          setCalculatedCost(null);
                          setShowCalculator(false);
                          // Ensure questionnaire stays at step 2 to show recommendations
                          if (
                            questionnaireStep !== 2 &&
                            selectedInterest &&
                            selectedCredentialType
                          ) {
                            setQuestionnaireStep(2);
                          }
                          // Scroll back to questionnaire
                          setTimeout(() => {
                            document
                              .getElementById("programs-section")
                              ?.scrollIntoView({
                                behavior: "smooth",
                                block: "start",
                              });
                          }, 100);
                        }}
                      >
                        Change
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Year-End Benefits Notice */}
                <Alert className="bg-stevens-red/5 border border-stevens-red/15 rounded-lg">
                  <Clock className="w-5 h-5 text-stevens-red" />
                  <AlertTitle className="text-stevens-dark-gray font-semibold">
                    2026 Tuition Benefits
                  </AlertTitle>
                  <AlertDescription className="text-stevens-gray text-sm">
                    Most employer tuition benefits reset on January 1st. Apply
                    now to maximize your 2026 benefits for upcoming terms.
                  </AlertDescription>
                </Alert>

                {/* Shared Calculator Body */}
                <Card className="border border-stevens-light-gray shadow-stevens-md overflow-hidden">
                  <TuitionCalculatorBody
                    key={selectedProgram.code}
                    programCode={selectedProgram.code}
                    onCostChange={setCalculatedCost}
                  />
                </Card>

                {/* CTA Buttons */}
                {calculatedCost && (
                  <div className="space-y-stevens-md">
                    {/* Primary CTA - Apply */}
                    {(() => {
                      const appConfig = selectedProgram.applicationConfig;
                      const utmParams = `utm_source=microsite&utm_medium=corporate_landing&utm_campaign=corporate-calculator&utm_content=${selectedProgram.code}`;

                      if (
                        appConfig?.standardLink ||
                        (appConfig?.type === "direct" &&
                          appConfig?.link?.startsWith("http"))
                      ) {
                        const baseUrl =
                          appConfig.standardLink || appConfig.link;
                        const separator = baseUrl.includes("?") ? "&" : "?";
                        const fullUrl = `${baseUrl}${separator}${utmParams}`;

                        return (
                          <a
                            href={fullUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => {
                              trackEvent("cta_click", {
                                cta_type: "apply_now",
                                cta_location: "calculator_results",
                                program_code: selectedProgram.code,
                                final_price: calculatedCost.finalPrice,
                                application_type: "external",
                              });
                              trackConversion(CONVERSION_LABELS.APPLY_NOW);
                            }}
                          >
                            <Button
                              size="lg"
                              className="w-full text-stevens-white bg-stevens-red group py-4"
                            >
                              <Send className="w-5 h-5 mr-2" />
                              Apply Now
                              <ExternalLink className="w-4 h-4 ml-2" />
                            </Button>
                          </a>
                        );
                      }

                      const internalPath =
                        appConfig?.link || "/accelerated-application/";
                      return (
                        <Link
                          to={`${internalPath}?program=${selectedProgram.code}${
                            corporateCode ? `&code=${corporateCode}` : ""
                          }&${utmParams}`}
                          onClick={() => {
                            trackEvent("cta_click", {
                              cta_type: "apply_now",
                              cta_location: "calculator_results",
                              program_code: selectedProgram.code,
                              final_price: calculatedCost.finalPrice,
                              application_type: "accelerated",
                            });
                            trackConversion(CONVERSION_LABELS.APPLY_NOW);
                          }}
                        >
                          <Button
                            size="lg"
                            className="w-full text-stevens-white bg-stevens-red group py-4"
                          >
                            <Send className="w-5 h-5 mr-2" />
                            Apply Now
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      );
                    })()}

                    {/* Secondary CTA - RFI */}
                    <Button
                      size="lg"
                      variant="outline-dark"
                      className="w-full py-4"
                      onClick={() => {
                        handleCTAClick("request_info_calculator");
                        setShowContactModal(true);
                      }}
                    >
                      <Mail className="w-5 h-5 mr-2" />
                      Request More Information
                    </Button>

                    <p className="text-center text-xs text-stevens-dark-gray pt-2">
                      Questions?{" "}
                      <a
                        href={BOOKING_URLS.SCHEDULE_CALL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-stevens-red hover:underline font-semibold"
                      >
                        Talk to an advisor
                      </a>
                    </p>
                  </div>
                )}
              </div>
            ) : (
              /* Default view - select a program message */
              <Card className="max-w-2xl mx-auto border-2 ">
                <CardContent className="p-stevens-2xl pt-stevens-2xl text-center">
                  <Calculator className="w-16 h-16 mx-auto mb-stevens-xl text-stevens-gray" />
                  <h3 className="font-stevens-display text-stevens-xl lg:text-stevens-2xl font-stevens-bold text-stevens-dark-gray mb-stevens-lg">
                    Ready to see your actual cost?
                  </h3>
                  <p className="text-stevens-base lg:text-stevens-lg text-stevens-dark-gray mb-stevens-xl max-w-xl mx-auto leading-relaxed">
                    Complete the questionnaire above to get personalized program
                    recommendations, then calculate your cost with discounts and
                    employer benefits.
                  </p>
                  <Button
                    className="text-stevens-white bg-stevens-red hover:bg-red-700"
                    size="lg"
                    onClick={() => {
                      document
                        .getElementById("programs-section")
                        ?.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                    }}
                  >
                    Find Your Program
                    <ArrowRight className="ml-2 w-5 h-5 rotate-[-90deg]" />
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </section>

        {/* Your Learning Journey */}
        <section className="py-stevens-section-sm lg:py-stevens-section bg-stevens-white">
          <div className="max-w-stevens-content-max mx-auto px-stevens-md lg:px-stevens-lg">
            <div className="text-center mb-stevens-2xl">
              <h2 className="font-stevens-display text-stevens-3xl md:text-stevens-4xl font-light uppercase tracking-wide text-stevens-black mb-stevens-md">
                How to Apply for Admission & Receive Your Benefits
              </h2>
              <p className="text-stevens-lg text-stevens-dark-gray max-w-3xl mx-auto">
                Follow these steps to start your journey with Stevens and unlock
                your corporate benefits.
              </p>
            </div>

            <div className="bg-stevens-white rounded-stevens-lg overflow-hidden shadow-stevens-md hover:shadow-stevens-lg transition-shadow duration-300">
              {/* Desktop Table View */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-stevens-red text-stevens-white">
                      <th className="px-stevens-lg py-stevens-md text-left font-stevens-bold text-stevens-base uppercase tracking-wide">
                        Action Needed
                      </th>
                      <th className="px-stevens-lg py-stevens-md text-left font-stevens-bold text-stevens-base uppercase tracking-wide">
                        For Your Corporate Plan
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {applicationSteps.map((step, index) => (
                      <tr
                        key={step.step}
                        className={`border-b border-gray-200 transition-all duration-300 cursor-default group ${
                          index % 2 === 0
                            ? "bg-white hover:bg-gray-50"
                            : "bg-gray-50 hover:bg-white"
                        }`}
                      >
                        <td className="px-stevens-lg py-stevens-lg align-top w-2/5">
                          <p className="font-stevens-semibold text-stevens-dark-gray group-hover:text-stevens-red transition-colors duration-300">
                            <span className="text-stevens-red font-stevens-bold">
                              Step {step.step}
                            </span>{" "}
                            - {step.actionNeeded}
                          </p>
                        </td>
                        <td className="px-stevens-lg py-stevens-lg align-top w-3/5">
                          <p className="text-stevens-dark-gray leading-relaxed group-hover:text-stevens-dark-gray transition-colors duration-300">
                            {step.forYourPlan}
                            {step.linkText && step.linkTarget && (
                              <>
                                {" "}
                                {step.isExternal ? (
                                  <a
                                    href={step.linkTarget}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-stevens-red font-stevens-semibold hover:text-stevens-red underline transition-colors"
                                  >
                                    {step.linkText}
                                  </a>
                                ) : (
                                  <button
                                    onClick={() =>
                                      scrollToSection(step.linkTarget)
                                    }
                                    className="text-stevens-red font-stevens-semibold hover:text-stevens-red underline transition-colors"
                                  >
                                    {step.linkText}
                                  </button>
                                )}
                              </>
                            )}
                          </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="lg:hidden divide-y divide-gray-200">
                {applicationSteps.map((step) => (
                  <div
                    key={step.step}
                    className="p-stevens-lg transition-all duration-300 hover:bg-gray-50 group"
                  >
                    <div className="mb-stevens-md">
                      <p className="font-stevens-bold text-stevens-red text-stevens-sm uppercase mb-stevens-xs">
                        Step {step.step}
                      </p>
                      <p className="font-stevens-semibold text-stevens-dark-gray text-stevens-base group-hover:text-stevens-red transition-colors duration-300">
                        {step.actionNeeded}
                      </p>
                    </div>
                    <p className="text-stevens-dark-gray text-stevens-sm leading-relaxed group-hover:text-stevens-dark-gray transition-colors duration-300">
                      {step.forYourPlan}
                      {step.linkText && step.linkTarget && (
                        <>
                          {" "}
                          {step.isExternal ? (
                            <a
                              href={step.linkTarget}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-stevens-red font-stevens-semibold hover:text-stevens-red underline transition-colors"
                            >
                              {step.linkText}
                            </a>
                          ) : (
                            <button
                              onClick={() => scrollToSection(step.linkTarget)}
                              className="text-stevens-red font-stevens-semibold hover:text-stevens-red underline transition-colors"
                            >
                              {step.linkText}
                            </button>
                          )}
                        </>
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Success Stories / Testimonials Carousel */}
        <TestimonialCarousel testimonials={testimonials} imageRatio={50} />

        {/* FAQ Section */}
        <EmployerFaqSection accordionPrefix="corporate-students" />

        {/* Final CTA Section */}
        <section
          id="contact"
          className="py-stevens-section-sm lg:py-stevens-section bg-stevens-white"
        >
          <div className="max-w-stevens-content-max mx-auto px-stevens-md lg:px-stevens-lg">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              {/* Divider */}
              <div className="border-t border-gray-400 mb-[60px]"></div>

              <h2 className="font-stevens-display text-stevens-3xl md:text-stevens-4xl font-stevens-bold mb-stevens-md text-stevens-black">
                Ready to Take the Next Step?
              </h2>
              <p className="text-stevens-lg mb-4 max-w-2xl mx-auto text-stevens-dark-gray">
                Join thousands of professionals who advanced their careers
                through Stevens workforce development programs. Your employer
                benefits are ready to be used.
              </p>

              <div className="flex flex-col sm:flex-row gap-stevens-md justify-center">
                <Button
                  size="lg"
                  variant="outline-dark"
                  className="group w-full sm:w-auto min-w-[280px] py-4 text-base"
                  onClick={() => {
                    handleCTAClick("request_info_footer");
                    setShowContactModal(true);
                  }}
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Request Information
                </Button>
                <Button
                  size="lg"
                  variant="outline-dark"
                  className="w-full sm:w-auto min-w-[280px] py-4"
                  onClick={() => {
                    handleCTAClick("schedule_consultation_footer");
                    setShowContactOptionsModal(true);
                  }}
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Talk to an Advisor
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="mt-stevens-xl pt-stevens-lg border-t border-stevens-light-gray">
                <p className="text-sm text-stevens-dark-gray/70 mb-4">
                  Trusted by employees at leading organizations
                </p>
                <div className="flex flex-wrap justify-center items-center gap-6 text-stevens-dark-gray">
                  <span className="font-medium">Pfizer</span>
                  <span className="text-stevens-light-gray0">•</span>
                  <span className="font-medium">Verizon</span>
                  <span className="text-stevens-light-gray0">•</span>
                  <span className="font-medium">JPMorgan Chase</span>
                  <span className="text-stevens-light-gray0">•</span>
                  <span className="font-medium">Boeing</span>
                  <span className="text-stevens-light-gray0">•</span>
                  <span className="font-medium">Lockheed Martin</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Request Information Modal */}
        <RequestInfoModal
          isOpen={showContactModal}
          onClose={() => setShowContactModal(false)}
          sourcePage="corporate_students_page"
          programOfInterest={
            selectedProgram?.code || searchParams.get("program") || "CORP"
          }
          additionalUrlParams={{
            // UTM tracking for attribution
            utm_source: "microsite",
            utm_medium: "corporate_landing",
            utm_campaign: "corporate_students_rfi",
            utm_content: selectedProgram?.code || "general",
            // Corporate context
            company: companyName || "unknown",
            corporate_code: corporateCode || "",
            selected_program: selectedProgram?.code || "",
            // Calculator context for lead scoring (derived from calculatedCost)
            is_workforce_partner: calculatedCost?.steps?.some(
              (s) => s.icon === "building"
            )
              ? "yes"
              : "no",
            is_hoboken_resident: calculatedCost?.steps?.some(
              (s) => s.icon === "home"
            )
              ? "yes"
              : "no",
            is_alumni: calculatedCost?.steps?.some(
              (s) => s.icon === "graduation-cap"
            )
              ? "yes"
              : "no",
            has_reimbursement: calculatedCost?.steps?.some(
              (s) => s.type === "reimbursement"
            )
              ? "yes"
              : "no",
            // Form type
            formType: "rfi",
            source: "corporate_students_page",
          }}
        />

        {/* Contact Options Modal */}
        <ContactOptionsModal
          open={showContactOptionsModal}
          onOpenChange={setShowContactOptionsModal}
          sourcePage="corporate_students"
        />
      </div>
    </PageContextProvider>
  );
};

export default CorporateStudents;
