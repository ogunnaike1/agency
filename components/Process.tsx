'use client';
import { useEffect, useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import SectionLabel from './SectionLabel';
import MaskHeading from './MaskHeading';
import MobileArt from './MobileArt';
import { STAGES, AGREEMENTS } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

export default function Process() {
  const line = useRef<HTMLDivElement>(null), fill = useRef<HTMLDivElement>(null), dot = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: line.current, start: 'top 50%', end: 'bottom 50%',
      onUpdate: (s) => {
        const h = line.current!.offsetHeight * s.progress;
        fill.current!.style.height = h + 'px'; dot.current!.style.top = h + 'px';
        document.querySelectorAll<HTMLElement>('[data-pstage]').forEach((e) => { e.style.opacity = e.getBoundingClientRect().top < innerHeight * 0.55 ? '1' : '.35'; });
      },
    });
    return () => st.kill();
  }, []);
  return (
    <section id="process" data-screen-label="Process" className="relative mx-auto max-w-[1760px] px-[clamp(20px,3vw,48px)] py-[clamp(60px,8vw,140px)]">
      <SectionLabel>Process</SectionLabel>
      <MaskHeading className="h-display text-[clamp(44px,8.6vw,150px)]">How we work</MaskHeading>
      <MobileArt i={3} className="mt-10" />
      <div ref={line} className="relative mt-[clamp(40px,5vw,80px)] pl-[clamp(28px,4vw,56px)] min-[900px]:max-w-[54%]">
        <div className="absolute bottom-0 left-0 top-0 w-px bg-silver" />
        <div ref={fill} className="absolute left-0 top-0 h-0 w-px bg-graphite" />
        <div ref={dot} className="absolute -left-1 top-0 -mt-1 h-[9px] w-[9px] rotate-45 bg-steel ring-1 ring-graphite" />
        {STAGES.map((s) => (
          <div key={s.title} data-pstage className="min-h-[30vh] border-t border-silver py-[clamp(28px,4vw,52px)] opacity-35 transition-opacity">
            <h3 className="h-display mb-4 text-[clamp(30px,4vw,64px)] leading-[.95]">{s.title}</h3>
            <p className="m-0 max-w-[460px] text-base leading-[1.55]">{s.desc}</p>
            <p className="label-mono mt-3.5 leading-normal">Output — {s.out}</p>
          </div>
        ))}
      </div>
      <div className="mt-[clamp(32px,4vw,56px)] flex flex-wrap items-baseline gap-x-8 gap-y-3 border-t border-graphite pt-6 min-[900px]:max-w-[54%]">
        <span className="label-mono">Proposed agreements — to be confirmed</span>
        {AGREEMENTS.map((a) => <span key={a} className="text-[15px]">{a}</span>)}
      </div>
    </section>
  );
}
