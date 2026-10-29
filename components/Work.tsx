import SectionLabel from './SectionLabel';
import MaskHeading from './MaskHeading';
import { PROJECTS } from '@/lib/data';

export default function Work() {
  return (
    <section id="work" data-screen-label="Work" className="relative mx-auto max-w-[1760px] px-[clamp(20px,3vw,48px)] py-[clamp(60px,8vw,140px)]">
      <SectionLabel>Work</SectionLabel>
      <MaskHeading className="h-display text-[clamp(44px,8.6vw,150px)]">Work and experiments</MaskHeading>
      <div className="mt-[clamp(24px,4vw,64px)]">
        {PROJECTS.map((w) => (
          <article key={w.title} data-wrow className="flex min-h-[78vh] items-center py-[clamp(24px,4vw,56px)]">
            <div className="min-[900px]:max-w-[54%]">
              <p className="label-mono max-w-[420px] border-b border-silver pb-3.5">{w.cat}</p>
              {/* difference blend: title inverts as it crosses the plate */}
              <h3 className="relative my-5 w-max max-w-[92vw] font-display text-[clamp(34px,6.6vw,116px)] font-semibold uppercase leading-[.88] tracking-tightest text-diff mix-blend-difference">{w.title}</h3>
              <p className="max-w-[420px] text-base leading-[1.55] text-slate">{w.desc}</p>
              <span className="label-mono mt-[18px] inline-block border border-silver bg-white/85 px-2.5 py-[7px] text-[10px] text-graphite">{w.status}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
