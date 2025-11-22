/**
 * Corporate Discount Calculator Engine
 * Flexible system to calculate program costs with multiple discount layers
 */

import discountConfig from '@/data/discount-config.json';

export class DiscountCalculator {
  constructor(programCode, companyId, options = {}) {
    this.programCode = programCode;
    this.companyId = companyId;
    this.options = options; // { applyCPEDiscount, isHobokenResident, applicationDate, customReimbursement }
    this.config = discountConfig;
    this.program = this.config.programs[programCode];
    this.company = this.config.corporatePartners.find(c => c.id === companyId);
    
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
      steps: [],
      hasSpecialCohort: false
    };

    // Step 1: Apply cohort pricing (if applicable)
    const cohortResult = this.applyCohortPricing(currentPrice);
    if (cohortResult) {
      breakdown.steps.push(cohortResult.step);
      breakdown.hasSpecialCohort = true;
      breakdown.cohortPricing = cohortResult.pricing;
      currentPrice = cohortResult.step.priceAfter;
    }

    // Step 2: Apply CPE Retail Discount (if eligible)
    if (!breakdown.hasSpecialCohort) {
      const cpeDiscount = this.applyCPERetailDiscount(currentPrice);
      if (cpeDiscount) {
        breakdown.steps.push(cpeDiscount);
        currentPrice = cpeDiscount.priceAfter;
      }
    }

    // Step 3: Apply stackable discounts (Hoboken, etc.)
    if (!breakdown.hasSpecialCohort) {
      const stackableDiscounts = this.applyStackableDiscounts(currentPrice);
      if (stackableDiscounts.length > 0) {
        breakdown.steps.push(...stackableDiscounts);
        currentPrice = stackableDiscounts[stackableDiscounts.length - 1].priceAfter;
      }
    }

    // Step 4: Apply employer reimbursement
    const reimbursement = this.applyEmployerReimbursement(currentPrice);
    if (reimbursement) {
      breakdown.steps.push(reimbursement);
      currentPrice = reimbursement.priceAfter;
    }

    // Calculate totals
    const totalDiscount = breakdown.basePrice - currentPrice;
    const percentSaved = Math.round((totalDiscount / breakdown.basePrice) * 100);

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
   * Apply special cohort pricing
   */
  applyCohortPricing(currentPrice) {
    if (!this.company?.hasSpecialCohort) return null;
    if (!this.program.cohortPricing[this.companyId]) return null;

    const cohortConfig = this.program.cohortPricing[this.companyId];
    const credits = this.program.credits;

    if (cohortConfig.type === 'per_credit') {
      // Variable or fixed credit pricing
      if (credits.type === 'variable') {
        // Calculate range for variable credits
        const minPrice = Math.round(cohortConfig.perCredit * credits.min);
        const typicalPrice = Math.round(cohortConfig.perCredit * credits.typical);
        const maxPrice = Math.round(cohortConfig.perCredit * credits.max);
        
        const discount = this.program.basePrice - typicalPrice;

        return {
          step: {
            type: 'cohort-variable',
            name: cohortConfig.description,
            discountAmount: discount,
            priceBefore: this.program.basePrice,
            priceAfter: typicalPrice, // Use typical for calculation
            description: `Special pricing for ${this.company.name} employees`,
            icon: 'building'
          },
          pricing: {
            type: 'per_credit',
            perCredit: cohortConfig.perCredit,
            credits: {
              min: { credits: credits.min, price: minPrice },
              typical: { credits: credits.typical, price: typicalPrice },
              max: { credits: credits.max, price: maxPrice }
            }
          }
        };
      } else {
        // Fixed credits
        const cohortPrice = Math.round(cohortConfig.perCredit * credits.value);
        const discount = this.program.basePrice - cohortPrice;

        return {
          step: {
            type: 'cohort-fixed',
            name: cohortConfig.description,
            discountAmount: discount,
            priceBefore: this.program.basePrice,
            priceAfter: cohortPrice,
            description: `$${cohortConfig.perCredit} per credit × ${credits.value} credits`,
            icon: 'building'
          },
          pricing: {
            type: 'per_credit',
            perCredit: cohortConfig.perCredit,
            credits: credits.value,
            totalPrice: cohortPrice
          }
        };
      }
    }

    return null;
  }

  /**
   * Apply CPE 30% Retail Discount
   * Only applies if user explicitly opts in AND meets all eligibility criteria
   */
  applyCPERetailDiscount(currentPrice) {
    // Check if user has opted in (default is true, but can be toggled off)
    if (this.options.applyCPEDiscount === false) {
      return null;
    }
    
    const cpeDiscount = this.config.discounts.cpeRetail;
    
    // Check if enabled
    if (!cpeDiscount.enabled) return null;
    
    // Check if program is in excluded list
    if (cpeDiscount.eligibility.excludedPrograms.includes(this.programCode)) {
      return null;
    }
    
    // Check if program is eligible
    if (!cpeDiscount.applicablePrograms.includes(this.programCode)) return null;
    
    // Check if special cohort (excludes CPE discount)
    if (cpeDiscount.eligibility.excludeSpecialCohorts && 
        this.company?.hasSpecialCohort &&
        this.program.cohortPricing[this.companyId]) {
      return null;
    }
    
    // Check date eligibility
    const applicationDate = this.options.applicationDate || new Date();
    const validFrom = new Date(cpeDiscount.validFrom);
    const validUntil = new Date(cpeDiscount.validUntil);
    
    if (applicationDate < validFrom || applicationDate > validUntil) {
      return null;
    }

    const discountAmount = Math.round(currentPrice * cpeDiscount.value);
    const priceAfter = currentPrice - discountAmount;

    return {
      type: 'percentage',
      name: cpeDiscount.name,
      discountAmount,
      priceBefore: currentPrice,
      priceAfter,
      percentage: cpeDiscount.value * 100,
      description: cpeDiscount.eligibility.description,
      validUntil: cpeDiscount.validUntil,
      icon: 'sparkles'
    };
  }

  /**
   * Apply stackable discounts (Hoboken, Alumni, etc.)
   */
  applyStackableDiscounts(currentPrice) {
    const discounts = [];
    let workingPrice = currentPrice;

    // Check if special cohort (both discounts are excluded)
    const isSpecialCohort = this.company?.hasSpecialCohort && this.program.cohortPricing[this.companyId];

    // Hoboken Resident Discount
    if (this.options.isHobokenResident) {
      const hobokenDiscount = this.config.discounts.hobokenResident;
      
      // Check if excluded for special cohorts
      if (hobokenDiscount.eligibility.excludeSpecialCohorts && isSpecialCohort) {
        // Skip Hoboken if special cohort
      } else if (!hobokenDiscount.eligibility.excludedPrograms.includes(this.programCode) &&
                 hobokenDiscount.enabled && 
                 hobokenDiscount.applicablePrograms.includes(this.programCode)) {
        
        const discountAmount = Math.round(workingPrice * hobokenDiscount.value);
        const priceAfter = workingPrice - discountAmount;

        discounts.push({
          type: 'percentage',
          name: hobokenDiscount.name,
          discountAmount,
          priceBefore: workingPrice,
          priceAfter,
          percentage: hobokenDiscount.value * 100,
          description: hobokenDiscount.eligibility.description,
          icon: 'home'
        });

        workingPrice = priceAfter;
      }
    }

    // Stevens Alumni Discount
    if (this.options.isStevensAlumni) {
      const alumniDiscount = this.config.discounts.alumniDiscount;
      
      // Check if excluded for special cohorts
      if (alumniDiscount.eligibility.excludeSpecialCohorts && isSpecialCohort) {
        // Skip Alumni if special cohort
      } else if (!alumniDiscount.eligibility.excludedPrograms.includes(this.programCode) &&
                 alumniDiscount.enabled && 
                 alumniDiscount.applicablePrograms.includes(this.programCode)) {
        
        const discountAmount = Math.round(workingPrice * alumniDiscount.value);
        const priceAfter = workingPrice - discountAmount;

        discounts.push({
          type: 'percentage',
          name: alumniDiscount.name,
          discountAmount,
          priceBefore: workingPrice,
          priceAfter,
          percentage: alumniDiscount.value * 100,
          description: alumniDiscount.eligibility.description,
          icon: 'graduation-cap'
        });

        workingPrice = priceAfter;
      }
    }

    return discounts;
  }

  /**
   * Apply employer reimbursement
   * Only applies if user explicitly provides a value
   */
  applyEmployerReimbursement(currentPrice) {
    // Only apply if user has explicitly entered a reimbursement amount
    if (this.options.customReimbursement === undefined || 
        this.options.customReimbursement === null || 
        this.options.customReimbursement === '') {
      return null;
    }

    const reimbursement = parseFloat(this.options.customReimbursement) || 0;
    
    if (reimbursement <= 0) return null;

    const actualReimbursement = Math.min(reimbursement, currentPrice);
    const priceAfter = Math.max(0, currentPrice - actualReimbursement);

    return {
      type: 'reimbursement',
      name: 'Employer Tuition Reimbursement',
      discountAmount: actualReimbursement,
      priceBefore: currentPrice,
      priceAfter,
      isCustom: true,
      description: 'Your employer contribution',
      icon: 'briefcase'
    };
  }

  /**
   * Get default employer reimbursement
   */
  getDefaultReimbursement() {
    const config = this.config.employerReimbursement;
    // Certificates typically 1 year, degrees 2 years
    const years = this.programCode.startsWith('cert') ? 1 : config.typicalYears;
    return config.defaultAnnual * years;
  }

  /**
   * Check if discount options should be shown
   */
  static getDiscountAvailability(programCode, companyId) {
    const program = discountConfig.programs[programCode];
    const company = discountConfig.corporatePartners.find(c => c.id === companyId);
    
    if (!program || !company) return null;
    
    const hasSpecialCohort = 
      company.hasSpecialCohort && 
      program.cohortPricing[companyId] !== undefined;
    
    const isCertificate = programCode.startsWith('cert');
    const isMEADS = programCode === 'meads';
    
    // Check if CPE 30% discount is currently available (date-based)
    const cpeDiscount = discountConfig.discounts.cpeRetail;
    const currentDate = new Date();
    const validFrom = new Date(cpeDiscount.validFrom);
    const validUntil = new Date(cpeDiscount.validUntil);
    const isWithinValidPeriod = currentDate >= validFrom && currentDate <= validUntil;
    
    // Show 30% discount checkbox if:
    // 1. Not a special cohort program
    // 2. Not a certificate
    // 3. Not MEADS
    // 4. Within valid date range
    const show30Percent = !hasSpecialCohort && 
                          !isCertificate && 
                          !isMEADS && 
                          isWithinValidPeriod &&
                          cpeDiscount.enabled;
    
    return {
      hasSpecialCohort,
      show30Percent,
      showHoboken: !hasSpecialCohort && !isCertificate,
      showAlumni: !hasSpecialCohort && !isCertificate,
      showEmployer: true,
      cpeValidUntil: cpeDiscount.validUntil,
      message: hasSpecialCohort 
        ? "Exclusive cohort pricing includes all discounts"
        : isCertificate 
        ? "Certificates have fixed pricing aligned with IRS limits"
        : isMEADS
        ? "MEADS has special fixed pricing"
        : "All corporate discounts available"
    };
  }
}

/**
 * Helper function for easy usage
 */
export const calculateProgramCost = (programCode, companyId, options = {}) => {
  try {
    const calculator = new DiscountCalculator(programCode, companyId, options);
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
 * Get company info
 */
export const getCompanyInfo = (companyId) => {
  return discountConfig.corporatePartners.find(c => c.id === companyId) || null;
};

