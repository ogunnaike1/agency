'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

/** Scrubbed per-character rise inside an overflow mask. Reverses on scroll up. */
export default function MaskHeading({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const el = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let ctx: gsap.Context | undefined;
    let cancelled = false;
    (document.fonts?.ready ?? Promise.resolve()).then(() => {
      if (cancelled || !el.current) return;
      ctx = gsap.context(() => {
        const sp = SplitText.create(el.current!, { type: 'words,chars', wordsClass: 'inline-block whitespace-nowrap' });
        gsap.fromTo(sp.chars, { yPercent: 115, rotate: 6 }, {
          yPercent: 0, rotate: 0, ease: 'none', stagger: 0.03,
          scrollTrigger: { trigger: el.current!.parentElement, start: 'top 92%', end: 'top 55%', scrub: true },
        });
      });
    });
    return () => { cancelled = true; ctx?.revert(); };
  }, []);
  return (
    <h2 className={className}>
      <span className="block overflow-hidden pb-[.08em]">
        <span ref={el} className="block">{children}</span>
      </span>
    </h2>
  );
}
