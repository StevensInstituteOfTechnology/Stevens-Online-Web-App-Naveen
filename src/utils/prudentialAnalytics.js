/**
 * Prudential Partnership Analytics Tracking
 * GA4-friendly event tracking for the partnership page
 */

/**
 * Track a custom event
 * @param {string} eventName - The event name
 * @param {object} eventParams - Additional event parameters
 */
export const trackEvent = (eventName, eventParams = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      page_path: '/partnerships/prudential',
      ...eventParams
    });
  }
  
  // Console log in development
  if (import.meta.env.DEV) {
    console.log('[Analytics]', eventName, eventParams);
  }
};

// Hero events
export const trackHeroView = () => trackEvent('view_hero');

export const trackQuickNav = (section) => trackEvent('click_quick_nav', { section });

// Rails events
export const trackRailView = (railId) => trackEvent('view_rail', { rail_id: railId });

export const trackProgramCardView = (programId) => trackEvent('view_program_card', { program_id: programId });

export const trackProgramModalOpen = (programId) => trackEvent('open_program_modal', { program_id: programId });

export const trackAddToPath = (programId) => trackEvent('add_to_path', { program_id: programId });

// Configurator events
export const trackConfiguratorOpen = () => trackEvent('open_configurator');

export const trackConfiguratorUpdate = (role, level, format) => 
  trackEvent('configurator_update', { role, level, format });

export const trackConfiguratorGeneratePlan = () => trackEvent('configurator_generate_plan');

// Download events
export const trackDownloadSecurityPacket = () => trackEvent('download_security_packet');

export const trackDownloadExecutiveBrief = () => trackEvent('download_executive_brief');

// CTA events
export const trackStartDesignPilot = () => trackEvent('start_design_pilot');

export const trackSubmitPilotIntake = (formData) => 
  trackEvent('submit_pilot_intake', { 
    role_count: formData.roleCount,
    format: formData.format 
  });

// Compliance events
export const trackComplianceView = (standard) => trackEvent('view_compliance', { standard });

// Case study events
export const trackCaseStudyView = (caseStudyId) => trackEvent('view_case_study', { case_study_id: caseStudyId });

