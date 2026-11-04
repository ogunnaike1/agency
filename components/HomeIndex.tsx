'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionLabel from './SectionLabel';
import { INDEX } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

/**
 * Index rows. Each rule is drawn left to right with the scroll (the dark team card closes into the first one),
 * and the titles slide into place along it, so the list reads as the continuation of that closing edge.
 */
export default function HomeIndex() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.utils.toArray<HTMLElement>('[data-irow]', root.current!).forEach((row) => {
        const trig = { trigger: row, start: 'top 98%', end: 'top 72%', scrub: true };
        gsap.fromTo(row.querySelector('[data-iline]'), { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: trig });
        gsap.fromTo(row.querySelector('[data-ititle]'), { xPercent: 6, opacity: 0.15 }, { xPercent: 0, opacity: 1, ease: 'none', scrollTrigger: trig });
      });
    });
    return () => mm.revert();
  }, []);
  return (
    <section ref={root} data-screen-label="Index" className="relative mx-auto max-w-[1760px] px-[clamp(20px,3vw,48px)] py-[clamp(40px,6vw,100px)]">
      <SectionLabel>Explore</SectionLabel>
      <div className="border-b border-graphite min-[900px]:max-w-[54%]">
        {INDEX.map((n, i) => (
          <Link key={n.href} href={n.href} data-irow className="group relative flex items-baseline gap-4 py-[clamp(18px,2.4vw,32px)]">
            <i data-iline aria-hidden className="absolute left-0 top-0 h-px w-full origin-left bg-graphite" />
            <span className="label-mono w-6 text-[11px]">0{i + 1}</span>
            <span data-ititle className="min-w-0 flex-1">
              <span className="block font-display text-[clamp(30px,4.6vw,76px)] font-semibold uppercase leading-[1] tracking-tightest transition-transform duration-300 group-hover:translate-x-2">{n.label}</span>
              <span className="mt-2 block text-[15px] text-slate">{n.line}</span>
            </span>
            <span className="text-xl text-steel transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
