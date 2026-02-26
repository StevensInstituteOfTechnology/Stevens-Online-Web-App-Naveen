import React, { useEffect } from "react";
import { PageHero } from "@/components/shared";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight, DollarSign, X, Check } from "lucide-react";
import { Link } from "react-router-dom";
import LeadCaptureForm from "@/components/forms/LeadCaptureForm";
import { BOOKING_URLS, KEY_DATES_SPRING2 } from "@/config/constants";
import { trackConversion, CONVERSION_LABELS } from "@/utils/gtmTracking";
import {
  setPageTitle,
  setMetaDescription,
  setOpenGraphTags,
  buildCanonicalUrl,
  createPageUrl,
} from "@/utils";
import { usePageTracking } from "@/hooks/analytics/usePageTracking";
import { PageContextProvider } from "@/contexts/analytics/PageContext";
import { DeadlinesSection } from "@/components/shared/sections/DeadlinesSection";
import { VideoSection } from "@/components/shared/sections/VideoSection";

export default function Admissions() {
  usePageTracking({
    pageType: "admissions",
    additionalData: {
      page_name: "Admissions Hub",
    },
  });

  // Set SEO meta tags
  useEffect(() => {
    setPageTitle(
      "Graduate Admissions & Application Requirements | Stevens Online"
    );
    setMetaDescription(
      "Learn about graduate admissions requirements, application deadlines, and how to apply to Stevens Online master's programs."
    );
    setOpenGraphTags({
      title: "Graduate Admissions & Application Requirements | Stevens Online",
      description:
        "Learn about graduate admissions requirements, application deadlines, and how to apply to Stevens Online master's programs.",
      image: buildCanonicalUrl("/assets/images/shared/stevens-campus.webp"),
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


  const faqs = [
    {
      q: "What is the Accelerated Application?",
      a: "The Accelerated Application is a streamlined admissions process designed for busy professionals. It removes traditional barriers like recommendation letters, personal essays, and standardized test scores, so you can apply in minutes and start your Stevens graduate journey faster. A bachelor's degree is required.",
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

  const _events = [
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
          bgImage="/assets/images/admissions/admissions-hero.webp"
        />

        {/* Take Your First Step */}
        <div className="py-stevens-section-sm lg:py-stevens-section bg-white">
          <div className="max-w-stevens-content-max mx-auto px-stevens-md lg:px-stevens-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-stevens-xl lg:gap-stevens-2xl items-center">
              {/* Left Side */}
              <div>
                <h2 className="font-stevens-display text-stevens-4xl md:text-stevens-5xl font-light uppercase tracking-wide text-stevens-dark-gray mb-stevens-lg leading-tight">
                  Take Your
                  <br />
                  First Step
                </h2>
                <p className="text-stevens-lg text-stevens-dark-gray leading-relaxed mb-stevens-md">
                  Connecting with our enrollment team is your path to a Stevens
                  graduate degree. We are here to guide you through options and
                  find the perfect program for your goals.
                </p>
                <div className="w-16 h-1 bg-stevens-red" />
              </div>

              {/* Right Side - Photo with Overlapping Card */}
              <div className="relative pb-16 md:pb-20">
                {/* Placeholder Image */}
                <div className="rounded-lg overflow-hidden shadow-stevens-lg">
                  <img
                    src="/assets/images/admissions/admissions-consultation.webp"
                    alt="Admissions"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Overlapping Card */}
                <div className="absolute bottom-0 left-4 right-4 translate-y-1/4 bg-white rounded-lg shadow-2xl shadow-black/15 p-stevens-lg">
                  <h3 className="font-stevens-display text-stevens-xl md:text-stevens-2xl font-semibold text-stevens-dark-gray mb-stevens-sm">
                    Connect with an
                    <br />
                    Enrollment Advisor
                  </h3>
                  <p className="text-stevens-base text-stevens-dark-gray mb-stevens-md">
                    Schedule a one-on-one consultation to discuss your goals.
                  </p>
                  <a
                    href={BOOKING_URLS.SCHEDULE_CALL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackConversion(CONVERSION_LABELS.SCHEDULE_CALL)
                    }
                  >
                    <Button className="w-full bg-stevens-black hover:bg-stevens-gray text-white gap-2 uppercase tracking-wider font-semibold">
                      Schedule Your Consultation
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Admissions Overview */}
        <div className="py-stevens-section-sm lg:py-stevens-section bg-stevens-white">
          <div className="max-w-stevens-content-max mx-auto px-stevens-md lg:px-stevens-lg">
            <div className="max-w-7xl mx-auto">
              <h2 className="font-stevens-display text-stevens-3xl md:text-stevens-4xl lg:text-stevens-5xl font-light uppercase tracking-wide text-stevens-dark-gray mb-stevens-xl text-center">
                Admissions Overview
              </h2>
              <div className="prose prose-lg max-w-4xl text-stevens-dark-gray leading-relaxed space-y-stevens-lg pb-stevens-2xl text-center mx-auto">
                <p>
                  Stevens is technology driven. Our faculty are experts in their
                  fields and experienced in industry. We deliver that expertise
                  and experience to you. Stevens takes theory and links it to
                  practical applications that have societal impact. That's the
                  DNA at Stevens.
                </p>
                <p>
                  We've streamlined the path to your graduate degree. Our
                  Accelerated Application is designed for busy professionals -
                  skip the traditional hurdles and start your Stevens journey in
                  minutes.
                </p>
              </div>

              {/* Comparison: Traditional vs Stevens Accelerated */}
              <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
                {/* Traditional Application Card */}
                <div className="bg-gray-100 border border-gray-200 rounded-lg p-8 lg:p-10 relative">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gray-300 rounded-t-lg" />
                  <p className="text-stevens-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">
                    At most schools
                  </p>
                  <h3 className="font-stevens-display text-stevens-2xl md:text-stevens-3xl font-medium text-gray-400 mb-6">
                    Traditional Graduate Application
                  </h3>
                  <ul className="space-y-4">
                    {[
                      "2-3 letters of recommendation",
                      "Statement of purpose / personal essay",
                      "GRE or GMAT scores",
                      "Official transcripts",
                      "Résumé or CV",
                      "Application fee",
                      "Weeks-long review process",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <X className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-gray-400 text-stevens-base">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Stevens Accelerated Application Card */}
                <div className="bg-white border-2 border-stevens-red/20 rounded-lg p-8 lg:p-10 shadow-xl relative">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-stevens-red rounded-t-lg" />
                  <p className="text-stevens-xs font-semibold uppercase tracking-widest text-stevens-red mb-2">
                    At Stevens
                  </p>
                  <h3 className="font-stevens-display text-stevens-2xl md:text-stevens-3xl font-medium text-stevens-dark-gray mb-6">
                    Accelerated Application
                  </h3>
                  <ul className="space-y-4">
                    {[
                      {
                        text: "No recommendation letters required",
                        highlight: true,
                      },
                      {
                        text: "No essays or personal statements",
                        highlight: true,
                      },
                      {
                        text: "No GRE or GMAT required",
                        highlight: true,
                      },
                      {
                        text: "Upload a copy of your transcripts",
                        highlight: false,
                      },
                      {
                        text: "Upload your résumé or link your LinkedIn",
                        highlight: false,
                      },
                      {
                        text: "No application fee",
                        highlight: true,
                      },
                      {
                        text: "Apply in minutes, not weeks",
                        highlight: true,
                      },
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                            item.highlight
                              ? "bg-stevens-red"
                              : "bg-emerald-500"
                          }`}
                        >
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-stevens-dark-gray text-stevens-base">
                          {item.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-stevens-xs text-gray-500 mt-6 italic">
                    Official transcripts will be due within 2 months of
                    enrollment. A bachelor's degree is required. Stevens may
                    request additional documentation if needed.
                  </p>
                  <a
                    href={createPageUrl("accelerated-application")}
                    className="block mt-6"
                  >
                    <Button className="w-full bg-stevens-red hover:bg-red-700 text-white gap-2 h-12 text-lg font-bold tracking-wide">
                      Apply Now
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </a>
                </div>
              </div>

              {/* Consultation CTA */}
              <div className="mt-10 max-w-6xl mx-auto">
                <div className="bg-gray-100/95 rounded-xl border border-gray-200 px-6 py-5 lg:px-10 lg:py-6 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-12">
                  <h3 className="text-lg lg:text-xl font-bold text-stevens-dark-gray text-center sm:text-left">
                    Have Questions About the Application Process?
                  </h3>
                  <Link to="/request-info/">
                    <Button
                      variant="outline-dark"
                      className="whitespace-nowrap px-8 bg-transparent border-stevens-dark-gray text-stevens-dark-gray hover:bg-stevens-dark-gray hover:text-white"
                    >
                      Get In Touch
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Dates & Deadlines - Using shared DeadlinesSection component */}
        <DeadlinesSection keyDates={deadlinesData} />

        {/* Why Choose Stevens - Video Section */}
        <VideoSection
          title="WHY CHOOSE STEVENS"
          heading="Discover what makes Stevens a leader in graduate education"
          description="Learn from our community why Stevens Institute of Technology stands out for working professionals seeking to advance their careers through technology-driven, flexible online programs."
          youtubeVideoId="RLPsCcxwAz0"
          youtubeQuality="hd1080"
          ctaText="Explore our programs"
          ctaLink={createPageUrl("explore-programs/") + "#explore-programs"}
          showCTA={true}
        />

        {/* Financial Aid Section */}
        <div className="py-stevens-section-sm lg:py-stevens-section bg-white">
          <div className="max-w-stevens-content-max mx-auto px-stevens-md lg:px-stevens-lg">
            <div className="grid md:grid-cols-2 gap-stevens-xl lg:gap-stevens-2xl items-center">
              {/* Left Side - Content */}
              <div>
                <h2 className="font-stevens-display text-stevens-3xl md:text-stevens-4xl lg:text-stevens-5xl font-light uppercase tracking-wide text-stevens-dark-gray mb-stevens-lg">
                  Financing Your Graduate Degree
                </h2>
                <p className="text-stevens-lg text-stevens-dark-gray leading-relaxed mb-stevens-xl">
                  Invest in your future with confidence. Stevens offers various
                  financial aid options, including federal loans and
                  assistantships. Access our Tuition & Financial Aid page for a
                  full cost breakdown.
                </p>
                <Link to="/tuition-and-financial-aid/">
                  <Button variant="outline-dark" className="gap-2">
                    Tuition & Financial Aid
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>

              {/* Right Side - FAFSA Code Highlight */}
              <div className="bg-stevens-light-gray rounded-lg p-stevens-xl">
                <div className="flex items-center gap-stevens-md mb-stevens-lg">
                  <div className="w-14 h-14 bg-stevens-red rounded-full flex items-center justify-center">
                    <DollarSign className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="text-stevens-sm text-stevens-dark-gray font-semibold uppercase tracking-wider">
                      Stevens FAFSA School Code
                    </p>
                  </div>
                </div>
                <div className="text-center py-stevens-lg border-t border-gray-300">
                  <p className="font-stevens-display text-stevens-5xl md:text-stevens-6xl font-bold text-stevens-red mb-stevens-sm">
                    002639
                  </p>
                  <p className="text-stevens-base text-stevens-dark-gray">
                    Use this code when completing your FAFSA application
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        

        {/* Admissions FAQ */}
        <div className="py-stevens-section-sm lg:py-stevens-section bg-stevens-white">
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
        <div className="py-stevens-section-sm lg:py-stevens-section bg-stevens-dark-gray">
          <div className="max-w-stevens-content-max mx-auto px-stevens-md lg:px-stevens-lg">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-stevens-xl items-center">
                <div className="text-stevens-white">
                  <h2 className="font-stevens-display text-stevens-3xl md:text-stevens-4xl lg:text-stevens-5xl font-light uppercase tracking-wide mb-stevens-md text-stevens-white">
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
