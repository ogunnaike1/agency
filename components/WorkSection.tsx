'use client';
import { Children, useState } from 'react';
import { ArrowDown, ArrowUp } from './Icon';

const LIMIT = 5;

/** One category: shows the first five projects, the rest sit behind "See more". */
export default function WorkSection({ id, index, label, children }: { id: string; index: number; label: string; children: React.ReactNode }) {
  const rows = Children.toArray(children);
  const [open, setOpen] = useState(false);
  const hidden = rows.length - LIMIT;
  const shown = open || hidden <= 0 ? rows : rows.slice(0, LIMIT);
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-28 py-[clamp(28px,4vw,56px)]">
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 border-b border-graphite pb-5">
        <span className="label-mono">{String(index + 1).padStart(2, '0')}</span>
        <h2 id={`${id}-title`} className="m-0 font-display text-[clamp(28px,3.6vw,56px)] font-semibold uppercase leading-none tracking-tightest">{label}</h2>
        <span className="label-mono ml-auto">{rows.length} {rows.length === 1 ? 'project' : 'projects'}</span>
      </div>
      <div>{shown}</div>
      {hidden > 0 && (
        <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} className="btn-line mt-8 gap-6">
          {open ? 'Show less' : `See more (${hidden})`}{open ? <ArrowUp /> : <ArrowDown />}
        </button>
      )}
    </section>
  );
}
