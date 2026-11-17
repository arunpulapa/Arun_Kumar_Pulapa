# pulapaarunkumar.online

Freelance portfolio for Pulapa Arun Kumar, a full stack developer (React, Angular, Node.js).

React 18 · TypeScript · Tailwind CSS · Vite, prerendered to static HTML with
[vite-react-ssg](https://github.com/Daydreamer-riri/vite-react-ssg). Hosted on Netlify.

## Commands

```sh
npm install
npm run dev        # dev server on http://localhost:8080
npm run build      # prerender every route to dist/ and write dist/sitemap.xml
npm run preview    # serve dist/ locally
npm run lint
```

## Where things live

- `src/lib/site.ts` — name, domain, contact details, career start date. Change facts here first.
- `src/lib/schema.ts` — JSON-LD (Person, ProfilePage, ProfessionalService).
- `src/components/` — one file per homepage section (Hero, Services, Projects, Process, Experience, About, Blog, Contact).
- `src/data/blog/` — blog posts, prerendered to `/blog/<slug>`.
- `src/assets/Pulapa_Arun_Kumar_Resume.pdf` — the résumé served by the download links.

## Contact form

Uses Netlify Forms. The hidden form in `index.html` registers the fields at deploy
time, so keep its field names in sync with `src/components/Contact.tsx`.
**Form detection must be enabled** in Netlify → Site configuration → Forms.
