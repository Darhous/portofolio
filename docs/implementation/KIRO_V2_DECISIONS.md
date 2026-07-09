# KIRO V2 Decisions Log

Project: Ahmed Darhous Portfolio V2
Branch: kiro/portfolio-v2

This file records decisions that are hard to reverse and need clear rationale.

---

## Professional Positioning

**Decision:** Use "Executive Security & Risk Leader — AI Operations and Legal-Tech Product Builder"
**Rationale:** Directly aligns with CV headline. Doesn't oversimplify. Captures the three pillars.
**Date:** 2026-07-10

---

## Contact Form Service

**Decision:** Web3Forms (free tier)
**Rationale:** No backend required, no secrets in git (uses public access key), free tier sufficient for portfolio, spam protection built-in, simple integration, supports static hosting.
**Date:** 2026-07-10

---

## Skills — Blockchain Removal

**Decision:** Replace "Blockchain" with "Risk Assessment" and "Crisis Management"
**Rationale:** Blockchain has zero project evidence in portfolio or CV projects. Risk Assessment and Crisis Management are directly evidenced by 150+ assessments metric and CV role descriptions.
**Date:** 2026-07-10

---

## CV Filename

**Decision:** Rename public/Profile.pdf to public/Ahmed-Darhous-CV.pdf
**Rationale:** Improves download UX — user gets a named file instead of "Profile.pdf"
**Date:** 2026-07-10

---

## Featured Projects Selection

**Decision:** Guardian-Nexus, Arabic Legal Research Skill Framework, NexaLearn, ShahY Store, Darhous Career Hub
**Rationale:** These 5 represent the highest-impact work across security, legal-tech, learning, commerce, and career tools. Store Master Template merged into ShahY case study. Portfolio card removed (self-referential).
**Date:** 2026-07-10

---

## Labs Projects

**Decision:** Darhous Automation Academy, Darhous IoT Lab, whatsapp-auto-poster (if investigated), darhous-assessment (if investigated)
**Rationale:** These are real projects but have less impact as standalone featured cards. Labs format gives them appropriate visibility.
**Date:** 2026-07-10

---

## Mandatory Projects Investigation

**Decision (career-ops):** Not found as separate repo. "Darhous-career-hub-google" is the closest match. Represented as "Darhous Career Hub" in featured projects.
**Decision (atsresume):** Not found as separate repo. ATS features are inside Darhous Career Hub. Described honestly within that project's description.
**Decision (Shemo Studio):** Found as PHP repo. Investigated — included in Labs section with honest attribution.
**Decision (Darhous Project Lab):** Represented as an umbrella concept linking the Labs section.
**Date:** 2026-07-10

---

## Education — Police Academy Entry

**Decision:** Change credential from "Diploma in Egyptian General Law" to "B.Sc. Law and Police Sciences"
**Rationale:** The Police Academy is where Ahmed received his primary degree (Bachelor of Law and Police Sciences per CV). The General Law diploma is a separate credential from a civilian institution. Keeping Police Academy with its correct credential avoids the factual error.
**Note:** Institut Français period will be displayed as "2019–2021 (approx.)" — CV mentions French study but no exact dates found. Will use approximate or omit if uncertain.
**Date:** 2026-07-10

---

## Mobile Navigation

**Decision:** Implement hamburger menu replacing horizontal scroll strip
**Rationale:** The horizontal scroll nav on mobile hides items without indication. A proper mobile menu is better UX and more accessible.
**Date:** 2026-07-10

---

## Typography

**Decision:** Add IBM Plex Sans Arabic via Google Fonts for Arabic text
**Rationale:** Current Inter stack has limited Arabic glyph support. IBM Plex Arabic is free, professional, and widely available. Use font-display: swap to avoid blocking render.
**Date:** 2026-07-10

---

## Olive Color Token

**Decision:** Keep --olive but darken it for portrait border visibility
**Rationale:** The decorative border concept is good but the color is barely visible. Darken to #8a9240 or replace with a more visible copper-tinted border.
**Date:** 2026-07-10

---

## Intro Component Semantics

**Decision:** Keep role="dialog" and add aria-modal="true" plus proper focus management
**Rationale:** It IS a modal (blocks page interaction). Adding proper ARIA attributes makes it correct. Will also add focus trap and escape key support.
**Date:** 2026-07-10

