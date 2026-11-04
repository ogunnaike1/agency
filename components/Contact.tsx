'use client';
import ProjectForm from './ProjectForm';
import SectionLabel from './SectionLabel';
import MaskHeading from './MaskHeading';

export default function Contact() {
  return (
    <section id="contact" data-screen-label="Contact" className="relative mx-auto max-w-[1760px] px-[clamp(20px,3vw,48px)] pb-[clamp(60px,8vw,120px)] pt-[clamp(80px,10vw,180px)]">
      <SectionLabel>Contact</SectionLabel>
      <div className="flex flex-wrap gap-x-[clamp(32px,6vw,112px)] gap-y-12">
        <div className="max-w-[640px] flex-[1_1_340px]">
          <MaskHeading className="h-display text-[clamp(40px,6.4vw,112px)] leading-[1]">Tell us what you are building.</MaskHeading>
          <p data-reveal className="mt-7 max-w-[480px] text-[17px] leading-[1.6] text-slate">Describe the product, the problem or the system you want to improve. Pick the areas involved if you know them; if not, we will work it out with you.</p>
          <div className="mt-12 grid grid-cols-[repeat(2,clamp(32px,4vw,52px))] gap-[5px]">
            {[0, 1, 2, 3].map((i) => <div key={i} data-slot={`c-${i}`} className="aspect-square" />)}
          </div>
        </div>
        <ProjectForm className="flex flex-[1_1_380px] flex-col gap-7 border border-silver bg-white/80 p-[clamp(24px,3vw,44px)] shadow-[0_30px_60px_-40px_rgba(34,43,51,.14)] backdrop-blur-[10px]" />
      </div>
    </section>
  );
}
