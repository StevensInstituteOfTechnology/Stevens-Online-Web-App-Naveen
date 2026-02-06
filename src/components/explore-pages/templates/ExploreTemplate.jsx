/**
 * ExploreTemplate - Marketing/Landing Page Template
 *
 * Used for Explore pages (ExploreMBA, ExploreMSCS, etc.)
 * These are simplified, marketing-focused versions of the main program pages.
 */
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ChevronDown,
  Check,
  Award,
  Globe,
  Star,
  Target,
  Clock,
  Network,
  ThumbsUp,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  ApplicationModal,
  VideoPlayer,
  PromotionalCard,
} from "@/components/shared";
import { HeroSection } from "../sections";
import { DeadlinesSection } from "@/components/shared/sections/DeadlinesSection";
import {
  setPageTitle,
  setMetaDescription,
  setOpenGraphTags,
  buildCanonicalUrl,
} from "@/utils";
import { trackConversion, CONVERSION_LABELS } from "@/utils/gtmTracking";
import { BOOKING_URLS } from "@/config/constants";
import { getContentImageProps } from "@/utils/responsiveImage";

export function ExploreTemplate({
  // Hero Section Props
  heroTitle,
  heroSubtitle,
  programName,
  bgImage,
  bgImagePosition = "center center",
  badges = [],
  tuitionCards = [],
  programCode = "",
  seo,
  secondaryCta,
  useApplicationModal = false,
  traditionalAppLink = "https://gradadmissions.stevens.edu/apply/?pk=GRNP",
  theme = "light", // Theme for the form and nav

  // Statistics Props
  statistics,

  // Program Benefits Props
  programBenefitsTitle,
  programBenefitsDescription,
  programBenefitsHighlights,
  programBenefitsImage = "/assets/images/shared/stevens-campus.webp",

  // Program Details Props
  programDetails,

  // Excellence Section Props
  excellenceSectionTitle,
  excellenceSectionItems,

  // Additional Why Choose Stevens Section Props
  additionalWhyChooseStevensTitle,
  additionalWhyChooseStevensSubtitle,
  additionalWhyChooseStevensContent,
  additionalWhyChooseStevensImage,

  // Concentrations Props
  concentrations,

  // Key Dates Props
  keyDates,
  keyDatesTerm = "SPRING 2026",
  keyDatesNote,

  // FAQ Props
  faqs,

  // Contact Props
  contactTitle,
  contactDescription,
  contactButtonText,

  // Additional Sections (optional)
  additionalSections = [],

  // Why Choose Stevens Section Props
  whyChooseStevensTitle = "WHY CHOOSE STEVENS",
  whyChooseStevensSubtitle = "CAREER-ALIGNED CURRICULUM",
  whyChooseStevensContent = "",
  whyChooseStevensVideo = "/assets/videos/Stevens Online Home - 1.mp4",
  whyChooseStevensVideoCover = "/assets/videos/video-cover-1.webp",

  // New Fall 2025 Section Props
  newFall2025Badge = "NEW FOR 2026",
  newFall2025Title,
  newFall2025Description = "",
  newFall2025Benefits = [],
  newFall2025Image,

  // Just Launched Section Props
  justLaunchedBadge = "JUST LAUNCHED",
  justLaunchedTitle = "",
  justLaunchedDescription = "",
  justLaunchedButtonText = "",
  justLaunchedButtonLink = "#",
  justLaunchedImage = "/assets/images/shared/stevens-campus.webp",

  // Promotional Card (right after hero; default built from keyDatesTerm + tuitionCards)
  promotionalCard = null,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Derive apply link from secondaryCta or default based on program
  const getApplyLink = () => {
    // MEM uses ASAP pathway
    if (programCode === "mem") return `/asap/?program=mem`;
    // Use secondaryCta if available (internal link)
    if (secondaryCta?.href?.startsWith("/"))
      return `${secondaryCta.href}?program=${programCode}`;
    if (secondaryCta?.to) return `/${secondaryCta.to}/?program=${programCode}`;
    // Default to accelerated-application
    return `/accelerated-application/?program=${programCode}`;
  };

  // Get the start date from keyDates (e.g., "May 19" from "May 19, 2026")
  const getStartDate = () => {
    const startEntry = keyDates?.find(
      (d) => d.label === "Start of Classes" || d.label === "Classes Start"
    );
    if (startEntry?.date) {
      // Extract just "May 19" from "May 19, 2026"
      return startEntry.date.split(",")[0];
    }
    return null;
  };

  // Format termStart with date like "Summer 2026: May 19"
  const formatTermStart = () => {
    const term = keyDatesTerm ?? "Upcoming Term";
    const startDate = getStartDate();
    return startDate ? `${term}: ${startDate}` : term;
  };

  // Default promotional card from template data so every explore page shows the card
  const effectivePromotionalCard = promotionalCard ?? {
    quickFacts: {
      termStart: formatTermStart(),
      tuition:
        tuitionCards?.[0] != null
          ? `${tuitionCards[0].value} ${tuitionCards[0].label}`
          : undefined,
    },
    applyButton: {
      text: "APPLY NOW",
      link: getApplyLink(),
    },
    image: "/assets/images/shared/lab.webp",
    imageAlt: "",
    sourcePage: `explore_${programCode}_promotional`,
  };

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
        : buildCanonicalUrl("/assets/images/shared/stevens-campus.webp"),
      url: buildCanonicalUrl(seo.url),
      type: "website",
    });

    return () => {
      setPageTitle("Stevens Online");
    };
  }, [seo]);

  // Handle collapsible course toggles (for concentrations)
  // Using event delegation for reliable click handling regardless of DOM changes
  useEffect(() => {
    const handleCourseToggle = (e) => {
      // Use event delegation - check if clicked element is or is inside a .course-toggle
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

    // Single event listener on document using event delegation
    document.addEventListener("click", handleCourseToggle);

    return () => {
      document.removeEventListener("click", handleCourseToggle);
    };
  }, []);

  return (
    <div className="min-h-screen bg-stevens-white">
      {/* HeroSection Component */}
      <HeroSection
        programCode={programCode}
        sourcePage={`explore_${programCode}_page`}
        title={[heroTitle, programName]}
        subtitle={heroSubtitle}
        badges={badges}
        tuitionCards={tuitionCards}
        bgImage={bgImage}
        bgImagePosition={bgImagePosition}
        formTitle="Request Information"
        formSubtitle="Get detailed program information and connect with an enrollment advisor."
        variant="degree"
        theme={theme}
      />

      {/* Promotional Card - right after hero (shown on every explore page) */}
      <section className="px-stevens-md py-stevens-xl bg-stevens-white">
        <div className="max-w-7xl mx-auto">
          <PromotionalCard
            quickFacts={effectivePromotionalCard.quickFacts}
            title={effectivePromotionalCard.title}
            description={effectivePromotionalCard.description}
            ctaText={effectivePromotionalCard.ctaText}
            ctaLink={effectivePromotionalCard.ctaLink}
            image={effectivePromotionalCard.image}
            imageAlt={effectivePromotionalCard.imageAlt ?? ""}
            sourcePage={effectivePromotionalCard.sourcePage}
            applyButton={effectivePromotionalCard.applyButton}
          />
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-stevens-3xl bg-stevens-white">
        <div className="max-w-7xl mx-auto px-stevens-md">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-stevens-lg">
            {statistics.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <h3 className="font-stevens-headers text-stevens-4xl text-stevens-black font-light mb-stevens-sm">
                  {stat.number}
                </h3>
                <h4 className="font-stevens-headers text-stevens-lg text-stevens-dark-gray mb-stevens-sm">
                  {stat.label}
                </h4>
                <p className="font-stevens-body text-stevens-sm text-stevens-dark-gray">
                  {stat.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Stevens Section */}
      <section className="py-stevens-3xl bg-stevens-white">
        <div className="max-w-7xl mx-auto px-stevens-md">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div
              className={`grid grid-cols-1 ${
                whyChooseStevensVideo ? "lg:grid-cols-2" : "lg:grid-cols-1"
              } gap-stevens-2xl items-center`}
            >
              {/* Left Column - Text Content on Desktop, Video on Mobile */}
              <div className="space-y-stevens-lg lg:order-1 order-2">
                <h2 className="font-stevens-headers text-stevens-lg text-stevens-dark-gray uppercase tracking-wide">
                  {whyChooseStevensTitle}
                </h2>

                <h3 className="font-stevens-headers text-stevens-3xl stevens-md:text-stevens-4xl text-stevens-dark-gray font-light uppercase tracking-wide">
                  {whyChooseStevensSubtitle}
                </h3>

                <div className="prose prose-lg max-w-none text-stevens-dark-gray">
                  <div
                    className="font-stevens-body text-stevens-lg leading-relaxed space-y-stevens-lg"
                    dangerouslySetInnerHTML={{
                      __html: whyChooseStevensContent,
                    }}
                  />
                </div>
              </div>

              {/* Right Column - Video Player on Desktop, Text on Mobile */}
              {whyChooseStevensVideo && (
                <div className="relative lg:order-2 order-1">
                  <VideoPlayer
                    src={whyChooseStevensVideo}
                    poster={whyChooseStevensVideoCover}
                    title="Why Choose Stevens"
                    description="Learn about Stevens Institute of Technology's career-aligned curriculum"
                    className="w-full"
                    showControls={true}
                  />
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Program Benefits Section */}
      <section className="py-stevens-3xl bg-stevens-white">
        <div className="max-w-7xl mx-auto px-stevens-md">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-stevens-2xl items-center">
              {/* Left Column - Image on Desktop, Text on Mobile */}
              <div className="relative lg:order-1 order-2">
                <div className=" max-h-[400px] rounded-stevens-lg overflow-hidden shadow-stevens-xl">
                  <img
                    {...getContentImageProps(programBenefitsImage, "800px")}
                    alt={`${
                      programBenefitsTitle || "Program Benefits"
                    } illustration`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Right Column - Text Content on Desktop, Image on Mobile */}
              <div className="space-y-stevens-lg lg:order-2 order-1">
                <h2 className="font-stevens-headers text-stevens-3xl stevens-md:text-stevens-4xl text-stevens-dark-gray font-light uppercase tracking-wide">
                  <span className="inline-block bg-stevens-black text-stevens-white px-stevens-md py-stevens-sm rounded-stevens-sm">
                    {programBenefitsTitle}
                  </span>
                </h2>

                <div className="prose prose-lg max-w-none text-stevens-dark-gray">
                  <div
                    className="font-stevens-body text-stevens-lg leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: programBenefitsDescription,
                    }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Program Benefits Highlights Section */}
      <section className="py-stevens-3xl bg-stevens-light-gray">
        <div className="max-w-7xl mx-auto px-stevens-md">
          {programBenefitsHighlights && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-stevens-lg">
              {programBenefitsHighlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-stevens-light-gray p-stevens-lg rounded-stevens-md"
                >
                  <h3 className="font-stevens-headers text-stevens-xl text-stevens-black font-light mb-stevens-md">
                    {highlight.title}
                  </h3>
                  <p className=" text-stevens-dark-gray">
                    {highlight.description}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Program Details Section */}
      <section className="py-stevens-3xl bg-stevens-white">
        <div className="max-w-7xl mx-auto px-stevens-md">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-stevens-lg">
            {programDetails.map((detail, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <h3 className="font-stevens-headers text-stevens-3xl text-stevens-black font-light mb-stevens-sm">
                  {detail.value}
                </h3>
                <p className="font-stevens-body text-stevens-lg text-stevens-dark-gray">
                  {detail.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Excellence Section */}
      {excellenceSectionItems && excellenceSectionItems.length > 0 && (
        <section className="py-stevens-3xl bg-stevens-light-gray">
          <div className="max-w-7xl mx-auto px-stevens-md">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-stevens-xl">
                {excellenceSectionItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="text-left"
                  >
                    <div className="flex items-center gap-stevens-md mb-stevens-md">
                      <div className="w-12 h-12 bg-stevens-black rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="w-6 h-6 text-stevens-white" />
                      </div>
                      <h3 className="font-stevens-headers text-stevens-lg text-stevens-dark-gray font-light uppercase tracking-wide">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-stevens-dark-gray text-stevens-sm leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* New Fall 2025 Section */}
      {newFall2025Title && (
        <section className="py-stevens-3xl bg-stevens-dark-gray text-stevens-white">
          <div className="max-w-7xl mx-auto px-stevens-md">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-stevens-2xl items-center">
                {/* Left Column - Text Content */}
                <div className="space-y-stevens-lg">
                  {/* Red Badge */}
                  <div className="inline-block">
                    <span className="bg-stevens-white text-stevens-black px-stevens-md py-stevens-sm text-stevens-sm font-semibold uppercase tracking-wide rounded-stevens-sm">
                      {newFall2025Badge}
                    </span>
                  </div>

                  {/* Main Title */}
                  <h2 className="font-stevens-headers text-stevens-3xl stevens-md:text-stevens-4xl text-stevens-white font-light uppercase tracking-wide leading-tight">
                    {newFall2025Title}
                  </h2>

                  {/* Description */}
                  <div className="prose prose-lg max-w-none text-stevens-white">
                    <div
                      className="text-stevens-lg leading-relaxed space-y-stevens-lg"
                      dangerouslySetInnerHTML={{
                        __html: newFall2025Description,
                      }}
                    />
                  </div>

                  {/* Benefits List */}
                  {newFall2025Benefits.length > 0 && (
                    <div className="space-y-stevens-md">
                      {newFall2025Benefits.map((benefit, index) => {
                        const IconComponent = benefit.icon || Globe;
                        return (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="flex items-start gap-stevens-md"
                          >
                            <div className="flex-shrink-0 w-8 h-8 bg-stevens-white rounded-full flex items-center justify-center">
                              <IconComponent className="w-4 h-4 text-stevens-black" />
                            </div>
                            <p className="font-stevens-body text-stevens-white text-stevens-sm font-stevens-medium uppercase tracking-wide">
                              {benefit.text}
                            </p>
                          </motion.div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Right Column - Image (Mobile/Tablet) */}

                <div className="relative w-full h-full hidden lg:block">
                  <div className="rounded-stevens-lg overflow-hidden shadow-stevens-xl">
                    <img
                      {...getContentImageProps(newFall2025Image, "800px")}
                      alt={`${newFall2025Title} illustration`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}
      {/* Just Launched Section */}
      {justLaunchedTitle && (
        <section className="py-stevens-3xl bg-stevens-white">
          <div className="max-w-7xl mx-auto px-stevens-md">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-stevens-2xl items-center">
                {/* Left Column - Text Content */}
                <div className="space-y-stevens-lg">
                  {/* Gold Badge */}
                  <div className="inline-block">
                    <span className="bg-stevens-black text-stevens-white px-stevens-md py-stevens-sm text-stevens-sm font-semibold uppercase tracking-wide rounded-stevens-sm">
                      {justLaunchedBadge}
                    </span>
                  </div>

                  {/* Main Title */}
                  <h2 className="font-stevens-headers text-stevens-3xl stevens-md:text-stevens-4xl text-stevens-dark-gray font-light uppercase tracking-wide leading-tight">
                    {justLaunchedTitle}
                  </h2>

                  {/* Description */}
                  <div className="prose prose-lg max-w-none text-stevens-dark-gray">
                    <div
                      className="font-stevens-body text-stevens-lg leading-relaxed space-y-stevens-lg"
                      dangerouslySetInnerHTML={{
                        __html: justLaunchedDescription,
                      }}
                    />
                  </div>

                  {/* CTA Button */}
                  {justLaunchedButtonText && (
                    <div className="pt-stevens-md">
                      <Button asChild variant="outline-dark" size="default">
                        <a href={justLaunchedButtonLink}>
                          {justLaunchedButtonText}
                        </a>
                      </Button>
                    </div>
                  )}
                </div>

                {/* Right Column - Image */}
                <div className="relative">
                  <div className=" max-h-[500px] rounded-stevens-lg overflow-hidden shadow-stevens-xl">
                    <img
                      {...getContentImageProps(justLaunchedImage, "800px")}
                      alt={`${justLaunchedTitle} illustration`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Concentrations Section */}
      {concentrations && concentrations.content && (
        <section className="py-stevens-3xl bg-stevens-white">
          <div className="max-w-6xl mx-auto px-stevens-md">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {concentrations.title && (
                <h2 className="font-stevens-headers text-stevens-3xl stevens-md:text-stevens-4xl text-stevens-dark-gray font-light uppercase tracking-wide mb-stevens-3xl text-center">
                  {concentrations.title}
                </h2>
              )}
              <div
                className="prose prose-stevens max-w-none [&_h4]:font-stevens-headers [&_h4]:text-stevens-2xl [&_h4]:stevens-md:text-stevens-3xl [&_h4]:font-stevens-bold [&_h4]:text-stevens-dark-gray [&_h4]:mb-stevens-lg [&_h4]:uppercase [&_h4]:tracking-tight [&_h5]:font-stevens-bold [&_h5]:text-stevens-xl [&_h5]:stevens-md:text-stevens-2xl [&_h5]:text-stevens-dark-gray [&_h5]:mb-stevens-lg [&_h5]:mt-stevens-2xl [&_p]:font-stevens-body [&_p]:text-stevens-dark-gray [&_p]:leading-relaxed [&_p]:mb-stevens-lg [&_.course-item]:mb-stevens-md [&_.course-toggle]:w-full [&_.course-toggle]:text-left [&_.course-toggle]:px-stevens-md [&_.course-toggle]:py-stevens-sm [&_.course-toggle]:bg-stevens-light-gray [&_.course-toggle]:border [&_.course-toggle]:border-stevens-light-gray [&_.course-toggle]:rounded-stevens-sm [&_.course-toggle]:font-stevens-bold [&_.course-toggle]:text-stevens-base [&_.course-toggle]:text-stevens-dark-gray [&_.course-toggle]:hover:bg-stevens-light-gray [&_.course-toggle]:transition-colors [&_.course-content]:px-stevens-md [&_.course-content]:py-stevens-md [&_.course-content]:bg-stevens-white [&_.course-content]:border-l-4 [&_.course-content]:border-stevens-black]"
                dangerouslySetInnerHTML={{ __html: concentrations.content }}
              />
            </motion.div>
          </div>
        </section>
      )}

      {/* Key Dates Section - Using shared DeadlinesSection component */}
      {keyDates && keyDates.length > 0 && (
        <DeadlinesSection
          keyDates={{
            term: keyDatesTerm,
            dates: keyDates,
            footnote: keyDatesNote,
          }}
        />
      )}

      {/* Additional Why Choose Stevens Section */}
      {additionalWhyChooseStevensTitle && (
        <section className="py-stevens-3xl bg-stevens-white">
          <div className="max-w-7xl mx-auto px-stevens-md">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-stevens-2xl items-center">
                {/* Left Column - Text Content */}
                <div className="space-y-stevens-lg">
                  <h2 className="font-stevens-headers text-stevens-lg text-stevens-dark-gray uppercase tracking-wide">
                    {additionalWhyChooseStevensSubtitle}
                  </h2>
                  <h3 className="font-stevens-headers text-stevens-3xl stevens-md:text-stevens-4xl text-stevens-dark-gray font-light uppercase tracking-wide">
                    {additionalWhyChooseStevensTitle}
                  </h3>
                  <div className="prose prose-lg max-w-none text-stevens-dark-gray">
                    <div
                      className="font-stevens-body text-stevens-lg leading-relaxed space-y-stevens-lg"
                      dangerouslySetInnerHTML={{
                        __html: additionalWhyChooseStevensContent,
                      }}
                    />
                  </div>
                </div>

                {/* Right Column - Image */}
                <div className="relative">
                  <div className="aspect-[4/3] rounded-stevens-lg overflow-hidden shadow-stevens-xl">
                    <img
                      {...getContentImageProps(
                        additionalWhyChooseStevensImage,
                        "800px"
                      )}
                      alt={`${additionalWhyChooseStevensTitle} illustration`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {faqs && faqs.length > 0 && (
        <section className="py-stevens-3xl bg-stevens-white">
          <div className="max-w-4xl mx-auto px-stevens-md">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-stevens-headers text-stevens-3xl text-stevens-dark-gray font-light mb-stevens-xl text-center">
                Frequently Asked Questions
              </h2>

              <Accordion
                type="single"
                collapsible
                className="w-full max-w-3xl mx-auto"
              >
                {faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`item-${i}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </section>
      )}

      {/* Additional Sections */}
      {additionalSections.map((section, index) => (
        <section
          key={index}
          className={section.className || "py-stevens-3xl bg-stevens-white"}
        >
          <div className="max-w-7xl mx-auto px-stevens-md">
            {section.content}
          </div>
        </section>
      ))}

      {/* Contact Section */}
      <section className="py-stevens-3xl bg-stevens-black text-stevens-white">
        <div className="max-w-4xl mx-auto px-stevens-md text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-stevens-headers text-stevens-3xl font-light mb-stevens-lg">
              {contactTitle}
            </h2>
            <p className="font-stevens-body text-stevens-lg mb-stevens-xl">
              {contactDescription}
            </p>
            <Button asChild variant="outline-white" size="default">
              <a
                href={BOOKING_URLS.SCHEDULE_CALL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackConversion(CONVERSION_LABELS.REQUEST_INFO)}
              >
                {contactButtonText}
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Application Modal */}
      <ApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        traditionalLink={traditionalAppLink}
      />
    </div>
  );
}

// Backward compatible alias
export default ExploreTemplate;
