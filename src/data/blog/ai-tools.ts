import type { BlogPost } from "./types";

export const aiToolsPosts: BlogPost[] = [
  {
    slug: "how-i-use-claude-code",
    title: "How I Actually Use Claude Code Day to Day",
    excerpt:
      "Not the demo workflow. The unglamorous, high-leverage things a terminal agent is genuinely good at once you stop asking it to write your app for you.",
    category: "AI & Tools",
    tags: ["Claude Code", "AI", "Workflow", "Productivity"],
    date: "2026-08-09",
    featured: true,
    content: [
      {
        type: "p",
        text: "The demos show someone typing \"build me a SaaS dashboard\" and getting an app. That's not what the tool is good at, and chasing that is how people conclude it's overhated or overhyped depending on their mood that week.",
      },
      {
        type: "p",
        text: "Here's what it's actually good at, ranked by how much time it saves me.",
      },
      { type: "h2", text: "1. Understanding code I didn't write" },
      {
        type: "p",
        text: "This is the biggest one and nobody talks about it. Dropped into an unfamiliar codebase, my first three questions used to take an afternoon of grepping.",
      },
      {
        type: "code",
        lang: "text",
        code: `> How does authentication work in this app? Trace it from the login
  request to where the session is checked on a protected route.`,
      },
      {
        type: "p",
        text: "It reads the actual files and answers with real paths and line numbers, which I then verify. Ninety seconds instead of ninety minutes. The verification step is not optional — but verifying a specific claim against a specific file is enormously faster than finding the file in the first place.",
      },
      { type: "h2", text: "2. Mechanical refactors across many files" },
      {
        type: "p",
        text: "Renaming a concept across 40 files. Converting a component tree from NgModules to standalone. Migrating a deprecated API call. Work that's tedious, low-judgement, and error-prone precisely because it's boring.",
      },
      {
        type: "p",
        text: "The important part is scoping the request narrowly enough to review the diff. \"Migrate the whole app\" produces a diff nobody reads honestly. \"Migrate the components in `features/payroll` and stop\" produces one I can actually check.",
      },
      { type: "h2", text: "3. The first draft of tests" },
      {
        type: "p",
        text: "I don't ship AI-written tests unread — a test that asserts the current behaviour is worthless if the current behaviour is the bug. But a first pass that covers the obvious paths, sets up the fixtures, and gets the mocking boilerplate right saves the part of testing I actively dislike, and leaves me to write the edge cases that matter.",
      },
      { type: "h2", text: "4. Debugging with real evidence" },
      {
        type: "p",
        text: "The thing that makes a terminal agent different from a chat window is that it can run commands. Paste a stack trace and it can read the file, check git history for when the line changed, run the failing test, and add a log statement to check a hypothesis.",
      },
      {
        type: "code",
        lang: "text",
        code: `> This test fails only in CI, never locally. Read the test, check the
  CI config, and tell me what differs between the two environments.`,
      },
      {
        type: "p",
        text: "That was a timezone difference. It found it in one pass because it could read both the test and the workflow file, which is exactly the kind of cross-file correlation I'm slow at.",
      },
      { type: "h2", text: "What I don't use it for" },
      {
        type: "ul",
        items: [
          "**Architecture decisions.** It'll give you a reasonable-sounding answer to \"should we use microservices\" without knowing your team size, your ops maturity, or your deadline. It's not that the answer is wrong — it's that it can't know the things that decide it.",
          "**Anything touching money, auth, or personal data without close review.** Not because it's careless, but because the cost of being wrong is asymmetric and review is cheap.",
          "**Greenfield code where I don't yet know what I want.** If I can't describe it precisely, I'll get something precise that isn't it, and editing that is slower than writing it.",
        ],
      },
      { type: "h2", text: "The habits that made the difference" },
      { type: "h3", text: "Plan before executing on anything non-trivial" },
      {
        type: "p",
        text: "Ask for the plan first, read it, correct the two things that are wrong, then let it run. Reviewing a plan takes thirty seconds. Reviewing a 600-line diff built on a wrong assumption takes twenty minutes and usually ends in a revert.",
      },
      { type: "h3", text: "One task per session" },
      {
        type: "p",
        text: "Long sessions that drift across three unrelated tasks produce worse output — context fills with irrelevant history and the model starts pattern-matching on the wrong thing. Finish, clear, start fresh. This is the single easiest habit to adopt and it improves results immediately.",
      },
      { type: "h3", text: "Make it verify its own work" },
      {
        type: "p",
        text: "\"Run the tests and the linter, and fix what fails\" as part of the original request. Otherwise you're the build server, and you'll find the type error after you've context-switched away.",
      },
      { type: "h3", text: "Say what you don't want" },
      {
        type: "p",
        text: "Negative constraints are underrated. \"Don't add dependencies.\" \"Don't touch the API layer.\" \"Don't add comments explaining what the code obviously does.\" These prevent the specific things I'd otherwise spend the review deleting.",
      },
      { type: "h2", text: "The honest accounting" },
      {
        type: "p",
        text: "It hasn't made me write twice as much code. It's compressed the parts of the job that were never the interesting part — reading unfamiliar code, mechanical migrations, boilerplate, the first draft of tests, remembering the exact `ffmpeg` flags.",
      },
      {
        type: "p",
        text: "The design work, deciding what to build, and knowing when something is wrong: unchanged. Those were always the job. Everything else was the tax.",
      },
    ],
  },

  {
    slug: "cursor-vs-claude-code",
    title: "Cursor vs Claude Code: Which One I Reach For, and When",
    excerpt:
      "They're not competitors so much as different shapes. One lives in the editor, one lives in the terminal, and the shape decides the use case.",
    category: "AI & Tools",
    tags: ["Cursor", "Claude Code", "AI", "Tooling"],
    date: "2026-07-04",
    content: [
      {
        type: "p",
        text: "I use both, most days. Not because I'm indecisive — because they're good at genuinely different things, and the difference comes down to where they sit.",
      },
      { type: "h2", text: "The structural difference" },
      {
        type: "p",
        text: "Cursor is an editor. Its context is your cursor position, the open file, the selection, the files you `@`-mention. It's built around the loop of you writing code and it helping.",
      },
      {
        type: "p",
        text: "Claude Code is a terminal agent. Its context is the repository and the shell. It can run the test suite, read git history, hit a CLI, inspect a build output. It's built around the loop of you describing an outcome and it working toward it.",
      },
      {
        type: "quote",
        text: "Cursor makes you faster at writing code. Claude Code does units of work that happen to involve code.",
      },
      { type: "h2", text: "Where Cursor wins clearly" },
      { type: "h3", text: "Tab completion" },
      {
        type: "p",
        text: "This is the underrated feature and the one I'd miss most. Multi-line, edit-aware completion that predicts the next change based on what you just did. Change a type and it offers the corresponding change at the three call sites, in order, each one a Tab away.",
      },
      {
        type: "p",
        text: "It sounds incremental. It isn't — it removes the friction from exactly the kind of small mechanical edit that's too small to describe to an agent but adds up to a large fraction of the day.",
      },
      { type: "h3", text: "Working with visual context" },
      {
        type: "p",
        text: "UI work means looking at the thing. Being in the editor with the browser next to it, selecting the component, and saying \"this spacing is wrong at mobile widths\" is a tighter loop than describing the same problem in a terminal.",
      },
      { type: "h3", text: "Small, local, well-understood edits" },
      {
        type: "p",
        text: "Extract this function. Add error handling here. Convert this to a hook. Anything where I know exactly what I want and it's confined to what's on screen.",
      },
      { type: "h2", text: "Where Claude Code wins clearly" },
      { type: "h3", text: "Anything spanning many files" },
      {
        type: "p",
        text: "\"Find every place we construct a date without a timezone and fix it.\" That requires searching the repo, understanding each call site, and making a judgement per site. Editor-shaped tools have to be fed the files; agent-shaped tools go find them.",
      },
      { type: "h3", text: "Anything requiring a feedback loop" },
      {
        type: "p",
        text: "Making a failing test pass, tracking down a build error, chasing a type error through a chain of generics. The value is that it runs the command, reads the real output, and tries again — evidence rather than inference.",
      },
      { type: "h3", text: "Work I'm not watching" },
      {
        type: "p",
        text: "Give it a well-scoped task, go to a meeting, review the diff after. That only works when the tool can verify itself, which needs the shell.",
      },
      { type: "h3", text: "Git and repository work" },
      {
        type: "p",
        text: "\"Review the diff on this branch.\" \"Why did this line change?\" \"Write the commit message.\" It has git, so this is native rather than approximated.",
      },
      { type: "h2", text: "The rules files both need" },
      {
        type: "p",
        text: "Both support project instructions — `CLAUDE.md` for one, rules files for the other. Both are worth ten minutes of setup and both are routinely skipped.",
      },
      {
        type: "p",
        text: "Without them you re-explain your conventions every session, and the tool defaults to the internet's average practice rather than yours. Which means `any` types, a new utility function that duplicates one you already have, and a stray `console.log`.",
      },
      { type: "h2", text: "My actual split" },
      {
        type: "ul",
        items: [
          "**Cursor** — writing new feature code, UI work, anything where I'm iterating visually, small refactors in a file I have open.",
          "**Claude Code** — cross-cutting refactors, debugging, migrations, understanding unfamiliar code, tests, code review, anything I can describe as an outcome.",
        ],
      },
      {
        type: "p",
        text: "Roughly 60/40 toward Claude Code, and that's shifted over the past year as I've gotten better at scoping tasks. The skill that moved the needle wasn't prompting — it was learning to describe a unit of work precisely enough that verification is possible.",
      },
      { type: "h2", text: "If you're picking one" },
      {
        type: "p",
        text: "If most of your time goes to writing new code in a codebase you know, take Cursor. If most of it goes to maintaining, debugging, or navigating code you didn't write, take Claude Code. And if you're on a team, run a week with each on real tickets — the answer depends far more on your work than on the tools.",
      },
    ],
  },

  {
    slug: "writing-a-claude-md-that-works",
    title: "Writing a CLAUDE.md the Model Actually Follows",
    excerpt:
      "Most project instruction files are wishlists. The ones that work are short, specific, and say what not to do.",
    category: "AI & Tools",
    tags: ["Claude Code", "AI", "Conventions", "Documentation"],
    date: "2026-06-27",
    content: [
      {
        type: "p",
        text: "A project instructions file — `CLAUDE.md`, a rules file, whatever your tool calls it — is the highest-leverage ten minutes in an AI-assisted workflow. Almost everyone either skips it or writes it badly, and badly is closer to skipping than people think.",
      },
      { type: "h2", text: "Why most of them fail" },
      {
        type: "p",
        text: "The typical file reads like this:",
      },
      {
        type: "code",
        lang: "md",
        code: `# Project Guidelines
- Write clean, maintainable code
- Follow best practices
- Use TypeScript
- Make sure the code is well-tested
- Consider performance and accessibility`,
      },
      {
        type: "p",
        text: "Every line is true and none of it is actionable. \"Clean code\" isn't a decision procedure. \"Use TypeScript\" is already evident from the file extensions. Nothing here changes a single output, because none of it distinguishes your project from any other project.",
      },
      {
        type: "quote",
        text: "If a line would be true of every project on GitHub, it's taking up space without doing work.",
      },
      { type: "h2", text: "What belongs in it" },
      { type: "h3", text: "1. Decisions that aren't inferable from the code" },
      {
        type: "code",
        lang: "md",
        code: `- Static export only. No API routes, no server actions, no database.
  If a feature seems to need a backend, propose a static alternative instead.
- All dates are stored UTC, displayed in the user's local timezone.
  Never construct a Date without an explicit timezone.
- Money is stored in paise as an integer. Never use a float for currency.`,
      },
      {
        type: "p",
        text: "These are the ones that pay. They're constraints a reader can't derive by looking at three files, and violating them produces subtly broken code that passes review.",
      },
      { type: "h3", text: "2. Negative constraints — say what not to do" },
      {
        type: "code",
        lang: "md",
        code: `- No new dependencies without asking. We have date-fns; don't add dayjs.
- No Redux, no CSS-in-JS, no UI component library. Build the components.
- Never use localStorage. Everything is React state.
- Don't write tests unless asked.`,
      },
      {
        type: "p",
        text: "Negative constraints work disproportionately well. Positive instructions compete with everything else the model might do; a prohibition removes a branch entirely. Most of my file is prohibitions.",
      },
      { type: "h3", text: "3. Where things go" },
      {
        type: "code",
        lang: "md",
        code: `- Feature code lives in src/features/<feature>/. Features never import
  from each other — promote shared code to src/shared/.
- Domain-agnostic UI primitives only in src/shared/ui/.
  A StatusBadge that knows about invoices belongs in the invoices feature.`,
      },
      {
        type: "p",
        text: "Without this you get correct code in the wrong place, which is the most annoying kind of review comment to write repeatedly.",
      },
      { type: "h3", text: "4. The commands, exactly" },
      {
        type: "code",
        lang: "md",
        code: `- Dev: npm run dev  (port 5173)
- Test one file: npm test -- path/to/file.test.ts
- Lint + typecheck before declaring done: npm run lint && npm run typecheck`,
      },
      {
        type: "p",
        text: "Small thing, saves a wasted turn every session where it guesses `yarn test` and gets an error.",
      },
      { type: "h2", text: "What to leave out" },
      {
        type: "ul",
        items: [
          "**Anything the code already says.** Your dependencies are in `package.json`. Your structure is visible. Don't restate it.",
          "**Generic advice.** \"Write readable code.\" It's already trying.",
          "**A full architecture essay.** Long files get skimmed — by models and by humans. Aim for under 100 lines.",
          "**Anything that will go stale.** A list of every route will be wrong in a month, and a confidently wrong instruction is worse than none.",
        ],
      },
      { type: "h2", text: "Write it from your review comments" },
      {
        type: "p",
        text: "The best source material is the feedback you've actually given. Look at your last twenty code review comments. The ones you've written more than once are exactly what belongs in the file — that repetition is the signal that the convention isn't discoverable from the code.",
      },
      {
        type: "p",
        text: "This is also why the file should be committed and shared. It's not AI configuration; it's your team's conventions written down for the first time. I've had the file be more useful to new human hires than to any model — nobody had ever written down why we don't use `localStorage`, so nobody could follow the rule.",
      },
      { type: "h2", text: "Iterate on it" },
      {
        type: "p",
        text: "When the output is wrong in a way you've corrected before, that's a missing line. Add it. My files grow by one or two lines a week for the first month, then stabilise — which is roughly how long it takes to enumerate the things you knew but had never said out loud.",
      },
    ],
  },

  {
    slug: "ai-code-review-limits",
    title: "AI Code Review: What It Catches, and What It Will Never Catch",
    excerpt:
      "After a few hundred AI-assisted reviews, a clear pattern: it's excellent at local correctness and blind to whether you built the right thing.",
    category: "AI & Tools",
    tags: ["AI", "Code Review", "Quality", "Process"],
    date: "2026-04-30",
    content: [
      {
        type: "p",
        text: "We've had AI review in our pipeline for about a year — running on every PR before a human looks. It's been clearly net positive and it has a sharply defined ceiling. Both halves are worth being precise about.",
      },
      { type: "h2", text: "What it reliably catches" },
      { type: "h3", text: "Unhandled edge cases in code you can see" },
      {
        type: "p",
        text: "Empty arrays, null returns, division by a value that could be zero, a `Promise.all` with no rejection handling, an index that can be `-1`. It's essentially exhaustive about this in a way tired humans are not, and it doesn't get bored on line 400 of a diff.",
      },
      { type: "h3", text: "Async and race conditions" },
      {
        type: "p",
        text: "This is where it has genuinely saved us. Missing `await`, a state update after unmount, a `useEffect` that fires twice, a fetch without cancellation. Bugs that are hard to see, hard to reproduce, and expensive in production.",
      },
      { type: "h3", text: "Inconsistency with the surrounding code" },
      {
        type: "p",
        text: "\"Every other endpoint in this file returns `{ data, error }`; this one throws.\" A human reviewer notices this only if they happen to have the file's conventions loaded. It always has them loaded, because it just read the file.",
      },
      { type: "h3", text: "The security basics" },
      {
        type: "p",
        text: "SQL built by string concatenation, an unescaped user value in a template, a secret in a config file, a missing authorisation check on an endpoint that has one everywhere else. Not a replacement for real security review, but it catches the embarrassing tier reliably.",
      },
      { type: "h2", text: "What it never catches" },
      { type: "h3", text: "Whether the feature is right" },
      {
        type: "p",
        text: "It will review a perfectly-implemented feature that solves the wrong problem and find nothing wrong. It has no access to the customer conversation, the support ticket that prompted it, or the fact that we tried this two years ago and it confused everyone.",
      },
      { type: "h3", text: "Whether the abstraction will hold" },
      {
        type: "p",
        text: "\"This is over-engineered for what we need\" and \"this will need to change the moment we add the second payment provider\" are judgements requiring knowledge of a roadmap. It sees the code; the roadmap is in someone's head.",
      },
      { type: "h3", text: "Organisational context" },
      {
        type: "p",
        text: "\"The payments team owns this module — loop them in.\" \"We deliberately duplicated this last quarter; don't re-unify it.\" \"This is deprecated and being deleted next sprint.\" All invisible.",
      },
      { type: "h3", text: "Whether the tests test anything" },
      {
        type: "p",
        text: "It'll confirm tests exist and cover the branches. It's much weaker on whether the assertions are meaningful — a test that mocks the thing under test and asserts the mock was called will often pass review.",
      },
      { type: "h2", text: "The failure mode to watch for" },
      {
        type: "p",
        text: "Not false positives — you learn to dismiss those fast. It's the reviewer who sees a clean AI pass and skims. The AI found nothing, so it's probably fine.",
      },
      {
        type: "p",
        text: "But the AI checked the layer where problems are cheap. The expensive problems — wrong feature, wrong abstraction, wrong team, wrong moment — are exactly what the human was there for. If the tool causes humans to review less carefully, it's a net negative even while every individual comment it makes is correct.",
      },
      { type: "h2", text: "How we set it up" },
      {
        type: "ol",
        items: [
          "AI review runs automatically on PR open, posting inline comments.",
          "The author addresses or dismisses them **before** requesting human review.",
          "Human reviewers are explicitly told to review for design, fit, and consequence — not correctness.",
          "We tune the prompt to skip style entirely. That's the linter's job and duplicate comments train people to ignore all of them.",
        ],
      },
      {
        type: "p",
        text: "Step 3 is the whole thing. Framing it as a division of labour rather than as a first pass keeps the human attention on the layer where it's irreplaceable.",
      },
      {
        type: "p",
        text: "The most useful reframe I've heard: it's not a reviewer, it's a very thorough linter that understands semantics. Excellent at that. Not a substitute for someone who knows why you're building this.",
      },
    ],
  },
];
