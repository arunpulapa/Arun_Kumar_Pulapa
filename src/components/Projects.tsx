import { useState } from "react";
import { ArrowUpRight, Building2, ChevronDown, Lock } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { caseStudies, liveSites, type CaseStudy, type LiveSite } from "@/data/projects";

/** Case studies shown before "Show more". */
const INITIAL_CASE_STUDIES = 3;
/** Live sites shown on phones before "Show all" (larger screens show every one). */
const INITIAL_LIVE_MOBILE = 4;

const Tag = ({ children }: { children: string }) => (
  <span className="rounded-md border border-border bg-muted/40 px-2 py-0.5 text-[0.72rem] font-medium text-muted-foreground">
    {children}
  </span>
);

const hostOf = (url: string) => new URL(url).hostname.replace(/^www\./, "");

const LiveSiteCard = ({ site, mobileHidden }: { site: LiveSite; mobileHidden: boolean }) => (
  <li className={mobileHidden ? "hidden sm:block" : undefined}>
    <a
      href={site.link}
      target="_blank"
      rel="noopener noreferrer"
      className="surface surface-hover group flex h-full flex-col overflow-hidden"
    >
      {/* Browser-frame preview */}
      <div className="border-b border-border bg-muted/50">
        <div className="flex items-center gap-1.5 px-3 py-2" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-foreground/15" />
          <span className="h-2 w-2 rounded-full bg-foreground/15" />
          <span className="h-2 w-2 rounded-full bg-foreground/15" />
          <span className="ml-2 truncate rounded bg-background/80 px-2 py-0.5 text-[0.65rem] text-muted-foreground">
            {hostOf(site.link)}
          </span>
        </div>
        <div className="aspect-[16/10] overflow-hidden bg-background">
          {site.image ? (
            <img
              src={site.image}
              alt={site.imageAlt ?? `Homepage of ${site.title}`}
              width={960}
              height={600}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
            />
          ) : (
            <div className="flex h-full items-center justify-center font-display text-lg font-bold text-muted-foreground">
              {hostOf(site.link)}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-display text-base font-bold text-foreground">{site.title}</h4>
          <span className="inline-flex flex-shrink-0 items-center gap-1 text-xs font-semibold text-primary">
            Visit <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
        <p className="mt-0.5 text-[0.7rem] font-medium uppercase tracking-wide text-muted-foreground">{site.type}</p>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{site.description}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {site.technologies.map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
        </div>
      </div>
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  </li>
);

const CaseStudyCard = ({ project, hidden }: { project: CaseStudy; hidden: boolean }) => (
  <article className={`surface flex-col p-6 ${hidden ? "hidden" : "flex"}`}>
    <div className="flex items-start justify-between gap-3">
      <h4 className="font-display text-lg font-bold text-foreground">{project.title}</h4>
      {project.link ? (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex flex-shrink-0 items-center gap-1 text-xs font-semibold text-primary"
        >
          Live <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
          <span className="sr-only">(opens {project.title} in a new tab)</span>
        </a>
      ) : (
        <span className="inline-flex flex-shrink-0 items-center gap-1 text-[0.7rem] font-medium text-muted-foreground">
          <Lock aria-hidden="true" className="h-3 w-3" /> Private
        </span>
      )}
    </div>
    <p className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
      <Building2 aria-hidden="true" className="h-3.5 w-3.5" />
      {project.company}
    </p>

    <dl className="mt-4 space-y-3 text-sm leading-relaxed">
      <div>
        <dt className="text-[0.7rem] font-semibold uppercase tracking-wide text-foreground">The need</dt>
        <dd className="mt-0.5 text-muted-foreground">{project.problem}</dd>
      </div>
      <div>
        <dt className="text-[0.7rem] font-semibold uppercase tracking-wide text-foreground">My role</dt>
        <dd className="mt-0.5 text-muted-foreground">{project.contribution}</dd>
      </div>
      <div>
        <dt className="text-[0.7rem] font-semibold uppercase tracking-wide text-foreground">Delivered</dt>
        <dd className="mt-1">
          <ul className="space-y-1 text-muted-foreground">
            {project.features.map((f) => (
              <li key={f} className="flex gap-2">
                <span aria-hidden="true" className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-primary" />
                {f}
              </li>
            ))}
          </ul>
        </dd>
      </div>
    </dl>

    <div className="mt-5 flex flex-wrap gap-1.5 border-t border-border pt-4">
      {project.technologies.map((tech) => (
        <Tag key={tech}>{tech}</Tag>
      ))}
    </div>
  </article>
);

export const Projects = () => {
  const [showAll, setShowAll] = useState(false);
  const [showAllLive, setShowAllLive] = useState(false);
  const live = useScrollAnimation({ threshold: 0.05 });
  const cases = useScrollAnimation({ threshold: 0.05 });
  const hiddenCount = caseStudies.length - INITIAL_CASE_STUDIES;

  return (
    <section id="projects" className="relative py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="02"
          eyebrow="Selected work"
          title={<>Products and sites <span className="text-accent">I&apos;ve built.</span></>}
          description="Live websites you can click through, plus SaaS and dashboard work described without confidential details."
        />

        <div className="flex items-center gap-4">
          <h3 className="eyebrow flex-shrink-0">Live projects</h3>
          <span aria-hidden="true" className="h-px flex-1 bg-border" />
        </div>
        <ul
          id="live-projects"
          ref={live.ref as never}
          className={`reveal mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 ${live.isVisible ? "is-visible" : ""}`}
        >
          {liveSites.map((s, i) => (
            <LiveSiteCard key={s.title} site={s} mobileHidden={!showAllLive && i >= INITIAL_LIVE_MOBILE} />
          ))}
        </ul>
        {!showAllLive && liveSites.length > INITIAL_LIVE_MOBILE && (
          <div className="mt-6 flex justify-center sm:hidden">
            <button
              type="button"
              onClick={() => setShowAllLive(true)}
              aria-expanded={false}
              aria-controls="live-projects"
              className="btn-ghost inline-flex h-11 items-center gap-2 rounded-full px-6 text-sm font-semibold"
            >
              Show all {liveSites.length} live projects
              <ChevronDown aria-hidden="true" className="h-4 w-4" />
            </button>
          </div>
        )}

        <div className="mt-16 flex items-center gap-4">
          <h3 className="eyebrow flex-shrink-0">Product case studies</h3>
          <span aria-hidden="true" className="h-px flex-1 bg-border" />
        </div>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Internal and client-owned products, so there are no public links or screenshots.
        </p>
        <div
          id="case-studies"
          ref={cases.ref}
          className={`reveal mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 ${cases.isVisible ? "is-visible" : ""}`}
        >
          {caseStudies.map((project, i) => (
            <CaseStudyCard
              key={project.title}
              project={project}
              hidden={!showAll && i >= INITIAL_CASE_STUDIES}
            />
          ))}
        </div>
        {hiddenCount > 0 && (
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              aria-expanded={showAll}
              aria-controls="case-studies"
              className="btn-ghost inline-flex h-11 items-center gap-2 rounded-full px-6 text-sm font-semibold"
            >
              {showAll ? "Show fewer case studies" : `Show ${hiddenCount} more case studies`}
              <ChevronDown
                aria-hidden="true"
                className={`h-4 w-4 transition-transform ${showAll ? "rotate-180" : ""}`}
              />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
