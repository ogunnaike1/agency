'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Image from 'next/image';
import { motion } from '@/lib/motion';
import { HERO_ART, STAGE_IMAGES } from '@/lib/art';
import { TEAM } from '@/lib/data';
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
    const pins = plates.map((p) => p.querySelector<HTMLElement>('[data-pin]')!);
    const projs = plates.map((p) => p.querySelector<HTMLElement>('[data-proj]'));
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    motion.reduce = reduce; if (reduce || page !== 'home') motion.intro.v = 1;
    // Phones: element rects are measured once in document space and reused (rect = docY - scrollY), so the per-frame loop
    // never forces layout. Re-measured on resize / load / fonts / body size change.
    const cache = new Map<Element, R>();
    let lastW = innerWidth;
    const rectOf = (el: Element, mob: boolean, sy: number): R => {
      if (!mob) return fromDom(el.getBoundingClientRect());
      let c = cache.get(el);
      if (!c) { const b = el.getBoundingClientRect(); c = { x: b.left, y: b.top + sy, w: b.width, h: b.height }; cache.set(el, c); }
      return { x: c.x, y: c.y - sy, w: c.w, h: c.h };
    };
    let media: HTMLElement | null = null, lastMedia: HTMLElement | null = null, persons: HTMLElement[] = [], foot: HTMLElement | null = null, key = '', sized = '', wasMob: boolean | null = null;

    const update = () => {
      const W = innerWidth, H = innerHeight, sy = scrollY, mob = W < 900;
      if (wasMob !== mob) { wasMob = mob; sized = ''; }
      const iv = motion.intro.v;
      const k = `${sy.toFixed(1)}|${W}|${H}|${iv.toFixed(3)}`;
      if (k === key) return; key = k;
      media = media && media.isConnected ? media : document.querySelector<HTMLElement>('[data-card] [data-media]');
      if (!lastMedia || !lastMedia.isConnected) { const all = document.querySelectorAll<HTMLElement>('[data-card] [data-media]'); lastMedia = all.length ? all[all.length - 1] : null; }
      if (!persons.length || !persons[0].isConnected) persons = Array.from(document.querySelectorAll<HTMLElement>('[data-person] [data-pmedia]'));
      foot = foot && foot.isConnected ? foot : document.querySelector<HTMLElement>('footer');
      const rd = (t: number) => (reduce ? Math.round(t) : t);

      const pc = (r: number[]): R => ({ x: (r[0] * W) / 100, y: (r[1] * H) / 100, w: (r[2] * W) / 100, h: (r[3] * H) / 100 });
      const hero = (mob ? [[34, 20, 58, 30], [10, 44, 52, 26], [70, 58, 22, 14], [4, 14, 22, 9]] : [[33, 24, 22, 44], [46, 34, 30, 52], [84, 42, 9, 22], [3, 80, 15, 12]]).map(pc);
      const full: R = { x: 0, y: 0, w: W, h: H };

      const t1 = rd(cl(sy / (H * 0.95)));
      const tf = foot ? rd(cl((H - rectOf(foot, mob, sy).y) / (H * 0.9))) : 0;
      const topEnd = mob ? 84 : Math.min(120, Math.max(72, H * 0.1)); // where the first project card settles under the nav

      const projO = [0, 0, 0, 0];
      const out = hero.map((h0, i) => {
        let r = h0, o = 1, d = 0;
        if (tf > 0) { // finale: gather into the footer mark
          const s = document.querySelector<HTMLElement>(`[data-slot="f-${i}"]`);
          if (!s) return { r, o: 0, d };
          const sr = rectOf(s, mob, sy);
          const start: R = { x: sr.x + sr.w * 0.3, y: sr.y + H * 0.22, w: sr.w * 0.4, h: sr.h * 0.4 };
          const e = ease(tf);
          return { r: lerp(start, sr, e), o: e, d: DIAG[i] * e };
        }
        if (i === 0) {
          let t2 = 0, mr: R | null = null;
          if (media) { mr = rectOf(media, mob, sy); t2 = rd(cl((H * 0.95 - mr.y) / (H * 0.95 - topEnd))); }
          if (t2 > 0 && mr) {
            r = lerp(full, mr, ease(t2)); projO[0] = 1;
            o = t2 > 0.9 ? 1 - (t2 - 0.9) / 0.1 : 1; // crossfade onto the card's own (identical) image
          } else {
            r = lerp(h0, full, ease(t1));
            projO[0] = ease(cl((t1 - 0.4) / 0.45));
          }
        } else if (persons[i - 1] && lastMedia && (() => {
          // work → team: the last project frame splits into three strips that drop into the three portraits
          const pr = rectOf(persons[i - 1], mob, sy);
          const a = rd(cl((H * 0.88 - pr.y) / (H * 0.88 - H * 0.32)));
          if (a <= 0) return false;
          const lm = rectOf(lastMedia, mob, sy);
          const sw = lm.w / 3;
          const start: R = mob
            ? { x: pr.x + pr.w * 0.1, y: pr.y + 70, w: pr.w * 0.8, h: pr.h * 0.8 }
            : { x: lm.x + (i - 1) * sw, y: Math.max(lm.y, topEnd), w: sw, h: lm.h };
          r = lerp(start, pr, ease(a));
          o = ease(cl(a / 0.2)) * (a > 0.9 ? 1 - (a - 0.9) / 0.1 : 1);
          projO[i] = 1;
          return true;
        })()) {
          // handled above
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
        if (mob) {
          // phones: compositor-only. The plate is a viewport-sized box scaled to the window rect and its content is
          // counter-scaled and shifted back, so the picture stays put while the window moves. Two transforms per
          // frame: no layout, no repaint, no clip-path.
          if (sized !== `${W}x${H}`) { el.style.width = W + 'px'; el.style.height = H + 'px'; el.style.borderWidth = '0'; }
          const ry = r.y + (r.h * ct) / 100, rh = r.h * (1 - ct / 100);
          const sx = Math.max(r.w / W, 0.001), sy2 = Math.max(rh / H, 0.001);
          el.style.transform = `translate3d(${r.x.toFixed(2)}px,${ry.toFixed(2)}px,0) scale(${sx.toFixed(5)},${sy2.toFixed(5)})`;
          pins[i].style.transform = `scale(${(1 / sx).toFixed(5)},${(1 / sy2).toFixed(5)}) translate3d(${(-r.x).toFixed(2)}px,${(-ry).toFixed(2)}px,0)`;
        } else {
          if (sized !== `${W}x${H}`) { el.style.width = ''; el.style.height = ''; el.style.borderWidth = ''; pins[i].style.transform = ''; }
          el.style.width = Math.max(0, r.w) + 'px'; el.style.height = Math.max(0, r.h) + 'px';
          el.style.transform = `translate3d(${r.x}px,${r.y}px,0)`;
          el.style.clipPath = ct > 0.1 ? `inset(${ct}% 0 0 0)` : 'none';
        }
        el.style.opacity = (o * dim).toFixed(3);
        el.style.visibility = o * dim < 0.002 ? 'hidden' : 'visible';
        ovs[i].style.opacity = d.toFixed(3);
      });
      sized = `${W}x${H}`;
      projs.forEach((pj, i) => { if (pj) pj.style.opacity = projO[i].toFixed(3); });
    };
    motion.update = () => { key = ''; update(); };

    gsap.ticker.add(update);
    const refresh = () => { cache.clear(); key = ''; };
    const onResize = () => { if (innerWidth !== lastW) { lastW = innerWidth; cache.clear(); } key = ''; }; // URL-bar height changes don't move anything
    addEventListener('resize', onResize); addEventListener('load', refresh);
    document.fonts?.ready.then(refresh);
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(refresh) : null;
    ro?.observe(document.body);
    const late = setTimeout(refresh, 600), late2 = setTimeout(refresh, 2000);
    update();
    return () => { gsap.ticker.remove(update); clearTimeout(late); clearTimeout(late2); ro?.disconnect(); removeEventListener('resize', onResize); removeEventListener('load', refresh); motion.update = () => {}; };
  }, [page]);

  return (
    <div ref={root} aria-hidden className="pointer-events-none fixed inset-0 z-20 overflow-hidden">
      {HERO_ART.map((bg, i) => (
        <div key={i} data-plate className="absolute left-0 top-0 overflow-hidden border border-silver will-change-transform" style={{ visibility: 'hidden', transformOrigin: '0 0' }}>
          <div data-pin className="absolute inset-0 will-change-transform" style={{ background: bg, transformOrigin: '0 0' }}>
          {(i === 0 || TEAM[i - 1]?.image) && (
            <div data-proj className="absolute inset-0 opacity-0">
              <Image src={i === 0 ? STAGE_IMAGES[0] : TEAM[i - 1].image!} alt="" fill sizes="100vw" className={`object-cover ${i === 0 ? 'object-top' : 'object-center'}`} />
            </div>
          )}
          <i data-ov className="absolute inset-0 bg-graphite opacity-0" />
          </div>
        </div>
      ))}
    </div>
  );
}
