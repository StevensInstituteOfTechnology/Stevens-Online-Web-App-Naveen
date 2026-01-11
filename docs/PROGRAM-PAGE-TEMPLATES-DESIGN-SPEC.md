# Program Page Templates — Design Specification

> **Version:** 1.0  
> **Date:** January 2026  
> **Authors:** Stevens Online Design & Engineering Team  
> **Status:** Ready for Implementation

---

## Executive Summary

This document defines the information architecture for two sibling page templates used across Stevens Online program marketing:

| Template | Use Case | Design Goal | User Mindset |
|----------|----------|-------------|--------------|
| **Program Page** | Degree programs (MBA, MSCS, MEM, MEADS) | Trust · Outcomes · Long-term commitment | Career advancement or pivot; multi-year investment |
| **Certificate Page** | Professional certificates (Enterprise AI, Applied Data Science Foundations) | Speed · Skill · ROI | Short-term upskilling; immediate workplace impact |

Both templates share visual components, design tokens, and UI primitives—but differ in **storytelling order** to match distinct user decision-making timelines.

---

## Design Principles

### 1. Same System, Different Persuasion

Both templates draw from a shared component library:
- `PageHero`
- `QuickFactsBar`
- `RankingCard`
- `CurriculumTabs`
- `FacultyCarousel`
- `FAQAccordion`
- `LeadCaptureForm`
- `CTASection`

The **section order** is what changes—not the visual language.

### 2. Answer User Questions in Order

Every program page must answer three questions (in this priority):

| Priority | Question | Degree Answer | Certificate Answer |
|----------|----------|---------------|-------------------|
| 1 | "Is this right for me?" | Outcomes + fit + trust | Skills + speed + ROI |
| 2 | "Can I get in?" | Admissions + deadlines | Low-friction enrollment |
| 3 | "Can I afford it?" | Tuition + aid + investment framing | Total cost + employer reimbursement |

### 3. Progressive Disclosure

Information flows from **high-level value** → **detailed proof** → **action**.

- **Top 25%** of page: Value proposition, credibility, outcomes
- **Middle 50%** of page: Curriculum, experience, faculty, admissions
- **Bottom 25%** of page: Tuition, FAQs, final CTA

### 4. Mobile-First Information Hierarchy

Section order is optimized for scroll depth. The most critical conversion content appears before users typically drop off (~40% scroll depth on mobile).

---

## Template 1: Program Page (Degree Programs)

### Design Goal
**Trust · Outcomes · Long-term commitment**

### Target User
- Working professional considering career advancement or pivot
- Multi-year educational investment ($15K–$60K)
- Decision timeline: 2–6 months
- Key concerns: ROI, credibility, work-life balance, employer perception

### Section Order & Rationale

---

#### 1. Hero
**Purpose:** Capture attention, establish value, provide clear next step

| Element | Description |
|---------|-------------|
| **H1** | Degree title with outcome framing (e.g., "Earn Your MBA Online. Build Your Career Anywhere.") |
| **Subtitle** | 1-sentence value proposition emphasizing tech-focus, flexibility, or career impact |
| **Primary CTA** | "Request Information" (leads to RFI modal or page) |
| **Secondary CTA** | "Apply Now" (links to application portal) |
| **Trust Badges** | 3-4 proof points (100% Online, AACSB Accredited, No GMAT Required, etc.) |
| **Background** | Program-specific hero image |

**Rationale:** Hero must answer "What is this?" and "Why should I care?" within 3 seconds. Request Info is primary because most degree-seeking users need nurturing before application.

---

#### 2. Quick Facts Bar
**Purpose:** Enable rapid qualification ("Is this program even possible for me?")

| Fact | Example |
|------|---------|
| Start Term | "Spring 2026: January 21" |
| Credits | "36-45 Credit Hours" |
| Duration | "2.5-3 Years Part-Time" |
| Format | "100% Online" |
| Immersion | "2 On-Campus Weekends" (if applicable) |

**Rationale:** Users scan for deal-breakers early. If they can't do the format/timeline, they leave. Surfacing this immediately respects their time and qualifies serious prospects.

---

#### 3. Proof Strip / By the Numbers
**Purpose:** Establish institutional and program credibility

| Element | Examples |
|---------|----------|
| Rankings | "#1 Online MBA in NJ" |
| Employment | "100% Employment Rate" |
| ROI | "#15 Best Value" |
| Accreditation | "AACSB Accredited" |

**Rationale:** Trust signals appear early because degree decisions involve significant financial and time commitment. Users need credibility confirmation before investing attention in details.

**Design Note:** Use `RankingCard` component with hover states. Limit to 3-5 cards to avoid overwhelming.

---

#### 4. Program Overview
**Purpose:** Explain what makes this degree distinctive

| Content | Description |
|---------|-------------|
| What it is | Brief description of degree and its focus |
| Differentiation | What makes Stevens' version unique (tech-focus, location, faculty, etc.) |
| Fit for working professionals | How the program accommodates full-time employment |

**Rationale:** After trust is established, users want to understand the substance. This section bridges "credibility" to "relevance."

**Design Note:** 2-column layout on desktop (prose left, Quick Facts card right). Include key skills as badges.

---

#### 5. Who This Program Is For (Program Fit)
**Purpose:** Help users self-select

| Persona | Description |
|---------|-------------|
| Career Advancers | "Move from individual contributor to leadership" |
| Career Switchers | "Pivot into tech-driven business roles" |
| Industry Professionals | "Deepen expertise in finance, analytics, or strategy" |

**Rationale:** Explicit persona targeting reduces bounce from mismatched visitors and increases conversion from qualified prospects.

**Design Note:** Can be integrated into Overview or presented as distinct cards.

---

#### 6. Curriculum Structure (High-Level)
**Purpose:** Show what the learning journey looks like

| Element | Description |
|---------|-------------|
| Structure | Foundations → Concentrations → Electives → Immersion |
| Visual | Timeline or pathway diagram |
| Concentrations | List available specializations |

**Rationale:** Users need to understand the commitment shape before diving into course details. High-level structure answers "How does this work?" without overwhelming.

**Design Note:** Use tabs for different tracks (Traditional vs. Advanced) or concentrations. Course-level detail is progressive disclosure (expandable accordions).

---

#### 7. Career Outcomes
**Purpose:** Prove the degree delivers tangible career results

| Element | Description |
|---------|-------------|
| Job Titles | Roles graduates pursue (with salary data) |
| Salary Ranges | Median salaries from BLS or internal data |
| Top Companies | Where alumni work (with logos) |
| Growth Projections | BLS employment growth stats |

**Rationale:** Career outcomes are the ultimate "proof" for degree programs. This section answers the implicit question: "Will this be worth it?"

**Design Note:** Combine job titles table + company logos into one cohesive "Outcomes" section. Include source citations.

---

#### 8. Experiential Learning
**Purpose:** Differentiate from purely asynchronous online programs

| Element | Description |
|---------|-------------|
| Immersions | On-campus intensive weekends |
| Cohort Model | Peer learning and networking |
| Capstone/Projects | Applied, real-world projects |

**Rationale:** Stevens' immersion model is a key differentiator. Highlighting experiential elements addresses concerns about online program quality.

**Design Note:** Include images from immersion events. Consider video testimonials from immersion participants.

---

#### 9. Faculty (Curated)
**Purpose:** Build trust through instructor credibility

| Element | Description |
|---------|-------------|
| Program Director | Featured prominently |
| Faculty Cards | 2-4 representative instructors |
| Credentials | Research, industry experience, publications |

**Rationale:** Faculty quality signals program rigor. Prospective students want to know who will teach them.

**Design Note:** Horizontal scroll carousel. Click-through to full faculty directory (if available).

---

#### 10. Admissions
**Purpose:** Remove uncertainty about application requirements

| Element | Description |
|---------|-------------|
| Requirements | Transcripts, resume, letters of recommendation, etc. |
| Process | Step-by-step application flow |
| Options | Standard vs. ASAP application (if applicable) |
| Deadlines | Key dates table |

**Rationale:** Clear admissions information reduces friction. Users who understand the process are more likely to start it.

**Design Note:** Use cards for application options. Deadlines should be prominent and scannable.

---

#### 11. Tuition & Financial Aid
**Purpose:** Address cost concerns transparently

| Element | Description |
|---------|-------------|
| Per-Credit Cost | Current rate |
| Total Estimate | Range based on credit requirements |
| Scholarships | Available merit/need-based aid |
| Employer Reimbursement | Corporate tuition assistance guidance |

**Rationale:** Tuition appears later because users need to be convinced of value before price. However, transparency is essential—hiding costs damages trust.

**Design Note:** Include link to financial aid page. Consider ROI calculator integration.

---

#### 12. On-Demand Content / Info Sessions (Optional)
**Purpose:** Provide additional self-service research opportunities

| Content | Description |
|---------|-------------|
| Webinar Replays | Program overviews, student panels |
| Event Cards | Upcoming live sessions |

**Rationale:** Some users prefer self-directed research before speaking to enrollment advisors. This section serves that need.

**Design Note:** Grid of 3-6 event cards with "Watch Now" CTAs.

---

#### 13. FAQ
**Purpose:** Address common objections and concerns

| Category | Example Questions |
|----------|-------------------|
| Workload | "Can I work full-time while enrolled?" |
| Credibility | "Is an online degree respected by employers?" |
| Admissions | "Do I need a GMAT/GRE?" |
| Technology | "What platform do you use?" |

**Rationale:** FAQs handle objections that might otherwise prevent conversion. They also improve SEO through question-based content.

**Design Note:** Accordion component. Limit to 6-10 questions; link to full FAQ page if more exist.

---

#### 14. Final CTA
**Purpose:** Capture users who've read the full page

| Element | Description |
|---------|-------------|
| Primary CTA | "Request Information" |
| Secondary CTA | "Talk to an Advisor" / "Apply Now" |
| Contact Info | Phone, email for direct outreach |

**Rationale:** Users who scroll to the bottom have high intent. Give them a clear, prominent action to take.

**Design Note:** Full-width CTA section with contrasting background color.

---

## Template 2: Certificate Page (Professional Certificates)

### Design Goal
**Speed · Skill · ROI**

### Target User
- Working professional seeking specific skill acquisition
- Short-term educational investment ($2K–$8K)
- Decision timeline: 1–4 weeks
- Key concerns: Time commitment, immediate applicability, cost alignment with employer benefits

### Section Order & Rationale

---

#### 1. Hero
**Purpose:** Lead with skill and speed

| Element | Description |
|---------|-------------|
| **H1** | Skill-forward title (e.g., "Professional Graduate Certificate in Enterprise AI") |
| **Subtitle** | Duration + outcome (e.g., "In 9 credits, go from idea to a running AI workflow—no CS degree required.") |
| **Primary CTA** | "Enroll Now" / "Apply" (lower friction than degrees) |
| **Secondary CTA** | "Request Information" |
| **Trust Badges** | Graduate Credit, Stackable, Online, No Prerequisites |
| **Price Callout** | Total cost prominently displayed (e.g., "$5,250 Total") |

**Rationale:** Certificate buyers prioritize speed and clarity. Price transparency in the hero respects their time and aligns with employer reimbursement research.

---

#### 2. Quick Value Props / Facts
**Purpose:** Enable instant decision-making

| Fact | Example |
|------|---------|
| Duration | "16-24 Weeks" |
| Credits | "9 Graduate Credits" |
| Total Cost | "$5,250" |
| Format | "100% Online" |
| Stackable | "Counts toward MBA & M.Eng." |
| Prerequisites | "None Required" |

**Rationale:** Certificate decisions are often made quickly. All critical qualification factors must be immediately visible.

**Design Note:** Consider card-based layout with icons. Total cost should be prominent—this is a key decision factor.

---

#### 3. Certificate Overview
**Purpose:** Explain the skill and its market relevance

| Content | Description |
|---------|-------------|
| What skill is gained | Clear, specific capability description |
| Why it matters now | Market demand, industry trends |
| Who it's for | Target audience in 1-2 sentences |

**Rationale:** Certificate buyers are often responding to immediate skill gaps. This section validates their need.

**Design Note:** Shorter than degree overview. Focus on relevance and immediacy.

---

#### 4. What You'll Learn (Skills-First)
**Purpose:** Show concrete capabilities gained

| Element | Description |
|---------|-------------|
| Skills List | Specific, actionable skills |
| Tools/Technologies | Software, platforms, frameworks |
| Project Outcomes | What you'll build/create |

**Rationale:** Skills are the primary value proposition for certificates. This section must be concrete and practical.

**Design Note:** Use skill cards with icons. Emphasize portfolio/project deliverables.

---

#### 5. Career & Skill Outcomes
**Purpose:** Connect skills to career impact

| Element | Description |
|---------|-------------|
| Roles Enabled | Jobs/responsibilities the certificate prepares you for |
| Capabilities | "After this certificate, you'll be able to..." |
| Market Signals | Salary premiums, demand data (lightweight) |

**Rationale:** While certificates are skill-focused, users still want to understand career relevance. Keep this section lighter than degree pages.

**Design Note:** Brief section—2-3 bullet points or cards. Avoid heavy salary tables.

---

#### 6. Curriculum / Course Sequence
**Purpose:** Show exactly what you'll study

| Element | Description |
|---------|-------------|
| Course List | Each course with title, credits, focus |
| Sequence | Recommended order |
| Projects | What you'll build in each course |

**Rationale:** Certificate curricula are simpler than degrees. Full transparency builds confidence.

**Design Note:** Linear course sequence (1 → 2 → 3) with expandable details. Avoid tabs—certificates are usually linear.

---

#### 7. Stackability / Pathways
**Purpose:** Show the certificate as part of a larger journey

| Element | Description |
|---------|-------------|
| Stackable Degrees | Which master's programs accept these credits |
| Credit Application | How credits transfer |
| Next Steps | Path to continued education |

**Rationale:** Stackability is a key differentiator vs. bootcamps and non-credit programs. It reduces perceived risk ("If I like this, I can continue").

**Design Note:** Visual pathway diagram showing certificate → degree progression.

---

#### 8. Learning Experience
**Purpose:** Set expectations for time commitment

| Element | Description |
|---------|-------------|
| Format | Asynchronous vs. live sessions |
| Time Commitment | Hours per week |
| Delivery | Platform, tools, support |

**Rationale:** Certificate buyers are often squeezing education into busy schedules. Clear time expectations prevent drop-off.

**Design Note:** Simple, scannable format. Consider "Week in the Life" visual.

---

#### 9. Faculty (Minimal)
**Purpose:** Establish instructor credibility

| Element | Description |
|---------|-------------|
| Lead Instructor(s) | 1-3 faculty members |
| Background | Emphasize practitioner/applied experience |

**Rationale:** Faculty section is shorter for certificates—users care more about skills than academic credentials.

**Design Note:** Compact cards or inline mentions. No carousel needed.

---

#### 10. Enrollment / Application
**Purpose:** Remove friction from sign-up

| Element | Description |
|---------|-------------|
| Who Should Apply | Brief eligibility description |
| Prerequisites | Explicit (especially "None required") |
| Process | Simple steps (often just resume + transcripts) |

**Rationale:** Certificate enrollment should feel easy. Low-friction messaging encourages action.

**Design Note:** Emphasize simplicity. "Apply in Minutes" messaging.

---

#### 11. Tuition & Funding
**Purpose:** Make the financial case clear

| Element | Description |
|---------|-------------|
| Total Cost | Prominent, repeated |
| Per-Credit Rate | For context |
| Employer Reimbursement | IRS $5,250 benefit alignment |
| Payment Options | If available |

**Rationale:** Total cost appears multiple times on certificate pages because it's a primary decision factor. Employer reimbursement is often the tipping point.

**Design Note:** Callout box for employer benefit. Direct, action-oriented language.

---

#### 12. Key Dates
**Purpose:** Create urgency and planning clarity

| Element | Description |
|---------|-------------|
| Start Dates | Next available term |
| Deadlines | Priority, final, late registration |

**Rationale:** Certificates often have rolling or frequent start dates. Clear dates help users commit.

**Design Note:** Simple table or timeline. Consider countdown element for approaching deadlines.

---

#### 13. FAQ
**Purpose:** Address certificate-specific concerns

| Category | Example Questions |
|----------|-------------------|
| Background | "Do I need programming experience?" |
| Time | "How many hours per week?" |
| Comparison | "How is this different from a bootcamp?" |
| Credit | "Can these credits apply to a master's degree?" |

**Rationale:** Certificate FAQs differ from degree FAQs—they focus on prerequisites, time, and comparison to alternatives.

**Design Note:** 4-8 questions. Link to enrollment advisor for complex questions.

---

#### 14. Final CTA
**Purpose:** Convert high-intent visitors

| Element | Description |
|---------|-------------|
| Primary CTA | "Enroll Now" / "Apply" |
| Secondary CTA | "Request Information" |
| Contact | Quick connect options |

**Rationale:** Certificate pages should drive toward enrollment, with information request as fallback.

**Design Note:** Consider urgency messaging ("Next cohort starts January 21").

---

## Component Mapping

Both templates use shared components with configuration differences:

| Component | Program Page | Certificate Page |
|-----------|--------------|------------------|
| `PageHero` | Outcome-focused headline | Skill-focused headline |
| `QuickFactsBar` | 5-6 facts | 6 facts (includes price) |
| `ProofStrip` | Rankings + accreditation | Lighter (optional) |
| `OverviewSection` | Full description + fit | Concise skill focus |
| `CurriculumSection` | Tabs by track/concentration | Linear sequence |
| `OutcomesSection` | Full salary table + companies | Brief role list |
| `FacultySection` | Carousel (5-8 members) | Compact (1-3 members) |
| `AdmissionsSection` | Full requirements | Simplified enrollment |
| `TuitionSection` | Per-credit + total estimate | Total cost emphasis |
| `FAQSection` | 6-10 questions | 4-8 questions |
| `FinalCTASection` | "Request Info" primary | "Enroll" primary |

---



---

## Mobile Considerations


### Section Collapse
Long sections (Curriculum, FAQ) should be collapsed by default on mobile with clear expand affordances.

---

## Implementation Notes

### Data Model Alignment
Both templates should consume a unified `programData` schema with optional fields:

```typescript
interface ProgramData {
  type: 'degree' | 'certificate';
  code: string;
  seo: SEOData;
  hero: HeroData;
  quickFacts: QuickFactsData;
  rankings?: RankingData[];        // Optional for certificates
  overview: OverviewData;
  curriculum: CurriculumData;
  outcomes: OutcomesData;
  faculty: FacultyData;
  admissions: AdmissionsData;
  tuition: TuitionData;
  faqs: FAQData[];
  // Certificate-specific
  stackability?: StackabilityData;
  // Degree-specific
  experiential?: ExperientialData;
  immersions?: ImmersionData;
}
```

### Section Registry Pattern
Instead of hardcoding section order, use a registry pattern:

```typescript
const DEGREE_SECTIONS = [
  'hero', 'quickFacts', 'proof', 'overview', 'fit',
  'curriculum', 'outcomes', 'experiential', 'faculty',
  'admissions', 'tuition', 'events', 'faq', 'finalCta'
];

const CERTIFICATE_SECTIONS = [
  'hero', 'quickFacts', 'overview', 'skills', 'outcomes',
  'curriculum', 'stackability', 'experience', 'faculty',
  'enrollment', 'tuition', 'dates', 'faq', 'finalCta'
];
```

This enables consistent nav generation and scroll tracking.

---

## Implementation: Folder Structure

```
src/components/program-pages/
├── templates/      # Page templates (DegreeTemplate, CertificateTemplate)
├── sections/       # Section components (Overview, Curriculum, FAQ, etc.)
├── primitives/     # Small reusable components (Section wrapper, Cards, etc.)
└── navigation/     # Sticky nav and scroll tracking (StickyNav, useSectionNavigation)
```

**Architecture:**
- **Templates** define section order and page layout
- **Sections** are self-contained, handle their own conditional rendering
- **Primitives** are shared UI building blocks
- **Navigation** manages sticky nav items and active section detection

Each program page (`MBA.jsx`, `MSCS.jsx`, etc.) passes `programData` to a template, which renders sections in order.

---

## Success Metrics

### Program Pages
- Primary: RFI form submissions
- Secondary: Application starts
- Engagement: Scroll depth, time on page, section views

### Certificate Pages
- Primary: Application/enrollment starts
- Secondary: RFI form submissions
- Engagement: Scroll depth, CTA clicks, FAQ interactions

---

## Appendix: Competitive Reference

### University Program Pages Reviewed
- Northwestern Kellogg Online MBA
- USC Marshall Online Programs
- Carnegie Mellon Tepper Online
- Georgia Tech OMSCS
- MIT Professional Education Certificates

### Common Patterns Adopted
1. Hero with dual CTAs (Request Info + Apply)
2. Early credibility signals (rankings, accreditation)
3. Outcomes-focused career sections
4. Progressive disclosure for curriculum
5. Prominent tuition transparency
6. FAQ for objection handling
7. Final CTA after full page scroll

---

*Document maintained by Stevens Online Design & Engineering Team. For questions, contact the product team.*

