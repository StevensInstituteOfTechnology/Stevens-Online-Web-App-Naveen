/**
 * Prudential Partnership Pathways Data
 * Comprehensive learning pathways for Cybersecurity, AI Engineering, Software Development & SDLC
 * Foundation → Practitioner → Expert progression with stackable credentials
 */

// Role Presets for Personalization
export const ROLE_PRESETS = [
  { 
    id: 'cloud-security', 
    label: 'Cloud Security Engineer',
    domain: 'cybersecurity',
    defaultLevel: 'practitioner'
  },
  { 
    id: 'ai-pm', 
    label: 'AI Product Manager',
    domain: 'ai',
    defaultLevel: 'practitioner'
  },
  { 
    id: 'mlops', 
    label: 'MLOps Engineer',
    domain: 'ai',
    defaultLevel: 'expert'
  },
  { 
    id: 'model-risk', 
    label: 'Model Risk Analyst',
    domain: 'ai',
    defaultLevel: 'practitioner'
  },
  { 
    id: 'sre', 
    label: 'SRE / Platform Engineer',
    domain: 'software',
    defaultLevel: 'expert'
  },
  { 
    id: 'software-eng', 
    label: 'Software Engineer',
    domain: 'software',
    defaultLevel: 'practitioner'
  },
  { 
    id: 'eng-manager', 
    label: 'Engineering Manager',
    domain: 'manager',
    defaultLevel: 'practitioner'
  },
  { 
    id: 'cyber-risk', 
    label: 'Cyber Risk Analyst',
    domain: 'cybersecurity',
    defaultLevel: 'foundation'
  }
];

// Compliance Standards
export const COMPLIANCE_STANDARDS = [
  {
    id: 'nist-csf',
    name: 'NIST CSF',
    fullName: 'NIST Cybersecurity Framework',
    description: 'Framework for managing and reducing cybersecurity risk',
    domains: ['cybersecurity', 'software']
  },
  {
    id: 'nist-ai-rmf',
    name: 'NIST AI RMF 1.0',
    fullName: 'NIST AI Risk Management Framework',
    description: 'Framework for trustworthy AI development and deployment',
    domains: ['ai', 'manager']
  },
  {
    id: 'iso-27001',
    name: 'ISO 27001',
    fullName: 'ISO/IEC 27001',
    description: 'International standard for information security management',
    domains: ['cybersecurity', 'software']
  },
  {
    id: 'soc2',
    name: 'SOC 2',
    fullName: 'SOC 2 Type II',
    description: 'Trust principles for service organizations',
    domains: ['cybersecurity', 'software', 'ai']
  }
];

// Program Cards - Cybersecurity Domain
export const CYBERSECURITY_PROGRAMS = [
  {
    id: 'devsecops-practitioner',
    title: 'DevSecOps in CI/CD Pipelines',
    level: 'practitioner',
    duration: '6 weeks',
    credits: 3,
    modality: 'Live Online + Labs',
    stacksTo: 'Graduate Certificate in Systems Security → M.Eng.',
    outcomes: [
      'Integrate security scanning into CI/CD workflows',
      'Implement secrets management and policy-as-code',
      'Design threat models using STRIDE methodology'
    ],
    standards: ['nist-csf', 'iso-27001'],
    domain: 'cybersecurity',
    recommended: true,
    syllabus: {
      weeks: [
        'Week 1-2: Security in the pipeline, SAST/DAST tools',
        'Week 3-4: Container security, IaC scanning, secrets mgmt',
        'Week 5-6: Threat modeling, compliance automation'
      ],
      project: 'Build secure CI/CD pipeline for microservices application'
    }
  },
  {
    id: 'cloud-security-expert',
    title: 'Cloud Security Architecture',
    level: 'expert',
    duration: '8 weeks',
    credits: 3,
    modality: 'Live Online + AWS Labs',
    stacksTo: 'Graduate Certificate → M.Eng. Systems Security',
    outcomes: [
      'Design zero-trust architectures for cloud environments',
      'Implement container and Kubernetes security controls',
      'Conduct red/blue team exercises'
    ],
    standards: ['nist-csf', 'iso-27001', 'soc2'],
    domain: 'cybersecurity',
    recommended: true,
    syllabus: {
      weeks: [
        'Week 1-3: Cloud shared responsibility, IAM, encryption',
        'Week 4-6: K8s security, service mesh, network policies',
        'Week 7-8: Zero-trust design, threat hunting labs'
      ],
      project: 'Multi-cloud zero-trust architecture design'
    }
  },
  {
    id: 'appsec-foundation',
    title: 'Application Security Foundations',
    level: 'foundation',
    duration: '4 weeks',
    credits: 2,
    modality: 'Self-Paced + Live Labs',
    stacksTo: 'Practitioner tracks',
    outcomes: [
      'Identify OWASP Top 10 vulnerabilities',
      'Apply secure coding practices',
      'Perform basic security code reviews'
    ],
    standards: ['nist-csf'],
    domain: 'cybersecurity',
    recommended: false,
    syllabus: {
      weeks: [
        'Week 1: OWASP Top 10, injection attacks',
        'Week 2: Authentication, authorization, session mgmt',
        'Week 3: XSS, CSRF, security headers',
        'Week 4: Code review, static analysis tools'
      ],
      project: 'Security audit of sample web application'
    }
  },
  {
    id: 'iam-practitioner',
    title: 'Identity & Access Management',
    level: 'practitioner',
    duration: '6 weeks',
    credits: 3,
    modality: 'Live Online',
    stacksTo: 'Graduate Certificate',
    outcomes: [
      'Design OAuth 2.0 and OIDC flows',
      'Implement RBAC and ABAC models',
      'Integrate SSO and federated identity'
    ],
    standards: ['nist-csf', 'iso-27001'],
    domain: 'cybersecurity',
    recommended: false,
    syllabus: {
      weeks: [
        'Week 1-2: IAM fundamentals, RBAC/ABAC',
        'Week 3-4: OAuth, OIDC, SAML protocols',
        'Week 5-6: SSO, MFA, identity governance'
      ],
      project: 'Enterprise IAM architecture for hybrid cloud'
    }
  },
  {
    id: 'threat-modeling',
    title: 'Threat Modeling & Risk Assessment',
    level: 'practitioner',
    duration: '5 weeks',
    credits: 2,
    modality: 'Live Online',
    stacksTo: 'Graduate Certificate',
    outcomes: [
      'Conduct STRIDE and PASTA threat modeling',
      'Perform risk assessments using FAIR methodology',
      'Build threat models for distributed systems'
    ],
    standards: ['nist-csf', 'iso-27001'],
    domain: 'cybersecurity',
    recommended: false,
    syllabus: {
      weeks: [
        'Week 1: Threat modeling fundamentals',
        'Week 2-3: STRIDE, PASTA methodologies',
        'Week 4: FAIR risk quantification',
        'Week 5: Threat modeling for cloud/containers'
      ],
      project: 'Complete threat model for fintech platform'
    }
  }
];

// Program Cards - AI Engineering & Management Domain
export const AI_PROGRAMS = [
  {
    id: 'model-governance',
    title: 'Model Governance for Financial Services',
    level: 'expert',
    duration: '8 weeks',
    credits: 3,
    modality: 'Live Online',
    stacksTo: 'Graduate Certificate → MEADS',
    outcomes: [
      'Implement NIST AI RMF governance framework',
      'Design model validation and monitoring pipelines',
      'Conduct bias and fairness assessments'
    ],
    standards: ['nist-ai-rmf', 'soc2'],
    domain: 'ai',
    recommended: true,
    syllabus: {
      weeks: [
        'Week 1-2: AI governance, NIST RMF Map/Measure',
        'Week 3-4: Model risk mgmt, SR 11-7 compliance',
        'Week 5-6: Bias testing, protected-class risk',
        'Week 7-8: Audit documentation, incident response'
      ],
      project: 'Model governance framework for credit risk model'
    }
  },
  {
    id: 'mlops-practitioner',
    title: 'MLOps & Model Deployment',
    level: 'practitioner',
    duration: '7 weeks',
    credits: 3,
    modality: 'Live Online + Labs',
    stacksTo: 'Graduate Certificate → MEADS',
    outcomes: [
      'Build CI/CD pipelines for ML models',
      'Implement feature stores and model registries',
      'Design monitoring and observability for production ML'
    ],
    standards: ['nist-ai-rmf', 'soc2'],
    domain: 'ai',
    recommended: true,
    syllabus: {
      weeks: [
        'Week 1-2: MLOps fundamentals, experiment tracking',
        'Week 3-4: Feature stores, model serving patterns',
        'Week 5-6: Monitoring, drift detection, retraining',
        'Week 7: A/B testing, shadow mode deployment'
      ],
      project: 'End-to-end MLOps pipeline on AWS/Azure'
    }
  },
  {
    id: 'enterprise-ai-cert',
    title: 'Enterprise AI Certificate (BIA 568, 662, PE 810)',
    level: 'practitioner',
    duration: '8-16 weeks',
    credits: 9,
    modality: 'Live Online',
    stacksTo: 'Graduate Certificate → MBA or MEADS',
    outcomes: [
      'Design GenAI proof-of-concepts with business value',
      'Build operational AI workflows with guardrails',
      'Apply FATE principles and governance frameworks'
    ],
    standards: ['nist-ai-rmf'],
    domain: 'ai',
    recommended: true,
    isRealProgram: true,
    syllabus: {
      weeks: [
        'BIA 568: AI strategy, platforms, FATE principles',
        'BIA 662: GenAI, prompt engineering, PoC design',
        'PE 810: Operational workflows, co-coding, NLP agents'
      ],
      project: 'Working GenAI application with monitoring'
    }
  },
  {
    id: 'responsible-ai',
    title: 'Responsible AI & Ethics',
    level: 'foundation',
    duration: '4 weeks',
    credits: 2,
    modality: 'Self-Paced + Discussion',
    stacksTo: 'Practitioner tracks',
    outcomes: [
      'Apply FATE principles to AI projects',
      'Identify bias and fairness risks',
      'Design human-in-the-loop AI systems'
    ],
    standards: ['nist-ai-rmf'],
    domain: 'ai',
    recommended: false,
    syllabus: {
      weeks: [
        'Week 1: AI ethics, FATE framework',
        'Week 2: Bias sources, fairness metrics',
        'Week 3: Explainability, transparency',
        'Week 4: Human-AI interaction patterns'
      ],
      project: 'Ethics assessment of AI use case'
    }
  },
  {
    id: 'rag-architectures',
    title: 'RAG Architectures & Vector Databases',
    level: 'practitioner',
    duration: '6 weeks',
    credits: 3,
    modality: 'Live Online + Labs',
    stacksTo: 'Graduate Certificate',
    outcomes: [
      'Build retrieval-augmented generation systems',
      'Implement vector databases and semantic search',
      'Design chunking and embedding strategies'
    ],
    standards: ['nist-ai-rmf'],
    domain: 'ai',
    recommended: false,
    syllabus: {
      weeks: [
        'Week 1-2: RAG fundamentals, embedding models',
        'Week 3-4: Vector DBs (Pinecone, Weaviate, Chroma)',
        'Week 5: Chunking strategies, metadata filtering',
        'Week 6: Evaluation, optimization, production patterns'
      ],
      project: 'Enterprise knowledge base with RAG'
    }
  },
  {
    id: 'llm-safety',
    title: 'LLM Safety & Guardrails',
    level: 'expert',
    duration: '6 weeks',
    credits: 3,
    modality: 'Live Online',
    stacksTo: 'Graduate Certificate',
    outcomes: [
      'Implement content filtering and PII detection',
      'Design prompt injection defenses',
      'Build guardrails for production LLM apps'
    ],
    standards: ['nist-ai-rmf', 'soc2'],
    domain: 'ai',
    recommended: false,
    syllabus: {
      weeks: [
        'Week 1-2: LLM vulnerabilities, OWASP Top 10',
        'Week 3-4: Content moderation, PII handling',
        'Week 5: Prompt injection, jailbreaking defenses',
        'Week 6: Guardrails frameworks, production hardening'
      ],
      project: 'Production-ready LLM app with safety controls'
    }
  }
];

// Program Cards - Software Development & SDLC Domain
export const SOFTWARE_PROGRAMS = [
  {
    id: 'secure-sdlc',
    title: 'Secure SDLC & Development Controls',
    level: 'practitioner',
    duration: '6 weeks',
    credits: 3,
    modality: 'Live Online + Labs',
    stacksTo: 'Graduate Certificate → M.Eng.',
    outcomes: [
      'Integrate security gates across SDLC phases',
      'Implement trunk-based development with controls',
      'Design change-risk automation frameworks'
    ],
    standards: ['nist-csf', 'iso-27001', 'soc2'],
    domain: 'software',
    recommended: true,
    syllabus: {
      weeks: [
        'Week 1-2: SDLC overview, security touchpoints',
        'Week 3-4: Branch strategies, code review gates',
        'Week 5: Automated controls, policy enforcement',
        'Week 6: Change risk scoring, deployment safety'
      ],
      project: 'Secure SDLC pipeline for enterprise app'
    }
  },
  {
    id: 'sre-expert',
    title: 'SRE: Incident Management & Reliability',
    level: 'expert',
    duration: '8 weeks',
    credits: 3,
    modality: 'Live Online + Labs',
    stacksTo: 'Graduate Certificate → M.Eng.',
    outcomes: [
      'Design SLIs, SLOs, and error budgets',
      'Lead incident response and postmortems',
      'Apply reliability economics to prioritization'
    ],
    standards: ['soc2', 'iso-27001'],
    domain: 'software',
    recommended: true,
    syllabus: {
      weeks: [
        'Week 1-2: SRE fundamentals, SLI/SLO design',
        'Week 3-4: Incident mgmt, on-call practices',
        'Week 5-6: Postmortems, blameless culture',
        'Week 7-8: Reliability economics, toil reduction'
      ],
      project: 'SLO framework and incident playbook'
    }
  },
  {
    id: 'platform-engineering',
    title: 'Platform Engineering & Golden Paths',
    level: 'practitioner',
    duration: '7 weeks',
    credits: 3,
    modality: 'Live Online',
    stacksTo: 'Graduate Certificate',
    outcomes: [
      'Design internal developer platforms',
      'Build golden path templates and scaffolding',
      'Implement self-service infrastructure'
    ],
    standards: ['soc2'],
    domain: 'software',
    recommended: false,
    syllabus: {
      weeks: [
        'Week 1-2: Platform engineering principles',
        'Week 3-4: IDP design, Backstage, portal patterns',
        'Week 5-6: Golden paths, templates, guardrails',
        'Week 7: Self-service, metrics, adoption'
      ],
      project: 'Internal developer platform MVP'
    }
  },
  {
    id: 'dora-metrics',
    title: 'DORA Metrics & Engineering Excellence',
    level: 'foundation',
    duration: '4 weeks',
    credits: 2,
    modality: 'Self-Paced + Live Sessions',
    stacksTo: 'Practitioner tracks',
    outcomes: [
      'Measure deployment frequency and lead time',
      'Track MTTR and change failure rate',
      'Drive continuous improvement programs'
    ],
    standards: [],
    domain: 'software',
    recommended: false,
    syllabus: {
      weeks: [
        'Week 1: DORA metrics overview',
        'Week 2: Instrumentation, data collection',
        'Week 3: Analysis, benchmarking, trends',
        'Week 4: Improvement initiatives, reporting'
      ],
      project: 'DORA metrics dashboard implementation'
    }
  },
  {
    id: 'observability',
    title: 'Observability & Production Debugging',
    level: 'practitioner',
    duration: '6 weeks',
    credits: 3,
    modality: 'Live Online + Labs',
    stacksTo: 'Graduate Certificate',
    outcomes: [
      'Implement structured logging and tracing',
      'Design metrics and alerting strategies',
      'Debug production issues with distributed tracing'
    ],
    standards: ['soc2'],
    domain: 'software',
    recommended: false,
    syllabus: {
      weeks: [
        'Week 1-2: Observability fundamentals, three pillars',
        'Week 3: Structured logging, log aggregation',
        'Week 4: Metrics, time series, dashboards',
        'Week 5-6: Distributed tracing, OpenTelemetry'
      ],
      project: 'Full observability stack for microservices'
    }
  },
  {
    id: 'agile-scaled',
    title: 'Agile & Scaled Delivery',
    level: 'foundation',
    duration: '5 weeks',
    credits: 2,
    modality: 'Live Online',
    stacksTo: 'Manager tracks',
    outcomes: [
      'Apply Scrum, Kanban, XP practices',
      'Scale agile with SAFe or LeSS frameworks',
      'Lead agile transformation initiatives'
    ],
    standards: [],
    domain: 'software',
    recommended: false,
    syllabus: {
      weeks: [
        'Week 1: Agile manifesto, Scrum basics',
        'Week 2: Kanban, XP, Lean practices',
        'Week 3-4: Scaling frameworks (SAFe, LeSS)',
        'Week 5: Agile coaching, transformation'
      ],
      project: 'Agile transformation roadmap'
    }
  }
];

// Program Cards - Manager Tracks
export const MANAGER_PROGRAMS = [
  {
    id: 'ai-product-mgmt',
    title: 'AI Product Management',
    level: 'practitioner',
    duration: '7 weeks',
    credits: 3,
    modality: 'Live Online',
    stacksTo: 'MBA or Graduate Certificate',
    outcomes: [
      'Define AI product strategy and roadmaps',
      'Manage cross-functional AI development teams',
      'Measure AI product success metrics'
    ],
    standards: ['nist-ai-rmf'],
    domain: 'manager',
    recommended: true,
    syllabus: {
      weeks: [
        'Week 1-2: AI product strategy, opportunity sizing',
        'Week 3-4: Team collaboration, ML workflow',
        'Week 5-6: Metrics, A/B testing, iteration',
        'Week 7: Ethics, governance, stakeholder mgmt'
      ],
      project: 'AI product PRD and launch plan'
    }
  },
  {
    id: 'tech-leadership',
    title: 'Technology Leadership & Strategy',
    level: 'expert',
    duration: '8 weeks',
    credits: 3,
    modality: 'Live Online',
    stacksTo: 'MBA or M.Eng. Engineering Management',
    outcomes: [
      'Develop technology vision and strategy',
      'Lead digital transformation initiatives',
      'Build high-performing engineering organizations'
    ],
    standards: [],
    domain: 'manager',
    recommended: false,
    isRealProgram: true,
    syllabus: {
      weeks: [
        'Week 1-2: Tech strategy, innovation frameworks',
        'Week 3-4: Digital transformation, change mgmt',
        'Week 5-6: Engineering culture, team topologies',
        'Week 7-8: Budget, vendor mgmt, executive comms'
      ],
      project: 'Technology strategy and transformation roadmap'
    }
  },
  {
    id: 'data-driven-decisions',
    title: 'Data-Driven Decision Making',
    level: 'foundation',
    duration: '5 weeks',
    credits: 2,
    modality: 'Live Online',
    stacksTo: 'MBA or certificate programs',
    outcomes: [
      'Apply statistical thinking to business problems',
      'Design experiments and interpret results',
      'Communicate insights to stakeholders'
    ],
    standards: [],
    domain: 'manager',
    recommended: false,
    syllabus: {
      weeks: [
        'Week 1: Data literacy, visualization',
        'Week 2-3: Hypothesis testing, A/B tests',
        'Week 4: Causal inference, experimentation',
        'Week 5: Storytelling, executive dashboards'
      ],
      project: 'Business case with data analysis'
    }
  }
];

// Case Studies
export const CASE_STUDIES = [
  {
    id: 'model-governance-insurance',
    title: 'Model Governance at Scale',
    industry: 'Insurance',
    scenario: 'A large insurance carrier struggled to operationalize 40+ AI models across underwriting, claims, and fraud detection, facing regulatory scrutiny and inconsistent validation practices.',
    intervention: 'Stevens designed a Model Governance practitioner cohort covering NIST AI RMF, SR 11-7 compliance, bias testing, and audit-ready documentation. 25 model risk analysts and data scientists completed the program.',
    outcome: {
      metrics: [
        { label: 'Model Audit Findings', value: '↓ 67%', trend: 'down' },
        { label: 'Validation Cycle Time', value: '↓ 40%', trend: 'down' },
        { label: 'Bias Incidents', value: '0', trend: 'neutral' },
        { label: 'Regulatory Confidence', value: '↑ High', trend: 'up' }
      ],
      quote: '"The Stevens program gave our team a common language and framework. We moved from reactive compliance to proactive governance."',
      role: 'Chief Model Risk Officer'
    },
    domain: 'ai',
    programs: ['model-governance', 'enterprise-ai-cert']
  },
  {
    id: 'devsecops-fintech',
    title: 'DevSecOps Transformation',
    industry: 'Financial Services',
    scenario: 'A fintech firm faced 6-week security review bottlenecks, manual compliance checks, and delayed product launches while migrating to cloud infrastructure.',
    intervention: 'Stevens delivered a private DevSecOps cohort (30 engineers) covering secure CI/CD, IaC scanning, secrets management, and NIST CSF controls. Included hands-on labs with Terraform, GitHub Actions, and AWS security tools.',
    outcome: {
      metrics: [
        { label: 'Security Review Time', value: '↓ 85%', trend: 'down' },
        { label: 'Critical Vulnerabilities', value: '↓ 73%', trend: 'down' },
        { label: 'Deploy Frequency', value: '↑ 4x', trend: 'up' },
        { label: 'Failed Audits', value: '0', trend: 'neutral' }
      ],
      quote: '"We shifted security left without sacrificing velocity. Stevens helped us automate what used to take weeks."',
      role: 'VP Engineering'
    },
    domain: 'cybersecurity',
    programs: ['devsecops-practitioner', 'cloud-security-expert']
  },
  {
    id: 'sre-platform',
    title: 'SRE Capability Build',
    industry: 'Banking',
    scenario: 'A regional bank struggled with frequent outages (MTTR 4+ hours), unclear ownership, and no formal incident process as they scaled digital banking services.',
    intervention: 'Stevens designed a 12-week SRE program for 20 engineers covering SLI/SLO design, incident management, observability, and reliability economics. Paired with platform engineering fundamentals.',
    outcome: {
      metrics: [
        { label: 'MTTR', value: '↓ 78%', trend: 'down' },
        { label: 'Unplanned Outages', value: '↓ 62%', trend: 'down' },
        { label: 'SLO Compliance', value: '99.9%', trend: 'up' },
        { label: 'On-Call Burnout', value: '↓ 54%', trend: 'down' }
      ],
      quote: '"The SRE discipline transformed our culture. We now manage reliability like a product."',
      role: 'Head of Platform Engineering'
    },
    domain: 'software',
    programs: ['sre-expert', 'platform-engineering', 'observability']
  }
];

// Rails Configuration
export const RAILS = [
  {
    id: 'recommended',
    title: 'Recommended for Prudential',
    description: 'Top programs aligned with your strategic priorities',
    programs: [] // Dynamically populated based on role
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity Pathways',
    description: 'DevSecOps, Cloud Security, IAM, Threat Modeling',
    programs: CYBERSECURITY_PROGRAMS
  },
  {
    id: 'ai',
    title: 'AI Engineering & Management',
    description: 'MLOps, Model Governance, GenAI, Responsible AI',
    programs: AI_PROGRAMS
  },
  {
    id: 'software',
    title: 'Software Development & SDLC',
    description: 'Secure SDLC, SRE, Platform Engineering, Observability',
    programs: SOFTWARE_PROGRAMS
  },
  {
    id: 'manager',
    title: 'Manager & Leadership Tracks',
    description: 'AI Product Management, Tech Leadership, Strategy',
    programs: MANAGER_PROGRAMS
  }
];

// Generate recommended programs based on role
export function getRecommendedPrograms(roleId, level = null) {
  const role = ROLE_PRESETS.find(r => r.id === roleId);
  if (!role) return [];

  const domain = role.domain;
  const targetLevel = level || role.defaultLevel;

  let allPrograms = [];
  switch (domain) {
    case 'cybersecurity':
      allPrograms = CYBERSECURITY_PROGRAMS;
      break;
    case 'ai':
      allPrograms = AI_PROGRAMS;
      break;
    case 'software':
      allPrograms = SOFTWARE_PROGRAMS;
      break;
    case 'manager':
      allPrograms = MANAGER_PROGRAMS;
      break;
    default:
      allPrograms = [...CYBERSECURITY_PROGRAMS, ...AI_PROGRAMS, ...SOFTWARE_PROGRAMS, ...MANAGER_PROGRAMS];
  }

  // Filter by recommended flag and level
  return allPrograms.filter(p => 
    p.recommended || p.level === targetLevel
  ).slice(0, 6); // Limit to 6 recommendations
}

// Get pathway progression
export function getPathwayProgression(domain, startLevel = 'foundation') {
  let programs = [];
  switch (domain) {
    case 'cybersecurity':
      programs = CYBERSECURITY_PROGRAMS;
      break;
    case 'ai':
      programs = AI_PROGRAMS;
      break;
    case 'software':
      programs = SOFTWARE_PROGRAMS;
      break;
    case 'manager':
      programs = MANAGER_PROGRAMS;
      break;
  }

  const levels = ['foundation', 'practitioner', 'expert'];
  const startIndex = levels.indexOf(startLevel);
  
  return levels.slice(startIndex).map(level => ({
    level,
    programs: programs.filter(p => p.level === level)
  }));
}

// Export all data
export const PRUDENTIAL_DATA = {
  rolePresets: ROLE_PRESETS,
  complianceStandards: COMPLIANCE_STANDARDS,
  rails: RAILS,
  caseStudies: CASE_STUDIES,
  allPrograms: [...CYBERSECURITY_PROGRAMS, ...AI_PROGRAMS, ...SOFTWARE_PROGRAMS, ...MANAGER_PROGRAMS]
};

