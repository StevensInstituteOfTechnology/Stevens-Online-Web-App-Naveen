import React from 'react';

/**
 * TopCompaniesSection - Slim horizontal bar displaying company logos
 * Design: Trust signal bar, not a hero section
 * Features:
 * - Single row on desktop, 2 rows on mobile
 * - Left-aligned label + horizontally spaced logos
 * - Low height (~64px desktop, ~100px mobile for 2 rows)
 * - Fast scannability and trust signaling
 * 
 * @param {Object} props
 * @param {string} props.label - Left side label text
 * @param {Array} props.companies - Array of company objects with { name, logo }
 */
export default function TopCompaniesSection({ 
  label = "Top companies hiring\nStevens alumni",
  companies = []
}) {
  if (!companies || companies.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 lg:gap-12">
      {/* Left side label */}
      <div className="flex-shrink-0 text-center sm:text-left">
        <p className="text-lg lg:text-xl text-stevens-gray leading-snug whitespace-pre-line">
          {label}
        </p>
      </div>
      
      {/* Right side logos - 2 rows on mobile, single row on desktop */}
      <div className="flex-1 w-full">
        <div className="grid grid-cols-3 sm:flex sm:flex-row items-center justify-between gap-8 sm:gap-10 lg:gap-14">
          {companies.map((company, index) => {
            // Handle both string (legacy) and object formats
            const companyName = typeof company === 'string' ? company : company.name;
            const companyLogo = typeof company === 'object' ? company.logo : null;

            return (
              <div
                key={index}
                className="flex items-center justify-center"
              >
                {companyLogo ? (
                  <img
                    src={companyLogo}
                    alt={`${companyName} logo`}
                    className="h-10 lg:h-14 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity duration-200"
                    loading="lazy"
                    onError={(e) => {
                      // Hide image on error
                      e.target.style.display = 'none';
                    }}
                  />
                ) : (
                  // Placeholder for companies without logos
                  <span className="text-xs sm:text-sm font-medium text-stevens-gray">
                    {companyName}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

