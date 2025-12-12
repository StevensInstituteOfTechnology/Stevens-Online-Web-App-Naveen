
import React from 'react';
import ProgramPageTemplate from '../components/program-pages/ProgramPageTemplate';
import { Award, Check, Star } from 'lucide-react';
import { createPageUrl } from '@/utils';
import { KEY_DATES } from '@/config/constants';
import { usePageTracking } from '@/hooks/analytics/usePageTracking';
import { ProgramContextProvider } from '@/contexts/analytics/ProgramContext';
import { PageContextProvider } from '@/contexts/analytics/PageContext';

const programData = {
  code: 'mscs',
  seo: {
    title: "Online Master's in Computer Science | Stevens Institute of Technology",
    description: "Earn your online Master's in Computer Science (MSCS) from Stevens. Build advanced coding and AI skills for the modern tech workforce.",
    ogImage: '/assets/images/mscs/bg_program.webp',
    url: '/online-masters-computer-science-mscs/'
  },
  hero: {
    titleLines: ["Earn Your Master of Science in Computer Science (MSCS) Online", "Build What's Next."],
    subtitle: "AI/ML, data, systems-top-tier, flexible, industry-aligned.",
    bgImage: "/assets/images/mscs/bg_program.webp",
    primaryCta: { label: 'Request Information', to: 'RequestInfo' },
    secondaryCta: { label: 'Apply In Minutes', href: 'https://gradadmissions.stevens.edu/apply/?pk=GRNP' },
    badges: [
      { text: "99% Employment Rate", icon: Award },
      { text: "ASAP Application Available", icon: Check },
      // { text: "#1 in New Jersey", icon: Star }
    ]
  },
  quickFacts: {
    atAGlance: [
      { value: "99%", label: "Employment" },
      { value: "No CS", label: "Background Req." },
      { value: "Pivot", label: "Your Career" },
      { value: "In-Demand", label: "Focus Areas" },
    ],
    termStartDate: `${KEY_DATES.TERM.name}: ${KEY_DATES.START_OF_CLASSES.date}`,
    details: `
      <ul>
        <li>30 Credit Hours</li>
        <li>10 Courses</li>
        <li>100% Online</li>
        <li>2 Years or Less Completion Time*</li>
        <li>Two application options (standard and ASAP)</li>
      </ul>
      <p class="text-xs mt-2">*Total time to complete the program may vary based on the number of credits taken each semester.</p>
    `,
  },
  overview: {
    title: "Program Overview",
    description: `
      <p>The Stevens Institute of Technology Master of Science in Computer Science (MSCS) offers a career-aligned curriculum designed for real-world impact. Through industry-relevant coursework and focus areas tailored to your goals, we help you build the skills needed to excel in today’s tech workforce.</p>
      <p>With our new ASAP application, you can bypass the standard application process and secure your spot in the program by successfully completing two trial courses.</p>
    `,
    keySkills: [
      "Enterprise software design and engineering",
      "Mobile application development and cloud computing",
      "Agile development methods",
      "Algorithm design and testing",
      "Machine learning in support of providing software development leaders and high-quality coders"
    ],
    concentrations: [
      "AI and Machine Learning",
      "Business Intelligence and Analytics",
      "Software Development"
    ]
  },
  rankings: [
    { ranking: "99%", description: "Employment", source: "99% of MSCS graduates in the Class of 2023 accepted job offers within three months of graduating." },
    { ranking: "#1", description: "In N.J.", source: "U.S. News & World Report, Best Online Master’s in Computer Information Technology Programs (2024)." },
    { ranking: "7x", description: "Winner", source: "U.S. Distance Learning Association’s 21st Century Award for Best Practices in Distance Learning." },
    { ranking: "#12", description: "For Best Career Placement", source: "Ranked No. 12 on The Princeton Review's 'Top 20 Best Career Placement' list (2025)." },
    { ranking: "#15", description: "For Best Value", source: "Payscale (2024)" },
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
      { title: "Computer and Information Research Scientist", salary: "$140,910" },
      { title: "Database Architect", salary: "$135,980" },
      { title: "Software Developer", salary: "$131,450" },
      { title: "Information Security Analyst", salary: "$124,910" },
      { title: "Computer Systems Analyst", salary: "$103,800" }
    ],
    source: "¹ U.S. Bureau of Labor Statistics, 2025. ² Glassdoor, April 2024. ³ U.S. Bureau of Labor Statistics, 2025.",
    topCompanies: ["Microsoft", "Google", "Amazon", "Meta", "IBM", "Apple"]
  },
  whatYoullLearn: {
    title: "Helping You Master Cutting-Edge Skills",
    description: "According to Lightcast's 2025 \"The Speed of Skill Change\" report, the pace of job skill change is accelerating, with AI leading this disruption more than any other trend. Among nearly 600 occupations assessed, computer scientists rank highest on the Skill Disruption Index, scoring 93.7. Our Online M.S. in Computer Science program can equip you with the expertise to lead in this dynamic environment.",
    modules: [
      {
        title: "Enterprise software design and engineering",
        description: "Students build a foundation in the architecture, development and deployment of complex software systems, with an emphasis on scalability, performance and systems-level thinking.",
        skills: [
          "Design and implement backend services for cloud-based, distributed systems",
          "Analyze and work with operating systems, memory management and I/O systems",
          "Apply database design principles using relational models, SQL and normalization techniques"
        ]
      },
      {
        title: "Mobile application development and cloud computing",
        description: "To support the explosive growth of mobile-first and cloud-integrated applications, students learn to develop applications that run across devices while leveraging scalable cloud infrastructure and services.",
        skills: [
          "Build mobile applications using platforms such as Android and iOS while exploring location-aware and privacy-conscious design",
          "Implement cloud-based services and architectures using REST, WebSockets and NoSQL databases like Cassandra",
          "Explore the implications of distributed systems through technologies like blockchain and the CAP Theorem"
        ]
      },
      {
        title: "Agile development methods",
        description: "Students develop the soft and technical skills necessary to thrive in agile environments, gaining experience in iterative development, team collaboration and real-world project execution.",
        skills: [
          "Apply agile frameworks like Scrum, XP and Lean to real-world software development projects",
          "Manage the full development lifecycle, from initial concept to deployment, using iterative and test-driven approaches",
          "Evaluate and compare agile and traditional methodologies to choose the most effective approach for a given project"
        ]
      },
      {
        title: "Algorithm design and testing",
        description: "A strong emphasis on computational thinking and problem-solving enables students to build efficient, scalable software. This forms the intellectual core for technical interviews and system design roles.",
        skills: [
          "Design and analyze advanced algorithms, including graph traversal, hashing and complex sorting",
          "Implement and test data structures like balanced search trees and understand asymptotic complexity",
          "Translate high-level design into low-level, performance-aware code using systems programming techniques"
        ]
      },
      {
        title: "Machine learning in support of providing software development leadership",
        description: "The program introduces machine learning as a tool for solving real-world problems, equipping students with the skills to lead software development projects that integrate intelligent systems.",
        skills: [
          "Understand and implement foundational ML techniques like decision trees, neural networks and reinforcement learning",
          "Apply ensemble learning methods and simulation techniques to build effective predictive models",
          "Translate ML theory into practical solutions through hands-on coding and real-world datasets"
        ]
      }
    ]
  },
  commonJobTitles: {
    title: "Prospective Occupations for Online MSCS Graduates",
    description: "Explore the diverse career opportunities available to graduates of our Online Master of Science in Computer Science program.",
    jobs: [
      {
        title: "Computer and Information Systems Manager",
        salary: 171200,
        description: "Plan, coordinate, and direct computer-related activities in an organization."
      },
      {
        title: "Computer and Information Research Scientist",
        salary: 140910,
        description: "Invent and design new approaches to computing technology and find innovative uses for existing technology."
      },
      {
        title: "Database Architect",
        salary: 135980,
        description: "Design and implement large-scale database systems and data management solutions."
      },
      {
        title: "Software Developer",
        salary: 131450,
        description: "Design, develop, and maintain software applications and systems."
      },
      {
        title: "Information Security Analyst",
        salary: 124910,
        description: "Plan and carry out security measures to protect an organization's computer networks and systems."
      },
      {
        title: "Computer Systems Analyst",
        salary: 103800,
        description: "Study an organization's current computer systems and procedures and design information systems solutions."
      }
    ],
    source: "U.S. Bureau of Labor Statistics, 2025."
  },
  topCompanies: {
    title: "Stevens Alumni Drive Innovation at Top Companies",
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
        name: "Meta",
        logo: "/assets/company_logo/Meta_Platforms_Inc._logo.svg.png",
        industry: "Technology"
      },
      {
        name: "IBM",
        logo: "/assets/company_logo/IBM_logo.svg.png",
        industry: "Technology"
      },
      {
        name: "Apple",
        logo: "/assets/company_logo/Apple_logo_black.svg.png",
        industry: "Technology"
      }
    ]
  },
  whyStevens: {
    title: "Why Choose an Online MSCS from Stevens?",
    description: `
      <p>At Stevens, you'll receive an unparalleled computer science education, learning to innovate in a rapidly evolving tech landscape. Our cutting-edge curriculum is continuously updated, blending rigor, depth and real-world relevance to prepare you for what's new and next in the field.</p>
      <p>With renowned faculty and industry-aligned coursework, you'll develop the theoretical foundation and practical experience needed to excel. Plus, our ASAP application allows you to complete two trial courses before fully committing to the program, ensuring a perfect fit for your educational and career goals.</p>
    `
  },
  curriculum: {
    description: "The MSCS program consists of 30 credit hours, with 10 courses, and is 100% online. The curriculum offers traditional and advanced tracks, with the first four courses in the Traditional track and the first two in the Advanced track delivered asynchronously. Students engage with current and emerging topics to develop skills as innovative software development leaders and proficient, high-quality coders. Additionally, students can specialize in high-demand areas through coursework in AI and machine learning, business intelligence and analytics, and software development.",
    courseTabs: {
      traditional: { 
        title: "Traditional Coursework", 
        content: `
          <div class="space-y-stevens-lg">
            <div>
              <h4 class="course-section-header">Term 1</h4>
              <div class="space-y-stevens-md">
                <div class="course-item">
                  <button class="course-toggle" data-target="cs501">CS 501 Introduction to Java Programming (3)<span class="course-arrow">▼</span></button>
                  <div class="course-content hidden" id="cs501">
                    <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">Introduces Java programming to students with little experience, covering fundamental concepts like program structure, Java syntax, data types, object-oriented programming, abstract classes, interfaces, control flow, exception handling, recursion, event-driven programming. Students will write, compile, and execute programs on arrays/strings, including graphical user interfaces.</p>
                    <p class="text-stevens-sm text-stevens-gray-600 mt-stevens-sm italic">Note: This is a foundational course to be taken by students who did not have the relevant background.</p>
                  </div>
                </div>
                
                <div class="course-item">
                  <button class="course-toggle" data-target="cs570">CS 570 Data Structures (3)<span class="course-arrow">▼</span></button>
                  <div class="course-content hidden" id="cs570">
                    <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">Introduces common data structures and sorting algorithms using Java. Covers arrays, lists, stacks, queues, trees, priority queues, maps (e.g., hash tables). Principles include encapsulation, interfaces, testing, and asymptotic complexity analysis. Students implement and test programs using data structures with algorithms like insertion, selection, merge, and quick sort.</p>
                    <p class="text-stevens-sm text-stevens-gray-600 mt-stevens-sm italic">Note: This is a foundational course to be taken by students who did not have the relevant background.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 class="course-section-header">Term 2</h4>
              <div class="space-y-stevens-md">
                <div class="course-item">
                  <button class="course-toggle" data-target="cs590">CS 590 Algorithms (3)<span class="course-arrow">▼</span></button>
                  <div class="course-content hidden" id="cs590">
                    <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">This course will provide focus on more complex data structures, and algorithm design and analysis, using one or more modern imperative language(s). Topics include advanced and/or balanced search trees, hashing, further asymptotic complexity analysis, standard algorithm design techniques, graph algorithms, complex sort algorithms and other “classic” algorithms that serve as examples of design techniques.</p>
                  </div>
                </div>
                
                <div class="course-item">
                  <button class="course-toggle" data-target="cs525">CS 525 Systems Programming (3)<span class="course-arrow">▼</span></button>
                  <div class="course-content hidden" id="cs525">
                    <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">In this course, students will learn to develop complex system-level software in the C programming language while gaining an intimate understanding of the UNIX family of operating systems and their programming environment. Topics include the user/kernel interface, fundamental concepts of UNIX, user authentication, basic and advanced input/output (I/O), file systems, signals, process relationships and interprocess communication. Fundamental concepts of software development and maintenance on UNIX systems will also be covered.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 class="course-section-header">Term 3</h4>
              <div class="space-y-stevens-md">
                <div class="course-item">
                  <button class="course-toggle" data-target="cs550-trad">CS 550 Computer Organization & Programming (3)<span class="course-arrow">▼</span></button>
                  <div class="course-content hidden" id="cs550-trad">
                    <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">This course will provide an intensive introduction to material on computer organization and assembly language programming. Topics include structure of stored program computers; linking and loading; assembly language programming, with an emphasis on translation of high-level language constructs; data representation and arithmetic algorithms; basics of logic design; processor design; data path; hardwired control and microprogrammed control. Students will be given assembly language programming assignments on a regular basis.</p>
                  </div>
                </div>
                
                <div class="course-item">
                  <button class="course-toggle" data-target="cs561-trad">CS 561 Database Management Systems I (3)<span class="course-arrow">▼</span></button>
                  <div class="course-content hidden" id="cs561-trad">
                    <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">This course will provide an introduction to the design and querying of relational databases. Topics include relational schemas; keys and foreign key references; relational algebra (as an introduction to SQL); SQL in depth; Entity-Relationship (ER) database design; translating from ER models to relational schemas and from relational schemas to ER models; functional dependencies; and normalization.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 class="course-section-header">Term 4</h4>
              <div class="space-y-stevens-md">
                <div class="course-item">
                  <button class="course-toggle" data-target="cs520-trad">CS 520 Introduction to Operating Systems (3)<span class="course-arrow">▼</span></button>
                  <div class="course-content hidden" id="cs520-trad">
                    <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">This course will focus on the use and internals of modern operating systems. Primary topics include the process concept; concurrency and how to program with threads; memory management techniques, including virtual memory and shared libraries; file system data structures and input/output (I/O).</p>
                  </div>
                </div>
                
                <div class="course-item">
                  <button class="course-toggle" data-target="cs546-trad">CS 546 Web Programming (3)<span class="course-arrow">▼</span></button>
                  <div class="course-content hidden" id="cs546-trad">
                    <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">This course will provide students with a first approach to internet programming. It will give the basic knowledge on how the internet works and how to create advanced web sites by the use of script languages, after learning the basics of HTML. In this course, the student will learn how to create a complex global site through the creation of individual working modules, providing them the interpersonal skills required in business settings such as team building and cooperation.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 class="course-section-header">Term 5</h4>
              <div class="space-y-stevens-md">
                <div class="course-item">
                  <button class="course-toggle" data-target="cs522-trad">CS 522 Mobile Systems and Applications (3)<span class="course-arrow">▼</span></button>
                  <div class="course-content hidden" id="cs522-trad">
                    <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">Personal computing is now mobile and cloud-based. Disconnected mobile computing challenges many of the assumptions underlying much of today’s distributed systems. “Cloud computing” provides a powerful background computing facility for mobile devices, but also raises important issues of trust and privacy. Many of these issues arise in critical yet sensitive domains such as electronic healthcare delivery. Mobile computing applications are location-aware or context-aware; the privacy implications of these applications are profound. Mobile, and increasingly location aware, gaming systems are now one of the largest sectors of the world entertainment industry. The purpose of this course is to review the fundamentals of mobile systems and applications, and how they relate to services in the cloud. The course will review material from wireless communication, distributed systems, and security and privacy, as they pertain to the systems being studied. The course will involve programming mobile apps using a popular mobile computing platform, such as Android or iPhone, to get hands-on experience with the concepts being discussed in the class.</p>
                  </div>
                </div>
                
                <div class="course-item">
                  <button class="course-toggle" data-target="cpe595-trad">CPE 595 Applied Machine Learning (3)<span class="course-arrow">▼</span></button>
                  <div class="course-content hidden" id="cpe595-trad">
                    <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">This is an introductory course for machine learning theory, algorithms and applications. The content aims to provide students with the knowledge to understand key elements of how to design algorithms/systems that automatically learn, improve and accumulate knowledge with experience. Topics covered in this course include decision tree learning, neural networks, Bayesian learning, reinforcement learning, ensembling multiple learning algorithms and various application problems. Students will be provided opportunities to simulate their algorithms in a programming language and apply them to solve real-world problems. Cross-listed with: EE 595, AAI 595.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ` 
      },
      advanced: { 
        title: "Advanced Coursework", 
        content: `
          <div class="space-y-stevens-lg">
            <div>
              <h4 class="course-section-header">Term 1</h4>
              <div class="space-y-stevens-md">
                <div class="course-item">
                  <button class="course-toggle" data-target="cs590-adv">CS 590 Algorithms (3)<span class="course-arrow">▼</span></button>
                  <div class="course-content hidden" id="cs590-adv">
                    <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">This course will provide focus on more complex data structures, and algorithm design and analysis, using one or more modern imperative language(s). Topics include advanced and/or balanced search trees, hashing, further asymptotic complexity analysis, standard algorithm design techniques, graph algorithms, complex sort algorithms and other “classic” algorithms that serve as examples of design techniques.</p>
                  </div>
                </div>
                
                <div class="course-item">
                  <button class="course-toggle" data-target="cs525-adv">CS 525 Systems Programming (3)<span class="course-arrow">▼</span></button>
                  <div class="course-content hidden" id="cs525-adv">
                    <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">
The objective of this course is to give students a basic grounding in designing and implementing distributed and cloud systems, including issues in the implementation of backend services in the cloud itself. What are global consensus and Paxos, and what is their application in building cloud systems? What are the advantages and disadvantages of using distributed NoSQL stores such as Cassandra instead of relational stores such as MySQL? What are strong and weak consistency, what are the “CAP Theorem” and the “CALM Theorem” and what are their implications for building highly available services? What is a blockchain, such as the Bitcoin blockchain, and how does it relate to issues in coordinating distributed systems? What are the roles of REST, Websockets and stream processing in cloud applications? This course will combine hands-on experience in developing cloud services, with a firm grounding in the tools and principles for building distributed and cloud applications, including advanced architectures such as peer-to-peer and publish-subscribe. Besides cloud services, we will also be looking at cloud support for batch processing, such as the Hadoop framework, and its use with NoSQL data stores, such as Cassandra.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 class="course-section-header">Term 2</h4>
              <div class="space-y-stevens-md">
                <div class="course-item">
                  <button class="course-toggle" data-target="cs550-adv">CS 550 Computer Organization & Programming (3)<span class="course-arrow">▼</span></button>
                  <div class="course-content hidden" id="cs550-adv">
                    <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">This course will provide an intensive introduction to material on computer organization and assembly language programming. Topics include structure of stored program computers; linking and loading; assembly language programming, with an emphasis on translation of high-level language constructs; data representation and arithmetic algorithms; basics of logic design; processor design; data path; hardwired control and microprogrammed control. Students will be given assembly language programming assignments on a regular basis.</p>
                  </div>
                </div>
                
                <div class="course-item">
                  <button class="course-toggle" data-target="cs561-adv">CS 561 Database Management Systems I (3)<span class="course-arrow">▼</span></button>
                  <div class="course-content hidden" id="cs561-adv">
                    <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">This course will provide an introduction to the design and querying of relational databases. Topics include relational schemas, keys and foreign key references, relational algebra (as an introduction to SQL), SQL in depth, Entity-Relationship (ER) database design, translating from ER models to relational schemas and from relational schemas to ER models, functional dependencies and normalization.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 class="course-section-header">Term 3</h4>
              <div class="space-y-stevens-md">
                <div class="course-item">
                  <button class="course-toggle" data-target="cs520-adv">CS 520 Introduction to Operating Systems (3)<span class="course-arrow">▼</span></button>
                  <div class="course-content hidden" id="cs520-adv">
                    <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">This course will focus on the use and internals of modern operating systems. Primary topics include the process concept; concurrency and how to program with threads; memory management techniques, including virtual memory and shared libraries; file system data structures and input/output (I/O).</p>
                  </div>
                </div>
                
                <div class="course-item">
                  <button class="course-toggle" data-target="cs546-adv">CS 546 Web Programming (3)<span class="course-arrow">▼</span></button>
                  <div class="course-content hidden" id="cs546-adv">
                    <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">Provides a first approach to internet programming, covering how the internet works, creating advanced websites using script languages after learning HTML basics. Students will learn to create complex global sites through individual working modules, fostering interpersonal skills for business settings like team building and cooperation.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 class="course-section-header">Term 4</h4>
              <div class="space-y-stevens-md">
                <div class="course-item">
                  <button class="course-toggle" data-target="cpe595-adv">CPE 595 Applied Machine Learning (3)<span class="course-arrow">▼</span></button>
                  <div class="course-content hidden" id="cpe595-adv">
                    <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">This is an introductory course for machine learning theory, algorithms and applications. The content aims to provide students with the knowledge to understand key elements of how to design algorithms/systems that automatically learn, improve and accumulate knowledge with experience. Topics covered in this course include decision tree learning, neural networks, Bayesian learning, reinforcement learning, ensembling multiple learning algorithms and various application problems. Students will be provided opportunities to simulate their algorithms in a programming language and apply them to solve real-world problems. Cross-listed with: EE 595, AAI 595.</p>
                  </div>
                </div>
                
                <div class="course-item">
                  <button class="course-toggle" data-target="cs522-adv">CS 522 Mobile Systems and Applications (3)<span class="course-arrow">▼</span></button>
                  <div class="course-content hidden" id="cs522-adv">
                    <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">Personal computing is now mobile and cloud-based. Disconnected mobile computing challenges many of the assumptions underlying much of today’s distributed systems. “Cloud computing” provides a powerful background computing facility for mobile devices, but also raises important issues of trust and privacy. Many of these issues arise in critical yet sensitive domains such as electronic healthcare delivery. Mobile computing applications are location-aware or context-aware; the privacy implications of these applications are profound. Mobile, and increasingly location aware, gaming systems are now one of the largest sectors of the world entertainment industry. The purpose of this course is to review the fundamentals of mobile systems and applications, and how they relate to services in the cloud. The course will review material from wireless communication, distributed systems, and security and privacy, as they pertain to the systems being studied. The course will involve programming mobile apps using a popular mobile computing platform, such as Android or iPhone, to get hands-on experience with the concepts being discussed in the class.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 class="course-section-header">Term 5</h4>
              <div class="space-y-stevens-md">
                <div class="course-item">
                  <button class="course-toggle" data-target="cs555-adv">CS 555 Agile Methods for Software Development (3)<span class="course-arrow">▼</span></button>
                  <div class="course-content hidden" id="cs555-adv">
                    <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">In software problem areas that require exploratory development efforts, those with complex requirements and high levels of change, agile software development practices are highly effective when deployed in a collaborative, people-centered organizational culture. This course examines agile methods, including Extreme Programming (XP), Scrum, Lean, Crystal, Dynamic Systems Development Method and Feature-Driven Development to understand how rapid realization of software occurs most effectively. The ability of agile development teams to rapidly develop high quality, customer-valued software is examined and contrasted with teams following more traditional methodologies that emphasize planning and documentation. Students will learn agile development principles and techniques covering the entire software development process from problem conception through development, testing and deployment, and will be able to effectively participate in and manage agile software developments as a result of their successfully completing this course. Case studies and software development projects are used throughout.</p>
                  </div>
                </div>
                
                <div class="course-item">
                  <button class="course-toggle" data-target="cs545-adv">CS 545 Human Computer Interaction (3)<span class="course-arrow">▼</span></button>
                  <div class="course-content hidden" id="cs545-adv">
                    <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">This is an introduction to Human Computer Interaction (HCI). It covers basic concepts, principles, and frameworks in HCI; models of interaction; and design guidelines and methodologies. The course includes extensive readings and reports, as well as work on projects involving interface design and development.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ` 
      },
      focusAreas: { 
        title: "Areas of Focus", 
        content: `
          <p class="course-intro">Depending on your background and your postgraduate aspirations, you may have the option to choose additional courses from three in-demand areas of focus to develop additional professional expertise: AI and machine learning, business intelligence and analytics, and software development. A sample of available courses is below.</p>
          
          <div class="space-y-stevens-xl">
            <div>
              <h4 class="font-stevens-bold text-stevens-xl text-stevens-primary mb-stevens-lg">AI & Machine Learning</h4>
              <div class="space-y-stevens-md">
                <div class="course-item">
                  <button class="course-toggle" data-target="cs556">CS 556 Mathematical Foundations of Machine Learning (3)<span class="course-arrow">▼</span></button>
                  <div class="course-content hidden" id="cs556">
                    <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">This course will give students a rigorous introduction to the foundations of machine learning, including but not limited to frequently used tools in linear algebra, calculus, probability and widely applied methods such as linear regression and support vector machines. In addition, this course provides hands-on training on implementing these algorithms via Python from scratch. Students will be trained to use popular Python libraries such as Numpy, Scipy and Matplotlib.</p>
                  </div>
                </div>
                
                <div class="course-item">
                  <button class="course-toggle" data-target="cs559">CS 559 Machine Learning: Fundamentals and Applications (3)<span class="course-arrow">▼</span></button>
                  <div class="course-content hidden" id="cs559">
                    <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">In this course, we will talk about the foundational principles that drive machine learning applications and practice implementing machine learning algorithms. Specific topics include supervised learning, unsupervised learning, neural networks and graphical models. The main goal of the course is to equip you with the tools to tackle new ML problems you might encounter in life.</p>
                  </div>
                </div>
                
                <div class="course-item">
                  <button class="course-toggle" data-target="cs583">CS 583 Deep Learning (3)<span class="course-arrow">▼</span></button>
                  <div class="course-content hidden" id="cs583">
                    <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">Deep learning (DL) is a family of the most powerful and popular machine learning (ML) methods and has wide real-world applications such as face recognition, machine translation, self-driving cars, recommender systems, and playing the Go game, etc. This course is designed for students either with or without an ML background. The course will cover fundamental ML, computer vision, and natural language problems and DL tools for solving the problems. The students will be able to use DL methods for solving real-world ML problems. The homework is mostly implementation and programming using the Python language and popular DL frameworks such as TensorFlow and Keras. Knowledge and skills in Python programming and linear algebra are strictly required. Probability theory, statistics, and numerical analysis are recommended but not required. Knowledge in machine learning and artificial intelligence is helpful but unnecessary.</p>
                  </div>
                </div>
                
                <div class="course-item">
                  <button class="course-toggle" data-target="cs584">CS 584 Natural Language Processing (3)<span class="course-arrow">▼</span></button>
                  <div class="course-content hidden" id="cs584">
                    <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">Natural language processing (NLP) is one of the most important technologies in the era of information. Comprehending human language is also a crucial and challenging part of artificial intelligence. People communicate almost everything in language: conferences, emails, customer service, language translation, web searches, reports and so on. There is a large variety of underlying tasks and machine learning models behind NLP applications. Recently, deep learning approaches have achieved high performance in many different NLP tasks. Instead of traditional and task-specific feature engineering, deep learning can solve tasks with single end-to-end models. The course provides an introduction to machine learning research applied to NLP. We will cover topics including word vector representations, neural networks, recurrent neural networks, convolutional neural networks, semi-supervised models and reinforcement learning for NLP, as well as some attention-based models.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 class="font-stevens-bold text-stevens-xl text-stevens-primary mb-stevens-lg">Business Intelligence & Analytics</h4>
              <div class="space-y-stevens-md">
                <div class="course-item">
                  <button class="course-toggle" data-target="bia500">BIA 500 Business Analytics: Data, Models & Decisions (3)<span class="course-arrow">▼</span></button>
                  <div class="course-content hidden" id="bia500">
                    <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">Many managerial decisions - regardless of their functional orientation - are increasingly based on analysis using quantitative models from the discipline of management science. Management science tools, techniques and concepts (e.g., data, models and software programs) have dramatically changed the way businesses operate in manufacturing, service operations, marketing, transportation and finance. Business Analytics explores data-driven methods that are used to analyze and solve complex business problems. Students will acquire analytical skills in building, applying and evaluating various models with hands-on computer applications. Topics include descriptive statistics, time-series analysis, regression models, decision analysis, Monte Carlo simulation, and optimization models.</p>
                  </div>
                </div>
                
                <div class="course-item">
                  <button class="course-toggle" data-target="bia610">BIA 610 Applied Analytics (3)<span class="course-arrow">▼</span></button>
                  <div class="course-content hidden" id="bia610">
                    <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">Applied Analytics is a capstone course for the analytic-focused MBA program. It is intended to integrate all previously taken courses in the program by presenting a set of increasingly complex business problems. These problems can be solved through analytic skills taught in this and previous courses. In particular, the course is intended to reinforce the understanding of analysis as a way to build models that can focus attention on parts of the system that can be improved through intervention. The early part of the course uses synthetic data and empirical data readily available for analysis. The second part of the course encourages students to state and solve their own problem, gathering their own data as a part of the analytic process.</p>
                  </div>
                </div>
                
                <div class="course-item">
                  <button class="course-toggle" data-target="bia662">BIA 662 Augmented Intelligence and Generative AI (3)<span class="course-arrow">▼</span></button>
                  <div class="course-content hidden" id="bia662">
                    <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">This course explores the area of cognitive computing and its implications for today’s world of big data analytics and evidence-based decision-making. Topics covered as part of this seminar include cognitive computing design principles, natural language processing, knowledge representation, advanced analytics, as well as IBM’s Watson DeepQA and Google’s TensorFlow deep learning architectures. Students will have an opportunity to build cognitive applications as well as explore how knowledge-based artificial intelligence and deep learning are impacting the field of data science.</p>
                  </div>
                </div>
                
                <div class="course-item">
                  <button class="course-toggle" data-target="bia678">BIA 678 Big Data Technologies (3)<span class="course-arrow">▼</span></button>
                  <div class="course-content hidden" id="bia678">
                    <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">The field of Big Data is emerging as one of the transformative business processes of recent times. It utilizes classic techniques from business intelligence and analysis (BI&A) along with new tools and processes to deal with the volume, velocity, and variety associated with big data. As they enter the workforce, a significant percentage of BIA students will be directly involved with big data as technologists, managers, or users. This course will build on their understanding of the basic concepts of BI&A to provide them with the background to succeed in the evolving data-centric world, not only from the point of view of the technologies required but also in terms of management, governance, and organization. Students taking the course will be expected to have some background in areas such as multivariate statistics, data mining, data management, and programming.</p>
                  </div>
                </div>
                
                <div class="course-item">
                  <button class="course-toggle" data-target="bia660">BIA 660 Web Mining (3)<span class="course-arrow">▼</span></button>
                  <div class="course-content hidden" id="bia660">
                    <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">In this course, students will learn through hands-on experience how to extract data from the web and analyze web-scale data using distributed computing. Students will learn different analysis methods that are widely used across the range of internet companies, from start-ups to online giants like Amazon or Google. At the end of the course, students will apply these methods to answer a real scientific question or to create a useful web application.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 class="font-stevens-bold text-stevens-xl text-stevens-primary mb-stevens-lg">Software Development</h4>
              <div class="space-y-stevens-md">
                <div class="course-item">
                  <button class="course-toggle" data-target="cs522-focus">CS 522 Mobile Systems and Applications (3)<span class="course-arrow">▼</span></button>
                  <div class="course-content hidden" id="cs522-focus">
                    <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">Personal computing is now mobile and cloud-based. Disconnected mobile computing challenges many of the assumptions underlying much of today’s distributed systems. Cloud computing provides a powerful background computing facility for mobile devices but also raises important issues of trust and privacy. Many of these issues arise in critical yet sensitive domains such as electronic healthcare delivery. Mobile computing applications are location-aware or context-aware; the privacy implications of these applications are profound. Mobile and, increasingly, location-aware gaming systems are now one of the largest sectors of the world entertainment industry. The purpose of this course is to review the fundamentals of mobile systems and applications and how they relate to services in the cloud. The course will review material from wireless communication, distributed systems, and security and privacy as they pertain to the systems being studied. The course will involve programming mobile apps using a popular mobile computing platform, such as Android or iPhone, to get hands-on experience with the concepts being discussed in the class. Programming experience with Java or C# is required.</p>
                  </div>
                </div>
                
                <div class="course-item">
                  <button class="course-toggle" data-target="cs546-focus">CS 546 Web Programming (3)<span class="course-arrow">▼</span></button>
                  <div class="course-content hidden" id="cs546-focus">
                    <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">This course will provide students with an introduction to internet programming. It will cover the basic knowledge of how the internet works and how to create advanced websites using script languages after learning the basics of HTML. The course will teach students how to build a complex global site through the creation of individual working modules, helping them develop the skills required in any business, such as proper teamwork and coordination between groups.</p>
                  </div>
                </div>
                
                <div class="course-item">
                  <button class="course-toggle" data-target="cs554">CS 554 Web Programming II (3)<span class="course-arrow">▼</span></button>
                  <div class="course-content hidden" id="cs554">
                    <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">This course focuses on teaching students the newest technologies available in web programming. Topics include advanced client-side programming, responsive design, NoSQL databases, JQuery, AJAX, website security, and the latest frameworks. Students will be given the opportunity to suggest topics they would like to explore at the end of the semester. The course is very hands-on, where everything taught will be practiced through in-class exercises.</p>
                  </div>
                </div>
                
                <div class="course-item">
                  <button class="course-toggle" data-target="cs574">CS 574 Object-Oriented Analysis and Design (3)<span class="course-arrow">▼</span></button>
                  <div class="course-content hidden" id="cs574">
                    <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">Theory of object-oriented design, classes, interfaces, inheritance hierarchy, and correctness; abstract data types, encapsulation, formal specification with preconditions, postconditions and invariants, and proofs of correctness; object-oriented software, objects and classes, genericity, inheritance, polymorphism, and overloading; single and multiple inheritance, programming by contract, subclassing as subcontract, specification, and verification; programming language examples include C+ +, Java, Smalltalk, and Eiffel.</p>
                  </div>
                </div>
                
                <div class="course-item">
                  <button class="course-toggle" data-target="cs526">CS 526 Enterprise & Cloud Computing (3)<span class="course-arrow">▼</span></button>
                  <div class="course-content hidden" id="cs526">
                    <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">This course covers the computing background for large-scale enterprise computing, including the outsourcing of computing to the cloud. The course includes developing and deploying web and microservice applications in the cloud for both client-facing and B2B applications. The course also considers cloud support for enterprise integration and Internet of Things, and NoSQL data stores such as CosmosDB. Finally, the course considers virtualization and its role in the cloud, including security in virtualization. Cloud computing: SaaS and PaaS (e.g., Azure App Service). Web applications in the cloud: ASP.NET MVC. Enterprise Web services: gRPC and Web API. Serverless applications and microservices. Gathering and processing data using NoSQL data stores, e.g., CosmosDB. Enterprise blockchain: Azure Confidential Ledger and Quorum Blockchain Service. Virtualization as the basis for scalable enterprise and cloud computing: Xen, KVM, z/VM. Secure virtualization, e.g., Security Enhanced Linux (SELinux). Programming experience with Java or C# is required.</p>
                  </div>
                </div>
                
                <div class="course-item">
                  <button class="course-toggle" data-target="cs548">CS 548 Enterprise Software Architecture and Design (3)<span class="course-arrow">▼</span></button>
                  <div class="course-content hidden" id="cs548">
                    <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">This course covers the issues in designing and engineering large enterprise and cloud-based software systems. Such systems are distributed and require increasingly complex inter-enterprise as well as intra-enterprise coordination. Technologies such as Web Services and cloud computing provide platforms for building such systems, and architectures such as microservices and cloud-native applications, event-driven architecture (EDA), domain-driven design (DDD), representational state transfer (REST), command query responsibility segregation (CQRS), serverless and blockchain are idioms for structuring such systems. Data modeling includes E-R designs, XML and JSON Schemas, NoSQL data models, semantic data modeling (OWL), and object-relational mapping (ORM). Process modeling includes BPMN, Workflow and Petri nets. The course includes hands-on application of the concepts with tools such as Jakarta EE and Eclipse MicroProfile, Docker, Kubernetes and Kafka, and Hyperledger Fabric. Knowledge of Java or C# is required.</p>
                  </div>
                </div>
                
                <div class="course-item">
                  <button class="course-toggle" data-target="cs555-focus">CS 555 Agile Methods for Software Development (3)<span class="course-arrow">▼</span></button>
                  <div class="course-content hidden" id="cs555-focus">
                    <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">In software problem areas that require exploratory development efforts, those with complex requirements and high levels of change, agile software development practices are highly effective when deployed in a collaborative, people-centered organizational culture. This course examines agile methods, including Extreme Programming (XP), Scrum, Lean, Crystal, Dynamic Systems Development Method and Feature-Driven Development to understand how rapid realization of software occurs most effectively. The ability of agile development teams to rapidly develop high quality, customer-valued software is examined and contrasted with teams following more traditional methodologies that emphasize planning and documentation. Students will learn agile development principles and techniques covering the entire software development process from problem conception through development, testing and deployment, and will be able to effectively participate in and manage agile software developments as a result of their successfully completing this course. Case studies and software development projects are used throughout.</p>
                  </div>
                </div>
                
                <div class="course-item">
                  <button class="course-toggle" data-target="cs561-focus">CS 561 Database Management Systems I (3)<span class="course-arrow">▼</span></button>
                  <div class="course-content hidden" id="cs561-focus">
                    <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">This course introduces the design and querying of relational databases. Topics include relational schemas, keys and foreign key references, relational algebra, SQL in depth, Entity-Relationship (ER) database design, translating from ER models to relational schemas, functional dependencies and normalization.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ` 
      }
    }
  },
  studentSpotlight: {
    name: "Jaeson Valles ’22",
    quote: "It’s a highly ranked school for a master’s in computer science, and that prestige has landed me my current job, before I finished my degree."
  },
  faculty: {
    description: "Our faculty includes National Science Foundation (NSF) CAREER winners as well as researchers who consult for companies such as Microsoft, IBM, Google, Bell Labs and other top industry firms.",
    members: [
      { name: "Shudong Hao", title: "Assoc. Chair for Graduate Studies", image: "/assets/avatars/mscs-avatar/Stevens-logo Small Scale.webp" },
      { name: "Reza Peyrovian", title: "Senior Lecturer", image: "/assets/avatars/mscs-avatar/Reza_Peyrovian.webp" },
      { name: "Patrick Hill", title: "Lecturer", image: "/assets/avatars/mscs-avatar/Patrick_Hill-768x768.webp" },
      { name: "Dominic Duggan", title: "Associate Professor", image: "/assets/avatars/mscs-avatar/dominic-duggan-online-mscs-stevens-faculty.webp" },
      { name: "Samuel Kim", title: "Teaching Professor", image: "/assets/avatars/mscs-avatar/Samuel_Kim.webp" },
    ]
  },
  admissions: {
    options: [
      { title: "Standard Application", featured: false, description: `<p>Complete the Standard application and submit the following for review:</p><ul class="list-disc pl-5 mt-2 space-y-1"><li>Bachelor’s degree</li><li>Two letters of recommendation</li><li>Statement of purpose</li><li>Academic transcripts</li><li>Résumé</li></ul>`, buttonText: "Apply Now", url: "https://gradadmissions.stevens.edu/apply/?pk=GRNP" },
      { title: "ASAP Application", featured: true, description: `<p>Enroll in two eight-week asynchronous courses and gain full admission to the program by earning a grade of “B” or better in each.</p><ul class="list-disc pl-5 mt-2 space-y-1"><li>Bachelor’s degree required</li><li>No letters of recommendation required</li></ul>`, buttonText: "Apply Now", url: createPageUrl('ASAP') }
    ],
    consultation: { title: "Wondering Which Application Is Right for You?", buttonText: "Get In Touch", url: createPageUrl('RequestInfo') }
  },
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
  tuition: {
    cards: [
      { value: "$1,395", label: "Per Credit (Standard)" },
      { value: "$875", label: "Per Credit (Async)*" },
      { value: "$60", label: "Application Fee" },
      { value: "$250", label: "Enrollment Deposit" }
    ],
    description: `<h3 class="font-bold text-xl mb-4">New for Spring & Summer 2026: Up to $13,120 off Tuition Through Grants and Scholarships</h3><p>At Stevens, we’re committed to reducing the financial barriers to graduate education. That’s why we offer grant and scholarship programs designed to help you achieve your goals.</p><p class="text-sm italic mt-2">*The $875/credit rate applies to the first two asynchronous courses in the program.</p>`,
    grants: [
        { title: "Aspire Grant (for standard applicants)", description: "$3,120 in tuition support for the first two asynchronous courses." },
        { title: "Pathway Grant (for ASAP applicants)", description: "$3,120 in tuition support for the first two asynchronous courses." },
        { title: "Dean’s Merit Scholar Program", description: "Eligible students may qualify for scholarship support based on academic merit. Contact your enrollment advisor to learn more." }
    ]
  },
  events: {
    title: "On-Demand Content",
    description: "At Stevens, we host a variety of events for prospective and current students covering topics such as application strategy, program information, the student experience and our online platform. Our on-demand content is instantly available, so you can watch at your convenience.",
    fallbackText: "Check back soon for more upcoming events.",
    items: [
      { title: "Exploring the Online M.S. in Computer Science at Stevens Institute of Technology", status: "Ongoing", length: "11 minutes", url: "https://event.on24.com/wcc/r/4455089/34FF45D9104354C225403F6B63A29F26" },
      { title: "Student Voices: Real Stories From Stevens Graduate Programs", status: "Ongoing", length: "45 minutes", url: "https://event.on24.com/wcc/r/4970051/3D4408B63146F35B069766B71328D7CE" },
      { title: "Start With Two Courses. Step Into Computer Science", status: "Ongoing", length: "30 minutes", url: "https://event.on24.com/wcc/r/4970040/A6ED251C21B790E2D79369BFB149380A" },
      { title: "Online M.S. in Computer Science: Areas of Focus", status: "Ongoing", length: "12 minutes", url: "https://event.on24.com/wcc/r/4894227/042446D9C5E18BF3F4D7CD9A7604B1EA" },
      { title: "Financial Aid Overview: Stevens Institute of Technology", status: "Ongoing", length: "10 minutes", url: "https://event.on24.com/wcc/r/5007787/EC42C1EA980050EB628E9A3DAD9BA2BB?pg=2" },
      { title: "Application Walkthrough: Data Science and Computer Science", status: "Ongoing", length: "24 minutes", url: "https://event.on24.com/wcc/r/4455092/4C10B1C30D8D20926A28C1A21C667A29" },
      { title: "Exploring the Online M.S. in Computer Science at Stevens Institute of Technology", status: "Ongoing", length: "23 minutes", url: "https://event.on24.com/wcc/r/4455089/34FF45D9104354C225403F6B63A29F26?pg=2" }
    ]
  },
  faqs: [
    { q: "What is the ASAP application?", a: "The ASAP application enables prospective students to complete two eight-week asynchronous courses to gain full admission to the program, offering an alternative to the standard application process. Bachelor’s degree is required. By earning a grade of “B” or better in each course, you demonstrate your readiness for the program, and the credits you earn are applied toward your degree." },
    { q: "Who should apply through the ASAP application?", a: "The ASAP application is ideal for students who may not meet traditional admission criteria but believe they can showcase their academic potential through coursework. Bachelor’s degree is required." },
    { q: "What resources are available to ASAP students?", a: "As an ASAP student, you’ll have access to the same resources and support as fully admitted students. This includes academic advising, technical support and access to faculty to help ensure your success in the asynchronous courses." }
  ],
  accreditation: `Stevens Institute of Technology has been continually accredited by the <a href="https://www.msche.org/" target="_blank" rel="noopener noreferrer" class="text-stevens-white underline hover:text-stevens-gray-500 transition-colors duration-stevens-normal">Middle States Commission on Higher Education (MSCHE)</a> since 1927. Stevens is accredited until 2027 and the next self-study evaluation is scheduled to take place during 2026-2027.`
};


export default function MSCSPage() {
  usePageTracking({
    pageType: 'program',
    programCode: 'mscs',
    additionalData: {
      program_name: 'Master of Science in Computer Science',
      has_video: true,
      has_rfi_modal: true,
      has_application_modal: true
    }
  });

  return (
    <PageContextProvider pageType="program" pageName="MSCS">
      <ProgramContextProvider 
        programCode="mscs"
        programName="Master of Science in Computer Science"
        programType="degree"
      >
        <ProgramPageTemplate programData={programData} useApplicationModal={true} />
      </ProgramContextProvider>
    </PageContextProvider>
  );
}
