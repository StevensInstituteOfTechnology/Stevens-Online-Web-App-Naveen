import React from 'react';
import { KEY_DATES } from '@/config/constants';
import { Award, Globe, Star, Target, Clock, Network, ThumbsUp, Code } from 'lucide-react';
import ExploreProgramPageTemplate from '../components/program-pages/ExploreProgramPageTemplate';
import { usePageTracking } from '@/hooks/analytics/usePageTracking';
import { ProgramContextProvider } from '@/contexts/analytics/ProgramContext';
import { PageContextProvider } from '@/contexts/analytics/PageContext';

const ExploreMSCS = () => {
  // Automatic page tracking with context
  usePageTracking({
    pageType: 'explore',
    programCode: 'mscs',
    additionalData: {
      program_name: 'Master of Science in Computer Science',
      has_embedded_form: true,
      has_application_modal: true
    }
  });
  
  const mscsData = {
    // Hero Section
    heroTitle: "Build What's Next in Tech. All Experience Levels Welcome.",
    programName: "Online Master's in Computer Science",
    heroSubtitle: "Master advanced computer science skills through our 100% online curriculum. No GRE/GMAT required. Up to $16K in scholarships available.",
    bgImage: "/assets/images/stevens-campus.png", // Placeholder
    programCode: "mscs",
    seo: {
      title: "Online Master's in Computer Science | Stevens Institute of Technology",
      description: "Earn your 100% online Master's in Computer Science (MSCS) from Stevens Institute of Technology. Build in-demand tech skills and advance your career in under 2 years.",
      ogImage: '/assets/images/stevens-campus.png',
      url: '/explore/online-masters-computer-science/'
    },
    useApplicationModal: true,
    secondaryCta: { label: 'Apply In Minutes', href: 'https://gradadmissions.stevens.edu/apply/?pk=GRNP' },
    badges: [
      { text: "No. 1 in New Jersey", icon: Award },
      { text: "100% Online", icon: Globe },
      { text: "Up to $16K Off Tuition", icon: Star }
    ],
    
    // Statistics
    statistics: [
      {
        number: "99%",
        label: "Employment",
        description: "99% of MSCS graduates in the Class of 2023 accepted job offers within three months of graduating.¹ Our graduates land roles at companies like Amazon, JPMorgan Chase, PwC and Google - a testament to the real-world value and ROI of your Stevens education."
      },
      {
        number: "No. 1",
        label: "Best IT Programs",
        description: "Stevens is ranked No. 1 in New Jersey for Best Online Master's in Computer Information Technology Programs by U.S. News & World Report (2025)."
      },
     
      {
        number: "Top 10",
        label: "For ROI",
        description: "Stevens ranks among the top 10 in the nation for ROI, according to U.S. News & World Report (2025).²"
      }
    ],
    
    // Why Choose Stevens Section
    whyChooseStevensTitle: "WHY CHOOSE STEVENS",
    whyChooseStevensSubtitle: "CURRICULUM CO-CREATED WITH INDUSTRY",
    whyChooseStevensContent: `
      <p><strong>STEVENS GRADS LAND JOBS AT GOOGLE, BANK OF AMERICA, JPMORGAN CHASE</strong></p>
      
      <p>Computer science jobs are projected to grow 26% by 2033, according to the U.S. Bureau of Labor Statistics - more than five times the national average. In an increasingly connected world, you will learn in-demand computer science skills with the support of experienced faculty who consult for industry giants like Google, IBM, Bell Labs and Microsoft, and graduate with a competitive edge to meet the critical needs of an expanding job sector across various industries.</p>
    `,
    whyChooseStevensVideo: "/assets/videos/Stevens Online MBA - 1.mp4", // Placeholder
    whyChooseStevensVideoCover: "/assets/videos/video-cover-1.avif", // Placeholder
    
    // New Fall 2025 Section
    newFall2025Badge: "NEW FOR FALL 2025",
    newFall2025Title: "START YOUR DEGREE WITH 2–4 ASYNCHRONOUS COURSES",
    newFall2025Description: `
      <p>Starting this fall, the first phase of your program has been redesigned around your schedule. Depending on your track (traditional or advanced), your first two to four courses will now be asynchronous.</p>
      
      <p>Our new asynchronous course format helps you balance graduate study with work and life, without sacrificing the structure or support that defines a Stevens education.</p>
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
    newFall2025Image: "/assets/images/stevens-campus.png", // Placeholder
    
    // Just Launched Section
    justLaunchedBadge: "JUST LAUNCHED",
    justLaunchedTitle: "NEW FLEXIBLE APPLICATION OPTIONS",
    justLaunchedDescription: `
      <p>We've introduced new application options designed to make enrollment more accessible. These options reduce prerequisite requirements and offer the opportunity to take trial courses.</p>
      
      <p>To learn more, speak with your enrollment advisor to determine the approach that best suits your background, goals and schedule.</p>
    `,
    justLaunchedButtonText: "Request Flexible App Info",
    justLaunchedButtonLink: "#",
    justLaunchedImage: "/assets/images/3-explore-mscs.webp", 
    
    // Program Benefits
    programBenefitsTitle: "Program Benefits",
    programBenefitsDescription: "At Stevens, we cultivate the next generation of innovators through our 100% online, leading-edge curriculum. You'll gain future-ready skills taught by faculty who led engineering at IBM, Microsoft and AT&T Labs. Our career-aligned curriculum is designed for real-world impact, so you don't just learn how to code, you learn how to solve complex problems and lead in a fast-changing field.",
    programBenefitsImage: "/assets/images/1-explore-mscs.webp", // Placeholder
    programBenefitsHighlights: [
      {
        title: "Program Advantages:",
        description: "Hands-on training in Java, Python, AI, machine learning and secure cloud systems"
      },
      {
        title: "Faculty with real-world experience:",
        description: "Learn from experts at top tech companies"
      },
      {
        title: "Problem-solving focus:",
        description: "Not just writing code - solving complex problems"
      },
      {
        title: "Leadership skills:",
        description: "Develop broad leadership skills to complement deep technical expertise"
      }
    ],
    
    // Excellence Section
    excellenceSectionTitle: "Program Excellence",
    excellenceSectionItems: [
      {
        title: "Excellence in Online Education",
        description: "StevensOnline is a seven-time winner of the 21st Century Award for Best Practices in Distance Learning by the United States Distance Learning Association."
      },
      {
        title: "Innovation in Computer Science",
        description: "The MSCS program is co-designed with top industry partners to reflect the latest in tech, from AI and cloud architecture to cybersecurity. You'll complete hands-on projects modeled on real-world challenges and graduate ready to build systems that scale."
      },
      {
        title: "Renowned Program Faculty",
        description: "The computer science faculty includes active researchers who have built secure systems for federal agencies and led engineering at IBM and AT&T Labs. Now they'll teach you how to think like a builder - and a strategist."
      }
    ],
    
    // Program Details
    programDetails: [
      {
        value: "Not Required",
        label: "GMAT/GRE"
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
        date: KEY_DATES.PRIORITY_SUBMIT.date,
        description: KEY_DATES.PRIORITY_SUBMIT.details
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
    keyDatesNote: "*Applicants who apply by the early submit deadline and are admitted may be eligible for a $250 deposit waiver. Applicants who receive education assistance from employers or other tuition discounts are not eligible. Other eligibility conditions may apply.",
    
    
    
    // Contact
    contactTitle: "Ready to Take the Next Step?",
    contactDescription: "Schedule a call with our admissions team to discuss your goals and learn about the upcoming cohort of the Online Master of Science in Computer Science program.",
    contactButtonText: "Schedule a Call"
  };

  return (
    <PageContextProvider pageType="explore" pageName="ExploreMSCS">
      <ProgramContextProvider 
        programCode="mscs" 
        programName="Master of Science in Computer Science"
        programType="degree"
      >
        <ExploreProgramPageTemplate {...mscsData} />
      </ProgramContextProvider>
    </PageContextProvider>
  );
};

export default ExploreMSCS;

