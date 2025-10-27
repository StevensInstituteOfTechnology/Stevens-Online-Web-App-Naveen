import React from 'react';
import { Award, Globe, Star, Target, Clock, Network, ThumbsUp } from 'lucide-react';
import ExploreProgramPageTemplate from '../components/program-pages/ExploreProgramPageTemplate';

const ExploreMEM = () => {
  const memData = {
    // Hero Section
    heroTitle: "Built for Engineers Who Want to Lead",
    programName: "Online Master of Engineering in Engineering Management",
    heroSubtitle: "Advance your engineering career with leadership skills. Technical management program designed for engineers seeking executive roles.",
    bgImage: "/assets/images/1-mem-hero-scaled.webp",
    programCode: "mem",
    seo: {
      title: 'Online MEM in Engineering Management | Stevens',
      description: 'Lead engineering teams with the 100% online MEM in Engineering Management from Stevens Institute of Technology. STEM-designated, flexible format, no GRE required.',
      ogImage: '/assets/images/1-mem-hero-scaled.webp',
      url: '/explore/online-masters-engineering-management/'
    },
    useApplicationModal: true,
    secondaryCta: { label: 'Apply Now', href: 'https://gradadmissions.stevens.edu/apply/?pk=GRNP' },
    badges: [
      { text: "ABET Accredited", icon: Award },
      { text: "100% Online", icon: Globe },
      { text: "No GRE Required", icon: Star }
    ],
    
    // Statistics
    statistics: [
      {
        number: "Top 20",
        label: "For Best Career Placement",
        description: "Ranked among the top private schools for best career placement by The Princeton Review (2024)."
      },
      
      {
        number: "Top 10",
        label: "for ROI",
        description: "Stevens ranks among the top 10 in the nation for ROI, according to U.S. News & World Report (2025).²"
      },
      {
        number: "No. 6",
        label: "In the Nation",
        description: "Named the No. 6 Best Online Master's in Industrial Engineering Program in the country by U.S. News & World Report (2025)."
      }
    ],
    
    // Why Choose Stevens Section
    whyChooseStevensTitle: "WHY CHOOSE STEVENS",
    whyChooseStevensSubtitle: "CAREER-ALIGNED CURRICULUM",
    whyChooseStevensContent: `
      <p>Investing in your future with a graduate degree from Stevens is a smart choice. You will gain access to the same quality programs and distinguished faculty as on-campus graduate students while having the flexibility to study from anywhere in the world. From our nationally recognized stature, to studying with experienced faculty, to connecting with over 50,000 global alumni, we offer unique advantages to support your graduate study.</p>
      
      <p>Our faculty produce groundbreaking research that enables better planning and policy, improves healthcare and treatment, builds our understanding of critical questions, shares useful insight, and makes life safer, more secure and more comfortable. The researchers, practitioners and entrepreneurs that comprise the Stevens Institute of Technology faculty bring innovation and insight to students across disciplines and around the world.</p>
    `,
    
    // New Fall 2025 Section
    newFall2025Badge: "NEW FOR FALL 2025",
    newFall2025Title: "START YOUR DEGREE WITH 2 ASYNCHRONOUS COURSES",
    newFall2025Description: `
      <p>Starting this fall, the first phase of your program has been redesigned around your schedule, and the first two courses you take will now be asynchronous.</p>
      
      <p>Our new asynchronous course format helps you balance graduate study with work and life, without sacrificing the structure or support that defines a Stevens education.</p>
    `,
    newFall2025Benefits: [
      {
        icon: Globe,
        text: "NO LIVE CLASS SESSIONS — LEARN ON YOUR OWN TIME"
      },
      {
        icon: Target,
        text: "WEEKLY MILESTONES THAT KEEP YOU ACCOUNTABLE AND ON TRACK"
      },
      {
        icon: Clock,
        text: "ACCESS TO FACULTY OFFICE HOURS, AI-POWERED ASSISTANCE AND PEER DISCUSSIONS"
      },
      {
        icon: Network,
        text: "DESIGNED FOR WORKING PROFESSIONALS SEEKING FLEXIBILITY AND MOMENTUM"
      },
      {
        icon: ThumbsUp,
        text: "APPLY IN UNDER 5 MINUTES WITH OUR STREAMLINED ASAP APP — NO SUPPLEMENTAL DOCUMENTS REQUIRED (BACHELOR'S DEGREE REQUIRED)"
      }
    ],
    newFall2025Image: "/assets/images/1-explore-mem.webp",
    
    // Just Launched Section
    justLaunchedBadge: "Just Launched",
    justLaunchedTitle: "New Flexible Application Options",
    justLaunchedDescription: `
      <p>We've introduced new application options designed to make enrollment more accessible. These options reduce prerequisite requirements and offer the opportunity to take trial courses.</p>
      
      <p>To learn more, speak with your enrollment advisor to determine the approach that best suits your background, goals and schedule.</p>
    `,
    justLaunchedButtonText: "Request Flexible App Info",
    justLaunchedButtonLink: "#",
    justLaunchedImage: "/assets/images/2-explore-mem.webp",
    
    // Program Benefits
    programBenefitsTitle: "Program Benefits",
    programBenefitsDescription: "The Stevens Online MEM is a technical leadership degree — built by engineers, for engineers — that blends systems thinking, project execution and organizational strategy. You'll gain the cross-functional fluency top employers demand while building deep technical expertise in data science, modeling and risk analysis.<br/><br/> We produce engineering leaders capable of creating, applying and managing technology to solve complex issues, invent new processes and products, build new enterprises and gain insights from their data.100% of 2023 MEM graduates landed jobs within 3 months at companies like BMW, Lockheed Martin, Goldman Sachs and Turner Construction.¹",
    programBenefitsImage: "/assets/images/3-explore-mem.webp",
    programBenefitsHighlights: [
      {
        title: "Two in-demand concentrations:",
        description: "Managerial Analytics or Supply Chain and Logistics Management"
      },
      {
        title: "Built for engineers:",
        description: "Combines technical depth with leadership and strategy for cross-functional fluency"
      },
      {
        title: "T-shaped skills employers value:",
        description: "Python, forecasting, analytics and leadership"
      }
    ],
    
    // Program Details
    programDetails: [
      {
        value: "Not Required",
        label: "GRE/GMAT"
      },
      {
        value: "30",
        label: "Credits"
      },
      {
        value: "10",
        label: "Courses"
      },
      {
        value: "100%",
        label: "Online"
      }
    ],
    
    // Key Dates
    keyDatesTerm: "SPRING 2026",
    keyDates: [
      {
        label: "Early Submit",
        date: "October 14, 2025",
        description: "Deposit Waiver* and Application Fee Waiver Available."
      },
      {
        label: "Priority Submit", 
        date: "November 11, 2025",
        description: "Application Fee Waiver Available and Early Application Review."
      },
      {
        label: "Final Submit",
        date: "January 5, 2026"
      },
      {
        label: "Start of Classes",
        date: "January 20, 2026"
      }
    ],
    keyDatesNote: "*Applicants who apply by the early submit deadline and are admitted may be eligible for a $250 deposit waiver. Applicants who receive education assistance from employers or other tuition discounts are not eligible. Other eligibility conditions may apply. Contact admissions for more information.",
    
    // Contact
    contactTitle: "Want to Learn More?",
    contactDescription: "Request more information to learn about the upcoming cohort of the Online Master of Engineering in Engineering Management program.",
    contactButtonText: "Contact Us"
  };

  return <ExploreProgramPageTemplate {...memData} />;
};

export default ExploreMEM;
