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
