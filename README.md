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

## Editing the site (CMS)

The site has a built-in, form-based editor (**Sveltia CMS**) at **`/admin`** — on the live
site that's `https://roieco1.github.io/hadar-cohen-duwek/admin/`. No code, no separate
service, no OAuth server. Editable: **Profile & Contact** (bio, interests, photo, links,
email) and **Courses**. Saving commits to the repo and the site republishes automatically.

> Publications are **not** edited here — they come from the automatic Google Scholar sync.

### Giving Hadar access (one-time)

Add her GitHub account as a repo collaborator (repo → **Settings → Collaborators → Add people**)
so only she and the owner can edit, and she accepts the invite.

One-click **"Sign in with GitHub"** is enabled via a Sveltia CMS Authenticator Cloudflare
Worker — its URL is set as `base_url` in [`public/admin/config.yml`](public/admin/config.yml),
backed by a GitHub OAuth App (client ID/secret live only in the worker).

### Editing

1. Open the site's `/admin` page.
2. Click **Sign in with GitHub** and approve (a "Sign in with Token" option is also on the
   same screen as a fallback).
3. Edit the fields, click **Save/Publish** → the change commits and the site rebuilds (~1 min).

Content still lives as plain files if you prefer editing directly:
[`src/data/site.json`](src/data/site.json), [`src/data/courses.json`](src/data/courses.json),
and `public/hadar-profile.jpg`.

### Editing locally (developer)

```bash
npx @sveltia/cms-server   # in one terminal (local backend proxy)
npm run dev               # in another, then open /admin — no token needed
```

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

## Publishing / launch switch

The site deploys automatically, but the **homepage is gated** by a launch flag so the
public profile isn't live yet — while the `/admin` editor is:

- **Now (pre-launch):** the homepage is a private "coming soon" placeholder (no-index).
  The `/admin` editor is fully live so Hadar can start editing content.
- **To launch (reveal the real profile):**
  ```bash
  gh variable set SITE_LIVE --body true
  gh workflow run deploy.yml
  ```
- **To hide the profile again:** `gh variable delete SITE_LIVE` (or set `false`), then re-run.
- **To take everything fully offline:** `gh workflow disable deploy.yml` and unpublish Pages
  (`gh api -X DELETE repos/roieco1/hadar-cohen-duwek/pages`).

Locally, `SITE_LIVE=true npm run build` previews the real site; the default build shows the placeholder.

## Status

✅ **Live** at https://roieco1.github.io/hadar-cohen-duwek/ — full site, `/admin` CMS, and
deploy pipeline all in place. Hadar edits in `/admin` and changes publish automatically (~1 min).
Optional next: add `SERPAPI_KEY` to activate the auto Scholar sync; ORCID/GitHub links; a CV;
confirm her role on course 22938; a custom domain.
Original design mockup: [`design/mockup-v1.html`](design/mockup-v1.html).
