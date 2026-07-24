# Hadar Cohen Duwek — Academic Profile Site

Personal academic website for **Dr. Hadar Cohen Duwek**, researcher and lecturer in
Computational Neuroscience at The Open University of Israel.

> Field: spiking neural networks, neuromorphic computing, computational models of
> perception (color, filling-in, event-based vision).

## What this site does

- Profile / hero with photo and headline metrics
- Publications & talks, **auto-synced from Google Scholar** (`user=0kq7pdcAAAAJ`)
- Short bio + academic CV
- Lab & students
- Contact + professional profiles
- A friendly, secure editor so Hadar can update content herself (no code)

## Stack (locked)

| Concern    | Choice                                             |
|------------|----------------------------------------------------|
| Site       | Static site (Astro) → static HTML/CSS/JS           |
| Hosting    | GitHub Pages (free, custom domain capable)         |
| Editing    | Git-based CMS (friendly login UI, commits to repo) |
| Publications | GitHub Actions job pulling from Google Scholar   |
| Build/deploy | GitHub Actions                                   |

See [PLAN.md](PLAN.md) for the full plan, task breakdown, and model assignments.

## Live site

**https://roieco1.github.io/hadar-cohen-duwek/** — deployed automatically from `main`
via GitHub Actions ([.github/workflows/deploy.yml](.github/workflows/deploy.yml)).

## Local development

```bash
npm install
npm run dev      # local dev server
npm run build    # production build to dist/
npm run preview  # preview the production build
```

## Editing content

Content lives in plain data files (a friendly CMS will wrap these next):

- [`src/data/site.json`](src/data/site.json) — name, bio, interests, contact, links
- [`src/data/publications.json`](src/data/publications.json) — papers (to be auto-synced from Scholar)
- [`src/data/courses.json`](src/data/courses.json) — Open University courses
- `public/hadar-profile.jpg` — profile photo

## Publications sync (Google Scholar)

Publications auto-update from Hadar's Scholar profile (`user=0kq7pdcAAAAJ`) via
[`scripts/fetch-scholar.mjs`](scripts/fetch-scholar.mjs), which runs **at build time and
weekly** (see the deploy workflow). It rewrites `publications.json` before each build.

To activate it, add one repository secret (Settings → Secrets and variables → Actions):

- **`SERPAPI_KEY`** — a free [SerpAPI](https://serpapi.com/) key (the free tier covers a
  weekly sync many times over).

Without the secret the sync is skipped and the committed `publications.json` is used, so
the site never breaks. Trigger a manual refresh anytime from the Actions tab
("Deploy to GitHub Pages" → Run workflow), or locally with `SERPAPI_KEY=… npm run sync:scholar`.

## Deploying / taking offline

- **Publish:** re-enable the workflow (`gh workflow enable deploy.yml`) and Pages
  (Settings → Pages → Source: GitHub Actions), then push.
- **Unpublish:** the site is currently **offline** — Pages is unpublished and the deploy
  workflow is disabled.

## Status

✅ Site development complete (build, deploy pipeline, Scholar sync, 404) · currently **offline**
while content is finalized · ⏳ next: the editing **CMS**, then launch.
Awaiting from Hadar: final bio + CV, ORCID/GitHub links, confirmation of her role on course 22938.
Original design mockup: [`design/mockup-v1.html`](design/mockup-v1.html).
