# KIRO Technical Audit

Audit Date: 2026-07-10
Auditor: Kiro (Frontend Architect, Senior Full-Stack Engineer)
Project: Ahmed Darhous Portfolio

---

## Stack Overview

| Layer | Technology | Version | Assessment |
|---|---|---|---|
| Build tool | Vite | ^6.0.0 | ✅ Current |
| UI framework | React | ^19.0.0 | ✅ Current |
| Language | TypeScript | ^5.6.0 | ✅ Current, strict mode |
| Icon library | lucide-react | ^0.468.0 | ✅ Current |
| Deployment | GitHub Pages via Actions | — | ✅ Correct setup |
| CSS | Single global file | — | ⚠️ Acceptable for small project, scaling risk |
| State management | React useState only | — | ✅ Appropriate for scope |
| Routing | None (single-page, anchor links) | — | ✅ Appropriate for portfolio |

---

## Architecture Assessment

### Strengths

**1. Centralized identity config (`src/config/site.ts`)**
All contact links, social links, social order, signature, and asset paths live in one file. Components read from this config — they do not hardcode URLs. This is the single best architectural decision in the project. Changing an email address or social URL requires editing exactly one file.

**2. Clean data/component separation**
Data lives in `src/data/` (profile.ts, projects.ts, content.ts). Components receive a `locale` prop and look up their strings. No business logic inside components.

**3. Type safety**
Strict TypeScript throughout. `Locale` type constrains to `"en" | "ar"`. `Localized<T>` generic pattern is clean. `Project` type is well-defined with explicit union types for `category`, `status`, `source`. `SocialKey` and `SocialLink` types are explicit.

**4. Shared utility components**
`ExternalLink` enforces `target="_blank" rel="noopener noreferrer"` at one location. `SectionHeader` enforces consistent kicker/title/body pattern across all sections. `SocialLinks` renders from the centralized ordered array.

**5. Accessibility foundations**
Skip link implemented. `aria-labelledby` on all sections. `aria-hidden` on decorative icons. `prefers-reduced-motion` handled — intro animation disabled, transitions collapsed.

**6. Asset path abstraction**
`assetPath()` helper in `site.ts` prepends `import.meta.env.BASE_URL` to all asset paths. This ensures the `/portofolio/` base path is applied correctly for GitHub Pages in both development and production.

**7. Bilingual architecture**
The `Locale` type + `Localized<T>` pattern used throughout data files is consistent and type-safe. Language switching triggers a re-render of the entire tree via a single `locale` state in `App.tsx`. RTL direction applied at the root `div` level. This is a well-designed bilingual system for a portfolio of this scale.

---

### Weaknesses

**W1. Single monolithic CSS file (styles.css, ~680 lines)**
All styles for all components live in one file with no scoping. Class names like `.hero`, `.about-grid`, `.project-card` are global. As the portfolio grows, naming collisions become more likely. No CSS Modules, no Tailwind, no CSS-in-JS — just flat global classes.

Evidence: `src/styles.css` contains all layout, component, and responsive styles in one file.

**W2. No linter**
No ESLint, no Biome, no Prettier configuration exists. Code style is consistent (written in one session), but there is no automated enforcement. Future edits may diverge in style without notice.

Evidence: `package.json` has no `lint` script. No `.eslintrc`, `.biomerc`, or `.prettierrc` found.

**W3. No real test framework**
`npm run test` runs `node scripts/verify-content.mjs` — a custom 30-line script that checks for required strings in source files. This is not a test suite. There are zero component tests, zero integration tests, zero E2E tests.

Evidence: `scripts/verify-content.mjs` — checks string presence only. No jest, vitest, or playwright installed.

**W4. `ExternalLink` does not enforce `href` at type level**
`ExternalLink` accepts `AnchorHTMLAttributes<HTMLAnchorElement>` which makes `href` optional at the TypeScript level. A call to `<ExternalLink>` without `href` will compile without error and silently render a broken link.

Evidence: `src/components/ExternalLink.tsx` — `href` is part of spread `...props`, not an explicit required prop.

**W5. `SectionHeader` hardcodes `h2`**
Every section uses `<SectionHeader>` which always renders `<h2>`. This works for top-level sections but makes the component non-reusable in nested contexts (e.g., a card needing an h3 title). Minor given current scope.

Evidence: `src/components/SectionHeader.tsx` line 12 — `<h2>{title}</h2>`.

**W6. `CaseStudiesSection` has no empty state**
The component filters `projects.filter((p) => p.caseStudy).slice(0, 3)`. If the projects data changes and caseStudy entries are removed, the section renders an empty grid with no user feedback.

Evidence: `src/components/CaseStudiesSection.tsx` lines 13-14.

**W7. `Intro` component calls `window.matchMedia` directly in state initializer**
The lazy initializer in `useState(() => ...)` calls `window.matchMedia(...)` directly. If this component were ever rendered in an SSR or test environment without `window`, it would throw. The `typeof window === "undefined"` guard exists but is the only protection.

Evidence: `src/components/Intro.tsx` lines 7-9.

**W8. No React Error Boundary**
The app has no Error Boundary. If any component throws at runtime, the entire page goes blank with no recovery path.

Evidence: `src/App.tsx` — no `<ErrorBoundary>` wrapping.

**W9. `ContactSection` does not use `SectionHeader`**
All other sections use the shared `SectionHeader` component. `ContactSection` manually renders `<div className="section-kicker">` and `<h2 id="contact-title">` directly. Structural inconsistency.

Evidence: `src/components/ContactSection.tsx` lines 17-21 vs all other section components.

**W10. Education data has a factual error**
The education array lists `"Police Academy of Egypt"` with credential `"Diploma in Egyptian General Law"` and period `"October 2021 - October 2022"`. The CV shows the General Law diploma is from a different civilian institution (Qena University). The Police Academy is Ahmed's employer/commissioning institution, not the diploma-granting institution. Also, `Institut Français d'Egypte` has `period: "Documented in CV"` — a placeholder that renders literally on the live site.

Evidence: `src/data/profile.ts` lines 87-103 vs `docs/content/CV_ANALYSIS.md` education section.

**W11. Build tooling under `dependencies` not `devDependencies`**
`vite`, `typescript`, `@vitejs/plugin-react` are under `dependencies`. This causes all build tooling to be installed in environments running `npm install --production`. Conventionally, build tools belong in `devDependencies`.

Evidence: `package.json` — `vite: "^6.0.0"`, `typescript: "^5.6.0"` under `dependencies`.

**W12. `npm run preview` does not work correctly for GitHub Pages**
`vite preview` will serve from `/`, but the production site is at `/portofolio/`. Running `npm run preview` after build will produce broken asset paths locally. A developer previewing a build will see a broken page.

Evidence: `vite.config.ts` — `base: "/portofolio/"`. Preview script: `vite preview --host 127.0.0.1` does not override base.

**W13. `lucide-react` full library bundled**
The entire lucide-react package (~1000 icons) is included in the bundle. Only approximately 10 icons are actually used. With tree-shaking from Vite this should be mitigated, but the raw bundle output of 237KB JS suggests the full library may not be fully shaken.

Evidence: Build output: `dist/assets/index-CPzvy9R5.js` 237.52 KB. `transforming (38) node_modules/lucide-react/dist/esm/icons/alarm-clock-che...` and `transforming (865) node_modules/lucide-react/dist/esm/icons/hand.js` in build log — suggests many icon files are being processed.

---

## Component-by-Component Assessment

| Component | Lines | Quality | Issues |
|---|---|---|---|
| `App.tsx` | 43 | ✅ Good | No error boundary |
| `Hero.tsx` | 52 | ✅ Good | None critical |
| `AboutSection.tsx` | 55 | ✅ Good | None |
| `ExpertiseSection.tsx` | 25 | ✅ Good | None |
| `ExperienceSection.tsx` | 30 | ✅ Good | None |
| `ProjectsSection.tsx` | 40 | ✅ Good | None |
| `CaseStudiesSection.tsx` | 35 | ⚠️ OK | No empty state |
| `CVSection.tsx` | 35 | ✅ Good | None |
| `ContactSection.tsx` | 35 | ⚠️ OK | Does not use SectionHeader |
| `Footer.tsx` | 37 | ✅ Good | None |
| `Intro.tsx` | 38 | ⚠️ OK | window.matchMedia in initializer |
| `SectionHeader.tsx` | 18 | ⚠️ OK | Hardcoded h2 |
| `SocialLinks.tsx` | 18 | ✅ Good | None |
| `ExternalLink.tsx` | 8 | ⚠️ OK | href not required at type level |

---

## Dependency Analysis

| Package | Listed Under | Version | Assessment |
|---|---|---|---|
| react | dependencies | ^19.0.0 | ✅ Correct location |
| react-dom | dependencies | ^19.0.0 | ✅ Correct location |
| lucide-react | dependencies | ^0.468.0 | ✅ Correct location |
| vite | dependencies | ^6.0.0 | ⚠️ Should be devDependencies |
| @vitejs/plugin-react | dependencies | ^5.0.0 | ⚠️ Should be devDependencies |
| typescript | dependencies | ^5.6.0 | ⚠️ Should be devDependencies |
| @types/react | devDependencies | ^19.0.0 | ✅ Correct |
| @types/react-dom | devDependencies | ^19.0.0 | ✅ Correct |

No unused dependencies detected. No suspicious or typosquatted package names. No outdated packages.

**Note:** `^` (caret) ranges are used for all packages. Acceptable for a portfolio but introduces minor risk of breaking changes on fresh installs. Pinning to exact versions is safer for long-term reproducibility.

---

## Build Output Analysis

| File | Raw Size | Gzipped | Assessment |
|---|---|---|---|
| `index.html` | 1.65 KB | 0.68 KB | ✅ Tiny |
| `index-CGv79fwZ.css` | 11.12 KB | 3.23 KB | ✅ Small |
| `index-CPzvy9R5.js` | 237.52 KB | 74.45 KB | ⚠️ Acceptable but could be reduced |
| `ahmed-darhous.png` | 2,106 KB | — | ❌ Oversized fallback |
| `ahmed-darhous-384.webp` | 12.3 KB | — | ✅ Good |
| `ahmed-darhous-640.webp` | 22.8 KB | — | ✅ Good |
| `ahmed-darhous-960.webp` | 37.9 KB | — | ✅ Good |
| `Profile.pdf` | 66.5 KB | — | ✅ Fine |

**Total production download (first visit):** approximately 2.5MB (dominated by the PNG fallback which modern browsers will not download). Without PNG: approximately 360KB gzipped total.

---

## Deployment Pipeline Assessment

The GitHub Actions workflow at `.github/workflows/deploy.yml` is well-configured:

| Step | Assessment |
|---|---|
| Checkout | ✅ actions/checkout@v4 |
| Setup Node 22 | ✅ Current LTS |
| npm ci (not npm install) | ✅ Lockfile-faithful install |
| Verify Vite base path | ✅ Grep check before build |
| Typecheck | ✅ Runs before build |
| Lint (optional) | ✅ `--if-present` — won't fail if missing |
| Test (optional) | ✅ `--if-present` |
| Build | ✅ |
| Deploy to GitHub Pages | ✅ actions/deploy-pages@v4 |
| Verify production URL | ✅ 12-attempt retry loop checking for "Ahmed Darhous" in response |
| Concurrency control | ✅ cancel-in-progress prevents queue buildup |

**One workflow gap:** The `Verify Production URL` step checks that the deployed URL returns HTML containing "Ahmed Darhous". Since the portfolio is a React SPA, the HTML contains "Ahmed Darhous" in the JSON-LD script tag, not in the rendered body. This works correctly, but it's worth noting that it verifies the HTML shell, not the rendered application.

---

## Security Assessment

| Risk | Severity | Evidence | Status |
|---|---|---|---|
| XSS via dangerouslySetInnerHTML | None found | No usage in any component | ✅ Safe |
| External link rel missing | None | ExternalLink enforces rel="noopener noreferrer" | ✅ Safe |
| Secrets in source code | None | No .env file, no API keys, no tokens in any file | ✅ Safe |
| Sensitive PII in source | None | Email/phone in config is intentional and public contact info | ✅ Acceptable |
| Internal planning docs in public repo | Low | PORTFOLIO_IMPLEMENTATION_LOG.md etc. visible on GitHub | Minor — not a security risk |
| Dependency vulnerabilities | Not assessed | npm audit not run during this audit | Recommend running |

---

## Code Quality Summary

| Dimension | Score (1-10) | Notes |
|---|---|---|
| Architecture | 7 / 10 | Good separation, centralized config; monolithic CSS is the main gap |
| Type safety | 8 / 10 | Strict mode, good types; ExternalLink href gap is the only real issue |
| Component design | 7 / 10 | Clean and appropriately simple; ContactSection inconsistency |
| Testability | 3 / 10 | No real tests, no test framework, no linter |
| Maintainability | 7 / 10 | Easy to navigate; CSS scoping will become a risk as features grow |
| Documentation | 6 / 10 | AGENTS.md and CODEX_MEMORY.md are thorough; root directory cluttered |
| Security | 9 / 10 | No active risks; minor internal doc exposure concern |
| Performance posture | 7 / 10 | WebP pipeline is correct; PNG fallback oversized; lucide tree-shaking uncertain |

**Overall Technical Score: 7 / 10**

The codebase is clean, appropriately structured, and well within the quality bar expected for a personal portfolio. The primary gaps are testing infrastructure and linting — both absent. The architecture decisions (centralized config, typed data, shared components) are all correct and will make future improvements easier.
