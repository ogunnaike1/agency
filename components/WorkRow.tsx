import Image from 'next/image';
import Link from 'next/link';
import { PROJECTS, TEAM, type Project } from '@/lib/data';

export default function WorkRow({ project }: { project: Project }) {
  return (
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
  );
}
