import React from 'react';
import CorporateLandingPageTemplate from '@/components/corporate/CorporateLandingPageTemplate';

export default function PSEGEnterpriseAIPage() {
    const formConfig = {
        mode: "PSEG-PGCEAI",
        campaignUrl: "/pseg-pgceai-inquiry",
        corporateCode: "P01S02G",
        programCode: "pgc-eai",
        acceleratedFormTitle: "Apply for the PSEG Enterprise AI Cohort"
    };

    const programDetails = [
        {
            title: "Program Overview",
            content: `
        <p>
          The <strong>Professional Graduate Certificate in Enterprise AI</strong> is designed for PSEG employees looking to master artificial intelligence implementation in enterprise environments. 
          This cohort-based program provides hands-on experience with AI tools, strategies, and deployment frameworks directly applicable to your work at PSEG.
        </p>
        <p class="mt-4">
          Upon completion, you will have the skills to design, implement, and manage AI solutions that drive business value and operational excellence.
        </p>
      `
        },
        {
            title: "Curriculum",
            content: "<p>The program consists of three core courses delivered 100% online:</p>",
            items: [
                "BIA 568 – Management of AI Technologies",
                "BIA 662 – Augmented Intelligence & GenAI",
                "PE 810 – Applied AI for Business"
            ]
        },
        {
            title: "Stackability & Career Pathways",
            content: `
        <p>This certificate is designed to stack seamlessly into advanced degree programs, allowing you to continue your education without losing credits:</p>
        <ul class="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Stack into Online MBA:</strong> All 9 credits from the Enterprise AI certificate can be applied toward the 39-credit Online MBA, giving you a head start on your business degree.</li>
            <li><strong>Stack into M.Eng. in Applied Data Science (MEADS):</strong> Credits earned can be applied toward the 30-credit MEADS program, accelerating your path to a master's degree in data science.</li>
            <li><strong>Career Advancement:</strong> Whether you continue into a full degree or complete the certificate, you'll gain immediately applicable AI skills valued across industries.</li>
        </ul>
      `
        },
        {
            title: "Application Process",
            content: `
        <p>PSEG employees can apply using our streamlined accelerated application process. Simply complete the form below to get started.</p>
        <ul class="list-disc pl-5 mt-2 space-y-1">
            <li>No letters of recommendation required</li>
            <li>Upload unofficial transcripts to begin</li>
            <li>Official transcripts due within the first two months of study</li>
            <li>Use corporate code <strong>P01S02G</strong> when applying</li>
        </ul>
      `
        }
    ];

    const pricing = {
        items: [
            { label: "Total Program Cost", value: "$5,250", note: "9 Credit Hours" },
            { label: "Per Credit Rate", value: "$583", note: "Same as PSEG master's cohort rate" },
            { label: "Student Cost", value: "$0", note: "Billed directly to PSEG" }
        ],
        description: "This private cohort pricing is billed directly to PSEG, resulting in zero out-of-pocket tuition cost for approved employees. All credits earned can stack into OMBA or MEADS programs."
    };

    return (
        <CorporateLandingPageTemplate
            partnerName="PSEG"
            heroTitle="Professional Graduate Certificate in Enterprise AI"
            heroSubtitle="Master AI implementation and strategy with a program designed for PSEG professionals."
            heroImage="/assets/images/certificate-enterprise-ai/certificate-enterpriseAI-1.webp"
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

