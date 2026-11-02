import Image from 'next/image';
import Link from 'next/link';
import SectionLabel from './SectionLabel';
import MaskHeading from './MaskHeading';
import { PRINCIPLES, PROJECTS, TEAM } from '@/lib/data';

export default function Studio() {
  return (
    <section id="studio" data-screen-label="Studio" className="relative mx-auto max-w-[1760px] px-[clamp(20px,3vw,48px)] py-[clamp(60px,8vw,140px)] min-h-screen">
      <SectionLabel>Independent people · Shared practice</SectionLabel>
      <div className="min-[900px]:max-w-[54%]">
        <MaskHeading className="h-display text-[clamp(40px,5.6vw,98px)] leading-[1]">Different skills. One team.</MaskHeading>
        <p className="mt-8 max-w-[600px] text-[clamp(17px,1.6vw,23px)] leading-relaxed text-slate">We bring product engineering, applied AI and creative development together to help companies build and improve digital products. Meet the people whose work shapes our practice.</p>
        <div className="mt-10 grid gap-6">
          {PRINCIPLES.map((principle) => <div key={principle} className="border-t border-graphite pt-4"><p className="text-[clamp(20px,1.8vw,28px)] font-medium leading-tight tracking-[-.02em]">{principle}</p></div>)}
        </div>
      </div>
      <div id="people" className="relative mt-[clamp(64px,9vw,140px)] bg-white py-8">
        <SectionLabel>The people</SectionLabel>
        <h2 className="h-display text-[clamp(36px,5vw,80px)]">Meet the team</h2>
        <div className="mt-10 grid gap-x-10 gap-y-14 min-[700px]:grid-cols-2 min-[1200px]:grid-cols-3">
          {TEAM.map((person, index) => (
            <article id={person.id} key={person.id} className="min-w-0 scroll-mt-28">
              <div className="relative aspect-[4/5] overflow-hidden border border-silver bg-soft">
                {person.image ? <Image src={person.image} alt={`Portrait of ${person.name}`} fill sizes="(min-width: 1200px) 31vw, (min-width: 700px) 46vw, 94vw" className="object-cover" /> : <div aria-hidden className="flex h-full items-end bg-graphite p-8 font-display text-[clamp(90px,12vw,180px)] font-semibold leading-none tracking-tightest text-white">{person.name.split(' ').map((name) => name[0]).join('')}</div>}
              </div>
              <p className="label-mono mt-5">0{index + 1} / {person.role}</p>
              <h3 className="mt-3 font-display text-[clamp(28px,2.8vw,44px)] font-semibold leading-tight tracking-tightest">{person.name}</h3>
              <p className="mt-4 text-base leading-relaxed text-slate">{person.bio}</p>
              <ul aria-label={`${person.name}’s specialisms`} className="mt-5 flex flex-wrap gap-2">
                {person.skills.map((skill) => <li key={skill} className="border border-silver px-2.5 py-1.5 text-xs text-slate">{skill}</li>)}
              </ul>
              <div className="mt-6 border-t border-silver pt-4">
                <p className="label-mono mb-3">Selected contributions</p>
                <ul className="space-y-2 text-sm">
                  {PROJECTS.filter((project) => project.credits.some((credit) => credit.memberId === person.id)).map((project) => <li key={project.id}><Link href={`/work#${project.id}`} className="underline decoration-silver underline-offset-4 hover:decoration-graphite">{project.title} ↗</Link></li>)}
                </ul>
              </div>
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-sm">
                <a href={person.portfolio} target="_blank" rel="noopener noreferrer" aria-label={`${person.name}’s portfolio`} className="underline underline-offset-4">Portfolio ↗</a>
                <a href={person.github} target="_blank" rel="noopener noreferrer" aria-label={`${person.name} on GitHub`} className="underline underline-offset-4">GitHub ↗</a>
                <a href={person.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${person.name} on LinkedIn`} className="underline underline-offset-4">LinkedIn ↗</a>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-graphite pt-8">
          <p className="max-w-[540px] text-xl leading-snug">From the first product conversation to the final build, work with people who understand the whole picture.</p>
          <Link href="/contact" className="btn-dark gap-6">Work with us <span aria-hidden>↗</span></Link>
        </div>
      </div>
    </section>
  );
}
