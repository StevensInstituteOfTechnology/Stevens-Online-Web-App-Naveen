import { useState, useEffect } from "react";
import {
  Building,
  Home,
  GraduationCap,
  Briefcase,
  CheckCircle,
  Sparkles,
  Star,
  Info,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  calculateProgramCost,
  getDiscountInfo,
  getProgramPricing,
} from "@/utils/discountCalculator";
import { trackEvent } from "@/utils/analytics/vercelTracking";
import { BOOKING_URLS, CONTACT_INFO } from "@/config/constants";

/**
 * TuitionCalculatorBody
 *
 * Shared core calculator UI: discount inputs (left) + cost breakdown (right).
 * Manages its own discount state internally and reports calculatedCost to parent.
 *
 * Used by:
 * - TuitionCalculatorModal (program pages)
 * - CorporateStudents (inline calculator)
 *
 * @param {string} programCode - The program code (e.g., 'mba', 'mscs', 'cert-eai')
 * @param {function} onCostChange - Optional callback (calculatedCost) => void
 */
export default function TuitionCalculatorBody({ programCode, onCostChange }) {
  // Discount states (self-managed)
  const [isWorkforcePartner, setIsWorkforcePartner] = useState(false);
  const [isHobokenResident, setIsHobokenResident] = useState(false);
  const [isStevensAlumni, setIsStevensAlumni] = useState(false);
  const [annualReimbursement, setAnnualReimbursement] = useState("");
  const [calculatedCost, setCalculatedCost] = useState(null);

  // Static info
  const discountInfo = getDiscountInfo();
  const programPricing = getProgramPricing(programCode);
  const isCertificate = programCode?.startsWith("cert-");
  const maxReimbursement =
    discountInfo?.employerReimbursement?.maxAnnual ?? 20500;

  // Calculate cost whenever inputs change
  useEffect(() => {
    if (!programCode) return;

    const options = {
      isWorkforcePartner,
      isHobokenResident,
      isStevensAlumni,
      annualReimbursement: annualReimbursement || undefined,
    };

    const result = calculateProgramCost(programCode, options);
    setCalculatedCost(result);

    if (onCostChange) {
      onCostChange(result);
    }

    trackEvent("tuition_calculator_used", {
      program: programCode,
      has_workforce_partner: isWorkforcePartner,
      has_hoboken: isHobokenResident,
      has_alumni: isStevensAlumni,
      has_reimbursement: !!annualReimbursement,
    });
  }, [
    programCode,
    isWorkforcePartner,
    isHobokenResident,
    isStevensAlumni,
    annualReimbursement,
  ]);

  // Icon resolver for discount steps
  const getStepIcon = (iconName) => {
    switch (iconName) {
      case "building":
        return Building;
      case "sparkles":
        return Sparkles;
      case "home":
        return Home;
      case "graduation-cap":
        return GraduationCap;
      case "briefcase":
        return Briefcase;
      default:
        return CheckCircle;
    }
  };

  if (!programPricing) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
      {/* Left Column - Discount Options */}
      <div className="lg:col-span-2 p-6 border-b lg:border-b-0 lg:border-r border-stevens-light-gray">
        <div className="space-y-6">
          {/* Eligible Discounts Section */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm font-semibold text-stevens-dark-gray tracking-wide">
                Eligible Discounts
              </span>
              <div className="flex-1 h-px bg-stevens-light-gray" />
            </div>
            <div className="space-y-2.5">
              {/* Workforce Partner Discount - Only for master's programs */}
              {!isCertificate && (
                <div
                  role="button"
                  tabIndex={0}
                  className={`flex items-start space-x-3 p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                    isWorkforcePartner
                      ? "border-stevens-dark-gray/30 bg-stevens-dark-gray/5 shadow-sm"
                      : "border-stevens-light-gray bg-white hover:border-stevens-dark-gray/20 hover:bg-stevens-dark-gray/[0.03]"
                  }`}
                  onClick={() => setIsWorkforcePartner(!isWorkforcePartner)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setIsWorkforcePartner(!isWorkforcePartner);
                    }
                  }}
                >
                  <Checkbox
                    id="calc-workforce-partner"
                    checked={isWorkforcePartner}
                    onCheckedChange={setIsWorkforcePartner}
                    className="mt-0.5"
                  />
                  <div className="flex-1">
                    <label
                      htmlFor="calc-workforce-partner"
                      className="text-sm font-medium text-stevens-dark-gray cursor-pointer flex items-center"
                    >
                      <Building className="w-4 h-4 mr-1.5 text-stevens-dark-gray flex-shrink-0" />
                      Stevens workforce development partner?
                    </label>
                    <p className="text-xs text-stevens-gray mt-1 ml-[22px]">
                      {discountInfo.workforcePartner.percentage}% discount
                      (average savings of ~20%)
                    </p>
                  </div>
                </div>
              )}

              {/* Hoboken Resident Discount */}
              <div
                role="button"
                tabIndex={0}
                className={`flex items-start space-x-3 p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                  isHobokenResident
                    ? "border-stevens-dark-gray/30 bg-stevens-dark-gray/5 shadow-sm"
                    : "border-stevens-light-gray bg-white hover:border-stevens-dark-gray/20 hover:bg-stevens-dark-gray/[0.03]"
                }`}
                onClick={() => setIsHobokenResident(!isHobokenResident)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setIsHobokenResident(!isHobokenResident);
                  }
                }}
              >
                <Checkbox
                  id="calc-hoboken"
                  checked={isHobokenResident}
                  onCheckedChange={setIsHobokenResident}
                  className="mt-0.5"
                />
                <div className="flex-1">
                  <label
                    htmlFor="calc-hoboken"
                    className="text-sm font-medium text-stevens-dark-gray cursor-pointer flex items-center"
                  >
                    <Home className="w-4 h-4 mr-1.5 text-stevens-dark-gray flex-shrink-0" />
                    I am a Hoboken resident
                  </label>
                  <p className="text-xs text-stevens-gray mt-1 ml-[22px]">
                    {discountInfo.hobokenResident.percentage}% additional
                    discount
                  </p>
                </div>
              </div>

              {/* Stevens Alumni Discount */}
              <div
                role="button"
                tabIndex={0}
                className={`flex items-start space-x-3 p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                  isStevensAlumni
                    ? "border-stevens-dark-gray/30 bg-stevens-dark-gray/5 shadow-sm"
                    : "border-stevens-light-gray bg-white hover:border-stevens-dark-gray/20 hover:bg-stevens-dark-gray/[0.03]"
                }`}
                onClick={() => setIsStevensAlumni(!isStevensAlumni)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setIsStevensAlumni(!isStevensAlumni);
                  }
                }}
              >
                <Checkbox
                  id="calc-alumni"
                  checked={isStevensAlumni}
                  onCheckedChange={setIsStevensAlumni}
                  className="mt-0.5"
                />
                <div className="flex-1">
                  <label
                    htmlFor="calc-alumni"
                    className="text-sm font-medium text-stevens-dark-gray cursor-pointer flex items-center"
                  >
                    <GraduationCap className="w-4 h-4 mr-1.5 text-stevens-dark-gray flex-shrink-0" />
                    Stevens alumni
                  </label>
                  <p className="text-xs text-stevens-gray mt-1 ml-[22px]">
                    {discountInfo.alumniDiscount.percentage}% alumni discount
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Employer Reimbursement Section */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm font-semibold text-stevens-dark-gray tracking-wide">
                Employer Reimbursement
              </span>
              <div className="flex-1 h-px bg-stevens-light-gray" />
            </div>
            <div className="p-4 rounded-lg border border-stevens-light-gray bg-white">
              <div className="flex items-center justify-between mb-4">
                <label htmlFor="calc-reimbursement" className="text-sm font-medium text-stevens-dark-gray flex items-center">
                  <Briefcase className="w-4 h-4 mr-2 text-stevens-dark-gray" />
                  Annual Tuition Reimbursement
                </label>
                <span className="text-base font-bold text-stevens-dark-gray tabular-nums">
                  ${parseInt(annualReimbursement || 0).toLocaleString()}
                </span>
              </div>

              {/* Slider */}
              <div className="relative">
                <input
                  id="calc-reimbursement"
                  type="range"
                  min="0"
                  max={maxReimbursement}
                  step="250"
                  value={annualReimbursement || 0}
                  onChange={(e) =>
                    setAnnualReimbursement(
                      e.target.value === "0" ? "" : e.target.value
                    )
                  }
                  aria-label="Annual tuition reimbursement amount"
                  className="w-full h-2 rounded-full appearance-none cursor-pointer
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-stevens-red [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-10
                    [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-stevens-red [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #A32638 0%, #A32638 ${
                      ((annualReimbursement || 0) / maxReimbursement) * 100
                    }%, #e5e7eb ${
                      ((annualReimbursement || 0) / maxReimbursement) * 100
                    }%, #e5e7eb 100%)`,
                  }}
                />
              </div>

              {/* Min / Max labels */}
              <div className="flex justify-between mt-2 mb-3">
                <span className="text-[11px] text-stevens-gray">$0</span>
                <span className="text-[11px] text-stevens-gray">
                  ${maxReimbursement.toLocaleString()} max
                </span>
              </div>

              {/* Synced text input */}
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stevens-dark-gray font-medium">
                  $
                </span>
                <Input
                  type="number"
                  min="0"
                  max={maxReimbursement}
                  step="250"
                  placeholder="0"
                  value={annualReimbursement}
                  aria-label="Annual tuition reimbursement amount in dollars"
                  onChange={(e) => {
                    const val = Math.min(
                      Math.max(0, parseInt(e.target.value) || 0),
                      maxReimbursement
                    );
                    setAnnualReimbursement(val === 0 ? "" : String(val));
                  }}
                  className="w-full pl-8"
                />
              </div>

              {annualReimbursement && calculatedCost?.durationYears && (
                <div className="mt-3 px-3 py-2 rounded-md bg-stevens-dark-gray/5 border border-stevens-dark-gray/10">
                  <p className="text-xs text-stevens-dark-gray font-medium">
                    ${parseFloat(annualReimbursement).toLocaleString()}
                    /year × {calculatedCost.durationYears} year
                    {calculatedCost.durationYears > 1 ? "s" : ""} = $
                    {(
                      parseFloat(annualReimbursement) *
                      calculatedCost.durationYears
                    ).toLocaleString()}{" "}
                    total
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Cost Breakdown */}
      <div className="lg:col-span-3 p-6">
        {calculatedCost ? (
          <div>
            {/* Base Price */}
            <div className="mb-6 pb-4 border-b border-stevens-light-gray">
              <div className="flex justify-between items-center">
                <span className="text-stevens-dark-gray font-medium">
                  {calculatedCost.credits.type === "variable"
                    ? "Program Cost"
                    : "Standard Program Price"}
                </span>
                <span className="text-xl md:text-2xl font-bold text-stevens-dark-gray tabular-nums">
                  ${calculatedCost.basePrice.toLocaleString()}*
                </span>
              </div>
              {calculatedCost.credits.type === "fixed" && (
                <p className="text-xs text-stevens-gray mt-1.5 flex items-center gap-1.5">
                  <span>{calculatedCost.credits.value} credits</span>
                  <span className="w-1 h-1 rounded-full bg-stevens-gray/40" />
                  <span>
                    {calculatedCost.durationYears} year
                    {calculatedCost.durationYears > 1 ? "s" : ""}
                  </span>
                </p>
              )}
              {calculatedCost.credits.type === "variable" && (
                <p className="text-xs text-stevens-gray mt-1.5">
                  Based on typical {calculatedCost.credits.typical} credits
                </p>
              )}
            </div>

            {/* Variable Credit Info */}
            {calculatedCost.credits.type === "variable" && (
              <div className="mb-6">
                <Alert className="bg-stevens-dark-gray/5 border border-stevens-dark-gray/15 rounded-lg">
                  <Info className="w-5 h-5 text-stevens-dark-gray" />
                  <AlertTitle className="text-stevens-dark-gray font-semibold mb-2">
                    Variable Credit Program
                  </AlertTitle>
                  <AlertDescription>
                    <p className="text-sm text-stevens-gray">
                      This program requires {calculatedCost.credits.min}-
                      {calculatedCost.credits.max} credits based on
                      concentration. Estimate uses{" "}
                      {calculatedCost.credits.typical} credits.
                    </p>
                  </AlertDescription>
                </Alert>
              </div>
            )}

            {/* Certificate Program Benefits */}
            {isCertificate && (
              <div className="mb-6">
                <Alert className="bg-stevens-dark-gray/5 border border-stevens-dark-gray/15 rounded-lg">
                  <Sparkles className="w-5 h-5 text-stevens-dark-gray" />
                  <AlertTitle className="text-stevens-dark-gray font-semibold mb-2">
                    Certificate Program Benefits
                  </AlertTitle>
                  <AlertDescription>
                    <p className="text-sm text-stevens-gray mb-2">
                      Professional certificates are priced at $
                      {calculatedCost.basePrice.toLocaleString()} (
                      {calculatedCost.credits.value} credits) to align with
                      employer tuition reimbursement limits.
                    </p>
                    <p className="text-xs text-stevens-dark-gray flex items-center">
                      <CheckCircle className="w-3 h-3 mr-1 text-stevens-dark-gray" />
                      This certificate can stack toward a full master's degree!
                    </p>
                  </AlertDescription>
                </Alert>
              </div>
            )}

            {/* Discount Steps */}
            {calculatedCost.steps.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold text-stevens-dark-gray uppercase tracking-wider">
                    Applied Savings
                  </span>
                  <div className="flex-1 h-px bg-stevens-light-gray" />
                </div>
                <div className="space-y-2">
                  {calculatedCost.steps.map((step, index) => {
                    const Icon = getStepIcon(step.icon);
                    return (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 rounded-lg bg-white border border-stevens-light-gray"
                      >
                        <div className="w-7 h-7 rounded-full bg-stevens-dark-gray/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-stevens-dark-gray">
                            {index + 1}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-stevens-dark-gray text-sm flex items-center gap-1.5">
                                <Icon className="w-3.5 h-3.5 text-stevens-dark-gray flex-shrink-0" />
                                {step.name}
                              </p>
                              <p className="text-xs text-stevens-gray mt-0.5 ml-5">
                                {step.description}
                              </p>
                            </div>
                            <div className="text-right ml-4 flex-shrink-0">
                              <p className="font-bold text-stevens-red tabular-nums">
                                -$
                                {step.discountAmount.toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Final Price */}
            <div className="bg-stevens-red text-white p-5 lg:p-6 rounded-xl">
              {calculatedCost.credits.type === "variable" ? (
                <>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-semibold">
                      Estimated Cost
                    </span>
                    <span className="text-2xl md:text-3xl font-bold tabular-nums">
                      ${calculatedCost.finalPrice.toLocaleString()}*
                    </span>
                  </div>
                  <p className="text-xs text-white/70">
                    Based on {calculatedCost.credits.typical} credits
                  </p>
                </>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-semibold">
                      Estimated Cost
                    </span>
                    <span className="text-2xl md:text-4xl font-bold tabular-nums">
                      ${calculatedCost.finalPrice.toLocaleString()}*
                    </span>
                  </div>
                  {!calculatedCost.steps.find(
                    (s) => s.type === "reimbursement"
                  ) && (
                    <p className="text-xs text-white/60 italic">
                      * Before employer reimbursement
                    </p>
                  )}
                </>
              )}

              {calculatedCost.percentSaved > 0 && (
                <div className="flex items-center mt-4 pt-4 border-t border-white/20">
                  <Star className="w-5 h-5 mr-2 fill-current" />
                  <span className="text-lg">
                    You save {calculatedCost.percentSaved}%!
                  </span>
                </div>
              )}

              {/* Prompt to add reimbursement if not entered */}
              {!calculatedCost.steps.find(
                (s) => s.type === "reimbursement"
              ) && (
                <div className="mt-4 pt-4 border-t border-white/20">
                  <div className="flex items-start text-white/90">
                    <Briefcase className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-semibold mb-1">
                        Add your annual employer reimbursement
                      </p>
                      <p className="text-xs text-white/70">
                        Many employers offer up to $
                        {(discountInfo.employerReimbursement.maxAnnual ?? 20500).toLocaleString()}
                        /year
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Certificate FREE message */}
              {isCertificate && calculatedCost.finalPrice === 0 && (
                <div className="mt-4 pt-4 border-t border-white/20">
                  <div className="flex items-center text-white">
                    <CheckCircle className="w-6 h-6 mr-2 fill-current" />
                    <span className="text-lg font-bold">
                      Fully covered by employer benefits!
                    </span>
                  </div>
                </div>
              )}

              {/* Estimate disclaimer footer */}
              <div className="mt-4 pt-4 border-t border-white/20">
                <p className="text-xs text-white/70">
                  * Tuition estimates are based on current rates and are
                  subject to change. Your official cost will be provided by our
                  admissions team.{" "}
                  <a
                    href={BOOKING_URLS.SCHEDULE_CALL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white underline hover:text-white/90 transition-colors"
                  >
                    Schedule a call
                  </a>{" "}
                 {" "}
                 to reach out for your official cost.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-stevens-gray">
            <p>Loading calculator...</p>
          </div>
        )}
      </div>
    </div>
  );
}
