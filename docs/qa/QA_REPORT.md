# QA Report

Date: 2026-07-09  
Production URL: `https://darhous.github.io/portofolio/`  
Latest tested deployment run: `29046650767`

## Commands

```powershell
npm run typecheck --if-present
npm run test --if-present
npm run build
```

All commands passed.

## Browser QA

Tested with the in-app browser against production.

### Desktop Viewport

- Viewport: 1440 x 1000
- Screenshot: `docs/qa/screenshots/production-desktop.png`
- Horizontal overflow: none
- Hero headline fits inside the tested first viewport
- Hero image served as WebP: `ahmed-darhous-640.webp`
- Console errors: none

### Mobile Viewport

- Viewport: 390 x 844
- Screenshot: `docs/qa/screenshots/production-mobile.png`
- Horizontal overflow: none
- Replay intro button moved away from bottom copy area
- Hero image served as WebP: `ahmed-darhous-640.webp`
- Console errors: none

## Accessibility Checks

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

## Footer Identity Checks

- Exact signature exists: `Designed & Developed by Ahmed Darhous`.
- `Ahmed Darhous` in the footer points to `mailto:ahmeddarhous@gmail.com`.
- Footer social order verified:
  1. Instagram
  2. LinkedIn
  3. Facebook
  4. WhatsApp
  5. GitHub
- External contact/social links have `target="_blank"` and `rel="noopener noreferrer"`.

## Performance Notes

Built asset sizes from local production build:

- HTML: about 1.65 KB
- CSS: about 11 KB
- JavaScript: about 238 KB
- Gzipped JavaScript from Vite output: about 74 KB

Optimized portrait variants:

- `ahmed-darhous-384.webp`: about 12.6 KB
- `ahmed-darhous-640.webp`: about 23.4 KB
- `ahmed-darhous-960.webp`: about 38.8 KB

The original PNG remains as fallback, but browser QA confirmed WebP is selected in production.

## Deployment QA

- GitHub Pages source: GitHub Actions
- Workflow: `.github/workflows/deploy.yml`
- Vite base path: `/portofolio/`
- Production URL verification step: passed
