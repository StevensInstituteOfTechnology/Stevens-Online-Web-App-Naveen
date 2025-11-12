/**
 * usePageTracking Hook
 * Automatically tracks page views, time on page, and scroll depth
 */

import { useEffect, useRef } from 'react';
import { trackPageView, trackTimeOnPage, trackScrollDepth, trackEvent } from '@/utils/analytics/vercelTracking';
import { initializeAttribution } from '@/utils/analytics/attribution';

/**
 * Hook to track page lifecycle
 * @param {Object} options - Tracking options
 * @param {string} options.pageType - Type of page (program, explore, admissions, etc)
 * @param {string} options.programCode - Program code if applicable
 * @param {Object} options.additionalData - Any additional data to track
 */
export const usePageTracking = (options = {}) => {
  const {
    pageType,
    programCode,
    additionalData = {}
  } = options;
  
  const pageLoadTime = useRef(Date.now());
  const scrollDepthTracked = useRef(new Set());
  const hasTrackedView = useRef(false);
  
  useEffect(() => {
    // Track page view (once per mount)
    if (!hasTrackedView.current) {
      // Initialize attribution on page load
      const touchpoint = initializeAttribution();
      
      // Track page view with context
      trackPageView({
        page_type: pageType,
        program_code: programCode,
        ...additionalData,
        ...touchpoint
      });
      
      hasTrackedView.current = true;
    }
    
    // Track scroll depth
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollPercentage = Math.floor(
        ((scrollTop + windowHeight) / documentHeight) * 100
      );
      
      // Track milestones: 25%, 50%, 75%, 100%
      [25, 50, 75, 100].forEach(milestone => {
        if (scrollPercentage >= milestone && !scrollDepthTracked.current.has(milestone)) {
          scrollDepthTracked.current.add(milestone);
          trackScrollDepth(milestone, {
            page_type: pageType,
            program_code: programCode,
            ...additionalData
          });
        }
      });
    };
    
    // Track time on page before unload
    const handleBeforeUnload = () => {
      const timeOnPage = Math.floor((Date.now() - pageLoadTime.current) / 1000);
      trackTimeOnPage(timeOnPage, {
        page_type: pageType,
        program_code: programCode,
        max_scroll_depth: Math.max(...Array.from(scrollDepthTracked.current), 0),
        ...additionalData
      });
    };
    
    // Add event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      
      // Track time on page when component unmounts (SPA navigation)
      const timeOnPage = Math.floor((Date.now() - pageLoadTime.current) / 1000);
      trackTimeOnPage(timeOnPage, {
        page_type: pageType,
        program_code: programCode,
        max_scroll_depth: Math.max(...Array.from(scrollDepthTracked.current), 0),
        unmount_reason: 'spa_navigation',
        ...additionalData
      });
    };
  }, [pageType, programCode, additionalData]);
  
  // Return tracking functions for manual usage if needed
  return {
    trackCustomEvent: (eventName, data) => trackEvent(eventName, {
      page_type: pageType,
      program_code: programCode,
      ...additionalData,
      ...data
    })
  };
};

