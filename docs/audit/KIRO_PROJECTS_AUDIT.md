# KIRO Projects Audit

Audit Date: 2026-07-10
Auditor: Kiro (Senior Full-Stack Engineer, Content Strategist)
Source: `src/data/projects.ts`, `docs/content/PROJECT_DISCOVERY.md`, live URLs

---

## Projects Currently on Portfolio (9 total)

---

### 1. Arabic Legal Research Skill Framework

| Field | Value |
|---|---|
| Category | Legal Tech |
| Status | Public |
| Source | GitHub README |
| Repo | https://github.com/Darhous/arabic-legal-research-skill |
| Live URL | None |
| Tech | Python, DOCX, Validation, Arabic, Legal AI, CLI |

**Description accuracy:** Accurate. Python framework for validating AI-generated Arabic legal research and producing structured DOCX output.

**Impact claim audit:** `"README documents CI, Python 3.11+, 233 passing tests, and 96.12% coverage."` — This is true if the README states it. High test coverage for a legal-domain tool is genuinely impressive and differentiating. However the wording is a meta-description of the README, not a statement of the project's impact on legal work.

**Ahmed's contribution:** Creator and sole developer of the framework. This is original work (Python validation pipeline, Arabic NLP tooling). Not a fork or template. Contribution is unambiguous.

**Is the project real?** Yes. Public repo with documented CI and test coverage.

**Strategic value:** Very high. This is Ahmed's clearest technical differentiator in the legal-tech space. Python + Arabic legal domain + AI validation = highly specific and credible niche. No other project in the portfolio has this combination.

**Issues:**
- No live demo — reduces discoverability for non-technical reviewers.
- Impact description reads as README verification, not outcome language.
- Missing: what problem does this solve for a real legal researcher? The case study covers this but the card description does not.

**Classification:** 🏆 Flagship Project

**Needs case study:** Already has one. Needs screenshot/demo recording.

---

### 2. NexaLearn by Ahmed Darhous (Darhous AI Cloud Academy)

| Field | Value |
|---|---|
| Category | Learning |
| Status | Live |
| Source | GitHub README |
| Repo | https://github.com/Darhous/darhous-ai-cloud-academy |
| Live URL | https://darhous-ai-cloud-academy.vercel.app |
| Tech | Next.js, TypeScript, Supabase, Tailwind CSS, PWA, Gemini AI |

**Description accuracy:** Accurate. Broad Arabic-first bilingual learning platform.

**Impact claim audit:** "Live platform with broad learning scope and RTL-first educational product architecture." — Accurate but vague. No user numbers, no specific outcomes.

**Ahmed's contribution:** Creator and developer. Next.js + Supabase + AI integration is significant full-stack work. Clear contribution.

**Is the project real?** Needs verification — the Vercel URL is listed as live. Production deployment confirmed in PROJECT_DISCOVERY.md.

**Strategic value:** High. Demonstrates product-thinking, full-stack development, bilingual UX design, and AI integration in an educational context. The combination of AI + Arabic + cloud learning is unusual and valuable.

**Issues:**
- The project name appears differently across the portfolio: "NexaLearn" in the card, "darhous-ai-cloud-academy" in the repo slug. Inconsistent branding.
- The tech stack (Gemini AI, Supabase) is impressive but not explained in the card description — the platform uses AI for what, exactly?
- The scope described (AI, cloud, automation, career, exams, language, IoT, tools, projects, certificates) is so broad it reads as aspirational rather than delivered.

**Classification:** ✅ Featured Project

**Needs case study:** Already has one. Needs screenshots of actual learning paths.

---

### 3. ShahY Store

| Field | Value |
|---|---|
| Category | Commerce |
| Status | Live |
| Source | GitHub README |
| Repo | https://github.com/Darhous/ShahY-Store |
| Live URL | https://shah-y-store.vercel.app |
| Tech | Next.js 16, TypeScript, Drizzle ORM, Supabase, Better Auth, Vercel |

**Description accuracy:** Accurate. Full-stack e-commerce store with admin panel, auth, WhatsApp order flow.

**Impact claim audit:** "Production storefront with documented owner, design/development attribution, admin routes, and live deployment." — Confirmed. Live site exists.

**Ahmed's contribution:** Developer of the full system (storefront, admin, auth, database, deployment). The store was built for a specific client/brand ("ShahY"). Attribution is clear.

**Is the project real?** Yes. Live production deployment.

**Strategic value:** High. Demonstrates the complete full-stack cycle: client brief → design → database schema → auth → deployment. The WhatsApp order flow is a real MENA market product decision, not a generic template feature.

**Issues:**
- "Luxury Egyptian e-commerce store" — the word "luxury" is unverified. Remove or replace with evidence.
- The store's owner/client is not identified (privacy appropriate), but the portfolio could clarify: "Built for a boutique accessories brand."
- No screenshots of the admin panel or checkout flow on the portfolio card.

**Classification:** ✅ Featured Project

**Needs case study:** Already has one. Needs store screenshots.

---

### 4. Store Master Template

| Field | Value |
|---|---|
| Category | Commerce |
| Status | Foundation |
| Source | GitHub README |
| Repo | https://github.com/Darhous/Store-Master-Template |
| Live URL | None |
| Tech | Next.js, Supabase, Drizzle ORM, Better Auth, PowerShell, Docs |

**Description accuracy:** Accurate — this is a reusable template extracted from ShahY Store.

**Ahmed's contribution:** Extraction and abstraction from a production build. Shows systems thinking.

**Is the project real?** Yes. Public repo.

**Strategic value:** Low as a standalone portfolio entry. Medium as a concept (demonstrates the ability to productize/templatize delivery work).

**Issues:**
- Presenting this as a separate project card dilutes both this entry and ShahY Store. They are the same project family.
- A "Foundation" status suggests it's not finished or live — a weak impression.
- Better shown as a callout within the ShahY Store case study: "The store became the foundation for a reusable commerce template."

**Classification:** ⚙️ Supporting / Collapse into ShahY Store

---

### 5. Darhous Automation Academy

| Field | Value |
|---|---|
| Category | Automation |
| Status | Public |
| Source | GitHub README |
| Repo | https://github.com/Darhous/darhous-automation-academy |
| Live URL | None |
| Tech | Next.js, TypeScript, Tailwind CSS, LocalStorage, Automation Design |

**Description accuracy:** Accurate. Arabic automation learning product.

**Ahmed's contribution:** Creator and developer. Arabic-first automation education platform.

**Is the project real?** Yes. Public repo. No live deployment noted.

**Strategic value:** Medium. Automation training aligns with Ahmed's OSINT/pipeline work but the audience overlap with NexaLearn is significant (both are Arabic learning platforms). The two projects compete with each other for the "Arabic learning platform" positioning.

**Issues:**
- No live URL reduces discoverability.
- `LocalStorage` as a tech tag signals that there is no backend — the platform cannot persist user data across devices. This limits its credibility as an "academy."
- The distinction between this and NexaLearn is unclear to a first-time visitor.

**Classification:** ⚙️ Supporting Project (or merge into Labs section)

---

### 6. Darhous Career Hub

| Field | Value |
|---|---|
| Category | Career |
| Status | Prototype |
| Source | GitHub README |
| Repo | https://github.com/Darhous/Darhous-career-hub-google |
| Live URL | None (repo does not list one) |
| Tech | TypeScript, Gemini AI, Career Tools, ATS, Dashboard |

**Description accuracy:** Accurate. ATS analysis + interview prep + CV builder platform.

**Ahmed's contribution:** Creator and developer. Prototype status is accurately labeled.

**Is the project real?** Partially. Prototype — some features use demo data.

**Strategic value:** Medium. This directly relates to the `atsresume` concept mentioned in the prompt requirements. The CV/ATS angle is personally relevant (Ahmed needs good CV tools). However "Prototype" status and no live link reduces its portfolio weight significantly.

**Issues:**
- The repo name `Darhous-career-hub-google` suggests it may be a fork or Google-Gemini-specific implementation. "Google" in the repo name is potentially confusing.
- No live demo link despite Gemini AI integration — could be deployed to Vercel easily.
- "career-ops" and "atsresume" projects mentioned in the prompt are not the same as this repository. These names do not appear in the portfolio or repo list. Clarification needed.

**Classification:** 🧪 Experiment / Promote to Featured if deployed live

---

### 7. Darhous IoT Lab

| Field | Value |
|---|---|
| Category | IoT |
| Status | Public |
| Source | GitHub README |
| Repo | https://github.com/Darhous/darhous-iot-lab |
| Live URL | None |
| Tech | Next.js, TypeScript, Tailwind CSS, Lucide, Arduino, IoT |

**Description accuracy:** Accurate. Arabic-first IoT/Arduino educational app with comprehensive content scope.

**Impact claim audit:** V2 README documents 18 paths, 60+ lessons, 72 projects, 80 components, 80 code examples, 35 simulator templates — impressive if confirmed.

**Ahmed's contribution:** Creator and developer. Heavy content investment.

**Is the project real?** Yes. Public repo with V2 milestone.

**Strategic value:** Medium. IoT/Arduino education is a separate domain from Ahmed's core security/AI positioning. It demonstrates technical breadth but may confuse the portfolio's narrative for non-technical visitors.

**Issues:**
- Third Arabic learning platform in the portfolio (alongside NexaLearn and Automation Academy). Three education platforms creates redundancy.
- No live URL despite being a Next.js app — easy to deploy.
- The IoT domain is peripheral to Ahmed's primary positioning.

**Classification:** ⚙️ Supporting / Labs

---

### 8. Guardian-Nexus

| Field | Value |
|---|---|
| Category | Security |
| Status | Private |
| Source | CV |
| Repo | None |
| Live URL | None |
| Tech | AI Operations, Security ERP, Python, OSINT, LLMs |

**Description accuracy:** Accurate. Private CV-sourced system for HR + Security ERP with AI integration.

**Ahmed's contribution:** Architect and developer. This is Ahmed's most significant original system — built for real operational use in a government security organization.

**Is the project real?** Yes — CV-documented. The CV explicitly states: "Architected Guardian-Nexus, a proprietary AI-integrated HR & Security ERP system."

**Strategic value:** Extremely high for the right audience (corporate security, government, defense sector). This is the project that distinguishes Ahmed from every other developer in his portfolio. No other developer can claim to have built an AI ERP system for 200+ personnel in a real government security context.

**Issues:**
- Currently presented exactly like other project cards but with a disabled "Private / CV-sourced" label. The card reads as a weakness (no evidence) rather than a strength (confidential classified work).
- Needs a different card treatment: a confidential/classified aesthetic with clear language explaining why it cannot be publicly shown ("System operational in a classified government environment").
- The tech tags are accurate but generic — "AI Operations, Security ERP" — compared to other projects' specific stacks.
- No screenshots, architecture diagram, or even a high-level system diagram — understandable given confidentiality but the absence makes the card feel empty.

**Classification:** 🏆 Flagship Project (with appropriate confidential treatment)

---

### 9. Ahmed Darhous Portfolio (This Site)

| Field | Value |
|---|---|
| Category | Portfolio |
| Status | Live |
| Source | GitHub metadata |
| Repo | https://github.com/Darhous/portofolio |
| Live URL | https://darhous.github.io/portofolio/ |
| Tech | Vite, React, TypeScript, GitHub Pages, Accessibility |

**Description accuracy:** Accurate but recursive.

**Ahmed's contribution:** The portfolio was built by Codex AI in a single session (as documented in the implementation logs). Ahmed's contribution is the project direction, identity data, and verification.

**Is this appropriate as a project entry?** Questionable. Listing the portfolio on itself as a project is common in developer portfolios but it sends the signal "I built this portfolio" — which is less impressive when the build methodology (AI-assisted) is known. If listed, it should be honest about the AI-assisted approach.

**Strategic value:** Low as a portfolio project. The site exists — it demonstrates deployment, GitHub Pages, bilingual React — but these are not Ahmed's strongest capabilities.

**Issues:**
- Self-referential entry wastes a card slot that could feature a higher-impact project.
- If kept, the description should emphasize the design decisions and architecture, not just the tech stack.

**Classification:** ❌ Remove from projects grid, or move to a separate "About This Site" section

---

## Missing Projects (In Repo But Not Featured)

| Repo | Language | Why Not Featured | Recommendation |
|---|---|---|---|
| `Shemo-Studio` | PHP | Needs README/content review | Investigate — "Shemo Studio" mentioned as real project in prompt |
| `elfady` | Unknown | Unknown purpose | Investigate |
| `darhous-assessment` | JS | Has live Vercel deployment — not featured | Add or investigate |
| `whatsapp-auto-poster` | Python | Automation utility | Consider adding to Labs |
| `Exams_Platform` | Python | Needs review | Consider adding |
| `darhous-marketing-social-hub` | TypeScript | Early stage | Not ready |
| `aurve` | HTML | Private | Do not feature without approval |

**Note on `Shemo-Studio`:** The prompt explicitly identifies "Shemo Studio" as a real project that Ahmed executed. This project exists in the repo as PHP but is not on the portfolio at all. This is a gap that needs to be addressed regardless of the current README state.

**Note on `career-ops` and `atsresume`:** These project names appear in the prompt as real projects but do not appear in the GitHub repository list from PROJECT_DISCOVERY.md. Either they are private repos not discovered, or they are under different names (`Darhous-career-hub-google` / `darhous-career-hub`). This ambiguity needs resolution.

---

## Project Classification Summary

| Project | Classification | Live Link | Featured Now | Should Be Featured |
|---|---|---|---|---|
| Arabic Legal Research Skill Framework | 🏆 Flagship | No | ✅ | ✅ |
| Guardian-Nexus | 🏆 Flagship | No (private) | ✅ | ✅ with redesigned card |
| NexaLearn | ✅ Featured | ✅ | ✅ | ✅ |
| ShahY Store | ✅ Featured | ✅ | ✅ | ✅ |
| Darhous Career Hub | 🧪 Experiment | No | ✅ | Conditional — needs live URL |
| Store Master Template | ⚙️ Supporting | No | ✅ | ❌ Merge into ShahY case study |
| Darhous Automation Academy | ⚙️ Supporting | No | ✅ | ❌ Move to Labs |
| Darhous IoT Lab | ⚙️ Supporting | No | ✅ | ❌ Move to Labs |
| Portfolio (this site) | ❌ Remove | ✅ | ✅ | ❌ Remove from grid |
| Shemo-Studio | ❓ Unknown | Unknown | ❌ | Investigate first |
| darhous-assessment | ❓ Unknown | ✅ | ❌ | Investigate first |

---

## Recommended Portfolio Project Presentation

**Featured Grid (5 cards):**
1. Arabic Legal Research Skill Framework — Legal Tech Flagship
2. Guardian-Nexus — Security AI Flagship (with confidential treatment)
3. NexaLearn — Live Learning Platform
4. ShahY Store (+ Store Master Template combined) — Commerce + Systems
5. Darhous Career Hub (if deployed live) OR Shemo Studio (if investigated and solid)

**Labs Section (list, not grid):**
- Darhous Automation Academy
- Darhous IoT Lab
- whatsapp-auto-poster
- darhous-assessment (if investigated)

**Removed:**
- Portfolio self-reference card
- Store Master Template as standalone card
