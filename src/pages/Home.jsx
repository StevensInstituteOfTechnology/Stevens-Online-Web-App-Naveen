import React, { useState, useEffect, useCallback } from "react";
import { Program } from "@/api/entities";
import { Event } from "@/api/entities";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
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
} from "lucide-react";
import { motion } from "framer-motion";

import LeadCaptureForm from "../components/forms/LeadCaptureForm";
import ProgramCard from "../components/shared/ProgramCard";
import ProgramReadinessAssessment from "../components/assessment/ProgramReadinessAssessment";
import VideoPlayer from "../components/shared/VideoPlayer";
import { trackConversion, CONVERSION_LABELS } from "@/utils/gtmTracking";

const StatItem = ({ value, label, icon: Icon }) => (
<div className="text-center flex flex-col items-center justify-center">
    <Icon className="w-10 h-10 mx-auto mb-3" />
    <div className="text-3xl font-display font-bold">{value}</div>
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
{
  value: "#19",
  description:
    "Best Online Master's in Computer Information Technology Programs",
  source: "U.S. News & World Report (2025)",
},

];

const badgeRankings = [
{
  image: "/assets/rankings/ranking-badge-1.png",
    description:
      "No. 1 in New Jersey in Best Online Master's in Computer Information Technology Programs",
},
{
  image: "/assets/rankings/ranking-badge-2.png", 
    description: "No. 1 in New Jersey in Best Online MBA Programs",
},
{
  image: "/assets/rankings/ranking-badge-3.png",
    description: "No. 36 Nationally in Best Online Engineering Programs",
  },
];

const TextRankingItem = ({ value, description, source }) => (
<div className="flex items-center gap-stevens-md py-stevens-md border-b border-stevens-gray-200 last:border-b-0">
    <p className="font-stevens-display text-stevens-4xl font-stevens-bold text-stevens-maroon w-36 shrink-0 text-center leading-none">
      {value}
    </p>
        <div>
      <p className="text-stevens-lg font-stevens-semibold text-stevens-gray-900 leading-relaxed">
        {description}
      </p>
      {source && (
        <p className="text-stevens-base text-stevens-gray-900 mt-stevens-xs italic">
          {source}
        </p>
      )}
    </div>
        </div>
);

const BadgeRankingItem = ({ image, description }) => (
<div className="flex items-center gap-stevens-md p-stevens-md bg-stevens-white rounded-stevens-md shadow-stevens-md hover:shadow-stevens-lg transition-all duration-stevens-normal border border-stevens-gray-100 hover:border-stevens-gray-200">
        <div className="relative">
      <img
        src={image}
        alt="Ranking Badge"
        className="w-20 h-20 shrink-0 object-contain"
      />
        </div>
        <div className="flex-1">
      <p className="text-stevens-lg font-stevens-semibold text-stevens-gray-900 leading-relaxed">
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
  const [programs, setPrograms] = useState([]);
  const [events, setEvents] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [showBrowseModal, setShowBrowseModal] = useState(false); // State for modal visibility
  const [showAssessment, setShowAssessment] = useState(true); // State for showing assessment or lead form

  // Application Support Events (reuse same content as Events page)
  const supportEvents = [
    {
      title: 'Application Overview: Online MBA',
      length: '15 minutes',
      url: 'https://event.on24.com/wcc/r/4670707/F1184BBC4542A137E5E8852AA0FF2DBE',
      image: '/assets/images/2-event.png'
    },
    {
      title: 'Application Walkthrough: Computer Science',
      length: '10 minutes',
      url: 'https://event.on24.com/wcc/r/4455092/4C10B1C30D8D20926A28C1A21C667A29',
      image: '/assets/images/3-event.webp'
    },
    {
      title: 'Application Walkthrough: Engineering Management',
      length: '24 minutes',
      url: 'https://event.on24.com/wcc/r/5056716/2FEBB6A6A455A2CCC508FB1183A71810',
      image: '/assets/images/4-event.webp'
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

  const handleAssessmentComplete = useCallback((results) => {
    // Handle assessment completion - could trigger additional actions
    console.log("Assessment completed:", results);
    // Optionally, you might want to show the LeadCaptureForm or redirect after assessment
    // setShowAssessment(false); // Example: Switch to lead form after assessment
  }, []);

  return (
    <div className="font-sans bg-white">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-80"
          style={{ backgroundImage: "url('/assets/images/HEADER-0865.jpg')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-700/10 to-transparent"></div>
        <div className="relative max-w-stevens-content-max mx-auto px-stevens-md sm:px-stevens-lg lg:px-stevens-xl py-stevens-section-sm lg:py-stevens-section">
          <div className="grid lg:grid-cols-2 gap-stevens-gap-lg items-center">
            <div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-4 animate-in slide-in-from-left duration-700">
                Advance Your Career with a World-Class Online Degree from
                Stevens
              </h1>
              <p className="text-xl text-gray-200 mb-8 max-w-xl animate-in slide-in-from-left duration-700">
                Our programs are designed for busy professionals ready to lead
                in the tech-driven world. Let's find the perfect fit for your
                ambition.
              </p>
              <div className="flex flex-col sm:flex-row gap-stevens-md animate-in slide-in-from-left duration-700 delay-400">
                <Link to={createPageUrl("request-information/")} onClick={() => trackConversion(CONVERSION_LABELS.REQUEST_INFO)}>
                  <button className="btn-stevens-primary ">
                    Request Information
                  </button>
                </Link>
                <a
                  href="https://gradadmissions.stevens.edu/apply/?pk=GRNP"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackConversion(CONVERSION_LABELS.APPLY_NOW)}
                >
                  <button className="btn-stevens-outline text-stevens-white hover:bg-stevens-white hover:text-stevens-primary ">
                    Apply Now
                  </button>
                </a>
              </div>
            </div>
            <div className="block lg:block mt-8 lg:mt-0 animate-in slide-in-from-right duration-700">
              {showAssessment ? (
              <div>
                  <ProgramReadinessAssessment
                    onComplete={handleAssessmentComplete}
                  />
                  <div className="text-center mt-4">
                    <Button
                    className="bg-stevens-primary hover:bg-stevens-primary-dark text-white text-lg font-semibold px-6 py-3 rounded-md shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
                      onClick={() => setShowAssessment(false)}
                    >
                      Skip Assessment - Request Info Instead
                    </Button>
                  </div>
                </div>
              ) : (
              <div>
                  <LeadCaptureForm sourcePage="home" />
                  <div className="text-center mt-4">
                    <Button
                    className="bg-stevens-primary hover:bg-stevens-primary-dark text-white text-lg font-semibold px-6 py-3 rounded-md shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
                      onClick={() => setShowAssessment(true)}
                    >
                      Take Program Assessment Instead
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>


      {/* Stats Bar */}
      <AnimatedSection className="section-dark py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatItem
              value="#9"
              label="Best ROI Colleges"
              icon={Award}
            />
            <StatItem value="#19" label="Online IT Programs" icon={Star} />
            <StatItem
              value="Top 10%"
              label="Return on Investment"
              icon={TrendingUp}
            />
            <StatItem value="150+" label="Years of Innovation" icon={Library} />
          </div>
        </div>
      </AnimatedSection>

      {/* Redesigned Rankings & Proof Points Section */}
      <section className="bg-stevens-gray-50 py-stevens-section-sm lg:py-stevens-section">
        <div className="max-w-stevens-content-max mx-auto px-stevens-md lg:px-stevens-lg">
          <AnimatedSection className="text-center mb-stevens-xl">
            <h2 className="font-stevens-display text-stevens-4xl stevens-lg:text-stevens-4xl font-bold text-stevens-gray-900 mb-stevens-lg tracking-tight leading-tight">
              A Degree That <span className="text-stevens-primary">Pays Dividends</span>
            </h2>
            <p className="text-stevens-xl text-stevens-gray-900 max-w-3xl mx-auto">
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
                <p className="text-center font-stevens-semibold text-stevens-gray-900 mt-stevens-sm italic">
                  Source: U.S. News & World Report 2025
                </p>
              </div>
            </AnimatedSection>
          </div>

          
        </div>
      </section>

      {/* Professional Education CTA */}
      <section className="py-stevens-section-sm lg:py-stevens-section bg-stevens-gray-100 relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-stevens-xl right-stevens-2xl w-80 h-80 bg-stevens-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-stevens-xl left-stevens-2xl w-64 h-64 bg-stevens-secondary/5 rounded-full blur-3xl" />
        
        <div className="max-w-stevens-content-max mx-auto px-stevens-md lg:px-stevens-lg">
          <div className="grid lg:grid-cols-2 gap-stevens-gap-lg items-center">
            <AnimatedSection className="relative">
              <div className="bg-stevens-white rounded-stevens-md overflow-hidden shadow-stevens-lg border border-stevens-gray-100">
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
                  <h3 className="font-stevens-display text-stevens-4xl font-bold text-stevens-gray-900 mb-stevens-sm">
                    Discover Your Future at Stevens
                  </h3>
                  <p className="text-stevens-gray-600 mb-stevens-lg">
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
                      <Button className="btn-stevens-primary text-stevens-lg w-full">
                        Explore Courses
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      className="btn-stevens-secondary text-stevens-lg flex-1"
                      onClick={() => setShowBrowseModal(true)}
                    >
                      Browse Catalog
                    </Button>
                  </div> */}
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection>
              
              <h2 className="font-stevens-display text-stevens-3xl stevens-lg:text-stevens-4xl font-bold text-stevens-gray-900 mb-stevens-lg tracking-tight leading-tight">
              THE STEVENS ONLINE ADVANTAGE
              </h2>
              <p className="text-stevens-xl text-stevens-gray-700 mb-stevens-xl leading-relaxed">
              Our Online Master’s Degree Programs are designed to provide the same quality as our highly-ranked on-campus programs. We offer relevant courses, renowned faculty, and individualized support to each student.
              </p>
              <p className="text-stevens-xl text-stevens-gray-700 mb-stevens-xl leading-relaxed">
              Additional benefits of our StevensOnline programs include:
              </p>

              {/* Benefits list to mirror official site */}
              <ul className="space-y-stevens-md mb-stevens-xl text-stevens-lg text-stevens-gray-900">
                <li className="flex items-start gap-stevens-sm">
                  <span className="mt-[6px] h-2 w-2 rounded-full bg-stevens-gray-700" />
                  <span>Global cohort of classmates to learn with and from</span>
                </li>
                <li className="flex items-start gap-stevens-sm">
                  <span className="mt-[6px] h-2 w-2 rounded-full bg-stevens-gray-700" />
                  <span>Direct access to experienced faculty</span>
                </li>
                <li className="flex items-start gap-stevens-sm">
                  <span className="mt-[6px] h-2 w-2 rounded-full bg-stevens-gray-700" />
                  <span>Flexibility for how and where you study</span>
                </li>
              </ul>

              <p className="text-stevens-xl text-stevens-gray-900 mb-stevens-lg leading-relaxed">
                Through our online offerings, you will gain access to the same quality
                programs and distinguished faculty as on-campus students.
              </p>

            </AnimatedSection>
          </div>
        </div>
      </section>
      
      {/* Program Showcase Section */}
      <section className="py-stevens-section-sm lg:py-stevens-section bg-stevens-primary">
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
                    className="underline hover:text-stevens-gray-200 transition-colors duration-stevens-normal"
                  >
                    online computer science master's program
                  </Link>{" "}
                  at Stevens offers you a curriculum aligned with high-demand areas such as software development, web programming, mobile systems and applications, cloud computing, human-computer interaction, and enterprise software design.
                </p>
                <Link to={createPageUrl("online-masters-computer-science-mscs/")}>
                  <button className="bg-stevens-white text-stevens-primary hover:bg-stevens-gray-100 px-stevens-lg py-stevens-md rounded-stevens-md font-stevens-semibold transition-all duration-stevens-normal shadow-stevens-md hover:shadow-stevens-lg">
                    LEARN MORE
                  </button>
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
                    className="underline hover:text-stevens-gray-200 transition-colors duration-stevens-normal"
                  >
                     Online MBA
                  </Link>{" "}
                   is an AACSB-accredited program offered part time through online courses. The Online MBA combines business knowledge with the technology and analytics necessary to excel in today's data-centric world. Students will build upon their managerial toolkits with analytical, data literacy, marketing and operations management skills that drive data-based decisions.
                </p>
                <Link to={createPageUrl("online-mba/")}>
                  <button className="bg-stevens-white text-stevens-primary hover:bg-stevens-gray-100 px-stevens-lg py-stevens-md rounded-stevens-md font-stevens-semibold transition-all duration-stevens-normal shadow-stevens-md hover:shadow-stevens-lg">
                    LEARN MORE
                  </button>
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
                    className="underline hover:text-stevens-gray-200 transition-colors duration-stevens-normal"
                  >
                    Online Master of Engineering in Engineering Management
                  </Link>{" "}
                  program are prepared to add value at the intersection of engineering and management and assume professional positions of increasing responsibility.
                </p>
                <Link to={createPageUrl("online-masters-engineering-management/")}>
                  <button className="bg-stevens-white text-stevens-primary hover:bg-stevens-gray-100 px-stevens-lg py-stevens-md rounded-stevens-md font-stevens-semibold transition-all duration-stevens-normal shadow-stevens-md hover:shadow-stevens-lg">
                    LEARN MORE
                  </button>
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
                  <button className="bg-stevens-white text-stevens-primary hover:bg-stevens-gray-100 px-stevens-lg py-stevens-md rounded-stevens-md font-stevens-semibold transition-all duration-stevens-normal shadow-stevens-md hover:shadow-stevens-lg">
                    LEARN MORE
                  </button>
                </Link>
              </div>
            </AnimatedSection>

          </div>
        </div>
      </section>

      
      {/* Why Stevens Section */}
      <section className="py-stevens-section-sm lg:py-stevens-section bg-gray-50">
        <div className="max-w-stevens-content-max mx-auto px-stevens-md lg:px-stevens-lg">
          <AnimatedSection className="grid lg:grid-cols-2 gap-stevens-gap-lg items-center mb-stevens-xl">
            <div>
              <h2 className="font-display text-3xl font-bold text-gray-900 mb-4">
                A Legacy of Innovation Meets Online Flexibility
              </h2>
              <p className="text-stevens-xl text-stevens-gray-900 mb-6">
                At Stevens, you don't have to choose between a prestigious
                degree and a flexible online format. Our programs are designed
                for working professionals, offering the same rigorous curriculum
                and world-class faculty as our on-campus degrees. You'll gain
                career-ready skills and join a powerful alumni network, all on
                your schedule.
              </p>
              
            </div>
            <img
              src="/assets/images/stevens-campus.png"
              alt="Stevens campus with NYC skyline"
              className="rounded-stevens-md shadow-xl"
            />
          </AnimatedSection>
          <AnimatedSection className="grid lg:grid-cols-2 gap-12 items-center">
          <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
              alt="Students collaborating online"
              className="rounded-stevens-md shadow-xl lg:order-1"
            />
            <div className="lg:order-2">
              <h2 className="font-display text-3xl font-bold text-gray-900 mb-4">
                A Community That Supports Your Success
              </h2>
              <p className="text-stevens-xl text-stevens-gray-900 mb-6">
                From your first inquiry to graduation and beyond, you are a
                valued member of the Stevens community. Our dedicated enrollment
                advisors, student support services, and active alumni network
                are here to help you achieve your goals. Engage with faculty and
                peers in a collaborative online environment built for
                connection.
              </p>
              <Link to={createPageUrl("OnlineLearning")}>
                <Button className="btn-stevens-primary ">
                  Explore the Student Experience 
                  <ArrowRight className="w-5 h-5 ml-stevens-sm" />
                </Button>
              </Link>
            </div>
            
          </AnimatedSection>
        </div>
      </section>

      {/* Testimonial Section */}
      <AnimatedSection className="bg-stevens-primary py-stevens-section">
        <div className="max-w-stevens-content-max mx-auto px-stevens-sm stevens-md:px-stevens-lg stevens-xl:px-stevens-xl">
          <div className="mx-auto text-center">
          <img
              src="assets/avatars/home-avatar/ArshadS_H_S_L.webp"
              alt="Alumni portrait"
              className="mb-4 mx-auto w-24 h-24 rounded-full object-cover border-4 border-stevens-white shadow-stevens-lg"
            />
            <blockquote className="text-stevens-2xl leading-snug italic text-stevens-white mb-stevens-md">
              "Stevens Online is dedicated to delivering world-class technology
              education to working professionals worldwide, empowering them to
              advance their careers and drive innovation in tomorrow's digital
              economy through flexible, accessible, and industry-relevant online
              programs."
            </blockquote>
            <cite className="not-italic font-stevens-semibold text-stevens-white">— Arshad Saiyed</cite>
            <br />
            <cite className="not-italic font-stevens-semibold text-stevens-white">
              Chief Online Learning Officer and Dean of the College of Professional Education
            </cite>
          </div>
        </div>
      </AnimatedSection>

      {/* Key Dates & Deadlines Section */}
      <section className="bg-stevens-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="text-center mb-16">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Key Dates & Deadlines
                </h2>
                <p className="text-stevens-xl text-stevens-gray-900 max-w-3xl mx-auto">
                    Plan your application for the upcoming Spring 2026 term.
                </p>
            </AnimatedSection>
            
            <AnimatedSection>
              <Card className="shadow-xl border-0 overflow-hidden ">
                  <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse border border-gray-300">
                          <thead className="bg-gray-100">
                              <tr>
                      <th className="p-4 font-semibold uppercase text-stevens-white tracking-wider bg-stevens-primary border border-gray-300">
                        Term
                      </th>
                      <th className="p-4 font-semibold uppercase text-stevens-white tracking-wider bg-stevens-primary border border-gray-300">
                        Early Submit
                      </th>
                      <th className="p-4 font-semibold uppercase text-stevens-white tracking-wider bg-stevens-primary border border-gray-300">
                        Priority Submit
                      </th>
                      <th className="p-4 font-semibold uppercase text-stevens-white tracking-wider bg-stevens-primary border border-gray-300">
                        Final Submit
                      </th>
                      <th className="p-4 font-semibold uppercase text-stevens-white tracking-wider bg-stevens-primary border border-gray-300">
                        Start of Classes
                      </th>
                              </tr>
                          </thead>
                          <tbody>
                    <tr className="bg-white">
                      <td className="p-4 font-bold text-base whitespace-nowrap align-top border border-gray-300">
                        Spring 2026
                      </td>
                      <td className="p-4 align-top border border-gray-300">
                        <div className="font-bold text-gray-900">
                          October 14, 2025
                        </div>
                        <div className="text-stevens-gray-900 mt-1 text-stevens-sm">
                          Deposit Waiver* and Application Fee Waiver Available.
                        </div>
                      </td>
                      <td className="p-4 align-top border border-gray-300">
                        <div className="font-bold text-gray-900">
                          November 11, 2025
                        </div>
                        <div className="text-stevens-gray-900 mt-1 text-stevens-sm">
                          Application Fee Waiver Available and Early Application
                          Review.
                        </div>
                      </td>
                      <td className="p-4 font-bold text-gray-900 whitespace-nowrap align-top border border-gray-300">
                        January 5, 2026
                                  </td>
                      <td className="p-4 font-bold text-gray-900 whitespace-nowrap align-top border border-gray-300">
                        January 20, 2026
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                  </div>
              </Card>
            </AnimatedSection>
            
            <AnimatedSection className="text-center mt-6 text-stevens-sm text-stevens-gray-900 max-w-4xl mx-auto">
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
              <h2 className="font-stevens-display text-stevens-3xl md:text-stevens-4xl font-bold text-stevens-gray-900 mb-stevens-md">
                Latest from Our Blog
              </h2>
              <p className="text-stevens-xl text-stevens-gray-700 max-w-3xl mx-auto">
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
                  <Card className="h-full flex flex-col hover:shadow-stevens-xl transition-all duration-300 hover:-translate-y-1 border border-stevens-gray-200 hover:border-stevens-primary/30 overflow-hidden">
                    {/* Compact Image - 16:9 aspect ratio */}
                    <div className="aspect-[16/9] w-full overflow-hidden">
                      <img 
                        src={blog.featured_image_url || '/assets/blog/placeholder-blog.jpg'} 
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    
                    <CardContent className="flex-grow p-stevens-lg">
                      
                      
                      {/* Title - Compact */}
                      <h3 className="font-stevens-display text-stevens-xl text-stevens-gray-900 mb-stevens-md mt-stevens-xl line-clamp-2 leading-tight group-hover:text-stevens-primary transition-colors duration-300">
                        {blog.title}
                      </h3>
                      
                      {/* Excerpt - Compact */}
                      <p className="text-stevens-gray-600 line-clamp-2 mb-stevens-md text-stevens-sm leading-relaxed">
                        {blog.excerpt}
                      </p>
                      
                      {/* Meta Info - Compact */}
                      <div className="flex items-center gap-stevens-md text-stevens-xs text-stevens-gray-500">
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
                      <div className="text-stevens-primary font-stevens-semibold text-stevens-sm flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
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
                <Button variant="outline" className="btn-stevens-secondary">
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
              <h2 className="font-display text-3xl font-bold text-gray-900 mb-4">
                Application Support Events
              </h2>
              <p className="text-stevens-xl text-stevens-gray-900">
                Join us for a live webinar to learn more.
              </p>
            </AnimatedSection>
            <AnimatedSection className="grid md:grid-cols-2 gap-8 mb-8">
              {supportEvents.map((e) => (
                <Card key={e.title} className="border-0 shadow-stevens-lg hover:shadow-stevens-2xl transition-all duration-stevens-normal bg-stevens-white group overflow-hidden h-full">
                  <div className="stevens-md:flex stevens-md:flex-row flex flex-col h-full">
                    {/* Image */}
                    <div className="stevens-md:w-2/5 overflow-hidden flex-shrink-0">
                      <img src={e.image} alt={e.title} className="w-full h-full object-cover min-h-full" />
                    </div>
                    {/* Content */}
                    <CardContent className="stevens-md:w-3/5 p-stevens-lg flex flex-col justify-between flex-1">
                      <div>
                        <p className="text-stevens-xs text-stevens-primary font-stevens-bold uppercase tracking-wider my-stevens-xs">On-Demand Event</p>
                        <h3 className="font-stevens-display uppercase font-bold text-stevens-lg font-stevens-bold text-stevens-gray-900 mb-stevens-sm leading-tight group-hover:text-stevens-primary transition-colors duration-stevens-normal">{e.title}</h3>
                        <div className="flex items-center gap-stevens-xs text-stevens-sm text-stevens-gray-600 mb-stevens-md">
                          <Clock className="w-4 h-4"/> {e.length}
                        </div>
                      </div>
                      <a href={e.url} target="_blank" rel="noopener noreferrer" className="block mt-stevens-md">
                        <Button className="bg-stevens-primary text-stevens-white hover:bg-stevens-maroon-dark transition-all duration-stevens-normal font-stevens-semibold px-stevens-lg py-stevens-md">
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
                <Button variant="outline" className="btn-stevens-secondary">
                  View All Events
                </Button>
              </Link>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Browse Courses Modal */}
      {showBrowseModal && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-stevens-md shadow-xl w-full max-w-md relative">
            <button
            onClick={() => setShowBrowseModal(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-stevens-gray-900 focus:outline-none transition-colors duration-300"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-2xl font-bold mb-6 text-center text-gray-900">
              Browse Our Course Catalog
            </h3>
            <p className="text-stevens-gray-900 mb-6 text-center">
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
                <Button className="w-full btn-secondary py-3 text-lg font-semibold hover:bg-red-800 hover:text-white transition-all duration-300">
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
                  variant="outline"
                  className="w-full btn-outline-maroon py-3 text-lg font-semibold hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-300"
                >
                  Public Learner
                </Button>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
