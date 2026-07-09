# KIRO Content Audit

Audit Date: 2026-07-10
Auditor: Kiro (Content Strategist, Senior Full-Stack Engineer)
Source of truth: `Profile.pdf` (CV), GitHub repository metadata, `src/data/`

---

## Section-by-Section Content Review

---

### 1. `<title>` and Meta Description

**Current:**
```
Title:       Ahmed Darhous | Premium Portfolio
Description: Ahmed Darhous premium bilingual portfolio for technology, law, AI, security, and digital operations.
```

**Issues:**
- The word "Premium" in the title is self-promotional and meaningless to search engines or recruiters. Titles should describe the person's value, not the portfolio's tier.
- "Premium Portfolio" tells the reader nothing about who Ahmed is or what he does.
- Meta description is a generic list of domains with no hook. It reads like a keyword dump.
- The description does not mention "Egypt", "Cairo", or "Ministry of Interior" — geographic and sector specificity helps SEO for targeted searches.

**Better direction (for reference, not for implementation now):**
```
Title:       Ahmed Darhous | Corporate Security, Risk Governance & AI Operations
Description: Executive security leader with 9+ years in law enforcement, AI-driven operations, and legal expertise. Based in Cairo, Egypt.
```

---

### 2. Hero Section

**Current copy (English):**
- Eyebrow: `"Ahmed Darhous Portfolio"` — redundant. The page is already titled with his name.
- H1: `"Security, law, and AI operations in one command surface."` — clever framing but abstract. A recruiter or client who lands here for the first time may not immediately know what Ahmed does professionally.
- Body: `"A premium bilingual portfolio for an executive security profile that connects public-sector discipline, legal research, operational intelligence, and software product building."` — describes the portfolio, not Ahmed. The subject is the portfolio, not the person. This is a structural problem.
- Principle: `"Security is no longer a function. It is a strategic advantage."` — strong quote, CV-backed. This is the best line on the page.

**Issues:**
- H1 does not mention Ahmed by name or his role. A visitor cannot know in 3 seconds what this person does.
- The body paragraph describes the portfolio rather than the professional behind it.
- "Premium bilingual portfolio" appears in the body — this phrase has no meaning to a hiring manager.
- No quantified claim in the hero (9+ years, 200+ personnel, 150+ assessments are all buried later).
- The eyebrow "Ahmed Darhous Portfolio" is a wasted prime real estate slot.

**Arabic translation quality:**
The Arabic is well-written professional Arabic, not machine-translated. Direction is correct. The principle in Arabic is accurate. Quality: Good.

---

### 3. About Section

**Current kicker:** `"Profile Evidence"` — unusual as a user-facing label. Sounds like internal audit language rather than section positioning.

**Current title:** `"Built from the CV, not guesswork."` — again, this is a meta-statement about the portfolio's construction method, not a statement about Ahmed's profile.

**Current body:** `"The content model is grounded in Profile.pdf, live GitHub repository metadata, and the official contact identity supplied for this project."` — this is documentation language. A hiring manager or client should never read "content model" or "live GitHub repository metadata" in a portfolio about section.

**Assessment:** The About section copy was written for a developer/agent audience validating content sources, not for a professional audience evaluating Ahmed. This is one of the most serious content problems in the site.

**Skills cloud:**
```
Fraud Investigations, EHS, Blockchain, Python, React, Next.js, TypeScript, OSINT, LLM Workflows, Prompt Engineering, Arabic RTL Interfaces, Legal Research
```
Issues:
- "Blockchain" appears as a top-3 LinkedIn skill (straight from CV) but there is zero evidence of blockchain work in any project. This looks like a keyword, not a demonstrated competency.
- "Arabic RTL Interfaces" is a technical implementation detail — it belongs in a project description, not a skills tag visible to non-technical clients.
- Skills are ordered by CV priority (Fraud, EHS, Blockchain first) which buries more impressive skills like Python, LLM Workflows.
- Missing: Crisis Management, OSINT Intelligence, Risk Assessment, Personnel Management — these are Ahmed's demonstrated strengths per CV.

**Languages:**
Listed correctly: Arabic (Native), English (Full Professional), French (Professional Working). Correct and CV-backed.

**Certifications:**
All 5 certifications listed accurately. However the section title uses the Arabic key `credentialsTitle` which renders as "Executive study, law, and field-readiness" — this is a heading for the education sub-panel, not the certifications list.

**Education:**
- **Data error:** `profile.ts` lists `"Police Academy of Egypt"` with credential `"Diploma in Egyptian General Law"` and period `"October 2021 - October 2022"`. The CV shows the Police Academy as Ahmed's employer/institution (commissioned officer role), while the General Law diploma is from a separate civilian university. This merges two distinct facts incorrectly.
- `Institut Français d'Egypte` has period `"Documented in CV"` — this is a placeholder, not a date. It displays literally as "Documented in CV" on the live site.
- **Missing from portfolio:** AUC MBA start/end dates are correct. South Valley University Criminal Law Master's is listed as `"August 2025 - October 2026"` — this looks like a compressed timeline. CV says `"August 2025 - October 2026"` which is only 14 months for a Master's degree, which may be accurate for a diploma-level program.
- **Missing institution:** The CV mentions `"Qena University"` for the General Law diploma. The portfolio incorrectly attributes this to the Police Academy.

---

### 4. Expertise Section

**Current title:** `"Four domains, one operating logic."` — acceptable but bland.
**Kicker:** `"Operating Map"` — corporate-sounding in a generic way.

**Four domains:**
1. Corporate Security & Risk Governance — well written, CV-backed
2. Legal Authority & Criminal Law — well written, CV-backed, includes deepfake crimes thesis mention ✅
3. AI & Intelligence Engineering — well written, mentions Guardian-Nexus ✅
4. Digital Products & Bilingual Systems — accurate tech list

**Assessment:** This is the strongest section content-wise. The four domains are correctly identified and described with appropriate specificity.

**Gap:** The CV prominently mentions **Oil & Gas, HSE, Asset Protection** as a core positioning keyword (appears in the headline). The Expertise section does not include this domain at all. This is a positioning miss for anyone in the energy sector searching for Ahmed.

---

### 5. Experience Section

**Current kicker:** `"Command History"` — strong, memorable, fits the security/military framing.
**Current title:** `"Operational leadership under pressure."` — good.

**Three roles listed:**
1. Executive Office Manager & Security Liaison (Aug 2025 – Present) ✅
2. Operations & Security Planning Lead (Aug 2023 – Aug 2025) ✅
3. Senior Risk Mitigation & Investigation Officer (Jul 2018 – Jul 2023) ✅

**Issues:**
- The CV shows a fourth role: `"Commissioned Police Officer – Early Career"` (August 2017 – Present). This foundational role is not in the experience section at all. The progression from officer to leader is missing.
- The CV also shows `"Freelance Editor/Writer - Programmer"` (2011 – Present). This is a long-running thread that connects to the software projects. Omitting it creates a gap between the security career and the development projects.
- Highlights are accurate and CV-backed but do not include the key metric: **95%+ prosecution-readiness rate** (stated in CV for the investigation role). This is a powerful, specific metric that differentiates Ahmed from generic security professionals.
- The `organization` field is deliberately vague: `"Government Security Organization (Egypt)"`. This is appropriate for security work but could be footnoted with a brief explanation ("Identifiable upon request in confidential contexts") for clarity to international recruiters.

---

### 6. Projects Section

**Current kicker:** `"Verified Work"` — good.
**Current title:** `"Projects with source-backed descriptions."` — accurate but meta. Sounds like a disclaimer rather than a value statement.

**9 projects total:**

| Project | Status | Live Link | Assessment |
|---|---|---|---|
| Arabic Legal Research Skill Framework | Public | Repo only | ✅ Strong — unique, CV-aligned, test coverage documented |
| NexaLearn (Darhous AI Cloud Academy) | Live | https://darhous-ai-cloud-academy.vercel.app | ✅ Strong — live product, broad scope |
| ShahY Store | Live | https://shah-y-store.vercel.app | ✅ Strong — real production deployment |
| Store Master Template | Foundation | Repo only | ⚠️ Weak standalone entry — better shown as ShahY extension |
| Darhous Automation Academy | Public | Repo only | ⚠️ No live link reduces impact |
| Darhous Career Hub | Prototype | Repo only | ⚠️ "Prototype" status weakens impression |
| Darhous IoT Lab | Public | Repo only | ⚠️ Good scope documented but no live preview |
| Guardian-Nexus | Private/CV | None | ✅ Correct handling — marked private |
| Ahmed Darhous Portfolio | Live | This site | ⚠️ Listing the portfolio as its own project is self-referential and weak |

**Content issues:**
- **ShahY Store** description says "Luxury Egyptian e-commerce store for imported women's accessories" — the word "luxury" is not evidenced anywhere in the repo or CV. This is an unverified adjective.
- **Store Master Template** listed as a separate project card creates a redundancy. It is already mentioned as the outcome of ShahY Store.
- **Portfolio listed as its own project** is common but weak. It does not demonstrate any client value. Listing it as a project wastes one of the 9 card slots.
- The `source` field displays as "Source: GitHub README" or "Source: CV" on every card. This is internal verification language — clients and recruiters do not need to see how the content was sourced.
- `impact` field text on project cards often starts with technical validation ("README documents CI, Python 3.11+, 233 passing tests") rather than outcome language. These facts are good but they need framing ("Validated by 233 automated tests with 96% coverage").

**Unrepresented projects in repo (not shown on portfolio at all):**
- `Shemo-Studio` (PHP) — visible in repo, not featured
- `elfady` — visible in repo, unclear purpose
- `darhous-assessment` — has live Vercel deployment, not featured
- `whatsapp-auto-poster` (Python) — automation tool, aligned with AI positioning
- `darhous-marketing-social-hub` — TypeScript, early stage
- `Exams_Platform` (Python) — educational tool

---

### 7. Case Studies Section

Three case studies auto-selected from projects with `caseStudy` field: Arabic Legal Research Framework, NexaLearn, ShahY Store.

**Assessment:** The Problem/Approach/Result structure is clean. Content is accurate and not inflated. However:
- The section title `"How the work translates into systems."` is abstract and does not communicate the format (case studies) clearly to a first-time visitor.
- The case studies lack any visual differentiation from project cards. They read identically in style.
- Missing outcome metrics: NexaLearn case study does not mention number of learning paths, users, or any quantified result.

---

### 8. CV Section

Content is clean. The CV section correctly presents the PDF as a source artifact with open/download actions. The only issue is the CV is named `Profile.pdf` which is not a recognizable filename from a download perspective. When a recruiter downloads it, their downloads folder shows `Profile.pdf` — not `Ahmed-Darhous-CV.pdf`.

---

### 9. Contact Section

**Current title:** `"Build the next resilient system."` — strong, memorable, but skews toward tech collaboration. Less effective for corporate security clients who may not think in "systems" terms.

**Current body:** `"Use the official channels below for corporate security, legal-tech research, AI operations, automation, or product collaboration."` — Good. Clear domains listed.

**Contact methods shown:**
- Email ✅
- Phone ✅
- Download CV ✅
- Social links (Instagram, LinkedIn, Facebook, WhatsApp, GitHub) ✅

**Gap:** No contact form. For a static site this is expected, but the absence of a form means all contact depends on the visitor taking direct action (clicking email/phone). A Formspree or Web3Forms integration would lower the barrier to contact significantly.

---

### 10. Footer

**Signature:** `"Designed & Developed by Ahmed Darhous"` — correct ✅
**"Ahmed Darhous" links to:** `mailto:ahmeddarhous@gmail.com` — correct ✅
**Social order:** Instagram, LinkedIn, Facebook, WhatsApp, GitHub — correct ✅
**Copyright:** Dynamic year — correct ✅
**Footer actions:** Download CV, Contact, Back To Top — correct ✅

No issues with footer content. This section is fully correct.

---

### 11. HTML Metadata

| Meta Tag | Current Value | Assessment |
|---|---|---|
| `<title>` | `Ahmed Darhous \| Premium Portfolio` | ⚠️ "Premium" is weak |
| `description` | Generic domain list | ⚠️ Not compelling |
| `og:title` | `Ahmed Darhous \| Premium Portfolio` | ⚠️ Same as title issue |
| `og:description` | "Security, law, and AI operations portfolio" | ⚠️ Truncated vs description |
| `og:image` | `ahmed-darhous.png` (2.1MB PNG) | ❌ Should be OG-optimized image, not the 2.1MB portrait |
| `og:type` | `website` | ✅ Correct |
| `og:url` | Correct production URL | ✅ |
| `twitter:card` | Missing | ❌ No Twitter Card tags |
| `canonical` | Missing | ❌ No canonical link |
| `theme-color` | `#101211` | ✅ Correct |
| `JSON-LD Person` | Present | ⚠️ jobTitle mismatch (see below) |
| `favicon` | Missing | ❌ No favicon |

**JSON-LD issue:**
```json
"jobTitle": "Executive Leader, Corporate Security and Risk Governance"
```
The CV headline is `"Executive Leader | MBA Candidate (AUC) | Corporate Security & Risk Governance | AI-Driven Operations & Intelligence | Legal Expert | Oil & Gas | HSE & Asset Protection"`. The JSON-LD omits AI Operations, Legal Expert, and Oil & Gas — the three most differentiated aspects of Ahmed's profile.

---

## Language Quality

**English:** Professional, no grammatical errors found. Some sentences read as AI-generated (e.g., "The content model is grounded in Profile.pdf") but are grammatically correct.

**Arabic:** High-quality professional Arabic. RTL rendering is correct. Translation is not literal — it reflects natural Arabic phrasing. Quality is genuinely good.

**Bilingual strategy assessment:** The bilingual feature is technically impressive and well-executed. However, the English copy has multiple meta/internal-audience problems that would also affect the Arabic version once corrected.

---

## Content Accuracy Against CV

| Claim | In Portfolio | In CV | Status |
|---|---|---|---|
| 9+ years commissioned officer | ✅ | ✅ | Verified |
| 200+ personnel deployments | ✅ | ✅ | Verified |
| 150+ risk assessments | ✅ | ✅ | Verified |
| 95%+ prosecution-readiness | ❌ Missing | ✅ | Gap |
| Guardian-Nexus AI ERP | ✅ | ✅ | Verified |
| AUC MBA Candidate | ✅ | ✅ | Verified |
| South Valley Criminal Law Master's | ✅ | ✅ | Verified |
| Deepfake Crimes thesis | ✅ (in Legal expertise) | ✅ | Verified |
| Oil & Gas positioning | ❌ Missing | ✅ | Gap |
| Global exposure (UK/France/UAE/Singapore/Malaysia) | ❌ Missing | ✅ | Gap |
| Freelance Writer/Editor/Programmer since 2011 | ❌ Missing | ✅ | Gap |
| DALF French certification | ✅ (language level) | ✅ | Partial |
| Police Academy education entry | ⚠️ Wrong institution | ✅ CV clear | Data error |
| Blockchain as top skill | ✅ Listed | ✅ CV listed | Unverified competency |
| Training 50+ officers | ❌ Missing | ✅ | Gap |

---

## Content Score: 5/10

**Strengths:** Bilingual execution is genuine, data is mostly CV-sourced, footer/contact/social are 100% accurate, legal and security domain copy is solid.

**Weaknesses:** Hero and About section copy was written for an internal agent audience, not for clients and recruiters. Multiple key CV differentiators are missing. Education data has a factual error. Meta description and title are generic.
