import { DegreeTemplate } from "../../components/program-pages/templates";
import { TuitionCardsHero } from "../../components/program-pages/primitives";
import { Award } from "lucide-react";
import { KEY_DATES_SPRING2, BOOKING_URLS } from "@/config/constants";
import { usePageTracking } from "@/hooks/analytics/usePageTracking";
import { ProgramContextProvider } from "@/contexts/analytics/ProgramContext";
import { PageContextProvider } from "@/contexts/analytics/PageContext";

const programData = {
  code: "meads",
  seo: {
    title:
      "Online Master’s in Engineering: Applied Data Science | Stevens Online",
    description:
      "Earn your online MS in Engineering – Applied Data Science from Stevens. Build expertise in data visualization, predictive analytics, and machine learning techniques used to solve complex engineering and business challenges.",
    ogImage: "/assets/images/meads/meads-hero.webp",
    url: "/online-masters-engineering-applied-data-science/",
  },
  // ==================================================================
  hero: {
    titleLines: [
      "Earn Your M.Eng. in Applied Data Science Online.",
      "Build AI-Powered Systems.",
    ],
    subtitle:
      "Master machine learning, LLMs, and AI engineering. Turn data into intelligent systems that shape the future of technology.",
    bgImage: "/assets/images/meads/meads-hero.webp",
    primaryCta: { label: "Request Information", to: "RequestInfo" },
    secondaryCta: { label: "Apply In Minutes", to: "accelerated-application" },
    tuitionCards: [
      { value: "$800", label: "Per Credit" },
      { value: "$24,000", label: "Total Program Cost" },
    ],
    // badges: [
    //   { text: "Industry-Ready Skills", icon: Award },
    //   { text: "Cutting-Edge Curriculum", icon: Star },
    //   { text: "Career Growth", icon: TrendingUp }
    // ]
  },
  // ==================================================================
  overview: {
    programType: "Master of Engineering",
    headline: "Build AI-Powered Systems",
    tagline:
      "A career-aligned curriculum designed for real-world impact in the AI age.",
    image: "/assets/images/meads/meads-overview.webp",
    imageAlt: "",
    imagePosition: "50% 80%",
    description: `
      <p class="font-stevens-body">The AI revolution demands professionals who can build and deploy intelligent systems. The M.Eng. in Applied Data Science from Stevens prepares you to lead in the AI age—from training large language models (LLMs) to deploying production-ready machine learning systems.</p>
      
      <p class='font-stevens-body my-5'>Through a curriculum grounded in engineering rigor and real-world application, you'll master <strong>AI model design, LLM fine-tuning, MLOps, and scalable data architectures</strong>. Learn to build end-to-end AI solutions: from data pipelines and feature engineering to model deployment and monitoring in production environments.</p>
      
      <p class='font-stevens-body my-5'>This program bridges engineering precision with AI-driven innovation. You'll work with cutting-edge tools—PyTorch, TensorFlow, Hugging Face, cloud AI platforms—and learn to operationalize AI responsibly with ethics, explainability, and governance built in.</p>
      
    `,
    keySkills: [
      "Machine Learning",
      "LLM & GenAI",
      "Data Pipelines",
      "MLOps",
      "Cloud Architecture",
      "Python",
      "PyTorch/TensorFlow",
      "AI Ethics",
    ],
  },
  // ==================================================================
  quickFacts: {
    // Enhanced Stats Bar (Penn State style)
    enhancedStats: [
      {
        title: "100% Online",
        description:
          "Complete your Stevens coursework at your own pace, 100% online.",
      },
      {
        supertext: "Apply by",
        labelAbove: KEY_DATES_SPRING2.PRIORITY_SUBMIT.date.split(" ")[0], // Month (e.g., "December")
        value: KEY_DATES_SPRING2.PRIORITY_SUBMIT.date
          .split(" ")[1]
          .replace(",", ""), // Day number
        subtext: `to start ${KEY_DATES_SPRING2.START_OF_CLASSES.date}`,
      },
      {
        value: "30",
        label: "Credits",
        subtext: "$800 per credit",
      },
      {
        title: "MSCHE Accredited",
        description:
          "Accredited by the Middle States Commission on Higher Education since 1927.",
      },
    ],

    // Legacy Quick Stats (fallback)
    quickStats: [
      { value: "30", label: "Credits" },
      { value: "10", label: "Courses" },
      { value: "100%", label: "Online" },
      { value: "MSCHE", label: "Accredited", icon: Award },
    ],

    // Simplified Card
    termStart: `${KEY_DATES_SPRING2.TERM.name}: ${
      KEY_DATES_SPRING2.START_OF_CLASSES.date.split(",")[0]
    }`,
    tuition: "Contact for Pricing",
    applyUrl: "#",

    // Legacy
    termStartDate: `${KEY_DATES_SPRING2.TERM.name}: ${KEY_DATES_SPRING2.START_OF_CLASSES.date}`,
  },
  // ==================================================================
  rankings: [
    {
      ranking: "#12",
      description: "For Best Career Placement",
      source:
        "Ranked No. 12 on The Princeton Review's 'Top 20 Best Career Placement' list (2025).",
    },
    {
      ranking: "Top 15",
      description: "For ROI",
      source:
        "Stevens ranks among the top 15 in the nation for ROI, according to U.S. News & World Report (2025).",
    },
    {
      ranking: "99%",
      description: "Employment",
      source:
        "99% of MSCS graduates in the Class of 2023 accepted job offers within three months of graduating.",
    },
    {
      ranking: "#15",
      description: "For Best Value",
      source: "Payscale (2024).",
    },
  ],
  videoSection: {
    title: "Discover Your Future at Stevens",
    heading:
      "Master data science and AI skills without putting your career on hold",
    description:
      "Our 100% online, part-time format empowers professionals to build expertise in applied data science and artificial intelligence while maintaining their current role. Learn from expert faculty who bridge cutting-edge research with real-world applications, and connect with a network of accomplished peers and alumni driving innovation across industries.",
    videoSrc: "/assets/videos/Stevens Online Home - 1.mp4",
    posterSrc: "/assets/videos/video-cover-1.webp",
    showControls: true,
    muted: true,
    showCTA: false,
  },
  // ==================================================================
  career: {
    title: "Data Science and Engineering Career Outlook",
    description: `
      <p class="mb-4">Data science and AI roles continue to be among the fastest-growing and highest-paid positions. This program prepares you to translate complex data into business and engineering impact across industries.</p>
      <p class="mb-4">You’ll build production-ready skills in machine learning, deep learning, data pipelines, and visualization—learning how to design, train, and deploy models that perform in real-world environments.</p>
      <p>Graduates pursue roles such as Data Scientist, Machine Learning Engineer, AI Systems Architect, and Business Intelligence Engineer, with a strong foundation for advanced leadership paths.</p>
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
      "IBM",
    ],
    // source: "Glassdoor and LinkedIn, 2024"
  },
  careerOutcomes: {
    title: "Career Outcomes",
    variant: "logos",
    leadText:
      "Build and deploy AI-powered systems that transform industries and drive innovation.",
    bullets: [
      {
        icon: "check",
        text: "Qualify for high-demand roles like <strong>Machine Learning Engineer</strong>, <strong>Data Architect</strong>, and <strong>AI Engineer</strong>.",
      },
      {
        icon: "check",
        text: "Master end-to-end AI development from <strong>LLM fine-tuning</strong> to <strong>production deployment</strong>.",
      },
      {
        icon: "check",
        text: "Command premium salaries with ML engineers earning median pay around <strong>$165,000</strong>.",
      },
      {
        icon: "trend",
        text: "Enter a field with explosive growth as AI adoption accelerates <strong>across all industries</strong>.",
      },
    ],
  },
  topCompanies: {
    title: "Where Stevens Alumni Work",
    description:
      "Our graduates join leading organizations across technology, finance, healthcare, and consulting",
    companies: [
      {
        name: "Microsoft",
        logo: "/assets/company_logo/Microsoft_logo_(2012).png",
        industry: "Technology",
      },
      {
        name: "Google",
        logo: "/assets/company_logo/Google_2015_logo.png",
        industry: "Technology",
      },
      {
        name: "Amazon",
        logo: "/assets/company_logo/Amazon_logo.webp",
        industry: "Technology",
      },
      {
        name: "Deloitte",
        logo: "/assets/company_logo/Logo_of_Deloitte.png",
        industry: "Consulting",
      },
      {
        name: "Accenture",
        logo: "/assets/company_logo/Accenture_logo.png",
        industry: "Consulting",
      },
      {
        name: "IBM",
        logo: "/assets/company_logo/IBM_logo.png",
        industry: "Technology",
      },
    ],
  },
  // ==================================================================
  whatYoullLearn: {
    title: "What You Will Learn",
    description: `You'll gain the practical experience and technical foundation needed to apply data science across real-world challenges:`,
    modules: [
      {
        title: "Mathematics & Foundations",
        description:
          '<p class="font-stevens-body">Students develop the core mathematical and statistical tools that underpin modern data science. The focus is on linear algebra, calculus, and optimization for modeling complex systems, as well as forecasting methods for time-dependent data.</p>',
        skills: [
          "Apply concepts from multivariable calculus and linear algebra-such as vector spaces, eigenvalues, and matrix decompositions-to model and analyze data",
          "Use optimization and numerical methods to solve applied data science problems",
          "Conduct time series analysis using ARMA, ARIMA, and related models to forecast trends and interpret temporal data",
        ],
        image: "/assets/images/meads/meads-concentration-mathematics.webp",
      },
      {
        title: "Programming & Systems",
        description:
          "Students gain practical experience with programming languages, data integration tools, and scalable computing systems that support enterprise analytics and business intelligence. The coursework combines data architecture, warehousing, and big data frameworks.",
        skills: [
          "Program in Python, R, and SQL while leveraging technologies such as TensorFlow, Spark, and Tableau for analytics and visualization",
          "Design and manage data warehouses, architecture models, and ETL pipelines for business intelligence systems",
          "Implement scalable big data solutions using distributed computing and cloud-based platforms like Dataiku and Spark",
        ],
        image: "/assets/images/meads/meads-concentration-programming.webp",
      },
      {
        title: "Machine Learning & AI",
        description:
          "Students explore the principles and applications of machine learning and artificial intelligence-from foundational algorithms to deep learning and generative AI. Emphasis is placed on both technical implementation and responsible management of AI technologies.",
        skills: [
          "Apply core machine learning methods such as regression, classification, clustering, and dimensionality reduction using Python libraries",
          "Design and train neural networks and deep learning architectures including CNNs, RNNs, and attention-based models",
          "Experiment with generative AI and augmented intelligence through prompt engineering and large language models",
          "Evaluate and manage AI systems ethically, addressing issues of fairness, transparency, and compliance in enterprise contexts",
        ],
        image: "/assets/images/meads/meads-concentration-machine-learning.webp",
      },
      {
        title: "Data Visualization & Communication",
        description:
          "Students learn to translate analytical results into clear, compelling visual narratives that inform decision-making. The curriculum emphasizes design thinking, ethical visualization, and storytelling through data.",
        skills: [
          "Build visualizations and dashboards using Tableau, Power BI, Julius.ai, Python, and R",
          "Apply principles of perceptual design and ethical visualization to ensure clarity and integrity in data storytelling",
          "Communicate analytical findings effectively for both technical and business audiences",
        ],
        image: "/assets/images/meads/meads-concentration-visualization.webp",
      },
      {
        title: "Applied Analytics & Business Intelligence",
        description:
          "Students apply analytical techniques to real-world business challenges in marketing, operations, and digital contexts. The coursework emphasizes data-driven strategy, governance, and decision-making.",
        skills: [
          "Conduct marketing and operational analytics to model customer behavior, optimize campaigns, and measure business performance",
          "Apply web and text mining techniques-including scraping, clustering, and recommender systems-to extract insights from large-scale data sources",
          "Implement data governance, security, and risk management practices to ensure trustworthy analytics across enterprise environments",
        ],
        image: "/assets/images/meads/meads-concentration-analytics.webp",
      },
    ],
  },
  // ==================================================================
  whyStevens: {
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
    description:
      "The M.Eng. in Applied Data Science requires 30 credits across 10 courses, blending foundational theory with hands-on AI and machine learning applications. Progress through a structured curriculum—from mathematical foundations and Python programming to advanced deep learning and a capstone project—building production-ready skills at every stage. You'll master essential tools including PyTorch, TensorFlow, and cloud AI platforms while learning to design, train, and deploy machine learning models in real-world environments. The program emphasizes practical application through project-based coursework, preparing you to tackle complex data challenges across industries from healthcare and finance to technology and beyond.",
    variant: "degree",
    tabs: [
      {
        id: "coursework",
        title: "Coursework",
        sections: [
          {
            title: "Coursework",
            courses: [
              {
                code: "MA 574",
                name: "Mathematical Foundations of Data Science",
                description:
                  "This course provides students with the essential background in calculus and linear algebra needed to pursue the study of Data Science. Topics include derivatives and integrals of (multivariable) functions; vectors and matrices; vector spaces and subspaces; norms and projections; the eigendecomposition (diagonalization) of a matrix; the singular value decomposition (SVD) of a matrix; continuous optimization; mappings between Euclidean spaces; and Taylor approximation. Throughout, various applications to Data Science are considered, with hands-on numerical and coding exercises supplementing the theory.",
              },
              {
                code: "CS 563",
                name: "Python and Data Bases",
                description:
                  "This course covers Python programming fundamentals and database management systems. Students learn to design, implement, and query relational databases while developing proficiency in Python for data manipulation and analysis.",
              },
              {
                code: "CS 559",
                name: "Machine Learning: Fundamentals and Applications",
                description:
                  "This course covers foundational principles that drive machine learning applications and provides practice implementing algorithms. Topics include maximum likelihood estimation, dimension reduction, supervised and unsupervised learning, neural networks, and non-parametric methods. Students gain tools to address new ML problems, applying techniques such as regression, SVMs, decision trees, clustering, and backpropagation, with an emphasis on practical problem-solving using software libraries and real data.",
              },
              {
                code: "MA 521 / FA 590",
                name: "Statistical Foundations of Data Science OR Statistical Learning",
                description:
                  "MA 521: This course provides a comprehensive foundation in statistical methods for data science. Topics include probability theory, statistical inference, hypothesis testing, and regression analysis.\n\nFA 590: An advanced course focusing on statistical learning methods and their applications. Students explore modern statistical techniques for prediction and classification.",
              },
              {
                code: "CS 583",
                name: "Deep Learning",
                description:
                  "This course introduces deep learning concepts and methodologies, covering both theoretical foundations and practical applications. Topics include model selection, neural networks, backpropagation, convolutional neural networks (CNNs), recurrent neural networks (RNNs), attention models, and reinforcement learning from human feedback (RLHF). Students complete programming assignments and a final project involving design and implementation of deep learning models.",
              },
              {
                code: "BIA 568",
                name: "Management of AI Technologies",
                description:
                  "This course explores the management, governance, and strategic deployment of Artificial Intelligence (AI) systems within modern organizations. Students examine applications of AI across industries-such as autonomous transportation, fraud detection, and machine translation-while addressing managerial considerations like fairness, accountability, transparency, ethics, and legal compliance. The course emphasizes assessing and managing AI/ML systems, monitoring performance, and developing enterprise-level AI strategies.",
              },
              {
                code: "BIA 662",
                name: "Augmented Intelligence and Generative AI",
                description:
                  "This course explores the integration of augmented intelligence, generative AI, natural language processing, and deep learning in data-driven business contexts. Students gain foundational and practical knowledge in LLMs, prompt engineering, and AI ethics. A major team project involves developing a proof-of-concept business solution leveraging generative AI to create measurable value.",
              },
              {
                code: "MA 899",
                name: "Data Science Capstone Project",
                description:
                  "A culminating project where students apply their knowledge to solve real-world data science problems. Working individually or in teams, students complete an end-to-end data science project.",
              },
            ],
          },
          {
            title: "Sample Electives",
            intro:
              "Sample electives available to customize your degree - *actual elective list will be available in Spring:",
            courses: [
              {
                code: "MA 641",
                name: "Time Series Analysis I",
                description:
                  "This course provides a foundational introduction to modern time series analysis from both theoretical and applied perspectives. Emphasizing the Box–Jenkins methodology, it covers ARMA and ARIMA models, parameter estimation, model diagnostics, forecasting, seasonal (SARMA) models, and time series models of heteroscedasticity (ARCH and GARCH). Students apply these methods using statistical software (R) and real-world datasets, developing skills to analyze, forecast, and interpret time-dependent data.",
              },
              {
                code: "CS 513",
                name: "Data Mining using Python",
                description:
                  "This course introduces the principles and practice of data mining and machine learning. Students explore statistical and computational techniques to analyze, classify, and model data. Topics include data preprocessing, decision trees, k-nearest neighbor algorithms, Naïve Bayes, clustering (k-means, hierarchical), regression, neural networks, and advanced methods such as boosting and recommendation systems. The course emphasizes both theoretical understanding and applied learning using Python and real-world datasets.",
              },
              {
                code: "BIA 678",
                name: "Big Data Technologies",
                description:
                  "The field of Big Data is explored through both business and technical lenses. Students learn to manage the volume, velocity, and variety of data using modern technologies such as Spark, Python, and Dataiku. The course covers big data strategy, governance, AI ethics, and applications of machine learning and IoT within big data ecosystems, preparing students to design scalable solutions for enterprise environments.",
              },
              {
                code: "MIS 636",
                name: "Data Integration for BI&A",
                description:
                  "This course focuses on the design, management, and use of data warehouse (DW) and business intelligence (BI) systems. The DW is the central element in collecting, integrating, and making sense of an organization's data. BI concerns the full range of analytical applications and their delivery to users. Students learn the business value of data, planning and requirements gathering, data architecture and modeling, and integration processes. Practical examples and case studies highlight the implementation of BI systems and data integration for improved organizational decision-making.",
              },
              {
                code: "BIA 660",
                name: "Web Mining",
                description:
                  "Students learn through hands-on experience how to extract and analyze data from the web using distributed computing. The course covers web scraping, text mining, recommender systems, clustering, and natural language processing. Students apply methods widely used by companies like Amazon and Google to analyze web-scale data, culminating in applications to real scientific or business questions.",
              },
              {
                code: "BIA 672",
                name: "Marketing Analytics",
                description:
                  "This course develops students' analytical ability to understand consumer and customer behavior using marketing models, analytics, and data management techniques. Topics include customer analytics, product analytics, promotion and digital analytics, channel analytics, and marketing mix optimization. Students use SAS and Python tools to build realistic models, forecast consumer behavior, and formulate marketing strategies based on data-driven insights.",
              },
              {
                code: "FA 550",
                name: "Data Visualization Application",
                description:
                  "Effective visualization of complex data allows for meaningful insight and informed decision-making. This course investigates visualization methods from multiple perspectives and teaches students to use tools such as Tableau, Julius.ai, Python, R, and Power BI to refine data and communicate results effectively. Ethical visualization practices and design theory are also emphasized.",
              },
              {
                code: "BIA 665",
                name: "Applied Reinforcement Learning",
                description:
                  "This course covers reinforcement learning theory and applications, including Markov decision processes, dynamic programming, temporal-difference learning, and deep reinforcement learning. Students implement algorithms and apply them to real-world problems.",
              },
            ],
          },
        ],
      },
      {
        id: "capstone",
        title: "Capstone Experience",
        sections: [
          {
            title: "Apply Data Science to a Real-World Challenge",
            intro:
              "In the culminating capstone project, students collaborate to solve a real business or societal problem using advanced analytics and AI-driven solutions. Projects focus on measurable outcomes-ranging from optimizing supply chains to developing predictive health systems.",
            bulletTitle: "Sample Project Topics:",
            bulletItems: [
              "Predictive modeling for renewable energy forecasting",
              "AI-driven optimization of financial portfolio performance",
              "Natural language processing for sentiment and risk analysis",
              "Generative AI solutions for marketing and product innovation",
            ],
          },
        ],
      },
    ],
  },
  // ==================================================================
  faculty: {
    description:
      "Our faculty are experienced educators and active researchers who offer industry insights.",
    members: [
      {
        name: "Samuel Kim",
        title:
          "Teaching Professor and Associate Chair for Undergraduate Studies in the Department of Computer Science",
        image: "/assets/avatars/msads-avatar/Samuel_Kim.webp",
      },
      {
        name: "Alkis Vazacopoulos",
        title: "Teaching Professor",
        image: "/assets/avatars/msads-avatar/Vazacopoulos.webp",
      },
      {
        name: "Upendra Prasad",
        title: "Senior Lecturer",
        image:
          "/assets/avatars/msads-avatar/upendra-prasad-stevens-faculty.webp",
      },
      {
        name: "Khasha Dehnad",
        title: "Adjunct Lecturer",
        image: "/assets/avatars/msads-avatar/Dehnad.webp",
      },

      {
        name: "David Landaeta",
        title: "Adjunct Lecturer",
        image: "/assets/logos/Stevens-logo-small-scale.webp",
      },
    ],
  },
  // ==================================================================
  admissions: {
    variant: "singleImageCard",
    title: "Application Option",
    backgroundImage: "/assets/images/shared/asap-hero.webp",
    options: [
      {
        title: "Accelerated Application",
        subtitle:
          "Fast-track your application with our new Accelerated App designed for busy professionals. The Accelerated App gets you started immediately:",
        theme: "light",
        featured: true,
        cardPosition: "right",
        description: `<ul class="list-disc pl-5 space-y-2"><li><strong>Recommendation Letters:</strong> Not Required</li><li><strong>Proof of Bachelor's Degree:</strong> Upload copy of transcripts</li><li><strong>Professional Background:</strong> Upload your résumé or link your LinkedIn profile</li></ul>`,
        footnote:
          "Official transcripts will be due within one year of enrollment. Stevens may request additional documentation if needed.",
        buttonText: "Apply Now",
        url: "/accelerated-application/?program=meads",
      },
    ],
  },
  // ==================================================================
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
        description: "Begin your AI & Data Science journey at Stevens.",
      },
    ],
    footnote:
      "*Applicants who apply by the early submit deadline and are admitted may be eligible for a $250 deposit waiver. Other conditions may apply.",
  },
  // ==================================================================
  tuition: {
    cards: [
      { value: "$800", label: "Per Credit" },
      { value: "$24,000", label: "Total Program Cost" },
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
          <p class="text-stevens-sm">Apply by the <strong>priority deadline (${KEY_DATES_SPRING2.PRIORITY_SUBMIT.date})</strong> to maximize your funding opportunities.</p>
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
      `,
  },
  // ==================================================================
  events: {
    title: "On-Demand Content",
    description:
      "At Stevens, we host a variety of events for prospective and current students covering topics such as application strategy, program information, the student experience and our online platform. Our on-demand content is instantly available, so you can watch at your convenience.",
    fallbackText: "Check back soon for more upcoming events.",
    items: [
      // { title: "Exploring the Online M.S. in Computer Science at Stevens Institute of Technology", status: "Ongoing", length: "11 minutes", url: "https://event.on24.com/wcc/r/4455089/34FF45D9104354C225403F6B63A29F26" },
      {
        title: "Student Voices: Real Stories From Stevens Graduate Programs",
        status: "Ongoing",
        length: "45 minutes",
        url: "https://event.on24.com/wcc/r/4970051/3D4408B63146F35B069766B71328D7CE",
      },

      // { title: "Online M.S. in Computer Science: Areas of Focus", status: "Ongoing", length: "12 minutes", url: "https://event.on24.com/wcc/r/4894227/042446D9C5E18BF3F4D7CD9A7604B1EA" },
      {
        title: "Financial Aid Overview: Stevens Institute of Technology",
        status: "Ongoing",
        length: "10 minutes",
        url: "https://event.on24.com/wcc/r/5007787/EC42C1EA980050EB628E9A3DAD9BA2BB?pg=2",
      },
      {
        title: "Application Walkthrough: Data Science and Computer Science",
        status: "Ongoing",
        length: "24 minutes",
        url: "https://event.on24.com/wcc/r/4455092/4C10B1C30D8D20926A28C1A21C667A29",
      },
      {
        title:
          "Application Overview: Online Master's in Engineering Management",
        status: "Ongoing",
        length: "24 minutes",
        url: "https://event.on24.com/wcc/r/5056716/2FEBB6A6A455A2CCC508FB1183A71810",
      },
    ],
  },
  // ==================================================================
  faqs: [
    {
      q: "Do I need a background in computer science to apply?",
      a: "While a strong quantitative foundation is preferred, the M.Eng. in Applied Data Science welcomes applicants from diverse backgrounds. A bachelor's degree is required. The curriculum includes foundational courses in mathematics, Python programming, and databases to help students build the necessary skills for advanced machine learning and AI coursework.",
    },
    {
      q: "What is the Accelerated Application?",
      a: "The Accelerated Application is a streamlined process designed for busy professionals. You can apply without recommendation letters—just upload unofficial transcripts and your resume or LinkedIn profile. Official transcripts are due within one year of enrollment. Bachelor's degree is required.",
    },
    {
      q: "How long does it take to complete the program?",
      a: "The M.Eng. in Applied Data Science requires 30 credits across 10 courses. Most students complete the program in 2–3 years while studying part-time. The flexible, asynchronous format allows you to pace your studies around your career and personal commitments.",
    },
  ],
  // ==================================================================
  accreditation: `Stevens Institute of Technology has been continually accredited by the <a href="https://www.msche.org/" target="_blank" rel="noopener noreferrer" class="text-stevens-white underline hover:text-stevens-gray-500 transition-colors duration-stevens-normal">Middle States Commission on Higher Education (MSCHE)</a> since 1927. Stevens is accredited until 2027 and the next self-study evaluation is scheduled to take place during 2026-2027.`,
  tuitionCalculator: {
    image: "/assets/images/shared/shared-tuition-calculator.webp",
    imageAlt: "Welcome to Stevens",
  },
};

export default function MEADS() {
  usePageTracking({
    pageType: "program",
    programCode: "meads",
    additionalData: {
      program_name: "Master of Engineering in Applied Data Science",
      has_video: true,
      has_rfi_modal: true,
      has_pricing_cards: true,
    },
  });

  // Add pricing cards to hero section
  const heroWithPricing = {
    ...programData.hero,
    bottomContent: <TuitionCardsHero cards={programData.tuition.cards} />,
  };

  return (
    <PageContextProvider pageType="program" pageName="MEADS">
      <ProgramContextProvider
        programCode="meads"
        programName="Master of Engineering in Applied Data Science"
        programType="degree"
      >
        <DegreeTemplate
          programData={{ ...programData, hero: heroWithPricing }}
          useApplicationModal={true}
        />
      </ProgramContextProvider>
    </PageContextProvider>
  );
}
