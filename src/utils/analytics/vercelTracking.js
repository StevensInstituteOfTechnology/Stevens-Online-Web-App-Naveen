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
    
    // Track to Vercel Analytics
    track(eventName, enrichedData);
    
    // Also track funnel progression
    const progressions = funnelManager.trackEvent(eventName, enrichedData);
    
    // If this event caused funnel progression, track that too
    if (progressions && progressions.length > 0) {
      progressions.forEach(progression => {
        track('funnel_stage_progressed', progression);
      });
    }
    
    // Increment session events count
    incrementEventsInSession();
    
    // Debug logging
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Vercel Event:', eventName, enrichedData);
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

