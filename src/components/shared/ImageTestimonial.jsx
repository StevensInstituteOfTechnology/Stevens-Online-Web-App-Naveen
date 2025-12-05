import React, { useId } from 'react';
import { motion } from 'framer-motion';

/**
 * Opening Quote SVG Component - Customizable color
 * Default: Stevens Gold (#D4A843)
 */
const OpeningQuoteMark = ({ className, color = '#D4A843' }) => (
  <svg 
    className={className}
    viewBox="0 0 75 77" 
    fill="none"
    aria-hidden="true"
  >
    <path 
      fill={color}
      d="M45,40.7L60.4,0h13L61.5,37.5h11.5V77H42.9V40.7H45z M0,40.7L15.4,0h13L16.5,37.5H28V77H0V40.7z"
    />
  </svg>
);

/**
 * Closing Quote SVG Component - Customizable color
 * Default: White (#FFFFFF)
 */
const ClosingQuoteMark = ({ className, color = '#FFFFFF' }) => (
  <svg 
    className={className}
    viewBox="0 0 75 77" 
    fill="none"
    aria-hidden="true"
  >
    <path 
      fill={color}
      d="M30,36.3L14.6,77h-13l11.9-37.5H2V0h30.1V36.3H30z M75,36.3L59.6,77h-13l11.9-37.5H47V0h28V36.3z"
    />
  </svg>
);

/**
 * ImageTestimonial - A two-column testimonial component with speaker image
 * Styled after Stevens Institute's corporate education page design.
 * 
 * Features:
 * - Two-column layout: image on left, quote content on right (desktop)
 * - Stacked layout on mobile (image above content)
 * - Deep red background with golden accent lines
 * - Customizable colors for quotes, lines, and background
 * - Dynamic ratio control for image/content columns
 * - Optional CTA button
 * 
 * @param {Object} props
 * @param {Object} props.testimonial - Testimonial object with quote, author, title
 * @param {string} props.testimonial.quote - The testimonial quote text
 * @param {string} props.testimonial.author - Author's name
 * @param {string} props.testimonial.title - Author's title/role
 * @param {string} [props.testimonial.company] - Author's company (optional)
 * @param {string} props.imageSrc - URL/path to the speaker's image
 * @param {string} [props.imageAlt] - Alt text for the image
 * @param {string} [props.buttonText] - Text for the CTA button (optional)
 * @param {string} [props.buttonLink] - Link for the CTA button (optional)
 * @param {Function} [props.onButtonClick] - Click handler for CTA button (optional)
 * @param {string} [props.backgroundColor='#8A1E41'] - Background color for the quote panel
 * @param {string} [props.openQuoteColor='#D4A843'] - Color for opening quotation marks
 * @param {string} [props.closeQuoteColor='#FFFFFF'] - Color for closing quotation marks
 * @param {string} [props.lineColor='#D4A843'] - Color for the horizontal accent lines
 * @param {number} [props.imageRatio=50] - Percentage width for image column (e.g., 40, 50, 60)
 * @param {string} [props.sectionClassName] - Additional classes for the section wrapper
 * @param {boolean} [props.animate=true] - Whether to animate on scroll into view
 * @param {boolean} [props.reverseOnMobile=false] - If true, shows content above image on mobile
 */
const ImageTestimonial = ({
  testimonial,
  imageSrc,
  imageAlt = 'Testimonial speaker',
  buttonText,
  buttonLink,
  onButtonClick,
  backgroundColor = '#A32638',
  openQuoteColor = '#D4A843',
  closeQuoteColor = '#FFFFFF',
  lineColor = '#D4A843',
  imageRatio = 50,
  sectionClassName = '',
  animate = true,
  reverseOnMobile = false
}) => {
  // Generate unique ID for scoped CSS
  const uniqueId = useId().replace(/:/g, '');
  
  if (!testimonial) return null;

  // Ensure imageRatio is a number and calculate content ratio
  const imageRatioNum = typeof imageRatio === 'string' ? parseInt(imageRatio, 10) : imageRatio;
  const contentRatioNum = 100 - imageRatioNum;

  const wrapperClass = `image-testimonial-${uniqueId}`;

  // Quote content panel (right side on desktop)
  const quoteContent = (
    <div 
      className="relative flex flex-col justify-center min-h-[400px] md:min-h-[500px] lg:min-h-0 lg:h-full p-6 sm:p-8 md:p-12 lg:p-16"
      style={{ backgroundColor }}
    >
      {/* Opening Quote Mark with horizontal accent line */}
      <div className="flex items-center mb-4 md:mb-6">
        <OpeningQuoteMark 
          className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-[75px] lg:h-[77px] flex-shrink-0"
          color={openQuoteColor}
        />
        {/* Horizontal accent line extending from quote mark */}
        <div 
          className="flex-grow h-[1px] ml-4 md:ml-6"
          style={{ backgroundColor: lineColor }}
          aria-hidden="true"
        />
      </div>
      
      {/* Quote Text - Large, white typography (matching PullQuoteTestimonial font styling) */}
      <blockquote className="font-stevens-content text-2xl md:text-4xl lg:text-stevens-6xl leading-tight md:leading-tight lg:leading-none font-normal text-white mb-8 md:mb-10 lg:mb-12">
        {testimonial.quote}
      </blockquote>
      
      {/* Bottom section: Horizontal Line + Closing Quote + Attribution */}
      <div className="flex items-center">
        {/* Horizontal accent line */}
        <div 
          className="flex-grow h-[1px] mr-4 md:mr-6"
          style={{ backgroundColor: lineColor }}
          aria-hidden="true"
        />
        
        {/* Closing Quote Mark */}
        <ClosingQuoteMark 
          className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-[60px] lg:h-[62px] flex-shrink-0"
          color={closeQuoteColor}
        />
        
        {/* Attribution - Name and Title */}
        <div className="flex flex-col ml-3 md:ml-4 lg:ml-5">
          <span className="font-stevens-content text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white">
            {testimonial.author}
          </span>
          <span className="font-stevens-content text-xs sm:text-sm md:text-base lg:text-lg font-normal text-white/90">
            {testimonial.title}
            {testimonial.company && `, ${testimonial.company}`}
          </span>
        </div>
      </div>

      {/* Optional CTA Button with accent color border */}
      {buttonText && (
        <div className="mt-8 md:mt-10 lg:mt-12 flex justify-center">
          {buttonLink ? (
            <a 
              href={buttonLink}
              className="inline-block px-8 md:px-10 lg:px-12 py-3 md:py-4 border-2 text-white font-stevens-display text-sm md:text-base uppercase tracking-wider hover:bg-white/10 transition-colors duration-300"
              style={{ borderColor: lineColor }}
            >
              {buttonText}
            </a>
          ) : (
            <button 
              onClick={onButtonClick}
              className="inline-block px-8 md:px-10 lg:px-12 py-3 md:py-4 border-2 text-white font-stevens-display text-sm md:text-base uppercase tracking-wider hover:bg-white/10 transition-colors duration-300 cursor-pointer"
              style={{ borderColor: lineColor }}
            >
              {buttonText}
            </button>
          )}
        </div>
      )}
    </div>
  );

  // Image panel (left side on desktop)
  const imagePanel = (
    <div className="relative overflow-hidden h-[300px] sm:h-[400px] lg:h-full">
      <img
        src={imageSrc}
        alt={imageAlt}
        className="w-full h-full object-cover object-center"
        loading="lazy"
      />
    </div>
  );

  const mainContent = (
    <div className={`w-full ${wrapperClass} ${sectionClassName}`.trim()}>
      {/* 
        Scoped CSS for dynamic column ratio
        Uses unique ID to prevent conflicts between multiple instances
      */}
      <style>{`
        @media (min-width: 1024px) {
          .${wrapperClass} .testimonial-image-col {
            width: ${imageRatioNum}%;
            flex: 0 0 ${imageRatioNum}%;
            display: flex;
            flex-direction: column;
          }
          .${wrapperClass} .testimonial-content-col {
            width: ${contentRatioNum}%;
            flex: 0 0 ${contentRatioNum}%;
            display: flex;
            flex-direction: column;
          }
          .${wrapperClass} .testimonial-row {
            align-items: stretch;
          }
        }
      `}</style>

      {/* Flex container for two-column layout - items-stretch ensures equal heights */}
      <div className={`flex ${reverseOnMobile ? 'flex-col-reverse' : 'flex-col'} lg:flex-row testimonial-row`}>
        {/* Image Column - stretches to match content column height */}
        <div className="w-full testimonial-image-col">
          {imagePanel}
        </div>

        {/* Quote Content Column - defines the height for both columns */}
        <div className="w-full testimonial-content-col">
          {quoteContent}
        </div>
      </div>
    </div>
  );

  return animate ? (
    <motion.section 
      className="w-full"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {mainContent}
    </motion.section>
  ) : (
    <section className="w-full">
      {mainContent}
    </section>
  );
};

export default ImageTestimonial;
