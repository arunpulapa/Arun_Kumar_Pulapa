import type { BlogPost } from "./types";

export const productPosts: BlogPost[] = [
  {
    slug: "scoping-a-feature-so-it-ships",
    title: "Scoping a Feature So It Actually Ships",
    excerpt:
      "The feature that took four months was supposed to take three weeks. It wasn't an estimation problem — it was a scoping one.",
    category: "Product",
    tags: ["Product", "Scoping", "Delivery", "Estimation"],
    date: "2026-07-19",
    featured: true,
    content: [
      {
        type: "p",
        text: "We estimated three weeks for a notifications system. It shipped in four months. Nobody was lazy, nothing was technically hard, and the estimate wasn't especially naive. The scope was.",
      },
      {
        type: "p",
        text: "\"Notifications\" is not a feature. It's a category. And a category expands to fill whatever time you give it, because every conversation about it legitimately adds requirements.",
      },
      { type: "h2", text: "How it actually expanded" },
      {
        type: "ol",
        items: [
          "Week 1: in-app notifications. Simple. Building it.",
          "Week 2: \"Obviously email too.\" Fine, that's a template system and a queue.",
          "Week 3: \"Users will want to turn some off.\" That's a preferences model, per type, per channel.",
          "Week 5: \"Some should be digested daily, not sent individually.\" Scheduling and aggregation.",
          "Week 8: \"Admins need to see what was sent.\" A log, and a UI for the log.",
          "Week 12: \"It should respect their timezone.\" Of course it should.",
        ],
      },
      {
        type: "p",
        text: "Every single addition was reasonable. That's what makes this failure mode dangerous — there's never a moment where someone asks for something unreasonable and you can push back.",
      },
      { type: "h2", text: "The question that prevents it" },
      {
        type: "p",
        text: "Before writing anything: **what is the smallest version of this that a real user would be glad to have?**",
      },
      {
        type: "p",
        text: "Not the smallest version that technically works — the smallest version somebody would be genuinely pleased about. For notifications, that was: \"when someone assigns me a task, I get an email.\" One event, one channel, no preferences. Two days of work.",
      },
      {
        type: "p",
        text: "Had we shipped that in week one, we'd have learned in week two that people wanted assignment emails and mostly ignored the rest. We'd have built the preferences system for two notification types instead of eleven. The digest feature — three weeks of work — turned out to be used by roughly nobody.",
      },
      { type: "h2", text: "Writing the scope down as three lists" },
      {
        type: "p",
        text: "For anything bigger than a couple of days, I write this before starting. It takes fifteen minutes and it's the highest-ROI document in my process.",
      },
      {
        type: "code",
        lang: "md",
        code: `## Shipping in v1
- Email when a task is assigned to you
- Unsubscribe link in the footer (legal requirement)

## Explicitly NOT in v1
- In-app notification centre
- Per-type preferences
- Digests
- Any channel other than email

## Assumptions — flag if wrong
- Under 500 emails/day, so no queue needed yet
- Everyone has a verified email (checked: 97% do)`,
      },
      {
        type: "p",
        text: "The middle list is the one that does the work. \"Not in v1\" is very different from \"not doing.\" It converts an argument about the roadmap into a note in a document, and it lets you say yes to the idea and no to the timing in the same breath.",
      },
      {
        type: "p",
        text: "The assumptions list is the second-highest value. Half of scope explosions come from an unexamined assumption turning out false in week three — when it's most expensive to discover.",
      },
      { type: "h2", text: "Vertical slices, not horizontal layers" },
      {
        type: "p",
        text: "The other scoping failure: splitting by layer. \"Sprint 1: the database schema. Sprint 2: the API. Sprint 3: the UI.\" Nothing is demonstrable until sprint 3, and if sprint 1's model is wrong you find out two sprints late.",
      },
      {
        type: "p",
        text: "Slice vertically instead — one narrow path through every layer. Ugly UI, one hardcoded case, no edge cases handled, but end to end and real. You learn everything the layered approach would have taught you, and you learn it in three days instead of six weeks.",
      },
      { type: "h2", text: "The signals that scope is expanding" },
      {
        type: "ul",
        items: [
          "**\"While we're in there…\"** — the single most expensive phrase in software.",
          "**A new noun in the conversation.** Notifications became notification *preferences*, then notification *templates*. Every new noun is a data model, a UI, and a set of edge cases.",
          "**\"It should be configurable.\"** Configurability is a multiplier on scope. Ship a sensible default, wait for someone to actually complain.",
          "**Nobody can demo it yet and it's been two weeks.** If there's nothing to show, the slices are horizontal.",
        ],
      },
      { type: "h2", text: "What I'd tell my past self" },
      {
        type: "p",
        text: "The instinct to build it properly the first time is a good instinct pointed in the wrong direction. \"Properly\" requires knowing what people need, and until it's in front of them you're guessing — expensively, with the confidence that comes from having thought about it a lot.",
      },
      {
        type: "quote",
        text: "You're not choosing between shipping something small and shipping something complete. You're choosing between shipping something small now and finding out in four months that complete was the wrong shape.",
      },
    ],
  },

  {
    slug: "ticket-to-production",
    title: "From Ticket to Production: How I Break Down a Feature",
    excerpt:
      "The hour before you write code decides most of what happens after. What I do in that hour.",
    category: "Product",
    tags: ["Product", "Process", "Engineering", "Delivery"],
    date: "2026-03-27",
    content: [
      {
        type: "p",
        text: "The strongest predictor of whether a feature goes smoothly isn't difficulty. It's whether anyone spent an hour on it before opening the editor. Here's what that hour looks like for me.",
      },
      { type: "h2", text: "Step 1: find the actual request" },
      {
        type: "p",
        text: "Tickets describe solutions. \"Add a CSV export to the reports page.\" Before building that, I want to know what happens after the download.",
      },
      {
        type: "p",
        text: "Asked once, the answer was: \"I open it in Excel and make a pivot table of hours by project, then email it to the client.\" They didn't want a CSV export. They wanted a monthly per-project summary they could send to a client. The CSV was their workaround for us not having that.",
      },
      {
        type: "p",
        text: "We shipped a summary view with a PDF export. Two days instead of one, and it eliminated a recurring manual process rather than automating one step of it.",
      },
      {
        type: "p",
        text: "The question is always some version of: **what will you do with it once you have it?**",
      },
      { type: "h2", text: "Step 2: write the states before the happy path" },
      {
        type: "p",
        text: "Every screen has more states than the design shows, and the ones missing from the mockup are the ones that generate bugs:",
      },
      {
        type: "ul",
        items: [
          "**Empty** — no data yet. What does it say? What's the next action?",
          "**Loading** — skeleton or spinner? Does it block the whole screen or one panel?",
          "**Error** — which errors are possible, and what can the user do about each?",
          "**Partial** — some data loaded, some failed. Extremely common, almost never designed.",
          "**Too much** — 10,000 rows. Does the page survive it?",
          "**Permission** — a viewer sees this. What's hidden versus disabled versus absent?",
        ],
      },
      {
        type: "p",
        text: "Writing these down takes ten minutes and surfaces the questions worth asking a designer *before* they're expensive. It also makes the estimate honest — most underestimates are the happy path estimated accurately and everything else forgotten.",
      },
      { type: "h2", text: "Step 3: draw the data flow" },
      {
        type: "p",
        text: "On paper, badly. Where does the data come from, what shape is it in, where does it get transformed, what does the component finally receive.",
      },
      {
        type: "p",
        text: "This is where you catch the N+1 that would have been a production incident, and where you notice the API returns user IDs but the design shows names — which is a backend conversation you want to have on day one, not on day four when your PR is blocked.",
      },
      { type: "h2", text: "Step 4: cut into shippable pieces" },
      {
        type: "p",
        text: "Each piece should be mergeable on its own without breaking anything. Not \"part 1 of 3 that only works once part 3 lands.\"",
      },
      {
        type: "code",
        lang: "md",
        code: `1. API endpoint + types           (merge, behind nothing)
2. Read-only view, no filters     (merge behind a flag)
3. Filters + pagination           (merge behind the flag)
4. Export action                  (merge behind the flag)
5. Turn the flag on`,
      },
      {
        type: "p",
        text: "Four small reviewable PRs instead of one 1,200-line PR that gets a rubber-stamp approval because nobody has two hours to read it properly.",
      },
      { type: "h2", text: "Step 5: decide what \"done\" means, in writing" },
      {
        type: "p",
        text: "Before starting, not after. Otherwise \"done\" expands during the work and you can't tell whether you're finished.",
      },
      {
        type: "code",
        lang: "md",
        code: `Done when:
- Manager can filter by project and date range and see hours
- Empty, loading, and error states implemented
- Works at 360px
- Keyboard navigable, focus visible
- Loads under 2s with the largest client's data (~40k rows)
- Feature flag on for internal users`,
      },
      {
        type: "p",
        text: "That last-but-one line is the kind of thing that gets discovered in production if it isn't written here. Someone's real dataset is always ten times your test dataset.",
      },
      { type: "h2", text: "The rest of it" },
      {
        type: "p",
        text: "Then you write the code, which is the part everyone thinks is the job. Two habits during:",
      },
      {
        type: "ul",
        items: [
          "**Demo the ugly version early.** Day two, not day nine. Feedback on something real is worth ten times feedback on a description, and it's cheap to act on while nothing is finished.",
          "**Log the surprises as you hit them.** They're the content of your handover, your PR description, and the reason the estimate moved. Reconstructing them on Friday doesn't work.",
        ],
      },
      {
        type: "p",
        text: "None of this is a methodology and none of it needs buy-in. It's an hour of thinking, written down where someone else can read it, and it's the difference between a feature that lands and one that drifts.",
      },
    ],
  },
];
