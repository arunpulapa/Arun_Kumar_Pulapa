import { angularPosts } from "./angular";
import { frontendPosts } from "./frontend";
import { aiToolsPosts } from "./ai-tools";
import { productPosts } from "./product";
import { craftPosts } from "./craft";
import type { BlogPost } from "./types";

export * from "./types";

/** All posts, newest first. */
export const posts: BlogPost[] = [
  ...angularPosts,
  ...frontendPosts,
  ...aiToolsPosts,
  ...productPosts,
  ...craftPosts,
].sort((a, b) => b.date.localeCompare(a.date));

export const featuredPosts = posts.filter((p) => p.featured);

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

/** Posts in the same category, then same tags — used for "keep reading". */
export const getRelatedPosts = (post: BlogPost, limit = 3) =>
  posts
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({
      post: p,
      score:
        (p.category === post.category ? 3 : 0) +
        p.tags.filter((t) => post.tags.includes(t)).length,
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || b.post.date.localeCompare(a.post.date))
    .slice(0, limit)
    .map((entry) => entry.post);

/** Category → post count, for the filter chips. Only non-empty categories. */
export const categoryCounts = posts.reduce<Record<string, number>>((acc, post) => {
  acc[post.category] = (acc[post.category] ?? 0) + 1;
  return acc;
}, {});
