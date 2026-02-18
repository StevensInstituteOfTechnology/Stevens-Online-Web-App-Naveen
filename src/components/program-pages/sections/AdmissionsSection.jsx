import React, { forwardRef } from 'react';
import { FileText, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Section } from '../primitives';

/**
 * AdmissionsSection - Admissions information with multiple layout variants
 * 
 * Design: CPE Brand Guidelines - Complex section with multiple layouts
 * 
 * Variants:
 * 1. "combinedWithTuition" / "certificateWithDeadlines":
 *    - Two-column layout: Admissions (left) + Tuition (right)
 * 
 * 2. "imageCards":
 *    - Full-bleed two-column layout with background images
 *    - Dark card (left) + Light card (right) with glass morphism
 *    - Includes consultation CTA bar at bottom
 *    - Used for MSCS, MEM degree pages
 * 
 * 3. "singleImageCard":
 *    - Full-width background image with single floating card
 *    - Card positioned right by default (or left via cardPosition)
 *    - No consultation CTA bar
 *    - Used for MEADS and single-option pages
 * 
 * 4. Default (options layout):
 *    - Application options as cards (1-3 columns)
 *    - Optional alert message box
 *    - Optional consultation CTA
 * 
 * Used in: Both Degree and Certificate pages
 * 
 * @param {Object} admissions - Admissions configuration
 * @param {string} admissions.variant - Layout variant ("imageCards", "singleImageCard", "combinedWithTuition", etc.)
 * @param {string} admissions.backgroundImage - Background image URL for singleImageCard variant
 * @param {string} admissions.requirements - HTML requirements content
 * @param {Array} admissions.options - Array of application option objects
 * @param {string} admissions.options[].subtitle - Tagline for imageCards/singleImageCard variants
 * @param {string} admissions.options[].theme - "dark" or "light" for card styling
 * @param {string} admissions.options[].image - Background image URL for imageCards variant
 * @param {string} admissions.options[].cardPosition - "left" or "right" for singleImageCard variant
 * @param {string} admissions.options[].footnote - Optional footnote text below description
 * @param {Object} admissions.alertMessage - Optional alert message
 * @param {Object} admissions.consultation - Optional consultation CTA (imageCards only)
 * @param {Object} keyDates - Key dates for combined layout
 * @param {Object} tuition - Tuition data for combined layout
 */
export const AdmissionsSection = forwardRef(function AdmissionsSection(
  { admissions, keyDates: _keyDates, tuition },
  ref
) {
  if (!admissions) return null;

  // Combined layout for "combinedWithTuition" or "certificateWithDeadlines" variants
  if (
    (admissions.variant === 'combinedWithTuition' ||
      admissions.variant === 'certificateWithDeadlines') &&
    tuition
  ) {
    return (
      <Section
        id="admissions"
        bgClassName="bg-stevens-light-gray"
        ref={ref}
      >
        <div className="grid lg:grid-cols-5 gap-stevens-2xl items-start">
          {/* Left Column - Admissions */}
          <div className="lg:col-span-3">
            <h2 className="font-stevens-display text-stevens-4xl font-light text-center mb-stevens-lg uppercase tracking-wide">
              Admissions
            </h2>
            {admissions.requirements && (
              <Card className="shadow-stevens-lg rounded-stevens-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-stevens-sm font-stevens-display text-stevens-xl font-light text-stevens-dark-gray">
                    <FileText /> Application Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent
                  className="prose text-stevens-dark-gray"
                  dangerouslySetInnerHTML={{
                    __html: admissions.requirements,
                  }}
                />
              </Card>
            )}
          </div>

          {/* Right Column - Tuition */}
          <div className="lg:col-span-2">
            {tuition && (
              <>
                <h2 className="font-stevens-display text-stevens-4xl font-light text-center mb-stevens-lg uppercase tracking-wide">
                  Tuition
                </h2>
                {tuition.cards && tuition.cards.length > 0 && (
                  <div className="grid grid-cols-2 gap-stevens-md text-center">
                    {tuition.cards.map((card) => (
                      <Card
                        key={card.label}
                        className="p-stevens-sm stevens-md:p-stevens-md rounded-stevens-md flex flex-col h-full"
                      >
                        {/* Top layer: Price */}
                        <div className="flex-1 flex items-center justify-center min-h-[60%]">
                          <p className="font-stevens-display text-stevens-lg stevens-sm:text-stevens-2xl stevens-md:text-stevens-3xl font-light text-stevens-red whitespace-nowrap">
                            {card.value}
                          </p>
                        </div>
                        {/* Bottom layer: Label - h3 for proper heading hierarchy under Tuition h2 */}
                        <div className="flex-1 flex items-center justify-center min-h-[40%] pt-stevens-md">
                          <h3 className="text-stevens-xs mb-stevens-md stevens-sm:text-stevens-sm text-stevens-dark-gray font-semibold m-0">
                            {card.label}
                          </h3>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
                {tuition.description && (
                  <div
                    className="prose text-center text-stevens-xs max-w-none mx-auto mt-stevens-md text-stevens-dark-gray"
                    dangerouslySetInnerHTML={{
                      __html: tuition.description,
                    }}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </Section>
    );
  }

  // Image Cards layout for MSCS, MEM, MEADS
  if (admissions.variant === 'imageCards' && admissions.options) {
    return (
      <section
        id="admissions"
        ref={ref}
        className="scroll-mt-20 relative bg-white " // Full-width white background
      >
        {/* Section Title */}
        <div className="bg-white py-12">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="font-stevens-display text-stevens-4xl lg:text-stevens-5xl font-light text-stevens-black uppercase tracking-wide">
              {admissions.title || "Choose Your Application Option"}
            </h2>
            {admissions.subtitle && (
              <p className="mt-4 text-lg text-stevens-dark-gray max-w-2xl mx-auto">
                {admissions.subtitle}
              </p>
            )}
          </div>
        </div>
        
        {/* Two-column image cards */}
        <div className="grid lg:grid-cols-2 max-w-7xl mx-auto">
          {admissions.options.map((option, i) => {
            const isDark = option.theme === 'dark';
            return (
              <div
                key={i}
                className="relative flex items-center justify-center py-16 lg:pt-20 lg:pb-48 px-6 min-h-[500px] lg:min-h-[700px]"
              >
                {/* Background Image - Absolute & Full Height */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={option.image || '/assets/images/shared/stevens-campus.webp'}
                    alt=""
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  
                </div>
                
                {/* Floating Glass Card */}
                <div className={`relative z-10 w-full max-w-[440px] overflow-hidden shadow-2xl transition-transform duration-300 hover:-translate-y-1 backdrop-blur-md ${
                  isDark 
                    ? 'bg-black/50 border border-white/10' 
                    : 'bg-white/60 border border-white/30'
                } ${
                  option.featured ? 'ring-1 ring-stevens-red' : ''
                }`}>
                  <div className="p-8 md:p-10">
                    {/* Title */}
                    <h3 className={`font-stevens-display text-3xl font-medium mb-4 leading-tight ${
                      isDark ? 'text-white' : 'text-stevens-black'
                    }`}>
                      {option.title}
                    </h3>
                    
                    {/* Subtitle */}
                      {option.subtitle && (
                        <p className={`text-base md:text-lg mb-8 leading-relaxed font-light ${
                          isDark ? 'text-white' : 'text-stevens-dark-gray'
                        }`}>
                          {option.subtitle}
                        </p>
                      )}
                      
                      {/* Description/Bullets */}
                      <div
                        className={`prose prose-sm mb-6 max-w-none prose-li:my-1 [&_*]:no-underline [&_strong]:font-semibold ${
                          isDark 
                            ? 'prose-invert text-white [&_li]:text-white [&_p]:text-white [&_ul]:text-white [&_*]:text-white' 
                            : '[&_li]:text-stevens-dark-gray [&_p]:text-stevens-dark-gray [&_strong]:text-stevens-black'
                        }`}
                        dangerouslySetInnerHTML={{ __html: option.description }}
                      />

                      {/* Footnote */}
                      {option.footnote && (
                        <p className={`text-sm mb-6 leading-relaxed italic ${
                          isDark ? 'text-white/90' : 'text-stevens-dark-gray'
                        }`}>
                          {option.footnote}
                        </p>
                      )}
                    
                    {/* Button */}
                    {option.buttonText && (
                      <a
                        href={option.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block mt-auto"
                      >
                        <Button 
                          className="w-full h-12 text-lg font-bold tracking-wide  bg-black text-white hover:bg-stevens-dark-gray border border-transparent"
                        >
                          {option.buttonText}
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Consultation CTA Bar - Static on mobile, floating on lg */}
        {admissions.consultation && (
          <div className="relative lg:absolute lg:bottom-12 lg:left-0 lg:right-0 z-20 px-4 py-8 lg:py-0 bg-white lg:bg-transparent">
            <div className="max-w-[90%] lg:max-w-6xl mx-auto">
              <div className="bg-gray-100/95 backdrop-blur-sm rounded-xl shadow-xl border border-gray-200 px-6 py-5 lg:px-10 lg:py-6 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-12">
                <h3 className="text-lg lg:text-xl font-bold text-stevens-dark-gray text-center sm:text-left">
                  {admissions.consultation.title}
                </h3>
                <a
                  href={admissions.consultation.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline-dark" className="whitespace-nowrap px-8 bg-transparent border-stevens-dark-gray text-stevens-dark-gray hover:bg-stevens-dark-gray hover:text-white">
                    {admissions.consultation.buttonText}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        )}
      </section>
    );
  }

  // Single Image Card layout - one card on full-width background image
  // Used for MEADS and pages with only one application option
  if (admissions.variant === 'singleImageCard' && admissions.options && admissions.options.length > 0) {
    const option = admissions.options[0];
    const isDark = option.theme === 'dark';
    
    return (
      <section
        id="admissions"
        ref={ref}
        className="scroll-mt-20 relative bg-white pb-16"
      >
        {/* Section Title */}
        <div className="py-12">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="font-stevens-display text-stevens-4xl lg:text-stevens-5xl font-light text-stevens-black uppercase tracking-wide">
              {admissions.title || "Application Option"}
            </h2>
            {admissions.subtitle && (
              <p className="mt-4 text-lg text-stevens-dark-gray max-w-2xl mx-auto">
                {admissions.subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Constrained-width background image with single card - matches imageCards width */}
        <div className="max-w-7xl mx-auto ">
          <div className="relative min-h-[500px] lg:min-h-[600px] ">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <img
                src={admissions.backgroundImage || option.image || '/assets/images/shared/stevens-campus.webp'}
                alt=""
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {/* Subtle overlay for contrast */}
              <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* Content Container - Card centered */}
            <div className="relative z-10 h-full flex items-center justify-center px-6 lg:px-8 py-16 lg:py-20">
              <div className="w-full md:w-2/3 lg:w-2/3 xl:w-2/3">
              {/* Floating Glass Card */}
              <div className={`overflow-hidden shadow-2xl transition-transform duration-300 hover:-translate-y-1 backdrop-blur-md ${
                isDark 
                  ? 'bg-black/50 border border-white/10' 
                  : 'bg-white/80 border border-white/30'
              } ${
                option.featured ? 'ring-1 ring-stevens-red' : ''
              }`}>
                <div className="p-8 md:p-10">
                  {/* Title */}
                  <h3 className={`font-stevens-display text-3xl font-medium mb-4 leading-tight ${
                    isDark ? 'text-white' : 'text-stevens-black'
                  }`}>
                    {option.title}
                  </h3>
                  
                  {/* Subtitle */}
                  {option.subtitle && (
                    <p className={`text-base md:text-lg mb-8 leading-relaxed font-light ${
                      isDark ? 'text-white' : 'text-stevens-dark-gray'
                    }`}>
                      {option.subtitle}
                    </p>
                  )}
                    
                  {/* Description/Bullets */}
                  <div
                    className={`prose prose-sm mb-6 max-w-none prose-li:my-1 [&_*]:no-underline [&_strong]:font-semibold ${
                      isDark 
                        ? 'prose-invert text-white [&_li]:text-white [&_p]:text-white [&_ul]:text-white [&_*]:text-white' 
                        : '[&_li]:text-stevens-dark-gray [&_p]:text-stevens-dark-gray [&_strong]:text-stevens-black'
                    }`}
                    dangerouslySetInnerHTML={{ __html: option.description }}
                  />

                  {/* Footnote */}
                  {option.footnote && (
                    <p className={`text-sm mb-6 leading-relaxed italic ${
                      isDark ? 'text-white/90' : 'text-stevens-dark-gray'
                    }`}>
                      {option.footnote}
                    </p>
                  )}
                  
                  {/* Button */}
                  {option.buttonText && (
                    <a
                      href={option.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block mt-auto"
                    >
                      <Button 
                        className="w-full h-12 text-lg font-bold tracking-wide bg-black text-white hover:bg-stevens-dark-gray border border-transparent"
                      >
                        {option.buttonText}
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>
    );
  }

  // Default options layout
  return (
    <Section
      id="admissions"
      title={
        admissions.options && admissions.options.length === 1
          ? 'Application Option'
          : 'Choose Your Application Option'
      }
      bgClassName="bg-stevens-white"
      ref={ref}
    >
      <div
        className={`flex flex-wrap justify-center ${
          admissions.options && admissions.options.length === 1
            ? 'max-w-3xl mx-auto'
            : admissions.options && admissions.options.length === 2
            ? 'max-w-6xl mx-auto'
            : ''
        } gap-8`}
      >
        {admissions.options &&
          admissions.options.map((option, i) => (
            <Card
              key={i}
              className={`w-full ${
                admissions.options.length === 1
                  ? ''
                  : admissions.options.length === 2
                  ? 'md:w-[48%]'
                  : 'md:w-[48%] lg:w-[31%]'
              } shadow-lg ${
                option.featured ? 'border-2 border-stevens-red' : ''
              }`}
            >
              <CardHeader>
                <CardTitle>{option.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div
                  className="prose"
                  dangerouslySetInnerHTML={{ __html: option.description }}
                />
                {option.buttonText && !option.buttonGrayOut && (
                  <a
                    href={option.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <Button variant="default" className="w-full mt-2">
                      {option.buttonText}{' '}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </a>
                )}
              </CardContent>
            </Card>
          ))}
        {admissions.alertMessage && (
          <div className="w-full max-w-[75ch] mx-auto bg-stevens-red p-4 md:p-8 text-white border-2 border-stevens-dark-gray rounded-md">
            <div className="w-full">
              <h3 className="text-xl md:text-2xl font-bold">
                {admissions.alertMessage.title}
              </h3>
              <div
                className="py-4"
                dangerouslySetInnerHTML={{
                  __html: admissions.alertMessage.description,
                }}
              />
              {admissions.alertMessage.url && (
                <a
                  href={admissions.alertMessage.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline-white">
                    {admissions.alertMessage.buttonText}
                  </Button>
                </a>
              )}
            </div>
          </div>
        )}
      </div>
      {admissions.consultation && (
        <div className="text-center mt-12">
          <h3 className="text-xl font-semibold mb-2">
            {admissions.consultation.title}
          </h3>
          {admissions.consultation.url && (
            <a
              href={admissions.consultation.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline-dark">
                {admissions.consultation.buttonText}
              </Button>
            </a>
          )}
        </div>
      )}
    </Section>
  );
});
