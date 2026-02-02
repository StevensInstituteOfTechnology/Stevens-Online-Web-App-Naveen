import React from "react";
import {
  Globe,
  Award,
  Check,
  BrainCircuit,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import { DegreeTemplate } from "../../components/program-pages/templates";
import { KEY_DATES_SUMMER } from "@/config/constants";
import { usePageTracking } from "@/hooks/analytics/usePageTracking";
import { ProgramContextProvider } from "@/contexts/analytics/ProgramContext";
import { PageContextProvider } from "@/contexts/analytics/PageContext";

const programData = {
  code: "mba",
  seo: {
    title: "Online MBA Program | Stevens Online",
    description:
      "Earn your 100% online MBA from Stevens Institute of Technology. A tech-driven program designed for business leaders in innovation and strategy.",
    ogImage: "/assets/images/mba/1-omba-hero-scaled.webp",
    url: "/online-mba/",
  },
  hero: {
    titleLines: ["Earn Your MBA Online.", "Build Your Career Anywhere."],
    subtitle:
      "Tech-driven curriculum. AACSB accredited. Rated one of the best MBA programs in NYC region.",
    bgImage: "/assets/images/mba/1-omba-hero-scaled.webp",
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
          "Complete your Stevens MBA coursework at your own pace, 100% online.",
      },
      {
        supertext: "Apply by",
        labelAbove: KEY_DATES_SUMMER.PRIORITY_SUBMIT.date.split(" ")[0],
        value: KEY_DATES_SUMMER.PRIORITY_SUBMIT.date
          .split(" ")[1]
          .replace(",", ""),
        subtext: `to start ${KEY_DATES_SUMMER.START_OF_CLASSES.date}`,
      },
      {
        value: "#1",
        label: "MBA in NJ",
        subtext: "U.S. News & World Report",
      },
      {
        title: "AACSB Accredited",
        description:
          "One of only 6% of business schools worldwide to earn AACSB accreditation.",
      },
    ],

    // Legacy Quick Stats (fallback)
    quickStats: [
      { value: "36-45", label: "Credits" },
      { value: "12-15", label: "Courses" },
      { value: "100%", label: "Online" },
      { value: "2.5-3", label: "Years" },
    ],

    // Simplified Card
    termStart: `${KEY_DATES_SUMMER.TERM.name}: ${
      KEY_DATES_SUMMER.START_OF_CLASSES.date.split(",")[0]
    }`,
    tuition: "Contact for Pricing",
    applyUrl: "#",

    // Legacy
    termStartDate: `${KEY_DATES_SUMMER.TERM.nameUppercase}: ${KEY_DATES_SUMMER.START_OF_CLASSES.date}`,
  },
  overview: {
    programType: "Master of Business Administration",
    headline: "Lead with data, strategy, and innovation",
    tagline: "The best MBA for technology in the NYC region.",
    description: `<p class="mb-4">The Online MBA at Stevens empowers ambitious professionals to lead in data-driven, technology-centric industries. Whether you're advancing within your organization or pivoting into a new field, our 100% online, part-time format allows you to learn on your schedule, without putting your career on hold.</p><p>Offering a unique edge in today's digital economy, the best MBA for technology in the NYC region provides practical expertise in analytics, strategy, leadership and emerging technologies - taught by faculty who are active in research and industry. With two on-site immersions near New York City, you'll also benefit from strong industry connections and a thriving network of alumni working across tech, finance, healthcare and more.</p>`,
    image: "/assets/images/mba/10.webp",
    imageAlt: "Students collaborating on MBA coursework",
    imagePosition: "10% 70%",
    keySkills: [
      "Marketing",
      "Financial Management",
      "Data Analysis",
      "Accounting",
      "Project Management",
      "Leader Development",
    ],
    concentrations: [
      "Business Intelligence & Analytics",
      "Finance",
      "Financial Analytics",
      "Financial Engineering",
      "Information Systems",
      "Project Management",
      "Artificial Intelligence",
    ],
  },
  videoSection: {
    title: "Discover Your Future at Stevens",
    heading: "Earn your MBA without putting your career on hold",
    description:
      "Our 100% online, part-time format empowers ambitious professionals to lead in data-driven industries while maintaining their current role. Learn from expert faculty who bridge cutting-edge research with real-world business applications, and connect with a network of accomplished peers and alumni across tech, finance, and healthcare.",
    videoSrc: "/assets/videos/Stevens Online MBA - 1.mp4",
    posterSrc: "/assets/videos/video-cover-1.webp",
    showControls: true,
    muted: true,
    showCTA: false,
  },
  rankings: [
    {
      ranking: "#1",
      description: "ONLINE MBA IN N.J.",
      source:
        "Stevens' Online MBA has been ranked #1 in New Jersey since 2015 (U.S. News & World Report, 2024).",
    },
    {
      ranking: "100%",
      description: "EMPLOYMENT",
      source:
        "100% of MBA graduates in the Class of 2022 accepted job offers within three months of graduating.",
      note: "1",
    },

    {
      ranking: "#12",
      description: "FOR BEST CAREER PLACEMENT",
      source:
        "Ranked No. 12 on The Princeton Review's 'Top 20 Best Career Placement' list (2025).",
    },
    {
      ranking: "#15",
      description: "FOR BEST VALUE",
      source: 'Ranked #15 among "Best Value Colleges" By Payscale (2024).',
      note: "2",
    },
  ],

  rankings_footnotes: [
    {
      note: "1",
      text: "Based on data from 82% of the 2021-2022 full-time program graduates.",
    },
    {
      note: "2",
      text: "Based on the cost of a four-year bachelor's degree program.",
    },
  ],

  career: {
    description: `<p class="mb-4">The Stevens Online MBA prepares you for leadership roles in New York City and other major business hubs where management talent is in high demand.</p><p class="mb-4">You’ll build strategic, analytical, and cross-functional skills for careers in finance, operations, marketing, and project leadership—within tech-forward organizations and beyond.</p><p>Through core, concentration, and elective coursework, you’ll strengthen decision-making, data-driven execution, and innovation to accelerate career growth.</p>`,
    jobTitles: [
      { title: "Chief Executive", employed: "211,230", salary: "$206,420" },
      { title: "Financial Manager", employed: "837,100", salary: "$161,700" },
      { title: "Marketing Manager", employed: "411,300", salary: "$159,660" },
      {
        title: "Human Resources Manager",
        employed: "208,900",
        salary: "$140,030",
      },
      { title: "Sales Manager", employed: "584,800", salary: "$138,060" },
    ],

    source: "U.S. Bureau of Labor Statistics, 2025.",
    topCompanies: [
      "Microsoft",
      "Verizon",
      "JPMorgan Chase",
      "Amazon",
      "Deloitte",
      "Accenture",
    ],
  },
  whatYoullLearn: {
    title: "A Skill Set Designed for Impact",
    description:
      "Through a mix of foundational, concentration and elective courses, the Stevens Online MBA equips students with T-shaped skills - broad cross-functional business knowledge combined with deep expertise in areas like analytics, innovation and digital strategy. This unique approach ensures that graduates are not only strategic thinkers and effective leaders but also specialists capable of driving impact in their chosen industries.",
    modules: [
      {
        title: "Financial Management",
        description:
          "Master the language of business and develop expertise in financial decision-making. Learn to analyze financial statements, evaluate investments, and drive strategic financial planning.",
        skillsLabel: "Example Courses",
        image: "/assets/images/mba/3.webp",
        skills: [
          "FIN 500 - Financial and Managerial Accounting",
          "FIN 523 - Financial Management",
          "FIN 638 - Corporate Finance",
          "MGT 506 - Economics for Managers",
        ],
      },
      {
        title: "Project Management",
        description:
          "Develop the skills to lead complex projects from inception to completion. Learn strategic project planning, analytics-driven decision making, and cross-functional team leadership.",
        skillsLabel: "Example Courses",
        image: "/assets/images/mba/4.webp",
        skills: [
          "MGT 609 - Project Management Fundamentals",
          "MGT 610 - Strategic Perspectives on Project Management",
          "MGT 611 - Project Analytics",
          "MGT 619 - Leading Across Projects",
        ],
      },
      {
        title: "Data Analytics & AI",
        description:
          "Build expertise in leveraging data and artificial intelligence for business advantage. Learn to extract insights from complex datasets and apply AI technologies strategically.",
        skillsLabel: "Example Courses",
        image: "/assets/images/mba/5.webp",
        skills: [
          "BIA 500 - Business Analytics: Data, Models and Decisions",
          "BIA 568 - Management of AI Technologies",
          "BIA 672 - Marketing Analytics",
          "BIA 674 - Supply Chain Analytics",
        ],
      },
    ],
  },

  curriculum: {
    description:
      "The Stevens Online MBA is designed to give you breadth and depth in business and technology. You'll start with foundational courses that build core skills in strategy, finance, marketing and data analytics - equipping you with a strong, tech-infused base for leadership. Then, you'll customize your learning through concentrations and elective courses aligned with your career goals, whether you're focused on business intelligence, finance or project management. Along the way, you'll participate in two on-campus immersions where you'll collaborate in person with faculty, peers (on-campus MBA students), industry leaders and business executives. The Stevens Online MBA is a part-time program designed for full-time working professionals, offering flexible online coursework along with access to resources and support to help you thrive academically, stay connected to the university community and benefit from learning opportunities beyond the classroom.",
    variant: "degree",
    tabs: [
      {
        id: "foundations",
        title: "Foundational Courses",
        sections: [
          {
            title: "Foundational Courses",
            intro:
              "Foundational courses should be completed in advance of pursuing a concentration. Courses may be waived based on academic history and previous coursework completed.",
            courses: [
              {
                code: "FIN 500",
                name: "Financial and Managerial Accounting",
                credits: 3,
                description:
                  "This course will develop accounting analysis useful for managerial decision-making purposes. Topics will include an introduction to elements of financial accounting, cost-profit-volume analysis, manufacturing costs and elements of cost accounting, special decision analysis, budgeting, variances, and controllability and responsibility accounting.",
              },
              {
                code: "FIN 523",
                name: "Financial Management",
                credits: 3,
                description:
                  "This course covers the fundamental principles of finance. The primary concepts covered include the time value of money, principles of valuation and risk. Specific applications include the valuation of debt and equity securities as well as capital budgeting analysis, financial manager's functions, liquidity vs. profitability, financial planning, capital budgeting, management of long term funds, money and capital markets, debt and equity, management of assets, cash and accounts receivable, inventory and fixed assets. Additional topics include derivative markets.",
              },
              {
                code: "MGT 506",
                name: "Economics for Managers",
                credits: 3,
                description:
                  "This course introduces managers to the essence of business economics - the theories, concepts and ideas that form the economist's tool kit encompassing both the microeconomic and macroeconomic environments. Microeconomic topics include demand and supply, elasticity, consumer choice, production, cost, profit maximization, market structure, and game theory while the macroeconomic topics will be GDP, inflation, unemployment, aggregate demand, aggregate supply, fiscal and monetary policies. In addition, the basic concepts in international trade and finance will be discussed.",
              },
              {
                code: "MGT 612",
                name: "Leader Development",
                credits: 3,
                description:
                  'Project success depends, largely, on the human side. Success in motivating project workers, organizing and leading project teams, communication and sharing information, and conflict resolution, are just a few areas that are critical for project success. However, being primarily technical people, many project managers tend to neglect these "soft" issues, assuming they are less important or that they should be addressed by direct functional managers. The purpose of this course is to increase awareness of project managers to the critical issues of managing people and to present some of the theories and practices of leading project workers and teams.',
              },
              {
                code: "BIA 500",
                name: "Business Analytics: Data, Models and Decisions",
                credits: 3,
                description:
                  "This course explores data-driven methods that are used to analyze and solve complex business problems. Students will acquire analytical skills in building, applying and evaluating various models with hands-on computer applications. Topics include descriptive statistics, time-series analysis, regression models, decision analysis, Monte Carlo simulation, and optimization models.",
              },
              {
                code: "MGT 641",
                name: "Marketing Management",
                credits: 3,
                description:
                  "The study of marketing principles from the conceptual, analytical, and managerial points of view. Topics include: strategic planning, market segmentation, product life-cycle, new product development, advertising and selling, pricing, distribution, governmental, and other environmental influences as these factors relate to markets and the business structure.",
              },
              {
                code: "BIA 568",
                name: "Management of AI Technologies",
                credits: 3,
                description:
                  "Artificial Intelligence (AI) is an interdisciplinary field that draws on insights from computer science, engineering, mathematics, statistics, linguistics, psychology, and neuroscience to design agents that can perceive the environment and act upon it. This course surveys applications of artificial intelligence to business and technology in the digital era, including autonomous transportation, fraud detection, machine translation, meeting scheduling, and face recognition. In each application area, the course focuses on issues related to management of AI projects, including fairness, accountability, transparency, ethics, and the law.",
              },
              {
                code: "MGT 657",
                name: "Operations Management",
                credits: 3,
                description:
                  "This course covers the general area of management of operations, both manufacturing and non-manufacturing. The focus of the course is on productivity and total quality management. Topics include quality control and quality management, systems of inventory control, work and materials scheduling, and process management.",
              },
              {
                code: "MGT 635",
                name: "Managerial Judgment and Decision Making",
                credits: 3,
                description:
                  'Executives make decisions every day in the face of uncertainty. The objective of this course is to help students understand how decisions are made, why they are often less than optimal, and how decision-making can be improved. This course will contrast how managers do make decisions with how they should make decisions, by thinking about how "rational" decision makers should act, by conducting in-class exercises and examining empirical evidence of how individuals do act (often erroneously) in managerial situations. The course will include statistical tools for decision-making, as well as treatment of the psychological factors involved in making decisions.',
              },
              {
                code: "MGT 663",
                name: "Discovering and Exploiting Entrepreneurial Opportunities",
                credits: 3,
                description:
                  "In this course, students will evaluate and create their own prospective business strategies. They will develop an understanding of entrepreneurship and innovation in starting and growing a business venture. Students will be given an opportunity to actually start their own business or create a business in their company by learning how to take advantage of the new order of business opportunities of the information age. This course's main objective is to show students how to identify these opportunities, be able to formulate and evaluate both qualitatively and quantitatively whether the opportunity is worth pursuing, and, of course, how it may be pursued. Actual case studies and experiences will be intertwined with the course content.",
              },
              {
                code: "MGT 699",
                name: "Strategic Management",
                credits: 3,
                description:
                  "An interdisciplinary course which examines the elements of, and the framework for, developing and implementing organizational strategy and policy in competitive environments. The course analyzes management problems both from a technical-economic perspective and from a behavioral perspective. Topics treated include: assessment of organizational strengths and weaknesses, threats, and opportunities; sources of competitive advantage; organizational structure and strategic planning; and leadership, organizational development, and total quality management. The case method of instruction is used extensively in this course.",
              },
            ],
          },
          {
            title: "Terms 5 & 6: Electives",
            intro:
              "Terms 5 and 6 are elective-only; see Concentrations for course options.",
            courses: [],
          },
        ],
      },
      {
        id: "concentrations",
        title: "Concentrations",
        sections: [
          {
            title: "Choose Your Concentration",
            intro:
              "Customize your MBA with one of seven concentrations designed for technology-focused careers. Each concentration provides specialized knowledge and skills to advance your career in specific industries and roles.",
            courses: [],
          },
          {
            title: "Business Intelligence & Analytics",
            courses: [
              {
                code: "BIA 672",
                name: "Marketing Analytics",
                credits: 3,
                description:
                  "Covers marketing analytics techniques such as segmentation, positioning, and forecasting, which form the cornerstone of marketing strategy in industry. Students will work on cases and data from real companies, analyze the data, and learn to present their conclusions and make strategic recommendations.",
              },
              {
                code: "BIA 674",
                name: "Supply Chain Analytics",
                credits: 3,
                description:
                  "Introduces the tactical and strategic issues surrounding the design and operation of supply chains, to develop supply chain analytical skills for solving real life problems. Topics covered include: supplier analytics, capacity planning, demand-supply matching, sales and operations planning, location analysis and network management, inventory management and sourcing.",
              },
              {
                code: "BIA 658",
                name: "Social Network Analytics",
                credits: 3,
                description:
                  "This course focuses on network concepts, including graph-theoretic fundamentals, centrality, cohesion, affiliations, equivalence and roles, as well as design issues, including data sampling and hypothesis testing. Another focus of this course is on marketing applications of social network analysis - in particular, the use of knowledge about network properties and behavior, such as hubs and paths, the robustness of the network, and information cascades - to better broadcast products and search targets.",
              },
              {
                code: "BIA 670",
                name: "Risk Management Methods and Applications",
                credits: 3,
                description:
                  "Theoretical and practical aspects of risk assessment and management will be covered. Major topics include: Importance of innovation and technological changes in current competitive environment, risk and uncertainty, decision trees, binomial methods and derivation of Black-Scholes option pricing formula, extension of option methodology to non-financial (real) options, VAR (value at risk), a framework of risk assessment, and several real-world case studies.",
              },
            ],
          },
          {
            title: "Finance",
            courses: [
              {
                code: "FIN 526",
                name: "Private Equity and Venture Capital",
                credits: 3,
                description:
                  'This course addresses the fundamentals of venture capital, which includes the venture capital industry, the structure of venture capital firms and venture capital investments. It addresses in some detail the relationship between venture risk and return, the cost of venture capital and the valuation of high growth companies. The course covers a variety of valuation methods as well as analysis of company capital structure or "cap tables."Students use software tools to determine the value of stocks, options and special features of preferred stock. Topics related to the finance of innovation and the relationship between strategy and venture finance are also covered. Lessons learned are reinforced through case analyses and real examples from the industry.',
              },
              {
                code: "FIN 627",
                name: "Investment Management",
                credits: 3,
                description:
                  "This course takes a practical approach to managing investments. It covers a wide variety of investment vehicles ranging from pure equity and debt offerings to complex derivatives and options. Various investment strategies are presented, which focus on the different fundamental approaches and tactics used by leading investors to achieve their financial goals. The course also focuses on investment styles, including momentum, growth, income, asset allocation and vulture investing. Students participate in real-time simulation experiences to create viable portfolios of stocks, bonds and other investments, while tracking their performance against the overall market and the class on a weekly basis.",
              },
              {
                code: "FIN 628",
                name: "Derivatives",
                credits: 3,
                description:
                  "This course covers the fundamentals of financial derivatives, including the basic properties and the pricing of futures, options and swaps. It also explores trading and hedging strategies involving financial derivatives. Special topics, such as exotic options and credit derivatives, are explored. The course provides the foundation of financial derivatives and lays the ground for a rigorous risk management course and other advanced quantitative courses, such as stochastic finance.",
              },
              {
                code: "FIN 638",
                name: "Corporate Finance",
                credits: 3,
                description:
                  "Topics covered in this course include: leverage on the balance sheet and weighted average cost of capital; bankruptcy, turnarounds, and recapitalizations; international currency hedging; stock options; private equity valuation; mergers and acquisitions; and the issuance of public and private securities.",
              },
            ],
          },
          {
            title: "Financial Analytics",
            courses: [
              {
                code: "FE 511",
                name: "Introduction to Bloomberg and Thomson Reuters",
                credits: "1-Credit Lab",
                description:
                  "This course is designed to teach students the nature and availability of the financial data available at Stevens. The focus of the course will be on equity, futures, FX, options, swaps, CDSs, interest rate swaps, etc. They will learn how to use a Bloomberg terminal. As part of the course the students will be certified in the 4 areas that Bloomberg offers certification. We will cover the Thomson-Reuters Tick history data and basics of using this data. The course also introduces basics of applied statistics. Bloomberg terminal access will be required for any student taking the course on the web.",
              },
              {
                code: "FE 515",
                name: "Introduction to R",
                credits: "1-Credit Lab",
                description:
                  "In this course, students will learn the basics of the open-source programming language R using financial data and applications. Basic statistical knowledge is required to complete the course. Upon completion, students will be able to use R for assignments and research using data in finance.",
              },
              {
                code: "FE 520",
                name: "Intro to Python for Financial Applications",
                credits: "1-Credit Lab",
                description:
                  "This course is a primer on Python (language syntax, data structures, basic data processing, Python functions, modules and classes). The remainder of the course covers open-source Python tools relevant to solving financial programming problems. There will be reading assignments of the corresponding chapters in the textbook and additional materials will be provided.",
              },
              {
                code: "FA 582",
                name: "Foundations of Financial Data Science",
                credits: "2-Credit Lab",
                description:
                  "This course will provide an overview of issues and trends in data quality, data storage, data scrubbing, data flows and data encryption. Topics will include data abstractions and integration, enterprise-level data issues, data management issues with collection, warehousing, preprocessing, and querying. Furthermore, the Hadoop based programming framework for big data issues will be introduced along with any governance and policy issues. Corequisite: FE 513",
              },
              {
                code: "FE 513",
                name: "Practical Aspects of Database Design",
                credits: "1-Credit Lab",
                description:
                  "The course provides a practical introduction to SQL databases and Hadoop cluster systems. Students will receive hands-on instruction about setting up and working with databases. Most of the software will be introduced using case studies or demonstrations, followed by a lecture of related fundamental knowledge. The course covers SQL, NoSQL and database management systems. The course will cover accessing databases using API.",
              },
              {
                code: "FA 595",
                name: "Financial Technology",
                credits: 3,
                description:
                  "This course deals with financial technology underlying activities of markets, institutions and participants. The overriding purpose is to develop end-to-end business decision-making data analytics tools along with enterprise-level systems thinking. Statistical learning algorithms will be connected to financial objects identification and authentication along with the appropriate databases to create enterprise level financial services analytics systems.",
              },
              {
                code: "FA 550",
                name: "Data Visualization Applications",
                credits: 3,
                description:
                  "Effective visualization of complex data allows for useful insights, more effective communication, and making decisions. This course investigates methods for visualizing financial datasets from a variety of perspectives in order to best identify the right tool for a given task. Students will use a number of tools to refine their data and create visualizations, including: R and associated visualization libraries, Ruby on Rails visualization tools, ManyEyes, HTML5 & CSS 3, D3.js and related javascript libraries, Google Chart Tools, Google Refine, and image-editing programs.",
              },
            ],
          },
          {
            title: "Financial Engineering",
            intro:
              "To complete this concentration, you will take either FE 543 or FE 610, as well as either FE 535 or FE 621.",
            courses: [
              {
                code: "FE 543",
                name: "Introduction to Stochastic Calculus for Finance",
                credits: 3,
                description:
                  "This course introduces the stochastic calculus to students of finance and financial engineering. The course deals with Markov chains, Poisson processes, random walks, Brownian motion, asset prices as processes, limits of stochastic sequences, Ito sums and integral, fundamental models in modern finance, price dynamics and elementary examples of stochastic differential equations.",
              },
              {
                code: "FE 610",
                name: "Stochastic Calculus for Financial Engineers",
                credits: 3,
                description:
                  "This course provides the mathematical foundation for understanding modern financial theory. It includes topics such as basic probability, random variables, discrete continuous distributions, random processes, Brownian motion, and an introduction to Ito's calculus. Applications to financial instruments are discussed throughout the course.",
              },
              {
                code: "FE 535",
                name: "Introduction to Financial Risk Management",
                credits: 3,
                description:
                  "This course deals with risk management concepts in financial systems. Topics include identifying sources of risk in financial systems, classification of events, probability of undesirable events, risk and uncertainty, risk in games and gambling, risk and insurance, hedging and the use of derivatives, the use of Bayesian analysis to process incomplete information, portfolio beta and diversification, active management of risk/return profile of financial enterprises, propagation of risk, and risk metrics.",
              },
              {
                code: "FE 621",
                name: "Computational Methods in Finance",
                credits: 3,
                description:
                  "This course provides computational tools used in industry by the modern financial analyst. The current financial models and algorithms are further studied and numerically analyzed using regression and time series analysis, decision methods, and simulation techniques. The results are applied to forecasting involving asset pricing, hedging, portfolio and risk assessment, some portfolio and risk management models, investment strategies, and other relevant financial problems. Emphasis will be placed on using modern software. Foundational: FE 543 or FE 610",
              },
              {
                code: "FE 630",
                name: "Portfolio Theory and Applications",
                credits: 3,
                description:
                  "This course introduces the modern portfolio theory and optimal portfolio selection using optimization techniques such as linear programming. Topics include contingent investment decisions, deferral options, combination options and mergers and acquisitions. The course introduces various concepts of financial risk measures.",
              },
              {
                code: "FE 620",
                name: "Pricing and Hedging",
                credits: 3,
                description:
                  "This course deals with basic financial derivatives theory, arbitrage, hedging, and risk. The theory discusses Ito's lemma, the diffusion equation and parabolic partial differential equations, and the Black-Scholes model and formulae. The course includes applications of asset price random walks, the log-normal distribution, and estimating volatility from historic data. Numerical techniques, such as finite difference and binomial methods, are used to value options for practical examples.",
              },
            ],
          },
          {
            title: "Information Systems",
            courses: [
              {
                code: "MIS 699",
                name: "Digital Innovation",
                credits: 3,
                description:
                  "IT organizations must be able to leverage new technologies. This course focuses on how organizations can effectively and efficiently assess trends and emerging technologies in data and knowledge management, information networks, and analyzing and developing application systems. Students will learn how to help their organizations define, select, and adopt new information technologies.",
              },
              {
                code: "MIS 710",
                name: "Process Innovation and Management",
                credits: 3,
                description:
                  "This course focuses on the role of Information Technology (IT) in reengineering and enhancing key business processes. The implications for organizational structures and processes, as the result of increased opportunities to deploy information and streamline business systems, are covered.",
              },
              {
                code: "MIS 714",
                name: "Service Innovation",
                credits: 3,
                description:
                  "This course leads students through the identification, analysis, definition, and deployment of service opportunities within public and private organizations. Each of these phases is analyzed in detail to encompass the principal activities, methods, tools and techniques applied in the respective phase. Students will learn how to identify appropriate supporting techniques and information technologies for the different phases of the service life cycle, assess the role of technology, and gauge the organizational impact of service-focused operations. The objective of the course is to enable students to identify, implement and evaluate innovative service offerings in their organization.",
              },
              {
                code: "MIS 730",
                name: "Integration Information Systems Technologies",
                credits: 3,
                description:
                  "This course focuses on the issues surrounding the design of an overall Information Technology architecture. The traditional approach in organizations is to segment the problem into four areas: network, hardware, data, and applications. Instead, this course concentrates on the interdependencies among these architectures. In addition, this course will utilize management research on organizational integration and coordination. The student will learn how to design in the large, make appropriate choices about architecture in relationship to overall organization goals, understand the different mechanisms for coordination available, and create a process for establishing and maintaining an ongoing enterprise architecture.",
              },
            ],
          },
          {
            title: "Project Management",
            courses: [
              {
                code: "MGT 609",
                name: "Project Management Fundamentals",
                credits: 3,
                description:
                  "This course deals with the basic problems of managing a project, defined as a temporary organization built for the purpose of achieving a specific objective. Both operational and conceptual issues will be considered. Operational issues include definition, planning, implementation, control, and evaluation of the project. Conceptual issues include project management vs. hierarchical management, matrix organization, project authority, motivation, and morale. Cases will be used to illustrate problems in project management and how to resolve them.",
              },
              {
                code: "MGT 610",
                name: "Strategic Perspectives on Project Management",
                credits: 3,
                description:
                  "This course provides a theoretical perspective on project management for a better understanding of project implementation in modern organizations. The course is based on the premise that success in project leadership depends on a proper managerial style and attitude, and not on specific tools for planning and controlling. The course focuses on developing the manager's conceptual thinking and on building \"the project manager's mind.\" The course helps managers see the entire project landscape and the long-term issues that are critical to project success. It will also address the organizational aspects of initiating and running the program.",
              },
              {
                code: "MGT 611",
                name: "Project Analytics",
                credits: 3,
                description:
                  "Formalized procedures, tools, and techniques used in conceptual and detailed planning of the project. Development of work breakdown structure as the foundation for project cost and project duration. Application of project data in monitoring the project progress and in formulating remedial actions in response to unexpected occurrences.",
              },
              {
                code: "MGT 619",
                name: "Leading Across Projects",
                credits: 3,
                description:
                  "This course focuses on key leadership skills for addressing the complex challenges posed by program management, highly-matrixed environments and cross-national collaborations Its purpose is to enhance individuals' abilities to develop others, strategically integrate efforts across groups, and drive change. The concepts presented are theory and research driven so that participants can deepen their conceptual understanding. At the same time, the course calls upon learners to address real-life challenges they face as program and or director-level leaders. Each session presents effective techniques and uses experiential exercises or assignments to provide plenty of practice. The course also requires participants to further transfer learning to their workplaces through focused development planning and coaching support.",
              },
            ],
          },
          {
            title: "Artificial Intelligence",
            courses: [
              {
                code: "BIA 568",
                name: "Management of AI Technologies",
                credits: 3,
                description:
                  "Artificial Intelligence (AI) is an interdisciplinary field that draws on insights from computer science, engineering, mathematics, statistics, linguistics, psychology, and neuroscience to design agents that can perceive the environment and act upon it. This course surveys applications of artificial intelligence to business and technology in the digital era, including autonomous transportation, fraud detection, machine translation, meeting scheduling, and face recognition. In each application area, the course focuses on issues related to management of AI projects, including fairness, accountability, transparency, ethics, and the law.",
              },
              {
                code: "MIS 637",
                name: "Data Analytics and Machine Learning",
                credits: 3,
                description:
                  "This course will focus on Data Mining & Knowledge Discovery Algorithms and their applications in solving real world business and operation problems. We concentrate on demonstrating how discovering the hidden knowledge in corporate databases will help managers to make near-real time intelligent business and operation decisions. The course will begin with an introduction to Data Mining and Knowledge Discovery in Databases. Methodological and practical aspects of knowledge discovery algorithms including: Data Preprocessing, k-Nearest Neighborhood algorithm, Machine Learning and Decision Trees, Artificial Neural Networks, Clustering, and Algorithm Evaluation Techniques will be covered. Practical examples and case studies will be present throughout the course.",
              },
              {
                code: "BIA 662",
                name: "Augmented Intelligence and Generative AI",
                credits: 3,
                description:
                  "This course explores the area of cognitive computing and its implications for today's world of big data analytics and evidence-based decision making. Topics covered as part of this seminar include: cognitive computing design principles, natural language processing, knowledge representation, advanced analytics, as well as IBM's Watson DeepQA and Google's TensorFlow deep learning architectures. Students will have an opportunity to build cognitive applications, as well as explore how knowledge-based artificial intelligence and deep learning are impacting the field of data science.",
              },
              {
                code: "BIA 667",
                name: "Introduction to Deep Learning and Business Applications",
                credits: 3,
                description:
                  "This course introduces fundamentals of deep learning with a focus on business applications to students in the School of Business, who, mostly, are beginners of this field. It starts with basic constructs of neural networks and progresses into widely used models including convolutional neural networks, recurrent networks, generative models, and reinforcement learning. Extensive hands-on experiments are provided in class or as assignments for students to practice each model, understand its applicable scenarios, and build practical skills. In addition, various successful deep learning business applications will be studied in this class. Moreover, the potential implications and risks of applying deep learning in the business world will be discussed, and relevant techniques to address such issues will be provided. The objective of this course is to provide students the fundamental concepts of deep learning and to build students' practical skills of applying deep learning to solve real business problems. Prerequisite course required MIS 637 or equivalent and BIA 660.",
              },
            ],
          },
        ],
      },
      {
        id: "immersions",
        title: "Immersion",
        htmlContent: `
          <h4 class="course-section-header">IMMERSION</h4>
          
          <p class="text-stevens-base text-white leading-relaxed mb-stevens-lg">
            One of the most invaluable components of the Online MBA program at Stevens is that it provides the opportunity to participate in two in-person industry immersions. These immersive learning experiences take place over two long weekends and occur on the Stevens Institute of Technology campus, just across the Hudson River from New York City.
          </p>
          
          <p class="text-stevens-base text-white leading-relaxed mb-stevens-lg">
            The Online MBA immersions complement online learning by furthering students' connections and knowledge in real-world settings.
          </p>
          
          <h5 class="font-stevens-bold text-stevens-lg text-white mb-stevens-md mt-stevens-xl">Benefits:</h5>
          
          <ul class="space-y-stevens-sm mb-stevens-xl">
            <li class="flex items-start gap-stevens-sm">
              <div class="flex-shrink-0 w-2 h-2 bg-stevens-red rounded-full mt-2"></div>
              <span class="text-stevens-base text-white leading-relaxed">Meet your online MBA peers, as well as students from across other Stevens business programs.</span>
            </li>
            <li class="flex items-start gap-stevens-sm">
              <div class="flex-shrink-0 w-2 h-2 bg-stevens-red rounded-full mt-2"></div>
              <span class="text-stevens-base text-white leading-relaxed">Gain insights from industry leaders and business executives.</span>
            </li>
            <li class="flex items-start gap-stevens-sm">
              <div class="flex-shrink-0 w-2 h-2 bg-stevens-red rounded-full mt-2"></div>
              <span class="text-stevens-base text-white leading-relaxed">Engage face-to-face with School of Business faculty members and school administrators.</span>
            </li>
            <li class="flex items-start gap-stevens-sm">
              <div class="flex-shrink-0 w-2 h-2 bg-stevens-red rounded-full mt-2"></div>
              <span class="text-stevens-base text-white leading-relaxed">Leverage Stevens' location by participating in social and cultural experiences across New York City with fellow students.</span>
            </li>
          </ul>
          
          <h5 class="font-stevens-bold text-stevens-lg text-white mb-stevens-md mt-stevens-xl">Learning objectives:</h5>
          
          <ul class="space-y-stevens-sm mb-stevens-xl">
            <li class="flex items-start gap-stevens-sm">
              <div class="flex-shrink-0 w-2 h-2 bg-stevens-red rounded-full mt-2"></div>
              <span class="text-stevens-base text-white leading-relaxed">Gain a common understanding of the disruptive technologies at play in the "fourth industrial revolution" (4IR), such as artificial intelligence, quantum computing and internet of things.</span>
            </li>
            <li class="flex items-start gap-stevens-sm">
              <div class="flex-shrink-0 w-2 h-2 bg-stevens-red rounded-full mt-2"></div>
              <span class="text-stevens-base text-white leading-relaxed">Review illustrative ways in which these emerging technologies are impacting various sectors of the economy, from retail to healthcare.</span>
            </li>
            <li class="flex items-start gap-stevens-sm">
              <div class="flex-shrink-0 w-2 h-2 bg-stevens-red rounded-full mt-2"></div>
              <span class="text-stevens-base text-white leading-relaxed">Examine similarities and differences between the 4IR and prior periods of transformative change (e.g., earlier industrial revolutions).</span>
            </li>
            <li class="flex items-start gap-stevens-sm">
              <div class="flex-shrink-0 w-2 h-2 bg-stevens-red rounded-full mt-2"></div>
              <span class="text-stevens-base text-white leading-relaxed">Examine different philosophical orientations toward what these technologies mean for the future of work (e.g., job elimination vs. role augmentation).</span>
            </li>
            <li class="flex items-start gap-stevens-sm">
              <div class="flex-shrink-0 w-2 h-2 bg-stevens-red rounded-full mt-2"></div>
              <span class="text-stevens-base text-white leading-relaxed">Review the way in which these broader trends have impacted professional practice: key challenges being faced, anticipated challenges over next decade.</span>
            </li>
            <li class="flex items-start gap-stevens-sm">
              <div class="flex-shrink-0 w-2 h-2 bg-stevens-red rounded-full mt-2"></div>
              <span class="text-stevens-base text-white leading-relaxed">Explore the role that leaders can play in stewarding effective workforce transitions within their organizations (e.g., upskilling, reskilling and augmenting).</span>
            </li>
            <li class="flex items-start gap-stevens-sm">
              <div class="flex-shrink-0 w-2 h-2 bg-stevens-red rounded-full mt-2"></div>
              <span class="text-stevens-base text-white leading-relaxed">Review the ethical implications and challenges due to the rise of cognitive technologies, their implications on work, and the workplace and workforce.</span>
            </li>
          </ul>
          
          <div class="bg-white/10 border-l-4 border-stevens-red p-stevens-lg rounded-stevens-sm mt-stevens-xl">
            <p class="text-stevens-sm text-white leading-relaxed">
              Each immersion experience carries 1.5 credit hours and the related tuition. A total of 3 credit hours will count toward your degree upon completion of both immersions. Students are responsible for travel to the Hoboken area. Accommodations are included in the tuition cost.
            </p>
          </div>
        `,
      },
    ],
  },
  studentSpotlight: {
    name: "Olivia Fellbaum '25",
    quote:
      "The Online MBA has helped me gain a competitive edge because I go to school with so many different people who work in multiple industries, whether it's beauty, public health or government, and I think it has given me a sense of variety amongst the workforce and helped differentiate my network.",
    backgroundImage: "/assets/images/mba/6.webp",
    bgPosition: "center 60%",
    cardPosition: "right",
  },
  careerOutcomes: {
    title: "Career Outcomes",
    variant: "logos",
    leadText:
      "Lead with data, strategy, and innovation in technology-driven industries.",
    bullets: [
      {
        icon: "check",
        text: "Advance to executive roles like <strong>Senior Product Manager</strong>, <strong>Finance Director</strong>, and <strong>VP of Operations</strong>.",
      },
      {
        icon: "check",
        text: "Master <strong>analytics, strategy, and leadership</strong> skills valued across tech, finance, and consulting.",
      },
      {
        icon: "check",
        text: "Access the NYC metro's robust job market with strong alumni connections at <strong>top-tier companies</strong>.",
      },
      {
        icon: "trend",
        text: "Leverage the <strong>best MBA for technology</strong> in the region to stand out in a competitive market.",
      },
    ],
  },
  topCompanies: {
    title: "Top Companies Hiring Stevens Alumni",
    description:
      "Our graduates join leading organizations across technology, finance, healthcare, and consulting",
    companies: [
      {
        name: "Microsoft",
        logo: "/assets/company_logo/Microsoft_logo_(2012).svg.png",
        industry: "Technology",
      },
      {
        name: "Verizon",
        logo: "/assets/company_logo/Verizon_2024.svg.png",
        industry: "Telecommunications",
      },
      {
        name: "JPMorgan Chase",
        logo: "/assets/company_logo/Logo_of_JPMorganChase_2024.svg.png",
        industry: "Finance",
      },
      {
        name: "Amazon",
        logo: "/assets/company_logo/Amazon_logo.svg.webp",
        industry: "Technology",
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
    ],
  },
  admissions: {
    variant: "combinedWithTuition",
    requirements: `
      <div class="space-y-6">
        <div>
          <h4 class="font-stevens-headers font-bold text-stevens-lg mb-stevens-sm">ACADEMIC TRANSCRIPTS</h4>
          <p class="font-stevens-body">Applicants must submit transcripts from all undergraduate and graduate institutions where credit was earned. You may submit unofficial transcripts during the application process. After admission, you will be required to submit official transcripts.</p>
        </div>
        <div>
          <h4 class="font-stevens-headers font-bold text-stevens-lg mb-stevens-sm">PROFESSIONAL Résumé</h4>
          <p class="font-stevens-body mb-stevens-sm">Work experience is not a requirement for the Online MBA program, but the admissions committee does value applicants with professional experience. You must include a résumé with your application that highlights:</p>
          <ul class="list-disc pl-5 space-y-1"><li>Academic record</li><li>Work and internship experience</li><li>Leadership abilities</li><li>Professional aspirations</li></ul>
        </div>
        <div>
          <h4 class="font-stevens-headers font-bold text-stevens-lg mb-stevens-sm">LETTERS OF RECOMMENDATION</h4>
          <p class="font-stevens-body">Your application must include two letters of recommendation. The strongest applications will include one letter from a current supervisor, and one from a former supervisor or previous employer who can speak to your leadership potential and discuss your professional performance.</p>
        </div>
        <div>
          <h4 class="font-stevens-headers font-bold text-stevens-lg mb-stevens-sm">GMAT/GRE</h4>
          <p class="font-stevens-body">Scores are not required.</p>
        </div>
      </div>
    `,
  },
  keyDates: {
    term: KEY_DATES_SUMMER.TERM.name,
    rows: [
      { event: "Early Submit", date: KEY_DATES_SUMMER.EARLY_SUBMIT.date },
      { event: "Priority Submit", date: KEY_DATES_SUMMER.PRIORITY_SUBMIT.date },
      { event: "Final Submit", date: KEY_DATES_SUMMER.FINAL_SUBMIT.date },
      {
        event: "Start of Classes",
        date: KEY_DATES_SUMMER.START_OF_CLASSES.date,
      },
    ],
  },
  // Deadlines section data (for timeline display)
  deadlines: {
    term: KEY_DATES_SUMMER.TERM.nameUppercase,
    subtitle: "Plan your application for the upcoming term.",
    dates: [
      {
        label: "Early Submit",
        date: KEY_DATES_SUMMER.EARLY_SUBMIT.date,
        description:
          "Apply early for priority consideration and potential deposit waiver.",
      },
      {
        label: "Priority Submit",
        date: KEY_DATES_SUMMER.PRIORITY_SUBMIT.date,
        description: "Recommended deadline for best course selection.",
      },
      {
        label: "Final Submit",
        date: KEY_DATES_SUMMER.FINAL_SUBMIT.date,
        description: "Last day to submit your application.",
      },
      {
        label: "Start of Classes",
        date: KEY_DATES_SUMMER.START_OF_CLASSES.date,
        description: "Begin your Stevens Online MBA journey.",
      },
    ],
    footnote:
      "Students are encouraged to apply early for priority consideration. Rolling admissions may be available after the final deadline.",
  },
  tuition: {
    cards: [
      { value: "$1,395", label: "Per Credit" },
      { value: "$60", label: "Application Fee" },
      { value: "$250", label: "Enrollment Deposit" },
    ],
    description: `<p>Tuition based on Spring & Summer 2026 rates. Tuition and fees are subject to change annually.</p>`,
  },
  events: {
    title: "On-Demand Content",
    description:
      "At Stevens, we host a variety of events for prospective and current students covering topics such as application strategy, program information, the student experience and our online platform. Our on-demand content is instantly available, so you can watch at your convenience.",
    fallbackText: "Check back soon for more upcoming events.",
    items: [
      {
        title: "Student Voices: Real Stories From Stevens Graduate Programs",
        status: "Ongoing",
        length: "45 minutes",
        url: "https://event.on24.com/wcc/r/4970051/3D4408B63146F35B069766B71328D7CE",
      },
      {
        title: "Depth and Breadth: Exploring MBA Concentrations at Stevens",
        status: "Ongoing",
        length: "30 minutes",
        url: "https://event.on24.com/wcc/r/4970049/94A0379A4671307D3BD1329BF230A114",
      },
      {
        title: "Upskilling Your MBA: Bringing Technology and Business Together",
        status: "Ongoing",
        length: "30 minutes",
        url: "https://event.on24.com/wcc/r/4631559/8DACF3B1055C849FFDC65E94FFFA4C4A",
      },
      {
        title: "A Technology-Focused MBA With Stevens Online",
        status: "Ongoing",
        length: "30 minutes",
        url: "https://event.on24.com/wcc/r/4791542/DAB3D7D2D76CEC991DF5B0C71A91E4CF",
      },
      {
        title: "On Demand Application Overview: Online MBA",
        status: "Ongoing",
        length: "18 minutes",
        url: "https://event.on24.com/wcc/r/4670707/F1184BBC4542A137E5E8852AA0FF2DBE",
      },
      {
        title:
          "Exploring the Online MBA at Stevens Institute of Technology: On-Demand Overview",
        status: "Ongoing",
        length: "11 minutes",
        url: "https://event.on24.com/wcc/r/4670733/9A69E9F6E360B7E9F5C93DDFD5682712?pg=2",
      },
      {
        title: "Financial Aid Overview: Stevens Institute of Technology",
        status: "Ongoing",
        length: "10 minutes",
        url: "https://event.on24.com/wcc/r/5007787/EC42C1EA980050EB628E9A3DAD9BA2BB?pg=2",
      },
    ],
  },
  faculty: {
    title: "Meet the Online MBA Faculty",
    description:
      "Our faculty are experienced educators and active researchers who offer industry insights.",
    members: [
      {
        name: "Wei Zheng",
        title:
          "Associate Professor & Endowed Richard R. Roscitt Chair in Leadership",
        image:
          "/assets/avatars/mba-avatar/wei-zheng-stevens-faculty-737x1024.webp",
      },
      {
        name: "Brian Rothschild",
        title: "Online MBA Program Director",
        image:
          "/assets/avatars/mba-avatar/brian-rothschild-stevens-institute-omba-faculty.webp",
      },
      {
        name: "Pranav Garg",
        title: "Assistant Professor",
        image: "/assets/avatars/mba-avatar/pranav-garg-stevens-faculty.webp",
      },
      {
        name: "Peter Dominick",
        title: "Teaching Associate Professor",
        image:
          "/assets/avatars/mba-avatar/peter-dominick-stevents-faculty.webp",
      },
      {
        name: "Bei Yan",
        title: "Assistant Professor",
        image: "/assets/avatars/mba-avatar/bei-yan-stevens-faculty-1.webp",
      },
      {
        name: "Alkiviadis Vazacopoulos",
        title: "Teaching Associate Professor",
        image:
          "/assets/avatars/mba-avatar/alkiviadis-vazacopoulos-stevens-faculty-708x1024.webp",
      },
      {
        name: "Ann Murphy",
        title: "Associate Professor",
        image: "/assets/avatars/mba-avatar/ann-murphy-stevens-faculty.webp",
      },
    ],
  },
  // Application Option - singleImageCard variant (appears after faculty, before detailed admissions)
  applicationOption: {
    variant: "singleImageCard",
    title: "Application Option",
    backgroundImage: "/assets/images/mba/1-omba-hero-scaled.webp",
    options: [
      {
        title: "Accelerated Application",
        subtitle:
          "Fast-track your application with our new Accelerated App designed for busy professionals. The Accelerated App gets you started immediately:",
        theme: "light",
        featured: true,
        description: `<ul class="list-disc pl-5 space-y-2"><li><strong>Recommendation Letters:</strong> Not Required</li><li><strong>Proof of Bachelor's Degree:</strong> Upload copy of transcripts</li><li><strong>Professional Background:</strong> Upload your résumé or link your LinkedIn profile</li></ul>`,
        footnote:
          "Official transcripts will be due within 2 months of enrollment. Stevens may request additional documentation if needed.",
        buttonText: "Apply Now",
        url: "/accelerated-application/?program=mba",
      },
    ],
  },
  faqs: [
    {
      q: "What jobs can you get with an MBA?",
      a: "An MBA qualifies you for leadership positions in virtually every industry, such as financial or sales manager, and later in executive positions, such as CEO or CFO.",
    },
    {
      q: "Is an online MBA worth it?",
      a: "Yes. The Stevens Online MBA gives students an edge by developing their analytical and emotional intelligence skills and focusing on the complex technologies informing business decisions and strategy.",
    },
  ],

  accreditation: `Stevens Institute of Technology has been continually accredited by the <a href="https://www.msche.org/" target="_blank" rel="noopener noreferrer" class="text-stevens-white underline hover:text-stevens-light-gray0 transition-colors duration-stevens-normal">Middle States Commission on Higher Education (MSCHE)</a> since 1927. Stevens is accredited until 2027 and the next self-study evaluation is scheduled to take place during 2026-2027. The school of business is also accredited by the <a href="https://www.aacsb.edu/" target="_blank" rel="noopener noreferrer" class="text-stevens-white underline hover:text-stevens-red transition-colors duration-stevens-normal">AACSB</a>, placing Stevens among the five percent of business schools globally to earn this distinction.`,
};

export default function MBAPage() {
  usePageTracking({
    pageType: "program",
    programCode: "mba",
    additionalData: {
      program_name: "Master of Business Administration",
      has_video: true,
      has_rfi_modal: true,
    },
  });

  return (
    <PageContextProvider pageType="program" pageName="MBA">
      <ProgramContextProvider
        programCode="mba"
        programName="Master of Business Administration"
        programType="degree"
      >
        <DegreeTemplate programData={programData} theme="dark" />
      </ProgramContextProvider>
    </PageContextProvider>
  );
}
