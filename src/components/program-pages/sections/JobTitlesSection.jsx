import React, { forwardRef, useMemo } from "react";
import { Section } from "../primitives";

function extractParagraphsFromHtml(html = "", maxParagraphs = 1) {
  if (!html || typeof html !== "string") return "";

  // Grab <p>...</p> blocks only, ignoring lists/headings to avoid duplication with job titles.
  const paragraphMatches = [...html.matchAll(/<p\b[^>]*>[\s\S]*?<\/p>/gi)].map(
    (m) => m[0]
  );

  if (paragraphMatches.length === 0) return "";
  return paragraphMatches.slice(0, maxParagraphs).join("\n");
}

function splitTitleForTwoLineDisplay(title = "") {
  if (!title || typeof title !== "string") return { top: "", bottom: "" };

  // Prefer splitting on " for " to match titles like:
  // "Prospective Occupations for Online MSCS Graduates"
  const match = title.match(/^(.*?)\s+for\s+(.*)$/i);
  if (match) {
    return { top: match[1], bottom: `for ${match[2]}` };
  }

  // Fallback: single line
  return { top: title, bottom: "" };
}

function toNumberMaybe(value) {
  if (value == null) return null;
  if (typeof value === "number") return Number.isFinite(value) ? value : null;
  if (typeof value !== "string") return null;

  const cleaned = value.replace(/[$,\s]/g, "");
  const num = parseFloat(cleaned);
  return Number.isFinite(num) ? num : null;
}

function formatSalaryDisplay(value) {
  if (value == null) return "";
  if (typeof value === "number") return `$${value.toLocaleString("en-US")}`;
  return value;
}

/**
 * JobTitlesSection - Common Job Titles table with salary data
 *
 * Design: CPE Brand Guidelines - Table with salary bars
 * Features:
 * - Intro text with program code
 * - Table showing job titles, employment numbers (optional), and salary
 * - Visual salary comparison bars (relative to max salary)
 * - Source citation
 *
 * Used in: Both Degree and Certificate pages
 *
 * @param {Object} commonJobTitles - Section configuration
 * @param {string} commonJobTitles.title - Section title
 * @param {Object} career - Career data containing job titles
 * @param {Array} career.jobTitles - Array of job objects
 * @param {string} career.jobTitles[].title - Job title
 * @param {string} career.jobTitles[].salary - Salary string (e.g., "$120,000")
 * @param {string} career.jobTitles[].employed - Employment count (optional)
 * @param {string} career.source - Data source citation
 * @param {string} programCode - Program code for display (e.g., "MBA")
 */
export const JobTitlesSection = forwardRef(function JobTitlesSection(
  { commonJobTitles, career, programCode, isCertificate = false },
  ref
) {
  if (!commonJobTitles || !career) return null;

  const hasJobTitles =
    Array.isArray(career.jobTitles) && career.jobTitles.length > 0;
  const hasIntroHtml =
    typeof career.description === "string" &&
    career.description.trim().length > 0;
  if (!hasJobTitles && !hasIntroHtml) return null;

  const maxIntroParagraphs = useMemo(() => {
    if (isCertificate) return 2;
    // Degree pages: allow 2–3 paragraphs for better visual rhythm
    return 3;
  }, [isCertificate, programCode]);

  const introHtml = useMemo(() => {
    if (!hasIntroHtml) return "";
    return extractParagraphsFromHtml(career.description, maxIntroParagraphs);
  }, [career.description, hasIntroHtml, maxIntroParagraphs]);

  const { top: titleTop, bottom: titleBottom } = useMemo(
    () => splitTitleForTwoLineDisplay(commonJobTitles.title),
    [commonJobTitles.title]
  );

  const kicker = useMemo(() => {
    const code = (programCode || "").toString().toLowerCase();
    if (code === "mscs") return "Tech Industry Impact";
    return "Career Outcomes";
  }, [programCode]);

  // Calculate max salary for relative bar widths
  const maxSalary = hasJobTitles
    ? Math.max(
        ...career.jobTitles
          .map((job) => toNumberMaybe(job.salary))
          .filter((n) => typeof n === "number")
      )
    : 0;

  const sortedJobs = useMemo(() => {
    if (!hasJobTitles) return [];

    // Stable-ish sort: salary desc, then original index
    return career.jobTitles
      .map((job, originalIndex) => ({
        job,
        originalIndex,
        salaryNumber: toNumberMaybe(job.salary),
      }))
      .sort((a, b) => {
        const aNum = a.salaryNumber;
        const bNum = b.salaryNumber;

        // Put numeric salaries first
        const aHas = typeof aNum === "number";
        const bHas = typeof bNum === "number";
        if (aHas && !bHas) return -1;
        if (!aHas && bHas) return 1;

        // Both numeric → desc
        if (aHas && bHas && aNum !== bNum) return bNum - aNum;

        // Fallback: preserve input order
        return a.originalIndex - b.originalIndex;
      })
      .map((x) => x.job);
  }, [career.jobTitles, hasJobTitles]);

  const displayJobs = useMemo(() => sortedJobs.slice(0, 5), [sortedJobs]);

  return (
    <Section
      id="common-job-titles"
      title={null}
      bgClassName="bg-stevens-white"
      ref={ref}
    >
      {/* Header (match screenshot style: two-line title + divider) */}
      <div className="mb-stevens-2xl">
        <h2 className="font-stevens-headers uppercase tracking-tight leading-none">
          <span className="block text-stevens-black font-light text-4xl md:text-5xl">
            {(titleTop || commonJobTitles.title || "").toUpperCase()}
          </span>
          {titleBottom && (
            <span className="block text-stevens-gray font-light text-4xl md:text-5xl mt-2">
              {titleBottom.toUpperCase()}
            </span>
          )}
        </h2>
        <div className="mt-stevens-xl h-px w-full bg-stevens-light-gray" />
      </div>

      <div className="flex flex-col lg:flex-row gap-stevens-gap-lg items-start">
        {/* Left: Kicker + Narrative */}
        <div className="w-full lg:w-5/12">
          <p className="font-stevens-headers font-bold text-sm uppercase tracking-wider text-stevens-red mb-5">
            Career Outcomes
          </p>

          {introHtml ? (
            <div
              className="prose max-w-none text-stevens-dark-gray leading-relaxed [&_p]:mb-6 last:[&_p]:mb-0"
              dangerouslySetInnerHTML={{ __html: introHtml }}
            />
          ) : (
            <div className="space-y-6 text-stevens-dark-gray leading-relaxed">
              <p className="text-stevens-base">
                Earning an online {programCode.toUpperCase()} prepares you for
                career paths across industries.
              </p>
            </div>
          )}
        </div>

        {/* Right: Keep the existing table presentation */}
        {hasJobTitles && (
          <div className="w-full lg:w-7/12">
            {/* Card list table (match screenshot) */}
            <div className="w-full">
              {/* Header row */}
              <div className="flex items-center justify-between px-2 mb-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-stevens-gray">
                  Role Title
                </p>
                <p className="text-xs font-semibold uppercase tracking-wider text-stevens-gray">
                  Median Annual Earnings
                </p>
              </div>

              <div className="space-y-4">
                {displayJobs.map((job, index) => {
                  const salaryNumber = toNumberMaybe(job.salary);
                  const pct =
                    maxSalary && salaryNumber != null
                      ? Math.min(100, (salaryNumber / maxSalary) * 100)
                      : 0;

                  const tier =
                    index === 0
                      ? "primary"
                      : index === 1
                      ? "secondary"
                      : "standard";

                  return (
                    <div
                      key={job.title || index}
                      className={[
                        "bg-stevens-white border border-stevens-light-gray rounded-stevens-md px-6 shadow-sm",
                        tier === "primary"
                          ? "py-6"
                          : tier === "secondary"
                          ? "py-5"
                          : "py-4",
                      ].join(" ")}
                    >
                      <div className="flex items-start justify-between gap-6">
                        <h4
                          className={[
                            "font-stevens-headers leading-snug",
                            tier === "primary"
                              ? "font-bold text-stevens-xl text-stevens-black"
                              : tier === "secondary"
                              ? "font-bold text-stevens-lg text-stevens-black"
                              : "font-semibold text-stevens-base text-stevens-dark-gray",
                          ].join(" ")}
                        >
                          {job.title}
                        </h4>
                        <div className="text-right flex-shrink-0">
                          <p
                            className={[
                              "font-stevens-headers font-bold",
                              tier === "primary"
                                ? "text-stevens-2xl text-stevens-black"
                                : tier === "secondary"
                                ? "text-stevens-xl text-stevens-black"
                                : "text-stevens-lg text-stevens-dark-gray",
                            ].join(" ")}
                          >
                            {formatSalaryDisplay(job.salary)}
                          </p>
                        </div>
                      </div>

                      {/* Bar */}
                      <div className="mt-4">
                        <div
                          className={[
                            // Track width hierarchy (starting from item #3)
                            "w-full",
                            tier === "standard" ? "md:w-[82%]" : "",
                          ].join(" ")}
                        >
                          <div
                            className={[
                              "w-full rounded-full bg-stevens-light-gray",
                              tier === "primary"
                                ? "h-2.5"
                                : tier === "secondary"
                                ? "h-2"
                                : "h-1.5",
                            ].join(" ")}
                          >
                            <div
                              className={[
                                "rounded-full",
                                tier === "primary"
                                  ? "bg-stevens-black"
                                  : tier === "secondary"
                                  ? "bg-stevens-dark-gray"
                                  : "bg-stevens-gray",
                                tier === "primary"
                                  ? "h-2.5"
                                  : tier === "secondary"
                                  ? "h-2"
                                  : "h-1.5",
                              ].join(" ")}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Source: match screenshot (bottom, subtle) */}
      {career.source && (
        <div className="mt-stevens-3xl">
          <p className="text-stevens-sm text-stevens-gray/80">
            Source: {career.source}
          </p>
        </div>
      )}
    </Section>
  );
});
