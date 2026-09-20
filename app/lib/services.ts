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
  faqs: Faq[];
};

export const SERVICES: Service[] = [
  {
    slug: "ai-support-agents",
    name: "AI support agents",
    short: "Support agents",
    metaTitle: "Custom AI support agents for Freshdesk, Zendesk and Intercom",
    metaDescription:
      "Custom AI support agents that answer from your documentation, act in your billing and tracking systems, and escalate to a person when they can't ground an answer. Built and run in production by Mytrya.",
    answer: [
      "An AI support agent from Mytrya is a service that sits inside your existing helpdesk, reads incoming tickets, answers the ones your documentation already covers, takes actions in connected systems such as billing or your issue tracker, and hands the rest to a person with a written summary.",
      "It is not a chat widget. It holds a named agent seat in Freshdesk, Zendesk or Intercom and owns the full ticket lifecycle: triage, reply, follow-up, close.",
      "The agent I run in production today has 13 tools across Freshdesk, FastSpring, monday.com and Slack, runs up to 10 reasoning steps per ticket, and checks back on every ticket it answers 24 hours later.",
    ],
    fit: [
      "You run a B2B product with a helpdesk and a knowledge base that already answers most questions, and a person still has to find and relay the answer.",
      "Resolving a ticket often means touching another system: issuing a refund, extending a trial, opening a bug for the dev team, notifying a channel.",
      "You want to choose the model, keep the data in your own accounts, and see every action the agent takes before it takes it.",
    ],
    notFit: [
      "You only need answers from a help centre inside one product, with no actions in other systems. Intercom Fin or Freshdesk Freddy will be faster to switch on and cheaper to run. I will say so on the call.",
      "Your documentation doesn't exist yet. An agent grounded in nothing has nothing to say. Writing the first 30 articles is a different project, and sometimes a better first project.",
    ],
    builds: [
      "Webhook intake with idempotency, so a retried event can't produce two replies",
      "Context assembly from the ticket, the conversation, the billing account and any linked tracker items, before the model sees anything",
      "Retrieval over your knowledge base with a keyword fallback",
      "A tool layer for the systems the agent may act in, with each tool's inputs sourced from context rather than from the model",
      "Escalation to Slack or email with a private note on the ticket",
      "A scheduled follow-up that re-reads the ticket after 24 hours and closes or re-runs",
      "An admin console for replaying any ticket in dry-run and reading the full tool trace",
      "Outcome recording: resolved, escalated, reopened, and a list of questions the agent couldn't answer, which becomes your documentation backlog",
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
      "Freshdesk, Zendesk, Intercom, HubSpot, FastSpring, Stripe, monday.com, Slack APIs",
    ],
    proof: ["jetta", "support-intelligence"],
    faqs: [
      {
        q: "Why build a custom support agent instead of using Intercom Fin or Freshdesk Freddy?",
        a: "Use the vendor's agent if your tickets are answered by your help centre alone. Build custom when resolving a ticket means acting in other systems (refunds, trials, bug reports, notifications), when you need to choose or swap the model, or when you want every action traceable and rehearsable before it goes live. The custom route costs more up front and less per ticket, and you own it.",
      },
      {
        q: "How does the agent avoid making things up?",
        a: "It is only allowed to state product specifics that appear in an article it retrieved, and it includes the article's URL in the reply. When retrieval finds nothing relevant, the rule is to escalate, not to approximate. That rule lives in the system prompt and is enforced by what the tools will and won't do.",
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
