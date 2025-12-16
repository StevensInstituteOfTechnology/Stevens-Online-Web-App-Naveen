import React from 'react';

/**
 * TopCompaniesSection - Displays company logos in a grid layout
 * @param {Object} props
 * @param {string} props.title - Section title
 * @param {string} props.description - Section description
 * @param {Array} props.companies - Array of company objects with { name, logo, industry }
 */
export default function TopCompaniesSection({ 
  title = "Trusted by 5,000+ Global companies across all industries",
  description = "Our graduates join leading organizations across technology, finance, healthcare, and consulting",
  companies = []
}) {
  if (!companies || companies.length === 0) {
    return null;
  }

  return (
    <div >
      <div >
        <div className="text-center">
          {/* Description */}
          {description && (
            <p className="text-stevens-gray-600 mb-stevens-lg max-w-2xl mx-auto text-stevens-sm stevens-md:text-stevens-base">
              {description}
            </p>
          )}

          {/* Companies Grid */}
          <div className="grid grid-cols-3 gap-stevens-md stevens-lg:gap-stevens-2xl items-center">
            {companies.map((company, index) => {
              // Handle both string (legacy) and object formats
              const companyName = typeof company === 'string' ? company : company.name;
              const companyLogo = typeof company === 'object' ? company.logo : null;
              const companyIndustry = typeof company === 'object' ? company.industry : null;

              return (
                <div
                  key={index}
                  className="group bg-transparent rounded-stevens-md p-stevens-sm stevens-md:p-stevens-md -translate-y-1 hover:translate-y-0 transition-all duration-stevens-normal flex flex-col items-center justify-center min-h-[80px]"
                >
                  {/* Company Logo */}
                  <div className="flex items-center justify-center h-16 stevens-md:h-20 w-full">
                    {companyLogo ? (
                      <img
                        src={companyLogo}
                        alt={`${companyName} logo`}
                        className="max-h-full max-w-full object-contain grayscale-0 group-hover:grayscale transition-all duration-stevens-normal opacity-100 group-hover:opacity-70"
                        loading="lazy"
                        onError={(e) => {
                          // Hide image and show placeholder on error
                          e.target.style.display = 'none';
                          const placeholder = e.target.parentElement.querySelector('.logo-placeholder');
                          if (placeholder) placeholder.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    {/* Placeholder logo - shown when no logo or image fails */}
                    <div 
                      className="logo-placeholder w-full h-full items-center justify-center bg-stevens-gray-50 rounded-stevens-sm"
                      style={{ display: companyLogo ? 'none' : 'flex' }}
                      aria-label={`${companyName} logo`}
                    >
                      <div className="text-stevens-gray-400 font-stevens-bold text-stevens-base stevens-md:text-stevens-lg">
                        {companyName.substring(0, 2).toUpperCase()}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

