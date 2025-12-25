/** @type {import('tailwindcss').Config} */
const { FONTS } = require('./src/config/fonts.js');

module.exports = {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			},
			// Stevens Institute custom colors (CPE Brand Guidelines 2025)
			
			'stevens-red': '#a32638',
			'stevens-dark-gray': '#363D45',  // Dark Gray (per CPE Brand Guidelines)
  			'stevens-gray': '#7F7F7F',       // Stevens Gray
  			'stevens-light-gray': '#E4E5E6', // Light Gray
  			'stevens-white': '#FFFFFF',
  			'stevens-black': '#000000',
  			// Semantic Stevens colors
			'stevens-maroon': '#a32638', // Backup - Same as Stevens Red
  			'stevens-primary': '#a32638',   // Stevens Red (primary accent)
  			// Comprehensive Stevens gray system (BACKUP MAPPINGS - kept for backward compatibility)
  			// All usages should be updated to use the five brand colors directly:
  			// - stevens-gray-50/100/200/300 → stevens-light-gray (#E4E5E6)
  			// - stevens-gray-400/500 → stevens-gray (#7F7F7F)
  			// - stevens-gray-600/700/800/900 → stevens-dark-gray (#363D45) or stevens-black (#000000)
  			'stevens-gray-50': '#E4E5E6',   // BACKUP - Maps to stevens-light-gray
  			'stevens-gray-100': '#E4E5E6',  // BACKUP - Maps to stevens-light-gray
  			'stevens-gray-200': '#E4E5E6',  // BACKUP - Maps to stevens-light-gray
  			'stevens-gray-300': '#E4E5E6',  // BACKUP - Maps to stevens-light-gray
  			'stevens-gray-400': '#7F7F7F',  // BACKUP - Maps to stevens-gray
  			'stevens-gray-500': '#7F7F7F',  // BACKUP - Maps to stevens-gray
  			'stevens-gray-600': '#363D45',  // BACKUP - Maps to stevens-dark-gray
  			'stevens-gray-700': '#363D45',  // BACKUP - Maps to stevens-dark-gray
  			'stevens-gray-800': '#363D45',  // BACKUP - Maps to stevens-dark-gray
  			'stevens-gray-900': '#000000'   // BACKUP - Maps to stevens-black
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			// Stevens professional animations
  			'stevens-fade-in': 'fadeIn 0.6s ease-out',
  			'stevens-slide-up': 'slideUp 0.8s ease-out',
  			'stevens-scale': 'scale 0.3s ease-out'
  		},
  		// Stevens Typography System
		fontFamily: {
			// Default sans font - IBM Plex Sans (per CPE Brand Guidelines)
			// This ensures all elements without explicit font classes inherit IBM Plex Sans
			sans: FONTS.body,                   // IBM Plex Sans - default for all elements
			
			// Primary fonts - per CPE Brand Guidelines
			'stevens-headers': FONTS.header,   // Saira Regular (use lightest weights for headlines)
			'stevens-nav': FONTS.navigation,   // IBM Plex Sans (per CPE guidelines)
			'stevens-body': FONTS.body,        // IBM Plex Sans
			'stevens-display': FONTS.display,  // Saira Regular
			
			// Saira Regular for content (normal weight)
			'stevens-content': FONTS.header,   // Saira Regular for content text
			'stevens-label': FONTS.header,     // Saira Regular for labels/captions
			
			// Utility fonts
			serif: FONTS.serif,
			'stevens-serif': FONTS.serif,
			'stevens-sans': FONTS.sans,        // Arial (CPE fallback)
			mono: FONTS.monospace,
			'stevens-mono': FONTS.monospace,
			
			// Legacy - mapped to IBM Plex Sans per CPE guidelines
			'stevens-bitter': FONTS.bitter,    // Now uses IBM Plex Sans
		},
		fontSize: {
			'stevens-xs': ['0.75rem', { lineHeight: '1rem' }],
			'stevens-sm': ['0.875rem', { lineHeight: '1.25rem' }],
			'stevens-md': ['1rem', { lineHeight: '1.5rem' }],
			'stevens-base': ['1rem', { lineHeight: '1.5rem' }],
			'stevens-lg': ['1.125rem', { lineHeight: '1.75rem' }],
			'stevens-xl': ['1.25rem', { lineHeight: '1.75rem' }],
			'stevens-2xl': ['1.5rem', { lineHeight: '2rem' }],
			'stevens-3xl': ['1.875rem', { lineHeight: '2.25rem' }],
			'stevens-4xl': ['2.25rem', { lineHeight: '2.5rem' }],
			'stevens-5xl': ['3rem', { lineHeight: '1.1' }],
			'stevens-6xl': ['3.75rem', { lineHeight: '1' }],
			'stevens-7xl': ['4.5rem', { lineHeight: '1' }],
			'stevens-8xl': ['6rem', { lineHeight: '1' }],
			'stevens-9xl': ['8rem', { lineHeight: '1' }],
			'stevens-hero': ['3rem', { lineHeight: '1.1' }],
			'stevens-display': ['4rem', { lineHeight: '1.1' }],
			'stevens-jumbo': ['5rem', { lineHeight: '1' }],
			'stevens-mega': ['6rem', { lineHeight: '1' }]
		},
  		// Stevens Spacing System - Improved Proportions
		spacing: {
			'stevens-xs': '0.5rem',      // 8px - tight spacing
			'stevens-sm': '0.75rem',     // 12px - small gaps
			'stevens-md': '1rem',        // 16px - standard spacing
			'stevens-lg': '1.5rem',      // 24px - medium spacing
			'stevens-xl': '2rem',        // 32px - large spacing
			'stevens-2xl': '2.5rem',     // 40px - extra large
			'stevens-3xl': '3rem',       // 48px - very large
			'stevens-section': '3.75rem', // 60px - section padding (was 80px)
			'stevens-section-sm': '2.5rem', // 40px - mobile section padding
			
			// Component-specific spacing
			'stevens-card': '1.25rem',   // 20px - card padding
			'stevens-card-sm': '1rem',   // 16px - mobile card padding
			'stevens-gap': '1.5rem',     // 24px - standard grid gap
			'stevens-gap-sm': '1rem',    // 16px - mobile grid gap
			'stevens-gap-lg': '2rem',    // 32px - large grid gap
			'stevens-gap-xl': '2.5rem',  // 40px - extra large grid gap
			'stevens-gap-2xl': '3rem',   // 48px - 2x extra large grid gap
			'stevens-gap-3xl': '3.5rem', // 56px - 3x extra large grid gap
			'stevens-gap-4xl': '4rem',   // 64px - 4x extra large grid gap
			'stevens-gap-5xl': '4.5rem', // 72px - 5x extra large grid gap
			'stevens-gap-6xl': '5rem',   // 80px - 6x extra large grid gap
			'stevens-gap-7xl': '5.5rem', // 88px - 7x extra large grid gap
			'stevens-gap-8xl': '6rem',   // 96px - 8x extra large grid gap
			'stevens-gap-9xl': '6.5rem', // 104px - 9x extra large grid gap
			
		},
		// Stevens Container System - Improved Density
		maxWidth: {
			'stevens-container': '100%',
			'stevens-container-sm': '640px',
			'stevens-container-md': '768px',
			'stevens-container-lg': '1024px',
			'stevens-container-xl': '1152px',     // Reduced from 1280px
			'stevens-container-2xl': '1280px',    // Reduced from 1400px  
			'stevens-container-3xl': '1400px',    // Reduced from 1536px
			'stevens-content-max': '1152px',      // Standard content width
			'stevens-wide-max': '1280px',         // Wide content sections
		},
  		// Stevens Border Radius System
  		borderRadius: {
  			'stevens-none': '0',
  			'stevens-sm': '0.25rem',
  			'stevens-md': '0.375rem',
  			'stevens-lg': '0.5rem',
  			'stevens-xl': '0.75rem',
  			'stevens-card': '1rem',
  			'stevens-button': '0.5rem'
  		},
  		// Stevens Shadow System
  		boxShadow: {
  			'stevens-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  			'stevens-md': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  			'stevens-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  			'stevens-card': '0 4px 20px rgba(139, 0, 0, 0.1)',
  			'stevens-hero': '0 25px 50px rgba(0, 0, 0, 0.15)'
  		},
  		// Stevens Text Shadow System for Hero Text Readability
  		textShadow: {
  			'stevens-hero': '3px 3px 6px rgba(0,0,0,0.9), 0 0 12px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.6)',
  			'stevens-body': '2px 2px 4px rgba(0,0,0,0.9), 0 0 8px rgba(0,0,0,0.7), 0 0 12px rgba(0,0,0,0.5)',
  			'stevens-small': '2px 2px 3px rgba(0,0,0,0.9), 0 0 6px rgba(0,0,0,0.7)',
  			'stevens-subtle': '1px 1px 2px rgba(0,0,0,0.8)'
  		},
  		// Stevens Responsive Breakpoints
  		screens: {
  			'stevens-sm': '640px',
  			'stevens-md': '768px',
  			'stevens-lg': '1024px',
  			'stevens-xl': '1280px',
  			'stevens-2xl': '1536px',
  			'stevens-hero': '1200px'
  		},
  		// Stevens Transition System
  		transitionDuration: {
  			'stevens-fast': '150ms',
  			'stevens-normal': '300ms',
  			'stevens-slow': '500ms'
  		}
  	}
  },
  plugins: [
    require("tailwindcss-animate"),
    function({ addUtilities }) {
      const newUtilities = {
        '.text-shadow-stevens-hero': {
          textShadow: '3px 3px 6px rgba(0,0,0,0.9), 0 0 12px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.6)'
        },
        '.text-shadow-stevens-body': {
          textShadow: '2px 2px 4px rgba(0,0,0,0.9), 0 0 8px rgba(0,0,0,0.7), 0 0 12px rgba(0,0,0,0.5)'
        },
        '.text-shadow-stevens-small': {
          textShadow: '2px 2px 3px rgba(0,0,0,0.9), 0 0 6px rgba(0,0,0,0.7)'
        },
        '.text-shadow-stevens-subtle': {
          textShadow: '1px 1px 2px rgba(0,0,0,0.8)'
        }
      }
      addUtilities(newUtilities)
    }
  ],
}