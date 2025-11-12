/**
 * TrackedLink Component
 * Automatically tracks link clicks with context
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { trackEvent } from '@/utils/analytics/vercelTracking';
import { useProgramContext } from '@/contexts/analytics/ProgramContext';
import { usePageContext } from '@/contexts/analytics/PageContext';

/**
 * Determine if link is external
 */
const isExternalLink = (to, href) => {
  if (href && (href.startsWith('http://') || href.startsWith('https://'))) {
    return true;
  }
  return false;
};

/**
 * TrackedLink - Auto-tracking link component
 * 
 * @param {string} to - Internal route (react-router)
 * @param {string} href - External URL
 * @param {string} eventName - Optional explicit event name
 * @param {string} linkType - Link type (nav, footer, inline, etc)
 * @param {Object} eventData - Additional event data
 * @param {Function} onClick - Click handler
 * @param {string} children - Link text
 * @param {...props} - All other props
 */
export const TrackedLink = ({
  to,
  href,
  eventName,
  linkType = 'inline',
  eventData = {},
  onClick,
  children,
  ...linkProps
}) => {
  // Get context
  const programContext = useProgramContext();
  const pageContext = usePageContext();
  
  const isExternal = isExternalLink(to, href);
  const destination = to || href;
  
  const handleClick = (e) => {
    // Generate event name
    const effectiveEventName = eventName || (
      isExternal ? 'external_link_clicked' : 'internal_link_clicked'
    );
    
    // Track click
    trackEvent(effectiveEventName, {
      link_text: typeof children === 'string' ? children : 'link',
      link_type: linkType,
      destination,
      is_external: isExternal,
      program_code: programContext?.programCode,
      page_type: pageContext?.pageType,
      ...eventData
    });
    
    // Call original onClick
    if (onClick) {
      onClick(e);
    }
  };
  
  // Render appropriate link type
  if (isExternal) {
    return (
      <a
        href={destination}
        onClick={handleClick}
        target="_blank"
        rel="noopener noreferrer"
        {...linkProps}
      >
        {children}
      </a>
    );
  }
  
  return (
    <Link
      to={destination}
      onClick={handleClick}
      {...linkProps}
    >
      {children}
    </Link>
  );
};

