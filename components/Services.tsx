import SectionLabel from './SectionLabel';
import MaskHeading from './MaskHeading';
import MobileArt from './MobileArt';
import { PILLARS, MATRIX } from '@/lib/data';

const dot = ['bg-dusty border-dusty', 'bg-white border-graphite', 'bg-steel border-graphite'];

export default function Services() {
  return (
    <section id="services" data-screen-label="Services" className="relative mx-auto max-w-[1760px] px-[clamp(20px,3vw,48px)] py-[clamp(60px,8vw,140px)]">
      <SectionLabel>Services</SectionLabel>
      <div className="min-[900px]:max-w-[54%]">
        <MaskHeading className="h-display text-[clamp(44px,8.6vw,150px)]">Four pillars, one build.</MaskHeading>
        <p data-reveal className="mt-7 max-w-[520px] text-[clamp(16px,1.3vw,19px)] leading-[1.6] text-slate">Most products need more than code. These four areas are organised so they can be bought together, which is how they work best, or separately.</p>
      </div>
      <MobileArt i={1} className="mt-10" />
      <div className="mt-[clamp(40px,5vw,80px)]">
        {PILLARS.map((p, pi) => (
          <article key={p.title} data-pillar className="min-h-[62vh] max-[899px]:min-h-0 border-t border-graphite py-[clamp(40px,5vw,80px)] min-[900px]:max-w-[54%]">
            <MobileArt i={pi + 1} pos={['center','left','right','bottom'][pi]} className="mb-6 !aspect-[16/9]" />
            <h3 className="h-display mb-[clamp(24px,3vw,40px)] text-[clamp(36px,5.4vw,96px)] leading-[1]">{p.title}</h3>
            <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-x-8 p-0">
              {p.items.map((it) => (
                <li key={it.t} className={`flex items-baseline gap-3.5 border-t border-silver py-4 text-base leading-snug transition-[padding] duration-300 hover:pl-2.5 ${it.draft ? 'text-slate' : ''}`}>
                  <span className="h-1.5 w-1.5 flex-none -translate-y-0.5 bg-graphite" />
                  <span className="flex-1">{it.t}</span>
                  {it.draft && <span className="label-mono text-[10px]">Draft</span>}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <div data-reveal className="mt-[clamp(24px,3vw,48px)] border-t border-graphite pt-8 min-[900px]:max-w-[54%]">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h3 className="text-[clamp(26px,3vw,44px)] font-medium leading-none tracking-[-.03em]">How the pillars combine</h3>
          <span className="label-mono">● Lead &nbsp; ○ Support — indicative</span>
        </div>
        <div className="mt-7 overflow-x-auto"><div className="min-w-[560px]">
          <div className="label-mono grid grid-cols-[2fr_repeat(4,1fr)] py-3 leading-snug"><span /><span>Eng.</span><span>Exp.</span><span>Data</span><span>Sec.</span></div>
          {MATRIX.map((m) => (
            <div key={m.name} className="grid grid-cols-[2fr_repeat(4,1fr)] items-center border-t border-silver py-5">
              <span className="text-[clamp(17px,1.6vw,22px)] font-medium leading-tight">{m.name}</span>
              {m.lv.map((v, i) => <span key={i} className={`block h-4 w-4 rounded-full border-[1.5px] ${dot[v]}`} />)}
            </div>
          ))}
        </div></div>
      </div>
    </section>
  );
}
