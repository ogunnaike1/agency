'use client';
import { useState } from 'react';
import { AREAS, TIMES, EMAIL } from '@/lib/data';

const chip = (on: boolean) => `min-h-11 border px-4 text-sm transition-colors ${on ? 'border-graphite bg-graphite text-white' : 'border-stone bg-white hover:bg-soft hover:border-steel'}`;

/** Enquiry form shared by the Contact page and the "Start a project" modal. No backend: it composes a mailto. */
export default function ProjectForm({ className = '', firstFieldRef }: { className?: string; firstFieldRef?: React.Ref<HTMLInputElement> }) {
  const [name, setName] = useState(''), [email, setEmail] = useState(''), [brief, setBrief] = useState('');
  const [areas, setAreas] = useState<string[]>([]), [time, setTime] = useState('');
  const body = `Name: ${name}\nEmail: ${email}\nAreas: ${areas.join(', ') || '—'}\nTimeline: ${time || '—'}\n\n${brief}`;
  const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent('New project enquiry')}&body=${encodeURIComponent(body)}`;
  return (
    <form onSubmit={(e) => e.preventDefault()} className={className}>
      <label className="label-mono block">Name<input ref={firstFieldRef} className="field" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" /></label>
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
  );
}
