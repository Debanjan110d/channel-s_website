# channel-s_website

Live site: https://gammercodeweb.vercel.app/

## Stack
- React 19 + Vite
- React Router v7
- Tailwind CSS (v4 import via `@import "tailwindcss"` in `src/index.css`)

## Environment Variables
- Create `.env` from `.env.example`
- Required: `VITE_YOUTUBE_API_KEY`
- Optional: `VITE_YOUTUBE_CHANNEL_ID` (defaults to `UChuGtKOtKDiEv-eaqhyyKpg`)

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
