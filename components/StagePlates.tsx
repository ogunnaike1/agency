'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Image from 'next/image';
import { motion } from '@/lib/motion';
import { HERO_ART, STAGE_IMAGES } from '@/lib/art';
import type { StagePage } from './Stage';

type R = { x: number; y: number; w: number; h: number };
const cl = (a: number) => Math.min(1, Math.max(0, a));
const ease = (t: number) => t * t * (3 - 2 * t);
const lerp = (a: R, b: R, e: number): R => ({ x: a.x + (b.x - a.x) * e, y: a.y + (b.y - a.y) * e, w: a.w + (b.w - a.w) * e, h: a.h + (b.h - a.h) * e });
const fromDom = (r: DOMRect): R => ({ x: r.left, y: r.top, w: r.width, h: r.height });
const DIAG = [1, 0, 0, 1]; // graphite plates on the diagonal: the footer mark echoes the logo

/**
 * Home story: ONE set of four fixed plates that is choreographed from the hero to the footer.
 *   hero collage → plate 0 grows to full-bleed (the other three drift off at different speeds, parallax)
 *   → it swaps to the first project's image and shrinks into that project card (live rect, so it tracks the scroll)
 *   → … → the four plates reassemble as the 2×2 logo mark in the footer.
 * Everything is derived from scroll position + live DOM rects each frame, so it reverses perfectly and never drifts.
 */
export default function StagePlates({ page }: { page: StagePage }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const plates = Array.from(root.current!.querySelectorAll<HTMLElement>('[data-plate]'));
    const ovs = plates.map((p) => p.querySelector<HTMLElement>('[data-ov]')!);
    const proj = root.current!.querySelector<HTMLElement>('[data-proj]')!;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    motion.reduce = reduce; if (reduce || page !== 'home') motion.intro.v = 1;
    let media: HTMLElement | null = null, foot: HTMLElement | null = null, key = '';

    const update = () => {
      const W = innerWidth, H = innerHeight, sy = scrollY, mob = W < 900;
      const iv = motion.intro.v;
      const k = `${sy.toFixed(1)}|${W}|${H}|${iv.toFixed(3)}`;
      if (k === key) return; key = k;
      media = media && media.isConnected ? media : document.querySelector<HTMLElement>('[data-card] [data-media]');
      foot = foot && foot.isConnected ? foot : document.querySelector<HTMLElement>('footer');
      const rd = (t: number) => (reduce ? Math.round(t) : t);

      const pc = (r: number[]): R => ({ x: (r[0] * W) / 100, y: (r[1] * H) / 100, w: (r[2] * W) / 100, h: (r[3] * H) / 100 });
      const hero = (mob ? [[34, 20, 58, 30], [10, 44, 52, 26], [70, 58, 22, 14], [4, 14, 22, 9]] : [[33, 24, 22, 44], [46, 34, 30, 52], [84, 42, 9, 22], [3, 80, 15, 12]]).map(pc);
      const full: R = { x: 0, y: 0, w: W, h: H };

      const t1 = rd(cl(sy / (H * 0.95)));
      const tf = foot ? rd(cl((H - foot.getBoundingClientRect().top) / (H * 0.9))) : 0;
      const topEnd = mob ? 84 : Math.min(120, Math.max(72, H * 0.1)); // where the first project card settles under the nav

      let projO = 0;
      const out = hero.map((h0, i) => {
        let r = h0, o = 1, d = 0;
        if (tf > 0) { // finale: gather into the footer mark
          const s = document.querySelector<HTMLElement>(`[data-slot="f-${i}"]`);
          if (!s) return { r, o: 0, d };
          const sr = fromDom(s.getBoundingClientRect());
          const start: R = { x: sr.x + sr.w * 0.3, y: sr.y + H * 0.22, w: sr.w * 0.4, h: sr.h * 0.4 };
          const e = ease(tf);
          return { r: lerp(start, sr, e), o: e, d: DIAG[i] * e };
        }
        if (i === 0) {
          let t2 = 0, mr: R | null = null;
          if (media) { mr = fromDom(media.getBoundingClientRect()); t2 = rd(cl((H * 0.95 - mr.y) / (H * 0.95 - topEnd))); }
          if (t2 > 0 && mr) {
            r = lerp(full, mr, ease(t2)); projO = 1;
            o = t2 > 0.9 ? 1 - (t2 - 0.9) / 0.1 : 1; // crossfade onto the card's own (identical) image
          } else {
            r = lerp(h0, full, ease(t1));
            projO = ease(cl((t1 - 0.4) / 0.45));
          }
        } else { // layered parallax: each plate leaves at its own speed
          r = { ...h0, y: h0.y - ease(t1) * H * (0.45 + 0.3 * i) };
          o = 1 - cl(t1 / 0.7);
        }
        return { r, o, d };
      });

      const dim = mob ? 0.92 : 1;
      plates.forEach((el, i) => {
        const { r, o, d } = out[i];
        const ct = tf > 0 ? 0 : (1 - iv) * 100;
        el.style.width = Math.max(0, r.w) + 'px'; el.style.height = Math.max(0, r.h) + 'px';
        el.style.transform = `translate3d(${r.x}px,${r.y}px,0)`;
        el.style.clipPath = ct > 0.1 ? `inset(${ct}% 0 0 0)` : 'none';
        el.style.opacity = (o * dim).toFixed(3);
        el.style.visibility = o * dim < 0.002 ? 'hidden' : 'visible';
        ovs[i].style.opacity = d.toFixed(3);
      });
      proj.style.opacity = projO.toFixed(3);
    };
    motion.update = () => { key = ''; update(); };

    gsap.ticker.add(update);
    const refresh = () => { key = ''; };
    addEventListener('resize', refresh); addEventListener('load', refresh);
    document.fonts?.ready.then(refresh);
    const late = setTimeout(refresh, 600);
    update();
    return () => { gsap.ticker.remove(update); clearTimeout(late); removeEventListener('resize', refresh); removeEventListener('load', refresh); motion.update = () => {}; };
  }, [page]);

  return (
    <div ref={root} aria-hidden className="pointer-events-none fixed inset-0 z-20 overflow-hidden">
      {HERO_ART.map((bg, i) => (
        <div key={i} data-plate className="absolute left-0 top-0 overflow-hidden border border-silver will-change-transform" style={{ background: bg, visibility: 'hidden' }}>
          {i === 0 && (
            <div data-proj className="absolute inset-0 opacity-0">
              <Image src={STAGE_IMAGES[0]} alt="" fill sizes="100vw" className="object-cover object-top" />
            </div>
          )}
          <i data-ov className="absolute inset-0 bg-graphite opacity-0" />
        </div>
      ))}
    </div>
  );
}
