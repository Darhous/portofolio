# Ahmed Darhous Portfolio Master Plan

Last updated: 2026-07-10

## Station Status

| Station | Goal | Status | Verification |
|---|---|---|---|
| 0 | Repository, memory, skills, CV, image, GitHub discovery | Completed | `Profile.pdf` extracted and rendered; portrait inspected; GitHub repos queried |
| 1 | Persistent docs and execution plan | Completed | `AGENTS.md`, `CODEX_MEMORY.md`, this plan, and implementation log created |
| 2 | Information architecture and content model | Completed | `src/data/profile.ts`, `src/data/projects.ts`, `src/data/content.ts` |
| 3 | Original visual identity and design system | Completed | `src/styles.css`, `DESIGN_SYSTEM.md` |
| 4 | Technical foundation | Completed | Vite, React, TypeScript, config, assets |
| 5 | Intro and hero | Completed | `Intro`, `Hero`, reduced-motion fallback |
| 6 | About, expertise, education, experience | Completed | CV-backed profile sections |
| 7 | Projects and case studies | Completed | GitHub/README/CV sourced project cards |
| 8 | CV, contact, footer | Completed | Centralized links, CV download, shared footer |
| 9 | Motion and responsive polish | Completed | CSS responsive rules and reduced motion |
| 10 | Accessibility, SEO, performance | Completed | Metadata, JSON-LD, sitemap, robots, semantic sections, browser checks |
| 11 | Automated testing and QA | Completed | `npm test`, `npm run typecheck`, `npm run build`, browser QA |
| 12 | GitHub Pages deployment | Completed | Workflow run `29044855746` succeeded |
| 13 | Final audit and report | Completed | `PORTFOLIO_FINAL_REPORT.md` updated after deployment |
| 14 | Re-discovery against owner-named projects (career-ops, ATS Resume, Darhous Project Lab, Elfady, Fenrir, AI Memory Vault) | Completed | `docs/content/PROJECT_DISCOVERY.md` 2026-07-10 section; nothing invented for names with no GitHub evidence |
| 15 | Multi-page architecture: project archive, per-project case-study pages, contact page, 404 page | Completed | `react-router-dom`, `src/pages/*`, `public/404.html` + `index.html` restore script, verified with a GitHub Pages 404-behavior mock server |
| 16 | Command palette, hamburger mobile nav, structured contact form, per-route SEO/JSON-LD, sitemap | Completed | `src/components/CommandPalette.tsx`, `src/components/Header.tsx`, `src/components/ContactForm.tsx`, `src/hooks/usePageMeta.ts`, `public/sitemap.xml` |
| 17 | Automated QA pass with real bug fix (mobile drawer containing-block bug) | Completed | `docs/qa/QA_REPORT.md` 2026-07-10 section, `docs/qa/screenshots/01`–`18` |
| 18 | Full 33-item project inventory pass: second GitHub account discovered, catalog grown 16 → 30 | Completed | `docs/content/PROJECT_DISCOVERY.md` 2026-07-10 part 2 section; `docs/qa/screenshots/19`–`25` |

## Completion Addendum

- Full CV analysis documented in `docs/content/CV_ANALYSIS.md`.
- Visible GitHub project discovery documented in `docs/content/PROJECT_DISCOVERY.md`.
- Content inventory documented in `docs/content/CONTENT_INVENTORY.md`.
- Optimized portrait WebP variants added under `public/`.
- Dedicated CV and case-study sections added.
- Production QA screenshots and report added under `docs/qa`.
- Latest verified deployment run after QA artifacts: `29046773917`.

## Permanent Constraints

- Footer signature must be exactly `Designed & Developed by Ahmed Darhous`.
- `Ahmed Darhous` must link to `mailto:ahmeddarhous@gmail.com`.
- Official social order: Instagram, LinkedIn, Facebook, WhatsApp, GitHub.
- Official contact links must stay centralized in `src/config/site.ts`.
- External links must use `target="_blank"` and `rel="noopener noreferrer"`.

## Next Action

Future work should refine content depth and visual assets without breaking
centralized identity, contact, footer, deployment, social-order, or routing
rules (see the "Routing" section in `AGENTS.md`). Remaining, honestly-tracked
gaps: no Lighthouse CI run yet in this environment; several archive-only
projects (`Shemo-Studio`, `darhous-assessment`, `Exams_Platform`,
`darhous-marketing-social-hub`, `whatsapp-auto-poster`, `elfady`) have thin
public evidence and should be expanded only if Ahmed adds real READMEs,
screenshots, or live links to those repositories.
