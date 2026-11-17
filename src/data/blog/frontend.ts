import type { BlogPost } from "./types";

export const frontendPosts: BlogPost[] = [
  {
    slug: "react-rerenders-mental-model",
    title: "React Re-renders: The Mental Model That Fixed My Performance Problems",
    excerpt:
      "I spent a year sprinkling useMemo on things. Then I learned what actually triggers a re-render, and deleted most of it.",
    category: "Frontend",
    tags: ["React", "Performance", "Hooks"],
    date: "2026-08-02",
    featured: true,
    content: [
      {
        type: "p",
        text: "For a long time my approach to React performance was superstition. Something felt slow, so I'd wrap a function in `useCallback`, wrap a value in `useMemo`, wrap a component in `memo`, and move on. Sometimes it helped. I couldn't have told you why.",
      },
      {
        type: "p",
        text: "The model that fixed this is four sentences long.",
      },
      { type: "h2", text: "The model" },
      {
        type: "ol",
        items: [
          "A component re-renders when its state changes, when its context value changes, or when its parent re-renders.",
          "That third one is unconditional: a parent rendering re-renders all its children, regardless of whether their props changed.",
          "`memo` breaks rule 2 — a memoised component skips the render if its props are shallowly equal.",
          "Re-rendering is not the same as touching the DOM. React diffs the output; if nothing changed, no DOM work happens.",
        ],
      },
      {
        type: "p",
        text: "Rule 4 is the one that reframes everything. A re-render of a simple component is cheap — it's a function call and an object comparison. Optimising away cheap re-renders is how you end up with a codebase where every function is wrapped in `useCallback` and nothing is measurably faster.",
      },
      { type: "h2", text: "So when does it actually matter?" },
      {
        type: "p",
        text: "Three situations, in my experience:",
      },
      {
        type: "ul",
        items: [
          "**The render itself is expensive.** A chart that computes layout, a table that formats 500 rows, a component running a heavy filter over a large array.",
          "**The subtree is large.** A cheap render times 2,000 components is not cheap.",
          "**The render happens very often.** Anything driven by scroll, mouse move, or a controlled input — 60 times a second turns a 2ms render into a dropped frame.",
        ],
      },
      {
        type: "p",
        text: "If none of those apply, leave it alone. Seriously. The `useMemo` you're about to write costs a dependency array you have to keep correct, and it will drift.",
      },
      { type: "h2", text: "The fix that beats memoisation: move state down" },
      {
        type: "p",
        text: "Most re-render problems are state that lives too high. Here's the shape of it:",
      },
      {
        type: "code",
        lang: "tsx",
        code: `// Every keystroke re-renders the entire dashboard
function Dashboard() {
  const [search, setSearch] = useState('');
  return (
    <>
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
      <ExpensiveChart />
      <HugeTable />
    </>
  );
}`,
      },
      {
        type: "code",
        lang: "tsx",
        code: `// Keystrokes now re-render one small component
function SearchBox() {
  const [search, setSearch] = useState('');
  return <input value={search} onChange={(e) => setSearch(e.target.value)} />;
}

function Dashboard() {
  return (
    <>
      <SearchBox />
      <ExpensiveChart />
      <HugeTable />
    </>
  );
}`,
      },
      {
        type: "p",
        text: "No `memo`, no `useCallback`, no dependency arrays. The state is scoped to what it affects. This is the first thing to try and it works far more often than people expect.",
      },
      { type: "h2", text: "The other structural fix: children as props" },
      {
        type: "p",
        text: "When state genuinely has to live high up, you can still keep expensive subtrees out of the re-render by passing them as `children`. Children are created by the *parent's* parent, so they keep the same element reference across the stateful component's renders:",
      },
      {
        type: "code",
        lang: "tsx",
        code: `function ThemeShell({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState('light');
  return (
    <div className={theme}>
      <ThemeToggle onToggle={setTheme} />
      {children}          {/* unchanged element — not re-rendered */}
    </div>
  );
}

<ThemeShell>
  <ExpensiveChart />
</ThemeShell>`,
      },
      { type: "h2", text: "Context is a broadcast, and that's the catch" },
      {
        type: "p",
        text: "Every consumer of a context re-renders when the context value changes — regardless of `memo`, and regardless of whether it reads the part that changed. Two consequences:",
      },
      {
        type: "ul",
        items: [
          "Never pass a fresh object literal as a provider value. `value={{ user, setUser }}` creates a new object every render and defeats the entire mechanism.",
          "Split contexts by change frequency. A `UserContext` that changes on login and a `MousePositionContext` that changes 60 times a second should not be the same context, no matter how convenient one provider looks.",
        ],
      },
      { type: "h2", text: "The React Compiler changes the arithmetic" },
      {
        type: "p",
        text: "With the compiler enabled, memoisation is inserted automatically at build time — the compiler sees which values are actually reused and wraps them for you. Manual `useMemo`/`useCallback` largely becomes unnecessary.",
      },
      {
        type: "p",
        text: "What it does *not* do is fix architecture. State in the wrong place is still state in the wrong place; a context that broadcasts too widely still broadcasts too widely. The compiler removes the tedious layer of this problem, not the design layer.",
      },
      { type: "h2", text: "Measure with the profiler, not with vibes" },
      {
        type: "p",
        text: "React DevTools has a \"Highlight updates when components render\" setting. Turn it on and use your app for thirty seconds. The components flashing that shouldn't be flashing are your list. That takes half a minute and beats any amount of guessing about where the time goes.",
      },
    ],
  },

  {
    slug: "react-state-without-a-library",
    title: "State Management in React Without a State Management Library",
    excerpt:
      "Most apps reaching for Redux have three kinds of state and are treating all of them the same way. Separate them and the library becomes optional.",
    category: "Frontend",
    tags: ["React", "State", "Architecture", "TanStack Query"],
    date: "2026-07-11",
    content: [
      {
        type: "p",
        text: "I've built apps with Redux, with MobX, with Zustand, and with none of them. The pattern I keep returning to isn't a library choice. It's recognising that \"state\" is three unrelated problems wearing a trench coat.",
      },
      { type: "h2", text: "The three kinds" },
      {
        type: "ul",
        items: [
          "**Server state** — data that lives in a database and is cached in your app. Users, orders, listings. It can go stale, it needs loading and error states, and two tabs can disagree about it.",
          "**URL state** — the current route, filters, pagination, the open tab. State the user expects to survive a refresh and be shareable via a link.",
          "**UI state** — is the dropdown open, what's typed in this input, which step of the wizard. Ephemeral, local, nobody's business but the component's.",
        ],
      },
      {
        type: "p",
        text: "Classic Redux apps put all three in one store, and it's the first category that causes the damage. You end up hand-writing loading flags, error flags, cache invalidation, and refetch logic for every endpoint — reimplementing a caching library, badly, one action creator at a time.",
      },
      { type: "h2", text: "Server state: a query library, not a store" },
      {
        type: "code",
        lang: "tsx",
        code: `function EmployeeList({ page }: { page: number }) {
  const { data, isPending, error } = useQuery({
    queryKey: ['employees', page],
    queryFn: () => api.employees.list(page),
    staleTime: 30_000,
  });

  if (isPending) return <ListSkeleton />;
  if (error) return <ErrorState error={error} onRetry={refetch} />;
  return <Table rows={data.items} />;
}`,
      },
      {
        type: "p",
        text: "Caching, deduplication, background refetch, retry, stale-while-revalidate, and request cancellation — all of it, for free. The equivalent in a hand-rolled store is somewhere between 200 and 2,000 lines depending on how thorough you are, and it will have bugs the library fixed three years ago.",
      },
      {
        type: "p",
        text: "The mental shift is giving up on \"one source of truth in my store.\" The source of truth for server data is the server. Your app holds a cache of it, and a cache has its own semantics — freshness, invalidation, revalidation — that a plain object store doesn't model.",
      },
      { type: "h2", text: "URL state: the router already has it" },
      {
        type: "code",
        lang: "tsx",
        code: `const [params, setParams] = useSearchParams();
const status = params.get('status') ?? 'all';
const page = Number(params.get('page') ?? 1);

const setStatus = (next: string) =>
  setParams((prev) => {
    prev.set('status', next);
    prev.set('page', '1');   // filter change resets pagination
    return prev;
  });`,
      },
      {
        type: "p",
        text: "The payoff isn't code size, it's behaviour. Refresh preserves the view. The back button does what the user means. Someone can paste a link into Slack and their colleague sees the same filtered table. Every one of those is free here and is custom work if the filter lives in a store.",
      },
      {
        type: "p",
        text: "My default rule: if a user would be annoyed to lose it on refresh, it belongs in the URL.",
      },
      { type: "h2", text: "UI state: useState, and stop there" },
      {
        type: "p",
        text: "Dropdown open, hover, uncommitted input, which accordion panel is expanded. `useState` in the component that owns it. Lift it only when a sibling genuinely needs it, and lift it exactly one level — not to the root.",
      },
      { type: "h2", text: "What's left" },
      {
        type: "p",
        text: "After splitting those three, the residue is small: theme, current user, feature flags, maybe a toast queue. Things that are genuinely global and change rarely. Context handles all of it.",
      },
      {
        type: "code",
        lang: "tsx",
        code: `const ThemeContext = createContext<ThemeValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const value = useMemo(() => ({ theme, setTheme }), [theme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
  return ctx;
}
`,
      },
      {
        type: "p",
        text: "That error message matters more than it looks. Without it, a missing provider surfaces as `Cannot read properties of null` somewhere unrelated, and you lose twenty minutes.",
      },
      { type: "h2", text: "When a store is genuinely the right call" },
      {
        type: "p",
        text: "I'm not against state libraries. I reach for Zustand when there's real client-side domain state that isn't server data and isn't URL data — a collaborative editor's document model, a design tool's canvas, a multi-step flow with interdependent computed steps. That's a real category, and hooks alone handle it awkwardly.",
      },
      {
        type: "quote",
        text: "Choose the library after you've named the problem. Choosing it first means every problem gets shaped to fit the tool.",
      },
    ],
  },

  {
    slug: "angular-vs-react-how-i-choose",
    title: "Angular vs React: How I Actually Choose, After Shipping Both in Production",
    excerpt:
      "Not a feature comparison. The three questions I ask about the team and the product before writing a line of code.",
    category: "Frontend",
    tags: ["Angular", "React", "Architecture", "Decisions"],
    date: "2026-06-05",
    featured: true,
    content: [
      {
        type: "p",
        text: "I've shipped production apps in both — an HRM SaaS and a tax-filing platform in Angular, e-commerce and AI tooling in React. People expect me to have a favourite. I have a decision procedure instead, which is more useful.",
      },
      { type: "h2", text: "The actual difference" },
      {
        type: "p",
        text: "Angular is a framework: routing, HTTP, forms, DI, testing, and a CLI, all decided for you by one team that keeps them in sync. React is a library: it renders UI, and every other decision is yours.",
      },
      {
        type: "p",
        text: "Everything else — signals versus hooks, RxJS versus promises, decorators versus functions — follows from that one difference. And which is better depends entirely on whether you want those decisions or not.",
      },
      { type: "h2", text: "Question 1: how long will this app live?" },
      {
        type: "p",
        text: "This is the one I weight most heavily. An app maintained for five years by rotating teams has different needs than one shipped in six weeks by two people.",
      },
      {
        type: "p",
        text: "Angular's version-to-version upgrades are handled by `ng update`, which runs schematics that rewrite your code for breaking changes. I have upgraded apps across four major versions in an afternoon. The React ecosystem has no equivalent — upgrading means coordinating a router, a state library, a form library, and a data-fetching library that each version independently and occasionally disagree.",
      },
      {
        type: "p",
        text: "For long-lived enterprise software, that's decisive. The 2029 version of your React app depends on choices made in 2026 by libraries that may be unmaintained by then.",
      },
      { type: "h2", text: "Question 2: how large and how senior is the team?" },
      {
        type: "p",
        text: "Angular's opinionated structure is a floor. Ten developers who've never met will write broadly similar Angular. The CLI generates the same file layout, DI is the only way to share services, and there's one obvious way to do most things.",
      },
      {
        type: "p",
        text: "React gives you a ceiling instead of a floor. A strong team builds something better-fitted than Angular would allow. A weaker or more distributed team produces four different data-fetching patterns and three folder conventions in the same repo.",
      },
      {
        type: "quote",
        text: "Angular raises the floor. React raises the ceiling. Which you need depends on whether your risk is bad code or constrained code.",
      },
      { type: "h2", text: "Question 3: what does the product actually do?" },
      {
        type: "p",
        text: "Some products lean hard one way:",
      },
      {
        type: "ul",
        items: [
          "**Data-heavy internal tools** — dense forms, tables, role-based views, long-lived. Angular. Typed reactive forms alone justify it; expressing a 60-field conditional form in React means picking a form library and building the validation architecture yourself.",
          "**Content and marketing sites** — SEO, fast first paint, static generation. React, via Next.js or Astro. Angular's SSR story is real now but the ecosystem depth isn't comparable.",
          "**Products with a mobile app** — React, for React Native. Shared types, shared logic, shared people.",
          "**Highly custom interactive UI** — canvas tools, editors, visualisations. React. Fewer framework opinions to fight when your rendering needs are unusual.",
        ],
      },
      { type: "h2", text: "Things that should not be in the decision" },
      {
        type: "ul",
        items: [
          "**Bundle size.** Modern Angular with standalone components and deferrable views is competitive. A React app with five ecosystem libraries often isn't smaller.",
          "**\"React is more popular.\"** Popularity affects hiring, which is real — but it doesn't make code easier to maintain, and Angular hiring is not hard in the markets I work in.",
          "**Which one you personally enjoy more.** You will not be the only person maintaining this.",
          "**Benchmark numbers.** Both are fast enough. Your performance problems will be N+1 queries, unoptimised images, and 900-row tables — not the framework.",
        ],
      },
      { type: "h2", text: "How they've converged" },
      {
        type: "p",
        text: "Worth noting how much the gap has closed. Angular signals and React hooks now express the same ideas with different syntax. Standalone components made Angular feel closer to composing functions. Both do SSR, both do fine-grained reactivity, both are moving toward compilers doing the optimisation work.",
      },
      {
        type: "p",
        text: "Which means the honest answer to \"which should we use\" is increasingly: whichever your team already knows. A team fluent in one will out-ship the same team learning the other, and the framework difference won't be the thing that decides whether the product succeeds.",
      },
    ],
  },

  {
    slug: "data-fetching-patterns-that-scale",
    title: "Data Fetching Patterns That Survive Contact With Production",
    excerpt:
      "useEffect + fetch works in a tutorial. Here's every way it breaks in a real app, and what to do instead.",
    category: "Frontend",
    tags: ["React", "TanStack Query", "API", "Error Handling"],
    date: "2026-05-08",
    content: [
      {
        type: "p",
        text: "Every React tutorial teaches this pattern. Every production codebase eventually discovers it's wrong in about six different ways.",
      },
      {
        type: "code",
        lang: "tsx",
        code: `useEffect(() => {
  setLoading(true);
  fetch(\`/api/users/\${userId}\`)
    .then((r) => r.json())
    .then(setUser)
    .finally(() => setLoading(false));
}, [userId]);`,
      },
      { type: "h2", text: "What's broken" },
      {
        type: "ol",
        items: [
          "**No error handling.** A rejected promise here becomes an unhandled rejection and a component stuck loading forever.",
          "**`fetch` doesn't reject on 4xx/5xx.** A 500 response resolves fine, `.json()` fails on the HTML error page, and your catch block reports a JSON parse error instead of a server error.",
          "**Race condition.** Change `userId` quickly and responses can arrive out of order. The user sees data for the wrong record — silently, with no error anywhere.",
          "**No cleanup.** Navigate away mid-flight and you set state on an unmounted component.",
          "**No caching.** Navigate back and it refetches, showing a spinner for data it had thirty seconds ago.",
          "**Duplicate requests.** Three components needing the same user fire three requests.",
        ],
      },
      { type: "h2", text: "Fixing it by hand" },
      {
        type: "code",
        lang: "tsx",
        code: `useEffect(() => {
  const controller = new AbortController();
  setState({ status: 'loading' });

  (async () => {
    try {
      const res = await fetch(\`/api/users/\${userId}\`, { signal: controller.signal });
      if (!res.ok) throw new ApiError(res.status, await res.text());
      setState({ status: 'success', data: await res.json() });
    } catch (err) {
      if (err.name === 'AbortError') return;
      setState({ status: 'error', error: err });
    }
  })();

  return () => controller.abort();
}, [userId]);`,
      },
      {
        type: "p",
        text: "That fixes the first four. It's also fifteen lines for one endpoint, and it still has no cache and no deduplication. Multiply by forty endpoints and you have a data layer nobody owns.",
      },
      { type: "h2", text: "Use a query library" },
      {
        type: "p",
        text: "TanStack Query in React, `resource` or a query wrapper in Angular. This isn't a preference; the problems above are genuinely hard and genuinely solved.",
      },
      {
        type: "code",
        lang: "tsx",
        code: `export const userQuery = (id: string) => ({
  queryKey: ['user', id] as const,
  queryFn: ({ signal }) => api.users.get(id, { signal }),
  staleTime: 60_000,
});

function UserProfile({ id }: { id: string }) {
  const { data, isPending, error } = useQuery(userQuery(id));
  // ...
}`,
      },
      {
        type: "p",
        text: "Extracting the query options into a factory is worth doing from day one. Prefetching on hover, invalidating after a mutation, and using it in a loader all become one-liners that reference the same key, and you never get the class of bug where two call sites spell a query key differently.",
      },
      { type: "h2", text: "Mutations: invalidate, don't hand-patch" },
      {
        type: "code",
        lang: "tsx",
        code: `const updateUser = useMutation({
  mutationFn: api.users.update,
  onSuccess: (updated) => {
    queryClient.setQueryData(['user', updated.id], updated);
    queryClient.invalidateQueries({ queryKey: ['users'] });
  },
});`,
      },
      {
        type: "p",
        text: "Two operations with different intents. `setQueryData` writes the response you already have into the detail cache — no refetch needed. `invalidateQueries` marks the *list* stale, because the server may have derived fields you can't compute on the client. Trying to hand-patch a list is exactly how a client-side cache drifts from the database.",
      },
      { type: "h2", text: "Optimistic updates: only where you can be confident" },
      {
        type: "p",
        text: "Optimistic updates are excellent for toggles and reorders — actions that essentially never fail and where the latency is the whole experience. They're a poor fit for anything with real server-side validation, because the rollback is jarring and the error arrives after the user has moved on.",
      },
      { type: "h2", text: "Errors are a design problem, not a try/catch problem" },
      {
        type: "p",
        text: "Three distinct failure modes deserve three distinct treatments:",
      },
      {
        type: "ul",
        items: [
          "**Network failure** — \"Couldn't reach the server. Check your connection.\" with a retry button. Retry automatically once or twice first.",
          "**4xx** — the request was wrong. Show the server's validation message next to the offending field. Never retry.",
          "**5xx** — our fault. Apologise, offer retry, and log it with enough context to debug.",
        ],
      },
      {
        type: "p",
        text: "A single \"Something went wrong\" for all three is the frontend equivalent of `catch (e) {}`. It tells the user nothing, and it tells you nothing when they report it.",
      },
      { type: "h2", text: "One more: don't fetch in a waterfall" },
      {
        type: "p",
        text: "A parent fetching a user, then rendering a child that fetches their orders, then rendering a grandchild that fetches order items — three sequential round trips, each waiting for the last. On a 200ms connection that's 600ms of pure latency before anything is visible. Fetch in parallel at the route level, or prefetch on the link hover, and the whole screen fills at once.",
      },
    ],
  },

  {
    slug: "frontend-folder-structure",
    title: "The Frontend Folder Structure That Survived Three Rewrites",
    excerpt:
      "Organise by feature, not by file type. Sounds obvious; almost nobody does it, and the cost compounds quietly.",
    category: "Frontend",
    tags: ["Architecture", "React", "Angular", "Maintainability"],
    date: "2026-02-18",
    content: [
      {
        type: "p",
        text: "Every framework tutorial ships the same layout: `components/`, `services/`, `utils/`, `types/`. It's fine for twelve files. At two hundred, it means every feature is smeared across five directories and no directory tells you anything about what the app does.",
      },
      { type: "h2", text: "The tell" },
      {
        type: "p",
        text: "Open a codebase and look at the top-level folders. If they're `components`, `hooks`, `services`, `types`, you're looking at an app organised by what things *are*. You can't tell whether it's a hospital system or a shopping cart.",
      },
      {
        type: "p",
        text: "Now consider the practical version of that cost. A ticket says \"change how invoice due dates are calculated.\" Where do you look? `services/invoice.service.ts`, probably. Also `utils/date.ts`. Also `components/InvoiceRow.tsx`. Also `types/invoice.ts`. Four folders, and you found them by memory or by grep, not by structure.",
      },
      { type: "h2", text: "What I use instead" },
      {
        type: "code",
        lang: "text",
        code: `src/
  features/
    invoices/
      components/       # only used inside invoices
      api.ts            # every invoice endpoint
      types.ts
      utils.ts
      hooks.ts
      index.ts          # the public surface
    employees/
    payroll/
  shared/
    ui/                 # Button, Input, Dialog — no domain knowledge
    lib/                # formatDate, cn, http client
    hooks/
  app/
    routes.tsx
    providers.tsx`,
      },
      {
        type: "p",
        text: "Now the invoice ticket is one folder. Everything about invoices is inside it. The change is reviewable, the blast radius is visible, and a new developer can be told \"you own invoices\" and it means something.",
      },
      { type: "h2", text: "The two rules that keep it honest" },
      { type: "h3", text: "Rule 1: features import from shared, never from each other" },
      {
        type: "p",
        text: "The moment `features/payroll` imports from `features/employees/components/EmployeeAvatar`, the boundary is gone and you're back to a tangle with extra folders. When two features need the same thing, promote it to `shared/`.",
      },
      {
        type: "p",
        text: "Enforce this with lint rules rather than good intentions — `import/no-restricted-paths` in ESLint, or Angular's `@nx/enforce-module-boundaries` if you're in an Nx workspace. A rule that isn't enforced isn't a rule, it's a preference, and preferences lose to deadlines.",
      },
      { type: "h3", text: "Rule 2: an index.ts is a public API" },
      {
        type: "code",
        lang: "ts",
        code: `// features/invoices/index.ts
export { InvoiceList } from './components/InvoiceList';
export { useInvoices } from './hooks';
export type { Invoice, InvoiceStatus } from './types';
// InvoiceRow, calculateTax, and the raw API client stay private`,
      },
      {
        type: "p",
        text: "Anything not exported is an implementation detail you can refactor freely. This is what makes the structure hold up over time: the surface area you must not break is explicit and small, and everything else is yours to change.",
      },
      { type: "h2", text: "What belongs in shared/ui" },
      {
        type: "p",
        text: "One test: does it know anything about your domain? A `Button` doesn't. An `InvoiceStatusBadge` does — it knows invoices have statuses and which colours they map to. That belongs in the feature, even though it's visually generic.",
      },
      {
        type: "p",
        text: "This is where most \"shared component libraries\" rot. Someone puts `InvoiceStatusBadge` in `shared/ui`, then another feature needs a slightly different status set, and the component grows a `variant` prop, then a `mode` prop, and eighteen months later it's a 300-line component with a config object that nobody can safely modify.",
      },
      { type: "h2", text: "Colocate tests, styles, and stories" },
      {
        type: "p",
        text: "`InvoiceList.tsx`, `InvoiceList.test.tsx`, `InvoiceList.stories.tsx` — same directory. A parallel `__tests__/` tree that mirrors your source tree is pure overhead: renaming a component means editing two paths, and moving a feature means moving two subtrees that must stay in sync.",
      },
      { type: "h2", text: "Don't do this on day one" },
      {
        type: "p",
        text: "For the first few weeks of a project, flat is genuinely better. You don't know what the features are yet, and inventing boundaries before you understand the domain produces worse boundaries than inventing none.",
      },
      {
        type: "p",
        text: "The signal to restructure is when you notice you're scrolling to find files, or when a code review touches five directories to do one thing. That's usually somewhere around 30–50 components. Restructure then, when the domain has told you what the seams are.",
      },
    ],
  },
];
