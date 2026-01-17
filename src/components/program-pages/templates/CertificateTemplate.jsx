import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  setPageTitle,
  setMetaDescription,
  setOpenGraphTags,
  buildCanonicalUrl,
} from "@/utils";

// Import sections
import {
  HeroSection,
  FAQSection,
  AccreditationSection,
  RankingsSection,
  FacultySection,
  SkillsSection,
  CareerOutcomesSection,
  OverviewSection,
  CurriculumSection,
  WhyStevensSection,
  AdmissionsSection,
  QuickStatsBar,
} from "../sections";
import { DeadlinesSection } from "../../shared/sections/DeadlinesSection";

// Import navigation
import { StickyNav, useSectionNavigation } from "../navigation";

/**
 * CertificateTemplate - Template for Professional Certificate Pages
 *
 * Key Differences from Degree Pages:
 * - Skills-first approach: "What You'll Learn" appears earlier
 * - No Video section
 * - No Student Spotlight section
 * - Admissions always combined with Tuition & Key Dates
 * - No standalone Events section
 * - Price/tuition cards in hero area
 *
 * Section Order (per design spec):
 * 1. Hero (with price callout - handled via heroBottomContent prop)
 * 2. Sticky Navigation
 * 3. Overview (with Quick Facts)
 * 4. Rankings (By the Numbers)
 * 5. What You'll Learn (Skills-First) - BEFORE Career
 * 6. Career & Skill Outcomes
 * 7. Common Job Titles
 * 8. Top Companies
 * 9. Curriculum / Course Sequence - AFTER Career
 * 10. Why Stevens (includes Stackability/Pathways)
 * 11. Faculty (Minimal)
 * 12. Admissions (combined with Tuition & Key Dates)
 * 13. FAQs
 * 14. Accreditation
 */
export function CertificateTemplate({
  programData,
  theme = "light",
  useApplicationModal = false,
  useRequestInfoModal = true,
}) {
  const {
    code,
    seo,
    hero,
    quickFacts,
    overview,
    rankings,
    career,
    curriculum,
    whyStevens,
    faculty,
    admissions,
    keyDates,
    tuition,
    faqs,
    accreditation,
    whatYoullLearn,
    careerOutcomes,
    topCompanies,
    deadlines,
  } = programData;

  const location = useLocation();

  // Use navigation hook - always true for certificate pages
  const {
    activeSection,
    moreMenuOpen,
    setMoreMenuOpen,
    navItems,
    moreMenuRef,
    registerSectionRef,
  } = useSectionNavigation({
    programData,
    isCertificate: true,
    locationHash: location.hash,
  });

  // Set SEO meta tags
  useEffect(() => {
    if (!seo) return;

    setPageTitle(seo.title);
    setMetaDescription(seo.description);
    setOpenGraphTags({
      title: seo.title,
      description: seo.description,
      image: seo.ogImage
        ? buildCanonicalUrl(seo.ogImage)
        : buildCanonicalUrl("/assets/logos/stevens-crest.webp"),
      url: buildCanonicalUrl(seo.url),
      type: "website",
    });

    return () => {
      setPageTitle("Stevens Online");
    };
  }, [seo]);

  if (!programData) return <div>Loading program data...</div>;

  // Opposite theme for sticky nav
  const navTheme = theme === "dark" ? "light" : "dark";

  return (
    <div className="bg-stevens-light-gray font-stevens-body">
      {/* Hero Section - Minimal style with form */}
      <HeroSection
        programCode={code}
        title={hero?.titleLines || hero?.title}
        subtitle={hero?.subtitle}
        badges={hero?.badges}
        tuitionCards={hero?.tuitionCards}
        bgImage={hero?.bgImage}
        bgImagePosition={hero?.bgImagePosition}
        formTitle="Enroll Now"
        formSubtitle="Get program details and start your application."
        variant="certificate"
        theme={theme}
      />

      {/* Sticky Navigation */}
      <StickyNav
        navItems={navItems}
        activeSection={activeSection}
        moreMenuOpen={moreMenuOpen}
        setMoreMenuOpen={setMoreMenuOpen}
        moreMenuRef={moreMenuRef}
        admissions={admissions}
        theme={navTheme}
      />

      <main>
        {/* Quick Stats Bar */}
        <QuickStatsBar stats={quickFacts?.enhancedStats} variant="dark" />

        {/* 1. Overview Section (with Quick Facts) */}
        <OverviewSection
          overview={overview}
          quickFacts={quickFacts}
          ref={registerSectionRef("overview")}
        />

        {/* 2. Rankings Section (By the Numbers) */}
        <RankingsSection
          rankings={rankings}
          footnotes={programData.rankings_footnotes}
          ref={registerSectionRef("rankings")}
        />

        {/* 3. What You'll Learn (Skills-First) - BEFORE Career for certificates */}
        <SkillsSection
          whatYoullLearn={whatYoullLearn}
          ref={registerSectionRef("what-youll-learn")}
        />

        {/* 4. Career Outcomes (intro + job titles OR logos) */}
        <CareerOutcomesSection
          careerOutcomes={careerOutcomes}
          career={career}
          programCode={code}
          isCertificate={true}
          variant={careerOutcomes?.variant || "table"}
          topCompanies={topCompanies}
          ref={registerSectionRef("career-outcomes")}
        />

        {/* 6. Curriculum / Course Sequence - AFTER Career Outcomes for certificates */}
        <CurriculumSection
          curriculum={curriculum}
          programCode={code}
          ref={registerSectionRef("curriculum")}
        />

        {/* 8. Why Stevens (includes Stackability/Pathways) */}
        <WhyStevensSection
          whyStevens={whyStevens}
          ref={registerSectionRef("why-stevens")}
        />

        {/* 9. Faculty (Minimal) */}
        <FacultySection faculty={faculty} ref={registerSectionRef("faculty")} />

        {/* 10. Admissions Section (combined with Tuition & Key Dates for certificates) */}
        <AdmissionsSection
          admissions={admissions}
          keyDates={keyDates}
          tuition={tuition}
          programCode={code}
          ref={registerSectionRef("admissions")}
        />

        {/* 10b. Deadlines Timeline Section (optional) */}
        {deadlines && (
          <DeadlinesSection
            keyDates={deadlines}
            ref={registerSectionRef("deadlines")}
          />
        )}

        {/* 11. FAQ Section */}
        <FAQSection faqs={faqs} ref={registerSectionRef("faqs")} />

        {/* 12. Accreditation Section */}
        <AccreditationSection
          accreditation={accreditation}
          ref={registerSectionRef("accreditation")}
        />
      </main>
    </div>
  );
}
