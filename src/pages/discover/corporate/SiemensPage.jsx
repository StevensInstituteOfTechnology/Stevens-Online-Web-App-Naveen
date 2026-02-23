import CorporateLandingPageTemplate from "@/components/corporate/CorporateLandingPageTemplate";

export default function SiemensPage() {
  const formConfig = {
    mode: "SIEMENS-PGCSEF",
    campaignUrl: "/siemens-pgcsef-inquiry",
    corporateCode: "S01E02NS",
    programCode: "pgc-sef",
    acceleratedFormTitle: "Apply for the Siemens Cohort",
  };

  const programDetails = [
    {
      title: "Program Description",
      content: `
        <p>
          This program provides students with a unified foundation in defining system needs, developing system architectures and managing complex engineering efforts.
        </p>
        <p class="mt-4">
          The program teaches students to understand stakeholder requirements, apply architectural reasoning and utilize project management tools to plan, design and coordinate large-scale systems. Emphasis is placed on lifecycle thinking, structured decision-making and the integration of engineering and managerial disciplines into a coherent execution framework.
        </p>
      `,
    },
    {
      title: "Program Objectives",
      content: "<p>This program is designed to help you:</p>",
      items: [
        "Identify and describe stakeholder needs, system requirements and lifecycle constraints relevant to complex engineering efforts",
        "Explain and interpret fundamental system architecture concepts, including decomposition, interfaces, functional flows and trade-space elements",
        "Apply architectural reasoning methods and project management tools to structure, plan and coordinate system development activities",
        "Analyze stakeholder requirements, dependencies, risks, and architectural alternatives to support structured decision-making across the system lifecycle",
        "Evaluate system architectures, integration strategies and program management approaches using quantitative and qualitative criteria",
        "Create coherent, end-to-end system execution frameworks that integrate engineering analysis, architectural design and program management practices",
      ],
    },
    {
      title: "Program Outcomes",
      content:
        "<p>After successful completion of this program, students will be able to:</p>",
      items: [
        "Explain and apply systems engineering principles across all phases of the system lifecycle",
        "Differentiate stakeholder needs from system solutions and derive measurable, verifiable requirements",
        "Design functional and physical system architectures that align with requirements, constraints and operational concepts (CONOPS)",
        "Evaluate architectural alternatives using structured analysis and assess associated trade-offs",
        "Apply project management processes and tools to plan, monitor, and control complex engineering programs",
        "Develop integrated project plans, schedules, and risk-management strategies for multidisciplinary teams",
        "Integrate technical and managerial considerations to optimize cost, performance, schedule and supportability in decision-making",
      ],
    },
    {
      title: "Curriculum",
      content:
        "<p>The program consists of three core courses delivered 100% online:</p>",
      items: [
        "SYS 625 – Fundamentals of Systems Engineering",
        "SYS 650 – System Architecture and Design",
        "EM 612 – Project Management of Complex Systems",
      ],
    },
    {
      title: "Application Process",
      content: `
        <p>Siemens employees can apply using our streamlined accelerated application process. Simply complete the form below to get started.</p>
        <ul class="list-disc pl-5 mt-2 space-y-1">
            <li>No letters of recommendation required</li>
            <li>Upload unofficial transcripts to begin</li>
            <li>Official transcripts due within <strong>2 months</strong> of enrollment</li>
        </ul>
      `,
    },
  ];

  const pricing = {
    items: [
      { label: "Total Program Cost", value: "$5,250" },
      {
        label: "Cost Per Course",
        value: "$1,750",
        note: "Billed as you go (3 courses total)",
      },
    ],
    description:
      "This exclusive rate is available only to members of the Siemens cohort. This landing page is only for Siemens employees and only accessible through the direct URL. Please do not share outside of the company.",
  };

  return (
    <CorporateLandingPageTemplate
      partnerName="Siemens"
      heroTitle="Professional Graduate Certificate in Systems Engineering Foundations"
      heroSubtitle="Accelerate your career with a specialized program designed for Siemens professionals."
      heroImage="/assets/images/corporate-partners/corporate-partners-hero.webp"
      heroImageFlip={true}
      heroSecondaryCta={{
        label: "Apply In Minutes",
        href: "#apply-now",
      }}
      formConfig={formConfig}
      showBodyAcceleratedApp={true}
      programDetails={programDetails}
      pricing={pricing}
    />
  );
}
