# Prudential Partnership Landing Page

## Overview

Premium, Netflix-style landing page at `/partnerships/prudential/` designed for Prudential corporate pitch meetings. Features horizontal program rails, interactive pathway configurator, and role-based personalization.

## Components

### Core Components
- `PrudentialPartnership.jsx` - Main page with hero, navigation, and layout
- `ProgramRails.jsx` - Netflix-style horizontal carousels with Embla
- `ProgramCard.jsx` - Glassmorphism cards with syllabus modals
- `PathwayConfigurator.jsx` - 3-step interactive builder with generated pathways
- `ComplianceSection.jsx` - Standards chips (NIST CSF, AI RMF, ISO 27001, SOC 2)
- `CaseStudyCard.jsx` - Finance industry success stories
- `BadgeStrip.jsx` - Foundation → Practitioner → Expert progression
- `LeaderCTA.jsx` - Cohort design wizard for HR/L&D
- `EmployeeCTA.jsx` - Tuition benefit calculator for employees
- `LearningExcellenceSection.jsx` - Stevens learning advantage showcase

### Data
- `prudential-pathways.js` - All program data, role presets, compliance standards, case studies

## Features

### Role-Based Personalization
Access via query params: `?role=ai-pm&level=practitioner`

Available roles:
- cloud-security
- ai-pm
- mlops
- model-risk
- sre
- software-eng
- eng-manager
- cyber-risk

### Compliance Alignment
All programs mapped to:
- NIST Cybersecurity Framework
- NIST AI Risk Management Framework 1.0
- ISO/IEC 27001
- SOC 2 Type II

### Learning Excellence Features
- Experiential learning with real-world projects
- AI-powered simulations and feedback
- Market-aligned content (WorldQuant, AWS, IBM partnerships)
- Cloud practice environments
- Cohort collaboration tools

## Accessibility

- Semantic HTML with proper heading hierarchy
- ARIA labels on all interactive elements
- Keyboard navigation support (Tab, Enter, Esc)
- Focus management in modals and configurator
- 4.5:1 color contrast minimum
- Reduced motion support (respects `prefers-reduced-motion`)
- Skip-to-content functionality

## Reduced Motion Support

All Framer Motion animations automatically respect user preferences:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Demo Script (5-7 min)

1. Load with `?role=ai-pm` to show personalization
2. Scroll "Recommended for Prudential" rail, add 2 programs to path
3. Navigate to configurator, switch Foundation → Practitioner
4. Expand syllabus modal to show compliance alignment
5. Click "Design your cohort" → show SOW mock
6. Scroll to badge progression visual

## Technical Details

- **Framework**: React + Framer Motion
- **Carousel**: Embla Carousel with momentum scrolling
- **Styling**: Tailwind CSS with Stevens brand colors
- **Icons**: Lucide React
- **UI Components**: Radix UI (Dialog, Tabs, Tooltip, Select)
- **Route**: Standalone (no Layout wrapper)
- **SEO**: `noindex, nofollow` (excluded from sitemap)

## Brand Usage

- Primary: Stevens maroon (`#a32638`)
- Accent: Prudential blue (`#0073CF`) - placeholder only
- Final brand usage subject to Prudential brand guidelines

## Performance

- Lazy loading with IntersectionObserver
- Image optimization
- Code splitting
- Target Lighthouse score: 95+

## Future Enhancements

- Live SSO integration
- Real cohort wizard with backend
- PDF SOW generation
- Manager dashboard integration
- JD-to-pathway recommendation engine
- Workday/Canvas/Slate connectors

