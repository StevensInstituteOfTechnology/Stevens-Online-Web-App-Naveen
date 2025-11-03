import React from 'react';
import {
  Globe, Award, Check, Briefcase, DollarSign, GraduationCap, TrendingUp,
  Target, BookOpen, Users, BrainCircuit } from 'lucide-react';
import ProgramPageTemplate from '../components/program-pages/ProgramPageTemplate';
import CertificateTuitionCardsHero from '../components/program-pages/CertificateTuitionCardsHero';
import { KEY_DATES } from '@/config/constants';

const programData = {
  code: 'cert-eai',
  seo: {
    title: 'Professional Certificate in Enterprise AI | Stevens Institute of Technology',
    description: 'Launch your AI career in 9 graduate credits. Learn to frame, prototype, and deploy AI workflows. $5,250 aligns with employer tuition benefits. Stackable to MBA and M.Eng.',
    ogImage: '/assets/images/certificate-enterpriseAI-1.avif',
    url: '/certificates/enterprise-ai/'
  },
  hero: {
    titleLines: ['Professional Certificate', 'in Enterprise AI'],
    subtitle: "Build AI that works at work. In 9 credits, go from idea to a scheduled, monitored AI workflow-no CS degree required.",
    bgImage: "/assets/images/certificate-enterpriseAI-1.avif",
    primaryCta: { label: 'Request Information', to: 'RequestInfo' },
    secondaryCta: { label: 'Apply In Minutes', href: '/accelerated-application/' },
    badges: [
    { text: "100% Online", icon: Globe },
    { text: "Graduate Credit", icon: Award },
      { text: "Stackable to Masters", icon: GraduationCap }
    ]
  },
  quickFacts: {
    atAGlance: [
    { value: "$5,250", label: "Total Cost", icon: DollarSign },
    { value: "9 Credits", label: "3 Courses", icon: BookOpen },
    { value: "100%", label: "Online", icon: Globe },
    { value: "Stackable", label: "To MBA & MEADS", icon: GraduationCap },
    { value: "Spring 2026", label: "Launch", icon: TrendingUp },
    { value: "No Prereqs", label: "Required", icon: Check }],

    termStartDate: "SPRING 2026: January 20, 2026",
    details: `<ul><li>9 Graduate Credits</li><li>3 Courses (3 credits each)</li><li>100% Online</li><li>8-16 Week Completion Time*</li><li>Stackable toward MBA & M.Eng. in Applied Data Science</li><li>Aligns with $5,250 IRS tax-free employer benefit</li></ul><p class="text-xs mt-2">*Completion time varies based on course scheduling and student pace.</p>`
  },
  overview: {
    title: "Certificate Overview",
    description: `<p class="mb-4">Employers are hiring for "AI-fluent" business talent. AI roles top "Jobs on the Rise 2025," and AI skills carry a salary premium with ~28% higher pay. Over half of postings with AI skills are outside IT, demonstrating the broad demand for practical AI expertise across all business functions.</p><p class="mb-4">Most firms struggle to operationalize GenAI-governance, data quality, and KPIs remain critical challenges. This certificate's arc-<strong>strategy → POC → operational workflow</strong>-mirrors what adoption leaders say is required to capture value.</p><p>This short, stackable graduate credential turns managers, analysts, and product/ops professionals into responsible AI doers who can frame, prototype, and run small AI workflows safely, without needing a CS background. Upon completion, you'll earn 9 graduate credits that apply toward existing Stevens degrees including the MBA and M.Eng. in Applied Data Science.</p>`,
    keySkills: ["AI Strategy & Governance", "Generative AI & Prompting", "Operational AI Workflows", "Business Process Automation", "AI Ethics & Risk Management"],
    concentrations: []
  },
  
  rankings: [
  { ranking: "28%", description: "HIGHER PAY WITH AI SKILLS", source: "Professionals with AI skills earn approximately 28% more than those without, according to LinkedIn's Economic Graph data." },
  { ranking: "Top", description: "JOBS ON THE RISE 2025", source: "AI-related roles dominate LinkedIn's Jobs on the Rise list, with demand spanning beyond IT into business operations, marketing, and management." },
  { ranking: "$5,250", description: "ALIGNS WITH TUITION BENEFITS", source: "The 9-credit certificate cost aligns perfectly with the IRS $5,250 tax-free employer tuition reimbursement limit, making it accessible for corporate-sponsored learners." }],

  career: {
    description: `<p class="mb-4">The demand for AI skills has exploded across industries. What was once confined to data science and engineering teams is now a critical capability for business professionals in every function-from marketing and operations to finance and HR.</p><p class="mb-4">Organizations are seeking professionals who can bridge the gap between AI potential and practical implementation. The Enterprise AI Certificate prepares you to be that bridge: someone who understands AI capabilities, can design proof-of-concept solutions, and knows how to operationalize AI workflows within existing business processes.</p><p>Whether you're looking to advance in your current role, pivot into an AI-adjacent position, or simply future-proof your career, this certificate provides the practical skills and graduate-level credential employers value.</p>`,
    jobTitles: [
      { title: "AI Product Manager", employed: "Growing", salary: "$176,690" },
      { title: "Business Intelligence Analyst", employed: "High Demand", salary: "$100,360" },
      { title: "Operations Manager (AI)", employed: "Emerging", salary: "$125,590" },
      { title: "AI Strategy Consultant", employed: "High Growth", salary: "$150,780" },
      { title: "Digital Transformation Lead", employed: "In Demand", salary: "$149,370" }],

    source: "Salary data shown are based on market research from sources such as LinkedIn Economic Graph and Lightcast (2025). Exact figures for emerging AI roles vary widely by industry, company size, and experience level.",
    topCompanies: ["Microsoft", "Google", "Amazon", "Deloitte", "Accenture", "IBM"]
  },
  whatYoullLearn: {
    variant: 'skillCards',
    title: "What You'll Learn",
    description: "The Enterprise AI Certificate follows a strategic progression: understand AI capabilities and governance, design and prototype GenAI solutions, then build and deploy operational workflows. Each course builds on the previous, creating a complete skillset for AI implementation.",
    modules: [
    {
      title: "AI Strategy & Management",
      growth: "BIA 568 – Management of AI Technologies",
      icon: Target,
      courses: [
      { code: "Week 1-4", title: "AI Factory concepts, deployment patterns, and platform evaluation" },
      { code: "Week 5-8", title: "FATE principles, governance frameworks, and vendor selection" },
      { code: "Project", title: "Implementation playbook and architecture analysis" }]

    },
    {
      title: "Generative AI & Prototyping",
      growth: "BIA 662 – Augmented Intelligence & GenAI",
      icon: BrainCircuit,
      courses: [
      { code: "Week 1-4", title: "GenAI foundations, prompt engineering, and ethics" },
      { code: "Week 5-8", title: "Design and scope a proof-of-concept with business value" },
      { code: "Project", title: "Team PoC with management plan, demo, and implementation roadmap" }]

    },
    {
      title: "Operational AI Workflows",
      growth: "PE 810 – Applied AI for Business",
      icon: Briefcase,
      courses: [
      { code: "Week 1-4", title: "AI co-coding basics, workflow design, and modular development" },
      { code: "Week 5-8", title: "Guardrails, validation, dashboards, and NLP agents" },
      { code: "Project", title: "Running script/app with config, tests, logs, and operational demo" }]

    }]

  },
  whyStevens: {
    variant: 'splitWithVideo',
    title: "Why Choose Stevens for Enterprise AI?",
    description: `<p>Stevens Institute of Technology brings 150+ years of engineering excellence and innovation to AI education. Located just minutes from Manhattan, Stevens combines rigorous academic foundations with practical, industry-driven curriculum.</p><p>This certificate is designed for working professionals who need to apply AI immediately. You'll learn from faculty who are active researchers and practitioners, ensuring you gain cutting-edge knowledge that translates directly to workplace challenges.</p><p>Plus, with full stackability toward our MBA and M.Eng. in Applied Data Science programs, your certificate investment continues to pay dividends as you advance your education.</p>`,
    video: {
      src: "/assets/videos/Stevens Online MBA - 2.mp4",
      poster: "/assets/videos/video-cover-2.avif",
      title: "",
      caption: "Hear from Stevens students and faculty about transformative AI education"
    }
  },
  curriculum: {
    description: "The Enterprise AI Certificate consists of three carefully sequenced courses (9 graduate credits total). You'll progress from understanding AI strategy and governance, to designing GenAI proof-of-concepts, to building operational AI workflows. The curriculum emphasizes practical application-every course includes hands-on projects that simulate real business challenges.",
    courseTabs: {
      foundations: {
          title: "Course Sequence",
        content: `
            <h4 class="course-section-header">Certificate Courses (9 Credits)</h4>
            <p class="course-intro">Complete all three courses in sequence. Each course builds on the previous, creating a comprehensive understanding of enterprise AI implementation.</p>
            
            <div class="space-y-stevens-md">
              <div class="course-item">
                <button class="course-toggle" data-target="bia568">BIA 568 – Management of AI Technologies (3 credits)<span class="course-arrow">▼</span></button>
                <div class="course-content hidden" id="bia568">
                  <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed mb-3"><strong>Faculty:</strong> Dr. Michael zur Muehlen</p>
                  <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed mb-3"><strong>Focus:</strong> Strategy, platforms, FATE (Fairness, Accountability, Transparency, Ethics), deployment patterns (in-the-loop/on-the-loop), project evaluation</p>
                  <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed mb-3"><strong>What You'll Do:</strong> Map workflows to AI opportunities; compare in-the-loop vs. on-the-loop patterns; evaluate ROI and data readiness; select vendors and platforms.</p>
                  <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed mb-3"><strong>Topics:</strong> AI Factory, FATE principles, deployment architectures, governance frameworks, agent/copilot patterns, vendor evaluation</p>
                  <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed"><strong>Deliverable:</strong> Implementation playbook and architecture analysis report</p>
                </div>
              </div>
            
            <div class="course-item">
              <button class="course-toggle" data-target="bia662">BIA 662 – Augmented Intelligence & Generative AI (3 credits)<span class="course-arrow">▼</span></button>
              <div class="course-content hidden" id="bia662">
                <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed mb-3"><strong>Faculty:</strong> Dr. Alkiviadis Vazacopoulos</p>
                <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed mb-3"><strong>Focus:</strong> GenAI foundations, prompt engineering, proof-of-concept design with ethics considerations</p>
                <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed mb-3"><strong>What You'll Do:</strong> Learn GenAI basics and prompt engineering techniques; build a team PoC with a management-style plan and demonstration.</p>
                <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed mb-3"><strong>Topics:</strong> LLM fundamentals, prompt engineering, ethics and bias mitigation, prototyping patterns, PoC scoping and value articulation</p>
                <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed"><strong>Deliverable:</strong> Team proof-of-concept with implementation plan, demo, and business case</p>
              </div>
            </div>
            
            <div class="course-item">
              <button class="course-toggle" data-target="pe810">PE 810 – Applied AI for Business (3 credits)<span class="course-arrow">▼</span></button>
              <div class="course-content hidden" id="pe810">
                <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed mb-3"><strong>Faculty:</strong> Dr. Carlo Lipizzi</p>
                <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed mb-3"><strong>Focus:</strong> Operational workflow development with LLMs as coding co-pilots; dashboards and NLP agents</p>
                <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed mb-3"><strong>What You'll Do:</strong> Use LLMs to co-write and harden Python utilities; design modular workflows; add guardrails; produce dashboards; ship a working NLP agent or reporting pipeline.</p>
                <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed mb-3"><strong>Topics:</strong> AI-assisted coding, workflow design, data validation, guardrails and evaluation, dashboard creation, NLP agent deployment</p>
                <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed"><strong>Deliverable:</strong> Running script/app with configuration, tests, logs, and operational demonstration</p>
              </div>
            </div>
          </div>
          
          <div class="bg-stevens-gray-50 border-l-4 border-stevens-primary p-stevens-lg rounded-stevens-sm mt-stevens-xl">
            <h5 class="font-stevens-bold text-stevens-base mb-stevens-sm">Recommended Sequence</h5>
            <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">
              <strong>BIA 568 → BIA 662 → PE 810</strong><br/>
              This sequence mirrors the AI implementation journey: strategy → proof-of-concept → operationalization. Each course builds essential skills for the next phase.
            </p>
          </div>
        `
      }
    }
  },
  
  commonJobTitles: {
    title: "Career Opportunities with AI Skills"
  },
  topCompanies: {
    title: "Where Stevens Alumni Work"
  },
  admissions: {
    variant: 'certificateWithDeadlines',
    requirements: `
      <div class="space-y-6">
        <div>
          <h4 class="font-bold text-lg mb-2">WHO SHOULD APPLY</h4>
          <p>This certificate is designed for non-STEM and STEM professionals in product, operations, marketing, HR, finance, supply chain, or services who need to use AI at work. No prior coding experience is required.</p>
        </div>
        <div>
          <h4 class="font-bold text-lg mb-2">PREREQUISITES</h4>
          <p>None. The certificate is designed to be accessible to professionals from all backgrounds. No programming experience required-we'll teach you what you need to know.</p>
        </div>
        <div>
          <h4 class="font-bold text-lg mb-2">APPLICATION PROCESS</h4>
          <p>Apply through our streamlined Accelerated Application. Submit your resume or LinkedIn profile and unofficial transcripts. No letters of recommendation or entrance exams required.</p>
        </div>
        <div>
          <h4 class="font-bold text-lg mb-2">STACKABILITY</h4>
          <p>All 9 credits apply toward existing Stevens graduate programs including the MBA and M.Eng. in Applied Data Science, per Registrar approval. This allows you to test the waters and continue toward a full master's degree if desired.</p>
        </div>
      </div>
    `
  },
  keyDates: {
    headers: ["Term", "Early Submit", "Priority Submit", "Final Submit", "Start of Classes"],
    rows: [
      { 
        event: "Spring 2026", 
        date: "October 14, 2025", 
        details: "Deposit Waiver* and Application Fee Waiver Available.",
        priorityDate: KEY_DATES.PRIORITY_SUBMIT.date,
        priorityDetails: KEY_DATES.PRIORITY_SUBMIT.details,
        finalDate: "January 5, 2026",
        startDate: "January 20, 2026"
      }
    ],
    footnote: "*Applicants who apply by the early submit deadline and are admitted may be eligible for a $250 deposit waiver. Other conditions may apply."
  },
  tuition: {
    cards: [
      { value: "$5,250", label: "Total Certificate Cost" }, 
      { value: "$583", label: "Per Credit" }
    ],
    description: `
      <div class="space-y-4">
        <p class="font-bold text-lg text-stevens-gray-900">Smart Investment in Your Future</p>
        <p>At $5,250 for 9 graduate credits, this certificate is strategically priced to align with the <strong>IRS $5,250 annual tax-free employer tuition benefit</strong>—making it an ideal option for professionals whose companies offer tuition reimbursement.</p>
        
        <div class="bg-stevens-primary/10 border-l-4 border-stevens-primary p-4 rounded-stevens-sm">
          <p class="font-semibold text-stevens-gray-900 mb-2">💼 Corporate Tuition Assistance</p>
          <p class="text-stevens-sm">Many employers reimburse up to $5,250 per year for job-relevant education. This certificate fits perfectly within that benefit, potentially allowing you to earn graduate credit at little to no out-of-pocket cost.</p>
        </div>
        
        <div class="bg-stevens-gray-50 border-l-4 border-stevens-primary p-4 rounded-stevens-sm">
          <p class="font-semibold text-stevens-gray-900 mb-2">💰 Financial Aid & Funding Options</p>
          <p class="text-stevens-sm mb-3">Financial aid, grants, corporate discounts, and scholarships are available to help make your Stevens education more affordable.</p>
          <p class="text-stevens-sm">Apply by the <strong>priority deadline (November 20, 2025)</strong> to maximize your funding opportunities.</p>
        </div>
        
        <div class="flex flex-col sm:flex-row gap-4 mt-6">
          <a href="/request-information/" class="inline-block bg-stevens-primary hover:bg-stevens-primary-dark text-white font-semibold px-6 py-3 rounded-stevens-md transition-colors duration-stevens-normal text-center">
            Request Information
          </a>
          <a href="https://outlook.office.com/book/CPEAdmissionsStevensedu@stevens0.onmicrosoft.com/?ismsaljsauthenabled" target="_blank" rel="noopener noreferrer" class="inline-block bg-stevens-gray-700 hover:bg-stevens-gray-800 text-white font-semibold px-6 py-3 rounded-stevens-md transition-colors duration-stevens-normal text-center">
            Schedule a Call for Funding Details
          </a>
        </div>
        
        <p class="text-xs text-stevens-gray-600 mt-4">Tuition based on 2025 rates. Tuition and fees are subject to change annually.</p>
      </div>
    `
  },
  
  faculty: {
    title: "Meet Your Enterprise AI Faculty",
    description: "Learn from faculty who are active researchers and practitioners in AI, business analytics, and process innovation.",
    members: [
      { name: "Michael zur Muehlen", title: "Associate Dean of Graduate Studies and Associate Professor", image: "/assets/avatars/certificate-EAI-avatar/mmuehlen.avif" },
      { name: "Alkiviadis Vazacopoulos", title: "Teaching Associate Professor", image: "/assets/avatars/certificate-EAI-avatar/avazacop.avif" },
      { name: "Carlo Lipizzi", title: "Teaching Associate Professor", image: "/assets/avatars/certificate-EAI-avatar/carlo-lipizzi-stevens-faculty.jpg" }
    ]
  },
  faqs: [
  { q: "How is this different from a bootcamp?", a: "This is a graduate-level certificate with transcripted credit that stacks toward Stevens master's degrees. You'll gain governance/ethics rigor and operational deliverables-not just demos. The curriculum is taught by PhD faculty with deep research and industry experience." },
  { q: "Do I need programming experience?", a: "No. The certificate is designed to be accessible to professionals from all backgrounds. In PE 810, you'll use AI copilots to help write code, with template-first labs that scaffold your learning." },
  { q: "Will this help with tuition reimbursement?", a: "Often yes. The $5,250 total cost aligns with the IRS tax-free employer benefit limit that many companies offer. Our enrollment team can help you navigate your specific company's reimbursement process." },
  { q: "Can these credits count toward a master's degree?", a: "Yes. All 9 credits are stackable toward existing Stevens graduate programs including the MBA and M.Eng. in Applied Data Science, subject to Registrar approval." },
  { q: "What's the time commitment?", a: "Each course typically runs 8 weeks with online asynchronous content plus weekly live sessions. Expect 8-12 hours per week per course. You can take courses sequentially or back-to-back depending on availability." },
  { q: "What will I be able to do after completing the certificate?", a: "You'll be able to: evaluate AI platforms and vendors, design GenAI proof-of-concepts with clear business value, build and deploy operational AI workflows with proper guardrails, and communicate AI strategies and results to stakeholders. These are the exact skills organizations need to move from AI experimentation to real value capture." }],

  accreditation: `Stevens Institute of Technology has been continually accredited by the <a href="https://www.msche.org/" target="_blank" rel="noopener noreferrer" class="text-stevens-white underline hover:text-stevens-gray-500 transition-colors duration-stevens-normal">Middle States Commission on Higher Education (MSCHE)</a> since 1927. The Professional Certificate in Enterprise AI awards graduate credit that appears on your official Stevens transcript.`
};

export default function CertificateEnterpriseAIPage() {
  // Add bottomContent to hero for certificate pages
  const heroWithTuitionCards = {
    ...programData.hero,
    bottomContent: <CertificateTuitionCardsHero cards={programData.tuition.cards} />
  };
  
  return <ProgramPageTemplate programData={{ ...programData, hero: heroWithTuitionCards }} />;
}

