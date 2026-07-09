# KIRO Asset Cleanup Plan

Audit Date: 2026-07-10
Auditor: Kiro (Senior Full-Stack Engineer, QA Lead)
Status: READ-ONLY PLAN — No files have been deleted or modified.

---

## Overview

This document identifies files that are candidates for removal, archiving, or restructuring. No action has been taken. Each file is assessed individually with evidence and risk level before any future cleanup is executed.

---

## Category 1: Root-Level Clutter (Codex Internal Session Files)

These files were created by the previous Codex AI session as internal planning documents. They are tracked in Git and visible on the public GitHub repository. They do not serve the portfolio audience.

### `PORTFOLIO_IMPLEMENTATION_LOG.md`

```
Path:          C:\Users\ahmed\Desktop\portofolio\PORTFOLIO_IMPLEMENTATION_LOG.md
Size:          ~3.5 KB
Purpose:       Codex session work log — commands run, decisions made, timeline of build
Reference:     Not linked from any component, data file, or user-facing document
Git tracked:   Yes — visible on public GitHub repo
Evidence:      Content is "2026-07-09 session: Ran memory bootstrap, initialized Git..." — internal log
Confidence:    HIGH — safe to remove from root
Risk:          Low — no code depends on this file. Information preserved in CODEX_MEMORY.md
Recommendation: Move to docs/archive/ OR delete
```

### `PORTFOLIO_MASTER_PLAN.md`

```
Path:          C:\Users\ahmed\Desktop\portofolio\PORTFOLIO_MASTER_PLAN.md
Size:          ~2 KB
Purpose:       Codex session station-completion tracker
Reference:     Not linked from any component or data file
Git tracked:   Yes — visible on public GitHub repo
Evidence:      Contains "Station 0 - Completed / Station 1 - Completed..." milestone table
Confidence:    HIGH — safe to remove from root
Risk:          Low — information preserved in CODEX_MEMORY.md
Recommendation: Move to docs/archive/ OR delete
```

### `PORTFOLIO_FINAL_REPORT.md`

```
Path:          C:\Users\ahmed\Desktop\portofolio\PORTFOLIO_FINAL_REPORT.md
Size:          ~2.5 KB
Purpose:       Codex end-of-session completion summary
Reference:     Not linked from any component or data file
Git tracked:   Yes — visible on public GitHub repo
Evidence:      "Status: Completed and deployed on 2026-07-09. Links: GitHub, Live site..."
Confidence:    HIGH — safe to remove from root
Risk:          Low — all information superseded by this Kiro audit
Recommendation: Move to docs/archive/ OR delete
```

### `DESIGN_SYSTEM.md`

```
Path:          C:\Users\ahmed\Desktop\portofolio\DESIGN_SYSTEM.md
Size:          ~1 KB
Purpose:       Codex design direction notes — tokens, typography, motion rules
Reference:     Not linked from any component or data file
Git tracked:   Yes — visible on public GitHub repo
Evidence:      Contains token values (--ink, --copper, etc.) which are already in styles.css
Confidence:    MEDIUM — the content is useful but the file is in the wrong place
Risk:          Low — no code depends on this. Token values live in src/styles.css
Recommendation: If retained, move to docs/. Otherwise supersede with Kiro design system doc
```

---

## Category 2: Root-Level Oversized Original Asset

### `CE933E3B-D6AB-4FD6-A89B-651BD7022FB8.PNG`

```
Path:          C:\Users\ahmed\Desktop\portofolio\CE933E3B-D6AB-4FD6-A89B-651BD7022FB8.PNG
Size:          2,106 KB (2.1 MB)
Dimensions:    1024 × 1536 (confirmed by Codex inspection)
Purpose:       Original portrait photo before optimization
Reference:     NOT referenced in any component. src/config/site.ts references public/ahmed-darhous.png
Git tracked:   Likely yes (not in .gitignore explicitly; tmp/ is ignored but this is at root)
Evidence:      The optimized copies live in public/ — this is the pre-optimization source
Confidence:    HIGH — this file is not used by the application
Risk:          Medium — it is the original source file. Deleting it means the original is gone.
Recommendation: KEEP locally, add to .gitignore so it does not stay in the public repo.
               The file should not be committed to a public GitHub repository.
               If already committed: remove from git tracking (git rm --cached) then add to .gitignore.
Note:          The filename is a UUID-style iOS/Windows camera roll name — should be renamed
               to ahmed-darhous-original.png if retained locally
```

---

## Category 3: Temporary/Generated Files

### `tmp/pdfs/profile-page-1.png` and `tmp/pdfs/profile-page-2.png`

```
Path:          C:\Users\ahmed\Desktop\portofolio\tmp\pdfs\profile-page-1.png (~505 KB)
               C:\Users\ahmed\Desktop\portofolio\tmp\pdfs\profile-page-2.png (~267 KB)
Purpose:       Rendered page images of Profile.pdf, created by Codex for CV analysis
Reference:     Not referenced in any component. Codex inspection only.
Git tracked:   tmp/ is in .gitignore — these files should NOT be in the repo
Evidence:      tmp/ is listed in .gitignore. These are temporary Poppler render outputs.
Confidence:    HIGH — these are truly temporary artifacts
Risk:          Very low — the source PDF (Profile.pdf) still exists. These renders can be recreated.
Recommendation: Safe to delete. They exist only locally (should not be tracked in git).
```

---

## Category 4: Log Files

### `.codex-vite.err.log` and `.codex-vite.out.log`

```
Path:          C:\Users\ahmed\Desktop\portofolio\.codex-vite.err.log
               C:\Users\ahmed\Desktop\portofolio\.codex-vite.out.log
Purpose:       Vite dev server log output from Codex session
Reference:     Not referenced anywhere
Git tracked:   NO — pattern .codex-*.log is in .gitignore ✅
Evidence:      .gitignore line: ".codex-*.log"
Confidence:    HIGH — correctly ignored, safe to delete locally
Risk:          None
Recommendation: Safe to delete locally. Already excluded from git.
```

---

## Category 5: Public Directory — Production Assets

### `public/ahmed-darhous.png` (2,106 KB)

```
Path:          C:\Users\ahmed\Desktop\portofolio\public\ahmed-darhous.png
Size:          2,106 KB (2.1 MB)
Purpose:       PNG fallback for browsers that do not support WebP
Reference:     Referenced in src/config/site.ts as siteConfig.assets.portrait
               Used in Hero.tsx as <img src={siteConfig.assets.portrait} ...>
               Also used as og:image in index.html
Git tracked:   Yes
Evidence:      100% in use as PNG fallback + OG image
Confidence:    MEDIUM — the file IS used but 2.1MB PNG for a portrait is excessive
Risk:          HIGH — do not delete. This is the only PNG fallback.
Recommendation: DO NOT DELETE. Future action: optimize the PNG to ~200KB using
               lossy compression, then replace. The WebP variants are correctly sized.
               Also: the og:image should point to a separate 1200×630 OG image,
               not the portrait PNG.
```

### `public/ahmed-darhous-384.webp`, `public/ahmed-darhous-640.webp`, `public/ahmed-darhous-960.webp`

```
Sizes:         12.3 KB, 22.8 KB, 37.9 KB respectively
Purpose:       Responsive WebP portrait variants
Reference:     Referenced in src/config/site.ts, used in Hero.tsx <picture> srcSet
Git tracked:   Yes
Confidence:    These files are correctly used and correctly sized
Risk:          None
Recommendation: KEEP. Well-optimized. No action needed.
```

### `public/Profile.pdf`

```
Size:          66.5 KB
Purpose:       Downloadable CV — served at /portofolio/Profile.pdf
Reference:     Referenced in src/config/site.ts as siteConfig.assets.cv
               Used in CVSection.tsx and Hero.tsx download links
Git tracked:   Yes
Confidence:    100% in use and necessary
Risk:          HIGH — do not delete
Recommendation: KEEP. Consider renaming to Ahmed-Darhous-CV.pdf for better UX
               (user downloads file named "Profile.pdf" which is nondescript).
               Note: renaming requires updating site.ts asset path.
```

### `public/robots.txt`

```
Size:          ~100 bytes
Content:       User-agent: * Allow: / Sitemap: https://darhous.github.io/portofolio/sitemap.xml
Purpose:       Search engine crawl instructions
Reference:     Served as /portofolio/robots.txt
Git tracked:   Yes
Recommendation: KEEP. Correct content. No issues.
```

### `public/sitemap.xml`

```
Size:          ~300 bytes
Content:       Single URL entry for the portfolio root
Purpose:       Sitemap for search engine indexing
Reference:     Served as /portofolio/sitemap.xml. Referenced in robots.txt.
Git tracked:   Yes
Issues:        lastmod is hardcoded as "2026-07-09" — will become stale over time
Recommendation: KEEP. Update lastmod on future deploys.
```

---

## Category 6: Documentation Files — Review Required

### `AGENTS.md` and `CODEX_MEMORY.md`

```
Recommendation: KEEP. These files serve a real purpose — they document the permanent
               identity rules for any future AI agent working on this project.
               They should remain at the root where agents find them first.
               The content is accurate and useful.
```

### `docs/content/CV_ANALYSIS.md`, `docs/content/PROJECT_DISCOVERY.md`, `docs/content/CONTENT_INVENTORY.md`

```
Recommendation: KEEP. These are reference documents that support future content
               decisions. They do not expose security risks. They are in docs/
               which is an appropriate location for project documentation.
```

### `docs/qa/QA_REPORT.md` and `docs/qa/screenshots/`

```
Recommendation: KEEP. The QA report and screenshots serve as a production baseline.
               The audit screenshots (production-desktop.png, production-mobile.png)
               provide before/after comparison for future work.
```

---

## Prioritized Cleanup Action List

| Priority | File / Action | Risk | Rationale |
|---|---|---|---|
| P1 | Add `CE933E3B-D6AB-4FD6-A89B-651BD7022FB8.PNG` to `.gitignore` and remove from git tracking | Medium | 2.1MB binary in public git repo is unnecessary |
| P1 | Delete `tmp/pdfs/profile-page-1.png` and `tmp/pdfs/profile-page-2.png` (local only) | Very low | Temporary Codex artifacts, already gitignored |
| P1 | Delete `.codex-vite.err.log` and `.codex-vite.out.log` (local only) | None | Already gitignored, serve no purpose |
| P2 | Move `PORTFOLIO_IMPLEMENTATION_LOG.md`, `PORTFOLIO_MASTER_PLAN.md`, `PORTFOLIO_FINAL_REPORT.md` to `docs/archive/` | Low | Reduces root clutter, preserves history |
| P2 | Move `DESIGN_SYSTEM.md` to `docs/` | Low | Better location for design documentation |
| P3 | Optimize `public/ahmed-darhous.png` from 2.1MB to <300KB | Low | Performance improvement; keep as fallback |
| P3 | Rename `public/Profile.pdf` to `Ahmed-Darhous-CV.pdf` (update site.ts) | Low | Better download UX |
| P4 | Update `sitemap.xml` lastmod to current date | None | SEO hygiene |
| P4 | Add a README.md to the repo root | None | GitHub repo hygiene |

---

## Files Confirmed Safe to Delete

The following files can be deleted without any impact on the running application:

1. `tmp/pdfs/profile-page-1.png`
2. `tmp/pdfs/profile-page-2.png`
3. `.codex-vite.err.log`
4. `.codex-vite.out.log`
5. `dist/` folder contents (regenerated on every build)

## Files That Should NOT Be Deleted

1. `public/ahmed-darhous.png` (PNG fallback + OG image)
2. `public/ahmed-darhous-384.webp`
3. `public/ahmed-darhous-640.webp`
4. `public/ahmed-darhous-960.webp`
5. `public/Profile.pdf`
6. `public/robots.txt`
7. `public/sitemap.xml`
8. `AGENTS.md`
9. `CODEX_MEMORY.md`
10. All `src/` files
11. `index.html`
12. `docs/content/` contents
13. `docs/qa/` contents
