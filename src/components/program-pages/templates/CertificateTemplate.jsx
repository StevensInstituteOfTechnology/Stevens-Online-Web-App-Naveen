import React, { useEffect } from "react";
import { PageHero } from "@/components/shared";
import { useLocation } from "react-router-dom";
import {
  setPageTitle,
  setMetaDescription,
  setOpenGraphTags,
  buildCanonicalUrl,
} from "@/utils";

// Import sections
import {
  FAQSection,
  AccreditationSection,
  RankingsSection,
  CareerSection,
  TopCompaniesSection,
  FacultySection,
  SkillsSection,
  JobTitlesSection,
  OverviewSection,
  CurriculumSection,
  WhyStevensSection,
  AdmissionsSection,
} from "../sections";

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
    commonJobTitles,
    topCompanies,
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

  return (
    <div className="bg-stevens-light-gray font-stevens-body">
      {/* Hero Section - price/tuition may be passed via hero.bottomContent */}
      <PageHero
        {...hero}
        useApplicationModal={useApplicationModal}
        useRequestInfoModal={useRequestInfoModal}
        requestInfoProgramCode={code}
        requestInfoSourcePage={`${code}_program_page`}
      />

      {/* Sticky Navigation */}
      <StickyNav
        navItems={navItems}
        activeSection={activeSection}
        moreMenuOpen={moreMenuOpen}
        setMoreMenuOpen={setMoreMenuOpen}
        moreMenuRef={moreMenuRef}
        admissions={admissions}
      />

      <main>
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

        {/* 4. Career & Skill Outcomes */}
        <CareerSection
          career={career}
          ref={registerSectionRef("career")}
        />

        {/* 5. Common Job Titles */}
        <JobTitlesSection
          commonJobTitles={commonJobTitles}
          career={career}
          programCode={code}
          ref={registerSectionRef("common-job-titles")}
        />

        {/* 6. Top Companies */}
        <TopCompaniesSection
          topCompanies={topCompanies}
          career={career}
          ref={registerSectionRef("top-companies")}
        />

        {/* 7. Curriculum / Course Sequence - AFTER Career for certificates */}
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
        <FacultySection
          faculty={faculty}
          ref={registerSectionRef("faculty")}
        />

        {/* 10. Admissions Section (combined with Tuition & Key Dates for certificates) */}
        <AdmissionsSection
          admissions={admissions}
          keyDates={keyDates}
          tuition={tuition}
          programCode={code}
          ref={registerSectionRef("admissions")}
        />

        {/* 11. FAQ Section */}
        <FAQSection
          faqs={faqs}
          ref={registerSectionRef("faqs")}
        />

        {/* 12. Accreditation Section */}
        <AccreditationSection
          accreditation={accreditation}
          ref={registerSectionRef("accreditation")}
        />
      </main>
    </div>
  );
}
