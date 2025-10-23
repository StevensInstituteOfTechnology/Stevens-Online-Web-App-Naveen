// Static program data based on Stevens Institute of Technology online programs
// Source: https://online.stevens.edu/

export const programs = [
  {
    id: "mba",
    code: "MBA",
    title: "Online MBA",
    subtitle: "AACSB-accredited business education",
    description: "The Stevens Online MBA is an AACSB-accredited program offered part time through online courses. The Online MBA combines business knowledge with the technology and analytics necessary to excel in today's data-centric world.",
    features: [
      "AACSB-accredited",
      "100% Online",
      "Part-time format",
      "No GMAT/GRE required",
      "Technology and analytics focus"
    ],
    rankings: [
      {
        rank: "#1",
        description: "Online MBA from a New Jersey school in 2024",
        source: "U.S. News & World Report"
      }
    ],
    curriculum: {
      credits: 36,
      duration: "18-24 months",
      format: "100% Online",
      coursesPerTerm: "2-3"
    },
    admissions: {
      requirements: [
        "Bachelor's degree from accredited institution",
        "Professional work experience preferred",
        "No GMAT/GRE required"
      ],
      deadlines: [
        {
          term: "Spring 2026",
          earlySubmit: "2025-10-14",
          prioritySubmit: "2025-11-11",
          finalSubmit: "2026-01-05",
          startDate: "2026-01-20"
        }
      ]
    },
    tuition: {
      perCredit: 1850,
      totalProgram: 66600,
      financialAid: true
    },
    created_date: "2024-01-01T00:00:00Z"
  },
  {
    id: "mscs",
    code: "MSCS",
    title: "M.S. in Computer Science",
    subtitle: "Advanced computing education for the digital age",
    description: "Ranked #11 in New Jersey for Best Online Master's in Computer Information Technology Programs by U.S. News & World Report (2024), the online computer science master's program at Stevens offers you a curriculum aligned with high-demand areas.",
    features: [
      "Ranked #11 in New Jersey",
      "100% Online",
      "Software development focus",
      "Cloud computing",
      "AI and machine learning"
    ],
    rankings: [
      {
        rank: "#11",
        description: "Best Online Master's in Computer Information Technology Programs",
        source: "U.S. News & World Report (2024)"
      },
      {
        rank: "#1",
        description: "In New Jersey in Best Online Master's in Computer Information Technology Programs",
        source: "U.S. News & World Report"
      }
    ],
    curriculum: {
      credits: 30,
      duration: "18-24 months",
      format: "100% Online",
      specializations: [
        "Software Development",
        "Web Programming",
        "Mobile Systems",
        "Cloud Computing",
        "Human-Computer Interaction"
      ]
    },
    admissions: {
      requirements: [
        "Bachelor's degree in Computer Science or related field",
        "Programming experience",
        "Mathematics background"
      ],
      deadlines: [
        {
          term: "Spring 2026",
          earlySubmit: "2025-10-14",
          prioritySubmit: "2025-11-11",
          finalSubmit: "2026-01-05",
          startDate: "2026-01-20"
        }
      ]
    },
    tuition: {
      perCredit: 1850,
      totalProgram: 55500,
      financialAid: true
    },
    created_date: "2024-01-02T00:00:00Z"
  },
  {
    id: "mem",
    code: "MEM",
    title: "M.Eng. in Engineering Management",
    subtitle: "Bridge technology and business leadership",
    description: "Master the ability to interface between technology and business stakeholders. This program will advance your understanding of the technology involved in engineering projects and the management process through which the technology is applied.",
    features: [
      "Technology-business interface",
      "100% Online",
      "Leadership development",
      "Project management",
      "Engineering expertise"
    ],
    rankings: [
      {
        rank: "#26",
        description: "Nationally in Best Online Engineering Programs",
        source: "U.S. News & World Report"
      }
    ],
    curriculum: {
      credits: 30,
      duration: "18-24 months",
      format: "100% Online",
      focusAreas: [
        "Engineering Management",
        "Project Management",
        "Technology Leadership",
        "Operations Management"
      ]
    },
    admissions: {
      requirements: [
        "Bachelor's degree in Engineering or related technical field",
        "Professional engineering experience",
        "Technical background"
      ],
      deadlines: [
        {
          term: "Spring 2026",
          earlySubmit: "2025-10-14",
          prioritySubmit: "2025-11-11",
          finalSubmit: "2026-01-05",
          startDate: "2026-01-20"
        }
      ]
    },
    tuition: {
      perCredit: 1850,
      totalProgram: 55500,
      financialAid: true
    },
    created_date: "2024-01-03T00:00:00Z"
  }
];

export const Program = {
  list: (sortBy = "-created_date", limit = null) => {
    return new Promise((resolve) => {
      let sortedPrograms = [...programs];
      
      // Sort logic
      if (sortBy === "-created_date") {
        sortedPrograms.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
      } else if (sortBy === "created_date") {
        sortedPrograms.sort((a, b) => new Date(a.created_date) - new Date(b.created_date));
      }
      
      // Apply limit
      if (limit) {
        sortedPrograms = sortedPrograms.slice(0, limit);
      }
      
      // Simulate API delay
      setTimeout(() => resolve(sortedPrograms), 100);
    });
  },
  
  get: (id) => {
    return new Promise((resolve, reject) => {
      const program = programs.find(p => p.id === id);
      setTimeout(() => {
        if (program) {
          resolve(program);
        } else {
          reject(new Error(`Program with id ${id} not found`));
        }
      }, 100);
    });
  }
};
