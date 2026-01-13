import React from "react";
import {
  Globe,
  Award,
  Check,
  Briefcase,
  DollarSign,
  GraduationCap,
  TrendingUp,
  Target,
  BookOpen,
  Users,
  Code,
  Database,
  LineChart,
} from "lucide-react";
import { CertificateTemplate } from "../components/program-pages/templates";
import { TuitionCardsHero } from "../components/program-pages/primitives";
import { KEY_DATES, BOOKING_URLS } from "@/config/constants";
import { usePageTracking } from "@/hooks/analytics/usePageTracking";
import { ProgramContextProvider } from "@/contexts/analytics/ProgramContext";
import { PageContextProvider } from "@/contexts/analytics/PageContext";

const programData = {
  code: "cert-ads",
  seo: {
    title:
      "Professional Graduate Certificate in Applied Data Science Foundations | Stevens Institute of Technology",
    description:
      "Master Python, SQL, and ML in 9 graduate credits. Build job-ready AI skills. $5,250 aligns with employer tuition benefits. Stackable to M.Eng. in Applied Data Science.",
    ogImage:
      "/assets/images/certificate-applied-data-science/certificate-ADS-1.webp",
    url: "/certificates/applied-data-science-foundations/",
  },
  hero: {
    titleLines: [
      "Professional Graduate Certificate",
      "in Applied Data Science Foundations",
    ],
    subtitle:
      "Build AI that works-Python, SQL, and ML foundations for the real world. Launch your data science career in 9 graduate credits.",
    bgImage:
      "/assets/images/certificate-applied-data-science/certificate-ADS-1.webp",
    primaryCta: { label: "Request Information", to: "RequestInfo" },
    secondaryCta: {
      label: "Apply In Minutes",
      href: "/accelerated-application/",
    },
    badges: [
      { text: "100% Online", icon: Globe },
      { text: "Graduate Credit", icon: Award },
      { text: "AI-First Curriculum", icon: TrendingUp },
    ],
  },
  quickFacts: {
    // Enhanced Stats Bar (Penn State style)
    enhancedStats: [
      {
        title: "100% Online",
        description:
          "Complete your certificate coursework at your own pace, 100% online.",
      },
      {
        supertext: "Apply by",
        labelAbove: KEY_DATES.PRIORITY_SUBMIT.date.split(" ")[0],
        value: KEY_DATES.PRIORITY_SUBMIT.date.split(" ")[1].replace(",", ""),
        subtext: `to start ${KEY_DATES.START_OF_CLASSES.date}`,
      },
      {
        value: "9",
        label: "Credits",
        subtext: "$5,250 total",
      },
      {
        title: "Stackable Credits",
        description:
          "All 9 credits apply toward Stevens M.Eng. in Applied Data Science.",
      },
    ],

    // Legacy Quick Stats (fallback)
    quickStats: [
      { value: "9", label: "Credits" },
      { value: "3", label: "Courses" },
      { value: "100%", label: "Online" },
      { value: "16-24", label: "Weeks" },
    ],

    // Simplified Card
    termStart: `${KEY_DATES.TERM.name}: Jan 20`,
    tuition: "$5,250 Total",
    applyUrl: "#",

    // Legacy fields (keep for backward compatibility if needed)
    termStartDate: `${KEY_DATES.TERM.nameUppercase}: ${KEY_DATES.START_OF_CLASSES.date}`,
  },
  overview: {
    programType: "Graduate Certificate",
    headline: "Launch your career in AI and data science",
    tagline:
      "Master Python, SQL, and machine learning through hands-on projects.",
    description: `<p class="mb-4">This certificate is designed to launch your career in applied AI and data science. In today's data-driven economy, organizations need professionals who can build and deploy machine learning solutions-not just analyze data, but create AI-powered systems that solve real business problems.</p><p class="mb-4">The Applied Data Science Foundations certificate provides an <strong>AI-first, project-driven curriculum</strong> where you'll master Python, SQL, and machine learning through hands-on work with real datasets. Each course delivers a portfolio artifact tied to an AI/ML use case, ensuring you graduate with tangible evidence of your capabilities.</p><p>Whether you're pivoting into data science, upskilling for AI roles, or preparing for further graduate study, this certificate provides the technical foundation and graduate-level credential that employers value. All 9 credits stack toward Stevens' M.Eng. in Applied Data Science, giving you a clear pathway to continue your education.</p>`,
    keySkills: [
      "Python Programming",
      "SQL & Databases",
      "Machine Learning",
      "Data Pipelines",
      "AI Ethics & Explainability",
    ],
    concentrations: [],
  },

  career: {
    description: `<p class="mb-4">Data science and AI roles are among the fastest-growing and highest-paying positions in today's job market. From healthcare and finance to retail and technology, every industry is seeking professionals who can turn data into actionable insights and deploy AI-driven solutions.</p><p class="mb-4">This certificate prepares you for entry-level to mid-level roles in applied data science, machine learning engineering, and AI analytics. You'll develop the technical skills employers seek-Python, SQL, ML frameworks-while also learning the soft skills needed to communicate insights and collaborate with stakeholders.</p><p>Graduates of this certificate are positioned to pursue roles such as Data Analyst, ML Associate Engineer, AI Solutions Specialist, and Business Intelligence Developer. With the stackability to MEADS, you also have a clear pathway to advance into senior data science and AI leadership positions.</p>`,
    jobTitles: [
      { title: "Data Analyst", employed: "High Demand", salary: "$90,720" },
      {
        title: "ML Engineer Associate",
        employed: "Growing",
        salary: "$135,690",
      },
      {
        title: "AI Solutions Specialist",
        employed: "Emerging",
        salary: "$132,480",
      },
      {
        title: "Business Intelligence Developer",
        employed: "In Demand",
        salary: "$100,360",
      },
      {
        title: "Applied Data Scientist",
        employed: "High Growth",
        salary: "$115,280",
      },
    ],

    source:
      "Salary data shown are based on market research from sources such as LinkedIn Economic Graph and Lightcast (2025). Exact figures for emerging AI roles vary widely by industry, company size, and experience level.",
    topCompanies: ["Google", "Amazon", "Microsoft", "IBM", "Meta", "Apple"],
  },
  whatYoullLearn: {
    variant: "skillCards",
    title: "Curriculum: From Math to ML",
    description:
      "The certificate follows a strategic progression: master the mathematical foundations for ML, build data pipelines with Python and SQL, then apply machine learning to real-world problems. Each course includes hands-on labs and a portfolio project.",
    modules: [
      {
        title: "Applied Math for AI",
        growth: "MA 574 – Applied Math for Data Science",
        icon: LineChart,
        courses: [
          {
            code: "Core Topics",
            title: "Linear algebra, calculus, optimization for ML/AI",
          },
          {
            code: "Hands-On",
            title: "Code-driven labs: PCA, regression, gradient descent",
          },
          {
            code: "Project",
            title: "Train and interpret an ML model with AI insight report",
          },
        ],
      },
      {
        title: "Python & Data Pipelines",
        growth: "CS 563 – Python and Databases",
        icon: Database,
        courses: [
          {
            code: "Core Topics",
            title: "Python for data science, SQL, ETL/ELT, APIs",
          },
          {
            code: "Hands-On",
            title:
              "Build AI-ready pipelines from raw data to training datasets",
          },
          {
            code: "Project",
            title: "End-to-end pipeline published to Streamlit app",
          },
        ],
      },
      {
        title: "Machine Learning & AI",
        growth: "CS 559 – Machine Learning: Fundamentals & Applications",
        icon: Code,
        courses: [
          {
            code: "Core Topics",
            title:
              "Regression, classification, ensembles, neural networks, explainability",
          },
          {
            code: "Hands-On",
            title:
              "Build and evaluate AI solutions with SHAP/LIME for transparency",
          },
          {
            code: "Project",
            title:
              "Deploy an ML model with reproducible code and stakeholder narrative",
          },
        ],
      },
    ],
  },
  whyStevens: {
    title: "Why Choose Stevens for Data Science?",
    description: `<p>Stevens Institute of Technology is ranked among the top institutions for data science and AI education. Located in the heart of the New York metropolitan area, Stevens combines world-class faculty expertise with strong industry connections.</p><p>This certificate emphasizes applied learning-you'll work with real datasets, build production-ready pipelines, and deploy ML models, not just study theory. Our faculty are active researchers and practitioners who bring cutting-edge insights directly into the classroom.</p><p>Plus, the certificate is fully stackable toward our M.Eng. in Applied Data Science (MEADS), giving you flexibility to test the waters and continue toward a full master's degree if desired.</p>`,
  },
  curriculum: {
    description:
      "The Applied Data Science Foundations Certificate consists of three courses (9 graduate credits total) designed to take you from mathematical foundations to deploying machine learning models. You'll learn industry-standard tools including Python, pandas, scikit-learn, SQL, and cloud data platforms. Every course includes hands-on labs with AI-enhanced learning tools.",
    variant: "certificate",
    tabs: [
      {
        id: "sequence",
        title: "Course Sequence",
        sections: [
          {
            title: "Certificate Courses (9 Credits)",
            intro:
              "Complete all three courses. The sequence is designed to build your skills progressively, from mathematical foundations through practical ML deployment.",
            courses: [
              {
                code: "MA 574",
                name: "Applied Math for Data Science",
                credits: 3,
                focus:
                  "AI-aligned mathematical foundations for machine learning and AI optimization. Less theorem-heavy, more AI-application focused—every concept connected to how it powers machine learning.",
                whatYouDo:
                  "Master linear algebra, matrix operations, calculus, and optimization through code-driven labs. Every concept is connected to how it powers machine learning, framed around ML loss functions and neural optimization.",
                topics: [
                  "Vectors/matrices",
                  "SVD",
                  "eigen decomposition",
                  "gradient descent",
                  "convex optimization",
                  "PCA",
                  "regression",
                ],
                labs: "Implement PCA, regression, and optimization in Python; explore how matrix calculus and gradients drive AI models",
                project:
                  "Train and interpret a simple ML model (PCA + regression) with an AI insight report",
              },
              {
                code: "CS 563",
                name: "Python and Databases for AI Workflows",
                credits: 3,
                focus:
                  "Building the data backbone for AI through Python and SQL",
                whatYouDo:
                  "Master Python for data science (pandas, NumPy, scikit-learn); design SQL databases for ML feature stores; build ETL/ELT pipelines that transform raw data into AI-ready datasets.",
                modules: [
                  "Python for DS/AI (pandas, NumPy, scikit-learn pipelines)",
                  "SQL modeling for ML feature stores",
                  "ETL/ELT (from API to AI model)",
                  "Cloud data and automation",
                  "Responsible AI data prep (bias, fairness, transparency)",
                ],
                project:
                  "Build an end-to-end AI-ready pipeline—from raw data to training dataset—then publish results to a simple Streamlit app",
              },
              {
                code: "CS 559",
                name: "Machine Learning: Fundamentals & Applied AI",
                credits: 3,
                focus: "Translating ML theory into applied AI systems",
                whatYouDo:
                  "Build and evaluate machine learning models using industry-standard frameworks. Learn regression, classification, ensembles, clustering, and neural network fundamentals. Master AI explainability (SHAP/LIME), ethics, and bias mitigation.",
                topics: [
                  "Supervised learning (regression/classification)",
                  "unsupervised learning",
                  "ensemble methods",
                  "neural network primer",
                  "embeddings",
                  "feature pipelines",
                  "AI explainability (SHAP/LIME)",
                  "ethics and bias mitigation",
                ],
                practice:
                  "Applied labs with real datasets, explainability exercises, peer-reviewed AI deployment memos",
                project:
                  "Build and evaluate an AI solution (e.g., sentiment analysis or fraud detection) with reproducible code and stakeholder narrative",
              },
            ],
          },
        ],
      },
    ],
  },

  commonJobTitles: {
    title: "Career Paths in Data Science & AI",
  },
  topCompanies: {
    title: "Where Stevens Alumni Work",
    description:
      "Our graduates join leading organizations across technology, finance, healthcare, and consulting",
    companies: [
      {
        name: "Google",
        logo: "/assets/company_logo/Google_2015_logo.svg.png",
        industry: "Technology",
      },
      {
        name: "Amazon",
        logo: "/assets/company_logo/Amazon_logo.svg.webp",
        industry: "Technology",
      },
      {
        name: "Microsoft",
        logo: "/assets/company_logo/Microsoft_logo_(2012).svg.png",
        industry: "Technology",
      },
      {
        name: "IBM",
        logo: "/assets/company_logo/IBM_logo.svg.png",
        industry: "Technology",
      },
      {
        name: "Meta",
        logo: "/assets/company_logo/Meta_Platforms_Inc._logo.svg.png",
        industry: "Technology",
      },
      {
        name: "Apple",
        logo: "/assets/company_logo/Apple_logo_black.svg.png",
        industry: "Technology",
      },
    ],
  },
  admissions: {
    variant: "certificateWithDeadlines",
    requirements: `
      <div class="space-y-6">
        <div>
          <h4 class="font-stevens-headers font-bold text-stevens-lg mb-stevens-sm">WHO SHOULD APPLY</h4>
          <p class="font-stevens-body">This certificate is designed for working professionals pivoting into data/AI roles; tech-adjacent managers upskilling in Python/SQL/ML; and early-career engineers and analysts seeking AI literacy and applied data fluency.</p>
        </div>
        <div>
          <h4 class="font-stevens-headers font-bold text-stevens-lg mb-stevens-sm">PREREQUISITES</h4>
          <p class="font-stevens-body">No formal prerequisites. However, basic comfort with quantitative reasoning is helpful. We'll teach you the programming and mathematical concepts you need-no prior coding experience required.</p>
        </div>
        <div>
          <h4 class="font-stevens-headers font-bold text-stevens-lg mb-stevens-sm">APPLICATION PROCESS</h4>
          <p class="font-stevens-body">Apply through our streamlined Accelerated Application. Submit your resume or LinkedIn profile and unofficial transcripts. No letters of recommendation or entrance exams required.</p>
        </div>
        <div>
          <h4 class="font-stevens-headers font-bold text-stevens-lg mb-stevens-sm">STACKABILITY TO MEADS</h4>
          <p class="font-stevens-body">All 9 credits apply toward Stevens' M.Eng. in Applied Data Science (MEADS), per Registrar approval. This certificate serves as a perfect on-ramp to the full master's program, allowing you to test your interest and aptitude before committing to the complete degree.</p>
        </div>
      </div>
    `,
  },
  keyDates: {
    headers: [
      "Term",
      "Early Submit",
      "Priority Submit",
      "Final Submit",
      "Start of Classes",
    ],
    rows: [
      {
        event: KEY_DATES.TERM.name,
        date: KEY_DATES.EARLY_SUBMIT.date,
        details: KEY_DATES.EARLY_SUBMIT.details,
        priorityDate: KEY_DATES.PRIORITY_SUBMIT.date,
        priorityDetails: KEY_DATES.PRIORITY_SUBMIT.details,
        finalDate: KEY_DATES.FINAL_SUBMIT.date,
        startDate: KEY_DATES.START_OF_CLASSES.date,
      },
    ],
    footnote:
      "*Applicants who apply by the early submit deadline and are admitted may be eligible for a $250 deposit waiver. Other conditions may apply.",
  },
  tuition: {
    cards: [
      { value: "$5,250", label: "Total Certificate Cost" },
      { value: "$583", label: "Per Credit" },
    ],
    description: `
      <div class="space-y-4">
        <p class="font-stevens-headers font-bold text-stevens-lg text-stevens-dark-gray">Invest in Your Data Science Future</p>
        <p class="font-stevens-body text-left">At $5,250 for 9 graduate credits, this certificate represents exceptional value for a credential that can transform your career. The cost is strategically priced to align with the <strong>IRS $5,250 annual tax-free employer tuition benefit</strong>—making it an ideal choice if your company offers tuition assistance.</p>
        
        <div class="bg-stevens-light-gray border-l-4 border-stevens-black p-4 rounded-stevens-sm">
          <p class="font-bold text-stevens-md  text-stevens-dark-gray mb-2">Employer Tuition Reimbursement</p>
          <p class="font-stevens-body text-stevens-sm text-left">Many employers reimburse up to $5,250 per year for job-relevant graduate education. This certificate fits perfectly within that benefit—potentially allowing you to earn graduate-level data science credentials at little or no personal cost.</p>
        </div>
        
        <div class="bg-stevens-light-gray border-l-4 border-stevens-black p-4 rounded-stevens-sm">
          <p class="font-bold text-stevens-md text-stevens-dark-gray mb-2">Financial Aid & Funding Options</p>
          <p class="font-stevens-body text-stevens-sm mb-stevens-sm text-left">Financial aid, grants, corporate discounts, and scholarships are available to help make your Stevens education more affordable.</p>
          <p class="font-stevens-body text-stevens-sm text-left">Apply by the <strong>priority deadline (${KEY_DATES.PRIORITY_SUBMIT.date})</strong> to maximize your funding opportunities.</p>
        </div>
        
        <div class="flex flex-col sm:flex-row gap-4 mt-6">
          <a href="/request-information/" class="inline-block bg-stevens-black hover:bg-stevens-dark-gray text-white font-stevens-body font-semibold px-stevens-lg py-stevens-sm rounded-stevens-md transition-colors duration-stevens-normal text-center">
            Request Information
          </a>
          <a href="${BOOKING_URLS.SCHEDULE_CALL}" target="_blank" rel="noopener noreferrer" class="inline-block bg-stevens-dark-gray hover:bg-stevens-dark-gray text-white font-stevens-body font-semibold px-stevens-lg py-stevens-sm rounded-stevens-md transition-colors duration-stevens-normal text-center">
            Schedule a Call for Funding Details
          </a>
        </div>
        
        <p class="font-stevens-body text-stevens-xs text-stevens-dark-gray mt-stevens-md">Tuition based on Spring & Summer 2026 rates. Tuition and fees are subject to change annually.</p>
      </div>
    `,
  },

  faculty: {
    title: "Meet Your Data Science Faculty",
    description:
      "Learn from expert faculty who bring cutting-edge research and industry experience to every course.",
    members: [
      {
        name: "Upendra Prasad",
        title: "Senior Lecturer",
        image: "/assets/avatars/certificate-ADS-avatar/uprasad.avif",
      },
      {
        name: "Samuel Kim",
        title: "Teaching Professor",
        image: "/assets/avatars/certificate-ADS-avatar/skim2.webp",
      },
      { name: "David Landaeta", title: "", image: "" },
    ],
  },
  faqs: [
    {
      q: "Do I need programming experience?",
      a: "No. The certificate is designed to take you from fundamentals to applied ML. We start with the basics in each course and scaffold your learning with templates, AI copilots, and extensive lab support.",
    },
    {
      q: "What programming languages will I learn?",
      a: "You'll focus primarily on Python, which is the industry standard for data science and machine learning. You'll also learn SQL for database work and data manipulation.",
    },
    {
      q: "Will this help with tuition reimbursement?",
      a: "Yes. The $5,250 total cost aligns with the IRS tax-free employer benefit limit that many companies offer. Our enrollment team can help you navigate your company's specific reimbursement process.",
    },
    {
      q: "Can these credits count toward a master's degree?",
      a: "Yes. All 9 credits are fully stackable toward Stevens' M.Eng. in Applied Data Science (MEADS), subject to Registrar approval. This gives you a clear pathway from certificate to master's degree.",
    },
    {
      q: "What tools and technologies will I use?",
      a: "You'll work with industry-standard tools including Python (pandas, NumPy, scikit-learn), SQL (PostgreSQL), Jupyter notebooks, Git/GitHub, cloud platforms, and visualization tools like Streamlit and Matplotlib.",
    },
    {
      q: "How is this different from online courses or bootcamps?",
      a: "This is a graduate-level certificate with transcripted credit from an accredited institution. You'll learn from PhD faculty, work on complex projects, and earn credentials that stack toward a master's degree-something bootcamps cannot offer.",
    },
    {
      q: "What can I do with this certificate?",
      a: "Graduates are prepared for roles such as Data Analyst, ML Associate Engineer, AI Solutions Specialist, Business Intelligence Developer, and Applied Data Scientist. The three portfolio projects you build demonstrate your capabilities to employers and serve as talking points in job interviews.",
    },
  ],

  accreditation: `Stevens Institute of Technology has been continually accredited by the <a href="https://www.msche.org/" target="_blank" rel="noopener noreferrer" class="text-stevens-white underline hover:text-stevens-light-gray0 transition-colors duration-stevens-normal">Middle States Commission on Higher Education (MSCHE)</a> since 1927. The Professional Graduate Certificate in Applied Data Science Foundations awards graduate credit that appears on your official Stevens transcript.`,
};

export default function CertificateAppliedDataSciencePage() {
  usePageTracking({
    pageType: "program",
    programCode: "cert-ads",
    additionalData: {
      program_name:
        "Professional Graduate Certificate in Applied Data Science Foundations",
      has_rfi_modal: true,
      has_pricing_cards: true,
      program_type: "certificate",
    },
  });

  // Add bottomContent to hero for certificate pages
  const heroWithTuitionCards = {
    ...programData.hero,
    bottomContent: <TuitionCardsHero cards={programData.tuition.cards} />,
  };

  return (
    <PageContextProvider
      pageType="program"
      pageName="CertificateAppliedDataScience"
    >
      <ProgramContextProvider
        programCode="cert-ads"
        programName="Professional Graduate Certificate in Applied Data Science Foundations"
        programType="certificate"
      >
        <CertificateTemplate
          programData={{ ...programData, hero: heroWithTuitionCards }}
          theme="dark"
        />
      </ProgramContextProvider>
    </PageContextProvider>
  );
}
