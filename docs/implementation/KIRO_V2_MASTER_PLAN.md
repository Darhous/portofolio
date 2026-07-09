# KIRO V2 Master Plan

Project: Ahmed Darhous Portfolio V2
Branch: kiro/portfolio-v2
Started: 2026-07-10
Last Updated: 2026-07-10

---

## Stations

| # | Station | Status | Commit | Acceptance |
|---|---------|--------|--------|------------|
| 0 | Baseline and Protection | IN PROGRESS | — | Tag exists, branch exists, build passes, screenshots saved |
| 1 | Repository Cleanup | NOT STARTED | — | Root clean, docs archived, README professional |
| 2 | Source-of-Truth Data Correction | NOT STARTED | — | No placeholders, no wrong institution, all CV-verified |
| 3 | Complete Content Rewrite | NOT STARTED | — | Hero human-audience copy, no internal language |
| 4 | Design System and Brand Upgrade | NOT STARTED | — | Favicon, OG image, Arabic font, contrast fixed |
| 5 | Navigation and Responsive Layout | NOT STARTED | — | Mobile menu, no horizontal overflow |
| 6 | Hero, About and Expertise Experience | NOT STARTED | — | First viewport clear, portrait framed well |
| 7 | Experience, Education and CV | NOT STARTED | — | Timeline correct, CV renamed, no broken links |
| 8 | Projects Discovery and Curation | NOT STARTED | — | 5-6 featured, Labs present, 4 mandatory projects investigated |
| 9 | Contact Form and Footer | NOT STARTED | — | Footer matches exactly, form honest |
| 10 | SEO, Performance and Accessibility | NOT STARTED | — | Lighthouse targets met |
| 11 | Testing and Quality Gates | NOT STARTED | — | ESLint, Vitest, CI pipeline all passing |
| 12 | Full Visual QA | NOT STARTED | — | All breakpoints tested, screenshots saved |
| 13 | Merge and Production Deployment | NOT STARTED | — | Production live and verified |
| 14 | Post-Deployment Report | NOT STARTED | — | Final report complete |

---

## Git Strategy

- Backup Tag: v0.1.0-pre-kiro-v2
- Implementation Branch: kiro/portfolio-v2
- Merge to main: only after Station 12 QA passes
- No force push at any point

---

## Acceptance Criteria for "Done"

- Production site live at https://darhous.github.io/portofolio/
- GitHub Actions green
- Content human-audience oriented
- Data matches CV
- Hero communicates Ahmed's identity in under 10 seconds
- Mobile navigation works
- EN and AR both work
- Featured Projects organized (5-6 max)
- 4 mandatory projects investigated: career-ops, atsresume, Shemo Studio, Darhous Project Lab
- No broken links
- CV downloads as Ahmed-Darhous-CV.pdf
- Favicon and OG image work
- Footer matches AGENTS.md exactly
- Contact workflow honest
- Build, TypeCheck, Lint, Tests all pass
- Before/after screenshots saved
- All stations committed and pushed
- Final report complete
