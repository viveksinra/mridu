# Mridula (Mohni) — Happy Firstday Microsite

A polished, mobile-first Next.js 14+ (App Router) microsite to celebrate Mridula (home name Mohni). Built with TypeScript, Tailwind CSS, and Framer Motion. Deployed on Vercel.

## Quickstart

1. Install deps

```bash
npm install
```

2. Run dev

```bash
npm run dev
```

3. Build

```bash
npm run build && npm start
```

4. Typecheck & lint

```bash
npm run typecheck
npm run lint
```

## Project structure

- `src/app/(site)/*` — pages: Home, Story, Gallery, Wishes, Surprise (+ optional Patna)
- `src/components/*` — UI components (Hero/FloatingDecor, Countdown, AudioPlayer, Visualizer, ScratchReveal, Timeline, Gallery, Typewriter, ConfettiButton, BalloonGame)
- `src/lib/*` — utilities (time zone countdown, analytics toggle, SEO helpers)
- `src/content/config.ts` — all editable copy, dates, socials, assets
- `public/` — images, audio, lottie, icons

## Edit content

Open `src/content/config.ts` and modify:

- `honoree` names
- `city`, `study`, `met`
- `birthdayMonth`, `birthdayDay`
- `compliments`, `letter`
- `galleryPlaceholders`
- `audio.happyBirthday`, `audio.aboutSong`

## Add assets

- Drop images under `public/images/placeholders/` and update paths in `config.ts`
- Replace audio files: `public/audio/hbd.mp3`, `public/audio/about-mridula.mp3`
- Lottie JSON (optional): `public/lottie/*.json`

## Theming

Edit CSS variables in `src/app/(site)/globals.css`:

- `--bg`, `--accent`, `--accent-2`, `--muted`, `--text`

Fonts: `next/font` loads Inter (body) and Poppins (headings).

## Accessibility & Motion

- Keyboard-focusable controls, visible focus rings
- Reduce Motion toggle in header; honors `prefers-reduced-motion`

## SEO

- Metadata from `src/lib/seo.ts`
- JSON-LD Person and Event
- `sitemap.ts` and `robots.txt`

## Performance

- Framer Motion only where needed
- Dynamic import for heavy/optional components (Visualizer, Analytics)
- Next Image with responsive sizes

## PWA

- `public/manifest.webmanifest` with icons `icon-192.png`, `icon-512.png`

## Analytics

- Optional Vercel Analytics: set `NEXT_PUBLIC_ENABLE_ANALYTICS=1`

## Deploy (Vercel)

- Import repo into Vercel
- Build command: `npm run build`
- Output dir: `.next`
- Environment vars: optional `NEXT_PUBLIC_ENABLE_ANALYTICS=1`

---

Made with ❤️ for Mohni.
