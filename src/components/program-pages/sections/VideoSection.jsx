import React, { forwardRef } from 'react';
import { Section } from '../primitives';
import { VideoPlayer } from '../../shared';

/**
 * VideoSection - Featured video player section
 * 
 * Design: CPE Brand Guidelines - Responsive video player with poster
 * Features:
 * - VideoPlayer component with controls and poster image
 * - Light gray background for visual contrast
 * - Rounded corners and shadow for card-like appearance
 * 
 * Used in: Degree pages only (after Rankings)
 * 
 * @param {Object} videoSection - Video configuration object
 * @param {string} videoSection.title - Section/video title
 * @param {string} videoSection.videoSrc - Video source URL
 * @param {string} videoSection.posterSrc - Poster image URL
 * @param {boolean} videoSection.showControls - Show video controls
 * @param {boolean} videoSection.muted - Mute video by default
 */
export const VideoSection = forwardRef(function VideoSection(
  { videoSection },
  ref
) {
  if (!videoSection) return null;

  return (
    <Section
      id="video"
      title={videoSection.title}
      bgClassName="bg-stevens-light-gray"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto">
        <div className="bg-stevens-white rounded-stevens-md overflow-hidden shadow-stevens-lg border border-stevens-light-gray">
          <VideoPlayer
            src={videoSection.videoSrc}
            poster={videoSection.posterSrc}
            title={videoSection.title}
            showControls={videoSection.showControls}
            muted={videoSection.muted}
          />
        </div>
      </div>
    </Section>
  );
});
