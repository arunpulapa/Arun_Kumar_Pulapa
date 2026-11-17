import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import { componentTagger } from "lovable-tagger";

const SITE_URL = "https://pulapaarunkumar.online";

/** Routes collected during prerender, so the sitemap can never drift from reality. */
const renderedRoutes = new Set<string>();

/**
 * The HTML spec only guarantees encoding sniffing within the first 1024 bytes.
 * vite-react-ssg injects the react-helmet block at the top of <head>, which
 * pushes the template's <meta charset> past that window — so hoist it back to
 * the first position. Without this, non-ASCII characters (em dashes, accents)
 * render as mojibake for users whose browser defaults to windows-1252.
 */
const hoistCharset = (html: string) => {
  const charsetTag = html.match(/<meta charset=["'][^"']+["']\s*\/?>/i);
  if (!charsetTag) return html;
  return html
    .replace(charsetTag[0], "")
    .replace(/<head>/i, `<head><meta charset="UTF-8">`);
};

/** The template keeps a <title> for the dev server; helmet supplies the real one. */
const dropTemplateTitle = (html: string) => {
  const titles = [...html.matchAll(/<title[^>]*>[\s\S]*?<\/title>/gi)];
  if (titles.length < 2) return html;
  // Keep the first (helmet's, injected at the top of head), drop the rest.
  return titles.slice(1).reduce((acc, m) => acc.replace(m[0], ""), html);
};

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  ssgOptions: {
    formatting: "minify",
    onPageRendered: (route: string, html: string) => {
      renderedRoutes.add(route);
      return dropTemplateTitle(hoistCharset(html));
    },
    onFinished: () => {
      const today = new Date().toISOString().slice(0, 10);
      const priority = (route: string) =>
        route === "/" ? "1.0" : route === "/blog" ? "0.9" : "0.7";

      const urls = [...renderedRoutes]
        .filter((route) => !route.includes("*") && !route.includes(":"))
        .filter((route) => route.replace(/^\//, "") !== "404")
        .sort((a, b) => a.localeCompare(b))
        .map(
          (route) =>
            `  <url>\n    <loc>${SITE_URL}${route === "/" ? "/" : route}</loc>\n` +
            `    <lastmod>${today}</lastmod>\n    <priority>${priority(route)}</priority>\n  </url>`,
        )
        .join("\n");

      fs.writeFileSync(
        path.resolve(__dirname, "dist/sitemap.xml"),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      );
      console.log(`\n[sitemap] wrote ${renderedRoutes.size} prerendered routes`);
    },
  },
}));
