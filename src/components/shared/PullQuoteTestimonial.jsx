import React from 'react';
import { motion } from 'framer-motion';

// Opening Quote SVG Component - Stevens Red
const OpeningQuoteMark = ({ className }) => (
  <svg 
    className={className}
    viewBox="0 0 19 20" 
    aria-hidden="true"
  >
    <path 
      fill="#A51C30" 
      fillRule="evenodd" 
      clipRule="evenodd" 
      d="M11.4,10.3L15.3,0h3.3l-2.5,9.5H19V20h-7.6V10.3z M0,10.3L3.9,0h3.3L4.7,9.5h2.9V20H0V10.3z"
    />
  </svg>
);

// Closing Quote SVG Component - Gray
const ClosingQuoteMark = ({ className }) => (
  <svg 
    className={className}
    viewBox="0 0 19 20" 
    aria-hidden="true"
  >
    <path 
      fill="#7F7F7F" 
      fillRule="evenodd" 
      clipRule="evenodd" 
      d="M7.6,9.7L3.7,20H0.4l2.5-9.5H0V0h7.6V9.7z M19,9.7L15.1,20h-3.3l2.5-9.5h-2.9V0H19V9.7z"
    />
  </svg>
);

/**
 * PullQuoteTestimonial - A large, featured pull quote testimonial component
 * styled after Stevens Institute's corporate education pages.
 * 
 * @param {Object} props
 * @param {Object} props.testimonial - Testimonial object with quote, author, title, company
 * @param {string} props.testimonial.quote - The testimonial quote text
 * @param {string} props.testimonial.author - Author's name
 * @param {string} props.testimonial.title - Author's title/role
 * @param {string} [props.testimonial.company] - Author's company (optional)
 * @param {string} [props.title] - Section title (optional)
 * @param {string} [props.subtitle] - Section subtitle (optional)
 * @param {string} [props.sectionClassName] - Additional classes for the section wrapper
 * @param {string} [props.containerClassName] - Additional classes for the inner container
 * @param {boolean} [props.showHeader=true] - Whether to show the title/subtitle header
 * @param {boolean} [props.animate=true] - Whether to animate on scroll into view
 */
const PullQuoteTestimonial = ({
  testimonial,
  title,
  subtitle,
  sectionClassName = '',
  containerClassName = '',
  showHeader = true,
  animate = true
}) => {
  if (!testimonial) return null;

  const sectionClasses = `py-stevens-section lg:py-stevens-section-lg bg-gradient-to-b from-stevens-gray-50 to-stevens-white ${sectionClassName}`.trim();
  const containerClasses = `max-w-stevens-content-max mx-auto px-stevens-md lg:px-stevens-lg ${containerClassName}`.trim();

  const quoteContent = (
    <div className="relative flex flex-col pt-16 md:pt-20 pb-8 md:pb-12 px-4 md:px-12 lg:px-20">
      {/* ===== TOP LINE: Horizontal line from opening quote to right edge ===== */}
      {/* Positioned at vertical center of opening quote mark, extends from after quote to right padding */}
      <div 
        className="absolute top-[18px] md:top-[22px] lg:top-[28px] right-4 md:right-12 lg:right-20 h-[1px] bg-[#7F7F7F] left-[60px] md:left-[116px] lg:left-[160px]"
        aria-hidden="true"
      />
      
      {/* Opening Quote Mark - Positioned absolutely above quote */}
      <OpeningQuoteMark 
        className="absolute -top-2 md:-top-4 left-4 md:left-12 lg:left-20 w-10 h-10 md:w-14 md:h-14 lg:w-[70px] lg:h-[72px]"
      />
      
      {/* Quote Text - Large, condensed typography */}
      <blockquote className="font-stevens-content text-2xl md:text-4xl lg:text-stevens-6xl leading-tight md:leading-tight lg:leading-none font-normal text-stevens-gray-700">
        {testimonial.quote}
      </blockquote>
      
      {/* ===== BOTTOM ROW: Bottom Line + Closing Quote + Attribution ===== */}
      <div className="flex items-center mt-6 md:mt-8 -ml-4 md:-ml-12 lg:-ml-20">
        {/* Bottom horizontal line - extends from left edge to closing quote */}
        <div 
          className="flex-grow h-[1px] bg-[#7F7F7F] mr-3 md:mr-4 lg:mr-5"
          aria-hidden="true"
        />
        
        {/* Closing Quote Mark - Gray */}
        <ClosingQuoteMark 
          className="w-10 h-10 md:w-14 md:h-14 lg:w-[70px] lg:h-[72px] flex-shrink-0"
        />
        
        {/* Attribution - Right-aligned style */}
        <div className="flex flex-col ml-3 md:ml-4 lg:ml-5">
          {/* Author Name - Bold, large */}
          <span className="font-stevens-content text-xl md:text-2xl lg:text-stevens-4xl font-bold text-stevens-gray-700">
            {testimonial.author}
          </span>
          {/* Title/Role */}
          <span className="font-stevens-content text-base md:text-lg lg:text-stevens-2xl font-normal text-stevens-gray-900 mt-1">
            {testimonial.title}
          </span>
          {/* Company */}
          {testimonial.company && (
            <span className="text-stevens-sm md:text-stevens-base text-stevens-gray-600 mt-0.5 font-stevens-body">
              {testimonial.company}
            </span>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <section className={sectionClasses}>
      <div className={containerClasses}>
        {/* Section Header */}
        {showHeader && (title || subtitle) && (
          <div className="text-center mb-stevens-3xl">
            {title && (
              <h2 className="font-stevens-display text-stevens-3xl md:text-stevens-4xl font-stevens-bold text-stevens-primary mb-stevens-lg">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-stevens-lg md:text-stevens-xl text-stevens-gray-600 max-w-3xl mx-auto leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Featured Pull Quote Testimonial */}
        {animate ? (
          <motion.div 
            className="mt-stevens-xl lg:mt-stevens-3xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {quoteContent}
          </motion.div>
        ) : (
          <div className="mt-stevens-xl lg:mt-stevens-3xl">
            {quoteContent}
          </div>
        )}
      </div>
    </section>
  );
};

export default PullQuoteTestimonial;

