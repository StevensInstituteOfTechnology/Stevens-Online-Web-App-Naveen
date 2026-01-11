/**
 * Program Pages Component Library
 * 
 * This module provides all components needed for building program pages
 * (degree programs and certificates).
 * 
 * Structure:
 * - templates/   - DegreeTemplate, CertificateTemplate
 * - sections/    - Individual page sections (FAQ, Curriculum, etc.)
 * - primitives/  - Small reusable components (Section, Cards, etc.)
 * - navigation/  - Sticky nav, scroll tracking
 */

// Re-export from submodules
export * from './templates';
export * from './sections';
export * from './primitives';
export * from './navigation';

// Legacy export - will be removed after migration
export { default as ProgramPageTemplate } from './ProgramPageTemplate';
