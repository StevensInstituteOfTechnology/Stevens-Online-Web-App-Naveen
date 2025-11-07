/**
 * User Identity & Session Management
 * Tracks anonymous users across sessions for funnel and attribution analysis
 */

/**
 * Generate anonymous user ID (GDPR-compliant, no PII)
 */
const generateAnonymousUserId = () => {
  return `anon_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Generate session ID
 */
const generateSessionId = () => {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Set cookie (fallback for cross-domain tracking)
 */
const setCookie = (name, value, days) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
};

/**
 * Get cookie value
 */
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

/**
 * Check if returning user
 */
const isReturningUser = () => {
  return localStorage.getItem('stevens_first_visit_date') !== null;
};

/**
 * Get session count
 */
const getSessionCount = () => {
  return parseInt(localStorage.getItem('stevens_session_count') || '0', 10);
};

/**
 * Increment session count
 */
const incrementSessionCount = () => {
  const count = getSessionCount() + 1;
  localStorage.setItem('stevens_session_count', count.toString());
  return count;
};

/**
 * Get days since first visit
 */
const getDaysSinceFirstVisit = () => {
  const firstVisit = localStorage.getItem('stevens_first_visit_date');
  if (!firstVisit) {
    localStorage.setItem('stevens_first_visit_date', new Date().toISOString());
    return 0;
  }
  const daysSince = Math.floor(
    (Date.now() - new Date(firstVisit).getTime()) / (1000 * 60 * 60 * 24)
  );
  return daysSince;
};

/**
 * Get last visit date
 */
const getLastVisitDate = () => {
  const lastVisit = localStorage.getItem('stevens_last_visit_date');
  localStorage.setItem('stevens_last_visit_date', new Date().toISOString());
  return lastVisit;
};

/**
 * Get or create anonymous user identity
 */
export const getUserIdentity = () => {
  // Try localStorage first
  let anonymousUserId = localStorage.getItem('stevens_anonymous_user_id');
  
  // Try cookie as fallback
  if (!anonymousUserId) {
    anonymousUserId = getCookie('stevens_user_id');
  }
  
  // Create new if doesn't exist
  if (!anonymousUserId) {
    anonymousUserId = generateAnonymousUserId();
    localStorage.setItem('stevens_anonymous_user_id', anonymousUserId);
    setCookie('stevens_user_id', anonymousUserId, 365); // 1 year
  }
  
  // Session ID - new per browser session
  let sessionId = sessionStorage.getItem('stevens_session_id');
  let isNewSession = false;
  
  if (!sessionId) {
    sessionId = generateSessionId();
    sessionStorage.setItem('stevens_session_id', sessionId);
    sessionStorage.setItem('session_start_time', Date.now().toString());
    isNewSession = true;
  }
  
  // Get session start time
  const sessionStartTime = parseInt(
    sessionStorage.getItem('session_start_time') || Date.now().toString(),
    10
  );
  
  // Calculate session duration
  const sessionDuration = Math.floor((Date.now() - sessionStartTime) / 1000);
  
  // Get pages viewed in this session
  const pagesInSession = JSON.parse(
    sessionStorage.getItem('pages_in_session') || '[]'
  );
  
  // Get events count in this session
  const eventsInSession = parseInt(
    sessionStorage.getItem('events_in_session') || '0',
    10
  );
  
  return {
    anonymousUserId,
    sessionId,
    isNewSession,
    isReturningUser: isReturningUser(),
    totalSessions: isNewSession ? incrementSessionCount() : getSessionCount(),
    daysSinceFirstVisit: getDaysSinceFirstVisit(),
    lastVisitDate: getLastVisitDate(),
    sessionStartTime,
    sessionDuration,
    pagesInSession,
    eventsInSession
  };
};

/**
 * Track page view in session
 */
export const trackPageInSession = (pagePath) => {
  const pages = JSON.parse(sessionStorage.getItem('pages_in_session') || '[]');
  pages.push({
    path: pagePath,
    timestamp: Date.now()
  });
  sessionStorage.setItem('pages_in_session', JSON.stringify(pages));
};

/**
 * Increment events count in session
 */
export const incrementEventsInSession = () => {
  const count = parseInt(sessionStorage.getItem('events_in_session') || '0', 10);
  sessionStorage.setItem('events_in_session', (count + 1).toString());
};

/**
 * Get device fingerprint (privacy-safe, no PII)
 */
export const getDeviceFingerprint = () => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  ctx.textBaseline = 'top';
  ctx.font = '14px Arial';
  ctx.fillText('fingerprint', 2, 2);
  
  const fingerprint = canvas.toDataURL();
  
  // Simple hash function
  let hash = 0;
  for (let i = 0; i < fingerprint.length; i++) {
    const char = fingerprint.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  return `fp_${Math.abs(hash).toString(36)}`;
};

/**
 * Reset user identity (for testing or privacy)
 */
export const resetUserIdentity = () => {
  localStorage.removeItem('stevens_anonymous_user_id');
  localStorage.removeItem('stevens_first_visit_date');
  localStorage.removeItem('stevens_last_visit_date');
  localStorage.removeItem('stevens_session_count');
  sessionStorage.clear();
  setCookie('stevens_user_id', '', -1); // Delete cookie
};

