import Link from 'next/link';
import SectionLabel from './SectionLabel';
import MaskHeading from './MaskHeading';
import WorkRow from './WorkRow';
import WorkSection from './WorkSection';
import { PROJECTS, WORK_CATEGORIES } from '@/lib/data';

export default function Work() {
  // each project is listed once, under its primary (first) category
  const groups = WORK_CATEGORIES.map((c) => ({ ...c, items: PROJECTS.filter((p) => p.categories[0] === c.id) })).filter((g) => g.items.length);
  return (
    <section id="work" data-screen-label="Work" className="relative mx-auto max-w-[1760px] bg-white px-[clamp(20px,3vw,48px)] py-[clamp(60px,8vw,140px)]">
      <SectionLabel>Selected work · {String(PROJECTS.length).padStart(2, '0')} projects</SectionLabel>
      <MaskHeading className="h-display text-[clamp(44px,8.6vw,150px)]">Built by our people</MaskHeading>
      <p className="mt-7 max-w-[650px] text-[clamp(17px,1.6vw,23px)] leading-relaxed text-slate">A selection from our members’ portfolios, spanning software, AI and creative technology. Each project credits the people and contributions behind it, including work completed before the agency.</p>
      <nav aria-label="Work categories" className="mt-10 flex flex-wrap gap-2">
        {groups.map((g) => (
          <a key={g.id} href={`#${g.id}`} className="inline-flex items-center gap-3 border border-silver px-4 py-3 text-sm transition-colors hover:border-graphite hover:bg-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-graphite">
            {g.label}<span className="text-slate">{String(g.items.length).padStart(2, '0')}</span>
          </a>
        ))}
      </nav>
      <div className="mt-8">
        {groups.map((g, gi) => (
          <WorkSection key={g.id} id={g.id} index={gi} label={g.label}>
            {g.items.map((p) => <WorkRow key={p.id} project={p} />)}
          </WorkSection>
        ))}
      </div>
      <div className="mt-12 flex flex-wrap items-center justify-between gap-6">
        <p className="max-w-[480px] text-xl leading-snug">Have a similar challenge? Let’s bring the right people together for it.</p>
        <Link href="/contact" className="btn-dark gap-6">Discuss your project <span aria-hidden>↗</span></Link>
      </div>
    </section>
  );
}
