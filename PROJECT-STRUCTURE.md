# Project Structure & Organization

## Overview

This is a React-based Single Page Application (SPA) for CPE (Continuing Professional Education) web application, built with Vite, React Router, and Tailwind CSS. The app showcases various graduate programs (MBA, MSCS, MSDS, MEM, MSDSE) and includes a blog system with static site generation (SSG) capabilities for optimal SEO and performance.

## Tech Stack

- **Framework**: React 18.2
- **Build Tool**: Vite 6.1
- **Routing**: React Router DOM 7.2
- **Styling**: Tailwind CSS 3.4 with custom configuration
- **UI Components**: Radix UI primitives + shadcn/ui components
- **Forms**: React Hook Form + Zod validation
- **Animations**: Framer Motion
- **Deployment**: Vercel with SSG pre-rendering
- **Pre-rendering**: Puppeteer (local) / Puppeteer Core + Chromium (production)

## Project Architecture

### Entry Point Flow

```
index.html
  └─> src/main.jsx (ReactDOM root)
      └─> src/App.jsx (Toaster + Pages)
          └─> src/pages/index.jsx (Router + Layout wrapper)
              └─> src/routes.jsx (Route definitions)
```

### Directory Structure

```
CPE-Web-App/
├── public/                      # Static assets
│   ├── assets/                  # Images, videos, logos, avatars
│   ├── robots.txt              # SEO crawler instructions
│   ├── sitemap.xml             # SEO sitemap
│   └── _redirects              # Netlify-style redirects
│
├── scripts/                     # Build and deployment scripts
│   └── prerender.js            # SSG pre-rendering with Puppeteer
│
├── src/
│   ├── api/                    # API integration layer
│   │   ├── entities.js         # Data entity definitions
│   │   └── formHandler.js      # Form submission logic
│   │
│   ├── components/             # React components (organized by domain)
│   │   ├── ui/                 # shadcn/ui base components (50+ components)
│   │   ├── shared/             # Reusable cross-page components
│   │   │   ├── ApplicationModal.jsx
│   │   │   ├── PageHero.jsx
│   │   │   ├── ProgramCard.jsx
│   │   │   └── VideoPlayer.jsx
│   │   ├── common/             # Common utilities
│   │   │   └── AnimatedSection.jsx
│   │   ├── program-pages/      # Program page templates
│   │   │   ├── ProgramPageTemplate.jsx
│   │   │   └── ExploreProgramPageTemplate.jsx
│   │   ├── forms/              # Form components
│   │   │   └── LeadCaptureForm.jsx
│   │   ├── blog/               # Blog-specific components
│   │   │   ├── BlogCard.jsx
│   │   │   ├── BlogDetail.jsx
│   │   │   ├── BlogErrorBoundary.jsx
│   │   │   ├── BlogList.jsx
│   │   │   └── BlogPagination.jsx
│   │   ├── assessment/         # Assessment/quiz components
│   │   ├── chat/               # Chat/messaging components
│   │   └── examples/           # Example/demo components
│   │
│   ├── config/                 # Configuration files
│   │   ├── fonts.js            # Font configuration
│   │   ├── stevens-official-styles.css
│   │   └── *.md                # Design documentation
│   │
│   ├── data/                   # Static data and content
│   │   ├── blogs.json          # Blog posts data
│   │   ├── events.js           # Events data
│   │   ├── programs.js         # Program information
│   │   └── README.md           # Data documentation
│   │
│   ├── hooks/                  # Custom React hooks
│   │   └── use-mobile.jsx      # Mobile detection hook
│   │
│   ├── lib/                    # Utility libraries
│   │   └── utils.js            # Tailwind merge utilities
│   │
│   ├── pages/                  # Page components (25+ pages)
│   │   ├── index.jsx           # Pages router wrapper
│   │   ├── Layout.jsx          # Main layout wrapper
│   │   ├── Home.jsx            # Landing page
│   │   ├── ASAP.jsx            # ASAP program page
│   │   ├── MBA.jsx             # MBA program page
│   │   ├── MSCS.jsx            # Computer Science program
│   │   ├── MSDS.jsx            # Data Science program
│   │   ├── MEM.jsx             # Engineering Management
│   │   ├── MSDSE.jsx           # Data Science Engineering
│   │   ├── Blog.jsx            # Blog listing/detail page
│   │   ├── Events.jsx          # Events page
│   │   ├── Admissions.jsx      # Admissions information
│   │   ├── Tuition.jsx         # Tuition and financial aid
│   │   ├── RequestInfo.jsx     # Lead capture form
│   │   ├── OnlineExperience.jsx # Online learning info
│   │   ├── ComparePrograms.jsx # Program comparison
│   │   ├── Explore*.jsx        # Program exploration pages
│   │   └── *Topics.jsx         # Blog topic/category pages
│   │
│   ├── utils/                  # Utility functions
│   │   └── index.ts            # General utilities
│   │
│   ├── routes.jsx              # Route configuration
│   ├── App.jsx                 # Root app component
│   ├── main.jsx                # React entry point
│   ├── App.css                 # App-specific styles
│   ├── index.css               # Global styles
│   └── globals.css             # Tailwind base styles
│
├── dist/                       # Build output (generated)
├── node_modules/               # Dependencies
├── .vscode/                    # VS Code settings
├── .git/                       # Git repository
│
├── vite.config.js              # Vite configuration
├── vercel.json                 # Vercel deployment config
├── tailwind.config.js          # Tailwind CSS config
├── postcss.config.js           # PostCSS config
├── eslint.config.js            # ESLint configuration
├── components.json             # shadcn/ui config
├── jsconfig.json               # JavaScript config
├── package.json                # Dependencies and scripts
└── README.md                   # Project documentation
```

## Key Concepts

### 1. Routing System

The app uses a centralized routing configuration in `src/routes.jsx`:

- **Static Routes**: Manually defined routes for main pages
- **Dynamic Routes**: Generated routes for blog posts and topics
- **Redirects**: Built-in redirects for legacy URLs (e.g., `/MBA` → `/online-mba/`)
- **Trailing Slash Handling**: Enforces trailing slashes for consistency and SEO

**Route Generation**:

- Blog routes are dynamically generated from `src/data/blogs.json`
- Topic/category routes are generated for filtered blog views
- All routes support both listing and detail views

### 2. Page Organization

**Pages** (`src/pages/`) are organized by function:

- **Program Pages**: MBA, MSCS, MSDS, MEM, MSDSE - showcase degree programs
- **Explore Pages**: Detailed program exploration with templates
- **Topic Pages**: Blog category pages (Engineering Essentials, Computer Science, MBA Success)
- **Utility Pages**: Admissions, Tuition, Events, Request Info
- **Blog System**: Dynamic blog listing and detail views

**Layout Pattern**:

```jsx
<Layout currentPageName={pageName}>
  <Routes>{/* All routes rendered here */}</Routes>
</Layout>
```

### 3. Component Architecture

Components follow a domain-driven organization:

**UI Components** (`src/components/ui/`):

- 50+ shadcn/ui components (buttons, forms, dialogs, etc.)
- Built on Radix UI primitives
- Fully accessible and customizable
- Styled with Tailwind CSS

**Shared Components** (`src/components/shared/`):

- Cross-page reusable components
- `PageHero`: Hero sections for pages
- `ProgramCard`: Program display cards
- `ApplicationModal`: Application form modal
- `VideoPlayer`: Video embedding component

**Domain Components**:

- `blog/`: Blog-specific UI (cards, pagination, detail views)
- `forms/`: Form components with validation
- `program-pages/`: Templates for program pages

### 4. Data Management

**Static Data** (`src/data/`):

- `blogs.json`: Blog posts with metadata (title, author, date, category, content)
- `programs.js`: Program information and details
- `events.js`: Events and webinar data

**API Layer** (`src/api/`):

- `formHandler.js`: Handles form submissions
- `entities.js`: Data entity definitions and transformations

### 5. Static Site Generation (SSG)

The app implements SSG for SEO optimization:

**Build Process**:

```bash
npm run build
# 1. Vite builds the SPA
# 2. Assets are copied to dist/
# 3. prerender.js runs to generate static HTML
```

**Pre-rendering** (`scripts/prerender.js`):

- Uses Puppeteer to crawl all routes
- Generates static HTML for each page
- Environment-aware (local vs. production)
- Creates proper directory structure with `index.html` files
- Handles 100+ routes including all blog posts

**Routes Pre-rendered**:

- All static pages (home, programs, admissions, etc.)
- All blog posts (`/blog/{slug}/`)
- All topic pages (`/topics/{category}/` and detail views)
- All explore pages

### 6. Styling System

**Tailwind CSS** with custom configuration:

- Custom color palette
- Typography system
- Responsive breakpoints
- Dark mode support (via `next-themes`)

**CSS Organization**:

- `globals.css`: Tailwind base, components, utilities
- `index.css`: Global styles and CSS variables
- `App.css`: App-specific styles
- `config/stevens-official-styles.css`: Brand-specific styles

**Utility Functions**:

- `lib/utils.js`: `cn()` function for conditional class merging

### 7. Form Handling

Forms use React Hook Form + Zod:

- Type-safe validation schemas
- Error handling and display
- Integration with API layer
- Lead capture and submission

### 8. Deployment Configuration

**Vercel** (`vercel.json`):

- SPA fallback routing (all routes → `/index.html`)
- URL redirects for legacy paths
- Security headers (X-Frame-Options, CSP, etc.)
- Cache control for assets and HTML
- Custom build command with asset copying

**Build Scripts**:

- `dev`: Development server (port 3000)
- `build`: Full production build with SSG
- `build:spa`: SPA-only build (no pre-rendering)
- `prerender`: Run pre-rendering separately
- `preview`: Preview production build

### 9. Path Aliases

Vite is configured with path aliases for cleaner imports:

```javascript
import Component from "@/components/Component";
import { data } from "@/data/file";
```

The `@` alias points to `src/` directory.

### 10. Development Workflow

**Local Development**:

```bash
npm install          # Install dependencies
npm run dev          # Start dev server (localhost:3000)
```

**Production Build**:

```bash
npm run build        # Build + pre-render all pages
npm run preview      # Preview production build
```

**Deployment**:

- Push to Git repository
- Vercel automatically builds and deploys
- SSG pages are served as static HTML
- Client-side routing takes over after initial load

## Key Features

### SEO Optimization

- Static HTML generation for all pages
- Proper meta tags and Open Graph support
- Sitemap and robots.txt
- Trailing slash consistency
- Semantic HTML structure

### Performance

- Code splitting via Vite
- Lazy loading of routes
- Optimized asset loading
- Static HTML for instant first paint
- Aggressive caching for assets

### Accessibility

- Radix UI primitives (ARIA compliant)
- Keyboard navigation support
- Screen reader friendly
- Semantic HTML
- Focus management

### User Experience

- Smooth page transitions
- Scroll-to-top on navigation
- Responsive design (mobile-first)
- Loading states and error boundaries
- Toast notifications

## Important Files

- **`src/routes.jsx`**: Central routing configuration
- **`src/pages/index.jsx`**: Router wrapper and layout integration
- **`scripts/prerender.js`**: SSG implementation
- **`vercel.json`**: Deployment and redirect configuration
- **`vite.config.js`**: Build tool configuration
- **`src/data/blogs.json`**: Blog content database

## Development Notes

### Adding a New Page

1. Create page component in `src/pages/`
2. Add route to `src/routes.jsx`
3. Add to pre-render list in `scripts/prerender.js`
4. Update `PAGES` object in `src/pages/index.jsx`

### Adding a New Blog Post

1. Add entry to `src/data/blogs.json`
2. Routes are automatically generated
3. Pre-rendering automatically includes new post

### Modifying UI Components

- UI components are in `src/components/ui/`
- Follow shadcn/ui patterns
- Use Tailwind for styling
- Maintain accessibility standards

### Environment Considerations

- Local: Uses full Puppeteer
- Production (Vercel): Uses Puppeteer Core + Chromium layer
- Pre-rendering adapts automatically based on environment

## Common Patterns

### Page Component Structure

```jsx
import Layout from "./Layout";
import { PageHero } from "@/components/shared/PageHero";

export default function PageName() {
  return (
    <>
      <PageHero title="Page Title" />
      {/* Page content */}
    </>
  );
}
```

### Using UI Components

```jsx
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

<Button variant="primary">Click Me</Button>
<Card>Content</Card>
```

### Dynamic Routing

```jsx
// In routes.jsx
{
  path: '/blog/:slug/',
  element: <Blog />
}

// In component
import { useParams } from 'react-router-dom'
const { slug } = useParams()
```

## Maintenance

### Regular Tasks

- Update blog posts in `blogs.json`
- Keep dependencies updated
- Monitor build times for pre-rendering
- Review and update redirects in `vercel.json`
- Test SSG output in `dist/` directory

### Performance Monitoring

- Check Lighthouse scores
- Monitor bundle sizes
- Review pre-rendering logs
- Test on various devices and browsers

---

**Last Updated**: October 21st 2025
**Version**: 0.0.0
**Maintainer**: CPE Web Team
