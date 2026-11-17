import type { BlogPost } from "./types";

/** UI & Design + Full Stack — the craft-level posts. */
export const craftPosts: BlogPost[] = [
  {
    slug: "design-tokens-for-developers",
    title: "Design Tokens for Developers: Stop Writing Hex Codes",
    excerpt:
      "A dark mode that took an afternoon instead of a sprint, and the naming scheme that made it possible.",
    category: "UI & Design",
    tags: ["Design Systems", "CSS", "Tailwind", "Dark Mode"],
    date: "2026-06-12",
    content: [
      {
        type: "p",
        text: "I've added dark mode to two apps. The first took most of a sprint and shipped with a dozen unreadable corners we kept finding for weeks. The second took an afternoon. The difference wasn't skill — it was that the second one had tokens and the first had 200 hardcoded hex values.",
      },
      { type: "h2", text: "The problem with a hex code in a component" },
      {
        type: "code",
        lang: "css",
        code: `.card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  color: #111827;
}`,
      },
      {
        type: "p",
        text: "Three decisions frozen in a place where they can't be revisited. Dark mode means finding every one of them. And you will miss some, because `#fff`, `#ffffff`, `white`, and `rgb(255,255,255)` are the same colour to a browser and four different strings to a grep.",
      },
      { type: "h2", text: "Name by role, never by appearance" },
      {
        type: "p",
        text: "This is the whole idea, and it's where most token systems go wrong on the first day.",
      },
      {
        type: "code",
        lang: "css",
        code: `/* Wrong — the name describes what it looks like */
--color-white: #ffffff;
--color-light-gray: #f3f4f6;
--color-blue-600: #2563eb;

/* Right — the name describes what it's for */
--surface: 0 0% 100%;
--surface-muted: 220 14% 96%;
--primary: 221 83% 53%;`,
      },
      {
        type: "p",
        text: "`--color-white: #1a1a1a` in dark mode is an absurd line of code. `--surface: 220 13% 9%` is a sensible one. The role-based name stays true when the value flips; the appearance-based name becomes a lie.",
      },
      { type: "h2", text: "Two layers, not one" },
      {
        type: "p",
        text: "A primitive layer that holds raw values, and a semantic layer that assigns them meaning:",
      },
      {
        type: "code",
        lang: "css",
        code: `:root {
  /* primitives — the palette, no meaning attached */
  --blue-600: 221 83% 53%;
  --gray-50:  220 14% 98%;
  --gray-900: 220 13% 9%;

  /* semantics — what the UI actually references */
  --background: var(--gray-50);
  --foreground: var(--gray-900);
  --primary: var(--blue-600);
}

.dark {
  --background: var(--gray-900);
  --foreground: var(--gray-50);
}`,
      },
      {
        type: "p",
        text: "Components only ever touch the semantic layer. That means a rebrand is an edit to the primitives, and a theme is an edit to the semantics — and neither requires opening a single component.",
      },
      { type: "h2", text: "Store HSL channels, not colours" },
      {
        type: "p",
        text: "Note the values are `221 83% 53%`, not `hsl(221 83% 53%)`. Storing bare channels lets you compose alpha at the point of use:",
      },
      {
        type: "code",
        lang: "css",
        code: `.button-ghost:hover {
  background: hsl(var(--primary) / 0.08);
  border-color: hsl(var(--primary) / 0.4);
}`,
      },
      {
        type: "p",
        text: "Without it you need a separate token for every opacity — `--primary-10`, `--primary-20` — and the set is never quite the one you need. This one detail eliminates a whole category of token sprawl. (Tailwind's `hsl(var(--x))` convention exists for exactly this reason.)",
      },
      { type: "h2", text: "Tokens beyond colour" },
      {
        type: "p",
        text: "Colour is the obvious one, and the others matter nearly as much for consistency:",
      },
      {
        type: "ul",
        items: [
          "**Spacing** — a 4px scale. Nothing is ever 13px. Arbitrary spacing is why layouts feel subtly off without anyone being able to say why.",
          "**Radius** — one `--radius` with `calc()` derivatives. Three radii on one card is the fastest way to look unfinished.",
          "**Shadow** — two or three, named by elevation. `--shadow-sm` for resting cards, `--shadow-lg` for anything floating.",
          "**Type scale** — a fixed ramp. The moment someone needs 17px, the scale has lost.",
          "**Motion** — one duration and one easing curve for ordinary transitions. Inconsistent timing is felt even when it isn't noticed.",
        ],
      },
      { type: "h2", text: "Contrast is a constraint, not a preference" },
      {
        type: "p",
        text: "Check every foreground/background pair against WCAG AA — 4.5:1 for body text, 3:1 for large text and meaningful UI boundaries — in both themes. The pair that always fails is muted text on a muted surface, because it looks fine on your calibrated monitor at full brightness in a dark room.",
      },
      {
        type: "p",
        text: "Do this once when you define the tokens and it's permanently handled. Do it per component and you'll do it never.",
      },
      { type: "h2", text: "One rule to enforce" },
      {
        type: "p",
        text: "**No raw colour values in components.** Ever. Lint it if you can — a rule banning hex literals outside your token file takes ten minutes to add and holds the entire system together.",
      },
      {
        type: "p",
        text: "Without enforcement, someone in a hurry hardcodes `#fafafa` because it's 'basically the same', and six months later you're back to grepping for four spellings of white.",
      },
    ],
  },

  {
    slug: "accessible-components-that-matter",
    title: "Accessible Components: The Five Things That Matter Most",
    excerpt:
      "You don't need to memorise WCAG. Five habits cover the overwhelming majority of real-world accessibility failures.",
    category: "UI & Design",
    tags: ["Accessibility", "UI", "HTML", "Frontend"],
    date: "2026-05-16",
    content: [
      {
        type: "p",
        text: "Accessibility gets treated as a specialist discipline with a 400-page spec, which is how it ends up deferred forever. In practice, a small number of mistakes account for most of the damage. Fix these five and you're ahead of most production software.",
      },
      { type: "h2", text: "1. Use the right element" },
      {
        type: "p",
        text: "Most accessibility bugs are a `div` doing a job HTML already has an element for.",
      },
      {
        type: "code",
        lang: "html",
        code: `<!-- not focusable, not keyboard-activatable,
     not announced as a button, no default role -->
<div class="btn" onclick="submit()">Save</div>

<!-- all of that, free -->
<button type="button" onclick="submit()">Save</button>`,
      },
      {
        type: "p",
        text: "A `<button>` is focusable, activates on Enter and Space, announces itself as a button, participates in form submission, and shows a focus ring. Replicating that on a `div` takes `tabindex`, two keyboard handlers, `role`, `aria-pressed` where relevant, and custom focus styles — and you'll get one of them wrong.",
      },
      {
        type: "p",
        text: "Same for `<a>` versus a click-handling div. If it navigates, it's a link — and a link supports middle-click, ctrl+click, copy link address, and the browser's own history. A div supports none of that.",
      },
      { type: "h2", text: "2. Label every input, visibly" },
      {
        type: "code",
        lang: "html",
        code: `<!-- placeholder is not a label: it disappears on focus,
     fails contrast, and isn't reliably announced -->
<input placeholder="Email address" />

<!-- -->
<label for="email">Email address</label>
<input id="email" type="email" autocomplete="email" />`,
      },
      {
        type: "p",
        text: "Placeholder-as-label is a design trend that actively harms everyone: screen reader users get nothing, and sighted users forget which field they're in the moment they start typing. If space is genuinely tight, a floating label works — the text stays on screen.",
      },
      {
        type: "p",
        text: "While you're there: `autocomplete` attributes. They're an accessibility feature — for people with motor impairments, for anyone on a phone, and honestly for everyone.",
      },
      { type: "h2", text: "3. Never remove the focus ring" },
      {
        type: "code",
        lang: "css",
        code: `/* the single most damaging line in web CSS */
*:focus { outline: none; }

/* if the default is ugly, replace it — don't delete it */
:focus-visible {
  outline: 2px solid hsl(var(--ring));
  outline-offset: 2px;
}`,
      },
      {
        type: "p",
        text: "For a keyboard user, the focus ring is the cursor. Removing it is exactly as usable as hiding the mouse pointer.",
      },
      {
        type: "p",
        text: "`:focus-visible` is the answer to the objection that motivated the deletion in the first place — it shows the ring for keyboard navigation and not for mouse clicks. That was the entire complaint, and it's been solved for years.",
      },
      { type: "h2", text: "4. Manage focus when the UI changes" },
      {
        type: "p",
        text: "This is the one people miss, because it's invisible if you use a mouse. When a modal opens, focus must move into it, be trapped inside it, and return to the trigger when it closes. Otherwise a keyboard user opens a dialog and their focus is still behind it, tabbing through content they can't see.",
      },
      {
        type: "ul",
        items: [
          "Modal opens → focus the dialog (or its first control). Trap Tab inside. Escape closes.",
          "Modal closes → focus returns to the element that opened it.",
          "Client-side route change → move focus to the new page's `<h1>`, or a skip target.",
          "Content removed → move focus somewhere sensible before removing it, or it lands on `<body>` and context is lost.",
          "Async result arrives → announce it in an `aria-live` region. A spinner that silently becomes a table announces nothing.",
        ],
      },
      {
        type: "p",
        text: "The good news: a headless component library (Radix, Headless UI, Angular CDK) handles dialogs, menus, and comboboxes correctly. Use one. Focus trapping is genuinely fiddly and there's no prize for writing your own.",
      },
      { type: "h2", text: "5. Don't encode meaning in colour alone" },
      {
        type: "p",
        text: "A red border on an invalid field communicates nothing to someone with colour blindness — roughly 1 in 12 men. Pair colour with a second channel: an icon, a text label, a pattern.",
      },
      {
        type: "code",
        lang: "html",
        code: `<input id="ssn" aria-invalid="true" aria-describedby="ssn-error" />
<p id="ssn-error" class="error">
  <AlertCircle aria-hidden="true" />
  Enter a 9-digit number, no dashes.
</p>`,
      },
      {
        type: "p",
        text: "Colour, icon, and text. Also note the error text says what to do — \"Invalid input\" tells the user they failed without telling them how to succeed.",
      },
      { type: "h2", text: "How to check in five minutes" },
      {
        type: "ol",
        items: [
          "Put your mouse away and Tab through the page. Can you reach and operate everything? Can you always see where focus is?",
          "Zoom to 200%. Does anything overlap or get cut off?",
          "Run axe DevTools. It catches contrast, missing labels, and bad ARIA automatically.",
          "Turn on your OS screen reader and listen to one flow. Uncomfortable the first time, permanently clarifying.",
        ],
      },
      {
        type: "p",
        text: "Step 1 alone finds most of it. If you can't complete your app's main flow with a keyboard, nothing else on this list matters yet.",
      },
    ],
  },

  {
    slug: "api-your-frontend-actually-wants",
    title: "Designing an API Your Frontend Actually Wants",
    excerpt:
      "Most frontend complexity is a backend design decision arriving in disguise. What changes when the same person builds both.",
    category: "Full Stack",
    tags: ["API", "Backend", "Full Stack", "Architecture"],
    date: "2026-08-06",
    featured: true,
    content: [
      {
        type: "p",
        text: "The best argument for full-stack work isn't productivity. It's that you stop shipping APIs that are convenient for the database and hostile to the screen.",
      },
      {
        type: "p",
        text: "Most of the ugliest frontend code I've written existed to paper over an API shape. Here are the decisions that cause it.",
      },
      { type: "h2", text: "1. Return what the screen needs, in one request" },
      {
        type: "p",
        text: "A perfectly normalised API forces the client to reassemble the data:",
      },
      {
        type: "code",
        lang: "text",
        code: `GET /orders/123          → { id, userId, items: [itemId, itemId] }
GET /users/456           → { id, name }
GET /items/1             → { id, productId, qty }
GET /products/9          → { id, name, price }`,
      },
      {
        type: "p",
        text: "Four round trips, sequential because each depends on the last, to render one order. On a 200ms mobile connection that's most of a second of pure waiting — and the client now owns joining logic that the database does far better.",
      },
      {
        type: "code",
        lang: "json",
        code: `GET /orders/123
{
  "id": "123",
  "placedAt": "2026-08-01T09:30:00Z",
  "customer": { "id": "456", "name": "Anita R." },
  "items": [
    { "product": "Wireless Mouse", "qty": 2, "unitPrice": 1299 }
  ],
  "total": 2598,
  "status": "shipped"
}`,
      },
      {
        type: "p",
        text: "Purists object that this duplicates data across endpoints. Correct, and worth it. Read endpoints exist to serve views, not to mirror your schema. If you need generality, that's what GraphQL or a `?include=` parameter is for — but a hand-shaped endpoint per major screen is simpler than either and usually enough.",
      },
      { type: "h2", text: "2. Send data in a form the UI can use" },
      {
        type: "ul",
        items: [
          "**Money as integers in the minor unit.** `1299`, not `12.99`. Floats and currency don't mix, and every client will format it differently anyway.",
          "**Dates as ISO 8601 with an offset.** `2026-08-01T09:30:00Z`. Never a pre-formatted string — you've made a locale decision on the server that belongs on the client.",
          "**Enums as stable machine values.** `\"shipped\"`, not `\"Shipped\"` or `2`. The display string is the frontend's problem, and it changes without a deployment.",
          "**Booleans as booleans.** Not `\"Y\"`, not `1`, not `\"true\"`.",
          "**Missing means `null`, consistently.** Not sometimes absent, sometimes `null`, sometimes `\"\"`. Every inconsistency here becomes a defensive check on the client.",
        ],
      },
      { type: "h2", text: "3. Make errors machine-readable" },
      {
        type: "code",
        lang: "json",
        code: `// Useless
{ "error": "Validation failed" }

// Usable
{
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "Some fields need attention.",
    "fields": {
      "email": { "code": "ALREADY_REGISTERED",
                 "message": "This email is already registered." },
      "age":   { "code": "OUT_OF_RANGE", "message": "Must be 18 or older." }
    }
  }
}`,
      },
      {
        type: "p",
        text: "With the second shape, the frontend puts each message under the right field and focuses the first one. With the first, it shows a toast saying \"Validation failed\" and the user has to guess. That's not a frontend deficiency — it's the only thing possible with the information provided.",
      },
      {
        type: "p",
        text: "The `code` matters as much as the `message`. Codes are what you branch on; messages are what you display and translate. Branching on English prose breaks the moment someone improves the wording.",
      },
      { type: "h2", text: "4. Paginate everything that can grow" },
      {
        type: "p",
        text: "Every list endpoint, from day one, even when the table has nine rows. The one that bites is always the one that was obviously small — until one customer imported 40,000 records and the endpoint tried to serialise all of them.",
      },
      {
        type: "p",
        text: "Cursor pagination over offset for anything real-time; offset pagination silently skips and duplicates rows when the underlying data changes between pages.",
      },
      { type: "h2", text: "5. Version before you need to" },
      {
        type: "p",
        text: "`/api/v1/` from the first commit. It costs four characters and it's the difference between shipping a breaking change and coordinating a simultaneous deploy across web, mobile, and whichever integration you forgot about.",
      },
      { type: "h2", text: "6. Share the types" },
      {
        type: "code",
        lang: "ts",
        code: `// generated from the OpenAPI spec — not hand-written twice
import type { Order, OrderStatus } from '@acme/api-types';`,
      },
      {
        type: "p",
        text: "Generate client types from your schema — OpenAPI, tRPC, Prisma, whatever fits your stack. Hand-maintaining a parallel set of interfaces means they drift, and the drift is discovered in production because TypeScript will confidently confirm your incorrect belief about the response shape.",
      },
      { type: "h2", text: "The heuristic" },
      {
        type: "quote",
        text: "If the frontend needs a transformation layer to render your response, the response is wrong.",
      },
      {
        type: "p",
        text: "Some mapping is normal. But when a `mappers/` folder appears and starts growing, that's not frontend architecture — that's a backend design problem with a frontend cost centre, and it'll be paid every time someone builds a new screen.",
      },
    ],
  },

  {
    slug: "backend-skills-better-frontend",
    title: "The Backend Skills That Made Me a Better Frontend Developer",
    excerpt:
      "Four things I learned on the server side that changed how I write client code — and why 'full stack' is about judgement, not a longer skills list.",
    category: "Full Stack",
    tags: ["Full Stack", "Backend", "Databases", "Career"],
    date: "2026-01-24",
    content: [
      {
        type: "p",
        text: "\"Full stack\" is usually described as knowing both sides. In practice, the value isn't the second skill set — it's that you stop making decisions on one side that are expensive on the other, because you can see the whole cost.",
      },
      {
        type: "p",
        text: "Four specific things changed how I write frontend code.",
      },
      { type: "h2", text: "1. Understanding the N+1 query" },
      {
        type: "p",
        text: "The frontend asks for a list of projects. Each row shows the owner's name. The backend fetches 50 projects, then runs one query per project to get its owner. 51 queries for one screen.",
      },
      {
        type: "p",
        text: "Before I'd written any backend code, this was invisible to me. The endpoint was just slow, and slow endpoints were somebody else's problem. Now I recognise the shape from the frontend side — a list where each row shows data from a related entity is an N+1 waiting to happen, and I ask about it during design instead of filing a performance ticket in month three.",
      },
      {
        type: "p",
        text: "It also changed what I ask for. \"Give me the owner name on the project object\" instead of \"give me owner IDs and I'll fetch them\" — which is the same N+1, moved to the client where it's worse.",
      },
      { type: "h2", text: "2. Knowing what an index does" },
      {
        type: "p",
        text: "I once built a filter panel with eight filters, any combination allowed, over a table with two million rows. It was elegant. It was also unindexable — every combination is a different query plan, and you can't index for all of them.",
      },
      {
        type: "p",
        text: "Knowing this changes the design conversation. Now I'd ask which filters people actually combine, index those paths, and make the rare combinations explicitly slower with a clear loading state rather than pretending everything is equally cheap. That's a *product* decision, and it can only be made by someone who knows both the query cost and the user need.",
      },
      { type: "h2", text: "3. Caching layers and where truth lives" },
      {
        type: "p",
        text: "A frontend cache, a CDN, an application cache, and the database all hold a version of the same data, and they disagree. Once you've debugged \"the user updated their name and it changed in three places but not the fourth,\" you design differently.",
      },
      {
        type: "ul",
        items: [
          "You invalidate deliberately rather than hoping a TTL covers it.",
          "You know which data can be stale for a minute and which absolutely cannot, and you set `staleTime` per query accordingly instead of globally.",
          "You stop hand-patching client caches on mutation and start invalidating, because the server may have computed fields you can't reproduce.",
        ],
      },
      { type: "h2", text: "4. Authorisation is not a frontend concern" },
      {
        type: "p",
        text: "Hiding the delete button for non-admins is a UX affordance. It is not security. The endpoint has to check, every time, regardless of what the UI shows.",
      },
      {
        type: "p",
        text: "Obvious when stated. But before I'd built an API, my mental model of a permission was \"which components render\" — and that model produces apps where the button is hidden and the endpoint is wide open to anyone who opens the network tab.",
      },
      {
        type: "p",
        text: "The corollary that matters day to day: never send data to the client that the user isn't allowed to see, even if you don't render it. A filtered-out record in a JSON response is a data breach with extra steps.",
      },
      { type: "h2", text: "What full stack doesn't mean" },
      {
        type: "p",
        text: "It doesn't mean equally expert at both. I'm a frontend developer who is competent on the backend — I can design a schema, write the API, and reason about query performance, and I'd want a specialist for database tuning at scale or a serious infrastructure design.",
      },
      {
        type: "p",
        text: "It also doesn't mean one person should build everything. The advantage is in the conversation: being able to say \"that endpoint shape will cost us three round trips, can we denormalise the response?\" and have it be a two-minute discussion rather than two sprints of ticket ping-pong.",
      },
      { type: "h2", text: "If you want to pick it up" },
      {
        type: "p",
        text: "Not a course. Build one small thing end to end, with a real database — not an ORM you never look behind. Postgres, a schema you designed, queries you wrote. Then deploy it and watch it be slow.",
      },
      {
        type: "p",
        text: "The slowness is the lesson. Everything I've listed here I learned from something being slow or wrong in a way I didn't expect, and none of it would have stuck from reading about it.",
      },
    ],
  },
];
