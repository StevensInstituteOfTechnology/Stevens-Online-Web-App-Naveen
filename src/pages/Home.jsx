import React, { useState, useEffect, useRef } from "react";
import { Program } from "@/api/entities";
import { Event } from "@/api/entities";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import {
  createPageUrl,
  setPageTitle,
  setMetaDescription,
  setOpenGraphTags,
  buildCanonicalUrl,
} from "@/utils";
import {
  getHeroImageProps,
  getContentImageProps,
  getCardImageProps,
} from "@/utils/responsiveImage";
import {
  Asterism,
  AnimatedSection,
  AngledImage,
  AngledImageStack,
  AngledContainer,
  CarouselNavButton,
} from "@/components/shared";
import { BlogCarousel } from "@/components/blog";
import {
  GraduationCap,
  Users,
  Globe,
  Award,
  ArrowRight,
  Star,
  TrendingUp,
  PlayCircle,
  Library,
  BookOpen,
  X,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  SkipBack,
  SkipForward,
  User,
  Clock,
  Calendar,
  DollarSign,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { motion } from "framer-motion";

import LeadCaptureForm from "../components/forms/LeadCaptureForm";
import {
  ProgramCard,
  VideoPlayer,
  ParallaxImage,
  RequestInfoModal,
} from "@/components/shared";
import ProgramReadinessAssessment from "../components/assessment/ProgramReadinessAssessment";
import { trackConversion, CONVERSION_LABELS } from "@/utils/gtmTracking";
import { KEY_DATES } from "@/config/constants";
import { usePageTracking } from "@/hooks/analytics/usePageTracking";
import { PageContextProvider } from "@/contexts/analytics/PageContext";

const StatItem = ({ value, label, icon: Icon }) => (
  <div className="text-center flex flex-col items-center justify-center">
    <Icon className="w-10 h-10 mx-auto mb-3" />
    <div className="text-3xl font-stevens-headers font-bold">{value}</div>
    <div className="uppercase tracking-wider text-stevens-base">{label}</div>
  </div>
);

// NEW DATA and COMPONENTS for the redesigned rankings section
const textRankings = [
  {
    value: "#1",
    description: "Online MBA from a New Jersey school in 2025",
    source: "U.S. News & World Report",
  },
  {
    value: "#1",
    description: "No. 1 in New Jersey for Graduate Earnings",
    source: "U.S. Department of Education College Scorecard (2025)",
  },
  {
    value: "7x",
    description:
      "Winner of the 21st Century Award for Best Practices in Distance Learning",
    source: "USDLA",
  },

  {
    value: "#9",
    description: "Ranks No. 9 among 'Best ROI Colleges'",
    source: "*Based on the cost of a four-year bachelor's degree program",
  },
];

const badgeRankings = [
  {
    image: "/assets/rankings/ranking-badge-1.webp",
    description:
      "No. 1 in New Jersey in Best Online Master's in Computer Information Technology Programs",
  },
  {
    image: "/assets/rankings/ranking-badge-2.webp",
    description: "No. 1 in New Jersey in Best Online MBA Programs",
  },
  {
    image: "/assets/rankings/ranking-badge-3.webp",
    description: "No. 36 Nationally in Best Online Engineering Programs",
  },
];

// Program showcase carousel data with real program information
const programShowcaseData = [
  {
    id: 1,
    title: "Computer Science",
    subtitle: "MASTER OF SCIENCE",
    image:
      "/assets/images/mscs/stv-blog-artificial-intelligence-and-innovation-in-engineering-management.webp",
    url: "online-masters-computer-science-mscs/",
    stats: {
      credits: "30",
      duration: "18-24 mo",
    },
    highlights: ["99% Employment Rate", "No GRE Required", "#1 in New Jersey"],
  },
  {
    id: 2,
    title: "Business Administration",
    subtitle: "MBA",
    image: "/assets/images/mba/1-omba-hero-scaled.webp",
    url: "online-mba/",
    stats: {
      credits: "36",
      duration: "18-24 mo",
    },
    highlights: ["AACSB Accredited", "100% Online", "No GMAT Required"],
  },
  {
    id: 3,
    title: "Engineering Management",
    subtitle: "MASTER OF ENGINEERING",
    image: "/assets/images/mem/1-mem-hero-scaled.webp",
    url: "online-masters-engineering-management/",
    stats: {
      credits: "30",
      duration: "18-24 mo",
    },
    highlights: ["100% Online", "No GRE Required", "Top 20 Career Placement"],
  },
  {
    id: 4,
    title: "Applied Data Science",
    subtitle: "MASTER OF ENGINEERING",
    image: "/assets/images/meads/stevens-manhattan-skyline-ds.webp",
    url: "online-masters-engineering-applied-data-science/",
    stats: {
      credits: "30",
      duration: "2 years",
    },
    highlights: [
      "99% Employment Rate",
      "AI-Driven Curriculum",
      "Industry Projects",
    ],
  },
  {
    id: 5,
    title: "Enterprise AI",
    subtitle: "GRADUATE CERTIFICATE",
    image:
      "/assets/images/certificate-enterprise-ai/certificate-enterpriseAI-1.webp",
    url: "certificates/enterprise-ai/",
    stats: {
      credits: "9",
      duration: "16-24 wks",
    },
    highlights: [
      "$5,250 Total Cost",
      "Stackable to Masters",
      "No CS Background Needed",
    ],
  },
  {
    id: 6,
    title: "Applied Data Science Foundations",
    subtitle: "GRADUATE CERTIFICATE",
    image:
      "/assets/images/certificate-applied-data-science/certificate-ADS-1.webp",
    url: "certificates/applied-data-science-foundations/",
    stats: {
      credits: "9",
      duration: "16-24 wks",
    },
    highlights: [
      "$5,250 Total Cost",
      "AI-First Curriculum",
      "Portfolio Projects",
    ],
  },
];

const TextRankingItem = ({ value, description, source }) => (
  <div className="flex items-center gap-stevens-md py-stevens-md border-b border-stevens-light-gray last:border-b-0">
    <p className="font-stevens-display text-stevens-4xl font-stevens-bold text-stevens-red w-36 shrink-0 text-center leading-none">
      {value}
    </p>
    <div>
      <p className="text-stevens-lg font-stevens-semibold text-stevens-dark-gray leading-relaxed">
        {description}
      </p>
      {source && (
        <p className="text-stevens-base text-stevens-dark-gray mt-stevens-xs italic">
          {source}
        </p>
      )}
    </div>
  </div>
);

const BadgeRankingItem = ({ image, description }) => (
  <div className="flex items-center gap-stevens-md p-stevens-md bg-stevens-white rounded-stevens-md shadow-stevens-md hover:shadow-stevens-lg transition-all duration-stevens-normal border border-stevens-light-gray hover:border-stevens-light-gray">
    <div className="relative">
      <img
        src={image}
        alt="Ranking Badge"
        className="w-20 h-20 shrink-0 object-contain"
        loading="lazy"
      />
    </div>
    <div className="flex-1">
      <p className="text-stevens-lg font-stevens-semibold text-stevens-dark-gray leading-relaxed">
        {description}
      </p>
    </div>
  </div>
);

export default function Home() {
  usePageTracking({
    pageType: "home",
    additionalData: {
      page_name: "Homepage",
      has_embedded_form: true,
      has_quiz: true,
      has_video: true,
    },
  });

  const [programs, setPrograms] = useState([]);
  const [events, setEvents] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [showBrowseModal, setShowBrowseModal] = useState(false); // State for modal visibility
  const [showRequestInfoModal, setShowRequestInfoModal] = useState(false); // State for Request Info modal
  const [showAssessment, setShowAssessment] = useState(false); // State for assessment toggle
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );

  // Program showcase filter state
  // Default: Both unchecked = show all programs
  const [mastersChecked, setMastersChecked] = useState(false);
  const [certificatesChecked, setCertificatesChecked] = useState(false);

  // Program carousel nav button active state (for dashed circle effect)
  const [programNavActiveButton, setProgramNavActiveButton] = useState(null);
  const programNavButtonsRef = useRef(null);

  // Generate a unique key that changes when filters change
  // This forces React to re-mount the carousel and re-trigger animations
  const filterKey = `${mastersChecked}-${certificatesChecked}`;

  // Filter program showcase data based on selected filters
  const filteredProgramShowcaseData = programShowcaseData.filter((program) => {
    const isMasters =
      program.subtitle.includes("MASTER") || program.subtitle.includes("MBA");
    const isCertificate = program.subtitle.includes("CERTIFICATE");

    // If no filter selected, show all programs
    if (!mastersChecked && !certificatesChecked) return true;
    // If filter(s) selected, show matching programs
    if (mastersChecked && isMasters) return true;
    if (certificatesChecked && isCertificate) return true;
    return false;
  });

  // Track window width for responsive Asterism
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Clear program nav active button when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        programNavButtonsRef.current &&
        !programNavButtonsRef.current.contains(e.target)
      ) {
        setProgramNavActiveButton(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Application Support Events (reuse same content as Events page)
  const supportEvents = [
    {
      title: "Application Overview: Online MBA",
      length: "15 minutes",
      url: "https://event.on24.com/wcc/r/4670707/F1184BBC4542A137E5E8852AA0FF2DBE",
      image: "/assets/images/home/2-event.webp",
    },
    {
      title: "Application Walkthrough: Computer Science",
      length: "10 minutes",
      url: "https://event.on24.com/wcc/r/4455092/4C10B1C30D8D20926A28C1A21C667A29",
      image: "/assets/images/home/3-event.webp",
    },
    {
      title: "Application Walkthrough: Engineering Management",
      length: "24 minutes",
      url: "https://event.on24.com/wcc/r/5056716/2FEBB6A6A455A2CCC508FB1183A71810",
      image: "/assets/images/home/4-event.webp",
    },
  ];

  useEffect(() => {
    async function loadData() {
      const [programsData, eventsData] = await Promise.all([
        Program.list("-created_date", 3),
        Event.filter({ status: "upcoming" }, "-date", 3),
      ]);
      setPrograms(programsData);
      setEvents(eventsData);
      // Load recent blog posts
      try {
        const blogsData = await import("@/data/blogs.json");
        const recentBlogs = blogsData.posts.slice(0, 5);
        setBlogs(recentBlogs);
      } catch (error) {
        console.error("Error loading blogs:", error);
      }
    }
    loadData();
  }, []);

  // Set SEO meta tags
  useEffect(() => {
    setPageTitle("Explore Online Master's Programs | Stevens Online");
    setMetaDescription(
      "Explore accredited online master's programs from Stevens Institute of Technology. Earn your degree 100% online with expert faculty and flexible options."
    );
    setOpenGraphTags({
      title: "Explore Online Master's Programs | Stevens Online",
      description:
        "Explore accredited online master's programs from Stevens Institute of Technology. Earn your degree 100% online with expert faculty and flexible options.",
      image: buildCanonicalUrl("/assets/logos/stevens-crest.webp"),
      url: buildCanonicalUrl("/"),
      type: "website",
    });
  }, []);

  return (
    <PageContextProvider pageType="home" pageName="Homepage">
      <div className="font-sans">
        {/* Hero Section - negative margin pulls it up behind the fixed navbar */}
        <section className="relative h-[900px] bg-stevens-black text-stevens-white overflow-hidden -mt-[87px] pt-[87px]">
          <img
            {...getHeroImageProps("/assets/images/home/HEADER-0865.webp", {
              widths: [640, 1024, 1280, 1920],
            })}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover "
            fetchpriority="high"
            loading="eager"
            decoding="async"
          />
          {/* Left-to-right gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-stevens-black/100 via-stevens-black/30 to-transparent"></div>

          {/* Bottom fade-to-black overlay - blends into next section */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0) 45%, rgba(0,0,0,0.65) 75%, rgba(0,0,0,1) 100%)",
            }}
          />

          {/* CPE Logo Area - Left side with backdrop blur (per Brand Guidelines) */}
          {/* Using mask-image gradient to fade the blur edges for a softer transition */}
          <div
            className="absolute left-0 top-0 h-full w-[380px] lg:w-[380px] z-20 hidden md:flex flex-col items-center justify-center backdrop-blur-md"
            style={{
              maskImage:
                "linear-gradient(to right, black 0%, black 60%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, black 0%, black 60%, transparent 100%)",
            }}
          >
            <img
              src="/assets/logos/Stevens-CPE-logo-RGB_Primary-WHT.png"
              alt="Stevens College of Professional Education"
              className="w-[180px] lg:w-[220px] h-auto -mt-[200px]"
            />
          </div>

          {/* Asterism overlay - CPE Brand Visual Element */}
          {/* Center point aligned with vertical separator for cohesive design */}
          <Asterism
            centerX="33%"
            centerY="68%"
            rays={5}
            angles={[25, 90, 205, 270, 335]}
            color="stevens-white"
            opacity={0.7}
            rayLengths={["full", "full", "full", "full", 300]}
            fadeRays={[0, 4]}
            fadeDirection="out"
            fadeOpacity={0}
            length="full"
            minLength={300}
            maxLength={1800}
            animate={true}
            animationType="radiate"
            animationDuration={1200}
            animationDelay={300}
            staggerDelay={150}
          />

          <div className="relative min-h-[85vh] w-full px-stevens-md sm:px-stevens-lg lg:px-stevens-xl  flex flex-col justify-end items-end">
            {/* Hero Content - Right Bottom (per CPE Brand Guidelines) */}
            <div className="max-w-2xl text-right pr-4 lg:pr-16">
              <h1 className="font-stevens-headers text-5xl md:text-6xl lg:text-7xl font-light leading-tight mb-4 text-stevens-white">
                Move your
                <br />
                career forward
              </h1>
              <p className="font-stevens-body text-base md:text-xl text-stevens-white mb-6">
                A flexible, tailored education that drives competitive advantage
              </p>
              <Link
                to="/request-information/"
                onClick={() => trackConversion(CONVERSION_LABELS.REQUEST_INFO)}
              >
                <Button variant="outline-red" className="uppercase">
                  Request Information
                </Button>
              </Link>
            </div>
          </div>
        </section>
        {/* Dimensional Imagery Section - CPE Brand Guidelines */}
        <section className="bg-stevens-black py-stevens-section-sm lg:py-stevens-section relative overflow-hidden">
          {/* Content container - z-10 to stay below asterism */}
          <div className="mx-auto px-stevens-md lg:px-stevens-lg relative z-40">
            <div className="grid lg:grid-cols-2 gap-stevens-gap-lg items-center">
              {/* Left: Layered Images */}
              <AnimatedSection>
                <AngledImageStack className="h-[600px] lg:h-[800px] relative">
                  {/* Background layer - larger */}
                  <AngledImage
                    src="/assets/images/shared/3-explore-msds.webp"
                    alt="Student studying"
                    direction="vertical-left"
                    width="100%"
                    height="600px"
                    translateY={0}
                    translateX={5}
                    className="absolute top-0 left-0 "
                  />
                  {/* Foreground layer - smaller, overlapping */}
                  <AngledImage
                    src="/assets/images/shared/2-explore-msds.webp"
                    alt="Campus life"
                    direction="vertical-right"
                    // height="500px"
                    translateY={6}
                    translateX={15}
                    className="absolute bottom-0 right-0 w-[60%] sm:w-[55%] lg:w-[70%] h-[280px] sm:h-[300px] lg:h-[450px]"
                  />
                </AngledImageStack>
              </AnimatedSection>

              {/* Right: Content */}
              <AnimatedSection
                delay={0.2}
                className="text-stevens-white pb-stevens-xl"
              >
                <h2 className="font-stevens-display text-4xl lg:text-5xl font-light tracking-tight mb-stevens-lg ">
                  Expanding and building on{" "}
                  <span className="text-stevens-red">150 years</span> of
                  exceptional technology education
                </h2>
                <p className="text-stevens-white text-stevens-lg mb-stevens-xl leading-relaxed">
                  For more than a century, Stevens has delivered worldclass,
                  technology-focused education that meets the moment. The
                  College of Professional Education is an exciting new chapter -
                  the chance for a whole new generation of working professionals
                  to experience Stevens technology leadership and excellence.
                </p>
              </AnimatedSection>
            </div>
          </div>

          {/* Asterism overlay - AFTER content, z-20 to be on top */}
          <Asterism
            className="z-10"
            centerX="33%"
            centerY="55%"
            rays={2}
            angles={[90, 270]}
            color="stevens-white"
            opacity={0.7}
            rayLengths={["full", windowWidth < 1024 ? 10 : 300]}
            fadeRays={[]} // Disable fading for vertical lines to ensure seamless connection with Hero section
            fadeDirection="out"
            length="full"
            minLength={10}
            maxLength={1800}
            animate={true}
            animationType="radiate"
            animationDuration={1200}
            animationDelay={300}
            staggerDelay={150}
          />
        </section>

        {/* Stats Bar */}
        {/* <AnimatedSection className="section-dark py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatItem
              value="#9"
              label="Best ROI Colleges"
              icon={Award}
            />
            <StatItem value="#1" label="Graduate Earnings (NJ)" icon={DollarSign} />
            <StatItem
              value="Top 10%"
              label="Return on Investment"
              icon={TrendingUp}
            />
            <StatItem value="150+" label="Years of Innovation" icon={Library} />
          </div>
        </div>
      </AnimatedSection> */}

        {/* Old Redesigned Rankings & Proof Points Section - TODO: Remove after testing */}
        {/* <section className="bg-stevens-light-gray py-stevens-section-sm lg:py-stevens-section">
        <div className="max-w-stevens-content-max mx-auto px-stevens-md lg:px-stevens-lg">
          <AnimatedSection className="text-center mb-stevens-xl">
            <h2 className="font-stevens-display text-4xl lg:text-5xl font-bold text-stevens-dark-gray mb-stevens-lg tracking-tight leading-tight">
              A Degree That <span className="text-stevens-red">Pays Dividends</span>
            </h2>
            <p className="text-stevens-xl text-stevens-dark-gray max-w-3xl mx-auto">
              Stevens is consistently recognized for academic excellence and
              delivering an outstanding return on investment.
            </p>
          </AnimatedSection>
          
          <div className="grid lg:grid-cols-2 gap-x-stevens-gap-lg gap-y-stevens-xl items-center">
            <AnimatedSection>
              <div className="flex flex-col gap-stevens-xs">
                {textRankings.map((point, index) => (
                <TextRankingItem key={index} {...point} />
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="flex flex-col gap-stevens-md">
                {badgeRankings.map((ranking, index) => (
                <BadgeRankingItem key={index} {...ranking} />
                ))}
                <p className="text-center font-stevens-semibold text-stevens-dark-gray mt-stevens-sm italic">
                  Source: U.S. News & World Report 2025
                </p>
              </div>
            </AnimatedSection>
          </div>

          
        </div>
      </section> */}

        {/* THE STEVENS ONLINE ADVANTAGE */}
        <section className="py-stevens-section-sm lg:py-stevens-section bg-stevens-black relative overflow-hidden">
          {/* Subtle background decoration */}

          <div className="max-w-7xl mx-auto px-stevens-md lg:px-stevens-lg">
            {/* Section Header - Full Width */}
            <AnimatedSection className="mb-8 lg:mb-12">
              <h2 className="font-stevens-display text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
                THE STEVENS ONLINE ADVANTAGE
              </h2>
            </AnimatedSection>

            <div className="grid lg:grid-cols-3 gap-stevens-gap-lg items-center">
              <AnimatedSection className="relative lg:col-span-2">
                <div className="bg-stevens-white rounded-stevens-md overflow-hidden shadow-stevens-lg border border-white/20">
                  {/* Video Player Component */}
                  <VideoPlayer
                    src="/assets/videos/Stevens Online Home - 1.mp4"
                    poster="/assets/videos/video-cover-3.avif"
                    title=""
                    showControls={true}
                    muted={true}
                  />
                </div>
              </AnimatedSection>

              <AnimatedSection>
                <h3 className="font-stevens-display text-2xl lg:text-3xl font-bold text-white mb-6 leading-tight">
                  Delivering the outcomes that drive career success
                </h3>

                <p className="text-stevens-lg text-white/80 mb-8 leading-relaxed">
                  The College of Professional Education is much more than
                  courses and credentials - it's a powerful new model centered
                  on giving working professionals at every stage of their
                  careers the unique mix of skills and qualifications they need
                  to excel in today's complex global economy.
                </p>

                {/* CTA Link */}
                <Link
                  to="/online-learning-experience/"
                  className="inline-flex items-center text-stevens-red font-bold hover:underline underline-offset-4 group"
                >
                  Discover the online experience
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </AnimatedSection>
            </div>
          </div>
        </section>
        {/* Parallax Fixed Background Section */}
        <ParallaxImage
          src="/assets/images/shared/1-explore-msds.webp"
          className="h-[256px] lg:h-[350px]"
        />

        {/* Background section that continues below parallax */}
        <section className="relative bg-stevens-black pt-1 ">
          {/* Overlapping Card - negative margin pulls it up into parallax section */}
          {/* By the Numbers - Dark Mode Premium Design */}
          <div className="relative z-10 mx-auto max-w-7xl bg-stevens-black -mt-16  px-8 pt-16 lg:px-16 lg:pt-24 scale-[0.90] origin-top">
            {/* Hero Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center pb-12 lg:pb-16"
            >
              <h2 className="font-stevens-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold italic text-stevens-red leading-tight tracking-tight">
                #1 In NJ for
                <br />
                Graduate Earnings
              </h2>
            </motion.div>

            {/* Horizontal Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
              viewport={{ once: true }}
              className="w-full h-px bg-[#333333] origin-center"
            />

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3">
              {/* Stat 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-center py-12 lg:py-16 px-4 flex flex-col justify-between min-h-[280px] border-b md:border-b-0 md:border-r border-[#333333]"
              >
                <div>
                  <p className="font-stevens-display text-7xl sm:text-8xl lg:text-9xl font-bold text-white leading-none tracking-tight mb-6">
                    #1
                  </p>
                  <p className="font-stevens-headers text-sm sm:text-base lg:text-lg font-bold text-white uppercase tracking-wider leading-tight">
                    Online MBA
                    <br />
                    from a New
                    <br />
                    Jersey School
                  </p>
                </div>
                <p className="text-[10px] sm:text-xs text-[#999999] uppercase tracking-wider mt-6">
                  U.S. News & World Report 2025
                </p>
              </motion.div>

              {/* Stat 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                viewport={{ once: true }}
                className="text-center py-12 lg:py-16 px-4 flex flex-col justify-between min-h-[280px] border-b md:border-b-0 md:border-r border-[#333333]"
              >
                <div>
                  <p className="font-stevens-display text-7xl sm:text-8xl lg:text-9xl font-bold text-white leading-none tracking-tight mb-6">
                    7x
                  </p>
                  <p className="font-stevens-headers text-sm sm:text-base lg:text-lg font-bold text-white uppercase tracking-wider leading-tight">
                    Winner of
                    <br />
                    21st Century
                    <br />
                    Award
                  </p>
                </div>
                <p className="text-[10px] sm:text-xs text-[#999999] uppercase tracking-wider mt-6">
                  USDLA Distance Learning
                </p>
              </motion.div>

              {/* Stat 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                viewport={{ once: true }}
                className="text-center py-12 lg:py-16 px-4 flex flex-col justify-between min-h-[280px]"
              >
                <div>
                  <p className="font-stevens-display text-7xl sm:text-8xl lg:text-9xl font-bold text-white leading-none tracking-tight mb-6">
                    #9
                  </p>
                  <p className="font-stevens-headers text-sm sm:text-base lg:text-lg font-bold text-white uppercase tracking-wider leading-tight">
                    Among 'Best
                    <br />
                    ROI Colleges'
                  </p>
                </div>
                <p className="text-[10px] sm:text-xs text-[#999999] uppercase tracking-wider mt-6">
                  Based on 4-year degree cost
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Program Showcase Carousel Section */}
        <section className="bg-stevens-black relative  lg:pt-stevens-section">
          <div className="flex flex-col lg:flex-row pb-16">
            {/* Left Content Panel */}
            <div className="lg:w-[35%] xl:w-[30%] bg-stevens-black px-8 py-16 lg:px-12 lg:py-24 flex flex-col justify-center">
              <AnimatedSection>
                <h2 className="font-stevens-display text-4xl lg:text-5xl font-bold text-stevens-white mb-6 leading-tight">
                  Our Programs
                </h2>
                <p className="text-stevens-white text-lg mb-8 leading-relaxed">
                  Discover world-class online graduate programs designed for
                  working professionals seeking to advance their careers.
                </p>
                <Link to={createPageUrl("admissions/") + "#explore-programs"}>
                  <Button
                    variant="outline-white"
                    className="uppercase text-stevens-white"
                  >
                    See all programs
                  </Button>
                </Link>
              </AnimatedSection>
            </div>

            {/* Right Carousel Panel */}
            <div className="lg:w-[65%] xl:w-[70%] relative">
              <div className="flex flex-col justify-between h-full">
                <motion.div
                  key={filterKey}
                  id="program-carousel"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8 pt-8 lg:pt-16 lg:pb-16 px-6 lg:pl-0 lg:pr-12"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  {filteredProgramShowcaseData.map((program, index) => (
                    <Link
                      key={program.id}
                      to={createPageUrl(program.url)}
                      className="flex-shrink-0 w-[345px] sm:w-[400px] lg:w-[460px] snap-start group"
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="relative h-[450px] lg:h-[500px] overflow-hidden"
                      >
                        {/* Card Image */}
                        <img
                          src={program.image}
                          alt={program.title}
                          className="w-full h-full object-cover  transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        {/* Gradient Overlay */}
                        {/* <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" /> */}

                        {/* Label Box - Expandable on hover */}
                        <div className="absolute bottom-0 left-8 right-8 bg-white p-6 transform translate-y-2 group-hover:translate-y-[-10px] transition-all duration-300 ease-out shadow-xl">
                          <p className="text-stevens-gray text-xs font-bold uppercase tracking-wider mb-1">
                            {program.subtitle}
                          </p>
                          <h3 className="font-stevens-display text-xl font-bold text-stevens-dark-gray group-hover:text-stevens-red transition-colors mb-0 group-hover:mb-4">
                            {program.title}
                          </h3>

                          {/* Expanded content - hidden by default, shown on hover */}
                          <div className="max-h-0 overflow-hidden group-hover:max-h-[200px] transition-all duration-300 ease-out">
                            <div className="pt-4 border-t border-gray-200">
                              {/* Program stats - dynamic from program data */}
                              <div className="flex gap-4 mb-3 text-sm">
                                <div>
                                  <span className="text-stevens-gray">
                                    Credits:
                                  </span>
                                  <span className="font-semibold text-stevens-dark-gray ml-1">
                                    {program.stats?.credits || "30"}
                                  </span>
                                </div>
                                <div>
                                  <span className="text-stevens-gray">
                                    Duration:
                                  </span>
                                  <span className="font-semibold text-stevens-dark-gray ml-1">
                                    {program.stats?.duration || "18-24 mo"}
                                  </span>
                                </div>
                              </div>

                              {/* Key highlights - dynamic from program data */}
                              <ul className="text-sm text-stevens-gray space-y-1 mb-4">
                                {program.highlights
                                  ?.slice(0, 3)
                                  .map((highlight, i) => (
                                    <li
                                      key={i}
                                      className="flex items-center gap-2"
                                    >
                                      <span className="w-1.5 h-1.5 bg-stevens-red rounded-full flex-shrink-0"></span>
                                      {highlight}
                                    </li>
                                  ))}
                              </ul>

                              {/* CTA hint */}
                              <Button
                                variant="link"
                                size="sm"
                                className="p-0 h-auto"
                              >
                                Learn more
                                <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  ))}

                  {/* Compare Programs - Slim Vertical Link */}
                  <a
                    href="/compare-our-programs/#compare-programs"
                    className="flex-shrink-0 w-[120px] snap-start group"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: programShowcaseData.length * 0.1,
                      }}
                      viewport={{ once: true }}
                      className="h-[450px] lg:h-[500px] flex flex-col items-center justify-center text-center px-4"
                    >
                      <h3 className="font-stevens-display text-lg font-bold text-stevens-white group-hover:text-stevens-red transition-colors duration-300 leading-tight mb-6">
                        Compare
                        <br />
                        Programs
                      </h3>

                      {/* Arrow */}
                      <ArrowRight className="w-5 h-5 text-stevens-white/40 group-hover:text-stevens-red group-hover:translate-x-1 transition-all duration-300" />
                    </motion.div>
                  </a>
                </motion.div>
                {/* Carousel Controls: Filters + Navigation */}
                <div className="px-6 lg:px-24 flex items-center justify-between gap-4">
                  {/* Left: Filter Checkboxes (same style as Admission page) */}
                  <div className="flex flex-wrap gap-4 lg:gap-6 items-center">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="masters-filter"
                        checked={mastersChecked}
                        onCheckedChange={(checked) =>
                          setMastersChecked(checked)
                        }
                        className="border-stevens-white/50 data-[state=checked]:bg-stevens-white data-[state=checked]:text-stevens-black"
                      />
                      <Label
                        htmlFor="masters-filter"
                        className="text-stevens-white text-sm lg:text-base font-medium cursor-pointer"
                      >
                        Masters
                      </Label>
                    </div>

                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="certificates-filter"
                        checked={certificatesChecked}
                        onCheckedChange={(checked) =>
                          setCertificatesChecked(checked)
                        }
                        className="border-stevens-white/50 data-[state=checked]:bg-stevens-white data-[state=checked]:text-stevens-black"
                      />
                      <Label
                        htmlFor="certificates-filter"
                        className="text-stevens-white text-sm lg:text-base font-medium cursor-pointer"
                      >
                        Certificates
                      </Label>
                    </div>
                  </div>

                  {/* Right: Navigation Arrows */}
                  <div ref={programNavButtonsRef} className="flex gap-4">
                    <CarouselNavButton
                      direction="prev"
                      onClick={() => {
                        setProgramNavActiveButton("prev");
                        const carousel =
                          document.getElementById("program-carousel");
                        if (carousel)
                          carousel.scrollBy({
                            left: -1000,
                            behavior: "smooth",
                          });
                      }}
                      isActive={programNavActiveButton === "prev"}
                      variant="dark"
                    />
                    <CarouselNavButton
                      direction="next"
                      onClick={() => {
                        setProgramNavActiveButton("next");
                        const carousel =
                          document.getElementById("program-carousel");
                        if (carousel)
                          carousel.scrollBy({ left: 1000, behavior: "smooth" });
                      }}
                      isActive={programNavActiveButton === "next"}
                      variant="dark"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Angled Parallelogram Section - Testimonial */}
        <section
          className="relative py-32 lg:py-44 overflow-hidden"
          style={{
            background: "linear-gradient(to bottom, #000 50%, #000 50%)",
          }}
        >
          {/* Background layer with AngledContainer (fixed 3° angle, auto-detect aspect ratio) */}
          <AngledContainer
            direction="vertical-left"
            angle={3}
            autoDetectAspectRatio={true}
            width="100%"
            height="100%"
            className="absolute inset-0"
            backgroundColor="bg-stevens-dark-gray"
          />
          {/* Content layer - Grid: Testimonial Left (2/3), Image Right (1/3) */}
          <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-12">
            <div className="grid xl:grid-cols-3 gap-12 xl:gap-16 items-center">
              {/* Left: Pull Quote Testimonial - 2/3 width on xl+ */}
              <AnimatedSection className="xl:col-span-2">
                {/* Skewed container for angled border effect */}
                <div className="transform -skew-y-3">
                  {/* Border frame around quote content */}
                  <div className="border-4 border-stevens-red p-8 lg:p-10">
                    {/* Counter-skew content to keep it upright */}
                    <div className="transform skew-y-3">
                      {/* Opening Quote Mark */}
                      <svg
                        className="w-12 h-12 lg:w-16 lg:h-16 text-stevens-red mb-6"
                        viewBox="0 0 19 20"
                        aria-hidden="true"
                      >
                        <path
                          fill="currentColor"
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M11.4,10.3L15.3,0h3.3l-2.5,9.5H19V20h-7.6V10.3z M0,10.3L3.9,0h3.3L4.7,9.5h2.9V20H0V10.3z"
                        />
                      </svg>

                      {/* Quote Text */}
                      <blockquote className="font-stevens-display text-2xl lg:text-3xl xl:text-4xl leading-snug font-light text-stevens-white mb-8">
                        Stevens Online empowers working professionals to advance
                        their careers through flexible, industry-relevant
                        programs.
                      </blockquote>

                      {/* Attribution */}
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-20 rounded-full bg-stevens-dark-gray overflow-hidden xl:hidden ring-2 ring-white/50 shadow-lg">
                          <img
                            src="/assets/avatars/home-avatar/ArshadS_H_S_L.webp"
                            alt="Arshad Saiyed"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-stevens-display text-lg font-bold text-stevens-white">
                            Arshad Saiyed
                          </p>
                          <p className="text-stevens-light-gray text-sm">
                            Chief Online Learning Officer and Dean of the
                            College of Professional Education
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              {/* Right: Featured Image - 1/3 width with matching angle (only on xl+) */}
              <AnimatedSection
                delay={0.2}
                className="hidden xl:block xl:order-2 xl:col-span-1"
              >
                {/* Skewed container to match testimonial angle - pulled up */}
                <div className="transform -skew-y-3 -mt-12 lg:-mt-16">
                  <div className="overflow-hidden shadow-2xl">
                    {/* Counter-skew image to keep it upright */}
                    <img
                      src="assets/avatars/home-avatar/ArshadS_H_S_L.webp"
                      alt="Arshad Saiyed - Dean of College of Professional Education"
                      className="w-full h-[418px] transform skew-y-3 scale-110"
                      loading="lazy"
                    />
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Why Stevens Section */}
        {/* <section className="py-stevens-section-sm lg:py-stevens-section bg-stevens-white">
          <div className="max-w-stevens-content-max mx-auto px-stevens-md lg:px-stevens-lg">
            <AnimatedSection className="grid lg:grid-cols-2 gap-stevens-gap-lg items-center mb-stevens-xl">
              <div>
                <h2 className="font-stevens-display text-4xl lg:text-5xl font-bold text-stevens-black mb-4">
                  A Legacy of Innovation Meets Online Flexibility
                </h2>
                <p className="text-stevens-xl text-stevens-dark-gray mb-6">
                  At Stevens, you don't have to choose between a prestigious
                  degree and a flexible online format. Our programs are designed
                  for working professionals, offering the same rigorous
                  curriculum and world-class faculty as our on-campus degrees.
                  You'll gain career-ready skills and join a powerful alumni
                  network, all on your schedule.
                </p>
              </div>
              <img
                {...getContentImageProps(
                  "/assets/images/home/stevens-campus.webp"
                )}
                alt="Stevens campus with NYC skyline"
                className="w-full h-auto rounded-stevens-md shadow-xl"
                loading="lazy"
              />
            </AnimatedSection>
            <AnimatedSection className="grid lg:grid-cols-2 gap-12 items-center">
              <img
                src="/assets/images/home/home-1.png"
                alt="Students collaborating online"
                className="rounded-stevens-md shadow-xl lg:order-1"
                loading="lazy"
              />
              <div className="lg:order-2">
                <h2 className="font-stevens-headers text-4xl lg:text-5xl font-bold text-stevens-black mb-4">
                  A Community That Supports Your Success
                </h2>
                <p className="text-stevens-xl text-stevens-dark-gray mb-6">
                  From your first inquiry to graduation and beyond, you are a
                  valued member of the Stevens community. Our dedicated
                  enrollment advisors, student support services, and active
                  alumni network are here to help you achieve your goals. Engage
                  with faculty and peers in a collaborative online environment
                  built for connection.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section> */}

        {/* Key Dates & Deadlines Section */}
        {/* <section className="bg-stevens-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="text-center mb-16">
              <h2 className="font-stevens-headers text-4xl lg:text-5xl font-bold text-stevens-black mb-4">
                Key Dates & Deadlines
              </h2>
              <p className="text-stevens-xl text-stevens-dark-gray max-w-3xl mx-auto">
                Plan your application for the upcoming {KEY_DATES.TERM.name}{" "}
                term.
              </p>
            </AnimatedSection>

            <AnimatedSection>
              <Card className="shadow-xl border-0 overflow-hidden ">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse border border-stevens-light-gray">
                    <thead className="bg-stevens-light-gray">
                      <tr>
                        <th className="p-4 font-semibold uppercase text-stevens-white tracking-wider bg-stevens-black text-stevens-white border border-stevens-light-gray">
                          Term
                        </th>
                        <th className="p-4 font-semibold uppercase text-stevens-white tracking-wider bg-stevens-black border border-stevens-light-gray">
                          Early Submit
                        </th>
                        <th className="p-4 font-semibold uppercase text-stevens-white tracking-wider bg-stevens-black text-stevens-white border border-stevens-light-gray">
                          Priority Submit
                        </th>
                        <th className="p-4 font-semibold uppercase text-stevens-white tracking-wider bg-stevens-black text-stevens-white border border-stevens-light-gray">
                          Final Submit
                        </th>
                        <th className="p-4 font-semibold uppercase text-stevens-white tracking-wider bg-stevens-black text-stevens-white border border-stevens-light-gray">
                          Start of Classes
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white">
                        <td className="p-4 font-bold text-base whitespace-nowrap align-top border border-stevens-light-gray">
                          {KEY_DATES.TERM.name}
                        </td>
                        <td className="p-4 align-top border border-stevens-light-gray">
                          <div className="font-bold text-stevens-black">
                            {KEY_DATES.EARLY_SUBMIT.date}
                          </div>
                          <div className="text-stevens-dark-gray mt-1 text-stevens-sm">
                            {KEY_DATES.EARLY_SUBMIT.details}
                          </div>
                        </td>
                        <td className="p-4 align-top border border-stevens-light-gray">
                          <div className="font-bold text-stevens-black">
                            {KEY_DATES.PRIORITY_SUBMIT.date}
                          </div>
                          <div className="text-stevens-dark-gray mt-1 text-stevens-sm">
                            {KEY_DATES.PRIORITY_SUBMIT.details}
                          </div>
                        </td>
                        <td className="p-4 font-bold text-stevens-black whitespace-nowrap align-top border border-stevens-light-gray">
                          {KEY_DATES.FINAL_SUBMIT.date}
                        </td>
                        <td className="p-4 font-bold text-stevens-black whitespace-nowrap align-top border border-stevens-light-gray">
                          {KEY_DATES.START_OF_CLASSES.date}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>
            </AnimatedSection>

            <AnimatedSection className="text-center mt-6 text-stevens-sm text-stevens-dark-gray max-w-4xl mx-auto">
              *Applicants who apply by the early submit deadline and are
              admitted may be eligible for a $250 deposit waiver. Applicants who
              receive education assistance from employers or other tuition
              discounts are not eligible. Other eligibility conditions may
              apply.
            </AnimatedSection>
          </div>
        </section> */}

        {/* Blog Carousel  */}
        <section className="bg-stevens-black py-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-stevens-md lg:px-stevens-lg">
            <AnimatedSection className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-stevens-xl">
              <div>
                <h2 className="font-stevens-display text-4xl lg:text-5xl font-bold text-stevens-white mb-2">
                  Latest from Our Blog
                </h2>
                <p className="text-stevens-lg text-stevens-white max-w-2xl">
                  Insights on online education, career advancement, and
                  technology trends.
                </p>
              </div>
              <Link to={createPageUrl("blog/")}>
                <Button
                  variant="link"
                  className=" h-auto  text-stevens-white pb-0"
                >
                  View all insights
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </AnimatedSection>

            {/* Blog Carousel Component */}
            <BlogCarousel items={blogs} maxItems={5} />
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="bg-stevens-black py-stevens-section">
          <div className="max-w-7xl mx-auto px-stevens-md lg:px-stevens-lg">
            <AnimatedSection className="mb-12">
              <h2 className="font-stevens-display text-4xl lg:text-5xl font-bold text-white mb-4">
                Application Support Events
              </h2>
              <p className="text-stevens-lg text-white/70 mb-6">
                Join us for a live webinar to learn more.
              </p>
              <div className="w-16 h-1 bg-stevens-red"></div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {supportEvents.map((event, index) => (
                  <AnimatedSection
                    key={event.title}
                    delay={0.1 * (index + 1)}
                    className="group cursor-pointer"
                  >
                    <a
                      href={event.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-full flex flex-col bg-white/[0.08] backdrop-blur-md border border-white/10 overflow-hidden hover:bg-white/[0.12] hover:border-white/20 transition-all duration-300"
                    >
                      <div className="aspect-video w-full overflow-hidden">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover transform group-hover:scale-[1.08] transition-transform duration-500"
                        />
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <div className="flex-grow">
                          <p className="text-sm text-stevens-red font-bold uppercase tracking-wider mb-3">
                            On-Demand Event
                          </p>
                          <h3 className="font-stevens-display text-lg lg:text-xl font-bold text-white mb-3 group-hover:text-white/90 transition-colors leading-tight">
                            {event.title}
                          </h3>
                          <div className="flex items-center text-xs text-white/50 uppercase tracking-wider font-medium">
                            <span>{event.length}</span>
                          </div>
                        </div>
                        <div className="mt-6 pt-4 border-t border-white/10">
                          <span className="inline-flex items-center text-sm text-white/70 group-hover:text-stevens-red transition-colors font-medium">
                            Watch now
                            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                          </span>
                        </div>
                      </div>
                    </a>
                  </AnimatedSection>
                ))}
              </div>
            </AnimatedSection>
            <AnimatedSection className="text-center mt-stevens-xl">
              <Link to="/events/">
                <Button
                  variant="outline-white"
                  className="border-white text-white hover:bg-white hover:text-stevens-black"
                >
                  View All Events
                </Button>
              </Link>
            </AnimatedSection>
          </div>
        </section>

        {/* SARA Accreditation Logo Section */}
        <section className="py-20 border-t bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="text-center">
              <div className="space-y-4">
                <img
                  src="/assets/images/home/SARA_Seal_group_2024_Participating.webp"
                  alt="SARA Participating Institution"
                  className="mx-auto max-w-[200px] w-full h-auto"
                  loading="lazy"
                />
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Browse Courses Modal */}
        {showBrowseModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-stevens-md shadow-xl w-full max-w-md relative">
              <button
                onClick={() => setShowBrowseModal(false)}
                className="absolute top-4 right-4 text-stevens-gray hover:text-stevens-dark-gray focus:outline-none transition-colors duration-300"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>
              <h3 className="text-2xl font-bold mb-6 text-center text-stevens-black">
                Browse Our Course Catalog
              </h3>
              <p className="text-stevens-dark-gray mb-6 text-center">
                Are you a current Stevens student or a public learner?
              </p>
              <div className="flex flex-col gap-4">
                <a
                  href="https://sit.catalog.instructure.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                  onClick={() => setShowBrowseModal(false)}
                >
                  <Button className="w-full btn-secondary py-3 text-lg font-stevens-body font-semibold hover:bg-red-800 hover:text-white transition-all duration-300">
                    Stevens Member
                  </Button>
                </a>
                <a
                  href="https://sit.catalog.instructure.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                  onClick={() => setShowBrowseModal(false)}
                >
                  <Button
                    variant="outline-dark"
                    className="w-full btn-outline-maroon py-3 text-lg font-stevens-body font-semibold hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-300"
                  >
                    Public Learner
                  </Button>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Request Info Modal */}
        <RequestInfoModal
          isOpen={showRequestInfoModal}
          onClose={() => setShowRequestInfoModal(false)}
          sourcePage="homepage"
          programOfInterest=""
        />
      </div>
    </PageContextProvider>
  );
}
