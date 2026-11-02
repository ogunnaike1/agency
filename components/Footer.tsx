import Link from 'next/link';
import { NAV, EMAIL } from '@/lib/data';

export default function Footer() {
  return (
    <footer data-screen-label="Footer" className="relative border-t border-silver bg-white">
      <div className="mx-auto max-w-[1760px] px-[clamp(20px,3vw,48px)] pb-8 pt-[clamp(48px,6vw,96px)]">
        <div className="flex flex-wrap justify-between gap-x-20 gap-y-10">
          <div className="max-w-[360px]">
            <div className="flex items-center gap-4">
              <div className="grid grid-cols-[repeat(2,18px)] gap-[3px]">{[0, 1, 2, 3].map((i) => <div key={i} data-slot={`f-${i}`} className="h-[18px] w-[18px]" />)}</div>
              <span className="text-lg uppercase tracking-[.24em]">Agency Name</span>
            </div>
            <p className="mt-5 text-[15px] leading-[1.55] text-slate">A software and creative technology studio: engineering, design, data and security in one team.</p>
          </div>
          <nav data-reveal className="flex flex-col gap-1.5" aria-label="Footer">{NAV.map((n) => <Link key={n.href} href={n.href} className="py-1.5 text-base">{n.label}</Link>)}</nav>
          <a href="#top" className="self-end border border-silver px-[22px] py-3.5 text-sm font-medium hover:border-graphite">Back to top ↑</a>
        </div>
        <div aria-hidden className="mt-[clamp(40px,6vw,96px)] overflow-hidden whitespace-nowrap pb-[.14em] font-display text-[11.6vw] font-semibold uppercase leading-[1.05] tracking-[-.05em]">Agency Name</div>
        <div className="mt-[clamp(24px,3vw,40px)] flex flex-wrap justify-between gap-2 border-t border-silver pt-5 text-[13px] text-slate"><span>Copyright © 2026 Agency Name.</span><span>{EMAIL} — placeholder</span></div>
      </div>
    </footer>
  );
}
