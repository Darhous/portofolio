# Portfolio Implementation Log

## 2026-07-09

### Station 0 - Discovery

- Ran memory bootstrap from `D:\Claude-Brain\00-System\Agents\Codex\codex-memory-start.ps1`.
- Confirmed the working folder initially was not a Git repository.
- Initialized Git, set `origin` to `https://github.com/Darhous/portofolio`, committed foundation work, and pushed `main`.
- Extracted `Profile.pdf` using `pdfplumber`.
- Rendered pages 1-2 of `Profile.pdf` with Poppler for visual inspection.
- Inspected portrait image `CE933E3B-D6AB-4FD6-A89B-651BD7022FB8.PNG`: 1024x1536 RGB.
- Queried current GitHub repository metadata using `gh repo list Darhous`.
- Sampled README content via GitHub API for public repositories.

### Skills Used

- `frontend-design`: visual direction and interface quality.
- `vercel-react-best-practices`: React structure and performance posture.
- `git-commit`: conventional checkpoint commit workflow.
- `pdf`: CV extraction and rendered-page inspection.

### Completed Work

- Built Vite + React + TypeScript portfolio foundation.
- Added centralized identity/contact/social config.
- Added shared Footer and SocialLinks components.
- Added bilingual content data from CV and GitHub evidence.
- Added Intro, Hero, About, Expertise, Experience, Projects, Contact, and Footer sections.
- Added dedicated CV section.
- Added featured case-study section.
- Added optimized WebP portrait variants.
- Added durable docs under `docs/content`.
- Added production QA report and screenshots under `docs/qa`.
- Added SEO metadata, JSON-LD, robots, sitemap, and GitHub Pages workflow.
- Added automated content identity verification script.

### Verification Commands

- `npm install`
- `npm test` - passed
- `npm run typecheck` - passed
- `npm run build` - passed
- Desktop browser QA - passed
- Mobile browser QA at 390px width - passed after adding horizontal overflow guard
- Accessibility sanity check - passed after adding skip link, focus offsets, and footer link target-size fix
- Production browser QA - passed
- Production QA screenshots captured for desktop and mobile
- Production optimized portrait selection verified: `ahmed-darhous-640.webp`

### Deployment

- Commit `4375289` pushed initial footer/foundation work.
- Commit `e6038dc` pushed full bilingual portfolio implementation and GitHub Pages workflow.
- GitHub Actions run `29044855746` completed successfully.
- Live URL verified with HTTP 200: `https://darhous.github.io/portofolio/`
- Deployment workflow updated to use GitHub Actions only, not Jekyll.
- Workflow now verifies Vite base path `/portofolio/`, runs `typecheck`, optional `lint`, optional `test`, builds `dist`, deploys via `actions/deploy-pages`, and verifies the production URL after deployment.
- Commit `d51ada7` pushed the stricter Vite Pages workflow.
- Commit `69b16b1` fixed the YAML parser issue in the base-path verification step.
- GitHub Actions run `29045398557` completed successfully, including `Verify Production URL`.
- GitHub Actions run `29046773917` completed successfully after QA screenshot artifacts were committed.

### Current Problem

- No known blocking problem.

### Next Action

- Current baseline includes content inventory docs, optimized portrait assets, CV section, case studies, QA screenshots, and verified GitHub Pages deployment.

## 2026-07-10

### Discovery

- Re-verified GitHub for the specific project names given as "known real projects" (`career-ops`, `atsresume`, `Shemo Studio`, `Darhous Project Lab`) using direct public GitHub page fetches. `career-ops` and `atsresume` do not exist as repositories; the real ATS work lives inside `Darhous-career-hub-google`. `Darhous Project Lab` was not found anywhere under the account. `Shemo-Studio` was confirmed real (PHP/WordPress). Full detail: `docs/content/PROJECT_DISCOVERY.md`.
- Found and added real projects missing from the prior inventory: `almasa-lab-proposal`, `darhous-assessment`, `Exams_Platform`, `darhous-marketing-social-hub`, `whatsapp-auto-poster`. Confirmed `elfady` exists but is empty and listed it honestly rather than omitting it or inventing content.

### Completed Work

- Rewrote `src/data/projects.ts` with a richer schema (`slug`, `year`, `role`, `featured`, structured case-study fields: context/constraints/features/challenges/solutions/results/currentStatus/lessons) and grew the catalog from 9 to 16 projects.
- Converted the site from a single anchored page to a multi-page `react-router-dom` app: `RootLayout` + `HomePage`, `ProjectsArchivePage` (search + category filters), `ProjectCaseStudyPage` (full case study per project, related-projects rail), `ContactPage`, `NotFoundPage`.
- Implemented the GitHub Pages SPA routing trick (`public/404.html` redirect + `index.html` restore script) so deep links and page reloads work on nested routes with no server-side rewrites available.
- Added a `Ctrl/Cmd+K` command palette (`src/components/CommandPalette.tsx`) covering navigation, all projects, and quick actions.
- Replaced the horizontal-scroll mobile nav with a real hamburger + slide-in drawer (`src/components/Header.tsx`), with focus trap and `Escape`-to-close.
- Built a structured, static-compatible contact form (`src/components/ContactForm.tsx`): name/email/project-type/budget/message, client-side validation, honeypot spam field, `mailto:`/`wa.me` link generation — no backend, no secrets.
- Added per-route SEO (`src/hooks/usePageMeta.ts`: title/description/canonical/OG per route) and per-project `CreativeWork` JSON-LD.
- Extended `public/sitemap.xml` to cover every route and project slug; extended `scripts/verify-content.mjs` to assert every project slug has a sitemap entry.
- Added `public/favicon.svg` (the site previously had no favicon).
- Added hero stat indicators (years of experience, personnel coordinated, project count) sourced from the CV.

### Verification Commands

- `npm ci`
- `npm run typecheck` — passed
- `npm test` — passed (footer/identity checks + new 16/16 sitemap-slug check)
- `npm run build` — passed
- Playwright QA against a local GitHub Pages 404-behavior mock server (not `vite preview`, which has its own SPA fallback and would have hidden routing bugs) — 18 scenarios across desktop/tablet/mobile/small-mobile, EN/AR, command palette, archive search/filter, a genuine deep-link reload through the 404-redirect chain, contact validation, 404, and reduced motion. No console errors, no unexpected 404s, no horizontal overflow.

### Bug Found And Fixed

- The mobile drawer overlay (`position: fixed`) was a DOM descendant of `<header class="topbar">`, which has `backdrop-filter: blur(16px)`. That CSS property makes the header a containing block for `position: fixed` descendants, so the drawer's `inset: 0` sized itself to the header instead of the viewport, rendering the drawer squashed at the top of the page. Fixed by portaling the drawer to `document.body` with `createPortal`. Confirmed with before/after screenshots.

### Current Problem

- No known blocking problem. Bundle size grew to ~334 KB JS (~105 KB gzip) after adding routing/archive/case-study/contact/command-palette code; still a single chunk. Route-level code splitting is a reasonable future optimization, not required for correctness.

## 2026-07-10 (part 2) — Full project inventory pass

Ahmed sent a complete, detailed inventory of 33 projects with exact repo/live
URLs for several. Cross-checked every item against GitHub rather than adding
them at face value.

### Discovery

- Found a second GitHub account, `darhous2023`, not previously known to this
  project. `Elfady Car Trading` lives there as `darhous2023/fady` — real,
  89 commits, full README (Next.js 16, dual Postgres, Drizzle, Playwright) —
  distinct from the empty `Darhous/elfady` placeholder found in the prior
  pass. `darhous2023/flutter_test` (the Elfady Android app) exists but is
  empty, same honest treatment as before.
- Discovered this session's sandbox network policy blocks `vercel.app`
  entirely (confirmed via the agent proxy status endpoint: policy 403, not a
  site error) — no live Vercel URL, including the ones Ahmed provided
  directly, could be opened from this environment. Documented this limit
  and its handling in `docs/content/PROJECT_DISCOVERY.md`.
- `career-ops`/`ATS Resume`, `Darhous Project Lab`, `NutriBox`, and `Fenrir`
  were searched for again under both known accounts; only the
  `career-ops`/`ATS Resume` mapping to `Darhous-career-hub-google` was
  previously resolved. `Darhous Project Lab` remains not found. `NutriBox`
  and `Fenrir` were added as `source: "Owner-provided"` entries using only
  Ahmed's own description — no public repository exists for either under
  any known account, and this is stated plainly on their case-study pages
  rather than hidden or invented around.

### Completed Work

- Rewrote the NexaLearn (`darhous-ai-cloud-academy`) case study from a full
  README re-read: 325+ commits, 144+ releases, all 6 core portals and all 8
  AI Studio tools confirmed by name and route.
- Added 7 new independent archive entries for NexaLearn's portals (AI
  Academy, English Language Assessment, Digital Transformation Exams,
  Career Hub, Automation Academy, IoT Lab, Nano Banana Prompt Lab), with
  the Language Assessment and Digital Exams portals additionally marked
  `featured: true` per Ahmed's explicit instruction.
- Added 3 independent archive entries for the AI Studio tools Ahmed named as
  strongest (AI Mentor, Prompt Studio, Claude Code Prompt Generator); the
  other 11 AI Studio tools are described only inside the NexaLearn case
  study's feature list, not as separate pages, per his display rule.
- Rewrote the Elfady Car Trading entry with the real `darhous2023/fady`
  evidence and marked it featured.
- Added Automotive Catalog Intelligence Platform, Elfady Native Android App,
  NutriBox Healthy Kitchen OS, and Fenrir Cybersecurity Projects.
- Changed the generic "Private / CV-sourced" fallback copy to "No public
  link available" (EN) / "لا يوجد رابط عام متاح" (AR) since it now covers
  both genuinely private projects and simply-unverified ones honestly.
- Regenerated `public/sitemap.xml` for all 30 project slugs.

### Verification

- `npm run typecheck`, `npm test` (30/30 slugs verified), `npm run build` — all passed.
- Playwright re-run against the GitHub Pages mock server: 30-card archive count verified, category filter verified, NexaLearn/Elfady/Fenrir case studies verified, Arabic archive verified, no console errors, no overflow.
- Caught and fixed a real data bug during this QA pass: "NexaLearn AI Academy" was accidentally marked `featured: true`, pushing the homepage to 11 featured cards instead of the intended 10. Fixed to `featured: false` and re-verified.

## 2026-07-10 (part 3) — Premium editorial visual rebrand

Ahmed sent a new portrait and a new CV (`Ahmed_Darhous_CV.docx`) with
explicit instructions to completely redesign the visual identity around
them — not a feature/content change, a visual rebrand away from the
"command surface" concept toward a luxury-editorial identity (Apple,
Leica, Aesop, Linear, Stripe Press references; explicitly no neon,
glassmorphism, hacker aesthetics, or stat-counter hero clutter).

### Discovery

- The uploaded portrait is byte-identical (same MD5) to the one already in
  the repo — same photo, not a new one. Reprocessed it anyway with a real
  editorial crop, filmic grade, and vignette, since the raw corporate
  headshot wasn't previously retouched.
- The new CV is materially different from the CV data already in the
  repo: new job titles (Senior Liaison & External Relations Officer,
  Operations & Deployment Coordinator, Criminal Investigation Officer, all
  at "Ministry of Interior"), no more OSINT/LLM/AI-operations claims, and
  a much more modest technical-skills section (VB, HTML, Java, admin
  report scripting) than the previous CV-derived content implied.
  Rewrote `src/data/profile.ts` entirely from the new document rather
  than blending old and new.
- LibreOffice's headless docx→PDF conversion is broken in this sandbox
  ("source file could not be loaded" regardless of file/profile
  location). Generated the CV PDF directly from the new content with
  `fpdf2` instead.

### Completed Work

- New design tokens: deep matte black / graphite / titanium-hairline
  surfaces, warm white / silver gray text, Fraunces (serif display) +
  Inter (body) via self-hosted `@fontsource` packages.
- New per-category accent system (`src/data/accents.ts`, 17 categories,
  applied via inline `--accent` custom property) — used only in small
  details (card top hairline, category labels), never as a background.
- Hero rebuilt to the "magazine cover" brief: large portrait, large serif
  name, small subtitle, one short statement, two CTAs only — removed the
  stat-counter row (years/personnel/project-count) that a prior session
  had added, since the new brief explicitly forbids it.
- Intro rebuilt: a short wordmark reveal instead of the old three-line
  "boot sequence."
- Experience section restyled as an editorial timeline (`resume-block`/
  `resume-role`) instead of a side-by-side card grid; the CV section
  kept slim (open/download the PDF) rather than duplicating the full
  experience listing a second time.
- Rewrote `index.html` and the HomePage SEO meta to match the new,
  CV-accurate positioning.
- Fixed a real RTL bug found during this pass: the hero portrait's
  decorative frame used physical `inset` offsets, so it didn't mirror
  correctly in Arabic — switched to `inset-inline`/`inset-block` logical
  properties.

### Verification

- `npm ci`, `npm run typecheck`, `npm test`, `npm run build` — all passed.
- Playwright: command palette, a deep-link route through the GitHub Pages
  404-redirect chain, the 404 page, `prefers-reduced-motion`, contact-form
  validation, and a full viewport sweep (360/390/414/768/820/1024/1440px)
  across home/archive/a case study/contact — zero console errors, zero
  horizontal overflow at any width.

### Next Action

- Committed and pushed to `claude/darhous-portfolio-rebuild-sxmb3n`. This
  branch has **not** been merged to `main`, per this session's explicit
  instruction to stay on the feature branch and not open a pull request
  unless asked — so the GitHub Actions Pages deployment (which only
  triggers on pushes to `main`) has not run for this work, and
  `https://darhous.github.io/portofolio/` still serves the 2026-07-09
  build. Merging or opening a PR is the next decision for Ahmed.

## Phase 3 — Motion & Interaction (2026-07-12)

### Context

A follow-up brief asked for a much more elaborate, Kanit/metallic-gradient/
glowing-CTA redesign (magnetic hero portrait, full-screen cinematic
typography, a scroll marquee, sticky-stacking project cards,
character-reveal text, decorative floating elements). That brief directly
contradicted the calm, gradient-free, glow-free editorial system just
finished in phases 1-2. Flagged the conflict back to Ahmed with three
options; he chose to take the structural interaction ideas only, and keep
them inside the existing monochrome-plus-single-accent token system — no
Tailwind migration, no Kanit, no metallic gradients, no glowing button.

### Completed Work

- Added `framer-motion` as a real dependency and built four reusable
  primitives under `src/components/motion/`: `FadeIn` (entrance wrapper),
  `MagneticElement` (pure-DOM pointer-following effect, no framer-motion
  import needed for this one), `AnimatedText` (scroll-linked word-reveal),
  and `ScrollMarquee` / `StickyProjectStack` (the two content-bearing
  pieces).
- `ScrollMarquee`: a two-row, opposite-direction scrolling strip built
  from the **real** `Project[]` data (monogram + name + category tiles,
  colored by each project's existing accent) rather than fabricated
  screenshots, since no real product imagery exists for most projects.
- `StickyProjectStack`: the top `FLAGSHIP_COUNT` (4) featured projects now
  present as a sticky-scaling stack (`useScroll`/`useTransform`) instead
  of plain cards, replacing the previous "editorial spread" for just
  those four; the remaining featured projects still render as the
  phase-2 spread below it.
- Magnetic hover added to the hero portrait via `MagneticElement`.
- CV summary paragraph now renders through `AnimatedText` for a
  scroll-linked word reveal instead of a static paragraph.
- Every new motion primitive has a `prefers-reduced-motion` fallback and,
  for the two heaviest (`ScrollMarquee`, `StickyProjectStack`), a narrow-
  viewport (`useNarrowViewport`, ≤640px) fallback that renders static
  markup instead of the animated version.
- `HomePage.tsx`, `FlagshipProjects.tsx`, and `CVSection.tsx` are now
  code-split with `React.lazy`/`Suspense` so framer-motion's weight stays
  out of the initial bundle.

### Bugs Fixed During This Pass

- Accessibility: `ScrollMarquee` originally wrapped each tile in a
  focusable `<Link>` inside an `aria-hidden="true"` row — hidden from
  screen readers but still keyboard-focusable, a real WCAG violation.
  Replaced with plain non-interactive `<div>` tiles (the marquee is
  decorative; every project is already reachable via the stack, spread,
  and archive).
- Bundle-splitting leak: moved the home page's flagship section
  (`id="projects"`) into `FlagshipProjects.tsx`, which was correctly
  lazy-loaded — but `HomePage.tsx` also statically
  imported a small constant (`FLAGSHIP_COUNT`) from that same file,
  which forced Rollup to bundle the whole component, and framer-motion
  with it, into the main chunk anyway (508KB vs. a 372KB baseline,
  tripping Rollup's 500kB warning). Fixed by moving the constant into
  its own minimal file, `src/data/flagship.ts`.
- Hash-anchor navigation to lazy-loaded sections: rewrote
  `useHashScroll` to retry via `MutationObserver` (up to 2s) instead of a
  single `getElementById` call, since `#projects`/`#cv` may not exist in
  the DOM yet if their chunk hasn't finished loading.

### Verification

- `npm run typecheck`, `npm test`, `npm run build` all pass; main chunk
  372KB / 115KB gzip (framer-motion isolated into a separate
  `use-transform` chunk, 133KB / 44KB gzip, loaded only when a motion
  component actually mounts).
- A dedicated Playwright pass against a mock GitHub Pages server (real
  404 handling, not `vite preview`'s SPA fallback) covered: marquee tile
  rendering, direct hash navigation to the lazy `#projects` and `#cv`
  sections, sticky-stack card count and scroll scaling, featured-project
  count still 4+6=10, `prefers-reduced-motion` fallbacks (marquee, stack,
  intro), magnetic-portrait pointer response, touch-device stability, and
  a 5-width overflow sweep — all passed with zero console errors and zero
  horizontal overflow.

### Next Action

- Committed and pushed to `claude/darhous-portfolio-rebuild-sxmb3n` (still
  not merged to `main`). Two items remain open from earlier in this
  session and haven't been resolved: whether Ahmed wants this branch
  merged, and what to do about the Guardian-Nexus project's description,
  which still reflects the old CV's AI/OSINT framing rather than the new
  CV's Ministry of Interior framing.

## Phase 4 — Merge to main, builder-story content pass (2026-07-12)

### Context

Ahmed asked to merge the feature branch into `main` and, from this point
on, develop and push directly to `main` (no more feature-branch/PR
workflow) so he can see changes live immediately. He also re-read the
site and pushed back hard on the copy: every CV-grounded sentence framed
him as only a security/law-enforcement officer, with the 30-project
GitHub portfolio — the actual bulk of the site — never mentioned in the
narrative. His words: he's not just an officer, he's a creative officer,
and he wanted that said somewhere in the profile, forcefully.

### Completed Work

- Merged `claude/darhous-portfolio-rebuild-sxmb3n` into `main` (clean
  merge, no conflicts — the branch's two post-PR commits sat cleanly on
  top of what was already merged) and pushed. Continuing directly on
  `main` from here per Ahmed's instruction.
- Re-extracted `Ahmed-Darhous-CV-source.docx` directly with
  `python-docx` to re-verify every fact against `src/data/profile.ts`
  from the source document itself, not the older `CV_ANALYSIS.md` (which
  was written against a different, earlier PDF). Confirmed experience,
  education, certifications, languages, and core competencies already
  matched the current CV faithfully; found one small gap (the CV's "IT
  Operations: Operating Systems Development and software lifecycles"
  line wasn't in the Technical & Automation competency list) and added
  it.
- Rewrote `profile.summary` (used in both the CV reading-moment and the
  About statement panel) around the dual-identity thesis instead of a
  security-only bio — closing line: "He is not just an officer. He is an
  officer who builds." / Arabic: "فهو ليس مجرد ضابط، بل ضابط مبدع يبني."
- Added a fifth `expertise` domain, Applied Software Engineering &
  Automation, next to the four CV-derived domains — grounded in the CV's
  own Technical Skills section (Udemy-certified VB/HTML/Java) plus the
  real technology range visible across the shipped projects.
- Replaced the About section's flat "Built from the CV, not guesswork."
  disclaimer with "Two careers. One standard of proof." — same honesty
  claim, stated as the section's actual thesis instead of a footnote.
- Added a new Shipped Stack section (`TechStackSection.tsx`,
  `src/data/techStack.ts`): technology tags aggregated and ranked by
  real frequency across all 30 projects' `tech[]` arrays — concrete,
  computed evidence of the programming breadth rather than a claimed
  skills list. Added a `Stack` nav/command-palette entry for it.
- Verified before touching project copy: all 30 projects already had
  real EN/AR descriptions (checked programmatically) — none needed
  invented text, so none were rewritten.
- `.expertise-grid` changed from a fixed 4-column grid to `auto-fit,
  minmax(240px, 1fr)` so a fifth card doesn't leave an awkward orphan
  column at any viewport.

### Verification

- `npm run typecheck`, `npm test`, `npm run build` — all pass.
- Playwright screenshot pass (desktop EN + AR) over About, Expertise,
  the new Stack section, and CV — confirmed the new copy renders
  correctly, the fifth expertise card and stack tag list lay out
  cleanly, and Arabic RTL mirrors the tag counts/labels correctly with
  no overflow.

### Next Action

- Committed and pushed directly to `main` (commit `99487ee`), which
  triggers the GitHub Pages deploy workflow automatically. Still open
  from earlier: what to do about the Guardian-Nexus project description,
  which still reflects the old CV's AI/OSINT framing rather than the new
  CV's Ministry of Interior framing — flagged to Ahmed, not yet
  resolved, not changed without his input.
