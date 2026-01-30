import React from "react";
import { motion } from "framer-motion";

/**
 * LogoMarqueeSection - Auto-scrolling logo carousel with dark background
 *
 *
 * Features:
 * - Stevens black background (matches design system)
 * - Stevens typography (Saira display font)
 * - Infinite auto-scrolling logo carousel (marquee effect)
 * - Logos displayed in white/monochrome style
 * - Responsive design
 *
 * @param {Object} props
 * @param {string} props.heading - Main heading text (supports line breaks with \n)
 * @param {Array} props.logos - Array of logo objects with { name, logo, url? }
 * @param {string} props.bgColor - Background color class (default: stevens-black)
 * @param {number} props.animationDuration - Duration of one complete scroll cycle in seconds
 * @param {boolean} props.pauseOnHover - Whether to pause animation on hover
 * @param {boolean} props.invertLogos - Whether to invert logo colors to white (default: true)
 */
export default function LogoMarqueeSection({
  heading = "Trusted by industry leaders",
  logos = [],
  bgColor = "bg-stevens-black",
  animationDuration = 30,
  pauseOnHover = true,
  invertLogos = true,
}) {
  if (!logos || logos.length === 0) {
    return null;
  }

  // Duplicate logos array to create seamless infinite scroll
  const duplicatedLogos = [...logos, ...logos, ...logos];

  return (
    <section className={`${bgColor} py-16 md:py-20 lg:py-24 overflow-hidden`}>
      <div className="max-w-stevens-content-max mx-auto px-stevens-md lg:px-stevens-lg mb-[60px] md:mb-[80px] lg:mb-[100px]">
        {/* Heading - Using Stevens display font */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="font-stevens-display text-stevens-white text-stevens-xl md:text-stevens-3xl lg:text-stevens-4xl font-light italic text-center mb-stevens-xl md:mb-stevens-2xl lg:mb-stevens-3xl leading-tight tracking-wide"
        >
          {heading.split("\n").map((line, index) => (
            <span key={index}>
              {line}
              {index < heading.split("\n").length - 1 && <br />}
            </span>
          ))}
        </motion.h2>
      </div>

      {/* Logo Marquee Container */}
      <div className="relative w-full">
        {/* Gradient fade on left edge - matches stevens-black */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 lg:w-32 bg-gradient-to-r from-stevens-black to-transparent z-10 pointer-events-none" />

        {/* Gradient fade on right edge - matches stevens-black */}
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 lg:w-32 bg-gradient-to-l from-stevens-black to-transparent z-10 pointer-events-none" />

        {/* Scrolling logos container */}
        <div
          className={`flex items-center ${
            pauseOnHover ? "hover:[animation-play-state:paused]" : ""
          }`}
          style={{
            animation: `marquee ${animationDuration}s linear infinite`,
          }}
        >
          {duplicatedLogos.map((logo, index) => {
            const logoName = typeof logo === "string" ? logo : logo.name;
            const logoSrc = typeof logo === "object" ? logo.logo : null;
            const logoUrl = typeof logo === "object" ? logo.url : null;

            const LogoContent = (
              <div className="flex-shrink-0 mx-stevens-lg md:mx-stevens-xl lg:mx-stevens-2xl transition-all duration-stevens-normal">
                {logoSrc ? (
                  <img
                    src={logoSrc}
                    alt={`${logoName} logo`}
                    className={`h-8 md:h-10 lg:h-12 w-auto object-contain ${
                      invertLogos ? "brightness-0 invert" : ""
                    } opacity-80 hover:opacity-100 transition-opacity duration-stevens-normal`}
                    loading="lazy"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                ) : (
                  <span className="text-stevens-white/80 text-stevens-sm md:text-stevens-base font-stevens-body font-medium whitespace-nowrap">
                    {logoName}
                  </span>
                )}
              </div>
            );

            return logoUrl ? (
              <a
                key={`${logoName}-${index}`}
                href={logoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0"
              >
                {LogoContent}
              </a>
            ) : (
              <div key={`${logoName}-${index}`} className="flex-shrink-0">
                {LogoContent}
              </div>
            );
          })}
        </div>
      </div>

      {/* CSS Animation Keyframes */}
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
      `}</style>
    </section>
  );
}

/**
 * Alternative variant with two-row logos (for many logos)
 * Styled to match Stevens design system (CPE Brand Guidelines 2025)
 */
export function LogoMarqueeSectionDouble({
  heading = "Trusted by industry leaders",
  logosRow1 = [],
  logosRow2 = [],
  bgColor = "bg-stevens-black",
  animationDuration = 30,
  pauseOnHover = true,
  invertLogos = true,
}) {
  const duplicatedLogosRow1 = [...logosRow1, ...logosRow1, ...logosRow1];
  const duplicatedLogosRow2 = [...logosRow2, ...logosRow2, ...logosRow2];

  const renderLogoRow = (logos, reverse = false) => (
    <div
      className={`flex items-center ${
        pauseOnHover ? "hover:[animation-play-state:paused]" : ""
      }`}
      style={{
        animation: `${
          reverse ? "marquee-reverse" : "marquee"
        } ${animationDuration}s linear infinite`,
      }}
    >
      {logos.map((logo, index) => {
        const logoName = typeof logo === "string" ? logo : logo.name;
        const logoSrc = typeof logo === "object" ? logo.logo : null;

        return (
          <div
            key={`${logoName}-${index}`}
            className="flex-shrink-0 mx-stevens-lg md:mx-stevens-xl lg:mx-stevens-2xl"
          >
            {logoSrc ? (
              <img
                src={logoSrc}
                alt={`${logoName} logo`}
                className={`h-8 md:h-10 lg:h-12 w-auto object-contain ${
                  invertLogos ? "brightness-0 invert" : ""
                } opacity-80 hover:opacity-100 transition-opacity duration-stevens-normal`}
                loading="lazy"
              />
            ) : (
              <span className="text-stevens-white/80 text-stevens-sm md:text-stevens-base font-stevens-body font-medium whitespace-nowrap">
                {logoName}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <section className={`${bgColor} py-16 md:py-20 lg:py-24 overflow-hidden`}>
      <div className="max-w-stevens-content-max mx-auto px-stevens-md lg:px-stevens-lg">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="font-stevens-display text-stevens-white text-stevens-2xl md:text-stevens-3xl lg:text-stevens-4xl font-light italic text-center mb-stevens-xl md:mb-stevens-2xl lg:mb-stevens-3xl leading-tight tracking-wide"
        >
          {heading}
        </motion.h2>
      </div>

      <div className="relative w-full space-y-stevens-lg md:space-y-stevens-xl">
        {/* Gradient fades - matches stevens-black */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 lg:w-32 bg-gradient-to-r from-stevens-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 lg:w-32 bg-gradient-to-l from-stevens-black to-transparent z-10 pointer-events-none" />

        {/* Row 1 - scrolls left */}
        {renderLogoRow(duplicatedLogosRow1, false)}

        {/* Row 2 - scrolls right (reverse) */}
        {renderLogoRow(duplicatedLogosRow2, true)}
      </div>

      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        @keyframes marquee-reverse {
          0% {
            transform: translateX(-33.333%);
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
}
