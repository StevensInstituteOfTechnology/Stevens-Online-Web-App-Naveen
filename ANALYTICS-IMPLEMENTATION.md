# Vercel Analytics Implementation Guide

## 🎯 Overview

This analytics system provides **automatic, comprehensive tracking** across the entire Stevens Online website with:
- ✅ Cross-session user tracking
- ✅ Complete funnel tracking (Landing → Application)
- ✅ Multi-touch attribution
- ✅ Conversion yield analysis
- ✅ Zero manual work after initial setup

---

## 🚀 Quick Start

### For New Pages

```jsx
import { usePageTracking } from '@/hooks/analytics/usePageTracking';
import { ProgramContextProvider } from '@/contexts/analytics/ProgramContext';
import { PageContextProvider } from '@/contexts/analytics/PageContext';

function NewProgramPage() {
  // 1. Add page tracking hook
  usePageTracking({
    pageType: 'program',
    programCode: 'new-program',
    additionalData: {
      program_name: 'New Program Name'
    }
  });
  
  // 2. Wrap component in context providers
  return (
    <PageContextProvider pageType="program" pageName="NewProgram">
      <ProgramContextProvider 
        programCode="new-program"
        programName="New Program Name"
        programType="degree"
      >
        {/* Your page content */}
      </ProgramContextProvider>
    </PageContextProvider>
  );
}
```

**That's it!** Page views, scroll depth, time on page, and all context are now tracked automatically.

---

## 📦 Components

### TrackedButton (Auto-tracking buttons)

```jsx
import { TrackedButton } from '@/components/analytics/TrackedButton';

// Simple usage:
<TrackedButton action="apply" program="mscs">
  Apply Now
</TrackedButton>

// Auto-tracks:
// - Event: "mscs_apply_clicked"
// - Program code: "mscs"
// - Program name: (from context)
// - Page type: (from context)
// - Button text: "Apply Now"
// - User ID, session ID, attribution, device info
```

**Convenience Components:**
```jsx
<ApplyButton program="mscs">Apply Now</ApplyButton>
<RequestInfoButton program="mscs">Request Info</RequestInfoButton>
<ScheduleCallButton>Schedule Call</ScheduleCallButton>
<ExploreButton program="mscs">Explore</ExploreButton>
```

### TrackedLink (Auto-tracking links)

```jsx
import { TrackedLink } from '@/components/analytics/TrackedLink';

// Internal link:
<TrackedLink to="/explore/mscs/" linkType="nav">
  Explore MSCS
</TrackedLink>

// External link:
<TrackedLink href="https://stevens.edu" linkType="footer">
  Stevens Main Site
</TrackedLink>

// Auto-tracks destination, link type, internal/external, context
```

---

## 🔧 Hooks

### usePageTracking

```jsx
import { usePageTracking } from '@/hooks/analytics/usePageTracking';

usePageTracking({
  pageType: 'explore',
  programCode: 'mscs',
  additionalData: { custom_field: 'value' }
});

// Auto-tracks:
// - Page view on mount
// - Scroll depth (25%, 50%, 75%, 100%)
// - Time on page (on unmount or beforeunload)
// - All with user ID, session ID, attribution
```

### useFormTracking

```jsx
import { useFormTracking } from '@/hooks/analytics/useFormTracking';

const {
  getFieldProps,
  getFormProps,
  trackFormSubmit
} = useFormTracking({
  formName: 'rfi',
  programCode: 'mscs',
  sourcePage: 'explore_mscs_page'
});

// Usage:
<form {...getFormProps()}>
  <input name="firstName" {...getFieldProps('firstName')} />
  <input name="email" {...getFieldProps('email')} />
  <button type="submit">Submit</button>
</form>

// Auto-tracks:
// - Form viewed, started, field completions, submission, errors, abandonment
```

---

## 🌍 Context Providers

### ProgramContext

Provides program information to all child components:

```jsx
<ProgramContextProvider 
  programCode="mscs"
  programName="Master of Science in Computer Science"
  programType="degree"
>
  {/* All child components auto-include program context */}
  <TrackedButton action="apply">Apply</TrackedButton>
  {/* Event automatically includes program_code: "mscs" */}
</ProgramContextProvider>
```

### PageContext

Provides page information to all child components:

```jsx
<PageContextProvider pageType="explore" pageName="ExploreMSCS">
  {/* All child components auto-include page context */}
</PageContextProvider>
```

---

## 🎯 Funnel Tracking

### Automatic Funnel Progression

Funnels are tracked **automatically** when you use the tracking system:

```jsx
// User clicks "Apply Now"
trackEvent('apply_button_clicked', { program: 'mscs' });

// System automatically:
// 1. Checks all funnel configs
// 2. Finds "apply_button_clicked" in MAIN_FUNNEL, stage 7
// 3. Progresses user from current stage → stage 7
// 4. Tracks: funnel_stage_progressed
// 5. Calculates: time to progress, completion %, conversion status
// 6. Saves journey to localStorage for cross-session tracking
```

### Defined Funnels

**Main Funnel** (9 stages):
1. Landing → 2. Awareness → 3. Engagement → 4. Consideration → 5. Interest → 6. Lead Capture (CONVERSION) → 7. Application Intent → 8. Application Started (CONVERSION) → 9. Application Submitted (FINAL GOAL)

**Micro-Funnels:**
- RFI Form Funnel (7 stages)
- Application Modal Funnel (4 stages)
- Program Comparison Funnel (5 stages)
- Quiz Funnel (8 stages)
- Video Engagement Funnel (6 stages)

**Cross-Session Example:**

```
Session 1 (Day 0):
- User lands on /explore/mscs/ → Stage 2 (Awareness)
- User scrolls 50% → Stage 3 (Engagement)
- User leaves

Session 2 (Day 3):
- Same anonymous_user_id recognized
- User opens RFI modal → Stage 5 (Interest)
- User submits form → Stage 6 (Lead Capture) ← CONVERSION
- Journey saved with:
  - Total time: 3 days
  - Sessions to convert: 2
  - Time in funnel: tracked per stage
```

---

## 📊 Attribution Tracking

### Automatic Multi-Touch Attribution

```
User Journey:
- Day 0: Google Ad → /explore/mscs/ (Session 1)
- Day 2: Email → /admissions/ (Session 2)
- Day 5: Direct → /explore/mscs/ → Submits RFI (Session 3)

Attribution Captured:
{
  first_touch_source: "google",
  first_touch_medium: "cpc",
  first_touch_campaign: "mscs_spring_2025",
  last_touch_source: "direct",
  touchpoint_count: 3,
  sessions_to_conversion: 3,
  days_to_convert: 5,
  all_sources: "google > email > direct",
  primary_attribution_source: "direct" (time-decay model)
}
```

### UTM Parameters

Automatically captured on page load:
- utm_source
- utm_medium
- utm_campaign
- utm_content
- utm_term

---

## 🔄 Event Lifecycle

### What Happens When You Track an Event:

```javascript
trackEvent('apply_button_clicked', { program: 'mscs', location: 'hero' });
```

**Automatic Processing:**

1. **Identity Enrichment** ✅
   - Adds anonymous_user_id
   - Adds session_id
   - Adds returning user status
   - Adds total sessions count
   - Adds days since first visit

2. **Context Enrichment** ✅
   - Adds page_url, page_path, page_type
   - Adds program_code, program_name (from context)
   - Adds device_type, viewport_size
   - Adds browser, OS
   - Adds timestamp

3. **Attribution Enrichment** ✅
   - Adds first_touch_source, first_touch_campaign
   - Adds last_touch_source
   - Adds touchpoint_count
   - Adds days_to_convert (if conversion)

4. **Funnel Progression** ✅
   - Checks all funnels for this event
   - Progresses user to new stage if applicable
   - Tracks funnel_stage_progressed
   - Calculates completion percentage
   - Marks conversions if applicable

5. **Sent to Vercel** ✅
   - Event sent to Vercel Analytics
   - Available in dashboard immediately
   - Queryable by all properties

---

## 📈 Dashboard Queries

### Funnel Visualization

**Query:**
```
Event: funnel_stage_progressed
Filter: funnel_id = "landing_to_application"
Group by: new_stage
Count: DISTINCT anonymous_user_id
```

**Result:**
```
Stage 1 (Landing): 1000 users
Stage 2 (Awareness): 700 users (70% conversion)
Stage 3 (Engagement): 350 users (50% conversion)
Stage 4 (Consideration): 140 users (40% conversion)
Stage 5 (Interest): 42 users (30% conversion)
Stage 6 (Lead Capture): 8 users (19% conversion) ← CONVERSION
...
```

### Attribution Report

**Query:**
```
Event: rfi_form_submitted
Group by: first_touch_source
Count: DISTINCT anonymous_user_id
```

**Result:**
```
Google Ads: 45 conversions
Facebook: 12 conversions
Direct: 8 conversions
Email: 5 conversions
```

### Cross-Session Analysis

**Query:**
```
Event: All events
Filter: anonymous_user_id = "anon_123abc"
Order by: timestamp
```

**Result:** Complete user journey across all sessions

---

## 🔐 Privacy & Compliance

### GDPR/CCPA Compliant
- ✅ Anonymous user IDs (no PII)
- ✅ No email, phone, or personal data in events
- ✅ localStorage can be cleared by user
- ✅ Cookies clearly disclosed
- ✅ Opt-out mechanism available

### Data Stored

**localStorage:**
- `stevens_anonymous_user_id` - Anonymous ID (1 year)
- `stevens_first_visit_date` - First visit date
- `stevens_last_visit_date` - Last visit date
- `stevens_session_count` - Total sessions
- `attribution_touchpoints` - Attribution data
- `funnel_[funnel_id]` - Funnel journey data

**sessionStorage:**
- `stevens_session_id` - Current session ID
- `session_start_time` - Session start timestamp
- `pages_in_session` - Pages viewed this session
- `events_in_session` - Events count this session

**Cookies:**
- `stevens_user_id` - Anonymous ID backup (1 year, SameSite=Lax)

---

## 📝 Implementation Checklist

### ✅ Phase 1: Core Foundation (COMPLETE)
- ✅ User identity system (`userIdentity.js`)
- ✅ Attribution tracking (`attribution.js`)
- ✅ Funnel configurations (`funnelConfig.js`)
- ✅ Funnel tracking (`funnelTracking.js`)
- ✅ Core Vercel tracking (`vercelTracking.js`)

### ✅ Phase 2: Hooks & Components (COMPLETE)
- ✅ usePageTracking hook
- ✅ useFormTracking hook
- ✅ TrackedButton component
- ✅ TrackedLink component
- ✅ ProgramContext provider
- ✅ PageContext provider

### 📝 Phase 3: Integration (IN PROGRESS)
- ✅ ExploreMSCS page (example implementation)
- ⏳ All other explore pages (6 remaining)
- ⏳ All program pages (6 pages)
- ⏳ Homepage
- ⏳ Admissions page
- ⏳ Application pages
- ⏳ Other pages

### 📝 Phase 4: Component-Specific Tracking
- ⏳ LeadCaptureForm integration
- ⏳ ApplicationModal integration
- ⏳ RequestInfoModal integration
- ⏳ ProgramCard integration
- ⏳ VideoPlayer integration
- ⏳ ProgramReadinessAssessment integration

---

## 📊 Expected Results

After full implementation, you'll have:

### **Complete User Journeys**
```
User anon_123abc:
Session 1 (2025-01-10):
  - 10:30am: Landed via Google Ad
  - 10:32am: Viewed MSCS program page
  - 10:35am: Watched video (75% completion)
  - 10:37am: Left site

Session 2 (2025-01-12):
  - 2:15pm: Direct visit to /admissions/
  - 2:17pm: Clicked "Explore MSCS"
  - 2:20pm: Opened RFI modal
  - 2:22pm: Started form
  - 2:25pm: Submitted RFI form ← CONVERSION

Attribution: First-touch Google Ad, Last-touch Direct
Time to convert: 2 days, 2 sessions
Funnel: Completed 6/9 stages
```

### **Conversion Funnels**
- Landing (1000 users) → Awareness (700) → Engagement (350) → ... → Application (8)
- Overall conversion rate: 0.8%
- Drop-off analysis: Highest drop at Engagement → Consideration stage

### **Attribution Analysis**
- Google Ads: 45% of conversions, 3.5 day average
- Facebook: 18% of conversions, 5.2 day average
- Direct: 22% of conversions, 1.2 day average
- Email: 15% of conversions, 7.1 day average

### **Program Performance**
- MSCS: 1.2% conversion rate (best)
- MEADS: 1.1% conversion rate
- MBA: 0.9% conversion rate
- MEM: 0.8% conversion rate
- Certificates: 1.5% conversion rate (highest)

---

## 🛠 Next Steps

1. **Complete integration** on all 34 pages
2. **Add component-level tracking** (forms, modals, videos)
3. **Test in development** with console logging
4. **Deploy to Vercel**
5. **Verify in Vercel Analytics dashboard**
6. **Create custom queries** for key metrics
7. **Set up alerts** for funnel drop-offs
8. **Monitor and optimize** based on data

---

## 📚 Resources

- Vercel Analytics Docs: https://vercel.com/docs/analytics
- Funnel Config: `src/config/funnelConfig.js`
- Tracking Utility: `src/utils/analytics/vercelTracking.js`
- Context Providers: `src/contexts/analytics/`
- Tracked Components: `src/components/analytics/`
- Hooks: `src/hooks/analytics/`

---

**This system provides the most comprehensive, automated analytics tracking possible with minimal ongoing effort.**

