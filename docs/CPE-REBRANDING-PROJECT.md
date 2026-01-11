# Stevens CPE Rebranding Project

> **Document Purpose**: Reference guide for AI assistants and developers working on the Stevens Online website rebranding based on the new College of Professional Education (CPE) Brand Guidelines.
>
> **Source Document**: `Stevens-CPE-Brand-Guidelines-2025-10.pdf` (35 pages)
> **Screenshots**: `brand-guidelines-screenshots/` folder contains PNG exports of key pages

---

## 📋 Project Overview

### Goal
Rebrand the Stevens Online website to align with the new **College of Professional Education (CPE)** brand identity, as defined in the October 2025 Brand Guidelines document.

### Key Changes Summary
| Element | Current Website | New CPE Brand |
|---------|-----------------|---------------|
| **Headlines Font** | Saira Extra Condensed | **Saira Regular** (lightest weights) |
| **Body Font** | Open Sans | **IBM Plex Sans** |
| **Design Emphasis** | Colorful | **Black & White focused** with red accents |
| **Logo** | Stevens Institute logos | **New CPE identifiers** |
| **Visual Elements** | Various | **Asterisms** (intersecting lines) |

---

## 🎨 Brand Guidelines Summary

### 1. Typography

#### Primary Fonts
| Font | Use Case | Notes |
|------|----------|-------|
| **Saira Regular** | Headlines, titles, subheads | Use lightest 3 weights (Thin, Extra Light, Light) for headlines |
| **IBM Plex Sans** | Body copy, buttons, small text | Supporting font for all CPE communications |
| **IBM Plex Sans Condensed** | Optional for tight spaces | Available but use sparingly |

#### Typography Rules
- ✅ Use lightest legible weight of Saira Regular for headlines
- ✅ Use IBM Plex Sans for body copy and button text
- ❌ Don't use multiple colors in one block of typography
- ❌ Don't use drop shadows on text
- ❌ Don't excessively track out lowercase letters
- ❌ Don't force justify body copy

#### Google Fonts URL (NEW)
```
https://fonts.googleapis.com/css2?family=Saira:wght@100;200;300;400;500;600;700;800;900&family=IBM+Plex+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=IBM+Plex+Sans+Condensed:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap
```

### 2. Color Palette

| Color Name | Hex Code | RGB | Use |
|------------|----------|-----|-----|
| **Stevens Red** | `#A32638` | R163 G38 B56 | Primary accent, CTAs |
| **Dark Gray** | `#363D45` | R54 G61 B69 | Text, dark backgrounds |
| **Stevens Gray** | `#7F7F7F` | R127 G127 B127 | Secondary elements |
| **Light Gray** | `#E4E5E6` | R228 G229 B230 | Light backgrounds |
| **Black** | `#000000` | - | **Primary emphasis** |
| **White** | `#FFFFFF` | - | **Primary emphasis** |

#### Color Rules
- ✅ Emphasize black and white for modern aesthetic
- ✅ Use variations in opacity of gray and black for hierarchy
- ✅ Use Stevens Red sparingly as accent
- ❌ **Never use opacities of Stevens Red**
- ❌ Don't use gradients on background colors
- ❌ Don't use colors not in the official palette
- ❌ Don't pair colors without sufficient contrast

### 3. Logo/Identifiers

#### Three Logo Versions
1. **Primary Identifier** (stacked)
   - Logo + "College of Professional Education" + "STEVENS INSTITUTE OF TECHNOLOGY"
   - Min size: **1.5" / 150px tall**

2. **Horizontal Identifier**
   - Same elements in horizontal layout
   - Min size: **2.5" / 250px wide**

3. **Abbreviated Identifier**
   - Logo icon + "CPE" + "STEVENS"
   - Min size: **0.5" / 50px wide**
   - Use when full lockups cannot be accommodated

#### Logo Rules
- ✅ Maintain clear space (height of "Stevens Institute of Technology" text)
- ✅ Use positive version on light backgrounds
- ✅ Use negative (white) version on dark backgrounds
- ❌ Don't use unapproved colors
- ❌ Don't recreate with alternate typography
- ❌ Don't add embellishments (gradients, shadows, strokes)
- ❌ Don't stretch, compress, tilt, or rearrange elements

### 4. Asterisms (Visual Gestures)

Asterisms are intersecting lines that create depth and dimensionality in CPE communications.

#### Asterism Rules
| Rule | Specification |
|------|--------------|
| Line thickness | **1px/pt** (as thin as possible) |
| Allowed angles | **0°, 90°, 25°, -25°** only |
| Colors | **Black, gray, or white only** (never red) |
| Rays from center | Min: 3, Max: 5 |
| Per composition | **One main asterism only** |
| Gradient | At least one line should fade |

#### Asterism + Imagery Methods
1. **Dimensional Imagery**: Use 25° angled image containers, layered within asterism lines
2. **Asterism as Frame**: Fill ONE quadrant with an image (never multiple)
3. **Image Background**: Place asterism over full-bleed image (don't obscure subject)

#### Asterism Don'ts
- ❌ Don't make lines bold or styled (only solid)
- ❌ Don't curve any lines
- ❌ Don't create complicated asterisms with too many lines
- ❌ Don't introduce new angles
- ❌ Don't fill multiple quadrants with imagery
- ❌ Don't have lines cut across a person's face or neck

### 5. Voice & Tone

#### Brand Voice (Consistent)
- **Bold and Future Facing** - Excited, energized, focused on the future
- **Quietly Confident** - 150+ years of leadership, no boasting
- **Deeply Pragmatic** - Outcomes and impact focused

#### Brand Tone (Adaptable)
- **Professional and Respectful** - Competent, clear, considerate
- **Clear and Direct** - No wasted words, honest, to the point
- **Energizing and Exciting** - Help people see what's possible

#### Key Messaging Words
- Tech fluency, AI literacy, cutting edge, future-focused
- Impact, ROI, career catalyst, competitive advantage
- Legacy, reputation, trusted, proven, world-class
- Proximity, partnerships, industry-informed, network

---

## 🖥️ Current Website Technical State

### Configuration Files
| File | Purpose |
|------|---------|
| `src/config/fonts.js` | Font family definitions |
| `tailwind.config.js` | Colors, spacing, typography scales |
| `index.html` | Google Fonts imports |

### Current Font Configuration (`src/config/fonts.js`)
```javascript
// CURRENT - needs to change
export const FONTS = {
  header: ['Saira Extra Condensed', 'sans-serif'],  // → Change to Saira Regular
  navigation: ['Saira Extra Condensed', 'sans-serif'],  // → Change to Saira Regular
  body: ['Open Sans', 'sans-serif'],  // → Change to IBM Plex Sans
  display: ['Montserrat', 'sans-serif'],  // → Review/update
};
```

### Current Color Configuration (`tailwind.config.js`)
```javascript
// CURRENT colors - most are correct, need to add/update some
'stevens-maroon': '#a32638',      // ✅ Correct (same as Stevens Red)
'stevens-red': '#a32638',         // ✅ Correct
'stevens-gray-700': '#374151',    // ⚠️ Update to #363D45 (Dark Gray)
'stevens-gray-500': '#6B7280',    // ⚠️ Update to #7F7F7F (Stevens Gray)
'stevens-gray-200': '#E5E7EB',    // ⚠️ Update to #E4E5E6 (Light Gray)
```

### Logo Files Location
- Current: `public/assets/logos/`
- Need new CPE logo files from design team

---

## ✅ Implementation Todo List

### 🔴 HIGH PRIORITY (Foundation)

#### 1. Typography Update
- [ ] Update `src/config/fonts.js`:
  - Change `header` from Saira Extra Condensed → **Saira Regular**
  - Change `body` from Open Sans → **IBM Plex Sans**
  - Add IBM Plex Sans Condensed as option
- [ ] Update Google Fonts import in `index.html`
- [ ] Update `tailwind.config.js` font family references
- [ ] Use **lightest weights** (Thin/Extra Light/Light) for headlines
- [ ] Test typography across all pages

#### 2. Color Palette Update
- [ ] Update `tailwind.config.js` with exact CPE colors:
  ```javascript
  'stevens-red': '#A32638',
  'stevens-dark-gray': '#363D45',
  'stevens-gray': '#7F7F7F',
  'stevens-light-gray': '#E4E5E6',
  ```
- [ ] Review and update gray scale to match brand
- [ ] Ensure black/white emphasis in designs
- [ ] ⚠️ **Never use opacity on Stevens Red**

#### 3. Logo/Identifier Replacement
- [ ] Obtain new CPE logo files from design team (SVG, PNG, WebP)
- [ ] Create responsive logo variants:
  - **Primary** (stacked) - min 150px tall
  - **Horizontal** - min 250px wide
  - **Abbreviated** (CPE + STEVENS) - min 50px wide
- [ ] Replace logos in:
  - [ ] Header/Navigation
  - [ ] Footer
  - [ ] Favicon
  - [ ] Open Graph images

### 🟡 MEDIUM PRIORITY (Core Components)

#### 4. Asterism Component (NEW)
- [ ] Create reusable `<Asterism />` React component
- [ ] **1px thin lines only**
- [ ] Support only these angles: **0°, 90°, 25°, -25°**
- [ ] Support **gradient fading** on lines (key visual effect)
- [ ] Support **3-5 rays** from center point
- [ ] Colors: **black/gray/white only** (never red)
- [ ] Add to hero sections and key pages

#### 5. Dark Theme Hero (NEW - from page-34 mockup)
- [ ] Create dark/black background hero section
- [ ] White text on dark background
- [ ] Asterism lines overlay on hero imagery
- [ ] Match the webpage mockup style (see `page-34.png`)

#### 6. Outline Button Variant (NEW - from page-34 mockup)
- [ ] Create white outline button style for dark backgrounds
- [ ] Thin border, transparent fill
- [ ] Use for secondary CTAs on dark sections
- [ ] Example: "LEARN MORE" button in mockup

#### 7. 25° Angled Image Container (NEW - from page-25 mockup)
- [ ] Create dimensional imagery component
- [ ] Support **positive and negative 25° angles**
- [ ] Can be layered within asterism lines
- [ ] Used for dynamic, modern image compositions

#### 8. Homepage Redesign
- [ ] Apply new typography (Saira Regular + IBM Plex Sans)
- [ ] Update hero with **dark background + asterism overlay**
- [ ] Implement **dimensional imagery** (25° angled containers)
- [ ] Update buttons to **outline style** on dark backgrounds
- [ ] Review and update color usage (emphasize black/white)

#### 9. Navigation & Header
- [ ] Replace logo with new CPE identifier
- [ ] Update font to **IBM Plex Sans** for nav items/buttons
- [ ] Review color scheme (emphasize black/white)

#### 10. Footer Redesign
- [ ] Update with new CPE logo
- [ ] Apply new typography (IBM Plex Sans)
- [ ] Update color scheme

#### 11. Button/CTA Global Update
- [ ] Update all buttons to use **IBM Plex Sans**
- [ ] Create two button variants:
  - **Filled** (Stevens Red background)
  - **Outline** (white border, transparent fill)
- [ ] Remove any gradient or shadow effects
- [ ] Ensure Stevens Red used appropriately

### 🟢 LOWER PRIORITY (Page Updates)

#### 12. Program Pages
- [ ] MEADS page
- [ ] MSCS page
- [ ] MBA page
- [ ] MEM page
- [ ] Certificate pages

#### 13. Landing/Explore Pages
- [ ] Apply asterism backgrounds
- [ ] Update imagery with dimensional frames (25° angles)
- [ ] Apply new typography and colors

#### 14. Forms & Modals
- [ ] Request Info modal
- [ ] Application modal
- [ ] Contact forms

#### 15. Content/Copy Review
- [ ] Review headlines for voice/tone alignment
- [ ] Update CTAs to be clear and direct
- [ ] Ensure messaging aligns with brand pillars:
  - Bold and future facing
  - Quietly confident
  - Deeply pragmatic

### ⚪ FINAL

#### 16. QA & Testing
- [ ] Cross-browser testing
- [ ] Mobile responsive verification
- [ ] Accessibility audit (color contrast - especially on dark backgrounds)
- [ ] Performance testing
- [ ] Visual regression testing

---

## 📁 File References

### Brand Guidelines
- **PDF**: `Stevens-CPE-Brand-Guidelines-2025-10.pdf`
- **Screenshots**: `brand-guidelines-screenshots/`
  - `page-14.png` - Primary identifier
  - `page-15.png` - Secondary identifiers (horizontal, abbreviated)
  - `page-16.png` - Identifier color variations
  - `page-18.png` - Typography
  - `page-21.png` - Color palette
  - `page-22.png` - Color serving suggestions
  - `page-24.png` - Asterisms
  - `page-25.png` - Asterisms + imagery
  - `page-26.png` - Asterism don'ts
  - `page-34.png` - Webpage mockup

### Key Source Files to Modify
```
src/
├── config/
│   └── fonts.js              # Font definitions
├── components/
│   ├── shared/
│   │   ├── PageHero.jsx      # Hero sections
│   │   └── ...
│   └── ui/
│       └── button.jsx        # Button styling
├── pages/
│   ├── Home.jsx              # Homepage
│   ├── Layout.jsx            # Header/Footer
│   └── ...
├── index.css                 # Global styles
tailwind.config.js            # Design tokens
index.html                    # Font imports
```

---

## 📝 Notes for Future Sessions

1. **Always reference this document** at the start of rebranding work
2. **Check the screenshots** in `brand-guidelines-screenshots/` for visual reference
3. **Typography is critical**: Saira Regular (not Extra Condensed) + IBM Plex Sans
4. **Color emphasis**: Black and white first, red as accent only
5. **Asterisms**: Key brand element, 1px lines, specific angles only
6. **Logo files needed**: Request from design team before logo updates

---

*Document created: December 2024*
*Last updated: December 2024*
