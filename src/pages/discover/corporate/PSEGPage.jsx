import React, { useState } from "react";
import CorporateLandingPageTemplate from "@/components/corporate/CorporateLandingPageTemplate";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { ApplicationModal } from "@/components/shared";
import { PROGRAMS_DATA } from "@/data/programsData";

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

  const programConfigs = [
    {
      code: "mba",
      title: "Online MBA",
      description: "A tech-driven MBA for leaders in innovation.",
      exploreLink: "/online-mba/",
      applyLink: "https://gradadmissions.stevens.edu/apply/?pk=GRNP",
      useModal: false,
    },
    {
      code: "mscs",
      title: "M.S. in Computer Science",
      description: "Advanced computing education for the digital age.",
      exploreLink: "/online-masters-computer-science-mscs/",
      applyLink: "https://gradadmissions.stevens.edu/apply/?pk=GRNP",
      useModal: true,
    },
    {
      code: "mem",
      title: "M.Eng. in Engineering Management",
      description: "Bridge the gap between technology and business.",
      exploreLink: "/online-masters-engineering-management/",
      applyLink: "https://gradadmissions.stevens.edu/apply/?pk=GRNP",
      useModal: true,
    },
    {
      code: "meads",
      title: "M.Eng. in Applied Data Science",
      description: "Master data analysis and application.",
      exploreLink: "/online-masters-engineering-applied-data-science/",
      applyLink:
        "/accelerated-application/?program=meads&corporate_code=P01S04G",
      useModal: false,
    },
    {
      code: "cert-eai",
      title: "Certificate in Enterprise AI",
      description:
        "Master AI implementation and strategy for enterprise environments.",
      exploreLink: "/certificates/enterprise-ai/",
      applyLink:
        "/accelerated-application/?program=pgc-eai&corporate_code=P01S04G",
      useModal: false,
      isCertificate: true,
    },
    {
      code: "cert-ads",
      title: "Certificate in Applied Data Science",
      description: "Build foundational skills in data science and analytics.",
      exploreLink: "/certificates/applied-data-science-foundations/",
      applyLink:
        "/accelerated-application/?program=pgc-ads&corporate_code=P01S04G",
      useModal: false,
      isCertificate: true,
    },
  ];

  // Merge with PROGRAMS_DATA for image, badge, stats (Corporate Students card UI)
  const programs = programConfigs.map((config) => {
    const programData = PROGRAMS_DATA.find((p) => p.code === config.code);
    return {
      ...config,
      image: programData?.image,
      degree:
        programData?.degree || (config.isCertificate ? "Certificate" : ""),
      shortName: programData?.shortName || config.title,
      name: programData?.name || config.title,
      stats: programData?.stats,
    };
  });

  const formConfig = {
    mode: "PSEG-select-online",
    campaignUrl: "/pseg-spo-inquiry",
    corporateCode: "P01S04G",
    programCode: "", // No specific program, multiple options
  };

  const customContent = (
    <div className="space-y-12">
      <div>
        <h3 className="font-stevens-display text-2xl font-light uppercase tracking-wide text-stevens-black mb-6">
          Eligible Programs
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program) => (
            <div
              key={program.code}
              className="group relative bg-stevens-white rounded-stevens-xl shadow-stevens-lg hover:shadow-stevens-2xl border-2 border-stevens-light-gray hover:border-stevens-red overflow-hidden transition-all duration-300 flex flex-col h-full"
            >
              {/* Image Section */}
              <div className="relative h-40 overflow-hidden bg-stevens-light-gray">
                {program.image ? (
                  <img
                    src={program.image}
                    alt={program.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-stevens-light-gray" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                {program.degree && (
                  <div className="absolute top-stevens-md left-stevens-md">
                    <span className="bg-stevens-red backdrop-blur-sm text-stevens-white px-stevens-md py-stevens-xs rounded-stevens-md font-semibold text-sm">
                      {program.degree}
                    </span>
                  </div>
                )}
              </div>

              {/* Content Section */}
              <div className="p-stevens-lg flex flex-col flex-grow">
                <h4 className="font-stevens-display text-stevens-lg font-bold text-stevens-dark-gray mb-stevens-sm group-hover:text-stevens-red transition-colors">
                  {program.shortName || program.title}
                </h4>

                {program.stats && (
                  <div className="flex flex-wrap gap-stevens-sm text-xs text-stevens-dark-gray mb-stevens-md">
                    {program.stats.duration && (
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {program.stats.duration}
                      </span>
                    )}
                    {program.stats.credits && (
                      <span className="flex items-center">
                        <BookOpen className="w-3 h-3 mr-1" />
                        {program.stats.credits} credits
                      </span>
                    )}
                  </div>
                )}

                <div className="mt-auto space-y-3">
                  <Link to={program.exploreLink} target="_blank">
                    <Button
                      variant="outline-dark"
                      className="w-full"
                    >
                      Explore Program <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  <a
                    href={program.applyLink}
                    target={program.useModal ? "_self" : "_blank"}
                    rel={program.useModal ? "" : "noopener noreferrer"}
                    className="block"
                    onClick={(e) =>
                      handleApplyClick(e, program.applyLink, program.useModal)
                    }
                  >
                    <Button variant="default" className="w-full">
                      Apply in Minutes
                    </Button>
                  </a>
                </div>
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
      content:
        "<p>As a PSEG employee, you have access to a private cohort for these four online master's programs. This exclusive opportunity allows you to advance your education with the support of your organization.</p>",
      items: [
        "100% Online delivery for maximum flexibility",
        "No application fee",
        "Streamlined application process",
      ],
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
      `,
    },
    {
      title: "Corporate Partnership Details",
      content: `
        <p>This landing page is only for PSEG employees and only accessible through the direct URL. Please do not share outside of the company.</p>
      `,
    },
  ];

  const pricing = {
    items: [{ label: "Tuition Rate", value: "$583", note: "Per Credit Hour" }],
    description: "This is a private cohort for PSEG employees.",
  };

  return (
    <>
      <CorporateLandingPageTemplate
        partnerName="PSEG"
        heroTitle="PSEG Corporate Education Partnership"
        heroSubtitle="Advance your career with Stevens Institute of Technology's premier online master's programs."
        heroImage="/assets/images/corporate-partners/corporate-partners-hero.webp"
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
