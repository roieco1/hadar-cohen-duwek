// @ts-check
import { defineConfig } from 'astro/config';

// Deployed as a GitHub Pages project site at:
//   https://roieco1.github.io/hadar-cohen-duwek
// If a custom domain is added later, set `site` to it and clear `base`.
export default defineConfig({
  site: 'https://roieco1.github.io',
  base: '/hadar-cohen-duwek',
  trailingSlash: 'ignore',
});
