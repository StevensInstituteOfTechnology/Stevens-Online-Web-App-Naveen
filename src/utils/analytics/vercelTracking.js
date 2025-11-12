/**
 * Vercel Analytics Tracking Utility
 * Comprehensive event tracking with automatic context enrichment
 */

import { track } from '@vercel/analytics';
import { getUserIdentity, trackPageInSession, incrementEventsInSession } from './userIdentity';
import { getAttributionTracker } from './attribution';
import { FunnelManager } from './funnelTracking';
import { ALL_FUNNELS } from '@/config/funnelConfig';

/**
 * Initialize funnel manager
 */
const funnelManager = new FunnelManager(ALL_FUNNELS);

/**
 * Vercel Analytics Custom Event Key Limits
 * 
 * Pro plan: 2 keys per custom event
 * Pro + Web Analytics Plus ($50/month): 8 keys per custom event
 * Enterprise: Custom amount (negotiated)
 * 
 * Set VITE_VERCEL_ANALYTICS_MAX_KEYS in your environment variables to match your plan.
 * Defaults to 2 in production (Pro plan limit), 10 in development for debugging.
 */
const DEFAULT_MAX_CUSTOM_EVENT_KEYS = import.meta.env.PROD ? 2 : 10;
const resolvedMaxKeys = Number(import.meta.env.VITE_VERCEL_ANALYTICS_MAX_KEYS ?? DEFAULT_MAX_CUSTOM_EVENT_KEYS);
const MAX_CUSTOM_EVENT_KEYS = Number.isFinite(resolvedMaxKeys) && resolvedMaxKeys > 0
  ? Math.floor(resolvedMaxKeys)
  : DEFAULT_MAX_CUSTOM_EVENT_KEYS;

/**
 * Priority fields for custom events
 * These fields will be kept first when trimming the payload
 * 
 * For 2-key limit (Pro plan):
 * 1. program_code - Critical for business intelligence
 * 2. form_name/modal_name/quiz_name - Event-specific identifier
 * 
 * Additional fields for higher limits:
 * 3. is_conversion - Conversion tracking
 * 4. source_page - Context for user journey
 * 5. button_location - CTA performance tracking
 */
const PRIORITY_EVENT_FIELDS = [
  'program_code',      // #1 - Business critical
  'form_name',         // #2 - Most common event identifier
  'modal_name',        // #2 alt - Modal events
  'quiz_name',         // #2 alt - Quiz events
  'is_conversion',     // #3 - Conversion flag
  'source_page',       // #4 - Journey context
  'button_location',   // #5 - CTA tracking
  'funnel_name',       // #6 - Funnel tracking
  'page_type',         // #7 - Page context
  'page_path'          // #8 - Specific page
];

/**
 * Truncate value to Vercel's maximum field length (255 characters)
 */
const truncateForVercel = (value) => {
  if (value === undefined) return undefined;
  if (value === null) return null;
  if (typeof value === 'string') {
    return value.length > 255 ? value.slice(0, 255) : value;
  }
  if (typeof value === 'number' || typeof value === 'boolean') {
    return value;
  }
  // Unsupported types (objects, arrays) are dropped
  return undefined;
};

/**
 * Sanitize event data to comply with Vercel Analytics limits
 * - Keeps only the allowed number of custom properties
 * - Prioritizes important fields
 * - Truncates strings to 255 characters
 * - Drops nested objects and arrays
 */
const sanitizeForVercelLimits = (data = {}) => {
  const sanitized = {};
  const droppedKeys = [];

  const trySet = (key, rawValue) => {
    if (sanitized[key] !== undefined) return;
    if (Object.keys(sanitized).length >= MAX_CUSTOM_EVENT_KEYS) {
      droppedKeys.push(key);
      return;
    }
    const value = truncateForVercel(rawValue);
    if (value === undefined) {
      droppedKeys.push(key);
      return;
    }
    sanitized[key] = value;
  };

  // Add priority fields first
  PRIORITY_EVENT_FIELDS.forEach((key) => {
    if (key in data) {
      trySet(key, data[key]);
    }
  });

  // Add remaining fields up to the limit
  Object.entries(data).forEach(([key, value]) => {
    if (PRIORITY_EVENT_FIELDS.includes(key)) return;
    trySet(key, value);
  });

  // Log dropped keys in development
  if (droppedKeys.length && import.meta.env.DEV) {
    console.warn('[analytics] Dropped Vercel custom event fields:', droppedKeys);
  }

  return sanitized;
};

/**
 * Get device type
 */
const getDeviceType = () => {
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
};

/**
 * Get browser info
 */
const getBrowserInfo = () => {
  const ua = navigator.userAgent;
  if (ua.includes('Chrome')) return 'chrome';
  if (ua.includes('Safari')) return 'safari';
  if (ua.includes('Firefox')) return 'firefox';
  if (ua.includes('Edge')) return 'edge';
  return 'other';
};

/**
 * Get OS info
 */
const getOSInfo = () => {
  const ua = navigator.userAgent;
  if (ua.includes('Windows')) return 'windows';
  if (ua.includes('Mac')) return 'macos';
  if (ua.includes('Linux')) return 'linux';
  if (ua.includes('Android')) return 'android';
  if (ua.includes('iOS') || ua.includes('iPhone') || ua.includes('iPad')) return 'ios';
  return 'other';
};

/**
 * Get current page context
 */
const getPageContext = () => {
  const path = window.location.pathname;
  const url = window.location.href;
  
  // Determine page type
  let pageType = 'other';
  if (path === '/' || path === '') pageType = 'home';
  else if (path.includes('/explore/')) pageType = 'explore';
  else if (path.includes('/online-m')) pageType = 'program';
  else if (path.includes('/certificates/')) pageType = 'program';
  else if (path.includes('/admissions')) pageType = 'admissions';
  else if (path.includes('/compare')) pageType = 'comparison';
  else if (path.includes('/blog/')) pageType = 'blog';
  else if (path.includes('/accelerated-application')) pageType = 'application';
  else if (path.includes('/asap')) pageType = 'application';
  
  return {
    page_url: url,
    page_path: path,
    page_type: pageType,
    page_title: document.title
  };
};

/**
 * Enrich event with automatic context
 */
const enrichEventData = (eventData = {}) => {
  const identity = getUserIdentity();
  const attribution = getAttributionTracker().getAttributionForConversion();
  const pageContext = getPageContext();
  
  return {
    // User identity
    anonymous_user_id: identity.anonymousUserId,
    session_id: identity.sessionId,
    is_returning_user: identity.isReturningUser,
    total_sessions: identity.totalSessions,
    days_since_first_visit: identity.daysSinceFirstVisit,
    session_duration_seconds: identity.sessionDuration,
    
    // Page context
    ...pageContext,
    
    // Device context
    device_type: getDeviceType(),
    viewport_width: window.innerWidth,
    viewport_height: window.innerHeight,
    browser: getBrowserInfo(),
    os: getOSInfo(),
    
    // Attribution (if available)
    ...(attribution || {}),
    
    // Timestamp
    timestamp: new Date().toISOString(),
    
    // Custom event data
    ...eventData
  };
};

/**
 * Track event to Vercel Analytics with auto-enrichment
 */
export const trackEvent = (eventName, eventData = {}) => {
  if (typeof window === 'undefined') return;
  
  try {
    // Enrich event data with context
    const enrichedData = enrichEventData(eventData);
    
    // Sanitize data to respect Vercel Analytics limits
    const sanitizedData = sanitizeForVercelLimits(enrichedData);
    
    // Track to Vercel Analytics
    track(eventName, sanitizedData);
    
    // Also track funnel progression
    const progressions = funnelManager.trackEvent(eventName, enrichedData);
    
    // If this event caused funnel progression, track that too
    if (progressions && progressions.length > 0) {
      progressions.forEach(progression => {
        // Sanitize progression data before tracking
        const sanitizedProgression = sanitizeForVercelLimits(progression);
        track('funnel_stage_progressed', sanitizedProgression);
      });
    }
    
    // Increment session events count
    incrementEventsInSession();
    
    // Debug logging
    if (import.meta.env.DEV) {
      console.log('📊 Vercel Event:', eventName, {
        original: enrichedData,
        sanitized: sanitizedData,
        keyCount: Object.keys(sanitizedData).length,
        maxKeys: MAX_CUSTOM_EVENT_KEYS
      });
      if (progressions && progressions.length > 0) {
        console.log('🎯 Funnel Progression:', progressions);
      }
    }
  } catch (error) {
    console.error('Error tracking event:', error);
  }
};

/**
 * Track page view
 */
export const trackPageView = (additionalData = {}) => {
  const pageContext = getPageContext();
  
  trackEvent('page_view', {
    ...additionalData,
    page_path: pageContext.page_path
  });
  
  // Track in session
  trackPageInSession(pageContext.page_path);
};

/**
 * Track conversion (wrapper for important conversions)
 */
export const trackConversion = (conversionName, conversionData = {}) => {
  trackEvent(conversionName, {
    ...conversionData,
    is_conversion: true
  });
};

/**
 * Track funnel drop-off
 */
export const trackFunnelDropOff = (funnelKey, reason) => {
  const funnel = funnelManager.getFunnel(funnelKey);
  if (funnel) {
    const dropOffData = funnel.trackDropOff(reason);
    if (dropOffData) {
      trackEvent('funnel_drop_off', dropOffData);
    }
  }
};

/**
 * Get funnel manager (for advanced usage)
 */
export const getFunnelManager = () => funnelManager;

/**
 * Track scroll depth
 */
export const trackScrollDepth = (percentage, additionalData = {}) => {
  trackEvent(`scroll_depth_${percentage}`, {
    ...additionalData,
    scroll_depth_percentage: percentage
  });
};

/**
 * Track time on page (called before page unload)
 */
export const trackTimeOnPage = (seconds, additionalData = {}) => {
  trackEvent('time_on_page', {
    ...additionalData,
    time_on_page_seconds: seconds
  });
};

/**
 * Event name constants for consistency
 */
export const EVENTS = {
  // Page views
  PAGE_VIEW: 'page_view',
  HOMEPAGE_VIEWED: 'homepage_viewed',
  PROGRAM_PAGE_VIEWED: 'program_page_viewed',
  EXPLORE_PAGE_VIEWED: 'explore_page_viewed',
  ADMISSIONS_PAGE_VIEWED: 'admissions_page_viewed',
  
  // Navigation
  NAV_LINK_CLICKED: 'nav_link_clicked',
  DROPDOWN_OPENED: 'dropdown_opened',
  MOBILE_MENU_OPENED: 'mobile_menu_opened',
  LOGO_CLICKED: 'logo_clicked',
  FOOTER_LINK_CLICKED: 'footer_link_clicked',
  
  // CTAs
  APPLY_BUTTON_CLICKED: 'apply_button_clicked',
  REQUEST_INFO_CLICKED: 'request_info_clicked',
  SCHEDULE_CALL_CLICKED: 'schedule_call_clicked',
  EXPLORE_PROGRAM_CLICKED: 'explore_program_clicked',
  
  // Forms
  RFI_FORM_VIEWED: 'rfi_form_viewed',
  RFI_FORM_STARTED: 'rfi_form_started',
  RFI_FORM_SUBMITTED: 'rfi_form_submitted',
  RFI_FORM_ERROR: 'rfi_form_error',
  RFI_FORM_ABANDONED: 'rfi_form_abandoned',
  
  // Modals
  RFI_MODAL_OPENED: 'rfi_modal_opened',
  RFI_MODAL_CLOSED: 'rfi_modal_closed',
  APPLICATION_MODAL_OPENED: 'application_modal_opened',
  APPLICATION_MODAL_CLOSED: 'application_modal_closed',
  
  // Application
  APPLICATION_TYPE_SELECTED: 'application_type_selected',
  ACCELERATED_APP_STARTED: 'accelerated_app_started',
  ASAP_APP_STARTED: 'asap_app_started',
  STANDARD_APP_REDIRECTED: 'standard_app_redirected',
  
  // Content engagement
  VIDEO_PLAYED: 'video_played',
  VIDEO_PAUSED: 'video_paused',
  VIDEO_COMPLETED: 'video_completed',
  ACCORDION_OPENED: 'accordion_opened',
  TAB_SWITCHED: 'tab_switched',
  
  // Program discovery
  PROGRAM_CARD_VIEWED: 'program_card_viewed',
  PROGRAM_CARD_CLICKED: 'program_card_clicked',
  COMPARE_PROGRAMS_STARTED: 'compare_programs_started',
  QUIZ_STARTED: 'quiz_started',
  QUIZ_COMPLETED: 'quiz_completed',
  
  // Scroll & engagement
  SCROLL_DEPTH_25: 'scroll_depth_25',
  SCROLL_DEPTH_50: 'scroll_depth_50',
  SCROLL_DEPTH_75: 'scroll_depth_75',
  SCROLL_DEPTH_100: 'scroll_depth_100',
  
  // Session
  SESSION_STARTED: 'session_started',
  SESSION_ENDED: 'session_ended'
};

