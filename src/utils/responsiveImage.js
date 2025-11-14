/**
 * Responsive Image Utilities
 * Generates srcset and sizes attributes for responsive images
 */

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
  // Remove extension
  const pathWithoutExt = basePath.replace(/\.(webp|jpg|jpeg|png|avif)$/i, '');
  const ext = basePath.match(/\.(webp|jpg|jpeg|png|avif)$/i)?.[1] || 'webp';
  
  // Generate srcset entries
  const srcsetEntries = widths.map(width => {
    // Try size-specific filename first (e.g., hero-800w.webp)
    const sizedPath = `${pathWithoutExt}-${width}w.${ext}`;
    return `${sizedPath} ${width}w`;
  });
  
  // Always include original as fallback
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
 */
export function getHeroImageProps(imagePath) {
  // For now, use simple src until responsive variants are generated
  // TODO: Generate responsive image variants using npm run generate-responsive-images
  return {
    src: imagePath,
    // Uncomment when responsive variants are generated:
    // srcSet: generateSrcSet(imagePath, [640, 1024, 1280, 1920]),
    // sizes: generateSizes(
    //   {
    //     '640': '100vw',
    //     '1024': '100vw',
    //     '1280': '100vw'
    //   },
    //   '100vw'
    // )
  };
}

/**
 * Get responsive image props for content images
 * Typically displayed at 50-100% container width
 */
export function getContentImageProps(imagePath, maxWidth = '800px') {
  // For now, use simple src until responsive variants are generated
  // TODO: Generate responsive image variants using npm run generate-responsive-images
  return {
    src: imagePath,
    // Uncomment when responsive variants are generated:
    // srcSet: generateSrcSet(imagePath, [400, 600, 800, 1200]),
    // sizes: generateSizes(
    //   {
    //     '640': '100vw',
    //     '1024': '50vw'
    //   },
    //   maxWidth
    // )
  };
}

/**
 * Get responsive image props for thumbnail/small images
 * Typically displayed at fixed small sizes
 */
export function getThumbnailImageProps(imagePath, displayWidth = '200px') {
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

