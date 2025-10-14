import React, { useState, useEffect } from "react";
import PageHero from "../components/shared/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BOOKING_URLS } from "@/config/constants";

export default function ComparePrograms() {
  const PROGRAM_OPTIONS = [
    { label: "MBA", value: "mba" },
    { label: "M.S. in Computer Science", value: "mscs" },
    { label: "Master of Engineering in Engineering Management", value: "mem" },
  ];

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

  return (
    <div>
      <PageHero title="Compare Our Programs" subtitle="Find your path" 
      
      bgImage="/assets/images/compare-hero.jpg"
      />

      {/* Select Programs to Compare */}
      <section className="py-16 bg-stevens-white">
        <div className="max-w-7xl mx-auto px-stevens-sm stevens-md:px-stevens-lg stevens-xl:px-stevens-xl">
          <div className="text-center mb-stevens-xl">
            <h2 className="font-stevens-display text-stevens-3xl stevens-md:text-stevens-4xl font-stevens-bold text-stevens-gray-900 mb-stevens-sm">
              Select Programs to Compare
            </h2>
            <p className="text-stevens-gray-700">
              Earn a master’s degree from Stevens to gain a technical advantage
              in your career. Our programs are 100% online and connect you to
              renowned faculty and the Stevens alumni network.
            </p>
          </div>

          <Card className="shadow-stevens-lg border-0">
            <CardContent className="p-stevens-xl">
              <div className="grid stevens-md:grid-cols-3 gap-stevens-lg items-end">
                <div>
                  <label className="block text-stevens-sm font-stevens-semibold text-stevens-gray-900 mb-stevens-xs">
                    Select Program
                  </label>
                  <select
                    value={left}
                    onChange={(e) => setLeft(e.target.value)}
                    className="w-full border border-stevens-gray-300 rounded-stevens-md p-stevens-sm"
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
                  <label className="block text-stevens-sm font-stevens-semibold text-stevens-gray-900 mb-stevens-xs">
                    Select Program
                  </label>
                  <select
                    value={right}
                    onChange={(e) => setRight(e.target.value)}
                    className="w-full border border-stevens-gray-300 rounded-stevens-md p-stevens-sm"
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
                    className="btn-stevens-primary w-full stevens-md:w-auto"
                    onClick={handleCompare}
                  >
                    Compare
                  </Button>
                </div>
              </div>
              {showResults && (
                <div className="mt-stevens-2xl">
                  <div className="overflow-x-auto bg-stevens-white rounded-stevens-md border border-stevens-gray-200">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-stevens-gray-50 text-left">
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
                            className="border-t border-stevens-gray-100 align-top"
                          >
                            <td className="p-stevens-md font-stevens-semibold text-stevens-gray-900">
                              {field.label}
                            </td>
                            <td className="p-stevens-md whitespace-pre-line text-stevens-gray-900">
                              {PROGRAM_DETAILS[left][field.key]}
                            </td>
                            <td className="p-stevens-md whitespace-pre-line text-stevens-gray-900">
                              {PROGRAM_DETAILS[right][field.key]}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              <p className="text-stevens-xs text-stevens-gray-600 mt-stevens-md">
                *Tuition estimates based on Fall 2025 rates effective September
                2025. Tuition and fees are subject to change annually.
                Additional program fees may apply.
              </p>
              <p className="text-stevens-xs text-stevens-gray-600">
                **Total program duration is subject to change based on course
                availability and the number of courses taken each semester.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Program Track Options */}
      <section className="py-16 bg-stevens-gray-50">
        <div className="max-w-7xl mx-auto px-stevens-sm stevens-md:px-stevens-lg stevens-xl:px-stevens-xl">
          <h3 className="font-stevens-display text-stevens-2xl font-stevens-bold text-stevens-gray-900 mb-stevens-lg">
            Program Track Options
          </h3>
          <div className="overflow-x-auto bg-stevens-white rounded-stevens-md border border-stevens-gray-200">
            <table className="w-full">
              <thead>
                <tr className="bg-stevens-gray-50 text-left">
                  <th className="p-stevens-md font-stevens-semibold">
                    Program
                  </th>
                  <th className="p-stevens-md font-stevens-semibold">
                    Track Options
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-stevens-gray-100">
                  <td className="p-stevens-md">Online MBA</td>
                  <td className="p-stevens-md">n/a</td>
                </tr>
                <tr className="border-t border-stevens-gray-100">
                  <td className="p-stevens-md">
                    Online M.S. in Computer Science
                  </td>
                  <td className="p-stevens-md">Traditional | Advanced</td>
                </tr>
                <tr className="border-t border-stevens-gray-100">
                  <td className="p-stevens-md">Online MEM</td>
                  <td className="p-stevens-md">n/a</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-stevens-sm space-y-stevens-xs text-stevens-xs text-stevens-gray-600">
            <p>
              *Tuition estimates based on Fall 2025 rates effective September
              2025. Tuition and fees are subject to change annually. Additional
              program fees may apply. Effective Fall 2025, the Online M.S. in
              Computer Science and Online Master of Engineering in Engineering
              Management programs will incorporate asynchronous course delivery
              for the initial phase of their curriculum. This change will impact
              the tuition rates for some courses.
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
          <h3 className="font-stevens-display text-stevens-2xl stevens-md:text-stevens-3xl font-stevens-bold text-stevens-gray-900 mb-stevens-md">
            Ready to discuss how our programs can help you achieve your goals?
          </h3>
          <a
            href={BOOKING_URLS.SCHEDULE_CALL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackConversion(CONVERSION_LABELS.SCHEDULE_CALL)}
          >
            <Button className="btn-stevens-primary">Connect With Us</Button>
          </a>
        </div>
      </section>
    </div>
  );
}
