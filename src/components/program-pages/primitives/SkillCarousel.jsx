import React, { useState } from 'react';

/**
 * SkillCarousel - Carousel for "What You'll Learn" modules
 * 
 * Design: CPE Brand Guidelines - Slide-based carousel with navigation
 * Features:
 * - Smooth slide transitions
 * - Navigation arrows (prev/next)
 * - Dot indicators for direct navigation
 * - Supports description (HTML) and skills list
 * 
 * Used in: SkillsSection (What You'll Learn) - for programs with detailed module descriptions
 * 
 * @param {Array} modules - Array of skill modules
 * @param {string} modules[].title - Module title
 * @param {string} modules[].description - Optional HTML description
 * @param {Array} modules[].skills - Array of skill strings
 */
export const SkillCarousel = ({ modules }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % modules.length);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + modules.length) % modules.length);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const goToSlide = (index) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  return (
    <div className="relative max-w-6xl mx-auto">
      {/* Carousel Container */}
      <div className="relative overflow-hidden rounded-stevens-lg">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {modules.map((module, index) => (
            <div key={index} className="w-full flex-shrink-0 px-4">
              <div className="bg-stevens-white rounded-stevens-lg shadow-stevens-xl border border-stevens-light-gray overflow-hidden">
                {/* Card Header */}
                <div className="bg-stevens-dark-gray text-stevens-white p-stevens-lg">
                  <h3 className="font-stevens-bold text-stevens-lg uppercase tracking-wide">
                    {module.title}
                  </h3>
                </div>

                {/* Card Content */}
                <div className="p-stevens-lg">
                  {module.description && (
                    <div
                      className="text-stevens-dark-gray mb-stevens-lg leading-relaxed prose max-w-none"
                      dangerouslySetInnerHTML={{ __html: module.description }}
                    />
                  )}

                  <div className="mb-stevens-md">
                    <p className="font-stevens-bold text-stevens-dark-gray mb-stevens-sm">
                      You'll learn to:
                    </p>
                    <ul className="space-y-stevens-sm">
                      {module.skills.map((skill, skillIndex) => (
                        <li
                          key={skillIndex}
                          className="flex items-start gap-stevens-sm"
                        >
                          <div className="flex-shrink-0 w-2 h-2 bg-stevens-black rounded-full mt-2"></div>
                          <span className="text-stevens-dark-gray text-stevens-sm leading-relaxed">
                            {skill}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        disabled={isTransitioning}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-stevens-white shadow-stevens-lg rounded-full p-stevens-sm hover:bg-stevens-light-gray transition-colors duration-stevens-normal disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Previous slide"
      >
        <svg
          className="w-6 h-6 text-stevens-dark-gray"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        disabled={isTransitioning}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-stevens-white shadow-stevens-lg rounded-full p-stevens-sm hover:bg-stevens-light-gray transition-colors duration-stevens-normal disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Next slide"
      >
        <svg
          className="w-6 h-6 text-stevens-dark-gray"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-stevens-lg space-x-stevens-sm">
        {modules.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-stevens-normal ${
              index === currentIndex
                ? 'bg-stevens-red scale-125'
                : 'bg-stevens-light-gray hover:bg-stevens-gray'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
