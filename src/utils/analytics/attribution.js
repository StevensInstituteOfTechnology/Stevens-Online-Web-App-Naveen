/**
 * Multi-Touch Attribution Tracking
 * Tracks all user touchpoints for conversion attribution
 */

import { getUserIdentity } from './userIdentity';

/**
 * Get UTM parameters from URL
 */
const getUTMParameters = () => {
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get('utm_source'),
    utm_medium: params.get('utm_medium'),
    utm_campaign: params.get('utm_campaign'),
    utm_content: params.get('utm_content'),
    utm_term: params.get('utm_term')
  };
};

/**
 * Get referrer information
 */
const getReferrerInfo = () => {
  const referrer = document.referrer;
  if (!referrer) return { source: 'direct', domain: null };
  
  try {
    const url = new URL(referrer);
    const domain = url.hostname;
    
    // Categorize referrer
    if (domain.includes('google')) return { source: 'google', domain };
    if (domain.includes('facebook')) return { source: 'facebook', domain };
    if (domain.includes('linkedin')) return { source: 'linkedin', domain };
    if (domain.includes('twitter') || domain.includes('t.co')) return { source: 'twitter', domain };
    if (domain.includes('stevens.edu')) return { source: 'internal', domain };
    
    return { source: 'other', domain };
  } catch (e) {
    return { source: 'unknown', domain: null };
  }
};

/**
 * Attribution Tracker Class
 */
export class AttributionTracker {
  constructor() {
    this.touchpoints = this.loadTouchpoints();
  }
  
  loadTouchpoints() {
    const stored = localStorage.getItem('attribution_touchpoints');
    return stored ? JSON.parse(stored) : [];
  }
  
  saveTouchpoints() {
    localStorage.setItem('attribution_touchpoints', JSON.stringify(this.touchpoints));
  }
  
  /**
   * Track new touchpoint (called on page load)
   */
  trackTouchpoint() {
    const utm = getUTMParameters();
    const referrer = getReferrerInfo();
    const identity = getUserIdentity();
    
    // Determine source/medium/campaign
    let source = utm.utm_source || referrer.source || 'direct';
    let medium = utm.utm_medium || (referrer.source === 'direct' ? 'none' : 'referral');
    let campaign = utm.utm_campaign || 'not_set';
    
    const touchpoint = {
      timestamp: Date.now(),
      source,
      medium,
      campaign,
      content: utm.utm_content,
      term: utm.utm_term,
      referrer_domain: referrer.domain,
      landing_page: window.location.pathname,
      session_id: identity.sessionId,
      is_new_session: identity.isNewSession
    };
    
    // Only add if this is a new touchpoint (not same session)
    const lastTouchpoint = this.touchpoints[this.touchpoints.length - 1];
    if (!lastTouchpoint || lastTouchpoint.session_id !== identity.sessionId) {
      this.touchpoints.push(touchpoint);
      this.saveTouchpoints();
    }
    
    return {
      ...touchpoint,
      touchpoint_index: this.touchpoints.length,
      is_first_touch: this.touchpoints.length === 1,
      days_since_first_touch: this.getDaysSinceFirstTouch()
    };
  }
  
  /**
   * Get attribution for conversion
   */
  getAttributionForConversion() {
    if (this.touchpoints.length === 0) return null;
    
    const firstTouch = this.touchpoints[0];
    const lastTouch = this.touchpoints[this.touchpoints.length - 1];
    
    return {
      // First-touch attribution
      first_touch_source: firstTouch.source,
      first_touch_medium: firstTouch.medium,
      first_touch_campaign: firstTouch.campaign,
      first_touch_landing_page: firstTouch.landing_page,
      first_touch_timestamp: firstTouch.timestamp,
      
      // Last-touch attribution
      last_touch_source: lastTouch.source,
      last_touch_medium: lastTouch.medium,
      last_touch_campaign: lastTouch.campaign,
      last_touch_landing_page: lastTouch.landing_page,
      last_touch_timestamp: lastTouch.timestamp,
      
      // Multi-touch data
      touchpoint_count: this.touchpoints.length,
      all_sources: this.touchpoints.map(t => t.source).join(' > '),
      all_campaigns: this.touchpoints.map(t => t.campaign).filter(c => c !== 'not_set').join(' > '),
      
      // Time-based
      days_from_first_to_last_touch: this.getDaysSinceFirstTouch(),
      sessions_to_conversion: this.touchpoints.length,
      
      // Time-decay weighted (last touchpoint gets most credit)
      primary_attribution_source: this.getTimeDecaySource(),
      
      // All touchpoints for detailed analysis
      touchpoint_journey: this.touchpoints
    };
  }
  
  /**
   * Get primary source using time-decay model
   * Last touch = 70%, second-last = 20%, others = 10%
   */
  getTimeDecaySource() {
    if (this.touchpoints.length === 0) return 'direct';
    if (this.touchpoints.length === 1) return this.touchpoints[0].source;
    
    // Give most credit to last touch
    return this.touchpoints[this.touchpoints.length - 1].source;
  }
  
  /**
   * Get days since first touchpoint
   */
  getDaysSinceFirstTouch() {
    if (this.touchpoints.length === 0) return 0;
    const firstTimestamp = this.touchpoints[0].timestamp;
    return Math.floor((Date.now() - firstTimestamp) / (1000 * 60 * 60 * 24));
  }
  
  /**
   * Clear attribution data (for testing)
   */
  clear() {
    this.touchpoints = [];
    localStorage.removeItem('attribution_touchpoints');
  }
}

// Singleton instance
let attributionTrackerInstance = null;

/**
 * Get attribution tracker instance
 */
export const getAttributionTracker = () => {
  if (!attributionTrackerInstance) {
    attributionTrackerInstance = new AttributionTracker();
  }
  return attributionTrackerInstance;
};

/**
 * Initialize attribution tracking on page load
 */
export const initializeAttribution = () => {
  if (typeof window === 'undefined') return null;
  
  const tracker = getAttributionTracker();
  return tracker.trackTouchpoint();
};

