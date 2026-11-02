import SectionLabel from './SectionLabel';
import MaskHeading from './MaskHeading';
import MobileArt from './MobileArt';
import { PILLARS, PROJECTS } from '@/lib/data';

export default function Work() {
  let n = 0; // running project index, for the in-flow phone images
  return (
    <section id="work" data-screen-label="Work" className="relative mx-auto max-w-[1760px] px-[clamp(20px,3vw,48px)] py-[clamp(60px,8vw,140px)]">
      <SectionLabel>Work</SectionLabel>
      <MaskHeading className="h-display text-[clamp(44px,8.6vw,150px)]">Work and experiments</MaskHeading>
      <div className="mt-[clamp(32px,5vw,80px)]">
        {PILLARS.map((p, pi) => {
          const items = PROJECTS.filter((w) => w.pillar === p.title);
          return (
            <section key={p.title} aria-labelledby={`work-${pi}`} className="border-t border-graphite pt-6 min-[900px]:max-w-[54%]">
              <div data-reveal className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                <span className="label-mono">0{pi + 1}</span>
                <h2 id={`work-${pi}`} className="m-0 text-[clamp(22px,2.4vw,34px)] font-medium leading-none tracking-[-.03em]">{p.title}</h2>
                <span className="label-mono ml-auto">{items.length ? `${items.length} ${items.length === 1 ? 'project' : 'projects'}` : 'None yet'}</span>
              </div>
              {items.length ? items.map((w) => {
                const wi = n++;
                return (
                  <article key={w.title} data-wrow className="flex min-h-[56vh] items-center max-[899px]:min-h-0 py-[clamp(24px,4vw,56px)]">
                    <div className="min-w-0">
                      <MobileArt i={wi + 2} pos={['center','left','right','bottom'][wi % 4]} className="mb-5" />
                      <p className="label-mono max-w-[420px] border-b border-silver pb-3.5">{w.cat}</p>
                      {/* difference blend: title inverts as it crosses the plate */}
                      <h3 className="relative my-5 w-max max-w-[92vw] max-[899px]:w-auto max-[899px]:max-w-full max-[899px]:[overflow-wrap:anywhere] font-display text-[clamp(34px,6.6vw,116px)] font-semibold uppercase leading-[.88] tracking-tightest text-diff mix-blend-difference">{w.title}</h3>
                      <p className="max-w-[420px] text-base leading-[1.55] text-slate">{w.desc}</p>
                      <span className="label-mono mt-[18px] inline-block border border-silver bg-white/85 px-2.5 py-[7px] text-[10px] text-graphite">{w.status}</span>
                    </div>
                  </article>
                );
              }) : (
                <p data-reveal className="m-0 py-[clamp(28px,4vw,56px)] text-base leading-[1.55] text-slate">Projects to be added.</p>
              )}
            </section>
          );
        })}
      </div>
    </section>
  );
}
