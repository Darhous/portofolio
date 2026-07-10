# Ahmed Darhous Portfolio Design System

## Direction

The visual direction is an executive command surface: security discipline, legal authority, and AI operations without looking like a generic SaaS dashboard.

## Tokens

- Ink: `#f4efe6`
- Night: `#101211`
- Panel: `#171b1b`
- Line: `#3a3d37`
- Copper: `#d48b5d`
- Signal Cyan: `#63d4c8`
- Field Olive: `#9fa65d`

## Typography

- System UI stack for performance and reliable Arabic/English rendering.
- Large compressed hero scale for first impression.
- Smaller dense headings inside cards and operational panels.

## Layout

- Single-page portfolio with anchored sections.
- First viewport presents the actual portfolio, not a marketing landing page.
- Portrait is used as a real visual asset and paired with the command-surface concept.
- Cards are reserved for individual repeated items.

## Motion

- Intro uses a short cinematic sequence with Skip and Replay controls.
- Motion is disabled for users with `prefers-reduced-motion: reduce`.
- Hover/focus motion is subtle and never required to reveal content.

## Accessibility

- Semantic sections and headings.
- Keyboard-visible focus outlines.
- External links use safe target and rel attributes through `ExternalLink`.
- RTL/LTR is toggled at the app shell level.
- All overlays (mobile drawer, command palette) trap focus, close on `Escape`, and restore focus to their trigger on close via `useFocusTrap`.
- Logical CSS properties (`inset-inline-*`, `border-inline-*`) are used for new components so RTL mirrors automatically instead of via duplicated `[dir="rtl"]` overrides.

## Navigation And Interaction (added 2026-07-10)

- The site is multi-page (`react-router-dom`), not a single anchored scroll. Cross-page anchors (e.g. "About" from `/projects`) navigate to `/#about` and a shared `useHashScroll` hook scrolls the target into view once mounted, respecting reduced motion.
- A `Ctrl/Cmd+K` command palette provides a single search surface across navigation, all 16 projects, and quick actions (download CV, email, WhatsApp, toggle language, back to top). It is intentionally the only "power user" surface — no terminal easter eggs or gamified interactions, to stay consistent with the "no hacker cliché" rule.
- The mobile nav is a real hamburger + slide-in drawer (not a horizontal-scroll row), rendered through a React portal to `document.body` so it is never affected by an ancestor's `backdrop-filter`/`transform` establishing a containing block for its `position: fixed` overlay.
- Full case-study pages (`/projects/:slug`) use the same visual language as the rest of the site — no separate "case study theme."
