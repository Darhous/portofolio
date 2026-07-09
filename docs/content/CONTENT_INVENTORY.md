# Portfolio Content Inventory

## Primary Sources

- `Profile.pdf`
- Portrait image: `CE933E3B-D6AB-4FD6-A89B-651BD7022FB8.PNG`
- GitHub repositories under `https://github.com/Darhous`
- Repository README files where accessible
- Official contact rules in `AGENTS.md` and `CODEX_MEMORY.md`

## Current Website Sections

| Section | Component | Source |
|---|---|---|
| Cinematic intro | `src/components/Intro.tsx` | Master prompt direction |
| Hero | `src/components/Hero.tsx` | CV headline and portfolio positioning |
| About | `src/components/AboutSection.tsx` | CV summary and skills |
| Expertise | `src/components/ExpertiseSection.tsx` | CV + project evidence |
| Experience | `src/components/ExperienceSection.tsx` | `Profile.pdf` |
| Projects | `src/components/ProjectsSection.tsx` | GitHub metadata + README evidence + CV |
| Contact | `src/components/ContactSection.tsx` | Official contact config |
| Footer | `src/components/Footer.tsx` | Permanent footer rule |

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

- Add dedicated CV section with a production PDF open/download panel.
- Add featured case-study detail cards beyond compact project cards.
- Add optimized responsive portrait assets.
- Add QA screenshots and performance notes.
