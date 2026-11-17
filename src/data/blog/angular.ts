import type { BlogPost } from "./types";

export const angularPosts: BlogPost[] = [
  {
    slug: "angular-signals-in-practice",
    title: "Angular Signals in Practice: Replacing RxJS Boilerplate in a Real Dashboard",
    excerpt:
      "Signals didn't kill RxJS in our codebase — they killed the ceremony around it. Here's what actually changed when I migrated a live HRM dashboard.",
    category: "Angular",
    tags: ["Angular", "Signals", "RxJS", "State"],
    date: "2026-07-28",
    featured: true,
    content: [
      {
        type: "p",
        text: "The dashboard I inherited had a `BehaviorSubject` for every piece of screen state: filters, pagination, the selected employee, the loading flag. Each one came with a subscription, an `async` pipe, or worse — a manual `unsubscribe()` in `ngOnDestroy` that somebody forgot half the time. The logic wasn't wrong. It was just buried under plumbing.",
      },
      {
        type: "p",
        text: "Signals removed that plumbing. Not the reactivity — the plumbing. That distinction matters, because the loudest takes online frame this as \"Signals vs RxJS\", and that framing led our team down a wrong path for about two weeks.",
      },
      { type: "h2", text: "What the code looked like before" },
      {
        type: "code",
        lang: "ts",
        code: `export class EmployeeListComponent implements OnInit, OnDestroy {
  private search$ = new BehaviorSubject<string>('');
  private page$ = new BehaviorSubject<number>(1);
  employees: Employee[] = [];
  loading = false;
  private destroy$ = new Subject<void>();

  ngOnInit() {
    combineLatest([this.search$, this.page$])
      .pipe(
        tap(() => (this.loading = true)),
        debounceTime(300),
        switchMap(([q, page]) => this.api.list(q, page)),
        takeUntil(this.destroy$),
      )
      .subscribe((res) => {
        this.employees = res.items;
        this.loading = false;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}`,
      },
      {
        type: "p",
        text: "Four fields, two lifecycle hooks, and a `destroy$` subject to express one idea: when the search or the page changes, fetch a list.",
      },
      { type: "h2", text: "What it looks like now" },
      {
        type: "code",
        lang: "ts",
        code: `export class EmployeeListComponent {
  search = signal('');
  page = signal(1);

  private query = computed(() => ({ q: this.search(), page: this.page() }));

  employees = resource({
    request: this.query,
    loader: ({ request }) => this.api.list(request.q, request.page),
  });

  // template: @if (employees.isLoading()) { ... }
}`,
      },
      {
        type: "p",
        text: "No subscription, no teardown, no loading flag I have to remember to flip back to `false` in an error branch. The component reads top-to-bottom as a description of state rather than a sequence of wiring steps.",
      },
      { type: "h2", text: "The rule I settled on" },
      {
        type: "p",
        text: "After migrating about forty components, the split that held up is embarrassingly simple:",
      },
      {
        type: "ul",
        items: [
          "**Signals for state** — anything the template reads. Current filter, selected row, form mode, derived totals. State is a value that exists right now, and a signal is a value that exists right now.",
          "**RxJS for events** — anything that is a stream over time. WebSocket messages, `fromEvent` on window resize, retry-with-backoff, anything needing `debounceTime` or `switchMap` semantics on a genuine sequence.",
          "**`toSignal` at the boundary** — where a stream lands in a component, convert it once and let the rest of the component be signal-based.",
        ],
      },
      {
        type: "quote",
        text: "If you can answer \"what is its value right now?\" it's a signal. If the only honest answer is \"depends when you ask\", it's an observable.",
      },
      { type: "h2", text: "The mistakes I made" },
      {
        type: "h3",
        text: "1. Rewriting working RxJS for the sake of it",
      },
      {
        type: "p",
        text: "We had a notifications pipeline with retry, backoff, and dedupe. I spent a day trying to express it with signals and `effect()`. It was worse in every dimension. I reverted it. Retry and backoff are time-domain problems, and RxJS is a time-domain library.",
      },
      { type: "h3", text: "2. Using `effect()` as a general-purpose watcher" },
      {
        type: "p",
        text: "`effect()` is for synchronising with things outside Angular — logging, the DOM, `localStorage`, a charting library. It is not the place to derive state. Every time I wrote an effect that set another signal, I later replaced it with a `computed`, and the code got shorter each time.",
      },
      {
        type: "code",
        lang: "ts",
        code: `// wrong — an effect that computes
effect(() => this.total.set(this.items().reduce((a, b) => a + b.amount, 0)));

// right — a computed that computes
total = computed(() => this.items().reduce((a, b) => a + b.amount, 0));`,
      },
      { type: "h3", text: "3. Forgetting that signals are equality-checked" },
      {
        type: "p",
        text: "Mutating an array and calling `set()` with the same reference does nothing. This bit us twice in a table component before it became muscle memory to always produce a new reference.",
      },
      { type: "h2", text: "What actually improved" },
      {
        type: "ul",
        items: [
          "Component files shrank by roughly a third — almost entirely lifecycle and teardown code.",
          "Change detection got measurably cheaper: signal reads mark only the components that read them, so `OnPush` correctness stopped being something we had to reason about.",
          "New developers became productive faster. `computed` is a concept you explain in one sentence; `switchMap` versus `mergeMap` is a conversation.",
        ],
      },
      {
        type: "p",
        text: "The thing I'd tell my past self: don't treat this as a migration project. Treat it as a default for new code and a cleanup you do when you're already touching a file. We finished the meaningful 80% that way without ever booking a single \"Signals migration\" ticket.",
      },
    ],
  },

  {
    slug: "angular-standalone-components-restructure",
    title: "Standalone Components: How I Restructured a Large Angular App Without Stopping Feature Work",
    excerpt:
      "NgModules weren't the problem — the dependency graph they hid was. A file-by-file migration path that never needed a code freeze.",
    category: "Angular",
    tags: ["Angular", "Architecture", "Migration"],
    date: "2026-06-19",
    content: [
      {
        type: "p",
        text: "Our app had 31 NgModules. Not one of them was there because someone designed a boundary — they were there because that's what `ng generate` produced in 2021. `SharedModule` imported and exported 40 things, so importing it anywhere pulled in everything, and nobody could tell you what a given component actually depended on.",
      },
      { type: "h2", text: "Why standalone is a real improvement, not a syntax change" },
      {
        type: "p",
        text: "With NgModules, a component's dependencies live in a different file. With standalone components, the `imports` array sits right on the component. That sounds cosmetic until you look at what it enables:",
      },
      {
        type: "ul",
        items: [
          "You can read one file and know everything the component uses.",
          "Tree-shaking gets accurate, because the graph is explicit instead of module-wide.",
          "Lazy loading works at the component level via `loadComponent`, not just the route-module level.",
          "Tests stop needing a `TestBed` module declaration ritual — you import the component itself.",
        ],
      },
      { type: "h2", text: "The migration order that worked" },
      {
        type: "p",
        text: "The official schematic (`ng generate @angular/core:standalone`) does the mechanical work well, but running it across the whole repo at once produces a diff no one can review. I ran it in slices, bottom-up:",
      },
      {
        type: "ol",
        items: [
          "**Leaf components first** — buttons, badges, empty states, anything with no child components of its own. These convert cleanly and merge in a day.",
          "**Directives and pipes next** — same reason, and everything above them depends on them.",
          "**Feature components** — one feature folder per PR, converting the components and adding their explicit `imports`.",
          "**Routes** — swap `loadChildren` for `loadComponent`, deleting the routing module as you go.",
          "**Bootstrap last** — `bootstrapApplication` with `providers`, then delete `AppModule`.",
        ],
      },
      {
        type: "p",
        text: "The critical property of that order: at every point, the app builds and the two styles coexist. A standalone component can be imported by an NgModule, and an NgModule-declared component can be used inside a standalone one via `imports: [SomeModule]`. There was never a moment where feature work had to pause.",
      },
      { type: "h2", text: "Killing SharedModule" },
      {
        type: "p",
        text: "This was the highest-value part and the one people resist. `SharedModule` feels convenient — one import and you have everything. That convenience is exactly the cost: your bundle contains everything too, and every change to it invalidates the build cache for every consumer.",
      },
      {
        type: "p",
        text: "What replaced it was nothing at all. Each component imports the three or four things it actually uses:",
      },
      {
        type: "code",
        lang: "ts",
        code: `@Component({
  selector: 'app-payroll-summary',
  standalone: true,
  imports: [DatePipe, CurrencyPipe, StatusBadgeComponent, RouterLink],
  templateUrl: './payroll-summary.component.html',
})
export class PayrollSummaryComponent { }`,
      },
      {
        type: "p",
        text: "Yes, that's more lines across the codebase. It is also the first time the dependency graph has been true. When we later removed a deprecated badge component, the compiler told us exactly which eleven files used it. Under `SharedModule`, that was a grep and a prayer.",
      },
      { type: "h2", text: "Providers: the one genuine gotcha" },
      {
        type: "p",
        text: "NgModules were doing double duty — declaring components *and* providing services. When you delete the module, the providers need a new home. Three options, in the order I prefer them:",
      },
      {
        type: "ul",
        items: [
          "`providedIn: 'root'` on the service — for anything genuinely app-wide. Tree-shakeable, no config.",
          "Route-level `providers` — for a service scoped to a feature. It's instantiated when the route loads and destroyed when it unloads, which is usually what the old feature-module scoping meant anyway.",
          "Component-level `providers` — for per-instance state, like a form coordinator shared between a parent and its children.",
        ],
      },
      { type: "h2", text: "Results" },
      {
        type: "p",
        text: "Initial bundle dropped 22% — mostly dead code that `SharedModule` had been keeping alive. Cold build time improved noticeably. But the change I actually feel day to day is smaller and harder to measure: I can open any component file and understand it without opening a second one.",
      },
      {
        type: "p",
        text: "If your app is still on NgModules, you don't need permission or a project plan. Convert the next leaf component you touch. In four months you'll be mostly done.",
      },
    ],
  },

  {
    slug: "angular-change-detection-performance",
    title: "Angular Change Detection: OnPush, Zoneless, and What Actually Makes an App Fast",
    excerpt:
      "Most Angular performance problems aren't change detection. But when they are, the fix is rarely the one people reach for first.",
    category: "Angular",
    tags: ["Angular", "Performance", "OnPush", "Zoneless"],
    date: "2026-05-30",
    content: [
      {
        type: "p",
        text: "A client's payroll grid took 1.8 seconds to respond to a keystroke. The first suggestion from the team was `OnPush` everywhere. We tried it. It got faster — to 1.5 seconds. The actual problem was a method call in the template that recomputed a currency total for every one of 900 rows, on every check. `OnPush` reduced how often that happened. It didn't make it cheap.",
      },
      {
        type: "p",
        text: "That's the pattern I keep seeing. Change detection strategy is a multiplier on the cost of your bindings. If the bindings are expensive, you're optimising the wrong term.",
      },
      { type: "h2", text: "Rule 1: never call a function from a template" },
      {
        type: "code",
        lang: "html",
        code: `<!-- runs on every single check, for every row -->
<td>{{ calculateNetPay(row) }}</td>

<!-- computed once per data change -->
<td>{{ row.netPay }}</td>`,
      },
      {
        type: "p",
        text: "Precompute in the component, or use a `computed` signal, or use a pure pipe. A pure pipe is memoised on its inputs; a method call is not memoised on anything. This single rule has fixed more Angular performance complaints for me than every other technique combined.",
      },
      { type: "h2", text: "Rule 2: `track` in `@for` is not optional" },
      {
        type: "p",
        text: "The new control flow requires `track`, which is one of the better decisions the Angular team has made — the old `trackBy` was optional and therefore routinely omitted. Without identity tracking, changing one row destroys and rebuilds every DOM node in the list. With it, one row updates.",
      },
      {
        type: "code",
        lang: "html",
        code: `@for (employee of employees(); track employee.id) {
  <app-employee-row [employee]="employee" />
} @empty {
  <app-empty-state message="No employees match these filters." />
}`,
      },
      {
        type: "p",
        text: "Track by a stable identity, not by index. Tracking by index means the identity changes whenever the list is sorted or filtered, which defeats the purpose entirely.",
      },
      { type: "h2", text: "Rule 3: OnPush is a contract, not a switch" },
      {
        type: "p",
        text: "`OnPush` says: only re-check me when an input reference changes, an event fires inside me, or an `async` pipe emits. It is fast because it does less work. It is also a promise that your component's inputs are immutable — and if you break that promise by mutating an object in place, you get a component that silently shows stale data.",
      },
      {
        type: "p",
        text: "Signals change this calculus significantly. A signal read in a template marks that specific view dirty when it changes, which means `OnPush` correctness stops depending on you being disciplined about references. If you are adopting signals, adopt `OnPush` alongside them — together they're coherent in a way neither is alone.",
      },
      { type: "h2", text: "Zoneless: worth it, with a caveat" },
      {
        type: "p",
        text: "Zone.js patches every async API in the browser to know when to check for changes. It works, and it costs you: a payload on every page load, and change detection runs triggered by things like a `setTimeout` in a third-party analytics script.",
      },
      {
        type: "p",
        text: "Going zoneless with `provideZonelessChangeDetection()` removes that entirely. Change detection then runs only when something explicitly signals a change — a signal write, an `async` pipe emission, or `markForCheck()`.",
      },
      {
        type: "p",
        text: "The caveat: any code that updates state outside those mechanisms stops updating the UI. In practice this means third-party libraries with imperative callbacks — chart libraries, map SDKs, older jQuery-era widgets. Audit those before you flip the flag, and wrap their callbacks so they write to a signal.",
      },
      { type: "h2", text: "The measurement step people skip" },
      {
        type: "p",
        text: "Before changing anything, open Angular DevTools, hit the profiler, and interact with the slow screen. It shows you which components are being checked and how long each takes. Twice now this has told me the slow component wasn't the one anyone suspected — once it was a tooltip directive doing a layout read in a binding.",
      },
      {
        type: "ol",
        items: [
          "Profile first, and write down the number.",
          "Fix the expensive bindings — template method calls, missing `track`, unbounded lists.",
          "Then apply `OnPush` (or signals) to reduce how often the remaining work happens.",
          "Consider zoneless once the app is signal-based.",
          "Profile again and compare to the number you wrote down.",
        ],
      },
      {
        type: "p",
        text: "Steps 1 and 5 are the ones that get skipped, and they're the only two that tell you whether the other three helped.",
      },
    ],
  },

  {
    slug: "angular-reactive-forms-at-scale",
    title: "Angular Reactive Forms at Scale: Typed Controls, Dynamic Fields, and Cross-Field Validation",
    excerpt:
      "A 60-field tax-filing form taught me more about Angular forms than any documentation. What survived the project.",
    category: "Angular",
    tags: ["Angular", "Forms", "TypeScript", "Validation"],
    date: "2026-04-22",
    content: [
      {
        type: "p",
        text: "The US tax-filing platform I worked on had a form with sixty-plus fields, a dozen conditional sections, and validation rules that depended on other fields' values. It was the hardest UI problem on the project — harder than the payments integration. Here is what I'd do again and what I'd never repeat.",
      },
      { type: "h2", text: "Type your forms, and let the compiler earn its keep" },
      {
        type: "p",
        text: "Typed reactive forms turn a whole class of runtime bug into a compile error. `form.get('filerName')` returning `AbstractControl | null` is how you end up with `?.value` sprinkled everywhere and a production error when someone renames a control.",
      },
      {
        type: "code",
        lang: "ts",
        code: `interface FilerForm {
  name: FormControl<string>;
  ssn: FormControl<string>;
  filingStatus: FormControl<'single' | 'joint' | 'separate'>;
  spouse: FormGroup<SpouseForm> | null;
}

private fb = inject(NonNullableFormBuilder);

form = this.fb.group<FilerForm>({
  name: this.fb.control('', Validators.required),
  ssn: this.fb.control('', [Validators.required, ssnValidator]),
  filingStatus: this.fb.control<'single' | 'joint' | 'separate'>('single'),
  spouse: null,
});`,
      },
      {
        type: "p",
        text: "`NonNullableFormBuilder` is the detail worth calling out. By default a reset sets controls to `null`, which is why every value type is `T | null`. Using the non-nullable builder means a reset returns the initial value instead, and your types stop being littered with nulls that can't actually occur in your flow.",
      },
      { type: "h2", text: "Dynamic sections: add and remove controls, don't hide them" },
      {
        type: "p",
        text: "The first version of the spouse section used `*ngIf` on the template and left the controls in the form. That meant hidden required fields blocking submission, and the user staring at a disabled button with no visible error. Every conditional form has this bug at some point.",
      },
      {
        type: "code",
        lang: "ts",
        code: `constructor() {
  this.form.controls.filingStatus.valueChanges
    .pipe(takeUntilDestroyed())
    .subscribe((status) => {
      if (status === 'joint') {
        this.form.setControl('spouse', buildSpouseGroup(this.fb));
      } else {
        this.form.removeControl('spouse');
      }
    });
}`,
      },
      {
        type: "p",
        text: "If a field isn't on screen, it isn't in the form. The form's validity then always matches what the user can see, and \"why is submit disabled\" stops being a support ticket.",
      },
      { type: "h2", text: "Cross-field validation belongs on the group" },
      {
        type: "p",
        text: "A rule involving two fields cannot live on either one of them. Put it on their common parent, where both values are available:",
      },
      {
        type: "code",
        lang: "ts",
        code: `const dependantAgeRule: ValidatorFn = (group) => {
  const { birthDate, claimedAsDependant } = group.value;
  if (!birthDate || !claimedAsDependant) return null;
  return ageOn(birthDate, TAX_YEAR_END) >= 24
    ? { dependantTooOld: { maxAge: 24 } }
    : null;
};`,
      },
      {
        type: "p",
        text: "Return a structured error object, not a message string. The validator's job is to say what's wrong; the template's job is to phrase it for a human. Mixing those means your validation logic can't be unit-tested without asserting on English prose, and it can't be translated.",
      },
      { type: "h2", text: "One error component, everywhere" },
      {
        type: "p",
        text: "Sixty fields means sixty opportunities to phrase an error differently. We built a single component that takes a control and renders the first error from a shared message map, and used it for every field without exception.",
      },
      {
        type: "code",
        lang: "html",
        code: `<app-field label="Social Security Number" [control]="form.controls.ssn">
  <input formControlName="ssn" inputmode="numeric" />
</app-field>`,
      },
      {
        type: "p",
        text: "Consistent spacing, consistent `aria-describedby` wiring, consistent timing on when errors appear (on blur, not on every keystroke — nothing is more hostile than being told your email is invalid while you're typing the third character).",
      },
      { type: "h2", text: "What I'd never repeat" },
      {
        type: "ul",
        items: [
          "**A fully JSON-driven form engine.** We prototyped one. It handled 80% of cases beautifully and made the last 20% nearly impossible, and the last 20% is where the business rules live.",
          "**Validating on every keystroke.** `updateOn: 'blur'` for most fields, `'change'` only where live feedback genuinely helps, like a password strength meter.",
          "**Storing draft state only in the form.** A long form needs to survive a refresh. Serialise `form.getRawValue()` on a debounce and restore it on load.",
          "**Disabling the submit button on invalid.** Let them submit, then focus the first invalid field and explain what's wrong. A disabled button with no explanation is a dead end.",
        ],
      },
      {
        type: "p",
        text: "That last one is a hill I'll die on. Users don't experience a disabled button as \"the form is incomplete\". They experience it as \"the site is broken\".",
      },
    ],
  },

  {
    slug: "angular-performance-checklist",
    title: "The Angular Performance Checklist I Run Before Every Release",
    excerpt:
      "Lazy routes, deferrable views, bundle budgets, and image handling — the concrete list, in the order that pays off fastest.",
    category: "Angular",
    tags: ["Angular", "Performance", "Core Web Vitals", "Build"],
    date: "2026-03-14",
    content: [
      {
        type: "p",
        text: "This is the actual list, in the order I work through it. It's ordered by payoff-per-effort, not by how interesting the technique is.",
      },
      { type: "h2", text: "1. Check the bundle before you guess" },
      {
        type: "code",
        lang: "bash",
        code: `ng build --stats-json
npx esbuild-visualizer --metadata dist/stats.json --open`,
      },
      {
        type: "p",
        text: "Nearly every time I've done this on a codebase for the first time, something absurd shows up. A full `lodash` import for one `debounce`. `moment` with all locales, 300KB, used to format one date. An icon library imported wholesale for six icons. These are ten-minute fixes with enormous returns, and no amount of change-detection tuning competes with deleting 300KB.",
      },
      { type: "h2", text: "2. Set budgets so it can't regress" },
      {
        type: "code",
        lang: "json",
        code: `"budgets": [
  { "type": "initial", "maximumWarning": "500kb", "maximumError": "800kb" },
  { "type": "anyComponentStyle", "maximumWarning": "4kb" }
]`,
      },
      {
        type: "p",
        text: "Fix the bundle, then set the budget just above where you landed, then make the build fail on error in CI. Otherwise you'll do this cleanup again in six months.",
      },
      { type: "h2", text: "3. Lazy-load every route that isn't the landing page" },
      {
        type: "code",
        lang: "ts",
        code: `export const routes: Routes = [
  { path: '', component: DashboardComponent },
  {
    path: 'payroll',
    loadComponent: () => import('./payroll/payroll.component')
      .then((m) => m.PayrollComponent),
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.routes')
      .then((m) => m.ADMIN_ROUTES),
  },
];`,
      },
      {
        type: "p",
        text: "Admin screens are the classic offender — used by 2% of users, shipped to 100% of them. Pair this with `withPreloading(PreloadAllModules)` if you want the routes fetched during idle time after first paint; you get the small initial bundle and instant navigation.",
      },
      { type: "h2", text: "4. Defer what's below the fold" },
      {
        type: "code",
        lang: "html",
        code: `@defer (on viewport) {
  <app-analytics-chart [data]="chartData()" />
} @placeholder (minimum 500ms) {
  <div class="chart-skeleton"></div>
} @loading {
  <app-spinner />
}`,
      },
      {
        type: "p",
        text: "Deferrable views are the highest-leverage Angular feature of the last few releases. A charting library is often the single heaviest dependency in an app, and it's usually rendered in a panel the user has to scroll to. `on viewport` means it downloads when they actually scroll there.",
      },
      {
        type: "p",
        text: "Triggers worth knowing: `on viewport`, `on interaction`, `on hover`, `on idle`, and `on timer`. `on interaction` is perfect for a modal's contents — nobody needs the rich text editor until they click Edit.",
      },
      { type: "h2", text: "5. Use NgOptimizedImage for anything above the fold" },
      {
        type: "code",
        lang: "html",
        code: `<img ngSrc="/hero.jpg" width="1200" height="630" priority alt="Team dashboard" />`,
      },
      {
        type: "p",
        text: "It enforces width and height (killing layout shift), sets `fetchpriority` on `priority` images, lazy-loads the rest, and generates a `srcset`. LCP is usually an image, and this is the cheapest LCP fix available.",
      },
      { type: "h2", text: "6. Virtualise lists over ~100 rows" },
      {
        type: "p",
        text: "The CDK's `cdk-virtual-scroll-viewport` renders only what's visible. Below a hundred rows it's not worth the complexity. Above a thousand, nothing else you do will matter.",
      },
      { type: "h2", text: "7. Self-host fonts and preload one weight" },
      {
        type: "p",
        text: "A Google Fonts stylesheet costs a DNS lookup, a connection, and a render-blocking request before any text appears. Self-host, subset to the characters you use, `font-display: swap`, and preload only the weight in your LCP element.",
      },
      { type: "h2", text: "8. Then, and only then, tune change detection" },
      {
        type: "p",
        text: "Template method calls, missing `track`, `OnPush`, zoneless. These matter — but they matter for interaction latency, not load performance, and load performance is what your users notice first and what Core Web Vitals measures.",
      },
      { type: "h2", text: "The measurement discipline" },
      {
        type: "p",
        text: "Run Lighthouse on the production build, throttled to a mid-range Android on 4G. Not on your laptop, not on `ng serve`. The dev server serves unminified code without production optimisations, and your laptop is roughly ten times faster than the phone half your users hold. A site that feels instant on a MacBook can be genuinely unusable on a three-year-old Android — and you will never discover that from `localhost:4200`.",
      },
    ],
  },
];
