import Link from 'next/link';
import SectionLabel from './SectionLabel';
import { INDEX } from '@/lib/data';

export default function HomeIndex() {
  return (
    <section data-screen-label="Index" className="relative mx-auto max-w-[1760px] px-[clamp(20px,3vw,48px)] py-[clamp(40px,6vw,100px)]">
      <SectionLabel>Explore</SectionLabel>
      <div className="border-b border-graphite min-[900px]:max-w-[54%]">
        {INDEX.map((n, i) => (
          <Link key={n.href} href={n.href} data-reveal className="group flex items-baseline gap-4 border-t border-graphite py-[clamp(18px,2.4vw,32px)]">
            <span className="label-mono w-6 text-[11px]">0{i + 1}</span>
            <span className="min-w-0 flex-1">
              <span className="block font-display text-[clamp(30px,4.6vw,76px)] font-semibold uppercase leading-[1] tracking-tightest transition-transform duration-300 group-hover:translate-x-2">{n.label}</span>
              <span className="mt-2 block text-[15px] text-slate">{n.line}</span>
            </span>
            <span className="text-xl text-steel transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
