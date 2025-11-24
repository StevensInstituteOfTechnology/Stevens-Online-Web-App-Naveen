/**
 * Responsive Image Utilities
 * Generates srcset and sizes attributes for responsive images
 */

/**
 * Image width configuration map
 * Maps image path patterns to their available width variants
 * Patterns are matched using String.includes()
 * 
 * Format: { pattern: [width1, width2, ...] }
 * Patterns are checked in order, first match wins
 */
const IMAGE_WIDTH_CONFIG = {
  // Hero images with limited variants (400w, 640w, 800w, 1024w only)
  hero: {
    '/explore-mscs/stevens-campus': [640, 800, 1024],
    '/explore-cert-enterprise-ai/explore-cert-EAI-1': [640, 800, 1024],
    '/explore-cert-applied-data-science/explore-cert-ADS-1': [640, 800, 1024],
    '/events/1-event-scaled': [640, 800, 1024],
    '/corporate-partners/corporate-partners-1': [640, 1024, 1280, 1920],
    '/corporate-students/corporate-students-1': [400, 640, 800, 1024],
    '/request-info/stevens-campus': [400, 640, 800, 1024],
  },
  // Content images with limited variants (400w, 640w only)
  content: {
    '/explore-mem/': [400, 640],
    '/explore-mscs/': [400, 640],
  }
};

/**
 * Find matching width configuration for an image path
 * 
 * @param {string} imagePath - Path to the image file
 * @param {string} type - Configuration type ('hero' or 'content')
 * @returns {number[]|null} Array of widths if match found, null otherwise
 */
function findWidthConfig(imagePath, type = 'hero') {
  if (!imagePath || typeof imagePath !== 'string') {
    return null;
  }
  
  const config = IMAGE_WIDTH_CONFIG[type];
  if (!config) {
    return null;
  }
  
  // Check patterns in order (most specific first)
  for (const [pattern, widths] of Object.entries(config)) {
    if (imagePath.includes(pattern)) {
      return widths;
    }
  }
  
  return null;
}

/**
 * Generate responsive image srcset from base path
 * Assumes images follow naming convention: image-{width}w.webp
 * Falls back to original image if sizes don't exist
 * 
 * @param {string} basePath - Base image path (e.g., '/assets/images/hero.webp')
 * @param {number[]} widths - Array of widths in pixels (e.g., [400, 800, 1200, 1600])
 * @returns {string} srcset string
 */
export function generateSrcSet(basePath, widths = [400, 800, 1200, 1600]) {
  if (!basePath || typeof basePath !== 'string') {
    return '';
  }
  
  // Remove extension
  const pathWithoutExt = basePath.replace(/\.(webp|jpg|jpeg|png|avif)$/i, '');
  const ext = basePath.match(/\.(webp|jpg|jpeg|png|avif)$/i)?.[1] || 'webp';
  
  // Generate srcset entries
  const srcsetEntries = widths.map(width => {
    // Try size-specific filename first (e.g., hero-800w.webp)
    const sizedPath = `${pathWithoutExt}-${width}w.${ext}`;
    return `${sizedPath} ${width}w`;
  });
  
  // Always include original as fallback (with the max width as descriptor)
  srcsetEntries.push(`${basePath} ${Math.max(...widths)}w`);
  
  return srcsetEntries.join(', ');
}

/**
 * Generate sizes attribute for responsive images
 * 
 * @param {Object} breakpoints - Breakpoint configuration
 * @param {string} defaultSize - Default size (e.g., '100vw' or '800px')
 * @returns {string} sizes string
 */
export function generateSizes(breakpoints = {}, defaultSize = '100vw') {
  const sizeEntries = Object.entries(breakpoints)
    .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
    .map(([breakpoint, size]) => `(max-width: ${breakpoint}px) ${size}`)
    .reverse(); // Largest to smallest
  
  // Add default size
  sizeEntries.push(defaultSize);
  
  return sizeEntries.join(', ');
}

/**
 * Get responsive image props for hero/background images
 * Full viewport width images
 * 
 * @param {string} imagePath - Path to the image file
 * @param {Object} options - Optional configuration
 * @param {number[]} options.widths - Array of widths to include in srcset (default: [640, 1024, 1280])
 *                                   Use [640, 1024, 1280, 1920] if you know the image has 1920w variant
 * @returns {Object} Object with src, srcSet, and sizes properties
 * 
 * @example
 * // Default usage (conservative widths)
 * getHeroImageProps('/assets/images/hero.webp')
 * 
 * @example
 * // Custom widths for high-resolution images
 * getHeroImageProps('/assets/images/hero.webp', { widths: [640, 1024, 1280, 1920] })
 */
export function getHeroImageProps(imagePath, options = {}) {
  if (!imagePath || typeof imagePath !== 'string' || imagePath.trim() === '') {
    return { src: imagePath || '' };
  }
  
  // Check for configured width overrides
  const configuredWidths = findWidthConfig(imagePath, 'hero');
  const defaultWidths = [640, 1024, 1280];
  const widths = options.widths || configuredWidths || defaultWidths;
  
  // Generate breakpoints for sizes attribute
  const breakpoints = {};
  const sortedWidths = [...widths].sort((a, b) => a - b);
  for (let i = 0; i < sortedWidths.length - 1; i++) {
    breakpoints[sortedWidths[i].toString()] = '100vw';
  }
  
  return {
    src: imagePath,
    srcSet: generateSrcSet(imagePath, widths),
    sizes: generateSizes(breakpoints, '100vw')
  };
}

/**
 * Get responsive image props for content images
 * Typically displayed at 50-100% container width
 * 
 * @param {string} imagePath - Path to the image file
 * @param {string|Object} maxWidthOrOptions - Max width string (e.g., '800px') or options object
 * @param {string} maxWidthOrOptions.maxWidth - Max width string (e.g., '800px')
 * @param {number[]} maxWidthOrOptions.widths - Array of widths to include in srcset (default: [400, 640, 800, 1024])
 * @returns {Object} Object with src, srcSet, and sizes properties
 */
export function getContentImageProps(imagePath, maxWidthOrOptions = '800px') {
  if (!imagePath || typeof imagePath !== 'string' || imagePath.trim() === '') {
    return { src: imagePath || '' };
  }
  
  const isBlogImage = imagePath.includes('/assets/blogs/');
  
  if (isBlogImage) {
    return {
      src: imagePath
    };
  }
  
  // Handle options object or simple maxWidth string
  const options = typeof maxWidthOrOptions === 'object' ? maxWidthOrOptions : { maxWidth: maxWidthOrOptions };
  const maxWidth = options.maxWidth || '800px';
  const defaultWidths = [400, 640, 800, 1024];
  
  // Check for configured width overrides
  const configuredWidths = findWidthConfig(imagePath, 'content');
  const widths = options.widths || configuredWidths || defaultWidths;
  
  // Generate breakpoints based on available widths
  const breakpoints = {};
  if (widths.includes(640)) {
    breakpoints['640'] = '100vw';
  }
  if (widths.includes(1024)) {
    breakpoints['1024'] = '50vw';
  }
  
  return {
    src: imagePath,
    srcSet: generateSrcSet(imagePath, widths),
    sizes: generateSizes(breakpoints, maxWidth)
  };
}

/**
 * Get responsive image props for thumbnail/small images
 * Typically displayed at fixed small sizes
 */
export function getThumbnailImageProps(imagePath, displayWidth = '200px') {
  // If imagePath is empty or invalid, return simple src
  if (!imagePath || typeof imagePath !== 'string' || imagePath.trim() === '') {
    return { src: imagePath || '' };
  }
  
  const isBlogImage = imagePath.includes('/assets/blogs/');
  
  if (isBlogImage) {
    return {
      src: imagePath
    };
  }
  
  return {
    src: imagePath,
    srcSet: generateSrcSet(imagePath, [200, 400]),
    sizes: displayWidth
  };
}

/**
 * Get responsive image props for card images
 * Typically displayed in grid layouts
 */
export function getCardImageProps(imagePath) {
  // If imagePath is empty or invalid, return simple src
  if (!imagePath || typeof imagePath !== 'string' || imagePath.trim() === '') {
    return { src: imagePath || '' };
  }
  
  const isBlogImage = imagePath.includes('/assets/blogs/');
  
  if (isBlogImage) {
    return {
      src: imagePath
    };
  }
  
  return {
    src: imagePath,
    srcSet: generateSrcSet(imagePath, [400, 600, 800]),
    sizes: generateSizes(
      {
        '640': '100vw',
        '1024': '50vw',
        '1280': '33vw'
      },
      '400px'
    )
  };
}

