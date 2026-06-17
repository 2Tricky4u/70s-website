# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A gritty, interactive 1990s personal photo-archive website with an underground-techno / industrial-flyer / zine aesthetic (distressed cream paper, black ink panels, burnt-orange accents, halftone grain, scanlines, condensed all-caps type). It is a single-page React app — no router, no backend; all content is mock data. The visual reference being replicated is `art.png` at the repo root.

## Commands

```bash
npm install
npm run dev      # Vite dev server at http://localhost:5173
npm run build    # tsc -b (type-check) then vite build → /dist
npm run preview  # serve the production build
```

There is no test suite, linter, or formatter configured — `npm run build` (which runs `tsc -b` first) is the only correctness gate. There are no individual tests to run.

**Restart the dev server after editing `tailwind.config.js`** — Tailwind config changes are not picked up by HMR and the new utility classes won't generate until restart.

## Environment notes

- Windows / PowerShell is the primary shell (a Bash tool is also available for POSIX scripts). Use the dedicated Read/Edit/Write/Glob/Grep tools rather than shell equivalents.
- The Higgsfield MCP server is used to generate textures/audio/imagery (`generate_image` with nano_banana_pro, `generate_audio`, `remove_background`). Generated assets are downloaded into `public/textures/`, `public/music/`, etc.

## Architecture

### Composition
`src/App.tsx` is the single composition root. It owns the only two pieces of global UI state — the active poster filter and the open lightbox poster id — and lays out: full-bleed `SystemHeader` → a centered `max-w-[1600px]` `.site-frame` "white box" containing `Navigation`, `Hero`, `FilterBar`, `PosterGrid`, `Collections`, `Manifesto` → full-bleed `Footer`. The whole tree is wrapped in `MusicPlayerProvider`. Overlays (`FloatingMenu`, `StickyFooterBar`, `ExpandedPosterModal`) are rendered as fixed-position siblings so DOM order doesn't constrain them.

### Theming is CSS-variable-driven (key concept)
The accent color and the duotone photo tint are **not** hard-coded — they are CSS custom properties so any scope can re-theme everything inside it:
- `tailwind.config.js`: `orange.DEFAULT` = `"rgb(var(--accent-rgb) / <alpha-value>)"`, so `text-orange`, `bg-orange`, `border-orange`, `text-orange/45`, etc. all follow `--accent-rgb`. `orange.soft`/`orange.deep` stay static.
- `src/index.css` `:root` defines `--accent-rgb: 255 75 11` (space-separated channels) and `--duo-hue: -18deg`. `.duotone`/`.duotone-deep` and `.light-leak` reference these vars.
- Setting inline `style={{ "--accent-rgb": "...", "--duo-hue": "..." }}` on any element recolors all reused child components for free. This is how each Collection card and the `CollectionBrowser` get their distinct theme without forking any component. When adding accent colors, use the `orange` Tailwind classes (or `var(--accent-rgb)`) rather than literal `rgb(255,75,11)` so the element stays themeable.

### Collections → themed browsers
`Collections.tsx` renders 5 cards from `data/collections.ts`; each card carries its own `--accent-rgb` and clicking it opens `CollectionBrowser` (a full-screen `fixed z-[96]` takeover) via `AnimatePresence`. The browser sets the theme vars on its root, maps the collection's `photos` onto `Poster` shapes, and **reuses** `PosterGrid` + `ExpandedPosterModal` so the gallery and lightbox inherit the theme automatically. Collection photo ids are prefixed (`col-<id>-NN`) to avoid Framer Motion `layoutId` collisions with the main archive posters.

### Texture / grit system (`src/index.css` + `lib/grit.ts`)
The worn look is layered, not a single overlay:
- **Macro** paper textures via multi-stop `background-image` stacks (noise + color@0.7 + a `public/textures/*.webp` paper image) on `.paper-panel` / `.ink-panel` (with `data-tex` variants).
- **Medium** scratch/dust/fold/stain overlays via `<WornLayer>`, positioned per-instance from a string seed.
- **Micro** animated SVG `feTurbulence` grain (`GrainOverlay`, `.grain-layer`) + `.scanlines`.
- Title damage: `.title-distress` masks the text glyphs with an ink-distress texture; `.title-rough` applies `filter: url(#roughen)` (SVG filter defined in `DistressDefs`). Use the `<DistressedTitle>` component rather than these classes directly.
- `lib/grit.ts` provides `seeded(str)` (deterministic PRNG), `wornVars(seed)`, and `distressVars(seed)` — pass a stable seed string so each element's wear is consistent across renders but spatially varied between elements.

### Music player (`MusicPlayer.tsx`)
`MusicPlayerProvider` holds one `<audio>` element and lazily builds a Web Audio graph (`AudioContext` → `createMediaElementSource` → `AnalyserNode`) **once**, on the first user-initiated play (browser autoplay/security constraint). `getAnalyser()` exposes the live `AnalyserNode`; `ReactiveWaveform` reads `getByteFrequencyData` on a rAF loop and drives bar heights via refs — **deliberately no React re-render per frame**. Tracks live in `data/tracks.ts` (`public/music/track-0N.m4a`); the player auto-advances on `ended`. `NowPlaying` and `StickyFooterBar` consume the context.

### Framer Motion gotchas (these caused real bugs)
- `AnimatePresence` children need stable `key`s. **Do not re-key a `layoutId` element while it is mid-presence** — remounting a shared-layout node during its exit corrupts `AnimatePresence` and can leave a `fixed` overlay capturing clicks (the "open image → next → close → site unclickable" bug). `ExpandedPosterModal`'s content div intentionally has no `key={poster.id}`.
- `StickyFooterBar` hides before the real `Footer` via an `IntersectionObserver` with `rootMargin`.

### Data shapes (`src/types.ts`)
`Poster` is the universal photo shape used by the grid and modal. `Collection` carries `theme: CollectionTheme` (`accentRgb`, `hue`, `era`) plus a generated `CollectionPhoto[]`. To add an archive memory, append to `data/posters.ts`; to add a collection, append to `data/collections.ts` (use `buildPhotos(...)` and give it a `theme`).

## Conventions
- Self-hosted fonts only (`@font-face` in `index.css`, files in `public/fonts/`). Tailwind families: `font-display` (Anton), `font-condensed` (Oswald), `font-mono` (Roboto Mono), `font-plex` (IBM Plex Mono — used for menu + tag selection).
- Remote images are seeded `picsum.photos` URLs rendered through the duotone CSS filter via `<ArchiveImage>`, which also provides a CSS-only gritty fallback if the network is unavailable — the layout reads correctly offline.
- Heavy animation loops are gated behind a `prefers-reduced-motion` block in `index.css`.
