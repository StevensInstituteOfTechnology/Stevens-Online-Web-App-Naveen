import React from 'react';
import { Award, Globe, Star } from 'lucide-react';
import ExploreProgramPageTemplate from '../components/program-pages/ExploreProgramPageTemplate';
import { KEY_DATES } from '@/config/constants';

const ExploreMBA = () => {
  const mbaData = {
    // Hero Section
    heroTitle: "TECHNOLOGY ISN'T JUST IN OUR DNA. IT DEFINES OUR MBA.",
    programName: "Online MBA Program",
    heroSubtitle: "Master business strategy with cutting-edge technology and data analytics. AACSB-accredited program designed for working professionals.",
    bgImage: "/assets/images/1-omba-hero-scaled.webp",
    programCode: "mba",
    seo: {
      title: 'Online MBA | Stevens Institute of Technology',
      description: 'Earn your 100% online MBA from Stevens Institute of Technology. Tech-driven curriculum, part-time for working professionals, immersive NYC experience.',
      ogImage: '/assets/images/1-omba-hero-scaled.webp',
      url: '/explore/online-mba/'
    },
    badges: [
      { text: "AACSB Accredited", icon: Award },
      { text: "100% Online", icon: Globe },
      { text: "No GMAT Required", icon: Star }
    ],
    
    // Statistics
    statistics: [
      {
        number: "100%",
        label: "Employment",
        description: "100% of MBA graduates in the Class of 2022 accepted job offers within three months of graduating.¹"
      },
      {
        number: "No. 15",
        label: "In Best Value",
        description: "Stevens is ranked No. 15 among Best Value Colleges by Payscale (2024).²"
      },
      {
        number: "No. 1",
        label: "Online MBA in N.J.",
        description: "Stevens' Online MBA has been ranked No. 1 in New Jersey since 2015 (U.S. News & World Report, 2025)."
      },
      {
        number: "No. 14",
        label: "For Economic Return",
        description: "Stevens ranked No. 14 among top business schools for economic return by Georgetown University's Center on Education and the Workforce (2022).³"
      },
      {
        number: "Top 20",
        label: "For Best Career Placement",
        description: "Ranked among the top private schools for best career placement by the Princeton Review (2024)."
      }
    ],
    
    // Why Choose Stevens Section
    whyChooseStevensTitle: "WHY CHOOSE STEVENS",
    whyChooseStevensSubtitle: "CAREER-ALIGNED CURRICULUM",
    whyChooseStevensContent: `
      <p>Investing in your future with a graduate degree from Stevens is a smart choice. You will gain access to the same quality programs and distinguished faculty as on-campus graduate students while having the flexibility to study from anywhere in the world. From our nationally recognized stature, to studying with experienced faculty, to connecting with over 50,000 global alumni, we offer unique advantages to support your graduate study.</p>
      
      <p>Our faculty produce groundbreaking research that enables better planning and policy, improves healthcare and treatment, builds our understanding of critical questions, shares useful insight, and makes life safer, more secure and more comfortable. The researchers, practitioners and entrepreneurs that comprise the Stevens Institute of Technology faculty bring innovation and insight to students across disciplines and around the world.</p>
    `,
    
    // Program Benefits
    programBenefitsTitle: "Program Benefits",
    programBenefitsDescription: "In a global market increasingly reliant on technology, data and analytics, you need more than the traditional management toolkit. Learn to leverage business data to drive better decisions through the Master of Business Administration online program at Stevens Institute of Technology, which pairs the quality of our on-campus program with the flexibility of part-time study and remote coursework.<br/><br/>The Stevens Online MBA is an AACSB-accredited program that combines business knowledge with the technology and analytics necessary to excel in today's data-centric world. Our part-time online program offers tailored leadership development, individualized career services and two on-site immersions in the New York City region.",
    programBenefitsImage: "/assets/images/2-explore-mba.jpg",
    programBenefitsHighlights: [
      {
        title: "Connections to Top Hiring Companies",
        description: "Many of our graduates have found opportunities with some of the biggest names in business and technology, including Google, Amazon, Microsoft and Bloomberg."
      },
      {
        title: "Access to Industry Experts",
        description: "Our online students have direct access to faculty who bring industry expertise to the program and offer real-world insights in the classroom."
      },
      {
        title: "Emphasis on Emerging Technology",
        description: "Master new tools that will help you refine products, services and strategies in a business ecosystem undergoing constant, technology-driven change."
      },
      {
        title: "Potential to Boost Your Earnings",
        description: "An MBA increases your earning potential. According to the U.S. Bureau of Labor Statistics, managers in marketing, healthcare or finance can earn a median annual salary of $104,830-$139,790 (2024)."
      }
    ],
    
    // Program Details
    programDetails: [
      {
        value: "Not Required",
        label: "GRE/GMAT"
      },
      {
        value: "13-16",
        label: "Courses"
      },
      {
        value: "7",
        label: "Concentrations"
      },
      {
        value: "2",
        label: "Immersions"
      },
      {
        value: "100%",
        label: "Online"
      }
    ],
    
    // Key Dates
    keyDates: [
      {
        label: "Early Submit",
        date: "October 14, 2025"
      },
      {
        label: "Priority Submit", 
        date: KEY_DATES.PRIORITY_SUBMIT.date
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
    keyDatesNote: "*Applicants who apply by the early submit deadline and are admitted may be eligible for a $250 deposit waiver. Applicants who receive tuition discounts are not eligible. Other eligibility conditions may apply.",
    
    // FAQ
    faqs: [
      {
        question: "IS THE ONLINE MBA ACCREDITED?",
        answer: "Yes. Stevens MBA is an AACSB-accredited program. All Stevens' undergraduate and graduate business programs are accredited by AACSB, placing Stevens among the five percent of business schools globally to earn this distinction. AACSB provides internationally recognized, specialized accreditation for business and accounting programs at the bachelor's, master's and doctoral levels. The AACSB accreditation standards challenge post-secondary educators to pursue excellence and continuous improvement throughout their business programs. AACSB accreditation is known worldwide as the longest-standing, most recognized form of specialized/professional accreditation an institution and its business programs can earn."
      },
      {
        question: "What is the program format?",
        answer: "The Online MBA program offers 100% online courses and two in-person immersions in the NYC region."
      },
      {
        question: "What are in-person immersions?",
        answer: "Online MBA students are required to participate in two 1.5-credit immersions in the NYC region that will focus on a specific business area. These invaluable, weekend-long learning experiences provide a space for you to engage with faculty, peers and candidates from other Stevens business programs and learn directly from industry leaders and business executives."
      },
      {
        question: "How long is the program?",
        answer: "Students in the Online MBA program are required to take 13-16 classes (39-48 credit hours). On average, students can earn their degree in two and a half to three years. This timeline may vary depending on how many credits are taken each semester."
      },
      {
        question: "Are there financial assistance opportunities?",
        answer: "Yes. Students have a variety of options to fund their education. We encourage you to consult with the Office of Financial Aid or a financial advisor when determining the best way to fund your education."
      },
      {
        question: "What are the benefits of connecting with an enrollment advisor?",
        answer: "Connecting with an enrollment advisor will help you: Understand the program admissions criteria and know whether you are eligible to apply, Gain insight into application best practices and how to submit a strong application, Know what to expect in your online classroom, including the level of faculty interaction, program outcomes and more, Have an immediate line of support in the event you have questions or need clarification about the Online MBA program"
      }
    ],
    
    // Contact
    contactTitle: "Want to Learn More?",
    contactDescription: "Request more information to learn about the upcoming cohort of the Online MBA program.",
    contactButtonText: "Contact Us"
  };

  return <ExploreProgramPageTemplate {...mbaData} />;
};

export default ExploreMBA;
