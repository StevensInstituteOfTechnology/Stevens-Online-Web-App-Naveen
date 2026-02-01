import React, { useEffect } from "react";
import { PageHero } from "@/components/shared";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight, Clock } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import LeadCaptureForm from "../../../components/forms/LeadCaptureForm";
import { BOOKING_URLS, KEY_DATES_SPRING2 } from "@/config/constants";
import { trackConversion, CONVERSION_LABELS } from "@/utils/gtmTracking";
import {
  setPageTitle,
  setMetaDescription,
  setOpenGraphTags,
  buildCanonicalUrl,
  createPageUrl,
} from "@/utils";
import ProgramFilterGrid from "../../../components/admissions/ProgramFilterGrid";
import { usePageTracking } from "@/hooks/analytics/usePageTracking";
import { PageContextProvider } from "@/contexts/analytics/PageContext";
import { DeadlinesSection } from "@/components/shared/sections/DeadlinesSection";
import ApplicationOptionsCards from "@/components/admissions/ApplicationOptionsCards";

export default function Admissions() {
  usePageTracking({
    pageType: "admissions",
    additionalData: {
      page_name: "Admissions Hub",
    },
  });

  const location = useLocation();

  // Smooth scroll to explore-programs section if hash is present
  useEffect(() => {
    if (location.hash === "#explore-programs") {
      setTimeout(() => {
        const element = document.getElementById("explore-programs");
        if (element) {
          const yOffset = -100; // Offset for fixed header
          const y =
            element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 100);
    }
  }, [location]);

  // Set SEO meta tags
  useEffect(() => {
    setPageTitle(
      "Graduate Admissions & Application Requirements | Stevens Online",
    );
    setMetaDescription(
      "Learn about graduate admissions requirements, application deadlines, and how to apply to Stevens Online master's programs.",
    );
    setOpenGraphTags({
      title: "Graduate Admissions & Application Requirements | Stevens Online",
      description:
        "Learn about graduate admissions requirements, application deadlines, and how to apply to Stevens Online master's programs.",
      image: buildCanonicalUrl("/assets/logos/stevens-crest.webp"),
      url: buildCanonicalUrl("/admissions/"),
      type: "website",
    });
  }, []);

  // Data for DeadlinesSection component
  const deadlinesData = {
    term: KEY_DATES_SPRING2.TERM.nameUppercase,
    subtitle: `Plan your application for the upcoming ${KEY_DATES_SPRING2.TERM.name} term.`,
    dates: [
      {
        label: "Early Submit",
        date: KEY_DATES_SPRING2.EARLY_SUBMIT.date,
        description: KEY_DATES_SPRING2.EARLY_SUBMIT.details,
      },
      {
        label: "Priority Submit",
        date: KEY_DATES_SPRING2.PRIORITY_SUBMIT.date,
        description: KEY_DATES_SPRING2.PRIORITY_SUBMIT.details,
      },
      {
        label: "Final Submit",
        date: KEY_DATES_SPRING2.FINAL_SUBMIT.date,
        description: "Last day to submit your application.",
      },
      {
        label: "Start of Classes",
        date: KEY_DATES_SPRING2.START_OF_CLASSES.date,
        description: "Begin your graduate journey at Stevens.",
      },
    ],
    footnote:
      "*Applicants who apply by the early submit deadline and are admitted may be eligible for a $250 deposit waiver. Applicants who receive education assistance from employers or other tuition discounts are not eligible. Other eligibility conditions may apply.",
  };

  // Application options data for ApplicationOptionsCards component
  const applicationOptionsData = {
    title: "Choose Your Application Option",
    options: [
      {
        title: "Standard Application",
        subtitle:
          "Prestige and rigor. A comprehensive review for the dedicated scholar.",
        theme: "dark",
        image: "/assets/images/shared/stevens-campus.webp",
        featured: false,
        description: `<ul class="list-disc pl-5 space-y-2"><li>Bachelor's degree required</li><li>Two letters of recommendation</li><li>Statement of purpose</li><li>Academic transcripts</li><li>Résumé</li></ul>`,
        buttonText: "Apply Now",
        url: "https://gradadmissions.stevens.edu/apply/?pk=GRNP",
      },
      {
        title: "Accelerated Application",
        subtitle:
          "Fast-track your application with our new Accelerated App designed for busy professionals. The Accelerated App gets you started immediately:",
        theme: "light",
        image: "/assets/images/shared/asap-hero.webp",
        featured: true,
        description: `<ul class="list-disc pl-5 space-y-2"><li><strong>Recommendation Letters:</strong> Not Required</li><li><strong>Proof of Bachelor's Degree:</strong> Upload copy of transcripts</li><li><strong>Professional Background:</strong> Upload your résumé or link your LinkedIn profile</li></ul>`,
        footnote: "Official transcripts will be due within one year of enrollment. Stevens may request additional documentation if needed.",
        buttonText: "Apply Now",
        url: createPageUrl("accelerated-application"),
      },
    ],
    consultation: {
      title: "Wondering Which Application Is Right for You?",
      buttonText: "Get In Touch",
      url: createPageUrl("RequestInfo"),
    },
  };

  const faqs = [
    {
      q: "What is the difference between the standard application and the Accelerated application?",
      a: "The standard application requires prospective students to complete and submit a full application, including all necessary documents such as transcripts, recommendation letters and personal statements, before being considered for admission. The Accelerated application allows students to bypass parts of the traditional process and get started immediately with a streamlined application. Bachelor's degree is required for both applications.",
    },
    {
      q: "How does the Accelerated application benefit prospective students?",
      a: "The Accelerated application benefits students by providing a more flexible and expedited route to program admission. With no letters of recommendation required, you can apply in minutes and start your educational journey more quickly. This option is especially advantageous for working professionals who wish to begin their studies immediately.",
    },
    {
      q: "Are there scholarships available to students?",
      a: "Students may be eligible for scholarship support, based on academic merit. Contact your enrollment advisor to learn more about eligibility.",
    },
  ];

  const events = [
    {
      title: "On Demand Application Overview: Online MBA",
      type: "Ongoing",
      duration: "18 minutes",
      url: "https://event.on24.com/wcc/r/4670707/F1184BBC4542A137E5E8852AA0FF2DBE?pg=2",
    },
  ];

  return (
    <PageContextProvider pageType="admissions" pageName="Admissions">
      <div>
        <PageHero
          title="We Put Our Strengths Behind Your Career"
          subtitle="Admissions"
          bgImage="/assets/images/admissions/1-hero-admissions-scaled.webp"
        />

        {/* Admissions Overview */}
        <div className="py-stevens-section-sm lg:py-stevens-section bg-stevens-light-gray">
          <div className="max-w-stevens-content-max mx-auto px-stevens-md lg:px-stevens-lg">
            <div className="max-w-7xl mx-auto">
              <h2 className="font-stevens-display text-stevens-3xl stevens-md:text-stevens-4xl lg:text-stevens-5xl font-light uppercase tracking-wide text-stevens-dark-gray mb-stevens-xl text-center">
                Admissions Overview
              </h2>
              <div className="prose prose-lg max-w-none text-stevens-dark-gray leading-relaxed space-y-stevens-lg">
                <p>
                  Stevens is technology driven. Our faculty are experts in their
                  fields and experienced in industry. We deliver that expertise
                  and experience to you. Stevens takes theory and links it to
                  practical applications that have societal impact. That's the
                  DNA at Stevens.
                </p>
                <p>
                  We offer multiple application options for students interested
                  in our graduate programs, ensuring flexible entry points to
                  match your needs and goals. Learn more below about application
                  requirements for a multi-disciplinary, design-based, 100%
                  online education from Stevens Institute of Technology.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Application Options Cards */}
        <ApplicationOptionsCards {...applicationOptionsData} />

        {/* Explore Our Programs - NEW DYNAMIC SECTION */}
        <div
          id="explore-programs"
          className="py-stevens-section-sm lg:py-stevens-section bg-stevens-light-gray"
        >
          <div className="max-w-stevens-content-max mx-auto px-stevens-md lg:px-stevens-lg">
            <div className="text-center mb-stevens-2xl">
              <h2 className="font-stevens-display text-stevens-3xl md:text-stevens-4xl lg:text-stevens-5xl font-light uppercase tracking-wide text-stevens-dark-gray mb-stevens-lg">
                Explore Our Graduate Programs
              </h2>
              <p className="text-stevens-lg text-stevens-dark-gray leading-relaxed max-w-7xl mx-auto text-left">
                Choose a program to explore or apply directly. Each program page
                provides detailed information about curriculum, career outcomes,
                and admission requirements.
              </p>
            </div>

            <ProgramFilterGrid />

            {/* Consultation CTA */}
            <div className="border-t border-stevens-light-gray py-stevens-xl mt-stevens-2xl">
              <div className="grid stevens-md:grid-cols-2 gap-stevens-lg items-center">
                <div>
                  <h3 className="font-stevens-display text-stevens-2xl  font-light text-stevens-dark-gray">
                    Wondering Which Application Is Right for You?
                  </h3>
                  <p className="text-stevens-lg text-stevens-dark-gray mt-stevens-xs">
                    Schedule a one-on-one consultation with the enrollment team
                    today.
                  </p>
                </div>
                <div className="stevens-md:text-right">
                  <a
                    href={BOOKING_URLS.SCHEDULE_CALL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackConversion(CONVERSION_LABELS.SCHEDULE_CALL)
                    }
                  >
                    <Button
                      variant="outline-dark"
                      className="px-stevens-xl py-stevens-md"
                    >
                      Get In Touch
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Dates & Deadlines - Using shared DeadlinesSection component */}
        <DeadlinesSection keyDates={deadlinesData} />

        {/* Admissions FAQ */}
        <div className="py-stevens-section-sm lg:py-stevens-section bg-stevens-light-gray">
          <div className="max-w-stevens-content-max mx-auto px-stevens-md lg:px-stevens-lg">
            <div className="text-center mb-stevens-2xl">
              <h2 className="font-stevens-display text-stevens-3xl md:text-stevens-4xl lg:text-stevens-5xl font-light uppercase tracking-wide text-stevens-dark-gray mb-stevens-lg">
                Admissions FAQ
              </h2>
            </div>

            <div className="max-w-4xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`item-${i}`}>
                    <AccordionTrigger className="text-left font-stevens-semibold text-stevens-lg text-stevens-dark-gray">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-stevens-base text-stevens-dark-gray">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>

        {/* Request Information */}
        <div className="py-stevens-section-sm lg:py-stevens-section bg-stevens-gray">
          <div className="max-w-stevens-content-max mx-auto px-stevens-md lg:px-stevens-lg">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-stevens-xl items-center">
                <div className="text-stevens-white">
                  <h2 className="font-stevens-display text-stevens-3xl stevens-md:text-stevens-4xl lg:text-stevens-5xl font-light uppercase tracking-wide mb-stevens-md text-stevens-white">
                    Request Information
                  </h2>
                  <p className="text-stevens-lg text-stevens-white mb-stevens-lg">
                    Ready to take the next step? Get more information about our
                    programs and start your application today.
                  </p>

                  {/* <div className="flex flex-col stevens-sm:flex-row gap-stevens-md">
                  <a href="https://gradadmissions.stevens.edu/apply/?pk=GRNP" target="_blank" rel="noopener noreferrer" onClick={() => trackConversion(CONVERSION_LABELS.APPLY_NOW)}>
                    <Button className="btn-stevens-outline bg-stevens-white text-stevens-red">
                      Apply Now
                    </Button>
                  </a>
                </div> */}
                </div>
                <LeadCaptureForm
                  programOfInterest=""
                  sourcePage="admissions_page"
                  title="Request Information"
                  subtitle="Get more information about our programs"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContextProvider>
  );
}
