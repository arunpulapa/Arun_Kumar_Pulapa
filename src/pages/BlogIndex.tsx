import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { BlogNav } from "@/components/blog/BlogNav";
import { PostCard } from "@/components/blog/PostCard";
import { Footer } from "@/components/Footer";
import { Seo } from "@/components/Seo";
import { breadcrumbSchema } from "@/lib/schema";
import { site, absoluteUrl } from "@/lib/site";
import { posts, categoryCounts } from "@/data/blog";

const ALL = "All";

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": `${site.url}/blog#blog`,
  name: `Writing — ${site.name}`,
  url: absoluteUrl("/blog"),
  author: { "@id": `${site.url}/#person` },
  blogPost: posts.map((post) => ({
    "@type": "BlogPosting",
    headline: post.title,
    url: absoluteUrl(`/blog/${post.slug}`),
    datePublished: post.date,
    author: { "@id": `${site.url}/#person` },
  })),
};

const BlogIndex = () => {
  const [category, setCategory] = useState<string>(ALL);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((post) => {
      if (category !== ALL && post.category !== category) return false;
      if (!q) return true;
      return (
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    });
  }, [category, query]);

  const filters = [
    [ALL, posts.length] as const,
    ...(Object.entries(categoryCounts) as [string, number][]),
  ];

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <Seo
        title={`Writing on Angular, React & AI-Assisted Development | ${site.name}`}
        description={`${posts.length} posts by Pulapa Arun Kumar on Angular and React architecture, frontend performance, AI-assisted development with Claude Code and Cursor, product decisions, and full-stack craft.`}
        path="/blog"
        schema={[
          blogSchema,
          breadcrumbSchema([
            { name: site.name, path: "/" },
            { name: "Writing", path: "/blog" },
          ]),
        ]}
      />

      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-paper-grid opacity-[0.5] [mask-image:radial-gradient(ellipse_75%_60%_at_50%_0%,#000_55%,transparent_100%)]" />
        <div className="absolute inset-0 bg-noise opacity-[0.02] mix-blend-multiply dark:mix-blend-soft-light dark:opacity-[0.04]" />
        <div className="absolute -right-40 -top-40 h-[36rem] w-[36rem] rounded-full bg-primary/[0.06] blur-[120px]" />
      </div>

      <BlogNav />

      <main id="main" className="container mx-auto px-4 pb-24 pt-32 sm:px-6 sm:pt-36 lg:px-8">
        <header className="mx-auto max-w-3xl">
          <span className="eyebrow">Writing</span>
          <h1 className="mt-5 font-display text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl md:text-[3.4rem]">
            Notes from <span className="text-accent">the build.</span>
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {posts.length} posts on Angular and React architecture, frontend performance,
            AI-assisted development, product decisions, and full-stack craft — written from
            what actually shipped, including the parts that went wrong.
          </p>
        </header>

        {/* controls */}
        <div className="sticky top-[5.5rem] z-30 -mx-4 mt-12 bg-background/80 px-4 py-4 backdrop-blur-md sm:-mx-6 sm:px-6">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search posts by title, topic, or tag…"
              aria-label="Search posts"
              className="h-12 w-full rounded-full border border-border bg-card pl-11 pr-11 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/50"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {filters.map(([name, count]) => {
              const isActive = category === name;
              return (
                <button
                  key={name}
                  onClick={() => setCategory(name)}
                  aria-pressed={isActive}
                  className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                    isActive
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-primary"
                  }`}
                >
                  {name} <span className="tabular-nums opacity-70">{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* results */}
        {filtered.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((post, index) => (
              <PostCard key={post.slug} post={post} index={index} />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-[var(--radius)] border border-dashed border-border p-12 text-center">
            <p className="font-display text-lg font-bold text-foreground">
              Nothing matches “{query}”.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Try a broader term, or clear the filters to see all {posts.length} posts.
            </p>
            <button
              onClick={() => {
                setQuery("");
                setCategory(ALL);
              }}
              className="btn-ghost mt-5 inline-flex rounded-full px-5 py-2 text-sm font-medium"
            >
              Clear filters
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default BlogIndex;
