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
- Verification passed: `npm test`, `npm run typecheck`, `npm run build`, desktop/mobile browser QA, and production smoke test.
