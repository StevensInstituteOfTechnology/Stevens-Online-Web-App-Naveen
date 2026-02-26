export const initialData = {
  nodes: [
    // ==========================================
    // LAYER 1: FOUNDATIONS (Basic Skills)
    // ==========================================
    {
      id: "f-1",
      type: "foundation",
      data: {
        label: "Programming Foundation",
        skills: "Python, Java, Algorithms",
        credits: 6,
        description: "Build a solid foundation in programming fundamentals and computational thinking.",
      },
      position: { x: 0, y: 0 },
    },
    {
      id: "f-2",
      type: "foundation",
      data: {
        label: "Math & Stats Foundation",
        skills: "Linear Algebra, Probability, Calculus",
        credits: 6,
        description: "Master the mathematical foundations essential for advanced technical fields.",
      },
      position: { x: 0, y: 100 },
    },
    {
      id: "f-3",
      type: "foundation",
      data: {
        label: "Business Basics",
        skills: "Accounting, Economics, Management",
        credits: 6,
        description: "Understand core business principles and organizational dynamics.",
      },
      position: { x: 0, y: 200 },
    },

    // ==========================================
    // LAYER 2: ADVANCED CERTIFICATES (Specializations)
    // ==========================================
    {
      id: "adv-1",
      type: "certificate",
      data: {
        label: "Machine Learning Specialist",
        skills: "TensorFlow, Neural Networks, NLP",
        credits: 12,
        description: "Become an expert in designing and deploying machine learning systems.",
        stacksToward: ["ms-cs", "mba"],
      },
      position: { x: 250, y: 50 },
    },
    {
      id: "adv-2",
      type: "certificate",
      data: {
        label: "Cloud Engineering Cert",
        skills: "AWS, Kubernetes, DevOps",
        credits: 12,
        description: "Master cloud infrastructure, deployment pipelines, and scalable systems.",
        stacksToward: ["ms-cs"],
      },
      position: { x: 250, y: 150 },
    },
    {
      id: "adv-3",
      type: "certificate",
      data: {
        label: "AI Management Cert",
        skills: "AI Strategy, Ethics, Implementation",
        credits: 9,
        description: "Lead AI initiatives and manage technology-driven transformation.",
        stacksToward: ["mba"],
      },
      position: { x: 250, y: 250 },
    },

    // ==========================================
    // LAYER 3: MASTER'S DEGREES (Ultimate Goals)
    // ==========================================
    {
      id: "ms-cs",
      type: "masters",
      data: {
        label: "MS in Computer Science",
        description: "Master advanced computing concepts.",
        totalCredits: 30,
        competencies: ["Software Engineering", "AI/ML", "Systems Design", "Data Structures"],
      },
      position: { x: 500, y: 50 },
    },
    {
      id: "mba",
      type: "masters",
      data: {
        label: "Online MBA",
        description: "Lead in the digital economy.",
        totalCredits: 48,
        competencies: ["Strategic Management", "Financial Analysis", "Marketing", "Operations"],
      },
      position: { x: 500, y: 200 },
    },
  ],
  edges: [
    // Layer 1 → Layer 2 (Foundations to Certificates)
    { id: "e-f1-adv1", source: "f-1", target: "adv-1" },
    { id: "e-f2-adv1", source: "f-2", target: "adv-1" },
    { id: "e-f1-adv2", source: "f-1", target: "adv-2" },
    { id: "e-f3-adv3", source: "f-3", target: "adv-3" },

    // Layer 2 → Layer 3 (Certificates to Degrees)
    { id: "e-adv1-mscs", source: "adv-1", target: "ms-cs" },
    { id: "e-adv2-mscs", source: "adv-2", target: "ms-cs" },
    { id: "e-adv1-mba", source: "adv-1", target: "mba" },
    { id: "e-adv3-mba", source: "adv-3", target: "mba" },
  ],
};
