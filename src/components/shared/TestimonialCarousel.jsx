import React, { useState, useId, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
 * Gold Diamond/Star SVG Component for navigation indicator
 * Four-pointed star/diamond shape like the reference design
 */
const GoldDiamond = ({ className, style }) => (
  <svg 
    className={className}
    style={style}
    viewBox="0 0 24 24" 
    fill="#D4A843"
    aria-hidden="true"
  >
    <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z"/>
  </svg>
);

/**
 * TestimonialCarousel - A carousel component displaying testimonials with navigation tabs
 * Styled after Stevens Institute's corporate education page design.
 * 
 * Features:
 * - Navigation tabs with speaker names at the top
 * - Gold star separator between first two names
 * - Gold horizontal line under navigation
 * - Two-column layout: image left, quote panel right (desktop)
 * - Stacked layout on mobile (image above content)
 * - Smooth slide/fade transitions between testimonials
 * - Deep red background with golden accent lines
 * 
 * @param {Object} props
 * @param {Array} props.testimonials - Array of testimonial objects
 * @param {string} props.testimonials[].quote - The testimonial quote text
 * @param {string} props.testimonials[].author - Author's name (displayed in navigation)
 * @param {string} props.testimonials[].title - Author's title/role
 * @param {string} [props.testimonials[].company] - Author's company (optional)
 * @param {string} props.testimonials[].imageSrc - URL/path to the speaker's image
 * @param {string} [props.testimonials[].imageAlt] - Alt text for the image
 * @param {string} [props.testimonials[].buttonText] - Text for CTA button (optional)
 * @param {string} [props.testimonials[].buttonLink] - Link for CTA button (optional)
 * @param {string} [props.backgroundColor='#A32638'] - Background color for quote panels
 * @param {string} [props.accentColor='#D4A843'] - Gold accent color
 * @param {number} [props.imageRatio=50] - Percentage width for image column
 * @param {string} [props.sectionClassName] - Additional classes for section wrapper
 */
const TestimonialCarousel = ({
  testimonials = [],
  backgroundColor = '#A32638',
  accentColor = '#D4A843',
  imageRatio = 50,
  sectionClassName = ''
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [starPosition, setStarPosition] = useState({ left: 0, width: 0 });
  const uniqueId = useId().replace(/:/g, '');
  
  // Refs for tracking button positions
  const navContainerRef = useRef(null);
  const buttonRefs = useRef([]);

  // Update star position when active index changes or on mount
  useEffect(() => {
    const updateStarPosition = () => {
      const activeButton = buttonRefs.current[activeIndex];
      const container = navContainerRef.current;
      
      if (activeButton && container) {
        const containerRect = container.getBoundingClientRect();
        const buttonRect = activeButton.getBoundingClientRect();
        
        // Calculate center position of active button relative to container
        const buttonCenter = buttonRect.left + (buttonRect.width / 2) - containerRect.left;
        
        setStarPosition({
          left: buttonCenter,
          width: buttonRect.width
        });
      }
    };

    // Initial calculation
    updateStarPosition();
    
    // Recalculate on window resize
    window.addEventListener('resize', updateStarPosition);
    return () => window.removeEventListener('resize', updateStarPosition);
  }, [activeIndex, testimonials.length]);

  if (!testimonials || testimonials.length === 0) return null;

  const wrapperClass = `testimonial-carousel-${uniqueId}`;
  const imageRatioNum = typeof imageRatio === 'string' ? parseInt(imageRatio, 10) : imageRatio;
  const contentRatioNum = 100 - imageRatioNum;

  // Handle navigation click
  const handleNavClick = (index) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  const activeTestimonial = testimonials[activeIndex];

  // Animation variants for slide transitions
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0
    })
  };

  return (
    <motion.section 
      className={`w-full ${sectionClassName}`.trim()}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className={`w-full ${wrapperClass}`}>
        {/* Scoped CSS for dynamic column ratio */}
        <style>{`
          @media (min-width: 768px) {
            .${wrapperClass} .testimonial-image-col {
              width: ${imageRatioNum}%;
              flex: 0 0 ${imageRatioNum}%;
              display: flex;
              flex-direction: column;
            }
            /* Ensure the image wrapper inside stretches to fill the column */
            .${wrapperClass} .testimonial-image-col > div {
              flex: 1 1 auto;
              min-height: 0;
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

        {/* Navigation Tabs */}
        <div className="bg-white py-6 md:py-8">
          <div className="max-w-stevens-content-max mx-auto px-stevens-md lg:px-stevens-lg">
            {/* Names Navigation */}
            <div 
              ref={navContainerRef}
              className="relative flex items-center justify-between gap-x-2 sm:gap-x-4 md:gap-x-8 lg:gap-x-12 mb-0"
            >
              {testimonials.map((testimonial, index) => (
                <button
                  key={index}
                  ref={(el) => (buttonRefs.current[index] = el)}
                  onClick={() => handleNavClick(index)}
                  className={`
                    font-stevens-display text-[8px] sm:text-xs md:text-sm lg:text-base xl:text-lg 
                    uppercase tracking-wider whitespace-nowrap pb-4
                    transition-all duration-300 relative
                    ${activeIndex === index 
                      ? 'text-stevens-primary font-bold' 
                      : 'text-stevens-gray-500 font-medium hover:text-stevens-gray-700'
                    }
                  `}
                  aria-selected={activeIndex === index}
                  role="tab"
                >
                  <span className={`
                    ${activeIndex === index 
                      ? 'underline underline-offset-4 decoration-2 decoration-stevens-primary' 
                      : ''
                    }
                  `}>
                    {testimonial.author}
                  </span>
                </button>
              ))}
              
              {/* Gold Horizontal Line - Left Segment (with gap for star) */}
              <div 
                className="absolute bottom-0 left-0 h-[2px] transition-all duration-500 ease-out"
                style={{ 
                  backgroundColor: accentColor,
                  width: `${Math.max(0, starPosition.left - 12)}px`
                }}
                aria-hidden="true"
              />
              
              {/* Gold Horizontal Line - Right Segment (with gap for star) */}
              <div 
                className="absolute bottom-0 right-0 h-[2px] transition-all duration-500 ease-out"
                style={{ 
                  backgroundColor: accentColor,
                  left: `${starPosition.left + 12}px`
                }}
                aria-hidden="true"
              />
              
              {/* Sliding Gold Diamond Indicator */}
              <div
                className="absolute bottom-0 transition-all duration-500 ease-out z-10"
                style={{
                  left: `${starPosition.left}px`,
                  transform: 'translate(-50%, 50%)'
                }}
              >
                <GoldDiamond className="w-3 h-3 sm:w-4 sm:h-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Content */}
        <div className="relative overflow-hidden">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
            >
              {/* Two-column layout */}
              <div className="flex flex-col md:flex-row testimonial-row">
                {/* Image Column - Uses aspect ratio on mobile, stretches to match content on desktop */}
                <div className="w-full testimonial-image-col">
                  {/* 
                    Mobile: aspect-[4/3] ensures consistent image proportions
                    Desktop: aspect-auto + h-full lets the image stretch to match quote panel height
                  */}
                  <div className="relative overflow-hidden aspect-[4/3] md:aspect-auto md:h-full">
                    <img
                      src={activeTestimonial.imageSrc}
                      alt={activeTestimonial.imageAlt || `${activeTestimonial.author} testimonial`}
                      className="absolute inset-0 w-full h-full object-cover object-center"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Quote Content Column - Defines the height for both columns on desktop */}
                <div className="w-full testimonial-content-col">
                  <div 
                    className="relative flex flex-col justify-center min-h-[350px] sm:min-h-[400px] md:min-h-[450px] lg:min-h-[500px] p-6 sm:p-8 md:p-12 lg:p-16"
                    style={{ backgroundColor }}
                  >
                    {/* Opening Quote Mark with horizontal accent line */}
                    <div className="flex items-center mb-4 md:mb-6">
                      <OpeningQuoteMark 
                        className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-[75px] lg:h-[77px] flex-shrink-0"
                        color={accentColor}
                      />
                      {/* Horizontal accent line extending from quote mark */}
                      <div 
                        className="flex-grow h-[1px] ml-4 md:ml-6"
                        style={{ backgroundColor: accentColor }}
                        aria-hidden="true"
                      />
                    </div>
                    
                    {/* Quote Text */}
                    <blockquote className="font-stevens-content text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl leading-snug md:leading-tight lg:leading-tight font-normal text-white mb-8 md:mb-10 lg:mb-12">
                      {activeTestimonial.quote}
                    </blockquote>
                    
                    {/* Bottom section: Horizontal Line + Closing Quote + Attribution */}
                    <div className="flex items-center">
                      {/* Horizontal accent line */}
                      <div 
                        className="flex-grow h-[1px] mr-4 md:mr-6"
                        style={{ backgroundColor: accentColor }}
                        aria-hidden="true"
                      />
                      
                      {/* Closing Quote Mark */}
                      <ClosingQuoteMark 
                        className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-[60px] lg:h-[62px] flex-shrink-0"
                        color="#FFFFFF"
                      />
                      
                      {/* Attribution - Name and Title */}
                      <div className="flex flex-col ml-3 md:ml-4 lg:ml-5">
                        <span className="font-stevens-content text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white">
                          {activeTestimonial.author}
                        </span>
                        <span className="font-stevens-content text-xs sm:text-sm md:text-base lg:text-lg font-normal text-white/90">
                          {activeTestimonial.title}
                          {activeTestimonial.company && `, ${activeTestimonial.company}`}
                        </span>
                      </div>
                    </div>

                    {/* Optional CTA Button with accent color border */}
                    {activeTestimonial.buttonText && (
                      <div className="mt-8 md:mt-10 lg:mt-12 flex justify-start">
                        {activeTestimonial.buttonLink ? (
                          <a 
                            href={activeTestimonial.buttonLink}
                            className="inline-block px-8 md:px-10 lg:px-12 py-3 md:py-4 border-2 text-white font-stevens-display text-sm md:text-base uppercase tracking-wider hover:bg-white/10 transition-colors duration-300"
                            style={{ borderColor: accentColor }}
                          >
                            {activeTestimonial.buttonText}
                          </a>
                        ) : (
                          <button 
                            className="inline-block px-8 md:px-10 lg:px-12 py-3 md:py-4 border-2 text-white font-stevens-display text-sm md:text-base uppercase tracking-wider hover:bg-white/10 transition-colors duration-300 cursor-pointer"
                            style={{ borderColor: accentColor }}
                          >
                            {activeTestimonial.buttonText}
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dot indicators for mobile */}
        <div className="flex justify-center gap-2 py-4 bg-white md:hidden">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => handleNavClick(index)}
              className={`
                w-2.5 h-2.5 rounded-full transition-colors duration-300
                ${activeIndex === index 
                  ? 'bg-stevens-primary' 
                  : 'bg-stevens-gray-300 hover:bg-stevens-gray-400'
                }
              `}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default TestimonialCarousel;
