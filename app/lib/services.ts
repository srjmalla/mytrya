export type Faq = { q: string; a: string };

export type Service = {
  slug: string;
  name: string;
  /** Short label for nav/cards. */
  short: string;
  metaTitle: string;
  metaDescription: string;
  /** Answer-first definition. First sentence should stand alone. */
  answer: string[];
  fit: string[];
  notFit: string[];
  builds: string[];
  safety: string[];
  stack: string[];
  /** Slugs from work.ts */
  proof: string[];
  /** Lowest fixed price for a first project of this kind, USD. */
  priceFrom: number;
  /** ISO date the page was last materially changed. */
  updated: string;
  faqs: Faq[];
};

/** Systems connected in shipped work. The list is evidence, not a boundary. */
export const INTEGRATIONS: { group: string; items: string[] }[] = [
  { group: "Support and chat", items: ["helpdesk and live-chat APIs", "a first-party chat widget", "Slack", "Telegram"] },
  { group: "Billing and commerce", items: ["FastSpring", "monday.com marketplace monetisation", "eSewa"] },
  { group: "Work tracking and content", items: ["monday.com boards", "WordPress REST", "Bettermode communities"] },
  { group: "Finance and market data", items: ["MeroShare", "ShareSansar", "chukul", "merolagani", "broker web terminals"] },
  { group: "Models and speech", items: ["Claude", "Gemini and Gemini Live", "OpenAI", "OpenRouter", "ElevenLabs", "Gemini TTS", "Kokoro"] },
  { group: "Infrastructure", items: ["Vercel", "Cloudflare Pages and Workers", "Neon Postgres", "Upstash Redis and Vector", "Cloudflare R2", "Clerk", "Redis Cloud", "SQLite", "Vercel Blob", "cron-job.org"] },
];

export const INTEGRATIONS_NOTE =
  "If it has an API, a webhook, or even just a web page, it can be connected. The list above is what shipped work has touched so far, not a menu.";

export type SystemType = {
  name: string;
  problem: string;
  build: string;
  fits: string;
  stack: string;
  /** Slug from SERVICES this falls under. */
  service: string;
  /** True when a version of this is already built and running. */
  built?: boolean;
};

/** Named shapes of system Mytrya builds. Each is scoped and priced under one of the three services. */
export const SYSTEM_TYPES: SystemType[] = [
  {
    name: "Inbound lead converter",
    problem: "A lead writes in on Facebook, Instagram, WhatsApp or web chat, and the business replies hours later. Most of those leads have gone cold by then.",
    build: "A chat agent that answers within a minute, asks the qualifying questions you set (budget, timeline, location, service), and drops a booking link into the chat the moment the answers fit. Anything that doesn't fit is handed to a person with a summary.",
    fits: "Local service businesses: clinics, dental practices, real estate agents, roofing and home-service contractors.",
    stack: "ManyChat or the platform APIs, Make or n8n, Claude or OpenAI, Cal.com or Calendly.",
    service: "ai-support-agents",
  },
  {
    name: "Invoice and receipt processor",
    problem: "Finance staff retype line items from PDF invoices into the accounting system, one at a time.",
    build: "A dedicated inbox such as invoices@yourcompany.com. The pipeline watches it, pulls each attachment, reads the supplier, dates, line items and totals with a vision model or OCR, checks that the lines add up to the total, writes the structured record into the ledger and files the original in cloud storage. Anything that fails the check goes to a person instead of the ledger.",
    fits: "E-commerce brands, logistics and shipping firms, and accounting practices handling many clients' paperwork.",
    stack: "n8n or Make, Google Cloud Storage or S3, Claude or OpenAI vision, Xero or QuickBooks API.",
    service: "workflow-automation",
    built: true,
  },
  {
    name: "Outbound research and outreach engine",
    problem: "A sales team spends its day researching prospects, cleaning spreadsheets and drafting first emails instead of talking to people.",
    build: "A pipeline that pulls new leads matching your customer profile, reads each company's website and recent news for a specific angle, drafts a short message built on that angle, and places it into a multi-channel sequence. Every draft is reviewable before it sends, and the rules for who qualifies are written down, not buried in a prompt.",
    fits: "B2B software companies, marketing agencies and consulting firms with a defined ideal customer.",
    stack: "Clay, n8n, Claude, Instantly or Smartlead.",
    service: "workflow-automation",
  },
  {
    name: "Support triage and auto-responder",
    problem: "The support queue fills with the same answerable questions, and the people who could handle the hard cases spend their day on the easy ones.",
    build: "A front line that reads each incoming ticket, judges tone and urgency, finds the answer in your knowledge base, and either drafts a reply for a person to send or routes a complaint straight to a manager. The full version of this is the AI support employee, which also acts in your other systems and closes the case.",
    fits: "High-volume online stores, software companies and digital agencies.",
    stack: "Zendesk, Freshdesk, Gorgias or Intercom, n8n, a vector store such as Upstash or Qdrant, Claude.",
    service: "ai-support-agents",
    built: true,
  },
  {
    name: "Content repurposing pipeline",
    problem: "A company records webinars, podcasts and training videos and never has time to cut them into anything a marketing channel can use.",
    build: "Drop a long video into a shared folder. The pipeline transcribes it, finds the handful of moments worth clipping, cuts those into short vertical clips with captions, writes the post copy, and queues them in your scheduler for a person to approve.",
    fits: "Online education companies, creators, and marketing teams sitting on a library of recordings.",
    stack: "Google Drive API, Whisper or Gemini for transcription, ffmpeg in a small Python service, Buffer or a similar scheduler.",
    service: "workflow-automation",
  },
];

export const SERVICES: Service[] = [
  {
    slug: "ai-support-agents",
    name: "AI support employees",
    short: "Support employees",
    metaTitle: "AI support employees: custom AI support agents that handle cases end to end",
    metaDescription:
      "AI support employees that handle a support case end to end: they work your helpdesk, your live chat and a chat widget on your own site, decide what each case needs, answer from your documentation, act in the systems around it, follow up on their own, and learn from what your team actually sends. Built and run in production by Mytrya.",
    answer: [
      "An AI support employee from Mytrya is a custom AI support agent that works as a member of your support team: it handles a case from the first message to closed, rather than answering and leaving the rest to you. It works wherever your customers already write to you: inside your helpdesk, in your live chat, and as a chat widget on your own website or inside your product. It triages what comes in, checks the customer's account and your dev tracker before it speaks, answers from your documentation, takes the actions the case needs in connected systems, files bugs, escalates to the right person with a written summary, follows up when the customer goes quiet, and closes the case.",
      "Like a new hire, it decides for itself what a case needs and in what order: search the docs, check the dev board, ask the customer, file the bug, hand off. It works on its own where the stakes are low and under review where they aren't, and you decide which: live answers on chat, drafts a person sends on tickets, and an approval step on anything that changes an account.",
      "It fits your stack rather than the other way round. The helpdesk can be Freshdesk, Zendesk, Intercom, HubSpot, Help Scout or anything with an API. The chat can be the vendor's or a widget I build for you, which no vendor holds and which escalates by opening a ticket where your team already works.",
      "The platform I run in production today works three channels with one agent loop and 20 tools across the helpdesk, live chat, the dev board, Slack and the account system. On tickets it drafts and a person sends; on the widget it answers live and is reviewed afterwards. A scheduled follow-up brings it back to every quiet case. It reads back what the team actually sent, judges it blind against its own draft, and turns the difference into learnings a person approves.",
    ],
    fit: [
      "You run a B2B product with a helpdesk and a knowledge base that already answers most questions, and a person still has to find and relay the answer.",
      "Resolving a ticket often means touching another system: opening a bug for the dev team, checking an account, notifying a channel, changing a subscription.",
      "You want to choose the model, keep the data in your own accounts, and see every action the agent takes before it takes it.",
      "You want the agent on your own website or inside your product, not only inside a vendor's console, and you want your team's replies to make it better without anyone filling in a rating.",
    ],
    notFit: [
      "You only need answers from a help centre, with no actions in other systems. Intercom Fin or Freshdesk Freddy will be faster to switch on and cheaper to run at low volume. I will say so on the call.",
      "Your documentation doesn't exist yet. An agent grounded in nothing has nothing to say. Writing the first 30 articles is a different project, and sometimes a better first project.",
    ],
    builds: [
      "Channel adapters for your helpdesk, your live chat and, if you want it, a first-party chat widget with streaming, file uploads, signed sessions and an origin allowlist",
      "Webhook intake with idempotency, so a retried event can't produce two replies, and a cheap deterministic filter that drops out-of-office replies, bounces and newsletters before the model runs",
      "Context assembly from the ticket, the conversation, the customer's account and any linked tracker items, before the model sees anything",
      "Retrieval over your knowledge base with a reranker and a keyword fallback; a KB store with draft, review, published and archived states, versions, and a daily sync from your docs site",
      "Draft mode: the reply is posted as a private note, a person sends it, and the outcome is read back from what they sent",
      "One agent loop over a tool layer for the systems the agent may act in: the model chooses the next tool, each tool's inputs are sourced from context rather than from the model, and a step budget bounds a run",
      "Escalation to Slack or email with a private note on the ticket",
      "A scheduled follow-up that re-reads the ticket after 24 hours and closes or re-runs",
      "An admin console for replaying any ticket in dry-run and reading the full tool trace",
      "Outcome recording: resolved, escalated, reopened, and a list of questions the agent couldn't answer, which becomes your documentation backlog",
      "A learning loop: a blind judge compares your team's reply to the draft, a distiller proposes learnings, a person approves them before they reach the prompt",
      "A Slack interface for the team, with irreversible account commands behind a second admin's confirmation, and a morning brief with emerging issues computed by arithmetic",
    ],
    safety: [
      "Product specifics come only from a retrieved article, and the reply cites it. No article, no answer; the ticket escalates.",
      "Dry-run is the default state. Writing to external systems is a flag you turn on per integration.",
      "Ticket and account identifiers are read from context, never from model output, so a hallucinated ID has nowhere to go.",
      "Internal links and tracking notes go into private notes. Customer-facing replies never carry them.",
    ],
    stack: [
      "Next.js on Vercel or Cloudflare",
      "Vercel AI SDK",
      "Claude, Gemini or OpenAI models, chosen per task and measured",
      "Upstash Redis and Vector, or Postgres with pgvector",
      "Your helpdesk, chat, tracker, messaging and account APIs, whichever they are",
    ],
    proof: ["support-agent-platform", "support-intelligence"],
    priceFrom: 6000,
    updated: "2026-10-07",
    faqs: [
      {
        q: "Why build a custom support agent instead of using Intercom Fin or Freshdesk Freddy?",
        a: "Use the vendor's agent if your tickets are answered by your help centre alone and the agent never needs to act in other systems. Intercom Fin now runs on other helpdesks too, priced per resolved outcome, and Freshdesk sells Freddy by the session. Build custom when resolving a ticket means acting in other systems (bug reports, account checks, notifications, refunds), when you want the agent on your own site or inside your product, when you need to choose or swap the model, or when you want every action traceable and rehearsable before it goes live. The custom route costs more up front and less per ticket, and you own it.",
      },
      {
        q: "How does the agent avoid making things up?",
        a: "It is only allowed to state product specifics that appear in an article it retrieved, and it includes the article's URL in the reply. When retrieval finds nothing relevant, the rule is to escalate, not to approximate. That rule lives in the system prompt and is enforced by what the tools will and won't do.",
      },
      {
        q: "Which helpdesk and chat systems can you connect to?",
        a: "Any with an API. The production build connects a helpdesk, its live chat, a first-party widget, monday.com, Slack and the account system, but the adapters are thin and the agent loop doesn't know which vendor it's talking to. Zendesk, Intercom, HubSpot, Help Scout, Stripe, Chargebee, Linear, Jira, GitHub and Teams are the same shape of work.",
      },
      {
        q: "What happens when the agent gets a ticket wrong?",
        a: "Every run is recorded with its full tool trace. Any ticket can be replayed in dry-run to see exactly what the agent would do. Wrong outcomes go onto a gap list that becomes the queue for new documentation, so the same question is answerable next time.",
      },
    ],
  },
  {
    slug: "internal-tools",
    name: "Internal tools and dashboards",
    short: "Internal tools",
    metaTitle: "Internal tools and AI dashboards for operations teams",
    metaDescription:
      "Small internal tools that read your operational data every morning, compute the numbers in code, and use a model only for the part a query can't do: naming patterns. Built by Mytrya.",
    answer: [
      "An internal tool from Mytrya is a small web application, usually one page and one API route, that pulls data from a system your team already uses, computes the numbers your team asks for, and presents them without anyone running a report.",
      "Where a model is involved, it does the one thing a database query can't: reading two hundred support tickets and naming the five recurring problems. It is never asked to add anything up.",
    ],
    fit: [
      "A question comes up every week that someone answers by hand: what is support hearing, what is the team working on, which leads went cold.",
      "The data is in a system with an API: Freshdesk, monday.com, HubSpot, a Postgres database, a spreadsheet you export.",
      "The audience is your own team, so the tool can be plain and fast rather than polished for customers.",
    ],
    notFit: [
      "You need a customer-facing product with accounts, billing and design polish. That is a product build, and I'd scope it differently.",
      "The data doesn't exist in any system yet. Collecting it is the first project.",
    ],
    builds: [
      "Scheduled fetches on a cron, with results cached so the first person in doesn't wait",
      "Statistics computed in code and tested: counts, medians, resolution times, ageing",
      "A model pass for clustering and narrative, bounded to a fixed number of records per run",
      "Request coalescing so several people opening the page at 9am trigger one fetch",
      "A single page with filters and a table, linking back to the source system",
      "A refresh control gated behind a shared secret, and a cost ceiling per day",
    ],
    safety: [
      "Numbers never come from the model. If a figure appears on the page, a function computed it and a test checks it.",
      "Every expensive step has a cap that depends on the window being viewed, so a 30-day view costs about what a 24-hour view does.",
      "Read-only against your systems by default. Writes are a separate, later decision.",
    ],
    stack: [
      "Next.js, deployed to Vercel or Cloudflare",
      "Redis or Postgres for caching and history",
      "Gemini Flash or Claude Haiku for bounded model passes",
      "Recharts for the few charts that earn their place",
    ],
    proof: ["support-intelligence", "community-signal"],
    priceFrom: 3000,
    updated: "2026-10-05",
    faqs: [
      {
        q: "How long does an internal dashboard take to build?",
        a: "The two on this site were each a few days of work against an existing API. The build is small. Most of the time goes into agreeing which questions the page must answer and how the numbers are defined, and I do that in writing before building.",
      },
      {
        q: "Can the tool write back to our systems, not just read?",
        a: "Yes, but I build the read-only version first and run it for a while. Writes come as a second step with their own dry-run mode, once the team trusts the numbers.",
      },
    ],
  },
  {
    slug: "workflow-automation",
    name: "Data pipelines and workflow automation",
    short: "Automation",
    metaTitle: "Data pipelines and workflow automation for small B2B teams",
    metaDescription:
      "Pipelines that pull from undocumented sources on a measured schedule, keep a fallback, and treat surprises as outages rather than data. Code where it matters, n8n or Make where it doesn't. Built by Mytrya.",
    answer: [
      "Workflow automation from Mytrya means moving data between systems on a schedule or on an event, with the failure cases designed before the happy path. Code where the logic matters, n8n or Make where a visual workflow is genuinely simpler for your team to maintain.",
      "The pipelines I run today pull market data from an undocumented API at a measured 1 request per second with a scraper fallback, mine a community forum against a keyword index and export scored leads to CSV, and re-run cheaply because every step deduplicates on write.",
    ],
    fit: [
      "Data is copied between two systems by a person, on a schedule, and it goes wrong when they're away.",
      "A source you depend on has no stable API and you need it to fail safely rather than silently.",
      "You use n8n, Make or Zapier already and the workflows have grown past what a diagram can hold.",
    ],
    notFit: [
      "The process changes every week. Automate it after it settles.",
      "A one-off migration. I can help, but it's a script, not a system.",
    ],
    builds: [
      "Scrapers and API clients with measured rate limits, shared pacing, and a fallback path",
      "Deduplication on write so any run can be repeated without side effects",
      "Scoring and filtering rules written down and versioned, not buried in a prompt",
      "Scheduled jobs on Vercel Cron, Cloudflare Cron Triggers or GitHub Actions",
      "n8n or Make workflows when the team will maintain them, with the tricky nodes replaced by small code functions",
      "Alerts to Slack or email when a source changes shape",
    ],
    safety: [
      "An unexpected response shape is treated as an outage. The pipeline stops and tells someone. It does not guess at a malformed row.",
      "Rate limits are measured against the real source, not assumed, and the numbers are in the code with the date they were measured.",
      "Every job is idempotent, so the fix for a bad run is to run it again.",
    ],
    stack: [
      "TypeScript or Python",
      "Postgres (Neon) or SQLite for small tools",
      "n8n self-hosted or cloud, Make, Zapier where the client already uses them",
      "Vercel Cron, Cloudflare Workers, GitHub Actions",
    ],
    proof: ["nepse-copilot", "community-signal"],
    priceFrom: 3000,
    updated: "2026-10-05",
    faqs: [
      {
        q: "Do you use n8n and Make, or write code?",
        a: "Both, chosen per job. If your team will own and edit the workflow, n8n or Make is the better tool because they can see it. If the logic includes rate limiting, retries, deduplication or anything that needs a test, that part is code, and the workflow tool calls it.",
      },
      {
        q: "What happens when the source API changes?",
        a: "The pipeline stops and posts an alert. It doesn't try to interpret the new shape. Each client keeps the previous scraper as a fallback where one exists. This is the design decision that matters most for anything built on an undocumented source.",
      },
    ],
  },
];

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}
