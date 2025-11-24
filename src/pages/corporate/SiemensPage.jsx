import React from 'react';
import CorporateLandingPageTemplate from '@/components/corporate/CorporateLandingPageTemplate';

export default function SiemensPage() {
    const formConfig = {
        mode: "SIEMENS-PGCSEF",
        campaignUrl: "/siemens-pgcsef-inquiry",
        corporateCode: "S01E02NS",
        programCode: "pgc-sef",
        acceleratedFormTitle: "Apply for the Siemens Cohort"
    };

    const programDetails = [
        {
            title: "Program Overview",
            content: `
        <p>
          The <strong>Professional Graduate Certificate in Systems Engineering Foundations</strong> is designed specifically for Siemens employees to master the essential principles of systems engineering. 
          This cohort-based program allows you to learn alongside your colleagues, fostering collaboration and shared understanding of complex systems challenges.
        </p>
        <p class="mt-4">
          Upon completion, you will have the skills to design, analyze, and manage complex systems, directly applicable to your work at Siemens.
        </p>
      `
        },
        {
            title: "Curriculum",
            content: "<p>The program consists of three core courses delivered online:</p>",
            items: [
                "SYS 625 – Fundamentals of Systems Engineering",
                "SYS 650 – System Architecture and Design",
                "EM 612 – Project Management of Complex Systems"
            ]
        },
        {
            title: "Application Process",
            content: `
        <p>Siemens employees can apply using our streamlined accelerated application process. Simply complete the form below to get started.</p>
        <ul class="list-disc pl-5 mt-2 space-y-1">
            <li>No letters of recommendation required</li>
            <li>Upload unofficial transcripts to begin</li>
            <li>Official transcripts due within one year of enrollment</li>
            <li>Use corporate code <strong>S01E02NS</strong> when applying</li>
        </ul>
      `
        }
    ];

    const pricing = {
        items: [
            { label: "Total Program Cost", value: "$5,250" },
            { label: "Cost Per Course", value: "$1,750", note: "Billed as you go (3 courses total)" }
        ],
        description: "This exclusive rate is available only to members of the Siemens cohort."
    };

    return (
        <CorporateLandingPageTemplate
            partnerName="Siemens"
            heroTitle="Professional Graduate Certificate in Systems Engineering Foundations"
            heroSubtitle="Accelerate your career with a specialized program designed for Siemens professionals."
            heroImage="/assets/images/corporate-partners/corporate-partners-1.webp"
            heroSecondaryCta={{
                label: "Apply In Minutes",
                href: "#apply-now"
            }}
            formConfig={formConfig}
            showBodyAcceleratedApp={true}
            programDetails={programDetails}
            pricing={pricing}
        />
    );
}
