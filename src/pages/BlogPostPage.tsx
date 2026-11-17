import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Calendar, Clock, Link2, Check } from "lucide-react";
import { BlogNav } from "@/components/blog/BlogNav";
import { PostBody } from "@/components/blog/PostBody";
import { PostCard } from "@/components/blog/PostCard";
import { Footer } from "@/components/Footer";
import { Seo } from "@/components/Seo";
import { breadcrumbSchema } from "@/lib/schema";
import { site, absoluteUrl } from "@/lib/site";
import {
  formatDate, getPost, getRelatedPosts, posts, readingTime, type BlogPost,
} from "@/data/blog";

const postSchema = (post: BlogPost) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "@id": absoluteUrl(`/blog/${post.slug}#post`),
  headline: post.title,
  name: post.title,
  description: post.excerpt,
  url: absoluteUrl(`/blog/${post.slug}`),
  datePublished: post.date,
  dateModified: post.date,
  inLanguage: "en",
  keywords: post.tags.join(", "),
  articleSection: post.category,
  wordCount: post.content.reduce(
    (n, b) =>
      n +
      ("text" in b ? b.text.split(/\s+/).length : 0) +
      ("items" in b ? b.items.join(" ").split(/\s+/).length : 0),
    0,
  ),
  image: absoluteUrl(site.defaultImage),
  author: { "@id": `${site.url}/#person` },
  publisher: { "@id": `${site.url}/#person` },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": absoluteUrl(`/blog/${post.slug}`),
  },
});

/** Thin bar showing how far through the article the reader is. */
const ReadingProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollable = document.body.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed left-0 top-0 z-[60] h-0.5 w-full bg-transparent">
      <div
        className="h-full bg-primary transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

const CopyLinkButton = () => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      onClick={copy}
      className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary"
    >
      {copied ? <Check className="h-3.5 w-3.5" /> : <Link2 className="h-3.5 w-3.5" />}
      {copied ? "Link copied" : "Copy link"}
    </button>
  );
};

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPost(slug) : undefined;

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [slug]);

  if (!post) return <Navigate to="/blog" replace />;

  const ordered = posts;
  const position = ordered.findIndex((p) => p.slug === post.slug);
  const newer = position > 0 ? ordered[position - 1] : undefined;
  const older = position < ordered.length - 1 ? ordered[position + 1] : undefined;
  const related = getRelatedPosts(post);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <Seo
        title={`${post.title} | ${site.name}`}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        type="article"
        schema={[
          postSchema(post),
          breadcrumbSchema([
            { name: site.name, path: "/" },
            { name: "Writing", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />

      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-paper-grid opacity-[0.5] [mask-image:radial-gradient(ellipse_75%_60%_at_50%_0%,#000_55%,transparent_100%)]" />
        <div className="absolute inset-0 bg-noise opacity-[0.02] mix-blend-multiply dark:mix-blend-soft-light dark:opacity-[0.04]" />
      </div>

      <ReadingProgress />
      <BlogNav />

      <main id="main" className="container mx-auto px-4 pb-20 pt-32 sm:px-6 sm:pt-36 lg:px-8">
        <article className="mx-auto max-w-2xl">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            All posts
          </Link>

          <header className="mt-6 border-b border-border pb-8">
            <span className="chip">{post.category}</span>
            <h1 className="mt-4 font-display text-3xl font-bold leading-[1.12] tracking-tight text-foreground sm:text-[2.6rem]">
              {post.title}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {post.excerpt}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                <time dateTime={post.date} className="tabular-nums">
                  {formatDate(post.date)}
                </time>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                <span className="tabular-nums">{readingTime(post)} min read</span>
              </span>
              {/* Author byline links home with the name as anchor text —
                  20 internal links pointing at "/" with your name on them. */}
              <span>
                by{" "}
                <Link to="/" rel="author" className="link-underline font-medium text-foreground">
                  {site.name}
                </Link>
              </span>
            </div>
          </header>

          <PostBody content={post.content} />

          {/* tags + share */}
          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
            <div className="flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-border bg-muted/40 px-2 py-0.5 text-[0.72rem] font-medium text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
            <CopyLinkButton />
          </div>

          {/* prev / next */}
          {(newer || older) && (
            <nav className="mt-8 grid gap-3 sm:grid-cols-2">
              {older ? (
                <Link
                  to={`/blog/${older.slug}`}
                  className="surface surface-hover group p-5"
                >
                  <span className="inline-flex items-center gap-1.5 text-[0.7rem] font-semibold uppercase tracking-widest text-muted-foreground">
                    <ArrowLeft className="h-3 w-3" /> Older
                  </span>
                  <p className="mt-2 font-display text-sm font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
                    {older.title}
                  </p>
                </Link>
              ) : (
                <span />
              )}
              {newer && (
                <Link
                  to={`/blog/${newer.slug}`}
                  className="surface surface-hover group p-5 sm:text-right"
                >
                  <span className="inline-flex items-center gap-1.5 text-[0.7rem] font-semibold uppercase tracking-widest text-muted-foreground">
                    Newer <ArrowRight className="h-3 w-3" />
                  </span>
                  <p className="mt-2 font-display text-sm font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
                    {newer.title}
                  </p>
                </Link>
              )}
            </nav>
          )}
        </article>

        {/* related */}
        {related.length > 0 && (
          <section className="mx-auto mt-20 max-w-5xl border-t border-border pt-12">
            <h2 className="font-display text-xl font-bold tracking-tight text-foreground">
              Keep reading
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item, index) => (
                <PostCard key={item.slug} post={item} index={index} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default BlogPostPage;
