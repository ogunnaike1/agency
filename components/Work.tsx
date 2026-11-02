import Image from 'next/image';
import Link from 'next/link';
import SectionLabel from './SectionLabel';
import MaskHeading from './MaskHeading';
import { PROJECTS, TEAM, WORK_CATEGORIES, type WorkCategory } from '@/lib/data';

export default function Work({ category }: { category?: WorkCategory }) {
  const projects = category ? PROJECTS.filter((project) => project.categories.includes(category)) : PROJECTS;
  const filters = [{ id: 'all', label: 'All work' }, ...WORK_CATEGORIES];
  return (
    <section id="work" data-screen-label="Work" className="relative mx-auto max-w-[1760px] bg-white px-[clamp(20px,3vw,48px)] py-[clamp(60px,8vw,140px)]">
      <SectionLabel>Selected work · {String(PROJECTS.length).padStart(2, '0')} projects</SectionLabel>
      <MaskHeading className="h-display text-[clamp(44px,8.6vw,150px)]">Built by our people</MaskHeading>
      <p className="mt-7 max-w-[650px] text-[clamp(17px,1.6vw,23px)] leading-relaxed text-slate">A selection from our members’ portfolios, spanning software, AI and creative technology. Each project credits the people and contributions behind it, including work completed before the agency.</p>
      <nav id="projects" aria-label="Work categories" className="mt-10 flex scroll-mt-28 flex-wrap gap-2">
        {filters.map((filter) => {
          const active = filter.id === (category ?? 'all');
          const count = filter.id === 'all' ? PROJECTS.length : PROJECTS.filter((project) => project.categories.includes(filter.id as WorkCategory)).length;
          return (
            <Link key={filter.id} href={filter.id === 'all' ? '/work#projects' : `/work?category=${filter.id}#projects`} aria-current={active ? 'page' : undefined} className={`inline-flex items-center gap-3 border px-4 py-3 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-graphite ${active ? 'border-graphite bg-graphite text-white' : 'border-silver bg-white text-graphite hover:border-graphite hover:bg-soft'}`}>
              {filter.label}<span className={active ? 'text-white/70' : 'text-slate'}>{String(count).padStart(2, '0')}</span>
            </Link>
          );
        })}
      </nav>
      <div id="project-results" className="mt-8">
        <p role="status" className="label-mono mb-5">{projects.length} {projects.length === 1 ? 'project' : 'projects'} / {category ? WORK_CATEGORIES.find((filter) => filter.id === category)?.label : 'All work'}</p>
      <div className="border-t border-graphite">
        {projects.map((project) => (
          <article id={project.id} key={project.id} data-wrow className="grid scroll-mt-28 items-center gap-8 border-b border-silver py-[clamp(32px,5vw,72px)] min-[900px]:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] min-[900px]:gap-[clamp(32px,5vw,90px)]">
            <div className="min-w-0">
              <p className="label-mono">{String(PROJECTS.indexOf(project) + 1).padStart(2, '0')} / {project.cat}</p>
              <h3 className="my-5 font-display text-[clamp(32px,4.4vw,76px)] font-semibold uppercase leading-[.95] tracking-tightest [overflow-wrap:anywhere]">{project.title}</h3>
              <p className="max-w-[540px] text-base leading-relaxed text-slate">{project.desc}</p>
              <ul aria-label="Skills and technologies" className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => <li key={tag} className="border border-silver px-2.5 py-1.5 text-xs text-slate">{tag}</li>)}
              </ul>
              <div className="mt-7 border-t border-silver pt-4">
                <p className="label-mono mb-3">Contributions</p>
                {project.credits.map((credit) => {
                  const member = TEAM.find((person) => person.id === credit.memberId)!;
                  return (
                    <div key={credit.memberId} className="mt-3 text-sm leading-relaxed">
                      <Link href={`/studio#${member.id}`} className="font-medium underline decoration-silver underline-offset-4 hover:decoration-graphite">{member.name}</Link>
                      <p className="text-slate">{credit.contribution}</p>
                      <a href={credit.source} target="_blank" rel="noopener noreferrer" className="text-xs underline decoration-silver underline-offset-4 hover:decoration-graphite" aria-label={`View ${member.name}’s portfolio account of ${project.title}`}>Portfolio details ↗</a>
                    </div>
                  );
                })}
              </div>
              <a href={project.href} target="_blank" rel="noopener noreferrer" className="btn-line mt-6 gap-6">{project.linkLabel}<span aria-hidden>↗</span></a>
            </div>
            <figure className="min-w-0 max-[899px]:row-start-1">
              <a href={project.href} target="_blank" rel="noopener noreferrer" className="group relative block aspect-[4/3] overflow-hidden border border-silver bg-soft" aria-label={`${project.linkLabel}: ${project.title}`}>
                <Image src={project.image} alt={project.imageAlt} fill sizes="(min-width: 1760px) 830px, (min-width: 900px) 51vw, 94vw" className="object-cover object-top transition-transform duration-500 motion-safe:group-hover:scale-[1.025]" />
              </a>
              <figcaption className="label-mono mt-3 text-[10px]">{project.status}</figcaption>
            </figure>
          </article>
        ))}
      </div>
      </div>
      <div className="mt-12 flex flex-wrap items-center justify-between gap-6">
        <p className="max-w-[480px] text-xl leading-snug">Have a similar challenge? Let’s bring the right people together for it.</p>
        <Link href="/contact" className="btn-dark gap-6">Discuss your project <span aria-hidden>↗</span></Link>
      </div>
    </section>
  );
}
