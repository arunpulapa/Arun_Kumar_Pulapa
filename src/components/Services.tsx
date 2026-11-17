import { Code2, LayoutDashboard, MonitorSmartphone, Plug, Wrench, LifeBuoy } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const services = [
  {
    icon: Code2,
    title: "Full stack web apps",
    description:
      "New features or whole applications: a React or Angular frontend and a Node.js backend, written in TypeScript and built to stay maintainable.",
    examples: ["React / Angular", "Node.js", "TypeScript", "MySQL"],
  },
  {
    icon: LayoutDashboard,
    title: "SaaS dashboards & admin panels",
    description:
      "Role-based dashboards, data tables, forms, and charts for internal tools and SaaS products — the kind of work I've done on HRM and CRM platforms.",
    examples: ["Roles & permissions", "Charts", "Complex forms"],
  },
  {
    icon: MonitorSmartphone,
    title: "Responsive websites & landing pages",
    description:
      "Figma-to-code builds that look right on every screen size and load fast, using Tailwind CSS or your existing design system.",
    examples: ["Figma to code", "Tailwind CSS", "Mobile-first"],
  },
  {
    icon: Plug,
    title: "Backend APIs & integration",
    description:
      "Designing and building REST APIs in Node.js and Express with MySQL, or connecting your app to existing services: authentication, validation, and data flows.",
    examples: ["Node.js / Express", "MySQL", "REST APIs", "Auth"],
  },
  {
    icon: Wrench,
    title: "Bug fixes, refactoring & performance",
    description:
      "Fixing bugs across the stack, untangling legacy code, and speeding up slow pages with lazy loading, smarter rendering, and smaller bundles.",
    examples: ["Debugging", "Refactoring", "Performance"],
  },
  {
    icon: LifeBuoy,
    title: "Ongoing development support",
    description:
      "A dependable full stack developer for your team on a monthly or part-time basis, for continued feature work and maintenance.",
    examples: ["Part-time", "Retainer", "Async-friendly"],
  },
];

export const Services = () => {
  const grid = useScrollAnimation({ threshold: 0.1 });

  return (
    <section id="services" className="relative py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="01"
          eyebrow="Services"
          title={<>How I can <span className="text-accent">help your product.</span></>}
          description="Full stack work for startups, software agencies, and product teams — from a single feature to a full build."
        />

        <ul
          ref={grid.ref as never}
          className={`reveal grid gap-4 sm:grid-cols-2 lg:grid-cols-3 ${grid.isVisible ? "is-visible" : ""}`}
        >
          {services.map((service) => (
            <li key={service.title} className="surface flex flex-col p-5 sm:p-6">
              <div className="flex items-center gap-3 sm:block">
                <div
                  aria-hidden="true"
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary sm:mb-4 sm:h-11 sm:w-11"
                >
                  <service.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-base font-bold text-foreground sm:text-lg">{service.title}</h3>
              </div>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>
              <p className="mt-4 flex flex-wrap gap-1.5">
                {service.examples.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-border bg-muted/40 px-2 py-0.5 text-[0.72rem] font-medium text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col items-start gap-4 rounded-[var(--radius)] border border-border bg-card p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
            <span className="font-semibold text-foreground">Not sure which fits?</span> Send a
            short description of what you need and I&apos;ll suggest an approach and a rough
            scope.
          </p>
          <a
            href="#contact"
            className="btn-accent inline-flex h-11 flex-shrink-0 items-center rounded-full px-6 text-sm font-semibold"
          >
            Discuss Your Project
          </a>
        </div>
      </div>
    </section>
  );
};
