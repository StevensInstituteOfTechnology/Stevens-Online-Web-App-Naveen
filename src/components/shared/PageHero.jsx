import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { createPageUrl } from '@/utils';
import ApplicationModal from './ApplicationModal';

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
  rightContent // Content to display on the right side
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const lines = Array.isArray(titleLines) && titleLines.length > 0
    ? titleLines
    : (title ? [title] : []);

  const renderCta = (cta, variant = 'primary') => {
    if (!cta || !cta.label) return null;
    const className = variant === 'primary'
      ? 'btn-stevens-primary w-full sm:w-auto'
      : 'btn-stevens-outline text-stevens-white hover:bg-stevens-white hover:text-stevens-primary w-full sm:w-auto';

    // If this is the secondary CTA and useApplicationModal is true, trigger modal instead
    if (variant === 'secondary' && useApplicationModal && cta.href) {
      return (
        <button 
          onClick={() => setIsModalOpen(true)}
          className={className}
        >
          {cta.label}
        </button>
      );
    }

    if (cta.to) {
      const to = typeof cta.to === 'string' ? createPageUrl(cta.to) : createPageUrl(String(cta.to));
      return (
        <Link to={to}>
          <button className={className}>{cta.label}</button>
        </Link>
      );
    }
    if (cta.href) {
      return (
        <a href={cta.href} target="_blank" rel="noopener noreferrer">
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
          <div className="mb-stevens-md text-stevens-sm text-stevens-gray-300">
            {breadcrumbs.map((crumb, index) => (
              <span key={index}>
                {index > 0 && ' / '}
                <a href={crumb.href} className="hover:text-white">{crumb.label}</a>
              </span>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-stevens-gap-lg lg:gap-[120px] items-start lg:items-center">
          <div>
            {lines.length > 0 ? (
              <div className="space-y-2 sm:space-y-3 md:space-y-4">
                {lines.map((line, idx) => (
                  <h1 key={idx} className={`font-display font-bold leading-tight animate-in slide-in-from-left duration-700 ${idx === 0 ? '' : ''} text-3xl sm:text-4xl md:text-5xl lg:text-6xl`}>
                    {line}
                  </h1>
                ))}
              </div>
            ) : (
              <h1 className="font-stevens-display text-stevens-4xl stevens-md:text-stevens-5xl font-bold">
                {title}
              </h1>
            )}

            {subtitle && (
              <p className="mt-stevens-lg text-base sm:text-lg md:text-xl text-gray-200 mb-6 md:mb-8 max-w-xl animate-in slide-in-from-left duration-700 delay-200">
                {subtitle}
              </p>
            )}

            {(primaryCta || secondaryCta) && (
              <div className="flex flex-col sm:flex-row gap-stevens-sm sm:gap-stevens-md animate-in slide-in-from-left duration-700 delay-400 w-full sm:w-auto">
                {renderCta(primaryCta, 'primary')}
                {renderCta(secondaryCta, 'secondary')}
              </div>
            )}

            {badges.length > 0 && (
              <div className="mt-stevens-lg flex flex-wrap items-center gap-stevens-md">
                {badges.map((badge, index) => {
                  const Icon = badge.icon;
                  return (
                    <Badge key={index} variant="outline" className="text-white border-white/50 bg-white/10 text-stevens-base py-stevens-xs px-stevens-sm rounded-stevens-md">
                      {Icon && <Icon className="w-4 h-4 mr-2" />}
                      {badge.text}
                    </Badge>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right column for additional content */}
          <div className="block lg:block mt-8 lg:mt-0">
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