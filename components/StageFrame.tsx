'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from '@/lib/motion';
import { STAGE_IMAGES } from '@/lib/art';
import type { StagePage } from './Stage';



const cl = (a: number) => Math.min(1, Math.max(0, a));
const ease = (t: number) => t * t * (3 - 2 * t);

/**
 * Persistent stage: one fixed frame showing each project image in full. Page scroll progress (top to bottom)
 * drives a seamless wipe from one image to the next. Fully reversible; phones use the in-flow images instead.
 */
export default function StageFrame({ page }: { page: StagePage }) {
  const frame = useRef<HTMLDivElement>(null);
  const layers = useRef<(HTMLDivElement | null)[]>([]);
  const imgs = useRef<(HTMLDivElement | null)[]>([]);
  const bar = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    motion.reduce = reduce; if (reduce || page !== 'home') motion.intro.v = 1;
    const n = STAGE_IMAGES.length;
    let raf = 0;

    const update = () => {
      raf = 0;
      const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
      const p = cl(scrollY / max);
      const f = p * (n - 1); // 0 … n-1
      const idx = Math.min(n - 2, Math.floor(f));
      const t = reduce ? Math.round(f - idx) : ease(f - idx);
      layers.current.forEach((el, i) => {
        if (!el) return;
        // the current image sits underneath; the next one wipes up over it
        const wipe = i === idx + 1 ? (1 - t) * 100 : i <= idx ? 0 : 100;
        el.style.clipPath = wipe >= 100 ? 'inset(100% 0 0 0)' : wipe <= 0 ? 'none' : `inset(${wipe}% 0 0 0)`;
        el.style.visibility = i > idx + 1 ? 'hidden' : 'visible';
        const inner = imgs.current[i];
        if (inner) inner.style.transform = `scale(${i === idx + 1 ? 1.12 - 0.12 * t : i === idx ? 1 + 0.06 * t : 1})`;
      });
      if (bar.current) bar.current.style.transform = `scaleY(${p})`;
      if (frame.current) {
        frame.current.style.opacity = String(motion.intro.v);
        frame.current.style.transform = `translate3d(0,calc(-50% + ${(0.5 - p) * 40}px),0)`;
      }
    };
    const queue = () => { if (!raf) raf = requestAnimationFrame(update); };
    motion.update = update;
    addEventListener('scroll', queue, { passive: true });
    addEventListener('resize', queue);
    const late = setTimeout(update, 600);
    update();
    return () => { cancelAnimationFrame(raf); clearTimeout(late); removeEventListener('scroll', queue); removeEventListener('resize', queue); motion.update = () => {}; };
  }, [page]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 hidden overflow-hidden min-[900px]:block">
      <div ref={frame} className="absolute right-[clamp(20px,3vw,48px)] top-1/2 flex items-stretch gap-3 opacity-0 will-change-transform">
        <span className="relative block w-px bg-silver"><span ref={bar} className="absolute inset-0 origin-top scale-y-0 bg-graphite" /></span>
        <div className="relative aspect-[4/3] w-[min(42vw,calc(68vh*1.3333))] overflow-hidden border border-silver bg-soft">
          {STAGE_IMAGES.map((src, i) => (
            <div key={src} ref={(el) => { layers.current[i] = el; }} className="absolute inset-0 bg-soft" style={{ clipPath: i === 0 ? 'none' : 'inset(100% 0 0 0)' }}>
              <div ref={(el) => { imgs.current[i] = el; }} className="absolute inset-0 will-change-transform">
                <Image src={src} alt="" fill sizes="42vw" priority={i < 2} className="object-contain" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
