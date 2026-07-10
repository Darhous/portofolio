# Project Discovery

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
