# KIRO UI/UX Audit

Audit Date: 2026-07-10
Auditor: Kiro (UI/UX Auditor, Frontend Architect, Accessibility Specialist)
Production URL: https://darhous.github.io/portofolio/

---

## Executive Design Assessment

**One-sentence verdict:** The site has a technically competent dark design foundation with real potential, but it currently presents as a well-made template rather than a distinctly personal premium portfolio — the content copy undermines the visual ambition, and several layout decisions reduce impact.

---

## Visual Identity Assessment

### Color System

| Token | Value | Usage | Assessment |
|---|---|---|---|
| `--ink` | `#f4efe6` | Primary text | ✅ Warm white — not harsh |
| `--muted` | `#b9b2a7` | Secondary text | ✅ Good readability |
| `--dim` | `#817b71` | Tertiary text | ⚠️ May fail WCAG AA on dark panels |
| `--night` | `#101211` | Background | ✅ Deep, not pure black |
| `--panel` | `#171b1b` | Card backgrounds | ✅ Subtle differentiation |
| `--panel-strong` | `#202525` | Stronger panel | Used inconsistently |
| `--line` | `#3a3d37` | Borders | ✅ Subtle, appropriate |
| `--copper` | `#d48b5d` | Accent, CTAs | ⚠️ Warm but low-contrast on dark bg |
| `--cyan` | `#63d4c8` | Secondary accent, kickers | ✅ High contrast, strong signal |
| `--olive` | `#9fa65d` | Portrait border decoration | ⚠️ Barely visible, adds little |

**Color analysis:**
- The palette is coherent and distinctive. The night/copper/cyan combination reads as "serious, intelligent, executive."
- Copper is used for CTAs (primary action button). The contrast ratio of copper `#d48b5d` on night `#101211` is approximately 4.2:1 — this passes WCAG AA for normal text but fails for small text below 18px.
- `--dim` (`#817b71`) on `--panel` (`#171b1b`) is approximately 3.2:1 — fails WCAG AA (requires 4.5:1 for normal text). Used for "Source: GitHub README" labels and project action secondary text.
- The olive accent on the portrait border decoration is barely visible and adds no clear design value.

---

### Typography

**Font stack:** `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`

- No web font loaded — uses system fonts. This is a performance choice but means the site renders in whatever system Inter/sans-serif is available. On systems without Inter, the font will fall back to system UI, which may look different.
- `text-rendering: optimizeLegibility` and `-webkit-font-smoothing: antialiased` are applied — correct.
- **Hero H1:** `clamp(2.8rem, 5vw, 4.8rem)` — scales well. At 1440px viewport this renders at ~72px, which is strong.
- **H2:** `clamp(2.1rem, 5.2vw, 5.2rem)` — large section headings. Good hierarchy.
- **Body text:** `clamp(1rem, 2vw, 1.2rem)` — comfortable reading size.
- **Line height:** 1.7 on body paragraphs — correct for readability.
- **Issue:** Arabic text uses the same Inter stack. Inter has limited Arabic glyph support. Arabic text will fall through to `system-ui` which may be inconsistent across devices (Cairo, Noto Naskh, or Tahoma depending on OS). For a genuinely bilingual portfolio, an Arabic-supporting font like IBM Plex Arabic or Noto Sans Arabic should be considered.

---

### Layout and Spacing

**Grid:** Max-width 1180px with `min(1180px, calc(100% - 32px))` — good responsive constraint.

**Hero layout:**
- Two-column: `1.08fr` for copy, `0.72fr` for portrait
- Portrait column has `minmax(300px, 0.72fr)` — this means the portrait never collapses below 300px, which can cause layout pressure on mid-size viewports (820px–1040px).
- At 820px breakpoint, the layout collapses to 1 column. The portrait appears below the hero copy, which is standard but means on tablet the portrait has already disappeared from the primary viewport by the time the page loads.

**Section spacing:**
- `padding: 86px 0` per section — generous but consistent.
- `border-top: 1px solid var(--line)` on every section — provides clear visual division.
- Gap between section heading and content: `margin-bottom: 34px` — appropriate.

**Issue — Expertise grid on tablet:**
- `repeat(4, minmax(0, 1fr))` collapses to `repeat(2, minmax(0, 1fr))` at 1040px. This means 4 cards become 2×2. On a 900px viewport, each card is approximately 435px wide with 260px min-height. Cards feel spacious but the section becomes very tall (two rows of tall cards).

**Issue — Project cards min-height:**
- `.project-card { min-height: 520px }` — this forces all cards to 520px minimum height even if content is short. Creates excessive whitespace in cards with brief descriptions. On mobile, `min-height` is removed.

---

## Section-by-Section Visual Review

### Intro Animation
- Three lines animate in sequentially with 700ms delay between each.
- Lines use `clamp(2rem, 8vw, 6.8rem)` font size — very large, impactful.
- Line 2 is copper, Line 3 is cyan — clear visual hierarchy.
- Skip button is visible at top-right — accessible and obvious.
- Replay button appears after intro completes (top-right, fixed position at 84px from top) — clever detail.
- **Issue:** The intro says "Law enforcement discipline / Legal authority / AI-driven operations" — good framing, but "AI-driven operations" feels like a subtitle for a software product, not a security executive. "Operational intelligence" might be stronger.
- **Issue:** The replay button position (fixed `right: 16px, top: 84px`) overlaps with where the sticky nav appears after scroll. On small screens, the replay button can occlude navigation links.

### Hero
**Desktop:**
- Two-column layout with the copy commanding ~60% width — good proportion.
- H1 `"Security, law, and AI operations in one command surface."` is visually strong at large size.
- The principle quote in copper is visually distinctive and memorable.
- Portrait with the decorative olive border offset creates depth — the concept is good.
- Portrait caption (name + location) overlays the bottom of the image with glassmorphism background — well executed.
- Social links with labels below the actions — good. Full labels are more accessible than icon-only.
- **Issue:** Three CTA buttons (Download CV, Contact, View Repository) are presented equally. The primary (copper) is Download CV. But "View Repository" as a hero action sends visitors away from the portfolio immediately. This is a weak signal — most recruiters do not want to go to GitHub from the hero.
- **Issue:** The hero body text is about the portfolio ("A premium bilingual portfolio for an executive security profile..."), not about Ahmed. A first-time visitor reads "portfolio" and "bilingual" — neither tells them what Ahmed does.
- **Issue:** No immediate quantified value proposition. "9+ years" or "200+ personnel" appears nowhere in the hero.

**Mobile (under 820px):**
- Collapses to single column. Copy first, portrait below.
- Portrait max-width capped at 430px — good.
- Portrait caption moves to static position below image — this is a fallback that works but breaks the glassmorphism overlay concept.
- H1 font scales well with `clamp`.
- Buttons stack to full-width at 520px — good for thumb interaction.

### About
- Two-column grid: statement panel (wide) + compact panels (narrow) for skills, languages, certifications.
- Education panel spans full width at bottom.
- **Issue:** The section kicker "Profile Evidence" and title "Built from the CV, not guesswork" are internal/meta language. This section currently reads like a developer's content manifest.
- The skills tag cloud uses cyan border with cyan text on dark background — visually distinctive.
- **Issue:** Tags are all the same visual weight. No differentiation between core skills and secondary skills.

### Expertise
- 4-column grid on desktop: clean, all cards equal height with `min-height: 260px`.
- Each card has a title and a paragraph — simple and readable.
- **Issue:** No icon or visual element differentiates the four domains. All cards look identical in structure. A security shield, scales of justice, neural network, and code symbol would add instant visual parsing.
- **Issue:** Domain 4 ("Digital Products & Bilingual Systems") feels significantly lower-status than Domains 1-3. On a security executive portfolio, listing React and Next.js as an expertise domain risks making Ahmed appear junior on the technical side.

### Experience
- Two-column cards: metadata left, highlights right — clean and functional.
- `experience-card li::before { content: "■ " }` — square bullet in cyan. Distinctive.
- Period displayed in copper (small tag) — good visual hierarchy.
- **Issue:** Organization is always "Government Security Organization (Egypt)" — three identical entries. This makes the experience section feel monotonous. The progression from investigation officer → planning lead → executive office manager is clear in the dates but the employer sameness reduces visual interest.
- **Issue:** Missing: the early police officer role and the freelance programmer thread.

### Projects
- 3-column grid on desktop, collapses to 2 on tablet, 1 on mobile.
- `min-height: 520px` on desktop — very tall cards.
- Status and category badges in copper border — subtle but consistent.
- Tech tags in cyan — good visual differentiation.
- "Source: GitHub README" text on every card — this meta label clutters the card bottom.
- **Issue:** 9 project cards is too many for a portfolio grid. Visual scanning becomes exhausting. Best practice for portfolio projects: 4-6 featured cards + a "more projects" link.
- **Issue:** Guardian-Nexus (Private/CV-sourced) card has no repo or live link — just a "Private / CV-sourced" label. This card looks visually empty compared to others. Needs a different treatment (e.g., a distinct "Confidential" badge rather than a disabled-looking span).
- **Issue:** Portfolio card (this site) as a project entry feels self-referential and wastes a card slot.
- **Issue:** Store Master Template and ShahY Store are conceptually the same project (template extracted from the store). Two separate cards for the same product lineage dilutes both.

### Case Studies
- 3-column grid: Problem / Approach / Result in definition list format — well-structured.
- `dt` labels in cyan uppercase — good scannability.
- **Issue:** Only 3 case studies shown (auto-selected by code). The selection algorithm (`projects.filter(p => p.caseStudy).slice(0, 3)`) means it will always show the first three projects that have caseStudy data — regardless of which are most strategically important.
- **Issue:** No visual connection between the case study and its project card above. A reader cannot easily link a case study to its full project entry.

### CV Section
- Simple and clean: file icon, title, description, open/download buttons.
- The CV is named `Profile.pdf` — when downloaded, it saves as `Profile.pdf` in the user's downloads folder. Should be `Ahmed-Darhous-CV.pdf`.
- Panel layout is clean and professional.

### Contact Section
- Grid layout: title/description left, contact methods right.
- Social links displayed below with labels — correct and well-executed.
- **Issue:** No contact form. For anyone uncomfortable with email clients or WhatsApp, there is no barrier-free contact option.
- **Issue:** The section does not use `SectionHeader` component — structural inconsistency.
- WhatsApp as a contact method is unusual for international corporate security clients. It signals regional (MENA) positioning which may or may not align with the global ambition described in the CV.

### Footer
- Three-column: signature / actions / social icons.
- Signature renders exactly as required: "Designed & Developed by Ahmed Darhous" with "Ahmed Darhous" linked to email.
- Actions: Download CV, Contact, Back To Top — all correct.
- Social icons: Instagram, LinkedIn, Facebook, WhatsApp, GitHub in correct order.
- `dir="auto"` on footer — correct for mixed-language content.
- **Issue:** Footer collapses to single column at 1040px which means on tablets, the footer becomes a long stacked list rather than a compact bar. The social icons and actions stack vertically, making the footer disproportionately tall.

---

## Accessibility Assessment

**Score: 6.5/10**

| Check | Status | Evidence |
|---|---|---|
| Skip link | ✅ Present | `.skip-link` in App.tsx, focus-visible triggered |
| Single H1 | ✅ | `id="hero-title"` in Hero.tsx |
| Semantic HTML | ✅ | `<header>`, `<main>`, `<nav>`, `<section>`, `<article>`, `<footer>` |
| `aria-labelledby` on sections | ✅ | All sections have `aria-labelledby` |
| `aria-hidden` on decorative icons | ✅ | All lucide icons have `aria-hidden="true"` |
| Keyboard navigation | ✅ | `focus-visible` outlines, `scroll-margin-top: 92px` for anchor targets |
| Focus visibility | ✅ | `outline: 2px solid var(--cyan)` on focus-visible |
| `prefers-reduced-motion` | ✅ | Full support: intro hidden, transitions collapsed |
| RTL/LTR switching | ✅ | App shell `dir` attribute changes with locale |
| Color contrast — primary text | ✅ | `--ink` on `--night` ≈ 17:1 |
| Color contrast — muted text | ✅ | `--muted` on `--night` ≈ 7.5:1 |
| Color contrast — dim text | ❌ | `--dim` on `--panel` ≈ 3.2:1 (fails AA) |
| Color contrast — copper CTA | ⚠️ | `--copper` on `--night` ≈ 4.2:1 (passes AA large, borderline normal) |
| Alt text on portrait | ✅ | `alt="Ahmed Darhous"` |
| Social links accessible names | ✅ | `aria-label={label}` and `title={label}` on social links |
| Buttons have accessible names | ✅ | Language toggle, intro skip/replay all labeled |
| No unlabeled interactive elements | ✅ | All confirmed labeled |
| Touch target sizes | ✅ | Minimum 42px height on interactive elements |
| Heading hierarchy | ⚠️ | H2→H3 inside sections is correct, but SectionHeader always renders H2 regardless of nesting |
| Intro `aria-hidden="true"` on lines | ⚠️ | Intro lines are `aria-hidden="true"` — but the intro `role="dialog"` has no `aria-modal` attribute |
| Mobile menu | ⚠️ | Nav overflows horizontally on mobile (scrollable `overflow-x: auto`) — not a menu, creates a hidden nav items problem on very small screens |
| Form accessibility | N/A | No forms exist |
| Language attribute | ✅ | `lang={locale}` on app shell, updates with toggle |

**Most critical accessibility issues:**
1. `--dim` text fails WCAG AA contrast (3.2:1 vs required 4.5:1)
2. Intro `role="dialog"` missing `aria-modal="true"` attribute
3. Nav horizontal scroll on mobile hides items off-screen without indication

---

## Mobile Experience Assessment

**Good:**
- Layout collapses correctly at 820px and 520px breakpoints
- Buttons stack to full width at 520px — thumb-friendly
- Font sizes scale with clamp — readable at all sizes
- Skip link visible on focus
- No horizontal overflow on body

**Problems:**
- Nav is a horizontal scroll strip on mobile — navigation items after the first few may not be visible without scrolling. No visual hint that more items exist.
- Portrait caption loses its overlay treatment and appears as a static block below the image on mobile — looks like an afterthought.
- Expertise cards collapse to 2-column on tablet, then 1-column on mobile — 4 tall cards stacked vertically is very long to scroll.
- Project cards: 9 cards stacked on mobile is exhausting.
- Footer on mobile: 3 sections stacked becomes very tall.

---

## Design Direction Assessment

### Does the design feel Premium?
**Partially.** The dark color scheme, typography scale, and grid structure are above the portfolio template baseline. The animated intro is a memorable differentiator. However, the lack of any custom illustration, data visualization, or original visual asset means the design relies entirely on typography and layout — which is honest but not distinctive.

### Does it express Ahmed's personality?
**Poorly.** The design says "security / tech" but does not say "Ahmed Darhous." There are no personal photographs beyond the portrait, no case study screenshots, no visual proof of the projects, no visual identity mark (no monogram, no logo, no symbol beyond the "AD" brand mark). A visitor cannot distinguish this portfolio from any other dark-themed security professional.

### Does it give a Senior impression?
**Yes, partially.** The grid layout, the copper/cyan color language, and the section structure communicate seniority. But the project cards listed side-by-side with a portfolio card and a "Foundation" status card dilute the impression.

### Is there excessive visual effects?
**No.** The design is actually restrained. Only the intro animation is prominent. Hover effects are subtle (1px upward translate + border color change). This restraint is appropriate for the target audience.

### Is the photo used professionally?
**Partially.** The portrait is present and the picture quality appears to be a professional photo (good lighting, appropriate attire based on the 1024×1536 image). The portrait offset decoration (olive border behind the image) is a clever spatial depth technique. However, the `object-position: center 18%` crop means the face appears in the upper portion of the frame, leaving the lower portion to show chest/torso area. This works but could be refined.

### Is the Call to Action clear?
**Partially.** Download CV is the primary CTA in copper. However, three CTAs in the hero (Download CV, Contact, View Repository) dilute the message. "View Repository" as a hero CTA is a misdirection.

---

## Design Direction Proposals

### Direction A: "Command Surface" (Refine Current)

**Concept:** Keep the existing dark/copper/cyan foundation but elevate it. Add subtle data visualizations (career timeline, skill radar), custom section dividers, a stronger monogram mark, and project screenshots.

**Visual feel:** Executive dashboard — structured, data-dense, authoritative.
**Colors:** Current palette + add a deep navy accent for depth.
**Typography:** Add a display font (e.g., Space Grotesk or DM Serif Display) for H1/H2 to differentiate from body text.
**Photography:** Add project screenshots as actual visual evidence.
**Project presentation:** Grid with hover-reveal details.
**Risk level:** Low — builds on existing work.
**Suitability for Ahmed:** High — consistent with current direction, lower rebuild cost.
**Pros:** Least disruptive, fastest to execute, preserves what works.
**Cons:** Still risks feeling like a polished template rather than a unique identity.

---

### Direction B: "Field Intelligence Brief" (Editorial Redesign)

**Concept:** Design the portfolio as if it were an executive intelligence brief — structured like a classified document aesthetic (redaction bars, typewriter-style annotations, evidence tags, operational stamps). Each project is treated as a "case file."

**Visual feel:** Spy thriller meets McKinsey slide deck. Bold, memorable, impossible to confuse with any other portfolio.
**Colors:** Near-black + amber/yellow signal color + white type. Monochrome with one stark accent.
**Typography:** Bold extended sans (e.g., Cabinet Grotesk) for headings, mono font for data/evidence labels.
**Photography:** Portrait treated with halftone or grain filter to lean into the editorial aesthetic.
**Project presentation:** "Case file" cards with redacted details, clearance stamps, evidence tags.
**Risk level:** High — complete visual departure from current design.
**Suitability for Ahmed:** High conceptually — his security/intelligence background makes this authentic rather than gimmicky.
**Pros:** Extremely differentiated. No other portfolio looks like this. Perfect for security/intelligence sector positioning.
**Cons:** Requires significant design investment. Risk of being too niche — may alienate corporate HR/recruiters who prefer conventional layouts.

---

### Direction C: "Executive Minimal" (Clean Slate)

**Concept:** Strip the portfolio to its core: white/off-white background, sophisticated serif typography, large portrait, simple grid. The visual restraint signals confidence — the work speaks for itself.

**Visual feel:** Top-tier consulting firm profile or luxury law firm partner page.
**Colors:** Off-white background (#F8F6F1), near-black type (#1A1A1A), single gold accent (#B8960C).
**Typography:** Serif heading font (e.g., Lora or Playfair Display) for headings, clean sans for body.
**Photography:** Full-width portrait on first scroll, high-quality.
**Project presentation:** Numbered list format, minimal cards.
**Risk level:** Medium — complete visual departure but proven formula.
**Suitability for Ahmed:** Moderate — the dark theme currently better signals tech/security. Light theme risks looking like a law firm rather than a security-tech hybrid.
**Pros:** Universally readable. Ages well. Strong first impression with the right audience (executives, HR directors, law firms).
**Cons:** Less distinctive in the developer/tech community. Loses the visual uniqueness of the current dark palette. Bilingual RTL on white requires careful Arabic font selection.

---

## Recommended Direction: **Direction A (Command Surface — Refine Current)**

**Reasoning:**

The current design foundation is the right direction. The dark palette, the copper/cyan accent system, and the grid structure are all correct choices for Ahmed's positioning. The problems are not in the design direction — they are in execution depth and content.

Switching to Direction B or C would require rebuilding everything that already works. Direction A preserves the 80% that is correct and addresses the 20% that is weak:

1. Add actual project screenshots — the most impactful visual upgrade possible
2. Replace the section copy (hero/about) with Ahmed-centric rather than portfolio-centric language
3. Add a distinctive personal mark (beyond "AD" in a box)
4. Add a timeline visualization for experience
5. Reduce project cards from 9 to 5-6 featured + archive
6. Add icons to the expertise domain cards
7. Fix the mobile nav

Direction B could be considered as a **major redesign milestone in the future** once the content is solid — it's a genuinely compelling concept for Ahmed's unique profile. But it carries significant execution risk and should not be attempted until the content story is clear.
