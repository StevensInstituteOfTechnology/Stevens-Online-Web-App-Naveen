import React from "react";
import { MoreHorizontal, ChevronDown } from "lucide-react";

/**
 * Sticky navigation bar for program pages.
 *
 * Features:
 * - Responsive grid: 4 columns on mobile (3 tabs + More), 5 columns on desktop (4 tabs + More)
 * - Active section highlighting with red underline
 * - "More" dropdown for overflow items
 * - Special handling for combined tuition/admissions sections
 * - Light/Dark theme support (matches form theme)
 *
 * @param {Object} props
 * @param {Array} props.navItems - Navigation items (already filtered)
 * @param {string} props.activeSection - Currently active section ID
 * @param {boolean} props.moreMenuOpen - Whether "More" dropdown is open
 * @param {Function} props.setMoreMenuOpen - Toggle "More" dropdown
 * @param {Object} props.moreMenuRef - Ref for "More" dropdown (click outside handling)
 * @param {Object} props.admissions - Admissions data (for variant detection)
 * @param {string} props.theme - "light" | "dark" - theme for the nav bar (default: "light")
 */
export function StickyNav({
  navItems,
  activeSection,
  moreMenuOpen,
  setMoreMenuOpen,
  moreMenuRef,
  admissions,
  theme = "light",
}) {
  const isDark = theme === "dark";

  // Theme-based styles
  const styles = {
    container: isDark
      ? "bg-stevens-black shadow-[0_4px_12px_-2px_rgba(0,0,0,0.5)]"
      : "bg-white shadow-[0_4px_12px_-2px_rgba(0,0,0,0.15)]",
    text: isDark
      ? "text-white/60 hover:text-white"
      : "text-stevens-gray hover:text-stevens-black",
    textActive: isDark
      ? "text-white font-semibold"
      : "text-stevens-black font-semibold",
    moreButton: isDark
      ? "text-white/60 border-white/30 hover:text-white hover:border-white/60 hover:shadow-sm"
      : "text-stevens-gray border-stevens-light-gray hover:text-stevens-black hover:border-stevens-dark-gray hover:shadow-sm",
    moreButtonActive: isDark
      ? "text-white bg-white/10 border-white/50 shadow-md"
      : "text-stevens-black bg-white border-stevens-dark-gray shadow-md",
    dropdown: isDark
      ? "bg-stevens-dark-gray border-white/20"
      : "bg-white border-stevens-light-gray",
    dropdownItem: isDark
      ? "text-white/80 hover:text-white hover:bg-white/10 border-transparent hover:border-white/30"
      : "text-stevens-dark-gray hover:text-stevens-black hover:bg-stevens-light-gray border-transparent hover:border-stevens-gray",
    dropdownItemActive: isDark
      ? "text-stevens-red bg-white/10 font-semibold border-l-4 border-stevens-red"
      : "text-stevens-red bg-red-50 font-semibold border-l-4 border-stevens-red",
  };
  if (!navItems || navItems.length === 0) return null;

  // Helper to determine if tuition should redirect to admissions
  const isCombinedTuition = (itemId) =>
    itemId === "tuition" &&
    (admissions?.variant === "combinedWithTuition" ||
      admissions?.variant === "certificateWithDeadlines");

  // Helper to get href for a nav item
  const getNavHref = (item) =>
    isCombinedTuition(item.id) ? "#admissions" : `#${item.id}`;

  // Helper to get label for a nav item
  const getNavLabel = (item) =>
    isCombinedTuition(item.id) ? "Admissions" : item.label;

  // Helper to check if item is active
  const isNavItemActive = (item) =>
    isCombinedTuition(item.id)
      ? activeSection === "admissions"
      : activeSection === item.id;

  return (
    <div className={`sticky top-[65px] md:top-[87px] z-[9990] ${styles.container}`}>
      <div className="max-w-stevens-content-max mx-auto px-2 md:px-stevens-md lg:px-stevens-lg">
        {/* Responsive grid: 4 cols on mobile (3 tabs + More), 5 cols on desktop (4 tabs + More) */}
        <nav className="grid grid-cols-4 md:grid-cols-5 items-center">
          {/* First 4 tabs - 4th tab hidden on mobile */}
          {navItems.slice(0, 4).map((item, index) => {
            const href = getNavHref(item);
            const label = getNavLabel(item);
            const isActive = isNavItemActive(item);

            // Hide 4th tab (index 3) on mobile - it goes into More dropdown
            const isHiddenOnMobile = index === 3;

            return (
              <a
                key={item.id}
                href={href}
                className={`group relative py-4 md:py-5 text-center text-sm md:text-base lg:text-lg whitespace-nowrap transition-all duration-300 ${
                  isHiddenOnMobile ? "hidden md:block" : ""
                } ${isActive ? styles.textActive : styles.text}`}
              >
                {label}
                {/* Active indicator - underline */}
                <span
                  className={`absolute bottom-0 left-2 right-2 md:left-1/4 md:right-1/4 h-[3px] bg-stevens-red transition-all duration-300 ${
                    isActive
                      ? "opacity-100 scale-x-100"
                      : "opacity-0 scale-x-0 group-hover:opacity-50 group-hover:scale-x-100"
                  }`}
                />
              </a>
            );
          })}

          {/* "More" dropdown - last column */}
          {navItems.length > 4 && (
            <div className="relative flex justify-center" ref={moreMenuRef}>
              <button
                onClick={() => setMoreMenuOpen(!moreMenuOpen)}
                className={`flex items-center justify-center gap-1 md:gap-2 py-2 md:py-3 px-2 md:px-4 text-sm md:text-base lg:text-lg whitespace-nowrap transition-all duration-300 border-2 rounded-lg ${
                  moreMenuOpen ||
                  navItems
                    .slice(3) // Check from index 3 on mobile (4th tab + rest)
                    .some((item) => isNavItemActive(item))
                    ? styles.moreButtonActive
                    : styles.moreButton
                }`}
              >
                <MoreHorizontal className="w-4 h-4 md:w-5 md:h-5" />
                <span className="font-medium hidden sm:inline">More</span>
                <ChevronDown
                  className={`w-3 h-3 md:w-4 md:h-4 transition-transform duration-300 ${
                    moreMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu - includes 4th tab on mobile */}
              {moreMenuOpen && (
                <div className={`absolute top-full right-0 mt-2 rounded-xl shadow-2xl border py-2 md:py-3 min-w-[200px] md:min-w-[240px] z-[9999] animate-in fade-in slide-in-from-top-2 duration-200 ${styles.dropdown}`}>
                  {/* On mobile, include 4th tab (index 3) in dropdown */}
                  {navItems.slice(3).map((item, index) => {
                    const href = getNavHref(item);
                    const label = getNavLabel(item);
                    const isActive = isNavItemActive(item);

                    // First item (4th tab) should be hidden on desktop since it's visible in nav
                    const isHiddenOnDesktop = index === 0;

                    return (
                      <a
                        key={item.id}
                        href={href}
                        onClick={() => setMoreMenuOpen(false)}
                        className={`flex items-center gap-2 md:gap-3 px-4 md:px-5 py-2 md:py-3 text-sm md:text-base transition-all duration-200 border-l-4 ${
                          isHiddenOnDesktop ? "md:hidden" : ""
                        } ${isActive ? styles.dropdownItemActive : styles.dropdownItem}`}
                      >
                        {label}
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </nav>
      </div>
    </div>
  );
}
