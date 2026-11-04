'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

/** Closing wordmark: letters rise out of the mask in sequence while the footer scrolls in, then settle. Reversible. */
export default function FooterWordmark({ children }: { children: string }) {
  const el = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let ctx: gsap.Context | undefined, dead = false;
    (document.fonts?.ready ?? Promise.resolve()).then(() => {
      if (dead || !el.current) return;
      ctx = gsap.context(() => {
        const sp = SplitText.create(el.current!, { type: 'chars' });
        gsap.fromTo(sp.chars, { yPercent: 118, rotate: 5 }, {
          yPercent: 0, rotate: 0, ease: 'none', stagger: 0.05,
          scrollTrigger: { trigger: el.current!.parentElement, start: 'top 98%', end: 'bottom 88%', scrub: true },
        });
      });
    });
    return () => { dead = true; ctx?.revert(); };
  }, []);
  return (
    <div aria-hidden className="mt-[clamp(40px,6vw,96px)] overflow-hidden whitespace-nowrap pb-[.14em] font-display text-[11.6vw] font-semibold uppercase leading-[1.05] tracking-[-.01em]">
      <span ref={el} className="block">{children}</span>
    </div>
  );
}
