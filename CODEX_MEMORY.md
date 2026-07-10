# Codex Memory For Ahmed Darhous Portfolio

Last updated: 2026-07-09

## Permanent Identity Rules

- Owner identity: Ahmed Darhous.
- Required footer signature: `Designed & Developed by Ahmed Darhous`.
- In the signature, `Ahmed Darhous` must be clickable and must point to `mailto:ahmeddarhous@gmail.com`.
- Every page must render the shared `Footer` component.
- The footer must include copyright, a dynamically generated current year, Download CV, Contact, Back To Top, social icons, responsive layout, and RTL/LTR support.

## Official Contact Links

- Email: `mailto:ahmeddarhous@gmail.com`
- Phone: `tel:+201030002331`
- WhatsApp: `https://wa.me/201030002331`
- GitHub: `https://github.com/Darhous`
- Portfolio Repository: `https://github.com/Darhous/portofolio`
- LinkedIn: `https://www.linkedin.com/in/darhous/`
- Facebook: `https://www.facebook.com/ahmed.darhous`
- Instagram: `https://www.instagram.com/darhous/`

## Mandatory Social Order

All footer and contact social links must be displayed in this exact order:

1. Instagram
2. LinkedIn
3. Facebook
4. WhatsApp
5. GitHub

## Technical Decision

- Official identity and links are centralized in `src/config/site.ts`.
- Shared external links should use `src/components/ExternalLink.tsx`, which applies `target="_blank"` and `rel="noopener noreferrer"`.
- Social rendering should use `src/components/SocialLinks.tsx`, which reads the mandatory order from the centralized config.
- Footer rendering should use `src/components/Footer.tsx`.

## Current State

- The portfolio uses Vite, React, TypeScript, and `lucide-react`.
- Static assets are copied to `public/Profile.pdf` and `public/ahmed-darhous.png` for production builds.
- The original root files `Profile.pdf` and `CE933E3B-D6AB-4FD6-A89B-651BD7022FB8.PNG` are preserved.
- Git is initialized and connected to `https://github.com/Darhous/portofolio`.
- GitHub Pages is deployed from the workflow at `https://darhous.github.io/portofolio/`.
- Latest implementation commit: `e6038dc`.
- Latest deployment workflow commit: `69b16b1`.
- Latest completion checkpoint commit: `8df1d8c`.
- Verification passed: `npm test`, `npm run typecheck`, `npm run build`, desktop/mobile browser QA, and production smoke test.
- Deployment source is GitHub Actions. Do not use Jekyll.
- Workflow path is `.github/workflows/deploy.yml`; it deploys Vite `dist` with base path `/portofolio/` and verifies `https://darhous.github.io/portofolio/` after deployment.
- Workflow run `29045398557` succeeded after fixing YAML quoting for the base-path check.
- Completion additions:
  - `docs/content/CV_ANALYSIS.md`
  - `docs/content/PROJECT_DISCOVERY.md`
  - `docs/content/CONTENT_INVENTORY.md`
  - optimized WebP portrait variants under `public/`
  - dedicated CV section
  - featured case-study section
  - `docs/qa/QA_REPORT.md`
  - `docs/qa/screenshots/production-desktop.png`
  - `docs/qa/screenshots/production-mobile.png`
- Workflow run `29046773917` succeeded after QA screenshot artifacts.

## 2026-07-10 Update (multi-page rebuild)

- The single-page site was extended into a multi-page `react-router-dom` app: `/`, `/projects` (searchable/filterable archive of all 16 known projects), `/projects/:slug` (full case study pages), `/contact` (structured mailto/WhatsApp compose form), and `/404`.
- GitHub Pages SPA routing is handled by `public/404.html` + a restore script in `index.html` (the standard `rafgraph/spa-github-pages` pattern). Verified end-to-end with a local mock server that replicates GitHub Pages' real 404 behavior — direct navigation and reload on nested routes both work.
- Added a `Ctrl/Cmd+K` command palette (`src/components/CommandPalette.tsx`) and replaced the old horizontal-scroll mobile nav with a real hamburger drawer (`src/components/Header.tsx`).
- Found and fixed a real bug during QA: the mobile drawer was a DOM child of `<header class="topbar">`, which has `backdrop-filter`; that creates a containing block for `position: fixed` descendants, so the full-screen drawer overlay was sizing itself to the header's box instead of the viewport. Fixed with `createPortal(..., document.body)`.
- Re-verified the specific project names the owner listed as "known real projects": `career-ops` and `atsresume` do not exist as separate GitHub repos — the real, working ATS feature lives inside `Darhous-career-hub-google` and the portfolio now titles that project "Darhous Career Hub — ATS Resume Analyzer" to match. `elfady` exists but is an empty public repo, listed honestly as early-stage. `Darhous Project Lab`, `Fenrir`, and `AI Memory Vault` were not found under the `Darhous` GitHub account and were not invented. Full detail in `docs/content/PROJECT_DISCOVERY.md`.
- Added real projects that were missing from the previous inventory: `almasa-lab-proposal` (featured — a client digital-transformation proposal for a medical laboratory, built as an interactive decision log), `Shemo-Studio`, `darhous-assessment`, `Exams_Platform`, `darhous-marketing-social-hub`, `whatsapp-auto-poster`.
- `scripts/verify-content.mjs` now also checks that every project `slug` in `src/data/projects.ts` has a matching URL in `public/sitemap.xml` (16/16 passing).
- Latest verification: `npm ci`, `npm run typecheck`, `npm test`, `npm run build` all pass. Playwright QA covered desktop/mobile/tablet, EN/AR, command palette, archive search/filter, a real deep-link reload through the GitHub Pages 404 trick, contact form validation, 404, and reduced motion — no console errors, no horizontal overflow.
