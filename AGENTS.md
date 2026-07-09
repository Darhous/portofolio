# Portfolio Agent Instructions

These rules are permanent for the Ahmed Darhous portfolio. They override generic defaults for this project.

## Identity And Source Of Truth

- Use `src/config/site.ts` as the single source for official contact links, social links, owner identity, repository URL, CV path, portrait path, and social ordering.
- Do not hardcode official links in multiple components.
- Do not replace official links with placeholders, invented accounts, or alternatives.
- Keep the portfolio repository URL exactly `https://github.com/Darhous/portofolio`.

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

Display social links in this exact order in the footer and all contact sections:

1. Instagram
2. LinkedIn
3. Facebook
4. WhatsApp
5. GitHub

## Footer Requirements

- Every page must use the shared `Footer` component.
- The footer must always include the exact visible signature: `Designed & Developed by Ahmed Darhous`.
- `Ahmed Darhous` in the signature must link to `mailto:ahmeddarhous@gmail.com`.
- The footer must include copyright with the current year generated dynamically.
- The footer must include Download CV, Contact, Back To Top, and social icons.
- The footer must support responsive layouts and RTL/LTR direction.

## Link Rules

- Every external link must use `target="_blank"` and `rel="noopener noreferrer"`.
- Prefer the shared `ExternalLink` component for external links.
- Internal document download links, such as the CV, may remain normal anchors with `download`.

## Documentation

- Keep these rules documented in both `AGENTS.md` and `CODEX_MEMORY.md`.
- Future changes must preserve the same footer identity, contact information, and social order unless Ahmed Darhous explicitly instructs otherwise.

## Deployment

- GitHub Pages source is GitHub Actions.
- Do not use the suggested Jekyll workflow.
- The deployment workflow must live at `.github/workflows/deploy.yml`.
- The Vite base path must remain `/portofolio/`.
- The workflow must install dependencies, run available checks, build `dist`, deploy with GitHub Pages Actions, and verify `https://darhous.github.io/portofolio/`.
