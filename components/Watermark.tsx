'use client';
import { useEffect, useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';

gsap.registerPlugin(ScrollTrigger);

/** Huge, faint logo that cycles solid → liquid → solid with scroll progress (SVG displacement filter). */
export default function Watermark() {
  const img = useRef<HTMLImageElement>(null);
  const disp = useRef<SVGFEDisplacementMapElement>(null);
  const turb = useRef<SVGFETurbulenceElement>(null);

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // the displacement filter re-renders a screen-sized layer on every scroll frame: far too heavy for phones
    if (matchMedia('(max-width: 899px), (pointer: coarse)').matches) { if (img.current) img.current.style.filter = 'none'; return; }
    const st = ScrollTrigger.create({
      start: 0, end: 'max',
      onUpdate: (s) => {
        const pg = s.progress, w = 0.5 - 0.5 * Math.cos(pg * Math.PI * 2 * 3.5);
        disp.current?.setAttribute('scale', (w * w * 150).toFixed(1));
        turb.current?.setAttribute('baseFrequency', `${(0.005 + pg * 0.004).toFixed(4)} ${(0.008 + w * 0.004).toFixed(4)}`);
        if (img.current) img.current.style.transform = `translate(${-46 + Math.sin(pg * 6) * 3}%,${-48 - pg * 6}%) rotate(${pg * 14 - 4}deg) scale(${1 + w * 0.06})`;
      },
    });
    return () => st.kill();
  }, []);

  return (
    <>
      <svg width="0" height="0" className="absolute" aria-hidden>
        <defs>
          <filter id="liquid" x="-25%" y="-25%" width="150%" height="150%" colorInterpolationFilters="sRGB">
            <feTurbulence ref={turb} type="fractalNoise" baseFrequency="0.006 0.009" numOctaves={2} seed={4} result="n" />
            <feDisplacementMap ref={disp} in="SourceGraphic" in2="n" scale="0" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img ref={img} src="/logo-mark.png" alt="" className="absolute left-1/2 top-1/2 h-auto w-[min(112vw,150vh)] max-w-none opacity-[.055] will-change-transform" style={{ filter: 'url(#liquid)', transform: 'translate(-46%,-48%)' }} />
      </div>
    </>
  );
}
