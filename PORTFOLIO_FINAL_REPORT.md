# Ahmed Darhous Portfolio Final Report

Status: Multi-page rebuild completed and pushed on 2026-07-10. **Not yet
merged to `main`**, so `https://darhous.github.io/portofolio/` still serves
the 2026-07-09 single-page build until this branch is merged (GitHub Pages
deploys only from `main`; this session's branch instructions require staying
on the feature branch and not opening a PR unless asked).

## Links

- GitHub: `https://github.com/Darhous/portofolio`
- Branch (this session's work): `claude/darhous-portfolio-rebuild-sxmb3n`
- Live site (currently serving the prior build): `https://darhous.github.io/portofolio/`
- Latest commit on the branch: `4155077` — `feat(portfolio): rebuild into multi-page app with project archive, case studies, command palette, and contact form`

## What Changed In This Session

### Discovery (honest, evidence-based)

Re-checked GitHub directly for every project name given as "known real
projects":

- `career-ops` and `atsresume` — **no such repositories exist**. The real,
  working ATS feature is the ATS Resume Analyzer inside
  `Darhous-career-hub-google`; the portfolio project is now titled
  "Darhous Career Hub — ATS Resume Analyzer" so that feature is front and
  center.
- `Shemo Studio` — confirmed real (`Shemo-Studio`, PHP/WordPress). Added.
- `Darhous Project Lab`, `Fenrir`, `AI Memory Vault` — **not found** under
  the `Darhous` GitHub account. Not included, not invented.
- `Elfady Car Trading` — the `elfady` repository exists but is **public and
  empty**. Listed honestly with an "Early" status instead of being shown as
  complete or omitted entirely.

Also found and added real projects that were missing from the previous
inventory: `almasa-lab-proposal` (a client digital-transformation proposal
for a medical laboratory — now featured), `darhous-assessment`,
`Exams_Platform`, `darhous-marketing-social-hub`, `whatsapp-auto-poster`.
Full sourcing detail: `docs/content/PROJECT_DISCOVERY.md`.

The project catalog grew from 9 to **16 projects**, 7 of them featured.

### Architecture

- Converted the single anchored page into a multi-page `react-router-dom`
  app: `/`, `/projects` (searchable/filterable archive), `/projects/:slug`
  (full case-study page per project — context, problem, constraints,
  approach, features, challenges/solutions, results, status, lessons,
  related projects), `/contact`, and `/404`.
- Implemented the standard GitHub Pages SPA routing trick
  (`public/404.html` redirect + a restore script at the top of
  `index.html`) so deep links and page reloads work on nested routes
  without any server-side rewrite support.
- Added a `Ctrl/Cmd+K` command palette covering navigation, all 16
  projects, and quick actions (download CV, email, WhatsApp, toggle
  language, back to top).
- Replaced the old horizontal-scroll mobile nav with a real hamburger +
  slide-in drawer, with focus trap and `Escape`-to-close.
- Built a structured, static-compatible contact form (name, email, project
  type, budget, message) that generates `mailto:`/`wa.me` links client-side
  — no backend, no API keys, no secrets — with validation, success/error
  states, and a honeypot field.
- Added per-route SEO (title/description/canonical/OG via a small
  `usePageMeta` hook) and per-project `CreativeWork` JSON-LD.
- Extended `public/sitemap.xml` to cover every route/project, and extended
  `scripts/verify-content.mjs` to assert every project slug has a sitemap
  entry (currently 16/16).
- Added a favicon (the site previously had none).

## Stack

- Vite, React 19, TypeScript, `react-router-dom`, Lucide React
- GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`, unchanged in this session)

## Verification

- `npm ci` — passed
- `npm run typecheck` — passed
- `npm test` (footer/identity checks + sitemap-slug check) — passed, 16/16 slugs verified
- `npm run build` — passed (JS bundle ~334 KB / ~105 KB gzip, up from the prior single-page build after adding routing, the archive, case studies, the command palette, and the contact form)
- Playwright QA against a local server that replicates GitHub Pages' real
  404 behavior (not `vite preview`, which has its own SPA fallback and would
  have hidden the routing bug below): 18 scenarios across desktop / tablet /
  mobile / small-mobile, English / Arabic, command palette open/search/close,
  archive search + category filters, a genuine deep-link reload through the
  404-redirect chain, contact-form validation, the 404 page, and
  `prefers-reduced-motion`. No console errors, no unexpected 404s (only the
  one expected redirect-trick 404 per deep link), no horizontal overflow.
  Screenshots: `docs/qa/screenshots/01`–`18`.

### Bug found and fixed during QA

The mobile drawer overlay was a DOM child of `<header class="topbar">`,
which has `backdrop-filter: blur(16px)`. That property makes the header a
CSS containing block for `position: fixed` descendants, so the drawer's
`inset: 0` sized itself to the ~72px header instead of the viewport — it
rendered squashed at the top of the page instead of as a full-height side
panel. Fixed by rendering the drawer through `createPortal(...,
document.body)`. Verified fixed with before/after screenshots.

## Confirmed

- All 16 projects are real and sourced from GitHub metadata/READMEs or the
  CV — nothing invented, nothing shown as complete when it isn't (`elfady`
  is explicitly marked "Early" with no fabricated features).
- Footer displays `Designed & Developed by Ahmed Darhous`, links to
  `mailto:ahmeddarhous@gmail.com`, social order Instagram → LinkedIn →
  Facebook → WhatsApp → GitHub — unchanged and still enforced by `npm test`.
- CV download/open still present (Hero, CV section, footer, contact page).
- Contact page works without a backend and without exposing secrets.
- Deep links and page reloads on nested routes work through the GitHub
  Pages 404 trick — verified against a server that reproduces GitHub
  Pages' actual 404 behavior, not just `vite preview`.
- Arabic/RTL renders correctly across the new pages (archive, case study,
  contact, 404), verified with automated overflow and `dir` checks plus
  screenshots.

## Known, Honestly-Tracked Limitations

- **Not yet on production.** This branch has not been merged to `main`, per
  this session's explicit instruction to stay on
  `claude/darhous-portfolio-rebuild-sxmb3n` and not open a pull request
  unless asked. `https://darhous.github.io/portofolio/` still serves the
  2026-07-09 build. Merging (or opening a PR) is the next decision for
  Ahmed to make.
- No Lighthouse CI run was performed in this environment (no Lighthouse
  runner was available); the Playwright checks above cover the functional
  equivalents but not a numeric Lighthouse score.
- Several archive-only projects (`Shemo-Studio`, `darhous-assessment`,
  `Exams_Platform`, `darhous-marketing-social-hub`, `whatsapp-auto-poster`,
  `elfady`) have thin public evidence (no README, or an empty repo) and are
  described only as far as the evidence allows — they were not padded out
  with invented detail.
- The JS bundle grew to ~334 KB (~105 KB gzip) after adding routing and the
  new pages; it is still a single chunk. Route-level code splitting is a
  reasonable follow-up if this becomes a real-world performance concern,
  but was not necessary for correctness or the checks above.
- The contact form has no server-side delivery confirmation by design
  (static site, no backend) — it hands off to the visitor's email client or
  WhatsApp.
