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

