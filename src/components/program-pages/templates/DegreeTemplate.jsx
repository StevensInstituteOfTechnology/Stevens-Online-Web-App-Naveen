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
  VideoSection,
  CareerSection,
  StudentSpotlightSection,
  EventsSection,
  TopCompaniesSection,
  FacultySection,
  SkillsSection,
  JobTitlesSection,
  OverviewSection,
  CurriculumSection,
  WhyStevensSection,
  TuitionSection,
  KeyDatesSection,
  AdmissionsSection,
} from "../sections";

// Import navigation
import { StickyNav, useSectionNavigation } from "../navigation";

/**
 * DegreeTemplate - Template for Master's Degree Program Pages
 *
 * Section Order (per design spec):
 * 1. Hero (PageHero)
 * 2. Sticky Navigation
 * 3. Overview
 * 4. Rankings (By the Numbers)
 * 5. Video
 * 6. Curriculum
 * 7. Career Outlook
 * 8. What You'll Learn (Skills)
 * 9. Common Job Titles
 * 10. Top Companies
 * 11. Why Stevens
 * 12. Student Spotlight
 * 13. Faculty
 * 14. Admissions
 * 15. Key Dates & Deadlines
 * 16. Tuition & Financial Aid
 * 17. Events
 * 18. FAQs
 * 19. Accreditation
 */
export function DegreeTemplate({
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
    videoSection,
    rankings,
    career,
    curriculum,
    whyStevens,
    studentSpotlight,
    faculty,
    admissions,
    keyDates,
    tuition,
    events,
    faqs,
    accreditation,
    whatYoullLearn,
    commonJobTitles,
    topCompanies,
  } = programData;

  const location = useLocation();

  // Use navigation hook - always false for degree pages
  const {
    activeSection,
    moreMenuOpen,
    setMoreMenuOpen,
    navItems,
    moreMenuRef,
    registerSectionRef,
  } = useSectionNavigation({
    programData,
    isCertificate: false,
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

  // Handle collapsible course toggles (for MBA-style curriculum)
  useEffect(() => {
    const handleCourseToggle = (e) => {
      const button = e.target.closest(".course-toggle");
      if (!button) return;

      const targetId = button.getAttribute("data-target");
      if (targetId) {
        const content = document.getElementById(targetId);
        const arrow = button.querySelector(".course-arrow");
        if (content && arrow) {
          const isHidden = content.classList.contains("hidden");
          if (isHidden) {
            content.classList.remove("hidden");
            arrow.textContent = "▲";
          } else {
            content.classList.add("hidden");
            arrow.textContent = "▼";
          }
        }
      }
    };

    document.addEventListener("click", handleCourseToggle);
    return () => document.removeEventListener("click", handleCourseToggle);
  }, []);

  if (!programData) return <div>Loading program data...</div>;

  // Check if admissions is combined with tuition/dates
  const isCombinedAdmissions = admissions?.variant === "combinedWithTuition";

  return (
    <div className="bg-stevens-light-gray font-stevens-body">
      {/* Hero Section */}
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
        {/* 1. Overview Section */}
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

        {/* 3. Video Section */}
        <VideoSection
          videoSection={videoSection}
          ref={registerSectionRef("video")}
        />

        {/* 4. Curriculum Section */}
        <CurriculumSection
          curriculum={curriculum}
          programCode={code}
          ref={registerSectionRef("curriculum")}
        />

        {/* 5. Career Outlook Section */}
        <CareerSection career={career} ref={registerSectionRef("career")} />

        {/* 6. What You'll Learn (Skills) Section */}
        <SkillsSection
          whatYoullLearn={whatYoullLearn}
          ref={registerSectionRef("what-youll-learn")}
        />

        {/* 7. Common Job Titles Section */}
        <JobTitlesSection
          commonJobTitles={commonJobTitles}
          career={career}
          programCode={code}
          ref={registerSectionRef("common-job-titles")}
        />

        {/* 8. Top Companies Section */}
        <TopCompaniesSection
          topCompanies={topCompanies}
          career={career}
          ref={registerSectionRef("top-companies")}
        />

        {/* 9. Why Stevens Section */}
        <WhyStevensSection
          whyStevens={whyStevens}
          ref={registerSectionRef("why-stevens")}
        />

        {/* 10. Student Spotlight Section */}
        <StudentSpotlightSection
          studentSpotlight={studentSpotlight}
          ref={registerSectionRef("student-spotlight")}
        />

        {/* 11. Faculty Section */}
        <FacultySection faculty={faculty} ref={registerSectionRef("faculty")} />

        {/* 12. Admissions Section (may include tuition/dates if combined) */}
        <AdmissionsSection
          admissions={admissions}
          keyDates={keyDates}
          tuition={tuition}
          programCode={code}
          ref={registerSectionRef("admissions")}
        />

        {/* 13. Key Dates Section (standalone if not combined) */}
        {!isCombinedAdmissions && keyDates && (
          <KeyDatesSection
            keyDates={keyDates}
            ref={registerSectionRef("deadlines")}
          />
        )}

        {/* 14. Tuition Section (standalone if not combined) */}
        {!isCombinedAdmissions && tuition && (
          <TuitionSection
            tuition={tuition}
            ref={registerSectionRef("tuition")}
          />
        )}

        {/* 15. Events Section */}
        <EventsSection events={events} ref={registerSectionRef("events")} />

        {/* 16. FAQ Section */}
        <FAQSection faqs={faqs} ref={registerSectionRef("faqs")} />

        {/* 17. Accreditation Section */}
        <AccreditationSection
          accreditation={accreditation}
          ref={registerSectionRef("accreditation")}
        />
      </main>
    </div>
  );
}
