import { useState, useEffect, useRef, useMemo } from "react";

/**
 * Custom hook for managing program page section navigation.
 *
 * Handles:
 * - Section refs for scroll tracking
 * - Active section detection via IntersectionObserver
 * - "More" dropdown menu state
 * - Hash navigation (deep linking)
 * - Conditional nav items based on page type and available data
 *
 * @param {Object} params - Hook parameters
 * @param {Object} params.programData - Program data containing all sections
 * @param {boolean} params.isCertificate - Whether this is a certificate page
 * @param {string} params.locationHash - Current URL hash (from useLocation().hash)
 * @returns {Object} Navigation state and handlers
 */
export function useSectionNavigation({
  programData,
  isCertificate,
  locationHash,
}) {
  const {
    overview,
    videoSection,
    rankings,
    career,
    whatYoullLearn,
    commonJobTitles,
    topCompanies,
    whyStevens,
    curriculum,
    studentSpotlight,
    faculty,
    keyDates,
    admissions,
    tuition,
    events,
    faqs,
    accreditation,
  } = programData;

  // Refs for scroll tracking
  const sectionRefs = useRef({});
  const moreMenuRef = useRef(null);

  // State
  const [activeSection, setActiveSection] = useState("overview");
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);

  // Close "More" dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target)) {
        setMoreMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Build filtered navigation items based on page type and available data
  const navItems = useMemo(() => {
    // Section order differs between degree and certificate pages per design spec
    // DEGREE: overview → rankings → video → curriculum → career outcomes → faculty → admissions → tuition → events → faqs
    // CERTIFICATE: overview → skills → career outcomes → curriculum → faculty → admissions → tuition → dates → faqs
    const degreeItems = [
      { id: "overview", label: "Overview" },
      { id: "rankings", label: "Rankings" },
      { id: "video", label: "Video" },
      { id: "curriculum", label: "Curriculum" },
      { id: "career", label: "Career Outlook" },
      { id: "what-youll-learn", label: "What You'll Learn" },
      { id: "common-job-titles", label: "Common Job Titles" },
      { id: "top-companies", label: "Top Companies" },
      { id: "why-stevens", label: "Why Stevens" },
      { id: "student-spotlight", label: "Student Spotlight" },
      { id: "faculty", label: "Faculty" },
      { id: "admissions", label: "Admissions" },
      { id: "deadlines", label: "Deadlines" },
      { id: "tuition", label: "Tuition" },
      { id: "events", label: "Events" },
      { id: "faqs", label: "FAQs" },
      { id: "accreditation", label: "Accreditation" },
    ];

    const certificateItems = [
      { id: "overview", label: "Overview" },
      { id: "rankings", label: "Rankings" },
      { id: "what-youll-learn", label: "What You'll Learn" },
      { id: "career", label: "Career Outlook" },
      { id: "common-job-titles", label: "Common Job Titles" },
      { id: "top-companies", label: "Top Companies" },
      { id: "curriculum", label: "Curriculum" },
      { id: "why-stevens", label: "Why Stevens" },
      { id: "faculty", label: "Faculty" },
      { id: "admissions", label: "Admissions" },
      { id: "tuition", label: "Tuition" },
      { id: "deadlines", label: "Deadlines" },
      { id: "faqs", label: "FAQs" },
      { id: "accreditation", label: "Accreditation" },
    ];

    const items = isCertificate ? certificateItems : degreeItems;
    const filtered = items.filter((item) => {
      switch (item.id) {
        case "overview":
          return (
            overview &&
            (overview.description ||
              (overview.keySkills && overview.keySkills.length > 0) ||
              (overview.concentrations && overview.concentrations.length > 0))
          );
        case "video":
          return videoSection && videoSection.videoSrc;
        case "rankings":
          return rankings && rankings.length > 0;
        case "career":
          return (
            career &&
            (career.description || career.jobTitlesTable || career.topCompanies)
          );
        case "what-youll-learn":
          return (
            whatYoullLearn &&
            (whatYoullLearn.description ||
              (whatYoullLearn.modules && whatYoullLearn.modules.length > 0))
          );
        case "common-job-titles":
          return (
            commonJobTitles &&
            commonJobTitles.jobs &&
            commonJobTitles.jobs.length > 0
          );
        case "top-companies":
          return (
            topCompanies &&
            topCompanies.companies &&
            topCompanies.companies.length > 0
          );
        case "curriculum":
          return (
            curriculum &&
            (curriculum.description ||
              curriculum.courseTabs ||
              curriculum.completeCourseCatalog)
          );
        case "student-spotlight":
          return (
            studentSpotlight &&
            (studentSpotlight.quote || studentSpotlight.author)
          );
        case "faculty":
          return (
            faculty &&
            (faculty.description ||
              (faculty.members && faculty.members.length > 0))
          );
        case "deadlines":
          return (
            keyDates &&
            keyDates.headers &&
            keyDates.rows &&
            keyDates.rows.length > 0
          );
        case "admissions":
          return (
            admissions &&
            admissions.options &&
            admissions.options.length > 0 &&
            !(
              admissions.variant === "combinedWithTuition" ||
              admissions.variant === "certificateWithDeadlines"
            )
          );
        case "tuition":
          return (
            tuition &&
            (tuition.cards ||
              tuition.description ||
              (tuition.grants && tuition.grants.length > 0))
          );
        case "events":
          return events && events.items && events.items.length > 0;
        case "faqs":
          return faqs && faqs.length > 0;
        case "accreditation":
          return (
            accreditation &&
            (typeof accreditation === "string"
              ? accreditation.trim()
              : accreditation.description || accreditation.text)
          );
        case "why-stevens":
          return whyStevens && (whyStevens.description || whyStevens.video);
        default:
          return true;
      }
    });

    // For certificate pages, ensure tuition (relabeled as Admissions) appears before deadlines
    if (admissions?.variant === "certificateWithDeadlines") {
      const tuitionIndex = filtered.findIndex((item) => item.id === "tuition");
      const deadlinesIndex = filtered.findIndex(
        (item) => item.id === "deadlines"
      );
      if (
        tuitionIndex !== -1 &&
        deadlinesIndex !== -1 &&
        tuitionIndex > deadlinesIndex
      ) {
        const tuitionItem = filtered[tuitionIndex];
        filtered.splice(tuitionIndex, 1);
        filtered.splice(deadlinesIndex, 0, tuitionItem);
      }
    }

    return filtered;
  }, [
    isCertificate,
    overview,
    rankings,
    videoSection,
    career,
    whatYoullLearn,
    commonJobTitles,
    topCompanies,
    whyStevens,
    curriculum,
    studentSpotlight,
    faculty,
    keyDates,
    admissions,
    tuition,
    events,
    faqs,
    accreditation,
  ]);

  // Intersection Observer for active section tracking
  useEffect(() => {
    const currentRefs = sectionRefs.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -70% 0px" }
    );

    navItems.forEach((item) => {
      const el = currentRefs[item.id];
      if (el) observer.observe(el);

      // For certificate pages, also observe admissions section when tuition button exists
      if (
        item.id === "tuition" &&
        (admissions?.variant === "combinedWithTuition" ||
          admissions?.variant === "certificateWithDeadlines")
      ) {
        const admissionsEl = currentRefs.admissions;
        if (admissionsEl) observer.observe(admissionsEl);
      }
    });

    return () => {
      navItems.forEach((item) => {
        const el = currentRefs[item.id];
        if (el) observer.unobserve(el);

        // Unobserve admissions section for certificate pages
        if (
          item.id === "tuition" &&
          (admissions?.variant === "combinedWithTuition" ||
            admissions?.variant === "certificateWithDeadlines")
        ) {
          const admissionsEl = currentRefs.admissions;
          if (admissionsEl) observer.unobserve(admissionsEl);
        }
      });
    };
  }, [navItems, admissions]);

  // Handle hash navigation - scroll to section when page loads with hash
  useEffect(() => {
    if (!locationHash) return;

    // Remove the # from hash
    const hashId = locationHash.substring(1);

    // Wait for DOM to be ready and sections to be rendered
    const scrollToHash = () => {
      const element = sectionRefs.current[hashId];
      if (element) {
        // Use scrollIntoView with smooth behavior and offset for fixed header
        const yOffset = -100; // Offset for fixed header
        const y =
          element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
        return true; // Successfully scrolled
      }
      return false; // Element not found yet
    };

    // Try immediately
    if (scrollToHash()) return;

    // If element not found, try again after delays (sections may still be rendering)
    const timeout1 = setTimeout(() => {
      if (scrollToHash()) return;

      // Final attempt after longer delay
      setTimeout(scrollToHash, 200);
    }, 100);

    return () => clearTimeout(timeout1);
  }, [locationHash, navItems]);

  // Helper to register a section ref
  const registerSectionRef = (sectionId) => (el) => {
    sectionRefs.current[sectionId] = el;
  };

  return {
    // State
    activeSection,
    moreMenuOpen,
    setMoreMenuOpen,
    navItems,

    // Refs
    sectionRefs,
    moreMenuRef,

    // Helpers
    registerSectionRef,
  };
}
