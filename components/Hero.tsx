'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { motion } from '@/lib/motion';
import CtaButton from './CtaButton';

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('[data-nav]', { opacity: 0, y: -20, duration: 0.8 })
        .from('[data-hero-line]', { yPercent: 110, duration: 1.1, stagger: 0.12 }, '-=.4')
        .from('[data-hero-fade]', { opacity: 0, y: 16, duration: 0.9, stagger: 0.12 }, '-=.7')
        .to(motion.intro, { v: 1, duration: 1.4, ease: 'power2.inOut', onUpdate: () => motion.update() }, '-=1.1');
    });
    const failsafe = setTimeout(() => { motion.intro.v = 1; motion.update(); }, 4500);
    return () => { ctx.revert(); clearTimeout(failsafe); };
  }, []);

  const line = 'block whitespace-nowrap';
  const wrap = 'block overflow-hidden pb-[.16em] pr-[.04em] pt-[.04em]';
  return (
    <section ref={root} id="hero" data-screen-label="Hero" className="relative mx-auto max-w-[1760px] px-[clamp(20px,3vw,48px)] pb-[clamp(60px,8vw,120px)]">
      {/* lines flow top to bottom (never absolutely placed), so they cannot overlap at any viewport */}
      <div className="relative flex min-h-[clamp(560px,min(57vw,84vh),1000px)] flex-col justify-end pt-[clamp(150px,16vw,260px)]">
        <p data-hero-fade className="label-mono absolute left-0 top-[clamp(80px,7vw,110px)] max-w-[220px] leading-normal">Software &amp; creative<br />technology studio</p>
        {/* diff text colour + mix-blend-difference: renders graphite on white, inverts over the plates */}
        <h1 className="pointer-events-none m-0 flex flex-col font-display text-[clamp(40px,10vw,200px)] font-semibold uppercase leading-[.86] tracking-tightest text-diff mix-blend-difference">
          <span className={`${wrap} self-start`}><span data-hero-line className={line}>Engineering,</span></span>
          <span className="my-[.12em] block self-start overflow-hidden pb-[.06em] pl-[clamp(0px,18vw,320px)] text-[.4em] font-medium tracking-[-.03em]"><span data-hero-line className={line}>design and</span></span>
          <span className={`${wrap} self-end`}><span data-hero-line className={line}>intelligence.</span></span>
        </h1>
      </div>
      <div data-hero-fade className="mt-[clamp(24px,3vw,48px)] grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] items-end gap-x-14 gap-y-8 border-t border-graphite pt-7">
        <p className="m-0 max-w-[560px] text-[clamp(17px,1.5vw,21px)] leading-normal">One team for the product, the interface, the data behind it and the security around it. We build web and mobile software from first prototype to production.</p>
        <div className="flex flex-col items-start gap-5">
          <p className="label-mono max-w-[380px] leading-[1.7]">For startups, scale-ups and established teams building or modernising software.</p>
          <div className="flex flex-wrap gap-3">
            <CtaButton href="#contact">Start a project</CtaButton>
            <a href="#capabilities" className="btn-line">See capabilities ↗</a>
          </div>
        </div>
      </div>
    </section>
  );
}
