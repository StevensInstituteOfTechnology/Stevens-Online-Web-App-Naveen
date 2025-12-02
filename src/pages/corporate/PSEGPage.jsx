import React, { useState } from 'react';
import CorporateLandingPageTemplate from '@/components/corporate/CorporateLandingPageTemplate';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ApplicationModal from '@/components/shared/ApplicationModal';

export default function PSEGPage() {
    const [applicationModalOpen, setApplicationModalOpen] = useState(false);
    const [activeProgramLink, setActiveProgramLink] = useState("");

    const handleApplyClick = (e, link, isModal) => {
        if (isModal) {
            e.preventDefault();
            setActiveProgramLink(link);
            setApplicationModalOpen(true);
        }
    };

    const programs = [
        {
            code: "mba",
            title: "Online MBA",
            description: "A tech-driven MBA for leaders in innovation.",
            exploreLink: "/online-mba/",
            applyLink: "https://gradadmissions.stevens.edu/apply/?pk=GRNP",
            useModal: false
        },
        {
            code: "mscs",
            title: "M.S. in Computer Science",
            description: "Advanced computing education for the digital age.",
            exploreLink: "/online-masters-computer-science-mscs/",
            applyLink: "https://gradadmissions.stevens.edu/apply/?pk=GRNP",
            useModal: true
        },
        {
            code: "mem",
            title: "M.Eng. in Engineering Management",
            description: "Bridge the gap between technology and business.",
            exploreLink: "/online-masters-engineering-management/",
            applyLink: "https://gradadmissions.stevens.edu/apply/?pk=GRNP",
            useModal: true
        },
        {
            code: "meads",
            title: "M.Eng. in Applied Data Science",
            description: "Master data analysis and application.",
            exploreLink: "/online-masters-engineering-applied-data-science/",
            applyLink: "/accelerated-application/?program=meads&corporate_code=P01S04G",
            useModal: false
        },
        {
            code: "cert-eai",
            title: "Certificate in Enterprise AI",
            description: "Master AI implementation and strategy for enterprise environments.",
            exploreLink: "/certificates/enterprise-ai/",
            applyLink: "/accelerated-application/?program=pgc-eai&corporate_code=P01S04G",
            useModal: false,
            isCertificate: true
        },
        {
            code: "cert-ads",
            title: "Certificate in Applied Data Science",
            description: "Build foundational skills in data science and analytics.",
            exploreLink: "/certificates/applied-data-science-foundations/",
            applyLink: "/accelerated-application/?program=pgc-ads&corporate_code=P01S04G",
            useModal: false,
            isCertificate: true
        }
    ];

    const formConfig = {
        mode: "PSEG-select-online",
        campaignUrl: "/pseg-spo-inquiry",
        corporateCode: "P01S04G",
        programCode: "" // No specific program, multiple options
    };

    const customContent = (
        <div className="space-y-12">
            <div>
                <h3 className="font-display text-2xl font-bold text-gray-900 mb-6">Eligible Programs</h3>
                <div className="grid md:grid-cols-2 gap-6">
                    {programs.map((program) => (
                        <div key={program.code} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col h-full transition-all hover:shadow-lg">
                            <h4 className="font-bold text-lg text-stevens-primary mb-2">{program.title}</h4>
                            <p className="text-gray-600 text-sm mb-6 flex-grow">{program.description}</p>
                            <div className="mt-auto space-y-3">
                                <Link to={program.exploreLink} target="_blank">
                                    <Button variant="outline" className="w-full text-stevens-primary border-stevens-primary hover:bg-stevens-primary hover:text-white">
                                        Explore Program <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </Link>
                                <a
                                    href={program.applyLink}
                                    target={program.useModal ? "_self" : "_blank"}
                                    rel={program.useModal ? "" : "noopener noreferrer"}
                                    className="block"
                                    onClick={(e) => handleApplyClick(e, program.applyLink, program.useModal)}
                                >
                                    <Button className="w-full bg-stevens-primary hover:bg-stevens-primary/90 text-white">
                                        Apply in Minutes
                                    </Button>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const programDetails = [
        {
            title: "Program Benefits",
            content: "<p>As a PSEG employee, you have access to a private cohort for these four online master's programs. This exclusive opportunity allows you to advance your education with the support of your organization.</p>",
            items: [
                "100% Online delivery for maximum flexibility",
                "No application fee",
                "Streamlined application process"
            ]
        },
        {
            title: "How to Get Started",
            content: `
        <p>Complete the request-for-information form on this page to connect with our dedicated enrollment advisors. They will walk you through selecting the right degree pathway (OMBA, MEEM, MSCS, or MEADS) and guide you through the application process reserved for PSEG employees.</p>
        <ul class="list-disc pl-5 mt-2 space-y-1">
            <li>Most programs use the standard Stevens application process.</li>
            <li>MEADS offers an accelerated application option with simplified requirements.</li>
            <li>Your cohort code is <strong>P01S04G</strong> to include with your application.</li>
        </ul>
      `
        },
        {
            title: "Corporate Partnership Details",
            content: `
        <p>This landing page is only for PSEG employees and only accessible through the direct URL. Please do not share outside of the company.</p>
      `
        }
    ];

    const pricing = {
        items: [
            { label: "Tuition Rate", value: "$583", note: "Per Credit Hour" }
            ],
        description: "This is a private cohort for PSEG employees."
    };

    return (
        <>
        <CorporateLandingPageTemplate
            partnerName="PSEG"
            heroTitle="PSEG Corporate Education Partnership"
            heroSubtitle="Advance your career with Stevens Institute of Technology's premier online master's programs."
            heroImage="/assets/images/corporate-partners/corporate-partners-1.webp"
            formConfig={formConfig}
            showBodyAcceleratedApp={false}
            programDetails={programDetails}
            pricing={pricing}
            customContent={customContent}
        />
        <ApplicationModal
            isOpen={applicationModalOpen}
            onClose={() => setApplicationModalOpen(false)}
            traditionalLink={activeProgramLink}
        />
        </>
    );
}
