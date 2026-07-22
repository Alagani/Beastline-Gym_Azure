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
- Azure Static Web Apps deployment

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

Deployed automatically to Azure Static Web Apps via GitHub Actions on push to `main`.

## CI/CD Pipeline

GitHub Actions workflow: `.github/workflows/azure-static-web-apps.yml`

Stages:

1. **Install:** `npm ci`
2. **Lint:** `npm run lint` (TypeScript type check)
3. **Build:** `npm run build` (Vite production build)
4. **Deploy:** publishes `dist` to Azure Static Web Apps

Runs on pushes to `main` and on pull requests (without deploying).

## SEO Notes

The site includes:

- Title, description, keywords, and robots meta tags
- Open Graph and Twitter metadata
- Local business JSON-LD schema
- `robots.txt`
- `sitemap.xml`
- Google Search Console verification file
