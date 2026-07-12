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

## 2026-07-10 Update, Part 2 (33-item inventory pass)

- **Ahmed has two GitHub accounts.** `Darhous` (used for all prior discovery) and `darhous2023` (newly discovered). Always check both before saying a project "was not found."
- `Elfady Car Trading` is real and lives at `darhous2023/fady` (89 commits, live at `fady-delta.vercel.app` per its own README) — NOT the empty `Darhous/elfady` repo found earlier. Now featured with a full case study.
- `darhous2023/flutter_test` (Elfady's Android app) and `Darhous/elfady` both exist but are empty — listed honestly as early-stage, not invented.
- **This session's network policy blocks `vercel.app` entirely.** Every live Vercel URL in the portfolio (Elfady, NexaLearn and all its sub-routes) could not be opened directly from this environment — confirmed via the agent proxy status endpoint (403 policy denial, not a site error). Their live links are included on the strength of Ahmed's direct statement and, where possible, README self-references — not independent verification by this session. Do not assume a future session can re-verify these without a different network policy.
- `career-ops` / `ATS Resume` — still no separate repo; maps to `Darhous-career-hub-google`'s ATS Resume Analyzer feature.
- `Darhous Project Lab`, `NutriBox Healthy Kitchen OS`, `Fenrir Cybersecurity Projects` — not found under either known GitHub account. `NutriBox` and `Fenrir` were added anyway as `source: "Owner-provided"` entries using only Ahmed's direct description (no invented repo, screenshots, or metrics). `Darhous Project Lab` was not added at all — still zero evidence of any kind.
- NexaLearn (`darhous-ai-cloud-academy`) is now the umbrella brand: 7 portals (AI Academy, Language Assessment [featured], Digital Exams [featured], Career Hub, Automation Academy, IoT Lab, Nano Banana Prompt Lab) each get their own archive entry per Ahmed's display rule; only AI Mentor, Prompt Studio, and Claude Code Prompt Generator get independent AI-Studio-tool entries — the rest of the 14 AI Studio tools live only inside the NexaLearn case study's feature list.
- Project catalog: 30 total, 10 featured. Full resolution table: `docs/content/PROJECT_DISCOVERY.md`.
- Still not merged to `main` — same branch constraint as before.

## 2026-07-10 Update, Part 3 (premium editorial visual rebrand)

- **The CV in `src/data/profile.ts` now reflects `Ahmed_Darhous_CV.docx`
  (uploaded 2026-07-10), not the earlier `Profile.pdf`.** Job titles are
  "Senior Liaison & External Relations Officer" / "Operations & Deployment
  Coordinator" / "Criminal Investigation Officer," all at "Ministry of
  Interior." There is no OSINT/LLM/AI-operations content in this CV —
  technical skills are VB, HTML, Java, and admin-report scripting only. If
  a future CV update reintroduces AI/security-engineering claims, reconcile
  carefully rather than assuming the older framing still applies.
- The uploaded portrait is the same photo as before (verified by MD5) —
  don't assume a new upload means new photo content without checking.
- **LibreOffice headless docx→PDF conversion does not work in this sandbox**
  ("source file could not be loaded" regardless of input). `public/Profile.pdf`
  is generated directly from CV content with Python `fpdf2`
  (see the CV rebuild for the script pattern) — do not assume `soffice
  --convert-to pdf` will work here.
- Visual identity is now "premium editorial," not "command surface" — deep
  matte black, Fraunces serif + Inter body, one accent color per project
  category (`src/data/accents.ts`), no neon/glow/glass. Full detail in
  `DESIGN_SYSTEM.md`. Do not reintroduce the old cyan/copper/olive palette
  or the boot-sequence intro unless explicitly asked.
- Hero intentionally has no stat counters (years/personnel/project-count) —
  this was in an earlier version and was explicitly removed per Ahmed's
  "no unnecessary statistics" instruction. Don't re-add them.

## 2026-07-12 Update (motion/interaction layer, phase 3)

- Ahmed sent a much heavier redesign brief (Kanit font, metallic-gradient
  headings, glowing purple/magenta CTA, full-screen cinematic hero) that
  directly contradicted the calm editorial system above. He chose the
  "structural ideas only, same calm colors" option: framer-motion-based
  marquee/sticky-stack/magnetic-portrait/scroll-reveal-text, but no
  Tailwind migration, no Kanit, no gradients, no glow. **Do not introduce
  Kanit, metallic gradients, or glowing buttons unless he explicitly
  reverses this decision.**
- `framer-motion` is now a real dependency. All motion components live in
  `src/components/motion/` and must each have a `prefers-reduced-motion`
  fallback; the two heaviest (`ScrollMarquee`, `StickyProjectStack`) also
  fall back to static markup below a 640px viewport via
  `useNarrowViewport()`.
- Gotcha for future lazy-loaded sections: don't co-locate a plain
  constant with a framer-motion component in the same file if anything
  else needs to statically import that constant — Rollup will drag the
  whole component (and framer-motion) into the main chunk regardless of
  `React.lazy`. Keep shared constants in their own file
  (`src/data/flagship.ts` is the existing example).
- `useHashScroll` now retries via `MutationObserver` for up to 2s — needed
  once `#projects`/`#cv` moved into lazy-loaded chunks that may not have
  mounted yet when the hash changes.
- Still open, unresolved from earlier sessions: whether to merge this
  branch to `main`, and what to do about Guardian-Nexus's description
  still reflecting the old CV's AI/OSINT framing instead of the new CV's
  Ministry of Interior framing. Don't silently resolve either — ask.

## 2026-07-12 Update, Part 2 (merged to main; workflow changed)

- **Ahmed explicitly asked to merge the feature branch into `main` and to
  develop directly on `main` from now on** — no more feature-branch/PR
  workflow, push straight to `main` so he can see changes live
  immediately. This branch was merged (`aae6b3a`), and this and all
  subsequent work is committed and pushed straight to `main`. Don't
  revert to a feature-branch workflow unless he asks for one again.
- Re-verified `src/data/profile.ts` against a fresh `python-docx`
  extraction of `Ahmed-Darhous-CV-source.docx` itself (not the older
  `CV_ANALYSIS.md`, which documents a different, earlier PDF and is
  stale — don't treat it as current). Everything already matched except
  one missing Technical & Automation item ("Operating Systems & Software
  Lifecycle"), now added.
- Ahmed pushed back hard: the site's copy talked about him only as a
  security/law-enforcement officer and never mentioned the 30-project
  GitHub portfolio that is the actual bulk of the site. He wants it
  clear he's "not just an officer, but a creative officer" — this is now
  the closing line of `profile.summary`: "He is not just an officer. He
  is an officer who builds." Don't walk this framing back to a
  security-only bio without him asking.
- Added a 5th `expertise` domain (Applied Software Engineering &
  Automation) and a new "Shipped Stack" section
  (`src/components/TechStackSection.tsx` + `src/data/techStack.ts`) that
  computes real technology-usage frequency across all 30 projects — real
  computed evidence, not a hand-written skills list. If new projects are
  added later, this section updates itself automatically from
  `projects[].tech`; no manual maintenance needed.
- All 30 project descriptions were verified complete (EN+AR) before this
  pass — none were missing or thin, so none needed invented copy.

## 2026-07-12 Update, Part 3 (reversed the "calm colors" decision)

- **Ahmed explicitly reversed the earlier "structural ideas only, same
  calm colors" decision.** After seeing the calm monochrome system live,
  he said the colors were "very very very bad" and asked for the full
  color/effects/animation treatment from the heavier "Jack 3D Creator"
  brief — explicitly scoped to colors, effects, and motion, not
  typography (Fraunces/Inter stayed; he never asked to change fonts).
  **The "no gradients/no glow" rule from the 2026-07-10 visual rebrand is
  no longer in effect — don't reintroduce the old monochrome palette
  without him asking again.**
- New token system in `styles.css` `:root`: `--night:#0c0c0c`,
  `--ink:#d7e2ea` (cool light blue-gray, replacing the old warm cream),
  `--gradient-heading: linear-gradient(180deg,#646973 0%,#bbccd7 100%)`
  applied to `h1` and every `.section-header h2` via `background-clip:
  text`, `--gradient-cta` (purple/magenta/orange) + `--glow-cta` applied
  to `.primary-action`, `--radius-card: 32px` applied to all card
  shells (`.stack-card`, `.feature-row`, `.project-card`,
  `.statement-panel`, `.compact-panel`).
- `ExpertiseSection` is now a white-background "Services"-style numbered
  list (`.expertise-panel`, rounded-top pulled up over the previous dark
  section) instead of a dark bordered-card grid — the one place on the
  site with light text-on-white. It's now lazy-loaded since it uses
  `FadeIn` (framer-motion) for a staggered per-row reveal.
- Wired the previously-unused `FadeIn` component's *effect* into the
  Hero via plain CSS `@keyframes` (not the framer-motion component
  itself) so Hero stays framer-motion-free and out of the critical
  bundle: `.topbar` fades down, `h1`/subtitle/lede/actions/portrait fade
  up with staggered `animation-delay`, respecting
  `prefers-reduced-motion`.
- `AnimatedText` (`src/components/motion/AnimatedText.tsx`) is now true
  character-by-character (was word-by-word) to match the brief exactly —
  confirmed fine performance-wise even at 600+ characters (the CV
  summary paragraph).
- Fixed a real duplicate-content bug Ahmed found: `ContactSection` (home
  page) and `Footer` (global, renders right after it) both rendered
  `<SocialLinks />` — removed it from `ContactSection` since `Footer`
  already shows it on every page.

## 2026-07-12 Update, Part 4 ("content station" pass — real project images)

- Ahmed liked the design but flagged three content gaps: not every
  project card animated, the builder/programming identity needed to
  show up right under the Hero (not just buried in About/Expertise),
  and every project needed a real image — with an explicit instruction
  to make one for any project that doesn't have a real photo.
- **This sandbox's network policy blocks general internet access**
  (confirmed via `$HTTPS_PROXY/__agentproxy/status` — `darhous.github.io`
  and `opengraph.githubassets.com` both get `403 policy denial`), so
  fetching real screenshots or GitHub's repo social-preview images was
  not possible. Rather than fabricate fake product screenshots (which
  this whole project has consistently refused to do), generated a
  **designed cover card** per project instead — clearly a branded
  cover, not a fake UI screenshot. Built with an HTML/CSS template
  (`Fraunces`/`Inter` from the site's actual local font files, the
  project's real accent color, category, and name) rendered via
  Playwright and converted to WebP with Python Pillow. All 30 live in
  `public/projects/{slug}.webp` (~25KB each), referenced via
  `getProjectImage(slug)` in `src/data/projectImages.ts`. **If Ahmed
  ever supplies real screenshots for any project, replace the file at
  that path — nothing else needs to change.**
- These images now render in every project surface that previously had
  none or used a live-CSS monogram: `StickyProjectStack`, `ProjectsSection`
  (feature rows), `ScrollMarquee` tiles, `ProjectCard` (archive grid —
  this one had **no visual at all** before), and a new banner on
  `ProjectCaseStudyPage` (which also had none before).
- Added `src/hooks/useInView.ts` (plain `IntersectionObserver`, no
  framer-motion) so `.feature-row` and `.project-card` — the two
  project-card surfaces that weren't already framer-motion components —
  get a staggered scroll-reveal fade-up without adding to the bundle.
  This is why "not every card animated": the sticky stack and marquee
  already had motion, but the feature-row spread and the archive grid
  did not.
- Added a plain-text (no motion dependency) statement directly under
  the Hero, before the marquee: kicker "30+ Shipped Projects", title
  "Not just an officer. An officer who builds." — this is the first
  thing visitors see after the hero now, addressing "programming needs
  to be visible right under the hero, everywhere."

## 2026-07-12 Update, Part 5 (light/dark theme toggle)

- Added a full light theme, not just a color inversion afterthought.
  `src/hooks/useTheme.ts` manages a `"dark" | "light"` state, persisted
  to `localStorage["theme"]`, applied via `data-theme` on
  `<html>`/`:root`. `index.html` has an inline script (before any other
  script tag) that reads the stored value (or `prefers-color-scheme` if
  none) and sets `data-theme` before first paint — no flash of the
  wrong theme.
- All theme colors are CSS custom properties; `:root[data-theme="light"]`
  overrides them (see `styles.css` near the top). Light palette: near-white
  `#f4f3ef` background, near-black `#14181b` text, white cards, and a
  **darker** metallic gradient for headings (`#14181b → #5b6570`, since
  the dark-mode gradient `#646973 → #bbccd7` is illegible on a light
  background). The gradient CTA button, per-project accents, and the
  always-white `ExpertiseSection` panel didn't need any change — they
  already worked on both.
- **Real bug found and fixed while QA'ing this**: `.topbar`'s
  translucent blur background was hardcoded to `rgba(10, 10, 9, 0.82)`
  instead of a theme variable, so the sticky header stayed black in
  light mode even though everything else flipped correctly. Fixed by
  introducing `--surface-blur` (dark/light variants) and using it there.
  **If a future change adds another `backdrop-filter` surface, give it
  a theme-aware background variable, not a hardcoded rgba — this is the
  second time a hardcoded dark rgba has been missed** (the marquee-tile
  image scrim and the two modal backdrops are the *intentional*
  exceptions — those stay dark in both themes on purpose, since they're
  scrims over always-dark images or modal-dimming overlays, not page
  chrome).
- The project cover images (`public/projects/*.webp`) are baked with a
  permanently dark canvas regardless of site theme — this is
  intentional (like album art), not a bug; don't try to make those
  theme-aware.
- Toggle UI: a square icon button (sun icon when dark → click for
  light; moon icon when light → click for dark) next to the language
  toggle in the header, always visible (not hidden on mobile like the
  ⌘K button is). Also added as a command-palette action
  ("Switch to light/dark mode").

## 2026-07-12 Update, Part 6 (marquee text invisible in light mode)

- User reported the scroll marquee's project names/categories were not
  visible at all. Root cause: `.marquee-tile__name`/`.marquee-tile__category`
  used `var(--ink)`/`var(--ink-dim)` (theme-aware), but that text always
  renders over the project cover images (`public/projects/*.webp`), which
  are permanently dark by design (plus the `.marquee-tile::before` dark
  scrim). In light mode `--ink` flips dark, so the text became dark-on-dark
  and disappeared.
- Fix: hardcoded fixed light values instead — `color: #f2ede2` for the name,
  `color: #cfc9ba` for the category — same as the scrim and the two modal
  backdrops, which are intentionally theme-invariant "always dark" surfaces.
  **Any text/UI drawn on top of the marquee tile images must use fixed
  colors, never `--ink`/`--ink-dim`/other theme variables.**
- This is the third instance of the same bug class this session (after the
  `.topbar` blur background). When adding a light theme, audit every
  hardcoded-dark surface AND every element layered on top of an
  intentionally-dark surface (images, scrims) — both directions can break.

## 2026-07-12 Update, Part 7 (full audit + 10-feature ship)

Ran a full visual + code audit (screenshots across every page, both themes,
desktop/mobile). Found and fixed the most impactful bug this session:

- **Intro splash was global, not home-only.** `RootLayout` unconditionally
  mounted `<Intro>` on every route with no persistence, so a direct link to
  any case study, `/contact`, or even the `/404` page showed a 3.2s full-name
  splash before real content — worst possible first impression on exactly
  the links most likely to be shared (case studies, recruiter links).
  Fixed: `Intro` now takes an `isHome` prop (`RootLayout` passes
  `location.pathname === "/"`) and only auto-plays there, once per session
  via `sessionStorage["introSeen"]`. The floating "Replay intro" button still
  works from any route (user-initiated, so it's fine there).
- Marquee tile names were truncating mid-word with `white-space: nowrap` +
  ellipsis on a 156px tile. Switched `.marquee-tile__name` to a 2-line
  `-webkit-line-clamp`, bumped tile height 156→172px. Category line stays
  single-line ellipsis (short enough).

Then shipped the user's 10 requested enhancements + a portrait redesign in
one pass:

- **Portrait**: replaced the hard-edged framed-photo look (`box-shadow` +
  offset hairline rectangle) with `.portrait-lockup::before` = a blurred
  `var(--gradient-cta)` bloom behind the image (`filter: blur(64px)`), and
  a `mask-image: linear-gradient(180deg, #000 80%, transparent 100%)` on the
  img itself so the bottom edge fades into the page instead of hard-cutting
  into the caption. Reads as part of the page, not a pasted-in box. If this
  needs revisiting, the CTA-gradient glow is the brand tie-in — don't lose it.
- **Tag click-to-filter**: tech tags in `ProjectCard`, `StickyProjectStack`,
  and `ProjectCaseStudyPage` are now `<Link to="/projects?q=<tag>">`.
  `ProjectsArchivePage` reads `?q=` via `useSearchParams` as the initial
  search value (reuses the *existing* search-across-tech-array logic — no
  new filter mechanism needed, the search bar already matched on `tech`).
- **Case study pages**: `ReadingProgress` (new component, plain scroll
  listener + rAF, no framer-motion) as a fixed 3px bar at the very top;
  sourced `stat` chips (`Project.stats?: ProjectStat[]`) populated **only**
  for the 2 flagship projects with real numbers already present in their
  existing copy (arabic-legal-research-skill: 233 tests/96.12%/95%;
  nexalearn: 325+ commits/144+ releases/7 portals/8 tools) — do not add stats
  to other projects without a real sourced number, this is a "no invented
  numbers" site; a "Next project" link at the bottom (sequential over the
  full `projects` array, wraps around — distinct from "Related Projects"
  which is same-category).
- **CareerTimeline** (new component `src/components/CareerTimeline.tsx`,
  home page, right under Hero): 4 hardcoded milestones (2017 Bachelor of
  Law, 2018 Criminal Investigation Officer, 2024 MBA in progress, 2025 30+
  projects shipped) — all sourced from `profile.ts`/`education`. If more
  milestones get added to the CV later, update this array too; it's a
  curated subset, not derived automatically from `experience`/`education`.
- **OG social card**: `public/social-card.png`, a real 1200×630 branded
  image (name, tagline, portrait with the same mask/glow treatment as the
  live site, small URL tag) generated via the established
  Playwright-HTML-template + Pillow pipeline (template lives in the scratch
  dir only, not committed — regenerate from scratch if the portrait or
  brand colors change). Replaces the old raw `ahmed-darhous.png` og:image
  (an 820×1025 portrait crop with no title text — bad aspect ratio for link
  previews). Wired into both `index.html` (static, for crawlers that don't
  run JS — this is the one that actually matters for GH Pages SPA) and
  `usePageMeta.ts` (client-side, cosmetic parity). **If WhatsApp/Facebook
  still show an old cached preview after this ships, that's their crawler
  cache, not a bug here** — there's no reliable way to force-bust it from
  our side.
- **Print stylesheet** (`@media print` at the end of `styles.css`): hides
  chrome (topbar, footer, progress bar, intro, overlays), forces black-on-
  white, grayscales cover images, avoids breaking `.case-detail__block`
  across pages.
- **Analytics scaffold** (`src/lib/analytics.ts` + a pageview call in
  `RootLayout` on route change): completely inert unless
  `VITE_ANALYTICS_ENDPOINT` (and optionally `VITE_ANALYTICS_SITE_ID`) is set
  at build time. No script tag, no request, zero third-party tracking by
  default. Do not wire a live analytics endpoint without the user providing
  one — this was intentionally left as a scaffold, not a working integration.

Verified via Playwright: intro does NOT auto-show on deep-linked case study
or 404 (only on `/`), tag click correctly lands on `/projects?q=<tag>` with
the search box pre-filled, no horizontal overflow on mobile (390px), stat
chips / progress bar / next-project link all render correctly in both
themes. Build is TypeScript-clean.
