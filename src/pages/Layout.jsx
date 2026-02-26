import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl, buildCanonicalUrl } from "@/utils";
import { CONTACT_INFO, BOOKING_URLS } from "@/config/constants";
import { trackConversion, CONVERSION_LABELS } from "@/utils/gtmTracking";
import {
  Menu,
  Phone,
  Mail,
  MapPin,
  FileText,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  ArrowUp,
  Search,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ChatbotButton from "@/components/chat/ChatbotButton";

const graduateProgramItems = [
  { name: "Online MBA", page: "online-mba/" },
  {
    name: "M.S. in Computer Science",
    page: "online-masters-computer-science-mscs/",
  },
  {
    name: "M.Eng. in Applied Data Science",
    page: "online-masters-engineering-applied-data-science/",
  },
  {
    name: "M.Eng. in Engineering Management",
    page: "online-masters-engineering-management/",
  },
];

const certificateProgramItems = [
  { name: "Enterprise AI Certificate", page: "certificates/enterprise-ai/" },
  {
    name: "Applied Data Science Foundations",
    page: "certificates/applied-data-science-foundations/",
  },
];

const admissionsAidItems = [
  { name: "Admissions", page: "admissions/" },
  { name: "Tuition & Financial Aid", page: "tuition-and-financial-aid/" },
];

const workforceDevelopmentItems = [
  { name: "Corporate Partners", page: "corporate-partners/" },
  { name: "Corporate Students", page: "corporate-students/" },
  { name: "Alumni Workforce Development", page: "alumni-pgc/" },
  { name: "Workforce Hub", page: "workforce-hub/" },
];

const whyStevensItems = [
  { name: "Learning Experience", page: "online-learning-experience/" },
  { name: "Student Outcomes", page: "student-outcomes/" },
  { name: "Events", page: "events/" },
];

const programsItems = [
  { name: "All Programs", page: "explore-programs/" },
  { name: "Compare Programs", page: "explore-programs/#compare-programs" },
  {
    name: "Degrees",
    hasSubItems: true,
    categoryLink: "/explore-programs/?filter=masters#explore-programs",
    subItems: graduateProgramItems,
  },
  {
    name: "Professional Graduate Certificates",
    hasSubItems: true,
    categoryLink: "/explore-programs/?filter=certificates#explore-programs",
    subItems: certificateProgramItems,
  },
];

const megaMenuLinks = [
  {
    name: "Programs",
    isDropdown: true,
    items: programsItems,
  },
  {
    name: "Admissions & Aid",
    isDropdown: true,
    items: admissionsAidItems,
  },
  {
    name: "Workforce Development Hub",
    isDropdown: true,
    items: workforceDevelopmentItems,
    categoryLink: "/workforce-development/",
  },
  {
    name: "Why Stevens",
    isDropdown: true,
    items: whyStevensItems,
  },
  { name: "Insights", page: "blog/" },
];

/** Program and certificate pages use StickyNav (section nav); header scrolls away so only StickyNav sticks */
const PAGES_WITH_STICKY_SECTION_NAV = [
  "/online-mba",
  "/online-masters-computer-science-mscs",
  "/online-masters-engineering-management",
  "/online-masters-engineering-applied-data-science",
  "/certificates/enterprise-ai",
  "/certificates/applied-data-science-foundations",
];

function isPageWithStickySectionNav(pathname) {
  const path = (pathname || "").toLowerCase().replace(/\/$/, "") || "/";
  return PAGES_WITH_STICKY_SECTION_NAV.some(
    (p) => path === p || path.startsWith(p + "/")
  );
}

export default function Layout({ children, currentPageName: _currentPageName }) {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const initialWidth = typeof window !== "undefined" ? window.innerWidth : 0;
  const [isMobile, setIsMobile] = useState(initialWidth < 768);
  const [isTabletOrMobile, setIsTabletOrMobile] = useState(initialWidth <= 1024);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuHoveredItem, setMegaMenuHoveredItem] = useState(null);
  const [expandedSubCategory, setExpandedSubCategory] = useState(null);
  const [expandedMobileMenus, setExpandedMobileMenus] = useState([]); // For mobile accordion

  const megaMenuHoverTimerRef = useRef(null);
  const MEGA_MENU_HOVER_DELAY = 150;

  const scheduleMegaMenuHover = (target) => {
    if (megaMenuHoverTimerRef.current) {
      clearTimeout(megaMenuHoverTimerRef.current);
      megaMenuHoverTimerRef.current = null;
    }
    // Instant switch when opening from nothing or when re-hovering current item
    if (megaMenuHoveredItem === null || megaMenuHoveredItem === target) {
      setMegaMenuHoveredItem(target);
      return;
    }
    // Delay when switching between items (prevents accidental switch when moving to submenu)
    megaMenuHoverTimerRef.current = setTimeout(() => {
      setMegaMenuHoveredItem(target);
      megaMenuHoverTimerRef.current = null;
    }, MEGA_MENU_HOVER_DELAY);
  };

  const cancelMegaMenuHover = () => {
    if (megaMenuHoverTimerRef.current) {
      clearTimeout(megaMenuHoverTimerRef.current);
      megaMenuHoverTimerRef.current = null;
    }
  };

  // Toggle accordion item on mobile
  const toggleMobileAccordion = (menuName) => {
    setExpandedMobileMenus((prev) =>
      prev.includes(menuName)
        ? prev.filter((name) => name !== menuName)
        : [...prev, menuName]
    );
  };

  // Clear hover timer when mega menu closes
  useEffect(() => {
    if (!mobileMenuOpen) {
      cancelMegaMenuHover();
    }
  }, [mobileMenuOpen]);

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;

    // Lightweight debounce using a single timer; avoids rapid state flips and extra renders
    let resizeTimer = null;
    let scrollTimer = null;

    const handleResizeNow = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTabletOrMobile(width <= 1024);
    };

    const handleResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(handleResizeNow, 120);
    };

    const handleScrollNow = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 200);
      setShowBackToTop(scrollY > 300);
    };

    const handleScroll = () => {
      if (scrollTimer) clearTimeout(scrollTimer);
      scrollTimer = setTimeout(handleScrollNow, 50);
    };

    // Add global protection against external script interference
    const addGlobalProtection = () => {
      const style = document.createElement("style");
      style.id = "navigation-protection";
      style.textContent = `
        /* Global protection for navigation elements */
        header[class*="z-[9998]"] {
          z-index: 9998 !important;
          pointer-events: auto !important;
        }
        
        header[class*="z-[9998]"] * {
          pointer-events: auto !important;
        }
        
        /* Ensure buttons, links, and form elements remain clickable */
        button, a, [role="button"], input, select, textarea, label, [role="dialog"], [role="dialog"] * {
          pointer-events: auto !important;
        }
        
        /* Dropdown menu protection - ensure they appear above all navigation elements */
        [data-radix-popper-content-wrapper],
        [data-radix-dropdown-menu-content],
        [role="menu"],
        .dropdown-content {
          z-index: 10001 !important;
          pointer-events: auto !important;
        }
        
        /* Search suggestions protection */
        [data-search-suggestions="true"] {
          z-index: 10001 !important;
          position: absolute !important;
          pointer-events: auto !important;
        }
        
        [data-radix-popper-content-wrapper] *,
        [data-radix-dropdown-menu-content] *,
        [role="menu"] *,
        .dropdown-content *,
        [data-search-suggestions="true"] * {
          pointer-events: auto !important;
        }
      `;

      // Remove existing protection if it exists
      const existing = document.getElementById("navigation-protection");
      if (existing) {
        existing.remove();
      }

      document.head.appendChild(style);
    };

    // Perform one synchronous measurement to avoid initial flicker
    handleResizeNow();
    handleScrollNow();
    addGlobalProtection();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      if (resizeTimer) clearTimeout(resizeTimer);
      if (scrollTimer) clearTimeout(scrollTimer);
      // Clean up protection styles
      const protection = document.getElementById("navigation-protection");
      if (protection) {
        protection.remove();
      }
    };
  }, []);

  // Close mobile menu and reset accordion when page changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setExpandedMobileMenus([]);
    setExpandedSubCategory(null);
  }, [location.pathname]);

  // Update canonical tag on route change
  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined" || typeof document === "undefined")
      return;

    const canonicalHref = buildCanonicalUrl(location.pathname);
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", canonicalHref);
  }, [location.pathname]);


  // Check if we're on the home page by pathname (more reliable than currentPageName)
  const isHomePage =
    location.pathname === "/" ||
    location.pathname === "/home" ||
    location.pathname === "/home/";

  // Program/cert pages: header scrolls away on desktop (>1024px) so only StickyNav sticks; on tablet/mobile (≤1024px) header stays sticky
  const hasStickySectionNav = isPageWithStickySectionNav(location.pathname);
  const headerScrollsAway =
    hasStickySectionNav && !isTabletOrMobile; // Only on desktop

  // Navbar should be transparent without logo only on home page when not scrolled AND mega menu is closed
  const showTransparentNav = isHomePage && !isScrolled && !mobileMenuOpen;

  return (
    <div className="flex flex-col min-h-screen font-sans text-stevens-dark-gray">
      {/* Main Navigation Bar
          - Home page: fixed (for transparent overlay effect on hero)
          - Program/cert pages, desktop (>1024px): relative (scrolls away; only StickyNav sticks)
          - Program/cert pages, tablet/mobile (≤1024px): sticky (more vertical space)
          - Other pages: sticky (content flows below naturally, no overlap)
      */}
      <header
        className={`group z-[9998] ${
          isHomePage
            ? "fixed top-0 left-0 right-0" // Fixed for home page
            : headerScrollsAway
              ? "relative" // Scrolls away on desktop (only StickyNav sticks)
              : "sticky top-0" // Sticky for other pages and tablet/mobile
        } ${
          showTransparentNav
            ? "bg-transparent"
            : "bg-stevens-black shadow-stevens-lg"
        }`}
      >
        <div className="w-full px-stevens-md lg:px-stevens-lg">
          <div className="flex items-center justify-between stevens-md:h-[87px] h-[65px] w-full">
            {/* Logo - Left (hidden on home page when not scrolled) */}
            <div
              className={`flex-shrink-0 overflow-visible ${
                showTransparentNav
                  ? "opacity-0 -translate-x-4 pointer-events-none"
                  : "opacity-100 translate-x-0"
              }`}
            >
              <Link
                to={createPageUrl("Home")}
                className="flex items-center gap-2 stevens-md:gap-3 transition-opacity duration-stevens-normal hover:opacity-80"
              >
                <div className="relative overflow-visible flex items-center rounded px-1 bg-stevens-black">
                  {/* Main Logo - 60% larger, dark background ensures WCAG contrast */}
                  <img
                    src="/assets/logos/Stevens-CPE-logo-RGB_Linear-WHT.svg"
                    alt="Stevens Institute of Technology Professional Education Logo"
                    className="h-[65px] stevens-md:h-[87px] w-auto drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
                  />
                </div>
              </Link>
            </div>

            {/* Right side navigation items */}
            <div className="flex items-center ml-auto gap-6">
              {/* STEVENS.EDU Link */}
              <a
                href="https://www.stevens.edu"
                target="_blank"
                rel="noopener noreferrer"
                className={`hidden sm:flex items-center transition-colors duration-200 text-sm font-medium tracking-wide ${
                  showTransparentNav
                    ? "text-stevens-black hover:text-stevens-black/70"
                    : "text-stevens-white hover:text-stevens-white/80"
                }`}
              >
                <span className="inline-flex items-center border-b-2 border-stevens-red pb-0.5 tracking-widest">
                  STEVENS.EDU
                  <ArrowUpRight className="h-4 w-4 ml-1" />
                </span>
              </a>

              {/* Search Button - links to Stevens search */}
              <a
                href="https://search.stevens.edu/s/search.html?collection=21772~sp-search"
                target="_blank"
                rel="noopener noreferrer"
                className={`h-10 w-10 inline-flex items-center justify-center rounded-md transition-colors ${
                  showTransparentNav
                    ? "text-stevens-black hover:text-stevens-black/70 hover:bg-stevens-black/10"
                    : "text-stevens-white hover:text-stevens-white/80 hover:bg-stevens-white/10"
                }`}
              >
                <Search className="h-6 w-6" />
                <span className="sr-only">Search</span>
              </a>

              {/* Hamburger Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className={`h-12 w-12 ${
                  showTransparentNav
                    ? "text-stevens-black hover:text-stevens-black/70 hover:bg-stevens-black/10"
                    : "text-stevens-white hover:text-stevens-white/80 hover:bg-stevens-white/10"
                }`}
                onClick={() => {
                  const newMenuState = !mobileMenuOpen;
                  setMobileMenuOpen(newMenuState);
                  setMegaMenuHoveredItem(newMenuState ? "Programs" : null);
                }}
              >
                <Menu className="h-10 w-10" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Mega Menu Overlay - click outside to close */}
        {mobileMenuOpen && (
          <>
            {/* Transparent backdrop - click to close */}
            <div
              className="fixed inset-0 top-[87px] z-[9990]"
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Mega Menu Content */}
            <div className="absolute left-0 right-0 top-full bg-stevens-dark-gray z-[9991] shadow-2xl max-h-[calc(100vh-87px)] overflow-y-auto">
              <div className="max-w-[1300px] mx-auto px-stevens-md md:px-stevens-xl py-stevens-xl md:py-stevens-2xl">
                {/* Mobile: Single column accordion | Desktop: 3-column grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-stevens-lg md:gap-stevens-2xl">
                  {/* Left Column - Main Navigation Links (Accordion on Mobile) */}
                  <div className="space-y-stevens-sm md:space-y-stevens-lg">
                    {megaMenuLinks.map((link) => {
                      if (link.isDropdown) {
                        const isExpanded = expandedMobileMenus.includes(
                          link.name
                        );
                        const linkClass = `text-stevens-xl md:text-stevens-2xl font-stevens-display transition-colors duration-200 py-stevens-sm md:py-0 ${
                          megaMenuHoveredItem === link.name || isExpanded
                            ? "text-stevens-red"
                            : "text-stevens-light-gray hover:text-stevens-white"
                        }`;
                        return (
                          <div
                            key={link.name}
                            className="group"
                            onMouseEnter={() =>
                              !isMobile && scheduleMegaMenuHover(link.name)
                            }
                            onMouseLeave={() => !isMobile && cancelMegaMenuHover()}
                          >
                            {/* Menu Item Header - Link for categoryLink items, button otherwise */}
                            <div className="flex items-center justify-between">
                              {link.categoryLink ? (
                                <>
                                  {/* Mobile: row is clickable to toggle accordion */}
                                  {/* Desktop: row uses hover via parent onMouseEnter */}
                                  <div
                                    className="md:hidden w-full flex items-center justify-between cursor-pointer"
                                    onClick={() => toggleMobileAccordion(link.name)}
                                    onKeyDown={(e) => {
                                      if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        toggleMobileAccordion(link.name);
                                      }
                                    }}
                                    role="button"
                                    tabIndex={0}
                                    aria-expanded={isExpanded}
                                  >
                                    {/* Text is a link - stops propagation so it navigates instead of toggling */}
                                    <Link
                                      to={link.categoryLink}
                                      className={`flex items-center gap-2 ${linkClass}`}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setMobileMenuOpen(false);
                                      }}
                                    >
                                      {link.name}
                                    </Link>
                                    {/* Chevron icon */}
                                    <svg
                                      className={`w-5 h-5 transition-transform duration-200 ${
                                        isExpanded ? "rotate-180 text-stevens-red" : "text-stevens-light-gray"
                                      }`}
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                      />
                                    </svg>
                                  </div>
                                  {/* Desktop: Link with hover arrow */}
                                  <Link
                                    to={link.categoryLink}
                                    className={`hidden md:flex items-center gap-2 ${linkClass}`}
                                    onClick={() => setMobileMenuOpen(false)}
                                  >
                                    {link.name}
                                    <svg
                                      className={`w-4 h-4 transition-transform duration-200 ${
                                        megaMenuHoveredItem === link.name
                                          ? "translate-x-1"
                                          : ""
                                      }`}
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                      />
                                    </svg>
                                  </Link>
                                </>
                              ) : (
                                <button
                                  className={`w-full flex items-center justify-between ${linkClass} cursor-pointer`}
                                  onClick={() => toggleMobileAccordion(link.name)}
                                >
                                  <span className="flex items-center gap-2">
                                    {link.name}
                                    <svg
                                      className={`hidden md:block w-4 h-4 transition-transform duration-200 ${
                                        megaMenuHoveredItem === link.name
                                          ? "translate-x-1"
                                          : ""
                                      }`}
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                      />
                                    </svg>
                                  </span>
                                  <svg
                                    className={`w-5 h-5 md:hidden transition-transform duration-200 ${
                                      isExpanded ? "rotate-180" : ""
                                    }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M19 9l-7 7-7-7"
                                    />
                                  </svg>
                                </button>
                              )}
                            </div>

                            {/* Accordion Content - Mobile Only */}
                            {isExpanded && (
                              <div className="md:hidden mt-stevens-sm ml-stevens-md space-y-stevens-sm border-l-2 border-stevens-gray pl-stevens-md">
                                {link.items?.map((item) =>
                                  item.hasSubItems ? (
                                    <div key={item.name}>
                                      <button
                                        className="w-full flex items-center justify-between text-stevens-lg text-stevens-light-gray hover:text-stevens-white transition-colors duration-200 py-stevens-xs"
                                        onClick={() =>
                                          setExpandedSubCategory(
                                            expandedSubCategory === item.name
                                              ? null
                                              : item.name
                                          )
                                        }
                                      >
                                        <span>{item.name}</span>
                                        <svg
                                          className={`w-4 h-4 transition-transform duration-200 ${
                                            expandedSubCategory === item.name
                                              ? "rotate-180 text-stevens-red"
                                              : ""
                                          }`}
                                          fill="none"
                                          stroke="currentColor"
                                          viewBox="0 0 24 24"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                          />
                                        </svg>
                                      </button>
                                      {expandedSubCategory === item.name && (
                                        <div className="ml-4 mt-1 space-y-1 border-l-2 border-stevens-red/30 pl-3">
                                          {item.subItems.map((sub) => (
                                            <Link
                                              key={sub.name}
                                              to={createPageUrl(sub.page)}
                                              className="block text-stevens-base text-stevens-light-gray hover:text-stevens-white transition-colors duration-200 py-1"
                                              onClick={() =>
                                                setMobileMenuOpen(false)
                                              }
                                            >
                                              {sub.name}
                                            </Link>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  ) : item.external ? (
                                    <a
                                      key={item.name}
                                      href={item.page}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="block text-stevens-lg text-stevens-light-gray hover:text-stevens-white transition-colors duration-200 py-stevens-xs"
                                      onClick={() => setMobileMenuOpen(false)}
                                    >
                                      {item.name}
                                    </a>
                                  ) : (
                                    <Link
                                      key={item.name}
                                      to={createPageUrl(item.page)}
                                      className="block text-stevens-lg text-stevens-light-gray hover:text-stevens-white transition-colors duration-200 py-stevens-xs"
                                      onClick={() => setMobileMenuOpen(false)}
                                    >
                                      {item.name}
                                    </Link>
                                  )
                                )}
                              </div>
                            )}
                          </div>
                        );
                      }
                      // Regular link (not dropdown)
                      return link.external ? (
                        <a
                          key={link.name}
                          href={link.page}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-stevens-xl md:text-stevens-2xl font-stevens-display text-stevens-light-gray hover:text-stevens-white transition-colors duration-200 py-stevens-sm md:py-0"
                          onClick={() => setMobileMenuOpen(false)}
                          onMouseEnter={() =>
                            !isMobile && scheduleMegaMenuHover(null)
                          }
                          onMouseLeave={() => !isMobile && cancelMegaMenuHover()}
                        >
                          {link.name}
                        </a>
                      ) : (
                        <Link
                          key={link.name}
                          to={createPageUrl(link.page)}
                          className="block text-stevens-xl md:text-stevens-2xl font-stevens-display text-stevens-light-gray hover:text-stevens-white transition-colors duration-200 py-stevens-sm md:py-0"
                          onClick={() => setMobileMenuOpen(false)}
                          onMouseEnter={() =>
                            !isMobile && scheduleMegaMenuHover(null)
                          }
                          onMouseLeave={() => !isMobile && cancelMegaMenuHover()}
                        >
                          {link.name}
                        </Link>
                      );
                    })}
                  </div>

                  {/* Middle Column - Sub-links for hovered item (Desktop Only) */}
                  <div
                    className="hidden md:block space-y-stevens-md min-h-[200px]"
                    onMouseEnter={cancelMegaMenuHover}
                  >
                    {megaMenuHoveredItem &&
                      megaMenuLinks
                        .find((link) => link.name === megaMenuHoveredItem)
                        ?.items?.map((item) =>
                          item.hasSubItems ? (
                            <div key={item.name}>
                              <div
                                className="flex items-center justify-between cursor-pointer group"
                                onMouseEnter={() =>
                                  setExpandedSubCategory(item.name)
                                }
                              >
                                <Link
                                  to={item.categoryLink}
                                  className={`text-stevens-xl font-stevens-display transition-colors duration-200 ${
                                    expandedSubCategory === item.name
                                      ? "text-stevens-red"
                                      : "text-stevens-light-gray hover:text-stevens-white"
                                  }`}
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  {item.name}
                                </Link>
                                <svg
                                  className={`w-4 h-4 transition-transform duration-200 ${
                                    expandedSubCategory === item.name
                                      ? "rotate-90 text-stevens-red"
                                      : "text-stevens-light-gray"
                                  }`}
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                  />
                                </svg>
                              </div>
                              {expandedSubCategory === item.name && (
                                <div className="ml-4 mt-2 space-y-2 border-l-2 border-stevens-red/30 pl-4">
                                  {item.subItems.map((sub) => (
                                    <Link
                                      key={sub.name}
                                      to={createPageUrl(sub.page)}
                                      className="block text-stevens-base font-stevens-display text-stevens-light-gray hover:text-stevens-white transition-colors duration-200"
                                      onClick={() => setMobileMenuOpen(false)}
                                    >
                                      {sub.name}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          ) : item.external ? (
                            <a
                              key={item.name}
                              href={item.page}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block text-stevens-xl font-stevens-display text-stevens-light-gray hover:text-stevens-white transition-colors duration-200"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {item.name}
                            </a>
                          ) : (
                            <Link
                              key={item.name}
                              to={createPageUrl(item.page)}
                              className="block text-stevens-xl font-stevens-display text-stevens-light-gray hover:text-stevens-white transition-colors duration-200"
                              onClick={() => setMobileMenuOpen(false)}
                              onMouseEnter={() =>
                                setExpandedSubCategory(null)
                              }
                            >
                              {item.name}
                            </Link>
                          )
                        )}
                  </div>

                  {/* Right Column - CPE Information (Hidden on small mobile, visible on tablet+) */}
                  <div
                    className="hidden sm:block space-y-stevens-lg pt-stevens-lg md:pt-0 border-t border-stevens-gray md:border-t-0"
                    onMouseEnter={() => !isMobile && cancelMegaMenuHover()}
                  >
                    <div>
                      <h3 className="text-stevens-lg md:text-stevens-xl font-stevens-display text-stevens-white mb-stevens-md">
                        College of Professional Education
                      </h3>
                      <p className="text-stevens-sm md:text-stevens-base text-stevens-light-gray leading-relaxed">
                        A bold new education designed for a fast-changing
                        future. Flexible, market-driven programs that equip
                        professionals with the skills today's economy demands.
                      </p>
                    </div>
                    <Link
                      to="/request-information/"
                      className="inline-flex items-center text-stevens-red hover:text-stevens-white transition-colors duration-200 font-semibold"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Request Information
                      <svg
                        className="w-4 h-4 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </header>

      <main className="flex-grow">{children}</main>

      <footer className="bg-stevens-black text-stevens-white">
        <div className="max-w-stevens-content-max mx-auto px-stevens-md lg:px-stevens-lg py-stevens-section">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-stevens-gap-lg">
            <div className="lg:col-span-1 flex flex-col items-center text-center  md:items-start md:text-left">
              <Link
                to={createPageUrl("Home")}
                className="mb-6 transition-opacity duration-300 hover:opacity-80"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
              >
                <img
                  src="/assets/logos/Stevens-CPE-logo-RGB_Abbreviated-WHT.svg"
                  alt="Stevens Institute of Technology Logo"
                  className="h-48 w-auto"
                />
              </Link>
            </div>
            <div className="flex flex-col text-center items-center md:items-start  md:text-left">
              <h3 className="font-stevens-headers text-lg font-semibold mb-4 text-white">
                Online Programs
              </h3>
              <div className="space-y-2">
                <Link
                  to="/explore-programs/?filter=masters#explore-programs"
                  className="block text-stevens-light-gray hover:text-white hover:underline hover:font-bold transition-all duration-300"
                  onClick={(e) => {
                    const isSame =
                      location.pathname.includes("explore-programs") &&
                      location.search === "?filter=masters" &&
                      location.hash === "#explore-programs";
                    if (isSame) {
                      e.preventDefault();
                      document
                        .getElementById("explore-programs")
                        ?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  }}
                >
                  Master&apos;s Degrees
                </Link>
                <Link
                  to="/explore-programs/?filter=certificates#explore-programs"
                  className="block text-stevens-light-gray hover:text-white hover:underline hover:font-bold transition-all duration-300"
                  onClick={(e) => {
                    const isSame =
                      location.pathname.includes("explore-programs") &&
                      location.search === "?filter=certificates" &&
                      location.hash === "#explore-programs";
                    if (isSame) {
                      e.preventDefault();
                      document
                        .getElementById("explore-programs")
                        ?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  }}
                >
                  Graduate Certificates
                </Link>
              
              </div>
            </div>
            <div className="flex flex-col text-center items-center md:items-start  md:text-left">
              <h3 className="font-stevens-headers text-lg font-semibold mb-4 text-white">
                Quick Links
              </h3>
              <div className="space-y-2">
                <Link
                  to={createPageUrl("admissions/")}
                  className="block text-stevens-light-gray hover:text-white hover:underline hover:font-bold transition-all duration-300"
                >
                  Admissions
                </Link>
                <Link
                  to={createPageUrl("tuition-and-financial-aid/")}
                  className="block text-stevens-light-gray hover:text-white hover:underline hover:font-bold transition-all duration-300"
                >
                  Tuition & Financial Aid
                </Link>
                <Link
                  to="/workforce-development/"
                  className="block text-stevens-light-gray hover:text-white hover:underline hover:font-bold transition-all duration-300"
                >
                  Workforce Development Hub
                </Link>
                <Link
                  to="/online-learning-experience/"
                  className="block text-stevens-light-gray hover:text-white hover:underline hover:font-bold transition-all duration-300"
                >
                  Learning Experience
                </Link>
                <Link
                  to={createPageUrl("events/")}
                  className="block text-stevens-light-gray hover:text-white hover:underline hover:font-bold transition-all duration-300"
                >
                  Events
                </Link>
                <Link
                  to={createPageUrl("blog/")}
                  className="block text-stevens-light-gray hover:text-white hover:underline hover:font-bold transition-all duration-300"
                >
                  Insights
                </Link>
              </div>
            </div>
            <div>
              <h3 className="font-stevens-headers text-lg font-semibold mb-4 text-white flex flex-col text-center items-center md:items-start  md:text-left">
                Connect With Us
              </h3>
              {/* Social Media Icons Section - Connect With Us */}
              <div className="flex space-x-4 justify-center md:justify-start">
                {/* Facebook Social Media Link */}
                <a
                  href="https://www.facebook.com/Stevens1870"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stevens-light-gray hover:text-white transition-all duration-300 icon-button"
                  aria-label="Follow Stevens on Facebook"
                >
                  <Facebook className="w-6 h-6" />
                </a>

                {/* Twitter/X Social Media Link */}
                <a
                  href="https://x.com/followstevens"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stevens-light-gray hover:text-white transition-all duration-300 icon-button"
                  aria-label="Follow Stevens on Twitter/X"
                >
                  <Twitter className="w-6 h-6" />
                </a>

                {/* Instagram Social Media Link */}
                <a
                  href="https://www.instagram.com/followstevens/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stevens-light-gray hover:text-white transition-all duration-300 icon-button"
                  aria-label="Follow Stevens on Instagram"
                >
                  <Instagram className="w-6 h-6" />
                </a>

                {/* LinkedIn Social Media Link */}
                <a
                  href="https://www.linkedin.com/school/stevens-institute-of-technology/posts/?feedView=all"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stevens-light-gray hover:text-white transition-all duration-300 icon-button"
                  aria-label="Connect with Stevens on LinkedIn"
                >
                  <Linkedin className="w-6 h-6" />
                </a>

                {/* YouTube Social Media Link */}
                <a
                  href="https://www.youtube.com/c/stevensinstituteoftechnology"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stevens-light-gray hover:text-white transition-all duration-300 icon-button"
                  aria-label="Subscribe to Stevens on YouTube"
                >
                  <Youtube className="w-6 h-6" />
                </a>
              </div>
              <div className="mt-6 space-y-2 text-sm">
                <a
                  href={BOOKING_URLS.SCHEDULE_CALL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackConversion(CONVERSION_LABELS.SCHEDULE_CALL)
                  }
                  className="flex items-center justify-center md:justify-start space-x-2 text-stevens-light-gray hover:text-white hover:underline hover:font-bold underline decoration-stevens-light-gray decoration-1 transition-all duration-300"
                  aria-label="Schedule a call"
                >
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span>Schedule a Call</span>
                </a>
                <Link
                  to="/request-information/"
                  onClick={() =>
                    trackConversion(CONVERSION_LABELS.REQUEST_INFO)
                  }
                  className="flex items-center justify-center md:justify-start space-x-2 text-stevens-light-gray hover:text-white hover:underline hover:font-bold underline decoration-stevens-light-gray decoration-1 transition-all duration-300"
                >
                  <FileText className="w-4 h-4 flex-shrink-0" />
                  <span>Request Information</span>
                </Link>
                <div className="flex items-center justify-center md:justify-start space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>{CONTACT_INFO.EMAIL}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>Hoboken, NJ 07030</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-stevens-light-gray mt-12 pt-8 text-center text-sm text-stevens-light-gray">
            <p>
              &copy; 2026 Stevens Institute of Technology. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {showBackToTop && (
        <button
          className="fixed bottom-20 right-5 bg-stevens-red hover:bg-stevens-dark-gray text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-[9998]"
          onClick={() => {
            if (typeof window !== "undefined") {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Interactive Chatbot Button */}
      <ChatbotButton />
    </div>
  );
}
