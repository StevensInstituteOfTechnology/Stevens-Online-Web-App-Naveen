import React, { useState, forwardRef } from "react";
import { Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import TuitionCalculatorModal from "./TuitionCalculatorModal";

/**
 * TuitionCalculatorSection
 *
 * ASU-style page section: image on left, tuition calculator text + CTA on right.
 * Opens TuitionCalculatorModal when the CTA button is clicked.
 *
 * @param {string} programCode - The program code (e.g., 'mba', 'mscs')
 * @param {string} image - Path to the section image
 * @param {string} imageAlt - Alt text for the image
 */
const TuitionCalculatorSection = forwardRef(
  ({ programCode, image, imageAlt = "Students at Stevens Institute" }, ref) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
      <section
        ref={ref}
        className="py-stevens-3xl bg-white"
        id="tuition-calculator"
      >
        <div className="max-w-7xl mx-auto px-stevens-md">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-stevens-xl items-center">
            {/* Left - Image */}
            <div className="relative overflow-hidden rounded-xl aspect-[4/3]">
              <img
                src={image}
                alt={imageAlt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Right - Content */}
            <div className="flex flex-col justify-center">
              <h2 className="font-stevens-headers text-stevens-3xl md:text-stevens-4xl font-bold text-stevens-dark-gray mb-stevens-md">
                Tuition Calculator
              </h2>
              <p className="text-stevens-base text-stevens-gray leading-relaxed mb-2">
                Use our calculator to estimate your tuition with available
                discounts and employer reimbursement benefits. Keep in mind that
                most of our students receive some form of financial support,
                which can significantly reduce out-of-pocket costs.
              </p>
              <p className="text-stevens-base text-stevens-gray leading-relaxed mb-stevens-lg">
                See how much you could save based on your eligibility for
                workforce partner, alumni, and resident discounts.
              </p>
              <div>
                <Button
                  size="lg"
                  className="bg-stevens-red text-stevens-white hover:bg-stevens-red/90 group py-4 px-8"
                  onClick={() => setIsModalOpen(true)}
                >
                  <Calculator className="w-5 h-5 mr-2" />
                  Estimate Tuition and Fees
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Calculator Modal */}
        <TuitionCalculatorModal
          programCode={programCode}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </section>
    );
  }
);

TuitionCalculatorSection.displayName = "TuitionCalculatorSection";

export default TuitionCalculatorSection;
