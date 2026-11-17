import { Head } from "vite-react-ssg";
import { ArrowLeft } from "lucide-react";
import { site } from "@/lib/site";

const NotFound = () => (
  <main
    id="main"
    className="flex min-h-screen items-center justify-center bg-background px-4 text-foreground"
  >
    <Head>
      <title>{`Page not found | ${site.name}`}</title>
      <meta name="robots" content="noindex" />
    </Head>
    <div className="max-w-md text-center">
      <p className="eyebrow justify-center">404</p>
      <h1 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
        This page doesn&apos;t exist.
      </h1>
      <p className="mt-3 text-muted-foreground">
        The link may be old or mistyped. You can head back to the portfolio or read the blog.
      </p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <a
          href="/"
          className="btn-accent inline-flex h-11 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to portfolio
        </a>
        <a
          href="/blog"
          className="btn-ghost inline-flex h-11 items-center justify-center rounded-full px-6 text-sm font-semibold"
        >
          Read the blog
        </a>
      </div>
    </div>
  </main>
);

export default NotFound;
