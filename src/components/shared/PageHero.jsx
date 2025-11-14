import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { createPageUrl } from '@/utils';
import { getHeroImageProps } from '@/utils/responsiveImage';
import ApplicationModal from './ApplicationModal';
import RequestInfoModal from './RequestInfoModal';
import { trackConversion, CONVERSION_LABELS } from '@/utils/gtmTracking';
import { trackEvent } from '@/utils/analytics/vercelTracking';

/**
 * Program-style hero with background image, multi-line title, subtitle and CTAs.
 * Backward compatible with old props (title, subtitle, badges).
 */
export default function PageHero({
  title,
  titleLines,
  subtitle,
  breadcrumbs,
  badges = [],
  bgImage,
  primaryCta, // { label, to? | href? }
  secondaryCta, // { label, to? | href? | useModal? }
  useApplicationModal = false, // New prop for MSCS/MEM pages
  useRequestInfoModal = false, // New prop to open Request Info in modal
  requestInfoProgramCode = '', // Program code for Request Info modal
  requestInfoSourcePage = 'unknown', // Source page for tracking
  rightContent, // Content to display on the right side
  bottomContent // Content to display at the bottom of left column
}) {
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [isRequestInfoModalOpen, setIsRequestInfoModalOpen] = useState(false);
  const lines = Array.isArray(titleLines) && titleLines.length > 0
    ? titleLines
    : (title ? [title] : []);

  const renderCta = (cta, variant = 'primary') => {
    if (!cta || !cta.label) return null;
    const className = variant === 'primary'
      ? 'btn-stevens-primary w-full sm:w-auto'
      : 'btn-stevens-secondary w-full sm:w-auto';

    // Determine conversion label based on variant and label
    const getConversionLabel = () => {
      if (variant === 'primary' && (cta.label.toLowerCase().includes('request') || cta.label.toLowerCase().includes('information'))) {
        return CONVERSION_LABELS.REQUEST_INFO;
      }
      if (variant === 'secondary' && (cta.label.toLowerCase().includes('apply'))) {
        return CONVERSION_LABELS.APPLY_NOW;
      }
      return null;
    };

    const handleClick = () => {
      const conversionLabel = getConversionLabel();
      if (conversionLabel) {
        trackConversion(conversionLabel);
      }
    };

    // If this is the primary CTA and useRequestInfoModal is true, trigger modal instead
    if (variant === 'primary' && useRequestInfoModal) {
      return (
        <button 
          onClick={() => {
            handleClick();
            setIsRequestInfoModalOpen(true);
          }}
          className={className}
        >
          {cta.label}
        </button>
      );
    }

    // If this is the secondary CTA and useApplicationModal is true, trigger modal instead
    if (variant === 'secondary' && useApplicationModal && cta.href) {
      return (
        <button 
          onClick={() => {
            handleClick();
            setIsApplicationModalOpen(true);
          }}
          className={className}
        >
          {cta.label}
        </button>
      );
    }

    if (cta.to) {
      let to = typeof cta.to === 'string' ? createPageUrl(cta.to) : createPageUrl(String(cta.to));
      
      // If linking to accelerated-application, add program code
      const isAcceleratedApp = to.includes('accelerated-application');
      if (isAcceleratedApp && requestInfoProgramCode) {
        to += `?program=${requestInfoProgramCode}`;
      }
      
      return (
        <Link 
          to={to} 
          onClick={(e) => {
            // Store program code for accelerated application
            if (isAcceleratedApp && requestInfoProgramCode) {
              sessionStorage.setItem('accelerated_application_program', requestInfoProgramCode);
            }
            
            // Track apply button click with program code
            if (variant === 'secondary' && cta.label.toLowerCase().includes('apply')) {
              trackEvent('apply_button_clicked', {
                program_code: requestInfoProgramCode || 'unknown',
                button_location: 'hero',
                application_type: isAcceleratedApp ? 'accelerated' : 'other',
                button_text: cta.label
              });
            }
            
            handleClick();
          }}
        >
          <button className={className}>{cta.label}</button>
        </Link>
      );
    }
    if (cta.href) {
      let href = cta.href;
      
      // If linking to accelerated-application, add program code
      const isAcceleratedApp = href.includes('accelerated-application');
      const isInternal = !href.startsWith('http');
      
      if (isAcceleratedApp && requestInfoProgramCode && isInternal) {
        href += `?program=${requestInfoProgramCode}`;
      }
      
      return (
        <a 
          href={href} 
          target={isInternal ? "_self" : "_blank"} 
          rel={isInternal ? "" : "noopener noreferrer"} 
          onClick={(e) => {
            // Store program code for accelerated application
            if (isAcceleratedApp && requestInfoProgramCode && isInternal) {
              sessionStorage.setItem('accelerated_application_program', requestInfoProgramCode);
            }
            
            // Track apply button click with program code
            if (variant === 'secondary' && cta.label.toLowerCase().includes('apply')) {
              trackEvent('apply_button_clicked', {
                program_code: requestInfoProgramCode || 'unknown',
                button_location: 'hero',
                application_type: isAcceleratedApp ? 'accelerated' : (isInternal ? 'other' : 'standard'),
                button_text: cta.label,
                destination: href
              });
            }
            
            handleClick();
          }}
        >
          <button className={className}>{cta.label}</button>
        </a>
      );
    }
    return null;
  };

  return (
    <section className="relative bg-gray-900 text-white overflow-hidden">
      {bgImage && (
        <img
          {...getHeroImageProps(bgImage)}
          alt=""
          aria-hidden="true"
          fetchpriority="high"
          loading="eager"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-700/10 to-transparent" />

      <div className="relative max-w-stevens-content-max mx-auto px-stevens-md sm:px-stevens-lg lg:px-stevens-xl py-stevens-section-sm lg:py-stevens-section">
        {breadcrumbs && (
          <div className="mb-stevens-md text-stevens-sm text-stevens-gray-300" style={{ textShadow: '0 0.5px 1px rgba(0, 0, 0, 0.5)' }}>
            {breadcrumbs.map((crumb, index) => (
              <span key={index}>
                {index > 0 && ' / '}
                <a href={crumb.href} className="hover:text-white">{crumb.label}</a>
              </span>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-stevens-gap-lg lg:gap-[120px] items-start lg:items-center">
          <div className="animate-in slide-in-from-left duration-700">
            {lines.length > 0 ? (
              <div className="space-y-2 sm:space-y-3 md:space-y-4">
                {lines.map((line, idx) => (
                  <h1 key={idx} className="font-display font-bold leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl" style={{ textShadow: '0 1px 4px rgba(0, 0, 0, 0.6), 0 0 2px rgba(0, 0, 0, 0.7)' }}>
                    {line}
                  </h1>
                ))}
              </div>
            ) : (
              <h1 className="font-stevens-display text-stevens-4xl stevens-md:text-stevens-5xl font-bold" style={{ textShadow: '0 1px 4px rgba(0, 0, 0, 0.6), 0 0 2px rgba(0, 0, 0, 0.7)' }}>
                {title}
              </h1>
            )}

            {subtitle && (
              <p className="mt-stevens-lg text-base sm:text-lg md:text-xl text-gray-200 mb-6 md:mb-8 max-w-xl" style={{ textShadow: '0 0.5px 2px rgba(0, 0, 0, 0.6), 0 0 1px rgba(0, 0, 0, 0.7)' }}>
                {subtitle}
              </p>
            )}

            {(primaryCta || secondaryCta) && (
              <div className="flex flex-col sm:flex-row gap-stevens-sm sm:gap-stevens-md w-full sm:w-auto">
                {renderCta(primaryCta, 'primary')}
                {renderCta(secondaryCta, 'secondary')}
              </div>
            )}

            {badges.length > 0 && (
              <div className="mt-stevens-lg flex flex-wrap items-center gap-stevens-md">
                {badges.map((badge, index) => {
                  const Icon = badge.icon;
                  return (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className="text-white border-white/60 bg-white/20 backdrop-blur-md text-stevens-base py-stevens-xs px-stevens-sm rounded-stevens-lg cursor-pointer relative overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                      style={{ 
                        textShadow: '0 1px 3px rgba(0, 0, 0, 0.7), 0 0 2px rgba(0, 0, 0, 0.8)',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                      }}
                    >
                      {/* Magnifying glass highlight effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none rounded-stevens-lg" style={{ zIndex: 1 }}></div>
                      {Icon && <Icon className="w-4 h-4 mr-2 relative" style={{ zIndex: 2 }} />}
                      <span className="relative" style={{ zIndex: 2 }}>{badge.text}</span>
                    </Badge>
                  );
                })}
              </div>
            )}

            {/* Bottom content - appears below left column content */}
            {bottomContent && (
              <div className="mt-stevens-xl">
                {bottomContent}
              </div>
            )}
          </div>

          {/* Right column for additional content */}
          <div className="block lg:block mt-8 lg:mt-0 animate-in slide-in-from-right duration-700">
            {rightContent}
          </div>
        </div>
      </div>

      {/* Application Modal */}
      {useApplicationModal && secondaryCta?.href && (
        <ApplicationModal 
          isOpen={isApplicationModalOpen}
          onClose={() => setIsApplicationModalOpen(false)}
          traditionalLink={secondaryCta.href}
        />
      )}

      {/* Request Info Modal */}
      {useRequestInfoModal && (
        <RequestInfoModal 
          isOpen={isRequestInfoModalOpen}
          onClose={() => setIsRequestInfoModalOpen(false)}
          sourcePage={requestInfoSourcePage}
          programOfInterest={requestInfoProgramCode}
        />
      )}
    </section>
  );
}