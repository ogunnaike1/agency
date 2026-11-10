import Image from 'next/image';
import Link from 'next/link';
import { NAV, EMAIL, PILLARS } from '@/lib/data';
import CtaButton from './CtaButton';

export default function Footer() {
  return (
    <footer data-screen-label="Footer" className="relative border-t border-silver bg-white">
      <div className="mx-auto max-w-[1760px] px-[clamp(20px,3vw,48px)] pb-8 pt-[clamp(48px,6vw,96px)]">
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-8 border-b border-silver pb-[clamp(32px,4vw,64px)]">
          <h2 className="m-0 max-w-[900px] font-display text-[clamp(34px,5.2vw,88px)] font-semibold uppercase leading-[.95] tracking-tightest">Have something in mind? Let’s build it.</h2>
          <div className="flex flex-col items-start gap-4">
            <CtaButton href="/contact">Start a project</CtaButton>
            <a href={`mailto:${EMAIL}`} className="text-[15px] text-slate underline-offset-4 hover:text-graphite hover:underline">{EMAIL}</a>
          </div>
        </div>
        <div className="grid gap-x-12 gap-y-10 pt-[clamp(32px,4vw,64px)] min-[700px]:grid-cols-2 min-[1100px]:grid-cols-[1.4fr_.7fr_1.3fr]">
          <div className="max-w-[360px]">
            <div className="flex items-center gap-4">
              <div className="relative h-[44px] w-[44px] flex-none">
                <Image src="/logo-mark.svg" alt="" width={44} height={44} />
                {/* the home page's four plates land on these slots, then dissolve into the logo */}
                <div aria-hidden className="absolute inset-[4px] grid grid-cols-2 gap-[2px]">{[0, 1, 2, 3].map((i) => <div key={i} data-slot={`f-${i}`} />)}</div>
              </div>
              <span className="text-lg uppercase tracking-[.24em]">Reforge</span>
            </div>
            <p className="mt-5 text-[15px] leading-[1.55] text-slate">A software and creative technology studio: engineering, design, data and security in one team.</p>
          </div>
          <nav data-reveal className="flex flex-col gap-1.5" aria-label="Footer">
            <span className="label-mono mb-2 !text-steel">Explore</span>
            {NAV.map((n) => <Link key={n.href} href={n.href} className="py-1 text-base hover:text-steel">{n.label}</Link>)}
          </nav>
          <div className="flex flex-col gap-1.5">
            <span className="label-mono mb-2 !text-steel">What we do</span>
            {PILLARS.map((p) => <Link key={p.title} href="/services" className="py-1 text-base hover:text-steel">{p.title}</Link>)}
          </div>
        </div>
        <div className="mt-[clamp(24px,3vw,40px)] flex flex-wrap justify-between gap-2 border-t border-silver pt-5 text-[13px] text-slate"><span>Copyright © 2026 Reforge.</span><span>{EMAIL} — placeholder</span></div>
      </div>
    </footer>
  );
}
