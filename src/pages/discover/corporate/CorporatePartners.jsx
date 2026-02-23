import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  TrendingUp,
  Users,
  Building2,
  Briefcase,
  Award,
  CheckCircle,
  Star,
  Target,
  GraduationCap,
  Lightbulb,
  Shield,
  DollarSign,
} from "lucide-react";
import {
  PageHero,
  PullQuoteTestimonial,
  RequestInfoModal,
  LogoMarqueeSection,
} from "@/components/shared";
import { Button } from "@/components/ui/button";
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
import EmployerFaqSection from "@/components/corporate/EmployerFaqSection";
import ContactOptionsModal from "@/components/shared/modals/ContactOptionsModal";
import { useCountUp } from "@/hooks/useCountUp";

const StatCard = ({ stat, index }) => {
  const Icon = stat.icon;
  const { ref, display } = useCountUp(stat.value, { duration: 1.5 });

  return (
    <motion.div
      key={stat.label}
      className="text-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <motion.div
        className="bg-white/20 backdrop-blur-md rounded-stevens-lg sm:rounded-stevens-xl p-5 sm:p-6 md:p-stevens-lg lg:p-stevens-xl border border-white/20 h-full transition-all duration-300 hover:bg-white/25 hover:border-white/30 group relative overflow-hidden flex flex-col items-center text-center"
        whileHover={{ y: -4, scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-2 sm:mb-3 md:mb-stevens-sm rounded-full bg-white/15 flex items-center justify-center group-hover:bg-white/25 transition-colors duration-300">
          <Icon className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 text-white/90 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
        </div>

        <div
          ref={ref}
          className="text-2xl sm:text-stevens-3xl md:text-stevens-4xl lg:text-stevens-5xl font-stevens-display font-extrabold mb-1 sm:mb-stevens-xs tracking-tight leading-none tabular-nums text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.6)]"
        >
          {display}
        </div>

        <div className="text-sm sm:text-stevens-sm md:text-stevens-base font-stevens-semibold text-white leading-snug sm:leading-normal [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">
          {stat.label}
        </div>

        {stat.source && (
          <div className="text-white/70 text-xs italic mt-1.5 [text-shadow:0_1px_1px_rgba(0,0,0,0.4)]">
            {stat.source}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

// Employment Growth Bar Chart Component
const EmploymentGrowthChart = () => {
  const [showSources, setShowSources] = useState(false);

  const growthData = [
    {
      discipline: "Machine Learning",
      growth: 34,
      color: "#A51C30",
      source: "https://www.bls.gov/ooh/math/data-scientists.htm",
      footnote: 2,
    },

    {
      discipline: "Business Intelligence",
      growth: 21,
      color: "#D63447",
      source: "https://www.bls.gov/ooh/math/operations-research-analysts.htm",
      footnote: 5,
    },
    {
      discipline: "Artificial Intelligence",
      growth: 20,
      color: "#E63946",
      source:
        "https://www.bls.gov/ooh/computer-and-information-technology/computer-and-information-research-scientists.htm",
      footnote: 1,
    },
    {
      discipline: "Computer Science",
      growth: 15,
      color: "#F25C54",
      source:
        "https://www.bls.gov/ooh/computer-and-information-technology/software-developers.htm",
      footnote: 4,
    },
    {
      discipline: "Data Science",
      growth: 8,
      color: "#FF7F7F",
      source:
        "https://www.bls.gov/ooh/math/mathematicians-and-statisticians.htm",
      footnote: 3,
    },
  ];

  const maxGrowth = Math.max(...growthData.map((d) => d.growth));
  const chartHeight = 400;
  const barHeight = 45;
  const barSpacing = 20;
  const leftMargin = 180;
  const rightMargin = 60;
  const topMargin = 32;
  const bottomMargin = 50;

  const chartWidth = 700;
  const availableWidth = chartWidth - leftMargin - rightMargin;

  return (
    <div className="bg-stevens-light-gray/30 rounded-stevens-xl p-stevens-lg border border-stevens-light-gray shadow-stevens-md">
      <div className="mb-stevens-md">
        <h3 className="font-stevens-display text-stevens-xl md:text-stevens-2xl font-light uppercase tracking-wide text-stevens-dark-gray mb-stevens-xs">
          Projected Employment Growth (2025–2034)
        </h3>
      </div>

      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight + bottomMargin}`}
          className="w-full h-auto"
          role="img"
          aria-label="Bar chart showing projected employment growth from 2024 to 2034 for six disciplines: Machine Learning at 34%, Cybersecurity at 29%, Business Intelligence at 21%, Artificial Intelligence at 20%, Computer Science at 15%, and Data Science at 8%"
        >
          {/* Bars + labels with hover interaction */}
          {growthData.map((item, index) => {
            const yTop = topMargin + index * (barHeight + barSpacing);
            const yCenter = yTop + barHeight / 2;
            const barWidth = (item.growth / maxGrowth) * availableWidth;

            return (
              <motion.g
                key={`bar-${index}`}
                whileHover={{ scale: 1.01, x: 2 }}
                transition={{ type: "spring", stiffness: 220, damping: 20 }}
                style={{ cursor: "default" }}
              >
                {/* Y-axis label (discipline) */}
                <text
                  x={leftMargin - 10}
                  y={yCenter}
                  textAnchor="end"
                  dominantBaseline="middle"
                  className="text-stevens-md fill-stevens-dark-gray"
                  style={{ fontSize: "17px" }}
                >
                  {item.discipline}
                </text>

                {/* Bar background */}
                <rect
                  x={leftMargin}
                  y={yTop}
                  width={availableWidth}
                  height={barHeight}
                  fill="#F1F5F9"
                  rx="4"
                />

                {/* Animated bar with subtle hover glow */}
                <motion.rect
                  x={leftMargin}
                  y={yTop}
                  width={barWidth}
                  height={barHeight}
                  fill={item.color}
                  rx="4"
                  initial={{ width: 0, opacity: 0.9 }}
                  whileInView={{ width: barWidth, opacity: 1 }}
                  whileHover={{ filter: "brightness(1.08)" }}
                  transition={{
                    duration: 1,
                    delay: index * 0.1,
                    ease: "easeOut",
                  }}
                  viewport={{ once: true }}
                />

                {/* Percentage label */}
                <text
                  x={leftMargin + barWidth + 8}
                  y={yCenter}
                  dominantBaseline="middle"
                  className="font-stevens-bold fill-stevens-dark-gray"
                  style={{ fontSize: "16px" }}
                >
                  {item.growth}%
                </text>

                {/* Footnote reference */}
                <text
                  x={leftMargin + barWidth + 35}
                  y={yCenter - 8}
                  dominantBaseline="middle"
                  className="text-stevens-xs fill-stevens-light-gray0"
                  style={{ fontSize: "11px" }}
                >
                  [{item.footnote}]
                </text>
              </motion.g>
            );
          })}

          {/* X-axis line */}
          <line
            x1={leftMargin}
            y1={
              topMargin +
              growthData.length * (barHeight + barSpacing) -
              barSpacing +
              barHeight
            }
            x2={leftMargin + availableWidth}
            y2={
              topMargin +
              growthData.length * (barHeight + barSpacing) -
              barSpacing +
              barHeight
            }
            stroke="#CBD5E1"
            strokeWidth="1"
          />

          {/* X-axis label */}
          <text
            x={leftMargin + availableWidth / 2}
            y={chartHeight - 10}
            textAnchor="middle"
            className="text-stevens-sm font-stevens-medium fill-stevens-dark-gray"
            style={{ fontSize: "13px" }}
          ></text>
        </svg>
      </div>

      {/* Collapsible Footnotes */}
      <div className=" pt-stevens-md border-t border-stevens-light-gray">
        <button
          type="button"
          onClick={() => setShowSources((prev) => !prev)}
          className="flex w-full items-center justify-between text-stevens-xs font-stevens-semibold text-stevens-dark-gray hover:text-stevens-red transition-colors"
          aria-expanded={showSources}
          aria-controls="employment-growth-sources"
        >
          <span>View data sources (U.S. Bureau of Labor Statistics)</span>
          <span className="ml-stevens-sm text-stevens-base leading-none">
            {showSources ? "−" : "+"}
          </span>
        </button>

        {showSources && (
          <div
            id="employment-growth-sources"
            className="mt-stevens-sm grid gap-stevens-xs text-stevens-xs md:text-stevens-sm text-stevens-dark-gray leading-relaxed"
          >
            {growthData
              .slice()
              .sort((a, b) => a.footnote - b.footnote)
              .map((item) => (
                <p key={item.footnote}>
                  <span>[{item.footnote}]</span>{" "}
                  <a
                    href={item.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-stevens-red hover:underline"
                  >
                    {item.discipline === "Artificial Intelligence" &&
                      "Computer & Information Research Scientists"}
                    {item.discipline === "Machine Learning" &&
                      "Data Scientists"}
                    {item.discipline === "Data Science" &&
                      "Mathematicians & Statisticians"}
                    {item.discipline === "Computer Science" &&
                      "Software Developers, QA Analysts & Testers"}

                    {item.discipline === "Business Intelligence" &&
                      "Operations Research Analysts"}
                  </a>
                  {" — "}U.S. Bureau of Labor Statistics, Occupational Outlook
                  Handbook
                </p>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

const CorporatePartners = () => {
  usePageTracking({
    pageType: "landing",
    additionalData: {
      page_name: "Corporate Partners",
      has_form: true,
      landing_page_type: "b2b",
    },
  });

  const [showContactModal, setShowContactModal] = useState(false);
  const [showContactOptionsModal, setShowContactOptionsModal] = useState(false);

  // Set SEO meta tags
  useEffect(() => {
    const canonical = buildCanonicalUrl("/corporate-partners/");
    setPageTitle(
      "Corporate Partnerships | Workforce Development | Stevens Online"
    );
    setMetaDescription(
      "Partner with Stevens Online to upskill your workforce. Flexible, career-aligned education with accelerated admissions, dedicated support, and customized learning pathways."
    );
    setOpenGraphTags({
      title: "Corporate Partnerships | Stevens Online",
      description:
        "Transform your workforce with Stevens Online education programs. Customized learning solutions for corporate partners.",
      image: buildCanonicalUrl(
        "/assets/images/corporate-partners/corporate-partners-hero.webp"
      ),
      url: canonical,
      type: "website",
    });
  }, []);

  // Partner benefits data
  const partnerBenefits = [
    {
      icon: Building2,
      title: "Built for Employers",
      description:
        "Streamlined partnership setup, custom cohort onboarding, and flexible corporate billing options.",
      color: "stevens-red",
    },
    {
      icon: Users,
      title: "Integrated Talent Solutions",
      description:
        "Learning pathways aligned with your HR and L&D systems for seamless integration.",
      color: "stevens-red",
    },
    {
      icon: Lightbulb,
      title: "Co-Developed Education",
      description:
        "Collaborate directly with Stevens faculty to create skills-based programs that meet your workforce goals.",
      color: "stevens-tertiary",
    },
    {
      icon: TrendingUp,
      title: "Agile by Design",
      description:
        "Quickly develop and deploy courses or credentials aligned with the latest industry demands.",
      color: "stevens-accent",
    },
  ];

  // Statistics for Why Stevens section
  const stevensStats = [
    {
      value: "#1",
      label: "Online MBA in New Jersey",
      source: "U.S. News 2026",
      icon: Award,
    },
    {
      value: "129%",
      label: "ROI on Tuition Programs",
      source: "Industry Study",
      icon: TrendingUp,
    },
    {
      value: "93%",
      label: "Employee Skill Development",
      source: "Partner Survey",
      icon: Star,
    },
    {
      value: "$5,250",
      label: "Tailored Reimbursement for you",
      source: "IRS Section 127 Compliant",
      icon: DollarSign,
    },
  ];

  // What We Offer features
  const offerings = [
    {
      icon: Target,
      title: "Customized Learning Pathways",
      description:
        "Curate role-specific programs for data analysts, engineers, project managers, and other key teams.",
    },
    {
      icon: Briefcase,
      title: "Interactive Learning Studios",
      description:
        "Co-create project-based learning built around your company's real data and challenges.",
    },
    {
      icon: Shield,
      title: "Dedicated Corporate Care Team",
      description:
        "Receive one-on-one support from a corporate advisor who manages onboarding and student success.",
    },

    {
      icon: Users,
      title: "Tailored Info Sessions",
      description:
        "Engage employees through customized sessions co-hosted with your subject matter experts.",
    },
    {
      icon: CheckCircle,
      title: "Accelerated Admissions",
      description:
        "Streamlined application process designed for working professionals — no essays or recommendations required.",
    },
  ];

  // Areas of expertise
  const _expertiseAreas = [
    "Artificial Intelligence",
    "Machine Learning",
    "Data Science",
    "Computer Science",

    "Business Intelligence",
  ];

  // Success stories / testimonials
  const testimonials = [
    {
      quote:
        "PSEG’s partnership with Stevens Institute of Technology is unquestionably one of our company’s most prized relationships – and one that benefits both of our organizations tremendously",
      author: "Kim Hanemann",
      title: "President and Chief Operating Officer, PSEG",
    },
  ];

  // Company logos for trust signals - using actual filenames from company_logo folder
  const partnerCompanies = [
    {
      name: "Pfizer",
      logo: "/assets/company_logo/Pfizer_(2021).png",
      industry: "Healthcare",
    },

    {
      name: "Boeing",
      logo: "/assets/company_logo/Boeing_full_logo.png",
      industry: "Aerospace",
    },
    {
      name: "IBM",
      logo: "/assets/company_logo/IBM_logo.png",
      industry: "Technology",
    },
    {
      name: "Verizon",
      logo: "/assets/company_logo/Verizon_2024.png",
      industry: "Telecommunications",
    },
    {
      name: "Lockheed Martin",
      logo: "/assets/company_logo/Lockheed_Martin_logo.png",
      industry: "Aerospace",
    },
    {
      name: "Microsoft",
      logo: "/assets/company_logo/Microsoft_logo_(2012).png",
      industry: "Technology",
    },
    {
      name: "Google",
      logo: "/assets/company_logo/Google_2015_logo.png",
      industry: "Technology",
    },
    {
      name: "Cisco",
      logo: "/assets/company_logo/Cisco_logo.png",
      industry: "Technology",
    },
    {
      name: "PSEG",
      logo: "/assets/company_logo/PSEG_logo.png",
      industry: "Energy",
    },
  
    
    {
      name: "Exxon",
      logo: "/assets/company_logo/Exxon_logo_2016.png",
      industry: "Energy",
    },
  ];

  const handleCTAClick = (ctaType) => {
    trackEvent("corporate_cta_clicked", {
      page: "corporate_partners",
      cta_type: ctaType,
    });

    if (ctaType === "schedule_consultation") {
      trackConversion(CONVERSION_LABELS.CORPORATE_INQUIRY);
    }
  };

  return (
    <PageContextProvider pageType="landing" pageName="Corporate Partners">
      <div className="min-h-screen bg-stevens-white">
        {/* Hero Section */}
        <PageHero
          titleLines={["Partner with Stevens to Transform Your Workforce"]}
          subtitle="Flexible, career-aligned education designed for your employees, with accelerated admissions, dedicated corporate support, and customized learning pathways."
          bgImage="/assets/images/corporate-partners/corporate-partners-hero.webp"
          bgImageFlip={true}
          primaryCta={{
            label: "Request Information",
            onClick: () => {
              handleCTAClick("schedule_consultation");
              setShowContactModal(true);
            },
          }}
          secondaryCta={{
            label: "Contact Us",
            onClick: () => {
              handleCTAClick("contact_us");
              setShowContactOptionsModal(true);
            },
          }}
          secondaryButtonClassName="text-white border-white hover:bg-white hover:text-stevens-dark-gray"
        />
        
        {/* Why Partner with Stevens - Constellation Layout */}
        <section className="py-stevens-section-sm lg:py-stevens-section bg-stevens-white overflow-hidden">
          <div className="max-w-stevens-content-max mx-auto px-stevens-md lg:px-stevens-lg">
            <div className="grid lg:grid-cols-[40%_60%] gap-stevens-3xl items-center">
              {/* Left Side: Headline & Description */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-left"
              >
                <h2 className="font-stevens-display text-stevens-3xl md:text-stevens-4xl font-light uppercase tracking-wide text-stevens-black mb-stevens-lg leading-tight">
                  Education That Moves at the Speed of Industry
                </h2>
                <p className="text-stevens-base md:text-stevens-lg text-stevens-dark-gray leading-relaxed">
                  Stevens' College of Professional Education (CPE) reimagines
                  how universities collaborate with employers. Built to be
                  flexible, fast-moving, and interdisciplinary, CPE removes the
                  barriers that slow corporate partnerships, helping you launch
                  impactful learning initiatives that drive real results.
                </p>
              </motion.div>

              {/* Right Side: Constellation Quadrant - 2x2 Grid Layout like Stevens.edu */}
              <div className="relative">
                {/* Mobile: Stack vertically */}
                <div className="lg:hidden w-full space-y-stevens-2xl">
                  {/* Star with horizontal lines */}
                  <div className="relative flex items-center justify-center mb-stevens-xl px-stevens-lg">
                    {/* Left line with animation */}
                    <motion.div
                      className="flex-1 h-[1px] bg-[#F9C94E]/40 mr-stevens-md"
                      initial={{ scaleX: 0, originX: 1 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      viewport={{ once: true }}
                    />

                    {/* Star with subtle glow */}
                    <motion.svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="text-[#F9C94E] flex-shrink-0 drop-shadow-[0_0_8px_rgba(249,201,78,0.3)]"
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      transition={{
                        duration: 0.8,
                        delay: 0.4,
                        ease: "easeOut",
                      }}
                      viewport={{ once: true }}
                    >
                      {/* 4-pointed star  - symmetric cross/diamond shape */}
                      <path
                        d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z"
                        fill="currentColor"
                      />
                    </motion.svg>

                    {/* Right line with animation */}
                    <motion.div
                      className="flex-1 h-[1px] bg-[#F9C94E]/40 ml-stevens-md"
                      initial={{ scaleX: 0, originX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      viewport={{ once: true }}
                    />
                  </div>

                  {partnerBenefits.map((benefit, index) => (
                    <motion.div
                      key={benefit.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="text-center px-stevens-md"
                    >
                      <h3 className="font-stevens-display text-stevens-lg font-light uppercase tracking-wide text-stevens-dark-gray mb-stevens-sm">
                        {benefit.title}
                      </h3>
                      <p className="text-stevens-sm text-stevens-dark-gray leading-relaxed">
                        {benefit.description}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Desktop: 2x2 Grid with central star and divider lines */}
                <div className="hidden lg:block relative">
                  {/* 2x2 Grid Container */}
                  <div className="grid grid-cols-2 grid-rows-2 relative">
                    {/* Horizontal divider line with animation */}
                    <motion.div
                      className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[1px] bg-[#F9C94E]/40"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                      viewport={{ once: true }}
                    />

                    {/* Vertical divider line with animation */}
                    <motion.div
                      className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-[#F9C94E]/40"
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                      viewport={{ once: true }}
                    />

                    {/* Central Star at intersection with glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-stevens-white p-1 rounded-full">
                      <motion.svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="text-[#F9C94E] drop-shadow-[0_0_6px_rgba(249,201,78,0.4)]"
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        transition={{
                          duration: 0.8,
                          delay: 0.5,
                          ease: "easeOut",
                        }}
                        viewport={{ once: true }}
                      >
                        {/* 4-pointed star  - symmetric cross/diamond shape */}
                        <path
                          d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z"
                          fill="currentColor"
                        />
                      </motion.svg>
                    </div>

                    {/* Top-Left: Built for Employers */}
                    <motion.div
                      className="p-stevens-lg pr-stevens-xl pb-stevens-xl text-left group cursor-default transition-all duration-300 hover:bg-stevens-light-gray/50 rounded-stevens-md"
                      initial={{ opacity: 0, y: -10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      <h3 className="font-stevens-display text-stevens-xl font-light uppercase tracking-wide text-stevens-dark-gray mb-stevens-sm group-hover:text-stevens-red transition-colors duration-300">
                        Built for Employers
                      </h3>
                      <p className="text-stevens-sm text-stevens-dark-gray leading-relaxed mb-stevens-md">
                        Streamlined partnership setup, custom cohort onboarding,
                        and flexible corporate billing options.
                      </p>
                    </motion.div>

                    {/* Top-Right: Integrated Talent Solutions */}
                    <motion.div
                      className="p-stevens-lg pl-stevens-xl pb-stevens-xl text-left group cursor-default transition-all duration-300 hover:bg-stevens-light-gray/50 rounded-stevens-md"
                      initial={{ opacity: 0, y: -10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      <h3 className="font-stevens-display text-stevens-xl font-light uppercase tracking-wide text-stevens-dark-gray mb-stevens-sm group-hover:text-stevens-red transition-colors duration-300">
                        Integrated Talent Solutions
                      </h3>
                      <p className="text-stevens-sm text-stevens-dark-gray leading-relaxed mb-stevens-md">
                        Learning pathways aligned with your HR and L&D systems
                        for seamless integration.
                      </p>
                    </motion.div>

                    {/* Bottom-Left: Co-Developed Education */}
                    <motion.div
                      className="p-stevens-lg pr-stevens-xl pt-stevens-xl text-left group cursor-default transition-all duration-300 hover:bg-stevens-light-gray/50 rounded-stevens-md"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      viewport={{ once: true }}
                    >
                      <h3 className="font-stevens-display text-stevens-xl font-light uppercase tracking-wide text-stevens-dark-gray mb-stevens-sm group-hover:text-stevens-red transition-colors duration-300">
                        Co-Developed Education
                      </h3>
                      <p className="text-stevens-sm text-stevens-dark-gray leading-relaxed mb-stevens-md">
                        Collaborate directly with Stevens faculty to create
                        skills-based programs that meet your workforce goals.
                      </p>
                    </motion.div>

                    {/* Bottom-Right: Agile by Design */}
                    <motion.div
                      className="p-stevens-lg pl-stevens-xl pt-stevens-xl text-left group cursor-default transition-all duration-300 hover:bg-stevens-light-gray/50 rounded-stevens-md"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      viewport={{ once: true }}
                    >
                      <h3 className="font-stevens-display text-stevens-xl font-light uppercase tracking-wide text-stevens-dark-gray mb-stevens-sm group-hover:text-stevens-red transition-colors duration-300">
                        Agile by Design
                      </h3>
                      <p className="text-stevens-sm text-stevens-dark-gray leading-relaxed mb-stevens-md">
                        Quickly develop and deploy courses or credentials
                        aligned with the latest industry demands.
                      </p>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
                        
        {/* Why Stevens - Statistics */}
        <section
          className="py-stevens-section-sm sm:py-stevens-section md:py-stevens-section-lg lg:py-stevens-section-lg text-stevens-white relative overflow-hidden min-h-[400px] sm:min-h-[500px] md:min-h-[600px] bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(/assets/images/corporate-partners/corporate-partners-stats-background.webp)`,
          }}
        >
          {/* Dark overlay - sufficient opacity for WCAG contrast with white text */}
          <div className="absolute inset-0 bg-stevens-black/20" aria-hidden="true" />

          <div className="max-w-stevens-content-max mx-auto px-4 sm:px-stevens-md md:px-stevens-lg lg:px-stevens-lg relative z-10 py-8 sm:py-12 md:py-16 lg:py-20">
            {/* Header with enhanced typography */}
            <motion.div
              className="text-center mb-8 sm:mb-stevens-xl md:mb-stevens-2xl lg:mb-stevens-3xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="font-stevens-display text-2xl sm:text-stevens-2xl md:text-stevens-3xl lg:text-stevens-4xl font-light uppercase tracking-wide mb-4 sm:mb-stevens-md md:mb-stevens-lg text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.8)]">
                A University Built for the Future of Work
              </h2>
              <p className="text-sm sm:text-stevens-sm md:text-stevens-base lg:text-stevens-lg max-w-3xl mx-auto text-white leading-relaxed px-2 sm:px-0 [text-shadow:0_1px_2px_rgba(0,0,0,0.6)]">
                At Stevens, academic rigor meets real-world application. Our
                online programs empower professionals to lead with confidence in
                a technology-driven world and deliver measurable results for
                your organization.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
              {stevensStats.map((stat, index) => (
                <StatCard key={stat.label} stat={stat} index={index} />
              ))}
            </div>
          </div>
        </section>
         
       {/* Trust Signals - Company Logos Marquee */}
       <LogoMarqueeSection
          heading="Trusted by Fortune 500 companies and industry leaders"
          logos={partnerCompanies}
          animationDuration={25}
          pauseOnHover={true}
          invertLogos={false}
        />
        {/* What We Offer */}
        <section className="py-stevens-section-sm lg:py-stevens-section bg-white">
          <div className="max-w-stevens-content-max mx-auto px-stevens-md lg:px-stevens-lg">
            <div className="text-center mb-stevens-2xl">
              <h2 className="font-stevens-display text-stevens-3xl md:text-stevens-4xl font-light uppercase tracking-wide text-stevens-black mb-stevens-md">
                Co-Design Workforce Education That Fits Your Organization
              </h2>
              <p className="text-stevens-lg text-stevens-dark-gray max-w-3xl mx-auto">
                Every organization's needs are unique. Stevens partners with you
                to build tailored learning experiences that align directly to
                your talent strategy and business goals.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-stevens-lg">
              {offerings.map((offering, index) => {
                const Icon = offering.icon;
                return (
                  <motion.div
                    key={offering.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)]"
                  >
                    <div className="bg-stevens-light-gray/30 rounded-stevens-lg p-stevens-lg h-full border border-stevens-light-gray shadow-stevens-md hover:shadow-stevens-lg hover:border-stevens-gray/50 transition-all duration-stevens-normal transform group-hover:-translate-y-1">
                      <div className="flex items-start space-x-stevens-md">
                        <div className="w-12 h-12 bg-stevens-light-gray rounded-stevens-md flex items-center justify-center flex-shrink-0 group-hover:bg-stevens-black transition-colors">
                          <Icon className="w-6 h-6 text-stevens-black group-hover:text-white transition-colors" />
                        </div>
                        <div>
                          <h3 className="font-stevens-display text-stevens-lg font-light uppercase tracking-wide text-stevens-dark-gray mb-stevens-sm">
                            {offering.title}
                          </h3>
                          <p className="text-stevens-dark-gray">
                            {offering.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
        
        {/* Areas of Expertise - Employment Growth Chart */}
        <section className="py-stevens-section-sm lg:py-stevens-section bg-white">
          <div className="max-w-stevens-content-max mx-auto px-stevens-md lg:px-stevens-lg">
            <div className="text-center mb-stevens-2xl">
              <h2 className="font-stevens-display text-stevens-3xl md:text-stevens-4xl font-light uppercase tracking-wide text-stevens-black mb-stevens-md">
                Build Expertise in High-Demand Fields
              </h2>
              <p className="text-stevens-lg text-stevens-dark-gray max-w-3xl mx-auto">
                Develop your workforce&apos;s technical and leadership
                capabilities in disciplines shaping the future.
              </p>
            </div>

            <div className="grid lg:grid-cols-[1.2fr_1fr] gap-stevens-2xl lg:gap-stevens-3xl items-start">
              {/* Left: Bar Chart */}
              <div className="order-2 lg:order-1">
                <EmploymentGrowthChart />
              </div>

              {/* Right: Explanatory Text */}
              <div className="order-1 lg:order-2 mt-stevens-xl lg:mt-0 lg:border-l lg:border-stevens-light-gray lg:pl-stevens-2xl">
                <div className="bg-stevens-light-gray/30 rounded-stevens-xl p-stevens-xl border border-stevens-light-gray shadow-stevens-md">
                  <div className="mb-stevens-md">
                    <h3 className="font-stevens-display text-stevens-2xl md:text-stevens-3xl font-light uppercase tracking-wide text-stevens-dark-gray mb-stevens-md">
                      Prepare for Careers Growing Faster Than Average
                    </h3>
                  </div>

                  <div className="space-y-stevens-md text-stevens-base md:text-stevens-lg leading-relaxed md:leading-loose">
                    <p className="text-stevens-dark-gray">
                      The fields shown are projected to grow{" "}
                      <span className="font-stevens-bold text-stevens-red">
                        significantly faster
                      </span>{" "}
                      than the average occupation through 2034, according to the
                      U.S. Bureau of Labor Statistics.
                    </p>
                    <p className="text-stevens-dark-gray">
                      Stevens programs, delivered through our College of
                      Professional Education, are designed to align with this
                      industry demand, equipping your workforce with the{" "}
                      <span className="font-stevens-semibold text-stevens-dark-gray">
                        technical depth and practical skills
                      </span>{" "}
                      employers need to stay competitive in a rapidly evolving
                      landscape.
                    </p>
                    <p className="text-stevens-sm md:text-stevens-base text-stevens-dark-gray italic border-l-2 border-stevens-light-gray pl-stevens-md">
                      By investing in these high-growth disciplines, you&apos;re
                      positioning your organization to lead in AI, data, and
                      emerging technologies.
                    </p>

                    {/* CTA Button to Explore Programs */}
                    <div className="mt-stevens-xl pt-stevens-md border-t border-stevens-light-gray">
                      <Link to="/explore-programs/#explore-programs">
                        <Button variant="default" className="gap-2">
                          <GraduationCap className="w-5 h-5" />
                          Explore Our Programs
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                      <p className="text-stevens-sm text-stevens-light-gray0 mt-stevens-sm">
                        Browse masters degrees and certificates available for
                        your workforce
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Success Stories / Testimonials */}
        <PullQuoteTestimonial testimonial={testimonials[0]} />

        {/* FAQ Section */}
        <EmployerFaqSection accordionPrefix="corporate-partners" />

        {/* Final CTA Section */}
        <section className="py-stevens-section-sm lg:py-stevens-section bg-stevens-dark-gray text-stevens-white">
          <div className="max-w-stevens-content-max mx-auto px-stevens-md lg:px-stevens-lg">
            <div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="font-stevens-display text-stevens-3xl md:text-stevens-4xl font-light uppercase tracking-wide mb-stevens-md">
                Ready to Build the Future of Work Together?
              </h2>
              <p className="text-stevens-lg mb-stevens-xl max-w-2xl mx-auto">
                Partner with Stevens to upskill your workforce in data
                science, AI, and beyond.
              </p>

              <div className="flex flex-col sm:flex-row gap-stevens-md justify-center">
                <Button
                  size="lg"
                  variant="outline-white"
                  className="w-full sm:w-auto min-w-[280px]"
                  onClick={() => {
                    handleCTAClick("request_info_footer");
                    setShowContactModal(true);
                  }}
                >
                  Request Information
                </Button>
                <Button
                  size="lg"
                  variant="outline-white"
                  className="w-full sm:w-auto min-w-[280px]"
                  onClick={() => {
                    handleCTAClick("schedule_consultation_footer");
                    setShowContactOptionsModal(true);
                  }}
                >
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Request Information Modal */}
        <RequestInfoModal
          isOpen={showContactModal}
          onClose={() => setShowContactModal(false)}
          sourcePage="corporate_partners_page"
          programOfInterest="CORP"
          title="Let's Discuss Your Workforce Development Needs"
          additionalUrlParams={{
            formType: "corporate_partnership",
            source: "corporate_partners_page",
          }}
        />

        {/* Contact Options Modal */}
        <ContactOptionsModal
          open={showContactOptionsModal}
          onOpenChange={setShowContactOptionsModal}
          sourcePage="corporate_partners"
        />
      </div>
    </PageContextProvider>
  );
};

export default CorporatePartners;
