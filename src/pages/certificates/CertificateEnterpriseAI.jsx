import React from "react";
import {
  Globe,
  Award,
  Check,
  DollarSign,
  GraduationCap,
  TrendingUp,
  BookOpen,
  Users,
} from "lucide-react";
import { CertificateTemplate } from "../../components/program-pages/templates";
import { TuitionCardsHero } from "../../components/program-pages/primitives";
import { KEY_DATES_SPRING2, BOOKING_URLS } from "@/config/constants";
import { usePageTracking } from "@/hooks/analytics/usePageTracking";
import { ProgramContextProvider } from "@/contexts/analytics/ProgramContext";
import { PageContextProvider } from "@/contexts/analytics/PageContext";

const programData = {
  code: "cert-eai",
  seo: {
    title:
      "Professional Graduate Certificate in Enterprise AI | Stevens Institute of Technology",
    description:
      "Launch your AI career in 9 graduate credits. Learn to frame, prototype, and deploy AI workflows. $5,250 aligns with employer tuition benefits. Stackable to MBA and M.Eng.",
    ogImage:
      "/assets/images/certificate-enterprise-ai/certificate-enterpriseAI-1.webp",
    url: "/certificates/enterprise-ai/",
  },
  hero: {
    titleLines: ["Professional Graduate Certificate", "in Enterprise AI"],
    subtitle:
      "Build AI that works at work. In 9 credits, go from idea to a scheduled, monitored AI workflow-no CS degree required.",
    bgImage:
      "/assets/images/certificate-enterprise-ai/certificate-enterpriseAI-1.webp",
    primaryCta: { label: "Request Information", to: "RequestInfo" },
    secondaryCta: {
      label: "Apply In Minutes",
      href: "/accelerated-application/",
    },
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
        labelAbove: KEY_DATES_SPRING2.PRIORITY_SUBMIT.date.split(" ")[0],
        value: KEY_DATES_SPRING2.PRIORITY_SUBMIT.date
          .split(" ")[1]
          .replace(",", ""),
        subtext: `to start ${KEY_DATES_SPRING2.START_OF_CLASSES.date}`,
      },
      {
        value: "9",
        label: "Credits",
        subtext: "$5,250 total",
      },
      {
        title: "Stackable Credits",
        description:
          "All 9 credits apply toward Stevens MBA or M.Eng. degrees.",
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
    termStart: `${KEY_DATES_SPRING2.TERM.name}: ${KEY_DATES_SPRING2.START_OF_CLASSES.date.split(",")[0]}`,
    tuition: "$5,250 Total",
    applyUrl: "#",

    // Legacy
    termStartDate: `${KEY_DATES_SPRING2.TERM.nameUppercase}: ${KEY_DATES_SPRING2.START_OF_CLASSES.date}`,
  },
  overview: {
    programType: "Graduate Certificate",
    headline: "Build AI that works at work",
    tagline: "From idea to deployed AI workflow in 9 graduate credits.",
    description: `<p class="mb-4">Employers are hiring for "AI-fluent" business talent. AI roles top "Jobs on the Rise 2025," and AI skills carry a salary premium with ~28% higher pay. Over half of postings with AI skills are outside IT, demonstrating the broad demand for practical AI expertise across all business functions.</p><p class="mb-4">Most firms struggle to operationalize GenAI-governance, data quality, and KPIs remain critical challenges. This certificate's arc-<strong>POC → strategy → operational workflow</strong>-mirrors what adoption leaders say is required to capture value.</p><p>This short, stackable graduate credential turns managers, analysts, and product/ops professionals into responsible AI doers who can frame, prototype, and run small AI workflows safely, without needing a CS background. Upon completion, you'll earn 9 graduate credits that apply toward existing Stevens degrees including the MBA and M.Eng. in Applied Data Science.</p>`,
    keySkills: [
      "AI Strategy & Governance",
      "Generative AI & Prompting",
      "Operational AI Workflows",
      "Business Process Automation",
      "AI Ethics & Risk Management",
    ],
    concentrations: [],
    image:
      "/assets/images/certificate-enterprise-ai/shutterstock_1638173794-crop.webp",
    imageAlt: "",
    imagePosition: "50% 70%",
  },
  videoSection: {
    title: "Discover Your Future at Stevens",
    heading: "Build AI skills without putting your career on hold",
    description:
      "Our 100% online, flexible format empowers professionals to master enterprise AI capabilities while maintaining their current role. Learn from expert faculty who bridge cutting-edge AI research with real-world business applications, and connect with a network of accomplished peers implementing AI solutions across industries.",
    videoSrc: "/assets/videos/Stevens Online MBA - 1.mp4",
    posterSrc: "/assets/videos/video-cover-1.webp",
    showControls: true,
    muted: true,
    showCTA: false,
  },
  career: {
    description: `<p class="mb-4">The demand for AI skills has exploded across industries. What was once confined to data science and engineering teams is now a critical capability for business professionals in every function-from marketing and operations to finance and HR.</p><p class="mb-4">Organizations are seeking professionals who can bridge the gap between AI potential and practical implementation. The Enterprise AI Certificate prepares you to be that bridge: someone who understands AI capabilities, can design proof-of-concept solutions, and knows how to operationalize AI workflows within existing business processes.</p><p>Whether you're looking to advance in your current role, pivot into an AI-adjacent position, or simply future-proof your career, this certificate provides the practical skills and graduate-level credential employers value.</p>`,
    jobTitles: [
      { title: "AI Product Manager", employed: "Growing", salary: "$176,690" },
      {
        title: "Business Intelligence Analyst",
        employed: "High Demand",
        salary: "$100,360",
      },
      {
        title: "Operations Manager (AI)",
        employed: "Emerging",
        salary: "$125,590",
      },
      {
        title: "AI Strategy Consultant",
        employed: "High Growth",
        salary: "$150,780",
      },
      {
        title: "Digital Transformation Lead",
        employed: "In Demand",
        salary: "$149,370",
      },
    ],

    source:
      "Salary data shown are based on market research from sources such as LinkedIn Economic Graph and Lightcast (2025). Exact figures for emerging AI roles vary widely by industry, company size, and experience level.",
    topCompanies: [
      "Microsoft",
      "Google",
      "Amazon",
      "Deloitte",
      "Accenture",
      "IBM",
    ],
  },
  whatYoullLearn: {
    title: "What You'll Learn",
    description:
      "The Enterprise AI Certificate follows a strategic progression: design and prototype GenAI solutions, understand AI capabilities and governance, then build and deploy operational workflows. Each course builds on the previous, creating a complete skillset for AI implementation.",
    modules: [
      {
        title: "Generative AI & Prototyping",
        description:
          "BIA 662 – Augmented Intelligence & GenAI: Design and prototype GenAI solutions with real business value.",
        skillsLabel: "Course Highlights",
        skills: [
          "GenAI foundations, prompt engineering, and ethics",
          "Design and scope a proof-of-concept with business value",
          "Team PoC with management plan, demo, and implementation roadmap",
        ],
      },
      {
        title: "AI Strategy & Management",
        description:
          "BIA 568 – Management of AI Technologies: Learn to evaluate, govern, and implement AI at the enterprise level.",
        skillsLabel: "Course Highlights",
        skills: [
          "AI Factory concepts, deployment patterns, and platform evaluation",
          "FATE principles, governance frameworks, and vendor selection",
          "Implementation playbook and architecture analysis",
        ],
      },
      {
        title: "Operational AI Workflows",
        description:
          "PE 810 – Applied AI for Business: Build and deploy production-ready AI workflows and applications.",
        skillsLabel: "Course Highlights",
        skills: [
          "AI co-coding basics, workflow design, and modular development",
          "Guardrails, validation, dashboards, and NLP agents",
          "Running script/app with config, tests, logs, and operational demo",
        ],
      },
    ],
  },
  whyStevens: {
    title: "Why Choose Stevens for Enterprise AI?",
    description: `<p>Stevens Institute of Technology brings 150+ years of engineering excellence and innovation to AI education. Located just minutes from Manhattan, Stevens combines rigorous academic foundations with practical, industry-driven curriculum.</p><p>This certificate is designed for working professionals who need to apply AI immediately. You'll learn from faculty who are active researchers and practitioners, ensuring you gain cutting-edge knowledge that translates directly to workplace challenges.</p><p>Plus, with full stackability toward our MBA and M.Eng. in Applied Data Science programs, your certificate investment continues to pay dividends as you advance your education.</p>`,
  },
  curriculum: {
    description:
      "The Enterprise AI Certificate consists of three carefully sequenced courses (9 graduate credits total). You'll progress from understanding AI strategy and governance, to designing GenAI proof-of-concepts, to building operational AI workflows. The curriculum emphasizes practical application-every course includes hands-on projects that simulate real business challenges.",
    variant: "certificate",
    tabs: [
      {
        id: "sequence",
        title: "Course Sequence",
        sections: [
          {
            title: "Certificate Courses (9 Credits)",
            intro:
              "Complete all three courses in sequence. Each course builds on the previous, creating a comprehensive understanding of enterprise AI implementation.",
            courses: [
              {
                code: "BIA 568",
                name: "Management of AI Technologies",
                credits: 3,
                faculty: "Dr. Michael zur Muehlen",
                focus:
                  "Strategy, platforms, FATE (Fairness, Accountability, Transparency, Ethics), deployment patterns (in-the-loop/on-the-loop), project evaluation",
                whatYouDo:
                  "Map workflows to AI opportunities; compare in-the-loop vs. on-the-loop patterns; evaluate ROI and data readiness; select vendors and platforms.",
                topics: [
                  "AI Factory",
                  "FATE principles",
                  "deployment architectures",
                  "governance frameworks",
                  "agent/copilot patterns",
                  "vendor evaluation",
                ],
                deliverable:
                  "Implementation playbook and architecture analysis report",
              },
              {
                code: "BIA 662",
                name: "Augmented Intelligence & Generative AI",
                credits: 3,
                faculty: "Dr. Alkiviadis Vazacopoulos",
                focus:
                  "GenAI foundations, prompt engineering, proof-of-concept design with ethics considerations",
                whatYouDo:
                  "Learn GenAI basics and prompt engineering techniques; build a team PoC with a management-style plan and demonstration.",
                topics: [
                  "LLM fundamentals",
                  "prompt engineering",
                  "ethics and bias mitigation",
                  "prototyping patterns",
                  "PoC scoping and value articulation",
                ],
                deliverable:
                  "Team proof-of-concept with implementation plan, demo, and business case",
              },
              {
                code: "PE 810",
                name: "Applied AI for Business",
                credits: 3,
                faculty: "Dr. Carlo Lipizzi",
                focus:
                  "Operational workflow development with LLMs as coding co-pilots; dashboards and NLP agents",
                whatYouDo:
                  "Use LLMs to co-write and harden Python utilities; design modular workflows; add guardrails; produce dashboards; ship a working NLP agent or reporting pipeline.",
                topics: [
                  "AI-assisted coding",
                  "workflow design",
                  "data validation",
                  "guardrails and evaluation",
                  "dashboard creation",
                  "NLP agent deployment",
                ],
                deliverable:
                  "Running script/app with configuration, tests, logs, and operational demonstration",
              },
            ],
          },
        ],
        footer: {
          title: "Recommended Sequence",
          content:
            "BIA 662 → BIA 568 → PE 810 — This sequence mirrors the AI implementation journey: proof-of-concept → strategy → operationalization. Each course builds essential skills for the next phase.",
        },
      },
    ],
  },

  careerOutcomes: {
    title: "Career Opportunities with AI Skills",
  },
  topCompanies: {
    title: "Where Stevens Alumni Work",
    description:
      "Our graduates join leading organizations across technology, finance, healthcare, and consulting",
    companies: [
      {
        name: "Microsoft",
        logo: "/assets/company_logo/Microsoft_logo_(2012).svg.png",
        industry: "Technology",
      },
      {
        name: "Google",
        logo: "/assets/company_logo/Google_2015_logo.svg.png",
        industry: "Technology",
      },
      {
        name: "Amazon",
        logo: "/assets/company_logo/Amazon_logo.svg.webp",
        industry: "Ecommerce",
      },
      {
        name: "Deloitte",
        logo: "/assets/company_logo/Logo_of_Deloitte.svg.png",
        industry: "Consulting",
      },
      {
        name: "Accenture",
        logo: "/assets/company_logo/Accenture_logo.svg.png",
        industry: "Consulting",
      },
      {
        name: "IBM",
        logo: "/assets/company_logo/IBM_logo.svg.png",
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
          <p class="font-stevens-body">This certificate is designed for non-STEM and STEM professionals in product, operations, marketing, HR, finance, supply chain, or services who need to use AI at work. No prior coding experience is required.</p>
        </div>
        <div>
          <h4 class="font-stevens-headers font-bold text-stevens-lg mb-stevens-sm">PREREQUISITES</h4>
          <p class="font-stevens-body">None. The certificate is designed to be accessible to professionals from all backgrounds. No programming experience required-we'll teach you what you need to know.</p>
        </div>
        <div>
          <h4 class="font-stevens-headers font-bold text-stevens-lg mb-stevens-sm">APPLICATION PROCESS</h4>
          <p class="font-stevens-body">Apply through our streamlined Accelerated Application. Submit your resume or LinkedIn profile and unofficial transcripts. No letters of recommendation or entrance exams required.</p>
        </div>
        <div>
          <h4 class="font-stevens-headers font-bold text-stevens-lg mb-stevens-sm">STACKABILITY</h4>
          <p class="font-stevens-body">All 9 credits apply toward existing Stevens graduate programs including the MBA and M.Eng. in Applied Data Science, per Registrar approval. This allows you to test the waters and continue toward a full master's degree if desired.</p>
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
        event: KEY_DATES_SPRING2.TERM.name,
        date: KEY_DATES_SPRING2.EARLY_SUBMIT.date,
        details: KEY_DATES_SPRING2.EARLY_SUBMIT.details,
        priorityDate: KEY_DATES_SPRING2.PRIORITY_SUBMIT.date,
        priorityDetails: KEY_DATES_SPRING2.PRIORITY_SUBMIT.details,
        finalDate: KEY_DATES_SPRING2.FINAL_SUBMIT.date,
        startDate: KEY_DATES_SPRING2.START_OF_CLASSES.date,
      },
    ],
    footnote:
      "*Applicants who apply by the early submit deadline and are admitted may be eligible for a $250 deposit waiver. Other conditions may apply.",
  },
  // Deadlines section data (for timeline display)
  deadlines: {
    term: KEY_DATES_SPRING2.TERM.nameUppercase,
    dates: [
      {
        label: "Early Submit",
        date: KEY_DATES_SPRING2.EARLY_SUBMIT.date,
        description: "Eligible for $250 deposit waiver upon admission.",
      },
      {
        label: "Priority Submit",
        date: KEY_DATES_SPRING2.PRIORITY_SUBMIT.date,
        description: "Recommended deadline for best course selection.",
      },
      {
        label: "Final Submit",
        date: KEY_DATES_SPRING2.FINAL_SUBMIT.date,
        description: "Last day to submit your application.",
      },
      {
        label: "Start of Classes",
        date: KEY_DATES_SPRING2.START_OF_CLASSES.date,
        description: "Begin your Enterprise AI journey at Stevens.",
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
        <p class="font-stevens-headers font-bold text-stevens-lg text-stevens-dark-gray">Smart Investment in Your Future</p>
        <p class="font-stevens-body text-left">At $5,250 for 9 graduate credits, this certificate is strategically priced to align with the <strong>IRS $5,250 annual tax-free employer tuition benefit</strong>—making it an ideal option for professionals whose companies offer tuition reimbursement.</p>
        
        <div class="bg-stevens-light-gray border-l-4 border-stevens-black p-4 rounded-stevens-sm">
          <p class="font-bold text-stevens-md text-stevens-dark-gray mb-2">Corporate Tuition Assistance</p>
          <p class="font-stevens-body text-stevens-sm text-left">Many employers reimburse up to $5,250 per year for job-relevant education. This certificate fits perfectly within that benefit, potentially allowing you to earn graduate credit at little to no out-of-pocket cost.</p>
        </div>
        
        <div class="bg-stevens-light-gray border-l-4 border-stevens-black p-4 rounded-stevens-sm">
          <p class="font-bold text-stevens-md text-stevens-dark-gray mb-2">Financial Aid & Funding Options</p>
          <p class="font-stevens-body text-stevens-sm mb-stevens-sm text-left">Financial aid, grants, corporate discounts, and scholarships are available to help make your Stevens education more affordable.</p>
          <p class="font-stevens-body text-stevens-sm text-left">Apply by the <strong>priority deadline (${KEY_DATES_SPRING2.PRIORITY_SUBMIT.date})</strong> to maximize your funding opportunities.</p>
        </div>
        
        <div class="flex flex-col sm:flex-row gap-4 mt-6">
          <a href="/request-information/" class="inline-flex items-center justify-center gap-2 whitespace-nowrap font-stevens-body font-semibold tracking-wider transition-all duration-stevens-normal bg-stevens-black text-white hover:bg-stevens-dark-gray px-stevens-lg py-stevens-sm text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stevens-light-gray">
            Request Information
          </a>
          <a href="${BOOKING_URLS.SCHEDULE_CALL}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center gap-2 whitespace-nowrap font-stevens-body font-semibold tracking-wider transition-all duration-stevens-normal border border-stevens-dark-gray bg-transparent text-stevens-dark-gray hover:bg-stevens-dark-gray hover:text-white px-stevens-lg py-stevens-sm text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stevens-light-gray">
            Schedule a Call for Funding Details
          </a>
        </div>
        
        <p class="font-stevens-body text-stevens-xs text-stevens-dark-gray mt-stevens-md">Tuition based on Spring & Summer 2026 rates. Tuition and fees are subject to change annually.</p>
      </div>
    `,
  },

  faculty: {
    title: "Meet Your Enterprise AI Faculty",
    description:
      "Learn from faculty who are active researchers and practitioners in AI, business analytics, and process innovation.",
    members: [
      {
        name: "Michael zur Muehlen",
        title: "Associate Dean of Graduate Studies and Associate Professor",
        image: "/assets/avatars/certificate-EAI-avatar/mmuehlen.avif",
      },
      {
        name: "Alkiviadis Vazacopoulos",
        title: "Teaching Associate Professor",
        image: "/assets/avatars/certificate-EAI-avatar/avazacop.avif",
      },
      {
        name: "Carlo Lipizzi",
        title: "Teaching Associate Professor",
        image:
          "/assets/avatars/certificate-EAI-avatar/carlo-lipizzi-stevens-faculty.webp",
      },
    ],
  },
  faqs: [
    {
      q: "How is this different from a bootcamp?",
      a: "This is a graduate-level certificate with transcripted credit that stacks toward Stevens master's degrees. You'll gain governance/ethics rigor and operational deliverables-not just demos. The curriculum is taught by PhD faculty with deep research and industry experience.",
    },
    {
      q: "Do I need programming experience?",
      a: "No. The certificate is designed to be accessible to professionals from all backgrounds. In PE 810, you'll use AI copilots to help write code, with template-first labs that scaffold your learning.",
    },
    {
      q: "Will this help with tuition reimbursement?",
      a: "Often yes. The $5,250 total cost aligns with the IRS tax-free employer benefit limit that many companies offer. Our enrollment team can help you navigate your specific company's reimbursement process.",
    },
    {
      q: "Can these credits count toward a master's degree?",
      a: "Yes. All 9 credits are stackable toward existing Stevens graduate programs including the MBA and M.Eng. in Applied Data Science, subject to Registrar approval.",
    },
    {
      q: "What's the time commitment?",
      a: "Each course typically runs 8 weeks with online asynchronous content plus weekly live sessions. Expect 8-12 hours per week per course. You can take courses sequentially or back-to-back depending on availability.",
    },
    {
      q: "What will I be able to do after completing the certificate?",
      a: "You'll be able to: evaluate AI platforms and vendors, design GenAI proof-of-concepts with clear business value, build and deploy operational AI workflows with proper guardrails, and communicate AI strategies and results to stakeholders. These are the exact skills organizations need to move from AI experimentation to real value capture.",
    },
  ],

  accreditation: `Stevens Institute of Technology has been continually accredited by the <a href="https://www.msche.org/" target="_blank" rel="noopener noreferrer" class="text-stevens-white underline hover:text-stevens-light-gray0 transition-colors duration-stevens-normal">Middle States Commission on Higher Education (MSCHE)</a> since 1927. The Professional Graduate Certificate in Enterprise AI awards graduate credit that appears on your official Stevens transcript.`,
};

export default function CertificateEnterpriseAIPage() {
  usePageTracking({
    pageType: "program",
    programCode: "cert-eai",
    additionalData: {
      program_name: "Professional Graduate Certificate in Enterprise AI",
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
    <PageContextProvider pageType="program" pageName="CertificateEnterpriseAI">
      <ProgramContextProvider
        programCode="cert-eai"
        programName="Professional Graduate Certificate in Enterprise AI"
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
