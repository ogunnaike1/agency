'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionLabel from './SectionLabel';
import MaskHeading from './MaskHeading';
import { TEAM } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

const LIFT = [0, 14, 5]; // desktop vertical offsets (vh) so the row reads as a staggered skyline
const DRIFT = [-6, 4, -2]; // parallax drift per column (% of own height)

/**
 * Dark "people" chapter. An outlined name ticker slides sideways with the scroll; the portraits unmask from the
 * bottom as they arrive, de-saturate to colour, and each column drifts at its own speed. Desktop only for the
 * parallax; phones/reduced-motion get the static layout.
 */
export default function HomeTeam() {
  const root = useRef<HTMLElement>(null);
  const names = TEAM.map((p) => p.name).join('  ·  ');

  useEffect(() => {
    const el = root.current!;
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo('[data-tbg]', { clipPath: 'inset(9% 5% 0% 5% round 28px)' }, { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none', scrollTrigger: { trigger: el, start: 'top 90%', end: 'top 20%', scrub: true } });
      // ticker: two rows travelling in opposite directions
      gsap.fromTo('[data-tick="a"]', { xPercent: 0 }, { xPercent: -28, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } });
      gsap.fromTo('[data-tick="b"]', { xPercent: -28 }, { xPercent: 0, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } });

      gsap.utils.toArray<HTMLElement>('[data-person]', el).forEach((card, i) => {
        const media = card.querySelector<HTMLElement>('[data-pmedia]')!;
        const img = card.querySelector<HTMLElement>('[data-pimg]')!;
        const rest = card.querySelectorAll<HTMLElement>('[data-pfade]');
        const trig = { trigger: card, start: 'top 88%', end: 'top 30%', scrub: true };

        gsap.fromTo(media, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', scrollTrigger: trig });
        gsap.fromTo(img, { scale: 1.35, filter: 'grayscale(1)' }, { scale: 1, filter: 'grayscale(0)', ease: 'none', scrollTrigger: trig });
        gsap.fromTo(rest, { y: 28, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.08,
          scrollTrigger: { trigger: card, start: 'top 62%', toggleActions: 'play none none reverse' },
        });
      });

    });
    // column parallax only where columns sit side by side
    mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.utils.toArray<HTMLElement>('[data-person]', el).forEach((card, i) => {
        gsap.fromTo(card, { yPercent: -DRIFT[i % 3] }, {
          yPercent: DRIFT[i % 3], ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
        });
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} data-screen-label="Team" className="relative overflow-hidden py-[clamp(60px,8vw,140px)] text-white">
      {/* the dark chapter grows out of the page like a card opening to full bleed */}
      <div data-tbg aria-hidden className="absolute inset-0 -z-0 bg-graphite" style={{ clipPath: 'inset(9% 5% 0% 5% round 28px)' }} />
      {/* outlined ticker */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-[clamp(120px,16vw,260px)] select-none font-display text-[clamp(70px,13vw,240px)] font-semibold uppercase leading-[.95] tracking-tightest">
        <div data-tick="a" className="whitespace-nowrap [-webkit-text-stroke:1px_rgba(255,255,255,.16)] text-transparent">{names}  ·  {names}</div>
        <div data-tick="b" className="whitespace-nowrap [-webkit-text-stroke:1px_rgba(255,255,255,.09)] text-transparent">{names}  ·  {names}</div>
      </div>

      <div className="relative mx-auto max-w-[1760px] px-[clamp(20px,3vw,48px)]">
        <SectionLabel>The people</SectionLabel>
        <MaskHeading className="h-display text-[clamp(44px,8.6vw,150px)]">Who you work with</MaskHeading>
        <p data-reveal className="mt-7 max-w-[560px] text-[clamp(16px,1.4vw,21px)] leading-relaxed text-white/65">A small senior team. You talk to the people who design, build and ship the work, not an account layer.</p>

        <div className="mt-[clamp(40px,6vw,100px)] grid gap-14 min-[700px]:grid-cols-3 min-[700px]:gap-[clamp(16px,2.4vw,40px)] min-[900px]:pb-[16vh]">
          {TEAM.map((person, i) => (
            <Link key={person.id} href={`/studio#${person.id}`} data-person className="group block" style={{ ['--lift' as string]: `${LIFT[i % 3]}vh` }}>
              <div className="min-[900px]:[margin-top:var(--lift)]">
                <div data-pmedia className="relative aspect-[4/5] overflow-hidden bg-[#1d2630]">
                  <div data-pimg className="absolute inset-0 will-change-transform">
                    {person.image
                      ? <Image src={person.image} alt={`Portrait of ${person.name}`} fill sizes="(min-width: 700px) 31vw, 94vw" className="object-cover transition-transform duration-700 motion-safe:group-hover:scale-[1.04]" />
                      : <div aria-hidden className="flex h-full items-end bg-gradient-to-br from-[#2a3745] to-[#141b22] p-6 font-display text-[clamp(90px,12vw,200px)] font-semibold leading-none tracking-tightest text-white/90">{person.name.split(' ').map((n) => n[0]).join('')}</div>}
                  </div>
                </div>
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <h3 data-pfade className="m-0 font-display text-[clamp(24px,2.4vw,40px)] font-semibold uppercase leading-none tracking-tightest">{person.name}</h3>
                    <p data-pfade className="label-mono mt-2 !text-steel">{person.role}</p>
                  </div>
                  <span data-pfade aria-hidden className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/40 transition-colors duration-300 group-hover:bg-white group-hover:text-graphite">↗</span>
                </div>
                <p data-pfade className="mt-4 max-w-[420px] text-[15px] leading-relaxed text-white/60 line-clamp-3">{person.bio}</p>
                <ul data-pfade className="mt-4 flex flex-wrap gap-2">
                  {person.skills.slice(0, 3).map((s) => <li key={s} className="border border-white/20 px-3 py-1 font-mono text-[11px] uppercase tracking-[.1em] text-white/70">{s}</li>)}
                </ul>
              </div>
            </Link>
          ))}
        </div>

        <Link href="/studio" className="mt-12 inline-flex items-center gap-6 border border-white px-7 py-4 text-[15px] font-medium transition-colors hover:bg-white hover:text-graphite">Meet the studio <span aria-hidden>↗</span></Link>
      </div>
    </section>
  );
}
