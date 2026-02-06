import React, { forwardRef } from "react";
import { Section } from "../primitives";
import { getContentImageProps } from "@/utils/responsiveImage";

/**
 * AccreditationSection - Accreditation statement with dark background
 *
 * Design: CPE Brand Guidelines - Dark gray background with image overlay
 * Features:
 * - Background image with opacity overlay
 * - Supports string or object accreditation data
 * - Full-width dark section for visual contrast
 *
 * Used in: Both Degree and Certificate pages (typically at bottom)
 *
 * @param {string|Object} accreditation - Accreditation content
 * @param {string} accreditation.description - Description text (if object)
 * @param {string} accreditation.text - Alternative text field (if object)
 */
export const AccreditationSection = forwardRef(function AccreditationSection(
  { accreditation },
  ref
) {
  if (!accreditation) return null;

  return (
    <Section
      id="accreditation"
      container={false}
      el="div"
      paddingClassName="pt-stevens-section-sm lg:pt-stevens-section"
      ref={ref}
    >
      <div className="relative bg-stevens-dark-gray text-stevens-white overflow-hidden">
        {/* Top border/separator */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-stevens-light-gray/30 to-transparent" />

        {/* Background Image - slightly more visible */}
        <div className="absolute inset-0">
          <img
            {...getContentImageProps(
              "/assets/images/shared/accreditation.webp"
            )}
            alt=""
            className="w-full h-full object-cover opacity-40"
            aria-hidden="true"
          />
          {/* Subtle gradient overlay instead of flat color */}
          <div className="absolute inset-0  bg-gradient-to-b from-stevens-dark-gray/50 via-stevens-dark-gray/75 to-stevens-dark-gray/90" />
        </div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-stevens-sm stevens-md:px-stevens-lg stevens-xl:px-stevens-xl text-center pt-stevens-section-sm lg:pt-stevens-section pb-[60px]">
          <h2 className="font-stevens-display uppercase text-stevens-3xl stevens-md:text-stevens-4xl font-light mb-stevens-lg text-stevens-white tracking-wider">
            Accreditation Statement
          </h2>

          {/* Body text with improved link styling */}
          <div
            className="text-stevens-lg text-stevens-white/90 leading-relaxed max-w-4xl mx-auto [&_a]:text-stevens-white [&_a]:underline [&_a]:decoration-stevens-red [&_a]:decoration-2 [&_a]:underline-offset-4 [&_a]:font-medium [&_a]:transition-colors [&_a]:duration-300 hover:[&_a]:text-stevens-red"
            dangerouslySetInnerHTML={{
              __html:
                typeof accreditation === "string"
                  ? accreditation
                  : accreditation.description || accreditation.text,
            }}
          />
        </div>
      </div>
    </Section>
  );
});
