import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ThemeToggle } from "@/components/Navbar";

/** Slim header for the /blog routes — the portfolio Navbar is hash-scroll only. */
export const BlogNav = () => (
  <div className="fixed left-0 right-0 top-0 z-50 flex justify-center px-4 pt-4 sm:px-6">
    <nav className="frost w-full max-w-4xl rounded-2xl px-4 py-2 sm:px-5">
      <div className="flex h-12 items-center justify-between gap-3">
        <Link to="/" className="group flex items-center gap-3 focus:outline-none">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-foreground font-display text-sm font-bold text-background transition-transform group-hover:-rotate-6">
            PA
          </span>
          <span className="hidden flex-col items-start leading-tight sm:flex">
            <span className="font-display text-sm font-bold tracking-tight text-foreground">
              Pulapa Arun Kumar
            </span>
            <span className="text-[0.62rem] font-medium uppercase tracking-[0.24em] text-muted-foreground">
              Writing
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-xs font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Portfolio
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  </div>
);
