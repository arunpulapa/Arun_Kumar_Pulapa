import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

const navLinks = [
  { name: "Services", href: "#services" },
  { name: "Work", href: "#projects" },
  { name: "Process", href: "#process" },
  { name: "Experience", href: "#experience" },
  { name: "About", href: "#about" },
  { name: "Blog", href: "#blog" },
];

export const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";
  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground/70 transition-colors hover:border-primary/40 hover:text-primary"
    >
      {mounted && isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
};

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setIsScrolled(window.scrollY > 16);
      const sections = ["home", ...navLinks.map((l) => l.href.substring(1)), "contact"];
      const current = sections.find((section) => {
        const el = document.getElementById(section);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 130 && rect.bottom >= 130;
      });
      if (current) setActiveSection(current);
    };
    // One state update per animation frame, not per scroll event.
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsMobileMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isMobileMenuOpen]);

  // Real anchors (work without JS); the native smooth scroll comes from CSS.
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 flex justify-center px-4 transition-all duration-500 sm:px-6 ${
        isScrolled ? "pt-2.5" : "pt-4 md:pt-5"
      }`}
    >
      <nav
        aria-label="Primary"
        className={`w-full max-w-6xl rounded-2xl transition-all duration-500 ${
          isScrolled || isMobileMenuOpen
            ? "frost px-4 py-2 sm:px-5"
            : "border border-transparent px-2 py-2 sm:px-4"
        }`}
      >
        <div className="flex h-12 items-center justify-between md:h-14">
          {/* Monogram + name */}
          <a href="#home" onClick={closeMenu} className="group flex items-center gap-3 rounded-xl">
            <span
              aria-hidden="true"
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-foreground font-display text-sm font-bold text-background transition-transform group-hover:-rotate-6"
            >
              PA
            </span>
            <span className="flex flex-col items-start leading-tight">
              <span className="font-display text-sm font-bold tracking-tight text-foreground">
                Pulapa Arun Kumar
              </span>
              <span className="text-[0.62rem] font-medium uppercase tracking-[0.24em] text-muted-foreground">
                Full Stack Developer
              </span>
            </span>
          </a>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <li key={link.name}>
                  <a
                    href={link.href}
                    aria-current={isActive ? "location" : undefined}
                    className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                      isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {link.name}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a
              href="#contact"
              className="btn-accent hidden h-10 items-center rounded-full px-5 text-sm font-semibold sm:inline-flex"
            >
              Hire Me
            </a>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground lg:hidden"
              onClick={() => setIsMobileMenuOpen((p) => !p)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {isMobileMenuOpen && (
          <div id="mobile-menu" className="pb-2 lg:hidden">
            <ul className="mt-2 flex flex-col divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={closeMenu}
                      aria-current={isActive ? "location" : undefined}
                      className={`flex items-center justify-between px-4 py-3.5 text-sm font-medium transition-colors ${
                        isActive ? "text-primary" : "text-foreground hover:bg-muted/60"
                      }`}
                    >
                      {link.name}
                      {isActive && <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-primary" />}
                    </a>
                  </li>
                );
              })}
              <li className="p-3">
                <a
                  href="#contact"
                  onClick={closeMenu}
                  className="btn-accent flex h-11 w-full items-center justify-center rounded-full text-sm font-semibold"
                >
                  Hire Me
                </a>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};
