import SectionLabel from './SectionLabel';
import MaskHeading from './MaskHeading';
import MobileArt from './MobileArt';
import { PILLARS, MATRIX } from '@/lib/data';


export default function Services() {
  return (
    <section id="services" data-screen-label="Services" className="relative mx-auto max-w-[1760px] px-[clamp(20px,3vw,48px)] py-[clamp(60px,8vw,140px)]">
      <SectionLabel>Services</SectionLabel>
      <div className="min-[900px]:max-w-[54%]">
        <MaskHeading className="h-display text-[clamp(44px,8.6vw,150px)]">Four pillars, one build.</MaskHeading>
        <p data-reveal className="mt-7 max-w-[520px] text-[clamp(16px,1.3vw,19px)] leading-[1.6] text-slate">Most products need more than code. These four areas are organised so they can be bought together, which is how they work best, or separately.</p>
      </div>
      <div className="mt-[clamp(40px,5vw,80px)]">
        {PILLARS.map((p, pi) => (
          <article key={p.title} data-pillar className="min-h-[62vh] max-[899px]:min-h-0 border-t border-graphite py-[clamp(40px,5vw,80px)] min-[900px]:max-w-[54%]">
            <MobileArt i={pi + 1} pos={['center','left','right','bottom'][pi]} className="mb-6 !aspect-[16/9]" />
            <p className="label-mono mb-4 flex items-center gap-3"><span className="text-graphite">{String(pi + 1).padStart(2, '0')}</span><span aria-hidden className="h-px w-8 bg-silver" /><span>{String(PILLARS.length).padStart(2, '0')} pillars</span></p>
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
        <h3 className="text-[clamp(26px,3vw,44px)] font-medium leading-none tracking-[-.03em]">Which pillars does your project need?</h3>
        <p className="mt-4 max-w-[560px] text-[15px] leading-relaxed text-slate">Pick the goal closest to yours. Each card shows which teams lead the work and which support it. Most projects use more than one pillar.</p>
        <div className="mt-8 grid gap-4 min-[700px]:max-[899px]:grid-cols-2 min-[1280px]:grid-cols-2">
          {MATRIX.map((m) => {
            const lead = m.lv.map((v, i) => (v === 2 ? PILLARS[i].title : null)).filter(Boolean);
            const support = m.lv.map((v, i) => (v === 1 ? PILLARS[i].title : null)).filter(Boolean);
            return (
              <div key={m.name} className="border border-silver p-6">
                <h4 className="m-0 text-[clamp(20px,1.8vw,26px)] font-medium leading-tight">{m.name}</h4>
                <p className="label-mono mt-5">Leads the work</p>
                <ul className="mt-2 flex flex-wrap gap-2">{lead.map((t) => <li key={t} className="bg-graphite px-3 py-1.5 text-[13px] text-white">{t}</li>)}</ul>
                {support.length > 0 && (<>
                  <p className="label-mono mt-5">Supports</p>
                  <ul className="mt-2 flex flex-wrap gap-2">{support.map((t) => <li key={t} className="border border-silver px-3 py-1.5 text-[13px] text-slate">{t}</li>)}</ul>
                </>)}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
