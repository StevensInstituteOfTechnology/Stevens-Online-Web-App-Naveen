import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createPageUrl } from "@/utils";

/**
 * ProgramShowcaseCard - Large image card with hover-expandable content
 *
 * Design: Full-height image card with white label box that expands on hover
 * Features:
 * - Full-bleed program image
 * - White label box with subtitle and title
 * - Expandable content on hover (stats, highlights, CTA)
 * - Smooth animations and transitions
 *
 * Used in: Home page program carousel
 *
 * @param {Object} program - Program data object
 * @param {string} program.id - Unique identifier
 * @param {string} program.url - URL path for the program
 * @param {string} program.image - Image URL
 * @param {string} program.title - Program title
 * @param {string} program.subtitle - Program subtitle/type
 * @param {Object} program.stats - Optional stats { credits, duration }
 * @param {Array} program.highlights - Optional array of highlight strings
 * @param {number} index - Index for staggered animation delay
 * @param {string} className - Additional class names for the wrapper
 */
export function ProgramShowcaseCard({ program, index = 0, className = "" }) {
  return (
    <Link
      to={createPageUrl(program.url)}
      className={`flex-shrink-0 w-[345px] sm:w-[400px] lg:w-[460px] snap-start group ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        viewport={{ once: true }}
        className="relative h-[450px] lg:h-[500px] overflow-hidden"
      >
        {/* Card Image */}
        <img
          src={program.image}
          alt={program.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Label Box - Expandable on hover */}
        <div className="absolute bottom-0 left-8 right-8 bg-white p-6 transform translate-y-2 group-hover:translate-y-[-10px] transition-all duration-300 ease-out shadow-xl">
          <p className="text-stevens-dark-gray text-xs font-bold uppercase tracking-wider mb-1">
            {program.subtitle}
          </p>
          <h3 className="font-stevens-display text-xl font-bold text-stevens-dark-gray group-hover:text-stevens-red transition-colors mb-0 group-hover:mb-4">
            {program.title}
          </h3>

          {/* Expanded content - hidden by default, shown on hover */}
          <div className="max-h-0 overflow-hidden group-hover:max-h-[200px] transition-all duration-300 ease-out">
            <div className="pt-4 border-t border-gray-200">
              {/* Program stats - dynamic from program data */}
              <div className="flex gap-4 mb-3 text-sm">
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

              {/* Key highlights - dynamic from program data */}
              {program.highlights && program.highlights.length > 0 && (
                <ul className="text-sm text-stevens-dark-gray space-y-1 mb-4">
                  {program.highlights.slice(0, 3).map((highlight, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-stevens-red rounded-full flex-shrink-0"></span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              )}

              {/* CTA hint */}
              <Button variant="link" size="sm" className="p-0 h-auto">
                Learn more
                <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export default ProgramShowcaseCard;
