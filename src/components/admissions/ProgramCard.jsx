import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { trackConversion, CONVERSION_LABELS } from "@/utils/gtmTracking";
import { ApplicationModal } from "@/components/shared";
import { trackEvent } from "@/utils/analytics/vercelTracking";

/**
 * ProgramCard - Showcase-style card with full-height image and expandable content
 *
 * Design inspired by Home page ProgramShowcaseCard:
 * - Full-bleed program image as background
 * - Floating white label box at bottom
 * - Expand-on-hover to reveal stats, highlights, and CTAs
 * - Retains all Apply button logic (modal, internal link, external link)
 *
 * @param {Object} program - Program data object
 * @param {Function} onApplyClick - Optional override for Apply Now button behavior
 * @param {number} index - Index for staggered animation delay
 */
const ProgramCard = ({ program, onApplyClick, index = 0 }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        className="group relative h-[480px] lg:h-[520px] overflow-hidden"
      >
        {/* Full-bleed Background Image */}
        <img
          src={program.image}
          alt={program.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Degree Badge - Top Left */}
        <div className="absolute top-4 left-4 z-10">
          <div className="bg-stevens-red rounded-md backdrop-blur-sm text-white px-6 py-3 text-sm font-bold uppercase tracking-wider">
            {program.degree}
          </div>
        </div>

        {/* Floating Content Box - Bottom */}
        <div className="absolute bottom-0 left-4 right-4 lg:left-6 lg:right-6 bg-white p-5 lg:p-6 transform translate-y-2 group-hover:translate-y-[-8px] transition-all duration-300 ease-out shadow-xl">
          {/* Program Type Label */}
          <p className="text-stevens-dark-gray text-xs font-bold uppercase tracking-wider mb-1">
            {program.tagline || program.degree}
          </p>

          {/* Program Title */}
          <h3 className="font-stevens-display text-xl lg:text-2xl font-bold text-stevens-dark-gray group-hover:text-stevens-red transition-colors duration-300 mb-0 group-hover:mb-3">
            {program.shortName}
          </h3>

          {/* Expandable Content - Hidden by default, shown on hover */}
          <div className="max-h-0 overflow-hidden group-hover:max-h-[280px] transition-all duration-300 ease-out">
            <div className="pt-4 border-t border-gray-200">
              {/* Stats Row */}
              <div className="flex gap-6 mb-3 text-sm">
                <div>
                  <span className="text-stevens-dark-gray">Credits:</span>
                  <span className="font-semibold text-stevens-dark-gray ml-1">
                    {program.stats?.credits || "30"}
                  </span>
                </div>
                <div>
                  <span className="text-stevens-dark-gray">Duration:</span>
                  <span className="font-semibold text-stevens-dark-gray ml-1">
                    {program.stats?.duration || "18-24 mo"}
                  </span>
                </div>
              </div>

              {/* Highlights List */}
              {program.highlights && program.highlights.length > 0 && (
                <ul className="text-sm text-stevens-dark-gray space-y-1.5 mb-4">
                  {program.highlights.slice(0, 3).map((highlight, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-stevens-red rounded-full flex-shrink-0"></span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              )}

              {/* CTA Buttons */}
              <div className="flex gap-3 pt-2">
                {/* Explore Button */}
                <Link
                  to={program.programPage}
                  className="flex-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button className="w-full h-10 px-4 text-sm font-semibold border-2 border-stevens-dark-gray text-stevens-dark-gray hover:bg-stevens-dark-gray hover:text-white transition-all duration-200 flex items-center justify-center gap-1">
                    Explore
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>

                {/* Apply Now Button - Different behavior based on program */}
                {onApplyClick ? (
                  // Custom override provided
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onApplyClick(program);
                      trackConversion(CONVERSION_LABELS.APPLY_NOW);
                      trackEvent("apply_button_clicked", {
                        program_code: program.code,
                        program_name: program.shortName,
                        button_location: "admissions_card",
                        application_type: "custom_override",
                      });
                    }}
                    className="flex-1 h-10 px-4 text-sm font-semibold bg-stevens-red text-white hover:bg-red-700 transition-all duration-200 flex items-center justify-center gap-1"
                  >
                    Apply Now
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : program.code === "mem" ? (
                  // MEM only: Open modal with ASAP option
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsModalOpen(true);
                      trackConversion(CONVERSION_LABELS.APPLY_NOW);
                      trackEvent("apply_button_clicked", {
                        program_code: program.code,
                        program_name: program.shortName,
                        button_location: "admissions_card",
                        application_type: "modal",
                        modal_options: "asap",
                      });
                    }}
                    className="flex-1 h-10 px-4 text-sm font-semibold bg-stevens-red text-white hover:bg-red-700 transition-all duration-200 flex items-center justify-center gap-1"
                  >
                    Apply Now
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  // All other programs: Go to Accelerated Application page
                  <Link
                    to={
                      createPageUrl("accelerated-application") +
                      `?program=${program.code}`
                    }
                    className="flex-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      sessionStorage.setItem(
                        "accelerated_application_program",
                        program.code
                      );
                      trackConversion(CONVERSION_LABELS.APPLY_NOW);
                      trackEvent("apply_button_clicked", {
                        program_code: program.code,
                        program_name: program.shortName,
                        button_location: "admissions_card",
                        application_type: "accelerated",
                        destination: "/accelerated-application/",
                      });
                    }}
                  >
                    <button className="w-full h-10 px-4 text-sm font-semibold bg-stevens-red text-white hover:bg-red-700 transition-all duration-200 flex items-center justify-center gap-1">
                      Apply Now
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Application Modal for MEM only */}
      {program.code === "mem" && (
        <ApplicationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          traditionalLink={program.applicationConfig.standardLink}
        />
      )}
    </>
  );
};

export default ProgramCard;
