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

## 2026-07-12 Update, Part 8 (two-tone colors, mobile-first pass, heavier motion)

Big feature push: color system rework, a full mobile-ergonomics pass (user
said "90% of traffic is mobile"), and 10 new motion effects layered on top
of the existing framer-motion primitives.

**Color system**: `src/data/accents.ts` no longer hand-picks ~15 near-random
hues per category. Two curated arrays (`OFFICER` = magenta/violet,
`BUILDER` = teal/cyan) get cycled across two category lists. New root
tokens `--identity-officer` (#b600a8) / `--identity-builder` (#2dd4bf) /
`--identity-hue`. `--identity-hue` is registered via `@property` (syntax
`<color>`) specifically so it's *animatable* — a plain custom property
can't be transitioned. `useIdentityShift` (IntersectionObserver over
`[data-identity="officer"|"builder"]` wrapper divs in `HomePage.tsx`) eases
it between the two colors as you scroll; the body's ambient background
blob reads it via `color-mix(in srgb, var(--identity-hue) 22%, transparent)`.
**If new home-page sections get added, wrap them in a `data-identity` div
too, or the scroll color-shift will just hold at whatever zone it last saw.**

**Mobile**: `useNarrowViewport()` (640px, already existed in
`useReducedMotion.ts`) now drives real value changes instead of an
on/off toggle — `StickyProjectStack`'s `vhPerCard` (90→58), `ScrollMarquee`'s
drift range (8%→3%), `AnimatedText`'s scroll offset window (tighter on
mobile since the same paragraph wraps into way more lines on a narrow
column). New `MobileTabBar.tsx` (fixed bottom, Home/Projects/CV/Contact +
an elevated WhatsApp FAB in brand WhatsApp green `#25d366` — deliberately
*not* a site accent color, users need to recognize it instantly) — only
rendered/shown via CSS `@media (max-width:640px)`, and `.app-shell` gets
matching `padding-bottom` in that same query so the footer doesn't get
hidden behind it. `index.html` viewport meta now has `viewport-fit=cover`;
safe-area-inset-bottom is applied to the tabbar's padding.
`useSwipeNavigation` (plain touchstart/touchend, no library) drives
next/prev-project swipes on case study pages.

**Motion** (all new hooks are plain JS/CSS, no framer-motion, to keep
Hero and other above-the-fold pieces off the animation-library bundle —
same discipline as the rest of the site):
- `useSpotlight` — pointermove-driven `--spotlight-x/y` behind the hero,
  gated by `useFinePointer` + `useReducedMotion`.
- `useTilt` — pointer-driven 3D tilt + moving highlight on project cards,
  same gating.
- Hero heading is split into per-word `.kinetic-word` spans with a
  staggered blur-to-focus keyframe (replaced the old single `fade-up-in`
  on `.hero-copy h1` — don't re-add that, it would double-animate).
- `StatChip.tsx` — count-up + SVG progress ring, triggered by the
  existing `useInView` hook, respects reduced motion (jumps straight to
  final value).
- Primary CTA button (`.primary-action`) has an animated conic-gradient
  border via a registered `@property --border-angle` + `::before` pseudo.
- **View Transitions**: `src/lib/viewTransition.ts` (`withViewTransition`)
  + `src/hooks/useViewTransitionName.ts` wire the native
  `document.startViewTransition()` API into project card → case-study
  navigation, so the cover image morphs instead of hard-cutting. Feature-
  detected (`"startViewTransition" in document`) and reduced-motion-gated;
  no-ops to a plain `navigate()` everywhere it's unsupported. **Every Link
  that navigates between two project-bearing views (card → case study,
  case study → next/prev/related) needs both the `viewTransitionName`
  wired on its cover image AND an `onClick` that calls `withViewTransition`
  — currently wired in `ProjectCard`, `StickyProjectStack`'s `StackCard`,
  and `ProjectCaseStudyPage`'s next/related links. `StackCardStatic` (the
  reduced-motion fallback) was deliberately left unwired — `withViewTransition`
  is a no-op under reduced motion anyway.**
- Career timeline: per-item spring pop-in (`useInView` + overshoot
  cubic-bezier) and a small pulse dot that travels along the connector
  line, position driven by a plain rAF-throttled scroll listener (not
  framer-motion — this component was already light, kept it that way).
- Marquee tiles: dock-style hover using CSS `:has()`
  (`.marquee-row__track:has(.marquee-tile:hover) .marquee-tile:not(:hover)`)
  — no JS needed for the "neighbors compress" illusion.

Verified via Playwright: identity-hue actually changes color
(`rgb(182,0,168)` → `rgb(46,211,191)`) when scrolling from an officer to a
builder zone; tilt/dock-hover/stat-chip count-up all produce the expected
computed transform/text values; mobile has no horizontal overflow; TS
build is clean.

## 2026-07-15 Update (full home-page rebuild: cinematic identity narrative)

User asked for a full rebuild, not a proposal — a complete reorder of the
home page around a single narrative: "Ahmed Darhous combines discipline,
evidence, strategy, and technical execution." This actually shipped, not
just planned. Key structural decisions for future sessions to know about:

- **Removed `ExpertiseSection` and `CaseStudiesSection` entirely.** Both
  had gone redundant: Expertise's "five domains" content is now covered by
  `OperatingSystem`'s four pillars, and CaseStudiesSection's mini problem/
  approach/result cards duplicated what `FlagshipProjects` already shows in
  full for the same 3-4 projects. **Don't re-add either without checking
  whether the new sections already cover the same ground** — the whole
  point of removing them was eliminating the same facts being told twice
  on one page.
- **`AboutSection.tsx` → `EducationSection.tsx`** (renamed, not layered).
  Dropped the old "personal statement" bio panel (now redundant with Hero
  + `PersonalStory`); kept education/certs/languages/skills panels. New id
  is `#education`, not `#about`.
- **`ExperienceSection` renamed to "Professional Journey"**, id changed
  `#experience` → `#journey`. Added a connected vertical line (border-
  inline-start + dot markers) and a highlighted "Current" badge on
  whichever role's period string contains "present" — don't hardcode a
  role name, that detection is intentionally dynamic.
- **New home-page order** (HomePage.tsx): Hero → PersonalStory →
  OperatingSystem → EvidenceNumbers → FlagshipProjects → marquee → 
  ProjectsSection (remaining) → ExperienceSection → EducationSection →
  TechStackSection → CVSection → ContactSection. Flagship projects now
  come *before* the marquee, not after — deliberate: prove the strongest
  work first, then let people browse the full breadth.
- **`navItems` in content.ts changed** to match: Story/System/Stack/
  Journey/Projects/CV/Contact (was About/Expertise/Stack/Experience/...).
  If you add a new home-page section with its own id, remember the header
  nav is a separate array that doesn't auto-derive from the page — it has
  to be updated by hand.
- **Three-color identity system**: added `--identity-discipline` (deep
  crimson `#9b1c3f`) and `--identity-strategy` (amber/bronze `#c9922f`)
  alongside the existing `--identity-officer` (magenta) and
  `--identity-builder` (teal). These four map 1:1 to the four pillars in
  both `PersonalStory` (per-stage) and `OperatingSystem` (per-card) via a
  shared `pillar` key (`"evidence" | "discipline" | "strategy" |
  "execution"`) defined once in `src/data/personalStory.ts` and reused by
  `src/data/operatingSystem.ts`. Project category accents (`accents.ts`)
  are a *separate*, unrelated two-tone system (officer/builder only) —
  don't try to unify these two color systems, they answer different
  questions (site narrative structure vs. project category).
- **`PersonalStory`** is a sticky-scroll narrative (5 real dated
  milestones, 2017→2025) using a plain rAF-throttled scroll listener (no
  framer-motion) to compute which stage is active, then cross-fades
  between absolutely-positioned stage panels via CSS. Shortened multiplier
  on mobile (62vh/stage vs 100vh) via `useNarrowViewport`. Reduced-motion
  gets a fully static stacked-card list (`.story-static`), no sticky/pin
  at all.
- **Marquee tiles are real `<Link>`s now**, not decorative
  `aria-hidden` divs — this was a real accessibility/functionality gap
  (huge project-discovery surface that did nothing on click). The row is
  rendered doubled for the seamless scroll loop; only the *first* copy is
  tabbable/announced (`tabIndex={-1}` + `aria-hidden` on the duplicate
  half) so keyboard/screen-reader users don't hit every project twice.
- **Tech stack section is now proportional usage bars**, not a tag
  cloud — bar width is `count / maxCount`, gradient magenta→teal, each row
  links to `/projects?q=<tech>` (reuses the existing archive search-by-tech
  filter, no new filtering logic needed). Real counts only, from
  `techStack.ts`'s frequency count over `projects.ts` — never hardcode a
  usage number.
- **Real bug found via QA and fixed**: `StatChip` assumed every stat value
  contained a digit (used for the count-up animation). A non-numeric value
  like `"MBA"` rendered as `"0MBA"` because the fallback path still
  prepended a `"0"`. Fixed by adding an `isNumeric` flag — non-numeric
  values now display as-is immediately (ring still fills to 100% on
  view-enter, just no digit count-up). **If a future stat item might not
  contain a number, this is already handled — don't reintroduce the
  no-digit assumption.**
- Confirmed via Playwright: RTL/Arabic renders correctly across every new
  section (mirrored grid order, `border-inline-start` flips correctly,
  pillar order reverses in the Operating System row) — no manual RTL
  overrides were needed anywhere, the existing logical-property discipline
  from earlier in the project just held up.

**Not done this pass** (deferred, not forgotten): command palette entrance
animation + recent-items, project archive sort control, case-study reading
time/table-of-contents/share-link, and a 404-page project search. These are
polish-tier per the spec's own priority ordering — the core narrative
rebuild took priority. Flag if the user asks for "the rest of it."

## 2026-07-15 — Final production closure pass

A full manual + automated audit (build run locally, Playwright walkthrough
across EN/AR × desktop/mobile/tablet × normal/reduced motion) surfaced and
fixed several real defects, then completed all of the previously-deferred
polish items.

**Real bugs found and fixed:**

- **Hero name (`<h1>Ahmed Darhous</h1>`) went invisible on mobile viewports
  in both EN and AR** — the site's single most important element. Root
  cause: the `.kinetic-word` entrance animation (`opacity`+`filter:blur`,
  later narrowed to just `opacity`+`transform`) left the element in a
  painted-but-invisible compositor state after finishing, reproducible at
  390×844 regardless of locale, and did not self-heal on resize or long
  waits — only disabling the animation entirely fixed it. Given this is the
  page's most load-bearing text and the failure mode is silent (computed
  style reports `opacity: 1`), the entrance animation was removed from
  `.kinetic-word` rather than "fixed" — the name is now a plain, always-
  painted element. **Do not re-add an opacity/filter entrance animation to
  the Hero name** without verifying it survives a real mobile-viewport
  render, not just a computed-style check.
- **Command palette Escape/Tab-trap/focus-restoration silently did
  nothing** — introduced while adding the entrance/exit animation this same
  pass, then caught by this pass's own QA. Two compounding bugs: (1) the
  new `mounted` state was set inside a `useEffect`, one render behind
  `open` flipping true, so `useFocusTrap`'s own effect ran before the
  container ref existed and silently found nothing to attach listeners to
  — fixed by flipping `mounted` synchronously during render
  (`if (open && !mounted) setMounted(true)`, the React-endorsed
  adjust-state-during-render pattern) instead of via an effect; (2) the
  search input's native `autoFocus` attribute raced ahead of
  `useFocusTrap`'s own `document.activeElement` capture, so the hook
  captured the search input itself as "previously focused" instead of the
  button that opened the palette — closing then focused the (soon to be
  removed) input instead of restoring focus, and once the input unmounted
  focus fell through to `<body>`. Fixed by removing `autoFocus` and letting
  `useFocusTrap`'s own `focusable[0]?.focus()` (which runs *after* it
  captures `previouslyFocused`) handle initial focus instead.
- **Locale had zero persistence** — `useState<Locale>("en")` in `App.tsx`,
  no storage, no `<html lang>`/`dir` sync. Any hard reload, direct URL
  load, or shared/bookmarked Arabic link silently reset the whole site back
  to English, and the root `<html lang="en">` never updated when the user
  switched to Arabic in-session (screen readers would apply English
  pronunciation rules to Arabic text). Fixed with a new `useLocale` hook
  (mirrors the existing `useTheme` hook exactly) that persists to
  `localStorage`, falls back to `navigator.language`, and syncs
  `document.documentElement`'s `lang`/`dir` on every change.
- **Static `index.html` and `profile.headline` still had the pre-rebuild
  job title** ("Security Operations Manager, Crisis Management Specialist,
  and MBA Candidate") in the `<title>`, meta description, Open Graph tags,
  JSON-LD `jobTitle`, and the CV Center's "Source artifact:" line. Since
  `usePageMeta` only patches tags client-side after React mounts, every
  crawler or link-preview bot that doesn't execute JS was seeing the old
  title — this is exactly what search engines and social shares actually
  index. Updated both to the current "Officer, Legal Professional, MBA
  Candidate — Software and AI Systems Builder" framing.
- Informal/colloquial Egyptian Arabic (مش، إزاي، ليه، دلوقتي، بيبني، بيشتغل،
  لازم, etc.) had leaked into the newest content — `personalStory.ts`,
  `operatingSystem.ts`, `content.ts`'s new section kickers/titles, and one
  line in `profile.ts`'s `systemsStatement`. All rewritten to formal Modern
  Standard Arabic; technical terms and established English product/tech
  names were left as-is per the site's existing convention.

**Dead code removed:** `profile.ts`'s `shortTitle`, `expertise` (5-entry
array), and `tagline` exports were fully unused (superseded by
`OperatingSystem`/`personalStory.ts` earlier this cycle) and two of them
still carried the old job-title framing — removed along with their ~90
lines of matching dead CSS (`.expertise-panel`, `.expertise-list`,
`.expertise-row*`, `.statement-panel`). Also fixed a stale
`.career-timeline-section` selector left in the print stylesheet's hide-list
from the `CareerTimeline` → `PersonalStory` rename earlier — it never
matched anything, so print output was leaking the story section; now
targets `.story-section`.

**Deferred items completed this pass:**

- Command palette: scale+fade entrance/exit (mount/unmount lifecycle,
  `prefers-reduced-motion`-aware), a "Recent" group (max 3,
  `sessionStorage`, de-duplicated, promoted on every selection), and
  match-substring `<mark>` highlighting.
- Project archive: a sort control (Featured / Newest / A–Z — "Newest"
  parses the leading year already present in every project's real `year`
  field, never invented), three additional toggle filters (Live / Has
  repository / Has case study), a live result count, a "Clear all" action,
  and full URL query-state persistence (`q`, `category`, `sort`, `live`,
  `repo`, `case`) so filtered views survive reload/back-navigation/sharing.
- Case study pages: reading time (word-count estimate across every
  populated case-study field, ~200 wpm), a sticky "On this page" table of
  contents built only from sections that actually exist for that project
  (scroll-spy via `IntersectionObserver`, collapses to a horizontal
  wrapped list under 900px), and a copy-link action (`navigator.clipboard`,
  with a `navigator.share` button shown only where the browser supports
  it).
- 404 page: a live project search (same matching logic as the archive) plus
  a "Flagship projects" suggestion list when the search is empty, so the
  page is never a dead end.

**Verification:** `tsc --noEmit`, `npm run build`, and `npm test` all clean.
Full Playwright sweep across all 30 project routes, `/`, `/projects`,
`/contact`, `/404`, EN+AR, 1440×900/820×1180/390×844,
normal+reduced-motion — zero console errors, zero failed requests, zero
horizontal overflow, footer social-link order/attributes/mailto all
correct, header stays pinned during scroll, tech-stack→archive filter
link-through works.
