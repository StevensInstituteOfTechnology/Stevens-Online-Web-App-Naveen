import React, { forwardRef } from 'react';
import { Section, SkillCardsGrid, SkillCarousel } from '../primitives';

/**
 * SkillsSection - "What You'll Learn" section with skill modules
 * 
 * Design: CPE Brand Guidelines - Skills/modules display
 * Features:
 * - Optional description text (HTML)
 * - Two display variants:
 *   - "skillCards": Grid layout (SkillCardsGrid)
 *   - default: Carousel layout (SkillCarousel)
 * - Light gray background
 * 
 * Used in: Both Degree and Certificate pages
 * Position differs:
 * - Degree: After Career section
 * - Certificate: Before Career section
 * 
 * @param {Object} whatYoullLearn - Skills configuration
 * @param {string} whatYoullLearn.title - Section title
 * @param {string} whatYoullLearn.description - Optional HTML description
 * @param {string} whatYoullLearn.variant - Display variant ("skillCards" or carousel)
 * @param {Array} whatYoullLearn.modules - Array of skill module objects
 */
export const SkillsSection = forwardRef(function SkillsSection(
  { whatYoullLearn },
  ref
) {
  if (!whatYoullLearn) return null;

  return (
    <Section
      id="what-youll-learn"
      title={whatYoullLearn.title}
      bgClassName="bg-stevens-light-gray"
      ref={ref}
    >
      {whatYoullLearn.description && (
        <div
          className="prose max-w-none text-stevens-dark-gray leading-relaxed mb-10 text-center"
          dangerouslySetInnerHTML={{ __html: whatYoullLearn.description }}
        />
      )}
      {whatYoullLearn.modules &&
        whatYoullLearn.modules.length > 0 &&
        (whatYoullLearn.variant === 'skillCards' ? (
          <SkillCardsGrid modules={whatYoullLearn.modules} />
        ) : (
          <SkillCarousel modules={whatYoullLearn.modules} />
        ))}
    </Section>
  );
});
