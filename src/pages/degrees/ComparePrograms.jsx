import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { PageHero } from "@/components/shared";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calculator } from "lucide-react";
import { BOOKING_URLS, KEY_DATES_SPRING2 } from "@/config/constants";
import ProgramFilterGrid from "@/components/admissions/ProgramFilterGrid";
import ProgramReadinessAssessment from "../../components/assessment/ProgramReadinessAssessment";
import TuitionCalculatorBody from "@/components/calculator/TuitionCalculatorBody";
import { PROGRAMS_DATA } from "@/data/programsData";
import { trackConversion, CONVERSION_LABELS } from "@/utils/gtmTracking";
import { usePageTracking } from "@/hooks/analytics/usePageTracking";
import { PageContextProvider } from "@/contexts/analytics/PageContext";
import {
  setPageTitle,
  setMetaDescription,
  setOpenGraphTags,
  buildCanonicalUrl,
} from "@/utils";

export default function ComparePrograms() {
  usePageTracking({
    pageType: "programs_hub",
    additionalData: {
      page_name: "All Programs",
      has_quiz: true,
      has_calculator: true,
    },
  });

  // Read ?filter= from URL (masters | certificates) for ProgramFilterGrid
  const [searchParams] = useSearchParams();
  const filterFromUrl = searchParams.get("filter") || null;
  const initialFilter =
    filterFromUrl === "masters" || filterFromUrl === "certificates"
      ? filterFromUrl
      : null;

  // Handle hash navigation (scroll to section if hash is present in URL)
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  }, []);

  // Set SEO meta tags
  useEffect(() => {
    setPageTitle("Online Graduate Programs & Certificates | Stevens Online");
    setMetaDescription(
      "Explore Stevens' online graduate degrees and certificates. Compare programs, estimate tuition with our calculator, and find the right fit for your career goals."
    );
    setOpenGraphTags({
      title: "Online Graduate Programs & Certificates | Stevens Online",
      description:
        "Explore Stevens' online graduate degrees and certificates. Compare programs, estimate tuition with our calculator, and find the right fit for your career goals.",
      image: buildCanonicalUrl("/assets/images/shared/stevens-campus.webp"),
      url: buildCanonicalUrl("/compare-our-programs/"),
      type: "website",
    });
  }, []);

  const PROGRAM_OPTIONS = [
    { label: "MBA", value: "mba" },
    { label: "M.S. in Computer Science", value: "mscs" },
    { label: "M.Eng. in Engineering Management", value: "mem" },
    { label: "M.Eng. in Applied Data Science", value: "meads" },
    { label: "Enterprise AI Certificate", value: "cert-eai" },
    {
      label: "Applied Data Science Foundations Certificate",
      value: "cert-ads",
    },
  ];

  // Tuition calculator state
  const [selectedCalcProgram, setSelectedCalcProgram] = useState("");
  const [calculatedCost, setCalculatedCost] = useState(null);

  // Program comparison state
  const [left, setLeft] = useState("mba");
  const [right, setRight] = useState("mscs");
  const [showResults, setShowResults] = useState(false);

  // Ensure the two selectors never select the same program
  useEffect(() => {
    if (right === left) {
      const fallback =
        PROGRAM_OPTIONS.find((o) => o.value !== left)?.value || right;
      setRight(fallback);
    }
  }, [left]);

  useEffect(() => {
    if (left === right) {
      const fallback =
        PROGRAM_OPTIONS.find((o) => o.value !== right)?.value || left;
      setLeft(fallback);
    }
  }, [right]);

  // Static compare data derived from official site content
  // Source: Compare Our Programs page
  const PROGRAM_DETAILS = {
    mba: {
      name: "MBA",
      degreeLevel: "Master's",
      programLength: "2.5–3 years**",
      programStart: "Spring, Summer, Fall",
      cost: "$77,727–$95,664*",
      creditHours: "39–48",
      curriculum:
        "Students will engage in coursework to develop business acumen and interpret data to identify trends and make strategic recommendations.",
    },
    mscs: {
      name: "M.S. in Computer Science",
      degreeLevel: "Master's",
      programLength: "2 years**",
      programStart: "Spring, Summer, Fall",
      cost: "$47,832* (Online MSCS)\n$5,250* (Online MSCS Asynchronous)",
      creditHours:
        "24 credits (Online MSCS)\n6 credits (Online MSCS Asynchronous)",
      curriculum:
        "Students will engage in coursework to develop skills as software development leaders and high‑quality coders.",
    },
    mem: {
      name: "Master of Engineering in Engineering Management",
      degreeLevel: "Master's",
      programLength: "2 years**",
      programStart: "Spring, Summer, Fall",
      cost: "$47,832* (Online MEM)\n$5,250* (Online MEM Asynchronous)",
      creditHours:
        "24 credits (Online MEM)\n6 credits (Online MEM Asynchronous)",
      curriculum:
        "Students take coursework built on three pillars: management for engineers, data science and management, and engineering modeling and risk analysis.",
    },
    meads: {
      name: "M.Eng. in Applied Data Science",
      degreeLevel: "Master's",
      programLength: "2 years**",
      programStart: "Spring, Summer, Fall",
      cost: "$24,000*",
      creditHours: "30 credits",
      curriculum:
        "Master data science and AI engineering through hands-on projects. Curriculum bridges engineering precision with AI-driven innovation, covering data pipelines, machine learning, and AI deployment.",
    },
    "cert-eai": {
      name: "Professional Graduate Certificate in Enterprise AI",
      degreeLevel: "Professional Graduate Certificate",
      programLength: "8-16 weeks**",
      programStart: KEY_DATES_SPRING2.TERM.name,
      cost: "$5,250*",
      creditHours: "9 credits",
      curriculum:
        "Learn to frame, prototype, and deploy AI workflows safely. Progress from AI strategy and governance to GenAI proof-of-concepts to operational workflow deployment.",
    },
    "cert-ads": {
      name: "Applied Data Science Foundations Certificate",
      degreeLevel: "Professional Graduate Certificate",
      programLength: "16-20 weeks**",
      programStart: KEY_DATES_SPRING2.TERM.name,
      cost: "$5,250*",
      creditHours: "9 credits",
      curriculum:
        "Master Python, SQL, and machine learning foundations through hands-on, project-based learning. Build AI-ready data pipelines and deploy ML models with real-world applications.",
    },
  };

  const FIELDS = [
    { key: "degreeLevel", label: "Degree Level" },
    { key: "programLength", label: "Program Length" },
    { key: "programStart", label: "Program Start" },
    { key: "cost", label: "Cost" },
    { key: "creditHours", label: "Credit Hours" },
    { key: "curriculum", label: "Curriculum" },
  ];

  const handleCompare = () => {
    setShowResults(true);
    // Smooth scroll to results table
    const el = document.getElementById("program-details-compare");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleAssessmentComplete = useCallback((results) => {
    // Handle assessment completion - could trigger additional actions
    console.log("Assessment completed:", results);
    // Optionally, you might want to show the LeadCaptureForm or redirect after assessment
  }, []);

  return (
    <PageContextProvider pageType="programs_hub" pageName="AllPrograms">
      <div>
        <PageHero
          title="Explore Online Graduate Programs & Certificates"
          subtitle="Find the right program for your career"
          bgImage="/assets/images/compare-programs/compare-programs-hero.webp"
          rightContent={
            <ProgramReadinessAssessment onComplete={handleAssessmentComplete} />
          }
        />

        {/* Explore Our Programs */}
        <div
          id="explore-programs"
          className="py-stevens-section-sm lg:py-stevens-section bg-stevens-gray/10"
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

            <ProgramFilterGrid initialFilter={initialFilter} />

            {/* Consultation CTA */}
            <div className="border-t border-stevens-light-gray py-stevens-xl mt-stevens-2xl">
              <div className="grid stevens-md:grid-cols-2 gap-stevens-lg items-center">
                <div>
                  <h3 className="font-stevens-display text-stevens-2xl font-light text-stevens-dark-gray">
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

        {/* Estimate Your Tuition - Inline Calculator */}
        <section
          id="tuition-calculator"
          className="py-stevens-section-sm lg:py-stevens-section bg-stevens-white scroll-mt-24"
        >
          <div className="max-w-stevens-content-max mx-auto px-stevens-md lg:px-stevens-lg">
            <div className="text-center mb-stevens-2xl">
              <h2 className="font-stevens-display text-stevens-3xl md:text-stevens-4xl lg:text-stevens-5xl font-light uppercase tracking-wide text-stevens-dark-gray mb-stevens-lg">
                Estimate Your Tuition
              </h2>
              <p className="text-stevens-lg text-stevens-dark-gray leading-relaxed max-w-5xl mx-auto">
                Use our calculator to estimate your tuition with available
                discounts and employer reimbursement benefits. Select a program
                to get started.
              </p>
            </div>

            {/* Program Selector Dropdown */}
            <div className="max-w-xl mx-auto mb-stevens-xl">
              <label className="block text-stevens-sm font-stevens-semibold text-stevens-dark-gray mb-stevens-xs">
                Select a Program
              </label>
              <select
                value={selectedCalcProgram}
                onChange={(e) => {
                  setSelectedCalcProgram(e.target.value);
                  setCalculatedCost(null);
                }}
                className="w-full border border-stevens-light-gray rounded-stevens-md p-stevens-sm text-stevens-base"
              >
                <option value="">-- Choose a program --</option>
                {PROGRAMS_DATA.map((program) => (
                  <option key={program.code} value={program.code}>
                    {program.shortName}
                  </option>
                ))}
              </select>
            </div>

            {/* Calculator Body or Placeholder */}
            {selectedCalcProgram ? (
              <Card className="border border-stevens-light-gray shadow-stevens-md overflow-hidden max-w-4xl mx-auto">
                <TuitionCalculatorBody
                  key={selectedCalcProgram}
                  programCode={selectedCalcProgram}
                  onCostChange={setCalculatedCost}
                />
              </Card>
            ) : (
              <Card className="max-w-2xl mx-auto border-2">
                <CardContent className="p-stevens-2xl pt-stevens-2xl text-center">
                  <Calculator className="w-16 h-16 mx-auto mb-stevens-xl text-stevens-gray" />
                  <h3 className="font-stevens-display text-stevens-xl lg:text-stevens-2xl font-stevens-bold text-stevens-dark-gray mb-stevens-lg">
                    Ready to see your estimated cost?
                  </h3>
                  <p className="text-stevens-base lg:text-stevens-lg text-stevens-dark-gray max-w-xl mx-auto leading-relaxed">
                    Select a program above to calculate your tuition with
                    workforce partner, alumni, and resident discounts applied.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </section>

        {/* Select Programs to Compare */}
        <section
          id="compare-programs"
          className="py-16 bg-stevens-white scroll-mt-24"
        >
          <div className="max-w-7xl mx-auto px-stevens-sm stevens-md:px-stevens-lg stevens-xl:px-stevens-xl">
            <div className="text-center mb-stevens-xl">
              <h2 className="font-stevens-display text-stevens-3xl stevens-md:text-stevens-4xl font-light uppercase tracking-wide text-stevens-dark-gray mb-stevens-sm">
                Select Programs to Compare
              </h2>
              <p className="text-stevens-dark-gray">
                Earn a master’s degree from Stevens to gain a technical
                advantage in your career. Our programs are 100% online and
                connect you to renowned faculty and the Stevens alumni network.
              </p>
            </div>

            <Card className="shadow-stevens-lg border-0">
              <CardContent className="p-stevens-xl">
                <div className="grid stevens-md:grid-cols-3 gap-stevens-lg items-end">
                  <div>
                    <label className="block text-stevens-sm font-stevens-semibold text-stevens-dark-gray mb-stevens-xs">
                      Select Program
                    </label>
                    <select
                      value={left}
                      onChange={(e) => setLeft(e.target.value)}
                      className="w-full border border-stevens-light-gray rounded-stevens-md p-stevens-sm"
                    >
                      {PROGRAM_OPTIONS.map((opt) => (
                        <option
                          key={opt.value}
                          value={opt.value}
                          disabled={opt.value === right}
                        >
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-stevens-sm font-stevens-semibold text-stevens-dark-gray mb-stevens-xs">
                      Select Program
                    </label>
                    <select
                      value={right}
                      onChange={(e) => setRight(e.target.value)}
                      className="w-full border border-stevens-light-gray rounded-stevens-md p-stevens-sm"
                    >
                      {PROGRAM_OPTIONS.map((opt) => (
                        <option
                          key={opt.value}
                          value={opt.value}
                          disabled={opt.value === left}
                        >
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="stevens-md:justify-self-end">
                    <Button
                      variant="default"
                      className="w-full stevens-md:w-auto"
                      onClick={handleCompare}
                    >
                      Compare
                    </Button>
                  </div>
                </div>
                {showResults && (
                  <div className="mt-stevens-2xl">
                    <div className="overflow-x-auto bg-stevens-white rounded-stevens-md border border-stevens-light-gray">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-stevens-light-gray text-left">
                            <th className="p-stevens-md font-stevens-semibold w-1/3">
                              Program Details
                            </th>
                            <th className="p-stevens-md font-stevens-semibold text-stevens-center">
                              {PROGRAM_DETAILS[left].name}
                            </th>
                            <th className="p-stevens-md font-stevens-semibold text-stevens-center">
                              {PROGRAM_DETAILS[right].name}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {FIELDS.map((field) => (
                            <tr
                              key={field.key}
                              className="border-t border-stevens-light-gray align-top"
                            >
                              <td className="p-stevens-md font-stevens-semibold text-stevens-dark-gray">
                                {field.label}
                              </td>
                              <td className="p-stevens-md whitespace-pre-line text-stevens-dark-gray">
                                {PROGRAM_DETAILS[left][field.key]}
                              </td>
                              <td className="p-stevens-md whitespace-pre-line text-stevens-dark-gray">
                                {PROGRAM_DETAILS[right][field.key]}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                <p className="text-stevens-xs text-stevens-dark-gray mt-stevens-md">
                  *Tuition estimates based on Fall 2025 rates effective
                  September 2025. Tuition and fees are subject to change
                  annually. Additional program fees may apply.
                </p>
                <p className="text-stevens-xs text-stevens-dark-gray">
                  **Total program duration is subject to change based on course
                  availability and the number of courses taken each semester.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Program Track Options */}
        <section className="py-16 bg-stevens-white">
          <div className="max-w-7xl mx-auto px-stevens-sm stevens-md:px-stevens-lg stevens-xl:px-stevens-xl">
            <h3 className="font-stevens-display text-stevens-2xl font-light uppercase tracking-wide text-stevens-dark-gray mb-stevens-lg">
              Program Track Options
            </h3>
            <div className="overflow-x-auto bg-stevens-white rounded-stevens-md border border-stevens-light-gray">
              <table className="w-full">
                <thead>
                  <tr className="bg-stevens-light-gray text-left">
                    <th className="p-stevens-md font-stevens-semibold">
                      Program
                    </th>
                    <th className="p-stevens-md font-stevens-semibold">
                      Track Options
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-stevens-light-gray">
                    <td className="p-stevens-md">Online MBA</td>
                    <td className="p-stevens-md">n/a</td>
                  </tr>
                  <tr className="border-t border-stevens-light-gray">
                    <td className="p-stevens-md">
                      Online M.S. in Computer Science
                    </td>
                    <td className="p-stevens-md">Traditional | Advanced</td>
                  </tr>
                  <tr className="border-t border-stevens-light-gray">
                    <td className="p-stevens-md">Online MEM</td>
                    <td className="p-stevens-md">n/a</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-stevens-sm space-y-stevens-xs text-stevens-xs text-stevens-dark-gray">
              <p>
                *Tuition estimates based on Fall 2025 rates effective September
                2025. Tuition and fees are subject to change annually.
                Additional program fees may apply. Effective Fall 2025, the
                Online M.S. in Computer Science and Online Master of Engineering
                in Engineering Management programs will incorporate asynchronous
                course delivery for the initial phase of their curriculum. This
                change will impact the tuition rates for some courses.
              </p>
              <p>
                **Total program duration is subject to change based on course
                availability and the number of courses taken each semester.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-stevens-white">
          <div className="max-w-7xl mx-auto px-stevens-sm stevens-md:px-stevens-lg stevens-xl:px-stevens-xl text-center">
            <h3 className="font-stevens-display text-stevens-2xl stevens-md:text-stevens-3xl font-light text-stevens-dark-gray mb-stevens-md">
              Ready to discuss how our programs can help you achieve your goals?
            </h3>
            <a
              href={BOOKING_URLS.SCHEDULE_CALL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackConversion(CONVERSION_LABELS.SCHEDULE_CALL)}
            >
              <Button variant="default">Connect With Us</Button>
            </a>
          </div>
        </section>
      </div>
    </PageContextProvider>
  );
}
