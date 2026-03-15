# channel-s_website

Live site: <https://gammercodeweb.vercel.app/>

## Stack

- React 19 + Vite
- React Router v7
- Tailwind CSS (v4 import via `@import "tailwindcss"` in `src/index.css`)

## Environment Variables

- Create `.env` from `.env.example`
- Recommended for deployment/runtime API: `YOUTUBE_API_KEY`
- Optional for deployment/runtime API: `YOUTUBE_CHANNEL_ID` (defaults to `UChuGtKOtKDiEv-eaqhyyKpg`)
- Optional local fallback only: `VITE_YOUTUBE_API_KEY`
- Optional local fallback only: `VITE_YOUTUBE_CHANNEL_ID`
- Required for Contact form: `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`

## Vercel Deployment

- Framework preset: `Vite`
- Install command: `npm install`
- Build command: `npm run build`
- Output directory: `dist`
- Add these Environment Variables in Vercel Project Settings: `YOUTUBE_API_KEY`, `YOUTUBE_CHANNEL_ID`, `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`
- SPA routing is configured via `vercel.json` so route refreshes like `/about` or `/shorts` do not return 404.

## YouTube Refresh Strategy

- App fetches YouTube data from `/api/youtube-feed` at runtime, so fresh content is requested when visitors load the site.
- If runtime API is unavailable, app falls back to direct client API (only when `VITE_YOUTUBE_API_KEY` is set).
- No scheduled GitHub Action is required for normal operation.

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
