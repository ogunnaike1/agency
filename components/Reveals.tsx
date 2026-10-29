'use client';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** Phones only: staggered, reversible rise-in for content blocks as they enter the viewport. */
export default function Reveals() {
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const mm = gsap.matchMedia();
    mm.add('(max-width: 899px)', () => {
      const groups = [
        '[data-pillar] li', '[data-wrow] > div > *:not(h3)',
        '#studio [class*="border-t"]', '#contact form > *', 'footer nav a',
      ];
      groups.forEach((sel) => {
        gsap.utils.toArray<HTMLElement>(sel).forEach((el) => {
          gsap.fromTo(el, { opacity: 0, y: 28, filter: 'blur(6px)' }, {
            opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none reverse' },
          });
        });
      });
    });
    return () => mm.revert();
  }, []);
  return null;
}
