'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionLabel from './SectionLabel';
import MaskHeading from './MaskHeading';
import { PROJECTS } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

const FEATURED = ['eldorado-real-estate', 'qwampay', 'leave-your-legacy', 'ennylytics'];
const TOP = 'clamp(72px,10vh,120px)'; // where stacked cards settle under the nav

/**
 * Recent projects as a stack of sticky cards: each card pins, then the next one slides up over it while the
 * covered card scales back and dims. Images reveal from an inset mask and drift (parallax) while in view.
 * Desktop only; phones get a plain vertical list. Reduced motion gets the static layout.
 */
export default function HomeWork() {
  const root = useRef<HTMLElement>(null);
  const items = FEATURED.map((id) => PROJECTS.find((p) => p.id === id)!).filter(Boolean);

  useEffect(() => {
    const el = root.current!;
    const mm = gsap.matchMedia();
    mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
      const cards = gsap.utils.toArray<HTMLElement>('[data-card]', el);
      cards.forEach((card, i) => {
        const media = card.querySelector<HTMLElement>('[data-media]')!;
        const img = card.querySelector<HTMLElement>('[data-img]')!;
        const lines = card.querySelectorAll<HTMLElement>('[data-line]');
        const fade = card.querySelectorAll<HTMLElement>('[data-fade]');
        const num = card.querySelector<HTMLElement>('[data-num]')!;

        // image: mask opens and settles as the card arrives
        gsap.fromTo(media, { clipPath: 'inset(14% 10% 14% 10%)' }, {
          clipPath: 'inset(0% 0% 0% 0%)', ease: 'none',
          scrollTrigger: { trigger: card, start: 'top 95%', end: 'top 35%', scrub: true },
        });
        // image: slow parallax drift for the whole time the card is on screen
        gsap.fromTo(img, { yPercent: -7, scale: 1.18 }, {
          yPercent: 7, scale: 1.05, ease: 'none',
          scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: true },
        });
        // copy: title lines rise out of their masks, small text fades up
        gsap.fromTo(lines, { yPercent: 110 }, {
          yPercent: 0, duration: 0.9, ease: 'power4.out', stagger: 0.08,
          scrollTrigger: { trigger: card, start: 'top 72%', toggleActions: 'play none none reverse' },
        });
        gsap.fromTo(fade, { y: 24, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.07,
          scrollTrigger: { trigger: card, start: 'top 68%', toggleActions: 'play none none reverse' },
        });
        // big index number slides sideways against the scroll
        gsap.fromTo(num, { xPercent: 12 }, {
          xPercent: -12, ease: 'none',
          scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: true },
        });

        // as the next card slides over, this one recedes
        const next = cards[i + 1];
        if (!next) { // the last card recedes as the team chapter arrives
          const inner = card.querySelector<HTMLElement>('[data-inner]')!;
          const shade = card.querySelector<HTMLElement>('[data-shade]')!;
          gsap.timeline({ scrollTrigger: { trigger: el, start: 'bottom 92%', end: 'bottom 30%', scrub: true } })
            .to(inner, { scale: 0.93, ease: 'none' }, 0).to(shade, { opacity: 0.55, ease: 'none' }, 0);
        }
        if (next) {
          const inner = card.querySelector<HTMLElement>('[data-inner]')!;
          const shade = card.querySelector<HTMLElement>('[data-shade]')!;
          const tl = gsap.timeline({
            scrollTrigger: { trigger: next, start: 'top 90%', end: 'top 14%', scrub: true },
          });
          tl.to(inner, { scale: 0.93, ease: 'none' }, 0).to(shade, { opacity: 0.55, ease: 'none' }, 0);
        }
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} data-screen-label="Featured work" className="relative pb-[clamp(60px,8vw,140px)]">
      {/* title card: the hero plate is full-bleed behind this, so the type inverts over it (mix-blend-difference) */}
      <div className="relative z-30 mx-auto flex min-h-[100svh] max-w-[1760px] flex-col justify-end px-[clamp(20px,3vw,48px)] pb-[clamp(40px,6vw,100px)]">
        <div className="text-diff mix-blend-difference">
          <SectionLabel>Selected work</SectionLabel>
          <MaskHeading className="h-display text-[clamp(44px,8.6vw,150px)]">Recent projects</MaskHeading>
        </div>
        <Link href="/work" className="btn-dark mt-8 gap-6 self-start">See all work <span aria-hidden>↗</span></Link>
      </div>

      <div className="relative mx-auto max-w-[1760px] px-[clamp(20px,3vw,48px)]">
        <div>
          {items.map((p, i) => (
            <div
              key={p.id}
              data-card
              className="mb-6 min-[900px]:sticky min-[900px]:mb-[10vh] min-[900px]:h-[min(76vh,720px)]"
              style={{ top: `calc(${TOP} + ${i * 14}px)` }}
            >
              <Link
                href={`/work#${p.id}`}
                data-inner
                className="group relative block h-full overflow-hidden border border-silver bg-white will-change-transform [transform-origin:50%_0] min-[900px]:grid min-[900px]:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
              >
                {/* copy */}
                <div className="relative flex flex-col justify-between gap-10 overflow-hidden p-[clamp(20px,2.6vw,44px)]">
                  <div className="flex items-center justify-between">
                    <span data-fade className="label-mono">{String(i + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</span>
                    <span data-fade className="label-mono">{p.cat}</span>
                  </div>

                  <span data-num aria-hidden className="pointer-events-none absolute -bottom-[0.18em] left-0 select-none font-display text-[clamp(160px,22vw,380px)] font-semibold leading-none tracking-tightest text-soft max-[899px]:hidden">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <div className="relative">
                    <h3 className="m-0 font-display text-[clamp(34px,4.6vw,80px)] font-semibold uppercase leading-[.98] tracking-tightest">
                      <span className="block overflow-hidden pb-[.06em]"><span data-line className="block">{p.title}</span></span>
                    </h3>
                    <p data-fade className="mt-5 max-w-[460px] text-[clamp(15px,1.15vw,18px)] leading-relaxed text-slate line-clamp-4">{p.desc}</p>
                    <ul data-fade className="mt-5 flex flex-wrap gap-2">
                      {p.tags.slice(0, 4).map((t) => <li key={t} className="border border-silver px-3 py-1 font-mono text-[11px] uppercase tracking-[.1em] text-slate">{t}</li>)}
                    </ul>
                    <span data-fade className="mt-8 inline-flex items-center gap-4 text-[15px] font-medium">
                      View project
                      <span aria-hidden className="grid h-10 w-10 place-items-center rounded-full border border-graphite transition-colors duration-300 group-hover:bg-graphite group-hover:text-white">↗</span>
                    </span>
                  </div>
                </div>

                {/* image */}
                <div data-media className="relative aspect-[4/3] overflow-hidden bg-soft min-[900px]:aspect-auto">
                  <div data-img className="absolute inset-0 will-change-transform">
                    <Image src={p.image} alt={p.imageAlt} fill sizes="(min-width: 900px) 58vw, 94vw" priority={i === 0} className="object-cover object-top" />
                  </div>
                </div>

                <i data-shade aria-hidden className="pointer-events-none absolute inset-0 bg-graphite opacity-0" />
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
