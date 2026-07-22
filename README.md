# Vj's Beastline Gym

Official landing page for **Vj's Beastline Gym** in Mangalam, Tirupati.

## Overview

This is a React + Vite single-page website for a local gym. It includes business information, membership plans, facilities, a gallery, FAQ, contact/map details, SEO metadata, and a small rule-based chatbot for common visitor questions.

## Tech Stack

- React 19
- Vite 6
- TypeScript
- Tailwind CSS 4
- Motion
- Lucide React
- GitHub Pages deployment

## Business Information

- **Name:** Vj's Beastline Gym
- **Address:** 506, AMK Arcade, Saptagiri Colony Mangalam, 12-505, Mangalam, Andhra Pradesh 517507
- **Phone:** +91 93939 36781
- **Hours:** Monday to Saturday, 5:00 AM - 10:00 AM and 5:00 PM - 10:00 PM; Sunday, 5:00 AM - 10:00 AM
- **Motto:** Discipline is Freedom

## Development

```bash
npm install
npm run dev
```

The development server runs on port `3000`.

## Validation

```bash
npm run lint
npm run build
```

`npm run lint` runs TypeScript with `--noEmit`. `npm run build` creates the production build in `dist`.

## Deployment

The Vite base path is configured for GitHub Pages:

```ts
base: '/beastlinegym/'
```

Deploy with:

```bash
npm run deploy
```

The deployed URL is expected to be:

```text
https://Alagani.github.io/beastlinegym/
```

## CI/CD Pipeline

GitHub Actions workflow: `.github/workflows/deploy.yml`

Stages:

1. **Quality:** installs dependencies with `npm ci` and runs `npm run lint`.
2. **Test:** runs `npm test` when a test script exists; otherwise the stage is skipped safely.
3. **Security Audit:** runs `npm audit --omit=dev --audit-level=high`.
4. **Build:** creates the production `dist` output and uploads it as a build artifact.
5. **Deployment Gate:** allows deployment only for pushes to the `main` branch.
6. **Deploy:** publishes the approved `dist` artifact to GitHub Pages.

Pull requests run quality, test, security, and build stages only. Pushes to `main` run all stages and deploy to GitHub Pages.

## SEO Notes

The site includes:

- Title, description, keywords, and robots meta tags
- Open Graph and Twitter metadata
- Local business JSON-LD schema
- `robots.txt`
- `sitemap.xml`
- Google Search Console verification file
