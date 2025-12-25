import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getHeroImageProps } from '@/utils/responsiveImage';

/**
 * HeroWithStats - Enhanced hero section with animated statistics
 * @param {Object} props
 * @param {Array} props.titleLines - Array of title lines for multi-line display
 * @param {string} props.subtitle - Subtitle text
 * @param {string} props.bgImage - Background image URL
 * @param {Object} props.primaryCta - Primary CTA button props
 * @param {Object} props.secondaryCta - Secondary CTA button props
 * @param {Array} props.stats - Array of statistics to display
 * @param {Array} props.badges - Optional badges to display
 * @param {string} props.overlayOpacity - Gradient overlay opacity (default: 0.7)
 */
const HeroWithStats = ({
  titleLines = [],
  subtitle,
  bgImage,
  primaryCta,
  secondaryCta,
  stats = [],
  badges = [],
  overlayOpacity = 0.7
}) => {

  const imageProps = bgImage ? getHeroImageProps(bgImage) : {};

  return (
    <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      {bgImage && (
        <div className="absolute inset-0 z-0">
          <img
            {...imageProps}
            alt="Hero background"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Gradient Overlay */}
          <div 
            className="absolute inset-0 bg-gradient-to-r from-stevens-red to-stevens-dark-gray"
            style={{ opacity: overlayOpacity }}
          />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-stevens-content-max mx-auto px-stevens-md lg:px-stevens-lg py-stevens-2xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-stevens-xl items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-stevens-white"
          >
            {/* Badges */}
            {badges.length > 0 && (
              <div className="flex flex-wrap gap-stevens-sm mb-stevens-md">
                {badges.map((badge, index) => (
                  <Badge 
                    key={index}
                    variant={badge.variant || "secondary"}
                    className="bg-stevens-white/20 border-stevens-white/40 text-stevens-white"
                  >
                    {badge.text}
                  </Badge>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="font-stevens-display font-stevens-bold mb-stevens-lg">
              {titleLines.map((line, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="block text-stevens-4xl md:text-stevens-5xl lg:text-stevens-6xl leading-tight"
                >
                  {line}
                </motion.span>
              ))}
            </h1>

            {/* Subtitle */}
            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-stevens-lg md:text-stevens-xl mb-stevens-xl opacity-90"
              >
                {subtitle}
              </motion.p>
            )}

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-stevens-md"
            >
              {primaryCta && (
                <Button
                  size="lg"
                  variant="default"
                  className="bg-stevens-white text-stevens-red hover:bg-stevens-light-gray"
                  onClick={primaryCta.onClick}
                  asChild={primaryCta.to || primaryCta.href}
                >
                  {primaryCta.to ? (
                    <a href={primaryCta.to}>{primaryCta.label}</a>
                  ) : primaryCta.href ? (
                    <a href={primaryCta.href}>{primaryCta.label}</a>
                  ) : (
                    <span>{primaryCta.label}</span>
                  )}
                </Button>
              )}
              
              {secondaryCta && (
                <Button
                  size="lg"
                  variant="outline"
                  className="border-stevens-white text-stevens-white hover:bg-stevens-white/10"
                  onClick={secondaryCta.onClick}
                  asChild={secondaryCta.to || secondaryCta.href}
                >
                  {secondaryCta.to ? (
                    <a href={secondaryCta.to}>{secondaryCta.label}</a>
                  ) : secondaryCta.href ? (
                    <a href={secondaryCta.href}>{secondaryCta.label}</a>
                  ) : (
                    <span>{secondaryCta.label}</span>
                  )}
                </Button>
              )}
            </motion.div>
          </motion.div>

          {/* Right Column - Stats */}
          {stats.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 gap-stevens-lg"
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="bg-stevens-white/10 backdrop-blur rounded-stevens-lg p-stevens-lg">
                      {Icon && (
                        <Icon className="w-10 h-10 mx-auto mb-stevens-sm text-stevens-white opacity-80" />
                      )}
                      <div className="text-stevens-3xl md:text-stevens-4xl font-stevens-display font-stevens-bold text-stevens-white mb-stevens-xs">
                        {stat.value}
                      </div>
                      <div className="text-stevens-sm md:text-stevens-base text-stevens-white/80">
                        {stat.label}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroWithStats;
