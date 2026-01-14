import React, { forwardRef } from 'react';
import SharedTopCompaniesSection from '../../shared/sections/TopCompaniesSection';

/**
 * TopCompaniesSection - Slim horizontal bar displaying company logos
 * 
 * Design: Trust signal bar acting as visual transition
 * Features:
 * - Low-height bar (~64px desktop, ~100px mobile)
 * - Left label + horizontally aligned logos
 * - Clean, minimal, secondary visual hierarchy
 * - Fast scannability and trust signaling
 * 
 * Used in: Both Degree and Certificate pages
 * 
 * @param {Object} topCompanies - Top companies configuration
 * @param {string} topCompanies.label - Left side label text
 * @param {Array} topCompanies.companies - Array of company objects
 * @param {Object} career - Career data (fallback for companies)
 * @param {Array} career.topCompanies - Fallback companies array
 */
export const TopCompaniesSection = forwardRef(function TopCompaniesSection(
  { topCompanies, career },
  ref
) {
  if (!topCompanies) return null;

  const companies = topCompanies.companies || career?.topCompanies || [];
  
  if (companies.length === 0) return null;

  return (
    <div
      id="top-companies"
      ref={ref}
      className="w-full bg-stevens-light-gray py-9 lg:py-12 border-y border-stevens-gray/20"
    >
      <div className="max-w-stevens-content-max mx-auto px-stevens-md">
        <SharedTopCompaniesSection
          label={topCompanies.label || "Top companies hiring\nStevens alumni"}
          companies={companies}
        />
      </div>
    </div>
  );
});
