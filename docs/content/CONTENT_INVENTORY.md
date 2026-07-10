# Portfolio Content Inventory

## Primary Sources

- `Profile.pdf`
- Portrait image: `CE933E3B-D6AB-4FD6-A89B-651BD7022FB8.PNG`
- GitHub repositories under `https://github.com/Darhous`
- Repository README files where accessible
- Official contact rules in `AGENTS.md` and `CODEX_MEMORY.md`

## Current Website Sections And Pages

The site is now a multi-page React Router application (`react-router-dom`,
`BrowserRouter`) instead of a single anchored page. `RootLayout` renders the
shared intro, header, footer, and command palette around an `<Outlet />`.

| Route | Page component | Purpose |
|---|---|---|
| `/` | `src/pages/HomePage.tsx` | Hero, about, expertise, experience, featured projects, case-study teasers, CV, quick contact |
| `/projects` | `src/pages/ProjectsArchivePage.tsx` | Full searchable/filterable archive of all 16 known projects |
| `/projects/:slug` | `src/pages/ProjectCaseStudyPage.tsx` | Full case study per project (context, problem, constraints, approach, features, challenges/solutions, results, status, lessons, related projects) |
| `/contact` | `src/pages/ContactPage.tsx` | Structured compose form (mailto/WhatsApp) + direct channels |
| `/404` and any unmatched path | `src/pages/NotFoundPage.tsx` | On-brand 404 with search/home CTAs |

| Section (on Home) | Component | Source |
|---|---|---|
| Cinematic intro | `src/components/Intro.tsx` | Master prompt direction |
| Hero (+ stat indicators) | `src/components/Hero.tsx` | CV headline and portfolio positioning |
| About | `src/components/AboutSection.tsx` | CV summary and skills |
| Expertise | `src/components/ExpertiseSection.tsx` | CV + project evidence |
| Experience | `src/components/ExperienceSection.tsx` | `Profile.pdf` |
| Featured projects | `src/components/ProjectsSection.tsx` + `src/components/ProjectCard.tsx` | GitHub metadata + README evidence + CV, `featured: true` only |
| Case study teasers | `src/components/CaseStudiesSection.tsx` | Same data, links to full `/projects/:slug` pages |
| Contact (quick) | `src/components/ContactSection.tsx` | Official contact config + link to `/contact` |
| Footer | `src/components/Footer.tsx` | Permanent footer rule |

### New navigation and interaction components

- `src/components/Header.tsx` — desktop nav + language toggle + command-palette trigger + hamburger, with the mobile drawer rendered through a React portal (see `PORTFOLIO_IMPLEMENTATION_LOG.md` for why).
- `src/components/CommandPalette.tsx` — `Ctrl/Cmd+K` palette: navigate to any section/project, download CV, email, WhatsApp, toggle language, back to top.
- `src/components/ContactForm.tsx` — structured compose form (name, email, project type, budget, message) that builds `mailto:` and `wa.me` links client-side, with validation, success/error states, and a hidden honeypot field.
- `src/hooks/useFocusTrap.ts`, `src/hooks/useHashScroll.ts`, `src/hooks/useCommandPaletteShortcut.ts`, `src/hooks/usePageMeta.ts` — shared behavior for accessibility and per-route SEO.

## Bilingual Content State

- English and Arabic content exist in `src/data/profile.ts`, `src/data/projects.ts`, and `src/data/content.ts`.
- Arabic content is professional Arabic, not literal machine translation.
- RTL/LTR switching is implemented at the app shell level.

## Permanent Identity Data

All permanent contact links live in `src/config/site.ts` and must not be duplicated across components.

## Content Exclusion Rules

- Do not use placeholder links.
- Do not invent clients, employers, awards, or testimonials.
- Do not expose private repo internals.
- Do not promote weak or empty repositories into featured case studies without source evidence.

## Remaining Improvement Backlog

- Add dedicated CV section with a production PDF open/download panel. (Done.)
- Add featured case-study detail cards beyond compact project cards. (Done — full `/projects/:slug` pages.)
- Add optimized responsive portrait assets. (Done.)
- Add QA screenshots and performance notes. (Done, see `docs/qa/QA_REPORT.md`.)
- Route-level code splitting (`React.lazy` per page) if the JS bundle needs to shrink further.
- Lighthouse CI run against the production URL once a suitable runner is available in this environment.
- Expand the thin-evidence archive entries (`Shemo-Studio`, `darhous-assessment`, `Exams_Platform`, `darhous-marketing-social-hub`, `whatsapp-auto-poster`, `elfady`) if Ahmed adds public READMEs or screenshots to those repositories.
