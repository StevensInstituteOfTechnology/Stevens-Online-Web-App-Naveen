import React, { forwardRef } from 'react';
import { Section } from '../primitives';
import SharedTopCompaniesSection from '../../shared/sections/TopCompaniesSection';

/**
 * TopCompaniesSection - Wrapper for shared TopCompaniesSection
 * 
 * Design: CPE Brand Guidelines - Company logos grid
 * Features:
 * - Uses shared TopCompaniesSection component for logo grid
 * - Wrapped in Section primitive for consistent styling
 * - Light gray background
 * 
 * Used in: Both Degree and Certificate pages
 * 
 * @param {Object} topCompanies - Top companies configuration
 * @param {string} topCompanies.title - Section title
 * @param {string} topCompanies.description - Section description
 * @param {Array} topCompanies.companies - Array of company objects
 * @param {Object} career - Career data (fallback for companies)
 * @param {Array} career.topCompanies - Fallback companies array
 */
export const TopCompaniesSection = forwardRef(function TopCompaniesSection(
  { topCompanies, career },
  ref
) {
  if (!topCompanies) return null;

  return (
    <Section
      id="top-companies"
      title={topCompanies.title}
      bgClassName="bg-stevens-light-gray"
      ref={ref}
    >
      <SharedTopCompaniesSection
        title={
          topCompanies.title ||
          'Stevens Alumni Drive Innovation at Top Companies'
        }
        description={
          topCompanies.description ||
          'Our graduates join leading organizations across technology, finance, healthcare, and consulting'
        }
        companies={topCompanies.companies || career?.topCompanies || []}
      />
    </Section>
  );
});
