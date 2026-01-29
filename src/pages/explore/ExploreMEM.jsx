import React from "react";
import { KEY_DATES_FALL } from "@/config/constants";
import {
  Award,
  Globe,
  Star,
  Target,
  Clock,
  Network,
  ThumbsUp,
} from "lucide-react";
import { ExploreTemplate } from "../../components/explore-pages";
import { usePageTracking } from "@/hooks/analytics/usePageTracking";
import { ProgramContextProvider } from "@/contexts/analytics/ProgramContext";
import { PageContextProvider } from "@/contexts/analytics/PageContext";

const ExploreMEM = () => {
  usePageTracking({
    pageType: "explore",
    programCode: "mem",
    additionalData: {
      program_name: "Master of Engineering in Engineering Management",
      has_embedded_form: true,
      has_application_modal: true,
    },
  });

  const memData = {
    // Hero Section
    heroTitle: "Built for Engineers Who Want to Lead",
    programName: "Online Master of Engineering in Engineering Management",
    heroSubtitle:
      "Advance your career with a top-ranked engineering management degree that combines online flexibility with an affordable path to leadership.",
    bgImage: "/assets/images/mem/1-mem-hero-scaled.webp",
    programCode: "mem",
    seo: {
      title: "Online MEM in Engineering Management | Stevens",
      description:
        "Lead engineering teams with the 100% online MEM in Engineering Management from Stevens Institute of Technology. STEM-designated, flexible format, no GRE required.",
      ogImage: "/assets/images/mem/1-mem-hero-scaled.webp",
      url: "/explore/online-masters-engineering-management/",
    },
    useApplicationModal: true,
    secondaryCta: {
      label: "Apply In Minutes",
      href: "https://gradadmissions.stevens.edu/apply/?pk=GRNP",
    },

    // Statistics
    statistics: [
      {
        number: "No. 6",
        label: "In the Nation",
        description:
          "Recognized as the No. 6 Best Online Master's in Industrial Engineering Program in the country by U.S. News & World Report (2025).",
      },

      {
        number: "No. 15",
        label: "For Best Value",
        description:
          'Ranks No. 15 among "Best Value Colleges" By Payscale (2024).',
      },
      {
        number: "#12",
        label: "For Best Career Placement",
        description:
          "Ranked No. 12 on The Princeton Review's 'Top 20 Best Career Placement' list (2025).",
      },
      {
        number: "100%",
        label: "Employment",
        description:
          "Three months after graduation, 100% of MEM graduates in the Class of 2023 accepted job offers.¹",
      },
      {
        number: "No. 1",
        label: "In N.J.",
        description:
          "Named the No. 1 Online Master's in Engineering Program at a N.J. school (U.S. News & World Report, 2022).",
      },
    ],

    // Why Choose Stevens Section
    whyChooseStevensTitle: "WHY CHOOSE STEVENS",
    whyChooseStevensSubtitle: "CAREER-ALIGNED CURRICULUM",
    whyChooseStevensContent: `
      <p class="font-stevens-body">Investing in your future with a graduate degree from Stevens is a smart choice. You will gain access to the same quality programs and distinguished faculty as on-campus graduate students while having the flexibility to study from anywhere in the world. From our nationally recognized stature, to studying with experienced faculty, to connecting with over 50,000 global alumni, we offer unique advantages to support your graduate study.</p>

      <p class="font-stevens-body">Our faculty produce groundbreaking research that enables better planning and policy, improves healthcare and treatment, builds our understanding of critical questions, shares useful insight, and makes life safer, more secure and more comfortable. The researchers, practitioners and entrepreneurs that comprise the Stevens Institute of Technology faculty bring innovation and insight to students across disciplines and around the world.</p>
    `,

    // New Fall 2025 Section
    newFall2025Badge: "NEW FOR FALL 2025",
    newFall2025Title: "START YOUR DEGREE WITH 2 ASYNCHRONOUS COURSES",
    newFall2025Description: `
      <p class="font-stevens-body">Starting this fall, the first phase of your program has been redesigned around your schedule, and the first two courses you take will now be asynchronous.</p>

      <p class="font-stevens-body">Our new asynchronous course format helps you balance graduate study with work and life, without sacrificing the structure or support that defines a Stevens education.</p>
    `,
    newFall2025Benefits: [
      {
        icon: Globe,
        text: "NO LIVE CLASS SESSIONS - LEARN ON YOUR OWN TIME",
      },
      {
        icon: Target,
        text: "WEEKLY MILESTONES THAT KEEP YOU ACCOUNTABLE AND ON TRACK",
      },
      {
        icon: Clock,
        text: "ACCESS TO FACULTY OFFICE HOURS, AI-POWERED ASSISTANCE AND PEER DISCUSSIONS",
      },
      {
        icon: Network,
        text: "DESIGNED FOR WORKING PROFESSIONALS SEEKING FLEXIBILITY AND MOMENTUM",
      },
      {
        icon: ThumbsUp,
        text: "APPLY IN UNDER 5 MINUTES WITH OUR STREAMLINED ASAP APP - NO SUPPLEMENTAL DOCUMENTS REQUIRED (BACHELOR'S DEGREE REQUIRED)",
      },
    ],
    newFall2025Image: "/assets/images/explore-mem/1-explore-mem.webp",

    // Just Launched Section
    justLaunchedBadge: "Just Launched",
    justLaunchedTitle: "New Flexible Application Options",
    justLaunchedDescription: `
      <p class="font-stevens-body">We've introduced new application options designed to make enrollment more accessible. These options reduce prerequisite requirements and offer the opportunity to take trial courses.</p>

      <p class="font-stevens-body">To learn more, speak with your enrollment advisor to determine the approach that best suits your background, goals and schedule.</p>
    `,
    justLaunchedButtonText: "Request Flexible App Info",
    justLaunchedButtonLink: "/request-information/",
    justLaunchedImage: "/assets/images/explore-mem/2-explore-mem.webp",

    // Program Benefits
    programBenefitsTitle: "Program Benefits",
    programBenefitsDescription:
      "The Stevens Online MEM is a technical leadership degree - built by engineers, for engineers - that blends systems thinking, project execution and organizational strategy. You'll gain the cross-functional fluency top employers demand while building deep technical expertise in data science, modeling and risk analysis.<br/><br/> We produce engineering leaders capable of creating, applying and managing technology to solve complex issues, invent new processes and products, build new enterprises and gain insights from their data.100% of 2023 MEM graduates landed jobs within 3 months at companies like BMW, Lockheed Martin, Goldman Sachs and Turner Construction.¹",
    programBenefitsImage: "/assets/images/explore-mem/3-explore-mem.webp",
    programBenefitsHighlights: [
      {
        title: "Two in-demand concentrations:",
        description:
          "Managerial Analytics or Supply Chain and Logistics Management",
      },
      {
        title: "Built for engineers:",
        description:
          "Combines technical depth with leadership and strategy for cross-functional fluency",
      },
      {
        title: "T-shaped skills employers value:",
        description: "Python, forecasting, analytics and leadership",
      },
    ],

    // Program Details
    programDetails: [
      {
        value: "Not Required",
        label: "GRE/GMAT",
      },
      {
        value: "30",
        label: "Credits",
      },
      {
        value: "10",
        label: "Courses",
      },
      {
        value: "100%",
        label: "Online",
      },
    ],

    // Key Dates
    keyDatesTerm: KEY_DATES_FALL.TERM.nameUppercase,
    keyDates: [
      {
        label: "Early Submit",
        date: KEY_DATES_FALL.EARLY_SUBMIT.date,
        description: KEY_DATES_FALL.EARLY_SUBMIT.details,
      },
      {
        label: "Priority Submit",
        date: KEY_DATES_FALL.PRIORITY_SUBMIT.date,
        description: KEY_DATES_FALL.PRIORITY_SUBMIT.details,
      },
      {
        label: "Final Submit",
        date: KEY_DATES_FALL.FINAL_SUBMIT.date,
      },
      {
        label: "Start of Classes",
        date: KEY_DATES_FALL.START_OF_CLASSES.date,
      },
    ],
    keyDatesNote:
      "*Applicants who apply by the early submit deadline and are admitted may be eligible for a $250 deposit waiver. Applicants who receive education assistance from employers or other tuition discounts are not eligible. Other eligibility conditions may apply. Contact admissions for more information.",

    // Contact
    contactTitle: "Ready to Take the Next Step?",
    contactDescription:
      "Schedule a call with our admissions team to discuss your goals and learn about the upcoming cohort of the Online Master of Engineering in Engineering Management program.",
    contactButtonText: "Schedule a Call",
  };

  return (
    <PageContextProvider pageType="explore" pageName="ExploreMEM">
      <ProgramContextProvider
        programCode="mem"
        programName="Master of Engineering in Engineering Management"
        programType="degree"
      >
        <ExploreTemplate {...memData} />
      </ProgramContextProvider>
    </PageContextProvider>
  );
};

export default ExploreMEM;
