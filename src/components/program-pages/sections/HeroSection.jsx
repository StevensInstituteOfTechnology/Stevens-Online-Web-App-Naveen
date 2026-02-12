import { Badge } from "@/components/ui/badge";
import { getHeroImageProps } from "@/utils/responsiveImage";
import LeadCaptureForm from "@/components/forms/LeadCaptureForm";

/**
 * HeroSection - Split-layout hero for Program and Certificate pages
 *
 * Layout:
 * - Desktop (xl+): Left-right split (60% image+text / 40% form)
 * - Mobile (< xl): Three-layer stack (image → text → form)
 *
 * IMPORTANT: Only ONE LeadCaptureForm is rendered to avoid duplicate HTML IDs.
 * The layout uses CSS flexbox order to position elements differently per breakpoint.
 *
 * Props:
 * - programCode: Program code for tracking
 * - title: Main title (string or array of lines)
 * - subtitle: Subtitle text below title (optional)
 * - badges: Array of { text, icon } for trust badges
 * - tuitionCards: Array of { value, label } for pricing display (optional)
 * - bgImage: Background image URL
 * - bgImagePosition: CSS object-position (default: "center center")
 * - formTitle: Title for the form card
 * - formSubtitle: Subtitle for the form card
 * - sourcePage: Source page for analytics tracking
 * - variant: "degree" | "certificate" - affects styling
 * - theme: "light" | "dark" - theme for the form and nav (default: "light")
 */
export function HeroSection({
  programCode,
  title,
  subtitle,
  badges = [],
  tuitionCards = [],
  bgImage,
  bgImagePosition = "center center",
  formTitle = "Request Information",
  formSubtitle = "Get detailed program information and connect with an enrollment advisor.",
  sourcePage,
  variant: _variant = "degree",
  theme = "light",
}) {
  // Convert title to array if string
  const titleLines = Array.isArray(title) ? title : [title];

  // Determine source page for tracking
  const effectiveSourcePage = sourcePage || `${programCode}_program_page`;

  // Theme-based styles
  const isDarkForm = theme === "dark";

  // Form area styles (based on theme)
  const formAreaStyles = {
    container: isDarkForm ? "bg-stevens-black" : "bg-white",
    title: isDarkForm ? "text-white" : "text-stevens-black",
    subtitle: isDarkForm ? "text-gray-400" : "text-gray-600",
    divider: isDarkForm ? "bg-gray-700" : "bg-gray-300",
  };

  // Text area styles (OPPOSITE of theme for mobile)
  const textAreaStyles = {
    container: isDarkForm ? "bg-white" : "bg-stevens-black",
    title: isDarkForm ? "text-stevens-black" : "text-stevens-white",
    subtitle: isDarkForm ? "text-stevens-gray-600" : "text-white/80",
    badge: isDarkForm
      ? "text-stevens-black border-stevens-black/60 bg-stevens-black/10"
      : "text-white border-white/60 bg-white/20 backdrop-blur-md",
  };

  // Shared badge rendering for mobile text section
  const renderMobileBadges = () =>
    badges.length > 0 && (
      <div className="flex flex-wrap items-center gap-stevens-sm mb-stevens-md">
        {badges.map((badge, index) => {
          const Icon = badge.icon;
          return (
            <Badge
              key={index}
              variant="outline"
              className={`${textAreaStyles.badge} text-sm py-1.5 px-4 rounded-stevens-md cursor-default uppercase tracking-wide font-semibold transition-all duration-300 hover:scale-105`}
            >
              {Icon && <Icon className="w-4 h-4 mr-2" />}
              <span>{badge.text}</span>
            </Badge>
          );
        })}
      </div>
    );

  // Shared badge rendering for desktop
  const renderDesktopBadges = () =>
    badges.length > 0 && (
      <div className="flex flex-wrap items-center gap-stevens-sm mb-stevens-md">
        {badges.map((badge, index) => {
          const Icon = badge.icon;
          return (
            <Badge
              key={index}
              variant="outline"
              className="text-white border-white/60 bg-white/20 backdrop-blur-md text-sm py-1.5 px-4 rounded-stevens-md cursor-default uppercase tracking-wide font-semibold transition-all duration-300 hover:bg-white/30 hover:border-white/80 hover:scale-105"
              style={{ textShadow: "0 1px 2px rgba(0, 0, 0, 0.5)" }}
            >
              {Icon && <Icon className="w-4 h-4 mr-2" />}
              <span>{badge.text}</span>
            </Badge>
          );
        })}
      </div>
    );

  // Desktop tuition cards rendering (frosted glass style on image)
  const renderDesktopTuitionCards = () =>
    tuitionCards.length > 0 && (
      <div className="flex flex-wrap gap-8 mb-stevens-md">
        {tuitionCards.map((card, index) => (
          <div
            key={index}
            className="bg-white/20 backdrop-blur-lg border border-white/60 rounded-stevens-md px-5 py-3 text-center transition-all duration-300 hover:bg-white/30 hover:border-white/80 hover:scale-105 cursor-default"
          >
            <div
              className="text-2xl xl:text-3xl font-bold text-white"
              style={{ textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)" }}
            >
              {card.value}
            </div>
            <div
              className="text-sm text-white/90 mt-0.5 uppercase tracking-wide font-semibold"
              style={{ textShadow: "0 1px 2px rgba(0, 0, 0, 0.5)" }}
            >
              {card.label}
            </div>
          </div>
        ))}
      </div>
    );

  // Mobile tuition cards rendering (solid background for better contrast)
  const renderMobileTuitionCards = () =>
    tuitionCards.length > 0 && (
      <div className="flex flex-wrap gap-6 mb-stevens-md">
        {tuitionCards.map((card, index) => (
          <div
            key={index}
            className={`${
              isDarkForm
                ? "bg-stevens-black text-white border-stevens-black"
                : "bg-stevens-black text-white border-stevens-black"
            } border-2 rounded-stevens-md px-5 py-3 text-center transition-all duration-300 hover:scale-105 cursor-default shadow-lg`}
          >
            <div className="text-2xl sm:text-3xl font-bold">{card.value}</div>
            <div className="text-xs sm:text-sm mt-0.5 uppercase tracking-wide font-semibold opacity-90">
              {card.label}
            </div>
          </div>
        ))}
      </div>
    );

  return (
    <section className="relative overflow-hidden">
      {/* Main flex container - column on mobile, row on desktop */}
      <div className="flex flex-col xl:flex-row xl:min-h-[calc(100vh-155px)]">
        {/* ==================== IMAGE SECTION ==================== */}
        {/* Mobile: order-1, full width, 40vh height */}
        {/* Desktop: order-1, 60% width, full height with text overlay */}
        <div className="order-1 relative h-[40vh] min-h-[200px] xl:h-auto xl:w-[60%] bg-stevens-black">
          {/* Background Image */}
          {bgImage && (
            <img
              {...getHeroImageProps(bgImage)}
              alt=""
              aria-hidden="true"
              fetchPriority="high"
              loading="eager"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover xl:opacity-80"
              style={{ objectPosition: bgImagePosition }}
            />
          )}

          {/* Desktop-only: Gradient Overlay */}
          <div className="hidden xl:block absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-stevens-black/90 via-stevens-black/60 to-transparent" />

          {/* Desktop-only: Text Content at bottom */}
          <div className="hidden xl:flex relative h-full flex-col justify-end px-stevens-2xl py-stevens-2xl text-stevens-white">
            <div className="animate-in slide-in-from-left duration-700">
              {renderDesktopBadges()}

              {/* Tuition Cards (Desktop) - Above title */}
              {renderDesktopTuitionCards()}

              {/* Title */}
              <div className="space-y-1">
                {titleLines.map((line, idx) => (
                  <h1
                    key={idx}
                    className="font-stevens-headers font-bold leading-tight text-[2.75rem] xl:text-5xl"
                    style={{ textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)" }}
                  >
                    {line}
                  </h1>
                ))}
              </div>

              {/* Subtitle */}
              {subtitle && (
                <p
                  className="mt-stevens-md text-xl xl:text-2xl text-white/80"
                  style={{ textShadow: "0 1px 3px rgba(0, 0, 0, 0.5)" }}
                >
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ==================== MOBILE TEXT SECTION ==================== */}
        {/* Mobile: order-2, shows below image */}
        {/* Desktop: hidden */}
        <div
          className={`order-2 xl:hidden ${textAreaStyles.container} px-stevens-md py-stevens-lg`}
        >
          <div className="animate-in slide-in-from-bottom duration-500">
            {renderMobileBadges()}

            {/* Tuition Cards (Mobile) - Above title with solid background */}
            {renderMobileTuitionCards()}

            {/* Title */}
            <div className="space-y-1">
              {titleLines.map((line, idx) => (
                <h1
                  key={idx}
                  className={`font-stevens-headers font-bold leading-tight text-2xl sm:text-3xl ${textAreaStyles.title}`}
                >
                  {line}
                </h1>
              ))}
            </div>

            {/* Subtitle */}
            {subtitle && (
              <p
                className={`mt-stevens-sm text-lg sm:text-xl ${textAreaStyles.subtitle}`}
              >
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* ==================== FORM SECTION (SINGLE INSTANCE) ==================== */}
        {/* Mobile: order-3, full width */}
        {/* Desktop: order-2, 40% width, appears on right */}
        <div
          className={`order-3 xl:order-2 xl:w-[40%] ${formAreaStyles.container} flex items-center justify-center px-stevens-md xl:px-stevens-xl py-stevens-lg xl:py-stevens-2xl`}
        >
          <div className="w-full max-w-md mx-auto xl:mx-0 animate-in slide-in-from-bottom xl:slide-in-from-right duration-700">
            {/* Form Header */}
            <div className="text-center mb-stevens-md xl:mb-stevens-lg">
              <h2
                className={`text-stevens-2xl xl:text-stevens-4xl font-stevens-headers font-bold ${formAreaStyles.title} mb-1 xl:mb-2`}
              >
                {formTitle}
              </h2>
              <p
                className={`text-stevens-sm xl:text-stevens-base ${formAreaStyles.subtitle}`}
              >
                {formSubtitle}
              </p>
            </div>

            {/* Divider */}
            <div
              className={`w-full h-px ${formAreaStyles.divider} mb-stevens-md xl:mb-stevens-lg`}
            />

            {/* SINGLE Lead Capture Form Instance */}

            <LeadCaptureForm
              sourcePage={effectiveSourcePage}
              programOfInterest={programCode}
              hideHeader={true}
              theme={theme}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
