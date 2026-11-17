import { Mail, Linkedin, Download, ArrowUpRight, ArrowRight } from "lucide-react";
import profileImage from "@/assets/profile-portrait.webp";
import resumePDF from "@/assets/Pulapa_Arun_Kumar_Full_Stack_Resume.pdf";
import { site, yearsOfExperience } from "@/lib/site";
import { liveSites } from "@/data/projects";

const proofPoints = [
  { value: `${yearsOfExperience()}+ years`, label: "shipping production web apps" },
  { value: `${liveSites.length} live sites`, label: "you can click through" },
  { value: "Remote", label: `from ${site.location.timezone}` },
];

export const Hero = () => (
  <section id="home" className="relative flex min-h-[100svh] items-center pb-16 pt-28 lg:pt-32">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
        {/* ---------- Copy ---------- */}
        <div>
          <p className="inline-flex items-center gap-2.5 rounded-full border border-border bg-card px-3.5 py-1.5 text-sm text-muted-foreground">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-emerald-500" />
            Available for freelance full stack projects
          </p>

          {/* The name lives inside the <h1>: for a personal-name search, the
              h1 is the strongest on-page relevance signal there is. */}
          <h1 className="mt-7">
            <span className="block font-display text-base font-semibold text-muted-foreground sm:text-lg">
              Pulapa Arun Kumar · Full Stack Developer (React, Angular &amp; Node.js)
            </span>
            {" "}
            <span className="mt-3 block font-display text-[2.4rem] font-extrabold leading-[1.04] tracking-tight text-foreground sm:text-6xl lg:text-[4.1rem]">
              Fast, reliable web apps for <span className="text-accent">SaaS products</span> and
              growing teams.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            I help startup founders, agencies, and product teams go from Figma design to working
            product: responsive React and Angular interfaces, Node.js APIs, and the MySQL
            database behind them. I also fix bugs and performance problems in existing codebases.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#contact"
              className="btn-accent group inline-flex h-12 items-center justify-center gap-2 rounded-full px-7 text-base font-semibold"
            >
              Hire Me
              <ArrowUpRight
                aria-hidden="true"
                className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
            <a
              href="#projects"
              className="btn-ghost group inline-flex h-12 items-center justify-center gap-2 rounded-full px-7 text-base font-semibold"
            >
              View My Work
              <ArrowRight aria-hidden="true" className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>

          {/* Secondary links */}
          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-muted-foreground">
            <a
              href={`mailto:${site.email}`}
              className="link-underline inline-flex items-center gap-2 py-2 hover:text-foreground"
            >
              <Mail aria-hidden="true" className="h-4 w-4 text-primary" /> {site.email}
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline inline-flex items-center gap-2 py-2 hover:text-foreground"
            >
              <Linkedin aria-hidden="true" className="h-4 w-4 text-primary" /> LinkedIn
            </a>
            <a
              href={resumePDF}
              download="Pulapa_Arun_Kumar_Full_Stack_Resume.pdf"
              className="link-underline inline-flex items-center gap-2 py-2 hover:text-foreground"
            >
              <Download aria-hidden="true" className="h-4 w-4 text-primary" /> Résumé (PDF)
            </a>
          </div>
        </div>

        {/* ---------- Portrait ---------- */}
        <div className="relative mx-auto w-full max-w-[15rem] sm:max-w-xs lg:max-w-md">
          <div aria-hidden="true" className="absolute -bottom-4 -right-4 h-full w-full rounded-[1.6rem] border border-primary/40" />
          <div className="surface-lg relative overflow-hidden rounded-[1.6rem] p-2">
            <div className="overflow-hidden rounded-[1.2rem]">
              <img
                src={profileImage}
                alt="Portrait of Pulapa Arun Kumar"
                width={793}
                height={992}
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <div className="absolute bottom-5 left-5 rounded-xl border border-border bg-background/90 px-4 py-2.5 shadow-md backdrop-blur">
              <p className="font-display text-sm font-bold text-foreground">Full Stack Developer</p>
              <p className="text-xs text-muted-foreground">Hyderabad, India · works remotely</p>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Proof strip ---------- */}
      <dl className="mt-14 grid max-w-3xl grid-cols-3 divide-x divide-border border-y border-border">
        {proofPoints.map((p) => (
          <div key={p.label} className="px-2 py-5 text-center sm:px-6">
            <dt className="font-display text-base font-extrabold tracking-tight text-foreground sm:text-2xl">
              {p.value}
            </dt>
            <dd className="mt-1 text-[0.7rem] leading-snug text-muted-foreground sm:text-sm">{p.label}</dd>
          </div>
        ))}
      </dl>
    </div>
  </section>
);
