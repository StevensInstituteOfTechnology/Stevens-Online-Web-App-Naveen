
import React from 'react';
import ProgramPageTemplate from '../components/program-pages/ProgramPageTemplate';
import { Globe, Check, Award } from 'lucide-react';
import { createPageUrl } from '@/utils';
import { KEY_DATES } from '@/config/constants';
import { usePageTracking } from '@/hooks/analytics/usePageTracking';
import { ProgramContextProvider } from '@/contexts/analytics/ProgramContext';
import { PageContextProvider } from '@/contexts/analytics/PageContext';

const programData = {
  code: 'mem',
  seo: {
    title: 'Online MEM in Engineering Management | Stevens',
    description: 'Lead engineering teams with the 100% online MEM in Engineering Management from Stevens Institute of Technology. STEM-designated, flexible format, no GRE required.',
    ogImage: '/assets/images/mem/1-mem-hero-scaled.webp',
    url: '/online-masters-engineering-management/'
  },
  hero: {
    titleLines: ["Earn Your Master of Engineering Management (MEM) Online", "Lead Engineering Teams Anywhere."],
    subtitle: "Tech-driven leadership. 100% online. Designed for working engineers.",
    bgImage: "/assets/images/mem/1-mem-hero-scaled.webp",
    primaryCta: { label: 'Request Information', to: 'RequestInfo' },
    secondaryCta: { label: 'Apply In Minutes', href: 'https://gradadmissions.stevens.edu/apply/?pk=GRNP' },
    
    badges: [
      { text: "100% Online", icon: Globe },
      { text: "ASAP Application Available", icon: Check },
      { text: "#6 in the Nation", icon: Award }
    ]
  },
  quickFacts: {
    atAGlance: [
      { value: "Advanced", label: "Techniques" },
      { value: "Assemble", label: "Teams" },
      { value: "Analyze", label: "Data" },
      { value: "Build", label: "Models" },
    ],
    termStartDate: "Spring 2026: January 20, 2026",
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
      <p>The Stevens Institute of Technology Master of Engineering in Engineering Management prepares engineers for leadership roles by combining technical expertise with business management principles. Through an innovative curriculum that bridges engineering and business, you’ll develop analytical and social intelligence to manage projects effectively. Customize your learning with core coursework in management, data science and engineering analysis, and tailor electives to your interests. With our new ASAP application, you can bypass the traditional application process and secure your spot in the program by successfully completing two trial courses.</p>
    `,
    keySkills: [
      "Leverage advanced techniques and analysis to estimate and use cost information in decision making.",
      "Form and manage an effective engineering design team in a business environment.",
      "Handle and process information using tools such as Python.",
      "Master the fundamentals of system dynamics and build system dynamic models."
    ]
  },
  rankings: [
    { ranking: "#6", description: "In the Nation", source: "U.S. News & World Report, Best Online Master's in Industrial Engineering Program (2025)." },
    { ranking: "#15", description: "For Best Value", source: "Payscale (2024)" },
    { ranking: "Top 20", description: "For Best Career Placement", source: "The Princeton Review (2024)" },
    { ranking: "100%", description: "Employment", source: "Three months after graduation, 100% of MEM graduates in the Class of 2023 accepted job offers." },
    { ranking: "#1", description: "In N.J.", source: "U.S. News & World Report, Online Master’s in Engineering Program at a N.J. school (2022)." },
  ],
  career: {
    description: `
      <p class="mb-4">According to 2025 data from the U.S. Bureau of Labor Statistics (BLS), there are 210,200 architectural and engineering managers and 230,100 industrial production managers employed across the U.S. The BLS projects about 15,000 and 17,100 annual job openings in these fields, respectively, over the next decade.</p>
      <p>The states with the highest employment rates for engineering managers include California, Texas, Michigan, Pennsylvania and Illinois. Engineering manager salaries vary according to location, but many upper-level roles are well into the six figures. The BLS lists the median annual wage for architectural and engineering managers at $167,740.</p>
    `,
    jobTitles: [
      { title: "Architectural and Engineering Manager", salary: "$167,740" },
      { title: "Industrial Production Manager", salary: "$121,440" },
      { title: "Materials Engineer", salary: "$108,310" },
      { title: "Electrical Engineer", salary: "$111,910" },
      { title: "Industrial Engineer", salary: "$101,140" },
      { title: "Project Management Specialist", salary: "$100,750" }
    ],
    source: "U.S. Bureau of Labor Statistics, 2025.",
    topCompanies: ["BMW", "Goldman Sachs", "Lockheed Martin", "Exxon", "IBM", "UPS"]
  },
  whatYoullLearn: {
    title: "Mastering Engineering Leadership Skills",
    description: "The Online Master of Engineering in Engineering Management program equips you with the essential skills to bridge the gap between technical expertise and business leadership. Our curriculum is designed to develop both analytical and managerial capabilities that are crucial for success in today's engineering-driven organizations.",
    modules: [
      {
        title: "Engineering Economics and Cost Analysis",
        description: "Students develop expertise in financial decision-making for engineering projects, learning to evaluate costs, benefits, and risks in technical contexts.",
        skills: [
          "Apply economic principles to engineering project evaluation and selection",
          "Perform cost-benefit analysis and risk assessment for technical investments",
          "Utilize financial modeling techniques for engineering decision-making"
        ]
      },
      {
        title: "Project Management and Systems Engineering",
        description: "Master the art of managing complex engineering projects from conception to completion, with emphasis on systems thinking and stakeholder management.",
        skills: [
          "Lead cross-functional engineering teams through complex project lifecycles",
          "Apply systems engineering principles to optimize project outcomes",
          "Manage project scope, timeline, and resources effectively"
        ]
      },
      {
        title: "Operations Research and Data Analytics",
        description: "Develop analytical skills to solve complex engineering problems using quantitative methods, optimization techniques, and data-driven decision making.",
        skills: [
          "Apply mathematical modeling and optimization techniques to engineering problems",
          "Utilize data analytics tools for process improvement and decision support",
          "Implement statistical methods for quality control and performance measurement"
        ]
      },
      {
        title: "Leadership and Organizational Management",
        description: "Build essential leadership capabilities to manage engineering teams, drive innovation, and navigate organizational challenges in technical environments.",
        skills: [
          "Develop leadership strategies for engineering teams and technical organizations",
          "Apply change management principles in engineering contexts",
          "Foster innovation and continuous improvement in technical environments"
        ]
      },
      {
        title: "Strategic Engineering Management",
        description: "Learn to align engineering capabilities with business strategy, making strategic decisions that drive organizational success in technology-driven markets.",
        skills: [
          "Develop strategic plans that integrate engineering capabilities with business objectives",
          "Evaluate technology trends and their impact on organizational strategy",
          "Make informed decisions about technology investments and resource allocation"
        ]
      }
    ]
  },
  commonJobTitles: {
    title: "Prospective Occupations for Online MEM Graduates",
    description: "Explore the diverse career opportunities available to graduates of our Online Master of Engineering in Engineering Management program.",
    jobs: [
      {
        title: "Engineering Manager",
        salary: 159920,
        description: "Plan, direct, and coordinate activities in architectural and engineering companies."
      },
      {
        title: "Project Manager",
        salary: 101610,
        description: "Plan, initiate, and manage information technology projects."
      },
      {
        title: "Operations Manager",
        salary: 103650,
        description: "Plan, direct, and coordinate the operations of public or private sector organizations."
      },
      {
        title: "Systems Engineer",
        salary: 103650,
        description: "Design and implement complex systems and infrastructure solutions."
      },
      {
        title: "Quality Assurance Manager",
        salary: 115640,
        description: "Plan, direct, and coordinate quality assurance programs and formulate quality control policies."
      },
      {
        title: "Technical Program Manager",
        salary: 131450,
        description: "Plan and direct technical programs and projects, ensuring they meet quality standards and deadlines."
      }
    ],
    source: "U.S. Bureau of Labor Statistics, 2025."
  },
  topCompanies: {
    title: "Stevens Alumni Drive Innovation at Top Companies",
    description: "Our graduates join leading organizations across technology, finance, healthcare, and consulting",
    companies: [
      {
        name: "BMW",
        logo: "/assets/company_logo/BMW.svg.png",
        industry: "Manufacturing"
      },
      {
        name: "Goldman Sachs",
        logo: "/assets/company_logo/Goldman_Sachs_2022_Black.svg.png",
        industry: "Finance"
      },
      {
        name: "Lockheed Martin",
        logo: "/assets/company_logo/Lockheed_Martin_logo.svg.png",
        industry: "Aerospace & Defense"
      },
      {
        name: "Exxon",
        logo: "/assets/company_logo/Exxon_logo_2016.svg.png",
        industry: "Energy"
      },
      {
        name: "IBM",
        logo: "/assets/company_logo/IBM_logo.svg.png",
        industry: "Technology"
      },
      {
        name: "UPS",
        logo: "/assets/company_logo/United_Parcel_Service_logo_2014.svg.png",
        industry: "Logistics"
      }
    ]
  },
  whyStevens: {
    title: "Why Choose an Online MEM from Stevens?",
    description: `
      <p>At Stevens, you'll receive a cutting-edge engineering management education that seamlessly integrates technical proficiency with business acumen. Our comprehensive curriculum bridges the gap between engineering and management, equipping you with the skills to lead in a dynamic engineering environment.</p>
      <p>Customize your learning path with electives that align with your career aspirations, ensuring you gain the knowledge and confidence to succeed in leadership roles. With our new ASAP application, you can bypass the standard application process and start learning immediately by completing two introductory courses.</p>
    `
  },
  curriculum: {
    description: "The Online MEM program consists of 30 credit hours across 10 courses, all delivered 100% online, with the first two courses delivered asynchronously. Coursework is built on three pillars: management for engineers, data science and management, and engineering modeling and risk analysis.",
    courseTabs: {
      programCoursework: { 
        title: "Program Coursework", 
        content: `
          <div class="space-y-stevens-xl">
            <div>
              <h4 class="course-section-header">TERM 1</h4>
              <div class="space-y-stevens-md">
                <div class="course-item">
                  <button class="course-toggle" data-target="em600">EM 600 Engineering Economics and Cost Analysis (3)<span class="course-arrow">▼</span></button>
                  <div class="course-content hidden" id="em600">
                    <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">This course presents advanced techniques and analysis designed to permit managers to estimate and use cost information in decision making. Topics include: historical overview of the management accounting process, statistical cost estimation, cost allocation, and uses of cost information in evaluating decisions about pricing, quality, manufacturing processes (e.g., JIT, CIM), investments in new technologies, investment centers, the selection process for capital investments, both tangible and intangible, and how this process is structured and constrained by the time value of money, the source of funds, market demand, and competitive position.</p>
                  </div>
                </div>
                
                <div class="course-item">
                  <button class="course-toggle" data-target="em612">EM 612 Project Management of Complex Systems (3)<span class="course-arrow">▼</span></button>
                  <div class="course-content hidden" id="em612">
                    <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">This project-based course exposes students to tools and methodologies useful for forming and managing an effective engineering design team in a business environment. Topics covered will include personality profiles for creating teams with balanced diversity; computational tools for project coordination and management; real-time electronic documentation as a critical design process variable; and methods for refining project requirements to ensure that the team addresses the right problem with the right solution.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 class="course-section-header">TERM 2</h4>
              <div class="space-y-stevens-md">
                <div class="course-item">
                  <button class="course-toggle" data-target="em605">EM 605 Elements of Operations Research (3)<span class="course-arrow">▼</span></button>
                  <div class="course-content hidden" id="em605">
                    <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">This course brings a strong modeling orientation to bear on the process of obtaining and utilizing resources to produce and deliver useful goods and services so as to meet the goals of the organization. Decision-oriented models such as linear programming, inventory control, and forecasting are discussed and then implemented utilizing spreadsheets and other commercial software. A review of the fundamentals of statistical analysis oriented toward business problems will also be conducted.</p>
                  </div>
                </div>
                
                <div class="course-item">
                  <button class="course-toggle" data-target="em624">EM 624 Data Exploration and Informatics for Engineering Management (3)<span class="course-arrow">▼</span></button>
                  <div class="course-content hidden" id="em624">
                    <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">This course enables the engineering management student to acquire the knowledge and skills they will need to handle the variety and volume of information encountered in today’s workplace. The course uses Python, which is rapidly becoming the language of choice for information handling and data analysis. Students will work with both structured and semi-structured data.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 class="course-section-header">TERM 3</h4>
              <div class="space-y-stevens-md">
                <div class="course-item">
                  <button class="course-toggle" data-target="sys611">SYS 611 Systems Modeling and Simulation (3)<span class="course-arrow">▼</span></button>
                  <div class="course-content hidden" id="sys611">
                    <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">This course emphasizes the development of modeling and simulation concepts and analysis skills necessary to design, program, implement, and use computers to solve complex systems/product analysis problems. The key emphasis is on problem formulation, model building, data analysis, solution techniques, and evaluation of alternative designs/ processes in complex systems/products. An overview of modeling techniques and methods used in decision analysis, including Monte Carlo and discrete event simulation is presented.</p>
                  </div>
                </div>
                
                <div class="course-item">
                  <button class="course-toggle" data-target="sys660">SYS 660 Decision and Risk Analysis (3)<span class="course-arrow">▼</span></button>
                  <div class="course-content hidden" id="sys660">
                    <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">This course is a study of analytic techniques for rational decision-making that addresses uncertainty, conflicting objectives, and risk attitudes. This course covers modeling uncertainty; rational decision-making principles; representing decision problems with value trees, decision trees, and influence diagrams; solving value hierarchies; defining and calculating the value of information; incorporating risk attitudes into the analysis; and conducting sensitivity analyses.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="mt-stevens-xl mb-stevens-lg">
              <p class="text-stevens-gray-700 leading-relaxed">To meet the interests and career goals of students, the following courses are available as recommended electives during Terms 4 and 5. Alternately, students may take up to four courses that focus on a particular area of their choice including Construction Management, Mechanical Engineering, Electrical Engineering, and Systems & Software Engineering upon reviewing the specific courses with the faculty advisor or Program Director.*</p>
            </div>
            
            <div>
              <h4 class="course-section-header">TERM 4**</h4>
              <div class="space-y-stevens-md">
                <div class="course-item">
                  <button class="course-toggle" data-target="mgt612">MGT 612 Leader Development (3)<span class="course-arrow">▼</span></button>
                  <div class="course-content hidden" id="mgt612">
                    <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">Project success depends, largely, on the human side. Success in motivating project workers, organizing and leading project teams, communication and sharing information, and conflict resolution, are just a few areas that are critical for project success. However, being primarily technical people, many project managers tend to neglect these “soft” issues, assuming they are less important or that they should be addressed by direct functional managers. The purpose of this course is to increase awareness of project managers to the critical issues of managing people and to present some of the theories and practices of leading project workers and teams.</p>
                  </div>
                </div>
                
                <div class="mt-stevens-md">
                  <h5 class="font-stevens-bold text-stevens-lg text-stevens-primary mb-stevens-md">MANAGERIAL ANALYTICS ELECTIVE</h5>
                  <div class="course-item">
                    <button class="course-toggle" data-target="em622">EM 622 Data Analysis and Visualization Techniques for Decision Making (3)<span class="course-arrow">▼</span></button>
                    <div class="course-content hidden" id="em622">
                      <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">This course provides a hands-on introduction to the modern techniques for visualizing data and leverages such techniques with the corresponding problem solving skills necessary to complement data visualization into specific strategic decision making. The student will first learn to use the latest off the shelf software for data visualization. In specific the student will learn the following languages: R, D3, Google refine and Spot fire.</p>
                    </div>
                  </div>
                </div>
                
                <div class="mt-stevens-md">
                  <h5 class="font-stevens-bold text-stevens-lg text-stevens-primary mb-stevens-md">SUPPLY CHAIN AND LOGISTICS MANAGEMENT ELECTIVE</h5>
                  <div class="course-item">
                    <button class="course-toggle" data-target="sys640">SYS 640 System Supportability and Logistics (3)<span class="course-arrow">▼</span></button>
                    <div class="course-content hidden" id="sys640">
                      <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">The supportability of a system can be defined as the ability of the system to be supported in a cost effective and timely manner, with a minimum of logistics support resources. The required resources might include test and support equipment, trained maintenance personnel, spare and repair parts, technical documentation and special facilities. For large complex systems, supportability considerations may be significant and often have a major impact upon life-cycle cost. It is therefore particularly important that these considerations be included early during the system design trade studies and design decision-making.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 class="course-section-header">TERM 5**</h4>
              <div class="space-y-stevens-md">
                <div class="course-item">
                  <button class="course-toggle" data-target="em800">EM 800 Capstone (3)<span class="course-arrow">▼</span></button>
                  <div class="course-content hidden" id="em800">
                    <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">The Capstone is a customized and personalized experience that allows students the opportunity to build innovative solutions for real-world engineering problems. Students will collaborate with a faculty member and tailor their projects to their areas of interest or use real-life issues at their current organizations.</p>
                  </div>
                </div>
                
                <div class="mt-stevens-md">
                  <h5 class="font-stevens-bold text-stevens-lg text-stevens-primary mb-stevens-md">MANAGERIAL ANALYTICS ELECTIVE</h5>
                  <div class="course-item">
                    <button class="course-toggle" data-target="em623">EM 623 Data Science and Knowledge Discovery in Engineering Management (3)<span class="course-arrow">▼</span></button>
                    <div class="course-content hidden" id="em623">
                      <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">Getting usable information from the vast amount of data we are immersed into requires a combination of methodologies, tools, techniques, algorithms and ingenuity. Creating views, extracting trends, defining patterns, identifying clusters are all elements we need to manage large data. The field of data mining has evolved from the disciplines of statistics and artificial intelligence. This course will examine methods that have emerged from both fields and proven to be of value in recognizing patterns and making predictions from an applications perspective. Final goal of the course is to provide the students with a “data toolbox” they can use in their activities. This “toolbox” contains methods and tools that students will use themselves during the course for real world applications. The course is hand-on, but no coding is required, using Open Source Data Science tools that are based on Graphical User Interfaces.</p>
                    </div>
                  </div>
                </div>
                
                <div class="mt-stevens-md">
                  <h5 class="font-stevens-bold text-stevens-lg text-stevens-primary mb-stevens-md">SUPPLY CHAIN AND LOGISTICS MANAGEMENT ELECTIVE</h5>
                  <div class="course-item">
                    <button class="course-toggle" data-target="sys670">SYS 670 Forecasting and Demand Modeling Systems (3)<span class="course-arrow">▼</span></button>
                    <div class="course-content hidden" id="sys670">
                      <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">This course covers the theory and application of modeling aggregate demand, fragmented demand and consumer behavior using statistical methods for analysis and forecasting for facilities, services and products. It also aims to provide students with both the conceptual basis and tools necessary to conduct market segmentation studies, defining and identifying criteria for effective segmentation, along with techniques for simultaneous profiling of segments and models for dynamic segmentation. All of this provides a window on the external environment, thereby contributing input and context to product, process and systems design decisions and their ongoing management.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="mt-stevens-xl">
              <p class="text-stevens-sm text-stevens-gray-600 mb-stevens-sm">*Applicants are not required to select a program concentration during the application process.</p>
              <p class="text-stevens-sm text-stevens-gray-600">**Students lacking sufficient statistics coursework in their academic background will be required to take Probability and Statistics for Systems Engineering in lieu of an elective course in term 4 or term 5. Once enrolled, students will work with a student support coach to determine which courses to take.</p>
            </div>
          </div>
        ` 
      }
    }
  },
  studentSpotlight: {
    name: "Sarah Chen '23",
    quote: "The MEM program gave me the perfect blend of technical skills and leadership capabilities. I was promoted to Engineering Manager within six months of graduation."
  },
  faculty: {
    description: "The School of Systems and Enterprises (SSE) faculty is made up of experienced educators and active researchers who offer industry insights to Engineering Management students.",
    members: [
      { name: "Carlo Lipizzi", title: "MEM Program Director & Professor", image: "/assets/avatars/mem-avatar/carlo-lipizzi-stevens-faculty.webp" },
      { name: "Chong Ee", title: "Adjunct Professor", image: "/assets/avatars/mem-avatar/chong-ee-stevens-faculty.webp" },
      { name: "Alparslan Emrah Bayrak", title: "Assistant Professor", image: "/assets/avatars/mem-avatar/alparslan-emrah-bayrak.webp" },
      { name: "Teresa Zigh", title: "Teaching Associate Professor", image: "/assets/avatars/mem-avatar/teresa-zigh-stevens-faculty.webp" },
      { name: "Yeganeh Hayeri", title: "Professor", image: "/assets/avatars/mem-avatar/yeganeh-hayeri-stevens-faculty.webp" },
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
    cards: [],
    description: `<h3 class="font-bold text-xl mb-4">New for 2025: Up to $16,708 off Tuition Through Grants and Scholarships</h3><p>At Stevens, we’re committed to reducing the financial barriers to graduate education. That’s why we offer grant and scholarship programs designed to help you achieve your goals.</p>`,
    grants: [
        { title: "Aspire Grant (for standard applicants)", description: "$6,708 in tuition support for the first two asynchronous courses." },
        { title: "Pathway Grant (for ASAP applicants)", description: "$6,708 in tuition support for the first two asynchronous courses." },
        { title: "Dean’s Merit Scholar Program", description: "Eligible students may qualify for scholarship support based on academic merit. Contact your enrollment advisor to learn more." }
    ]
  },
  events: {
    title: "On-Demand Content",
    description: "At Stevens, we host a variety of events for prospective and current students covering topics such as application strategy, program information, the student experience and our online platform. Our on-demand content is instantly available, so you can watch at your convenience.",
    fallbackText: "Check back soon for more upcoming events.",
    items: [
      { title: "Student Voices: Real Stories From Stevens Graduate Programs", status: "Ongoing", length: "45 minutes", url: "https://event.on24.com/wcc/r/4970051/3D4408B63146F35B069766B71328D7CE" },
      { title: "Start With Two Courses. Step Into Engineering Leadership", status: "Ongoing", length: "30 minutes", url: "https://event.on24.com/wcc/r/4970047/F7AEF7F7E214EFD9A417BC81BE6BA906" },
      { title: "Financial Aid Overview: Stevens Institute of Technology", status: "Ongoing", length: "10 minutes", url: "https://event.on24.com/wcc/r/5007787/EC42C1EA980050EB628E9A3DAD9BA2BB?pg=2" },
      { title: "Exploring the Online Master's in Engineering Management at Stevens", status: "Ongoing", length: "19 minutes", url: "https://event.on24.com/wcc/r/4666985/156784FFB13710F1FFCF29E5C6DBAD13" },
      { title: "Application Overview: Online Master's in Engineering Management", status: "Ongoing", length: "24 minutes", url: "https://event.on24.com/wcc/r/5056716/2FEBB6A6A455A2CCC508FB1183A71810?pg=2" }
    ]
  },
  faqs: [
    { q: "What is the ASAP application?", a: "The ASAP application enables prospective students to complete two eight-week asynchronous courses to gain full admission to the program, offering an alternative to the standard application process. Bachelor’s degree is required. By earning a grade of “B” or better in each course, you demonstrate your readiness for the program, and the credits you earn are applied toward your degree." },
    { q: "Who should apply through the ASAP application?", a: "The ASAP application is ideal for students who may not meet traditional admission criteria but believe they can showcase their academic potential through coursework. Bachelor’s degree is required." },
    { q: "What resources are available to ASAP students?", a: "As an ASAP student, you’ll have access to the same resources and support as fully admitted students. This includes academic advising, technical support and access to faculty to help ensure your success in the asynchronous courses." }
  ],
  accreditation: `Stevens Institute of Technology has been continually accredited by the <a href="https://www.msche.org/" target="_blank" rel="noopener noreferrer" class="text-stevens-white underline hover:text-stevens-gray-500 transition-colors duration-stevens-normal">Middle States Commission on Higher Education (MSCHE)</a> since 1927. Stevens is accredited until 2027 and the next self-study evaluation is scheduled to take place during 2026-2027.`
};

export default function MEMPage() {
  usePageTracking({
    pageType: 'program',
    programCode: 'mem',
    additionalData: {
      program_name: 'Master of Engineering in Engineering Management',
      has_video: true,
      has_rfi_modal: true,
      has_application_modal: true
    }
  });

  return (
    <PageContextProvider pageType="program" pageName="MEM">
      <ProgramContextProvider 
        programCode="mem"
        programName="Master of Engineering in Engineering Management"
        programType="degree"
      >
        <ProgramPageTemplate programData={programData} useApplicationModal={true} />
      </ProgramContextProvider>
    </PageContextProvider>
  );
}
