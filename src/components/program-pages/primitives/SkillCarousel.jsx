import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';

// Generic placeholder images for carousel slides
const PLACEHOLDER_IMAGES = [
  '/assets/images/shared/1-explore-msds-640w.webp',
  '/assets/images/shared/2-explore-msds-640w.webp',
  '/assets/images/shared/3-explore-msds-640w.webp',
  '/assets/images/online-experience/online-experience-1-640w.webp',
  '/assets/images/shared/1-omba-hero-scaled-640w.webp',
];

/**
 * SkillCarousel - Redesigned carousel for "What You'll Learn" modules
 *
 * Design: Image-Content Split Layout
 * Features:
 * - Two-column layout: image left (50%), content right (50%)
 * - Large uppercase title
 * - Description with "Learning Outcomes" checkmark list
 * - Numbered pagination (1 / 3) with arrow buttons
 * - Smooth slide transitions
 * - Dynamic height based on tallest slide content
 *
 * Used in: SkillsSection (What You'll Learn)
 *
 * @param {Array} modules - Array of skill modules
 * @param {string} modules[].title - Module title
 * @param {string} modules[].description - Optional HTML description
 * @param {Array} modules[].skills - Array of skill strings (learning outcomes or courses)
 * @param {string} modules[].skillsLabel - Optional label for skills section (default: "Learning Outcomes")
 * @param {string} modules[].image - Optional custom image URL
 */
export const SkillCarousel = ({ modules }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  
  // Refs for measuring content heights
  const contentRefs = useRef([]);
  const containerRef = useRef(null);

  if (!modules || modules.length === 0) return null;

  // Calculate the maximum height among all content panels
  const calculateMaxHeight = useCallback(() => {
    if (contentRefs.current.length === 0) return;
    
    let maxHeight = 0;
    contentRefs.current.forEach((ref) => {
      if (ref) {
        // Temporarily make visible to measure
        const originalDisplay = ref.style.display;
        const originalVisibility = ref.style.visibility;
        const originalPosition = ref.style.position;
        
        ref.style.display = 'block';
        ref.style.visibility = 'hidden';
        ref.style.position = 'absolute';
        
        const height = ref.scrollHeight;
        if (height > maxHeight) {
          maxHeight = height;
        }
        
        // Restore original styles
        ref.style.display = originalDisplay;
        ref.style.visibility = originalVisibility;
        ref.style.position = originalPosition;
      }
    });
    
    // Add padding (p-8 lg:p-10 = 32px or 40px on each side)
    // We'll use a minimum height to ensure good appearance
    const minHeight = 400;
    setContentHeight(Math.max(maxHeight, minHeight));
  }, [modules]);

  // Measure heights on mount and resize
  useEffect(() => {
    // Initial calculation after render
    const timer = setTimeout(calculateMaxHeight, 100);
    
    // Recalculate on window resize
    const handleResize = () => {
      calculateMaxHeight();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, [calculateMaxHeight]);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % modules.length);
    setTimeout(() => setIsTransitioning(false), 400);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + modules.length) % modules.length);
    setTimeout(() => setIsTransitioning(false), 400);
  };

  // Get image for current slide (use module image or cycle through placeholders)
  const getSlideImage = (index) => {
    if (modules[index]?.image) return modules[index].image;
    return PLACEHOLDER_IMAGES[index % PLACEHOLDER_IMAGES.length];
  };

  return (
    <div className="relative max-w-6xl mx-auto">
      {/* Main Carousel Card */}
      <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
        <div className="grid lg:grid-cols-2">
          {/* Left: Image Panel - Hidden on mobile */}
          <div 
            className="hidden lg:block relative overflow-hidden bg-gray-100"
            style={{ minHeight: contentHeight > 0 ? contentHeight : 400 }}
          >
            <div className="absolute inset-0">
              {modules.map((_, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-400 ease-in-out ${
                    index === currentIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <img
                    src={getSlideImage(index)}
                    alt={modules[index].title}
                    className="w-full h-full object-cover"
                  />
                  {/* Subtle gradient overlay for depth */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent" />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Content Panel - Full width on mobile */}
          <div 
            ref={containerRef}
            className="relative p-6 lg:p-10"
            style={{ minHeight: contentHeight > 0 ? contentHeight : undefined }}
          >
            {modules.map((module, index) => (
              <div
                key={index}
                ref={(el) => (contentRefs.current[index] = el)}
                className={`transition-all duration-400 ease-in-out ${
                  index === currentIndex
                    ? 'opacity-100 translate-y-0 relative'
                    : 'opacity-0 translate-y-4 absolute top-0 left-0 right-0 pointer-events-none p-8 lg:p-10'
                }`}
              >
                {/* Module Title */}
                <h3 className="font-stevens-display text-2xl lg:text-3xl font-bold text-stevens-black uppercase tracking-wide mb-4 leading-tight">
                  {module.title}
                </h3>

                {/* Module Description */}
                {module.description && (
                  <div
                    className="text-gray-600 mb-6 leading-relaxed prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: module.description }}
                  />
                )}

                {/* Learning Outcomes / Example Courses */}
                {module.skills && module.skills.length > 0 && (
                  <div>
                    <h4 className="font-bold text-stevens-black text-lg mb-4">
                      {module.skillsLabel || "Learning Outcomes"}
                    </h4>
                    <ul className="space-y-3">
                      {module.skills.map((skill, skillIndex) => (
                        <li
                          key={skillIndex}
                          className="flex items-start gap-3"
                        >
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-stevens-black flex items-center justify-center mt-0.5">
                            <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                          </div>
                          <span className="text-gray-700 leading-relaxed">
                            {skill}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Navigation Bar */}
        <div className="border-t border-gray-100 px-8 py-4 flex items-center justify-between bg-gray-50/50">
          {/* Pagination Controls */}
          <div className="flex items-center gap-4">
            <button
              onClick={prevSlide}
              disabled={isTransitioning}
              className="w-10 h-10 rounded-full border-2 border-stevens-black flex items-center justify-center hover:bg-stevens-black hover:text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Page Indicator */}
            <span className="text-gray-600 font-medium min-w-[60px] text-center">
              {currentIndex + 1} / {modules.length}
            </span>

            <button
              onClick={nextSlide}
              disabled={isTransitioning}
              className="w-10 h-10 rounded-full border-2 border-stevens-black flex items-center justify-center hover:bg-stevens-black hover:text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Dot Indicators (optional, for quick navigation) */}
          <div className="hidden sm:flex items-center gap-2">
            {modules.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!isTransitioning && index !== currentIndex) {
                    setIsTransitioning(true);
                    setCurrentIndex(index);
                    setTimeout(() => setIsTransitioning(false), 400);
                  }
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? 'bg-stevens-black scale-110'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
