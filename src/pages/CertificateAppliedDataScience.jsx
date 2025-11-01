import React from 'react';
import {
  Globe, Award, Check, Briefcase, DollarSign, GraduationCap, TrendingUp,
  Target, BookOpen, Users, Code, Database, LineChart } from 'lucide-react';
import ProgramPageTemplate from '../components/program-pages/ProgramPageTemplate';
import { KEY_DATES } from '@/config/constants';

const programData = {
  code: 'cert-ads',
  seo: {
    title: 'Professional Certificate in Applied Data Science Foundations | Stevens Institute of Technology',
    description: 'Master Python, SQL, and ML in 9 graduate credits. Build job-ready AI skills. $5,250 aligns with employer tuition benefits. Stackable to M.Eng. in Applied Data Science.',
    ogImage: '/assets/images/certificate-ADS-1.webp',
    url: '/certificates/applied-data-science-foundations/'
  },
  hero: {
    titleLines: ['Applied Data Science', 'Foundations Certificate'],
    subtitle: "Build AI that works—Python, SQL, and ML foundations for the real world. Launch your data science career in 9 graduate credits.",
    bgImage: "/assets/images/certificate-ADS-1.webp",
    primaryCta: { label: 'Request Information', to: 'RequestInfo' },
    secondaryCta: { label: 'Apply In Minutes', href: '/accelerated-application/' },
    badges: [
    { text: "100% Online", icon: Globe },
    { text: "Graduate Credit", icon: Award },
      { text: "AI-First Curriculum", icon: TrendingUp }
    ]
  },
  quickFacts: {
    atAGlance: [
    { value: "$5,250", label: "Total Cost", icon: DollarSign },
    { value: "9 Credits", label: "3 Courses", icon: BookOpen },
    { value: "100%", label: "Online", icon: Globe },
    { value: "Stackable", label: "To MEADS", icon: GraduationCap },
    { value: "Spring 2026", label: "Launch", icon: TrendingUp },
    { value: "Portfolio", label: "Projects", icon: Briefcase }],

    termStartDate: "SPRING 2026: January 20, 2026",
    details: `<ul><li>9 Graduate Credits</li><li>3 Courses (3 credits each)</li><li>100% Online with Live Labs</li><li>16-20 Week Completion Time*</li><li>Stackable toward M.Eng. in Applied Data Science</li><li>Three Portfolio Artifacts</li><li>Aligns with $5,250 IRS tax-free employer benefit</li></ul><p class="text-xs mt-2">*Completion time varies based on course scheduling and student pace.</p>`
  },
  overview: {
    title: "Certificate Overview",
    description: `<p class="mb-4">This certificate is designed to launch your career in applied AI and data science. In today's data-driven economy, organizations need professionals who can build and deploy machine learning solutions—not just analyze data, but create AI-powered systems that solve real business problems.</p><p class="mb-4">The Applied Data Science Foundations certificate provides an <strong>AI-first, project-driven curriculum</strong> where you'll master Python, SQL, and machine learning through hands-on work with real datasets. Each course delivers a portfolio artifact tied to an AI/ML use case, ensuring you graduate with tangible evidence of your capabilities.</p><p>Whether you're pivoting into data science, upskilling for AI roles, or preparing for further graduate study, this certificate provides the technical foundation and graduate-level credential that employers value. All 9 credits stack toward Stevens' M.Eng. in Applied Data Science, giving you a clear pathway to continue your education.</p>`,
    keySkills: ["Python Programming", "SQL & Databases", "Machine Learning", "Data Pipelines", "AI Ethics & Explainability"],
    concentrations: []
  },
 
  rankings: [
  { ranking: "$140K+", description: "MEDIAN ML ENGINEER SALARY", source: "Machine Learning Engineers earn a median salary of over $140,000 annually, with strong growth projected through 2033 (U.S. Bureau of Labor Statistics, 2025)." },
  { ranking: "Top 10", description: "FASTEST GROWING TECH SKILL", source: "Data science and AI skills consistently rank in the top 10 fastest-growing tech skills, with demand spanning all industries from healthcare to finance (LinkedIn Learning, 2025)." },
  { ranking: "$5,250", description: "ALIGNS WITH TUITION BENEFITS", source: "The 9-credit certificate cost aligns perfectly with the IRS $5,250 tax-free employer tuition reimbursement limit, making it accessible for corporate-sponsored learners." }],

  career: {
    description: `<p class="mb-4">Data science and AI roles are among the fastest-growing and highest-paying positions in today's job market. From healthcare and finance to retail and technology, every industry is seeking professionals who can turn data into actionable insights and deploy AI-driven solutions.</p><p class="mb-4">This certificate prepares you for entry-level to mid-level roles in applied data science, machine learning engineering, and AI analytics. You'll develop the technical skills employers seek—Python, SQL, ML frameworks—while also learning the soft skills needed to communicate insights and collaborate with stakeholders.</p><p>Graduates of this certificate are positioned to pursue roles such as Data Analyst, ML Associate Engineer, AI Solutions Specialist, and Business Intelligence Developer. With the stackability to MEADS, you also have a clear pathway to advance into senior data science and AI leadership positions.</p>`,
    jobTitles: [
    { title: "Data Analyst", employed: "High Demand", salary: "$90,720" },
    { title: "ML Engineer Associate", employed: "Growing", salary: "$135,690" },
    { title: "AI Solutions Specialist", employed: "Emerging", salary: "$132,480" },
    { title: "Business Intelligence Developer", employed: "In Demand", salary: "$100,360" },
    { title: "Applied Data Scientist", employed: "High Growth", salary: "$115,280" }],

    source: "Salary data shown are based on market research from sources such as LinkedIn Economic Graph and Lightcast (2025). Exact figures for emerging AI roles vary widely by industry, company size, and experience level.",
    topCompanies: ["Google", "Amazon", "Microsoft", "IBM", "Meta", "Apple"]
  },
  whatYoullLearn: {
    variant: 'skillCards',
    title: "Curriculum: From Math to ML",
    description: "The certificate follows a strategic progression: master the mathematical foundations for ML, build data pipelines with Python and SQL, then apply machine learning to real-world problems. Each course includes hands-on labs and a portfolio project.",
    modules: [
    {
      title: "Applied Math for AI",
      growth: "MA 574 – Applied Math for Data Science",
      icon: LineChart,
      courses: [
      { code: "Core Topics", title: "Linear algebra, calculus, optimization for ML/AI" },
      { code: "Hands-On", title: "Code-driven labs: PCA, regression, gradient descent" },
      { code: "Project", title: "Train and interpret an ML model with AI insight report" }]

    },
    {
      title: "Python & Data Pipelines",
      growth: "CS 563 – Python and Databases",
      icon: Database,
      courses: [
      { code: "Core Topics", title: "Python for data science, SQL, ETL/ELT, APIs" },
      { code: "Hands-On", title: "Build AI-ready pipelines from raw data to training datasets" },
      { code: "Project", title: "End-to-end pipeline published to Streamlit app" }]

    },
    {
      title: "Machine Learning & AI",
      growth: "CS 559 – Machine Learning: Fundamentals & Applications",
      icon: Code,
      courses: [
      { code: "Core Topics", title: "Regression, classification, ensembles, neural networks, explainability" },
      { code: "Hands-On", title: "Build and evaluate AI solutions with SHAP/LIME for transparency" },
      { code: "Project", title: "Deploy an ML model with reproducible code and stakeholder narrative" }]

    }]

  },
  whyStevens: {
    variant: 'splitWithVideo',
    title: "Why Choose Stevens for Data Science?",
    description: `<p>Stevens Institute of Technology is ranked among the top institutions for data science and AI education. Located in the heart of the New York metropolitan area, Stevens combines world-class faculty expertise with strong industry connections.</p><p>This certificate emphasizes applied learning—you'll work with real datasets, build production-ready pipelines, and deploy ML models, not just study theory. Our faculty are active researchers and practitioners who bring cutting-edge insights directly into the classroom.</p><p>Plus, the certificate is fully stackable toward our M.Eng. in Applied Data Science (MEADS), giving you flexibility to test the waters and continue toward a full master's degree if desired.</p>`,
    video: {
      src: "/assets/videos/Stevens Online MBA - 2.mp4",
      poster: "/assets/videos/video-cover-2.avif",
      title: "",
      caption: "Hear from Stevens students about their data science journey"
    }
  },
  curriculum: {
    description: "The Applied Data Science Foundations Certificate consists of three courses (9 graduate credits total) designed to take you from mathematical foundations to deploying machine learning models. You'll learn industry-standard tools including Python, pandas, scikit-learn, SQL, and cloud data platforms. Every course includes hands-on labs with AI-enhanced learning tools.",
    courseTabs: {
      foundations: {
          title: "Course Sequence",
        content: `
            <h4 class="course-section-header">Certificate Courses (9 Credits)</h4>
            <p class="course-intro">Complete all three courses. The sequence is designed to build your skills progressively, from mathematical foundations through practical ML deployment.</p>
            
            <div class="space-y-stevens-md">
              <div class="course-item">
                <button class="course-toggle" data-target="ma574">MA 574 – Applied Math for Data Science (3 credits)<span class="course-arrow">▼</span></button>
                <div class="course-content hidden" id="ma574">
                  <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed mb-3"><strong>Focus:</strong> Mathematical foundations for machine learning and AI optimization</p>
                  <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed mb-3"><strong>What You'll Do:</strong> Master linear algebra, matrix operations, calculus, and optimization through code-driven labs. Every concept is connected to how it powers machine learning.</p>
                  <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed mb-3"><strong>Topics:</strong> Vectors/matrices, SVD, eigen decomposition, gradient descent, convex optimization, PCA, regression</p>
                  <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed mb-3"><strong>Labs:</strong> Implement PCA, regression, and optimization in Python; explore how matrix calculus and gradients drive AI models</p>
                  <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed"><strong>Project:</strong> Train and interpret a simple ML model with AI insight report</p>
                </div>
              </div>
            
            <div class="course-item">
              <button class="course-toggle" data-target="cs563">CS 563 – Python and Databases (3 credits)<span class="course-arrow">▼</span></button>
              <div class="course-content hidden" id="cs563">
                <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed mb-3"><strong>Focus:</strong> Building the data backbone for AI through Python and SQL</p>
                <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed mb-3"><strong>What You'll Do:</strong> Master Python for data science (pandas, NumPy, scikit-learn); design SQL databases for ML feature stores; build ETL/ELT pipelines that transform raw data into AI-ready datasets.</p>
                <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed mb-3"><strong>Modules:</strong>
                  <ol class="list-decimal ml-5 mt-2">
                    <li>Python for DS/AI (pandas, NumPy, scikit-learn pipelines)</li>
                    <li>SQL modeling for ML feature stores</li>
                    <li>ETL/ELT (from API to AI model)</li>
                    <li>Cloud data and automation</li>
                    <li>Responsible AI data prep (bias, fairness, transparency)</li>
                  </ol>
                </p>
                <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed"><strong>Project:</strong> Build an end-to-end AI-ready pipeline—from raw data to training dataset—then publish results to a Streamlit app</p>
              </div>
            </div>
            
            <div class="course-item">
              <button class="course-toggle" data-target="cs559">CS 559 – Machine Learning: Fundamentals & Applications (3 credits)<span class="course-arrow">▼</span></button>
              <div class="course-content hidden" id="cs559">
                <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed mb-3"><strong>Focus:</strong> Translating ML theory into applied AI systems</p>
                <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed mb-3"><strong>What You'll Do:</strong> Build and evaluate machine learning models using industry-standard frameworks. Learn regression, classification, ensembles, clustering, and neural network fundamentals. Master AI explainability (SHAP/LIME), ethics, and bias mitigation.</p>
                <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed mb-3"><strong>Topics:</strong> Supervised learning (regression/classification), unsupervised learning, ensemble methods, neural network primer, embeddings, feature engineering, explainability, ethics and bias</p>
                <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed mb-3"><strong>Practice:</strong> Applied labs with real datasets, explainability exercises, peer-reviewed AI deployment memos</p>
                <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed"><strong>Project:</strong> Build and evaluate an AI solution (e.g., sentiment analysis or fraud detection) with reproducible code and stakeholder narrative</p>
              </div>
            </div>
          </div>
          
          <div class="bg-stevens-gray-50 border-l-4 border-stevens-primary p-stevens-lg rounded-stevens-sm mt-stevens-xl">
            <h5 class="font-stevens-bold text-stevens-base mb-stevens-sm">AI-Enhanced Learning</h5>
            <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">
              All courses include AI-assisted labs with LLMs for debugging and reflection. You'll learn how to use AI copilots responsibly to enhance your productivity while building deep technical understanding.
            </p>
          </div>
          
          <div class="bg-stevens-primary/10 border-l-4 border-stevens-primary p-stevens-lg rounded-stevens-sm mt-stevens-md">
            <h5 class="font-stevens-bold text-stevens-base mb-stevens-sm">Portfolio Artifacts</h5>
            <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">
              <strong>Three Portfolio Projects:</strong><br/>
              • MA 574: PCA + regression model with convergence analysis<br/>
              • CS 563: ETL pipeline → AI dashboard<br/>
              • CS 559: Production-ready ML model with interpretability report
            </p>
          </div>
        `
      }
    }
  },
  
  commonJobTitles: {
    title: "Career Paths in Data Science & AI"
  },
  topCompanies: {
    title: "Where Stevens Alumni Work"
  },
  admissions: {
    variant: 'combinedWithTuition',
    requirements: `
      <div class="space-y-6">
        <div>
          <h4 class="font-bold text-lg mb-2">WHO SHOULD APPLY</h4>
          <p>This certificate is designed for working professionals pivoting into data/AI roles; tech-adjacent managers upskilling in Python/SQL/ML; and early-career engineers and analysts seeking AI literacy and applied data fluency.</p>
        </div>
        <div>
          <h4 class="font-bold text-lg mb-2">PREREQUISITES</h4>
          <p>No formal prerequisites. However, basic comfort with quantitative reasoning is helpful. We'll teach you the programming and mathematical concepts you need—no prior coding experience required.</p>
        </div>
        <div>
          <h4 class="font-bold text-lg mb-2">APPLICATION PROCESS</h4>
          <p>Apply through our streamlined Accelerated Application. Submit your resume or LinkedIn profile and unofficial transcripts. No letters of recommendation or entrance exams required.</p>
        </div>
        <div>
          <h4 class="font-bold text-lg mb-2">STACKABILITY TO MEADS</h4>
          <p>All 9 credits apply toward Stevens' M.Eng. in Applied Data Science (MEADS), per Registrar approval. This certificate serves as a perfect on-ramp to the full master's program, allowing you to test your interest and aptitude before committing to the complete degree.</p>
        </div>
      </div>
    `
  },
    keyDates: {
    term: "Spring 2026",
      rows: [
      { event: "Early Submit", date: "October 14, 2025" },
      { event: "Priority Submit", date: KEY_DATES.PRIORITY_SUBMIT.date },
      { event: "Final Submit", date: "January 5, 2026" },
      { event: "Start of Classes", date: "January 20, 2026" }
    ]
  },
  tuition: {
    cards: [
      { value: "$5,250", label: "Total Certificate Cost" }, 
      { value: "~$583", label: "Per Credit" }, 
      { value: "$60", label: "Application Fee" }
    ],
    description: `
      <div class="space-y-4">
        <p class="font-bold text-lg text-stevens-gray-900">Invest in Your Data Science Future</p>
        <p>At $5,250 for 9 graduate credits, this certificate represents exceptional value for a credential that can transform your career. The cost is strategically aligned with the <strong>IRS $5,250 annual tax-free employer tuition benefit</strong>—making it an ideal choice if your company offers tuition assistance.</p>
        
        <div class="bg-stevens-primary/10 border-l-4 border-stevens-primary p-4 rounded-stevens-sm">
          <p class="font-semibold text-stevens-gray-900 mb-2">💼 Employer Tuition Reimbursement</p>
          <p class="text-stevens-sm">Many employers reimburse up to $5,250 per year for job-relevant graduate education. This certificate is priced to fit perfectly within that benefit—potentially allowing you to earn graduate-level data science credentials at little or no personal cost.</p>
        </div>
        
        <p class="text-stevens-sm">Stevens has extensive experience working with corporate tuition assistance programs. Our enrollment advisors can guide you through your company's reimbursement process and help you maximize available funding opportunities.</p>
        
        <div class="flex flex-col sm:flex-row gap-4 mt-6">
          <a href="/request-information/" class="inline-block bg-stevens-primary hover:bg-stevens-primary-dark text-white font-semibold px-6 py-3 rounded-stevens-md transition-colors duration-stevens-normal text-center">
            Request Information
          </a>
          <a href="https://outlook.office.com/book/CPEAdmissionsStevensedu@stevens0.onmicrosoft.com/?ismsaljsauthenabled" target="_blank" rel="noopener noreferrer" class="inline-block bg-stevens-gray-700 hover:bg-stevens-gray-800 text-white font-semibold px-6 py-3 rounded-stevens-md transition-colors duration-stevens-normal text-center">
            Schedule a Call About Funding Options
          </a>
        </div>
        
        <p class="text-xs text-stevens-gray-600 mt-4">Tuition basStevens has extensive experience working with corporate tuition assistance programs. Our enrollment advisors can guide you through your company's reimbursement ed on 2025 rates. Tuition and fees are subject to change annually. Financial aid may be available for those who qualify.</p>
      </div>
    `
  },
  

  faculty: {
    title: "Meet Your Data Science Faculty",
    description: "Learn from expert faculty who bring cutting-edge research and industry experience to every course.",
    members: [
      { name: "Upendra Prasad", title: "Senior Lecturer", image: "/assets/avatars/certificate-ADS-avatar/uprasad.avif" },
      { name: "CS 563 Faculty", title: "Computer Science & Data Engineering", image: "/assets/avatars/mba-avatar/peter-dominick-stevents-faculty.jpg" },
      { name: "Ping Wang", title: "Assistant Professor", image: "/assets/avatars/certificate-ADS-avatar/pwang44.avif" }
    ]
  },
  faqs: [
  { q: "Do I need programming experience?", a: "No. The certificate is designed to take you from fundamentals to applied ML. We start with the basics in each course and scaffold your learning with templates, AI copilots, and extensive lab support." },
  { q: "What programming languages will I learn?", a: "You'll focus primarily on Python, which is the industry standard for data science and machine learning. You'll also learn SQL for database work and data manipulation." },
  { q: "Will this help with tuition reimbursement?", a: "Yes. The $5,250 total cost aligns with the IRS tax-free employer benefit limit that many companies offer. Our enrollment team can help you navigate your company's specific reimbursement process." },
  { q: "Can these credits count toward a master's degree?", a: "Yes. All 9 credits are fully stackable toward Stevens' M.Eng. in Applied Data Science (MEADS), subject to Registrar approval. This gives you a clear pathway from certificate to master's degree." },
  { q: "What tools and technologies will I use?", a: "You'll work with industry-standard tools including Python (pandas, NumPy, scikit-learn), SQL (PostgreSQL), Jupyter notebooks, Git/GitHub, cloud platforms, and visualization tools like Streamlit and Matplotlib." },
  { q: "How is this different from online courses or bootcamps?", a: "This is a graduate-level certificate with transcripted credit from an accredited institution. You'll learn from PhD faculty, work on complex projects, and earn credentials that stack toward a master's degree—something bootcamps cannot offer." }],

  accreditation: `Stevens Institute of Technology has been continually accredited by the <a href="https://www.msche.org/" target="_blank" rel="noopener noreferrer" class="text-stevens-white underline hover:text-stevens-gray-500 transition-colors duration-stevens-normal">Middle States Commission on Higher Education (MSCHE)</a> since 1927. The Professional Certificate in Applied Data Science Foundations awards graduate credit that appears on your official Stevens transcript.`
};

export default function CertificateAppliedDataSciencePage() {
  return <ProgramPageTemplate programData={programData} />;
}

