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

### Next Action

- Commit and push this session's work, confirm the GitHub Actions deployment succeeds, and spot-check the live production URL.
