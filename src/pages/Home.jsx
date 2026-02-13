import React, { useState, useEffect, useRef } from "react";
import { Program } from "@/api/entities";
import { Event } from "@/api/entities";
import { Button } from "@/components/ui/button";

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
import { getContentImageProps } from "@/utils/responsiveImage";
import {
  Asterism,
  AnimatedSection,
  AngledImage,
  AngledImageStack,
  AngledContainer,
  CarouselNavButton,
} from "@/components/shared";
import { SupportEventsSection } from "@/components/shared/sections/SupportEventsSection";
import { VideoSection } from "@/components/shared/sections/VideoSection";
import { ProgramShowcaseCard } from "@/components/shared/cards/ProgramShowcaseCard";
import { BlogCarousel } from "@/components/blog";
import { ArrowRight, X, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

import { ParallaxImage, RequestInfoModal } from "@/components/shared";

import { trackConversion, CONVERSION_LABELS } from "@/utils/gtmTracking";

import { usePageTracking } from "@/hooks/analytics/usePageTracking";
import { PageContextProvider } from "@/contexts/analytics/PageContext";

// Program showcase carousel data with real program information
const programShowcaseData = [
  {
    id: 1,
    title: "Computer Science",
    subtitle: "MASTER OF SCIENCE",
    image: "/assets/images/mscs/mscs-hero.webp",
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
    image: "/assets/images/mba/mba-hero.webp",
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
    image: "/assets/images/mem/mem-hero.webp",
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
    image: "/assets/images/meads/meads-hero.webp",
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
    image: "/assets/images/certificate-enterprise-ai/cert-eai-hero.webp",
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
    image: "/assets/images/certificate-applied-data-science/cert-ads-hero.webp",
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

  const [_programs, setPrograms] = useState([]);
  const [_events, setEvents] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [showBrowseModal, setShowBrowseModal] = useState(false); // State for modal visibility
  const [showRequestInfoModal, setShowRequestInfoModal] = useState(false); // State for Request Info modal
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
      image: "/assets/images/home/home-event-mba-overview.webp",
    },
    {
      title: "Application Walkthrough: Computer Science",
      length: "10 minutes",
      url: "https://event.on24.com/wcc/r/4455092/4C10B1C30D8D20926A28C1A21C667A29",
      image: "/assets/images/home/home-event-cs-walkthrough.webp",
    },
    {
      title: "Application Walkthrough: Engineering Management",
      length: "24 minutes",
      url: "https://event.on24.com/wcc/r/5056716/2FEBB6A6A455A2CCC508FB1183A71810",
      image: "/assets/images/home/home-event-em-walkthrough.webp",
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
        const recentBlogs = blogsData.posts
        .sort((a, b) => {
          return new Date(b.created_date) - new Date(a.created_date);
        })
        .slice(0, 5);
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
      image: buildCanonicalUrl("/assets/images/shared/stevens-campus.webp"),
      url: buildCanonicalUrl("/"),
      type: "website",
    });
  }, []);

  return (
    <PageContextProvider pageType="home" pageName="Homepage">
      <div className="font-sans bg-stevens-black">
        {/* Hero Section - negative margin pulls it up behind the fixed navbar */}
        <section className="relative h-[900px] bg-stevens-black text-stevens-white overflow-hidden -mt-[87px] pt-[87px]">
          <img
            src="/assets/images/home/home-hero-1920w.webp"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
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
            className="absolute left-0 top-0 h-full w-[380px] lg:w-[380px] z-20 hidden lg:flex flex-col items-center justify-center backdrop-blur-md"
            style={{
              maskImage:
                "linear-gradient(to right, black 0%, black 60%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, black 0%, black 60%, transparent 100%)",
            }}
          >
            <img
              src="/assets/logos/Stevens-CPE-logo-RGB_Primary-WHT.svg"
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

          <div className="relative h-full w-full px-6 pb-16 sm:px-8 lg:px-12 xl:px-16 flex flex-col justify-end items-end">
            {/* Hero Content - Right Bottom (per CPE Brand Guidelines) */}
            <div className="max-w-2xl text-right">
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
        <section className="bg-stevens-black py-stevens-section-sm lg:py-stevens-section relative overflow-hidden ">
          {/* Content container - z-10 to stay below asterism */}
          <div className="mx-auto px-stevens-md lg:px-stevens-3xl relative z-40">
            <div className="grid lg:grid-cols-2 gap-stevens-gap-lg items-center">
              {/* Left: Layered Images */}
              <AnimatedSection>
                <AngledImageStack className="h-[500px] md:h-[600px] lg:h-[800px] relative ">
                  {/* Background layer - larger */}
                  <AngledImage
                    {...getContentImageProps(
                      "/assets/images/shared/3-explore-msds.webp"
                    )}
                    alt="Student studying"
                    direction="vertical-left"
                    width="100%"
                    height={windowWidth < 768 ? "500px" : "600px"}
                    translateY={0}
                    translateX={5}
                    className="absolute top-0 left-0 "
                  />
                  {/* Foreground layer - smaller, overlapping */}
                  <AngledImage
                    {...getContentImageProps(
                      "/assets/images/shared/2-explore-msds.webp"
                    )}
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
            centerY="45%"
            rays={2}
            angles={[90, 270]}
            color="stevens-white"
            opacity={0.7}
            rayLengths={["full", windowWidth < 1024 ? windowWidth < 768 ? 40 : 200 : 500]}
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

        {/* THE STEVENS ONLINE ADVANTAGE */}
        <VideoSection  />
        {/* Parallax Fixed Background Section */}
        <ParallaxImage
          src="/assets/images/shared/1-explore-msds.webp"
          className="h-[256px] lg:h-[400px] lg:mt-8"
        />

        {/* Stats section that continues below parallax */}
        <section className="relative bg-stevens-black pt-1 ">
          {/* Overlapping Card - negative margin pulls it up into parallax section */}
          {/* By the Numbers - Dark Mode Premium Design */}
          <div className="relative z-10 mx-auto max-w-7xl bg-stevens-black -mt-24  px-8 pt-16 lg:px-16 lg:pt-24 scale-[0.90] origin-top">
            {/* Hero Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center pb-8 lg:pb-12"
            >
              <h2 className="font-stevens-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold italic text-stevens-red leading-tight tracking-tight mb-4">
                #1 In NJ for
                <br />
                Graduate Earnings
              </h2>
              <p className="text-[10px] sm:text-xs text-stevens-gray uppercase tracking-wider mb-4">
                U.S. Dept. of Education 2025
              </p>
              <a
                href="https://www.stevens.edu/news/stevens-ranks-no-1-in-new-jersey-for-graduate-earnings-in-new-federal-salary"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-stevens-red transition-colors font-medium group"
              >
                Read the full report
                <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </a>
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
                transition={{ duration: 0.4, delay: 0.4 }}
                viewport={{ once: true }}
                className="text-center py-12 lg:py-16 px-4 flex flex-col justify-between min-h-[280px] border-b md:border-b-0 md:border-r border-[#333333]"
              >
                <div>
                  <p className="font-stevens-display text-7xl sm:text-8xl lg:text-9xl font-bold text-white leading-none tracking-tight mb-6">
                    #7
                  </p>
                  <p className="font-stevens-headers text-sm sm:text-base lg:text-lg font-bold text-white uppercase tracking-wider leading-tight">
                    Online Graduate
                    <br />
                    Engineering
                    <br />
                    Management
                  </p>
                </div>
                <p className="text-[10px] sm:text-xs text-stevens-gray uppercase tracking-wider mt-6">
                  No. 1 in N.J. — U.S. News 2026
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
                <p className="text-[10px] sm:text-xs text-stevens-gray uppercase tracking-wider mt-6">
                  USDLA Distance Learning
                </p>
              </motion.div>

              {/* Stat 3 */}
              

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-center py-12 lg:py-16 px-4 flex flex-col justify-between min-h-[280px] border-b md:border-b-0 md:border-r border-[#333333]"
              >
                <div>
                  <p className="font-stevens-display text-7xl sm:text-8xl lg:text-9xl font-bold text-white leading-none tracking-tight mb-6">
                    #16
                  </p>
                  <p className="font-stevens-headers text-sm sm:text-base lg:text-lg font-bold text-white uppercase tracking-wider leading-tight">
                    Online MBA
                    <br />
                    Business
                    <br />
                    Analytics
                  </p>
                </div>
                <p className="text-[10px] sm:text-xs text-stevens-gray uppercase tracking-wider mt-6">
                  No. 1 in N.J. — U.S. News 2026
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Program Showcase Carousel Section */}
        <section className="bg-stevens-black relative  lg:pt-stevens-section">
          <div className="flex flex-col lg:flex-row pb-16">
            {/* Left Content Panel */}
            <div className="lg:w-[35%] xl:w-[30%] bg-stevens-black px-8 pb-16 lg:px-12 lg:py-24 flex flex-col justify-center">
              <AnimatedSection>
                <h2 className="font-stevens-display text-4xl lg:text-5xl font-light text-stevens-white mb-6 leading-tight">
                  Our Programs
                </h2>
                <p className="text-stevens-white text-lg mb-8 leading-relaxed">
                  Discover world-class online graduate programs designed for
                  working professionals seeking to advance their careers.
                </p>
                <Link
                  to={
                    createPageUrl("compare-our-programs/") + "#explore-programs"
                  }
                >
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
                    <ProgramShowcaseCard
                      key={program.id}
                      program={program}
                      index={index}
                    />
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
                        aria-label="Filter by Masters programs"
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
                        aria-label="Filter by Certificates"
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
            <h2 className="sr-only">Featured testimonial from leadership</h2>
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
                        Stevens College of Professional Education empowers working professionals to advance
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
                          <h3 className="font-stevens-display text-lg font-bold text-stevens-white">
                            Arshad Saiyed
                          </h3  >
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
                      src="/assets/avatars/home-avatar/ArshadS_H_S_L.webp"
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

        {/* Blog Carousel  */}
        <section className="bg-stevens-black py-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-stevens-md lg:px-stevens-lg">
            <AnimatedSection className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-stevens-xl">
              <div>
                <h2 className="font-stevens-display text-4xl lg:text-5xl font-light text-stevens-white mb-2">
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

        {/* Upcoming Events - Using shared SupportEventsSection component */}
        <SupportEventsSection events={supportEvents} />

        {/* SARA Accreditation Logo Section */}
        <section className="md:pb-20 bg-stevens-black">
          {/* 80% width border */}
          <div className="w-[80%] mx-auto h-px bg-white/20 mb-[60px]" />
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
          <div className="w-full mx-auto h-px bg-white/20 mt-[80px]" />
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
