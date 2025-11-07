/**
 * useFormTracking Hook
 * Automatically tracks form lifecycle: view, start, field completion, submit, errors, abandonment
 */

import { useEffect, useRef, useState } from 'react';
import { trackEvent, trackFunnelDropOff } from '@/utils/analytics/vercelTracking';

/**
 * Hook to track form interactions
 * @param {Object} options - Tracking options
 * @param {string} options.formName - Name of the form (rfi, application, contact, etc)
 * @param {string} options.programCode - Program code if applicable
 * @param {string} options.sourcePage - Source page identifier
 */
export const useFormTracking = (options = {}) => {
  const {
    formName,
    programCode,
    sourcePage
  } = options;
  
  const formLoadTime = useRef(Date.now());
  const formStartTime = useRef(null);
  const hasTrackedView = useRef(false);
  const hasTrackedStart = useRef(false);
  const fieldsCompleted = useRef(new Set());
  const [formState, setFormState] = useState('idle'); // idle, started, submitting, submitted, error
  
  // Track form view on mount
  useEffect(() => {
    if (!hasTrackedView.current) {
      trackEvent(`${formName}_form_viewed`, {
        form_name: formName,
        program_code: programCode,
        source_page: sourcePage
      });
      hasTrackedView.current = true;
    }
    
    // Track form abandonment on unmount
    return () => {
      if (formState === 'started' && formState !== 'submitted') {
        const timeSpent = formStartTime.current 
          ? Math.floor((Date.now() - formStartTime.current) / 1000)
          : 0;
        
        trackEvent(`${formName}_form_abandoned`, {
          form_name: formName,
          program_code: programCode,
          source_page: sourcePage,
          fields_completed_count: fieldsCompleted.current.size,
          time_spent_seconds: timeSpent,
          abandonment_reason: 'page_exit'
        });
        
        // Track funnel drop-off
        trackFunnelDropOff('rfi', 'form_abandoned');
      }
    };
  }, [formName, programCode, sourcePage, formState]);
  
  /**
   * Track form start (first field interaction)
   */
  const trackFormStart = (fieldName) => {
    if (!hasTrackedStart.current) {
      formStartTime.current = Date.now();
      setFormState('started');
      
      trackEvent(`${formName}_form_started`, {
        form_name: formName,
        program_code: programCode,
        source_page: sourcePage,
        first_field: fieldName
      });
      
      hasTrackedStart.current = true;
    }
  };
  
  /**
   * Track field completion
   */
  const trackFieldCompleted = (fieldName) => {
    if (!fieldsCompleted.current.has(fieldName)) {
      fieldsCompleted.current.add(fieldName);
      
      const timeToComplete = formStartTime.current
        ? Math.floor((Date.now() - formStartTime.current) / 1000)
        : 0;
      
      trackEvent(`${formName}_field_completed`, {
        form_name: formName,
        field_name: fieldName,
        program_code: programCode,
        source_page: sourcePage,
        fields_completed_count: fieldsCompleted.current.size,
        time_to_complete_seconds: timeToComplete
      });
      
      // Track specific milestones
      if (fieldName === 'email' && fieldsCompleted.current.size >= 2) {
        trackEvent(`${formName}_personal_info_completed`, {
          form_name: formName,
          program_code: programCode,
          source_page: sourcePage
        });
      }
      
      if (fieldName === 'phone' && fieldsCompleted.current.size >= 4) {
        trackEvent(`${formName}_contact_info_completed`, {
          form_name: formName,
          program_code: programCode,
          source_page: sourcePage
        });
      }
    }
  };
  
  /**
   * Track form submission
   */
  const trackFormSubmit = () => {
    setFormState('submitting');
    
    const completionTime = formStartTime.current
      ? Math.floor((Date.now() - formStartTime.current) / 1000)
      : 0;
    
    trackEvent(`${formName}_form_submitted`, {
      form_name: formName,
      program_code: programCode,
      source_page: sourcePage,
      fields_filled: fieldsCompleted.current.size,
      completion_time_seconds: completionTime,
      is_conversion: true
    });
    
    setFormState('submitted');
  };
  
  /**
   * Track form error
   */
  const trackFormError = (errorType, fieldName) => {
    trackEvent(`${formName}_form_error`, {
      form_name: formName,
      error_type: errorType,
      field_name: fieldName,
      program_code: programCode,
      source_page: sourcePage
    });
  };
  
  /**
   * Get field props with automatic tracking
   */
  const getFieldProps = (fieldName) => ({
    onFocus: () => {
      trackFormStart(fieldName);
    },
    onBlur: (e) => {
      if (e.target.value && e.target.value.trim() !== '') {
        trackFieldCompleted(fieldName);
      }
    }
  });
  
  /**
   * Get form props with automatic tracking
   */
  const getFormProps = () => ({
    onSubmit: (e) => {
      trackFormSubmit();
    }
  });
  
  return {
    // State
    formState,
    
    // Tracking functions
    trackFormStart,
    trackFieldCompleted,
    trackFormSubmit,
    trackFormError,
    
    // Helper props
    getFieldProps,
    getFormProps,
    
    // Manual tracking
    trackCustomEvent: (eventName, data) => trackEvent(eventName, {
      form_name: formName,
      program_code: programCode,
      source_page: sourcePage,
      ...data
    })
  };
};

