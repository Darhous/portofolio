# Ahmed Darhous — Portfolio

Personal professional portfolio for Ahmed Darhous: executive security and risk leader, legal expert, AI operations practitioner, and digital product builder.

**Live site:** [darhous.github.io/portofolio](https://darhous.github.io/portofolio/)

---

## About

Ahmed Darhous operates at the intersection of law enforcement discipline, legal authority, AI-powered intelligence, and software product development. This portfolio presents his professional profile, career history, projects, and contact information in a bilingual English/Arabic interface.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + TypeScript |
| Build tool | Vite 6 |
| Styling | Single global CSS (design tokens) |
| Icons | Lucide React |
| Deployment | GitHub Pages via GitHub Actions |
| Language | Bilingual — English (LTR) and Arabic (RTL) |

---

## Running Locally

```bash
npm install
npm run dev
```

The dev server starts at `http://127.0.0.1:5173/portofolio/`

---

## Building

```bash
npm run build
```

Output is placed in `dist/`. The Vite base path is `/portofolio/` to match the GitHub Pages subdirectory.

---

## Quality Checks

```bash
npm run typecheck   # TypeScript strict check
npm test            # Content identity verification
npm run lint        # ESLint
npm run build       # Full production build
```

---

## Bilingual Support

The site fully supports English (LTR) and Arabic (RTL). Language toggle is available in the navigation bar. Arabic text uses IBM Plex Sans Arabic for authentic glyph rendering.

---

## Accessibility

- WCAG AA color contrast on all text
- Skip-to-content link
- Full keyboard navigation
- Screen reader landmarks and ARIA labels
- `prefers-reduced-motion` respected
- Touch targets meet 44px minimum

---

## Deployment

Deployment is automated via GitHub Actions at `.github/workflows/deploy.yml`. Any push to `main` triggers:

1. `npm ci`
2. `npm run lint`
3. `npm run typecheck`
4. `npm test`
5. `npm run build`
6. Deploy to GitHub Pages
7. Verify production URL

---

## Project Structure

```
src/
  config/site.ts      — Single source of truth for contacts, social links, assets
  data/
    profile.ts        — Experience, education, skills, expertise
    projects.ts       — Portfolio projects data
    content.ts        — UI copy in EN and AR
  components/         — React components
  styles.css          — Global design tokens and layout
public/               — Static assets (portrait, CV, sitemap, robots.txt)
docs/
  audit/              — Pre-v2 audit reports
  content/            — CV analysis and content inventory
  implementation/     — V2 implementation logs and decisions
  archive/            — Archived planning documents
```

---

## Attribution

Designed and developed by [Ahmed Darhous](mailto:ahmeddarhous@gmail.com).

Portrait photography: personal.  
Icons: [Lucide](https://lucide.dev) (ISC License).  
Fonts: [IBM Plex Sans Arabic](https://fonts.google.com/specimen/IBM+Plex+Sans+Arabic) (SIL Open Font License).
