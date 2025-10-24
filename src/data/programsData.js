/**
 * Centralized Program Data for Admissions Page
 * Single source of truth for all graduate programs
 */

export const PROGRAMS_DATA = [
  {
    id: 'mscs',
    code: 'mscs',
    name: 'Master of Science in Computer Science',
    shortName: 'M.S. Computer Science',
    degree: 'M.S.',
    tagline: 'Build What\'s Next in Tech',
    description: 'Master advanced computer science skills through hands-on learning in AI, cloud computing, and software development. Ranked #1 in New Jersey for online CS programs.',
    image: '/assets/images/1-explore-mscs.webp',
    highlights: [
      '99% Employment Rate',
      'No GRE/GMAT Required',
      '#1 in New Jersey',
      'Up to $16K Off Tuition'
    ],
    applicationConfig: {
      type: 'modal', // 'modal' or 'direct'
      modalOptions: ['standard', 'asap'],
      standardLink: 'https://gradadmissions.stevens.edu/apply/?pk=GRNP'
    },
    programPage: '/online-masters-computer-science-mscs/',
    explorePage: '/explore/online-masters-computer-science/',
    stats: {
      employment: '99%',
      duration: '18-24 months',
      credits: '30',
      format: '100% Online'
    }
  },
  {
    id: 'mem',
    code: 'mem',
    name: 'Master of Engineering in Engineering Management',
    shortName: 'M.Eng. Engineering Management',
    degree: 'M.Eng.',
    tagline: 'Built for Engineers Who Want to Lead',
    description: 'Bridge technology and business leadership with our ABET-accredited program. Advance your engineering career with strategic management skills.',
    image: '/assets/images/1-explore-mem.webp',
    highlights: [
      'ABET Accredited',
      '100% Online',
      'No GRE Required',
      'Top 20 for Career Placement'
    ],
    applicationConfig: {
      type: 'modal',
      modalOptions: ['standard', 'asap'],
      standardLink: 'https://gradadmissions.stevens.edu/apply/?pk=GRNP'
    },
    programPage: '/online-masters-engineering-management/',
    explorePage: '/explore/online-masters-engineering-management/',
    stats: {
      ranking: 'Top 20',
      duration: '18-24 months',
      credits: '30',
      format: '100% Online'
    }
  },
  {
    id: 'mba',
    code: 'mba',
    name: 'Master of Business Administration',
    shortName: 'MBA',
    degree: 'MBA',
    tagline: 'Technology-Driven Business Leadership',
    description: 'AACSB-accredited MBA combining business strategy with cutting-edge technology and data analytics. #1 Online MBA from a New Jersey school.',
    image: '/assets/images/1-omba-hero-scaled.webp',
    highlights: [
      'AACSB Accredited',
      '100% Online',
      'No GMAT Required',
      '#1 in New Jersey'
    ],
    applicationConfig: {
      type: 'direct',
      link: 'https://gradadmissions.stevens.edu/apply/?pk=GRNP'
    },
    programPage: '/online-mba/',
    explorePage: '/explore/online-mba/',
    stats: {
      employment: '100%',
      duration: '18-24 months',
      credits: '36',
      format: '100% Online'
    }
  },
  {
    id: 'meads',
    code: 'meads',
    name: 'Master of Engineering in Applied Data Science',
    shortName: 'M.Eng. Applied Data Science',
    degree: 'M.Eng.',
    tagline: 'Build What\'s Next with Data',
    description: 'Master data science and AI engineering through hands-on projects. Curriculum bridges engineering precision with AI-driven innovation.',
    image: '/assets/images/stevens-manhattan-skyline-ds.webp',
    highlights: [
      '99% Employment Rate',
      'AI-Driven Curriculum',
      'Industry-Focused Projects',
      'Accelerated Application Available'
    ],
    applicationConfig: {
      type: 'direct',
      link: '/accelerated-application'
    },
    programPage: '/online-masters-engineering-applied-data-science/',
    explorePage: '/explore/online-masters-eng-applied-data-science/',
    stats: {
      employment: '99%',
      duration: '2 years',
      credits: '30',
      format: '100% Online'
    }
  }
];

/**
 * Get program by ID
 */
export const getProgramById = (id) => {
  return PROGRAMS_DATA.find(program => program.id === id);
};

/**
 * Get program by code
 */
export const getProgramByCode = (code) => {
  return PROGRAMS_DATA.find(program => program.code.toLowerCase() === code.toLowerCase());
};

/**
 * Get all programs
 */
export const getAllPrograms = () => {
  return PROGRAMS_DATA;
};

