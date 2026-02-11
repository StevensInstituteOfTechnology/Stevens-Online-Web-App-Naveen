import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Asterism from "../brand/Asterism";
import ContactOptionsModal from "../modals/ContactOptionsModal";

/**
 * Calculate clip-path for diagonal cut with fixed angle
 * @param {number} aspectRatio - Container's width/height ratio
 * @param {number} angle - Angle in degrees (default 25)
 * @returns {string} - CSS clip-path polygon value
 */
const calculateDiagonalClipPath = (aspectRatio, angle = 25) => {
  const tanAngle = Math.tan((angle * Math.PI) / 180);
  // For our diagonal: bottom-left at 100%, bottom-right cut up
  // offset% = aspectRatio × tan(angle) × 100
  const offset = Math.min(aspectRatio * tanAngle * 100, 50); // cap at 50%

  // polygon: top-left, top-right, bottom-right (cut up), bottom-left (full)
  return `polygon(0 0, 100% 0, 100% ${100 - offset}%, 0 100%)`;
};

/**
 * PromotionalCard - Dark promotional card with diagonal cut and background image
 *
 * Design: CPE Brand Guidelines
 * Features:
 * - Full card layout with bottom image
 * - Dark gray content area with diagonal cut (clip-path) overlaying the image
 * - Fixed angle that doesn't change on resize
 * - Asterism lines on right side
 * - Supports Quick Facts data display
 *
 * @param {Object} quickFacts - Quick facts data (optional, replaces title/description)
 * @param {string} quickFacts.termStart - Term start info
 * @param {string} quickFacts.tuition - Tuition info
 * @param {string} quickFacts.applyUrl - Apply URL
 * @param {string} title - Fallback title (used when no quickFacts)
 * @param {string} description - Fallback description (used when no quickFacts)
 * @param {string} ctaText - CTA button text
 * @param {string} ctaLink - CTA button link
 * @param {string} image - Background image URL
 * @param {string} imageAlt - Alt text for image
 * @param {number} angle - Diagonal cut angle in degrees (default: 25)
 * @param {string} sourcePage - Source page identifier for tracking (default: 'promotional_card')
 * @param {Object} applyButton - Optional apply button config (overrides "Schedule a Call" in quickFacts mode)
 * @param {string} applyButton.text - Button text (default: "APPLY NOW")
 * @param {string} applyButton.link - Button link (e.g., "/accelerated-application/?program=mscs")
 */
export function PromotionalCard({
  quickFacts,
  title = "Lorem Ipsumolis",
  description = "In egestas ligula sit libero, id facilisis nunc luctus mol.",
  ctaText = "APPLY NOW",
  ctaLink = "#",
  image = "/assets/images/shared/lab.png",
  imageAlt = "Student",
  angle = 25,
  sourcePage = "promotional_card",
  applyButton = null,
}) {
  // Ref on OUTER container for more stable aspect ratio calculation
  const containerRef = useRef(null);
  const [clipPath, setClipPath] = useState(
    "polygon(0 0, 100% 0, 100% 65%, 0 100%)"
  );
  const [showContactModal, setShowContactModal] = useState(false);

  // ResizeObserver to detect actual aspect ratio and calculate clip-path
  // Using outer container ensures width AND height change proportionally
  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const updateClipPath = () => {
      const rect = element.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        const aspectRatio = rect.width / rect.height;
        setClipPath(calculateDiagonalClipPath(aspectRatio, angle));
      }
    };

    const observer = new ResizeObserver(updateClipPath);
    observer.observe(element);

    // Initial measurement
    updateClipPath();

    return () => observer.disconnect();
  }, [angle]);

  // Determine if we're using Quick Facts mode
  const hasQuickFacts =
    quickFacts && (quickFacts.termStart || quickFacts.tuition);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden rounded-sm shadow-xl bg-stevens-dark-gray"
    >
      {/* 1. Background Image Layer (fixed at bottom of container) */}
      <div className="absolute bottom-0 left-0 right-0 z-0">
        <img
          src={image}
          alt={imageAlt}
          className="w-full h-80 md:h-64 object-cover object-top"
          loading="lazy"
        />
      </div>

      {/* 2. Dark Content Layer (with dynamic clip-path diagonal cut) */}
      <div className="relative z-10">
        <div
          className="bg-stevens-dark-gray pt-10 pb-24 px-8 md:px-10 pr-20 md:pr-28"
          style={{ clipPath }}
        >
          {/* Content Container */}
          <div className="relative w-[120%] z-20">
            {hasQuickFacts ? (
              /* Quick Facts Layout */
              <>
                {/* Card Title */}
                <h3 className="font-stevens-headers font-bold text-xl text-white uppercase tracking-[0.15em] mb-5">
                  Quick Facts
                </h3>

                {/* Divider */}
                <div className="w-full h-px bg-white/20 mb-6" />

                {/* Term Start */}
                {quickFacts.termStart && (
                  <div className="mb-5">
                    <p className="text-xl uppercase tracking-wider text-stevens-red font-bold mb-1 ">
                      Upcoming Start
                    </p>
                    <p className="font-stevens-display text-2xl md:text-3xl font-light text-stevens-light-gray">
                      {quickFacts.termStart}
                    </p>
                  </div>
                )}

                {/* CTA Button - Apply Now link if applyButton provided, else Schedule a Call */}
                {applyButton ? (
                  <Link
                    to={applyButton.link}
                    className="inline-flex items-center gap-3 text-white text-md font-bold uppercase tracking-wider hover:text-stevens-red transition-colors group/btn"
                  >
                    {applyButton.text || "APPLY NOW"}
                    <span className="text-xl group-hover/btn:translate-x-1 transition-transform">
                      ▶
                    </span>
                  </Link>
                ) : (
                  <button
                    onClick={() => setShowContactModal(true)}
                    className="inline-flex items-center gap-3 text-white text-md font-bold uppercase tracking-wider hover:text-stevens-red transition-colors group/btn"
                  >
                    Schedule a Call
                    <span className="text-xl group-hover/btn:translate-x-1 transition-transform">
                      ▶
                    </span>
                  </button>
                )}
              </>
            ) : (
              /* Default Title/Description Layout */
              <>
                {/* Title - Italic serif */}
                <h3 className="font-stevens-display text-4xl md:text-5xl font-light italic text-white leading-[1.1] mb-5">
                  {title}
                </h3>

                {/* Description */}
                <p className="text-stevens-gray text-base md:text-lg leading-relaxed mb-10 max-w-sm font-light">
                  {description}
                </p>

                {/* CTA Button */}
                <a
                  href={ctaLink}
                  className="inline-flex items-center gap-3 text-white text-sm font-bold uppercase tracking-wider hover:text-stevens-red transition-colors group/btn"
                >
                  {ctaText}
                  <span className="text-xl group-hover/btn:translate-x-1 transition-transform">
                    ▶
                  </span>
                </a>
              </>
            )}
          </div>

          {/* Asterism - Right Aligned (hidden on mobile < 768px) */}
          <div className="hidden md:block">
            <Asterism
              centerX="85%"
              centerY="72%"
              rays={2}
              angles={[155, 90]}
              color="stevens-white"
              opacity={0.4}
              rayLengths={[100, "full"]}
              fadeRays={[0, 1]}
              fadeDirection="out"
              fadeOpacity={0}
              length="full"
              minLength={100}
              maxLength={800}
              animate={true}
              animationType="radiate"
              animationDuration={1500}
              animationDelay={300}
              staggerDelay={100}
              className="z-0 pointer-events-none"
            />
          </div>
        </div>
      </div>

      {/* 3. Spacer for Image Visibility */}
      {/* This ensures the card has enough height to show the image below the diagonal cut */}
      <div className="relative z-0 h-[150px] md:h-28 pointer-events-none" />

      {/* Contact Options Modal */}
      <ContactOptionsModal
        open={showContactModal}
        onOpenChange={setShowContactModal}
        sourcePage={sourcePage}
      />
    </div>
  );
}

export default PromotionalCard;
