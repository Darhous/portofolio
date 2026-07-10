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
