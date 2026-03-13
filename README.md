# channel-s_website

Live site: <https://gammercodeweb.vercel.app/>

## Stack

- React 19 + Vite
- React Router v7
- Tailwind CSS (v4 import via `@import "tailwindcss"` in `src/index.css`)

## Environment Variables

- Create `.env` from `.env.example`
- Optional fallback only: `VITE_YOUTUBE_API_KEY`
- Optional: `VITE_YOUTUBE_CHANNEL_ID` (defaults to `UChuGtKOtKDiEv-eaqhyyKpg`)
- Required for Contact form: `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`

## Vercel Deployment

- Framework preset: `Vite`
- Install command: `npm install`
- Build command: `npm run build`
- Output directory: `dist`
- Add these Environment Variables in Vercel Project Settings: `VITE_YOUTUBE_API_KEY`, `VITE_YOUTUBE_CHANNEL_ID`, `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`
- SPA routing is configured via `vercel.json` so route refreshes like `/about` or `/shorts` do not return 404.

## Daily YouTube Cache

- App reads `public/data/youtube-cache.json` first to avoid frequent quota usage.
- Generate/update cache manually: `npm run youtube:cache`
- Auto-update runs daily via `.github/workflows/update-youtube-cache.yml` at `00:00 UTC`.
- Add GitHub repository secret `YOUTUBE_API_KEY` (required for workflow).
- Optional GitHub repository secret `YOUTUBE_CHANNEL_ID`.

## Run it locally

- Install deps: `npm install`
- Start dev server: `npm run dev`
- Build for prod: `npm run build`
- Preview build: `npm run preview`

## Project map (quick)

- `src/Layout.jsx` – shared layout
- `src/components/Header/Header.jsx` – top nav
- `src/components/Footer/Footer.jsx` – footer + socials
- `src/components/Home/Home.jsx` – home page
