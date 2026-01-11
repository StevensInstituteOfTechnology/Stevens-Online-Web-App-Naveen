import React, { forwardRef } from 'react';
import { VideoPlayer } from '../../shared';
import { Section } from '../primitives';

/**
 * WhyStevensSection - Why Stevens / Experiential Learning section
 * 
 * Design: CPE Brand Guidelines - Dark background with content variants
 * Variants:
 * - "splitWithVideo": Two-column layout with text (left) and video (right)
 * - default: Full-width dark background with centered content
 * 
 * Features:
 * - Dark background with white text
 * - Optional video player with caption
 * - HTML description content
 * 
 * Used in: Both Degree and Certificate pages
 * 
 * @param {Object} whyStevens - Section configuration
 * @param {string} whyStevens.variant - Display variant ("splitWithVideo" or default)
 * @param {string} whyStevens.title - Section title
 * @param {string} whyStevens.description - HTML description content
 * @param {Object} whyStevens.video - Optional video configuration
 * @param {string} whyStevens.video.src - Video source URL
 * @param {string} whyStevens.video.poster - Video poster image URL
 * @param {string} whyStevens.video.title - Video title
 * @param {string} whyStevens.video.caption - Optional video caption
 */
export const WhyStevensSection = forwardRef(function WhyStevensSection(
  { whyStevens },
  ref
) {
  if (!whyStevens) return null;

  return (
    <Section
      id="why-stevens"
      bgClassName="bg-stevens-white"
      paddingClassName="py-stevens-section-sm lg:py-stevens-section"
      ref={ref}
    >
      {whyStevens.variant === 'splitWithVideo' ? (
        <div className="max-w-stevens-content-max mx-auto">
          <div className="grid lg:grid-cols-2 gap-stevens-2xl items-center">
            {/* Left Column - Text Content */}
            <div className="bg-stevens-black text-stevens-white p-stevens-2xl rounded-stevens-lg">
              <h2 className="font-stevens-display text-stevens-4xl font-light mb-stevens-lg uppercase tracking-wide">
                {whyStevens.title}
              </h2>
              <div
                className="prose prose-lg prose-invert max-w-none [&_p]:text-stevens-lg [&_p]:leading-relaxed [&_p]:mb-stevens-lg"
                dangerouslySetInnerHTML={{
                  __html: whyStevens.description,
                }}
              />
            </div>

            {/* Right Column - Video Player */}
            <div className="relative">
              {whyStevens.video && (
                <>
                  <VideoPlayer
                    src={whyStevens.video.src}
                    poster={whyStevens.video.poster}
                    title={whyStevens.video.title || ''}
                    showControls={true}
                    muted={true}
                    className="rounded-stevens-lg shadow-stevens-2xl"
                  />
                  {whyStevens.video.caption && (
                    <div className="mt-stevens-md text-center">
                      <p className="text-stevens-sm text-stevens-dark-gray italic">
                        {whyStevens.video.caption}
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-stevens-black text-stevens-white py-16 rounded-stevens-lg">
          <div className="max-w-7xl mx-auto px-stevens-sm stevens-md:px-stevens-lg stevens-xl:px-stevens-xl text-center">
            <h2 className="font-stevens-display text-stevens-3xl stevens-md:text-stevens-4xl font-light mb-stevens-lg text-stevens-white uppercase tracking-wide">
              {whyStevens.title}
            </h2>
            <div
              className="prose prose-invert max-w-none mx-auto text-left text-stevens-base stevens-md:text-stevens-lg [&_p]:text-stevens-white [&_li]:text-stevens-white"
              dangerouslySetInnerHTML={{ __html: whyStevens.description }}
            />
          </div>
        </div>
      )}
    </Section>
  );
});
