import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { PostCard } from "@/components/blog/PostCard";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { posts, featuredPosts, categoryCounts } from "@/data/blog";

/** Featured posts, topped up with the newest ones if fewer than three are flagged. */
const highlights = [
  ...featuredPosts,
  ...posts.filter((p) => !p.featured),
].slice(0, 3);

export const Blog = () => {
  const anim = useScrollAnimation({ threshold: 0.2 });

  return (
    <section id="blog" className="relative py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="06"
          eyebrow="Writing"
          title={<>Notes from <span className="text-accent">the build.</span></>}
          description="Lessons from shipping Angular and React in production — architecture, performance, AI tooling, and the product decisions around the code."
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map((post, index) => (
            <PostCard key={post.slug} post={post} index={index} />
          ))}
        </div>

        {/* topics + all-posts link */}
        <div
          ref={anim.ref}
          className={`reveal mt-8 flex flex-col gap-5 rounded-[var(--radius)] border border-border bg-card p-6 sm:flex-row sm:items-center sm:justify-between ${
            anim.isVisible ? "is-visible" : ""
          }`}
        >
          <div>
            <p className="font-display text-base font-bold text-foreground">
              {posts.length} posts, and counting.
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {Object.entries(categoryCounts).map(([category, count]) => (
                <span
                  key={category}
                  className="rounded-md border border-border bg-muted/40 px-2 py-0.5 text-[0.72rem] font-medium text-muted-foreground"
                >
                  {category} <span className="tabular-nums">({count})</span>
                </span>
              ))}
            </div>
          </div>

          <Link
            to="/blog"
            className="btn-accent inline-flex flex-shrink-0 items-center justify-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold"
          >
            Read all posts
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
