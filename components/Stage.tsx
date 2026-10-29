'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from '@/lib/motion';

gsap.registerPlugin(ScrollTrigger);

type P = { x: number; y: number; w: number; h: number; ct: number; d: number; v: number; o: number };
const cl = (a: number) => Math.min(1, Math.max(0, a));
const ease = (t: number) => t * t * (3 - 2 * t);
const P = (x: number, y: number, w: number, h: number, ct = 0, d = 0, v = 0, o = 1): P => ({ x, y, w, h, ct, d, v, o });
const lerp = (a: P, b: P, e: number): P => ({ x: a.x + (b.x - a.x) * e, y: a.y + (b.y - a.y) * e, w: a.w + (b.w - a.w) * e, h: a.h + (b.h - a.h) * e, ct: a.ct + (b.ct - a.ct) * e, d: a.d + (b.d - a.d) * e, v: a.v + (b.v - a.v) * e, o: a.o + (b.o - a.o) * e });

// Unsplash photography (free licence); a flat dusty-blue wash keeps it inside the palette. Swap for client imagery any time.
const u = (id: string) => `linear-gradient(rgba(198,212,223,.3),rgba(198,212,223,.3)),url(https://images.unsplash.com/${id}?auto=format&fit=crop&w=1800&q=70) center/cover no-repeat #C6D4DF`;
const ART = [
  u('photo-1487958449943-2429e8be8625'), // hero: pale architecture
  u('photo-1524758631624-e2822e304c36'), // capabilities: bright studio interior
  u('photo-1519389950473-47ba0277781c'), // work: desk workspace
  u('photo-1441974231531-c6227db76b6e'), // process: forest
];

/**
 * Persistent stage: four fixed plates recomposed per chapter (hero → capabilities → work → process → studio → contact → footer).
 * Pure scroll-driven interpolation (no pinning). Fully reversible.
 */
export default function Stage() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const plates = Array.from(root.current!.querySelectorAll<HTMLElement>('[data-plate]'));
    const ovs = plates.map((p) => p.querySelector<HTMLElement>('[data-ov]')!);
    const vls = plates.map((p) => p.querySelector<HTMLElement>('[data-vl]')!);
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    motion.reduce = reduce; if (reduce) motion.intro.v = 1;
    let tops: number[] = [], cap: number[] = [], wrk: number[] = [], prc: number[] = [];

    const centers = (sel: string) => Array.from(document.querySelectorAll(sel)).map((e) => { const r = e.getBoundingClientRect(); return r.top + scrollY + r.height / 2; });
    const measure = () => {
      const top = (sel: string) => { const e = document.querySelector(sel); return e ? e.getBoundingClientRect().top + scrollY : 0; };
      tops = ['#capabilities', '#work', '#process', '#studio', '#contact', 'footer'].map(top);
      cap = centers('[data-pillar]'); wrk = centers('[data-wrow]'); prc = centers('[data-pstage]');
      update();
    };

    const spec = (k: number | 'mid', W: number, H: number, sy: number): P[] => {
      const pc = (r: number[]) => P((r[0] * W) / 100, (r[1] * H) / 100, (r[2] * W) / 100, (r[3] * H) / 100);
      const mob = W < 900; // phones: frames hug the right edge so copy stays readable
      const hero = () => (mob ? [[34, 20, 58, 30], [10, 44, 52, 26], [70, 58, 22, 14], [4, 14, 22, 9]] : [[33, 24, 22, 44], [46, 34, 30, 52], [84, 42, 9, 22], [3, 80, 15, 12]]).map(pc);
      if (k === 0) return hero();
      if (k === 'mid') { const h = hero(); h.forEach((p) => (p.o = 0)); h[0] = mob ? P(W * 0.72, 0, W * 0.28, H, 0, 0.5) : P(0, 0, W, H, 0, 0, 0.82); return h; } // plate 0 takes over the screen
      if (k === 1) { // four vertical panels; panel for the pillar in view widens + darkens
        const Y = [[12, 70], [22, 64], [8, 76], [26, 56]]; let x = mob ? W * 0.8 : W * 0.58;
        return Y.map((y, i) => { const f = cap[i] ? cl(1 - Math.abs(cap[i] - sy - H / 2) / (H * 0.5)) : 0; const w = W * (mob ? 0.035 + 0.05 * f : 0.065 + 0.07 * f); const p = P(x, (y[0] * H) / 100, w, (y[1] * H) / 100, 0, f * 0.85); x += w + W * 0.012; return p; });
      }
      if (k === 2) return [0, 1, 2, 3].map((i) => { // one window; each project wipes in from the bottom
        const f = i === 0 ? 1 : wrk[i] ? cl((H * 0.85 - (wrk[i] - sy)) / (H * 0.4)) : 0;
        return mob ? P(((70 + 2 * i) * W) / 100, ((18 + 2 * i) * H) / 100, W * 0.26, H * 0.6, (1 - f) * 100) : P(((48 + 2 * i) * W) / 100, ((14 + 2 * i) * H) / 100, W * 0.4, H * 0.66, (1 - f) * 100);
      });
      if (k === 3) return [0, 1, 2, 3].map((i) => { // hairlines that grow with stage progress
        const f = prc[i] ? cl((H * 0.75 - (prc[i] - sy)) / (H * 0.35)) : 0;
        return P(((mob ? 80 + 4 * i : 62 + 8 * i) * W) / 100, H * 0.12, Math.max(3, W * 0.004), H * (0.1 + 0.66 * f), 0, 1);
      });
      const D = [1, 0, 0, 1];
      if (k === 4) { // 2x2 studio mark, graphite on the diagonal (echoes the logo)
        const s = Math.min(W * 0.14, H * 0.28), cx = W * 0.78, cy = H * 0.5, g = 5;
        return [[-1, -1], [0, -1], [-1, 0], [0, 0]].map((a, i) => P(cx + (a[0] < 0 ? -s - g / 2 : g / 2), cy + (a[1] < 0 ? -s - g / 2 : g / 2), s, s, 0, D[i]));
      }
      const pre = k === 5 ? 'c' : 'f'; // contact mark, then footer mark (live DOM slots)
      return [0, 1, 2, 3].map((i) => { const e = document.querySelector(`[data-slot="${pre}-${i}"]`); if (!e) return P(W / 2, H / 2, 0, 0, 0, D[i], 0, 0); const r = e.getBoundingClientRect(); return P(r.left, r.top, r.width, r.height, 0, D[i]); });
    };

    const update = () => {
      if (!tops.length) return;
      const sy = scrollY, W = innerWidth, H = innerHeight;
      let j = -1, t = 0;
      tops.forEach((tp, i) => { const p = cl((H - (tp - sy)) / (H * 0.9)); if (p > 0) { j = i; t = p; } });
      if (reduce) t = Math.round(t);
      let S: P[];
      if (j < 0 || t === 0) S = spec(j < 0 ? 0 : j, W, H, sy);
      else if (j === 0) { const a = spec(0, W, H, sy), m = spec('mid', W, H, sy), b = spec(1, W, H, sy); S = t < 0.5 ? a.map((p, i) => lerp(p, m[i], ease(t * 2))) : m.map((p, i) => lerp(p, b[i], ease((t - 0.5) * 2))); }
      else if (t === 1) S = spec(j + 1, W, H, sy);
      else { const a = spec(j, W, H, sy), b = spec(j + 1, W, H, sy); S = a.map((p, i) => lerp(p, b[i], ease(t))); }
      const iv = motion.intro.v, dim = W < 900 ? 0.92 : 1;
      plates.forEach((el, i) => {
        const p = S[i], ct = Math.max(p.ct, (1 - iv) * 100);
        el.style.width = Math.max(0, p.w) + 'px'; el.style.height = Math.max(0, p.h) + 'px';
        el.style.transform = `translate3d(${p.x}px,${p.y}px,0)`;
        el.style.clipPath = ct > 0.1 ? `inset(${ct}% 0 0 0)` : 'none';
        el.style.opacity = (p.o * dim).toFixed(3);
        ovs[i].style.opacity = p.d.toFixed(3); vls[i].style.opacity = p.v.toFixed(3);
      });
    };
    motion.update = update;

    const st = ScrollTrigger.create({ start: 0, end: 'max', onUpdate: update });
    const onResize = () => { measure(); ScrollTrigger.refresh(); };
    addEventListener('resize', onResize); addEventListener('load', onResize);
    document.fonts?.ready.then(onResize);
    measure();
    const late = setTimeout(measure, 600);
    return () => { st.kill(); clearTimeout(late); removeEventListener('resize', onResize); removeEventListener('load', onResize); motion.update = () => {}; };
  }, []);

  return (
    <div ref={root} aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {ART.map((bg, i) => (
        <div key={i} data-plate className="absolute left-0 top-0 overflow-hidden border border-silver will-change-transform" style={{ background: bg }}>
          <i data-ov className="absolute inset-0 bg-graphite opacity-0" />
          <i data-vl className="absolute inset-0 bg-white opacity-0" />
        </div>
      ))}
    </div>
  );
}
