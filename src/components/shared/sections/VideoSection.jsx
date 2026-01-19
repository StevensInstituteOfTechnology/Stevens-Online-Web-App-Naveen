import React, { forwardRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { AnimatedSection } from "@/components/shared";
import { VideoPlayer } from "@/components/shared";

/**
 * VideoSection - Video with Content Section
 *
 * Design: Dark background with video player and content side-by-side
 * Features:
 * - Video player component (2/3 width on desktop)
 * - Content panel with heading, description, and CTA link (1/3 width on desktop)
 * - Animated sections with staggered delays
 * - Responsive grid layout
 * - Supports forwardRef for section navigation
 *
 * Used in: Home page, Program pages
 *
 * @param {string} title - Section title (default: "THE STEVENS ONLINE ADVANTAGE")
 * @param {string} heading - Content heading (default: "Delivering the outcomes that drive career success")
 * @param {string} description - Content description text
 * @param {string} videoSrc - Video source path
 * @param {string} videoPoster - Video poster image path
 * @param {string} videoTitle - Video title attribute
 * @param {boolean} showControls - Whether to show video controls (default: true)
 * @param {boolean} muted - Whether video is muted (default: true)
 * @param {string} ctaText - Call-to-action link text (default: "Discover the online experience")
 * @param {string} ctaLink - Call-to-action link URL (default: "/online-learning-experience/")
 * @param {boolean} showCTA - Whether to show the CTA link (default: true)
 * @param {string} className - Additional class names for the section
 */
export const VideoSection = forwardRef(function VideoSection(
  {
    title = "THE STEVENS ONLINE ADVANTAGE",
    heading = "Delivering the outcomes that drive career success",
    description = "The College of Professional Education is much more than courses and credentials - it's a powerful new model centered on giving working professionals at every stage of their careers the unique mix of skills and qualifications they need to excel in today's complex global economy.",
    videoSrc = "/assets/videos/Stevens Online Home - 1.mp4",
    videoPoster = "/assets/videos/video-cover-3.avif",
    videoTitle = "",
    showControls = true,
    muted = true,
    ctaText = "Discover the online experience",
    ctaLink = "/online-learning-experience/",
    showCTA = true,
    className = "",
  },
  ref
) {
  return (
    <section
      id="video"
      ref={ref}
      className={`py-stevens-section-sm lg:py-stevens-section bg-stevens-black relative overflow-hidden ${className}`}
    >
      <div className="max-w-7xl mx-auto px-stevens-md lg:px-stevens-lg">
        {/* Section Header - Full Width */}
        <AnimatedSection className="mb-8 lg:mb-12">
          <h2 className="font-stevens-display text-4xl lg:text-5xl font-light text-white tracking-tight leading-tight">
            {title}
          </h2>
        </AnimatedSection>

        <div className="grid lg:grid-cols-3 gap-stevens-gap-lg items-center">
          <AnimatedSection className="relative lg:col-span-2">
            <div className="bg-stevens-white rounded-stevens-md overflow-hidden shadow-stevens-lg border border-white/20">
              {/* Video Player Component */}
              <VideoPlayer
                src={videoSrc}
                poster={videoPoster}
                title={videoTitle}
                showControls={showControls}
                muted={muted}
              />
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <h3 className="font-stevens-display text-2xl lg:text-3xl font-bold text-white mb-6 leading-tight">
              {heading}
            </h3>

            <p className="text-stevens-lg text-white/80 mb-8 leading-relaxed">
              {description}
            </p>

            {/* CTA Link */}
            {showCTA && (
              <Link
                to={ctaLink}
                className="inline-flex items-center text-stevens-red font-bold hover:underline underline-offset-4 group"
              >
                {ctaText}
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            )}
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
});

export default VideoSection;
