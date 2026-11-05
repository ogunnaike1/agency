'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { NAV, EMAIL } from '@/lib/data';
import CtaButton from './CtaButton';
import { useProjectModal } from './ProjectModal';
import { ArrowUpRight } from './Icon';

export default function Nav() {
  const { open: openProject } = useProjectModal();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const active = NAV.findIndex((n) => n.href === pathname);
  const [scrolled, setScrolled] = useState(false);
  const root = useRef<HTMLElement>(null);
  // load-in: logo, link pill and actions glide down in sequence (the pill also unmasks left to right)
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.15 })
        .from('[data-nav-logo]', { y: -28, opacity: 0, filter: 'blur(6px)', duration: 0.9, clearProps: 'all' })
        .from('[data-nav-pill]', { y: -28, opacity: 0, clipPath: 'inset(0 50% 0 50% round 999px)', duration: 1, clearProps: 'all' }, '-=.6')
        .from('[data-nav-link]', { y: 10, opacity: 0, duration: 0.6, stagger: 0.07, clearProps: 'all' }, '-=.55')
        .from('[data-nav-act]', { y: -28, opacity: 0, duration: 0.8, stagger: 0.1, clearProps: 'all' }, '-=.8');
    }, root);
    return () => ctx.revert();
  }, []);
  const links = useRef<(HTMLAnchorElement | null)[]>([]);
  const [spot, setSpot] = useState({ x: 0, w: 0 });
  useLayoutEffect(() => {
    const place = () => { const e = links.current[active]; if (e) setSpot({ x: e.offsetLeft, w: e.offsetWidth }); };
    place(); addEventListener('resize', place);
    document.fonts?.ready.then(place);
    return () => removeEventListener('resize', place);
  }, [active]);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setScrolled(scrollY > 40);
      });
    };
    addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => { removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const onResize = () => innerWidth >= 900 && setOpen(false);
    addEventListener('keydown', onKey); addEventListener('resize', onResize);
    return () => { document.body.style.overflow = prev; removeEventListener('keydown', onKey); removeEventListener('resize', onResize); };
  }, [open]);

  return (
    <header ref={root} className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div className={`pointer-events-auto grid grid-cols-[1fr_auto_1fr] items-center gap-4 border-b px-[clamp(16px,2.4vw,40px)] transition-[background-color,border-color,padding,box-shadow,backdrop-filter] duration-500 ease-out ${open ? 'border-transparent bg-white/0 py-[10px]' : scrolled ? 'border-stone bg-white/85 py-[10px] shadow-[0_12px_30px_-24px_rgba(34,43,51,.35)] backdrop-blur-[14px] backdrop-saturate-150' : 'border-transparent bg-white/0 py-[clamp(12px,1.6vw,22px)]'}`}>
        <Link href="/" aria-label="Agency Name home" data-nav-logo className="pointer-events-auto flex items-center gap-3 justify-self-start">
          <Image src="/logo-mark.png" alt="" width={42} height={31} priority />
          <span className="text-[15px] uppercase tracking-[.22em]">Agency Name</span>
        </Link>
        <nav data-nav-pill className="pointer-events-auto relative hidden gap-0.5 rounded-full border border-stone bg-white/70 p-[5px] shadow-[0_10px_30px_-18px_rgba(34,43,51,.18),inset_0_1px_0_rgba(255,255,255,.9)] backdrop-blur-[14px] backdrop-saturate-150 min-[900px]:flex" aria-label="Primary">
          {/* spotlight: one pill that glides to the active link */}
          <span aria-hidden className={`absolute bottom-[5px] left-0 top-[5px] rounded-full border border-steel/50 bg-dusty/45 transition-[transform,width,opacity] duration-500 ease-[cubic-bezier(.65,0,.2,1)] ${active >= 0 ? 'opacity-100' : 'opacity-0'}`} style={{ width: spot.w, transform: `translateX(${spot.x}px)` }} />
          {NAV.map((n, i) => (
            <Link key={n.href} data-nav-link ref={(el) => { links.current[i] = el; }} href={n.href} aria-current={active === i ? 'page' : undefined} className={`relative z-10 rounded-full px-[18px] py-[11px] text-[13px] font-medium leading-none transition-colors duration-300 hover:text-steel ${active === i ? 'text-graphite hover:text-graphite' : ''}`}>{n.label}</Link>
          ))}
        </nav>
        <span className="min-[900px]:hidden" />
        <div className="pointer-events-auto flex items-center gap-2.5 justify-self-end">
          <CtaButton onClick={openProject} size="sm" data-nav-act className="hidden min-[900px]:inline-flex">Start a project</CtaButton>
          <button data-nav-act onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Close menu' : 'Open menu'} className="group relative grid h-11 w-11 place-items-center rounded-full border border-stone bg-white/80 backdrop-blur-md transition-colors duration-300 hover:border-steel min-[900px]:hidden">
            <span className="relative block h-3 w-[18px]">
              <span className={`absolute left-0 h-[1.5px] bg-graphite transition-all duration-500 ease-[cubic-bezier(.7,0,.2,1)] ${open ? 'top-1/2 w-full -translate-y-1/2 rotate-45' : 'top-0 w-full'}`} />
              <span className={`absolute left-0 h-[1.5px] bg-graphite transition-all duration-500 ease-[cubic-bezier(.7,0,.2,1)] ${open ? 'top-1/2 w-full -translate-y-1/2 -rotate-45' : 'bottom-0 w-[11px] group-hover:w-full'}`} />
            </span>
          </button>
        </div>
      </div>
      <div id="mobile-menu" aria-hidden={!open} className={`pointer-events-auto fixed inset-0 -z-10 flex flex-col bg-white/95 px-[clamp(20px,5vw,40px)] pb-8 pt-[88px] backdrop-blur-xl transition-[clip-path,visibility] duration-[700ms] ease-[cubic-bezier(.7,0,.2,1)] min-[900px]:hidden ${open ? 'visible [clip-path:inset(0_0_0_0)]' : 'invisible [clip-path:inset(0_0_100%_0)]'}`}>
        <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center">
          {NAV.map((n, i) => (
            <Link key={n.href} href={n.href} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${180 + i * 70}ms` : '0ms' }}
              className={`group flex items-baseline gap-4 border-b border-stone py-[clamp(12px,2.4vh,22px)] transition-all duration-700 ease-out ${open ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}>
              <span className="label-mono w-6 text-[11px]">0{i + 1}</span>
              <span className={`flex-1 font-display text-[clamp(24px,7vw,48px)] font-semibold uppercase leading-none tracking-[-.005em] transition-transform duration-300 group-hover:translate-x-2 ${active === i ? 'text-steel' : ''}`}>{n.label}</span>
              <span className="text-xl text-steel transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"><ArrowUpRight className="h-5 w-5" /></span>
            </Link>
          ))}
        </nav>
        <div style={{ transitionDelay: open ? '560ms' : '0ms' }} className={`mt-8 flex flex-col gap-4 transition-all duration-700 ease-out ${open ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}>
          <CtaButton tabIndex={open ? 0 : -1} onClick={() => { setOpen(false); openProject(); }} className="w-full">Start a project</CtaButton>
          <p className="label-mono flex flex-wrap justify-between gap-2"><span>Software &amp; creative technology studio</span><span>{EMAIL}</span></p>
        </div>
      </div>
    </header>
  );
}
