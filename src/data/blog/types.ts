export type ContentBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "code"; lang: string; code: string }
  | { type: "quote"; text: string };

export const categories = [
  "Angular",
  "Frontend",
  "AI & Tools",
  "Product",
  "UI & Design",
  "Full Stack",
] as const;

export type BlogCategory = (typeof categories)[number];

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  tags: string[];
  /** ISO date — YYYY-MM-DD */
  date: string;
  featured?: boolean;
  content: ContentBlock[];
}

/** Rough reading time, derived from the post body so it never goes stale. */
export const readingTime = (post: BlogPost) => {
  const words = post.content.reduce((total, block) => {
    if ("text" in block) return total + block.text.split(/\s+/).length;
    if ("items" in block) return total + block.items.join(" ").split(/\s+/).length;
    if (block.type === "code") return total + block.code.split(/\s+/).length / 2;
    return total;
  }, 0);
  return Math.max(1, Math.round(words / 210));
};

export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
