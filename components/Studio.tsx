import SectionLabel from './SectionLabel';
import MaskHeading from './MaskHeading';
import MobileArt from './MobileArt';
import { PRINCIPLES } from '@/lib/data';

export default function Studio() {
  return (
    <section id="studio" data-screen-label="Studio" className="relative mx-auto max-w-[1760px] px-[clamp(20px,3vw,48px)] py-[clamp(60px,8vw,140px)] min-h-screen">
      <SectionLabel>Studio approach</SectionLabel>
      <div className="min-[900px]:max-w-[54%]">
        <MaskHeading className="h-display text-[clamp(32px,4.8vw,84px)] leading-[.95]">Four disciplines in one team make better software than four vendors passing files.</MaskHeading>
        <MobileArt i={0} pos="right" className="mt-10" />
        <div className="mt-[clamp(40px,5vw,72px)] grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-x-8">
          {PRINCIPLES.map((t) => <div key={t} className="border-t border-graphite pb-2 pt-5"><p className="m-0 text-[clamp(20px,1.8vw,28px)] font-medium leading-[1.15] tracking-[-.02em]">{t}</p></div>)}
        </div>
        <p className="label-mono mt-6">Principles proposed — to be confirmed</p>
      </div>
    </section>
  );
}
