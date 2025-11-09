import { useState, useEffect } from 'react';

/**
 * Custom hook to detect user's reduced motion preference
 * Returns true if user prefers reduced motion
 */
export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    // Set initial value
    setPrefersReducedMotion(mediaQuery.matches);

    // Listen for changes
    const handleChange = (event) => {
      setPrefersReducedMotion(event.matches);
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } 
    // Fallback for older browsers
    else {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  return prefersReducedMotion;
}

/**
 * Get animation variants that respect reduced motion preference
 * @param {boolean} shouldReduceMotion - Whether to reduce motion
 * @param {object} fullMotion - Full motion variants
 * @param {object} reducedMotion - Reduced motion variants (defaults to opacity only)
 */
export function getMotionVariants(shouldReduceMotion, fullMotion, reducedMotion = null) {
  if (shouldReduceMotion) {
    return reducedMotion || {
      hidden: { opacity: 0 },
      visible: { opacity: 1 }
    };
  }
  return fullMotion;
}

/**
 * Get transition settings that respect reduced motion
 * @param {boolean} shouldReduceMotion - Whether to reduce motion
 * @param {object} fullTransition - Full transition settings
 */
export function getMotionTransition(shouldReduceMotion, fullTransition = {}) {
  if (shouldReduceMotion) {
    return {
      duration: 0.01,
      ease: 'linear'
    };
  }
  return fullTransition;
}

