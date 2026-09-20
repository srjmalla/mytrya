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
    slug: "support-agent-platform",
    name: "Support agent platform",
    line: "An AI support agent across tickets, live chat and a first-party chat widget, with a learning loop",
    summary:
      "A support agent platform for a B2B software vendor with two product brands. One agent works three channels: helpdesk tickets, where it drafts and a person sends; the vendor's live chat; and a chat widget of its own, embedded on the marketing site and inside the client's apps, where it answers visitors directly. It reads the customer's billing account and the dev board before answering, acts through 20 tools, and learns from what the human agents actually send.",
    origin: "Client work",
    status: "In production",
    year: "2026",
    stack: "Next.js 16 · AI SDK v6 · Upstash Redis + Vector · Claude, Gemini, OpenRouter",
    facts: [
      { k: "Client", v: "A B2B software vendor, two brands, one support team. Not named." },
      { k: "Channels", v: "Helpdesk tickets (Freshdesk), vendor live chat (Freshchat), and a first-party chat widget" },
      { k: "Systems", v: "Freshdesk, Freshchat, FastSpring billing, monday.com dev board, Slack, two WordPress sites" },
      { k: "Tools", v: "20, several channel-specific" },
      { k: "Models", v: "Claude in production, Gemini in development, others through OpenRouter; two tiers, standard and light" },
      { k: "Retrieval", v: "Upstash Vector, LLM reranker on the light tier, keyword fallback" },
      { k: "Console", v: "Today, Drafts, Chats, Knowledge base, Evals, Billing approvals, Analytics, System, Testing, Guide" },
      { k: "Scheduled", v: "Follow-up, draft reconciliation, KB sync, daily overview, chat follow-up" },
    ],
    problem: [
      "A support team for two products, a helpdesk, a billing provider and a dev board. Most tickets were answerable from documentation that existed, but a person had to read the ticket, find the article, check the account, check whether engineering already knew, write the reply, and remember to follow up.",
      "Live chat had become a ticket-intake form: almost no one answered chats directly, and unanswered chats turned into tickets anyway. The vendor's own chat AI, the weakest responder, sat in front of the strongest one.",
      "The brief grew from a ticket assistant into the whole front line, with the team's own judgement kept in the loop where it mattered.",
    ],
    diagram: {
      alt: "Three channels feed an intake filter and context assembly, then an agent loop with twenty tools; ticket replies go to a human as drafts, chat replies go out live; a reconcile, judge and distil loop turns human decisions into approved learnings, and unanswered themes become draft knowledge-base articles.",
      art: `  helpdesk tickets ─┐
  vendor live chat ─┼─▶ intake filter ─▶ context ─▶ agent loop, 20 tools
  own chat widget  ─┘   noise out        account · dev board · KB
                                         (vector → rerank → keyword)
            tickets: draft posted as a private note, a person sends
            chat:    answered live, reviewed afterwards

  what the human sent ─▶ reconcile ─▶ blind judge ─▶ distil ─▶ candidate
  vs what was drafted     as-is /       which was      learnings, approved
                          edited /      better, and    by a person before
                          replaced      why            they reach the prompt

  themes with no answer ─▶ knowledge loop ─▶ draft article ─▶ review ─▶ KB`,
    },
    built: [
      "Three run channels sharing one agent loop, one tool layer, one retrieval path and one analytics store. The first-party widget is an iframe with an HMAC-signed session, SSE streaming, file uploads, and an origin allowlist that drives both CORS and the frame-ancestors policy. Session state lives in the parent page, because Safari partitions iframe storage and a conversation that vanished on reload was the first bug.",
      "Draft mode for tickets: the agent's reply is posted as a private note. The human copies, edits, and sends as themselves. If the customer writes again first, the draft is marked superseded and rewritten; a draft nobody acts on expires after two weeks.",
      "20 tools: read the ticket, search the knowledge base, reply, note, close; look up the billing account, fetch an invoice, apply a discount, cancel a subscription; search the dev board, read an item's comments, create an item; request a trial extension or a marketplace discount; escalate to Slack, notify a partner manager; and on the chat channel, save visitor identity, request a human, open a ticket, add to a ticket.",
      "A knowledge base store with a lifecycle: draft, in review, published, archived. Only published articles are in the vector index. Every edit bumps a version and keeps the last 20. A daily sync mirrors two WordPress sites into it, with a guard against mass deletion when a site returns too few pages and a guard against mass creation when it returns a flood.",
      "A Slack interface: the team mentions the agent in the escalation channel to check a ticket, list open tickets, extend a trial, apply a discount, or cancel an account, which needs a second admin to confirm. A direct-message assistant that can only read, by construction.",
      "A console for the team: a morning brief with emerging issues, a drafts audit trail, a chat inbox with settings and an install guide, the knowledge base with review and history, an evals page for approving learnings, a billing approvals queue, analytics with cost per model and an events log, a system page that says what the agent can do right now, and a test playbook.",
    ],
    decisions: [
      {
        heading: "Feedback is read from what people actually did, not asked for",
        body: [
          "The team replies from the helpdesk, not from a console. Of 242 drafts in the first month, exactly one was approved or rejected in the console. So the outcome is read back out of the helpdesk instead: the sent reply is compared to the suggested one and recorded as used as-is, edited, or replaced. Nobody has to rate anything.",
          "Adoption is not quality. A human writing something different is not evidence the draft was worse. Quality is decided separately by a blind judge that sees both replies in alternating order, because a judge always shown the same position develops a position bias. It is only asked why the two diverged when the agent lost, and that question is deliberately not blind, so the reason can name the replies directly.",
          "Judged evaluations go through a distiller that proposes candidate learnings. A person approves them. Only approved learnings are injected into the system prompt.",
        ],
      },
      {
        heading: "Grounded, and stricter where nobody is watching",
        body: [
          "On every channel, product specifics must come from a retrieved article, and the reply carries its URL. If no article covers the issue, the agent asks diagnostic questions or escalates. It never invents steps.",
          "On the first-party chat channel nothing is reviewed before it is sent, so the rule is absolute there: no article containing the answer, no answer. Review happens after the fact in the chat inbox.",
          "The chat channel also has no reply tool. The model's final text is the message. Elsewhere a reply must be an explicit tool call, and one chat-tuned model repeatedly researched an answer, logged a note claiming it had sent it, and sent nothing. Two rounds of prompt hardening didn't fix it. Removing the tool removed the failure.",
        ],
      },
      {
        heading: "Actions that cost money are requests, not actions",
        body: [
          "Trial extensions and discounts send a request that a person approves, in Slack or in the billing queue, before anything runs against the billing provider. Cancelling an account from Slack requires a second admin to confirm. Cancelling a subscription in a retention flow requires the customer to say so explicitly; the agent never cancels on silence.",
          "Ticket and account identifiers come from the assembled context, never from model output. Dry-run is the default. A master stub switch returns canned data from every external system, and each integration has its own write gate, so the systems went live one at a time.",
          "The system page in the console shows, for every capability, a state, a plain sentence about what it means for a customer, and the setting that changes it. Five LIVE badges had turned out to be the wrong question: a badge can't tell reading a board from writing to it.",
        ],
      },
      {
        heading: "Spikes are arithmetic, not opinion",
        body: [
          "Each ticket carries a short topic label written by the light model. What counts as an emerging issue is pure counting: at least 3 tickets in 24 hours and at least 3 times the daily average of the previous 14 days. An ordinary busy day doesn't cry wolf, and the ranking is explainable to whoever reads the brief.",
          "Each spike shows whether the knowledge base already answers it. In the KB means customers can't find an answer that exists. No article means one needs writing. The week's unresolved tickets are grouped by theme so that one article closes a group rather than a ticket.",
        ],
      },
      {
        heading: "One agent, two brands",
        body: [
          "A brand profile bundles the identity the agent introduces itself with and the slice of the knowledge base it may retrieve from. The two profiles are deliberately asymmetric: one brand's surface gets a hard filter so a question about the other product gets a redirect, not an answer; the portfolio surface gets no filter. Everything else, the loop, the tools, the learning, the review, is shared.",
        ],
      },
    ],
    disclosure:
      "The client and its products aren't named. The 242-drafts figure is an adoption fact from the code, not a performance claim. Ticket volumes, deflection rates and the agent-versus-human benchmark results belong to the client and aren't published.",
    metaDescription:
      "Case study: an AI support agent platform working helpdesk tickets, vendor live chat and its own embeddable chat widget, with 20 tools, human-in-the-loop drafts, a blind judge and a learning loop. Built by Mytrya.",
  },

  {
    slug: "nepse-copilot",
    name: "NEPSE Copilot",
    line: "A multi-account investing copilot for the Nepal Stock Exchange that grades its own calls",
    summary:
      "NEPSE Copilot is a full investing copilot for the Nepal Stock Exchange, built for a family of accounts. It ingests market, company and floorsheet data from four sources, syncs each member's holdings and IPO applications from their depository account, scores trade ideas on measured evidence, proposes orders for one-tap approval on Telegram, runs paper strategies against a real-fee ledger, and grades every signal against what the market did 5, 10 and 20 days later. It speaks English and Nepali, and has a read-only voice mode with 31 tools.",
    origin: "Own product",
    status: "Live · sign-in",
    year: "2026",
    stack: "Next.js 16 · Neon Postgres · AI SDK v7 · Gemini Live · Telegram",
    url: "https://nepse.mytrya.com",
    facts: [
      { k: "For", v: "A family of accounts, each a depository (MeroShare) identity. Google sign-in, admin-controlled access." },
      { k: "Data", v: "ShareSansar, chukul, merolagani, MeroShare; NEPSE indices and 13 sector indices" },
      { k: "Store", v: "Neon Postgres, 23 tables, Drizzle" },
      { k: "Models", v: "Gemini by default, OpenRouter roster; scheduled evaluation picks between them" },
      { k: "Delivery", v: "Web in English and Nepali, Telegram, email, a Gemini Live voice session" },
      { k: "Scheduled", v: "Morning, floorsheet, evening, model evaluation, weekly; an external pinger drives intraday alerts" },
      { k: "Security", v: "Member credentials encrypted AES-256-GCM, key held only in the deployment environment" },
    ],
    problem: [
      "Retail investors on NEPSE work from broker screenshots and group chats. The daily floorsheet is public and almost nobody processes it. There is no order API; the only route to a trade is the broker's web terminal.",
      "Nothing tracked several family members' holdings in one place, told them what was worth a look in plain language, or kept an honest record of whether its own ideas had worked. So I built it.",
    ],
    diagram: {
      alt: "Four data sources and each member's depository account load Postgres; signals, regime, relative strength, smart money and backtests produce a conviction score; ideas reach the web, Telegram and voice; approved orders queue for the broker; a scoreboard grades every signal at 5, 10 and 20 days.",
      art: `  ShareSansar · chukul · merolagani ─┐   paced, with fallbacks
  MeroShare (per member, encrypted) ─┼─▶  Postgres, 23 tables
  full-market floorsheet             ─┘
                                            │
        ┌───────────────┬───────────────────┼──────────────────┐
        ▼               ▼                   ▼                  ▼
   signals · RS     market regime      smart money       events · IPOs
   backtests        (top-down gate)    broker flows      auto-apply rules
        └───────────────┴─────────┬─────────┴──────────────────┘
                                  ▼
                        conviction  0–100  (evidence, not prediction)
                                  │
            ┌─────────────┬───────┴────────┬──────────────┐
            ▼             ▼                ▼              ▼
        web (en/ne)   Telegram card    voice, 31 tools   paper ledger
                      Approve / Skip   read-only         real fees
                            │
                            ▼
                    next session: submit approved ─▶ broker adapter

  scoreboard: real return at +5 / +10 / +20 days grades each band`,
    },
    built: [
      "Ingest from ShareSansar (server-rendered pages and the DataTables endpoints behind them, with session cookie and CSRF), chukul's unofficial JSON at a measured 1 request per second, merolagani for valuation fields the others lack, and MeroShare for each member's holdings, applicable issues and applications. Every source keeps an older path as a fallback.",
      "A full-market floorsheet store: raw contracts pruned after a retention window, broker flows kept forever, and a smart-money layer that fires only when one broker's flow in a scrip is both concentrated and persistent across the window, because a single day's number from a venue is noise.",
      "Signals, a market-regime classifier, relative strength over 20, 60 and 120 sessions ranked across the liquid universe, a sector layer with both the published cap-weighted index and an equal-weight one built from stored prices, a corporate events calendar, and market holidays that are inferred when the feed is still on yesterday's date at noon.",
      "Conviction scoring, a forward scoreboard, a reliability page, named strategies with paper ledgers, and a strategy backtest that replays the whole rulebook, sizing, position limits, exits and round-trip costs, as an equity curve against the equal-weight market.",
      "One-tap trading: the evening scan proposes orders, each member gets a Telegram card with Approve and Skip, and approved orders are submitted the next session through a broker adapter. A paper account seeded with the real portfolio's value fills at the next session's open with real one-way fees, and tracks whether the paper record has earned the right to be trusted.",
      "IPO auto-apply per account, with rules for which issue types and how many units, behind a master switch and requiring the member's CRN and PIN. Intraday alerts for targets crossed, circuit limits and big moves, evaluated against the live feed by an external pinger while nobody has the app open.",
      "Multi-user access with a single authorisation choke point, an admin area for members, access, activity and usage, per-person daily budgets for chat and voice, an activity log that records every job, external call and AI call with its cost, an issues detector that tells the admin once, on Telegram and email, when a login breaks or a feed goes stale, and a status page with verdicts rather than dates.",
    ],
    decisions: [
      {
        heading: "A score for how much evidence there is, not for whether you'll win",
        body: [
          "Conviction is a 0 to 100 score. The comment in the source says it is not a prediction of success. It adds up backtested hit rate and edge, sample size, how many independent signals agree, liquidity, whether the model agrees, and whether the position fits the portfolio. A buy into a scrip that's already heavy loses points.",
          "A scoreboard job records the actual return 5, 10 and 20 trading days after every signal and grades each score band against what happened. Moves beyond a day's circuit limit are treated as bonus or rights adjustments, not returns, so a corporate action can't look like a good call. The reliability page shows every strategy next to a plain market baseline, including the ones that underperform it.",
        ],
      },
      {
        heading: "The market regime gates every idea",
        body: [
          "NEPSE moves in long liquidity-driven waves, and a mean-reversion buy that works in a flat market is a falling knife in a broad decline. In August 2026 the technical buy signals went 1 for 38 while the market fell 7%. The regime classifier is deliberately simple and explainable, and every stock idea is read against it.",
          "The 2019 to 2026 backtest over 9,767 scrip-days found that six-month relative strength is contrarian on this exchange: the top quintile lagged. The relative-strength module carries that finding in its header so nobody re-learns it.",
        ],
      },
      {
        heading: "Market rules changed mid-history, so the code knows the date",
        body: [
          "Nepal moved to a Saturday–Sunday weekend on 6 April 2026, and the exchange's trading week moved with it. The daily circuit limit widened from 10% to 15% on 20 April 2026. Every statistic that depends on what a legal one-day move is goes through one module that knows both regimes, because the price history straddles them.",
        ],
      },
      {
        heading: "Treating the data sources as temporary",
        body: [
          "The main JSON source is undocumented. I measured it on 1 September 2026: bursts of about 4 requests return 429, 1 request per second sustained is clean, page size caps at 500. Every caller shares one pacing gate built to those numbers, keeps its older scraper as a fallback, and treats an unexpected response shape as an outage rather than data.",
          "The external pinger's API had drifted from its documented schema before, so everything it returns is treated as unknown and coerced.",
        ],
      },
      {
        heading: "Voice can look, not act",
        body: [
          "The Gemini Live voice session has 31 tools: portfolio, quotes, ideas, pending orders, the paper account, smart money, regime, sectors, events, the floorsheet, alerts, news, IPOs, the brief, the watchlist, the track record, a glossary, the family overview, system status. None of them approve an order. Approval stays on the Telegram card and the orders page, where you can see what you're tapping.",
          "Chat shares the same tools and ground rules with a different preamble, because prose that is read can carry markdown, exact figures and links, where speech wants two rounded sentences.",
        ],
      },
      {
        heading: "Cost and credentials",
        body: [
          "Anyone with a Google account can sign in, so each person has a daily ceiling on chat turns and voice minutes, counted from the activity log per Nepal-time day. Per-endpoint stats are batched and flushed to Postgres at most once a minute, because a browser polling the live feed every 60 seconds had been keeping the database compute awake around the clock.",
          "Members' depository passwords and transaction PINs are encrypted with AES-256-GCM, a fresh nonce per value, under a key that exists only in the deployment environment. The database alone is useless without it. The format is versioned so the key can rotate.",
          "A scheduled job runs a roster of Gemini and OpenRouter models over identical inputs and keeps every result. One model was dropped because its median call took 259 seconds and its maximum 295, most of a 300-second function budget.",
        ],
      },
    ],
    disclosure:
      "My own product. Live, with Google sign-in; access to accounts is admin-controlled, so the link lands on the sign-in page. The regime and backtest figures are from my own data.",
    metaDescription:
      "Case study: a multi-account investing copilot for the Nepal Stock Exchange with four data sources, encrypted depository sync, one-tap order approval on Telegram, paper strategies with real fees, a 31-tool read-only voice mode, and a scoreboard that grades its own signals at 5, 10 and 20 days. Built by Mytrya.",
  },

  {
    slug: "support-intelligence",
    name: "Support Intelligence",
    line: "A morning read of a support desk for people who don't read tickets",
    summary:
      "Support Intelligence is a dashboard that pulls the previous day's helpdesk tickets each morning, computes the counts and resolution times in code, and asks Gemini to name the recurring issues and what they mean for product, sales, marketing and operations.",
    origin: "Client work",
    status: "In production",
    year: "2025",
    stack: "Next.js · Gemini 2.5 Flash · Redis",
    facts: [
      { k: "Client", v: "The same vendor as the support agent platform" },
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
      alt: "A dashboard request checks Redis, joins any in-flight fetch, pulls and enriches helpdesk tickets under per-window caps, computes statistics in code, sends at most 200 tickets to Gemini, then caches the report.",
      art: `  browser ──▶ GET /api/analyze?window=24h
                   │
                   ├─ cached and fresh?  ──▶ return it
                   ├─ already in flight? ──▶ join that fetch
                   ▼
              helpdesk API    open · resolved · closed
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
    disclosure: "Same client as the support agent platform, not named. The dashboard is internal and isn't linked.",
    metaDescription:
      "Case study: a daily support-desk dashboard where the numbers are computed in code and Gemini only names the recurring issues, with per-window caps and request coalescing. Built by Mytrya.",
  },

  {
    slug: "offscript",
    name: "offScript",
    line: "A rehearsal partner for actors: two speech engines, a directing room, and a cue engine that knows the line",
    summary:
      "offScript is a rehearsal tool for actors. You paste or upload a script, it casts a voice for every character but yours, reads their lines with directed delivery, listens while you deliver yours, and tells you afterwards which lines you don't own yet. It has a directing room where you give notes in plain language, a dramaturg's breakdown of the scene, an improvised pitch-and-interview mode on a live speech model, and a cue engine that decides when to speak from what you said rather than from how long you were silent.",
    origin: "Own product",
    status: "Live",
    year: "2026",
    stack: "Next.js · Gemini TTS + ElevenLabs · Gemini Live · browser speech · IndexedDB",
    url: "https://offscript.mytrya.com",
    image: {
      src: "/work/offscript.png",
      alt: "offScript home page: a dark stage-lit landing with an actor's quote, a video clip, and an I'm ready button.",
      width: 1440,
      height: 900,
    },
    facts: [
      { k: "Input", v: "PDF, Final Draft (.fdx), Fountain, Markdown, plain text; starter material for each kind" },
      { k: "Voices", v: "Gemini TTS or ElevenLabs, switched per session; a casting per engine per script" },
      { k: "Listening", v: "Chrome's streaming recogniser during the run; Gemini re-transcribes recordings afterwards with the expected line as context" },
      { k: "Modes", v: "Full run, Off book, Drill; presentation; improvised pitch and interview on Gemini Live" },
      { k: "Directing", v: "Per-line delivery notes, plain-language notes to the whole scene, a dramaturg's breakdown, play the scene" },
      { k: "Storage", v: "Everything in the browser: scripts in localStorage, recordings in IndexedDB, no account needed" },
      { k: "Tests", v: "Cue engine, parser, segmentation, import, storage" },
    ],
    problem: [
      "Rehearsing alone means reading both parts, so you learn your cue lines instead of your own.",
      "A general voice assistant doesn't work either. It waits about 700 milliseconds of silence and then talks. In a scene, a pause is often the point. And generating a partner's line on demand takes 3 to 5 seconds, which is impossible inside a scene.",
    ],
    diagram: {
      alt: "A script is parsed locally and segmented on its own headings; opening a scene casts voices, writes delivery notes and renders every partner line to a cache; the run matches the live transcript against the expected line; recordings are re-transcribed and scored; the directing room rewrites notes from plain-language direction.",
      art: `  script in ──▶ parsed in the browser (PDF: server, glyphs → lines)
                    │
                    ▼
               segment()   the script's own headings; else cut on a
                    │      returning speaker; ceiling 120 lines a scene
                    ▼
        scene opened ──▶ cast once per script ──▶ notes per line, in
                    │    gender held to the        45-line windows, as
                    │    model's own reading        prose AND a ≤6-word cue
                    ▼
        render every partner line ──▶ disk cache   cold ~5s · warm ~19ms
                    │                  (Gemini TTS or ElevenLabs, 24kHz PCM)
                    ▼
        run ──▶ match live transcript against the expected line
                    │      coverage + progress → the wait ladder
                    ▼
        report ──▶ recordings re-transcribed with the line as context,
                   weak lines ranked, drill mode on the ones you fumble

  /direct ──▶ "nobody is shouting, it's 3am" ──▶ proposal per line ──▶ take / drop
              read the scene: units · characters · one action verb per line`,
    },
    built: [
      "Parsers for five formats, read in the browser. Only PDF goes to the server, where lines are rebuilt from glyph positions and page furniture is stripped. Speeches are parsed locally too, since a single speaker has no cues to split on.",
      "A segmenter with strict heading rules, a returning-speaker fallback, and a 120-line ceiling. Importing a 40-scene feature makes zero model requests; scenes the script named keep their names.",
      "Casting per script, deferred until a scene is opened, with the model's stated reading of each character's gender enforced against the voice it picked. Two engines with incompatible direction: Gemini reads a prose note, ElevenLabs takes a bracketed cue, so the directing pass writes both at once and each engine gets the one it can use.",
      "Pre-rendered partner lines in a shared cache keyed by line, voice and note, so a changed note re-renders only the lines it touched. A 30-second deadline per model attempt and 70 per line; rendering can be stopped and keeps what arrived; a line that won't render is left out with a retry that costs only the failures.",
      "The cue engine, per-line recording on one held-open microphone stream, an after-the-fact re-transcription that knows the expected line, deterministic scoring with a slow-pickup penalty, and a drill mode for the lines you keep fumbling, each preceded by its cue.",
      "A directing room: give a note in the words you'd use in the rehearsal room, get a proposal of only the lines it bears on, take or drop each, undo the last note. Read the scene into units, characters and one transitive action verb per line, then play the whole scene end to end with a seekable timeline whose ticks are the line breaks.",
      "Pitch and interview mode on Gemini Live: a persona brief and your talking points, an improvised partner that pushes back in character, and grading on whether each point landed rather than on words.",
    ],
    decisions: [
      {
        heading: "How it knows when to speak",
        body: [
          "The engine measures two things. Coverage is how much of the expected line was heard. Progress is how far into the line the furthest matched word sits. They answer different questions: 60% coverage can mean you're mid-line taking a beat, or that you finished and the recogniser dropped words.",
          "The wait before the partner speaks is a ladder, not one timeout. It only interrupts instantly when it heard the actual final word, because stepping on the end of a line is the worst thing a scene partner can do. In improvised mode the ladder is switched off and plain silence detection takes over, because in a conversation a pause really does mean your turn.",
        ],
      },
      {
        heading: "Two speech engines that take direction differently, measured",
        body: [
          "Gemini TTS reads a delivery note as prose and performs better the longer and more situational the note is. ElevenLabs takes a short bracketed cue, and handing it Gemini's prose fails loudly: it reads the stage direction aloud. Measured against a 1.92-second baseline, a bracketed cue of 2, 6 or 10 words changes the delivery and nothing else; 14 words adds 6.16 seconds of the actor reading her own direction. The app's notes are 8 to 20 words, so about half would have been spoken.",
          "So the directing pass writes both forms in one request, a prose note and a cue of at most six words, and each engine is handed the one it can use. Preparing a scene under one engine prepares it for both.",
          "On one scene of six lines with the same notes: Gemini ranged 0.42 to 2.79 words per second and took about 12 seconds a line; ElevenLabs 1.85 to 3.20 and about 2.6 seconds a line. Gemini's wider spread was one five-word line dragged to 11.77 seconds, which in a rehearsal is a cue that never lands. Gemini stays the default for its richer control; the switch is one click.",
        ],
      },
      {
        heading: "Nothing generates during a scene",
        body: [
          "Every partner line is rendered when the scene is prepared and played from a local file. A four-line scene prepares cold in about 5 seconds and warm in about 19 milliseconds. The browser's own synthesiser is the fallback for lines that failed to render and for improvised modes.",
          "For improvised partners the reply-then-synthesise pipeline measured 7.7 seconds a turn, of which 5.7 to 7.4 was speech generation. Gemini Live emits audio directly and starts speaking about 1.3 seconds in, so that mode runs on a Live session, speech in and speech out with no text step between.",
        ],
      },
      {
        heading: "The score is arithmetic; the coaching is optional",
        body: [
          "Everything in the report is arithmetic on what was measured during the run, no model in the loop, so today's numbers compare to last week's. Weak lines are ranked by accuracy with a penalty for slow cue pickup: a line you always get right after a two-second stall isn't one you know yet.",
          "Chrome's recogniser has to run live because it's the only one that streams, but it doesn't know the script and returns don't for didn't pretend. Each recording is re-transcribed afterwards by a model told the expected line, which turns an open-vocabulary guess into a narrow judgement, and a forgiven artefact stops showing up as a memory failure. Subjective coaching notes are a separate step you ask for.",
        ],
      },
      {
        heading: "The sixty-input form nobody used",
        body: [
          "The first directing interface was a form: sixty text inputs, a palette of mood adjectives, two scene-wide sliders. It worked and nobody used it, because writing sixty delivery instructions by hand is not something anyone does. It was replaced by giving a note the way you would in the room, and letting the model decide which lines the note bears on and what it means for each of them. Nothing is applied until you take it, and each taken note stores what it overwrote, so it can be undone.",
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
      "My own product, live at offscript.mytrya.com. Works in Chrome or Edge, and needs headphones so the microphone doesn't hear the partner's lines. All measurements above are from the project notes. From those notes: it stays on book so you can get off book.",
    metaDescription:
      "Case study: an AI scene partner with two measured speech engines, pre-rendered directed delivery, a plain-language directing room, a dramaturg's scene breakdown, improvised mode on Gemini Live, and a cue engine that reads the line instead of the clock. Built by Mytrya.",
  },

  {
    slug: "community-signal",
    name: "Community Signal",
    line: "Two small internal tools that each replaced a weekly manual task",
    summary:
      "Community Signal is a pair of internal tools for the same client as the support agent platform: a Python miner that finds forum posts where people describe a problem the client's products solve, and a Next.js dashboard that summarises the marketing team's monday.com board.",
    origin: "Client work",
    status: "Internal",
    year: "2025",
    stack: "Python · SQLite · Claude / Next.js · monday.com GraphQL · Gemini",
    facts: [
      { k: "Client", v: "The same vendor as the support agent platform" },
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
          "The index is a list of the phrases people actually type when they have the problem. Each maps to the product and the specific page that answers it. A match is already a reply with a link.",
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
    disclosure: "Same client as the support agent platform, not named. Neither tool is complex. Each replaced about an hour of someone's week.",
    metaDescription:
      "Case study: a forum-mining tool with a hand-built keyword index and blunt scoring, plus a monday.com board dashboard, each replacing a weekly manual task. Built by Mytrya.",
  },
];

export function getWork(slug: string) {
  return WORK.find((w) => w.slug === slug);
}
