# Ahmed Darhous Portfolio Final Report

Status: Completed and deployed on 2026-07-09.

## Links

- GitHub: `https://github.com/Darhous/portofolio`
- Live site: `https://darhous.github.io/portofolio/`
- Branch: `main`

## Commits

- `4375289` - `feat: establish portfolio footer foundation`
- `e6038dc` - `feat: build complete bilingual portfolio`
- `d51ada7` - `ci: harden vite pages deployment`
- `69b16b1` - `fix: quote pages workflow base path check`
- `5b0b54a` - `docs: add portfolio content inventory`
- `e5cde73` - `feat: add optimized cv and case study sections`
- `8458aa2` - `fix: polish hero responsive viewport`
- `2cc6854` - `fix: fit hero headline in desktop viewport`
- `a0a6c8a` - `fix: complete hero headline viewport fit`
- `8df1d8c` - `test: add production qa screenshots`

## Stack

- Vite
- React
- TypeScript
- Lucide React
- GitHub Pages Actions
- Deployment workflow: `.github/workflows/deploy.yml`

## Implemented

- Bilingual English/Arabic portfolio with RTL/LTR toggle.
- Cinematic intro with skip, replay, and reduced-motion fallback.
- CV-backed hero, about, expertise, education, certifications, languages, and experience sections.
- GitHub-backed project showcase.
- Dedicated CV section with open/download actions.
- Featured case-study section for source-backed projects.
- Optimized WebP portrait variants with PNG fallback.
- Full CV analysis, project discovery, and content inventory docs.
- Official contact section.
- Mandatory shared footer with exact signature and social order.
- SEO metadata, JSON-LD, sitemap, robots.
- Content identity verification script.
- GitHub Pages deployment workflow.
- Production URL verification inside the GitHub Actions deploy job.

## Verification

- `npm test` - passed.
- `npm run typecheck` - passed.
- `npm run build` - passed.
- Desktop browser QA - passed.
- Mobile browser QA - passed at 390px width.
- Accessibility sanity check - passed.
- GitHub Pages workflow run `29044855746` - success.
- Final deployment workflow includes Vite base path `/portofolio/` and production URL verification.
- GitHub Pages workflow run `29045398557` - success, including production URL verification.
- Live HTTP smoke test - `200`.
- Production browser QA - passed.
- Production QA screenshots saved:
  - `docs/qa/screenshots/production-desktop.png`
  - `docs/qa/screenshots/production-mobile.png`
- QA report saved: `docs/qa/QA_REPORT.md`
- GitHub Pages workflow run `29046773917` - success, including production URL verification after QA artifacts.

## Confirmed

- Intro works and has Skip/Replay plus reduced-motion fallback.
- English/Arabic toggle works with RTL/LTR switching.
- Portrait image loads in local and production builds.
- Optimized WebP portrait is selected in production browser QA.
- CV download path is present.
- Dedicated CV section is present.
- Case-study section is present.
- Project cards are sourced from CV, GitHub metadata, or repository README evidence.
- Contact links use the official permanent values.
- Footer displays `Designed & Developed by Ahmed Darhous`.
- Footer social order is Instagram, LinkedIn, Facebook, WhatsApp, GitHub.
