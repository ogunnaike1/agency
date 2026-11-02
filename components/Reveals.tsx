'use client';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** Staggered, reversible rise-in for content blocks as they enter the viewport, on every page and screen size. */
export default function Reveals() {
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      const groups = [
        '[data-reveal]', '[data-pillar] li',
        '#studio [class*="border-t"]', '#contact form > *',
      ];
      const seen = new Set<Element>();
      groups.forEach((sel) => {
        gsap.utils.toArray<HTMLElement>(sel).forEach((el) => {
          if (seen.has(el)) return;
          seen.add(el);
          gsap.fromTo(el, { opacity: 0, y: 28, filter: 'blur(6px)' }, {
            opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out', clearProps: 'filter',
            scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none reverse' },
          });
        });
      });
    });
    return () => ctx.revert();
  }, []);
  return null;
}
