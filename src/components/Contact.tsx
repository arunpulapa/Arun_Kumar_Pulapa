import { useState } from "react";
import {
  Mail, Phone, Linkedin, MapPin, Send, ArrowUpRight,
  Loader2, CheckCircle2, AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SectionHeading } from "@/components/SectionHeading";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { site } from "@/lib/site";

const contactInfo: { icon: typeof Mail; label: string; value: string; link?: string }[] = [
  { icon: Mail, label: "Email", value: site.email, link: `mailto:${site.email}` },
  { icon: Linkedin, label: "LinkedIn", value: "Pulapa Arun Kumar", link: site.linkedin },
  { icon: Phone, label: "Phone", value: site.phoneDisplay, link: `tel:${site.phone}` },
  { icon: MapPin, label: "Location", value: `Hyderabad, India · ${site.location.timezone}` },
];

/** Field names must stay in sync with the hidden Netlify form in index.html. */
const projectTypes = [
  "New web app (frontend + backend)",
  "SaaS dashboard / admin panel",
  "Website or landing page",
  "Bug fixes / performance",
  "Backend API / database work",
  "Ongoing development support",
  "Something else",
];

const emptyForm = { name: "", email: "", project: "", message: "" };

type SubmitState = "idle" | "submitting" | "success" | "error";

const FieldError = ({ id, message }: { id: string; message?: string }) =>
  message ? (
    <p id={id} className="flex items-center gap-1.5 text-xs font-medium text-destructive">
      <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
      {message}
    </p>
  ) : null;

/** Netlify Forms expects a urlencoded POST whose body includes the form name. */
const encode = (data: Record<string, string>) =>
  Object.entries(data)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join("&");

export const Contact = () => {
  const form = useScrollAnimation({ threshold: 0.15 });
  const info = useScrollAnimation({ threshold: 0.15 });
  const [formData, setFormData] = useState(emptyForm);
  const [status, setStatus] = useState<SubmitState>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const next: Record<string, string> = {};
    if (!formData.name.trim()) next.name = "Please tell me your name.";
    if (!formData.email.trim()) next.email = "I need an email address to reply to.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      next.email = "That doesn't look like a valid email address.";
    if (!formData.message.trim()) next.message = "Tell me a little about the project.";
    else if (formData.message.trim().length < 20)
      next.message = "Please add a bit more detail (at least 20 characters).";
    setErrors(next);
    return next;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Focus by id from the fresh result — the aria-invalid attributes haven't
    // re-rendered yet at this point.
    const firstInvalid = Object.keys(validate())[0];
    if (firstInvalid) {
      document.getElementById(firstInvalid)?.focus();
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": "contact", ...formData }),
      });
      if (!response.ok) throw new Error(`Netlify responded ${response.status}`);

      setStatus("success");
      setFormData(emptyForm);
    } catch {
      setStatus("error");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    if (status !== "idle") setStatus("idle");
  };

  const inputClass =
    "w-full border-border bg-background text-foreground placeholder:text-muted-foreground/70 focus-visible:ring-2 focus-visible:ring-primary/40";

  return (
    <section id="contact" className="relative py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="08"
          eyebrow="Contact"
          title={<>Discuss your <span className="text-accent">project.</span></>}
          description="Tell me what you're building and where you need help. I usually respond within 24 hours."
        />

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Form */}
          <div ref={form.ref} className={`reveal ${form.isVisible ? "is-visible" : ""}`}>
            <div className="surface-lg p-6 sm:p-8">
              <h3 className="font-display text-xl font-bold text-foreground">Send a project enquiry</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                A few sentences is enough. I&apos;ll reply with questions or a suggested next step.
              </p>

              <form
                name="contact"
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                noValidate
                className="mt-6 space-y-4"
              >
                {/* Netlify plumbing — the name tells it which form this is, the
                    honeypot catches bots that fill every field they find. */}
                <input type="hidden" name="form-name" value="contact" />
                <p hidden>
                  <label>
                    Leave this empty if you&apos;re human: <input name="bot-field" />
                  </label>
                </p>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-sm font-medium text-foreground">Name</label>
                    <Input id="name" name="name" autoComplete="name" placeholder="Your name" maxLength={100}
                      value={formData.name} onChange={handleChange} className={inputClass}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "name-error" : undefined} />
                    <FieldError id="name-error" message={errors.name} />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
                    <Input id="email" name="email" type="email" autoComplete="email" placeholder="you@company.com" maxLength={200}
                      value={formData.email} onChange={handleChange} className={inputClass}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "email-error" : undefined} />
                    <FieldError id="email-error" message={errors.email} />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="project" className="text-sm font-medium text-foreground">
                    Project type <span className="font-normal text-muted-foreground">(optional)</span>
                  </label>
                  <select id="project" name="project" value={formData.project} onChange={handleChange}
                    className="flex h-10 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40">
                    <option value="">Choose one</option>
                    {projectTypes.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-sm font-medium text-foreground">Message</label>
                  <Textarea id="message" name="message" rows={5}
                    placeholder="What are you building, what do you need help with, and roughly when? Links to designs or the current app help."
                    maxLength={5000}
                    value={formData.message} onChange={handleChange}
                    className={`${inputClass} resize-none`}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "message-error" : undefined} />
                  <FieldError id="message-error" message={errors.message} />
                </div>

                <Button type="submit" size="lg" disabled={status === "submitting"}
                  className="btn-accent h-12 w-full rounded-xl font-semibold sm:w-auto sm:px-8">
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" /> Sending…
                    </>
                  ) : (
                    <>
                      <Send aria-hidden="true" className="h-5 w-5" /> Send enquiry
                    </>
                  )}
                </Button>

                {/* Live region so the outcome is announced, not just shown. */}
                <div aria-live="polite">
                  {status === "success" && (
                    <p className="flex items-start gap-2 rounded-lg border border-emerald-600/30 bg-emerald-500/10 p-3 text-sm text-emerald-700 dark:text-emerald-400">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0" />
                      Message sent. Thanks for reaching out; I&apos;ll reply within 24 hours.
                    </p>
                  )}
                  {status === "error" && (
                    <p className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                      <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                      <span>
                        Your message didn&apos;t send. Please email me directly at{" "}
                        <a href={`mailto:${site.email}`} className="link-underline font-medium">
                          {site.email}
                        </a>{" "}
                        and I&apos;ll pick it up from there.
                      </span>
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Info */}
          <div ref={info.ref} className={`reveal space-y-4 ${info.isVisible ? "is-visible" : ""}`}>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {contactInfo.map((item) => {
                const content = (
                  <>
                    <div aria-hidden="true" className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">{item.label}</p>
                      <p className="break-words text-sm font-medium text-foreground">{item.value}</p>
                    </div>
                  </>
                );
                return item.link ? (
                  <a
                    key={item.label}
                    href={item.link}
                    target={item.link.startsWith("http") ? "_blank" : undefined}
                    rel={item.link.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="surface surface-hover flex items-center gap-3 p-4"
                  >
                    {content}
                  </a>
                ) : (
                  <div key={item.label} className="surface flex items-center gap-3 p-4">
                    {content}
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <div className="rounded-[calc(var(--radius)+0.35rem)] bg-foreground p-7 text-background">
              <h3 className="font-display text-xl font-bold">Prefer email or LinkedIn?</h3>
              <p className="mt-2 text-sm text-background/75">
                Either works. Send a short description and any links, and I&apos;ll follow up to
                arrange a call at a time that suits your time zone.
              </p>
              <Button asChild size="lg"
                className="mt-5 h-11 rounded-full bg-background font-semibold text-foreground hover:bg-background/90">
                <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
                  Connect on LinkedIn <ArrowUpRight className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
