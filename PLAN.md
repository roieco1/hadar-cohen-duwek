# Project Plan — Hadar Cohen Duwek Academic Profile

_Last updated: 2026-07-24_

## 1. Goal

A modern, elegant academic profile site for Dr. Hadar Cohen Duwek (Computational
Neuroscience, The Open University of Israel) that she can maintain herself, with
publications kept up to date automatically from Google Scholar.

## 2. Requirements → how each is met

| # | Requirement | Approach |
|---|-------------|----------|
| 1 | Profile image | Hero portrait, uploaded via the CMS (with a tasteful placeholder until provided) |
| 2 | Papers & talks from Google Scholar (auto) | Scheduled GitHub Action pulls from Scholar `user=0kq7pdcAAAAJ` → `publications.json` → site rebuild |
| 3 | Short bio / academic CV | About section + CV timeline; downloadable CV PDF; editable via CMS |
| 4 | Lab & students | Lab section with member cards, alumni, "join the lab"; editable via CMS |
| 5 | Secure editing | Git-based CMS with login; only authorized account can commit; public visitors never see edit UI |
| 6 | Contact info | Contact section: email, office, ORCID/LinkedIn/GitHub/university links |

## 3. Architecture

```
Google Scholar ──(weekly GitHub Action)──▶ src/data/publications.json
                                                    │
Content (Markdown/JSON in repo) ────────────────────┤
   ▲                                                 ▼
   │ commits                                   Astro build (GitHub Action)
Git-based CMS  ◀── Hadar logs in                     │
   (friendly UI)                                      ▼
                                              GitHub Pages (static site)
```

- **No server to run.** Everything is static + GitHub Actions. Fully free.
- **Security model:** editing = committing to the repo, gated by GitHub auth.
  Only Hadar's authorized account (or an editorial PR flow) can change content.

### Decisions still to finalize (during their phases, not blocking)
- **SSG:** Astro recommended (content collections, zero-JS output, CMS-friendly).
  Lighter alternative: hand-authored static HTML (the mockup is already this).
- **CMS:** Sveltia CMS (modern, in-repo admin, Hebrew/i18n, free; needs a tiny
  GitHub OAuth relay) — primary. Pages CMS (hosted GitHub App, zero infra) — the
  zero-setup alternative. Chosen in Phase 5.
- **Scholar fetch:** SerpAPI Google Scholar Author API (free tier ~100/mo; weekly
  sync uses ~4) for reliability — primary. Free `scholarly` library as fallback.
  Curated overrides file for talks/fixes Scholar doesn't cover.

## 4. Phased task plan (with model assignments)

> Model convention (proposed — will adopt the "hone" convention if you share it):
> **Opus 4.8** = architecture, design, auth/security, integrations, anything tricky ·
> **Sonnet 5** = routine build-out, styling, content wiring ·
> **Haiku 4.5** = mechanical/repetitive edits.

### Phase 0 — Design sign-off  ◀ we are here
- [ ] Approve visual direction from `design/mockup-v1.html` — **Opus 4.8**

### Phase 1 — Scaffold
- [ ] Initialize Astro project, base layout, tokens/theme from the mockup — **Opus 4.8**
- [ ] Port the mockup's design system (colors, type, components) — **Sonnet 5**
- [ ] Repo hygiene: gitignore, formatting, editorconfig — **Haiku 4.5**

### Phase 2 — Content model & sections
- [ ] Define content collections (bio, cv, lab, students, contact) — **Opus 4.8**
- [ ] Build sections: Hero, About/CV, Lab, Contact — **Sonnet 5**
- [ ] Wire placeholder content + assets — **Haiku 4.5**

### Phase 3 — Publications auto-sync
- [ ] Scholar fetch script + JSON schema + type classification — **Opus 4.8**
- [ ] GitHub Action (weekly cron) + secrets + commit-back — **Opus 4.8**
- [ ] Publications UI: list, filters, citation chips, links — **Sonnet 5**
- [ ] Curated-overrides mechanism (talks, hidden items, fixes) — **Sonnet 5**

### Phase 4 — Secure editing (CMS)
- [ ] Integrate git-based CMS + auth (OAuth relay if Sveltia) — **Opus 4.8**
- [ ] Configure editable collections + media uploads — **Sonnet 5**
- [ ] Editor docs / quick guide for Hadar — **Haiku 4.5**

### Phase 5 — Deploy
- [ ] GitHub Pages deploy workflow (build → publish) — **Opus 4.8**
- [ ] Custom domain + HTTPS (if chosen) — **Sonnet 5**

### Phase 6 — Polish
- [ ] Accessibility pass (focus states, contrast, reduced-motion) — **Opus 4.8**
- [ ] SEO/OpenGraph, favicon, sitemap, meta — **Sonnet 5**
- [ ] Performance + cross-browser/mobile QA — **Sonnet 5**

## 5. Inputs needed from Hadar (can trickle in)

- Profile photo (high-res)
- Final bio text + academic CV (PDF) with correct dates/institutions
- Confirmed links: ORCID, LinkedIn, GitHub, university profile
- Lab details: real student names, roles, links; alumni
- Office location / office-hours preference; preferred contact email
- Domain preference (custom domain vs. `*.github.io`)
- A GitHub account for her to log in and edit (or we use an editorial flow)

## 6. Known caveats

- Google Scholar has **no official API**; the sync relies on SerpAPI/scraping and
  may occasionally need a nudge. Curated overrides make the site resilient to this.
- Real citation metrics as of build: **144 citations · h-index 7 · i10-index 5**.
