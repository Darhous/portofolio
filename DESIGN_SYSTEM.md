# Ahmed Darhous Portfolio Design System

Last rebuilt: 2026-07-10 (premium editorial rebrand)

## Direction

A complete visual rebrand away from the earlier "command surface" concept.
The reference points are luxury/editorial brands (Apple, Leica, Porsche,
Aesop, Linear, Stripe Press) rather than developer-portfolio or AI-product
conventions. Explicitly avoided: neon, glassmorphism, particles, terminal/
hacker aesthetics, glow effects, heavy gradients, skill-percentage bars,
floating badges.

## Tokens

Deep matte black background with graphite/charcoal panel surfaces and
titanium-silver hairline borders — no bright white anywhere, no saturated
UI chrome.

- `--night` `#0a0a09` — page background
- `--panel` `#121110` / `--panel-strong` `#181715` — card/panel surfaces
- `--ink` `#f2ede2` (warm white) / `--ink-dim` `#cfc9ba` / `--muted` `#9c9689` / `--dim` `#6c675c`
- `--line` `rgba(216, 210, 194, 0.14)` / `--line-strong` `rgba(216, 210, 194, 0.26)` — hairlines only, never solid fills

## Accent strategy

The site itself stays monochrome. Each project **category** (not each
individual project) gets one restrained accent color, defined in
`src/data/accents.ts` and applied via a `--accent` CSS custom property set
inline on the card/case-study wrapper. The accent only ever appears in
small details: a 2px top hairline on a project card, a category label
color, a case-study section heading. It is never a background or a
dominant fill.

Anchor examples (chosen to match the owner's own reference palette):
Automotive → deep burgundy, Legal Tech → royal purple, Security → emerald,
AI Tools → champagne gold, Mobile/IoT → ice blue, Hospitality → copper,
Portfolio → titanium silver. The remaining categories extend this same
jewel-tone/metal family (sapphire, bronze, moss, slate, terracotta,
indigo, teal) so all 17 project categories stay visually coherent.

## Typography

- Display/headline: **Fraunces** (serif, editorial, self-hosted via
  `@fontsource/fraunces`, weights 400/500/600 + 500-italic).
- Body/UI: **Inter** (self-hosted via `@fontsource/inter`, weights
  400/500/600/700).
- Both are self-hosted npm packages (`src/fonts.css`), not a Google Fonts
  CDN request — no external network call, no render-blocking third-party
  origin.
- Large, generous scale: hero name `clamp(2.6rem, 6.2vw, 5.6rem)` in
  Fraunces 500; body copy 1rem/1.7 in Inter. Kickers/eyebrows are Inter
  600, uppercase, 0.16em tracking — the only "loud" typographic move on
  the site, used sparingly as section labels.

## Hero

Deliberately minimal, matching the "magazine cover" brief: large portrait
as the visual centerpiece, large serif name, one small subtitle line (the
CV's own headline), one short positioning statement, exactly two CTAs
(Download CV / Get in Touch). No stat counters, no floating badges — those
were explicitly removed from this version.

## Motion

- `--ease-premium: cubic-bezier(0.16, 1, 0.3, 1)` for entrances/reveals.
- `--ease-standard: cubic-bezier(0.4, 0, 0.2, 1)` for hovers/toggles.
- The intro is a short (~2s), skippable wordmark reveal — no "boot
  sequence" line-by-line terminal effect.
- All motion is disabled under `prefers-reduced-motion: reduce` (the intro
  overlay is skipped entirely).

## Components

- Cards (`project-card`, `case-card`): hairline border, flat panel
  background, a single 2px accent-colored top hairline, generous padding,
  small corner radius (`--radius: 3px`) for an architectural rather than
  bubbly feel.
- Buttons: hairline border by default; the primary action is filled with
  warm white on near-black text. Hover states shift the border to the
  contextual accent and lift 1px — no heavy shadows or glows.
- Resume/experience (`resume-block`, `resume-role`): an editorial
  timeline — role/org/date header over a hairline rule, bullets below —
  used for the Experience section rather than a side-by-side card grid.

## Accessibility

- Semantic sections and headings; a single `h1` per page.
- Keyboard-visible focus outlines (`outline: 1.5px solid var(--ink)`).
- All overlays (mobile drawer, command palette) trap focus, close on
  `Escape`, and restore focus to their trigger on close.
- Logical CSS properties (`inset-inline-*`, `inset-block-*`) are used for
  directional details (e.g. the hero portrait's decorative frame) so RTL
  mirrors correctly instead of via duplicated `[dir="rtl"]` overrides.
- RTL/LTR is toggled at the app-shell level; verified visually in both
  directions after this rebuild.
