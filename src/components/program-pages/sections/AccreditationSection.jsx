import React, { forwardRef } from 'react';
import { Section } from '../primitives';

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
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/assets/images/shared/accreditation.webp"
            alt=""
            className="w-full h-full object-cover opacity-30"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-stevens-dark-gray/80"></div>
        </div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-stevens-sm stevens-md:px-stevens-lg stevens-xl:px-stevens-xl text-center pt-stevens-section-sm lg:pt-stevens-section pb-[60px] ">
          <h2 className="font-stevens-display uppercase text-stevens-3xl stevens-md:text-stevens-4xl font-light mb-stevens-lg text-stevens-white tracking-wide">
            Accreditation Statement
          </h2>
          <div
            className="text-stevens-lg text-stevens-white/90 leading-relaxed"
            dangerouslySetInnerHTML={{
              __html:
                typeof accreditation === 'string'
                  ? accreditation
                  : accreditation.description || accreditation.text,
            }}
          />
        </div>
      </div>
    </Section>
  );
});
