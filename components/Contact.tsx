'use client';
import { useState } from 'react';
import SectionLabel from './SectionLabel';
import MaskHeading from './MaskHeading';
import { AREAS, TIMES, EMAIL } from '@/lib/data';

const chip = (on: boolean) => `min-h-11 border px-4 text-sm transition-colors ${on ? 'border-graphite bg-graphite text-white' : 'border-stone bg-white hover:bg-soft hover:border-steel'}`;

export default function Contact() {
  const [name, setName] = useState(''), [email, setEmail] = useState(''), [brief, setBrief] = useState('');
  const [areas, setAreas] = useState<string[]>([]), [time, setTime] = useState('');
  const body = `Name: ${name}\nEmail: ${email}\nAreas: ${areas.join(', ') || '—'}\nTimeline: ${time || '—'}\n\n${brief}`;
  const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent('New project enquiry')}&body=${encodeURIComponent(body)}`; // no backend: honest mailto
  return (
    <section id="contact" data-screen-label="Contact" className="relative mx-auto max-w-[1760px] px-[clamp(20px,3vw,48px)] pb-[clamp(60px,8vw,120px)] pt-[clamp(80px,10vw,180px)]">
      <SectionLabel>Contact</SectionLabel>
      <div className="flex flex-wrap gap-x-[clamp(32px,6vw,112px)] gap-y-12">
        <div className="max-w-[640px] flex-[1_1_340px]">
          <MaskHeading className="h-display text-[clamp(40px,6.4vw,112px)] leading-[.9]">Tell us what you are building.</MaskHeading>
          <p data-reveal className="mt-7 max-w-[480px] text-[17px] leading-[1.6] text-slate">Describe the product, the problem or the system you want to improve. Pick the areas involved if you know them; if not, we will work it out with you.</p>
          <div className="mt-12 grid grid-cols-[repeat(2,clamp(32px,4vw,52px))] gap-[5px]">
            {[0, 1, 2, 3].map((i) => <div key={i} data-slot={`c-${i}`} className="aspect-square" />)}
          </div>
        </div>
        <form onSubmit={(e) => e.preventDefault()} className="flex flex-[1_1_380px] flex-col gap-7 border border-silver bg-white/80 p-[clamp(24px,3vw,44px)] shadow-[0_30px_60px_-40px_rgba(34,43,51,.14)] backdrop-blur-[10px]">
          <label className="label-mono block">Name<input className="field" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" /></label>
          <label className="label-mono block">Email<input className="field" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" /></label>
          <fieldset className="m-0 border-0 p-0"><legend className="label-mono mb-3 p-0">Areas involved</legend>
            <div className="flex flex-wrap gap-2">{AREAS.map((a) => <button type="button" key={a} aria-pressed={areas.includes(a)} onClick={() => setAreas((s) => (s.includes(a) ? s.filter((x) => x !== a) : [...s, a]))} className={chip(areas.includes(a))}>{a}</button>)}</div></fieldset>
          <fieldset className="m-0 border-0 p-0"><legend className="label-mono mb-3 p-0">Timeline</legend>
            <div className="flex flex-wrap gap-2">{TIMES.map((a) => <button type="button" key={a} aria-pressed={time === a} onClick={() => setTime(a)} className={chip(time === a)}>{a}</button>)}</div></fieldset>
          <label className="label-mono block">Project brief<textarea className="field resize-y leading-normal" rows={4} value={brief} onChange={(e) => setBrief(e.target.value)} /></label>
          <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-3">
            <a href={mailto} className="btn-dark">Compose email</a>
            <span className="text-xs text-slate">Opens your email app · to {EMAIL} (placeholder)</span>
          </div>
        </form>
      </div>
    </section>
  );
}
