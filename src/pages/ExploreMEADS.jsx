import React from 'react';
import { Award, Globe, Star, Target, Clock, Network, ThumbsUp } from 'lucide-react';
import ExploreProgramPageTemplate from '../components/program-pages/ExploreProgramPageTemplate';
import CertificateTuitionCardsHero from '../components/program-pages/CertificateTuitionCardsHero';
import { KEY_DATES } from '@/config/constants';
import { usePageTracking } from '@/hooks/analytics/usePageTracking';
import { ProgramContextProvider } from '@/contexts/analytics/ProgramContext';
import { PageContextProvider } from '@/contexts/analytics/PageContext';

const ExploreMEADS = () => {
  usePageTracking({
    pageType: 'explore',
    programCode: 'meads',
    additionalData: {
      program_name: 'Master of Engineering in Applied Data Science',
      has_embedded_form: true,
      has_pricing_cards: true
    }
  });
  
  const meadsData = {
    // Hero Section
    heroTitle: "Master AI & Machine Learning Engineering.",
    programName: "Build What's Next.",
    heroSubtitle: "Train LLMs, deploy production ML systems, and lead AI initiatives. Engineering-first curriculum for the AI age.",
    bgImage: "/assets/images/explore-meads/stevens-manhattan-skyline-ds.webp", 
    programCode: "meads",
    seo: {
      title: 'Online M.Eng. in Applied Data Science - AI & ML | Stevens',
      description: 'Master AI engineering, machine learning, and LLMs. Build production ML systems. $24,000 for 30 credits. 100% online from Stevens.',
      ogImage: '/assets/images/explore-meads/stevens-manhattan-skyline-ds.webp',
      url: '/explore/online-masters-eng-applied-data-science/'
    },
    secondaryCta: { label: 'Apply In Minutes', to: 'accelerated-application' },
    // badges: [
    //   { text: "GMAT/GRE Not Required", icon: Award },
    //   { text: "100% Online", icon: Globe },
    //   { text: "30 Credits", icon: Star }
    // ],
    
    // ======================================================
    // Statistics
    statistics: [
      {
        number: "#12",
        label: "For Best Career Placement",
        description: "Ranked No. 12 on The Princeton Review's 'Top 20 Best Career Placement' list (2025)."
      },
      {
        number: "Top 10",
        label: "For ROI",
        description: "Stevens ranks among the top 10 in the nation for ROI, according to U.S. News & World Report (2025).²"
      },
      {
        number: "99%",
        label: "Employment",
        description: "99% of MSCS graduates in the Class of 2023 accepted job offers within three months of graduating."
      },
      {
        number: "#15",
        label: "For Best Value",
        description: "Payscale (2024)."
      },
      {
        number: "7x",
        label: "Winner",
        description: "U.S. Distance Learning Association's 21st Century Award for Best Practices in Distance Learning."
      },
    ],
    
    // Why Choose Stevens Section
    whyChooseStevensTitle: "WHY CHOOSE STEVENS",
    whyChooseStevensSubtitle: "CAREER-ALIGNED CURRICULUM",
    whyChooseStevensContent: `
      <p class="font-stevens-body">Investing in your future with a graduate degree from Stevens is a smart choice. You will gain access to the same quality programs and distinguished faculty as on-campus graduate students while having the flexibility to study from anywhere in the world. From our nationally recognized stature, to studying with experienced faculty, to connecting with over 50,000 global alumni, we offer unique advantages to support your graduate study.</p>

      <p class="font-stevens-body">Our faculty produce groundbreaking research that enables better planning and policy, improves healthcare and treatment, builds our understanding of critical questions, shares useful insight, and makes life safer, more secure and more comfortable. The researchers, practitioners and entrepreneurs that comprise the Stevens Institute of Technology faculty bring innovation and insight to students across disciplines and around the world.</p>
    `,
    whyChooseStevensVideo: "/assets/videos/Stevens Online Home - 1.mp4", // Placeholder
    whyChooseStevensVideoCover: "/assets/videos/video-cover-3.avif", // Placeholder
  
    // Program Benefits
    programBenefitsTitle: "Program Overview",
    programBenefitsDescription: "The AI revolution is here. Organizations need engineers who can build, deploy, and scale intelligent systems—from training large language models to operationalizing machine learning pipelines. The M.Eng. in Applied Data Science prepares you to lead AI initiatives across industries.<br/><br/>Through an engineering-first curriculum, you'll master the full AI lifecycle: <strong>data engineering, ML model development, LLM fine-tuning, MLOps, and production deployment</strong>. Work with cutting-edge frameworks like PyTorch, TensorFlow, Hugging Face, and cloud AI platforms. Learn to build AI systems that are not just powerful, but responsible—with ethics, explainability, and governance integrated throughout. <ul class='list-disc pl-5 my-5'><li>Build production-ready AI and ML systems from scratch</li><li>Master LLMs, deep learning, and modern AI architectures</li><li>Learn MLOps: CI/CD for machine learning, model monitoring, and deployment</li><li>Hands-on projects with real datasets and AI tools used at Google, Meta, and leading tech companies</li><li>Flexible, asynchronous online format designed for working AI professionals</li></ul>",
        programBenefitsImage: "/assets/images/explore-msai/1-explore-msai.webp", // Placeholder
    programBenefitsHighlights: [
      {
        title: "Excellence in Online Education",
        description: "StevensOnline is a seven-time winner of the 21st Century Award for Best Practices in Distance Learning by the United States Distance Learning Association."
      },
      {
        title: "Engineering-First Approach",
        description: "Learn distributed systems, cloud platforms, data pipelines, and MLOps from faculty with real-world engineering experience."
      },
      {
        title: "Industry Partnerships",
        description: "Benefit from Stevens' strong connections with leading tech companies and access to cutting-edge tools and platforms."
      }
    ],
    
    // Program Details
    programDetails: [
      {
        value: "Not Required",
        label: "GMAT/GRE"
      },
      {
        value: "$24,000",
        label: "Total Cost"
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
    keyDatesTerm: KEY_DATES.TERM.nameUppercase,
    keyDates: [
      {
        label: "Early Submit",
        date: KEY_DATES.EARLY_SUBMIT.date,
        description: KEY_DATES.EARLY_SUBMIT.details
      },
      {
        label: "Priority Submit", 
        date: KEY_DATES.PRIORITY_SUBMIT.date,
        description: KEY_DATES.PRIORITY_SUBMIT.details
      },
      {
        label: "Final Submit",
        date: KEY_DATES.FINAL_SUBMIT.date
      },
      {
        label: "Start of Classes",
        date: KEY_DATES.START_OF_CLASSES.date
      }
    ],
    keyDatesNote: "*Applicants who apply by the early submit deadline and are admitted may be eligible for a $250 deposit waiver. Applicants who receive tuition discounts are not eligible. Other eligibility conditions may apply.",
    
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
        text: "NO LIVE CLASS SESSIONS - LEARN ON YOUR OWN TIME"
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
        text: "APPLY IN UNDER 5 MINUTES WITH OUR STREAMLINED ASAP APP - NO SUPPLEMENTAL DOCUMENTS REQUIRED (BACHELOR'S DEGREE REQUIRED)"
      }
    ],
    newFall2025Image: "/assets/images/explore-mem/1-explore-mem.webp",
    
    // Just Launched Section
    justLaunchedBadge: "Just Launched",
    justLaunchedTitle: "Accelerated Application Now Available",
    justLaunchedDescription: `
      <p class="font-stevens-body">Fast-track your application with our new <strong>Accelerated App</strong> designed for busy professionals. This streamlined process removes traditional barriers while maintaining Stevens' academic standards.</p>

      <p class="font-stevens-body">Get started immediately with no letters of recommendation required, upload unofficial transcripts, and submit your resume or LinkedIn profile. Official transcripts are due within one year of enrollment.</p>
    `,
    justLaunchedButtonText: "Apply Now",
    justLaunchedButtonLink: "/accelerated-application/",
    justLaunchedImage: "/assets/images/explore-mem/2-explore-mem.webp",
    
    // Contact
    contactTitle: "Ready to Take the Next Step?",
    contactDescription: "Schedule a call with our admissions team to discuss your goals and learn about the upcoming cohort of the M.Eng. in Applied Data Science program.",
    contactButtonText: "Schedule a Call"
  };

  return (
    <PageContextProvider pageType="explore" pageName="ExploreMEADS">
      <ProgramContextProvider 
        programCode="meads"
        programName="Master of Engineering in Applied Data Science"
        programType="degree"
      >
        <ExploreProgramPageTemplate 
          {...meadsData} 
          heroBottomContent={<CertificateTuitionCardsHero cards={[
            { value: "$800", label: "Per Credit" },
            { value: "$24,000", label: "Total Program Cost" }
          ]} />}
        />
      </ProgramContextProvider>
    </PageContextProvider>
  );
};

export default ExploreMEADS;
