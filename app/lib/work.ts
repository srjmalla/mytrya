export type Fact = { k: string; v: string };
export type Decision = { heading: string; body: string[] };
export type Ladder = { caption: string; head: [string, string]; rows: [string, string][] };

export type Work = {
  slug: string;
  name: string;
  /** One sentence for cards and the index. */
  line: string;
  /** Answer-first summary. Stands alone if quoted. */
  summary: string;
  origin: "Client work" | "Own product";
  status: string;
  year: string;
  stack: string;
  url?: string;
  /** Path under /public, when a real screenshot exists. */
  image?: { src: string; alt: string; width: number; height: number };
  facts: Fact[];
  problem: string[];
  diagram: { alt: string; art: string };
  built: string[];
  decisions: Decision[];
  ladder?: Ladder;
  /** What is and isn't shown, and why. */
  disclosure: string;
  metaDescription: string;
};

export const WORK: Work[] = [
  {
    slug: "jetta",
    name: "Jetta",
    line: "An AI agent that works a Freshdesk queue end to end",
    summary:
      "Jetta is an AI support agent that holds a named seat in a B2B software company's Freshdesk, answers tickets from the company's own documentation, takes actions in FastSpring billing and the monday.com dev board, and escalates to a person when it can't ground an answer.",
    origin: "Client work",
    status: "In production",
    year: "2026",
    stack: "Next.js 16 · AI SDK v6 · Upstash Vector · Claude",
    facts: [
      { k: "Client", v: "A B2B SaaS vendor, two products, one Freshdesk desk. Not named." },
      { k: "Runtime", v: "Next.js 16 App Router on Vercel Fluid Compute" },
      { k: "Model", v: "Claude Sonnet in production, Gemini 2.5 Pro in development" },
      { k: "Retrieval", v: "Upstash Vector over the knowledge base, keyword fallback" },
      { k: "State", v: "Upstash Redis: idempotency, outcomes, follow-up queue" },
      { k: "Tools", v: "13, across Freshdesk, FastSpring, monday.com and Slack" },
      { k: "Steps", v: "Up to 10 per ticket" },
      { k: "Follow-up", v: "24 hours after every reply" },
    ],
    problem: [
      "Most tickets on this desk were answerable from documentation that already existed. A person still had to read the ticket, find the article, write the reply in the right voice, log what happened and check back a day later.",
      "The brief was an agent that does the whole loop, not a chat widget that answers questions.",
    ],
    diagram: {
      alt: "Freshdesk webhook enters buildContext, which feeds a multi-step agent loop with thirteen tools, then records the outcome and schedules a 24-hour follow-up.",
      art: `  Freshdesk / Freshchat webhook
        │   shared secret · Redis idempotency key
        ▼
  buildContext()      ticket · conversation · FastSpring account
        │             linked monday.com items · inferred product
        ▼
  runAgentLoop()      up to 10 steps
        │             persona and decision rules in the prompt,
        │             versioned in source
        ├──▶ 13 tools   Freshdesk · FastSpring · monday.com · Slack
        ▼
  recordOutcome()     resolved · escalated · reopened · gap list
        │
        └──▶ followUp()   +24h   customer replied → re-run
                                 silence        → close`,
    },
    built: [
      "The webhook handler dedupes on a Redis key, so a retried Freshdesk event can't produce two replies.",
      "buildContext() assembles the ticket, the full conversation, the FastSpring account and any linked monday.com dev items before the model sees anything.",
      "The agent loop runs up to 10 steps with 13 tools: read ticket, search KB, reply, private note, close; look up account, invoice, discount, cancel; search or create dev items, extend trial; escalate to Slack.",
      "Every run is recorded. A daily job re-reads each answered ticket 24 hours later: if the customer replied, the agent runs again; if not, it posts a closing note and resolves.",
      "An ops console runs any ticket in dry-run and shows the full tool trace, manages the knowledge base, and shows outcomes and the gap list.",
    ],
    decisions: [
      {
        heading: "How it decides to answer or to escalate",
        body: [
          "Product specifics, meaning steps, settings and limits, have to come from an article the agent retrieved, and the reply includes that article's URL. If retrieval returns nothing relevant, the agent escalates to Slack and leaves a private note on the ticket. It does not approximate.",
          "Tickets it couldn't answer go onto a gap list. The gap list is the queue of what to document next. New articles are indexed into retrieval, so the same question is answerable the next time it arrives.",
        ],
      },
      {
        heading: "How it's kept from doing damage",
        body: [
          "Dry-run is the default. An admin route replays any ticket and prints every tool call the agent would make, without writing anywhere.",
          "A STUB_MODE switch makes every external client return canned data. Each integration also has its own live flag, so Freshdesk, FastSpring and monday.com went live on separate days against real traffic while the others stayed stubbed.",
          "Ticket IDs and account IDs come from the assembled context, never from model output. A hallucinated ID has nowhere to go.",
        ],
      },
      {
        heading: "What customers never see",
        body: [
          "Links to internal dev items and notes about how the work is tracked go into private notes on the ticket. Customer replies don't carry them. That separation is enforced in the tool layer, not requested in the prompt.",
        ],
      },
    ],
    disclosure:
      "The client isn't named. The architecture, tool list and safety rules are described as built. Ticket volumes and deflection rates belong to the client and aren't published here.",
    metaDescription:
      "Case study: an AI support agent with 13 tools across Freshdesk, FastSpring, monday.com and Slack, grounded replies only, dry-run by default, 24-hour follow-up. Built by Mytrya.",
  },

  {
    slug: "nepse-copilot",
    name: "NEPSE Copilot",
    line: "A portfolio and research tool for the Nepal Stock Exchange that grades its own calls",
    summary:
      "NEPSE Copilot is a private portfolio and research tool for the Nepal Stock Exchange. It ingests market data on a measured schedule, scores trade ideas on how much evidence supports them, and then records what the market did 5, 10 and 20 days later to grade its own scores.",
    origin: "Own product",
    status: "Live, private",
    year: "2026",
    stack: "Next.js 16 · Neon Postgres · AI SDK v7 · Gemini",
    url: "https://nepse.mytrya.com",
    facts: [
      { k: "For", v: "My family. Private, behind a login." },
      { k: "Data", v: "Paced scrapers, broker exports, filings, news" },
      { k: "Store", v: "Neon Postgres with Drizzle" },
      { k: "Models", v: "Gemini directly, plus a roster through OpenRouter" },
      { k: "Delivery", v: "Web, Telegram, email, live voice session" },
      { k: "Jobs", v: "Morning, intraday, evening, floorsheet, weekly, model evaluation" },
    ],
    problem: [
      "Retail investors on NEPSE work from broker screenshots and group chats. The daily floorsheet is public and almost nobody processes it.",
      "Nothing tracked positions, made trades searchable, or separated a signal with evidence behind it from one somebody remembered. So I built it.",
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
    built: [
      "Ingest from several sources, each with its own client, sharing a single pacing gate.",
      "Signals (RSI bands, moving-average crosses, relative strength), a market regime classifier, and a backtest module that scores each strategy against a plain market baseline.",
      "A conviction score per idea, a forward scoreboard that grades it, and a reliability page that shows the results.",
      "Delivery over the web app, a Telegram bot, email summaries and a live voice session with tool access to holdings and orders.",
      "Six scheduled jobs, including one that evaluates candidate models against each other.",
    ],
    decisions: [
      {
        heading: "A score for how much evidence there is, not for whether you'll win",
        body: [
          "Conviction is a 0 to 100 score. The comment in the source defines it as not a prediction of success. It adds up backtested hit rate and edge, sample size, how many independent signals agree, liquidity, whether the model agrees, and whether the position fits the portfolio. A buy into a scrip that's already heavy in the portfolio loses points.",
          "A scoreboard job records the actual return 5, 10 and 20 trading days after every signal, and grades each score band against what happened. Moves beyond a day's circuit limit are treated as bonus or rights adjustments, not returns, so a corporate action can't look like a good call.",
          "The reliability page puts each strategy next to a plain market baseline, at several thresholds, including the ones that underperform it.",
        ],
      },
      {
        heading: "Treating the data source as temporary",
        body: [
          "The main JSON source is undocumented, with no stability contract. I measured it on 1 September 2026: bursts of about 4 requests return 429, 1 request per second sustained is clean, and page size caps at 500. Every caller shares one pacing gate built to those numbers.",
          "Each caller keeps its older scraper as a fallback, and treats an unexpected response shape as an outage rather than as data.",
        ],
      },
      {
        heading: "Picking models by measurement",
        body: [
          "A scheduled job runs a roster of Gemini and OpenRouter models over identical inputs and keeps every result, including rows for models since retired, so the choice has a history.",
          "One model was dropped on 7 September 2026 because its median call took 259 seconds and its maximum 295, which is most of a 300-second function budget.",
        ],
      },
    ],
    disclosure:
      "My own tool. It's live but behind a login because it holds my family's holdings. The link goes to the sign-in page.",
    metaDescription:
      "Case study: a stock research tool for the Nepal Stock Exchange with an evidence score that grades itself against 5, 10 and 20-day outcomes, measured rate limits, and a model bake-off on a cron. Built by Mytrya.",
  },

  {
    slug: "support-intelligence",
    name: "Support Intelligence",
    line: "A morning read of a support desk for people who don't read tickets",
    summary:
      "Support Intelligence is a dashboard that pulls the previous day's Freshdesk tickets each morning, computes the counts and resolution times in code, and asks Gemini to name the recurring issues and what they mean for product, sales, marketing and operations.",
    origin: "Client work",
    status: "In production",
    year: "2025",
    stack: "Next.js · Gemini 2.5 Flash · Redis",
    facts: [
      { k: "Client", v: "The same B2B SaaS vendor as Jetta" },
      { k: "Source", v: "Freshdesk REST API v2" },
      { k: "Model", v: "Gemini 2.5 Flash" },
      { k: "Cache", v: "Redis Cloud, one TTL per window" },
      { k: "Schedule", v: "Daily cron at 08:00 Kathmandu" },
      { k: "Size", v: "One page, one API route, one cron route" },
    ],
    problem: [
      "Leadership wanted to know what support was hearing about the product. Reading the tickets is the only reliable way to find out, and nobody had the hours.",
      "Ticket-count reports already existed. They answer a different question.",
    ],
    diagram: {
      alt: "A dashboard request checks Redis, joins any in-flight fetch, pulls and enriches Freshdesk tickets under per-window caps, computes statistics in code, sends at most 200 tickets to Gemini, then caches the report.",
      art: `  browser ──▶ GET /api/analyze?window=24h
                   │
                   ├─ cached and fresh?  ──▶ return it
                   ├─ already in flight? ──▶ join that fetch
                   ▼
              Freshdesk v2    open · resolved · closed
                   │          enrich for resolved_at   cap 50 / 20 / 10
                   │          last customer message    cap 50 / 100 / 50
                   ▼
              statistics computed in code
                   │          total · open · unassigned · median hours
                   ▼
              Gemini          ≤ 200 tickets → clusters, insights
                   ▼
              Redis, TTL ──▶ JSON`,
    },
    built: [
      "Fetches open and pending tickets from the list endpoint, and resolved and closed tickets from the search endpoint for the window.",
      "Enriches resolved tickets with their resolution timestamp, because the search endpoint omits it, under a cap that depends on the window.",
      "Pulls the last customer message per ticket, open tickets first, under a second cap.",
      "Detects the product from a custom field with a regex fallback, computes the statistics, and sends up to 200 tickets to Gemini for clusters and insights.",
      "Caches the report in Redis with a TTL, and a cron at 08:00 Kathmandu warms it before anyone opens the page.",
    ],
    decisions: [
      {
        heading: "What the model is and isn't asked to do",
        body: [
          "Totals, open counts, unassigned counts and median resolution time are computed in code. The model reads the tickets and names clusters and implications. It is never asked for a number.",
          "A model asked for arithmetic returns a plausible figure that drifts a little each run, and nothing in the output shows which run was wrong.",
        ],
      },
      {
        heading: "Keeping the cost flat",
        body: [
          "Each window caps the expensive steps: 50, 20 and 10 tickets enriched for resolution time across the 24-hour, 7-day and 30-day views; 50, 100 and 50 conversations fetched. Open tickets are fetched first, so the cap cuts the least useful end.",
          "Concurrent requests for the same window join one in-flight fetch. Three people opening the page at 9am cost one fetch.",
        ],
      },
    ],
    disclosure:
      "Same client as Jetta, not named. The dashboard is internal and isn't linked.",
    metaDescription:
      "Case study: a daily support-desk dashboard where the numbers are computed in code and Gemini only names the recurring issues, with per-window caps and request coalescing. Built by Mytrya.",
  },

  {
    slug: "offscript",
    name: "offScript",
    line: "A rehearsal partner for actors that reads every role except yours",
    summary:
      "offScript is a rehearsal tool for actors. You paste or upload a script, it reads every role except yours out loud, listens while you deliver your lines, and tells you afterwards which lines you don't know yet.",
    origin: "Own product",
    status: "Live",
    year: "2026",
    stack: "Next.js · browser speech recognition · script parsing",
    url: "https://offscript.mytrya.com",
    image: {
      src: "/work/offscript.png",
      alt: "offScript home page: a dark stage-lit interface inviting the actor to paste or upload a script.",
      width: 1440,
      height: 900,
    },
    facts: [
      { k: "Input", v: "PDF, Final Draft (.fdx), Fountain, Markdown, plain text" },
      { k: "Listening", v: "Browser speech recognition, matched against the expected line" },
      { k: "Speaking", v: "Cast per scene, one voice per character" },
      { k: "Modes", v: "Verbatim scene work, presentation, improvised pitch and interview" },
      { k: "Tests", v: "Cue engine, parser, segmentation, import, storage" },
      { k: "Needs", v: "Chrome or Edge, and headphones" },
    ],
    problem: [
      "Rehearsing alone means reading both parts, so you learn your cue lines instead of your own.",
      "A general voice assistant doesn't work either. It waits about 700 milliseconds of silence and then talks. In a scene, a pause is often the point.",
    ],
    diagram: {
      alt: "A script is parsed locally, segmented on its own headings, cast once per scene, given delivery notes in windows, then run by matching the live transcript against the expected line.",
      art: `  script in ──▶ parsed in the browser
                    │    PDF is the exception: glyph positions
                    │    need a server-side engine
                    ▼
               segment()     the script's own headings first;
                    │        otherwise cut where a character who
                    │        hasn't spoken recently comes in
                    ▼        ceiling of 120 lines per scene
              scene opened ──▶ cast once      ──▶ delivery notes
                    │            from a few          in 45-line
                    │            lines each          windows, saved
                    ▼                                as each finishes
               run ──▶ match the live transcript against the
                       expected line, not against a silence timer`,
    },
    built: [
      "Parsers for five script formats. Text formats are read in the browser; only PDF goes to the server.",
      "A segmenter that finds scenes from the script's own headings, with strict rules, and falls back to cutting on a returning character.",
      "A cue engine that compares the live transcript to the expected line and decides when to speak.",
      "Casting once per scene, delivery notes generated in 45-line windows, and a post-run report of which lines were and weren't delivered.",
      "Local storage for scripts and progress. Tests for the cue engine, parser, segmentation, import and storage.",
    ],
    decisions: [
      {
        heading: "How it knows when to speak",
        body: [
          "The engine measures two things. Coverage is how much of the expected line was heard. Progress is how far into the line the furthest matched word sits. They answer different questions: 60% coverage can mean you're mid-line taking a beat, or that you finished and the recogniser dropped words.",
          "The wait before the partner speaks is a ladder, not a single timeout. It only interrupts instantly when it heard the actual final word.",
        ],
      },
      {
        heading: "Why importing a full screenplay costs nothing",
        body: [
          "Scenes come from the script's own headings: sluglines, act and scene markers, Fountain sections. Reading those is exact and free. The heading rules are strict, because a missed heading merges two scenes while a false one cuts a scene in half and names it after a line of dialogue.",
          "Where a script has no headings, lines are cut into runs of about 60 at the point a character who hasn't spoken recently comes in. No scene exceeds 120 lines.",
          "Importing a 40-scene feature makes zero model requests. Casting runs once when a scene is opened, from a few lines per character. Delivery notes are written in 45-line windows and saved as each finishes, because an over-long request doesn't fail, it comes back truncated with the last lines missing their notes.",
        ],
      },
      {
        heading: "PDFs",
        body: [
          "A PDF has no lines, only glyphs at coordinates. Lines are rebuilt from position. Page numbers, (CONTINUED) and (MORE) are stripped, because left in they land inside a speech you're about to memorise. A scanned PDF with no text layer is reported as a scan, not imported as an empty script.",
        ],
      },
    ],
    ladder: {
      caption: "How long the partner waits before taking its cue",
      head: ["Wait", "What it heard"],
      rows: [
        ["instant", "clean delivery: enough coverage, and the final word"],
        ["500 ms", "enough coverage, final word clipped by the recogniser"],
        ["900 ms", "reached the end, middle mangled"],
        ["1400 ms", "most of the line, and reached its end, then silence"],
        ["4000 ms", "you said something, and stopped"],
        ["8000 ms", "nothing heard at all"],
      ],
    },
    disclosure:
      "My own product, live at offscript.mytrya.com. From the project notes: it stays on book so you can get off book.",
    metaDescription:
      "Case study: an AI scene partner that matches the live transcript against the expected line instead of waiting for silence, imports a full screenplay with zero model requests, and rebuilds lines from PDF glyph positions. Built by Mytrya.",
  },

  {
    slug: "community-signal",
    name: "Community Signal",
    line: "Two small internal tools that each replaced a weekly manual task",
    summary:
      "Community Signal is a pair of internal tools for the same client as Jetta: a Python miner that finds forum posts where people describe a problem the client's products solve, and a Next.js dashboard that summarises the marketing team's monday.com board.",
    origin: "Client work",
    status: "Internal",
    year: "2025",
    stack: "Python · SQLite · Claude / Next.js · monday.com GraphQL · Gemini",
    facts: [
      { k: "Client", v: "The same B2B SaaS vendor as Jetta" },
      { k: "Miner", v: "Python, SQLite, the forum's Bettermode API, Claude" },
      { k: "Analyser", v: "Next.js, monday.com GraphQL, Gemini, Recharts" },
      { k: "Run as", v: "CLI: scrape, analyze, export, stats, or run for all three" },
      { k: "Output", v: "A scored CSV of posts worth replying to, and a board dashboard" },
    ],
    problem: [
      "Two questions came up every week. Where are people publicly describing a problem one of our products already solves? What is the marketing team actually working on right now?",
      "Both were answerable by hand. Both were answered late.",
    ],
    diagram: {
      alt: "Forum posts are matched against a keyword index, scored, deduplicated in SQLite, analysed only where unanalysed, and exported above a score threshold.",
      art: `  forum API ──▶ keyword index    phrase in title  2 points
                     │              phrase in body   1 point
                     │              below 2: no reply drafted
                     ▼
                  SQLite      deduplicated by post id,
                     │        so a rerun costs nothing
                     ▼
                  Claude      over unanalysed rows only
                     ▼
                  CSV         score ≥ 6`,
    },
    built: [
      "A scraper over the forum's Bettermode API, five pages of 50 posts per target space per run.",
      "A hand-written keyword index mapping the exact phrases people type to the product that solves it and the page that explains how.",
      "Scoring, SQLite storage with dedupe by post ID, a Claude analysis pass over unanalysed rows, and a CSV export above a threshold.",
      "Separately, a dashboard that pulls the marketing board over GraphQL, filters to active assignees, ages the Done column to 15 days, flags overdue items and asks Gemini for a summary.",
    ],
    decisions: [
      {
        heading: "A keyword index, not semantic search",
        body: [
          "The index is a list of the phrases people actually type when they have the problem: connect boards, email to board, sync data between boards. Each maps to the product and the specific page that answers it. A match is already a reply with a link.",
          "Scoring is blunt on purpose: 2 points for a phrase in the title, 1 in the body. Nothing is drafted below 2, and only posts scoring 6 or more are exported. The tool's job is to be quiet.",
        ],
      },
      {
        heading: "Cheap to run twice",
        body: [
          "Posts are deduplicated by ID on write, and the analysis pass reads only rows it hasn't seen. Rerunning the whole pipeline costs almost nothing, which is what makes it something you run when you wonder, rather than a job you schedule and then stop trusting.",
        ],
      },
    ],
    disclosure:
      "Same client as Jetta, not named. Neither tool is complex. Each replaced about an hour of someone's week.",
    metaDescription:
      "Case study: a forum-mining tool with a hand-built keyword index and blunt scoring, plus a monday.com board dashboard, each replacing a weekly manual task. Built by Mytrya.",
  },
];

export function getWork(slug: string) {
  return WORK.find((w) => w.slug === slug);
}
