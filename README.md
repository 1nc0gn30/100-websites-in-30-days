# 100 Websites in 30 Days

Official tracker site for Neal Frazier's public build challenge.

Live domain: `https://100WebsitesIn30Days.nealfrazier.tech`

## Stack
- React + Vite
- Tailwind CSS
- Motion
- Netlify (deploy + forms)

## Local Development
1. Install dependencies:
   - `npm install`
2. Run dev server:
   - `npm run dev`
3. Build production output:
   - `npm run build`

## Deployment (Netlify)
- Build command: `npm run build`
- Publish directory: `dist`
- Redirect rules: `public/_redirects`
- Netlify config: `netlify.toml`

## SEO + Crawl
- Canonical base: `https://100WebsitesIn30Days.nealfrazier.tech`
- Sitemap: `/sitemap.xml`
- Robots: `/robots.txt`

## Project Structure
- `src/` app code
- `public/` static assets and crawl files
- `scripts/generate-prerender-manifest.ts` route metadata for prerendered pages
