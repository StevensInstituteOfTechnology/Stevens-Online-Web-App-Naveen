import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl, buildCanonicalUrl } from "@/utils";
import { BOOKING_URLS, CONTACT_INFO } from "@/config/constants";
import {
  ChevronDown,
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
  ArrowRight,
  X,
  Search,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import ChatbotButton from "@/components/chat/ChatbotButton";
import { trackConversion, CONVERSION_LABELS } from "@/utils/gtmTracking";
import "@/globals.css";

const degreeProgramItems = [
  { name: "Online MBA", page: "online-mba/" },
  { name: "M.S. in Computer Science", page: "online-masters-computer-science-mscs/" },
  { name: "M.Eng. in Applied Data Science", page: "online-masters-engineering-applied-data-science/" },
  { name: "M.S. in Engineering Management", page: "online-masters-engineering-management/" },
];

const certificateProgramItems = [
  { name: "Enterprise AI Certificate", page: "certificates/enterprise-ai/" },
  { name: "Applied Data Science Foundations", page: "certificates/applied-data-science-foundations/" },
];

const mainNavLinks = [
  { name: "Online Experience", page: "online-learning-experience/" },
  { name: "Blog", page: "Blog/" },
];

const tuitionAdmissionsItems = [
  { name: "Admissions", page: "Admissions/" },
  { name: "Tuition & Financial Aid", page: "Tuition" },
  { name: "Events", page: "Events/" },
];

const mobileNavLinks = [
  {
    name: "Graduate Programs",
    isDropdown: true,
    items: degreeProgramItems,
  },
  {
    name: "Certificate Programs",
    isDropdown: true,
    items: certificateProgramItems,
  },
  {
    name: "Compare Programs",
    page: "compare-our-programs/",
  },
  {
    name: "Tuition & Admissions",
    isDropdown: true,
    items: tuitionAdmissionsItems,
  },
  ...mainNavLinks,
];

export default function PartnershipLayout({ children, partnershipName = "Corporate Partnership" }) {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [showBackToTop, setShowBackToTop] = React.useState(false);
  const [showPartnershipBanner, setShowPartnershipBanner] = React.useState(true);
  const initialWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
  const [isMobile, setIsMobile] = React.useState(initialWidth < 768);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [degreeDropdownOpen, setDegreeDropdownOpen] = React.useState(false);
  const [tuitionDropdownOpen, setTuitionDropdownOpen] = React.useState(false);
  const degreeHoverTimeoutRef = React.useRef(null);
  const tuitionHoverTimeoutRef = React.useRef(null);
  const prevBannerVisibleRef = React.useRef(true);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    
    let resizeTimer = null;
    let scrollTimer = null;

    const handleResizeNow = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
    };

    const handleResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(handleResizeNow, 120);
    };

    const handleScrollNow = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 10);
      setShowBackToTop(scrollY > 300);
    };

    const handleScroll = () => {
      if (scrollTimer) clearTimeout(scrollTimer);
      scrollTimer = setTimeout(handleScrollNow, 120);
    };

    const addGlobalProtection = () => {
      const style = document.createElement("style");
      style.id = "navigation-protection";
      style.textContent = `
        header[class*="z-[9998]"] {
          z-index: 9998 !important;
          position: sticky !important;
          pointer-events: auto !important;
        }
        
        header[class*="z-[9998]"] * {
          pointer-events: auto !important;
          z-index: inherit !important;
        }
        
        [data-radix-popper-content-wrapper],
        [data-radix-dropdown-menu-content],
        [role="menu"],
        .dropdown-content {
          z-index: 10001 !important;
          position: fixed !important;
          pointer-events: auto !important;
        }
        
        button, a, [role="button"], input, select, textarea, label, [role="dialog"], [role="dialog"] * {
          pointer-events: auto !important;
        }
        
        @media (max-width: 768px) {
          body, html {
            overflow-x: hidden !important;
          }
          
          header.group.sticky {
            position: fixed !important;
            top: 0 !important;
            left: 0;
            right: 0;
            z-index: 9998 !important;
          }

          body {
            padding-top: 64px !important;
          }
          
          button[class*="bottom-6"][class*="right-6"],
          button[class*="bottom-20"][class*="right-6"],
          .chat-button-container {
            position: fixed !important;
            right: 1.5rem !important;
          }
        }
      `;

      const existing = document.getElementById("navigation-protection");
      if (existing) {
        existing.remove();
      }

      document.head.appendChild(style);
    };

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
      if (degreeHoverTimeoutRef.current) clearTimeout(degreeHoverTimeoutRef.current);
      if (tuitionHoverTimeoutRef.current) clearTimeout(tuitionHoverTimeoutRef.current);
      
      const protection = document.getElementById("navigation-protection");
      if (protection) {
        protection.remove();
      }
    };
  }, []);

  React.useEffect(() => {
    if (degreeHoverTimeoutRef.current) clearTimeout(degreeHoverTimeoutRef.current);
    if (tuitionHoverTimeoutRef.current) clearTimeout(tuitionHoverTimeoutRef.current);
    
    setDegreeDropdownOpen(false);
    setTuitionDropdownOpen(false);
    setMobileMenuOpen(false);
    if (prevBannerVisibleRef.current) {
      setShowPartnershipBanner(true);
    }
  }, [location.pathname]);

  React.useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    
    const canonicalHref = buildCanonicalUrl(location.pathname);
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', canonicalHref);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen font-sans text-gray-800">
      {/* Main Red Navigation Bar */}
      <header
        className={`sticky top-0 z-[9998] transition-all duration-stevens-normal bg-stevens-red ${
          isScrolled ? "shadow-stevens-lg" : ""
        }`}
      >
        {/* Top Grey Navigation Bar */}
        <div className="bg-stevens-gray-800 text-stevens-white transition-all duration-stevens-normal z-[9996] w-full hidden stevens-lg:block">
          <div className="w-full">
            <div className="flex items-center justify-end h-12 text-stevens-sm px-stevens-md lg:px-stevens-lg">
              <div className="flex items-center space-x-stevens-md">
                <a
                  href="https://www.stevens.edu/corporate-relations"
                  className="menu-item-link font-stevens-bitter text-stevens-sm text-stevens-white hover:text-stevens-white hover:underline hover:font-bold transition-colors duration-stevens-fast"
                >
                  Corporate Relations
                </a>
                <a
                  href="https://www.stevens.edu/development-alumni-engagement"
                  className="menu-item-link font-stevens-bitter text-stevens-sm text-stevens-white hover:text-stevens-white hover:underline hover:font-bold transition-colors duration-stevens-fast"
                >
                  Alumni
                </a>
                <a
                  href="https://stevensducks.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="menu-item-link font-stevens-bitter text-stevens-sm text-stevens-white hover:text-stevens-white hover:underline hover:font-bold transition-colors duration-stevens-fast"
                >
                  Athletics
                </a>
                <a
                  href="https://www.stevens.edu/apply"
                  className="menu-item-link font-stevens-bitter text-stevens-sm text-stevens-white hover:text-stevens-white hover:underline hover:font-bold transition-colors duration-stevens-fast"
                >
                  Apply
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Top Red Navigation Bar */}
        <div className="w-full px-stevens-md lg:px-stevens-lg">
            <div className="flex items-center justify-between h-16 w-full">
            {/* Logo - Left - Always Visible */}
            <div className="flex-shrink-0 overflow-visible">
              <Link
                to={createPageUrl("Home")}
                className="flex items-center gap-2 stevens-md:gap-3 transition-opacity duration-stevens-normal hover:opacity-80"
              >
                <img
                  src="/assets/logos/Stevens-Wordmark-RGB_WHT.png"
                  alt="Stevens Institute of Technology" 
                  className="h-10 stevens-md:h-12"
                />
              </Link>
            </div>

            {/* Desktop Navigation - Right Aligned */}
            <div className="hidden stevens-lg:flex ml-auto">
              <nav className="flex items-center gap-stevens-xl">
                <DropdownMenu open={degreeDropdownOpen} onOpenChange={setDegreeDropdownOpen}>
                  <DropdownMenuTrigger
                    className="group relative font-stevens-nav font-normal uppercase tracking-wider flex items-center cursor-pointer transition-colors duration-stevens-normal text-stevens-white hover:text-stevens-white/80"
                    onMouseEnter={() => {
                      if (degreeHoverTimeoutRef.current) {
                        clearTimeout(degreeHoverTimeoutRef.current);
                      }
                      setDegreeDropdownOpen(true);
                    }}
                    onMouseLeave={() => {
                      degreeHoverTimeoutRef.current = setTimeout(() => {
                        setDegreeDropdownOpen(false);
                      }, 100);
                    }}
                  >
                    Degree Programs{" "}
                    <ChevronDown className={`w-4 h-4 ml-1 transition-transform duration-stevens-normal ${degreeDropdownOpen ? 'rotate-180' : ''}`} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-[520px] p-stevens-md shadow-stevens-lg border border-stevens-gray-100 bg-stevens-white/95 backdrop-blur-sm animate-in slide-in-from-top-2 duration-stevens-normal z-[10001]"
                    sideOffset={4}
                    align="start"
                    onMouseEnter={() => {
                      if (degreeHoverTimeoutRef.current) {
                        clearTimeout(degreeHoverTimeoutRef.current);
                      }
                      setDegreeDropdownOpen(true);
                    }}
                    onMouseLeave={() => {
                      degreeHoverTimeoutRef.current = setTimeout(() => {
                        setDegreeDropdownOpen(false);
                      }, 100);
                    }}
                  >
                    <div className="grid grid-cols-3 gap-stevens-xl">
                      <div className="flex flex-col space-y-2">
                        <div className="px-stevens-sm pb-stevens-sm mb-stevens-sm border-b-2 border-stevens-gray-300">
                          <span className="text-stevens-sm font-stevens-bold text-stevens-gray-700 uppercase tracking-wide">Graduate Programs</span>
                        </div>
                        {degreeProgramItems.map((item) => (
                        <DropdownMenuItem key={item.name} asChild>
                            <Link
                              to={createPageUrl(item.page)}
                              className="font-stevens-nav font-semibold text-stevens-gray-900 px-stevens-md py-stevens-sm rounded-stevens-md transition-colors duration-stevens-fast text-stevens-base"
                              style={{
                                color: "#1f2937",
                                backgroundColor: "transparent",
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.color = "#ffffff";
                                e.target.style.backgroundColor = "#a32638";
                                e.target.style.textDecoration = "underline";
                                e.target.style.fontWeight = "700";
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.color = "#1f2937";
                                e.target.style.backgroundColor = "transparent";
                                e.target.style.textDecoration = "none";
                                e.target.style.fontWeight = "600";
                              }}
                            >
                              {item.name}
                            </Link>
                        </DropdownMenuItem>
                        ))}
                      </div>
                      
                      <div className="flex flex-col space-y-2">
                        <div className="px-stevens-sm pb-stevens-sm mb-stevens-sm border-b-2 border-stevens-gray-300">
                          <span className="text-stevens-sm font-stevens-bold text-stevens-gray-700 uppercase tracking-wide">Certificate Programs</span>
                        </div>
                        {certificateProgramItems.map((item) => (
                        <DropdownMenuItem key={item.name} asChild>
                            <Link
                              to={createPageUrl(item.page)}
                              className="font-stevens-nav font-semibold text-stevens-gray-900 px-stevens-md py-stevens-sm rounded-stevens-md transition-colors duration-stevens-fast text-stevens-base"
                              style={{
                                color: "#1f2937",
                                backgroundColor: "transparent",
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.color = "#ffffff";
                                e.target.style.backgroundColor = "#a32638";
                                e.target.style.textDecoration = "underline";
                                e.target.style.fontWeight = "700";
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.color = "#1f2937";
                                e.target.style.backgroundColor = "transparent";
                                e.target.style.textDecoration = "none";
                                e.target.style.fontWeight = "600";
                              }}
                            >
                              {item.name}
                            </Link>
                        </DropdownMenuItem>
                        ))}
                      </div>
                      
                      <div className="flex flex-col space-y-2">
                        <div className="px-stevens-sm pb-stevens-sm mb-stevens-sm border-b-2 border-stevens-gray-300">
                          <span className="text-stevens-sm font-stevens-bold text-stevens-gray-700 uppercase tracking-wide">Compare</span>
                        </div>
                        <DropdownMenuItem asChild>
                          <Link
                            to="/compare-our-programs/"
                            className="font-stevens-nav font-semibold text-stevens-gray-900 px-stevens-md py-stevens-sm rounded-stevens-md transition-colors duration-stevens-fast flex items-center text-stevens-base"
                            style={{
                              color: "#1f2937",
                              backgroundColor: "transparent",
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.color = "#ffffff";
                              e.target.style.backgroundColor = "#a32638";
                              e.target.style.textDecoration = "underline";
                              e.target.style.fontWeight = "700";
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.color = "#1f2937";
                              e.target.style.backgroundColor = "transparent";
                              e.target.style.textDecoration = "none";
                              e.target.style.fontWeight = "600";
                            }}
                          >
                              Compare All Programs
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                        </DropdownMenuItem>
                      </div>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu open={tuitionDropdownOpen} onOpenChange={setTuitionDropdownOpen}>
                  <DropdownMenuTrigger
                    className="group relative font-stevens-nav font-normal uppercase tracking-wider flex items-center cursor-pointer transition-colors duration-stevens-normal text-stevens-white hover:text-stevens-white/80"
                    onMouseEnter={() => {
                      if (tuitionHoverTimeoutRef.current) {
                        clearTimeout(tuitionHoverTimeoutRef.current);
                      }
                      setTuitionDropdownOpen(true);
                    }}
                    onMouseLeave={() => {
                      tuitionHoverTimeoutRef.current = setTimeout(() => {
                        setTuitionDropdownOpen(false);
                      }, 100);
                    }}
                  >
                    Tuition & Admissions{" "}
                    <ChevronDown className={`w-4 h-4 ml-1 transition-transform duration-stevens-normal ${tuitionDropdownOpen ? 'rotate-180' : ''}`} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-40 p-stevens-md shadow-stevens-lg border border-stevens-gray-100 bg-stevens-white/95 backdrop-blur-sm animate-in slide-in-from-top-2 duration-stevens-normal z-[10001]"
                    sideOffset={4}
                    align="start"
                    onMouseEnter={() => {
                      if (tuitionHoverTimeoutRef.current) {
                        clearTimeout(tuitionHoverTimeoutRef.current);
                      }
                      setTuitionDropdownOpen(true);
                    }}
                    onMouseLeave={() => {
                      tuitionHoverTimeoutRef.current = setTimeout(() => {
                        setTuitionDropdownOpen(false);
                      }, 100);
                    }}
                  >
                    <div className="flex flex-col space-y-1">
                      {tuitionAdmissionsItems.map((item) => (
                        <DropdownMenuItem key={item.name} asChild>
                          <Link
                            to={createPageUrl(item.page)}
                            className=" font-stevens-nav font-semibold text-stevens-gray-900 p-stevens-sm rounded-stevens-md transition-colors duration-stevens-fast text-stevens-base"
                            style={{ color: "#1f2937", backgroundColor: "transparent" }}
                            onMouseEnter={(e) => {
                              e.target.style.color = "#ffffff";
                              e.target.style.backgroundColor = "#a32638";
                              e.target.style.textDecoration = "underline";
                              e.target.style.fontWeight = "700";
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.color = "#1f2937";
                              e.target.style.backgroundColor = "transparent";
                              e.target.style.textDecoration = "none";
                              e.target.style.fontWeight = "600";
                            }}
                          >
                            {item.name}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
                {mainNavLinks.map((link) => (
                  link.external ? (
                    <a
                      key={link.name}
                      href={link.page}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative font-stevens-nav font-normal uppercase tracking-wider transition-colors duration-stevens-normal text-stevens-white hover:text-stevens-white/80"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      key={link.name}
                      to={createPageUrl(link.page)}
                        className="relative font-stevens-nav font-normal uppercase tracking-wider transition-colors duration-stevens-normal text-stevens-white hover:text-stevens-white/80"
                        onMouseEnter={() => {
                          if (hoverTimeoutRef.current) {
                            clearTimeout(hoverTimeoutRef.current);
                          }
                        }}
                        onMouseLeave={() => {
                          hoverTimeoutRef.current = setTimeout(() => {
                            setIsHoveringRedNav(false);
                          }, 100);
                        }}
                      >
                        {link.name}
                      </Link>
                    )
                  ))}
              </nav>
            </div>

            {/* Mobile Menu Button - Right */}
            <div className="stevens-lg:hidden flex items-center">
              <Sheet open={mobileMenuOpen} onOpenChange={(open) => {
                if (open) {
                  prevBannerVisibleRef.current = showPartnershipBanner;
                  setShowPartnershipBanner(false);
                } else {
                  if (prevBannerVisibleRef.current) {
                    setShowPartnershipBanner(true);
                  }
                }
                setMobileMenuOpen(open);
              }}>
                  <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-stevens-white hover:text-stevens-white/80 hover:bg-stevens-white/10"
                  >
                      <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle menu</span>
                    </Button>
                  </SheetTrigger>
              <SheetContent 
                side="right" 
                className="mobile-menu-offset w-full stevens-sm:w-80 bg-stevens-white p-0 border-l border-stevens-gray-200 overflow-y-auto"
              >
                    <div className="flex flex-col h-full">
                  <div className="flex h-16 items-center justify-between p-stevens-md border-b border-stevens-gray-200 bg-stevens-primary">
                    
                      </div>

                  <div className="p-stevens-md border-b border-stevens-gray-200 bg-stevens-gray-50 space-y-stevens-sm">
                    <a
                      href="https://www.stevens.edu/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Button className="w-full btn-stevens-secondary hover:text-stevens-primary bg-stevens-white text-stevens-primary hover:bg-stevens-gray-100 font-stevens-semibold px-stevens-lg py-stevens-md rounded-stevens-md transition-colors duration-stevens-normal text-stevens-sm uppercase tracking-wider">
                        Stevens.edu
                      </Button>
                    </a>
                    <a
                      href={BOOKING_URLS.SCHEDULE_CALL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                      onClick={() => trackConversion(CONVERSION_LABELS.SCHEDULE_CALL)}
                    >
                      <Button className="w-full bg-stevens-white text-stevens-primary hover:bg-stevens-gray-100 font-stevens-semibold px-stevens-lg py-stevens-md rounded-stevens-md">
                        Schedule a Call
                      </Button>
                      
                    </a>
                  </div>

                  <nav className="flex-1 overflow-y-auto">
                    <div className="py-stevens-md">
                          {mobileNavLinks.map((link) => {
                            if (link.isDropdown) {
                              return (
                            <div key={link.name} className="border-b border-stevens-gray-200">
                              <button
                                className="w-full px-stevens-md py-stevens-md text-left font-stevens-semibold text-stevens-gray-900 hover:bg-stevens-gray-50 transition-colors duration-stevens-normal flex items-center justify-between"
                                onClick={(e) => {
                                  const content = e.currentTarget.nextElementSibling;
                                  const icon = e.currentTarget.querySelector('svg');
                                  if (content.classList.contains('hidden')) {
                                    content.classList.remove('hidden');
                                    icon.classList.add('rotate-180');
                                  } else {
                                    content.classList.add('hidden');
                                    icon.classList.remove('rotate-180');
                                  }
                                }}
                              >
                                {link.name}
                                <ChevronDown className="w-4 h-4 transition-transform duration-stevens-normal" />
                              </button>
                              <div className="hidden bg-stevens-gray-50">
                                {link.items.map((item) => (
                                    <Link
                                      key={item.name}
                                      to={createPageUrl(item.page)}
                                    className="block px-stevens-lg py-stevens-sm text-stevens-gray-700 hover:text-stevens-primary hover:bg-stevens-white transition-colors duration-stevens-normal"
                                    onClick={() => setMobileMenuOpen(false)}
                                  >
                                        {item.name}
                                      </Link>
                                ))}
                              </div>
                                  </div>
                          );
                            }
                            return link.external ? (
                              <a
                                key={link.name}
                                href={link.page}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block px-stevens-md py-stevens-md font-stevens-semibold text-stevens-gray-900 hover:bg-stevens-gray-50 border-b border-stevens-gray-200 transition-colors duration-stevens-normal"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                {link.name}
                              </a>
                            ) : (
                              <Link
                                key={link.name}
                                to={createPageUrl(link.page)}
                                className="block px-stevens-md py-stevens-md font-stevens-semibold text-stevens-gray-900 hover:bg-stevens-gray-50 border-b border-stevens-gray-200 transition-colors duration-stevens-normal"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                {link.name}
                              </Link>
                            );
                      })}
                    </div>
                  </nav>
                    </div>
                  </SheetContent>
                </Sheet>
            </div>

            {/* CTA Section - Desktop Only */}
            <div className="hidden stevens-lg:flex items-center gap-stevens-md ml-stevens-lg">
            <div className="flex items-center gap-stevens-sm">
                <a
                  href="https://www.stevens.edu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => {
                    if (hoverTimeoutRef.current) {
                      clearTimeout(hoverTimeoutRef.current);
                    }
                    setIsHoveringRedNav(true);
                  }}
                  onMouseLeave={() => {
                    hoverTimeoutRef.current = setTimeout(() => {
                      setIsHoveringRedNav(false);
                    }, 100);
                  }}
                >
                 
                  <Button className="btn-stevens-secondary bg-stevens-white text-stevens-primary hover: font-stevens-semibold px-stevens-lg py-stevens-md rounded-stevens-md transition-colors duration-stevens-normal text-stevens-sm uppercase tracking-wider">
                    STEVENS.EDU
                  </Button>
                </a>
              </div>

              <div className="flex items-center gap-stevens-sm">
                <a
                  href={BOOKING_URLS.SCHEDULE_CALL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackConversion(CONVERSION_LABELS.SCHEDULE_CALL)}
                  onMouseEnter={() => {
                    if (hoverTimeoutRef.current) {
                      clearTimeout(hoverTimeoutRef.current);
                    }
                    setIsHoveringRedNav(true);
                  }}
                  onMouseLeave={() => {
                    hoverTimeoutRef.current = setTimeout(() => {
                      setIsHoveringRedNav(false);
                    }, 100);
                  }}
                >
                 
                  <Button className="btn-stevens-secondary bg-stevens-white text-stevens-primary hover: font-stevens-semibold px-stevens-lg py-stevens-md rounded-stevens-md transition-colors duration-stevens-normal text-stevens-sm uppercase tracking-wider">
                    Schedule a Call
                  </Button>
                </a>
              </div>

              </div>
            </div>
          </div>
      </header>
      
      {/* Partnership Banner */}
      {showPartnershipBanner && (
        <div className="bg-stevens-maroon text-stevens-white py-3 relative z-[9997]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            <Award className="w-5 h-5 flex-shrink-0 mr-3" />
            <span className="text-sm md:text-base font-medium">
              {partnershipName} • Customized Learning Pathways
            </span>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowPartnershipBanner(false);
            }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-200 transition-colors cursor-pointer"
            aria-label="Close banner"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Main Content with Dark Theme */}
      <main className="flex-grow bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-950 text-white">
        <div className="max-w-stevens-content-max mx-auto px-stevens-md lg:px-stevens-lg py-stevens-section">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-stevens-gap-lg">
             <div className="lg:col-span-1 flex flex-col items-center md:items-start text-center md:text-left">
              <Link
                to={createPageUrl("Home")}
                className="mb-6 transition-opacity duration-300 hover:opacity-80"
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
              >
                <img
                  src="/assets/logos/Stevens-Wordmark-RGB_WHT.png"
                  alt="Stevens Institute of Technology Logo"
                  className="h-16 w-auto"
                />
               </Link>
            </div>
            <div className="lg:col-start-3">
              <h3 className="font-display text-lg font-semibold mb-4 text-white">
                Quick Links
              </h3>
              <div className="space-y-2">
                <Link
                  to="/compare-our-programs/"
                  className="block text-gray-300 hover:text-white hover:underline hover:font-bold transition-all duration-300"
                >
                  Degree Programs
                </Link>
                <Link
                  to="/online-learning-experience/"
                  className="block text-gray-300 hover:text-white hover:underline hover:font-bold transition-all duration-300"
                >
                  The Online Experience
                </Link>
                <Link
                  to={createPageUrl("Tuition")}
                  className="block text-gray-300 hover:text-white hover:underline hover:font-bold transition-all duration-300"
                >
                  Tuition & Financial Aid
                </Link>
                <Link
                  to={createPageUrl("RequestInfo")}
                  className="block text-gray-300 hover:text-white hover:underline hover:font-bold transition-all duration-300"
                >
                  Contact Us
                </Link>
              </div>
            </div>
             <div>
              <h3 className="font-display text-lg font-semibold mb-4 text-white">
                Connect With Us
              </h3>
              <div className="flex space-x-4 justify-center md:justify-start">
                <a
                  href="https://www.facebook.com/Stevens1870"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-all duration-300 icon-button"
                  aria-label="Follow Stevens on Facebook"
                >
                  <Facebook className="w-6 h-6" />
                </a>
                <a
                  href="https://x.com/followstevens"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-all duration-300 icon-button"
                  aria-label="Follow Stevens on Twitter/X"
                >
                  <Twitter className="w-6 h-6" />
                </a>
                <a
                  href="https://www.instagram.com/followstevens/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-all duration-300 icon-button"
                  aria-label="Follow Stevens on Instagram"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <a
                  href="https://www.linkedin.com/school/stevens-institute-of-technology/posts/?feedView=all"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-all duration-300 icon-button"
                  aria-label="Connect with Stevens on LinkedIn"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a
                  href="https://www.youtube.com/c/stevensinstituteoftechnology"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-all duration-300 icon-button"
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
           <div className="border-t border-gray-400 mt-12 pt-8 text-center text-sm text-gray-300">
            <p>
              &copy; 2025 Stevens Institute of Technology. All rights reserved.
            </p>
           </div>
        </div>
      </footer>

      {showBackToTop && (
      <button
          className="fixed bottom-6 right-6 bg-stevens-maroon hover:bg-stevens-maroon-dark text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-[9998]"
          onClick={() => {
            if (typeof window !== 'undefined') {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
      
      <ChatbotButton />
    </div>
  );
}

