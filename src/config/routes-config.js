/**
 * Centralized route paths for SSG (Static Site Generation)
 * Single source of truth for routes used by:
 * - routes.jsx (React Router)
 * - prerender.js (Pre-rendering script)
 * - generate-sitemap.js (Sitemap generation)
 * 
 * When adding/removing pages, update this file and all build scripts will auto-sync
 */

export const STATIC_ROUTES = [
  '/',
  '/ASAP/',
  '/accelerated-application/',
  '/tuition-and-financial-aid/',
  '/online-mba/',
  '/online-masters-computer-science-mscs/',
  '/online-masters-engineering-management/',
  '/online-masters-engineering-applied-data-science/', // MEADS
  '/certificates/enterprise-ai/',
  '/certificates/applied-data-science-foundations/',
  '/compare-our-programs/',
  '/events/',
  '/online-learning-experience/',
  '/admissions/',
  '/request-information/',
  '/ProfessionalEducation',
  '/Certificates',
  '/TuitionOutcomes',
  '/explore/online-mba/',
  '/explore/online-masters-engineering-management/',
  '/explore/online-masters-computer-science/',
  '/explore/online-masters-eng-applied-data-science/', // MEADS Explore
  '/explore/ai-masters-computer-science/',
  '/explore/certificates/enterprise-ai/',
  '/explore/certificates/applied-data-science-foundations/',
  '/employer-sponsorship/',
  '/page-not-found/',
];

// Topic category routes (static categories)
export const TOPIC_CATEGORIES = [
  'engineering-essentials',
  'mastering-computer-science',
  'online-mba-success',
  'uncategorized'
];

