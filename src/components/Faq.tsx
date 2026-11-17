import { Plus } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";

/** Answers must stay true to how Arun actually works — update them if that changes. */
const faqs = [
  {
    q: "How do you price projects?",
    a: "Clearly scoped work gets a fixed-price quote after I've reviewed the brief. Ongoing work and open-ended fixes are billed hourly or monthly. Either way, you get the estimate before any work starts.",
  },
  {
    q: "Can you work on our existing codebase?",
    a: "Yes. A lot of my work is extending and fixing existing React and Angular apps. I start by reading the code and agreeing on conventions, so my changes fit in with what's already there.",
  },
  {
    q: "How do we work across time zones?",
    a: "I'm in India (IST, UTC+5:30) and work asynchronously, with written updates, preview links, and pull requests you can review on your own schedule. When a call helps, we schedule it at a time that overlaps with yours.",
  },
  {
    q: "What do you need from me to get started?",
    a: "A short description of the goal, any designs (Figma files or screenshots), access to the repository or API docs if they exist, and your timeline.",
  },
  {
    q: "Who owns the code?",
    a: "You do. Work is committed to your repository throughout the project, so you're never locked out of your own code.",
  },
  {
    q: "Do you do backend work too?",
    a: "Yes. I build backends in Node.js and Express with MySQL: REST APIs, authentication, database schemas, and integrations with third-party services. For large-scale database tuning or complex cloud infrastructure, I'll tell you upfront when a specialist is the better call.",
  },
];

export const Faq = () => (
  <section id="faq" className="relative py-16 sm:py-24">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <SectionHeading
          index="07"
          eyebrow="FAQ"
          title={<>Questions clients <span className="text-accent">usually ask.</span></>}
          description="Anything else? Ask in your message and I'll answer it directly."
        />

        <div className="divide-y divide-border border-y border-border">
          {faqs.map((item) => (
            <details key={item.q} className="group py-1">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-md py-4 font-display text-base font-semibold text-foreground [&::-webkit-details-marker]:hidden">
                {item.q}
                <Plus
                  aria-hidden="true"
                  className="h-5 w-5 flex-shrink-0 text-primary transition-transform duration-200 group-open:rotate-45"
                />
              </summary>
              <p className="pb-5 pr-8 text-sm leading-relaxed text-muted-foreground sm:text-base">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  </section>
);
