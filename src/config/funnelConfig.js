/**
 * Funnel Configuration
 * Defines all conversion funnels and micro-funnels across the site
 */

/**
 * Main Conversion Funnel: Landing → Application
 */
export const MAIN_FUNNEL = {
  id: 'landing_to_application',
  name: 'Main Conversion Funnel',
  stages: [
    {
      stage: 1,
      name: 'Landing',
      events: ['page_view'],
      description: 'User lands on any page',
      expectedDuration: 0,
      exitActions: ['bounce', 'navigate_away']
    },
    {
      stage: 2,
      name: 'Awareness',
      events: [
        'program_page_viewed',
        'explore_page_viewed',
        'admissions_page_viewed',
        'homepage_viewed'
      ],
      description: 'User views program information',
      expectedDuration: 60,
      exitActions: ['bounce', 'navigate_to_external']
    },
    {
      stage: 3,
      name: 'Engagement',
      events: [
        'video_played',
        'curriculum_viewed',
        'tuition_viewed',
        'scroll_depth_50',
        'faq_opened',
        'multiple_programs_viewed'
      ],
      description: 'User engages with content',
      expectedDuration: 180,
      exitActions: ['page_exit', 'tab_close']
    },
    {
      stage: 4,
      name: 'Consideration',
      events: [
        'compare_programs_viewed',
        'quiz_started',
        'pricing_viewed',
        'faculty_viewed',
        'outcomes_viewed'
      ],
      description: 'User evaluating options',
      expectedDuration: 300,
      exitActions: ['session_end', 'return_later']
    },
    {
      stage: 5,
      name: 'Interest',
      events: [
        'rfi_form_viewed',
        'rfi_modal_opened',
        'schedule_call_clicked'
      ],
      description: 'User shows active interest',
      expectedDuration: 120,
      exitActions: ['form_abandoned', 'modal_closed']
    },
    {
      stage: 6,
      name: 'Lead Capture',
      events: [
        'rfi_form_submitted',
        'call_scheduled'
      ],
      description: 'User provides contact information',
      expectedDuration: 180,
      isConversion: true,
      conversionValue: 'lead',
      exitActions: ['form_error']
    },
    {
      stage: 7,
      name: 'Application Intent',
      events: [
        'apply_button_clicked',
        'application_modal_opened',
        'application_page_viewed'
      ],
      description: 'User initiates application',
      expectedDuration: 60,
      exitActions: ['modal_closed', 'navigate_away']
    },
    {
      stage: 8,
      name: 'Application Started',
      events: [
        'application_form_started',
        'accelerated_app_started',
        'asap_app_started',
        'standard_app_redirected'
      ],
      description: 'User begins application process',
      expectedDuration: 600,
      isConversion: true,
      conversionValue: 'application_started',
      exitActions: ['application_abandoned']
    },
    {
      stage: 9,
      name: 'Application Submitted',
      events: [
        'application_submitted',
        'application_completed'
      ],
      description: 'User completes application',
      expectedDuration: 0,
      isConversion: true,
      conversionValue: 'application',
      isFinalGoal: true
    }
  ],
  
  // Target conversion rates between stages
  benchmarks: {
    landing_to_awareness: 0.70,
    awareness_to_engagement: 0.50,
    engagement_to_consideration: 0.40,
    consideration_to_interest: 0.30,
    interest_to_lead: 0.20,
    lead_to_intent: 0.15,
    intent_to_started: 0.10,
    started_to_submitted: 0.60
  }
};

/**
 * RFI Form Funnel
 */
export const RFI_FORM_FUNNEL = {
  id: 'rfi_form_completion',
  name: 'Request Info Form Funnel',
  stages: [
    { stage: 1, name: 'Form Viewed', events: ['rfi_form_viewed'] },
    { stage: 2, name: 'Form Opened', events: ['rfi_modal_opened', 'rfi_form_loaded'] },
    { stage: 3, name: 'Form Started', events: ['rfi_form_started'] },
    { stage: 4, name: 'Personal Info Completed', events: ['rfi_personal_info_completed'] },
    { stage: 5, name: 'Contact Info Completed', events: ['rfi_contact_info_completed'] },
    { stage: 6, name: 'Program Selected', events: ['rfi_program_selected'] },
    { stage: 7, name: 'Form Submitted', events: ['rfi_form_submitted'], isConversion: true, conversionValue: 'rfi_lead' }
  ],
  averageTime: 120,
  dropOffThreshold: 300
};

/**
 * Application Modal Funnel (MSCS/MEM)
 */
export const APPLICATION_MODAL_FUNNEL = {
  id: 'application_modal_selection',
  name: 'Application Modal Funnel',
  stages: [
    { stage: 1, name: 'Apply Button Clicked', events: ['apply_button_clicked'] },
    { stage: 2, name: 'Modal Opened', events: ['application_modal_opened'] },
    { stage: 3, name: 'Options Viewed', events: ['application_options_viewed'] },
    { stage: 4, name: 'Option Selected', events: ['asap_selected', 'standard_selected'], isConversion: true, conversionValue: 'application_type_chosen' }
  ],
  averageTime: 30,
  dropOffThreshold: 120
};

/**
 * Program Comparison Funnel
 */
export const COMPARISON_FUNNEL = {
  id: 'program_comparison',
  name: 'Program Comparison Funnel',
  stages: [
    { stage: 1, name: 'Compare Page Viewed', events: ['compare_programs_viewed'] },
    { stage: 2, name: 'Programs Selected', events: ['programs_selected_for_comparison'] },
    { stage: 3, name: 'Comparison Table Viewed', events: ['comparison_table_viewed'] },
    { stage: 4, name: 'Decision Made', events: ['program_selected_from_comparison'] },
    { stage: 5, name: 'Action Taken', events: ['explore_from_comparison', 'apply_from_comparison'], isConversion: true, conversionValue: 'comparison_conversion' }
  ],
  averageTime: 180,
  dropOffThreshold: 600
};

/**
 * Program Readiness Quiz Funnel
 */
export const QUIZ_FUNNEL = {
  id: 'program_readiness_quiz',
  name: 'Program Readiness Quiz Funnel',
  stages: [
    { stage: 1, name: 'Quiz Started', events: ['quiz_started'] },
    { stage: 2, name: 'Question 1 Answered', events: ['quiz_q1_answered'] },
    { stage: 3, name: 'Question 2 Answered', events: ['quiz_q2_answered'] },
    { stage: 4, name: 'Question 3 Answered', events: ['quiz_q3_answered'] },
    { stage: 5, name: 'Question 4 Answered', events: ['quiz_q4_answered'] },
    { stage: 6, name: 'Quiz Completed', events: ['quiz_completed'] },
    { stage: 7, name: 'Results Viewed', events: ['quiz_results_viewed'] },
    { stage: 8, name: 'Action Taken', events: ['explore_from_quiz', 'apply_from_quiz'], isConversion: true, conversionValue: 'quiz_conversion' }
  ],
  averageTime: 90,
  completionRate: 0.65
};

/**
 * Video Engagement Funnel
 */
export const VIDEO_FUNNEL = {
  id: 'video_engagement',
  name: 'Video Engagement Funnel',
  stages: [
    { stage: 1, name: 'Video Viewed', events: ['video_viewed'] },
    { stage: 2, name: 'Video Started', events: ['video_played'] },
    { stage: 3, name: '25% Watched', events: ['video_progress_25'] },
    { stage: 4, name: '50% Watched', events: ['video_progress_50'] },
    { stage: 5, name: '75% Watched', events: ['video_progress_75'] },
    { stage: 6, name: '100% Watched', events: ['video_completed'], isConversion: true, conversionValue: 'video_engagement' }
  ],
  averageTime: 120,
  completionRate: 0.40
};

/**
 * All funnels registry
 */
export const ALL_FUNNELS = {
  main: MAIN_FUNNEL,
  rfi: RFI_FORM_FUNNEL,
  applicationModal: APPLICATION_MODAL_FUNNEL,
  comparison: COMPARISON_FUNNEL,
  quiz: QUIZ_FUNNEL,
  video: VIDEO_FUNNEL
};

/**
 * Get funnel by ID
 */
export const getFunnelById = (funnelId) => {
  return Object.values(ALL_FUNNELS).find(funnel => funnel.id === funnelId);
};

