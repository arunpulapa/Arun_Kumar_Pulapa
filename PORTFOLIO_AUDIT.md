# Portfolio audit — pulapaarunkumar.online

Audited 2026-10-10 against the source in this folder and the live site.
**Confirmed** = reproduced with evidence. **Needs manual check** = could not be verified from here.

## Critical

| # | Issue | Evidence | Why it matters to a client | Fix |
|---|---|---|---|---|
| C1 | Contact form does not deliver | A test POST (with the honeypot field filled, so Netlify drops it as spam) to `https://pulapaarunkumar.online/` returned **HTTP 404 "Page not found"**. The live HTML still has `data-netlify="true"`, which Netlify strips from forms it has registered. | Every enquiry fails. The UI correctly shows an error and points to email, but most visitors will just leave. | Netlify dashboard → Site configuration → Forms → **Enable form detection**, then redeploy. Code-side, the form is wired correctly. *(Needs your dashboard access.)* |
| C2 | Canonical, og:url, sitemap and robots.txt all point at the old `pulapaarunkumar.netlify.app` host | Live `<link rel="canonical" href="https://pulapaarunkumar.netlify.app/">`. `/sitemap.xml` lists only `netlify.app` URLs. Both hosts return 200. | Google is told the real site is the `netlify.app` URL, so the `.online` domain earns no ranking. Shared links preview with the wrong URL. | Set `site.url` and `SITE_URL` to `https://pulapaarunkumar.online`. Add a 301 from `netlify.app` to `.online` (Netlify domain settings → set the primary domain). |
| C3 | Factual inconsistencies between the site and the résumé it serves | See "Content accuracy" below. | A client who opens the résumé after reading the site sees different titles, dates and employers. That costs trust immediately. | Needs your confirmation, item by item. |

## High

| # | Issue | Evidence | Why it matters | Fix |
|---|---|---|---|---|
| H1 | Positioning targets employers, not freelance clients | Hero: "Available for new opportunities", "Full-Stack Developer", 4 rotating titles. No services section anywhere. Nav CTA "Let's Talk". | A founder or agency can't tell within 5 seconds what you build for them or how to hire you. | Rewrite the hero for frontend freelance work. Add a Services section and a "How I work" section. CTAs: Hire Me / View My Work. |
| H2 | Unsupported numbers | "20+ projects shipped", "10+ technologies" (Hero); skill bars "Angular 95%", "Azure 60%" (Skills); "Senior Full-Stack Dev" caption. | Unverifiable stats and self-scored percentages read as filler to experienced buyers. Azure and .NET appear nowhere on the current résumé. | Remove the percentages and unbacked counts. Keep facts you can defend. |
| H3 | Live project links are broken | `www.iconfilers.com` fails DNS (it's on both the site and the résumé). `mimiverse.aknextgensolutions.com` serves an invalid TLS certificate (browser security warning). | A client who clicks the first proof of work and hits an error or warning page usually stops reading. | Remove the dead links. Present the tax platform as a non-linked case study. |
| H4 | All content is invisible until JavaScript runs | The prerendered HTML contains `class="reveal …"` (opacity 0) on every section. | With slow or failed JS, or for some crawlers and preview tools, the page shows as blank below the hero. | Only hide `.reveal` when JS is running (`html.js` class), and honour reduced motion. |
| H5 | Résumé PDF is out of date relative to the site | The served PDF (Dec 2025) lists AK NextGen as current employer and says "Senior Frontend Engineer". | Mixed signals about who you are and where you work now. | Regenerate the PDF once the facts are confirmed (manual, outside this repo). |

## Medium

| # | Issue | Evidence | Fix |
|---|---|---|---|
| M1 | Unknown URLs return 200 (soft 404) | `curl /this-does-not-exist` → 200; `_redirects` and `netlify.toml` rewrite `/*` → `/index.html`. The SSG build doesn't need that rewrite. | Remove the catch-all and ship a real `404.html`. |
| M2 | Main JS bundle 547 KB (177 KB gzip) | It includes all 20 blog posts (about 120 KB of text, pulled in by `Blog.tsx`), React Query (unused), and two toast systems. | Remove the unused providers. Ship only post summaries on the homepage. |
| M3 | Profile image is a 313 KB PNG with no dimensions | `img.png`, no `width`/`height` attributes. | Add dimensions (prevents layout shift) and convert to WebP. |
| M4 | Nav has 8 items, including "AI & Tools" and "Education" | Navbar.tsx | Trim to the client journey: Services, Work, Process, About, Blog, Contact. |
| M5 | Location tile links to `#` | Contact.tsx | Render it as plain text, not a link. |
| M6 | Phone shown as `9515748486` with no country code | Hero, Contact, Footer | International clients can't dial it. Use `+91 95157 48486`, or drop it in favour of email. |
| M7 | Experience and Person schema claim "Full-Stack", ".NET Core", "React Native", "Azure" | schema.ts, site.ts | Align with the frontend positioning and the résumé. |
| M8 | Scroll spy updates state on every scroll event | Navbar.tsx `handleScroll` | Throttle with rAF (minor). |
| M9 | Hero has a perpetual role-rotation animation | Hero.tsx `setInterval` | Remove it. It distracts, and re-renders the hero every 2.8s. |

## Low

| # | Issue | Fix |
|---|---|---|
| L1 | 3 ESLint errors in generated `ui/` files and `tailwind.config.ts` | Fix the lint config or the files. |
| L2 | `README.md` is the Lovable boilerplate | Replace with a project README. |
| L3 | Unused assets (`heriImg.png` 1.5 MB, `icon123.mp4`, a second résumé PDF, `hero-bg.jpg`) | Not bundled, but clutter. Delete them if you agree. |
| L4 | NotFound page uses `bg-gray-100`/`text-blue-500` (off-brand) | Restyle it with the theme tokens. |
| L5 | TypeScript `strict: false` | Leave as is for now; enabling it is a separate task. |

## Security / exposure

- **`.claude/settings.local.json` contains a Netlify MCP proxy token** (a long encrypted `proxy-path`). `.claude/` is **not** in `.gitignore`. If this folder is pushed to a public GitHub repo, the token is exposed. → I'll add `.claude/` to `.gitignore`. Rotate the token if it was ever pushed.
- No API keys or `.env` files in the source. The Google site-verification tag is public by design.
- Phone and email are deliberately public. That's your call; flagged only so you can decide.

## Content accuracy — needs your confirmation

| Claim on site | Résumé (Dec 2025, served) | Status |
|---|---|---|
| B.E. Mechanical, **2017–2021** | B.Tech Mechanical, no dates (an older résumé says June 2017 – July 2021) | You said it should be **2025**. If you finished in 2025, "4+ years" and "employed since Sep 2021" need explaining (e.g. working while studying). **Confirm.** |
| MBA in Systems, ISTS, 2026–2028 "Pursuing" | Not present | **Confirm or remove.** |
| Software Engineer, **Valethi Technologies**, Jul 2026 – Present | Not present | Post-dates the résumé. **Confirm.** |
| Full Stack Developer / team lead, **Navsan India**, Jan–May 2026 | Not present | **Confirm.** |
| "Senior Software Developer", AK NextGen, Oct 2024 – Dec 2025 | "Frontend Lead", Oct 2024 – Present | Title differs. **Confirm.** |
| ADQ split into Associate (2021–23) and Software Developer (2023–24) | Single role, "Software Developer", Sep 2021 – Sep 2024 | **Confirm.** |
| 9 "live" sites (Akkinetic, Garooda, NextGen Visuals, MimiVerse ×2, QwikBag, DreamVolve…) | Only aknextgensolutions.com and iconfilers.com are claimed | Which did you personally build, and what was your role? |
| "Improved performance by 25%" | Résumé only (an older résumé says 20%) | Not used on the site. Keep it off unless you can back it up. |

---

## Status after implementation (2026-10-10)

| # | Status |
|---|---|
| C1 | **Needs you:** enable Netlify form detection and redeploy. The code is unchanged and correct; it never shows a fake success. |
| C2 | **Fixed in code:** canonical, og:url, schema, sitemap and robots.txt now use `https://pulapaarunkumar.online`. **Needs you:** make `.online` the primary domain in Netlify so `netlify.app` 301-redirects to it. |
| C3 | **Fixed per your answers:** B.Tech shown as completed 2025; MBA removed; all five roles kept; experience is computed from Sep 2021. The résumé PDF still needs updating (H5). |
| H1 | **Fixed:** new hero, Services, and Process sections; Hire Me / View My Work / Discuss Your Project CTAs. |
| H2 | **Fixed:** skill percentages, "20+ projects" and "10+ technologies" removed. Skills come from the résumé. |
| H3 | **Fixed:** iconfilers.com is now an unlinked case study; MimiVerse Media now links to its new domain, mimiverse.in. |
| H4 | **Fixed:** `.reveal` only hides when the `js` class is present, and is ignored under reduced motion. |
| H5 | **Needs you:** regenerate the résumé PDF. |
| M1 | **Fixed:** catch-all rewrite removed; `dist/404.html` is prerendered with `noindex`. |
| M2 | **Partly fixed:** main JS 547 KB → 426 KB (177 → 140 KB gzip). Blog post bodies are still in the homepage bundle. |
| M3 | **Fixed:** WebP portrait (313 KB → 102 KB) with width/height set. |
| M4–M9 | **Fixed.** |
| L1 | **Fixed:** 0 lint errors (7 warnings remain in generated `ui/` files). |
| L2 | **Fixed:** README rewritten. |
| L3 | **Not done:** unused assets left in place; delete them if you agree. |
| L4 | **Fixed.** |
| Security | **Fixed:** `.claude/` is now gitignored. Rotate the Netlify MCP token if this folder was ever pushed publicly. |

## Second pass (2026-10-10)

- **Real screenshots** of 8 live sites (captured from the live sites at 1440×900, stored in `src/assets/work/`). The AK NextGen card uses the site's own published share image, because the live site doesn't render in headless capture. Recapture whenever a site is redesigned.
- **Corrected live-site descriptions** to match what the sites are now: Garooda is a phone-repair shop, QwikBag a white-label delivery platform, MimiVerse Energy a rooftop-solar company.
- **One brand colour** (cobalt) for headings and buttons; tighter section spacing; larger tap targets.
- **Phones:** smaller portrait, compact service cards, no side rail in Experience; live projects and case studies collapse behind "Show all" / "Show more" buttons.
- **New FAQ section.** ⚠️ Confirm these answers match how you work: fixed-price quotes for scoped work, hourly or monthly billing for ongoing work, and code committed to the client's repository.
- The hero proof strip now shows "9 live sites", counted from the project list so the number can't drift.
