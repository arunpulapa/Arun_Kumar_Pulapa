import { useScrollAnimation } from "@/hooks/use-scroll-animation";

interface SectionHeadingProps {
  index: string;          // e.g. "01"
  eyebrow: string;        // e.g. "About"
  title: React.ReactNode; // supports <span className="text-accent">…</span>
  description?: string;
  align?: "left" | "center";
}

export const SectionHeading = ({
  index,
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) => {
  const anim = useScrollAnimation();
  const isCenter = align === "center";

  return (
    <div
      ref={anim.ref}
      className={`reveal mb-10 sm:mb-12 ${anim.isVisible ? "is-visible" : ""} ${
        isCenter ? "mx-auto max-w-2xl text-center" : "max-w-3xl"
      }`}
    >
      <div className={`flex items-center gap-3 ${isCenter ? "justify-center" : ""}`}>
        <span className="font-display text-sm font-semibold tabular-nums text-accent">
          {index}
        </span>
        <span className="eyebrow">{eyebrow}</span>
      </div>

      <h2 className="mt-5 font-display text-3xl font-bold leading-[1.12] tracking-tight text-foreground sm:text-4xl md:text-[3.1rem]">
        {title}
      </h2>

      {description && (
        <p
          className={`mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg ${
            isCenter ? "mx-auto max-w-xl" : "max-w-2xl"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
};
