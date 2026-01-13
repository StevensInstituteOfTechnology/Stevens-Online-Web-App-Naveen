import React from "react";
import { DegreeTemplate } from "../components/program-pages/templates";
import { Award, Check, Star } from "lucide-react";
import { createPageUrl } from "@/utils";
import { KEY_DATES } from "@/config/constants";
import { usePageTracking } from "@/hooks/analytics/usePageTracking";
import { ProgramContextProvider } from "@/contexts/analytics/ProgramContext";
import { PageContextProvider } from "@/contexts/analytics/PageContext";

const programData = {
  code: "mscs",
  seo: {
    title:
      "Online Master's in Computer Science | Stevens Institute of Technology",
    description:
      "Earn your online Master's in Computer Science (MSCS) from Stevens. Build advanced coding and AI skills for the modern tech workforce.",
    ogImage:
      "/assets/images/mscs/stv-blog-artificial-intelligence-and-innovation-in-engineering-management.webp",
    url: "/online-masters-computer-science-mscs/",
  },
  hero: {
    titleLines: [
      "Earn Your Master of Science in Computer Science (MSCS) Online",
      "Build What's Next.",
    ],
    subtitle: "AI/ML, data, systems-top-tier, flexible, industry-aligned.",
    bgImage:
      "/assets/images/mscs/stv-blog-artificial-intelligence-and-innovation-in-engineering-management.webp",
    primaryCta: { label: "Request Information", to: "RequestInfo" },
    secondaryCta: {
      label: "Apply In Minutes",
      href: "https://gradadmissions.stevens.edu/apply/?pk=GRNP",
    },
    badges: [
      { text: "99% Employment Rate", icon: Award },
      { text: "ASAP Application Available", icon: Check },
      // { text: "#1 in New Jersey", icon: Star }
    ],
  },
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
        labelAbove: KEY_DATES.PRIORITY_SUBMIT.date.split(" ")[0],
        value: KEY_DATES.PRIORITY_SUBMIT.date.split(" ")[1].replace(",", ""),
        subtext: `to start ${KEY_DATES.START_OF_CLASSES.date}`,
      },
      {
        value: "30",
        label: "Credits",
        subtext: "$875 per credit*",
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
      { value: "2 Yrs", label: "or Less" },
    ],

    // Simplified Card
    termStart: `${KEY_DATES.TERM.name}: Jan 20`,
    tuition: "Contact for Pricing",
    applyUrl: "#",

    // Legacy
    termStartDate: `${KEY_DATES.TERM.name}: ${KEY_DATES.START_OF_CLASSES.date}`,
  },
  overview: {
    programType: "Master of Science",
    headline: "Build software that shapes the future",
    tagline: "A career-aligned curriculum designed for real-world impact.",
    description: `
      <p class="font-medium text-lg">The Stevens Institute of Technology Master of Science in Computer Science (MSCS) offers industry-relevant coursework and focus areas tailored to your goals. We help you build the skills needed to excel in today's tech workforce.</p>
      <p class="font-medium text-lg mt-6">With our new <strong>ASAP application</strong>, you can bypass the standard application process and secure your spot in the program by successfully completing two trial courses.</p>
    `,
    keySkills: [
      "Software Engineering",
      "Cloud Computing",
      "Mobile Development",
      "Machine Learning",
      "Agile Methods",
      "Algorithm Design",
    ],
    concentrations: [
      "AI and Machine Learning",
      "Business Intelligence and Analytics",
      "Software Development",
    ],
  },
  rankings: [
    {
      ranking: "99%",
      description: "Employment",
      source:
        "99% of MSCS graduates in the Class of 2023 accepted job offers within three months of graduating.",
    },
    {
      ranking: "#1",
      description: "In N.J.",
      source:
        "U.S. News & World Report, Best Online Master’s in Computer Information Technology Programs (2024).",
    },
    {
      ranking: "7x",
      description: "Winner",
      source:
        "U.S. Distance Learning Association’s 21st Century Award for Best Practices in Distance Learning.",
    },
    {
      ranking: "#12",
      description: "For Best Career Placement",
      source:
        "Ranked No. 12 on The Princeton Review's 'Top 20 Best Career Placement' list (2025).",
    },
    {
      ranking: "#15",
      description: "For Best Value",
      source: "Payscale (2024)",
    },
  ],
  career: {
    description: `
      <p class="mb-4">An MSCS qualifies students for advanced, well-compensated positions as computer science managers and individual contributors specializing in areas like software engineering, machine learning and database management. The U.S. Bureau of Labor Statistics (BLS) forecasts much faster than average growth for such computer science roles as:</p>
      <ul class="mb-4 list-disc list-inside">
        <li>Software developers (17% growth in employment by 2033)</li>
        <li>Computer research scientists (26% growth in employment by 2033)¹</li>
      </ul>
      <p class="mb-4">The exceptional skill set MSCS graduates possess helps them secure premier tech jobs as computer scientists at companies such as Google and Meta, which can pay around $300,000.²</p>
      <p class="mb-4">Many remote work opportunities are available in computer science, but emerging tech hubs and traditional business hubs are also significant employers in the field. For instance, more than 119,000 software developers are employed in the New York City metropolitan area, where Stevens is located. Top tech hubs like San Francisco, San Jose and Seattle are home to leading employers - and offer average developer salaries as high as $211,450.³</p>
      <p>Our diverse curriculum and specialized offerings equip students with the sought-after skills needed to thrive in their chosen fields. This degree prepares graduates with skills in computer science, Python, Amazon Web Services, automation and software engineering and opens doors to other organizations outside of tech, such as Bank of America and JPMorgan Chase, both of which have employed Stevens MSCS alumni.</p>
    `,
    jobTitles: [
      { title: "Computer and Information Systems Manager", salary: "$171,200" },
      {
        title: "Computer and Information Research Scientist",
        salary: "$140,910",
      },
      { title: "Database Architect", salary: "$135,980" },
      { title: "Software Developer", salary: "$131,450" },
      { title: "Information Security Analyst", salary: "$124,910" },
      { title: "Computer Systems Analyst", salary: "$103,800" },
    ],
    source:
      "¹ U.S. Bureau of Labor Statistics, 2025. ² Glassdoor, April 2024. ³ U.S. Bureau of Labor Statistics, 2025.",
    topCompanies: ["Microsoft", "Google", "Amazon", "Meta", "IBM", "Apple"],
  },
  whatYoullLearn: {
    title: "Helping You Master Cutting-Edge Skills",
    description:
      'According to Lightcast\'s 2025 "The Speed of Skill Change" report, the pace of job skill change is accelerating, with AI leading this disruption more than any other trend. Among nearly 600 occupations assessed, computer scientists rank highest on the Skill Disruption Index, scoring 93.7. Our Online M.S. in Computer Science program can equip you with the expertise to lead in this dynamic environment.',
    modules: [
      {
        title: "Enterprise software design and engineering",
        description:
          "Students build a foundation in the architecture, development and deployment of complex software systems, with an emphasis on scalability, performance and systems-level thinking.",
        skills: [
          "Design and implement backend services for cloud-based, distributed systems",
          "Analyze and work with operating systems, memory management and I/O systems",
          "Apply database design principles using relational models, SQL and normalization techniques",
        ],
      },
      {
        title: "Mobile application development and cloud computing",
        description:
          "To support the explosive growth of mobile-first and cloud-integrated applications, students learn to develop applications that run across devices while leveraging scalable cloud infrastructure and services.",
        skills: [
          "Build mobile applications using platforms such as Android and iOS while exploring location-aware and privacy-conscious design",
          "Implement cloud-based services and architectures using REST, WebSockets and NoSQL databases like Cassandra",
          "Explore the implications of distributed systems through technologies like blockchain and the CAP Theorem",
        ],
      },
      {
        title: "Agile development methods",
        description:
          "Students develop the soft and technical skills necessary to thrive in agile environments, gaining experience in iterative development, team collaboration and real-world project execution.",
        skills: [
          "Apply agile frameworks like Scrum, XP and Lean to real-world software development projects",
          "Manage the full development lifecycle, from initial concept to deployment, using iterative and test-driven approaches",
          "Evaluate and compare agile and traditional methodologies to choose the most effective approach for a given project",
        ],
      },
      {
        title: "Algorithm design and testing",
        description:
          "A strong emphasis on computational thinking and problem-solving enables students to build efficient, scalable software. This forms the intellectual core for technical interviews and system design roles.",
        skills: [
          "Design and analyze advanced algorithms, including graph traversal, hashing and complex sorting",
          "Implement and test data structures like balanced search trees and understand asymptotic complexity",
          "Translate high-level design into low-level, performance-aware code using systems programming techniques",
        ],
      },
      {
        title:
          "Machine learning in support of providing software development leadership",
        description:
          "The program introduces machine learning as a tool for solving real-world problems, equipping students with the skills to lead software development projects that integrate intelligent systems.",
        skills: [
          "Understand and implement foundational ML techniques like decision trees, neural networks and reinforcement learning",
          "Apply ensemble learning methods and simulation techniques to build effective predictive models",
          "Translate ML theory into practical solutions through hands-on coding and real-world datasets",
        ],
      },
    ],
  },
  commonJobTitles: {
    title: "Prospective Occupations for Online MSCS Graduates",
    description:
      "Explore the diverse career opportunities available to graduates of our Online Master of Science in Computer Science program.",
    jobs: [
      {
        title: "Computer and Information Systems Manager",
        salary: 171200,
        description:
          "Plan, coordinate, and direct computer-related activities in an organization.",
      },
      {
        title: "Computer and Information Research Scientist",
        salary: 140910,
        description:
          "Invent and design new approaches to computing technology and find innovative uses for existing technology.",
      },
      {
        title: "Database Architect",
        salary: 135980,
        description:
          "Design and implement large-scale database systems and data management solutions.",
      },
      {
        title: "Software Developer",
        salary: 131450,
        description:
          "Design, develop, and maintain software applications and systems.",
      },
      {
        title: "Information Security Analyst",
        salary: 124910,
        description:
          "Plan and carry out security measures to protect an organization's computer networks and systems.",
      },
      {
        title: "Computer Systems Analyst",
        salary: 103800,
        description:
          "Study an organization's current computer systems and procedures and design information systems solutions.",
      },
    ],
    source: "U.S. Bureau of Labor Statistics, 2025.",
  },
  topCompanies: {
    title: "Stevens Alumni Drive Innovation at Top Companies",
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
        industry: "Technology",
      },
      {
        name: "Meta",
        logo: "/assets/company_logo/Meta_Platforms_Inc._logo.svg.png",
        industry: "Technology",
      },
      {
        name: "IBM",
        logo: "/assets/company_logo/IBM_logo.svg.png",
        industry: "Technology",
      },
      {
        name: "Apple",
        logo: "/assets/company_logo/Apple_logo_black.svg.png",
        industry: "Technology",
      },
    ],
  },
  whyStevens: {
    title: "Why Choose an Online MSCS from Stevens?",
    description: `
      <p>At Stevens, you'll receive an unparalleled computer science education, learning to innovate in a rapidly evolving tech landscape. Our cutting-edge curriculum is continuously updated, blending rigor, depth and real-world relevance to prepare you for what's new and next in the field.</p>
      <p>With renowned faculty and industry-aligned coursework, you'll develop the theoretical foundation and practical experience needed to excel. Plus, our ASAP application allows you to complete two trial courses before fully committing to the program, ensuring a perfect fit for your educational and career goals.</p>
    `,
  },
  curriculum: {
    description:
      "The MSCS program consists of 30 credit hours, with 10 courses, and is 100% online. The curriculum offers traditional and advanced tracks, with the first four courses in the Traditional track and the first two in the Advanced track delivered asynchronously. Students engage with current and emerging topics to develop skills as innovative software development leaders and proficient, high-quality coders. Additionally, students can specialize in high-demand areas through coursework in AI and machine learning, business intelligence and analytics, and software development.",
    variant: "degree",
    tabs: [
      {
        id: "traditional",
        title: "Traditional Coursework", 
        sections: [
          {
            title: "Term 1",
            courses: [
              {
                code: "CS 501",
                name: "Introduction to Java Programming",
                credits: 3,
                description:
                  "Introduces Java programming to students with little experience, covering fundamental concepts like program structure, Java syntax, data types, object-oriented programming, abstract classes, interfaces, control flow, exception handling, recursion, event-driven programming. Students will write, compile, and execute programs on arrays/strings, including graphical user interfaces.",
                note: "This is a foundational course to be taken by students who did not have the relevant background.",
              },
              {
                code: "CS 570",
                name: "Data Structures",
                credits: 3,
                description:
                  "Introduces common data structures and sorting algorithms using Java. Covers arrays, lists, stacks, queues, trees, priority queues, maps (e.g., hash tables). Principles include encapsulation, interfaces, testing, and asymptotic complexity analysis. Students implement and test programs using data structures with algorithms like insertion, selection, merge, and quick sort.",
                note: "This is a foundational course to be taken by students who did not have the relevant background.",
              },
            ],
          },
          {
            title: "Term 2",
            courses: [
              {
                code: "CS 590",
                name: "Algorithms",
                credits: 3,
                description:
                  'This course will provide focus on more complex data structures, and algorithm design and analysis, using one or more modern imperative language(s). Topics include advanced and/or balanced search trees, hashing, further asymptotic complexity analysis, standard algorithm design techniques, graph algorithms, complex sort algorithms and other "classic" algorithms that serve as examples of design techniques.',
              },
              {
                code: "CS 525",
                name: "Systems Programming",
                credits: 3,
                description:
                  "In this course, students will learn to develop complex system-level software in the C programming language while gaining an intimate understanding of the UNIX family of operating systems and their programming environment. Topics include the user/kernel interface, fundamental concepts of UNIX, user authentication, basic and advanced input/output (I/O), file systems, signals, process relationships and interprocess communication.",
              },
            ],
          },
          {
            title: "Term 3",
            courses: [
              {
                code: "CS 550",
                name: "Computer Organization & Programming",
                credits: 3,
                description:
                  "This course will provide an intensive introduction to material on computer organization and assembly language programming. Topics include structure of stored program computers; linking and loading; assembly language programming, with an emphasis on translation of high-level language constructs; data representation and arithmetic algorithms; basics of logic design; processor design; data path; hardwired control and microprogrammed control.",
              },
              {
                code: "CS 561",
                name: "Database Management Systems I",
                credits: 3,
                description:
                  "This course will provide an introduction to the design and querying of relational databases. Topics include relational schemas; keys and foreign key references; relational algebra (as an introduction to SQL); SQL in depth; Entity-Relationship (ER) database design; translating from ER models to relational schemas and from relational schemas to ER models; functional dependencies; and normalization.",
              },
            ],
          },
          {
            title: "Term 4",
            courses: [
              {
                code: "CS 520",
                name: "Introduction to Operating Systems",
                credits: 3,
                description:
                  "This course will focus on the use and internals of modern operating systems. Primary topics include the process concept; concurrency and how to program with threads; memory management techniques, including virtual memory and shared libraries; file system data structures and input/output (I/O).",
              },
              {
                code: "CS 546",
                name: "Web Programming",
                credits: 3,
                description:
                  "This course will provide students with a first approach to internet programming. It will give the basic knowledge on how the internet works and how to create advanced web sites by the use of script languages, after learning the basics of HTML. Students will learn how to create a complex global site through the creation of individual working modules.",
              },
            ],
          },
          {
            title: "Term 5",
            courses: [
              {
                code: "CS 522",
                name: "Mobile Systems and Applications",
                credits: 3,
                description:
                  "Personal computing is now mobile and cloud-based. This course reviews the fundamentals of mobile systems and applications, and how they relate to services in the cloud. The course will involve programming mobile apps using a popular mobile computing platform, such as Android or iPhone, to get hands-on experience with the concepts being discussed.",
              },
              {
                code: "CPE 595",
                name: "Applied Machine Learning",
                credits: 3,
                description:
                  "This is an introductory course for machine learning theory, algorithms and applications. Topics covered include decision tree learning, neural networks, Bayesian learning, reinforcement learning, ensembling multiple learning algorithms and various application problems. Students will simulate their algorithms and apply them to solve real-world problems.",
              },
            ],
          },
        ],
      },
      {
        id: "advanced",
        title: "Advanced Coursework", 
        sections: [
          {
            title: "Term 1",
            courses: [
              {
                code: "CS 590",
                name: "Algorithms",
                credits: 3,
                description:
                  'This course will provide focus on more complex data structures, and algorithm design and analysis. Topics include advanced and/or balanced search trees, hashing, further asymptotic complexity analysis, standard algorithm design techniques, graph algorithms, complex sort algorithms and other "classic" algorithms.',
              },
              {
                code: "CS 525",
                name: "Systems Programming",
                credits: 3,
                description:
                  "This course gives students a basic grounding in designing and implementing distributed and cloud systems. Topics include global consensus and Paxos, NoSQL stores, CAP Theorem, CALM Theorem, blockchain, REST, Websockets and stream processing. Combines hands-on experience with firm grounding in tools and principles for building distributed and cloud applications.",
              },
            ],
          },
          {
            title: "Term 2",
            courses: [
              {
                code: "CS 550",
                name: "Computer Organization & Programming",
                credits: 3,
                description:
                  "This course will provide an intensive introduction to material on computer organization and assembly language programming. Topics include structure of stored program computers; linking and loading; assembly language programming; data representation and arithmetic algorithms; basics of logic design; processor design; data path; hardwired control and microprogrammed control.",
              },
              {
                code: "CS 561",
                name: "Database Management Systems I",
                credits: 3,
                description:
                  "This course will provide an introduction to the design and querying of relational databases. Topics include relational schemas, keys and foreign key references, relational algebra, SQL in depth, Entity-Relationship (ER) database design, functional dependencies and normalization.",
              },
            ],
          },
          {
            title: "Term 3",
            courses: [
              {
                code: "CS 520",
                name: "Introduction to Operating Systems",
                credits: 3,
                description:
                  "This course will focus on the use and internals of modern operating systems. Primary topics include the process concept; concurrency and how to program with threads; memory management techniques, including virtual memory and shared libraries; file system data structures and input/output (I/O).",
              },
              {
                code: "CS 546",
                name: "Web Programming",
                credits: 3,
                description:
                  "Provides a first approach to internet programming, covering how the internet works, creating advanced websites using script languages after learning HTML basics. Students will learn to create complex global sites through individual working modules.",
              },
            ],
          },
          {
            title: "Term 4",
            courses: [
              {
                code: "CPE 595",
                name: "Applied Machine Learning",
                credits: 3,
                description:
                  "This is an introductory course for machine learning theory, algorithms and applications. Topics include decision tree learning, neural networks, Bayesian learning, reinforcement learning, ensembling multiple learning algorithms. Students will simulate algorithms and apply them to solve real-world problems.",
              },
              {
                code: "CS 522",
                name: "Mobile Systems and Applications",
                credits: 3,
                description:
                  "This course reviews the fundamentals of mobile systems and applications, and how they relate to services in the cloud. Topics include wireless communication, distributed systems, and security and privacy. Students will program mobile apps using Android or iPhone.",
              },
            ],
          },
          {
            title: "Term 5",
            courses: [
              {
                code: "CS 555",
                name: "Agile Methods for Software Development",
                credits: 3,
                description:
                  "This course examines agile methods, including Extreme Programming (XP), Scrum, Lean, Crystal, Dynamic Systems Development Method and Feature-Driven Development. Students will learn agile development principles and techniques covering the entire software development process from conception through deployment.",
              },
              {
                code: "CS 545",
                name: "Human Computer Interaction",
                credits: 3,
                description:
                  "This is an introduction to Human Computer Interaction (HCI). It covers basic concepts, principles, and frameworks in HCI; models of interaction; and design guidelines and methodologies. The course includes extensive readings and reports, as well as work on projects involving interface design and development.",
              },
            ],
          },
        ],
      },
      {
        id: "focusAreas",
        title: "Areas of Focus", 
        sections: [
          {
            title: "AI & Machine Learning",
            intro:
              "Depending on your background and your postgraduate aspirations, you may have the option to choose additional courses from in-demand areas of focus.",
            courses: [
              {
                code: "CS 556",
                name: "Mathematical Foundations of Machine Learning",
                credits: 3,
                description:
                  "This course provides a rigorous introduction to the foundations of machine learning, including frequently used tools in linear algebra, calculus, probability and widely applied methods such as linear regression and support vector machines. Includes hands-on training implementing these algorithms via Python.",
              },
              {
                code: "CS 559",
                name: "Machine Learning: Fundamentals and Applications",
                credits: 3,
                description:
                  "This course covers foundational principles that drive machine learning applications and practice implementing ML algorithms. Specific topics include supervised learning, unsupervised learning, neural networks and graphical models.",
              },
              {
                code: "CS 583",
                name: "Deep Learning",
                credits: 3,
                description:
                  "Deep learning (DL) is a family of the most powerful and popular machine learning methods with wide real-world applications such as face recognition, machine translation, self-driving cars, and recommender systems. Covers fundamental ML, computer vision, and natural language problems and DL tools.",
              },
              {
                code: "CS 584",
                name: "Natural Language Processing",
                credits: 3,
                description:
                  "NLP is one of the most important technologies in the era of information. This course provides an introduction to machine learning research applied to NLP, covering word vector representations, neural networks, RNNs, CNNs, semi-supervised models and reinforcement learning for NLP.",
              },
            ],
          },
          {
            title: "Business Intelligence & Analytics",
            courses: [
              {
                code: "BIA 500",
                name: "Business Analytics: Data, Models & Decisions",
                credits: 3,
                description:
                  "Business Analytics explores data-driven methods used to analyze and solve complex business problems. Topics include descriptive statistics, time-series analysis, regression models, decision analysis, Monte Carlo simulation, and optimization models.",
              },
              {
                code: "BIA 610",
                name: "Applied Analytics",
                credits: 3,
                description:
                  "Applied Analytics is a capstone course for the analytic-focused MBA program. It integrates previously taken courses by presenting a set of increasingly complex business problems that can be solved through analytic skills.",
              },
              {
                code: "BIA 662",
                name: "Augmented Intelligence and Generative AI",
                credits: 3,
                description:
                  "This course explores cognitive computing and its implications for big data analytics and evidence-based decision-making. Topics include cognitive computing design principles, natural language processing, knowledge representation, and advanced analytics.",
              },
              {
                code: "BIA 678",
                name: "Big Data Technologies",
                credits: 3,
                description:
                  "The field of Big Data utilizes classic techniques from business intelligence and analysis (BI&A) along with new tools and processes to deal with the volume, velocity, and variety associated with big data.",
              },
              {
                code: "BIA 660",
                name: "Web Mining",
                credits: 3,
                description:
                  "Students will learn through hands-on experience how to extract data from the web and analyze web-scale data using distributed computing. Learn different analysis methods widely used across internet companies.",
              },
            ],
          },
          {
            title: "Software Development",
            courses: [
              {
                code: "CS 522",
                name: "Mobile Systems and Applications",
                credits: 3,
                description:
                  "This course reviews the fundamentals of mobile systems and applications, and how they relate to services in the cloud. Students will program mobile apps using Android or iPhone.",
              },
              {
                code: "CS 546",
                name: "Web Programming",
                credits: 3,
                description:
                  "An introduction to internet programming. Covers how the internet works and how to create advanced websites using script languages after learning the basics of HTML.",
              },
              {
                code: "CS 554",
                name: "Web Programming II",
                credits: 3,
                description:
                  "Focuses on teaching students the newest technologies available in web programming. Topics include advanced client-side programming, responsive design, NoSQL databases, JQuery, AJAX, website security, and the latest frameworks.",
              },
              {
                code: "CS 574",
                name: "Object-Oriented Analysis and Design",
                credits: 3,
                description:
                  "Theory of object-oriented design, classes, interfaces, inheritance hierarchy, and correctness; abstract data types, encapsulation, formal specification with preconditions, postconditions and invariants.",
              },
              {
                code: "CS 526",
                name: "Enterprise & Cloud Computing",
                credits: 3,
                description:
                  "Covers the computing background for large-scale enterprise computing, including developing and deploying web and microservice applications in the cloud for both client-facing and B2B applications.",
              },
              {
                code: "CS 548",
                name: "Enterprise Software Architecture and Design",
                credits: 3,
                description:
                  "Covers issues in designing and engineering large enterprise and cloud-based software systems. Technologies such as Web Services and cloud computing provide platforms for building such systems.",
              },
              {
                code: "CS 555",
                name: "Agile Methods for Software Development",
                credits: 3,
                description:
                  "Examines agile methods, including Extreme Programming (XP), Scrum, Lean, Crystal, Dynamic Systems Development Method and Feature-Driven Development.",
              },
              {
                code: "CS 561",
                name: "Database Management Systems I",
                credits: 3,
                description:
                  "Introduces the design and querying of relational databases. Topics include relational schemas, keys and foreign key references, relational algebra, SQL in depth, Entity-Relationship (ER) database design.",
              },
            ],
          },
        ],
      },
    ],
  },
  studentSpotlight: {
    name: "Jaeson Valles ’22",
    quote:
      "It’s a highly ranked school for a master’s in computer science, and that prestige has landed me my current job, before I finished my degree.",
  },
  faculty: {
    description:
      "Our faculty includes National Science Foundation (NSF) CAREER winners as well as researchers who consult for companies such as Microsoft, IBM, Google, Bell Labs and other top industry firms.",
    members: [
      {
        name: "Shudong Hao",
        title: "Assoc. Chair for Graduate Studies",
        image: "/assets/avatars/mscs-avatar/Stevens-logo Small Scale.webp",
      },
      {
        name: "Reza Peyrovian",
        title: "Senior Lecturer",
        image: "/assets/avatars/mscs-avatar/Reza_Peyrovian.webp",
      },
      {
        name: "Patrick Hill",
        title: "Lecturer",
        image: "/assets/avatars/mscs-avatar/Patrick_Hill-768x768.webp",
      },
      {
        name: "Dominic Duggan",
        title: "Associate Professor",
        image:
          "/assets/avatars/mscs-avatar/dominic-duggan-online-mscs-stevens-faculty.webp",
      },
      {
        name: "Samuel Kim",
        title: "Teaching Professor",
        image: "/assets/avatars/mscs-avatar/Samuel_Kim.webp",
      },
    ],
  },
  admissions: {
    options: [
      {
        title: "Standard Application",
        featured: false,
        description: `<p>Complete the Standard application and submit the following for review:</p><ul class="list-disc pl-5 mt-2 space-y-1"><li>Bachelor’s degree</li><li>Two letters of recommendation</li><li>Statement of purpose</li><li>Academic transcripts</li><li>Résumé</li></ul>`,
        buttonText: "Apply Now",
        url: "https://gradadmissions.stevens.edu/apply/?pk=GRNP",
      },
      {
        title: "ASAP Application",
        featured: true,
        description: `<p>Enroll in two eight-week asynchronous courses and gain full admission to the program by earning a grade of “B” or better in each.</p><ul class="list-disc pl-5 mt-2 space-y-1"><li>Bachelor’s degree required</li><li>No letters of recommendation required</li></ul>`,
        buttonText: "Apply Now",
        url: createPageUrl("ASAP"),
      },
    ],
    consultation: {
      title: "Wondering Which Application Is Right for You?",
      buttonText: "Get In Touch",
      url: createPageUrl("RequestInfo"),
    },
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
      { value: "$1,395", label: "Per Credit (Standard)" },
      { value: "$875", label: "Per Credit (Async)*" },
      { value: "$60", label: "Application Fee" },
      { value: "$250", label: "Enrollment Deposit" },
    ],
    description: `<h3 class="font-stevens-headers font-bold text-stevens-xl mb-stevens-md">New for Spring & Summer 2026: Up to $13,120 off Tuition Through Grants and Scholarships</h3><p class="font-stevens-body">At Stevens, we’re committed to reducing the financial barriers to graduate education. That’s why we offer grant and scholarship programs designed to help you achieve your goals.</p><p class="font-stevens-body text-stevens-sm italic mt-stevens-sm">*The $875/credit rate applies to the first two asynchronous courses in the program.</p>`,
    grants: [
      {
        title: "Aspire Grant (for standard applicants)",
        description:
          "$3,120 in tuition support for the first two asynchronous courses.",
      },
      {
        title: "Pathway Grant (for ASAP applicants)",
        description:
          "$3,120 in tuition support for the first two asynchronous courses.",
      },
      {
        title: "Dean’s Merit Scholar Program",
        description:
          "Eligible students may qualify for scholarship support based on academic merit. Contact your enrollment advisor to learn more.",
      },
    ],
  },
  events: {
    title: "On-Demand Content",
    description:
      "At Stevens, we host a variety of events for prospective and current students covering topics such as application strategy, program information, the student experience and our online platform. Our on-demand content is instantly available, so you can watch at your convenience.",
    fallbackText: "Check back soon for more upcoming events.",
    items: [
      {
        title:
          "Exploring the Online M.S. in Computer Science at Stevens Institute of Technology",
        status: "Ongoing",
        length: "11 minutes",
        url: "https://event.on24.com/wcc/r/4455089/34FF45D9104354C225403F6B63A29F26",
      },
      {
        title: "Student Voices: Real Stories From Stevens Graduate Programs",
        status: "Ongoing",
        length: "45 minutes",
        url: "https://event.on24.com/wcc/r/4970051/3D4408B63146F35B069766B71328D7CE",
      },
      {
        title: "Start With Two Courses. Step Into Computer Science",
        status: "Ongoing",
        length: "30 minutes",
        url: "https://event.on24.com/wcc/r/4970040/A6ED251C21B790E2D79369BFB149380A",
      },
      {
        title: "Online M.S. in Computer Science: Areas of Focus",
        status: "Ongoing",
        length: "12 minutes",
        url: "https://event.on24.com/wcc/r/4894227/042446D9C5E18BF3F4D7CD9A7604B1EA",
      },
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
          "Exploring the Online M.S. in Computer Science at Stevens Institute of Technology",
        status: "Ongoing",
        length: "23 minutes",
        url: "https://event.on24.com/wcc/r/4455089/34FF45D9104354C225403F6B63A29F26?pg=2",
      },
    ],
  },
  faqs: [
    {
      q: "What is the ASAP application?",
      a: "The ASAP application enables prospective students to complete two eight-week asynchronous courses to gain full admission to the program, offering an alternative to the standard application process. Bachelor’s degree is required. By earning a grade of “B” or better in each course, you demonstrate your readiness for the program, and the credits you earn are applied toward your degree.",
    },
    {
      q: "Who should apply through the ASAP application?",
      a: "The ASAP application is ideal for students who may not meet traditional admission criteria but believe they can showcase their academic potential through coursework. Bachelor’s degree is required.",
    },
    {
      q: "What resources are available to ASAP students?",
      a: "As an ASAP student, you’ll have access to the same resources and support as fully admitted students. This includes academic advising, technical support and access to faculty to help ensure your success in the asynchronous courses.",
    },
  ],
  accreditation: `Stevens Institute of Technology has been continually accredited by the <a href="https://www.msche.org/" target="_blank" rel="noopener noreferrer" class="text-stevens-white underline hover:text-stevens-light-gray0 transition-colors duration-stevens-normal">Middle States Commission on Higher Education (MSCHE)</a> since 1927. Stevens is accredited until 2027 and the next self-study evaluation is scheduled to take place during 2026-2027.`,
};

export default function MSCSPage() {
  usePageTracking({
    pageType: "program",
    programCode: "mscs",
    additionalData: {
      program_name: "Master of Science in Computer Science",
      has_video: true,
      has_rfi_modal: true,
      has_application_modal: true,
    },
  });

  return (
    <PageContextProvider pageType="program" pageName="MSCS">
      <ProgramContextProvider 
        programCode="mscs"
        programName="Master of Science in Computer Science"
        programType="degree"
      >
        <DegreeTemplate programData={programData} useApplicationModal={true} />
      </ProgramContextProvider>
    </PageContextProvider>
  );
}
