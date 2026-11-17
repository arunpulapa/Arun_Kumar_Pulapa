import type { RouteRecord } from "vite-react-ssg";
import Layout from "./Layout";
import Index from "./pages/Index";
import { posts } from "@/data/blog";

/**
 * Data routes for vite-react-ssg. Every path listed here (including each
 * `getStaticPaths` entry) is prerendered to real HTML at build time.
 *
 * The blog routes are lazy so the homepage bundle doesn't carry 20 posts.
 */
export const routes: RouteRecord[] = [
  {
    path: "/",
    element: <Layout />,
    entry: "src/Layout.tsx",
    children: [
      {
        index: true,
        element: <Index />,
        entry: "src/pages/Index.tsx",
      },
      {
        path: "blog",
        lazy: async () => ({ Component: (await import("./pages/BlogIndex")).default }),
        entry: "src/pages/BlogIndex.tsx",
      },
      {
        path: "blog/:slug",
        lazy: async () => ({ Component: (await import("./pages/BlogPostPage")).default }),
        entry: "src/pages/BlogPostPage.tsx",
        getStaticPaths: () => posts.map((post) => `/blog/${post.slug}`),
      },
      {
        // Prerendered to dist/404.html, which Netlify serves (with a real 404
        // status) for any URL that has no file — no SPA catch-all needed.
        path: "404",
        lazy: async () => ({ Component: (await import("./pages/NotFound")).default }),
        entry: "src/pages/NotFound.tsx",
      },
      {
        path: "*",
        lazy: async () => ({ Component: (await import("./pages/NotFound")).default }),
        entry: "src/pages/NotFound.tsx",
      },
    ],
  },
];

export default routes;
