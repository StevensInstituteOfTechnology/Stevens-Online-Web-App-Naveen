import React from "react";
import { KEY_DATES_SPRING2 } from "@/config/constants";
import { ExploreTemplate } from "../../components/explore-pages";
import { TuitionCardsHero } from "../../components/program-pages/primitives";
import { usePageTracking } from "@/hooks/analytics/usePageTracking";
import { ProgramContextProvider } from "@/contexts/analytics/ProgramContext";
import { PageContextProvider } from "@/contexts/analytics/PageContext";

const ExploreCertAppliedDataScience = () => {
  usePageTracking({
    pageType: "explore",
    programCode: "cert-ads",
    additionalData: {
      program_name:
        "Professional Graduate Certificate in Applied Data Science Foundations",
      has_embedded_form: true,
      has_pricing_cards: true,
      program_type: "certificate",
    },
  });

  const certData = {
    // Hero Section
    heroTitle: "YOUR FIRST STEP INTO APPLIED AI",
    programName:
      "Professional Graduate Certificate in Applied Data Science Foundations",
    heroSubtitle:
      "Master Python, SQL, and machine learning in 9 graduate credits. Build job-ready AI skills with hands-on projects. Stackable to M.Eng. in Applied Data Science.",
    bgImage:
      "/assets/images/explore-cert-applied-data-science/explore-cert-ads-hero.webp",
    programCode: "cert-ads",
    secondaryCta: { label: "Apply In Minutes", to: "accelerated-application" },
    seo: {
      title:
        "Professional Graduate Certificate in Applied Data Science Foundations | Stevens Institute of Technology",
      description:
        "Master Python, SQL, and ML in 9 graduate credits. Build AI-ready data pipelines and deploy machine learning models. $5,250 aligns with tuition benefits. Stackable to MEADS.",
      ogImage:
        "/assets/images/explore-cert-applied-data-science/explore-cert-ads-hero.webp",
      url: "/explore/certificates/applied-data-science-foundations/",
    },

    // Statistics
    statistics: [
      {
        number: "$140K+",
        label: "ML Engineer Median Salary",
        description:
          "Machine Learning Engineers earn a median salary of over $140,000 annually, with strong growth projected through 2033 (U.S. Bureau of Labor Statistics).",
      },
      {
        number: "$5,250",
        label: "Aligns with Tuition Benefits",
        description:
          "Certificate cost perfectly matches the IRS $5,250 annual tax-free employer tuition reimbursement limit.",
      },
      {
        number: "Top 10",
        label: "Fastest Growing Tech Skill",
        description:
          "Data science and AI skills consistently rank among the fastest-growing tech skills, with demand spanning all industries (LinkedIn Learning, 2025).",
      },
      {
        number: "3 Projects",
        label: "Portfolio Artifacts",
        description:
          "Build three production-ready projects: data pipeline, ML model deployment, and AI-powered dashboard-tangible proof of your capabilities.",
      },
    ],

    // Why Choose Stevens Section
    whyChooseStevensTitle: "WHY CHOOSE STEVENS",
    whyChooseStevensSubtitle: "PRACTICAL AI & DATA SCIENCE EDUCATION",
    whyChooseStevensContent: `
      <p class="font-stevens-body">This certificate focuses on applied learning-you'll work with real datasets, build production-ready pipelines, and deploy ML models, not just study theory. Every course is AI-enhanced, meaning you'll learn to use AI copilots responsibly to boost your productivity while building deep technical understanding.</p>

      <p class="font-stevens-body">Stevens Institute of Technology brings 150+ years of engineering excellence to data science education. Located in the New York metropolitan area, Stevens combines world-class faculty with strong industry connections, ensuring your education reflects current industry practices and emerging technologies.</p>

      <p class="font-stevens-body">The certificate bridges the gap between pure data analysis and enterprise AI deployment. You'll learn not just how AI systems work, but how to build them-from data wrangling to model deployment to explainability and ethics.</p>
    `,

    // Program Benefits
    programBenefitsTitle: "Certificate Benefits",
    programBenefitsDescription:
      "Organizations need professionals who can do more than analyze data-they need people who can build and deploy AI systems. This certificate provides the practical, project-driven foundation for careers in applied data science, machine learning engineering, and AI analytics.<br/><br/>With credit-bearing courses that stack toward the M.Eng. in Applied Data Science (MEADS), you can test your interest in data science while earning credentials that count toward a full master's degree.",
    programBenefitsImage:
      "/assets/images/explore-cert-applied-data-science/explore-cert-ads-benefits.webp",
    programBenefitsHighlights: [
      {
        title: "AI-First, Job-Ready Skills",
        description:
          "Learn Python, SQL, and ML with an applied AI focus. Build data pipelines, deploy models, and create AI-powered solutions using industry-standard tools like pandas, scikit-learn, and cloud platforms.",
      },
      {
        title: "Portfolio Projects That Impress",
        description:
          "Each course delivers a portfolio artifact: PCA + regression model, ETL pipeline with dashboard, and production-ready ML model with interpretability. These projects become the centerpiece of your job interviews.",
      },
      {
        title: "AI-Enhanced Learning",
        description:
          "Work with AI copilots (LLMs) for debugging and code generation while learning the fundamentals. This mirrors how modern data scientists work-using AI as a productivity multiplier.",
      },
      {
        title: "Graduate Credit That Stacks",
        description:
          "All 9 credits apply toward Stevens' M.Eng. in Applied Data Science (MEADS). Start with the certificate to test the waters, then continue toward a full master's degree if desired.",
      },
    ],

    // Program Details
    programDetails: [
      {
        value: "9 Credits",
        label: "3 Courses",
      },
      {
        value: "$5,250",
        label: "Total Cost",
      },
      {
        value: "16-24 Weeks",
        label: "Duration",
      },
      {
        value: "No Prereqs",
        label: "Required",
      },
      {
        value: "100%",
        label: "Online",
      },
    ],

    // Key Dates
    keyDatesTerm: KEY_DATES_SPRING2.TERM.nameUppercase,
    keyDates: [
      {
        label: "Early Submit",
        date: KEY_DATES_SPRING2.EARLY_SUBMIT.date,
      },
      {
        label: "Priority Submit",
        date: KEY_DATES_SPRING2.PRIORITY_SUBMIT.date,
      },
      {
        label: "Final Submit",
        date: KEY_DATES_SPRING2.FINAL_SUBMIT.date,
      },
      {
        label: "Start of Classes",
        date: KEY_DATES_SPRING2.START_OF_CLASSES.date,
      },
    ],
    keyDatesNote: `*The Applied Data Science Foundations Certificate launches ${KEY_DATES_SPRING2.TERM.name}. Join the inaugural cohort and start building your data science career.`,

    // FAQ
    faqs: [
      {
        question: "Do I need programming experience?",
        answer:
          "No. The certificate is designed to take you from fundamentals to applied ML. We start with the basics in each course and scaffold your learning with templates, AI copilots, and extensive lab support. Basic comfort with quantitative reasoning is helpful, but we'll teach you everything you need to know about programming.",
      },
      {
        question: "What programming languages will I learn?",
        answer:
          "You'll focus primarily on Python, which is the industry standard for data science and machine learning. You'll also learn SQL for database work and data manipulation. These two languages form the foundation of modern data science work.",
      },
      {
        question: "Will this help with tuition reimbursement?",
        answer:
          "Yes. The $5,250 total cost aligns perfectly with the IRS tax-free employer benefit limit that many companies offer. Stevens' enrollment team has extensive experience working with corporate tuition assistance programs and can guide you through your company's reimbursement process.",
      },
      {
        question: "Can these credits count toward a master's degree?",
        answer:
          "Yes. All 9 credits are fully stackable toward Stevens' M.Eng. in Applied Data Science (MEADS), subject to Registrar approval. This certificate serves as a perfect on-ramp to the full master's program, allowing you to test your interest before committing to the complete degree.",
      },
      {
        question: "What tools and technologies will I use?",
        answer:
          "You'll work with industry-standard tools including Python (pandas, NumPy, scikit-learn), SQL (PostgreSQL), Jupyter notebooks, Git/GitHub, cloud platforms, and visualization tools like Streamlit and Matplotlib. You'll also learn to use AI copilots responsibly to enhance productivity.",
      },
      {
        question: "How is this different from online courses or bootcamps?",
        answer:
          "This is a graduate-level certificate with transcripted credit from an accredited institution. You'll learn from PhD faculty who are active researchers, work on complex projects that mirror real-world challenges, and earn credentials that stack toward a master's degree-something bootcamps and MOOCs cannot offer.",
      },
      {
        question: "What can I do with this certificate?",
        answer:
          "Graduates are prepared for roles such as Data Analyst, ML Associate Engineer, AI Solutions Specialist, Business Intelligence Developer, and Applied Data Scientist. The three portfolio projects you build demonstrate your capabilities to employers and serve as talking points in job interviews.",
      },
    ],

    // Contact
    contactTitle: "Ready to Take the Next Step?",
    contactDescription:
      "Schedule a call with our admissions team to discuss your goals and learn about the Applied Data Science Foundations Certificate program.",
    contactButtonText: "Schedule a Call",
  };

  return (
    <PageContextProvider
      pageType="explore"
      pageName="ExploreCertAppliedDataScience"
    >
      <ProgramContextProvider
        programCode="cert-ads"
        programName="Professional Graduate Certificate in Applied Data Science Foundations"
        programType="certificate"
      >
        <ExploreTemplate
          {...certData}
          whyChooseStevensVideo={null}
          whyChooseStevensVideoCover={null}
          heroBottomContent={
            <TuitionCardsHero
              cards={[
                { value: "$5,250", label: "Total Certificate Cost" },
                { value: "$583", label: "Per Credit" },
              ]}
            />
          }
        />
      </ProgramContextProvider>
    </PageContextProvider>
  );
};

export default ExploreCertAppliedDataScience;
