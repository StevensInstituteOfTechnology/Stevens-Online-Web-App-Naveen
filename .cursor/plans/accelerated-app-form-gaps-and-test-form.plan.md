# Accelerated Application: Content Gaps + Test Form Swap

## Part 1: Test form swap (do first)

Use the **test form** for the accelerated application so you can test before switching back.

- **Test form URL:** https://gradadmissions.stevens.edu/register/?id=4be285ae-ef97-4493-a41b-9f27bcd981dc  
- **Test form container ID:** `form_4be285ae-ef97-4493-a41b-9f27bcd981dc`  
- **Current (production) form ID:** `89080626-7bc4-4c48-9437-fd47479d7371` → container `form_89080626-7bc4-4c48-9437-fd47479d7371`

**Files to update for test form:**

1. **[src/config/formIds.js](src/config/formIds.js)**  
   - Change `ACCELERATED: 'form_89080626-7bc4-4c48-9437-fd47479d7371'` to  
     `ACCELERATED: 'form_4be285ae-ef97-4493-a41b-9f27bcd981dc'`

2. **[src/components/forms/AcceleratedAppForm.jsx](src/components/forms/AcceleratedAppForm.jsx)**  
   - Change `rawId = '89080626-7bc4-4c48-9437-fd47479d7371'` to  
     `rawId = '4be285ae-ef97-4493-a41b-9f27bcd981dc'`  
   - (Component uses `FORM_IDS.ACCELERATED` and `rawId` to build the script URL.)

3. **[src/pages/AcceleratedApplication.jsx](src/pages/AcceleratedApplication.jsx)**  
   - Line ~61: `script.src` — use  
     `https://gradadmissions.stevens.edu/register/?id=4be285ae-ef97-4493-a41b-9f27bcd981dc&output=embed&div=form_4be285ae-ef97-4493-a41b-9f27bcd981dc`  
   - Line ~72: `getElementById('form_89080626-...')` → `getElementById('form_4be285ae-ef97-4493-a41b-9f27bcd981dc')`  
   - All inline `#form_89080626-7bc4-4c48-9437-fd47479d7371` in the `<style jsx>` block → `#form_4be285ae-ef97-4493-a41b-9f27bcd981dc`  
   - Line ~451: `id="form_89080626-..."` on the div → `id="form_4be285ae-ef97-4493-a41b-9f27bcd981dc"`  
   - Note: The test form may not have `#form_question_6ab6d516-ee1e-4066-8c7f-4f4872aadb21`; leave those selectors or remove if they cause issues.

4. **[src/components/forms/AcceleratedFormEmbed.jsx](src/components/forms/AcceleratedFormEmbed.jsx)**  
   - `baseUrl`: use id `4be285ae-ef97-4493-a41b-9f27bcd981dc` and div `form_4be285ae-ef97-4493-a41b-9f27bcd981dc`.  
   - All `getElementById('form_89080626-...')` and `#form_89080626-...` in styles → `form_4be285ae-ef97-4493-a41b-9f27bcd981dc`.  
   - Div `id="form_89080626-..."` → `id="form_4be285ae-ef97-4493-a41b-9f27bcd981dc"`.

5. **[src/styles/form-overrides.css](src/styles/form-overrides.css)**  
   - `--form-id-accelerated: form_89080626-7bc4-4c48-9437-fd47479d7371` →  
     `--form-id-accelerated: form_4be285ae-ef97-4493-a41b-9f27bcd981dc`  
   - Replace every `#form_89080626-7bc4-4c48-9437-fd47479d7371` (and `form_89080626-7bc4-4c48-9437-fd47479d7371` in selectors) with `#form_4be285ae-ef97-4493-a41b-9f27bcd981dc` / `form_4be285ae-ef97-4493-a41b-9f27bcd981dc`.  
   - Use find-and-replace for consistency.

**Reverting to production form:** Reverse the same edits (restore `89080626-7bc4-4c48-9437-fd47479d7371` and `form_89080626-7bc4-4c48-9437-fd47479d7371` everywhere).

---

## Part 2: Content gaps (from graduate application instructions)

Content from the Stevens graduate application welcome/instructions that is **not** currently on [src/pages/AcceleratedApplication.jsx](src/pages/AcceleratedApplication.jsx):

| Topic | What to add |
|-------|-------------|
| **Transcripts** | One sentence: official transcripts required from **all post-secondary institutions attended**, regardless of whether a degree was earned (unofficial OK to get started). |
| **Submitting / no edits after** | Short “Submitting your application”: must click Submit in Review; after submission you cannot add or change information; contact [onlineadmissions@stevens.edu](mailto:onlineadmissions@stevens.edu) for changes. Use `CONTACT_INFO` from [src/config/constants.js](src/config/constants.js). |
| **After submission** | “After you submit”: confirmation email with link to Applicant Status Page; pay application fee and get status updates there. |
| **Review process** | Rolling admissions; decisions released as rendered; Master’s and Graduate Certificate typically reviewed within 48 hours. |
| **Multiple programs** | One application per program per semester; apply to no more than three programs. |
| **Contact** | “Questions? Contact …” with link to `CONTACT_INFO.EMAIL` / `CONTACT_INFO.EMAIL_LINK`. |

**Placement:** Add in the left column (“Your Path to Graduate Success”) as small subsections or callouts; optionally one line near the form (“Submit in the Review section. After submitting, you’ll receive a confirmation email…”).
