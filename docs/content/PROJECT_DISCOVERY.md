# Project Discovery

## 2026-07-10 update, part 2 — second GitHub account and full inventory pass

Ahmed provided a complete, detailed project inventory (33 numbered items,
including exact repo/live URLs for several projects) and asked it to be
cross-checked against GitHub and the shared memory before being added. This
pass found one structural fact that changes how discovery has to work going
forward: **Ahmed has (at least) two GitHub accounts** — `Darhous` (used for
all prior discovery) and `darhous2023` (not previously known to this
project). Several "known real projects" that could not be found under
`Darhous` were found immediately under `darhous2023`.

### A hard limit discovered this session: `vercel.app` is not reachable

This session's sandbox network policy blocks the `vercel.app` domain
outright (confirmed via the agent proxy's status endpoint — `403` /
"policy denial", not a site-side block). Every `*.vercel.app` live URL in
this inventory (`fady-delta.vercel.app`, `darhous-ai-cloud-academy.vercel.app`
and all of its sub-paths) could **not** be independently opened or
screenshotted from this environment. Where a live URL is listed for those
projects, it is included because Ahmed stated it directly and/or the
project's own README self-references it as its production URL (`fady`'s
README explicitly documents `fady-delta.vercel.app` as its own deployment) —
not because this session rendered the page. This is called out per-project
below and in `src/data/projects.ts` case-study "current status" fields
where relevant.

### `darhous2023` account — confirmed repositories

| Repository | Language | Finding |
|---|---|---|
| `fady` | TypeScript | **Confirmed real and substantial.** This is "Elfady Car Trading." 89 commits, full README: Next.js 16, React 19, TypeScript, dual Postgres (Supabase + Neon), Drizzle ORM, Better Auth, Vitest, Playwright, GitHub Actions, deployed to `fady-delta.vercel.app`. The `Darhous/elfady` repo checked in the previous discovery pass is a separate, empty, abandoned placeholder — the real project is here. |
| `flutter_test` | — | Exists, confirmed empty (no files). This is the "Elfady Native Android App." Listed honestly as early-stage. |
| `asuma-store` | TypeScript | Exists, real content — a "Medusa DTC Starter" monorepo template (generic ecommerce starter, not clearly original work). Not added to the portfolio: it reads as a cloned/forked starter template rather than a built product, and Ahmed's inventory didn't name it as one of his projects. |

### Items from Ahmed's inventory: resolution

| Item as given | Resolution |
|---|---|
| Elfady Car Trading | Found under `darhous2023/fady`. Added, **featured**, full case study rewritten from the real README. |
| Automotive Catalog Intelligence Platform (scraping/ETL) | Described as a local project (`C:\Users\ahmed\Desktop\scraping` on Ahmed's own machine) with no public repository. This session runs in an isolated cloud container with no access to Ahmed's local filesystem, so the code could not be reviewed. Added with `source: "Owner-provided"`, description limited to what Ahmed stated, no invented metrics. |
| Elfady Native Android App (Flutter) | Found: `darhous2023/flutter_test`, confirmed empty. Added with `status: "Early"`, matching the same honest treatment previously used for the empty `Darhous/elfady`. |
| Arabic Legal Research Skill | Already featured from the prior pass; unchanged. |
| Career Ops | Still no repository with this name under either `Darhous` or `darhous2023`. Continues to map to the ATS Resume Analyzer feature inside `Darhous-career-hub-google` (see the 2026-07-10 part 1 section above). |
| ATS Resume | Same repository/feature as "Career Ops" — see above. Not duplicated as a second project entry since only one real repository backs both names. |
| Shemo Studio | Already added from the prior pass (`Darhous/Shemo-Studio`); unchanged. |
| Darhous Project Lab | Still not found under `Darhous` or `darhous2023`. Not added, not invented. |
| NutriBox Healthy Kitchen OS | No repository found under either known account, and no third account or URL was provided. Added with `source: "Owner-provided"`, `private: true`, using only the description Ahmed gave — no invented screenshots, metrics, or links. |
| Personal Portfolio | This repository — unchanged. |
| Fenrir Cybersecurity Projects | No repository named "Fenrir" (or matching its fuzzing/memory-safety description) found under `Darhous` or `darhous2023`. Ahmed's own phrasing ("استخرج المستودعات الفعلية من حساب GitHub المستخدم في Fenrir") implies this work may live under a third, not-yet-provided GitHub account. Added with `source: "Owner-provided"`, `private: true`, using Ahmed's own toolchain description, and explicitly flagged in its case study as needing a repository link once available. |
| NexaLearn Platform (`darhous-ai-cloud-academy`) | Confirmed via a full README re-read: 325+ commits, 144+ releases, Next.js 16/React 19/Supabase, row-level security. Every portal and AI Studio tool Ahmed listed except "Nano Banana Prompt Lab" and "AI Tools Comparison Platform" is explicitly named in the README with its own route. Case study rewritten and renamed to "NexaLearn by Ahmed Darhous" (kept the existing `darhous-ai-cloud-academy` slug to avoid breaking any existing links). |
| 7 NexaLearn portals (AI Academy, Language, Digital Exams, Career Hub, Automation Academy, IoT Lab, Nano Banana Prompt Lab) | Added as 7 independent archive entries, per Ahmed's explicit display instruction. English Language Assessment Platform and Digital Transformation Exams Platform are additionally marked `featured: true` per his instruction that those two "must each appear as a clear independent project." "Nano Banana Prompt Lab" specifically was not found by name in the README (the README documents the other six portals and the AI Studio tools explicitly) — marked `source: "Owner-provided"` rather than README-confirmed, and this distinction is stated on its case-study page. |
| AI Studio tools (14 items in Ahmed's list) | Folded into the NexaLearn case study's features list rather than given 14 separate archive cards, per Ahmed's explicit display rule. The 3 tools he named as strongest (AI Mentor, Prompt Studio, Claude Code Prompt Generator) were additionally given their own independent archive entries, all confirmed against the README. The remaining ones (Prompt Score, Prompt Battle, Tool Recommender, AI Tools Comparison, Roadmap Generator, Project Generator, Smart Search, Challenges, Leaderboard, Certificate System, CMS/Admin) are described only inside the NexaLearn case study's feature list, not as separate pages, per Ahmed's own display rule. |

### Updated project count

The catalog grew from 16 to **30 projects** (10 featured, 20 archive-only).
Every slug has a corresponding `/projects/:slug` case-study page and a
`public/sitemap.xml` entry; `npm test` enforces this automatically.

## 2026-07-10 update

This update re-verified the account via direct GitHub page fetches (not the
authenticated `gh` CLI used on 2026-07-09) and specifically checked every
project name the site owner named as "known real projects," because several
of those names do not match GitHub repository slugs 1:1.

### Findings for the specifically named projects

| Name as given | Result |
|---|---|
| `career-ops` | No repository with this slug exists under `Darhous`. |
| `ATS Resume` / `atsresume` | No repository named `atsresume` exists. The real, verifiable ATS work is the **ATS Resume Analyzer** feature documented in the `Darhous-career-hub-google` README (CV upload in PDF/TXT, AI-assisted matching and weakness detection via Gemini). The portfolio now titles that project "Darhous Career Hub — ATS Resume Analyzer" so the feature the owner asked to showcase is front and center. |
| `Shemo Studio` | Confirmed: repository `Shemo-Studio` exists (PHP/WordPress, custom plugin `shemo-core` + child theme `shemo-child`, 35 commits). No public description or live URL. Added to the archive as a real, modest project. |
| `Darhous Project Lab` | No repository or page matching this name was found. Not included, and not invented. |
| `Elfady Car Trading` | Repository `elfady` exists under the account but is **public and empty** (no files, no README). Added to the archive with an explicit "Early / repository empty" status so it is listed honestly instead of either omitted or faked. |
| `Fenrir` / fuzzing / cybersecurity repos | No repository matching this name or description was found under `Darhous`. Not included. |
| `AI Memory Vault` | No repository or page matching this name was found. Not included. |

### Newly discovered projects (not in the 2026-07-09 inventory)

- **`almasa-lab-proposal`** — a real, well-documented React 19 + TypeScript + Vite + Tailwind v4 + Framer Motion project: an interactive Arabic/RTL proposal for a medical laboratory's digital transformation (website, patient portal, staff app, admin dashboard, backend), built as a section-by-section decision log (approve/modify/defer/exclude, persisted in `localStorage`, no backend). Added to the archive **and featured**, since it is Ahmed's clearest evidence of product/consulting work beyond his own learning platforms.
- **`Almasa`** (bare repo, no hyphenated suffix) — empty, excluded.
- **`darhous-career-hub`** (without the `-google` suffix) — empty, excluded in favor of `Darhous-career-hub-google`, which has real content.
- **`darhous-assessment`** — full-stack (JS/Python) assessment app, live at `https://darhous-assessment.vercel.app`, 30 commits, no public README describing the domain in detail. Added to the archive, not featured (evidence is metadata-only).
- **`Exams_Platform`** — Python exam administration/grading system with Gemini-based feedback and Telegram/WhatsApp notifications. No public README. Added to the archive, not featured.
- **`darhous-marketing-social-hub`** — Next.js Arabic-first marketing/social-media portal on a custom RTL design system. Has a real README. Added to the archive, not featured (prototype-stage per its own README).
- **`whatsapp-auto-poster`** — small Python + GitHub Actions utility that posts to WhatsApp on a schedule. Added to the archive as a minor automation utility, not featured.

### Repository inventory (superset of both discovery passes)

| Repository | Language | Visibility | Live URL | Portfolio Treatment |
|---|---:|---|---|---|
| `portofolio` | TypeScript | Public | `https://darhous.github.io/portofolio/` | Portfolio identity system |
| `arabic-legal-research-skill` | Python | Public | - | Featured — flagship legal-tech project |
| `darhous-ai-cloud-academy` | TypeScript | Public | `https://darhous-ai-cloud-academy.vercel.app` | Featured learning ecosystem |
| `ShahY-Store` | TypeScript | Public | `https://shah-y-store.vercel.app` | Featured live commerce project |
| `Store-Master-Template` | TypeScript | Public | - | Archive — commerce foundation extracted from ShahY Store |
| `darhous-automation-academy` | TypeScript | Public | - | Archive — automation learning product |
| `Darhous-career-hub-google` | TypeScript | Public | - | Featured — ATS Resume Analyzer + career tools |
| `darhous-iot-lab` | TypeScript | Public | - | Featured — IoT/Arduino learning product |
| `almasa-lab-proposal` | TypeScript | Public | GitHub Pages (URL not confirmed) | Featured — client digital-transformation proposal |
| `Shemo-Studio` | PHP | Public | - | Archive — WordPress theme/plugin build |
| `darhous-assessment` | JS/Python | Public | `https://darhous-assessment.vercel.app` | Archive |
| `Exams_Platform` | Python | Public | - | Archive |
| `darhous-marketing-social-hub` | TypeScript | Public | - | Archive |
| `whatsapp-auto-poster` | Python | Public | - | Archive |
| `elfady` | - | Public, empty | - | Archive — listed honestly as empty/early-stage |
| `test` | - | Public | - | Excluded — non-portfolio signal |
| `Almasa` | - | Public, empty | - | Excluded — empty |
| `darhous-career-hub` | - | Public, empty | - | Excluded — empty duplicate of `Darhous-career-hub-google` |
| `asuma-store` | - | Public, empty | - | Excluded — empty |
| `aurve` | HTML | Private | - | Excluded — private |
| `job-search` | JavaScript | Private | - | Excluded — private |
| Guardian-Nexus | - | No public repo | - | Featured — CV-sourced only, marked private, no invented public link |

### Case study candidates (final selection, `featured: true` in `src/data/projects.ts`)

1. Arabic Legal Research Skill Framework — strongest technical evidence (233 tests, 96.12% coverage, CI).
2. Darhous AI Cloud Academy — broadest live product, PWA, multi-domain learning ecosystem.
3. ShahY Store — real production commerce system with admin/auth/orders.
4. Darhous Career Hub — ATS Resume Analyzer — directly answers the owner's "career-ops / ATS Resume" naming with the real, working feature.
5. Darhous IoT Lab — largest content volume, strongest Arabic-first educational evidence.
6. Almasa Medical Laboratory Digital Transformation Proposal — clearest consulting/client-facing evidence.
7. Guardian-Nexus — CV-sourced AI/security-ops architecture, kept private/CV-sourced as instructed.

### Open content gaps (unchanged from 2026-07-09, still true)

- `Shemo-Studio`, `darhous-assessment`, `Exams_Platform`, `darhous-marketing-social-hub`, and `whatsapp-auto-poster` have no public README with feature-level detail; their portfolio descriptions are limited to what GitHub metadata and file structure actually show.
- `elfady` has no code to describe at all.
- Private repositories (`aurve`, `job-search`) are not described beyond their existence, per the confidentiality rule in `AGENTS.md`.
