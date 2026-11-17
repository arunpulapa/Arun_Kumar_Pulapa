/**
 * First focusable element on every page. Visually hidden until focused, so
 * keyboard users can jump past the nav instead of tabbing through every link.
 */
export const SkipToContent = () => (
  <a
    href="#main"
    className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
  >
    Skip to content
  </a>
);
