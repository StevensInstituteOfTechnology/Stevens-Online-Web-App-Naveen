import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import LeadCaptureForm from "@/components/forms/LeadCaptureForm";
import {
  ArrowRight,
  CheckCircle,
  Clock,
  DollarSign,
  GraduationCap,
  Users,
  Award,
  BookOpen,
  Star,
  Zap,
  TrendingUp,
  Briefcase,
  Target,
  Info,
  Sparkles,
  Home,
  Building,
  Calculator,
  X,
  Phone,
  Mail,
  Calendar,
  Copy,
  Check,
  ExternalLink,
  ChevronLeft,
  Wrench,
  BarChart3,
  Send,
} from "lucide-react";
import { PageHero, TestimonialCarousel } from "@/components/shared";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePageTracking } from "@/hooks/analytics/usePageTracking";
import { PageContextProvider } from "@/contexts/analytics/PageContext";
import {
  setPageTitle,
  setMetaDescription,
  setOpenGraphTags,
  buildCanonicalUrl,
  createPageUrl,
} from "@/utils";
import { trackConversion, CONVERSION_LABELS } from "@/utils/gtmTracking";
import { trackEvent } from "@/utils/analytics/vercelTracking";
import { PROGRAMS_DATA } from "@/data/programsData";
import {
  calculateProgramCost,
  getDiscountConfig,
  getDiscountInfo,
  getProgramRecommendations,
} from "@/utils/discountCalculator";
import { BOOKING_URLS, CONTACT_INFO } from "@/config/constants";
import EmployerFaqSection from "@/components/corporate/EmployerFaqSection";

const CorporateStudents = () => {
  const [searchParams] = useSearchParams();
  const [showContactModal, setShowContactModal] = useState(false);
  const [showContactOptionsModal, setShowContactOptionsModal] = useState(false);
  const [copiedItem, setCopiedItem] = useState(null);
  const [companyName, setCompanyName] = useState(null);
  const [corporateCode, setCorporateCode] = useState(null);

  // Questionnaire States
  const [questionnaireStep, setQuestionnaireStep] = useState(0); // 0: interest, 1: credential, 2: program selection
  const [selectedInterest, setSelectedInterest] = useState(null); // 'management' or 'engineering'
  const [selectedCredentialType, setSelectedCredentialType] = useState(null); // 'masters' or 'certificate'
  const [recommendedPrograms, setRecommendedPrograms] = useState([]);

  // Cost Calculator States
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [isWorkforcePartner, setIsWorkforcePartner] = useState(false);
  const [isHobokenResident, setIsHobokenResident] = useState(false);
  const [isStevensAlumni, setIsStevensAlumni] = useState(false);
  const [annualReimbursement, setAnnualReimbursement] = useState("");
  const [calculatedCost, setCalculatedCost] = useState(null);
  const [showCalculator, setShowCalculator] = useState(false);

  // Get discount info for display
  const discountInfo = getDiscountInfo();

  usePageTracking({
    pageType: "landing",
    additionalData: {
      page_name: "Corporate Students",
      has_form: true,
      landing_page_type: "b2c",
      company: companyName || "unknown",
    },
  });

  // Seasonal banner state
  const [showSeasonalBanner, setShowSeasonalBanner] = useState(true);

  // Set SEO meta tags - optimized for search and AI engines
  useEffect(() => {
    const canonical = buildCanonicalUrl("/corporate-students/");
    setPageTitle(
      "Corporate Tuition Benefits 2025 | Save Up to 50% | Stevens Online Masters"
    );
    setMetaDescription(
      "Use your 2025 employer tuition benefits. Stevens workforce partners save up to 50% on AACSB-accredited online MBA, M.S. Computer Science & M.Eng. degrees. $5,250 certificates align with IRS Section 127 limits. No GRE required."
    );
    setOpenGraphTags({
      title:
        "Corporate Tuition Benefits | Save Up to 50% on Your Masters Degree | Stevens Online",
      description:
        "Stevens workforce development programs help employees maximize tuition benefits. 20% partner discount + 15% stackable discounts. Spring 2026 enrollment open.",
      image: buildCanonicalUrl(
        "/assets/images/corporate-students/corporate-students-1.webp"
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

  // Calculate cost whenever inputs change
  useEffect(() => {
    if (selectedProgram) {
      const options = {
        isWorkforcePartner,
        isHobokenResident,
        isStevensAlumni,
        annualReimbursement: annualReimbursement || undefined,
      };

      const result = calculateProgramCost(selectedProgram.code, options);
      setCalculatedCost(result);

      trackEvent("cost_calculator_used", {
        program: selectedProgram.code,
        has_workforce_partner: isWorkforcePartner,
        has_hoboken: isHobokenResident,
        has_alumni: isStevensAlumni,
        has_reimbursement: !!annualReimbursement,
      });
    }
  }, [
    selectedProgram,
    isWorkforcePartner,
    isHobokenResident,
    isStevensAlumni,
    annualReimbursement,
  ]);

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
      title: "Dedicated Corporate Care Team",
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
      author: "Gullnaz Saeedi '25",
      imageSrc: "/assets/images/corporate-students/corporate-students-3.webp",
      imageAlt: "Gullnaz Saeedi",
      imageObjectPosition: "center 20%", // Center horizontally, 20% from top
    },
    {
      quote:
        "I feel like my education is helping me be a more well-rounded design participant, especially at a place that is a financial institution. Being able to empathize more with my business stakeholders and my management has been really helpful.",
      author: "Sara Swanson '22",

      imageSrc: "/assets/images/corporate-students/corporate-students-4.webp",
      imageAlt: "Sara Swanson",
      buttonText: "Read More",
      buttonLink: "https://www.stevens.edu/news/becoming-a-design-leader",
      imageObjectPosition: "center 10%", // Center horizontally, 10% from top
    },
    {
      quote:
        "I can confidently say that enrolling in the Stevens MBA program was one of my best decisions. Stevens offers a comprehensive curriculum that helps students develop invaluable skills to navigate the complex business world and improve their professional capabilities.",
      author: "Rupinder Bhullar '21",
      title: "Director of Enterprise Automation Services",
      company: "Pfizer",
      imageSrc: "/assets/images/corporate-students/corporate-students-2.webp",
      imageAlt:
        "Rupinder Bhullar, Director of Enterprise Automation Services at Pfizer",
      buttonText: "Read More",
      buttonLink:
        "https://www.stevens.edu/news/q-and-a-with-stevens-alum-and-pfizer-director-rupinder-bhullar",
    },
    {
      quote:
        "It [Technology Management program] just fit the bill so perfectly for me, because it was not all about coding. It was diverse and had everything from accounting, finance, how to display data with Tableau, how to be a leader, strategic management, pushing your team to achieve better – all of these checked all the boxes for me.",
      author: "Anagha Yerande '21",
      title: "Vice President",
      company: "JP Morgan",
      imageSrc: "/assets/images/corporate-students/corporate-students-5.webp",
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
    // Reset discount options
    setIsWorkforcePartner(false);
    setIsHobokenResident(false);
    setIsStevensAlumni(false);
    setAnnualReimbursement("");

    setTimeout(() => {
      document.getElementById("cost-calculator")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);

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

  // Seasonal Banner Component - Year-End Campaign (Stevens Brand Colors)
  const SeasonalBanner = () => {
    if (!showSeasonalBanner) return null;

    return (
      <div className="bg-stevens-dark-gray text-white py-3 px-4 relative border-b border-stevens-light-gray">
        <div className="max-w-stevens-content-max mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-stevens-red" />
            <span className="text-sm sm:text-base font-medium">
              Use your{" "}
              <span className="font-bold text-stevens-red">
                2025 tuition benefits
              </span>{" "}
              before they expire
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-slate-500">|</span>
            <span className="text-sm font-semibold text-stevens-red">
              Spring 2026 Enrollment Open
            </span>
          </div>
          <Button
            size="sm"
            variant="default"
            onClick={() => scrollToSection("#programs-section")}
          >
            Get Started
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
        <button
          onClick={() => setShowSeasonalBanner(false)}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-1"
          aria-label="Dismiss banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  };

  // Workforce Development Commitment Section (Stevens Brand)
  const WorkforceCommitmentSection = () => (
    <section className="py-stevens-section-sm lg:py-stevens-section bg-stevens-dark-gray text-white overflow-hidden relative">
      <div className="max-w-stevens-content-max mx-auto px-stevens-md lg:px-stevens-lg relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-stevens-red font-semibold text-sm uppercase tracking-wider mb-stevens-sm">
              Our Commitment to Workforce Development
            </p>
            <h2 className="font-stevens-display text-stevens-3xl md:text-stevens-4xl font-stevens-bold mb-stevens-lg leading-tight">
              Advancing America's Workforce, One Professional at a Time
            </h2>
            <p className="text-lg text-white/80 mb-stevens-xl leading-relaxed">
              Stevens Institute of Technology partners with the nation's leading
              employers to close the skills gap and empower working
              professionals. Our workforce development programs deliver
              world-class graduate education that's accessible, affordable, and
              designed for immediate career impact.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-stevens-xl">
              <div className="bg-white/5 rounded-lg p-5 border border-white/10">
                <p className="text-3xl lg:text-4xl font-light text-stevens-black mb-1">
                  50+
                </p>
                <p className="text-sm text-white/70">Corporate Partners</p>
              </div>
              <div className="bg-white/5 rounded-lg p-5 border border-white/10">
                <p className="text-3xl lg:text-4xl font-light text-stevens-black mb-1">
                  $5,250
                </p>
                <p className="text-sm text-white/70">
                  Tuition Reimbursement Aligned
                </p>
              </div>
              <div className="bg-white/5 rounded-lg p-5 border border-white/10">
                <p className="text-3xl lg:text-4xl font-light text-stevens-black mb-1">
                  100%
                </p>
                <p className="text-sm text-white/70">Online & Flexible</p>
              </div>
              <div className="bg-white/5 rounded-lg p-5 border border-white/10">
                <p className="text-3xl lg:text-4xl font-light text-stevens-black mb-1">
                  Top 20
                </p>
                <p className="text-sm text-white/70">Nationally Ranked</p>
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
                <div
                  key={index}
                  className="flex items-center gap-3 text-white/90"
                >
                  <CheckCircle className="w-5 h-5 text-stevens-black flex-shrink-0" />
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
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <img
                src="/assets/images/shared/accreditation.webp"
                alt="Stevens Institute of Technology - Top-ranked university for working professionals"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stevens-dark-gray/90 via-transparent to-transparent" />

              {/* Deadline Card */}
              <div className="absolute bottom-6 left-6 right-6 bg-white text-stevens-dark-gray p-5 rounded-lg shadow-xl">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-stevens-black flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-light uppercase tracking-wide text-lg text-stevens-black">
                      Spring 2026 Deadlines
                    </p>
                    <p className="text-sm text-stevens-dark-gray">
                      Priority: Dec 15 • Final: Jan 10
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
              <Badge className="mb-stevens-md bg-stevens-light-gray text-stevens-black border-none">
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
                  <div className="w-14 h-14 bg-stevens-light-gray rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-stevens-black transition-colors">
                    <BarChart3 className="w-7 h-7 text-stevens-black group-hover:text-white transition-colors" />
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
                  <div className="w-14 h-14 bg-stevens-light-gray rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-stevens-black transition-colors">
                    <Wrench className="w-7 h-7 text-stevens-black group-hover:text-white transition-colors" />
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
              <Badge className="mb-stevens-md bg-stevens-light-gray text-stevens-black border-none ml-4">
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
                  <div className="w-14 h-14 bg-stevens-light-gray rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-stevens-black transition-colors">
                    <GraduationCap className="w-7 h-7 text-stevens-black group-hover:text-white transition-colors" />
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
                  <div className="w-14 h-14 bg-stevens-light-gray rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-stevens-black transition-colors">
                    <Award className="w-7 h-7 text-stevens-black group-hover:text-white transition-colors" />
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
              <Badge className="mb-stevens-md bg-stevens-light-gray text-stevens-black border-none ml-4">
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
                      <div className="bg-stevens-dark-gray backdrop-blur-sm text-stevens-white px-stevens-md py-stevens-xs rounded-stevens-md font-stevens-semibold text-stevens-sm">
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
        {/* Seasonal Banner - Year-End Benefits Campaign */}
        <SeasonalBanner />

        {/* Hero Section */}
        <PageHero
          titleLines={["Invest in Your Future", "with Stevens Online"]}
          subtitle={
            companyName
              ? `As a ${companyName} employee, you have exclusive access to Stevens' workforce development programs. Save up to 50% with partner discounts and employer tuition benefits. Spring 2026 enrollment is now open.`
              : "Stevens partners with America's leading employers to make graduate education accessible and affordable. Maximize your 2025 tuition benefits. Spring 2026 enrollment is now open."
          }
          bgImage="/assets/images/corporate-students/JV4_7586_4258.webp"
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
          badges={
            companyName
              ? [
                  {
                    text: `Exclusive benefits for ${companyName} employees`,
                    variant: "secondary",
                  },
                ]
              : [{ text: "Spring 2026 Enrollment Open", variant: "secondary" }]
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
                      <div className="w-16 h-16 bg-stevens-black rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-stevens-dark-gray group-hover:scale-105">
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

            {/* Mid-section CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mt-stevens-xl bg-stevens-light-gray border border-stevens-light-gray p-8 rounded-2xl text-center"
            >
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-stevens-black rounded-full flex items-center justify-center">
                    <Calculator className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-stevens-dark-gray">
                      Ready to see your savings?
                    </p>
                    <p className="text-sm text-stevens-dark-gray">
                      Answer 2 questions and calculate your cost
                    </p>
                  </div>
                </div>
                <Button
                  size="lg"
                  className="text-white"
                  onClick={() => scrollToSection("#programs-section")}
                >
                  Find My Program
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
          className="py-stevens-section-sm lg:py-stevens-section bg-stevens-light-gray"
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
          className="py-stevens-section-sm lg:py-stevens-section bg-stevens-light-gray"
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
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-stevens-md lg:gap-stevens-lg pb-20 lg:pb-0">
                {/* Left side - Calculator Inputs */}
                <div className="lg:col-span-2 space-y-stevens-md">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center text-stevens-lg">
                        <Calculator className="w-5 h-5 mr-2" />
                        Calculate Your Cost
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-stevens-lg">
                      {/* Selected Program */}
                      <div>
                        <label className="text-sm font-semibold text-stevens-dark-gray mb-2 block">
                          Selected Program
                        </label>
                        <Card className="bg-stevens-light-gray border-stevens-light-gray">
                          <CardContent className="p-stevens-md">
                            <div className="flex items-start justify-between">
                              <div>
                                <Badge className="mt-2 bg-stevens-black text-white">
                                  {selectedProgram.degree}
                                </Badge>
                                <p className="font-semibold text-stevens-dark-gray">
                                  {selectedProgram.name}
                                </p>
                                <p className="text-xs text-stevens-dark-gray mt-1">
                                  {selectedProgram.stats?.credits} credits •{" "}
                                  {calculatedCost?.durationYears === 1
                                    ? "1 year"
                                    : `${calculatedCost?.durationYears} years`}
                                </p>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setSelectedProgram(null);
                                  setCalculatedCost(null);
                                  setShowCalculator(false);
                                  setIsWorkforcePartner(false);
                                  setIsHobokenResident(false);
                                  setIsStevensAlumni(false);
                                  setAnnualReimbursement("");
                                }}
                              >
                                Change
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Year-End Benefits Notice */}
                      <Alert className="bg-stevens-light-gray border border-stevens-light-gray">
                        <Clock className="w-5 h-5 text-stevens-red" />
                        <AlertTitle className="text-stevens-dark-gray font-semibold">
                          2025 Tuition Benefits
                        </AlertTitle>
                        <AlertDescription className="text-stevens-dark-gray text-sm">
                          Many employer tuition benefits reset January 1st.
                          Apply now to maximize your 2025 benefits for Spring
                          2026.
                        </AlertDescription>
                      </Alert>

                      {/* Workforce Partner Discount - Only show for master's programs */}
                      {selectedProgram &&
                        !selectedProgram.code.startsWith("cert-") && (
                          <div className="flex items-start space-x-2 md:space-x-3 p-3 md:p-4 bg-stevens-light-gray rounded-lg border border-stevens-light-gray">
                            <Checkbox
                              id="workforce-partner"
                              checked={isWorkforcePartner}
                              onCheckedChange={setIsWorkforcePartner}
                              className="mt-0.5"
                            />
                            <div className="flex-1">
                              <label
                                htmlFor="workforce-partner"
                                className="text-sm font-medium text-stevens-dark-gray cursor-pointer flex items-center"
                              >
                                <Building className="w-4 h-4 mr-1.5 text-stevens-black" />
                                Is your employer a Stevens workforce development
                                partner?
                              </label>
                              <p className="text-xs text-stevens-dark-gray mt-1">
                                {discountInfo.workforcePartner.percentage}%
                                discount (average savings of ~20%)
                              </p>
                            </div>
                          </div>
                        )}

                      {/* Hoboken Resident Discount */}
                      <div className="flex items-start space-x-2 md:space-x-3 p-3 md:p-stevens-md bg-stevens-light-gray rounded-lg">
                        <Checkbox
                          id="hoboken"
                          checked={isHobokenResident}
                          onCheckedChange={setIsHobokenResident}
                          className="mt-0.5"
                        />
                        <div className="flex-1">
                          <label
                            htmlFor="hoboken"
                            className="text-sm font-medium text-stevens-dark-gray cursor-pointer flex items-center"
                          >
                            <Home className="w-4 h-4 mr-1.5 text-stevens-dark-gray" />
                            I am a Hoboken resident
                          </label>
                          <p className="text-xs text-stevens-dark-gray mt-1">
                            {discountInfo.hobokenResident.percentage}%
                            additional discount for Hoboken residents
                          </p>
                        </div>
                      </div>

                      {/* Stevens Alumni Discount */}
                      <div className="flex items-start space-x-2 md:space-x-3 p-3 md:p-stevens-md bg-stevens-light-gray rounded-lg">
                        <Checkbox
                          id="alumni"
                          checked={isStevensAlumni}
                          onCheckedChange={setIsStevensAlumni}
                          className="mt-0.5"
                        />
                        <div className="flex-1">
                          <label
                            htmlFor="alumni"
                            className="text-sm font-medium text-stevens-dark-gray cursor-pointer flex items-center"
                          >
                            <GraduationCap className="w-4 h-4 mr-1.5 text-stevens-dark-gray" />
                            I am a Stevens Institute of Technology alumni
                          </label>
                          <p className="text-xs text-stevens-dark-gray mt-1">
                            {discountInfo.alumniDiscount.percentage}% alumni
                            discount for Stevens graduates
                          </p>
                        </div>
                      </div>

                      {/* Annual Employer Reimbursement */}
                      <div>
                        <label className="text-sm font-semibold text-stevens-dark-gray mb-2 flex items-center">
                          <Briefcase className="w-4 h-4 mr-2" />
                          Annual Employer Tuition Reimbursement
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stevens-dark-gray font-medium">
                            $
                          </span>
                          <Input
                            type="number"
                            placeholder={`e.g., ${discountInfo.employerReimbursement.defaultAnnual}`}
                            value={annualReimbursement}
                            onChange={(e) =>
                              setAnnualReimbursement(e.target.value)
                            }
                            className="w-full pl-8"
                          />
                          {annualReimbursement && (
                            <button
                              onClick={() => setAnnualReimbursement("")}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-stevens-gray hover:text-stevens-dark-gray"
                              aria-label="Clear"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                        <p className="text-xs text-stevens-light-gray0 mt-1">
                          {discountInfo.employerReimbursement.description}
                        </p>
                        {annualReimbursement &&
                          calculatedCost?.durationYears && (
                            <p className="text-xs text-stevens-red mt-1 font-medium">
                              $
                              {parseFloat(annualReimbursement).toLocaleString()}
                              /year × {calculatedCost.durationYears} year
                              {calculatedCost.durationYears > 1 ? "s" : ""} = $
                              {(
                                parseFloat(annualReimbursement) *
                                calculatedCost.durationYears
                              ).toLocaleString()}{" "}
                              total
                            </p>
                          )}
                      </div>
                    </CardContent>

                    {/* Mobile Price Summary - Only visible on mobile */}
                    {calculatedCost && (
                      <div className="lg:hidden p-stevens-md pt-0 border-t border-stevens-light-gray">
                        {/* Final Price */}
                        <div className="bg-stevens-gray text-stevens-white p-stevens-md rounded-stevens-md mb-stevens-md">
                          {calculatedCost.credits.type === "variable" ? (
                            <>
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-base font-semibold">
                                  {calculatedCost.steps.find(
                                    (s) => s.type === "reimbursement"
                                  )
                                    ? "YOUR FINAL COST"
                                    : "YOUR COST"}
                                </span>
                                <span className="text-stevens-2xl font-bold">
                                  ${calculatedCost.finalPrice.toLocaleString()}
                                </span>
                              </div>
                              <p className="text-xs text-stevens-white/80">
                                Based on {calculatedCost.credits.typical}{" "}
                                credits
                              </p>
                            </>
                          ) : (
                            <>
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-base font-semibold">
                                  {calculatedCost.steps.find(
                                    (s) => s.type === "reimbursement"
                                  )
                                    ? "YOUR FINAL COST"
                                    : "YOUR COST"}
                                </span>
                                <span className="text-stevens-2xl font-bold">
                                  ${calculatedCost.finalPrice.toLocaleString()}
                                </span>
                              </div>
                              {!calculatedCost.steps.find(
                                (s) => s.type === "reimbursement"
                              ) && (
                                <p className="text-xs text-stevens-white/70 italic">
                                  * Before employer reimbursement
                                </p>
                              )}
                            </>
                          )}

                          {calculatedCost.percentSaved > 0 && (
                            <div className="flex items-center mt-stevens-md pt-stevens-md border-t border-stevens-white/20">
                              <Star className="w-4 h-4 mr-2 fill-current" />
                              <span className="text-sm">
                                You save {calculatedCost.percentSaved}%!
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Mobile CTA Buttons - Only visible on mobile */}
                    {calculatedCost && (
                      <div className="lg:hidden p-stevens-md pt-0 space-y-stevens-md border-t border-stevens-light-gray">
                        {/* Primary CTA - Apply */}
                        {(() => {
                          // Build the correct application URL based on program config
                          const appConfig = selectedProgram.applicationConfig;
                          const utmParams = `utm_source=microsite&utm_medium=corporate_landing&utm_campaign=corporate-calculator&utm_content=${selectedProgram.code}`;

                          // External application (Stevens grad admissions)
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
                                    cta_location: "calculator_inputs_mobile",
                                    program_code: selectedProgram.code,
                                    final_price: calculatedCost.finalPrice,
                                    application_type: "external",
                                  });
                                  trackConversion(CONVERSION_LABELS.APPLY_NOW);
                                }}
                              >
                                <Button
                                  size="lg"
                                  className="w-full text-stevens-white group py-4"
                                >
                                  <Send className="w-5 h-5 mr-2" />
                                  Apply Now
                                  <ExternalLink className="w-4 h-4 ml-2" />
                                </Button>
                              </a>
                            );
                          }

                          // Internal accelerated application
                          const internalPath =
                            appConfig?.link || "/accelerated-application/";
                          return (
                            <Link
                              to={`${internalPath}?program=${
                                selectedProgram.code
                              }${
                                corporateCode ? `&code=${corporateCode}` : ""
                              }&${utmParams}`}
                              onClick={() => {
                                trackEvent("cta_click", {
                                  cta_type: "apply_now",
                                  cta_location: "calculator_inputs_mobile",
                                  program_code: selectedProgram.code,
                                  final_price: calculatedCost.finalPrice,
                                  application_type: "accelerated",
                                });
                                trackConversion(CONVERSION_LABELS.APPLY_NOW);
                              }}
                            >
                              <Button
                                size="lg"
                                className="w-full text-stevens-white group py-4"
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
                            handleCTAClick("request_info_calculator_mobile");
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
                  </Card>
                </div>

                {/* Right side - Cost Breakdown */}
                <div className="hidden lg:block lg:col-span-3 order-first lg:order-last">
                  {calculatedCost ? (
                    <Card className="lg:sticky lg:top-4">
                      <CardHeader className="bg-stevens-gray text-stevens-white rounded-t-stevens-md">
                        <CardTitle className="text-stevens-xl md:text-stevens-2xl">
                          Your Investment Breakdown
                        </CardTitle>
                        <p className="text-stevens-white/90 text-sm">
                          {calculatedCost.programName}
                        </p>
                      </CardHeader>
                      <CardContent className="p-stevens-md lg:p-stevens-lg pt-stevens-md">
                        {/* Base Price */}
                        <div className="mb-stevens-lg pb-stevens-md border-b-2 pt-stevens-md">
                          <div className="flex justify-between items-center">
                            <span className="text-stevens-dark-gray">
                              {calculatedCost.credits.type === "variable"
                                ? "Program Cost"
                                : "Standard Program Price"}
                            </span>
                            <span className="text-stevens-xl md:text-stevens-2xl font-bold text-stevens-dark-gray">
                              ${calculatedCost.basePrice.toLocaleString()}
                            </span>
                          </div>
                          {calculatedCost.credits.type === "fixed" && (
                            <p className="text-xs text-stevens-dark-gray mt-1">
                              {calculatedCost.credits.value} credits •{" "}
                              {calculatedCost.durationYears} year
                              {calculatedCost.durationYears > 1 ? "s" : ""}
                            </p>
                          )}
                          {calculatedCost.credits.type === "variable" && (
                            <p className="text-xs text-stevens-dark-gray mt-1">
                              Based on typical {calculatedCost.credits.typical}{" "}
                              credits
                            </p>
                          )}
                        </div>

                        {/* Variable Credit Info */}
                        {calculatedCost.credits.type === "variable" && (
                          <div className="mb-stevens-lg">
                            <Alert className="bg-stevens-light-gray border border-stevens-light-gray">
                              <Info className="w-5 h-5 text-stevens-dark-gray" />
                              <AlertTitle className="text-stevens-dark-gray font-semibold mb-2">
                                Variable Credit Program
                              </AlertTitle>
                              <AlertDescription>
                                <p className="text-sm text-stevens-dark-gray mb-2">
                                  {calculatedCost.programName} requires{" "}
                                  {calculatedCost.credits.min}-
                                  {calculatedCost.credits.max} credits based on
                                  concentration. Estimate uses{" "}
                                  {calculatedCost.credits.typical} credits.
                                </p>
                              </AlertDescription>
                            </Alert>
                          </div>
                        )}

                        {/* Certificate Program Benefits Message */}
                        {calculatedCost.programCode.startsWith("cert-") && (
                          <div className="mb-stevens-lg">
                            <Alert className="bg-stevens-light-gray border border-stevens-light-gray">
                              <Sparkles className="w-5 h-5 text-stevens-red" />
                              <AlertTitle className="text-stevens-dark-gray font-semibold mb-2">
                                Certificate Program Benefits
                              </AlertTitle>
                              <AlertDescription>
                                <p className="text-sm text-stevens-dark-gray mb-2">
                                  Professional certificates are priced at $
                                  {calculatedCost.basePrice.toLocaleString()}(
                                  {calculatedCost.credits.value} credits) to
                                  align with employer tuition reimbursement
                                  limits.
                                </p>
                                <p className="text-xs text-stevens-dark-gray flex items-center">
                                  <CheckCircle className="w-3 h-3 mr-1 text-stevens-red" />
                                  This certificate can stack toward a full
                                  master's degree!
                                </p>
                              </AlertDescription>
                            </Alert>
                          </div>
                        )}

                        {/* Discount Steps */}
                        {calculatedCost.steps.length > 0 && (
                          <div className="space-y-3 mb-stevens-lg">
                            {calculatedCost.steps.map((step, index) => {
                              const Icon =
                                step.icon === "building"
                                  ? Building
                                  : step.icon === "sparkles"
                                  ? Sparkles
                                  : step.icon === "home"
                                  ? Home
                                  : step.icon === "graduation-cap"
                                  ? GraduationCap
                                  : step.icon === "briefcase"
                                  ? Briefcase
                                  : CheckCircle;

                              return (
                                <div key={index}>
                                  <div className="flex items-start space-x-2 md:space-x-3 p-3 md:p-4 bg-stevens-light-gray rounded-lg border border-stevens-light-gray">
                                    <Icon className="w-5 h-5 text-stevens-red flex-shrink-0 mt-0.5" />
                                    <div className="flex-1 min-w-0">
                                      <div className="flex justify-between items-start mb-1">
                                        <div className="flex-1 min-w-0">
                                          <p className="font-semibold text-stevens-dark-gray text-sm">
                                            {step.name}
                                          </p>
                                          <p className="text-xs text-stevens-dark-gray mt-0.5">
                                            {step.description}
                                          </p>
                                        </div>
                                        <div className="text-right ml-4 flex-shrink-0">
                                          <p className="font-bold text-stevens-red">
                                            -$
                                            {step.discountAmount.toLocaleString()}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {/* Final Price */}
                        <div className="bg-stevens-gray text-stevens-white p-stevens-md lg:p-stevens-lg rounded-stevens-md">
                          {calculatedCost.credits.type === "variable" ? (
                            <>
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-lg font-semibold">
                                  {calculatedCost.steps.find(
                                    (s) => s.type === "reimbursement"
                                  )
                                    ? "YOUR FINAL COST"
                                    : "YOUR COST"}
                                </span>
                                <span className="text-stevens-2xl md:text-stevens-3xl font-bold">
                                  ${calculatedCost.finalPrice.toLocaleString()}
                                </span>
                              </div>
                              <p className="text-xs text-stevens-white/80">
                                Based on {calculatedCost.credits.typical}{" "}
                                credits
                              </p>
                            </>
                          ) : (
                            <>
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-lg font-semibold">
                                  {calculatedCost.steps.find(
                                    (s) => s.type === "reimbursement"
                                  )
                                    ? "YOUR FINAL COST"
                                    : "YOUR COST"}
                                </span>
                                <span className="text-stevens-2xl md:text-stevens-4xl font-bold">
                                  ${calculatedCost.finalPrice.toLocaleString()}
                                </span>
                              </div>
                              {!calculatedCost.steps.find(
                                (s) => s.type === "reimbursement"
                              ) && (
                                <p className="text-xs text-stevens-white/70 italic">
                                  * Before employer reimbursement
                                </p>
                              )}
                            </>
                          )}

                          {calculatedCost.percentSaved > 0 && (
                            <div className="flex items-center mt-stevens-md pt-stevens-md border-t border-stevens-white/20">
                              <Star className="w-5 h-5 mr-2 fill-current" />
                              <span className="text-lg">
                                You save {calculatedCost.percentSaved}%!
                              </span>
                            </div>
                          )}

                          {/* Prompt to add reimbursement if not entered */}
                          {!calculatedCost.steps.find(
                            (s) => s.type === "reimbursement"
                          ) && (
                            <div className="mt-stevens-md pt-stevens-md border-t border-stevens-white/20">
                              <div className="flex items-start text-stevens-white/90">
                                <Briefcase className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                                <div className="text-sm">
                                  <p className="font-semibold mb-1">
                                    Add your annual employer reimbursement
                                  </p>
                                  <p className="text-xs text-stevens-white/80">
                                    Most employers offer up to $
                                    {discountInfo.employerReimbursement.defaultAnnual.toLocaleString()}
                                    /year
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Certificate FREE message */}
                          {calculatedCost.programCode.startsWith("cert-") &&
                            calculatedCost.finalPrice === 0 && (
                              <div className="mt-stevens-md pt-stevens-md border-t border-stevens-white/20">
                                <div className="flex items-center text-stevens-white">
                                  <CheckCircle className="w-6 h-6 mr-2 fill-current" />
                                  <span className="text-lg font-bold">
                                    Fully covered by employer benefits!
                                  </span>
                                </div>
                              </div>
                            )}
                        </div>

                        {/* CTA Buttons */}
                        <div className="mt-stevens-lg space-y-stevens-md">
                          {/* Primary CTA - Apply */}
                          {(() => {
                            // Build the correct application URL based on program config
                            const appConfig = selectedProgram.applicationConfig;
                            const utmParams = `utm_source=microsite&utm_medium=corporate_landing&utm_campaign=corporate-calculator&utm_content=${selectedProgram.code}`;

                            // External application (Stevens grad admissions)
                            if (
                              appConfig?.standardLink ||
                              (appConfig?.type === "direct" &&
                                appConfig?.link?.startsWith("http"))
                            ) {
                              const baseUrl =
                                appConfig.standardLink || appConfig.link;
                              const separator = baseUrl.includes("?")
                                ? "&"
                                : "?";
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
                                    trackConversion(
                                      CONVERSION_LABELS.APPLY_NOW
                                    );
                                  }}
                                >
                                  <Button
                                    size="lg"
                                    className="w-full text-stevens-white group py-4"
                                  >
                                    <Send className="w-5 h-5 mr-2" />
                                    Apply Now
                                    <ExternalLink className="w-4 h-4 ml-2" />
                                  </Button>
                                </a>
                              );
                            }

                            // Internal accelerated application
                            const internalPath =
                              appConfig?.link || "/accelerated-application/";
                            return (
                              <Link
                                to={`${internalPath}?program=${
                                  selectedProgram.code
                                }${
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
                                  className="w-full text-stevens-white group py-4"
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
                      </CardContent>
                    </Card>
                  ) : (
                    <Card className="h-full flex items-center justify-center p-stevens-2xl">
                      <div className="text-center text-stevens-light-gray0">
                        <Calculator className="w-16 h-16 mx-auto mb-stevens-md opacity-50" />
                        <p className="text-lg font-semibold mb-2">
                          Calculating your personalized pricing...
                        </p>
                      </div>
                    </Card>
                  )}
                </div>
              </div>
            ) : (
              /* Default view - select a program message */
              <Card className="max-w-2xl mx-auto">
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
                    className="text-stevens-white"
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
        <section className="py-stevens-section-sm lg:py-stevens-section bg-stevens-light-gray">
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
                    <tr className="bg-stevens-dark-gray text-stevens-white">
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
                        className={`border-b border-stevens-light-gray transition-all duration-300 cursor-default group ${
                          index % 2 === 0
                            ? "bg-stevens-white hover:bg-stevens-light-gray"
                            : "bg-stevens-light-gray hover:bg-stevens-white"
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
              <div className="lg:hidden divide-y divide-stevens-light-gray">
                {applicationSteps.map((step) => (
                  <div
                    key={step.step}
                    className="p-stevens-lg transition-all duration-300 hover:bg-stevens-light-gray group"
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
          className="py-stevens-section-sm lg:py-stevens-section bg-stevens-gray text-stevens-white"
        >
          <div className="max-w-stevens-content-max mx-auto px-stevens-md lg:px-stevens-lg">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="font-stevens-display text-stevens-3xl md:text-stevens-4xl font-stevens-bold mb-stevens-md">
                Ready to Take the Next Step?
              </h2>
              <p className="text-stevens-lg mb-4 max-w-2xl mx-auto opacity-90">
                Join thousands of professionals who advanced their careers
                through Stevens workforce development programs. Your employer
                benefits are ready to be used.
              </p>

              {/* Deadline Notice */}
              <p className="text-sm text-stevens-red font-medium mb-stevens-xl">
                Spring 2026: Priority Deadline Dec 15 • Final Deadline Jan 10
              </p>

              <div className="flex flex-col sm:flex-row gap-stevens-md justify-center">
                <Button
                  size="lg"
                  variant="outline-white"
                  className="group w-full sm:w-auto min-w-[280px] py-4 text-base"
                  onClick={() => {
                    handleCTAClick("request_info_footer");
                    setShowContactModal(true);
                  }}
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Request Information
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  size="lg"
                  variant="outline-white"
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
              <div className="mt-stevens-xl pt-stevens-lg border-t border-white/20">
                <p className="text-sm text-white/70 mb-4">
                  Trusted by employees at leading organizations
                </p>
                <div className="flex flex-wrap justify-center items-center gap-6 text-white/80">
                  <span className="font-medium">Pfizer</span>
                  <span className="text-white/30">•</span>
                  <span className="font-medium">Johnson & Johnson</span>
                  <span className="text-white/30">•</span>
                  <span className="font-medium">JPMorgan Chase</span>
                  <span className="text-white/30">•</span>
                  <span className="font-medium">IBM</span>
                  <span className="text-white/30">•</span>
                  <span className="font-medium">EY</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Modal */}
        {showContactModal && (
          <div
            className="fixed inset-0 z-[99999] overflow-y-auto p-2 sm:p-4 bg-black/60 animate-in fade-in duration-300"
            onClick={() => setShowContactModal(false)}
          >
            <div className="min-h-full flex items-center justify-center py-4 sm:py-8">
              <div
                className="relative w-full max-w-2xl bg-stevens-white rounded-stevens-lg shadow-stevens-2xl animate-in zoom-in-95 duration-300"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative bg-stevens-dark-gray text-stevens-white px-3 sm:px-stevens-md py-4 sm:py-stevens-lg rounded-t-stevens-lg">
                  <h2 className="font-stevens-display text-base sm:text-stevens-lg md:text-stevens-xl lg:text-stevens-2xl font-stevens-bold text-center pr-6 sm:pr-8 leading-tight">
                    Request Information
                  </h2>
                  <p className="text-center text-stevens-white/90 mt-1 sm:mt-stevens-xs text-xs sm:text-stevens-sm leading-tight">
                    An enrollment advisor will reach out within 1 business day
                  </p>
                  <button
                    onClick={() => setShowContactModal(false)}
                    className="absolute top-2 right-2 z-50 text-stevens-gray hover:text-stevens-dark-gray transition-colors duration-stevens-fast bg-white rounded-full p-1 sm:p-stevens-xs shadow-stevens-md hover:shadow-stevens-lg"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                </div>

                <div className="p-stevens-sm sm:p-stevens-md md:p-stevens-lg bg-stevens-white">
                  <LeadCaptureForm
                    formType="rfi"
                    source="corporate_students_page"
                    programCode={
                      selectedProgram || searchParams.get("program") || "CORP"
                    }
                    hideHeader={true}
                    onSuccess={() => {
                      trackConversion(CONVERSION_LABELS.GET_PROGRAM_DETAILS);
                      setShowContactModal(false);
                    }}
                    additionalUrlParams={{
                      // UTM tracking for attribution
                      utm_source: "microsite",
                      utm_medium: "corporate_landing",
                      utm_campaign: "corporate_students_rfi",
                      utm_content: selectedProgram || "general",
                      // Corporate context
                      company: companyName || "unknown",
                      corporate_code: corporateCode || "",
                      selected_program: selectedProgram || "",
                      // Calculator context for lead scoring
                      is_workforce_partner: isWorkforcePartner ? "yes" : "no",
                      is_hoboken_resident: isHobokenResident ? "yes" : "no",
                      is_alumni: isStevensAlumni ? "yes" : "no",
                      has_reimbursement: annualReimbursement ? "yes" : "no",
                    }}
                  />
                </div>

                <div className="bg-stevens-light-gray px-stevens-sm sm:px-stevens-md py-2 sm:py-stevens-sm border-t border-stevens-light-gray rounded-b-stevens-lg">
                  <p className="text-stevens-xs sm:text-stevens-sm text-stevens-dark-gray text-center leading-tight">
                    Have questions?{" "}
                    <a
                      href={BOOKING_URLS.SCHEDULE_CALL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-stevens-red hover:underline font-stevens-semibold"
                    >
                      Schedule a call
                    </a>{" "}
                    with an advisor.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contact Options Modal */}
        <Dialog
          open={showContactOptionsModal}
          onOpenChange={(open) => {
            setShowContactOptionsModal(open);
            if (!open) setCopiedItem(null);
          }}
        >
          <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto p-0 gap-0 !top-[50%] !left-[50%] !-translate-x-1/2 !-translate-y-1/2 mx-4">
            <div className="bg-stevens-gray text-white px-6 py-5 rounded-t-lg">
              <DialogHeader className="space-y-2">
                <DialogTitle className="text-xl sm:text-2xl font-bold text-center text-white">
                  Get in Touch
                </DialogTitle>
              </DialogHeader>
            </div>

            <div className="p-6 space-y-4">
              <button
                onClick={() => {
                  trackEvent("contact_option_selected", {
                    option: "schedule_call",
                    page: "corporate_students",
                  });
                  window.open(
                    BOOKING_URLS.SCHEDULE_CALL,
                    "_blank",
                    "noopener,noreferrer"
                  );
                  setShowContactOptionsModal(false);
                }}
                className="w-full p-5 rounded-xl bg-stevens-black text-white hover:shadow-lg hover:bg-stevens-dark-gray transform hover:-translate-y-0.5 transition-all duration-300 group relative overflow-hidden"
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
                    <Calendar className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-bold text-lg mb-1">Schedule a Call</h3>
                    <p className="text-sm text-white/80">
                      Book a convenient time for a personalized consultation
                    </p>
                  </div>
                  <ExternalLink className="w-5 h-5 text-white/70 group-hover:text-white transition-colors flex-shrink-0" />
                </div>
              </button>

              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-stevens-light-gray"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-4 text-sm text-stevens-light-gray0">
                    or reach us directly
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={CONTACT_INFO.PHONE_LINK}
                  onClick={() => {
                    trackEvent("contact_option_selected", {
                      option: "phone",
                      page: "corporate_students",
                    });
                  }}
                  className="flex flex-col items-center p-4 rounded-xl border-2 border-stevens-light-gray hover:border-stevens-red hover:bg-stevens-light-gray transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-full bg-stevens-light-gray group-hover:bg-stevens-light-gray flex items-center justify-center mb-3 transition-colors">
                    <Phone className="w-6 h-6 text-stevens-dark-gray group-hover:text-stevens-red" />
                  </div>
                  <span className="text-xs text-stevens-light-gray0 mb-1">
                    Call Us
                  </span>
                  <span className="font-bold text-stevens-dark-gray group-hover:text-stevens-red transition-colors">
                    {CONTACT_INFO.PHONE_DISPLAY}
                  </span>
                </a>

                <button
                  onClick={() => {
                    trackEvent("contact_option_selected", {
                      option: "email",
                      page: "corporate_students",
                    });
                    navigator.clipboard.writeText(CONTACT_INFO.EMAIL);
                    setCopiedItem("email");
                    setTimeout(() => setCopiedItem(null), 2000);
                  }}
                  className="flex flex-col items-center p-4 rounded-xl border-2 border-stevens-light-gray hover:border-stevens-red hover:bg-stevens-light-gray transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-full bg-stevens-light-gray group-hover:bg-stevens-light-gray flex items-center justify-center mb-3 transition-colors">
                    {copiedItem === "email" ? (
                      <Check className="w-6 h-6 text-stevens-red" />
                    ) : (
                      <Mail className="w-6 h-6 text-stevens-dark-gray group-hover:text-stevens-red" />
                    )}
                  </div>
                  <span className="text-xs text-stevens-light-gray0 mb-1">
                    {copiedItem === "email" ? "Copied!" : "Email Us"}
                  </span>
                  <span className="font-bold text-stevens-dark-gray group-hover:text-stevens-red transition-colors text-sm break-all">
                    {CONTACT_INFO.EMAIL}
                  </span>
                  <span className="text-xs text-stevens-gray mt-1 flex items-center gap-1">
                    <Copy className="w-3 h-3" /> Click to copy
                  </span>
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </PageContextProvider>
  );
};

export default CorporateStudents;
