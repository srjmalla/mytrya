export type SpecRow = { k: string; v: string };
export type Note = { heading: string; body: string[] };
export type Ladder = { caption: string; head: [string, string]; rows: [string, string][] };

export type System = {
  n: string;
  slug: string;
  name: string;
  /** One line for the index table. */
  line: string;
  origin: "Client work" | "Own product";
  status: string;
  year: string;
  /** Condensed stack for the index table. */
  stack: string;
  /** Public URL, where there is one to show. */
  url?: string;
  spec: SpecRow[];
  problem: string[];
  diagram: { alt: string; art: string };
  notes: Note[];
  ladder?: Ladder;
};

export const SYSTEMS: System[] = [
  {
    n: "01",
    slug: "jetta",
    name: "Jetta",
    line: "Autonomous support agent living inside a helpdesk",
    origin: "Client work",
    status: "In production",
    year: "2026",
    stack: "Next.js 16 · AI SDK v6 · Upstash Vector",
    spec: [
      { k: "For", v: "A B2B SaaS vendor — two products, one Freshdesk desk" },
      { k: "Runtime", v: "Next.js 16 App Router on Vercel Fluid Compute" },
      { k: "Model", v: "Claude Sonnet in production, Gemini 2.5 Pro in development" },
      { k: "State", v: "Upstash Redis — idempotency, outcomes, follow-up queue" },
      { k: "Retrieval", v: "Upstash Vector over the knowledge base, keyword fallback" },
      { k: "Tools", v: "13 — helpdesk, billing, project tracker, Slack" },
      { k: "Scope", v: "Triage, answer, escalate, follow up, close" },
    ],
    problem: [
      "Most tickets on a mature support desk are answered out of documentation that already exists. A person still has to read the ticket, find the article, write the reply in the right voice, log what happened, and remember to check back in a day. It is high-volume, low-judgement work — right up to the moment it isn't.",
      "The brief was not a chat widget. It was an agent that holds a named seat in the helpdesk and owns the whole lifecycle of a ticket, handing over to a human only where judgement is genuinely required.",
    ],
    diagram: {
      alt: "Webhook enters buildContext, which feeds a multi-step agent loop with thirteen tools, then records the outcome and schedules a 24-hour follow-up.",
      art: `  helpdesk webhook
        │   shared secret · Redis idempotency dedupe
        ▼
  buildContext()      ticket · conversation · billing account
        │             linked dev items · inferred product
        ▼
  runAgentLoop()      multi-step tool loop, max 10 steps
        │             persona and decision rules live in the
        │             prompt, versioned in source
        ├──▶ 13 tools   desk · billing · tracker · Slack
        ▼
  recordOutcome()     deflection · tool mix · gap list
        │
        └──▶ followUp()   +24h   replied → re-run
                                 silent  → close`,
    },
    notes: [
      {
        heading: "Grounded, or escalated",
        body: [
          "Product specifics — steps, settings, limits — may only come from a retrieved article, and the reply carries its URL. When retrieval returns nothing the agent escalates rather than approximating. A confident wrong answer costs more than a slow right one, and it costs it twice: once to the customer, once to every future answer they don't trust.",
          "The rest of the design falls out of that rule. Tickets the agent could not ground become a gap list. The gap list is the queue of what to document next. New documentation goes back into retrieval, and the next ticket of that shape is answerable. The system's failures are its own backlog.",
        ],
      },
      {
        heading: "Dry by default",
        body: [
          "Any ticket can be replayed through an admin route that prints the complete tool trace and writes nothing anywhere. That is the default; writing is the flag you have to set.",
          "A master stub switch returns canned data from every external client, with per-integration live flags on top, so the helpdesk, billing and tracker connections went live one at a time against real traffic instead of all at once on a launch date.",
          "Ticket identifiers and account handles are read from assembled context, never from model output. A hallucinated id therefore cannot address a real customer — it has nowhere to go.",
        ],
      },
      {
        heading: "What stays internal",
        body: [
          "Internal tracker links and the mechanics of how work is logged never appear in a customer reply; they go into private notes on the ticket. The separation is enforced at the tool boundary rather than requested in the prompt.",
        ],
      },
    ],
  },

  {
    n: "02",
    slug: "nepse-copilot",
    name: "NEPSE Copilot",
    line: "Research, portfolio and signal tooling for the Nepal Stock Exchange",
    origin: "Own product",
    status: "Live",
    year: "2026",
    stack: "Next.js 16 · Neon · AI SDK v7 · Gemini",
    url: "https://nepse.mytrya.com",
    spec: [
      { k: "Surface", v: "Holdings, floorsheet, smart money, IPOs, sectors, research, alerts, paper trading, chat, voice" },
      { k: "Data", v: "Paced scrapers, broker exports, filings, news" },
      { k: "Store", v: "Neon Postgres with Drizzle" },
      { k: "Models", v: "Gemini direct, plus a roster through OpenRouter" },
      { k: "Delivery", v: "Web, Telegram, email, live voice session" },
      { k: "Scheduled", v: "Morning, intraday, evening, floorsheet, weekly, model evaluation" },
    ],
    problem: [
      "Retail investors on a small exchange work from broker screenshots, group chats and a daily floorsheet that nobody reads to the end. The data is public and almost entirely unprocessed. Everything a larger market takes for granted — position tracking, a searchable trade record, a way to tell a real signal from a remembered one — has to be built before it can be used.",
    ],
    diagram: {
      alt: "Paced scrapers and broker exports load Postgres, which feeds signals and backtests, which produce a conviction score surfaced on web, Telegram and voice; a scoreboard grades every signal after 5, 10 and 20 days and recalibrates the score.",
      art: `  paced scrapers ─┐    1 req/s shared gate, fallback per source
  broker exports ─┼──▶  Postgres  ──▶  signals · regime
  filings, news  ─┘                    backtest · relative strength
                                              │
                                              ▼
                                       conviction  0–100
                                              │
              ┌───────────────┬───────────────┤
              ▼               ▼               ▼
           web UI          Telegram      voice session

  scoreboard ──▶ records the real return at +5 / +10 / +20 days
             └─▶ grades each conviction band against what happened`,
    },
    notes: [
      {
        heading: "A score that refuses to predict",
        body: [
          "Conviction is a 0–100 evidence score, and the source says plainly what it is not: it is not a prediction of success. It answers a narrower question — how much measured evidence sits behind this idea. Backtested hit rate and edge, sample size, how many independent signals agree, liquidity, whether the model agrees, whether it fits the portfolio you already hold. A buy into a position that is already heavy loses points for that alone.",
          "The number is then held to account. A forward scoreboard records the actual return 5, 10 and 20 trading days after every signal and grades each score band against what really happened, so the meter is calibrated by its own history rather than by the confidence of whoever wrote it. Daily moves beyond the day's circuit limit are treated as bonus and rights adjustments, not as returns, because otherwise a corporate action reads as a spectacular call.",
          "A reliability page puts the strategies — oversold bands, moving-average crosses — against a plain market baseline, at several thresholds, and shows the ones that lose to it.",
        ],
      },
      {
        heading: "Assume the source disappears",
        body: [
          "Much of the data comes from an undocumented JSON endpoint with no stability contract. Rather than hope, its limits were probed and measured: bursts of about four requests return 429, one request per second sustained is clean, page size caps at 500. Every caller in the process shares one pacing gate built to those numbers.",
          "Each caller also keeps its older, slower scraper as a fallback, and treats any surprise in the response shape as this source is gone for now rather than as data. The failure mode of a market tool that guesses at a malformed row is worse than the failure mode of one that goes quiet.",
        ],
      },
      {
        heading: "Model choice is a measurement",
        body: [
          "A scheduled evaluation runs a roster of candidate models from two providers over identical inputs and keeps the results, including rows for models since retired, so the choice has a history. One model was dropped on evidence rather than taste: a median 259 seconds per call, with a maximum of 295, meant a single call could consume an entire function timeout.",
        ],
      },
    ],
  },

  {
    n: "03",
    slug: "support-intelligence",
    name: "Support Intelligence",
    line: "Daily read of a support desk, for the people who don't read tickets",
    origin: "Client work",
    status: "In production",
    year: "2025",
    stack: "Next.js · Gemini 2.5 Flash · Redis",
    spec: [
      { k: "For", v: "The same vendor as 01" },
      { k: "Source", v: "Freshdesk REST v2" },
      { k: "Model", v: "Gemini 2.5 Flash" },
      { k: "Cache", v: "Redis Cloud, TTL per window" },
      { k: "Schedule", v: "Daily cron, 08:00 Kathmandu" },
      { k: "Size", v: "One page, one API route" },
    ],
    problem: [
      "Leadership wants to know what support is telling them about the product. The only honest way to find out is to read the tickets, and nobody has three hours a morning. The reports that get built instead tend to count tickets, which answers a different question.",
    ],
    diagram: {
      alt: "A dashboard request checks Redis, joins any in-flight fetch, pulls and enriches Freshdesk tickets under per-window caps, computes statistics in code, sends at most 200 tickets to Gemini, then caches the report.",
      art: `  browser ──▶ GET /api/analyze?window=24h
                   │
                   ├─ cached and fresh?  ──▶ return it
                   ├─ already in flight? ──▶ join that fetch
                   ▼
              Freshdesk v2    open · resolved · closed
                   │          enrich for resolved_at   cap 50/20/10
                   │          last customer message    cap 50/100/50
                   ▼
              statistics computed in code
                   │          total · open · unassigned · median
                   ▼
              Gemini          ≤ 200 tickets → clusters, insights
                   ▼
              Redis, TTL ──▶ JSON`,
    },
    notes: [
      {
        heading: "What is not sent to the model",
        body: [
          "Counts, medians and resolution times are computed in code. The model never adds anything up. It reads tickets and does the one thing it is better at than a query: naming the recurring cluster, and saying what it implies for product, sales, marketing and operations.",
          "This is a boundary worth drawing hard. A model asked for arithmetic returns a plausible number that drifts a little each run, and the drift is invisible — nothing in the output looks wrong.",
        ],
      },
      {
        heading: "Bounded everywhere",
        body: [
          "Every expensive step is capped by the window being viewed: enrichment at 50, 20 and 10 tickets, conversation fetches at 50, 100 and 50, model input at 200 tickets. Open tickets are fetched first, so the cap truncates the least interesting end.",
          "Concurrent requests for the same window join a single in-flight fetch rather than each starting their own — the difference between a dashboard three people can open at 9am and one that rate-limits itself the moment it becomes popular. A dashboard that recomputes on every load is a dashboard that gets switched off.",
        ],
      },
    ],
  },

  {
    n: "04",
    slug: "offscript",
    name: "Offscript",
    line: "A scene partner that reads every role but yours",
    origin: "Own product",
    status: "In build",
    year: "2026",
    stack: "Next.js · browser speech · script parsing",
    url: "https://offscript.mytrya.com",
    spec: [
      { k: "Input", v: "PDF, Final Draft, Fountain, Markdown, plain text" },
      { k: "Listening", v: "Browser speech recognition, matched against the expected line" },
      { k: "Speaking", v: "Cast per scene, one voice per character" },
      { k: "Modes", v: "Verbatim scene work, presentation, improvised pitch and interview" },
      { k: "Tested", v: "Cue engine, parser, segmentation, import, storage" },
    ],
    problem: [
      "Rehearsing alone means reading both parts, which quietly teaches you your cue lines instead of your own. A general voice assistant cannot stand in either: it waits for roughly 700 milliseconds of silence and then talks. In a scene, the pause is the acting. An assistant that treats silence as a turn signal will step on every dramatic beat you take.",
    ],
    diagram: {
      alt: "A script is parsed locally, segmented on its own headings, cast once per scene, given delivery notes in windows, then run by matching the live transcript against the expected line.",
      art: `  script in ──▶ parsed in the browser
                    │    pdf is the exception — glyph positions
                    │    need a server-side engine
                    ▼
               segment()     the script's own headings first;
                    │        otherwise cut where a character who
                    │        hasn't spoken returns
                    ▼        ceiling of 120 lines per scene
              scene opened ──▶ cast once      ──▶ delivery notes
                    │            from a few          in 45-line
                    │            lines each          windows, saved
                    ▼                                as they finish
               run ──▶ match the live transcript against the
                       expected line — never against a timer`,
    },
    notes: [
      {
        heading: "The cue ladder",
        body: [
          "Offscript knows the line you are supposed to be delivering, so it watches the transcript against that text rather than against the clock. Two different measurements do the work. Coverage asks how much of the line landed. Progress asks how far into the line the furthest matched word sits — which is a genuinely different question, and the one that separates taking a beat in the middle from finishing and dropping a few words. You can match sixty per cent of a line either way.",
          "So the wait is a ladder rather than a cliff. The more confident the system is that you finished, the sooner it comes in.",
        ],
      },
      {
        heading: "Importing a feature costs nothing",
        body: [
          "Paste a scene and none of this matters. Upload a hundred-page screenplay and it does: a feature is not one rehearsal, it is forty, and every part of the tool that costs money or attention is sized for a single scene.",
          "Scripts already carry their divisions — sluglines, act and scene headings, Fountain sections — and reading them is exact, instant and free, where asking a model to find them would cost the whole document and still be a guess. The heading rules lean strict, because the errors are asymmetric: a missed heading merges two scenes, while a false one cuts a scene in half and names it after a line of dialogue.",
          "The result is that importing a forty-scene feature makes no model requests at all. Casting runs once when a scene is opened. Delivery notes are written in windows of 45 lines and saved window by window, so a rehearsal abandoned halfway keeps what it has. The window exists for a specific reason: an over-long request does not fail, it comes back truncated, and the lines past the cut-off silently end up with no note at all.",
        ],
      },
      {
        heading: "A PDF has no lines",
        body: [
          "It has glyphs at coordinates. Lines are rebuilt from position, and the furniture a script prints on every page — page numbers, continued, more — is dropped. Left in, it appends a stray 12. to the middle of a speech you are about to memorise word for word. A scan with no text layer is reported as a scan, rather than imported as nothing.",
        ],
      },
    ],
    ladder: {
      caption: "How long the partner waits before taking its cue",
      head: ["Wait", "What it heard"],
      rows: [
        ["instant", "clean delivery — enough coverage, and the final word"],
        ["500ms", "enough coverage, final word clipped by the recogniser"],
        ["900ms", "reached the end, middle mangled"],
        ["1400ms", "most of the line and reached its end, then silence"],
        ["4000ms", "you said something, and stopped"],
        ["8000ms", "nothing heard at all"],
      ],
    },
  },

  {
    n: "05",
    slug: "community-signal",
    name: "Community Signal",
    line: "Two small internal tools that each replaced a recurring hour",
    origin: "Client work",
    status: "Internal",
    year: "2025",
    stack: "Python · SQLite · Claude / monday GraphQL · Gemini",
    spec: [
      { k: "For", v: "The same vendor as 01" },
      { k: "Miner", v: "Python, SQLite, community forum API, Claude" },
      { k: "Analyser", v: "Next.js, monday GraphQL, Gemini, Recharts" },
      { k: "Run as", v: "CLI — scrape, analyze, export, stats" },
      { k: "Output", v: "A scored CSV, and a board dashboard" },
    ],
    problem: [
      "Two questions came up every week. Where are people publicly describing a problem one of our products already solves? And what is the marketing team actually working on right now? Both were answerable by hand, and both were answered late.",
    ],
    diagram: {
      alt: "Forum posts are matched against a keyword index, scored, deduplicated in SQLite, analysed only where unanalysed, and exported above a score threshold.",
      art: `  forum API ──▶ keyword index    phrase in title  2 points
                     │              phrase in body   1 point
                     │              below 2 — no reply drafted
                     ▼
                  SQLite      deduplicated by post id,
                     │        so a rerun costs nothing
                     ▼
                  Claude      over unanalysed rows only
                     ▼
                  CSV         score ≥ 6`,
    },
    notes: [
      {
        heading: "The index is the product",
        body: [
          "The miner is not a semantic search. It carries a hand-built index of the exact phrases people type when they have a problem — connect boards, email to board, sync data between boards — each mapped to the product that solves it and the specific page that explains how. A match is therefore already an answer with a link, not a lead to research later.",
          "Scoring is deliberately blunt: two points if the phrase is in the title, one if it is in the body, and nothing is drafted below two. The threshold for export is higher still. The tool's job is to be quiet.",
        ],
      },
      {
        heading: "Cheap to run twice",
        body: [
          "Posts are deduplicated by id on write, and the analysis pass only reads rows it has not seen, so rerunning the whole pipeline costs almost nothing. That is what makes it something you can run on a whim rather than a job you schedule and then distrust.",
          "The board analyser is smaller still: pull the board over GraphQL, keep the active assignees, age the done column to the last fifteen days, flag what is overdue, and let a model summarise the rest.",
          "Neither is impressive engineering. Both took an hour a week off someone's desk, permanently, which is the only measure that matters here.",
        ],
      },
    ],
  },
];

export const PRINCIPLES: { n: string; title: string; body: string }[] = [
  {
    n: "i",
    title: "Dry-run is the default",
    body: "Anything that can write somewhere ships with a mode that shows the entire trace and writes nothing — and that mode is the default. Writing is the flag you set deliberately, on a system you have already watched rehearse.",
  },
  {
    n: "ii",
    title: "Grounded, or quiet",
    body: "An agent may quote what it retrieved and cite where it came from. It may not approximate. When there is nothing to ground an answer in, escalating is the correct output. No answer is recoverable; a confident wrong one is not.",
  },
  {
    n: "iii",
    title: "Arithmetic belongs in code",
    body: "Counts, medians, returns, thresholds — computed where they can be tested, not inside a prompt. A model asked to add up returns a slightly different number every time, and nothing about the wrong one looks wrong.",
  },
  {
    n: "iv",
    title: "Parse what is already structured",
    body: "Scripts have scene headings. Tickets have fields. Boards have columns. Reading the structure is exact, instant and free; asking a model to infer it costs the whole document and still returns a guess.",
  },
  {
    n: "v",
    title: "Cost is a design constraint",
    body: "Windows, caps, shared in-flight requests, and work deferred until somebody actually opens the thing. A system whose bill scales with curiosity gets switched off, and a switched-off system has no benefits at all.",
  },
  {
    n: "vi",
    title: "Assume the source disappears",
    body: "Measure the rate limits rather than guessing them. Keep the slower path that used to work. Treat an unexpected response shape as an outage, never as data — a pipeline that shrugs and carries on is how bad rows reach a customer.",
  },
  {
    n: "vii",
    title: "One integration at a time",
    body: "A master stub switch, then per-integration live flags. Every connection meets production on its own day, against real traffic, with the others still holding canned data.",
  },
];
