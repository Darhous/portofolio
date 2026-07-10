# QA Report

## 2026-07-10 (part 2) — Full project inventory expansion (16 → 30 projects)

Branch: `claude/darhous-portfolio-rebuild-sxmb3n` (still not merged to `main`).

### Commands

```bash
npm run typecheck   # passed
npm test            # passed — 30/30 project slugs verified in sitemap.xml
npm run build       # passed (JS ~366.8 KB / ~113.4 KB gzip)
```

### What changed

Verified and added Ahmed's full 33-item project list against GitHub,
discovering a second GitHub account (`darhous2023`) in the process. Full
resolution table in `docs/content/PROJECT_DISCOVERY.md`. Notably: this
session's network policy blocks the `vercel.app` domain outright (confirmed
via the agent proxy status endpoint), so no live Vercel URL in this
inventory — including the ones Ahmed gave directly — could be independently
opened from this environment. Their inclusion rests on Ahmed's direct
statement and, where available, the project's own README self-referencing
that URL as its production deployment.

### Automated re-verification (Playwright, Chromium, against the GitHub Pages mock server)

- Project archive renders exactly 30 project cards.
- Category filter ("AI Tools") narrows to exactly the 4 expected cards (AI Mentor, Prompt Studio, Claude Code Prompt Generator, Nano Banana Prompt Lab).
- NexaLearn case study (`/projects/darhous-ai-cloud-academy`) renders correctly with the expanded README-sourced content.
- Elfady Car Trading case study (`/projects/elfady-car-trading`) renders correctly with the full rewritten case study.
- Fenrir case study (an "Owner-provided," no-public-repo entry) correctly shows the updated "No public link available" copy instead of a broken or misleading link.
- Arabic archive page — RTL, no overflow, new copy renders correctly.
- Homepage featured section — corrected from an unintended 11 down to the intended 10 featured cards (a `featured: true` typo on "NexaLearn AI Academy" was caught and fixed during this QA pass — it should not have been featured per Ahmed's own display rule and is now archive-only).

No console errors, no unexpected 404s, no horizontal overflow across any of the above. Screenshots `19`–`25` added to `docs/qa/screenshots/`.

---

## 2026-07-10 (part 1) — Multi-page rebuild (routing, archive, case studies, contact, command palette)

Branch: `claude/darhous-portfolio-rebuild-sxmb3n` (not yet merged to `main` —
`https://darhous.github.io/portofolio/` still serves the 2026-07-09 build
until this branch is merged; all QA below ran against local builds of this
branch, not against the live production URL).

### Commands

```bash
npm ci
npm run typecheck
npm test
npm run build
```

All four passed with no errors. `npm test` additionally verifies every project
`slug` in `src/data/projects.ts` has a matching entry in `public/sitemap.xml`
(16/16 verified).

### Automated browser QA (Playwright, Chromium)

A GitHub Pages simulation server was written for this QA pass
(`gh-pages-mock-server`, not committed) that serves `dist/` under the
`/portofolio/` base path and returns a real HTTP 404 with the contents of
`dist/404.html` for any unmatched path — the same behavior GitHub Pages
uses in production. All checks below ran against that server, not against
`vite preview` (which has its own SPA fallback and would not have caught the
routing bug described below).

Scenarios covered, 1440x900 unless noted:

- Home, English — no console errors, no horizontal overflow.
- Home, Arabic (`dir="rtl"` verified on `.app-shell`) — no console errors, no overflow.
- Home, mobile (390x844) — no overflow; hamburger drawer opens correctly.
- Home, mobile Arabic (390x844) — no overflow.
- Home, small mobile (360x640) — no overflow.
- Home, tablet (820x1180) — no overflow.
- Command palette: opens on `Ctrl/Cmd+K`, search filters results, closes on `Escape`, focus returns to trigger.
- Projects archive (`/projects`): search and category filters both verified.
- **Direct deep link** to `/projects/arabic-legal-research-skill` through the real 404-redirect chain — confirmed the correct case-study heading rendered and the URL was restored to the clean path (this is the GitHub Pages "reload on a nested route" scenario).
- Case study page, mobile (390x844) — no overflow.
- Contact page: empty-submit validation error state, then filled fields — no overflow.
- Contact page, mobile (390x844) — no overflow.
- 404 page via an unmatched route — confirmed redirect to `/404` and correct copy.
- `prefers-reduced-motion: reduce` — intro overlay is skipped entirely, no overflow.

Exactly one HTTP 404 was observed per direct/deep-link navigation in every
scenario above, and it was always the initial document request that the
GitHub Pages SPA-redirect trick depends on (`public/404.html` →
`window.location.replace` → `index.html` restore script →
`history.replaceState`). No unexpected 404s (missing assets, fonts, images)
were found on any page.

Screenshots saved under `docs/qa/screenshots/` (`01-` through `18-`).

### Bug found and fixed during this QA pass

The mobile hamburger drawer (`.mobile-nav-overlay`, `position: fixed; inset: 0`)
was rendered as a DOM child of `<header class="topbar">`, and `.topbar` has
`backdrop-filter: blur(16px)`. A `backdrop-filter` on an ancestor creates a
new containing block for `position: fixed` descendants, so the drawer's
`inset: 0` was resolving against the ~72px-tall header box instead of the
viewport — the drawer rendered squashed at the top of the page instead of as
a full-height side panel. Fixed by rendering the drawer through
`createPortal(..., document.body)` in `src/components/Header.tsx`, so it is
no longer a descendant of any filtered/transformed ancestor. Verified fixed
with a before/after screenshot.

### Accessibility

- Skip link present and functional.
- All interactive drawer/palette overlays trap focus and restore it to the trigger on close (`useFocusTrap`).
- `Escape` closes both the mobile drawer and the command palette.
- Single `h1` per page (verified on home, archive, case study, contact, 404).
- Reduced motion removes the intro overlay and disables transition/animation durations globally.
- Logical CSS properties (`inset-inline-*`) used throughout new components so RTL mirrors automatically without duplicated rules.

### Footer identity checks (unchanged, still enforced by `npm test`)

- Exact signature: `Designed & Developed by Ahmed Darhous`.
- `Ahmed Darhous` links to `mailto:ahmeddarhous@gmail.com`.
- Social order: Instagram, LinkedIn, Facebook, WhatsApp, GitHub.
- External links use `target="_blank"` and `rel="noopener noreferrer"`.

### Performance notes

Production build output:

- HTML: ~2.5 KB
- CSS: ~17.8 KB (~4.5 KB gzip)
- JavaScript: ~334 KB (~105 KB gzip) — grew from the previous build after adding `react-router-dom`, the command palette, the project archive/search, and the case-study/contact pages. Still a single JS chunk; code-splitting per route was not added in this pass and is a reasonable follow-up if bundle size becomes a concern.

### Known, accepted limitations

- No headless Lighthouse run was performed in this environment (no network
  path to a Lighthouse CI runner was set up); the manual Playwright checks
  above cover the functional equivalents (console errors, overflow,
  accessibility basics, reduced motion). A future session with Lighthouse
  CI access should run it against the production URL.
- The contact "form" intentionally has no backend: it builds a `mailto:` /
  `wa.me` link client-side. This is correct for a static GitHub Pages site,
  but it means an inquiry only actually sends once the visitor's own email
  client or WhatsApp completes the send — there is no server-side delivery
  confirmation.

---

## 2026-07-09 — Initial bilingual portfolio build (prior session)

Production URL: `https://darhous.github.io/portofolio/`
Latest tested deployment run: `29046650767`

### Commands

```powershell
npm run typecheck --if-present
npm run test --if-present
npm run build
```

All commands passed.

### Browser QA

Tested with the in-app browser against production.

#### Desktop Viewport

- Viewport: 1440 x 1000
- Horizontal overflow: none
- Hero headline fits inside the tested first viewport
- Hero image served as WebP: `ahmed-darhous-640.webp`
- Console errors: none

#### Mobile Viewport

- Viewport: 390 x 844
- Horizontal overflow: none
- Replay intro button moved away from bottom copy area
- Hero image served as WebP: `ahmed-darhous-640.webp`
- Console errors: none

### Accessibility Checks

- Single `h1`.
- Semantic `main`, `section`, `nav`, and `footer` structure.
- Skip link exists.
- Focus offsets exist for sticky navigation.
- No unnamed buttons found.
- No unnamed links found.
- No image missing alt text found.
- No interactive target below 24 x 24 px found in production QA.
- Reduced-motion fallback exists for cinematic intro and transitions.
- RTL/LTR switching exists at app shell level.

### Deployment QA

- GitHub Pages source: GitHub Actions
- Workflow: `.github/workflows/deploy.yml`
- Vite base path: `/portofolio/`
- Production URL verification step: passed
