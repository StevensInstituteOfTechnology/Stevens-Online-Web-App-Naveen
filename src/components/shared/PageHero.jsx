import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { createPageUrl } from '@/utils';
import ApplicationModal from './ApplicationModal';
import { trackConversion, CONVERSION_LABELS } from '@/utils/gtmTracking';

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
  rightContent, // Content to display on the right side
  bottomContent // Content to display at the bottom of left column
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
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

    // If this is the secondary CTA and useApplicationModal is true, trigger modal instead
    if (variant === 'secondary' && useApplicationModal && cta.href) {
      return (
        <button 
          onClick={() => {
            handleClick();
            setIsModalOpen(true);
          }}
          className={className}
        >
          {cta.label}
        </button>
      );
    }

    if (cta.to) {
      const to = typeof cta.to === 'string' ? createPageUrl(cta.to) : createPageUrl(String(cta.to));
      return (
        <Link to={to} onClick={handleClick}>
          <button className={className}>{cta.label}</button>
        </Link>
      );
    }
    if (cta.href) {
      return (
        <a href={cta.href} target="_blank" rel="noopener noreferrer" onClick={handleClick}>
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
          src={bgImage}
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
          <div className="mb-stevens-md text-stevens-sm text-stevens-gray-300" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.7)' }}>
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
                  <h1 key={idx} className="font-display font-bold leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.8), 0 0 4px rgba(0, 0, 0, 0.9)' }}>
                    {line}
                  </h1>
                ))}
              </div>
            ) : (
              <h1 className="font-stevens-display text-stevens-4xl stevens-md:text-stevens-5xl font-bold" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.8), 0 0 4px rgba(0, 0, 0, 0.9)' }}>
                {title}
              </h1>
            )}

            {subtitle && (
              <p className="mt-stevens-lg text-base sm:text-lg md:text-xl text-gray-200 mb-6 md:mb-8 max-w-xl" style={{ textShadow: '0 1px 4px rgba(0, 0, 0, 0.8), 0 0 2px rgba(0, 0, 0, 0.9)' }}>
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
                    <Badge key={index} variant="outline" className="text-white border-white/50 bg-white/10 text-stevens-base py-stevens-xs px-stevens-sm rounded-stevens-md" style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.7), 0 0 2px rgba(0, 0, 0, 0.8)' }}>
                      {Icon && <Icon className="w-4 h-4 mr-2" />}
                      {badge.text}
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
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          traditionalLink={secondaryCta.href}
        />
      )}
    </section>
  );
}