import React, { forwardRef, useMemo } from "react";
import { Check, TrendingUp } from "lucide-react";
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
 * CareerOutcomesSection - Career outcomes with job titles/salary OR company logos
 *
 * Design: CPE Brand Guidelines
 *
 * Variants:
 * - "table" (default): Table with salary bars
 * - "logos": 2x3 grid of company logos
 *
 * Features:
 * - Intro text with program code
 * - Table showing job titles and salary (variant="table")
 * - Company logo grid (variant="logos")
 * - Source citation
 *
 * Used in: Both Degree and Certificate pages
 *
 * @param {Object} careerOutcomes - Section configuration
 * @param {string} careerOutcomes.title - Section title
 * @param {Object} career - Career data containing job titles
 * @param {Array} career.jobTitles - Array of job objects
 * @param {string} career.source - Data source citation
 * @param {string} programCode - Program code for display (e.g., "MBA")
 * @param {string} variant - "table" (default) or "logos"
 * @param {Object} topCompanies - Company data for logos variant
 */
export const CareerOutcomesSection = forwardRef(function CareerOutcomesSection(
  {
    careerOutcomes,
    career,
    programCode,
    isCertificate = false,
    variant = "table",
    topCompanies,
  },
  ref
) {
  if (!careerOutcomes || !career) return null;

  const hasJobTitles =
    Array.isArray(career.jobTitles) && career.jobTitles.length > 0;
  const hasIntroHtml =
    typeof career.description === "string" &&
    career.description.trim().length > 0;
  const hasLogos =
    variant === "logos" &&
    topCompanies?.companies &&
    Array.isArray(topCompanies.companies) &&
    topCompanies.companies.length > 0;

  if (!hasJobTitles && !hasIntroHtml && !hasLogos) return null;

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
    () => splitTitleForTwoLineDisplay(careerOutcomes.title),
    [careerOutcomes.title]
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
      id="career-outcomes"
      title={null}
      bgClassName={variant === "logos" ? "bg-stevens-light-gray" : "bg-white"}
      ref={ref}
    >
      {/* Header - only show for non-logos variant */}
      {variant !== "logos" && (
        <div className="mb-stevens-2xl">
          <h2 className="font-stevens-headers uppercase tracking-tight leading-none">
            <span className="block text-stevens-black font-light text-4xl md:text-5xl">
              {(titleTop || careerOutcomes.title || "").toUpperCase()}
            </span>
            {titleBottom && (
              <span className="block text-stevens-gray font-light text-4xl md:text-5xl mt-2">
                {titleBottom.toUpperCase()}
              </span>
            )}
          </h2>
          <div className="mt-stevens-xl h-px w-full bg-stevens-gray/20" />
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
        {/* Left: Title + LeadText + Bullets OR Legacy Narrative */}
        <div
          className={`w-full lg:w-5/12 ${
            careerOutcomes.bullets && careerOutcomes.bullets.length > 0
              ? "lg:self-center"
              : ""
          }`}
        >
          {/* New Bullet Layout (when careerOutcomes.bullets exists) */}
          {careerOutcomes.bullets && careerOutcomes.bullets.length > 0 ? (
            <>
              {/* Section Title - for logos variant */}
              {variant === "logos" && (
                <h2 className="font-stevens-display text-4xl lg:text-5xl font-light text-stevens-black uppercase tracking-tight mb-6">
                  Career Outcomes
                </h2>
              )}

              {/* Lead Text */}
              {careerOutcomes.leadText && (
                <p className="text-lg text-stevens-dark-gray leading-relaxed mb-8">
                  {careerOutcomes.leadText}
                </p>
              )}

              {/* Icon Bullets */}
              <div className="space-y-5">
                {careerOutcomes.bullets.map((bullet, index) => (
                  <div key={index} className="flex items-start gap-3">
                    {/* Icon */}
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-stevens-red flex items-center justify-center mt-0.5">
                      {bullet.icon === "trend" ? (
                        <TrendingUp
                          className="w-3.5 h-3.5 text-white"
                          strokeWidth={2.5}
                        />
                      ) : (
                        <Check
                          className="w-3.5 h-3.5 text-white"
                          strokeWidth={3}
                        />
                      )}
                    </div>
                    {/* Text */}
                    <p
                      className="text-stevens-dark-gray leading-relaxed [&_strong]:font-bold [&_strong]:text-stevens-black"
                      dangerouslySetInnerHTML={{ __html: bullet.text }}
                    />
                  </div>
                ))}
              </div>
            </>
          ) : (
            /* Legacy Layout (fallback) */
            <>
              <p className="font-stevens-headers font-bold text-2xl uppercase tracking-wider text-stevens-red mb-5">
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
                    Earning an online {programCode.toUpperCase()} prepares you
                    for career paths across industries.
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Right: Table OR Logo Grid based on variant */}
        {variant === "logos" && hasLogos ? (
          /* Logo Grid Variant - 2 columns x 3 rows */
          <div className="w-full lg:w-7/12">
            {/* Logo Grid Title */}
            <h3 className="font-stevens-display text-2xl lg:text-3xl font-light text-stevens-black mb-6 text-center">
              Where our graduates work
            </h3>
            <div className="grid grid-cols-2 gap-4 lg:gap-6">
              {topCompanies.companies.slice(0, 6).map((company, index) => (
                <div
                  key={company.name || index}
                  className="bg-white p-6 lg:p-8 flex items-center justify-center min-h-[120px] lg:min-h-[160px] border border-stevens-gray/20 hover:border-stevens-red/20 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
                >
                  {company.logo ? (
                    <img
                      src={company.logo}
                      alt={`${company.name} logo`}
                      className="max-h-12 lg:max-h-16 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity duration-200"
                      loading="lazy"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling &&
                          (e.target.nextSibling.style.display = "block");
                      }}
                    />
                  ) : (
                    <span className="text-sm font-medium text-stevens-gray">
                      {company.name}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : hasJobTitles ? (
          /* Table Variant - Salary bars */
          <div className="w-full lg:w-7/12">
            {/* Card list table (match screenshot) */}
            <div className="w-full">
              {/* Header row */}
              <div className="flex items-center justify-between px-2 mb-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-stevens-red">
                  Role Title
                </p>
                <p className="text-xs font-semibold uppercase tracking-wider text-stevens-red">
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
                        "bg-stevens-light-gray border border-stevens-gray/10 rounded-stevens-md",
                        tier === "primary"
                          ? "py-6 px-6"
                          : tier === "secondary"
                          ? "py-5 px-6"
                          : "py-3 px-5",
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
                      <div className={tier === "standard" ? "mt-2" : "mt-4"}>
                        <div
                          className={[
                            // Track width hierarchy (starting from item #3)
                            "w-full",
                            tier === "standard" ? "md:w-[82%]" : "",
                          ].join(" ")}
                        >
                          <div
                            className={[
                              "w-full rounded-full bg-stevens-gray/30",
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
                                  ? "bg-stevens-red"
                                  : tier === "secondary"
                                  ? "bg-stevens-red"
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
        ) : null}
      </div>

      {/* Source: match screenshot (bottom, subtle) - hidden for logos variant */}
      {career.source && variant !== "logos" && (
        <div className="mt-stevens-3xl">
          <p className="text-stevens-sm text-stevens-gray/80">
            Source: {career.source}
          </p>
        </div>
      )}
    </Section>
  );
});
