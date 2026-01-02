import React, { useState, useEffect } from "react";
import { Program } from "@/api/entities";
import { Event } from "@/api/entities";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { createPageUrl, setPageTitle, setMetaDescription, setOpenGraphTags, buildCanonicalUrl } from "@/utils";
import { getHeroImageProps, getContentImageProps, getCardImageProps } from "@/utils/responsiveImage";
import Asterism from "@/components/shared/Asterism";
import { AngledImage, AngledImageStack, AngledContainer } from "@/components/shared/angled-image";
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
} from "lucide-react";
import { motion } from "framer-motion";

import LeadCaptureForm from "../components/forms/LeadCaptureForm";
import ProgramCard from "../components/shared/ProgramCard";
import ProgramReadinessAssessment from "../components/assessment/ProgramReadinessAssessment";
import VideoPlayer from "../components/shared/VideoPlayer";
import RequestInfoModal from "../components/shared/RequestInfoModal";
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

// AnimatedSection component for scroll-based animations
// This component would typically be in a separate file like "../components/common/AnimatedSection"
const AnimatedSection = ({ children, className, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }} // Animate once when 20% of element is in view
      transition={{ duration: 0.6, delay: delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default function Home() {
  usePageTracking({
    pageType: 'home',
    additionalData: {
      page_name: 'Homepage',
      has_embedded_form: true,
      has_quiz: true,
      has_video: true
    }
  });

  const [programs, setPrograms] = useState([]);
  const [events, setEvents] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [showBrowseModal, setShowBrowseModal] = useState(false); // State for modal visibility
  const [showRequestInfoModal, setShowRequestInfoModal] = useState(false); // State for Request Info modal
  const [showAssessment, setShowAssessment] = useState(false); // State for assessment toggle
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  // Track window width for responsive Asterism
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Application Support Events (reuse same content as Events page)
  const supportEvents = [
    {
      title: 'Application Overview: Online MBA',
      length: '15 minutes',
      url: 'https://event.on24.com/wcc/r/4670707/F1184BBC4542A137E5E8852AA0FF2DBE',
      image: '/assets/images/home/2-event.webp'
    },
    {
      title: 'Application Walkthrough: Computer Science',
      length: '10 minutes',
      url: 'https://event.on24.com/wcc/r/4455092/4C10B1C30D8D20926A28C1A21C667A29',
      image: '/assets/images/home/3-event.webp'
    },
    {
      title: 'Application Walkthrough: Engineering Management',
      length: '24 minutes',
      url: 'https://event.on24.com/wcc/r/5056716/2FEBB6A6A455A2CCC508FB1183A71810',
      image: '/assets/images/home/4-event.webp'
    }
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
        const blogsData = await import('@/data/blogs.json');
        const recentBlogs = blogsData.posts.slice(0, 3);
        setBlogs(recentBlogs);
      } catch (error) {
        console.error('Error loading blogs:', error);
      }
    }
    loadData();
  }, []);

  // Set SEO meta tags
  useEffect(() => {
    setPageTitle('Explore Online Master\'s Programs | Stevens Online');
    setMetaDescription('Explore accredited online master\'s programs from Stevens Institute of Technology. Earn your degree 100% online with expert faculty and flexible options.');
    setOpenGraphTags({
      title: 'Explore Online Master\'s Programs | Stevens Online',
      description: 'Explore accredited online master\'s programs from Stevens Institute of Technology. Earn your degree 100% online with expert faculty and flexible options.',
      image: buildCanonicalUrl('/assets/logos/stevens-crest.webp'),
      url: buildCanonicalUrl('/'),
      type: 'website'
    });
  }, []);

  return (
    <PageContextProvider pageType="home" pageName="Homepage">
    <div className="font-sans">
      {/* Hero Section - negative margin pulls it up behind the fixed navbar */}
      <section className="relative bg-stevens-black text-stevens-white overflow-hidden -mt-[87px] pt-[87px]">
        <img
          {...getHeroImageProps('/assets/images/home/HEADER-0865.webp', { 
            widths: [640, 1024, 1280, 1920] 
          })}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
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
            background: 'linear-gradient(to bottom, rgba(0,0,0,0) 45%, rgba(0,0,0,0.65) 75%, rgba(0,0,0,1) 100%)'
          }}
        />
        
        {/* CPE Logo Area - Left side with backdrop blur (per Brand Guidelines) */}
        {/* Using mask-image gradient to fade the blur edges for a softer transition */}
        <div 
          className="absolute left-0 top-0 h-full w-[380px] lg:w-[380px] z-20 hidden md:flex flex-col items-center justify-center backdrop-blur-md"
          style={{
            maskImage: 'linear-gradient(to right, black 0%, black 60%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, black 0%, black 60%, transparent 100%)',
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
          angles={[25,90,  205,270, 335]}
          color="stevens-white"
          opacity={0.7}
          rayLengths={["full", "full", "full","full", 300]}
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
        
        <div className="relative min-h-[80vh] w-full px-stevens-md sm:px-stevens-lg lg:px-stevens-xl py-[80px] flex flex-col justify-end items-end">
          {/* Hero Content - Right Bottom (per CPE Brand Guidelines) */}
          <div className="max-w-xl text-right pr-4 lg:pr-16">
            <h1 className="font-stevens-headers text-5xl md:text-6xl lg:text-7xl font-light leading-tight mb-6 text-stevens-white">
              Move your<br />career forward
            </h1>
            <Link
              to={createPageUrl("admissions/") + "#explore-programs"}
              onClick={() => trackConversion(CONVERSION_LABELS.APPLY_NOW)}
            >
              <Button variant="outline-red" className="uppercase">
              Explore Programs
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
            <AnimatedSection delay={0.2} className="text-stevens-white pb-stevens-xl">
              <h2 className="font-stevens-display text-stevens-3xl lg:text-stevens-4xl font-light tracking-tight mb-stevens-lg ">
                This is a new kind of education, built around your goals, and designed to fit your life
              </h2>
              <p className="text-stevens-white text-stevens-lg mb-stevens-xl leading-relaxed">
                The College of Professional Education at Stevens Institute of Technology 
                offers flexible, future-focused learning that lorem ipsum dolor sit amet. 
                Lorem ipsum dolor sit amet. Praesent mattis suscipit dapibus. Nunc 
                volutpat libero augue, porttitor tempor risus fringilla in.
              </p>
              <Link to={createPageUrl("online-learning-experience/")}>
                <Button variant="outline-red" className="uppercase">
                  Online Learning Experience
                </Button>
              </Link>
            </AnimatedSection>
          </div>
        </div>
        
        {/* Asterism overlay - AFTER content, z-20 to be on top */}
        <Asterism
          className="z-10"
          centerX="33%"
          centerY="58%"
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
      
      
      {/* Parallax Fixed Background Section */}
      <section 
        className="hidden lg:block relative w-full bg-fixed bg-top bg-cover bg-no-repeat"
        style={{ 
          height: "500px",
          backgroundImage: "url('/assets/images/shared/1-explore-msds.webp')"
        }}
      >
      </section>
      {/* Background section that continues below parallax */}
      <section className="relative bg-stevens-light-gray pt-1 pb-16">
        {/* Overlapping Card - negative margin pulls it up into parallax section */}
        <div className="relative z-10 mx-auto max-w-6xl bg-white shadow-xl -mt-32 px-10 py-16 lg:px-16 lg:py-20">
          {/* Title */}
          <h2 className="font-stevens-display text-stevens-3xl lg:text-stevens-4xl font-bold text-stevens-dark-gray mb-4 tracking-tight leading-tight text-center">
            A Degree That <span className="text-stevens-red">Pays Dividends</span>
          </h2>
          <p className="text-stevens-lg text-stevens-gray text-center mb-12 lg:mb-16">
            Stevens is consistently recognized for academic excellence and ROI.
          </p>
          
          {/* Optimized Layout: Hero Stat + Supporting Grid */}
          <div className="flex flex-col">
            
            {/* Level 1: Hero Stat - The Primary Hook */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              viewport={{ once: true }}
              className="text-center mb-12 lg:mb-16 hover:scale-105 transition-transform duration-200 cursor-default"
            >
              <p className="font-stevens-display text-8xl lg:text-9xl font-bold text-stevens-red mb-6 leading-none tracking-tighter drop-shadow-sm">#1</p>
              <h3 className="text-stevens-dark-gray font-bold text-2xl lg:text-3xl leading-tight max-w-2xl mx-auto">
                Online MBA from a New Jersey school
              </h3>
              <p className="text-stevens-gray text-sm mt-3 font-medium uppercase tracking-wider">U.S. News & World Report 2025</p>
            </motion.div>

            {/* Visual Divider - Creates Breathing Room */}
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeInOut" }}
              viewport={{ once: true }}
              className="w-full border-t border-stevens-light-gray/60 mb-12 lg:mb-16 origin-center"
            ></motion.div>

            {/* Level 2: Supporting Stats - The Reinforcement */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
              
              {/* Stat 2 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="text-center group cursor-default"
              >
                <p className="font-stevens-display text-5xl lg:text-6xl font-bold text-stevens-dark-gray mb-3 group-hover:text-stevens-red transition-colors duration-300">#1</p>
                <p className="text-stevens-dark-gray font-semibold text-lg leading-snug">In NJ for Graduate Earnings</p>
                <p className="text-stevens-gray text-xs mt-2 text-opacity-80">U.S. Dept. of Education 2025</p>
              </motion.div>
              
              {/* Stat 3 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="text-center group cursor-default"
              >
                <p className="font-stevens-display text-5xl lg:text-6xl font-bold text-stevens-dark-gray mb-3 group-hover:text-stevens-red transition-colors duration-300">7x</p>
                <p className="text-stevens-dark-gray font-semibold text-lg leading-snug">Winner of 21st Century Award</p>
                <p className="text-stevens-gray text-xs mt-2 text-opacity-80">USDLA Distance Learning</p>
              </motion.div>
              
              {/* Stat 4 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="text-center group cursor-default"
              >
                <p className="font-stevens-display text-5xl lg:text-6xl font-bold text-stevens-dark-gray mb-3 group-hover:text-stevens-red transition-colors duration-300">#9</p>
                <p className="text-stevens-dark-gray font-semibold text-lg leading-snug">Among 'Best ROI Colleges'</p>
                <p className="text-stevens-gray text-xs mt-2 text-opacity-80">Based on 4-year degree cost</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      

      {/* Old Redesigned Rankings & Proof Points Section - TODO: Remove after testing */}
      {/* <section className="bg-stevens-light-gray py-stevens-section-sm lg:py-stevens-section">
        <div className="max-w-stevens-content-max mx-auto px-stevens-md lg:px-stevens-lg">
          <AnimatedSection className="text-center mb-stevens-xl">
            <h2 className="font-stevens-display text-stevens-4xl stevens-lg:text-stevens-4xl font-bold text-stevens-dark-gray mb-stevens-lg tracking-tight leading-tight">
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

      {/* Professional Education CTA */}
      <section className="py-stevens-section-sm lg:py-stevens-section bg-stevens-light-gray relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-stevens-xl right-stevens-2xl w-80 h-80 bg-stevens-light-gray rounded-full blur-3xl" />
        <div className="absolute bottom-stevens-xl left-stevens-2xl w-64 h-64 bg-stevens-light-gray/30 rounded-full blur-3xl" />
        
        <div className="max-w-stevens-content-max mx-auto px-stevens-md lg:px-stevens-lg">
          <div className="grid lg:grid-cols-2 gap-stevens-gap-lg items-center">
            <AnimatedSection className="relative">
              <div className="bg-stevens-white rounded-stevens-md overflow-hidden shadow-stevens-lg border border-stevens-light-gray">
                {/* Video Player Component */}
                <VideoPlayer
                  src="/assets/videos/Stevens Online Home - 1.mp4"
                  poster="/assets/videos/video-cover-3.avif"
                  title=""
                  showControls={true}
                  muted={true}
                />

                {/* Video Description */}
                <div className="p-stevens-xl">
                  <h3 className="font-stevens-display text-stevens-4xl font-bold text-stevens-dark-gray mb-stevens-sm">
                    Discover Your Future at Stevens
                  </h3>
                  <p className="text-stevens-dark-gray mb-stevens-lg">
                    Watch how Stevens Online transforms careers through
                    innovative education, expert faculty, and flexible learning
                    designed for working professionals.
                  </p>
                  {/* Removed browse catalog and explore courses buttons */}
                  {/* <div className="flex flex-col stevens-sm:flex-row gap-stevens-md">
                    <Link
                      to={createPageUrl("ProfessionalEducation")}
                      className="flex-1"
                    >
                      <Button className="btn-stevens-red text-stevens-lg w-full">
                        Explore Courses
                      </Button>
                    </Link>
                    <Button
                      variant="outline-dark"
                      className="btn-stevens-outline text-stevens-lg flex-1"
                      onClick={() => setShowBrowseModal(true)}
                    >
                      Browse Catalog
                    </Button>
                  </div> */}
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection>
              
              <h2 className="font-stevens-display text-stevens-3xl stevens-lg:text-stevens-4xl font-bold text-stevens-dark-gray mb-stevens-lg tracking-tight leading-tight">
              THE STEVENS ONLINE ADVANTAGE
              </h2>
              <p className="text-stevens-xl text-stevens-dark-gray mb-stevens-xl leading-relaxed">
              Our Online Master’s Degree Programs are designed to provide the same quality as our highly-ranked on-campus programs. We offer relevant courses, renowned faculty, and individualized support to each student.
              </p>
              <p className="text-stevens-xl text-stevens-dark-gray mb-stevens-xl leading-relaxed">
              Additional benefits of our StevensOnline programs include:
              </p>

              {/* Benefits list to mirror official site */}
              <ul className="space-y-stevens-md mb-stevens-xl text-stevens-lg text-stevens-dark-gray">
                <li className="flex items-start gap-stevens-sm">
                  <span className="mt-[6px] h-2 w-2 rounded-full bg-stevens-dark-gray" />
                  <span>Global cohort of classmates to learn with and from</span>
                </li>
                <li className="flex items-start gap-stevens-sm">
                  <span className="mt-[6px] h-2 w-2 rounded-full bg-stevens-dark-gray" />
                  <span>Direct access to experienced faculty</span>
                </li>
                <li className="flex items-start gap-stevens-sm">
                  <span className="mt-[6px] h-2 w-2 rounded-full bg-stevens-dark-gray" />
                  <span>Flexibility for how and where you study</span>
                </li>
              </ul>

              <p className="text-stevens-xl text-stevens-dark-gray mb-stevens-lg leading-relaxed">
                Through our online offerings, you will gain access to the same quality
                programs and distinguished faculty as on-campus students.
              </p>

            </AnimatedSection>
          </div>
        </div>
      </section>
      
      {/* Program Showcase Section */}
      <section className="py-stevens-section-sm lg:py-stevens-section bg-stevens-black">
        <div className="max-w-6xl mx-auto px-stevens-md lg:px-stevens-lg">
          <div className="grid md:grid-cols-2 gap-stevens-2xl">
            
            {/* Online Master of Science in Computer Science */}
            <AnimatedSection>
              <div className="bg-transparent text-stevens-white">
                <h2 className="font-stevens-display text-stevens-2xl stevens-md:text-stevens-3xl font-stevens-bold text-stevens-white mb-stevens-md uppercase tracking-wide">
                  ONLINE MASTER OF SCIENCE IN COMPUTER SCIENCE
                </h2>
                <p className="text-stevens-white mb-stevens-lg leading-relaxed">
                  Ranked No. 11 in New Jersey for Best Online Master's in Computer Information Technology Programs by U.S. News & World Report (2024), the{" "}
                  <Link 
                    to={createPageUrl("online-masters-computer-science-mscs/")} 
                    className="underline hover:text-stevens-light-gray transition-colors duration-stevens-normal"
                  >
                    online computer science master's program
                  </Link>{" "}
                  at Stevens offers you a curriculum aligned with high-demand areas such as software development, web programming, mobile systems and applications, cloud computing, human-computer interaction, and enterprise software design.
                </p>
                <Link to={createPageUrl("online-masters-computer-science-mscs/")}>
                  <Button variant="outline-white" className="uppercase">
                    LEARN MORE
                  </Button>
                </Link>
              </div>
            </AnimatedSection>

            {/* Online MBA */}
            <AnimatedSection>
              <div className="bg-transparent text-stevens-white">
                <h2 className="font-stevens-display text-stevens-2xl stevens-md:text-stevens-3xl font-stevens-bold text-stevens-white mb-stevens-md uppercase tracking-wide">
                  ONLINE MBA
                </h2>
                <p className="text-stevens-white mb-stevens-lg leading-relaxed">
                  The Stevens {" "}
                  <Link 
                    to={createPageUrl("online-mba/")} 
                    className="underline hover:text-stevens-light-gray transition-colors duration-stevens-normal"
                  >
                     Online MBA
                  </Link>{" "}
                   is an AACSB-accredited program offered part time through online courses. The Online MBA combines business knowledge with the technology and analytics necessary to excel in today's data-centric world. Students will build upon their managerial toolkits with analytical, data literacy, marketing and operations management skills that drive data-based decisions.
                </p>
                <Link to={createPageUrl("online-mba/")}>
                  <Button variant="outline-white" className="uppercase">
                    LEARN MORE
                  </Button>
                </Link>
              </div>
            </AnimatedSection>

            {/* Online Master of Engineering in Engineering Management */}
            <AnimatedSection>
              <div className="bg-transparent text-stevens-white">
                <h2 className="font-stevens-display text-stevens-2xl stevens-md:text-stevens-3xl font-stevens-bold text-stevens-white mb-stevens-md uppercase tracking-wide">
                  ONLINE MASTER OF ENGINEERING IN ENGINEERING MANAGEMENT
                </h2>
                <p className="text-stevens-white mb-stevens-lg leading-relaxed">
                  Master the ability to interface between technology and business stakeholders. This program will advance your understanding of the technology involved in engineering projects and the management process through which the technology is applied. Graduates from the{" "}
                  <Link 
                    to={createPageUrl("online-masters-engineering-management/")} 
                    className="underline hover:text-stevens-light-gray transition-colors duration-stevens-normal"
                  >
                    Online Master of Engineering in Engineering Management
                  </Link>{" "}
                  program are prepared to add value at the intersection of engineering and management and assume professional positions of increasing responsibility.
                </p>
                <Link to={createPageUrl("online-masters-engineering-management/")}>
                  <Button variant="outline-white" className="uppercase">
                    LEARN MORE
                  </Button>
                </Link>
              </div>
            </AnimatedSection>

            {/* Compare Our Programs */}
            <AnimatedSection>
              <div className="bg-transparent text-stevens-white">
                <h2 className="font-stevens-display text-stevens-2xl stevens-md:text-stevens-3xl font-stevens-bold text-stevens-white mb-stevens-md uppercase tracking-wide">
                  COMPARE OUR PROGRAMS
                </h2>
                <p className="text-stevens-white mb-stevens-lg leading-relaxed">
                  At Stevens, we are proud to offer an array of online programs that challenge the traditional frontiers of technology and business. Compare our programs to find the innovative graduate degree that is the right fit for your personal and professional goals.
                </p>
                <Link to={createPageUrl("compare-our-programs/")}>
                  <Button variant="outline-white" className="uppercase">
                    LEARN MORE
                  </Button>
                </Link>
              </div>
            </AnimatedSection>

          </div>
        </div>
      </section>

      
      {/* Why Stevens Section */}
      <section className="py-stevens-section-sm lg:py-stevens-section bg-stevens-white">
        <div className="max-w-stevens-content-max mx-auto px-stevens-md lg:px-stevens-lg">
          <AnimatedSection className="grid lg:grid-cols-2 gap-stevens-gap-lg items-center mb-stevens-xl">
            <div>
              <h2 className="font-stevens-display text-3xl font-bold text-stevens-black mb-4">
                A Legacy of Innovation Meets Online Flexibility
              </h2>
              <p className="text-stevens-xl text-stevens-dark-gray mb-6">
                At Stevens, you don't have to choose between a prestigious
                degree and a flexible online format. Our programs are designed
                for working professionals, offering the same rigorous curriculum
                and world-class faculty as our on-campus degrees. You'll gain
                career-ready skills and join a powerful alumni network, all on
                your schedule.
              </p>
              
            </div>
            <img
              {...getContentImageProps('/assets/images/home/stevens-campus.webp')}
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
              <h2 className="font-stevens-headers text-3xl font-bold text-stevens-black mb-4">
                A Community That Supports Your Success
              </h2>
              <p className="text-stevens-xl text-stevens-dark-gray mb-6">
                From your first inquiry to graduation and beyond, you are a
                valued member of the Stevens community. Our dedicated enrollment
                advisors, student support services, and active alumni network
                are here to help you achieve your goals. Engage with faculty and
                peers in a collaborative online environment built for
                connection.
              </p>
              <Link to={createPageUrl("OnlineLearning")}>
                <Button variant="default">
                  Explore the Student Experience 
                  <ArrowRight className="w-5 h-5 ml-stevens-sm" />
                </Button>
              </Link>
            </div>
            
          </AnimatedSection>
        </div>
      </section>

      {/* Testimonial Section */}
      <AnimatedSection className="bg-stevens-black py-stevens-section">
        <div className="max-w-stevens-content-max mx-auto px-stevens-sm stevens-md:px-stevens-lg stevens-xl:px-stevens-xl">
          <div className="mx-auto text-center">
          <img
              src="assets/avatars/home-avatar/ArshadS_H_S_L.webp"
              alt="Alumni portrait"
              className="mb-4 mx-auto w-24 h-24 rounded-full object-cover border-4 border-stevens-white shadow-stevens-lg"
              loading="lazy"
            />
            <blockquote className="text-stevens-2xl leading-snug italic text-stevens-white mb-stevens-md">
              "Stevens Online is dedicated to delivering world-class technology
              education to working professionals worldwide, empowering them to
              advance their careers and drive innovation in tomorrow's digital
              economy through flexible, accessible, and industry-relevant online
              programs."
            </blockquote>
            <cite className="not-italic font-stevens-semibold text-stevens-white">- Arshad Saiyed</cite>
            <br />
            <cite className="not-italic font-stevens-semibold text-stevens-white">
              Chief Online Learning Officer and Dean of the College of Professional Education
            </cite>
          </div>
        </div>
      </AnimatedSection>

      {/* Key Dates & Deadlines Section */}
      <section className="bg-stevens-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="text-center mb-16">
                <h2 className="font-stevens-headers text-3xl md:text-4xl font-bold text-stevens-black mb-4">
                    Key Dates & Deadlines
                </h2>
                <p className="text-stevens-xl text-stevens-dark-gray max-w-3xl mx-auto">
                    Plan your application for the upcoming {KEY_DATES.TERM.name} term.
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
            *Applicants who apply by the early submit deadline and are admitted
            may be eligible for a $250 deposit waiver. Applicants who receive
            education assistance from employers or other tuition discounts are
            not eligible. Other eligibility conditions may apply.
            </AnimatedSection>
        </div>
      </section>
      

      {/* Blog Showcase Section */}
      {blogs.length > 0 && (
        <section className="py-stevens-section-sm lg:py-stevens-section bg-stevens-white border-t">
          <div className="max-w-7xl mx-auto px-stevens-md lg:px-stevens-lg">
            <AnimatedSection className="text-center mb-stevens-2xl">
              <h2 className="font-stevens-display text-stevens-3xl md:text-stevens-4xl font-bold text-stevens-dark-gray mb-stevens-md">
                Latest from Our Blog
              </h2>
              <p className="text-stevens-xl text-stevens-dark-gray max-w-3xl mx-auto">
                Stay informed with insights, tips, and news about online education, career advancement, and technology trends.
              </p>
            </AnimatedSection>

            <AnimatedSection className="grid md:grid-cols-3 gap-stevens-xl mb-stevens-2xl">
              {blogs.map((blog) => (
                <Link 
                  key={blog.id} 
                  to={`/blog/${blog.id}/`} 
                  className="group block"
                >
                  <Card className="h-full flex flex-col hover:shadow-stevens-xl transition-all duration-300 hover:-translate-y-1 border border-stevens-light-gray hover:border-stevens-light-gray overflow-hidden">
                    {/* Compact Image - 16:9 aspect ratio */}
                    <div className="aspect-[16/9] w-full overflow-hidden">
                      <img 
                        src={blog.featured_image_url || '/assets/blog/placeholder-blog.webp'} 
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    
                    <CardContent className="flex-grow p-stevens-lg">
                      
                      
                      {/* Title - Compact */}
                      <h3 className="font-stevens-display text-stevens-xl text-stevens-dark-gray mb-stevens-md mt-stevens-xl line-clamp-2 leading-tight group-hover:text-stevens-red transition-colors duration-300">
                        {blog.title}
                      </h3>
                      
                      {/* Excerpt - Compact */}
                      <p className="text-stevens-dark-gray line-clamp-2 mb-stevens-md text-stevens-sm leading-relaxed">
                        {blog.excerpt}
                      </p>
                      
                      {/* Meta Info - Compact */}
                      <div className="flex items-center gap-stevens-md text-stevens-xs text-stevens-light-gray0">
                        {blog.created_date && (
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(blog.created_date).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric', 
                              year: 'numeric' 
                            })}
                          </span>
                        )}
                        {blog.read_time && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {blog.read_time} min
                          </span>
                        )}
                      </div>
                    </CardContent>
                    
                    {/* Read More Link - Compact */}
                    <CardFooter className="p-stevens-lg pt-0">
                      <div className="text-stevens-red font-stevens-semibold text-stevens-sm flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                        Read More 
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </AnimatedSection>

            {/* View All Blogs Button */}
            <AnimatedSection className="text-center">
              <Link to={createPageUrl("blog/")}>
                <Button variant="outline-dark">
                  View All Blog Posts
                </Button>
              </Link>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Upcoming Events - replaced with Application Support Events cards/content */}
      {events.length > 0 && (
        <section className="py-20 border-t">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="text-center mb-12">
              <h2 className="font-stevens-headers text-3xl font-bold text-stevens-black mb-4">
                Application Support Events
              </h2>
              <p className="text-stevens-xl text-stevens-dark-gray">
                Join us for a live webinar to learn more.
              </p>
            </AnimatedSection>
            <AnimatedSection className="grid md:grid-cols-2 gap-8 mb-8">
              {supportEvents.map((e) => (
                <Card key={e.title} className="border-0 shadow-stevens-lg hover:shadow-stevens-2xl transition-all duration-stevens-normal bg-stevens-white group overflow-hidden h-full">
                  <div className="stevens-md:flex stevens-md:flex-row flex flex-col h-full">
                    {/* Image */}
                    <div className="stevens-md:w-2/5 overflow-hidden flex-shrink-0">
                      <img 
                        {...getCardImageProps(e.image)} 
                        alt={e.title} 
                        className="w-full h-full object-cover min-h-full" 
                        loading="lazy" 
                      />
                    </div>
                    {/* Content */}
                    <CardContent className="stevens-md:w-3/5 p-stevens-lg flex flex-col justify-between flex-1">
                      <div>
                        <p className="text-stevens-xs text-stevens-red font-stevens-bold uppercase tracking-wider my-stevens-xs">On-Demand Event</p>
                        <h3 className="font-stevens-display uppercase font-bold text-stevens-lg font-stevens-bold text-stevens-dark-gray mb-stevens-sm leading-tight group-hover:text-stevens-red transition-colors duration-stevens-normal">{e.title}</h3>
                        <div className="flex items-center gap-stevens-xs text-stevens-sm text-stevens-dark-gray mb-stevens-md">
                          <Clock className="w-4 h-4"/> {e.length}
                        </div>
                      </div>
                      <a href={e.url} target="_blank" rel="noopener noreferrer" className="block mt-stevens-md">
                        <Button>
                          Watch Now
                        </Button>
                      </a>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </AnimatedSection>
            <AnimatedSection className="text-center">
              <Link to="/events/">
                <Button variant="outline-dark">
                  View All Events
                </Button>
              </Link>
            </AnimatedSection>
          </div>
        </section>
      )}

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
