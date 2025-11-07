/**
 * Funnel Tracking System
 * Automatically tracks user progression through conversion funnels
 */

import { getUserIdentity } from './userIdentity';
import { getAttributionTracker } from './attribution';

/**
 * Funnel Tracker Class
 */
export class FunnelTracker {
  constructor(funnelConfig) {
    this.config = funnelConfig;
    this.userJourney = this.loadUserJourney();
  }
  
  /**
   * Load user's journey from localStorage
   */
  loadUserJourney() {
    const key = `funnel_${this.config.id}`;
    const stored = localStorage.getItem(key);
    
    if (stored) {
      return JSON.parse(stored);
    }
    
    // Initialize new journey
    const identity = getUserIdentity();
    return {
      funnelId: this.config.id,
      funnelName: this.config.name,
      anonymousUserId: identity.anonymousUserId,
      sessionId: identity.sessionId,
      currentStage: 0,
      highestStageReached: 0,
      stagesCompleted: [],
      stageTimestamps: {},
      stageEvents: {},
      startTimestamp: Date.now(),
      lastActivityTimestamp: Date.now(),
      totalTimeInFunnel: 0,
      dropOffPoint: null,
      dropOffReason: null,
      isConverted: false,
      conversionTimestamp: null,
      conversionValue: null,
      conversions: [] // Track all conversions
    };
  }
  
  /**
   * Save user journey to localStorage
   */
  saveUserJourney() {
    const key = `funnel_${this.config.id}`;
    
    // Update total time in funnel
    this.userJourney.totalTimeInFunnel = Math.floor(
      (Date.now() - this.userJourney.startTimestamp) / 1000
    );
    
    // Update last activity
    this.userJourney.lastActivityTimestamp = Date.now();
    
    localStorage.setItem(key, JSON.stringify(this.userJourney));
  }
  
  /**
   * Find stage for a given event
   */
  findStageForEvent(eventName) {
    return this.config.stages.find(stage => 
      stage.events.includes(eventName)
    );
  }
  
  /**
   * Track event and progress funnel if applicable
   */
  trackEvent(eventName, eventData = {}) {
    const stage = this.findStageForEvent(eventName);
    
    if (!stage) {
      // Event not part of this funnel
      return null;
    }
    
    // Record event in stage
    if (!this.userJourney.stageEvents[stage.stage]) {
      this.userJourney.stageEvents[stage.stage] = [];
    }
    this.userJourney.stageEvents[stage.stage].push({
      event: eventName,
      timestamp: Date.now(),
      data: eventData
    });
    
    // Check if user progressed to new stage
    if (stage.stage > this.userJourney.currentStage) {
      return this.progressToStage(stage, eventName, eventData);
    }
    
    this.saveUserJourney();
    return null;
  }
  
  /**
   * Progress user to new funnel stage
   */
  progressToStage(stage, triggerEvent, eventData) {
    const previousStage = this.userJourney.currentStage;
    const previousStageName = previousStage > 0 
      ? this.config.stages[previousStage - 1]?.name 
      : 'Entry';
    
    // Update journey
    this.userJourney.currentStage = stage.stage;
    
    if (stage.stage > this.userJourney.highestStageReached) {
      this.userJourney.highestStageReached = stage.stage;
    }
    
    if (!this.userJourney.stagesCompleted.includes(stage.stage)) {
      this.userJourney.stagesCompleted.push(stage.stage);
    }
    
    this.userJourney.stageTimestamps[stage.stage] = Date.now();
    
    // Calculate time since last stage
    const timeSinceLastStage = this.getTimeSinceStage(previousStage);
    
    // Check if this stage is a conversion
    if (stage.isConversion) {
      this.markConversion(stage, triggerEvent);
    }
    
    this.saveUserJourney();
    
    // Return progression data for tracking
    return {
      funnel_id: this.config.id,
      funnel_name: this.config.name,
      previous_stage: previousStage,
      previous_stage_name: previousStageName,
      new_stage: stage.stage,
      new_stage_name: stage.name,
      trigger_event: triggerEvent,
      time_since_previous_stage_seconds: timeSinceLastStage,
      total_time_in_funnel_seconds: this.userJourney.totalTimeInFunnel,
      stages_completed_count: this.userJourney.stagesCompleted.length,
      completion_percentage: (stage.stage / this.config.stages.length) * 100,
      is_conversion: stage.isConversion || false,
      conversion_value: stage.conversionValue || null,
      is_final_goal: stage.isFinalGoal || false,
      ...eventData
    };
  }
  
  /**
   * Mark conversion in funnel
   */
  markConversion(stage, triggerEvent) {
    const identity = getUserIdentity();
    const attribution = getAttributionTracker().getAttributionForConversion();
    
    const conversion = {
      stage: stage.stage,
      stageName: stage.name,
      conversionValue: stage.conversionValue,
      timestamp: Date.now(),
      triggerEvent,
      timeToConvert: this.userJourney.totalTimeInFunnel,
      sessionsToConvert: identity.totalSessions,
      daysToConvert: identity.daysSinceFirstVisit,
      attribution
    };
    
    this.userJourney.conversions.push(conversion);
    
    // Mark final conversion flag
    if (stage.isFinalGoal) {
      this.userJourney.isConverted = true;
      this.userJourney.conversionTimestamp = Date.now();
      this.userJourney.conversionValue = stage.conversionValue;
    }
  }
  
  /**
   * Track drop-off from funnel
   */
  trackDropOff(reason) {
    if (this.userJourney.dropOffPoint !== null) {
      // Already tracked drop-off
      return;
    }
    
    this.userJourney.dropOffPoint = this.userJourney.currentStage;
    this.userJourney.dropOffReason = reason;
    this.saveUserJourney();
    
    return {
      funnel_id: this.config.id,
      funnel_name: this.config.name,
      drop_off_stage: this.userJourney.currentStage,
      drop_off_stage_name: this.config.stages[this.userJourney.currentStage - 1]?.name || 'Entry',
      drop_off_reason: reason,
      stages_completed: this.userJourney.stagesCompleted.length,
      time_in_funnel_seconds: this.userJourney.totalTimeInFunnel,
      completion_percentage: (this.userJourney.currentStage / this.config.stages.length) * 100
    };
  }
  
  /**
   * Get time since specific stage
   */
  getTimeSinceStage(stageNumber) {
    if (stageNumber === 0) {
      return Math.floor((Date.now() - this.userJourney.startTimestamp) / 1000);
    }
    
    const stageTimestamp = this.userJourney.stageTimestamps[stageNumber];
    if (!stageTimestamp) return 0;
    
    return Math.floor((Date.now() - stageTimestamp) / 1000);
  }
  
  /**
   * Get current stage info
   */
  getCurrentStage() {
    if (this.userJourney.currentStage === 0) return null;
    return this.config.stages[this.userJourney.currentStage - 1];
  }
  
  /**
   * Get next stage info
   */
  getNextStage() {
    const nextStageIndex = this.userJourney.currentStage;
    return this.config.stages[nextStageIndex] || null;
  }
  
  /**
   * Get completion percentage
   */
  getCompletionPercentage() {
    return (this.userJourney.currentStage / this.config.stages.length) * 100;
  }
  
  /**
   * Check if user has converted
   */
  hasConverted() {
    return this.userJourney.isConverted;
  }
  
  /**
   * Get all conversions in this funnel
   */
  getConversions() {
    return this.userJourney.conversions;
  }
  
  /**
   * Reset funnel (for testing)
   */
  reset() {
    const key = `funnel_${this.config.id}`;
    localStorage.removeItem(key);
    this.userJourney = this.loadUserJourney();
  }
  
  /**
   * Get journey summary for analytics
   */
  getJourneySummary() {
    const identity = getUserIdentity();
    const attribution = getAttributionTracker().getAttributionForConversion();
    
    return {
      // Funnel info
      funnel_id: this.config.id,
      funnel_name: this.config.name,
      
      // User identity
      anonymous_user_id: this.userJourney.anonymousUserId,
      session_id: identity.sessionId,
      total_sessions: identity.totalSessions,
      days_since_first_visit: identity.daysSinceFirstVisit,
      
      // Progress
      current_stage: this.userJourney.currentStage,
      current_stage_name: this.getCurrentStage()?.name,
      highest_stage_reached: this.userJourney.highestStageReached,
      stages_completed: this.userJourney.stagesCompleted,
      completion_percentage: this.getCompletionPercentage(),
      
      // Timing
      total_time_in_funnel_seconds: this.userJourney.totalTimeInFunnel,
      time_since_last_activity_seconds: Math.floor(
        (Date.now() - this.userJourney.lastActivityTimestamp) / 1000
      ),
      
      // Conversion
      is_converted: this.userJourney.isConverted,
      conversions_count: this.userJourney.conversions.length,
      conversions: this.userJourney.conversions,
      
      // Drop-off
      drop_off_point: this.userJourney.dropOffPoint,
      drop_off_reason: this.userJourney.dropOffReason,
      
      // Attribution
      attribution
    };
  }
}

/**
 * Funnel Manager - Manages all funnels
 */
export class FunnelManager {
  constructor(funnelConfigs) {
    this.funnels = {};
    Object.entries(funnelConfigs).forEach(([key, config]) => {
      this.funnels[key] = new FunnelTracker(config);
    });
  }
  
  /**
   * Track event across all funnels
   */
  trackEvent(eventName, eventData = {}) {
    const progressions = [];
    
    Object.values(this.funnels).forEach(funnel => {
      const progression = funnel.trackEvent(eventName, eventData);
      if (progression) {
        progressions.push(progression);
      }
    });
    
    return progressions;
  }
  
  /**
   * Get specific funnel
   */
  getFunnel(funnelKey) {
    return this.funnels[funnelKey];
  }
  
  /**
   * Get all journey summaries
   */
  getAllJourneySummaries() {
    const summaries = {};
    Object.entries(this.funnels).forEach(([key, funnel]) => {
      summaries[key] = funnel.getJourneySummary();
    });
    return summaries;
  }
  
  /**
   * Reset all funnels (for testing)
   */
  resetAll() {
    Object.values(this.funnels).forEach(funnel => funnel.reset());
  }
}

/**
 * Calculate conversion yield between stages
 * (This would be done on Vercel Analytics dashboard, but included for reference)
 */
export const calculateStageYield = (fromStage, toStage, totalUsers, usersProgressed) => {
  if (totalUsers === 0) return 0;
  return (usersProgressed / totalUsers) * 100;
};

