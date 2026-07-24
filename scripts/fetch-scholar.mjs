// Fetches Hadar's publications from Google Scholar (via SerpAPI) and writes
// src/data/publications.json. Designed to run at build time and on a weekly
// schedule (see .github/workflows/deploy.yml).
//
// Requires a SERPAPI_KEY (free tier is plenty for a weekly sync). If the key is
// absent or the request fails, the existing publications.json is left untouched,
// so the site always has good data to fall back on.
//
// Run locally:  SERPAPI_KEY=xxxx npm run sync:scholar

import { writeFile } from 'node:fs/promises';

const AUTHOR_ID = process.env.SCHOLAR_AUTHOR_ID || '0kq7pdcAAAAJ';
const KEY = process.env.SERPAPI_KEY;
const OUT = new URL('../src/data/publications.json', import.meta.url);
const PROFILE = `https://scholar.google.com/citations?user=${AUTHOR_ID}&hl=en`;

const CONF_HINTS = [
  /proceedings/i, /conference/i, /workshop/i, /symposium/i,
  /\bcvpr\b/i, /\biccv\b/i, /\beccv\b/i, /neurips|\bnips\b/i, /\biclr\b/i,
  /\bicml\b/i, /\baaai\b/i, /\bijcai\b/i, /cogsci|cognitive science society/i,
];
const PREPRINT_HINTS = [/arxiv/i, /biorxiv/i, /preprint/i, /\bssrn\b/i];

function classify(venue = '') {
  if (PREPRINT_HINTS.some((r) => r.test(venue))) return 'preprint';
  if (CONF_HINTS.some((r) => r.test(venue))) return 'conf';
  return 'journal';
}

async function main() {
  if (!KEY) {
    console.warn('[scholar] SERPAPI_KEY not set — skipping sync, keeping existing publications.json.');
    return;
  }

  const url = new URL('https://serpapi.com/search.json');
  url.searchParams.set('engine', 'google_scholar_author');
  url.searchParams.set('author_id', AUTHOR_ID);
  url.searchParams.set('num', '100');
  url.searchParams.set('api_key', KEY);

  const res = await fetch(url);
  if (!res.ok) throw new Error(`SerpAPI responded ${res.status}: ${await res.text()}`);
  const data = await res.json();

  const articles = Array.isArray(data.articles) ? data.articles : [];
  if (articles.length === 0) throw new Error('No articles returned — keeping existing data.');

  const items = articles
    .map((a) => {
      const venue = a.publication || '';
      return {
        title: a.title,
        authors: a.authors || '',
        venue,
        year: a.year ? Number(a.year) : null,
        type: classify(venue),
        citations: a.cited_by?.value ?? 0,
        url: a.link || PROFILE,
      };
    })
    .filter((x) => x.title)
    .sort((x, y) => (y.year || 0) - (x.year || 0) || y.citations - x.citations);

  const out = {
    lastUpdated: new Date().toISOString().slice(0, 10),
    profileUrl: PROFILE,
    items,
  };

  await writeFile(OUT, JSON.stringify(out, null, 2) + '\n');
  console.log(`[scholar] Wrote ${items.length} publications to src/data/publications.json`);
}

main().catch((err) => {
  console.error('[scholar] Sync failed:', err.message);
  process.exit(1);
});
