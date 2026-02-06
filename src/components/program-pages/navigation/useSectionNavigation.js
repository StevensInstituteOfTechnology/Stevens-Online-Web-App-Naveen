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
    careerOutcomes,
    whyStevens,
    curriculum,
    studentSpotlight,
    faculty,
    keyDates,
    deadlines,
    admissions,
    tuition,
    tuitionCalculator,
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
    // DEGREE: overview → rankings → video → what-youll-learn → curriculum → career outcomes → why-stevens → student-testimonial → faculty → admissions → tuition → deadlines → events → faqs → accreditation
    // CERTIFICATE: overview → career-outcomes → video → why-stevens → rankings → what-youll-learn → curriculum → faculty → admissions → tuition → deadlines → faqs → accreditation
    const degreeItems = [
      { id: "overview", label: "Overview" },
      { id: "rankings", label: "Rankings" },
      { id: "video", label: "Video" },
      { id: "what-youll-learn", label: "What You'll Learn" },
      { id: "curriculum", label: "Curriculum" },
      { id: "career-outcomes", label: "Career Outcomes" },
      { id: "why-stevens", label: "Why Stevens" },
      { id: "student-testimonial", label: "Student Testimonial" },
      { id: "faculty", label: "Faculty" },
      { id: "admissions", label: "Admissions" },
      { id: "tuition", label: "Tuition" },
      { id: "tuition-calculator", label: "Tuition Calculator" },
      { id: "deadlines", label: "Deadlines" },
      { id: "events", label: "Events" },
      { id: "faqs", label: "FAQs" },
      { id: "accreditation", label: "Accreditation" },
    ];

    const certificateItems = [
      { id: "overview", label: "Overview" },
      { id: "career-outcomes", label: "Career Outcomes" },
      { id: "video", label: "Video" },
      { id: "why-stevens", label: "Why Stevens" },
      { id: "rankings", label: "Rankings" },
      { id: "what-youll-learn", label: "What You'll Learn" },
      { id: "curriculum", label: "Curriculum" },
      { id: "faculty", label: "Faculty" },
      { id: "admissions", label: "Admissions" },
      { id: "tuition", label: "Tuition" },
      { id: "tuition-calculator", label: "Tuition Calculator" },
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
        case "what-youll-learn":
          return (
            whatYoullLearn &&
            (whatYoullLearn.description ||
              (whatYoullLearn.modules && whatYoullLearn.modules.length > 0))
          );
        case "career-outcomes":
          return (
            careerOutcomes &&
            ((career && career.description) ||
              (career && career.jobTitles && career.jobTitles.length > 0))
          );
        case "curriculum":
          return (
            curriculum &&
            (curriculum.description ||
              curriculum.courseTabs ||
              curriculum.tabs ||
              curriculum.completeCourseCatalog)
          );
        case "student-testimonial":
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
          return deadlines && deadlines.dates && deadlines.dates.length > 0;
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
        case "tuition-calculator":
          return tuitionCalculator && tuitionCalculator.image;
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
    careerOutcomes,
    whyStevens,
    curriculum,
    studentSpotlight,
    faculty,
    deadlines,
    admissions,
    tuition,
    tuitionCalculator,
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
