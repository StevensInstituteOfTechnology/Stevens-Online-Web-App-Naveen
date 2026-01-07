/**
 * Stevens Online - Global Font Configuration
 * 
 * This file contains all font family definitions for the entire application.
 * Change fonts here and they'll be applied everywhere automatically.
 */

// Google Fonts to load (per CPE Brand Guidelines 2025)
// Fonts: Saira Regular (headlines), IBM Plex Sans (body), IBM Plex Sans Condensed (optional)
export const GOOGLE_FONTS_URL = "https://fonts.googleapis.com/css2?family=Saira:wght@100;200;300;400;500;600;700;800;900&family=IBM+Plex+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=IBM+Plex+Sans+Condensed:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap";
// Central Font Configuration (CPE Brand Guidelines 2025)
export const FONTS = {
  // Primary fonts - per CPE Brand Guidelines
  header: ['Saira', 'sans-serif'],           // Saira Regular - for headlines (use lightest weights)
  navigation: ['IBM Plex Sans', 'sans-serif'], // IBM Plex Sans - for nav items (per CPE guidelines)
  body: ['IBM Plex Sans', 'sans-serif'],     // IBM Plex Sans - for body copy
  display: ['Saira', 'sans-serif'],          // Saira Regular - for display text (per CPE guidelines)
  condensed: ['IBM Plex Sans Condensed', 'sans-serif'], // IBM Plex Sans Condensed - for condensed text (per CPE guidelines)
  // Secondary/utility fonts
  serif: ['Georgia', 'Times New Roman', 'serif'],
  sans: ['Arial', 'Helvetica Neue', 'sans-serif'],  // Arial is CPE fallback
  monospace: ['ui-monospace', 'SFMono-Regular', 'Consolas', 'monospace'],
  
  // Legacy - mapped to brand-compliant fonts
  bitter: ['IBM Plex Sans', 'sans-serif'],   // Replaced Bitter with IBM Plex Sans per CPE guidelines
};

// Font weights (consistent across the app)
export const FONT_WEIGHTS = {
  thin: '100',
  extralight: '200',
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
  black: '900',
};

// Default font styles for different text types (CPE Brand Guidelines 2025)
export const FONT_STYLES = {
  header: {
    fontFamily: FONTS.header,
    fontWeight: FONT_WEIGHTS.light, // CPE guidelines: use lightest weights (100-300) for headlines
    fontStyle: 'normal',
  },
  navigation: {
    fontFamily: FONTS.navigation,
    fontWeight: FONT_WEIGHTS.normal, // Navigation uses normal weight
    fontStyle: 'normal',
  },
  body: {
    fontFamily: FONTS.body,
    fontWeight: FONT_WEIGHTS.normal,
    fontStyle: 'normal',
  },
  display: {
    fontFamily: FONTS.display,
    fontWeight: FONT_WEIGHTS.light, // CPE guidelines: use lightest weights for display text
    fontStyle: 'normal',
  },
  // Saira Regular for body-like content
  content: {
    fontFamily: FONTS.header, // Uses Saira Regular
    fontWeight: FONT_WEIGHTS.normal, // 400 weight
    fontStyle: 'normal',
  },
  // Saira Regular for labels/captions
  label: {
    fontFamily: FONTS.header, // Uses Saira Regular
    fontWeight: FONT_WEIGHTS.normal, // 400 weight
    fontStyle: 'normal',
  },
};

// Helper function to get font CSS string
export const getFontCSS = (type) => {
  const style = FONT_STYLES[type];
  if (!style) return '';
  
  return `font-family: ${style.fontFamily.join(', ')}; font-weight: ${style.fontWeight}; font-style: ${style.fontStyle};`;
};

// Helper function to get Tailwind font family array
export const getTailwindFont = (type) => {
  return FONTS[type] || FONTS.body;
};

// Export for easy access
export default FONTS;
