import { MapPin, Briefcase, Clock, GraduationCap } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { site, yearsOfExperience } from "@/lib/site";

const quickFacts = [
  { icon: MapPin, label: "Based in", value: "Hyderabad, India" },
  { icon: Clock, label: "Time zone", value: site.location.timezone },
  { icon: Briefcase, label: "Experience", value: `${yearsOfExperience()}+ years, since 2021` },
];

/** Grouped by what a client hires for — no self-scored percentages. */
const skillGroups = [
  {
    title: "Frontend",
    skills: ["React", "Angular (13–15)", "TypeScript", "JavaScript (ES6+)", "HTML5", "CSS3 / SCSS"],
  },
  {
    title: "UI & styling",
    skills: ["Tailwind CSS", "Angular Material", "Bootstrap", "Responsive design", "Figma to code"],
  },
  {
    title: "State & data",
    skills: ["Redux", "RxJS", "MobX", "REST APIs", "Chart.js"],
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express", "MySQL", "REST API design", "Authentication"],
  },
  {
    title: "Delivery",
    skills: ["Git", "GitLab CI/CD", "GitHub Actions", "Jasmine / Karma"],
  },
];

export const About = () => {
  const body = useScrollAnimation({ threshold: 0.15 });
  const side = useScrollAnimation({ threshold: 0.15 });

  return (
    <section id="about" className="relative py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="05"
          eyebrow="About"
          title={<>A full stack developer who cares about <span className="text-accent">the details.</span></>}
        />

        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div ref={body.ref} className={`reveal ${body.isVisible ? "is-visible" : ""}`}>
            <p className="text-lg leading-relaxed text-foreground sm:text-xl">
              I&apos;m Arun, a full stack developer in Hyderabad, India. Since 2021 I&apos;ve built
              production web applications with React, Angular, and Node.js: SaaS platforms,
              dashboards, e-commerce stores, and company websites.
            </p>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              I work across the whole stack: a Figma file becomes a fast, accessible interface, and
              the data behind it becomes a clean Node.js and Express API on MySQL, both easy for
              the next developer to maintain. I&apos;ve led full stack teams, set up CI/CD
              pipelines, and mentored junior developers on Angular patterns and state management.
            </p>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              I work remotely, communicate clearly in writing, and keep clients updated as
              work progresses, so you always know what&apos;s done and what&apos;s next.
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {skillGroups.map((group) => (
                <div key={group.title}>
                  <h3 className="eyebrow">{group.title}</h3>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {group.skills.map((s) => (
                      <li key={s} className="chip">{s}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div ref={side.ref} className={`reveal space-y-4 ${side.isVisible ? "is-visible" : ""}`}>
            <dl className="space-y-3">
              {quickFacts.map((fact) => (
                <div key={fact.label} className="surface flex items-center gap-4 p-4">
                  <div
                    aria-hidden="true"
                    className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"
                  >
                    <fact.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-muted-foreground">{fact.label}</dt>
                    <dd className="font-display font-semibold text-foreground">{fact.value}</dd>
                  </div>
                </div>
              ))}
            </dl>

            <div id="education" className="surface p-5">
              <div className="flex items-center gap-2 text-primary">
                <GraduationCap aria-hidden="true" className="h-5 w-5" />
                <h3 className="text-xs font-semibold uppercase tracking-wide">Education</h3>
              </div>
              <p className="mt-2 font-display text-base font-bold text-foreground">
                B.Tech, Mechanical Engineering
              </p>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Sasi Institute of Technology &amp; Engineering, Tadepalligudem · Completed 2025
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Completed while working as a developer. The engineering background shows in how
                I break down problems.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
