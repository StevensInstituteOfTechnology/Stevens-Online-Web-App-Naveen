import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * TestimonialCarousel - Animated carousel for displaying testimonials
 * @param {Object} props
 * @param {string} props.title - Section title
 * @param {string} props.subtitle - Section subtitle
 * @param {Array} props.testimonials - Array of testimonial objects
 * @param {boolean} props.autoPlay - Enable auto-play (default: true)
 * @param {number} props.interval - Auto-play interval in ms (default: 5000)
 * @param {string} props.variant - Display variant: 'default', 'compact', 'full' (default: 'default')
 */
const TestimonialCarousel = ({
  title,
  subtitle,
  testimonials = [],
  autoPlay = true,
  interval = 5000,
  variant = 'default'
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const goToTestimonial = (index) => {
    setActiveIndex(index);
  };

  const goToPrevious = () => {
    setActiveIndex((prev) => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setActiveIndex((prev) => 
      (prev + 1) % testimonials.length
    );
  };

  if (testimonials.length === 0) return null;

  const currentTestimonial = testimonials[activeIndex];

  const renderStars = (rating = 5) => {
    return [...Array(5)].map((_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'fill-stevens-red text-stevens-red' : 'text-stevens-light-gray'}`}
      />
    ));
  };

  const renderTestimonialContent = () => {
    switch (variant) {
      case 'compact':
        return (
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex justify-center mb-stevens-md">
              {renderStars(currentTestimonial.rating)}
            </div>
            <blockquote className="text-stevens-lg text-stevens-dark-gray italic mb-stevens-lg">
              "{currentTestimonial.quote}"
            </blockquote>
            <div>
              <p className="font-stevens-medium text-stevens-dark-gray">
                {currentTestimonial.author}
              </p>
              {currentTestimonial.title && (
                <p className="text-stevens-sm text-stevens-dark-gray">
                  {currentTestimonial.title}
                  {currentTestimonial.company && `, ${currentTestimonial.company}`}
                </p>
              )}
            </div>
          </div>
        );

      case 'full':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-stevens-xl items-center max-w-6xl mx-auto">
            <div className="lg:col-span-2 space-y-stevens-lg">
              <div className="flex items-start">
                <Quote className="w-12 h-12 text-stevens-light-gray -mt-2 mr-stevens-md flex-shrink-0" />
                <div>
                  <div className="flex items-center mb-stevens-md">
                    {renderStars(currentTestimonial.rating)}
                  </div>
                  <blockquote className="text-stevens-xl text-stevens-dark-gray italic">
                    {currentTestimonial.quote}
                  </blockquote>
                </div>
              </div>
              
              <div className="pl-16">
                <p className="font-stevens-display text-stevens-xl font-stevens-bold text-stevens-dark-gray">
                  {currentTestimonial.author}
                </p>
                {currentTestimonial.title && (
                  <p className="text-stevens-dark-gray">
                    {currentTestimonial.title}
                  </p>
                )}
                {currentTestimonial.company && (
                  <p className="text-stevens-dark-gray">
                    {currentTestimonial.company}
                  </p>
                )}
                {currentTestimonial.program && (
                  <p className="text-stevens-red font-stevens-medium mt-stevens-sm">
                    {currentTestimonial.program}
                  </p>
                )}
              </div>

              {currentTestimonial.outcome && (
                <div className="bg-stevens-light-gray rounded-stevens-md p-stevens-md ml-16">
                  <p className="text-stevens-red font-stevens-bold">
                    Outcome: {currentTestimonial.outcome}
                  </p>
                </div>
              )}
            </div>
            
            {currentTestimonial.image && (
              <div className="flex justify-center lg:justify-end">
                <img 
                  src={currentTestimonial.image}
                  alt={currentTestimonial.author}
                  className="w-48 h-48 lg:w-64 lg:h-64 rounded-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            )}

            {currentTestimonial.logo && !currentTestimonial.image && (
              <div className="flex justify-center lg:justify-end items-center">
                <img 
                  src={currentTestimonial.logo}
                  alt={currentTestimonial.company}
                  className="max-h-24 max-w-48 object-contain opacity-70"
                />
              </div>
            )}
          </div>
        );

      default: // 'default'
        return (
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-stevens-xl">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-stevens-xl items-center">
                <div className="lg:col-span-2 space-y-stevens-lg">
                  <div className="flex items-start mb-stevens-md">
                    {renderStars(currentTestimonial.rating)}
                  </div>
                  <blockquote className="text-stevens-lg text-stevens-dark-gray italic">
                    "{currentTestimonial.quote}"
                  </blockquote>
                  
                  <div className="pt-stevens-md border-t border-stevens-light-gray">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-stevens-medium text-stevens-dark-gray">
                          {currentTestimonial.author}
                        </p>
                        {currentTestimonial.title && (
                          <p className="text-stevens-sm text-stevens-dark-gray">
                            {currentTestimonial.title}
                          </p>
                        )}
                        {currentTestimonial.company && (
                          <p className="text-stevens-sm text-stevens-dark-gray">
                            {currentTestimonial.company}
                          </p>
                        )}
                      </div>
                      {currentTestimonial.logo && (
                        <img 
                          src={currentTestimonial.logo} 
                          alt={currentTestimonial.company}
                          className="h-8 w-auto object-contain opacity-70"
                        />
                      )}
                    </div>
                  </div>
                </div>
                
                {currentTestimonial.image && (
                  <div className="flex justify-center">
                    <img 
                      src={currentTestimonial.image}
                      alt={currentTestimonial.author}
                      className="w-48 h-48 rounded-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <section className="w-full">
      {(title || subtitle) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-stevens-2xl"
        >
          {title && (
            <h2 className="font-stevens-display text-stevens-3xl md:text-stevens-4xl font-stevens-bold text-stevens-red mb-stevens-md">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-stevens-lg text-stevens-dark-gray max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
        </motion.div>
      )}

      {/* Testimonial Content */}
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            {renderTestimonialContent()}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Controls */}
        {testimonials.length > 1 && (
          <>
            {/* Arrow Navigation */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none">
              <Button
                variant="ghost"
                size="icon"
                onClick={goToPrevious}
                className="pointer-events-auto bg-stevens-white/80 hover:bg-stevens-white shadow-stevens-md -translate-x-1/2 lg:translate-x-0"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={goToNext}
                className="pointer-events-auto bg-stevens-white/80 hover:bg-stevens-white shadow-stevens-md translate-x-1/2 lg:translate-x-0"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>

            {/* Dot Navigation */}
            <div className="flex justify-center items-center space-x-stevens-sm mt-stevens-lg">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-stevens-normal ${
                    index === activeIndex 
                      ? 'bg-stevens-red w-8' 
                      : 'bg-stevens-light-gray hover:bg-stevens-gray'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default TestimonialCarousel;
