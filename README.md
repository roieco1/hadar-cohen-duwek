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

## Status

✅ Live on GitHub Pages · ⏳ next: automatic Google Scholar sync, then the editing CMS.
Original design mockup: [`design/mockup-v1.html`](design/mockup-v1.html).
