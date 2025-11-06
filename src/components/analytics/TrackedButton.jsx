/**
 * TrackedButton Component
 * Automatically tracks button clicks with context
 */

import React from 'react';
import { Button } from '@/components/ui/button';
import { trackEvent } from '@/utils/analytics/vercelTracking';
import { useProgramContext } from '@/contexts/analytics/ProgramContext';
import { usePageContext } from '@/contexts/analytics/PageContext';

/**
 * Generate event name from props
 */
const generateEventName = (action, program, location) => {
  const parts = [];
  if (program) parts.push(program);
  if (action) parts.push(action);
  if (location) parts.push(location);
  parts.push('clicked');
  return parts.join('_');
};

/**
 * TrackedButton - Auto-tracking button component
 * 
 * @param {string} eventName - Optional explicit event name
 * @param {string} action - Action type (apply, request_info, schedule_call, etc)
 * @param {string} program - Program code (auto-detected from context if not provided)
 * @param {string} location - Button location (hero, card, footer, etc)
 * @param {Object} eventData - Additional event data
 * @param {Function} onClick - Click handler
 * @param {string} children - Button text
 * @param {...props} - All other Button props
 */
export const TrackedButton = ({
  eventName,
  action,
  program,
  location,
  eventData = {},
  onClick,
  children,
  ...buttonProps
}) => {
  // Get context from providers
  const programContext = useProgramContext();
  const pageContext = usePageContext();
  
  // Use context values if not explicitly provided
  const effectiveProgram = program || programContext?.programCode;
  const effectivePageType = pageContext?.pageType;
  
  // Generate event name if not provided
  const effectiveEventName = eventName || generateEventName(
    action,
    effectiveProgram,
    location
  );
  
  const handleClick = (e) => {
    // Track event
    trackEvent(effectiveEventName, {
      button_text: typeof children === 'string' ? children : 'button',
      action,
      program_code: effectiveProgram,
      program_name: programContext?.programName,
      location,
      page_type: effectivePageType,
      button_variant: buttonProps.variant || 'default',
      button_size: buttonProps.size || 'default',
      ...eventData
    });
    
    // Call original onClick if provided
    if (onClick) {
      onClick(e);
    }
  };
  
  return (
    <Button {...buttonProps} onClick={handleClick}>
      {children}
    </Button>
  );
};

/**
 * Convenience components for common button types
 */

export const ApplyButton = (props) => (
  <TrackedButton action="apply" {...props} />
);

export const RequestInfoButton = (props) => (
  <TrackedButton action="request_info" {...props} />
);

export const ScheduleCallButton = (props) => (
  <TrackedButton action="schedule_call" {...props} />
);

export const ExploreButton = (props) => (
  <TrackedButton action="explore" {...props} />
);

