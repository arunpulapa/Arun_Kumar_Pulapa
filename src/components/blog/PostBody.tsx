import { Fragment } from "react";
import type { ContentBlock } from "@/data/blog";

/**
 * Minimal inline formatter: `code` spans and **bold**.
 * Deliberately not a markdown parser — the content is authored in this repo,
 * so a two-token subset covers it without a dependency.
 */
const RichText = ({ text }: { text: string }) => (
  <>
    {text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g).map((part, i) => {
      if (part.startsWith("`") && part.endsWith("`") && part.length > 2) {
        return (
          <code
            key={i}
            className="rounded border border-border bg-muted/60 px-1.5 py-0.5 font-mono text-[0.85em] text-foreground"
          >
            {part.slice(1, -1)}
          </code>
        );
      }
      if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
        return (
          <strong key={i} className="font-semibold text-foreground">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return <Fragment key={i}>{part}</Fragment>;
    })}
  </>
);

const CodeBlock = ({ lang, code }: { lang: string; code: string }) => (
  <div className="my-7 overflow-hidden rounded-xl border border-border bg-muted/40">
    <div className="flex items-center justify-between border-b border-border px-4 py-2">
      <span className="font-mono text-[0.7rem] uppercase tracking-widest text-muted-foreground">
        {lang}
      </span>
      <span className="flex gap-1.5">
        {["bg-foreground/15", "bg-foreground/15", "bg-foreground/15"].map((c, i) => (
          <span key={i} className={`h-2 w-2 rounded-full ${c}`} />
        ))}
      </span>
    </div>
    <pre className="overflow-x-auto px-4 py-4 text-[0.82rem] leading-relaxed">
      <code className="font-mono text-foreground/90">{code}</code>
    </pre>
  </div>
);

export const PostBody = ({ content }: { content: ContentBlock[] }) => (
  <div className="text-[1.02rem] leading-[1.75] text-muted-foreground">
    {content.map((block, i) => {
      switch (block.type) {
        case "h2":
          return (
            <h2
              key={i}
              className="mt-12 scroll-mt-28 font-display text-2xl font-bold tracking-tight text-foreground sm:text-[1.7rem]"
            >
              {block.text}
            </h2>
          );

        case "h3":
          return (
            <h3
              key={i}
              className="mt-8 font-display text-lg font-bold tracking-tight text-foreground sm:text-xl"
            >
              {block.text}
            </h3>
          );

        case "p":
          return (
            <p key={i} className="mt-5">
              <RichText text={block.text} />
            </p>
          );

        case "ul":
          return (
            <ul key={i} className="mt-5 space-y-2.5">
              {block.items.map((item, j) => (
                <li key={j} className="flex gap-3">
                  <span className="mt-[0.6rem] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary/60" />
                  <span>
                    <RichText text={item} />
                  </span>
                </li>
              ))}
            </ul>
          );

        case "ol":
          return (
            <ol key={i} className="mt-5 space-y-2.5">
              {block.items.map((item, j) => (
                <li key={j} className="flex gap-3">
                  <span className="mt-0.5 font-mono text-xs font-semibold tabular-nums text-primary">
                    {String(j + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <RichText text={item} />
                  </span>
                </li>
              ))}
            </ol>
          );

        case "quote":
          return (
            <blockquote
              key={i}
              className="my-8 border-l-2 border-primary bg-primary/[0.04] px-5 py-4 font-display text-lg font-medium leading-snug text-foreground"
            >
              <RichText text={block.text} />
            </blockquote>
          );

        case "code":
          return <CodeBlock key={i} lang={block.lang} code={block.code} />;

        default:
          return null;
      }
    })}
  </div>
);
