# 100-websites-in-30-days

A project by Neal Frazier

## Overview
This repository is part of Neal Frazier project collection.

## Tech Stack
- React
- Vite
- Express
- Netlify (deployed)

## Project Structure
```
100-websites-in-30-days/
  - netlify
  - public
  - scripts
  - src
  - video-assets
  (273 files total)
```

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation
```bash
git clone https://github.com/1nc0gn30/100-websites-in-30-days.git
cd 100-websites-in-30-days
npm install
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Available Scripts
  npm run dev - vite --port=3000 --host=0.0.0.0
  npm run build - vite build
  npm run preview - vite preview
  npm run clean - rm -rf dist
  npm run lint - tsc --noEmit
  npm run prebuild - tsx scripts/generate-prerender-manifest.ts
  npm run prerender:manifest - tsx scripts/generate-prerender-manifest.ts

## Original README
<details>
<summary>Click to expand original README</summary>

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

</details>

## TODO / Roadmap
- [ ] Add unit tests
- [ ] Add LICENSE file
- [ ] Add Dockerfile for containerized deployment
- [ ] Consider adding Tailwind CSS
- [ ] Add CI/CD pipeline
- [ ] Add contribution guidelines (CONTRIBUTING.md)
- [ ] Improve error handling and edge cases
- [ ] Add environment variable documentation
- [ ] Update dependencies to latest versions
- [ ] Add code comments and inline documentation

## Deployment
This project is deployed on Netlify. See netlify.toml for configuration.

## Author
**Neal Frazier** - [@AshAmplifies](https://github.com/1nc0gn30)

## Links
- GitHub: https://github.com/1nc0gn30/100-websites-in-30-days

---
*This README was enhanced as part of the neals-projects-2026 batch update.*
