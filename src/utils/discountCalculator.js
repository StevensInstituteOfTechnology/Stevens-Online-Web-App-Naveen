/**
 * Corporate Discount Calculator Engine v2
 * Simplified calculator with checkbox-based discounts and annual reimbursement splitting
 */

import discountConfig from '@/data/discount-config.json';

export class DiscountCalculator {
  constructor(programCode, options = {}) {
    this.programCode = programCode;
    this.options = options; // { isWorkforcePartner, isHobokenResident, isStevensAlumni, annualReimbursement }
    this.config = discountConfig;
    this.program = this.config.programs[programCode];
    
    if (!this.program) {
      throw new Error(`Program ${programCode} not found in configuration`);
    }
  }

  /**
   * Main calculation method - returns complete breakdown
   */
  calculate() {
    let currentPrice = this.program.basePrice;
    const breakdown = {
      programCode: this.programCode,
      programName: this.program.name,
      basePrice: this.program.basePrice,
      credits: this.getCreditsInfo(),
      durationYears: this.program.durationYears,
      programType: this.program.programType,
      steps: []
    };

    // Step 1: Apply Workforce Partner Discount (20%)
    const workforceDiscount = this.applyWorkforcePartnerDiscount(currentPrice);
    if (workforceDiscount) {
      breakdown.steps.push(workforceDiscount);
      currentPrice = workforceDiscount.priceAfter;
    }

    // Step 2: Apply Hoboken Resident Discount (15%)
    const hobokenDiscount = this.applyHobokenDiscount(currentPrice);
    if (hobokenDiscount) {
      breakdown.steps.push(hobokenDiscount);
      currentPrice = hobokenDiscount.priceAfter;
    }

    // Step 3: Apply Alumni Discount (15%)
    const alumniDiscount = this.applyAlumniDiscount(currentPrice);
    if (alumniDiscount) {
      breakdown.steps.push(alumniDiscount);
      currentPrice = alumniDiscount.priceAfter;
    }

    // Step 4: Apply employer reimbursement (split by program duration)
    const reimbursement = this.applyEmployerReimbursement(currentPrice);
    if (reimbursement) {
      breakdown.steps.push(reimbursement);
      currentPrice = reimbursement.priceAfter;
    }

    // Calculate totals
    const totalDiscount = breakdown.basePrice - currentPrice;
    const percentSaved = breakdown.basePrice > 0 
      ? Math.round((totalDiscount / breakdown.basePrice) * 100) 
      : 0;

    return {
      ...breakdown,
      finalPrice: Math.max(0, currentPrice),
      totalDiscount,
      percentSaved
    };
  }

  /**
   * Get credits information for the program
   */
  getCreditsInfo() {
    const credits = this.program.credits;
    if (credits.type === 'fixed') {
      return {
        type: 'fixed',
        value: credits.value
      };
    } else if (credits.type === 'variable') {
      return {
        type: 'variable',
        min: credits.min,
        typical: credits.typical,
        max: credits.max,
        description: credits.description
      };
    }
  }

  /**
   * Apply Workforce Development Partner Discount (20%)
   */
  applyWorkforcePartnerDiscount(currentPrice) {
    if (!this.options.isWorkforcePartner) {
      return null;
    }
    
    const discount = this.config.discounts.workforcePartner;
    
    if (!discount.enabled) return null;
    if (discount.eligibility.excludedPrograms.includes(this.programCode)) return null;
    if (!discount.applicablePrograms.includes(this.programCode)) return null;

    const discountAmount = Math.round(currentPrice * discount.value);
    const priceAfter = currentPrice - discountAmount;

    return {
      type: 'percentage',
      name: discount.name,
      discountAmount,
      priceBefore: currentPrice,
      priceAfter,
      percentage: discount.value * 100,
      description: discount.eligibility.description,
      icon: 'building'
    };
  }

  /**
   * Apply Hoboken Resident Discount (15%)
   */
  applyHobokenDiscount(currentPrice) {
    if (!this.options.isHobokenResident) {
      return null;
    }
    
    const discount = this.config.discounts.hobokenResident;
    
    if (!discount.enabled) return null;
    if (discount.eligibility.excludedPrograms.includes(this.programCode)) return null;
    if (!discount.applicablePrograms.includes(this.programCode)) return null;

    const discountAmount = Math.round(currentPrice * discount.value);
    const priceAfter = currentPrice - discountAmount;

    return {
      type: 'percentage',
      name: discount.name,
      discountAmount,
      priceBefore: currentPrice,
      priceAfter,
      percentage: discount.value * 100,
      description: discount.eligibility.description,
      icon: 'home'
    };
  }

  /**
   * Apply Stevens Alumni Discount (15%)
   */
  applyAlumniDiscount(currentPrice) {
    if (!this.options.isStevensAlumni) {
      return null;
    }
    
    const discount = this.config.discounts.alumniDiscount;
    
    if (!discount.enabled) return null;
    if (discount.eligibility.excludedPrograms.includes(this.programCode)) return null;
    if (!discount.applicablePrograms.includes(this.programCode)) return null;

    const discountAmount = Math.round(currentPrice * discount.value);
    const priceAfter = currentPrice - discountAmount;

    return {
      type: 'percentage',
      name: discount.name,
      discountAmount,
      priceBefore: currentPrice,
      priceAfter,
      percentage: discount.value * 100,
      description: discount.eligibility.description,
      icon: 'graduation-cap'
    };
  }

  /**
   * Apply employer reimbursement
   * Splits annual reimbursement across program duration (1 or 2 years)
   */
  applyEmployerReimbursement(currentPrice) {
    // Only apply if user has explicitly entered a reimbursement amount
    if (this.options.annualReimbursement === undefined || 
        this.options.annualReimbursement === null || 
        this.options.annualReimbursement === '') {
      return null;
    }

    const annualAmount = parseFloat(this.options.annualReimbursement) || 0;
    
    if (annualAmount <= 0) return null;

    // Get program duration in years
    const durationYears = this.program.durationYears || 2;
    
    // Calculate total reimbursement based on program duration
    const totalReimbursement = annualAmount * durationYears;
    const actualReimbursement = Math.min(totalReimbursement, currentPrice);
    const priceAfter = Math.max(0, currentPrice - actualReimbursement);

    return {
      type: 'reimbursement',
      name: 'Employer Tuition Reimbursement',
      discountAmount: actualReimbursement,
      priceBefore: currentPrice,
      priceAfter,
      annualAmount,
      durationYears,
      totalReimbursement,
      description: `$${annualAmount.toLocaleString()}/year × ${durationYears} year${durationYears > 1 ? 's' : ''} = $${totalReimbursement.toLocaleString()} total`,
      icon: 'briefcase'
    };
  }

  /**
   * Get program duration in years
   */
  getProgramDuration() {
    return this.program.durationYears || 2;
  }

  /**
   * Get discount configuration info for UI
   */
  static getDiscountInfo() {
    return {
      workforcePartner: {
        percentage: discountConfig.discounts.workforcePartner.value * 100,
        description: discountConfig.discounts.workforcePartner.eligibility.description
      },
      hobokenResident: {
        percentage: discountConfig.discounts.hobokenResident.value * 100,
        description: discountConfig.discounts.hobokenResident.eligibility.description
      },
      alumniDiscount: {
        percentage: discountConfig.discounts.alumniDiscount.value * 100,
        description: discountConfig.discounts.alumniDiscount.eligibility.description
      },
      employerReimbursement: {
        defaultAnnual: discountConfig.employerReimbursement.defaultAnnual,
        irsLimit: discountConfig.employerReimbursement.irsLimit,
        maxAnnual: discountConfig.employerReimbursement.maxAnnual ?? 5250,
        description: discountConfig.employerReimbursement.description
      }
    };
  }

  /**
   * Get program recommendations based on interest and credential type
   */
  static getProgramRecommendations(interest, credentialType) {
    const recommendations = discountConfig.programRecommendations;
    if (!recommendations[interest]) return [];
    return recommendations[interest][credentialType] || [];
  }
}

/**
 * Helper function for easy usage
 * Updated signature: no longer requires companyId
 */
export const calculateProgramCost = (programCode, options = {}) => {
  try {
    const calculator = new DiscountCalculator(programCode, options);
    return calculator.calculate();
  } catch (error) {
    console.error('Discount calculation error:', error);
    return null;
  }
};

/**
 * Export config for UI components
 */
export const getDiscountConfig = () => discountConfig;

/**
 * Get program pricing info
 */
export const getProgramPricing = (programCode) => {
  return discountConfig.programs[programCode] || null;
};

/**
 * Get discount info for display
 */
export const getDiscountInfo = () => {
  return DiscountCalculator.getDiscountInfo();
};

/**
 * Get program recommendations based on questionnaire answers
 */
export const getProgramRecommendations = (interest, credentialType) => {
  return DiscountCalculator.getProgramRecommendations(interest, credentialType);
};
