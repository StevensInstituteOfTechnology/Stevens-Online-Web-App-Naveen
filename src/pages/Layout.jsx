import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl, buildCanonicalUrl } from "@/utils";
import { CONTACT_INFO } from "@/config/constants";
import {
  Menu,
  Phone,
  Mail,
  MapPin,
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
  // { name: "M.S. in Data Science", page: "online-masters-data-science-msds/" }, // Temporarily disabled
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

const aboutItems = [
  { name: "Online Experience", page: "online-learning-experience/" },
  { name: "Events", page: "Events/" },
];

// Explore dropdown items - quick links for easy access
const exploreItems = [
  {
    name: "Alumni",
    url: "https://www.stevens.edu/development-alumni-engagement",
    external: true,
  },
  { name: "Athletics", url: "https://stevensducks.com/", external: true },
  {
    name: "Visit",
    url: "https://www.stevens.edu/admission-aid/visit-stevens",
    external: true,
  },
  { name: "Apply", url: "https://www.stevens.edu/apply", external: true },
  {
    name: "Give",
    url: "https://www.stevens.edu/development-alumni-engagement/give-to-stevens",
    external: true,
  },
  { name: "myStevens", url: "https://login.stevens.edu", external: true },
];

// Info For items (sub-dropdown within Explore)
const infoForItems = [
  {
    name: "Faculty and Staff",
    url: "https://www.stevens.edu/hr",
    external: true,
  },
  {
    name: "Parents and Families",
    url: "https://www.stevens.edu/information-for-parents-and-families",
    external: true,
  },
  {
    name: "Media",
    url: "https://www.stevens.edu/media-relations",
    external: true,
  },
];

const mainNavLinks = [
  // The "GRADUATE" and "Academics" are handled separately with custom dropdowns.
  // { name: "Certificates & Short Courses", page: "Certificates" },

  { name: "Blog", page: "Blog/" },
];

const admissionsAidItems = [
  { name: "Admissions", page: "Admissions/" },
  { name: "Tuition & Financial Aid", page: "Tuition" },
];

const corporateAlumniItems = [
  { name: "Corporate Partners", page: "corporate-partners/" },
  { name: "Corporate Students", page: "corporate-students/" },
  { name: "Alumni Workforce Development", page: "alumni-pgc/" },
];

// Combined for mobile menu
const tuitionAdmissionsItems = [...admissionsAidItems, ...corporateAlumniItems];

// Mobile menu items with Compare Programs added to dropdowns
const mobileGraduateProgramItems = [
  ...graduateProgramItems,
  { name: "Compare All Programs", page: "compare-our-programs/" },
];

const mobileCertificateProgramItems = [
  ...certificateProgramItems,
  { name: "Compare All Programs", page: "compare-our-programs/" },
];

// Combined explore items for mega menu (exploreItems + infoForItems)
const mobileExploreItems = [
  ...exploreItems.map((item) => ({
    name: item.name,
    page: item.url,
    external: item.external,
  })),
  ...infoForItems.map((item) => ({
    name: item.name,
    page: item.url,
    external: item.external,
  })),
];

const mobileNavLinks = [
  {
    name: "Degrees",
    isDropdown: true,
    items: mobileGraduateProgramItems,
  },
  {
    name: "Certificates",
    isDropdown: true,
    items: mobileCertificateProgramItems,
  },
  {
    name: "Discover",
    isDropdown: true,
    items: tuitionAdmissionsItems,
  },
  {
    name: "About",
    isDropdown: true,
    items: aboutItems,
  },
  {
    name: "Explore",
    isDropdown: true,
    items: mobileExploreItems,
  },
  ...mainNavLinks,
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [showBackToTop, setShowBackToTop] = React.useState(false);
  const initialWidth = typeof window !== "undefined" ? window.innerWidth : 0;
  const [isMobile, setIsMobile] = React.useState(initialWidth < 768);
  const [isTabletOrMobile, setIsTabletOrMobile] = React.useState(
    initialWidth <= 1024
  );
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [megaMenuHoveredItem, setMegaMenuHoveredItem] = React.useState(null);
  const [expandedMobileMenus, setExpandedMobileMenus] = React.useState([]); // For mobile accordion

  // Toggle accordion item on mobile
  const toggleMobileAccordion = (menuName) => {
    setExpandedMobileMenus((prev) =>
      prev.includes(menuName)
        ? prev.filter((name) => name !== menuName)
        : [...prev, menuName]
    );
  };

  React.useEffect(() => {
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
      setIsScrolled(scrollY > 100);
      setShowBackToTop(scrollY > 300);
    };

    const handleScroll = () => {
      if (scrollTimer) clearTimeout(scrollTimer);
      scrollTimer = setTimeout(handleScrollNow, 120);
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
          z-index: inherit !important;
        }
        
        div[class*="z-[9996]"] {
          z-index: 9996 !important;
          position: fixed !important;
          pointer-events: auto !important;
        }
        
        div[class*="z-[9996]"] * {
          pointer-events: auto !important;
          z-index: inherit !important;
        }
        
        div[class*="z-[9997]"] {
          z-index: 9997 !important;
          position: relative !important;
          pointer-events: auto !important;
        }
        
        div[class*="z-[9997]"] * {
          pointer-events: auto !important;
          z-index: inherit !important;
        }
        
        /* Ensure buttons, links, and form elements remain clickable */
        button, a, [role="button"], input, select, textarea, label, [role="dialog"], [role="dialog"] * {
          pointer-events: auto !important;
        }
        
        /* Fix horizontal overflow issues on mobile that affect button positioning */
        @media (max-width: 768px) {
          body, html {
            overflow-x: hidden !important;
          }
          
          /* Keep nav visible on mobile while overflow-x is hidden */
          header.group {
            top: 0 !important;
            left: 0;
            right: 0;
            z-index: 9998 !important;
          }
          
          /* Protect chatbot and back-to-top buttons from container overflow */
          button[class*="bottom-6"][class*="right-6"],
          button[class*="bottom-20"][class*="right-6"],
          .chat-button-container {
            position: fixed !important;
            right: 1.5rem !important;
          }
        }
        
        /* Dropdown menu protection - ensure they appear above all navigation elements */
        [data-radix-popper-content-wrapper],
        [data-radix-dropdown-menu-content],
        [role="menu"],
        .dropdown-content {
          z-index: 10001 !important;
          position: fixed !important;
          pointer-events: auto !important;
        }
        
        /* Search suggestions protection - allow absolute positioning relative to input */
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
          z-index: inherit !important;
        }
        
        
        /* Reset external script z-index interference */
        *:not(header):not(header *):not([class*="z-[9"]):not([data-radix-popper-content-wrapper]):not([data-radix-dropdown-menu-content]):not([role="menu"]):not([data-search-suggestions="true"]) {
          z-index: auto !important;
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
  React.useEffect(() => {
    setMobileMenuOpen(false);
    setExpandedMobileMenus([]);
  }, [location.pathname]);

  // Update canonical tag on route change
  React.useEffect(() => {
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

  const isActive = (page) => currentPageName === page;

  // Check if we're on the home page by pathname (more reliable than currentPageName)
  const isHomePage =
    location.pathname === "/" ||
    location.pathname === "/home" ||
    location.pathname === "/home/";

  // Navbar should be transparent without logo only on home page when not scrolled AND mega menu is closed
  const showTransparentNav = isHomePage && !isScrolled && !mobileMenuOpen;

  return (
    <div className="flex flex-col min-h-screen font-sans text-stevens-dark-gray">
      {/* Main Navigation Bar
          - Home page: fixed (for transparent overlay effect on hero)
          - Other pages: sticky (content flows below naturally, no overlap)
      */}
      <header
        className={`group z-[9998] ${
          isHomePage
            ? "fixed top-0 left-0 right-0" // Fixed for home page
            : "sticky top-0" // Sticky for other pages
        } ${
          showTransparentNav
            ? "bg-transparent"
            : "bg-stevens-black shadow-stevens-lg"
        }`}
      >
        <div className="w-full px-stevens-md lg:px-stevens-lg">
          <div className="flex items-center justify-between h-[87px] w-full">
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
                <div className="relative overflow-visible">
                  {/* Main Logo - 60% larger */}
                  <img
                    src="/assets/logos/Stevens-CPE-logo-RGB_Linear-WHT.png"
                    alt="Stevens Institute of Technology Professional Education Logo"
                    className="h-[65px] stevens-md:h-[87px] w-auto"
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
                  // Show "Degrees" sub-links by default when opening the menu
                  setMegaMenuHoveredItem(newMenuState ? "Degrees" : null);
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
              <div className="max-w-stevens-content-max mx-auto px-stevens-md md:px-stevens-xl py-stevens-xl md:py-stevens-2xl">
                {/* Mobile: Single column accordion | Desktop: 3-column grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-stevens-lg md:gap-stevens-2xl">
                  {/* Left Column - Main Navigation Links (Accordion on Mobile) */}
                  <div className="space-y-stevens-sm md:space-y-stevens-lg">
                    {mobileNavLinks.map((link) => {
                      if (link.isDropdown) {
                        const isExpanded = expandedMobileMenus.includes(
                          link.name
                        );
                        return (
                          <div key={link.name} className="group">
                            {/* Menu Item Header */}
                            <button
                              className={`w-full flex items-center justify-between text-stevens-xl md:text-stevens-2xl font-stevens-display cursor-pointer transition-colors duration-200 py-stevens-sm md:py-0 ${
                                megaMenuHoveredItem === link.name || isExpanded
                                  ? "text-stevens-red"
                                  : "text-stevens-light-gray hover:text-stevens-white"
                              }`}
                              onClick={() => toggleMobileAccordion(link.name)}
                              onMouseEnter={() =>
                                !isMobile && setMegaMenuHoveredItem(link.name)
                              }
                            >
                              <span className="flex items-center gap-2">
                                {link.name}
                                {/* Arrow icon for desktop - indicates sub-menu */}
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
                              {/* Chevron icon - rotates when expanded (mobile only) */}
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

                            {/* Accordion Content - Mobile Only */}
                            {isExpanded && (
                              <div className="md:hidden mt-stevens-sm ml-stevens-md space-y-stevens-sm border-l-2 border-stevens-gray pl-stevens-md">
                                {link.items?.map((item) =>
                                  item.external ? (
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
                            !isMobile && setMegaMenuHoveredItem(null)
                          }
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
                            !isMobile && setMegaMenuHoveredItem(null)
                          }
                        >
                          {link.name}
                        </Link>
                      );
                    })}
                  </div>

                  {/* Middle Column - Sub-links for hovered item (Desktop Only) */}
                  <div className="hidden md:block space-y-stevens-md min-h-[200px]">
                    {megaMenuHoveredItem &&
                      mobileNavLinks
                        .find((link) => link.name === megaMenuHoveredItem)
                        ?.items?.map((item) =>
                          item.external ? (
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
                            >
                              {item.name}
                            </Link>
                          )
                        )}
                  </div>

                  {/* Right Column - CPE Information (Hidden on small mobile, visible on tablet+) */}
                  <div className="hidden sm:block space-y-stevens-lg pt-stevens-lg md:pt-0 border-t border-stevens-gray md:border-t-0">
                    <div>
                      <h3 className="text-stevens-lg md:text-stevens-xl font-stevens-display text-stevens-white mb-stevens-md">
                        College of Professional Education
                      </h3>
                      <p className="text-stevens-sm md:text-stevens-base text-stevens-light-gray leading-relaxed">
                        Advance your career with Stevens' forward-looking vision
                        for higher education—flexible online programs designed
                        for working professionals.
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
            <div className="lg:col-span-1 flex flex-col items-center md:items-start text-center md:text-left">
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
                  src="/assets/logos/Stevens-CPE-logo-RGB_Abbreviated-WHT.png"
                  alt="Stevens Institute of Technology Logo"
                  className="h-48 w-auto"
                />
              </Link>
            </div>
            <div className="lg:col-start-3">
              <h3 className="font-stevens-headers text-lg font-semibold mb-4 text-white">
                Quick Links
              </h3>
              <div className="space-y-2">
                <Link
                  to={createPageUrl("admissions/") + "#explore-programs"}
                  className="block text-stevens-light-gray hover:text-white hover:underline hover:font-bold transition-all duration-300"
                >
                  Degrees
                </Link>
                {/* <Link
                  to={createPageUrl("Certificates")}
                  className="block text-stevens-light-gray hover:text-white hover:underline hover:font-bold transition-all duration-300"
                >
                  Certificates & Short Courses
                </Link> */}
                <Link
                  to="/online-learning-experience/"
                  className="block text-stevens-light-gray hover:text-white hover:underline hover:font-bold transition-all duration-300"
                >
                  The Online Experience
                </Link>
                <Link
                  to={createPageUrl("Tuition")}
                  className="block text-stevens-light-gray hover:text-white hover:underline hover:font-bold transition-all duration-300"
                >
                  Tuition & Financial Aid
                </Link>
                <Link
                  to={createPageUrl("RequestInfo")}
                  className="block text-stevens-light-gray hover:text-white hover:underline hover:font-bold transition-all duration-300"
                >
                  Contact Us
                </Link>
              </div>
            </div>
            <div>
              <h3 className="font-stevens-headers text-lg font-semibold mb-4 text-white">
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
                <div className="flex items-center justify-center md:justify-start space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>{CONTACT_INFO.PHONE_DISPLAY}</span>
                </div>
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
              &copy; 2025 Stevens Institute of Technology. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {showBackToTop && (
        <button
          className="fixed bottom-6 right-6 bg-stevens-red hover:bg-stevens-dark-gray text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-[9998]"
          onClick={() => {
            if (typeof window !== "undefined") {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Interactive Chatbot Button */}
      <ChatbotButton />
    </div>
  );
}
