'use client';
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Image from 'next/image';
import ProjectForm from './ProjectForm';

const Ctx = createContext<{ open: () => void }>({ open: () => {} });
export const useProjectModal = () => useContext(Ctx);

/** Provider + dialog for "Start a project". Esc / backdrop / close button dismiss; focus is trapped and restored. */
export default function ProjectModalProvider({ children }: { children: React.ReactNode }) {
  const [shown, setShown] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const back = useRef<HTMLDivElement>(null);
  const first = useRef<HTMLInputElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const closing = useRef(false);

  const open = useCallback(() => { opener.current = document.activeElement as HTMLElement; closing.current = false; setShown(true); }, []);
  const close = useCallback(() => {
    if (closing.current) return; closing.current = true;
    const done = () => { setShown(false); opener.current?.focus?.(); };
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || !panel.current) return done();
    gsap.timeline({ onComplete: done })
      .to(panel.current, { y: 40, opacity: 0, duration: 0.3, ease: 'power2.in' })
      .to(back.current, { opacity: 0, duration: 0.25 }, 0.05);
  }, []);

  useEffect(() => {
    if (!shown) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduce) {
      gsap.fromTo(back.current, { opacity: 0 }, { opacity: 1, duration: 0.35 });
      gsap.fromTo(panel.current, { y: 60, opacity: 0, clipPath: 'inset(8% 4% 8% 4% round 20px)' }, { y: 0, opacity: 1, clipPath: 'inset(0% 0% 0% 0% round 0px)', duration: 0.7, ease: 'power4.out', clearProps: 'clipPath' });
    }
    const t = setTimeout(() => first.current?.focus(), reduce ? 0 : 350);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { close(); return; }
      if (e.key !== 'Tab' || !panel.current) return;
      const f = Array.from(panel.current.querySelectorAll<HTMLElement>('a[href],button,input,textarea,select,[tabindex]:not([tabindex="-1"])')).filter((x) => !x.hasAttribute('disabled'));
      if (!f.length) return;
      const a = f[0], z = f[f.length - 1];
      if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
      else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
    };
    addEventListener('keydown', onKey);
    return () => { clearTimeout(t); removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [shown, close]);

  return (
    <Ctx.Provider value={{ open }}>
      {children}
      {shown && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center min-[700px]:items-center" role="presentation">
          <div ref={back} onClick={close} aria-hidden className="absolute inset-0 bg-graphite/60 backdrop-blur-sm" />
          <div ref={panel} data-lenis-prevent role="dialog" aria-modal="true" aria-labelledby="pm-title" className="relative max-h-[92svh] w-full max-w-[720px] overflow-y-auto overscroll-contain border border-silver bg-white p-[clamp(22px,3vw,44px)] shadow-[0_40px_80px_-30px_rgba(34,43,51,.45)] max-[699px]:rounded-t-[20px] min-[700px]:m-6">
            <div className="flex items-start justify-between gap-6">
              <div>
                <div className="flex items-center gap-3"><Image src="/logo-mark.svg" alt="Reforge" width={36} height={36} /><p className="label-mono">Reforge · Start a project</p></div>
                <h2 id="pm-title" className="h-display mt-3 text-[clamp(30px,4vw,56px)]">Tell us what you are building.</h2>
              </div>
              <button type="button" onClick={close} aria-label="Close" className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-graphite text-xl leading-none transition-colors hover:bg-graphite hover:text-white">×</button>
            </div>
            <ProjectForm firstFieldRef={first} className="mt-8 flex flex-col gap-7" />
          </div>
        </div>
      )}
    </Ctx.Provider>
  );
}
