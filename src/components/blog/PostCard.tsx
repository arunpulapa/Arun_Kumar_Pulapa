import { Link } from "react-router-dom";
import { ArrowUpRight, Clock } from "lucide-react";
import { formatDate, readingTime, type BlogPost } from "@/data/blog";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

interface PostCardProps {
  post: BlogPost;
  index?: number;
}

export const PostCard = ({ post, index = 0 }: PostCardProps) => {
  const anim = useScrollAnimation({ threshold: 0.15 });

  return (
    <Link
      to={`/blog/${post.slug}`}
      ref={anim.ref as never}
      className={`reveal surface surface-hover group flex flex-col p-6 ${
        anim.isVisible ? "is-visible" : ""
      }`}
      style={{ transitionDelay: `${(index % 3) * 90}ms` }}
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="chip">{post.category}</span>
        <span className="inline-flex items-center gap-1.5 text-xs tabular-nums text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          {readingTime(post)} min
        </span>
      </div>

      <h3 className="flex items-start justify-between gap-3 font-display text-lg font-bold leading-snug text-foreground">
        <span className="transition-colors group-hover:text-primary">{post.title}</span>
        <ArrowUpRight className="mt-1 h-5 w-5 flex-shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
      </h3>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
        {post.excerpt}
      </p>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
        <div className="flex flex-wrap gap-1.5">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-border bg-muted/40 px-2 py-0.5 text-[0.72rem] font-medium text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
        <time
          dateTime={post.date}
          className="text-xs tabular-nums text-muted-foreground"
        >
          {formatDate(post.date)}
        </time>
      </div>
    </Link>
  );
};
