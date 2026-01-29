import React from "react";
import { Award, Globe, Star } from "lucide-react";
import { ExploreTemplate } from "../../components/explore-pages";
import { KEY_DATES_SUMMER } from "@/config/constants";
import { usePageTracking } from "@/hooks/analytics/usePageTracking";
import { ProgramContextProvider } from "@/contexts/analytics/ProgramContext";
import { PageContextProvider } from "@/contexts/analytics/PageContext";

const ExploreMBA = () => {
  usePageTracking({
    pageType: "explore",
    programCode: "mba",
    additionalData: {
      program_name: "Master of Business Administration",
      has_embedded_form: true,
    },
  });

  const mbaData = {
    // Hero Section
    heroTitle: "TECHNOLOGY ISN'T JUST IN OUR DNA. IT DEFINES OUR MBA.",
    programName: "Online MBA Program",
    heroSubtitle:
      "Master business strategy with cutting-edge technology and data analytics. AACSB-accredited program designed for working professionals.",
    bgImage: "/assets/images/explore-mba/1-omba-hero-scaled.webp",
    programCode: "mba",
    seo: {
      title: "Online MBA | Stevens Institute of Technology",
      description:
        "Earn your 100% online MBA from Stevens Institute of Technology. Tech-driven curriculum, part-time for working professionals, immersive NYC experience.",
      ogImage: "/assets/images/explore-mba/1-omba-hero-scaled.webp",
      url: "/explore/online-mba/",
    },

    // Statistics
    statistics: [
      {
        number: "100%",
        label: "Employment",
        description:
          "100% of MBA graduates in the Class of 2022 accepted job offers within three months of graduating.¹",
      },
      {
        number: "No. 15",
        label: "In Best Value",
        description:
          "Stevens is ranked No. 15 among Best Value Colleges by Payscale (2024).²",
      },
      {
        number: "No. 1",
        label: "Online MBA in N.J.",
        description:
          "Stevens' Online MBA has been ranked No. 1 in New Jersey since 2015 (U.S. News & World Report, 2025).",
      },
      {
        number: "No. 14",
        label: "For Economic Return",
        description:
          "Stevens ranked No. 14 among top business schools for economic return by Georgetown University's Center on Education and the Workforce (2022).³",
      },
      {
        number: "#12",
        label: "For Best Career Placement",
        description:
          "Ranked No. 12 on The Princeton Review's 'Top 20 Best Career Placement' list (2025).",
      },
    ],

    // Why Choose Stevens Section
    whyChooseStevensTitle: "WHY CHOOSE STEVENS",
    whyChooseStevensSubtitle: "CAREER-ALIGNED CURRICULUM",
    whyChooseStevensContent: `
      <p class="font-stevens-body">Investing in your future with a graduate degree from Stevens is a smart choice. You will gain access to the same quality programs and distinguished faculty as on-campus graduate students while having the flexibility to study from anywhere in the world. From our nationally recognized stature, to studying with experienced faculty, to connecting with over 50,000 global alumni, we offer unique advantages to support your graduate study.</p>

      <p class="font-stevens-body">Our faculty produce groundbreaking research that enables better planning and policy, improves healthcare and treatment, builds our understanding of critical questions, shares useful insight, and makes life safer, more secure and more comfortable. The researchers, practitioners and entrepreneurs that comprise the Stevens Institute of Technology faculty bring innovation and insight to students across disciplines and around the world.</p>
    `,

    // Program Benefits
    programBenefitsTitle: "Program Benefits",
    programBenefitsDescription:
      "In a global market increasingly reliant on technology, data and analytics, you need more than the traditional management toolkit. Learn to leverage business data to drive better decisions through the Master of Business Administration online program at Stevens Institute of Technology, which pairs the quality of our on-campus program with the flexibility of part-time study and remote coursework.<br/><br/>The Stevens Online MBA is an AACSB-accredited program that combines business knowledge with the technology and analytics necessary to excel in today's data-centric world. Our part-time online program offers tailored leadership development, individualized career services and two on-site immersions in the New York City region.",
    programBenefitsImage: "/assets/images/explore-mba/2-explore-mba.webp",
    programBenefitsHighlights: [
      {
        title: "Connections to Top Hiring Companies",
        description:
          "Many of our graduates have found opportunities with some of the biggest names in business and technology, including Google, Amazon, Microsoft and Bloomberg.",
      },
      {
        title: "Access to Industry Experts",
        description:
          "Our online students have direct access to faculty who bring industry expertise to the program and offer real-world insights in the classroom.",
      },
      {
        title: "Emphasis on Emerging Technology",
        description:
          "Master new tools that will help you refine products, services and strategies in a business ecosystem undergoing constant, technology-driven change.",
      },
      {
        title: "Potential to Boost Your Earnings",
        description:
          "An MBA increases your earning potential. According to the U.S. Bureau of Labor Statistics, managers in marketing, healthcare or finance can earn a median annual salary of $104,830-$139,790 (2024).",
      },
    ],

    // Program Details
    programDetails: [
      {
        value: "Not Required",
        label: "GRE/GMAT",
      },
      {
        value: "13-16",
        label: "Courses",
      },
      {
        value: "7",
        label: "Concentrations",
      },
      {
        value: "2",
        label: "Immersions",
      },
      {
        value: "100%",
        label: "Online",
      },
    ],

    // Concentrations
    concentrations: {
      title: "Concentrations",
      content: `

            <p class="course-intro font-stevens-body text-stevens-lg text-stevens-dark-gray leading-relaxed">Customize your MBA with one of seven concentrations designed for technology-focused careers. Each concentration provides specialized knowledge and skills to advance your career in specific industries and roles.</p>
            
            <ul class="list-disc pl-8 space-y-4">
              <li class="font-stevens-bold text-stevens-xl text-stevens-red">Business Intelligence & Analytics</li>
              <li class="font-stevens-bold text-stevens-xl text-stevens-red">Finance</li>
              <li class="font-stevens-bold text-stevens-xl text-stevens-red">Financial Analytics</li>
              <li class="font-stevens-bold text-stevens-xl text-stevens-red">Financial Engineering</li>
              <li class="font-stevens-bold text-stevens-xl text-stevens-red">Information Systems</li>
              <li class="font-stevens-bold text-stevens-xl text-stevens-red">Project Management</li>
            </ul>`,
    },

    // Key Dates
    keyDates: [
      {
        label: "Early Submit",
        date: KEY_DATES_SUMMER.EARLY_SUBMIT.date,
      },
      {
        label: "Priority Submit",
        date: KEY_DATES_SUMMER.PRIORITY_SUBMIT.date,
      },
      {
        label: "Final Submit",
        date: KEY_DATES_SUMMER.FINAL_SUBMIT.date,
      },
      {
        label: "Start of Classes",
        date: KEY_DATES_SUMMER.START_OF_CLASSES.date,
      },
    ],
    keyDatesNote:
      "*Applicants who apply by the early submit deadline and are admitted may be eligible for a $250 deposit waiver. Applicants who receive tuition discounts are not eligible. Other eligibility conditions may apply.",

    // FAQ
    faqs: [
      {
        question: "Is the Online MBA accredited?",
        answer:
          "Yes. Stevens MBA is an AACSB-accredited program. All Stevens' undergraduate and graduate business programs are accredited by AACSB, placing Stevens among the five percent of business schools globally to earn this distinction. AACSB provides internationally recognized, specialized accreditation for business and accounting programs at the bachelor's, master's and doctoral levels. The AACSB accreditation standards challenge post-secondary educators to pursue excellence and continuous improvement throughout their business programs. AACSB accreditation is known worldwide as the longest-standing, most recognized form of specialized/professional accreditation an institution and its business programs can earn.",
      },
      {
        question: "What is the program format?",
        answer:
          "The Online MBA program offers 100% online courses and two in-person immersions in the NYC region.",
      },
      {
        question: "What are in-person immersions?",
        answer:
          "Online MBA students are required to participate in two 1.5-credit immersions in the NYC region that will focus on a specific business area. These invaluable, weekend-long learning experiences provide a space for you to engage with faculty, peers and candidates from other Stevens business programs and learn directly from industry leaders and business executives.",
      },
      {
        question: "How long is the program?",
        answer:
          "Students in the Online MBA program are required to take 13-16 classes (39-48 credit hours). On average, students can earn their degree in two and a half to three years. This timeline may vary depending on how many credits are taken each semester.",
      },
      {
        question: "Are there financial assistance opportunities?",
        answer:
          "Yes. Students have a variety of options to fund their education. We encourage you to consult with the Office of Financial Aid or a financial advisor when determining the best way to fund your education.",
      },
      {
        question:
          "What are the benefits of connecting with an enrollment advisor?",
        answer:
          "Connecting with an enrollment advisor will help you: Understand the program admissions criteria and know whether you are eligible to apply, Gain insight into application best practices and how to submit a strong application, Know what to expect in your online classroom, including the level of faculty interaction, program outcomes and more, Have an immediate line of support in the event you have questions or need clarification about the Online MBA program",
      },
    ],

    // Contact
    contactTitle: "Ready to Take the Next Step?",
    contactDescription:
      "Schedule a call with our admissions team to discuss your goals and learn about the upcoming cohort of the Online MBA program.",
    contactButtonText: "Schedule a Call",
  };

  return (
    <PageContextProvider pageType="explore" pageName="ExploreMBA">
      <ProgramContextProvider
        programCode="mba"
        programName="Master of Business Administration"
        programType="degree"
      >
        <ExploreTemplate {...mbaData} />
      </ProgramContextProvider>
    </PageContextProvider>
  );
};

export default ExploreMBA;
