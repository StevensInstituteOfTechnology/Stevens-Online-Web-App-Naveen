import React, { useRef, useEffect, useState } from 'react';

/**
 * Asterism Component - CPE Brand Guidelines Visual Element
 * 
 * Creates intersecting lines (asterisms) that add depth and dimensionality.
 * 
 * Rules from CPE Brand Guidelines:
 * - Line thickness: 1px (as thin as possible)
 * - Angles: Only 0°, 90°, 25°, -25°
 * - Rays: 3-5 from center point
 * - Colors: black, gray, or white only (NEVER red)
 * - At least one line must have gradient fading
 * - One main asterism per composition
 */

// Color map matching tailwind.config.js
const COLOR_MAP = {
  'stevens-white': '#FFFFFF',
  'stevens-black': '#000000',
  'stevens-dark-gray': '#363D45',
  'stevens-gray': '#7F7F7F',
  'stevens-light-gray': '#E4E5E6',
  'white': '#FFFFFF',
  'black': '#000000',
};

// Allowed angles per CPE Brand Guidelines
// 4 line orientations × 2 directions = 8 valid ray directions
//
//                 90° (UP)
//                    ↑
//    155°        ↖   │   ↗  25°
//   (UP-LEFT)        │      (UP-RIGHT)
//                    │
// 180° (LEFT) ←──────●──────→ 0° (RIGHT)
//                    │
//    205°        ↙   │   ↘  335°
//  (DOWN-LEFT)       │      (DOWN-RIGHT)
//                    ↓
//               270° (DOWN)
//
// Note: Opposite angles are exactly 180° apart to form straight lines
// 0° ↔ 180°, 90° ↔ 270°, 25° ↔ 205°, 155° ↔ 335°
//
const ALLOWED_ANGLES = [0, 25, 90, 155, 180, 205, 270, 335];

/**
 * Parse position value - supports both percentage and pixel values
 * @param {string|number} value - e.g., "50%", 500, "30%"
 * @param {number} containerSize - container dimension in pixels
 * @returns {number} - pixel value
 */
const parsePosition = (value, containerSize) => {
  if (typeof value === 'number') return value;
  if (typeof value === 'string' && value.endsWith('%')) {
    return (parseFloat(value) / 100) * containerSize;
  }
  return parseFloat(value) || 0;
};

/**
 * Calculate ray endpoint from center point
 * @param {number} centerX - center X coordinate
 * @param {number} centerY - center Y coordinate
 * @param {number} angle - angle in degrees (0° = RIGHT, 90° = UP, positive = counter-clockwise)
 * @param {number} length - ray length in pixels
 * @returns {{ x: number, y: number }} - endpoint coordinates
 */
const calculateEndpoint = (centerX, centerY, angle, length) => {
  // Standard math convention: 0° = RIGHT, positive angles go counter-clockwise
  // Screen Y-axis is inverted (down is positive), so we negate the angle
  const radians = -angle * (Math.PI / 180);
  return {
    x: centerX + length * Math.cos(radians),
    y: centerY + length * Math.sin(radians),
  };
};

/**
 * Asterism Component
 */
export default function Asterism({
  // Positioning (supports percentage or pixel values)
  centerX = '50%',
  centerY = '50%',
  
  // Ray configuration
  rays = 4,                          // Number of rays (3-5)
  angles = [0, 25, 90, 335],         // Which angles to use (0°=RIGHT, 90°=UP, 25°=UP-RIGHT, 335°=DOWN-RIGHT)
  length = 'full',                   // Default ray length: number, percentage, or 'full'
  rayLengths = null,                 // Individual ray lengths array (e.g., [500, 'full', 300, '80%'])
  
  // Constraints
  minLength = 100,                   // Minimum ray length in pixels
  maxLength = 2000,                  // Maximum ray length in pixels
  
  // Styling
  color = 'stevens-white',           // Base color
  opacity = 0.6,                     // Base opacity
  strokeWidth = 1,                   // Line thickness (should stay 1px per guidelines)
  
  // Gradient fading (at least one line should fade per guidelines)
  fadeRays = [0, 2],                 // Which ray indices should fade
  fadeDirection = 'out',             // 'out' (center to edge) or 'in' (edge to center)
  fadeOpacity = 0,                   // Opacity at fade end
  
  // Animation
  animate = true,                    // Enable animation
  animationType = 'radiate',         // 'fade' (opacity) or 'radiate' (lines grow from center)
  animationDuration = 1000,          // Animation duration in ms
  animationDelay = 300,              // Animation delay in ms
  staggerDelay = 100,                // Delay between each ray animation (for radiate)
  
  // Styling
  className = '',
  style = {},
}) {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isVisible, setIsVisible] = useState(!animate);
  
  // Validate and clamp rays (3-8 allowed, brand guidelines say 3-5 but we allow more flexibility)
  const validRays = Math.min(8, Math.max(3, rays));
  
  // Normalize angle to 0-360 range
  const normalizeAngle = (angle) => {
    let normalized = angle % 360;
    if (normalized < 0) normalized += 360;
    return normalized;
  };
  
  // Validate angles - normalize first, then check against allowed
  const validAngles = angles
    .map(normalizeAngle)
    .filter(a => ALLOWED_ANGLES.includes(a));
  
  if (validAngles.length === 0) {
    console.warn('Asterism: No valid angles provided. Using default [90, 0, 25, 335]');
    validAngles.push(90, 0, 25, 335);
  }
  
  // Validate color (never red!)
  const resolvedColor = COLOR_MAP[color] || COLOR_MAP['stevens-white'];
  if (color.includes('red') || color === 'stevens-red' || color === '#a32638') {
    console.error('Asterism: Stevens Red is not allowed for asterisms per CPE Brand Guidelines');
  }
  
  // Get container dimensions
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      }
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);
  
  // Trigger animation
  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => setIsVisible(true), animationDelay);
      return () => clearTimeout(timer);
    }
  }, [animate, animationDelay]);
  
  // Calculate positions
  const cx = parsePosition(centerX, dimensions.width);
  const cy = parsePosition(centerY, dimensions.height);
  
  // Calculate the "full" length (distance to furthest corner * 1.5)
  const maxDist = Math.max(
    Math.sqrt(cx * cx + cy * cy),
    Math.sqrt((dimensions.width - cx) ** 2 + cy ** 2),
    Math.sqrt(cx ** 2 + (dimensions.height - cy) ** 2),
    Math.sqrt((dimensions.width - cx) ** 2 + (dimensions.height - cy) ** 2)
  );
  const fullLength = maxDist * 1.5;
  const maxDim = Math.max(dimensions.width, dimensions.height);
  
  // Function to calculate length for a single ray
  const calculateRayLength = (lengthValue) => {
    let result;
    if (lengthValue === 'full') {
      result = fullLength;
    } else if (typeof lengthValue === 'string' && lengthValue.endsWith('%')) {
      result = (parseFloat(lengthValue) / 100) * maxDim;
    } else {
      result = typeof lengthValue === 'number' ? lengthValue : 500;
    }
    // Apply constraints
    return Math.min(maxLength, Math.max(minLength, result));
  };
  
  // Calculate default ray length
  const defaultRayLength = calculateRayLength(length);
  
  // Select angles for rays
  const selectedAngles = validAngles.slice(0, validRays);
  while (selectedAngles.length < validRays && selectedAngles.length < validAngles.length) {
    selectedAngles.push(validAngles[selectedAngles.length % validAngles.length]);
  }
  
  // Generate unique gradient IDs
  const gradientId = `asterism-gradient-${Math.random().toString(36).substr(2, 9)}`;
  
  // Don't render until we have dimensions
  if (dimensions.width === 0 || dimensions.height === 0) {
    return (
      <div 
        ref={containerRef} 
        className={`absolute inset-0 pointer-events-none ${className}`}
        style={style}
        aria-hidden="true"
      />
    );
  }
  
  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={style}
      aria-hidden="true"
    >
      <svg 
        width="100%" 
        height="100%" 
        className={`absolute inset-0 ${animationType === 'fade' ? 'transition-opacity' : ''}`}
        style={{ 
          // For 'fade' animation: use opacity transition
          // For 'radiate' animation: always visible, lines animate via stroke-dashoffset
          opacity: animationType === 'fade' ? (isVisible ? 1 : 0) : 1,
          transitionDuration: animationType === 'fade' && animate ? `${animationDuration}ms` : '0ms',
        }}
      >
        <defs>
          {/* Gradient for fading lines */}
          <linearGradient id={`${gradientId}-out`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={resolvedColor} stopOpacity={opacity} />
            <stop offset="100%" stopColor={resolvedColor} stopOpacity={fadeOpacity} />
          </linearGradient>
          <linearGradient id={`${gradientId}-in`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={resolvedColor} stopOpacity={fadeOpacity} />
            <stop offset="100%" stopColor={resolvedColor} stopOpacity={opacity} />
          </linearGradient>
        </defs>
        
        {/* Render rays */}
        {selectedAngles.map((angle, index) => {
          // Get individual ray length or use default
          const individualLength = rayLengths && rayLengths[index] !== undefined
            ? calculateRayLength(rayLengths[index])
            : defaultRayLength;
          
          const endpoint = calculateEndpoint(cx, cy, angle, individualLength);
          const shouldFade = fadeRays.includes(index);
          
          // Create unique gradient for this line's direction
          const lineGradientId = `${gradientId}-line-${index}`;
          
          // Calculate line length for radiate animation
          const lineLength = Math.sqrt(
            Math.pow(endpoint.x - cx, 2) + Math.pow(endpoint.y - cy, 2)
          );
          
          // Radiate animation: use stroke-dasharray/dashoffset
          const radiateStyle = animationType === 'radiate' ? {
            strokeDasharray: lineLength,
            strokeDashoffset: isVisible ? 0 : lineLength,
            transition: `stroke-dashoffset ${animationDuration}ms ease-out ${animationDelay + (index * staggerDelay)}ms`,
          } : {};
          
          return (
            <g key={index}>
              {shouldFade && (
                <defs>
                  <linearGradient 
                    id={lineGradientId}
                    gradientUnits="userSpaceOnUse"
                    x1={cx}
                    y1={cy}
                    x2={endpoint.x}
                    y2={endpoint.y}
                  >
                    {fadeDirection === 'out' ? (
                      <>
                        <stop offset="0%" stopColor={resolvedColor} stopOpacity={opacity} />
                        <stop offset="100%" stopColor={resolvedColor} stopOpacity={fadeOpacity} />
                      </>
                    ) : (
                      <>
                        <stop offset="0%" stopColor={resolvedColor} stopOpacity={fadeOpacity} />
                        <stop offset="100%" stopColor={resolvedColor} stopOpacity={opacity} />
                      </>
                    )}
                  </linearGradient>
                </defs>
              )}
              <line
                x1={cx}
                y1={cy}
                x2={endpoint.x}
                y2={endpoint.y}
                stroke={shouldFade ? `url(#${lineGradientId})` : resolvedColor}
                strokeWidth={strokeWidth}
                strokeOpacity={shouldFade ? 1 : opacity}
                strokeLinecap="round"
                style={radiateStyle}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/**
 * Preset configurations for common asterism patterns
 * 
 * Angle reference (0° = RIGHT, positive = counter-clockwise):
 *
 *                 90° (UP)
 *                    ↑
 *    155°        ↖   │   ↗  25°
 *   (UP-LEFT)        │      (UP-RIGHT)
 *                    │
 * 180° (LEFT) ←──────●──────→ 0° (RIGHT)
 *                    │
 *    215°        ↙   │   ↘  335°
 *  (DOWN-LEFT)       │      (DOWN-RIGHT)
 *                    ↓
 *               270° (DOWN)
 */
export const AsterismPresets = {
  // Minimal 3-ray asterism
  minimal: {
    rays: 3,
    angles: [90, 0, 25],  // UP, RIGHT, UP-RIGHT
    fadeRays: [2],
  },
  // Balanced 4-ray asterism (default)
  balanced: {
    rays: 4,
    angles: [90, 0, 25, 335],  // UP, RIGHT, UP-RIGHT, DOWN-RIGHT
    fadeRays: [2, 3],
  },
  // Full 5-ray asterism
  full: {
    rays: 5,
    angles: [90, 0, 25, 335, 180],  // UP, RIGHT, UP-RIGHT, DOWN-RIGHT, LEFT
    fadeRays: [3, 4],
  },
  // Hero overlay (optimized for dark hero sections)
  heroOverlay: {
    rays: 4,
    angles: [90, 0, 25, 335],
    color: 'stevens-white',
    opacity: 0.4,
    fadeRays: [0, 2, 3],
    fadeDirection: 'out',
  },
};
