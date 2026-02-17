/**
 * Shared program readiness / recommendation questions.
 * Used by ProgramReadinessAssessment and ComparePrograms questionnaire.
 *
 * POINT LOGIC (0-3 per answer):
 * - 3 = Strong fit: program directly aligns with this answer
 * - 2 = Good fit: relevant but not primary
 * - 1 = Partial fit: tangential connection
 * - 0 = Poor fit: not aligned
 *
 * PROGRAMS:
 * - mba: Business leadership, strategy, tech-driven management
 * - mscs: Software development, computer science, systems
 * - mem: Engineering management, lead technical teams
 * - meads: Data science, AI/ML, applied analytics
 * - cert-eai: Enterprise AI, business AI workflows (9 credits)
 * - cert-ads: Data science foundations, Python/SQL/ML (9 credits)
 */
export const PROGRAM_QUESTIONS = [
  {
    id: 1,
    question: "What is your primary career goal right now?",
    answers: [
      {
        text: "Lead technical teams & projects",
        points: {
          mem: 3,
          mscs: 3,
          mba: 3,
          meads: 1,
          "cert-eai": 0,
          "cert-ads": 0,
        },
      },
      {
        text: "Build innovative software & systems",
        points: {
          mscs: 3,
          mem: 1,
          mba: 0,
          meads: 2,
          "cert-eai": 0,
          "cert-ads": 1,
        },
      },
      {
        text: "Master the business side of technology",
        points: {
          mba: 3,
          mem: 1,
          mscs: 0,
          meads: 0,
          "cert-eai": 2,
          "cert-ads": 0,
        },
      },
      {
        text: "Master data science & AI",
        points: {
          meads: 3,
          mscs: 2,
          mba: 0,
          mem: 0,
          "cert-eai": 1,
          "cert-ads": 2,
        },
      },
      {
        text: "Gain a specific AI or data skill quickly",
        points: {
          "cert-eai": 3,
          "cert-ads": 3,
          meads: 1,
          mscs: 1,
          mba: 0,
          mem: 0,
        },
      },
    ],
  },
  {
    id: 2,
    question: "What is your current professional or educational background in?",
    answers: [
      {
        text: "Engineering/Technical",
        points: {
          mem: 2,
          mscs: 2,
          mba: 1,
          meads: 2,
          "cert-eai": 1,
          "cert-ads": 1,
        },
      },
      {
        text: "Computer Science/Software",
        points: {
          mscs: 3,
          mem: 1,
          mba: 1,
          meads: 2,
          "cert-eai": 1,
          "cert-ads": 2,
        },
      },
      {
        text: "Business/Management",
        points: {
          mba: 3,
          mem: 2,
          mscs: 0,
          meads: 0,
          "cert-eai": 2,
          "cert-ads": 0,
        },
      },
      {
        text: "Data/Analytics",
        points: {
          meads: 3,
          mscs: 2,
          mba: 1,
          mem: 1,
          "cert-eai": 2,
          "cert-ads": 3,
        },
      },
      {
        text: "Something else",
        points: {
          "cert-eai": 2,
          "cert-ads": 2,
          mba: 1,
          mem: 1,
          mscs: 1,
          meads: 1,
        },
      },
    ],
  },
  {
    id: 3,
    question: "How many years of professional experience do you have?",
    answers: [
      {
        text: "0-2 Years",
        points: {
          mscs: 2,
          "cert-ads": 2,
          mba: 0,
          mem: 1,
          meads: 2,
          "cert-eai": 1,
        },
      },
      {
        text: "3-5 Years",
        points: {
          mscs: 2,
          mem: 2,
          mba: 1,
          meads: 2,
          "cert-eai": 2,
          "cert-ads": 1,
        },
      },
      {
        text: "6-10 Years",
        points: {
          mba: 2,
          mem: 3,
          mscs: 1,
          meads: 1,
          "cert-eai": 2,
          "cert-ads": 1,
        },
      },
      {
        text: "10+ Years",
        points: {
          mba: 3,
          mem: 2,
          mscs: 1,
          meads: 1,
          "cert-eai": 2,
          "cert-ads": 1,
        },
      },
    ],
  },
];

// Masters vs certificate program codes
export const MASTERS_PROGRAMS = ["mba", "mscs", "mem", "meads"];
export const CERTIFICATE_PROGRAMS = ["cert-eai", "cert-ads"];
