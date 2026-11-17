import { Linkedin, Mail, ArrowUp, Download } from "lucide-react";
import resumePDF from "@/assets/Pulapa_Arun_Kumar_Full_Stack_Resume.pdf";
import { site } from "@/lib/site";

const socials = [
  { icon: Linkedin, link: site.linkedin, label: "LinkedIn" },
  { icon: Mail, link: `mailto:${site.email}`, label: "Email" },
];

// Absolute hrefs so these keep working from the /blog routes too.
const links = [
  { name: "Services", href: "/#services" },
  { name: "Work", href: "/#projects" },
  { name: "Process", href: "/#process" },
  { name: "Experience", href: "/#experience" },
  { name: "About", href: "/#about" },
  { name: "FAQ", href: "/#faq" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/#contact" },
];

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border">
      <div className="container mx-auto px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-foreground font-display text-sm font-bold text-background"
              >
                PA
              </span>
              <span className="font-display text-lg font-bold text-foreground">{site.name}</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Freelance full stack developer building web apps, SaaS dashboards, and the
              APIs behind them with React, Angular, and Node.js for clients worldwide.
            </p>
            <div className="mt-5 flex gap-2.5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.link}
                  target={s.link.startsWith("http") ? "_blank" : undefined}
                  rel={s.link.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={s.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  <s.icon aria-hidden="true" className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <nav aria-label="Footer">
            <p className="eyebrow">Navigate</p>
            <ul className="mt-3 grid grid-cols-2 gap-x-4 text-sm md:grid-cols-1">
              {links.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="link-underline inline-block py-1.5 text-muted-foreground hover:text-foreground">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Hire */}
          <div>
            <p className="eyebrow">Work with me</p>
            <div className="mt-4 flex flex-col items-start gap-3">
              <a
                href="/#contact"
                className="btn-accent inline-flex h-11 items-center rounded-full px-6 text-sm font-semibold"
              >
                Hire Me
              </a>
              <a
                href={resumePDF}
                download="Pulapa_Arun_Kumar_Full_Stack_Resume.pdf"
                className="link-underline inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
              >
                <Download aria-hidden="true" className="h-4 w-4" /> Download résumé (PDF)
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row">
          <p>© {currentYear} {site.name}. Built with React, TypeScript &amp; Tailwind CSS.</p>
          <a
            href="#main"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary"
          >
            Back to top <ArrowUp aria-hidden="true" className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
};
