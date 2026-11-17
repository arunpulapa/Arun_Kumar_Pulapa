import { MapPin } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const experiences = [
  {
    title: "Software Engineer",
    company: "Valethi Technologies",
    location: "Hyderabad, India",
    duration: "Jul 2026 — Present",
    type: "Full-time",
    stack: ["Full-Stack", "Angular", "React"],
    responsibilities: [
      "Building and shipping features across the full stack for production web applications.",
      "Collaborating with product and design to translate requirements into reliable interfaces.",
      "Improving application performance, accessibility, and code quality across the codebase.",
      "Participating in code reviews and technical discussions to strengthen team standards.",
    ],
  },
  {
    title: "Full Stack Developer",
    company: "Navsan India",
    location: "Hyderabad, India",
    duration: "Jan 2026 — May 2026",
    type: "Full-time",
    stack: ["Team Lead", "Full-Stack", "Architecture"],
    responsibilities: [
      "Leading a cross-functional engineering team, establishing agile workflows and code-quality standards.",
      "Architecting scalable full-stack applications with seamless frontend–backend integration.",
      "Driving technical decisions, exploring new technologies, and resolving architectural bottlenecks.",
      "Mentoring developers through code reviews, pair programming, and knowledge-sharing.",
    ],
  },
  {
    title: "Senior Software Developer",
    company: "AK NextGen Solutions",
    location: "Hyderabad, India",
    duration: "Oct 2024 — Dec 2025",
    type: "Full-time",
    stack: ["Angular", "Node.js", "CI/CD"],
    responsibilities: [
      "Led frontend development for an HRM SaaS application (attendance, payroll, roles, admin).",
      "Built client platforms including a US tax-filing site and a lead & client management dashboard.",
      "Designed reusable UI components, integrated Node.js APIs, and optimized performance.",
      "Set up Git workflows, CI/CD pipelines, and coordinated a 3-member engineering team.",
    ],
  },
  {
    title: "Software Developer",
    company: "ADQ Services",
    location: "Hyderabad, India",
    duration: "Sep 2023 — Sep 2024",
    type: "Full-time",
    stack: ["React", "Angular", "Mentoring"],
    responsibilities: [
      "Led development of multiple high-quality digital products.",
      "Architected scalable & maintainable applications.",
      "Collaborated with cross-functional teams to deliver solutions.",
      "Mentored junior developers and performed code reviews.",
    ],
  },
  {
    title: "Associate Software Developer",
    company: "ADQ Services",
    location: "Hyderabad, India",
    duration: "Sep 2021 — Sep 2023",
    type: "Full-time",
    stack: ["React", "React Native", "REST APIs"],
    responsibilities: [
      "Built and maintained responsive web apps using Angular & React.",
      "Developed cross-platform mobile apps with React Native.",
      "Translated UI/UX designs into clean, reusable components.",
      "Integrated RESTful APIs with frontend applications.",
    ],
  },
];

type ExperienceItem = (typeof experiences)[number];

const initials = (name: string) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

const TimelineRow = ({ exp, index }: { exp: ExperienceItem; index: number }) => {
  const anim = useScrollAnimation({ threshold: 0.2 });
  const isCurrent = exp.duration.includes("Present");

  return (
    <div
      ref={anim.ref}
      className={`reveal relative pb-5 last:pb-0 sm:pb-8 sm:pl-24 ${
        anim.isVisible ? "is-visible" : ""
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* company monogram node */}
      <div
        aria-hidden="true"
        className={`absolute left-0 top-0 hidden h-14 w-14 items-center justify-center rounded-xl font-display text-base font-bold sm:flex ${
          isCurrent
            ? "bg-primary text-primary-foreground shadow-lg ring-4 ring-primary/15"
            : "border border-border bg-card text-foreground"
        }`}
      >
        {initials(exp.company)}
      </div>

      {/* card */}
      <div className="surface surface-hover p-5 sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-display text-lg font-bold text-foreground sm:text-xl">
                {exp.title}
              </h3>
              {isCurrent && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[0.7rem] font-semibold text-emerald-600 dark:text-emerald-400">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Current
                </span>
              )}
            </div>
            <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm">
              <span className="font-semibold text-primary">{exp.company}</span>
              <span className="inline-flex items-center gap-1 text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" />
                {exp.location}
              </span>
            </p>
          </div>

          <div className="flex flex-shrink-0 flex-col items-start gap-1.5 sm:items-end">
            <span className="rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium tabular-nums text-foreground">
              {exp.duration}
            </span>
            <span className="text-[0.7rem] uppercase tracking-wide text-muted-foreground">
              {exp.type}
            </span>
          </div>
        </div>

        {/* stack tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {exp.stack.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-primary/20 bg-primary/[0.06] px-2 py-0.5 text-[0.72rem] font-medium text-primary"
            >
              {tag}
            </span>
          ))}
        </div>

        <ul className="mt-4 grid gap-2 border-t border-border pt-4 sm:grid-cols-2">
          {exp.responsibilities.map((task, i) => (
            <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground">
              <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary/60" />
              <span>{task}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export const Experience = () => {
  return (
    <section id="experience" className="relative py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="04"
          eyebrow="Experience"
          title={<>Where I&apos;ve <span className="text-accent">worked.</span></>}
          description="Five years of frontend and full-stack roles, from associate developer to leading small teams."
        />

        <div className="relative">
          {/* spine aligned to the center of the monogram nodes */}
          <div className="absolute left-6 top-14 hidden w-px bg-gradient-to-b from-border via-border to-transparent sm:left-7 sm:block sm:h-[calc(100%-3.5rem)]" />
          {experiences.map((exp, index) => (
            <TimelineRow key={index} exp={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
