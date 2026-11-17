import { SectionHeading } from "@/components/SectionHeading";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const steps = [
  {
    title: "Share the brief",
    body: "Tell me what you're building, plus any designs, repos, or links. A short written description is enough to start.",
  },
  {
    title: "Scope & estimate",
    body: "I reply with questions, a suggested approach, and a scoped estimate, so we agree on deliverables before any work starts.",
  },
  {
    title: "Build in small steps",
    body: "I work in small, reviewable pieces with regular progress updates and preview links you can click through.",
  },
  {
    title: "Handover & support",
    body: "Clean, documented code in your repository, plus a support window for fixes after delivery.",
  },
];

export const Process = () => {
  const list = useScrollAnimation({ threshold: 0.15 });

  return (
    <section id="process" className="relative py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="03"
          eyebrow="Process"
          title={<>Working <span className="text-accent">together.</span></>}
          description="Clear scope, frequent updates, and code your team can maintain after I hand it over. I work remotely and communicate in writing, so time zones don't block progress."
        />

        <ol
          ref={list.ref as never}
          className={`reveal grid gap-px overflow-hidden rounded-[var(--radius)] border border-border bg-border sm:grid-cols-2 lg:grid-cols-4 ${
            list.isVisible ? "is-visible" : ""
          }`}
        >
          {steps.map((step, i) => (
            <li key={step.title} className="bg-card p-6">
              <span className="font-display text-sm font-semibold tabular-nums text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display text-lg font-bold text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};
