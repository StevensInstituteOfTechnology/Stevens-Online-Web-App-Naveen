import React from 'react';
import { KEY_DATES } from '@/config/constants';
import { Award, Globe, Star, Target, Clock, Network, ThumbsUp } from 'lucide-react';
import { ExploreTemplate } from '../../components/explore-pages';
import { usePageTracking } from '@/hooks/analytics/usePageTracking';
import { ProgramContextProvider } from '@/contexts/analytics/ProgramContext';
import { PageContextProvider } from '@/contexts/analytics/PageContext';

const ExploreMSAI = () => {
  usePageTracking({
    pageType: 'explore',
    programCode: 'msai',
    additionalData: {
      program_name: 'Master of Science in Artificial Intelligence',
      has_embedded_form: true
    }
  });
  
  const msaiData = {
    // Hero Section
    heroTitle: "Master AI and Launch Your Computer Science Career - All Experience Levels Welcome!",
    
    heroSubtitle: "Specialize in Artificial Intelligence and Machine Learning. 100% online program designed for aspiring AI professionals.",
    bgImage: "/assets/images/explore-msai/3-explore-msai.webp", // Placeholder
    programCode: "msai",
    
    // Statistics
    statistics: [
      {
        number: "99%",
        label: "Employment",
        description: "99% of MSCS graduates in the Class of 2023 accepted job offers within three months of graduating.¹"
      },
      {
        number: "No. 1",
        label: "Best IT Programs",
        description: "Stevens is ranked No. 1 in New Jersey for Best Online Master's in Computer Information Technology Programs by U.S. News & World Report (2025)."
      },
      {
        number: "Top 20",
        label: "For Best Career Placement",
        description: "Stevens is named one of the Top 20 U.S. Private Schools for Best Career Placement by The Princeton Review (2024)."
      },
      {
        number: "No. 15",
        label: "In Best Value",
        description: "Stevens is ranked No. 15 among Best Value Colleges by PayScale (2024).²"
      }
    ],
    
    // Excellence Section
    excellenceSectionItems: [
      {
        title: "Excellence in Online Education",
        description: "StevensOnline is a seven-time winner of the 21st Century Award for Best Practices in Distance Learning by the United States Distance Learning Association."
      },
      {
        title: "Innovation in Industry",
        description: "The MSCS program will prepare you to adapt to industry disruptors and work as an agile computer science professional. Traditional and accelerated tracks, as well as opportunities to explore areas of focus such as artificial intelligence, help you get the most out of your program experience."
      },
      {
        title: "Renowned Program Faculty",
        description: "The computer science faculty includes active researchers who are renowned experts in artificial intelligence, cybersecurity, software engineering and algorithms."
      }
    ],
    
    // Why Choose Stevens Section
    whyChooseStevensTitle: "WHY CHOOSE STEVENS",
    whyChooseStevensSubtitle: "JOIN A NETWORK OF VISIONARIES",
    whyChooseStevensContent: `
      <p class="font-stevens-body">Investing in your future with a graduate degree from Stevens is a smart choice. You will gain access to the same quality programs and distinguished faculty as on-campus graduate students while having the flexibility to study from anywhere in the world. From our nationally recognized stature, to studying with experienced faculty, to connecting with over 50,000 global alumni, we offer unique advantages to support your graduate study.</p>
      
      <p class="font-stevens-body">Our faculty produce groundbreaking research that enables better planning and policy, improves healthcare and treatment, builds our understanding of critical questions, shares useful insight, and makes life safer, more secure and more comfortable. The researchers, practitioners and entrepreneurs that comprise the Stevens Institute of Technology faculty bring innovation and insight to students across disciplines and around the world.</p>
    `,
    whyChooseStevensVideo: "/assets/videos/Stevens Online MBA - 1.mp4", // Placeholder
    whyChooseStevensVideoCover: "/assets/videos/video-cover-1.avif", // Placeholder
    
    // New Fall 2025 Section - Remove this section as it's not on the original page
    // newFall2025Badge: "NEW FOR FALL 2025",
    // newFall2025Title: "START YOUR DEGREE WITH 2–4 ASYNCHRONOUS COURSES",
    // newFall2025Description: `
    //   <p>Starting this fall, the first phase of your program has been redesigned around your schedule. Depending on your track (traditional or advanced), your first two to four courses will now be asynchronous.</p>
    //   
    //   <p>Our new asynchronous course format helps you balance graduate study with work and life, without sacrificing the structure or support that defines a Stevens education.</p>
    // `,
    // newFall2025Benefits: [
    //   {
    //     icon: Globe,
    //     text: "NO LIVE CLASS SESSIONS - LEARN ON YOUR OWN TIME"
    //   },
    //   {
    //     icon: Target,
    //     text: "WEEKLY MILESTONES THAT KEEP YOU ACCOUNTABLE AND ON TRACK"
    //   },
    //   {
    //     icon: Clock,
    //     text: "ACCESS TO FACULTY OFFICE HOURS, AI-POWERED ASSISTANCE AND PEER DISCUSSIONS"
    //   },
    //   {
    //     icon: Network,
    //     text: "DESIGNED FOR WORKING PROFESSIONALS SEEKING FLEXIBILITY AND MOMENTUM"
    //   },
    //   {
    //     icon: ThumbsUp,
    //     text: "APPLY IN UNDER 5 MINUTES WITH OUR STREAMLINED ASAP APP - NO SUPPLEMENTAL DOCUMENTS REQUIRED (BACHELOR'S DEGREE REQUIRED)"
    //   }
    // ],
    // newFall2025Image: "/assets/images/stevens-campus.png", // Placeholder
    
    // Just Launched Section - Remove this section as it's not on the original page
    // justLaunchedBadge: "JUST LAUNCHED",
    // justLaunchedTitle: "NEW FLEXIBLE APPLICATION OPTIONS",
    // justLaunchedDescription: `
    //   <p>We've introduced new application options designed to make enrollment more accessible. These options reduce prerequisite requirements and offer the opportunity to take trial courses.</p>
    //   
    //   <p>To learn more, speak with your enrollment advisor to determine the approach that best suits your background, goals and schedule.</p>
    // `,
    // justLaunchedButtonText: "Request Flexible App Info",
    // justLaunchedButtonLink: "#",
    // justLaunchedImage: "/assets/images/stevens-campus.png", // Placeholder
    
    // Program Benefits
    programBenefitsTitle: "Program Benefits",
    programBenefitsDescription: "Stevens designed the Online M.S. in Computer Science curriculum to align with in-demand industry skills and emerging technologies, including <strong>machine learning</strong> and <strong>artificial intelligence</strong>, while equipping students with a strong foundation in theory and academic areas of inquiry. Our graduates gain the technical proficiency to engineer solutions and contribute to the future of technology through skills like:",
    programBenefitsImage: "/assets/images/explore-msai/1-explore-msai.webp", // Placeholder
    programBenefitsHighlights: [
      {
        title: "Advanced topics like artificial intelligence (AI), machine learning and cloud computing",
        description: ""
      },
      {
        title: "Algorithm design and testing",
        description: ""
      },
      {
        title: "Programming languages such as Java, Python and C++",
        description: ""
      },
      {
        title: "Mobile application development and cloud computing",
        description: ""
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
    
    // Additional Why Choose Stevens Section (before FAQ)
    additionalWhyChooseStevensTitle: "WHY CHOOSE STEVENS",
    additionalWhyChooseStevensSubtitle: "JOIN A NETWORK OF VISIONARIES",
    additionalWhyChooseStevensContent: `
      <p class="font-stevens-body">Investing in your future with a graduate degree from Stevens is a smart choice. You will gain access to the same quality programs and distinguished faculty as on-campus graduate students while having the flexibility to study from anywhere in the world. From our nationally recognized stature, to studying with experienced faculty, to connecting with over 50,000 global alumni, we offer unique advantages to support your graduate study.</p>
      
      <p class="font-stevens-body">Our faculty produce groundbreaking research that enables better planning and policy, improves healthcare and treatment, builds our understanding of critical questions, shares useful insight, and makes life safer, more secure and more comfortable. The researchers, practitioners and entrepreneurs that comprise the Stevens Institute of Technology faculty bring innovation and insight to students across disciplines and around the world.</p>
    `,
    additionalWhyChooseStevensImage: "/assets/images/explore-msai/2-explore-msai.webp", // Placeholder - should be city skyline image
    
    // FAQ
    faqs: [
      {
        question: "How long is the program?",
        answer: "Students in the Online Master of Science in Computer Science program are required to take ten classes (30 credit hours). On average, students can earn their degree in less than two years. This timeline may vary depending on how many credits are taken each semester."
      },
      {
        question: "What is the program format?",
        answer: "The M.S. in Computer Science is an online program. This format is centered around students engaging in distance learning coursework to develop skills as software development leaders, AI innovators and high-quality coders."
      },
      {
        question: "Are there financial assistance options?",
        answer: "Yes. Students have a variety of options to fund their education. We encourage you to consult with the Office of Financial Aid or a financial advisor when determining the best way to fund your education."
      },
      {
        question: "What are the benefits of connecting with an enrollment advisor?",
        answer: "Connecting with an enrollment advisor will help you: Understand the program admissions criteria and know whether you are eligible to apply, Gain insight into application best practices and how to submit a strong application, Know what to expect in your online classroom, including the level of faculty interaction, program outcomes and more, Have an immediate line of support in the event you have questions or need clarification about the Online MSCS program."
      },
      {
        question: "Is the Online Master's in Computer Science (MSCS) accredited?",
        answer: "Stevens Institute of Technology has been continually accredited by the Middle States Commission on Higher Education (MSCHE) since 1927. Stevens is accredited until 2027 and the next self-study evaluation is scheduled to take place during 2026-2027."
      }
    ],
    
    // Contact
    contactTitle: "Ready to Take the Next Step?",
    contactDescription: "Schedule a call with our admissions team to discuss your goals and learn about the upcoming cohort of the Online Master of Science in Artificial Intelligence program.",
    contactButtonText: "Schedule a Call"
  };

  return (
    <PageContextProvider pageType="explore" pageName="ExploreMSAI">
      <ProgramContextProvider 
        programCode="msai"
        programName="Master of Science in Artificial Intelligence"
        programType="degree"
      >
        <ExploreTemplate {...msaiData} />
      </ProgramContextProvider>
    </PageContextProvider>
  );
};

export default ExploreMSAI;

