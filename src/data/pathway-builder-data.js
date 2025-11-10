/**
 * Pathway Builder Mock Data
 * Demonstrates certificate progression logic with three pillars
 */

// Three Pillars
export const PILLARS = [
  {
    id: 'cybersecurity',
    label: 'Cybersecurity',
    description: 'DevSecOps, Cloud Security, IAM, Threat Modeling'
  },
  {
    id: 'ai',
    label: 'AI & Machine Learning',
    description: 'MLOps, Model Governance, GenAI, Responsible AI'
  },
  {
    id: 'software',
    label: 'Software Engineering',
    description: 'Secure SDLC, SRE, Platform Engineering, Observability'
  }
];

// Tracks (8 tracks belonging to 3 pillars)
export const TRACKS = [
  // Cybersecurity Pillar
  {
    id: 'cloud-security',
    label: 'Cloud Security Engineer',
    pillar: 'cybersecurity',
    description: 'Cloud security, IAM, and infrastructure protection'
  },
  {
    id: 'cyber-risk',
    label: 'Cyber Risk Analyst',
    pillar: 'cybersecurity',
    description: 'Risk assessment, threat modeling, and compliance'
  },
  {
    id: 'devsecops',
    label: 'DevSecOps Engineer',
    pillar: 'cybersecurity',
    description: 'Secure development, CI/CD security, and automation'
  },
  // AI Pillar
  {
    id: 'ai-pm',
    label: 'AI Product Manager',
    pillar: 'ai',
    description: 'AI product strategy, GenAI applications, and governance'
  },
  {
    id: 'mlops',
    label: 'MLOps Engineer',
    pillar: 'ai',
    description: 'ML pipelines, model deployment, and operations'
  },
  {
    id: 'model-risk',
    label: 'Model Risk Analyst',
    pillar: 'ai',
    description: 'Model governance, validation, and risk management'
  },
  // Software Pillar
  {
    id: 'sre',
    label: 'SRE / Platform Engineer',
    pillar: 'software',
    description: 'Site reliability, platform engineering, and observability'
  },
  {
    id: 'software-eng',
    label: 'Software Engineer',
    pillar: 'software',
    description: 'Secure SDLC, software architecture, and best practices'
  }
];

// Certificate stages
export const CERTIFICATE_STAGES = {
  stage1: {
    name: 'Professional Graduate Certificate',
    requiredCourses: 3,
    requiredCredits: 9,
    samePillar: true,
    certificateId: 'professional-graduate'
  },
  stage2: {
    name: 'Graduate Certificate',
    requiredCourses: 4,
    requiredCredits: 12,
    samePillar: true,
    certificateId: 'graduate',
    requiresStage1: true
  },
  stage3: {
    name: "Master's Degree",
    requiredCourses: 3,
    requiredCredits: 9,
    samePillar: false,
    certificateId: 'masters',
    requiresStage2: true
  }
};

// Mock courses with certificate assignments
// Design principles:
// - Stage 1: 6-7 courses available, select 3 (9 credits) - mostly Foundation, some Practitioner
// - Stage 2: 8-10 courses available, select 4 (12 credits) - mostly Practitioner, some Foundation/Expert, prioritize cross-pillar
// - Stage 3: All courses available, select 3 (9 credits) - complete freedom, can include Manager courses
// - Certificates stack: Stage 1 cert + Stage 2 cert + Stage 3 courses = Master's Degree
export const PATHWAY_COURSES = [
  // ========== CYBERSECURITY PILLAR ==========
  // Stage 1 (Professional Graduate Certificate) - 6 courses available, select 3
  {
    id: 'cyber-foundation-1',
    title: 'Cloud Security Fundamentals',
    level: 'foundation',
    credits: 3,
    duration: '6 weeks',
    pillars: ['cybersecurity'],
    certificates: ['professional-graduate'],
    description: 'Introduction to cloud security models, IAM basics, and infrastructure protection.',
    outcomes: [
      'Understand cloud security shared responsibility model',
      'Implement basic identity and access management',
      'Secure cloud infrastructure components'
    ]
  },
  {
    id: 'cyber-foundation-2',
    title: 'Network Security Basics',
    level: 'foundation',
    credits: 3,
    duration: '5 weeks',
    pillars: ['cybersecurity'],
    certificates: ['professional-graduate'],
    description: 'Fundamentals of network security, firewalls, intrusion detection, and VPNs.',
    outcomes: [
      'Configure network security controls',
      'Implement firewall rules and policies',
      'Detect and respond to network threats'
    ]
  },
  {
    id: 'cyber-foundation-3',
    title: 'Security Fundamentals',
    level: 'foundation',
    credits: 3,
    duration: '6 weeks',
    pillars: ['cybersecurity'],
    certificates: ['professional-graduate'],
    description: 'Core security concepts: CIA triad, threat modeling basics, risk assessment.',
    outcomes: [
      'Understand security fundamentals and principles',
      'Apply security best practices',
      'Identify and assess security risks'
    ]
  },
  {
    id: 'cyber-foundation-4',
    title: 'Cryptography Essentials',
    level: 'foundation',
    credits: 3,
    duration: '5 weeks',
    pillars: ['cybersecurity'],
    certificates: ['professional-graduate'],
    description: 'Introduction to encryption, hashing, digital signatures, and key management.',
    outcomes: [
      'Understand cryptographic concepts',
      'Apply encryption in practice',
      'Manage cryptographic keys securely'
    ]
  },
  {
    id: 'cyber-foundation-5',
    title: 'Security Compliance Basics',
    level: 'foundation',
    credits: 3,
    duration: '6 weeks',
    pillars: ['cybersecurity'],
    certificates: ['professional-graduate'],
    description: 'Introduction to security frameworks: NIST CSF, ISO 27001 basics, compliance requirements.',
    outcomes: [
      'Understand security frameworks',
      'Apply compliance requirements',
      'Conduct basic security audits'
    ]
  },
  {
    id: 'cyber-practitioner-stage1',
    title: 'DevSecOps Introduction',
    level: 'practitioner',
    credits: 3,
    duration: '7 weeks',
    pillars: ['cybersecurity'],
    certificates: ['professional-graduate'],
    description: 'Integrate security into CI/CD pipelines, automated security testing, and secure development practices.',
    outcomes: [
      'Implement security in CI/CD workflows',
      'Perform automated security code reviews',
      'Integrate security testing tools'
    ]
  },
  {
    id: 'cyber-practitioner-stage1-2',
    title: 'Identity & Access Management Basics',
    level: 'practitioner',
    credits: 3,
    duration: '6 weeks',
    pillars: ['cybersecurity'],
    certificates: ['professional-graduate'],
    description: 'IAM fundamentals: authentication, authorization, RBAC, and SSO basics.',
    outcomes: [
      'Design basic IAM architectures',
      'Implement RBAC models',
      'Configure SSO solutions'
    ]
  },

  // Stage 2 (Graduate Certificate) - 8 courses available, select 4
  {
    id: 'cyber-practitioner-1',
    title: 'DevSecOps & Secure Development',
    level: 'practitioner',
    credits: 3,
    duration: '7 weeks',
    pillars: ['cybersecurity'],
    certificates: ['graduate'],
    description: 'Advanced DevSecOps practices: comprehensive pipelines, security controls, threat modeling.',
    outcomes: [
      'Build comprehensive DevSecOps pipelines',
      'Implement advanced security controls',
      'Conduct threat modeling using STRIDE'
    ]
  },
  {
    id: 'devsecops-practitioner',
    title: 'DevSecOps in CI/CD Pipelines',
    level: 'practitioner',
    credits: 3,
    duration: '6 weeks',
    pillars: ['cybersecurity'],
    certificates: ['graduate'],
    description: 'Integrate security scanning, secrets management, policy-as-code in CI/CD workflows.',
    outcomes: [
      'Integrate security scanning into CI/CD workflows',
      'Implement secrets management and policy-as-code',
      'Design threat models using STRIDE methodology'
    ]
  },
  {
    id: 'cyber-practitioner-2',
    title: 'Secure SDLC & Development Controls',
    level: 'practitioner',
    credits: 3,
    duration: '6 weeks',
    pillars: ['cybersecurity', 'software'], // Cross-pillar course
    certificates: ['graduate'],
    description: 'Build secure software development processes: security gates, code review, change risk automation.',
    outcomes: [
      'Design secure development processes',
      'Implement security controls across SDLC',
      'Conduct comprehensive threat modeling'
    ]
  },
  {
    id: 'cyber-practitioner-3',
    title: 'Cloud Security Architecture',
    level: 'practitioner',
    credits: 3,
    duration: '7 weeks',
    pillars: ['cybersecurity'],
    certificates: ['graduate'],
    description: 'Design secure cloud architectures: zero-trust principles, container security, compliance.',
    outcomes: [
      'Design secure cloud architectures',
      'Implement security patterns and controls',
      'Ensure regulatory compliance'
    ]
  },
  {
    id: 'cyber-practitioner-4',
    title: 'Identity & Access Management',
    level: 'practitioner',
    credits: 3,
    duration: '6 weeks',
    pillars: ['cybersecurity'],
    certificates: ['graduate'],
    description: 'Advanced IAM: OAuth 2.0, OIDC, SAML, RBAC/ABAC models, federated identity.',
    outcomes: [
      'Design enterprise IAM architectures',
      'Implement zero-trust models',
      'Manage complex access controls'
    ]
  },
  {
    id: 'cyber-practitioner-5',
    title: 'Threat Modeling & Risk Assessment',
    level: 'practitioner',
    credits: 3,
    duration: '5 weeks',
    pillars: ['cybersecurity'],
    certificates: ['graduate'],
    description: 'Conduct STRIDE and PASTA threat modeling, perform risk assessments using FAIR methodology.',
    outcomes: [
      'Conduct STRIDE and PASTA threat modeling',
      'Perform risk assessments using FAIR methodology',
      'Build threat models for distributed systems'
    ]
  },
  {
    id: 'cyber-foundation-stage2',
    title: 'Security Operations & Monitoring',
    level: 'foundation',
    credits: 3,
    duration: '6 weeks',
    pillars: ['cybersecurity'],
    certificates: ['graduate'],
    description: 'Security operations basics: SIEM, log analysis, incident detection, and response workflows.',
    outcomes: [
      'Configure SIEM systems',
      'Analyze security logs',
      'Respond to security incidents'
    ]
  },
  {
    id: 'cyber-expert-stage2',
    title: 'Advanced Threat Modeling',
    level: 'expert',
    credits: 3,
    duration: '8 weeks',
    pillars: ['cybersecurity'],
    certificates: ['graduate'],
    description: 'Advanced threat modeling techniques: attack trees, threat intelligence, advanced risk assessment.',
    outcomes: [
      'Perform comprehensive threat modeling',
      'Assess and mitigate complex security risks',
      'Design advanced security architectures'
    ]
  },

  // Stage 3 (Master's Degree) - Expert level, free selection
  {
    id: 'cyber-expert-1',
    title: 'Security Architecture & Compliance',
    level: 'expert',
    credits: 3,
    duration: '8 weeks',
    pillars: ['cybersecurity'],
    certificates: [],
    description: 'Design enterprise security architectures, ensure regulatory compliance, implement security governance.',
    outcomes: [
      'Design enterprise security architectures',
      'Ensure regulatory compliance',
      'Implement security governance frameworks'
    ]
  },
  {
    id: 'cyber-expert-2',
    title: 'Risk Assessment & Management',
    level: 'expert',
    credits: 3,
    duration: '7 weeks',
    pillars: ['cybersecurity'],
    certificates: [],
    description: 'Advanced risk assessment and management: quantitative risk analysis, risk mitigation strategies.',
    outcomes: [
      'Perform comprehensive risk assessments',
      'Develop risk mitigation strategies',
      'Manage enterprise security programs'
    ]
  },
  {
    id: 'cloud-security-expert',
    title: 'Cloud Security Architecture',
    level: 'expert',
    credits: 3,
    duration: '8 weeks',
    pillars: ['cybersecurity'],
    certificates: [],
    description: 'Design zero-trust architectures for cloud environments, implement container and Kubernetes security.',
    outcomes: [
      'Design zero-trust architectures for cloud environments',
      'Implement container and Kubernetes security controls',
      'Conduct red/blue team exercises'
    ]
  },

  // ========== AI PILLAR ==========
  // Stage 1 - 6 courses available, select 3
  {
    id: 'ai-foundation-1',
    title: 'AI Fundamentals & Machine Learning Basics',
    level: 'foundation',
    credits: 3,
    duration: '6 weeks',
    pillars: ['ai'],
    certificates: ['professional-graduate'],
    description: 'Introduction to AI concepts, machine learning fundamentals, supervised and unsupervised learning.',
    outcomes: [
      'Understand core AI and ML concepts',
      'Implement basic machine learning models',
      'Evaluate model performance'
    ]
  },
  {
    id: 'ai-foundation-2',
    title: 'Data Science for AI',
    level: 'foundation',
    credits: 3,
    duration: '5 weeks',
    pillars: ['ai'],
    certificates: ['professional-graduate'],
    description: 'Data preprocessing, feature engineering, exploratory data analysis, and data quality.',
    outcomes: [
      'Master data preprocessing techniques',
      'Perform feature engineering',
      'Conduct exploratory data analysis'
    ]
  },
  {
    id: 'ai-foundation-3',
    title: 'Responsible AI',
    level: 'foundation',
    credits: 3,
    duration: '4 weeks',
    pillars: ['ai'],
    certificates: ['professional-graduate'],
    description: 'Introduction to responsible AI principles: fairness, accountability, transparency, ethics.',
    outcomes: [
      'Understand AI ethics and fairness',
      'Identify bias in AI systems',
      'Apply responsible AI principles'
    ]
  },
  {
    id: 'ai-foundation-4',
    title: 'Python for Data Science',
    level: 'foundation',
    credits: 3,
    duration: '6 weeks',
    pillars: ['ai'],
    certificates: ['professional-graduate'],
    description: 'Python programming for data science: pandas, numpy, matplotlib, data manipulation.',
    outcomes: [
      'Master Python for data science',
      'Use pandas and numpy effectively',
      'Create data visualizations'
    ]
  },
  {
    id: 'ai-foundation-5',
    title: 'Statistics for Machine Learning',
    level: 'foundation',
    credits: 3,
    duration: '5 weeks',
    pillars: ['ai'],
    certificates: ['professional-graduate'],
    description: 'Statistical foundations: probability, distributions, hypothesis testing, regression analysis.',
    outcomes: [
      'Understand statistical concepts',
      'Apply statistical methods to ML',
      'Interpret statistical results'
    ]
  },
  {
    id: 'ai-practitioner-stage1',
    title: 'MLOps Basics',
    level: 'practitioner',
    credits: 3,
    duration: '7 weeks',
    pillars: ['ai'],
    certificates: ['professional-graduate'],
    description: 'Introduction to MLOps: model deployment basics, experiment tracking, simple pipelines.',
    outcomes: [
      'Understand MLOps fundamentals',
      'Build basic ML pipelines',
      'Deploy simple models'
    ]
  },
  {
    id: 'ai-practitioner-stage1-2',
    title: 'GenAI Applications Introduction',
    level: 'practitioner',
    credits: 3,
    duration: '6 weeks',
    pillars: ['ai'],
    certificates: ['professional-graduate'],
    description: 'Introduction to generative AI: prompt engineering, LLM basics, simple GenAI applications.',
    outcomes: [
      'Understand GenAI concepts',
      'Apply prompt engineering',
      'Build simple GenAI applications'
    ]
  },

  // Stage 2 - 9 courses available, select 4
  {
    id: 'ai-practitioner-1',
    title: 'MLOps & Model Deployment',
    level: 'practitioner',
    credits: 3,
    duration: '7 weeks',
    pillars: ['ai'],
    certificates: ['graduate'],
    description: 'Build CI/CD pipelines for ML models, implement feature stores, model registries, production deployment.',
    outcomes: [
      'Build CI/CD pipelines for ML models',
      'Implement feature stores and model registries',
      'Deploy models to production'
    ]
  },
  {
    id: 'ai-practitioner-2',
    title: 'Model Governance for Financial Services',
    level: 'practitioner',
    credits: 3,
    duration: '8 weeks',
    pillars: ['ai'],
    certificates: ['graduate'],
    description: 'Implement NIST AI RMF governance framework, model validation pipelines, bias assessments.',
    outcomes: [
      'Implement NIST AI RMF governance framework',
      'Design model validation pipelines',
      'Conduct bias and fairness assessments'
    ]
  },
  {
    id: 'ai-practitioner-3',
    title: 'Responsible AI & Model Governance',
    level: 'practitioner',
    credits: 3,
    duration: '6 weeks',
    pillars: ['ai'],
    certificates: ['graduate'],
    description: 'Ensure AI models are fair, transparent, and compliant: fairness metrics, explainability, documentation.',
    outcomes: [
      'Implement fairness and bias detection',
      'Create comprehensive model documentation',
      'Ensure regulatory compliance'
    ]
  },
  {
    id: 'ai-practitioner-4',
    title: 'GenAI Applications',
    level: 'practitioner',
    credits: 3,
    duration: '7 weeks',
    pillars: ['ai'],
    certificates: ['graduate'],
    description: 'Build and deploy generative AI applications: RAG systems, prompt engineering, GenAI workflows.',
    outcomes: [
      'Build GenAI applications',
      'Implement RAG systems',
      'Apply advanced prompt engineering'
    ]
  },
  {
    id: 'rag-architectures',
    title: 'RAG Architectures & Vector Databases',
    level: 'practitioner',
    credits: 3,
    duration: '6 weeks',
    pillars: ['ai'],
    certificates: ['graduate'],
    description: 'Build retrieval-augmented generation systems, implement vector databases, semantic search.',
    outcomes: [
      'Build retrieval-augmented generation systems',
      'Implement vector databases and semantic search',
      'Design chunking and embedding strategies'
    ]
  },
  {
    id: 'ai-practitioner-5',
    title: 'Model Monitoring & Observability',
    level: 'practitioner',
    credits: 3,
    duration: '6 weeks',
    pillars: ['ai'],
    certificates: ['graduate'],
    description: 'Monitor ML models in production: drift detection, performance tracking, alerting systems.',
    outcomes: [
      'Implement model monitoring systems',
      'Detect data and concept drift',
      'Set up alerting for model issues'
    ]
  },
  {
    id: 'ai-foundation-stage2',
    title: 'Deep Learning Fundamentals',
    level: 'foundation',
    credits: 3,
    duration: '6 weeks',
    pillars: ['ai'],
    certificates: ['graduate'],
    description: 'Introduction to neural networks, deep learning basics, CNN and RNN fundamentals.',
    outcomes: [
      'Understand neural network architectures',
      'Build basic deep learning models',
      'Apply CNNs and RNNs'
    ]
  },
  {
    id: 'ai-expert-stage2',
    title: 'Advanced Model Governance',
    level: 'expert',
    credits: 3,
    duration: '8 weeks',
    pillars: ['ai'],
    certificates: ['graduate'],
    description: 'Advanced model governance: comprehensive frameworks, advanced validation, model risk management.',
    outcomes: [
      'Design comprehensive governance frameworks',
      'Implement advanced validation techniques',
      'Manage model risk at scale'
    ]
  },

  // Stage 3 - Expert level, free selection
  {
    id: 'ai-expert-1',
    title: 'GenAI & Large Language Models',
    level: 'expert',
    credits: 3,
    duration: '7 weeks',
    pillars: ['ai'],
    certificates: [],
    description: 'Advanced GenAI: fine-tune and deploy LLMs, build RAG applications, advanced prompt engineering.',
    outcomes: [
      'Fine-tune and deploy LLMs',
      'Build advanced RAG applications',
      'Implement sophisticated prompt engineering strategies'
    ]
  },
  {
    id: 'ai-expert-2',
    title: 'Advanced AI Risk Management',
    level: 'expert',
    credits: 3,
    duration: '8 weeks',
    pillars: ['ai'],
    certificates: [],
    description: 'Advanced AI risk management in financial services: comprehensive frameworks, monitoring, governance.',
    outcomes: [
      'Design comprehensive risk frameworks',
      'Implement advanced monitoring systems',
      'Manage AI risk at enterprise scale'
    ]
  },
  {
    id: 'llm-safety',
    title: 'LLM Safety & Guardrails',
    level: 'expert',
    credits: 3,
    duration: '6 weeks',
    pillars: ['ai'],
    certificates: [],
    description: 'Implement content filtering, PII detection, prompt injection defenses, production guardrails.',
    outcomes: [
      'Implement content filtering and PII detection',
      'Design prompt injection defenses',
      'Build guardrails for production LLM apps'
    ]
  },
  {
    id: 'model-governance',
    title: 'Model Governance for Financial Services',
    level: 'expert',
    credits: 3,
    duration: '8 weeks',
    pillars: ['ai'],
    certificates: [],
    description: 'Advanced model governance: NIST AI RMF implementation, validation pipelines, monitoring systems.',
    outcomes: [
      'Implement NIST AI RMF governance framework',
      'Design model validation and monitoring pipelines',
      'Conduct comprehensive bias and fairness assessments'
    ]
  },

  // ========== SOFTWARE PILLAR ==========
  // Stage 1 - 6 courses available, select 3
  {
    id: 'soft-foundation-1',
    title: 'Software Engineering Fundamentals',
    level: 'foundation',
    credits: 3,
    duration: '6 weeks',
    pillars: ['software'],
    certificates: ['professional-graduate'],
    description: 'Core software engineering principles: design patterns, architecture, best practices.',
    outcomes: [
      'Apply software engineering principles',
      'Design software architectures',
      'Implement best practices'
    ]
  },
  {
    id: 'soft-foundation-2',
    title: 'Agile & Scaled Agile',
    level: 'foundation',
    credits: 3,
    duration: '5 weeks',
    pillars: ['software'],
    certificates: ['professional-graduate'],
    description: 'Agile methodologies: Scrum, Kanban, scaled agile frameworks (SAFe, LeSS).',
    outcomes: [
      'Apply Scrum and Kanban',
      'Scale agile practices',
      'Facilitate agile ceremonies'
    ]
  },
  {
    id: 'soft-foundation-3',
    title: 'Secure Development Basics',
    level: 'foundation',
    credits: 3,
    duration: '6 weeks',
    pillars: ['software'],
    certificates: ['professional-graduate'],
    description: 'Introduction to secure software development: OWASP Top 10, secure coding practices.',
    outcomes: [
      'Understand secure coding practices',
      'Identify common vulnerabilities',
      'Apply security principles'
    ]
  },
  {
    id: 'soft-foundation-4',
    title: 'Version Control & Collaboration',
    level: 'foundation',
    credits: 3,
    duration: '5 weeks',
    pillars: ['software'],
    certificates: ['professional-graduate'],
    description: 'Git workflows, branching strategies, code review practices, collaboration tools.',
    outcomes: [
      'Master Git workflows',
      'Implement branching strategies',
      'Conduct effective code reviews'
    ]
  },
  {
    id: 'soft-foundation-5',
    title: 'Testing Fundamentals',
    level: 'foundation',
    credits: 3,
    duration: '6 weeks',
    pillars: ['software'],
    certificates: ['professional-graduate'],
    description: 'Software testing basics: unit testing, integration testing, test-driven development.',
    outcomes: [
      'Write effective unit tests',
      'Implement integration testing',
      'Apply TDD principles'
    ]
  },
  {
    id: 'soft-practitioner-stage1',
    title: 'Platform Engineering Basics',
    level: 'practitioner',
    credits: 3,
    duration: '7 weeks',
    pillars: ['software'],
    certificates: ['professional-graduate'],
    description: 'Introduction to platform engineering: developer platforms, self-service infrastructure basics.',
    outcomes: [
      'Understand platform engineering concepts',
      'Build basic developer platforms',
      'Enable developer productivity'
    ]
  },
  {
    id: 'soft-practitioner-stage1-2',
    title: 'CI/CD Fundamentals',
    level: 'practitioner',
    credits: 3,
    duration: '6 weeks',
    pillars: ['software'],
    certificates: ['professional-graduate'],
    description: 'CI/CD basics: pipeline design, automation, deployment strategies, tooling.',
    outcomes: [
      'Design CI/CD pipelines',
      'Automate build and deployment',
      'Implement deployment strategies'
    ]
  },

  // Stage 2 - 9 courses available, select 4
  {
    id: 'soft-practitioner-1',
    title: 'Platform Engineering & Golden Paths',
    level: 'practitioner',
    credits: 3,
    duration: '7 weeks',
    pillars: ['software'],
    certificates: ['graduate'],
    description: 'Build internal developer platforms, golden path templates, self-service infrastructure.',
    outcomes: [
      'Design internal developer platforms',
      'Build golden path templates',
      'Enable developer productivity'
    ]
  },
  {
    id: 'soft-practitioner-2',
    title: 'Observability & Production Debugging',
    level: 'practitioner',
    credits: 3,
    duration: '6 weeks',
    pillars: ['software'],
    certificates: ['graduate'],
    description: 'Implement structured logging, tracing, monitoring: three pillars of observability.',
    outcomes: [
      'Implement structured logging and tracing',
      'Design metrics and alerting strategies',
      'Debug production issues effectively'
    ]
  },
  {
    id: 'soft-practitioner-3',
    title: 'Secure SDLC & Development Controls',
    level: 'practitioner',
    credits: 3,
    duration: '6 weeks',
    pillars: ['software', 'cybersecurity'], // Cross-pillar course
    certificates: ['graduate'],
    description: 'Build secure software development processes: security gates, code review, change risk automation.',
    outcomes: [
      'Design secure development processes',
      'Implement security controls across SDLC',
      'Conduct comprehensive threat modeling'
    ]
  },
  {
    id: 'soft-practitioner-4',
    title: 'DORA Metrics & Engineering Excellence',
    level: 'practitioner',
    credits: 3,
    duration: '7 weeks',
    pillars: ['software'],
    certificates: ['graduate'],
    description: 'Measure and improve engineering performance: deployment frequency, MTTR, change failure rate.',
    outcomes: [
      'Measure deployment frequency and lead time',
      'Track MTTR and change failure rate',
      'Drive engineering excellence programs'
    ]
  },
  {
    id: 'soft-practitioner-5',
    title: 'Microservices Architecture',
    level: 'practitioner',
    credits: 3,
    duration: '7 weeks',
    pillars: ['software'],
    certificates: ['graduate'],
    description: 'Design microservices: service decomposition, API design, service mesh, distributed systems.',
    outcomes: [
      'Design microservices architectures',
      'Implement service communication patterns',
      'Manage distributed systems'
    ]
  },
  {
    id: 'soft-practitioner-6',
    title: 'Container Orchestration',
    level: 'practitioner',
    credits: 3,
    duration: '6 weeks',
    pillars: ['software'],
    certificates: ['graduate'],
    description: 'Kubernetes fundamentals: pods, services, deployments, scaling, and operations.',
    outcomes: [
      'Deploy applications on Kubernetes',
      'Manage container orchestration',
      'Scale and operate containerized systems'
    ]
  },
  {
    id: 'soft-foundation-stage2',
    title: 'DevOps Fundamentals',
    level: 'foundation',
    credits: 3,
    duration: '6 weeks',
    pillars: ['software'],
    certificates: ['graduate'],
    description: 'Core DevOps practices: infrastructure as code, automation, CI/CD, cloud basics.',
    outcomes: [
      'Understand DevOps principles',
      'Implement infrastructure as code',
      'Automate deployments'
    ]
  },
  {
    id: 'soft-practitioner-7',
    title: 'API Design & Management',
    level: 'practitioner',
    credits: 3,
    duration: '6 weeks',
    pillars: ['software'],
    certificates: ['graduate'],
    description: 'Design RESTful APIs, GraphQL, API versioning, documentation, and management.',
    outcomes: [
      'Design RESTful and GraphQL APIs',
      'Implement API versioning strategies',
      'Manage API lifecycle'
    ]
  },
  {
    id: 'soft-expert-stage2',
    title: 'Distributed Systems Design',
    level: 'expert',
    credits: 3,
    duration: '8 weeks',
    pillars: ['software'],
    certificates: ['graduate'],
    description: 'Design distributed systems: consistency, availability, partitioning, consensus algorithms.',
    outcomes: [
      'Design distributed system architectures',
      'Handle consistency and availability trade-offs',
      'Implement distributed algorithms'
    ]
  },

  // Stage 3 - Expert level, free selection
  {
    id: 'soft-expert-1',
    title: 'SRE: Incident Management & Reliability',
    level: 'expert',
    credits: 3,
    duration: '8 weeks',
    pillars: ['software'],
    certificates: [],
    description: 'Site reliability engineering: SLI/SLO design, incident management, reliability economics.',
    outcomes: [
      'Design SLIs, SLOs, and error budgets',
      'Lead incident response and postmortems',
      'Apply reliability economics'
    ]
  },
  {
    id: 'soft-expert-2',
    title: 'Advanced Platform Engineering',
    level: 'expert',
    credits: 3,
    duration: '8 weeks',
    pillars: ['software'],
    certificates: [],
    description: 'Advanced platform engineering: enterprise platforms, advanced patterns, developer experience optimization.',
    outcomes: [
      'Design enterprise platforms',
      'Implement advanced platform patterns',
      'Optimize developer experience'
    ]
  },
  {
    id: 'soft-expert-3',
    title: 'Cloud-Native Architecture',
    level: 'expert',
    credits: 3,
    duration: '7 weeks',
    pillars: ['software'],
    certificates: [],
    description: 'Design cloud-native systems: serverless, event-driven architectures, cloud patterns.',
    outcomes: [
      'Design serverless architectures',
      'Implement event-driven systems',
      'Apply cloud-native patterns'
    ]
  },

  // ========== MANAGER & LEADERSHIP (Electives for Stage 3) ==========
  {
    id: 'manager-1',
    title: 'AI Product Management',
    level: 'practitioner',
    credits: 3,
    duration: '7 weeks',
    pillars: ['manager'],
    certificates: [],
    description: 'Product management for AI-powered products: strategy, roadmaps, team collaboration, metrics.',
    outcomes: [
      'Design AI product strategies',
      'Manage AI product lifecycles',
      'Drive AI product adoption'
    ]
  },
  {
    id: 'manager-2',
    title: 'Technology Leadership & Strategy',
    level: 'expert',
    credits: 3,
    duration: '8 weeks',
    pillars: ['manager'],
    certificates: [],
    description: 'Technology leadership: vision, digital transformation, engineering culture, strategic planning.',
    outcomes: [
      'Develop technology vision and strategy',
      'Lead digital transformation initiatives',
      'Build high-performing engineering organizations'
    ]
  },
  {
    id: 'manager-3',
    title: 'Data-Driven Decision Making',
    level: 'foundation',
    credits: 3,
    duration: '5 weeks',
    pillars: ['manager'],
    certificates: [],
    description: 'Apply statistical thinking to business decisions: experiments, A/B testing, insights communication.',
    outcomes: [
      'Apply statistical thinking',
      'Design and interpret experiments',
      'Communicate insights effectively'
    ]
  },
  {
    id: 'manager-4',
    title: 'Engineering Management',
    level: 'practitioner',
    credits: 3,
    duration: '7 weeks',
    pillars: ['manager'],
    certificates: [],
    description: 'Manage engineering teams: hiring, performance, technical leadership, team dynamics.',
    outcomes: [
      'Hire and develop engineering talent',
      'Manage team performance',
      'Lead technical initiatives'
    ]
  }
];

// Helper constants for UI display
export const LEVEL_ORDER = ['foundation', 'practitioner', 'expert'];

export const PILLAR_LABELS = {
  cybersecurity: 'Cybersecurity',
  ai: 'AI & Machine Learning',
  software: 'Software Engineering',
  manager: 'Manager & Leadership'
};

export const LEVEL_LABELS = {
  foundation: 'Foundation',
  practitioner: 'Practitioner',
  expert: 'Expert'
};

// Fixed recommended learning order (10 courses, one from each pillar)
// This is displayed in Step 5 (View Learning Path)
export const RECOMMENDED_LEARNING_ORDER = [
  'cyber-foundation-1',      // Cybersecurity: Cloud Security Fundamentals
  'ai-foundation-1',           // AI: AI Fundamentals & Machine Learning Basics
  'soft-foundation-1',         // Software: Software Engineering Fundamentals
  'cyber-practitioner-1',      // Cybersecurity: DevSecOps & Secure Development
  'ai-practitioner-1',         // AI: MLOps & Model Deployment
  'soft-practitioner-1',       // Software: Platform Engineering & Golden Paths
  'cyber-practitioner-2',     // Cybersecurity: Secure SDLC & Development Controls (Cross-pillar)
  'ai-practitioner-4',         // AI: GenAI Applications
  'soft-practitioner-2',       // Software: Observability & Production Debugging
  'cyber-expert-1'            // Cybersecurity: Security Architecture & Compliance
];
