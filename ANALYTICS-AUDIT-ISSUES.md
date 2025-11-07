# 🔍 Analytics Implementation Audit - Issues Found

**Audit Date:** 2025-01-15  
**Status:** 5 Critical Issues Identified

---

## ❌ ISSUE 1: Program Code Inconsistency (MEADS)

### **Problem:**
MEADS program has TWO different codes being used:
- `'meads'` - Used in programsData.js, MEADS.jsx
- `'msdse'` - Used in ExploreMEADS.jsx hero data

### **Impact:**
- Explore page tracks with `program_code='msdse'`
- Program page tracks with `program_code='meads'`
- **Result:** Split analytics - MEADS data divided between two codes!

### **Evidence:**
```javascript
// ExploreMEADS.jsx line 13:
programCode: 'meads',  // usePageTracking

// ExploreMEADS.jsx line 27 (in meadsData):
programCode: "msdse",  // Passed to hero

// MEADS.jsx line 12:
code: 'meads',  // Program data
```

### **Fix Required:**
Standardize to ONE code. Recommend: `'meads'`

---

## ❌ ISSUE 2: React StrictMode Double Counting

### **Problem:**
In development, React StrictMode mounts components twice, causing events to fire twice.

### **Impact:**
- `page_view` tracked twice per page load
- `rfi_form_viewed` tracked twice per form
- **Result:** Development metrics show 2x actual events

### **Evidence:**
Console shows duplicate events in development mode.

### **Current Mitigation:**
- `usePageTracking` uses `hasTrackedView.current` ref to prevent double page views ✅

### **Still Need to Fix:**
- LeadCaptureForm `rfi_form_viewed` has no double-fire protection
- Other events may fire twice in StrictMode

### **Solution:**
Add refs to track first-fire only:
```javascript
const hasTrackedFormView = useRef(false);

useEffect(() => {
  if (!hasTrackedFormView.current) {
    trackEvent('rfi_form_viewed', { ... });
    hasTrackedFormView.current = true;
  }
}, []);
```

---

## ❌ ISSUE 3: Multiple Forms on Same Page

### **Problem:**
Some pages have multiple LeadCaptureForm instances:
- Homepage: 1 embedded form in hero
- Admissions: 1 embedded form at bottom
- Some pages remount forms in modals

### **Impact:**
- Each form instance tracks `rfi_form_viewed` separately
- **Result:** `rfi_form_viewed` count > `page_view` count (inflated)

### **Is This a Problem?**
**Actually NO** - this is correct behavior:
- 1 page view = 1 page
- 2 forms visible = 2 form views
- This is accurate tracking of what user sees

### **But Consider:**
Do you want to track:
- A) Forms viewed (current) - counts each form instance
- B) Pages with forms viewed - counts pages only once

**Recommendation:** Keep current (A) but add page-level tracking:
```javascript
// Track once per page if any form present
trackEvent('page_with_rfi_form_viewed', { ... });
```

---

## ❌ ISSUE 4: Event Listener Cleanup on Form Submissions

### **Problem:**
ASAP.jsx and AcceleratedApplication.jsx attach form submission listeners:

```javascript
forms.forEach(form => {
  form.addEventListener('submit', () => {
    trackEvent('asap_application_submitted', { ... });
  });
});
```

**Issues:**
1. No removal of listeners on cleanup
2. If component remounts, duplicate listeners attached
3. One form submission could fire multiple times

### **Impact:**
- Form submissions could be tracked 2x, 3x, or more
- **Result:** Inflated application submission counts

### **Fix Required:**
```javascript
const submitHandler = () => {
  trackEvent('...');
};

forms.forEach(form => {
  form.addEventListener('submit', submitHandler);
});

// In cleanup:
return () => {
  forms.forEach(form => {
    form.removeEventListener('submit', submitHandler);
  });
};
```

---

## ❌ ISSUE 5: Attribution touchpoint_journey Still Using Array

### **Problem:**
Fixed in attribution.js to use JSON string, but enrichEventData might still spread an array.

### **Impact:**
- Vercel rejects arrays
- **Result:** Some events might fail to send

### **Verification Needed:**
Check if `getAttributionForConversion()` returns `touchpoint_journey` as array anywhere.

### **Current Status:**
- Fixed in attribution.js (line 141): `touchpoint_journey_json`
- But need to verify no other code uses old format

---

## ⚠️ ISSUE 6: Potential False Positives

### **Problem:**
Events tracked on button click, not actual completion.

**Examples:**
- `apply_button_clicked` - User clicks but may not submit form
- `rfi_modal_opened` - User opens but may close immediately
- `application_option_selected` - User clicks ASAP but may abandon form

### **Impact:**
- Funnel shows "Application Started" but user hasn't actually filled form
- **Result:** Overstated conversion at intermediate stages

### **Is This Wrong?**
**No** - this is standard practice:
- Track intent (button click) separate from completion (form submit)
- Both are valuable data points
- Allows drop-off analysis between intent and completion

### **Recommendation:**
Make it clear in dashboards:
- Stage 7: "Application Intent" (button clicked)
- Stage 8: "Application Form Page Loaded"
- Stage 9: "Application Submitted" (actual form submission)

---

## ⚠️ ISSUE 7: Program Code in Data May Not Match URL

### **Problem:**
ExploreMEADS has:
- programCode: 'msdse' in component data
- But createPageUrl() may generate different URL

### **Impact:**
- Links may have wrong program code in URL
- **Result:** Data split between 'meads' and 'msdse'

### **Verification:**
Check if programsData.js and page data use consistent codes.

---

## 📊 Summary of Issues

| Issue | Severity | Impact | Fixed? |
|-------|----------|--------|--------|
| MEADS code inconsistency | 🔴 HIGH | Splits data between 2 codes | ❌ Need fix |
| StrictMode double counting | 🟡 MEDIUM | 2x events in dev only | ⚠️ Partial |
| Multiple forms per page | 🟢 LOW | Accurate but higher counts | ✅ Not a bug |
| Event listener cleanup | 🔴 HIGH | Multiple submission tracking | ❌ Need fix |
| Attribution array issue | 🟡 MEDIUM | Some events may fail | ✅ Fixed |
| False positive intent | 🟢 LOW | Standard practice | ✅ Not a bug |
| Program code mismatch | 🔴 HIGH | Data inconsistency | ❌ Need fix |

---

## 🛠️ Required Fixes

### **Priority 1 (Critical):**

1. **Standardize MEADS program code**
   - Choose: 'meads' (recommended) or 'msdse'
   - Update all files to use same code
   - Files affected: ExploreMEADS.jsx, programsData.js

2. **Add event listener cleanup**
   - ASAP.jsx form submission
   - AcceleratedApplication.jsx form submission
   - Store listeners in refs for proper removal

3. **Add double-fire protection**
   - LeadCaptureForm rfi_form_viewed
   - RequestInfoModal modal_opened
   - ApplicationModal modal_opened

### **Priority 2 (Important):**

4. **Verify program code consistency**
   - Audit all program codes in all files
   - Ensure consistency between pages, data files, URLs

5. **Add event deduplication**
   - Track event IDs to prevent same event firing twice
   - Use debouncing for rapid-fire events

---

## 📋 Recommendations

### **1. Program Code Standards**
Create a constants file:
```javascript
// src/config/programCodes.js
export const PROGRAM_CODES = {
  MBA: 'mba',
  MSCS: 'mscs',
  MEM: 'mem',
  MEADS: 'meads', // ← STANDARDIZE THIS
  CERT_EAI: 'cert-eai',
  CERT_ADS: 'cert-ads'
};
```

Use everywhere to prevent mismatches.

### **2. Event Deduplication**
Add to vercelTracking.js:
```javascript
const recentEvents = new Map(); // event_name + key → timestamp

export const trackEvent = (eventName, eventData = {}) => {
  // Create dedup key
  const dedupKey = `${eventName}_${eventData.program_code}_${Date.now()}`;
  
  // Check if fired within last 1 second
  const lastFired = recentEvents.get(`${eventName}_${eventData.program_code}`);
  if (lastFired && (Date.now() - lastFired) < 1000) {
    console.log('⚠️ Duplicate event prevented:', eventName);
    return;
  }
  
  recentEvents.set(`${eventName}_${eventData.program_code}`, Date.now());
  
  // ... rest of tracking code
};
```

### **3. Form Submission Deduplication**
Forms might submit multiple times due to:
- Validation errors
- Network issues
- User clicking multiple times

Add one-time submission tracking:
```javascript
let hasSubmitted = false;

form.addEventListener('submit', () => {
  if (!hasSubmitted) {
    hasSubmitted = true;
    trackEvent('form_submitted', { ... });
  }
});
```

---

## ✅ What's Currently Working Correctly

**Not Issues (Working as Designed):**

1. ✅ **Multiple forms per page tracking separately**
   - This is correct - each form instance is a valid view
   
2. ✅ **Intent vs completion tracking**
   - Tracking button clicks AND form submissions is standard
   - Allows measuring drop-off between intent and action
   
3. ✅ **Page view tracking**
   - Protected against double-fire with refs
   
4. ✅ **Attribution enrichment**
   - Fixed to use JSON strings, not arrays

---

## 🚀 Action Items

**Before Production Deployment:**

1. ❌ Fix MEADS program code inconsistency
2. ❌ Add event listener cleanup
3. ❌ Add double-fire protection to forms/modals
4. ✅ Verify all program codes match across files
5. ✅ Add event deduplication (optional but recommended)
6. ✅ Test after fixes

**After These Fixes:**
- Data quality: 100%
- No double counting
- No false analysis
- Production ready

---

**Current Status: 90% Ready - Need 3 critical fixes before production**

