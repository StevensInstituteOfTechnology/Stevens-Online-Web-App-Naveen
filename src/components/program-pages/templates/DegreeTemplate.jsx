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
  StudentTestimonialSection,
  EventsSection,
  FacultySection,
  SkillsSection,
  CareerOutcomesSection,
  OverviewSection,
  CurriculumSection,
  WhyStevensSection,
  TuitionSection,
  AdmissionsSection,
  QuickStatsBar,
} from "../sections";
import { DeadlinesSection } from "../../shared/sections/DeadlinesSection";
import { VideoSection } from "../../shared/sections/VideoSection";

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
 * 6. What You'll Learn (Skills)
 * 7. Curriculum
 * 8. Career Outlook
 * 9. Common Job Titles
 * 10. Top Companies
 * 11. Why Stevens
 * 12. Student Spotlight
 * 13. Faculty
 * 14. Admissions
 * 15. Tuition & Financial Aid
 * 16. Key Dates & Deadlines
 * 17. Events
 * 18. FAQs
 * 19. Accreditation
 */
export function DegreeTemplate({
  programData,
  theme = "dark",
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
    careerOutcomes,
    topCompanies,
    deadlines,
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

  // Note: Collapsible course toggles are handled by CurriculumSection component

  if (!programData) return <div>Loading program data...</div>;

  // Check if admissions is combined with tuition/dates
  const isCombinedAdmissions = admissions?.variant === "combinedWithTuition";

  // Opposite theme for sticky nav
  const navTheme = theme === "dark" ? "light" : "dark";

  return (
    <div className="bg-stevens-light-gray font-stevens-body">
      {/* Hero Section with Embedded Form */}
      <HeroSection
        programCode={code}
        sourcePage={`${code}_program_page`}
        title={hero?.titleLines}
        subtitle={hero?.subtitle}
        tuitionCards={hero?.tuitionCards}
        bgImage={hero?.bgImage}
        bgImagePosition={hero?.bgImagePosition}
        formTitle="Request Information"
        formSubtitle="Take the next step in your career."
        variant="degree"
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
        {videoSection && (
          <VideoSection
            title={videoSection.title}
            heading={videoSection.heading || videoSection.description || videoSection.title}
            description={videoSection.description || ""}
            videoSrc={videoSection.videoSrc}
            videoPoster={videoSection.posterSrc}
            videoTitle={videoSection.title}
            showControls={videoSection.showControls}
            muted={videoSection.muted}
            showCTA={videoSection.showCTA !== false}
            ref={registerSectionRef("video")}
          />
        )}

        {/* 4. What You'll Learn (Skills) Section */}
        <SkillsSection
          whatYoullLearn={whatYoullLearn}
          ref={registerSectionRef("what-youll-learn")}
        />

        {/* 5. Curriculum Section */}
        <CurriculumSection
          curriculum={curriculum}
          programCode={code}
          ref={registerSectionRef("curriculum")}
        />

        {/* 6. Career Outcomes (intro + job titles OR logos) */}
        <CareerOutcomesSection
          careerOutcomes={careerOutcomes}
          career={career}
          programCode={code}
          isCertificate={false}
          variant={careerOutcomes?.variant || "table"}
          topCompanies={topCompanies}
          ref={registerSectionRef("career-outcomes")}
        />

        {/* 9. Why Stevens Section */}
        <WhyStevensSection
          whyStevens={whyStevens}
          ref={registerSectionRef("why-stevens")}
        />

        {/* 10. Student Testimonial Section */}
        <StudentTestimonialSection
          studentTestimonial={studentSpotlight}
          ref={registerSectionRef("student-testimonial")}
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

        {/* 13. Tuition Section (standalone if not combined) */}
        {!isCombinedAdmissions && tuition && (
          <TuitionSection
            tuition={tuition}
            ref={registerSectionRef("tuition")}
          />
        )}

        {/* 14. Deadlines Timeline Section */}
        {deadlines && (
          <DeadlinesSection
            keyDates={deadlines}
            ref={registerSectionRef("deadlines")}
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
