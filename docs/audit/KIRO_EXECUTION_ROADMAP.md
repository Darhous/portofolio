# KIRO Execution Roadmap

Audit Date: 2026-07-10
Auditor: Kiro
Status: PLAN ONLY — No implementation has started.

This roadmap is organized into 15 milestones in logical dependency order. Each milestone can be a separate implementation prompt. Do not begin any milestone until the previous one is verified.

---

## Milestone 0: Backup and Baseline

**Goal:** Preserve the current working state before any changes.

**Steps:**
1. Tag the current commit: `git tag v0.1.0-pre-audit`
2. Push the tag to remote
3. Save screenshots of current live site for before/after comparison
4. Confirm `npm run build` passes before any changes

**Files affected:** None (tag only)
**Dependencies:** None
**Priority:** P0 — Critical
**Risk:** None — read-only operation
**Acceptance test:** `git tag` shows `v0.1.0-pre-audit`. Screenshots saved to `docs/audit/screenshots/before/`.
**Expected result:** Stable baseline that can be restored if anything goes wrong.

---

## Milestone 1: Repository Cleanup

**Goal:** Remove clutter files from the public GitHub repository and local workspace. Clean up the root directory. Fix .gitignore.

**Steps:**
1. Add `CE933E3B-D6AB-4FD6-A89B-651BD7022FB8.PNG` to `.gitignore`
2. Remove it from git tracking: `git rm --cached "CE933E3B-D6AB-4FD6-A89B-651BD7022FB8.PNG"`
3. Move `PORTFOLIO_IMPLEMENTATION_LOG.md`, `PORTFOLIO_MASTER_PLAN.md`, `PORTFOLIO_FINAL_REPORT.md`, `DESIGN_SYSTEM.md` to `docs/archive/`
4. Delete `tmp/pdfs/profile-page-1.png`, `tmp/pdfs/profile-page-2.png` (local files only — already gitignored)
5. Delete `.codex-vite.err.log`, `.codex-vite.out.log` (local only — already gitignored)
6. Add a `README.md` at the repo root with a brief description of the project

**Files affected:**
- `.gitignore` (add CE933E3B filename)
- `PORTFOLIO_IMPLEMENTATION_LOG.md` (move)
- `PORTFOLIO_MASTER_PLAN.md` (move)
- `PORTFOLIO_FINAL_REPORT.md` (move)
- `DESIGN_SYSTEM.md` (move)
- `README.md` (create)

**Dependencies:** Milestone 0
**Priority:** P1 — High
**Risk:** Low — no application code affected
**Acceptance test:** Root directory contains only application files + AGENTS.md + CODEX_MEMORY.md + docs/. `git status` clean after commit. README visible on GitHub repo page.
**Expected result:** Clean, professional GitHub repository that a technical visitor can understand at a glance.

---

## Milestone 2: Data Corrections

**Goal:** Fix factual errors and gaps in the profile data before any visual changes.

**Steps:**
1. Fix education entry in `src/data/profile.ts`:
   - Change Police Academy entry: credential should be "Commissioned Police Officer Foundation Training", not "Diploma in Egyptian General Law"
   - Fix institution name for General Law Diploma: verify correct institution (Qena University vs Police Academy)
   - Fix Institut Français period: replace "Documented in CV" with approximate dates from CV
2. Add missing experience entry: Commissioned Police Officer – Early Career (August 2017 – Present)
3. Add missing metric to Senior Risk Mitigation highlights: 95%+ prosecution-readiness rate
4. Update JSON-LD in `index.html` to include full job title (AI Operations, Legal Expert, Oil & Gas)
5. Verify Facebook URL: `ahmed.darhous` vs `Ahmed.Darhous` (Facebook is case-insensitive for paths but verify)
6. Remove `"Documented in CV"` placeholder text — replace with best available dates from CV

**Files affected:**
- `src/data/profile.ts`
- `index.html`
- `CODEX_MEMORY.md` (update if facts change)

**Dependencies:** Milestone 0
**Priority:** P1 — High (factual errors affect credibility)
**Risk:** Low — data changes only. Run `npm run typecheck && npm run test` after.
**Acceptance test:** No "Documented in CV" visible on live site. Education entries match CV exactly. Typecheck passes. Content test passes.
**Expected result:** Portfolio data accurately reflects the CV with no placeholders or wrong institution names.

---

## Milestone 3: Content Rewrite — Hero and About

**Goal:** Replace internal/meta-audience copy with professional-audience copy in Hero and About sections.

**Steps:**
1. Rewrite hero eyebrow: remove "Ahmed Darhous Portfolio" → use role-based tagline
2. Rewrite hero body: describe Ahmed, not the portfolio
3. Rewrite About kicker: replace "Profile Evidence" with something user-facing
4. Rewrite About title: replace "Built from the CV, not guesswork" with a professional positioning statement
5. Rewrite About body: replace documentation language with professional summary language
6. Reorder skills tags: surface stronger skills first (OSINT, LLM Workflows, Crisis Management, Risk Assessment before Blockchain)
7. Add missing skills from CV: Crisis Management, Risk Assessment, Personnel Management, OSINT Intelligence
8. Consider removing "Blockchain" from featured skills unless Ahmed can evidence it

**Files affected:**
- `src/data/content.ts` (hero and about copy, both EN and AR)
- `src/data/profile.ts` (skills array)

**Dependencies:** Milestone 2 (data must be correct before writing around it)
**Priority:** P1 — High (affects first impression)
**Risk:** Medium — content rewrites need review by Ahmed before deployment
**Acceptance test:** A non-technical person who reads the Hero and About sections can correctly state Ahmed's role and experience within 30 seconds. No internal meta-language visible.
**Expected result:** Hero copy centers on Ahmed's value. About section reads like a professional introduction, not a content audit report.

---

## Milestone 4: Design System Upgrade

**Goal:** Establish a more distinctive visual identity on top of the current color/typography foundation.

**Steps:**
1. Add a favicon (SVG or ICO) — minimum: "AD" monogram in copper on dark background
2. Create an OG image (1200×630) separate from the portrait PNG — for social sharing previews
3. Add an Arabic-supporting font (IBM Plex Arabic or Noto Sans Arabic) via system stack or @font-face
4. Add icons/symbols to Expertise domain cards (shield, scales, neural network, code)
5. Consider a `--navy` color token for depth layering in panels
6. Refine olive accent usage — currently barely visible; either strengthen or remove
7. Fix `--dim` color contrast: lighten from `#817b71` to at least `#8f8880` to pass WCAG AA

**Files affected:**
- `src/styles.css`
- `index.html` (favicon link, OG image)
- `public/` (new favicon, OG image files)
- `src/components/ExpertiseSection.tsx`

**Dependencies:** Milestone 3
**Priority:** P2 — Medium
**Risk:** Low — visual changes. Test on both locales and mobile.
**Acceptance test:** Favicon visible in browser tab. OG preview shows correct image when URL shared. Expertise cards have visual icons. `--dim` contrast passes WCAG AA checker.
**Expected result:** Visually more distinctive. Improved shareability. Accessibility improved.

---

## Milestone 5: Layout Restructuring

**Goal:** Fix the structural layout problems identified in the UI/UX audit.

**Steps:**
1. Reduce project cards from 9 to 5-6 featured (per KIRO_PROJECTS_AUDIT.md recommendations)
2. Add a "Labs / Other Projects" section below the main grid (list format, not cards)
3. Remove Portfolio self-reference project card
4. Merge Store Master Template into ShahY Store case study — remove as standalone card
5. Fix mobile nav: replace horizontal scroll strip with either a hamburger menu or a scrollable row with visible overflow indicators
6. Fix project card `min-height: 520px` — remove or reduce to allow natural card height
7. Fix footer layout on tablet: improve 3-column collapse behavior at 1040px

**Files affected:**
- `src/data/projects.ts` (remove/archive cards)
- `src/components/ProjectsSection.tsx` (add Labs section logic)
- `src/styles.css` (nav, card, footer responsive fixes)
- `src/App.tsx` (if new section component added)

**Dependencies:** Milestone 3 (content decisions drive project selection)
**Priority:** P2 — Medium
**Risk:** Medium — structural changes. Test all breakpoints.
**Acceptance test:** Project grid shows ≤6 cards. Mobile nav usable without horizontal scroll confusion. All cards collapse to natural height. Footer readable on tablet.
**Expected result:** Cleaner project presentation. Better mobile navigation. More professional card proportions.

---

## Milestone 6: Hero Redesign

**Goal:** Elevate the Hero section to be the strongest first impression possible.

**Steps:**
1. Remove "View Repository" from the hero CTAs (three CTAs is too many; reduce to 2)
2. Redesign CTA hierarchy: Primary = Download CV (copper), Secondary = Start a Conversation (email)
3. Add a quantified value line below the H1: "9+ years · 200+ personnel · 150+ assessments"
4. Improve portrait integration: review `object-position` to optimize face framing
5. Consider adding the decorative portrait border in a stronger, more visible color
6. Add a subtle background texture or grid pattern behind the portrait column for depth

**Files affected:**
- `src/components/Hero.tsx`
- `src/data/content.ts` (hero body text)
- `src/styles.css` (portrait adjustments)

**Dependencies:** Milestone 3 (content must be correct first)
**Priority:** P2 — Medium
**Risk:** Low — isolated to Hero component
**Acceptance test:** Desktop Hero makes Ahmed's role and key numbers visible within the first viewport. Two CTAs only. Portrait is well-framed.
**Expected result:** Hero section communicates Ahmed's value in under 10 seconds.

---

## Milestone 7: Project Cards Redesign

**Goal:** Transform project cards from information dumps to compelling evidence of work.

**Steps:**
1. Add project screenshots or visual thumbnails to each featured card
2. Redesign Guardian-Nexus card with "Classified / Confidential" visual treatment
3. Replace "Source: GitHub README" meta-labels with outcome-framed impact language
4. Remove source label entirely from project cards (internal verification language)
5. Add "View Case Study" link on cards that have case studies
6. Redesign case study cards to visually connect to their parent project

**Files affected:**
- `src/components/ProjectsSection.tsx`
- `src/components/CaseStudiesSection.tsx`
- `src/data/projects.ts` (impact text rewrites)
- `src/styles.css` (card visual treatment)
- `public/` (screenshot assets)

**Dependencies:** Milestone 5 (project selection must be finalized first)
**Priority:** P2 — Medium
**Risk:** Medium — requires preparing visual assets (screenshots)
**Acceptance test:** Each project card conveys the project's outcome in ≤30 words. Guardian-Nexus has a visually distinct confidential treatment. Case studies link back to their projects.
**Expected result:** Projects section reads as portfolio evidence, not a project list.

---

## Milestone 8: CV and Experience Section

**Goal:** Make the experience and CV sections more persuasive and accurate.

**Steps:**
1. Add the missing Commissioned Police Officer – Early Career experience entry
2. Add the 95%+ prosecution-readiness metric to the investigation role
3. Optionally add the Freelance Writer/Editor/Programmer thread (2011–Present) as a brief note
4. Add Oil & Gas / HSE / Asset Protection as an expertise domain or add to existing domain descriptions
5. Add Global Exposure (UK, France, UAE, Singapore, Malaysia) to the About/profile section
6. Rename `public/Profile.pdf` to `Ahmed-Darhous-CV.pdf` and update `site.ts`

**Files affected:**
- `src/data/profile.ts` (experience, education)
- `src/config/site.ts` (cv asset path)
- `public/Profile.pdf` (rename)
- `src/data/content.ts` (if experience section copy needs update)

**Dependencies:** Milestone 2 (data corrections)
**Priority:** P2 — Medium
**Risk:** Low — data additions
**Acceptance test:** Experience section shows 4 roles. Key metric (95%+) visible. CV downloads as "Ahmed-Darhous-CV.pdf". Oil & Gas positioning present on the page.
**Expected result:** Complete experience picture. Better CV download UX. Full professional positioning visible.

---

## Milestone 9: Contact Section and Footer Polish

**Goal:** Add a contact form and improve the contact section.

**Steps:**
1. Integrate a static-hosting-compatible contact form (recommended: Formspree or Web3Forms)
2. Add form with fields: Name, Email, Subject (dropdown: Security Consulting / Legal Tech / Product Development / Other), Message
3. Use `SectionHeader` component in ContactSection (fix inconsistency)
4. Add accessible form labels, required field indicators, error states
5. Add success state ("Message sent") and error state ("Message failed — use email instead")
6. Verify footer on all breakpoints after any responsive changes from earlier milestones

**Files affected:**
- `src/components/ContactSection.tsx`
- `src/styles.css` (form styles)
- `package.json` (if new dependency added for form)

**Dependencies:** Milestone 5 (layout must be stable)
**Priority:** P2 — Medium
**Risk:** Medium — external service dependency (Formspree). Test form submission in production.
**Acceptance test:** Form submits successfully. Success state visible. Error state visible. No layout break on mobile. Footer identity unchanged.
**Expected result:** Lower barrier to contact. Accessible, functional contact form.

---

## Milestone 10: Performance Optimization

**Goal:** Reduce initial load weight and improve Core Web Vitals.

**Steps:**
1. Optimize `public/ahmed-darhous.png` — compress from 2.1MB to <300KB using lossy compression
2. Create a dedicated OG image (1200×630) optimized for social sharing
3. Add `<link rel="preload">` for the 640w WebP portrait (it is used with `loading="eager"`)
4. Review `lucide-react` import — currently the full icon library is bundled (1000+ icons). Import only used icons individually to reduce JS bundle size.
5. Add `Cache-Control` headers recommendation (note: GitHub Pages sets max-age=600 automatically; may need to explore GitHub Pages workarounds or accept this limitation)
6. Consider code splitting if additional sections are added in future

**Files affected:**
- `public/ahmed-darhous.png` (replace with optimized version)
- `public/` (new OG image)
- `index.html` (preload link, OG image reference)
- `src/App.tsx` or component files (if lucide imports are changed)

**Dependencies:** Milestone 4 (design system must be stable before optimizing assets)
**Priority:** P3 — Medium-Low
**Risk:** Low for image optimization. Medium for lucide import changes (test all icons still render).
**Acceptance test:** `public/ahmed-darhous.png` < 300KB. Lighthouse performance score ≥ 85. Lucide icons all rendering correctly after import change.
**Expected result:** Faster initial load. Better Core Web Vitals. Smaller total page weight.

---

## Milestone 11: Accessibility Fixes

**Goal:** Fix the specific accessibility issues identified in the audit.

**Steps:**
1. Fix `--dim` color contrast: lighten to pass WCAG AA (already in Milestone 4 if done there)
2. Add `aria-modal="true"` to the Intro component's `role="dialog"` element
3. Fix mobile nav accessibility: either add hidden count indicator ("4 more items →") or implement a proper mobile menu
4. Add `type ExternalLinkProps` to require `href` explicitly in ExternalLink component
5. Review and add `<html lang>` attribute updates when locale changes (already done via app shell — verify)
6. Add `aria-live="polite"` region for language toggle feedback

**Files affected:**
- `src/styles.css` (color contrast)
- `src/components/Intro.tsx` (aria-modal)
- `src/styles.css` (mobile nav)
- `src/components/ExternalLink.tsx` (href required)
- `src/App.tsx` (aria-live)

**Dependencies:** Milestone 5 (layout must be stable)
**Priority:** P2 — Medium (WCAG compliance is expected for professional portfolio)
**Risk:** Low — targeted fixes
**Acceptance test:** `--dim` contrast ratio ≥ 4.5:1. Intro dialog has aria-modal. axe-core scan shows no critical issues. ExternalLink without href fails TypeScript compilation.
**Expected result:** WCAG AA compliance for all identified issues. Better screen reader experience.

---

## Milestone 12: SEO Improvements

**Goal:** Fix the SEO gaps identified in the audit.

**Steps:**
1. Update `<title>` to describe Ahmed's role, not the portfolio tier
2. Rewrite meta description with a human-readable value proposition
3. Add `<link rel="canonical" href="https://darhous.github.io/portofolio/">` to index.html
4. Add Twitter Card meta tags (twitter:card, twitter:title, twitter:description, twitter:image)
5. Update JSON-LD jobTitle to include AI Operations, Legal Expert, Oil & Gas
6. Update OG image from PNG to the new OG-optimized image (from Milestone 10)
7. Update sitemap.xml lastmod to current date
8. Consider adding a `og:locale:alternate` for Arabic content

**Files affected:**
- `index.html`
- `public/sitemap.xml`

**Dependencies:** Milestone 3 (content must be final before writing meta tags)
**Priority:** P2 — Medium
**Risk:** Very low — HTML meta changes only
**Acceptance test:** Page title describes Ahmed's role. LinkedIn/Twitter share preview shows correct image and text. JSON-LD validates without errors in Google Rich Results Test.
**Expected result:** Better search engine representation. Correct social sharing preview. Complete structured data.

---

## Milestone 13: Testing Infrastructure

**Goal:** Add real testing beyond the content identity script.

**Steps:**
1. Install Vitest as the test runner
2. Add component smoke tests for critical components (Hero renders, Footer has signature)
3. Add link validation test (verify all href values are well-formed URLs)
4. Add ESLint with recommended config + react-hooks plugin
5. Add lint script to package.json
6. Update GitHub Actions workflow to run lint before build
7. Consider adding Playwright for basic E2E smoke test (page loads, hero visible, CV downloads)

**Files affected:**
- `package.json`
- `vite.config.ts` (Vitest config)
- New test files in `src/__tests__/` or `src/components/__tests__/`
- `.eslintrc.json` or `eslint.config.mjs`
- `.github/workflows/deploy.yml`

**Dependencies:** Milestones 2-11 (code must be stable before adding tests)
**Priority:** P3 — Medium-Low
**Risk:** Low — additive changes only. New tests may catch existing issues.
**Acceptance test:** `npm run lint` exits 0. `npm run test` runs Vitest and all tests pass. CI workflow runs lint before build.
**Expected result:** Automated quality gates. Future changes caught before deployment.

---

## Milestone 14: Production Deployment

**Goal:** Deploy all changes to production and verify everything works.

**Steps:**
1. Final `npm run typecheck && npm run test && npm run build` locally
2. Visual review at all breakpoints (desktop, tablet, mobile) in browser
3. Review both EN and AR locales
4. Commit all changes with clear conventional commit messages
5. Push to main branch
6. Monitor GitHub Actions workflow for success
7. Verify production URL returns HTTP 200
8. Spot-check all links (email, phone, WhatsApp, social, CV download, project repos)
9. Verify OG preview on LinkedIn and Twitter
10. Verify Google Search Console if configured

**Files affected:** All changed files from previous milestones
**Dependencies:** All previous milestones
**Priority:** P0 — Critical
**Risk:** Medium — production deployment. Workflow must pass.
**Acceptance test:** GitHub Actions workflow succeeds. Production URL HTTP 200. All 8 official links functional. Both locales render correctly. CV downloads correctly.
**Expected result:** Updated portfolio live at https://darhous.github.io/portofolio/

---

## Milestone 15: Post-Deployment Verification

**Goal:** Confirm the deployed site meets all audit findings and is production-ready.

**Steps:**
1. Run Lighthouse against the live production URL (target: Performance ≥85, Accessibility ≥90, SEO ≥90, Best Practices ≥90)
2. Verify social sharing previews (OG image, title, description) on LinkedIn, Twitter/X, WhatsApp
3. Run a broken link check against all external URLs
4. Test contact form submission end-to-end
5. Test CV download on mobile Safari and Chrome
6. Test Arabic locale on a right-to-left device or browser setting
7. Screenshot all sections at desktop and mobile for the audit record
8. Update `docs/audit/KIRO_TEST_RESULTS.md` with new scores
9. Update `CODEX_MEMORY.md` with the new verified state

**Files affected:** Documentation only (no code changes)
**Dependencies:** Milestone 14
**Priority:** P1 — High
**Risk:** Low — verification only
**Acceptance test:** Lighthouse scores meet targets. No broken links. Form works. CV downloads. Screenshots saved.
**Expected result:** Confirmed production-quality portfolio with documented evidence of verification.

---

## Dependency Graph

```
M0 (Backup)
    │
    ├── M1 (Repo Cleanup) ──────────────────────────────────┐
    │                                                         │
    ├── M2 (Data Corrections)                                │
    │       │                                                 │
    │       └── M3 (Content Rewrite)                         │
    │               │                                         │
    │               ├── M4 (Design System)                   │
    │               │       │                                 │
    │               │       └── M10 (Performance)            │
    │               │                                         │
    │               ├── M5 (Layout Restructure)              │
    │               │       │                                 │
    │               │       ├── M6 (Hero Redesign)           │
    │               │       ├── M7 (Project Cards)           │
    │               │       ├── M9 (Contact + Footer)        │
    │               │       └── M11 (Accessibility)          │
    │               │                                         │
    │               └── M8 (CV + Experience)                 │
    │                                                         │
    └── M12 (SEO) ── depends on M3                          │
                                                              │
M13 (Testing) ── depends on M2-M12 ─────────────────────────┤
                                                              │
M14 (Deployment) ── depends on all ──────────────────────────┤
                                                              │
M15 (Post-deployment verification) ── depends on M14 ────────┘
```

---

## Priority Summary

| Priority | Milestones | Rationale |
|---|---|---|
| Do First | M0, M1, M2 | Foundation — fix facts, clean repo |
| High Impact | M3, M6, M12 | Content and SEO — biggest ROI for effort |
| Design Upgrade | M4, M5, M7 | Visual quality — requires content to be solid first |
| Polish | M8, M9, M10, M11 | Completeness and quality |
| Infrastructure | M13 | Long-term maintainability |
| Ship | M14, M15 | Required before publishing changes |
