/**
 * Google Ads Conversion Tracking Utility
 * Uses gtag.js to track conversion events across the Stevens Online microsite
 */

/**
 * Track a conversion event
 * @param {string} conversionLabel - The Google Ads conversion label
 * @param {object} additionalParams - Optional additional parameters to send with the event
 */
export const trackConversion = (conversionLabel, additionalParams = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      'send_to': `AW-392135590/${conversionLabel}`,
      ...additionalParams,
      'event_callback': () => {
        if (import.meta.env.DEV) {
          console.log('✅ Conversion tracked:', conversionLabel, additionalParams);
        }
      }
    });
  } else if (import.meta.env.DEV) {
    console.warn('⚠️ gtag not available. Conversion not tracked:', conversionLabel);
  }
};

/**
 * Google Ads Conversion Labels
 * Conversion ID: 392135590
 */
export const CONVERSION_LABELS = {
  REQUEST_INFO: 'PhERCJ_CuagbEKaH_roB',           // Request Information - Microsite
  APPLY_NOW: 'RcM_CMyypqobEKaH_roB',              // Apply Now - Microsite (includes ASAP)
  SCHEDULE_CALL: '1ituCM-ypqobEKaH_roB',          // Schedule a Call - Microsite
  MAKE_APPOINTMENT: 'B2ZWCNKypqobEKaH_roB',       // Make An Appointment - Microsite
  GET_PROGRAM_DETAILS: 'Ll4ECNWypqobEKaH_roB'    // Get Program Details - Microsite (form submission)
};

