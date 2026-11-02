# Agency site — Next.js + Tailwind

Next.js 14 (App Router) · React 18 · TypeScript · Tailwind CSS 3 · GSAP 3.13 (ScrollTrigger + SplitText, both free).

```bash
npm install
npm run dev
```

## Fonts (you must supply licensed files)
Put these in `app/fonts/`:
- `PPNeueMontreal-Book.woff2`, `PPNeueMontreal-Medium.woff2` — PP Neue Montreal (Pangram Pangram licence) — primary
- `ClashDisplay-Medium.woff2`, `ClashDisplay-Semibold.woff2` — Clash Display (Fontshare) — headlines
Space Mono loads from Google via next/font. No other fonts; nothing italic or serif.

## Structure
- `components/Stage.tsx` — the motion system: 4 fixed plates recomposed per chapter by scroll (hero → services → work → process → studio → contact → footer). Reversible, no pinning. Replace the `ART` gradients with real imagery.
- `components/Watermark.tsx` — faint logo cycling solid ↔ liquid on scroll.
- `components/MaskHeading.tsx` — scrubbed SplitText char reveal.
- `components/Hero.tsx` — load intro timeline + hero.
- `lib/data.ts` — all copy (drafts flagged `draft: true`). `lib/motion.ts` — shared intro value.
- Sections expose `data-pillar`, `data-wrow`, `data-pstage`, `data-slot` hooks the Stage reads; keep them.

## Notes
- Email is a placeholder (`lib/data.ts`). Contact uses an encoded `mailto:` — no fake submit.
- Reduced motion: no intro, no reveals, snapped transitions, solid watermark.
- Not yet run/tested in a browser as a Next.js project: run `npm run build`, check hydration, scroll forward/back, and mobile.
- Reference prototype: `Agency Site v2.dc.html`.
