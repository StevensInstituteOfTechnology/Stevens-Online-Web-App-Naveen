import React from 'react';
import {
  Globe, Award, Check, Briefcase, DollarSign, BrainCircuit, LineChart,
  Target, TrendingUp, Users } from 'lucide-react';
import ProgramPageTemplate from '../components/program-pages/ProgramPageTemplate';

const programData = {
  code: 'mba',
  seo: {
    title: 'Online MBA | Stevens Institute of Technology',
    description: 'Earn your 100% online MBA from Stevens Institute of Technology. Tech-driven curriculum, part-time for working professionals, immersive NYC experience.',
    ogImage: '/assets/images/1-omba-hero-scaled.webp',
    url: '/online-mba/'
  },
  hero: {
    titleLines: ['Earn Your MBA Online.', 'Build Your Career Anywhere.'],
    subtitle: "Tech-driven curriculum. AACSB accredited. Rated one of the best MBA programs in NYC region.",
    bgImage: "/assets/images/1-omba-hero-scaled.webp",
    primaryCta: { label: 'Request Information', to: 'RequestInfo' },
    secondaryCta: { label: 'Apply Now', href: 'https://gradadmissions.stevens.edu/apply/?pk=GRNP' },
    badges: [
    { text: "100% Online", icon: Globe },
    { text: "AACSB Accredited", icon: Award },
      { text: "No GMAT/GRE Required", icon: Check }
    ]
  },
  quickFacts: {
    atAGlance: [
    { value: "100%", label: "Online", icon: Globe },
    { value: "Tech-Focused", label: "Curriculum", icon: BrainCircuit },
    { value: "No GMAT/GRE", label: "Required", icon: Check },
    { value: "Career-Driven", label: "Outcomes", icon: Briefcase },
    { value: "Expert", label: "Faculty", icon: Users },
    { value: "Merit", label: "Scholarships Available", icon: Award }],

    termStartDate: "SPRING 2026: January 20, 2026",
    details: `<ul><li>39–48 Credit Hours</li><li>13–16 Courses</li><li>7 Concentrations</li><li>100% Online</li><li>2 Immersions in the NYC Region</li><li>2.5–3 Year Completion Time*</li></ul><p class="text-xs mt-2">*Total time to complete the program may vary based on the number of credits taken each semester.</p>`
  },
  overview: {
    title: "MBA Program Overview",
    description: `<p class="mb-4">The Online MBA at Stevens empowers ambitious professionals to lead in data-driven, technology-centric industries. Whether you're advancing within your organization or pivoting into a new field, our 100% online, part-time format allows you to learn on your schedule, without putting your career on hold.</p><p>Offering a unique edge in today's digital economy, the best MBA for technology in the NYC region provides practical expertise in analytics, strategy, leadership and emerging technologies — taught by faculty who are active in research and industry. With two on-site immersions near New York City, you'll also benefit from strong industry connections and a thriving network of alumni working across tech, finance, healthcare and more.</p>`,
    keySkills: ["Marketing", "Financial Management", "Data Analysis", "Accounting", "Project Management"],
    concentrations: ["Business Intelligence & Analytics", "Finance", "Financial Analytics", "Financial Engineering", "Information Systems", "Project Management", "Sustainability Management"]
  },
  videoSection: {
    title: "Discover Your Future at Stevens",
    description: "Watch how Stevens Online transforms careers through innovative education, expert faculty, and flexible learning designed for working professionals.",
    videoSrc: "/assets/videos/Stevens Online Home - 1.mp4",
    posterSrc: "/assets/videos/video-cover-2.avif",
    showControls: true,
    muted: true
  },
  rankings: [
  { ranking: "100%", description: "EMPLOYMENT", source: "100% of MBA graduates in the Class of 2022 accepted job offers within three months of graduating.", note: "1" },
  { ranking: "#15", description: "FOR BEST VALUE", source: 'Ranked #15 among "Best Value Colleges" By Payscale (2024).', note: "2" },
  { ranking: "#1", description: "ONLINE MBA IN N.J.", source: "Stevens' Online MBA has been ranked #1 in New Jersey since 2015 (U.S. News & World Report, 2024)." },
  { ranking: "#14", description: "FOR ECONOMIC RETURN", source: "Stevens ranked #14 among top business schools for economic return by Georgetown University's Center on Education and the Workforce (2022).", note: "2" },
  { ranking: "Top 20", description: "FOR BEST CAREER PLACEMENT", source: "Ranked among the top private schools for best career placement by The Princeton Review (2024)." }],

  rankings_footnotes: [
  { note: "1", text: "Based on data from 82% of the 2021-2022 full-time program graduates." },
  { note: "2", text: "Based on the cost of a four-year bachelor's degree program." }],

  career: {
    description: `<p class="mb-4">The Stevens Online MBA program prepares you for many leadership roles in companies based in New York City and other business hubs across the country. According to 2025 data from the U.S. Bureau of Labor Statistics, NYC is one of the top-paying regions for management professionals — financial managers in the greater metropolitan area, for instance, earn over $247,000 annually. It's also the region hiring the greatest number of management professionals — the area employs over 187,000 general and operations managers.</p><p class="mb-4">The outlook for management positions is very positive. Some, like financial managers, are projected to grow much faster than average. Employment of financial managers is forecast to grow by 17% by 2033 (with around 75,100 job openings each year). Others, like sales managers, are also projected to grow faster than the national average over the next decade. An Online MBA from Stevens provides students with transferable skills valuable in any industry and prepares them for professional success throughout their careers.</p><p>According to data from the labor market analytics experts at Lightcast, a skills gap exists among MBA occupations, resulting in a demand for graduates with finance, accounting, project management, auditing and data analysis skills. Our comprehensive curriculum and specialized concentrations focus on these essential and highly sought-after skills, preparing you for professional success in your chosen field.</p>`,
    jobTitles: [
    { title: "Chief Executive", employed: "211,230", salary: "$206,420" },
    { title: "Financial Manager", employed: "837,100", salary: "$161,700" },
    { title: "Marketing Manager", employed: "411,300", salary: "$159,660" },
    { title: "Human Resources Manager", employed: "208,900", salary: "$140,030" },
    { title: "Sales Manager", employed: "584,800", salary: "$138,060" }],

    source: "U.S. Bureau of Labor Statistics, 2025.",
    topCompanies: ["Microsoft", "Verizon", "Cisco", "American Express", "Millenium", "L3Harris"]
  },
  whatYoullLearn: {
    variant: 'skillCards',
    title: "A Skill Set Designed for Impact",
    description: "Through a mix of foundational, concentration and elective courses, the Stevens Online MBA equips students with T-shaped skills — broad cross-functional business knowledge combined with deep expertise in areas like analytics, innovation and digital strategy. This unique approach ensures that graduates are not only strategic thinkers and effective leaders but also specialists capable of driving impact in their chosen industries.",
    modules: [
    {
      title: "Financial Management",
      growth: "+14.8% Projected Growth Until 2035",
      icon: DollarSign,
      courses: [
      { code: "FIN 500", title: "Financial and Managerial Accounting" },
      { code: "FIN 523", title: "Financial Management" },
      { code: "FIN 638", title: "Corporate Finance" },
      { code: "MGT 506", title: "Economics for Managers" }]

    },
    {
      title: "Project Management",
      growth: "+19.8% Projected Growth Until 2035",
      icon: Briefcase,
      courses: [
      { code: "MGT 609", title: "Project Management Fundamentals" },
      { code: "MGT 610", title: "Strategic Perspectives on Project Management" },
      { code: "MGT 611", title: "Project Analytics" },
      { code: "MGT 619", title: "Leading Across Projects" }]

    },
    {
      title: "Data Analysis",
      growth: "+25.8% Projected Growth Until 2035",
      icon: LineChart,
      courses: [
      { code: "BIA 500", title: "Business Analytics: Data, Models and Decisions" },
      { code: "BIA 610", title: "Applied Analytics" },
      { code: "BIA 672", title: "Marketing Analytics" },
      { code: "BIA 674", title: "Supply Chain Analytics" },
      { code: "BIA 658", title: "Social Network Analytics" }]

    }]

  },
  whyStevens: {
    variant: 'splitWithVideo',
    title: "Why Choose an Online MBA from Stevens?",
    description: `<p>The Stevens Online MBA delivers high-impact skills that employers seek across industries, especially in tech-forward roles. Our program combines rigorous academic coursework with real-world applications.</p><p>Develop leadership capabilities, analytical thinking, and collaborative skills that drive innovation. Choose from multiple concentrations and participate in on-campus immersions to enhance your learning experience.</p><p>Join a community of ambitious professionals who are transforming their careers with technology-focused business education.</p>`,
    video: {
      src: "/assets/videos/Stevens Online MBA - 2.mp4",
      poster: "/assets/videos/video-cover-2.avif",
      title: "",
      caption: "Hear from our students about their transformative Stevens Online MBA experience"
    }
  },
  curriculum: {
    description: "The Stevens Online MBA is designed to give you breadth and depth in business and technology. You'll start with foundational courses that build core skills in strategy, finance, marketing and data analytics — equipping you with a strong, tech-infused base for leadership. Then, you'll customize your learning through concentrations and elective courses aligned with your career goals, whether you're focused on business intelligence, finance or project management. Along the way, you'll participate in two on-campus immersions where you'll collaborate in person with faculty, peers (on-campus MBA students), industry leaders and business executives. The Stevens Online MBA is a part-time program designed for full-time working professionals, offering flexible online coursework along with access to resources and support to help you thrive academically, stay connected to the university community and benefit from learning opportunities beyond the classroom.",
    courseTabs: {
      foundations: {
          title: "Foundational Courses",
        content: `
            <h4 class="course-section-header">Foundational Courses</h4>
            <p class="course-intro">Foundational courses should be completed in advance of pursuing a concentration. Courses may be waived based on academic history and previous coursework completed.</p>
            
            <div class="space-y-stevens-md">
              <div class="course-item">
                <button class="course-toggle" data-target="fin500">FIN 500 Financial and Managerial Accounting (3)<span class="course-arrow">▼</span></button>
                <div class="course-content hidden" id="fin500">
                  <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">This course will develop accounting analysis useful for managerial decision-making purposes. Topics will include an introduction to elements of financial accounting, cost-profit-volume analysis, manufacturing costs and elements of cost accounting, special decision analysis, budgeting, variances, and controllability and responsibility accounting.</p>
                </div>
              </div>
            
            <div class="course-item">
              <button class="course-toggle" data-target="fin523">FIN 523 Financial Management (3)<span class="course-arrow">▼</span></button>
              <div class="course-content hidden" id="fin523">
                <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">This course covers the fundamental principles of finance. The primary concepts covered include the time value of money, principles of valuation and risk. Specific applications include the valuation of debt and equity securities as well as capital budgeting analysis, financial manager's functions, liquidity vs. profitability, financial planning, capital budgeting, management of long term funds, money and capital markets, debt and equity, management of assets, cash and accounts receivable, inventory and fixed assets. Additional topics include derivative markets.</p>
              </div>
            </div>
            
            <div class="course-item">
              <button class="course-toggle" data-target="mgt506">MGT 506 Economics for Managers (3)<span class="course-arrow">▼</span></button>
              <div class="course-content hidden" id="mgt506">
                <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">This course introduces managers to the essence of business economics — the theories, concepts and ideas that form the economist's tool kit encompassing both the microeconomic and macroeconomic environments. Microeconomic topics include demand and supply, elasticity, consumer choice, production, cost, profit maximization, market structure, and game theory while the macroeconomic topics will be GDP, inflation, unemployment, aggregate demand, aggregate supply, fiscal and monetary policies. In addition, the basic concepts in international trade and finance will be discussed.</p>
              </div>
            </div>
          </div>
          
          <h4 class="course-term-header">Term 1</h4>
          <div class="space-y-stevens-md">
            <div class="course-item">
              <button class="course-toggle" data-target="mgt612">MGT 612 Leader Development (3)<span class="course-arrow">▼</span></button>
              <div class="course-content hidden" id="mgt612">
                <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">Project success depends, largely, on the human side. Success in motivating project workers, organizing and leading project teams, communication and sharing information, and conflict resolution, are just a few areas that are critical for project success. However, being primarily technical people, many project managers tend to neglect these "soft" issues, assuming they are less important or that they should be addressed by direct functional managers. The purpose of this course is to increase awareness of project managers to the critical issues of managing people and to present some of the theories and practices of leading project workers and teams.</p>
              </div>
            </div>
            
            <div class="course-item">
              <button class="course-toggle" data-target="bia500">BIA 500 Business Analytics: Data, Models and Decisions (3)<span class="course-arrow">▼</span></button>
              <div class="course-content hidden" id="bia500">
                <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">This course explores data-driven methods that are used to analyze and solve complex business problems. Students will acquire analytical skills in building, applying and evaluating various models with hands-on computer applications. Topics include descriptive statistics, time-series analysis, regression models, decision analysis, Monte Carlo simulation, and optimization models.</p>
              </div>
            </div>
          </div>
          
          <h4 class="course-term-header">Term 2</h4>
          <div class="space-y-stevens-md">
            <div class="course-item">
              <button class="course-toggle" data-target="mgt641">MGT 641 Marketing Management (3)<span class="course-arrow">▼</span></button>
              <div class="course-content hidden" id="mgt641">
                <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">The study of marketing principles from the conceptual, analytical, and managerial points of view. Topics include: strategic planning, market segmentation, product life-cycle, new product development, advertising and selling, pricing, distribution, governmental, and other environmental influences as these factors relate to markets and the business structure.</p>
              </div>
            </div>
            
            <div class="course-item">
              <button class="course-toggle" data-target="bia610">BIA 610 Applied Analytics (3)<span class="course-arrow">▼</span></button>
              <div class="course-content hidden" id="bia610">
                <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">This course is intended to integrate all previously taken courses in the program by presenting a set of increasingly complex business problems. These problems can be solved through analytic skills taught in this course and previous courses. In particular, the course is intended to reinforce the understanding of analysis as a way to build models that can focus attention on parts of the system that can be improved through intervention. The early part of the course uses synthetic data and empirical data readily available for analysis. The second part of the course encourages students to state and solve their own problem, gathering their own data as a part of the analytic process.</p>
              </div>
            </div>
          </div>
          
          <h4 class="course-term-header">Term 3</h4>
          <div class="space-y-stevens-md">
            <div class="course-item">
              <button class="course-toggle" data-target="mgt657">MGT 657 Operations Management (3)<span class="course-arrow">▼</span></button>
              <div class="course-content hidden" id="mgt657">
                <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">This course covers the general area of management of operations, both manufacturing and non-manufacturing. The focus of the course is on productivity and total quality management. Topics include quality control and quality management, systems of inventory control, work and materials scheduling, and process management.</p>
              </div>
            </div>
            
            <div class="course-item">
              <button class="course-toggle" data-target="mgt635">MGT 635 Managerial Judgment and Decision Making (3)<span class="course-arrow">▼</span></button>
              <div class="course-content hidden" id="mgt635">
                <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">Executives make decisions every day in the face of uncertainty. The objective of this course is to help students understand how decisions are made, why they are often less than optimal, and how decision-making can be improved. This course will contrast how managers do make decisions with how they should make decisions, by thinking about how "rational" decision makers should act, by conducting in-class exercises and examining empirical evidence of how individuals do act (often erroneously) in managerial situations. The course will include statistical tools for decision-making, as well as treatment of the psychological factors involved in making decisions.</p>
              </div>
            </div>
          </div>
          
          <h4 class="course-term-header">Term 4</h4>
          <div class="space-y-stevens-md">
            <div class="course-item">
              <button class="course-toggle" data-target="mgt663">MGT 663 Discovering and Exploiting Entrepreneurial Opportunities (3)<span class="course-arrow">▼</span></button>
              <div class="course-content hidden" id="mgt663">
                <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">In this course, students will evaluate and create their own prospective business strategies. They will develop an understanding of entrepreneurship and innovation in starting and growing a business venture. Students will be given an opportunity to actually start their own business or create a business in their company by learning how to take advantage of the new order of business opportunities of the information age. This course's main objective is to show students how to identify these opportunities, be able to formulate and evaluate both qualitatively and quantitatively whether the opportunity is worth pursuing, and, of course, how it may be pursued. Actual case studies and experiences will be intertwined with the course content.</p>
              </div>
            </div>
            
            <div class="course-item">
              <button class="course-toggle" data-target="mgt699">MGT 699 Strategic Management (3)<span class="course-arrow">▼</span></button>
              <div class="course-content hidden" id="mgt699">
                <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">An interdisciplinary course which examines the elements of, and the framework for, developing and implementing organizational strategy and policy in competitive environments. The course analyzes management problems both from a technical-economic perspective and from a behavioral perspective. Topics treated include: assessment of organizational strengths and weaknesses, threats, and opportunities; sources of competitive advantage; organizational structure and strategic planning; and leadership, organizational development, and total quality management. The case method of instruction is used extensively in this course.</p>
              </div>
            </div>
          </div>
          
          <h4 class="course-term-header">Terms 5 & 6: Electives</h4>
          <p class="text-stevens-gray-600">Terms 5 and 6 are elective-only; see Concentrations for course options.</p>`
      },
      
      concentrations: {
        title: "Concentrations",
        content: `
            <h4 class="course-section-header">Choose Your Concentration</h4>
            <p class="course-intro">Customize your MBA with one of seven concentrations designed for technology-focused careers. Each concentration provides specialized knowledge and skills to advance your career in specific industries and roles.</p>
            
            <div class="space-y-stevens-xl">
              <!-- Business Intelligence & Analytics -->
            <div>
                <h5 class="font-stevens-bold text-stevens-xl text-stevens-primary mb-stevens-lg">Business Intelligence & Analytics</h5>
                <div class="space-y-stevens-md">
                  <div class="course-item">
                    <button class="course-toggle" data-target="bia672">BIA 672 Marketing Analytics (3)<span class="course-arrow">▼</span></button>
                    <div class="course-content hidden" id="bia672">
                      <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">Covers marketing analytics techniques such as segmentation, positioning, and forecasting, which form the cornerstone of marketing strategy in industry. Students will work on cases and data from real companies, analyze the data, and learn to present their conclusions and make strategic recommendations.</p>
                    </div>
                  </div>
                  
                  <div class="course-item">
                    <button class="course-toggle" data-target="bia674">BIA 674 Supply Chain Analytics (3)<span class="course-arrow">▼</span></button>
                    <div class="course-content hidden" id="bia674">
                      <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">Introduces the tactical and strategic issues surrounding the design and operation of supply chains, to develop supply chain analytical skills for solving real life problems. Topics covered include: supplier analytics, capacity planning, demand-supply matching, sales and operations planning, location analysis and network management, inventory management and sourcing.</p>
                    </div>
                  </div>
                  
                  <div class="course-item">
                    <button class="course-toggle" data-target="bia658">BIA 658 Social Network Analytics (3)<span class="course-arrow">▼</span></button>
                    <div class="course-content hidden" id="bia658">
                      <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">This course focuses on network concepts, including graph-theoretic fundamentals, centrality, cohesion, affiliations, equivalence and roles, as well as design issues, including data sampling and hypothesis testing. Another focus of this course is on marketing applications of social network analysis — in particular, the use of knowledge about network properties and behavior, such as hubs and paths, the robustness of the network, and information cascades — to better broadcast products and search targets.</p>
                    </div>
                  </div>
                  
                  <div class="course-item">
                    <button class="course-toggle" data-target="bia670">BIA 670 Risk Management Methods and Applications (3)<span class="course-arrow">▼</span></button>
                    <div class="course-content hidden" id="bia670">
                      <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">Theoretical and practical aspects of risk assessment and management will be covered. Major topics include: Importance of innovation and technological changes in current competitive environment, risk and uncertainty, decision trees, binomial methods and derivation of Black-Scholes option pricing formula, extension of option methodology to non-financial (real) options, VAR (value at risk), a framework of risk assessment, and several real-world case studies.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Finance -->
            <div>
                <h5 class="font-stevens-bold text-stevens-xl text-stevens-primary mb-stevens-lg">Finance</h5>
                <div class="space-y-stevens-md">
                  <div class="course-item">
                    <button class="course-toggle" data-target="fin526">FIN 526 Private Equity and Venture Capital (3)<span class="course-arrow">▼</span></button>
                    <div class="course-content hidden" id="fin526">
                      <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">This course addresses the fundamentals of venture capital, which includes the venture capital industry, the structure of venture capital firms and venture capital investments. It addresses in some detail the relationship between venture risk and return, the cost of venture capital and the valuation of high growth companies. The course covers a variety of valuation methods as well as analysis of company capital structure or "cap tables."Students use software tools to determine the value of stocks, options and special features of preferred stock. Topics related to the finance of innovation and the relationship between strategy and venture finance are also covered. Lessons learned are reinforced through case analyses and real examples from the industry.</p>
                    </div>
                  </div>
                  
                  <div class="course-item">
                    <button class="course-toggle" data-target="fin627">FIN 627 Investment Management (3)<span class="course-arrow">▼</span></button>
                    <div class="course-content hidden" id="fin627">
                      <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">This course takes a practical approach to managing investments. It covers a wide variety of investment vehicles ranging from pure equity and debt offerings to complex derivatives and options. Various investment strategies are presented, which focus on the different fundamental approaches and tactics used by leading investors to achieve their financial goals. The course also focuses on investment styles, including momentum, growth, income, asset allocation and vulture investing. Students participate in real-time simulation experiences to create viable portfolios of stocks, bonds and other investments, while tracking their performance against the overall market and the class on a weekly basis.</p>
                    </div>
                  </div>
                  
                  <div class="course-item">
                    <button class="course-toggle" data-target="fin628">FIN 628 Derivatives (3)<span class="course-arrow">▼</span></button>
                    <div class="course-content hidden" id="fin628">
                      <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">This course covers the fundamentals of financial derivatives, including the basic properties and the pricing of futures, options and swaps. It also explores trading and hedging strategies involving financial derivatives. Special topics, such as exotic options and credit derivatives, are explored. The course provides the foundation of financial derivatives and lays the ground for a rigorous risk management course and other advanced quantitative courses, such as stochastic finance.</p>
                    </div>
                  </div>
                  
                  <div class="course-item">
                    <button class="course-toggle" data-target="fin638">FIN 638 Corporate Finance (3)<span class="course-arrow">▼</span></button>
                    <div class="course-content hidden" id="fin638">
                      <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">Topics covered in this course include: leverage on the balance sheet and weighted average cost of capital; bankruptcy, turnarounds, and recapitalizations; international currency hedging; stock options; private equity valuation; mergers and acquisitions; and the issuance of public and private securities.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Financial Analytics -->
            <div>
                <h5 class="font-stevens-bold text-stevens-xl text-stevens-primary mb-stevens-lg">Financial Analytics</h5>
                <div class="space-y-stevens-md">
                  <div class="course-item">
                    <button class="course-toggle" data-target="fe511">FE 511 Introduction to Bloomberg and Thomson Reuters (1-Credit Lab)<span class="course-arrow">▼</span></button>
                    <div class="course-content hidden" id="fe511">
                      <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">This course is designed to teach students the nature and availability of the financial data available at Stevens. The focus of the course will be on equity, futures, FX, options, swaps, CDSs, interest rate swaps, etc. They will learn how to use a Bloomberg terminal. As part of the course the students will be certified in the 4 areas that Bloomberg offers certification. We will cover the Thomson-Reuters Tick history data and basics of using this data. The course also introduces basics of applied statistics. Bloomberg terminal access will be required for any student taking the course on the web.</p>
                    </div>
                  </div>
                  
                  <div class="course-item">
                    <button class="course-toggle" data-target="fe515">FE 515 Introduction to R (1-Credit Lab)<span class="course-arrow">▼</span></button>
                    <div class="course-content hidden" id="fe515">
                      <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">In this course, students will learn the basics of the open-source programming language R using financial data and applications. Basic statistical knowledge is required to complete the course. Upon completion, students will be able to use R for assignments and research using data in finance.</p>
                    </div>
                  </div>
                  
                  <div class="course-item">
                    <button class="course-toggle" data-target="fe520">FE 520 Intro to Python for Financial Applications (1-Credit Lab)<span class="course-arrow">▼</span></button>
                    <div class="course-content hidden" id="fe520">
                      <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">This course is a primer on Python (language syntax, data structures, basic data processing, Python functions, modules and classes). The remainder of the course covers open-source Python tools relevant to solving financial programming problems. There will be reading assignments of the corresponding chapters in the textbook and additional materials will be provided.</p>
                    </div>
                  </div>
                  
                  <div class="course-item">
                    <button class="course-toggle" data-target="fa582">FA 582 Foundations of Financial Data Science (2-Credit Lab)<span class="course-arrow">▼</span></button>
                    <div class="course-content hidden" id="fa582">
                      <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">This course will provide an overview of issues and trends in data quality, data storage, data scrubbing, data flows and data encryption. Topics will include data abstractions and integration, enterprise-level data issues, data management issues with collection, warehousing, preprocessing, and querying. Furthermore, the Hadoop based programming framework for big data issues will be introduced along with any governance and policy issues. Corequisite: FE 513</p>
                    </div>
                  </div>
                  
                  <div class="course-item">
                    <button class="course-toggle" data-target="fe513">FE 513 Practical Aspects of Database Design (1-Credit Lab)<span class="course-arrow">▼</span></button>
                    <div class="course-content hidden" id="fe513">
                      <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">The course provides a practical introduction to SQL databases and Hadoop cluster systems. Students will receive hands-on instruction about setting up and working with databases. Most of the software will be introduced using case studies or demonstrations, followed by a lecture of related fundamental knowledge. The course covers SQL, NoSQL and database management systems. The course will cover accessing databases using API.</p>
                    </div>
                  </div>
                  
                  <div class="course-item">
                    <button class="course-toggle" data-target="fa595">FA 595 Financial Technology (3)<span class="course-arrow">▼</span></button>
                    <div class="course-content hidden" id="fa595">
                      <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">This course deals with financial technology underlying activities of markets, institutions and participants. The overriding purpose is to develop end-to-end business decision-making data analytics tools along with enterprise-level systems thinking. Statistical learning algorithms will be connected to financial objects identification and authentication along with the appropriate databases to create enterprise level financial services analytics systems.</p>
                    </div>
                  </div>
                  
                  <div class="course-item">
                    <button class="course-toggle" data-target="fa550">FA 550 Data Visualization Applications (3)<span class="course-arrow">▼</span></button>
                    <div class="course-content hidden" id="fa550">
                      <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">Effective visualization of complex data allows for useful insights, more effective communication, and making decisions. This course investigates methods for visualizing financial datasets from a variety of perspectives in order to best identify the right tool for a given task. Students will use a number of tools to refine their data and create visualizations, including: R and associated visualization libraries, Ruby on Rails visualization tools, ManyEyes, HTML5 & CSS 3, D3.js and related javascript libraries, Google Chart Tools, Google Refine, and image-editing programs.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Financial Engineering -->
            <div>
                <h5 class="font-stevens-bold text-stevens-xl text-stevens-primary mb-stevens-lg">Financial Engineering</h5>
                <p class="text-stevens-sm text-stevens-gray-700 mb-stevens-lg">To complete this concentration, you will take either FE 543 or FE 610, as well as either FE 535 or FE 621.</p>
                <div class="space-y-stevens-md">
                  <div class="course-item">
                    <button class="course-toggle" data-target="fe543">FE 543 Introduction to Stochastic Calculus for Finance (3)<span class="course-arrow">▼</span></button>
                    <div class="course-content hidden" id="fe543">
                      <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">This course introduces the stochastic calculus to students of finance and financial engineering. The course deals with Markov chains, Poisson processes, random walks, Brownian motion, asset prices as processes, limits of stochastic sequences, Ito sums and integral, fundamental models in modern finance, price dynamics and elementary examples of stochastic differential equations.</p>
                    </div>
                  </div>
                  
                  <div class="course-item">
                    <button class="course-toggle" data-target="fe610">FE 610 Stochastic Calculus for Financial Engineers (3)<span class="course-arrow">▼</span></button>
                    <div class="course-content hidden" id="fe610">
                      <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">This course provides the mathematical foundation for understanding modern financial theory. It includes topics such as basic probability, random variables, discrete continuous distributions, random processes, Brownian motion, and an introduction to Ito's calculus. Applications to financial instruments are discussed throughout the course.</p>
                    </div>
                  </div>
                  
                  <div class="course-item">
                    <button class="course-toggle" data-target="fe535">FE 535 Introduction to Financial Risk Management (3)<span class="course-arrow">▼</span></button>
                    <div class="course-content hidden" id="fe535">
                      <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">This course deals with risk management concepts in financial systems. Topics include identifying sources of risk in financial systems, classification of events, probability of undesirable events, risk and uncertainty, risk in games and gambling, risk and insurance, hedging and the use of derivatives, the use of Bayesian analysis to process incomplete information, portfolio beta and diversification, active management of risk/return profile of financial enterprises, propagation of risk, and risk metrics.</p>
                    </div>
                  </div>
                  
                  <div class="course-item">
                    <button class="course-toggle" data-target="fe621">FE 621 Computational Methods in Finance (3)<span class="course-arrow">▼</span></button>
                    <div class="course-content hidden" id="fe621">
                      <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">This course provides computational tools used in industry by the modern financial analyst. The current financial models and algorithms are further studied and numerically analyzed using regression and time series analysis, decision methods, and simulation techniques. The results are applied to forecasting involving asset pricing, hedging, portfolio and risk assessment, some portfolio and risk management models, investment strategies, and other relevant financial problems. Emphasis will be placed on using modern software. Foundational: FE 543 or FE 610</p>
                    </div>
                  </div>
                  
                  <div class="course-item">
                    <button class="course-toggle" data-target="fe630">FE 630 Portfolio Theory and Applications (3)<span class="course-arrow">▼</span></button>
                    <div class="course-content hidden" id="fe630">
                      <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">This course introduces the modern portfolio theory and optimal portfolio selection using optimization techniques such as linear programming. Topics include contingent investment decisions, deferral options, combination options and mergers and acquisitions. The course introduces various concepts of financial risk measures.</p>
                    </div>
                  </div>
                  
                  <div class="course-item">
                    <button class="course-toggle" data-target="fe620">FE 620 Pricing and Hedging (3)<span class="course-arrow">▼</span></button>
                    <div class="course-content hidden" id="fe620">
                      <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">This course deals with basic financial derivatives theory, arbitrage, hedging, and risk. The theory discusses Ito's lemma, the diffusion equation and parabolic partial differential equations, and the Black-Scholes model and formulae. The course includes applications of asset price random walks, the log-normal distribution, and estimating volatility from historic data. Numerical techniques, such as finite difference and binomial methods, are used to value options for practical examples.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Information Systems -->
            <div>
                <h5 class="font-stevens-bold text-stevens-xl text-stevens-primary mb-stevens-lg">Information Systems</h5>
                <div class="space-y-stevens-md">
                  <div class="course-item">
                    <button class="course-toggle" data-target="mis699">MIS 699 Digital Innovation (3)<span class="course-arrow">▼</span></button>
                    <div class="course-content hidden" id="mis699">
                      <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">IT organizations must be able to leverage new technologies. This course focuses on how organizations can effectively and efficiently assess trends and emerging technologies in data and knowledge management, information networks, and analyzing and developing application systems. Students will learn how to help their organizations define, select, and adopt new information technologies.</p>
          </div>
                  </div>
                  
                  <div class="course-item">
                    <button class="course-toggle" data-target="mis710">MIS 710 Process Innovation and Management (3)<span class="course-arrow">▼</span></button>
                    <div class="course-content hidden" id="mis710">
                      <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">This course focuses on the role of Information Technology (IT) in reengineering and enhancing key business processes. The implications for organizational structures and processes, as the result of increased opportunities to deploy information and streamline business systems, are covered.</p>
                    </div>
                  </div>
                  
                  <div class="course-item">
                    <button class="course-toggle" data-target="mis714">MIS 714 Service Innovation (3)<span class="course-arrow">▼</span></button>
                    <div class="course-content hidden" id="mis714">
                      <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">This course leads students through the identification, analysis, definition, and deployment of service opportunities within public and private organizations. Each of these phases is analyzed in detail to encompass the principal activities, methods, tools and techniques applied in the respective phase. Students will learn how to identify appropriate supporting techniques and information technologies for the different phases of the service life cycle, assess the role of technology, and gauge the organizational impact of service-focused operations. The objective of the course is to enable students to identify, implement and evaluate innovative service offerings in their organization.</p>
                    </div>
                  </div>
                  
                  <div class="course-item">
                    <button class="course-toggle" data-target="mis730">MIS 730 Integration Information Systems Technologies (3)<span class="course-arrow">▼</span></button>
                    <div class="course-content hidden" id="mis730">
                      <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">This course focuses on the issues surrounding the design of an overall Information Technology architecture. The traditional approach in organizations is to segment the problem into four areas: network, hardware, data, and applications. Instead, this course concentrates on the interdependencies among these architectures. In addition, this course will utilize management research on organizational integration and coordination. The student will learn how to design in the large, make appropriate choices about architecture in relationship to overall organization goals, understand the different mechanisms for coordination available, and create a process for establishing and maintaining an ongoing enterprise architecture.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Project Management -->
              <div>
                <h5 class="font-stevens-bold text-stevens-xl text-stevens-primary mb-stevens-lg">Project Management</h5>
                <div class="space-y-stevens-md">
                  <div class="course-item">
                    <button class="course-toggle" data-target="mgt609">MGT 609 Project Management Fundamentals (3)<span class="course-arrow">▼</span></button>
                    <div class="course-content hidden" id="mgt609">
                      <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">This course deals with the basic problems of managing a project, defined as a temporary organization built for the purpose of achieving a specific objective. Both operational and conceptual issues will be considered. Operational issues include definition, planning, implementation, control, and evaluation of the project. Conceptual issues include project management vs. hierarchical management, matrix organization, project authority, motivation, and morale. Cases will be used to illustrate problems in project management and how to resolve them.</p>
                    </div>
                  </div>
                  
                  <div class="course-item">
                    <button class="course-toggle" data-target="mgt610">MGT 610 Strategic Perspectives on Project Management (3)<span class="course-arrow">▼</span></button>
                    <div class="course-content hidden" id="mgt610">
                      <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">This course provides a theoretical perspective on project management for a better understanding of project implementation in modern organizations. The course is based on the premise that success in project leadership depends on a proper managerial style and attitude, and not on specific tools for planning and controlling. The course focuses on developing the manager's conceptual thinking and on building "the project manager's mind." The course helps managers see the entire project landscape and the long-term issues that are critical to project success. It will also address the organizational aspects of initiating and running the program.</p>
                    </div>
                  </div>
                  
                  <div class="course-item">
                    <button class="course-toggle" data-target="mgt611">MGT 611 Project Analytics (3)<span class="course-arrow">▼</span></button>
                    <div class="course-content hidden" id="mgt611">
                      <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">Formalized procedures, tools, and techniques used in conceptual and detailed planning of the project. Development of work breakdown structure as the foundation for project cost and project duration. Application of project data in monitoring the project progress and in formulating remedial actions in response to unexpected occurrences.</p>
                    </div>
                  </div>
                  
                  <div class="course-item">
                    <button class="course-toggle" data-target="mgt619">MGT 619 Leading Across Projects (3)<span class="course-arrow">▼</span></button>
                    <div class="course-content hidden" id="mgt619">
                      <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">This course focuses on key leadership skills for addressing the complex challenges posed by program management, highly-matrixed environments and cross-national collaborations Its purpose is to enhance individuals' abilities to develop others, strategically integrate efforts across groups, and drive change. The concepts presented are theory and research driven so that participants can deepen their conceptual understanding. At the same time, the course calls upon learners to address real-life challenges they face as program and or director-level leaders. Each session presents effective techniques and uses experiential exercises or assignments to provide plenty of practice. The course also requires participants to further transfer learning to their workplaces through focused development planning and coaching support.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Sustainability Management -->
              <div>
                <h5 class="font-stevens-bold text-stevens-xl text-stevens-primary mb-stevens-lg">Sustainability Management</h5>
                <div class="space-y-stevens-md">
                  <div class="course-item">
                    <button class="course-toggle" data-target="sm510">SM 510 Perspectives in Environmental Management (3)<span class="course-arrow">▼</span></button>
                    <div class="course-content hidden" id="sm510">
                      <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">This course addresses environmental management and its role in sustainability from multiple perspectives, including but not limited to that of a natural scientist, an engineer, a marketing manager, an economist, an environmental lawyer, and a policy maker. The course also introduces students to some of the many tools used by environmental managers, such as life cycle analysis, environmental audit, etc. Students will learn from the course instructor and invited subject matter experts, who will explain in a non-technical manner that is intended for adequate comprehension by students from diverse fields of study on how their respective disciplines contribute to proper management of our environment, thereby making our world more sustainable.</p>
                    </div>
                  </div>
                  
                  <div class="course-item">
                    <button class="course-toggle" data-target="sm530">SM 530 Sustainable Business Strategies (3)<span class="course-arrow">▼</span></button>
                    <div class="course-content hidden" id="sm530">
                      <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">
This course will focus on best practices and emerging trends in sustainable business management. Topics will include corporate social responsibility, sustainable business theories, green business models, value chain management, green marketing, triple bottom line reporting, benefit-cost analysis and sustainability metrics and reporting. Students will explore the relationship between business management and sustainability goals for a number of industrial sectors. The course will include case studies as a tool for assessing strategies, identifying opportunities for improvements and recommending future actions. Students will be introduced to commonly used sustainability reporting frameworks and will use them to evaluate objective-setting and progress towards green goals.</p>
                    </div>
                  </div>
                  
                  <div class="course-item">
                    <button class="course-toggle" data-target="sm587">SM 587 Environmental Law and Management (3)<span class="course-arrow">▼</span></button>
                    <div class="course-content hidden" id="sm587">
                      <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">A survey of legal and regulatory approaches to environmental protection. Topics include: environmental ethics, National Environmental Policy Act, State and Federal environmental agencies; and the Clean Water Act, Safe Drinking Water Act, Superfund, Resource Recovery and Conservation Act, Right-to-Know, Environmental Cleanup Responsibility Act, and wetlands protection.</p>
                    </div>
                  </div>
                  
                  <div class="course-item">
                    <button class="course-toggle" data-target="sm531">SM 531 Sustainable Development (3)<span class="course-arrow">▼</span></button>
                    <div class="course-content hidden" id="sm531">
                      <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">This course addresses issues of sustainable development at the local, regional and global scales. Topics include understanding of the definitions, history, current status and future outlook of sustainable development. Population dynamics, wealth distribution, principles of economic growth, social dimensions of sustainable growth (poverty, food security, health, education, social inclusion), biodiversity and ecosystem dynamics, climate change. Sustainable development stakeholders and their roles and responsibilities including individuals, advocacy groups, local, regional and country-level governing bodies, NGOs and corporations. Legal, policy and regulatory aspects of sustainable development. A systems view of sustainability and sustainable development including the concepts of global boundaries and resiliency.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>`
      },
      immersions: {
        title: "Immersion",
        content: `
          <h4 class="course-section-header">IMMERSION</h4>
          
          <p class="text-stevens-base text-stevens-gray-700 leading-relaxed mb-stevens-lg">
            One of the most invaluable components of the Online MBA program at Stevens is that it provides the opportunity to participate in two in-person industry immersions. These immersive learning experiences take place over two long weekends and occur on the Stevens Institute of Technology campus, just across the Hudson River from New York City.
          </p>
          
          <p class="text-stevens-base text-stevens-gray-700 leading-relaxed mb-stevens-lg">
            The Online MBA immersions complement online learning by furthering students' connections and knowledge in real-world settings.
          </p>
          
          <h5 class="font-stevens-bold text-stevens-lg text-stevens-gray-900 mb-stevens-md mt-stevens-xl">Benefits:</h5>
          
          <ul class="space-y-stevens-sm mb-stevens-xl">
            <li class="flex items-start gap-stevens-sm">
              <div class="flex-shrink-0 w-2 h-2 bg-stevens-primary rounded-full mt-2"></div>
              <span class="text-stevens-base text-stevens-gray-700 leading-relaxed">Meet your online MBA peers, as well as students from across other Stevens business programs.</span>
            </li>
            <li class="flex items-start gap-stevens-sm">
              <div class="flex-shrink-0 w-2 h-2 bg-stevens-primary rounded-full mt-2"></div>
              <span class="text-stevens-base text-stevens-gray-700 leading-relaxed">Gain insights from industry leaders and business executives.</span>
            </li>
            <li class="flex items-start gap-stevens-sm">
              <div class="flex-shrink-0 w-2 h-2 bg-stevens-primary rounded-full mt-2"></div>
              <span class="text-stevens-base text-stevens-gray-700 leading-relaxed">Engage face-to-face with School of Business faculty members and school administrators.</span>
            </li>
            <li class="flex items-start gap-stevens-sm">
              <div class="flex-shrink-0 w-2 h-2 bg-stevens-primary rounded-full mt-2"></div>
              <span class="text-stevens-base text-stevens-gray-700 leading-relaxed">Leverage Stevens' location by participating in social and cultural experiences across New York City with fellow students.</span>
            </li>
          </ul>
          
          <h5 class="font-stevens-bold text-stevens-lg text-stevens-gray-900 mb-stevens-md mt-stevens-xl">Learning objectives:</h5>
          
          <ul class="space-y-stevens-sm mb-stevens-xl">
            <li class="flex items-start gap-stevens-sm">
              <div class="flex-shrink-0 w-2 h-2 bg-stevens-primary rounded-full mt-2"></div>
              <span class="text-stevens-base text-stevens-gray-700 leading-relaxed">Gain a common understanding of the disruptive technologies at play in the "fourth industrial revolution" (4IR), such as artificial intelligence, quantum computing and internet of things.</span>
            </li>
            <li class="flex items-start gap-stevens-sm">
              <div class="flex-shrink-0 w-2 h-2 bg-stevens-primary rounded-full mt-2"></div>
              <span class="text-stevens-base text-stevens-gray-700 leading-relaxed">Review illustrative ways in which these emerging technologies are impacting various sectors of the economy, from retail to healthcare.</span>
            </li>
            <li class="flex items-start gap-stevens-sm">
              <div class="flex-shrink-0 w-2 h-2 bg-stevens-primary rounded-full mt-2"></div>
              <span class="text-stevens-base text-stevens-gray-700 leading-relaxed">Examine similarities and differences between the 4IR and prior periods of transformative change (e.g., earlier industrial revolutions).</span>
            </li>
            <li class="flex items-start gap-stevens-sm">
              <div class="flex-shrink-0 w-2 h-2 bg-stevens-primary rounded-full mt-2"></div>
              <span class="text-stevens-base text-stevens-gray-700 leading-relaxed">Examine different philosophical orientations toward what these technologies mean for the future of work (e.g., job elimination vs. role augmentation).</span>
            </li>
            <li class="flex items-start gap-stevens-sm">
              <div class="flex-shrink-0 w-2 h-2 bg-stevens-primary rounded-full mt-2"></div>
              <span class="text-stevens-base text-stevens-gray-700 leading-relaxed">Review the way in which these broader trends have impacted professional practice: key challenges being faced, anticipated challenges over next decade.</span>
            </li>
            <li class="flex items-start gap-stevens-sm">
              <div class="flex-shrink-0 w-2 h-2 bg-stevens-primary rounded-full mt-2"></div>
              <span class="text-stevens-base text-stevens-gray-700 leading-relaxed">Explore the role that leaders can play in stewarding effective workforce transitions within their organizations (e.g., upskilling, reskilling and augmenting).</span>
            </li>
            <li class="flex items-start gap-stevens-sm">
              <div class="flex-shrink-0 w-2 h-2 bg-stevens-primary rounded-full mt-2"></div>
              <span class="text-stevens-base text-stevens-gray-700 leading-relaxed">Review the ethical implications and challenges due to the rise of cognitive technologies, their implications on work, and the workplace and workforce.</span>
            </li>
          </ul>
          
          <div class="bg-stevens-gray-50 border-l-4 border-stevens-primary p-stevens-lg rounded-stevens-sm mt-stevens-xl">
            <p class="text-stevens-sm text-stevens-gray-700 leading-relaxed">
              Each immersion experience carries 1.5 credit hours and the related tuition. A total of 3 credit hours will count toward your degree upon completion of both immersions. Students are responsible for travel to the Hoboken area. Accommodations are included in the tuition cost.
            </p>
          </div>
        `
      }
    }
  },
  studentSpotlight: {
    name: "Olivia Fellbaum '25",
    quote: "The Online MBA has helped me gain a competitive edge because I go to school with so many different people who work in multiple industries, whether it's beauty, public health or government, and I think it has given me a sense of variety amongst the workforce and helped differentiate my network."
  },
  commonJobTitles: {
    title: "Common Job Titles for MBA Graduates"
  },
  topCompanies: {
    title: "Top Companies Hiring Stevens Alumni"
  },
  admissions: {
    variant: 'combinedWithTuition',
    requirements: `
      <div class="space-y-6">
        <div>
          <h4 class="font-bold text-lg mb-2">ACADEMIC TRANSCRIPTS</h4>
          <p>Applicants must submit transcripts from all undergraduate and graduate institutions where credit was earned. You may submit unofficial transcripts during the application process. After admission, you will be required to submit official transcripts.</p>
        </div>
        <div>
          <h4 class="font-bold text-lg mb-2">PROFESSIONAL Résumé</h4>
          <p class="mb-2">Work experience is not a requirement for the Online MBA program, but the admissions committee does value applicants with professional experience. You must include a résumé with your application that highlights:</p>
          <ul class="list-disc pl-5 space-y-1"><li>Academic record</li><li>Work and internship experience</li><li>Leadership abilities</li><li>Professional aspirations</li></ul>
        </div>
        <div>
          <h4 class="font-bold text-lg mb-2">LETTERS OF RECOMMENDATION</h4>
          <p>Your application must include two letters of recommendation. The strongest applications will include one letter from a current supervisor, and one from a former supervisor or previous employer who can speak to your leadership potential and discuss your professional performance.</p>
        </div>
        <div>
          <h4 class="font-bold text-lg mb-2">GMAT/GRE</h4>
          <p>Scores are not required.</p>
        </div>
      </div>
    `
  },
    keyDates: {
    term: "Spring 2026",
      rows: [
      { event: "Early Submit", date: "October 14, 2025" },
      { event: "Priority Submit", date: "November 11, 2025" },
      { event: "Final Submit", date: "January 5, 2026" },
      { event: "Start of Classes", date: "January 20, 2026" }
    ]
  },
  tuition: {
    cards: [{ value: "$1,993", label: "Per Credit" }, { value: "$60", label: "Application Fee" }, { value: "$250", label: "Enrollment Deposit" }],
    description: `<p>Tuition based on fall 2025 rates. Tuition and fees are subject to change annually.</p>`
  },
  events: {
    title: "On-Demand Content",
    description: "At Stevens, we host a variety of events for prospective and current students covering topics such as application strategy, program information, the student experience and our online platform. Our on-demand content is instantly available, so you can watch at your convenience.",
    fallbackText: "Check back soon for more upcoming events.",
    items: [
      {
        title: 'Student Voices: Real Stories From Stevens Graduate Programs',
        status: 'Ongoing',
        length: '45 minutes',
        url: 'https://event.on24.com/wcc/r/4970051/3D4408B63146F35B069766B71328D7CE'
      },
      {
        title: 'Depth and Breadth: Exploring MBA Concentrations at Stevens',
        status: 'Ongoing',
        length: '30 minutes',
        url: 'https://event.on24.com/wcc/r/4970049/94A0379A4671307D3BD1329BF230A114'
      },
      {
        title: 'Upskilling Your MBA: Bringing Technology and Business Together',
        status: 'Ongoing',
        length: '30 minutes',
        url: 'https://event.on24.com/wcc/r/4631559/8DACF3B1055C849FFDC65E94FFFA4C4A'
      },
      {
        title: 'A Technology-Focused MBA With Stevens Online',
        status: 'Ongoing',
        length: '30 minutes',
        url: 'https://event.on24.com/wcc/r/4791542/DAB3D7D2D76CEC991DF5B0C71A91E4CF'
      },
      {
        title: 'On Demand Application Overview: Online MBA',
        status: 'Ongoing',
        length: '18 minutes',
        url: 'https://event.on24.com/wcc/r/4670707/F1184BBC4542A137E5E8852AA0FF2DBE'
      },
      {
        title: 'Exploring the Online MBA at Stevens Institute of Technology: On-Demand Overview',
        status: 'Ongoing',
        length: '11 minutes',
        url: 'https://event.on24.com/wcc/r/4670733/9A69E9F6E360B7E9F5C93DDFD5682712?pg=2'
      },
      {
        title: 'Financial Aid Overview: Stevens Institute of Technology',
        status: 'Ongoing',
        length: '10 minutes',
        url: 'https://event.on24.com/wcc/r/5007787/EC42C1EA980050EB628E9A3DAD9BA2BB?pg=2'
      }
    ]
  },
  faculty: {
    title: "Meet the Online MBA Faculty",
    description: "Our faculty are experienced educators and active researchers who offer industry insights.",
    members: [
      { name: "Brian Rothschild", title: "Online MBA Program Director", image: "/assets/avatars/mba-avatar/brian-rothschild-stevens-institute-omba-faculty.jpg" },
      { name: "Pranav Garg, Ph.D.", title: "Assistant Professor", image: "/assets/avatars/mba-avatar/pranav-garg-stevens-faculty.jpg" },
      { name: "Gary Lynn, Ph.D.", title: "Professor", image: "/assets/avatars/mba-avatar/gary-lynn-stevens-faculty-683x1024.jpg" },
      { name: "Peter Dominick, Ph.D.", title: "Teaching Associate Professor", image: "/assets/avatars/mba-avatar/peter-dominick-stevents-faculty.jpg" },
      { name: "Bei Yan, Ph.D.", title: "Assistant Professor", image: "/assets/avatars/mba-avatar/bei-yan-stevens-faculty-1.jpg" },
      { name: "Alkiviadis Vazacopoulos, Ph.D.", title: "Teaching Associate Professor", image: "/assets/avatars/mba-avatar/alkiviadis-vazacopoulos-stevens-faculty-708x1024.jpg" },
      { name: "Ann Murphy, Ph.D.", title: "Associate Professor", image: "/assets/avatars/mba-avatar/ann-murphy-stevens-faculty.png" },
      { name: "Wei Zheng, Ph.D.", title: "Associate Professor & Endowed Richard R. Roscitt Chair in Leadership", image: "/assets/avatars/mba-avatar/wei-zheng-stevens-faculty-737x1024.png" }
    ]
  },
  faqs: [
  { q: "What jobs can you get with an MBA?", a: "An MBA qualifies you for leadership positions in virtually every industry, such as financial or sales manager, and later in executive positions, such as CEO or CFO." },
  { q: "Is an online MBA worth it?", a: "Yes. The Stevens Online MBA gives students an edge by developing their analytical and emotional intelligence skills and focusing on the complex technologies informing business decisions and strategy." }],

  accreditation: `Stevens Institute of Technology has been continually accredited by the <a href="https://www.msche.org/" target="_blank" rel="noopener noreferrer" class="text-stevens-white underline hover:text-stevens-gray-500 transition-colors duration-stevens-normal">Middle States Commission on Higher Education (MSCHE)</a> since 1927. Stevens is accredited until 2027 and the next self-study evaluation is scheduled to take place during 2026-2027. The school of business is also accredited by the <a href="https://www.aacsb.edu/" target="_blank" rel="noopener noreferrer" class="text-stevens-white underline hover:text-stevens-primary transition-colors duration-stevens-normal">AACSB</a>, placing Stevens among the five percent of business schools globally to earn this distinction.`
};

export default function MBAPage() {
  return <ProgramPageTemplate programData={programData} />;
}
