/**
 * Stevens Form IDs Configuration
 * Centralized management of all external form container IDs
 */

export const FORM_IDS = {
  /** Request Information Form (RFI) */
  RFI: 'form_f55a243b-abd6-45ea-8ff2-cd7f7af4d532',
  
  /** ASAP Application Form */
  ASAP: 'form_9268876a-a7c7-484d-a41e-7d0cb4c5613c',
  
  /** Accelerated Application Form */
  ACCELERATED: 'form_89080626-7bc4-4c48-9437-fd47479d7371'
};

/** Wrapper class names for styling - no hardcoded IDs in CSS */
export const FORM_CLASSES = {
  RFI: 'slate-form-rfi',
  ASAP: 'slate-form-asap',
  ACCELERATED: 'slate-form-accelerated',
};

/** Shared wrapper class applied to all Slate form containers */
export const SLATE_FORM_WRAPPER = 'slate-form-wrapper';

/**
 * Get all form IDs as an array
 */
export const getAllFormIds = () => Object.values(FORM_IDS);

/**
 * Generate CSS selector for all forms
 * Returns: "#form_id1, #form_id2, #form_id3"
 */
export const getFormSelector = () => {
  return getAllFormIds().map(id => `#${id}`).join(', ');
};

/**
 * Check if an ID is a valid form ID
 */
export const isValidFormId = (id) => {
  return Object.values(FORM_IDS).includes(id);
};

/**
 * Get the Slate UUID from a form ID (strips "form_" prefix)
 * @param {string} formId - Full form ID (e.g. "form_89080626-7bc4-4c48-9437-fd47479d7371")
 * @returns {string} - UUID for Slate URL id param
 */
export const getSlateUuid = (formId) => {
  return (formId || '').replace(/^form_/, '');
};

/**
 * Build Slate embed URL for a form
 * @param {string} formId - Full form ID from FORM_IDS (e.g. FORM_IDS.ACCELERATED)
 * @param {URLSearchParams|object} [params] - Optional URL params to append
 * @returns {string} - Full Slate register/embed URL
 */
export const buildSlateEmbedUrl = (formId, params = {}) => {
  const uuid = getSlateUuid(formId);
  const base = `https://gradadmissions.stevens.edu/register/?id=${uuid}&output=embed&div=${formId}`;
  const search = new URLSearchParams(params).toString();
  return search ? `${base}&${search}` : base;
};

