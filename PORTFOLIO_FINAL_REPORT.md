# Ahmed Darhous Portfolio Final Report

Status: Completed and deployed on 2026-07-09.

## Links

- GitHub: `https://github.com/Darhous/portofolio`
- Live site: `https://darhous.github.io/portofolio/`
- Branch: `main`

## Commits

- `4375289` - `feat: establish portfolio footer foundation`
- `e6038dc` - `feat: build complete bilingual portfolio`

## Stack

- Vite
- React
- TypeScript
- Lucide React
- GitHub Pages Actions

## Implemented

- Bilingual English/Arabic portfolio with RTL/LTR toggle.
- Cinematic intro with skip, replay, and reduced-motion fallback.
- CV-backed hero, about, expertise, education, certifications, languages, and experience sections.
- GitHub-backed project showcase.
- Official contact section.
- Mandatory shared footer with exact signature and social order.
- SEO metadata, JSON-LD, sitemap, robots.
- Content identity verification script.
- GitHub Pages deployment workflow.

## Verification

- `npm test` - passed.
- `npm run typecheck` - passed.
- `npm run build` - passed.
- Desktop browser QA - passed.
- Mobile browser QA - passed at 390px width.
- Accessibility sanity check - passed.
- GitHub Pages workflow run `29044855746` - success.
- Live HTTP smoke test - `200`.
- Production browser QA - passed.

## Confirmed

- Intro works and has Skip/Replay plus reduced-motion fallback.
- English/Arabic toggle works with RTL/LTR switching.
- Portrait image loads in local and production builds.
- CV download path is present.
- Project cards are sourced from CV, GitHub metadata, or repository README evidence.
- Contact links use the official permanent values.
- Footer displays `Designed & Developed by Ahmed Darhous`.
- Footer social order is Instagram, LinkedIn, Facebook, WhatsApp, GitHub.
