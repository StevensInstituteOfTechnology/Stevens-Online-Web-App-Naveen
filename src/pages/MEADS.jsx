import React from 'react';
import ProgramPageTemplate from '../components/program-pages/ProgramPageTemplate';
import CertificateTuitionCardsHero from '../components/program-pages/CertificateTuitionCardsHero';
import { Award, Check, Star } from 'lucide-react';
import { createPageUrl } from '@/utils';
import { KEY_DATES, BOOKING_URLS } from '@/config/constants';
import { usePageTracking } from '@/hooks/analytics/usePageTracking';
import { ProgramContextProvider } from '@/contexts/analytics/ProgramContext';
import { PageContextProvider } from '@/contexts/analytics/PageContext';

const programData = {
  code: 'meads',
  seo: {
    title: 'Online Master’s in Engineering: Applied Data Science | Stevens Online',
    description: 'Earn your online MS in Engineering – Applied Data Science from Stevens. Build expertise in data visualization, predictive analytics, and machine learning techniques used to solve complex engineering and business challenges.',
    ogImage: '/assets/images/meads/stevens-manhattan-skyline-ds.webp',
    url: '/online-masters-engineering-applied-data-science/'
  },
  // ==================================================================
  hero: {
    titleLines: ['Earn Your M.Eng. in Applied Data Science Online.',"Build AI-Powered Systems."],
    subtitle: "Master machine learning, LLMs, and AI engineering. Turn data into intelligent systems that shape the future of technology.",
    bgImage: "/assets/images/meads/stevens-manhattan-skyline-ds.webp",
    primaryCta: { label: 'Request Information', to: 'RequestInfo' },
    secondaryCta: { label: 'Apply In Minutes', to: 'accelerated-application' },
    // badges: [
    //   { text: "Industry-Ready Skills", icon: Award },
    //   { text: "Cutting-Edge Curriculum", icon: Star },
    //   { text: "Career Growth", icon: TrendingUp }
    // ]
  },
  // ==================================================================
  overview: {
    title: "Program Overview",
    description: `
      <p class="font-stevens-body">The AI revolution demands professionals who can build and deploy intelligent systems. The M.Eng. in Applied Data Science from Stevens prepares you to lead in the AI age—from training large language models (LLMs) to deploying production-ready machine learning systems.</p>
      
      <p class='font-stevens-body my-5'>Through a curriculum grounded in engineering rigor and real-world application, you'll master <strong>AI model design, LLM fine-tuning, MLOps, and scalable data architectures</strong>. Learn to build end-to-end AI solutions: from data pipelines and feature engineering to model deployment and monitoring in production environments.</p>
      
      <p class='font-stevens-body my-5'>This program bridges engineering precision with AI-driven innovation. You'll work with cutting-edge tools—PyTorch, TensorFlow, Hugging Face, cloud AI platforms—and learn to operationalize AI responsibly with ethics, explainability, and governance built in.</p>
      
      <h3 class='font-stevens-headers text-stevens-lg'><strong>Program at a Glance:</strong></h3>

      <ul class='my-5'>
        <li><strong>Format: 100% Online</strong></li>
        <li><strong>Duration: 1 to 2 years (30 credits)</strong></li>
        <li><strong>Focus: Applied AI, Machine Learning, LLMs & MLOps</strong></li>
        <li><strong>Accreditation: Middle States Commission on Higher Education</strong></li>
      </ul>
      
    `,
    keySkills: [
      "Machine Learning Engineering", "LLM Fine-Tuning & Deployment", "AI Model Design", "MLOps & Model Monitoring",
      "Data Pipeline Engineering", "Cloud AI Architecture", "Distributed Systems", "AI Ethics & Explainability",
      "Python", "PyTorch", "TensorFlow", "Hugging Face", "Spark", "Kubernetes", "Docker", "AWS"
    ]
  },
  // ==================================================================
  quickFacts: {
    atAGlance: [
      // { value: "30", label: "Credit Hours" },
      // { value: "10", label: "Courses" },
      { value: "100%", label: "Online" },
      // { value: "1-2 Years", label: "Completion" },
      { value: "Hands-On", label: "Projects" },
      { value: "Industry", label: "Focused" }
    ],
    termStartDate: `${KEY_DATES.TERM.name}: ${KEY_DATES.START_OF_CLASSES.date}`,
    details: `
      <ul>
        <li>30 Credit Hours</li>
        <li>10 Courses</li>
        <li>100% Online</li>
        <li>1 to 2 Years Completion Time*</li>
        <li>Integrated data science and engineering curriculum</li>
        <li>Real-world capstone project</li>
      </ul>
      <p class="font-stevens-body text-stevens-xs mt-stevens-sm">*Total time to complete the program may vary based on the number of credits taken each semester.</p>
    `
  },
  // ==================================================================
  rankings: [
    {
      ranking: "#12",
      description: "For Best Career Placement",
      source: "Ranked No. 12 on The Princeton Review's 'Top 20 Best Career Placement' list (2025)."
    },
    {
      ranking: "Top 15",
      description: "For ROI",
      source: "Stevens ranks among the top 15 in the nation for ROI, according to U.S. News & World Report (2025)."
    },
    {
      ranking: "99%",
      description: "Employment",
      source: "99% of MSCS graduates in the Class of 2023 accepted job offers within three months of graduating."
    },
    {
      ranking: "#15",
      description: "For Best Value",
      source: "Payscale (2024)."
    },
    {
      ranking: "7x",
      description: "Winner",
      source: "U.S. Distance Learning Association's 21st Century Award for Best Practices in Distance Learning."
    }
  ],
  // ==================================================================
  career: {
    title: "Data Science and Engineering Career Outlook",
    description: `
      <p>Turn complex data into competitive advantage. Data scientists and AI engineers remain among the fastest-growing and highest-paid roles globally. With expertise in machine learning, big data, and visualization, Stevens graduates are prepared to lead analytics initiatives, guide strategy, and drive measurable impact.</p>
      
      <h3 class='mt-4'><strong>Potential Roles:</strong></h3>
      <ul class='list-disc pl-6'>
        <li>Data Scientist</li>
        <li>Machine Learning Engineer</li>
        <li>AI Systems Architect</li>
        <li>Data Visualization Specialist</li>
        <li>Quantitative Analyst</li>
        <li>Business Intelligence Engineer</li>
      </ul>
    `,
    // jobTitles: [
    //   { title: "Data Engineer", salary: "$125,000" },
    //   { title: "Machine Learning Engineer", salary: "$165,000" },
    //   { title: "Data Architect", salary: "$182,000" },
    //   { title: "MLOps Engineer", salary: "$145,000" },
    //   { title: "Big Data Engineer", salary: "$129,000" },
    //   { title: "AI Engineer", salary: "$155,000" },
    //   { title: "Cloud Data Engineer", salary: "$140,000" },
    //   { title: "Data Platform Engineer", salary: "$150,000" },
    //   { title: "Senior Data Scientist", salary: "$135,000" },
    //   { title: "Principal Engineer - Data", salary: "$195,000" }
    // ],
    topCompanies: [
      "Microsoft",
      "Google",
      "Amazon",
      "Deloitte",
      "Accenture",
      "IBM"
    ],
    // source: "Glassdoor and LinkedIn, 2024"
  },
  // ==================================================================
  // commonJobTitles: {
  //   title: "Related Career Fields",
  //   jobs: [
  //     { title: "Data Engineer", salary: "$125,000" },
  //     { title: "Machine Learning Engineer", salary: "$165,000" },
  //     { title: "Data Architect", salary: "$182,000" },
  //     { title: "MLOps Engineer", salary: "$145,000" },
  //     { title: "Big Data Engineer", salary: "$129,000" },
  //     { title: "AI Engineer", salary: "$155,000" },
  //     { title: "Cloud Data Engineer", salary: "$140,000" },
  //     { title: "Data Platform Engineer", salary: "$150,000" },
  //     { title: "Senior Data Scientist", salary: "$135,000" },
  //     { title: "Principal Engineer - Data", salary: "$195,000" }
  //   ]
  // },
  // ==================================================================
  topCompanies: {
    title: "Where Stevens Alumni Work",
    description: "Our graduates join leading organizations across technology, finance, healthcare, and consulting",
    companies: [
      {
        name: "Microsoft",
        logo: "/assets/company_logo/Microsoft_logo_(2012).svg.png",
        industry: "Technology"
      },
      {
        name: "Google",
        logo: "/assets/company_logo/Google_2015_logo.svg.png",
        industry: "Technology"
      },
      {
        name: "Amazon",
        logo: "/assets/company_logo/Amazon_logo.svg.webp",
        industry: "Technology"
      },
      {
        name: "Deloitte",
        logo: "/assets/company_logo/Logo_of_Deloitte.svg.png",
        industry: "Consulting"
      },
      {
        name: "Accenture",
        logo: "/assets/company_logo/Accenture_logo.svg.png",
        industry: "Consulting"
      },
      {
        name: "IBM",
        logo: "/assets/company_logo/IBM_logo.svg.png",
        industry: "Technology"
      }
    ]
  },
// ==================================================================
  whatYoullLearn: {
    title: "What You Will Learn",
    description: `You'll gain the practical experience and technical foundation needed to apply data science across real-world challenges:`,
    modules: [
      {
        title: "Mathematics & Foundations",
        description: "<p class=\"font-stevens-body\">Students develop the core mathematical and statistical tools that underpin modern data science. The focus is on linear algebra, calculus, and optimization for modeling complex systems, as well as forecasting methods for time-dependent data.</p>",
        skills: [
          "Apply concepts from multivariable calculus and linear algebra-such as vector spaces, eigenvalues, and matrix decompositions-to model and analyze data",
          "Use optimization and numerical methods to solve applied data science problems",
          "Conduct time series analysis using ARMA, ARIMA, and related models to forecast trends and interpret temporal data"
        ]
      },
      {
        title: "Programming & Systems",
        description: "Students gain practical experience with programming languages, data integration tools, and scalable computing systems that support enterprise analytics and business intelligence. The coursework combines data architecture, warehousing, and big data frameworks.",
        skills: [
          "Program in Python, R, and SQL while leveraging technologies such as TensorFlow, Spark, and Tableau for analytics and visualization",
          "Design and manage data warehouses, architecture models, and ETL pipelines for business intelligence systems",
          "Implement scalable big data solutions using distributed computing and cloud-based platforms like Dataiku and Spark"
        ]
      },
      {
        title: "Machine Learning & AI",
        description:"Students explore the principles and applications of machine learning and artificial intelligence-from foundational algorithms to deep learning and generative AI. Emphasis is placed on both technical implementation and responsible management of AI technologies.",
        skills: [
          "Apply core machine learning methods such as regression, classification, clustering, and dimensionality reduction using Python libraries",
          "Design and train neural networks and deep learning architectures including CNNs, RNNs, and attention-based models",
          "Experiment with generative AI and augmented intelligence through prompt engineering and large language models",
          "Evaluate and manage AI systems ethically, addressing issues of fairness, transparency, and compliance in enterprise contexts",
        ]
      },
      {
        title: "Data Visualization & Communication",
        description:"Students learn to translate analytical results into clear, compelling visual narratives that inform decision-making. The curriculum emphasizes design thinking, ethical visualization, and storytelling through data.",
        skills: [
          "Build visualizations and dashboards using Tableau, Power BI, Julius.ai, Python, and R",
          "Apply principles of perceptual design and ethical visualization to ensure clarity and integrity in data storytelling",
          "Communicate analytical findings effectively for both technical and business audiences"
        ] 
      },
      {
        title: "Applied Analytics & Business Intelligence",
        description: "Students apply analytical techniques to real-world business challenges in marketing, operations, and digital contexts. The coursework emphasizes data-driven strategy, governance, and decision-making.",
        skills: [
          "Conduct marketing and operational analytics to model customer behavior, optimize campaigns, and measure business performance",
          "Apply web and text mining techniques-including scraping, clustering, and recommender systems-to extract insights from large-scale data sources",
          "Implement data governance, security, and risk management practices to ensure trustworthy analytics across enterprise environments",
        ]
      }
    ],
  },
// ==================================================================
  whyStevens:{
    title: "Why Choose Stevens?",
    description: `
    <div class='text-left max-w-[50rem] mx-auto'>
      <h3 class='mb-4'><strong>Innovation Meets Integrity</strong></h3>
      <ul class='list-disc pl-5'>
        <li>Curriculum bridges engineering precision with AI-driven innovation.</li>
        <li>Learn from faculty shaping industry practice in AI ethics, big data, and machine learning.</li>
        <li>Apply your skills through hands-on projects and real-world case studies.</li>
        <li>Benefit from a flexible, asynchronous online experience built for working professionals.</li>
        <li>Join a network of Stevens alumni leading at companies like Google, Deloitte, JPMorgan Chase, IBM, and Meta.</li>
      </ul>
      </div>
    `,

  },
  // ==================================================================
  curriculum: {
    title: "Program Curriculum",
    // description: "The M.S. in Data Science and Engineering program combines rigorous data science fundamentals with practical software engineering skills. Students will complete 30 credit hours across 10 courses, all delivered 100% online. The curriculum is designed to prepare graduates for leadership roles in data-intensive organizations.",
    courseTabs: {
      traditional: {
        title: "Coursework",
        content: `
          <div class="space-y-stevens-lg">
            <div>
              <h4 class="course-section-header">TERM 1 - Foundations</h4>
              <div class="space-y-stevens-md">
                <div class="course-item">
                  <button class="course-toggle" data-target="dse501">MA 574: Mathematical Foundations of Data Science<span class="course-arrow">▼</span></button>
                  <div class="course-content hidden" id="dse501">
                    <p class="text-stevens-sm text-stevens-dark-gray leading-relaxed">This course provides students with the essential background in calculus and linear algebra needed to pursue the study of Data Science. Topics include derivatives and integrals of (multivariable) functions; vectors and matrices; vector spaces and subspaces; norms and projections; the eigendecomposition (diagonalization) of a matrix; the singular value decomposition (SVD) of a matrix; continuous optimization; mappings between Euclidean spaces; and Taylor approximation. Throughout, various applications to Data Science are considered, with hands-on numerical and coding exercises supplementing the theory.</p>
                  </div>
                </div>
                
                <div class="course-item">
                  <button class="course-toggle" data-target="dse502">CS 563: Python and Data Bases<span class="course-arrow">▼</span></button>
                  <div class="course-content hidden" id="dse502">
                    <p class="text-stevens-sm text-stevens-dark-gray leading-relaxed">This course covers Python programming fundamentals and database management systems. Students learn to design, implement, and query relational databases while developing proficiency in Python for data manipulation and analysis.</p>
                  </div>
                </div>

                <div class="course-item">
                  <button class="course-toggle" data-target="dse503">CS 559: Machine Learning: Fundamentals and Applications<span class="course-arrow">▼</span></button>
                  <div class="course-content hidden" id="dse503">
                    <p class="text-stevens-sm text-stevens-dark-gray leading-relaxed">This course covers foundational principles that drive machine learning applications and provides practice implementing algorithms. Topics include maximum likelihood estimation, dimension reduction, supervised and unsupervised learning, neural networks, and non-parametric methods. Students gain tools to address new ML problems, applying techniques such as regression, SVMs, decision trees, clustering, and backpropagation, with an emphasis on practical problem-solving using software libraries and real data.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 class="course-section-header">Term 2 - Advanced Techniques</h4>
              <div class="space-y-stevens-md">
                <div class="course-item">
                  <button class="course-toggle" data-target="dse520">MA 521: Statistical Foundations of Data Science OR FA 590: Statistical Learning<span class="course-arrow">▼</span></button>
                  <div class="course-content hidden" id="dse520">
                    <p class="text-stevens-sm text-stevens-dark-gray leading-relaxed"><strong>MA 521:</strong> This course provides a comprehensive foundation in statistical methods for data science. Topics include probability theory, statistical inference, hypothesis testing, and regression analysis.<br/><br/><strong>FA 590:</strong> An advanced course focusing on statistical learning methods and their applications. Students explore modern statistical techniques for prediction and classification.</p>
                  </div>
                </div>
                
                <div class="course-item">
                  <button class="course-toggle" data-target="dse521">CS 583: Deep Learning<span class="course-arrow">▼</span></button>
                  <div class="course-content hidden" id="dse521">
                    <p class="text-stevens-sm text-stevens-dark-gray leading-relaxed">This course introduces deep learning concepts and methodologies, covering both theoretical foundations and practical applications. Topics include model selection, neural networks, backpropagation, convolutional neural networks (CNNs), recurrent neural networks (RNNs), attention models, and reinforcement learning from human feedback (RLHF). Students complete programming assignments and a final project involving design and implementation of deep learning models.</p>
                  </div>
                </div>

                 <div class="course-item">
                  <button class="course-toggle" data-target="dse522">BIA 568: Management of AI Technologies<span class="course-arrow">▼</span></button>
                  <div class="course-content hidden" id="dse522">
                    <p class="text-stevens-sm text-stevens-dark-gray leading-relaxed">This course explores the management, governance, and strategic deployment of Artificial Intelligence (AI) systems within modern organizations. Students examine applications of AI across industries-such as autonomous transportation, fraud detection, and machine translation-while addressing managerial considerations like fairness, accountability, transparency, ethics, and legal compliance. The course emphasizes assessing and managing AI/ML systems, monitoring performance, and developing enterprise-level AI strategies.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 class="course-section-header">Term 3 - Capstone & Specialization</h4>
              <div class="space-y-stevens-md">
                <div class="course-item">
                  <button class="course-toggle" data-target="dse530">BIA 662: Augmented Intelligence and Generative AI<span class="course-arrow">▼</span></button>
                  <div class="course-content hidden" id="dse530">
                    <p class="text-stevens-sm text-stevens-dark-gray leading-relaxed">This course explores the integration of augmented intelligence, generative AI, natural language processing, and deep learning in data-driven business contexts. Students gain foundational and practical knowledge in LLMs, prompt engineering, and AI ethics. A major team project involves developing a proof-of-concept business solution leveraging generative AI to create measurable value.</p>
                  </div>
                </div>

                <div class="course-item">
                  <button class="course-toggle" data-target="dse531">MA 899: Data Science Capstone Project<span class="course-arrow">▼</span></button>
                  <div class="course-content hidden" id="dse531">
                    <p class="text-stevens-sm text-stevens-dark-gray leading-relaxed">A culminating project where students apply their knowledge to solve real-world data science problems. Working individually or in teams, students complete an end-to-end data science project.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 class="course-section-header">Sample Electives</h4>
              <div class="space-y-stevens-md">
                <p class="text-stevens-sm text-stevens-dark-gray leading-relaxed mb-4">Sample electives available to customize your degree - *actual elective list will be available in Spring:</p>
                
                <div class="course-item">
                  <button class="course-toggle" data-target="elec1">MA 641: Time Series Analysis I<span class="course-arrow">▼</span></button>
                  <div class="course-content hidden" id="elec1">
                    <p class="text-stevens-sm text-stevens-dark-gray leading-relaxed">This course provides a foundational introduction to modern time series analysis from both theoretical and applied perspectives. Emphasizing the Box–Jenkins methodology, it covers ARMA and ARIMA models, parameter estimation, model diagnostics, forecasting, seasonal (SARMA) models, and time series models of heteroscedasticity (ARCH and GARCH). Students apply these methods using statistical software (R) and real-world datasets, developing skills to analyze, forecast, and interpret time-dependent data.</p>
                  </div>
                </div>
                
                <div class="course-item">
                  <button class="course-toggle" data-target="elec2">CS 513: Data Mining using Python<span class="course-arrow">▼</span></button>
                  <div class="course-content hidden" id="elec2">
                    <p class="text-stevens-sm text-stevens-dark-gray leading-relaxed">This course introduces the principles and practice of data mining and machine learning. Students explore statistical and computational techniques to analyze, classify, and model data. Topics include data preprocessing, decision trees, k-nearest neighbor algorithms, Naïve Bayes, clustering (k-means, hierarchical), regression, neural networks, and advanced methods such as boosting and recommendation systems. The course emphasizes both theoretical understanding and applied learning using Python and real-world datasets.</p>
                  </div>
                </div>
                
                <div class="course-item">
                  <button class="course-toggle" data-target="elec3">BIA 678: Big Data Technologies<span class="course-arrow">▼</span></button>
                  <div class="course-content hidden" id="elec3">
                    <p class="text-stevens-sm text-stevens-dark-gray leading-relaxed">The field of Big Data is explored through both business and technical lenses. Students learn to manage the volume, velocity, and variety of data using modern technologies such as Spark, Python, and Dataiku. The course covers big data strategy, governance, AI ethics, and applications of machine learning and IoT within big data ecosystems, preparing students to design scalable solutions for enterprise environments.</p>
                  </div>
                </div>
                
                <div class="course-item">
                  <button class="course-toggle" data-target="elec4">MIS 636: Data Integration for BI&A<span class="course-arrow">▼</span></button>
                  <div class="course-content hidden" id="elec4">
                    <p class="text-stevens-sm text-stevens-dark-gray leading-relaxed">This course focuses on the design, management, and use of data warehouse (DW) and business intelligence (BI) systems. The DW is the central element in collecting, integrating, and making sense of an organization's data. BI concerns the full range of analytical applications and their delivery to users. Students learn the business value of data, planning and requirements gathering, data architecture and modeling, and integration processes. Practical examples and case studies highlight the implementation of BI systems and data integration for improved organizational decision-making.</p>
                  </div>
                </div>
                
                <div class="course-item">
                  <button class="course-toggle" data-target="elec5">BIA 660: Web Mining<span class="course-arrow">▼</span></button>
                  <div class="course-content hidden" id="elec5">
                    <p class="text-stevens-sm text-stevens-dark-gray leading-relaxed">Students learn through hands-on experience how to extract and analyze data from the web using distributed computing. The course covers web scraping, text mining, recommender systems, clustering, and natural language processing. Students apply methods widely used by companies like Amazon and Google to analyze web-scale data, culminating in applications to real scientific or business questions.</p>
                  </div>
                </div>
                
                <div class="course-item">
                  <button class="course-toggle" data-target="elec6">BIA 672: Marketing Analytics<span class="course-arrow">▼</span></button>
                  <div class="course-content hidden" id="elec6">
                    <p class="text-stevens-sm text-stevens-dark-gray leading-relaxed">This course develops students' analytical ability to understand consumer and customer behavior using marketing models, analytics, and data management techniques. Topics include customer analytics, product analytics, promotion and digital analytics, channel analytics, and marketing mix optimization. Students use SAS and Python tools to build realistic models, forecast consumer behavior, and formulate marketing strategies based on data-driven insights.</p>
                  </div>
                </div>
                
                <div class="course-item">
                  <button class="course-toggle" data-target="elec7">FA 550: Data Visualization Application<span class="course-arrow">▼</span></button>
                  <div class="course-content hidden" id="elec7">
                    <p class="text-stevens-sm text-stevens-dark-gray leading-relaxed">Effective visualization of complex data allows for meaningful insight and informed decision-making. This course investigates visualization methods from multiple perspectives and teaches students to use tools such as Tableau, Julius.ai, Python, R, and Power BI to refine data and communicate results effectively. Ethical visualization practices and design theory are also emphasized.</p>
                  </div>
                </div>
                
                <div class="course-item">
                  <button class="course-toggle" data-target="elec8">BIA 665: Applied Reinforcement Learning<span class="course-arrow">▼</span></button>
                  <div class="course-content hidden" id="elec8">
                    <p class="text-stevens-sm text-stevens-dark-gray leading-relaxed">This course covers reinforcement learning theory and applications, including Markov decision processes, dynamic programming, temporal-difference learning, and deep reinforcement learning. Students implement algorithms and apply them to real-world problems.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <p>Note: Actual course order may vary based on term availability.</p>
          </div>
        `,
      },
      advanced: {
        title: "Capstone Experience",
        content: `
          <div class="space-y-stevens-lg">
            <div>
              <h4 class="course-section-header">Apply Data Science to a Real-World Challenge</h4>
              <div class="space-y-stevens-md">
                <p>In the culminating capstone project, students collaborate to solve a real business or societal problem using advanced analytics and AI-driven solutions. Projects focus on measurable outcomes-ranging from optimizing supply chains to developing predictive health systems.</p>
                
                <h5><strong>Sample Project Topics:</strong></h5>
                <ul class='list-disc pl-5'>
                  <li>Predictive modeling for renewable energy forecasting</li>
                  <li>AI-driven optimization of financial portfolio performance</li>
                  <li>Natural language processing for sentiment and risk analysis</li>
                  <li>Generative AI solutions for marketing and product innovation</li>
                </ul>
              </div>
            </div>
            
          </div>
        `
      }
    }
  },
  // ==================================================================
  faculty: {
    description: "Our faculty are experienced educators and active researchers who offer industry insights.",
    members: [
      { name: "Dr. Alkis Vazacopoulos", title: "", image: "/assets/avatars/msdsen-avatar/Vazacopoulos.webp" },
      { name: "Dr. Khasha Dehnad", title: "", image: "/assets/avatars/msdsen-avatar/Dehnad.webp" },
      { name: "Dr. Samuel Kim", title: "", image: "/assets/avatars/mscs-avatar/Samuel_Kim.webp" },
      { name: "Dr. David Landaeta", title: "", image: "/assets/logos/Stevens-logo-small-scale.webp" },
      { name: "Dr. Upendra Prasad", title: "", image: "/assets/avatars/msds-avatar/upendra-prasad-stevens-faculty.webp" }
    ]
  },
// ==================================================================
  admissions: {
      options: [
        {
          title: "Accelerated App",
          featured: false,
          description: `<p>
            Fast-track your application with our new <strong>Accelerated App</strong> designed for busy professionals. The Accelerated App gets you started immediately:
          </p>
          <ul class="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Recommendation Letters:</strong> Not Required</li>
            <li><strong>Proof of Bachelor's Degree:</strong> Upload copy of transcripts</li>
            <li><strong>Professional Background:</strong> Upload your résumé or link your LinkedIn profile</li>
          </ul>
          <p class="text-sm text-stevens-dark-gray mt-2">Official transcripts will be due within one year of enrollment. Stevens may request additional documentation if needed.</p>`,
          buttonText: "Apply Now",
          url: "/accelerated-application",
          buttonGrayOut: false
        }
      ]
    },
    // ==================================================================
    keyDates: {
      headers: ["Term", "Early Submit", "Priority Submit", "Final Submit", "Start of Classes"],
      rows: [
        { 
          event: KEY_DATES.TERM.name, 
          date: KEY_DATES.EARLY_SUBMIT.date, 
          details: KEY_DATES.EARLY_SUBMIT.details,
          priorityDate: KEY_DATES.PRIORITY_SUBMIT.date,
          priorityDetails: KEY_DATES.PRIORITY_SUBMIT.details,
          finalDate: KEY_DATES.FINAL_SUBMIT.date,
          startDate: KEY_DATES.START_OF_CLASSES.date
        }
      ],
      footnote: "*Applicants who apply by the early submit deadline and are admitted may be eligible for a $250 deposit waiver. Other conditions may apply."
    },
    // ==================================================================
    tuition: {
      cards: [
        { value: "$800", label: "Per Credit" },
        { value: "$24,000", label: "Total Program Cost" }
      ],
      description: `
        <h3 class="font-stevens-headers font-bold text-stevens-xl mb-stevens-md">Exceptional Value for a Top-Tier AI & Data Science Degree</h3>
        <p class="font-stevens-body mb-stevens-md">At $800 per credit ($24,000 total for 30 credits), the M.Eng. in Applied Data Science represents outstanding value for a graduate engineering degree from a top-ranked institution.</p>
        
        <div class="bg-stevens-light-gray border-l-4 border-stevens-red p-4 rounded-stevens-sm mb-4">
          <p class="font-semibold text-stevens-dark-gray mb-2">💡 Strong Return on Investment</p>
          <p class="text-stevens-sm">Data science professionals earn a median salary of $130,000+, with machine learning engineers earning even more. Your Stevens degree typically pays for itself within the first 1-2 years of graduation through increased earning potential.</p>
        </div>
        
        <div class="bg-stevens-light-gray border-l-4 border-stevens-red p-4 rounded-stevens-sm mb-4">
          <p class="font-semibold text-stevens-dark-gray mb-2">💼 Financial Aid & Funding Options</p>
          <p class="text-stevens-sm mb-3">Financial aid, grants, corporate discounts, and scholarships are available to help make your Stevens education more affordable. Many students receive funding support to reduce their out-of-pocket costs.</p>
          <p class="text-stevens-sm">Apply by the <strong>priority deadline (${KEY_DATES.PRIORITY_SUBMIT.date})</strong> to maximize your funding opportunities.</p>
        </div>
        
        <div class="flex flex-col sm:flex-row gap-4 mt-6">
          <a href="/request-information/" class="inline-block bg-stevens-red hover:bg-stevens-red-dark text-white font-semibold px-6 py-3 rounded-stevens-md transition-colors duration-stevens-normal text-center">
            Request Information
          </a>
          <a href="${BOOKING_URLS.SCHEDULE_CALL}" target="_blank" rel="noopener noreferrer" class="inline-block bg-stevens-dark-gray hover:bg-stevens-dark-gray text-white font-semibold px-6 py-3 rounded-stevens-md transition-colors duration-stevens-normal text-center">
            Schedule a Call for Funding Details
          </a>
        </div>
        
        <p class="text-xs text-stevens-dark-gray mt-4">Tuition based on Spring & Summer 2026 rates. Tuition and fees are subject to change annually.</p>
      `
    },
    // ==================================================================
    events: {
    title: "On-Demand Content",
    description: "At Stevens, we host a variety of events for prospective and current students covering topics such as application strategy, program information, the student experience and our online platform. Our on-demand content is instantly available, so you can watch at your convenience.",
    fallbackText: "Check back soon for more upcoming events.",
    items: [
      // { title: "Exploring the Online M.S. in Computer Science at Stevens Institute of Technology", status: "Ongoing", length: "11 minutes", url: "https://event.on24.com/wcc/r/4455089/34FF45D9104354C225403F6B63A29F26" },
      { title: "Student Voices: Real Stories From Stevens Graduate Programs", status: "Ongoing", length: "45 minutes", url: "https://event.on24.com/wcc/r/4970051/3D4408B63146F35B069766B71328D7CE" },

      // { title: "Online M.S. in Computer Science: Areas of Focus", status: "Ongoing", length: "12 minutes", url: "https://event.on24.com/wcc/r/4894227/042446D9C5E18BF3F4D7CD9A7604B1EA" },
      { title: "Financial Aid Overview: Stevens Institute of Technology", status: "Ongoing", length: "10 minutes", url: "https://event.on24.com/wcc/r/5007787/EC42C1EA980050EB628E9A3DAD9BA2BB?pg=2" },
      { title: "Application Walkthrough: Data Science and Computer Science", status: "Ongoing", length: "24 minutes", url: "https://event.on24.com/wcc/r/4455092/4C10B1C30D8D20926A28C1A21C667A29" },
       { title: "Application Overview: Online Master's in Engineering Management", status: "Ongoing", length: "24 minutes", url: "https://event.on24.com/wcc/r/5056716/2FEBB6A6A455A2CCC508FB1183A71810" }
    ]
  },
  // ==================================================================
  accreditation: `Stevens Institute of Technology has been continually accredited by the <a href="https://www.msche.org/" target="_blank" rel="noopener noreferrer" class="text-stevens-white underline hover:text-stevens-light-gray0 transition-colors duration-stevens-normal">Middle States Commission on Higher Education (MSCHE)</a> since 1927. Stevens is accredited until 2027 and the next self-study evaluation is scheduled to take place during 2026-2027.`
};

export default function MEADS() {
  usePageTracking({
    pageType: 'program',
    programCode: 'meads',
    additionalData: {
      program_name: 'Master of Engineering in Applied Data Science',
      has_video: true,
      has_rfi_modal: true,
      has_pricing_cards: true
    }
  });

  // Add pricing cards to hero section
  const heroWithPricing = {
    ...programData.hero,
    bottomContent: <CertificateTuitionCardsHero cards={programData.tuition.cards} />
  };
  
  return (
    <PageContextProvider pageType="program" pageName="MEADS">
      <ProgramContextProvider 
        programCode="meads"
        programName="Master of Engineering in Applied Data Science"
        programType="degree"
      >
        <ProgramPageTemplate programData={{ ...programData, hero: heroWithPricing }} useApplicationModal={true} />
      </ProgramContextProvider>
    </PageContextProvider>
  );
}
