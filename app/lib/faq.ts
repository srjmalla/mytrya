import type { Faq } from "./services";

/** Site-wide FAQ. Answer-first: the first sentence should work on its own. */
export const FAQ: Faq[] = [
  {
    q: "What does Mytrya do?",
    a: "Mytrya builds AI agents, internal tools and data pipelines for small B2B software and service companies. It is a one-person practice run by Suraj Malla in Kathmandu. Every system described on this site was built and is run by him.",
  },
  {
    q: "Who is it for?",
    a: "Teams of roughly 5 to 200 people who already run on a helpdesk, a CRM, a billing system and a project tracker, and have a person copying information between them. Founders, heads of operations and heads of support are the usual first contact.",
  },
  {
    q: "What kinds of projects do you take?",
    a: "Three kinds. AI support agents that work inside whatever helpdesk and chat you run, or as a widget on your own site, and act in connected systems. Internal tools and dashboards that read your operational data and compute the answers. Data pipelines and workflow automation, in code or in n8n and Make. Each has its own page under Services.",
  },
  {
    q: "Which systems can you integrate with?",
    a: "Anything with an API, a webhook, or a web page. Shipped work so far has connected Freshdesk, Freshchat, FastSpring, monday.com, Slack, Telegram, WordPress, Bettermode, MeroShare, three Nepali market-data sites, a broker's web terminal, Claude, Gemini and Gemini Live, OpenAI, OpenRouter, ElevenLabs, Neon Postgres, Upstash, Redis Cloud, Vercel Blob and Cloudflare. A system that isn't on that list is usually a day of adapter work, not a reason to say no.",
  },
  {
    q: "How do projects work commercially?",
    a: "Fixed scope and fixed price, agreed in writing before work starts. A first project is scoped so that it ships in weeks, with a dry-run demo each week along the way. Ongoing tuning after handover is a separate, optional retainer.",
  },
  {
    q: "How much does a project cost?",
    a: "It depends on how many systems the work touches and how much of your documentation already exists. I give a fixed price after a scoping call and a written spec, not before. The first call is free and takes about 30 minutes.",
  },
  {
    q: "Why hire one engineer instead of an agency?",
    a: "The person you talk to on the scoping call is the person who writes the code, runs it in production and answers when it breaks. There is no handoff, no account manager, and the price reflects one salary rather than a team's. The trade-off is capacity: I take a small number of projects at a time.",
  },
  {
    q: "Why build a custom AI support agent instead of using Intercom Fin or Freshdesk Freddy?",
    a: "Use the vendor's agent if your help centre alone answers your tickets and you only need it inside that vendor's console. Build custom when resolving a ticket means acting in other systems, when you want the agent on your own website or inside your product, when you want to choose the model and keep the data in your own accounts, or when you need every action traceable and rehearsable before it goes live.",
  },
  {
    q: "How do you keep an AI agent from doing something wrong?",
    a: "Four rules that appear in every agent I build. Dry-run is the default and writes are enabled per integration. Product specifics come only from retrieved documentation, cited in the reply. Record identifiers come from context, never from the model. Anything the agent couldn't answer is logged as a gap and becomes the documentation backlog.",
  },
  {
    q: "Which AI models do you use?",
    a: "Claude, Gemini and OpenAI models through their APIs, chosen per task. Where the choice matters I measure it: one of my systems runs a scheduled evaluation of candidate models over identical inputs and keeps the results. Model choice is a configuration, not an architecture decision, so it can change.",
  },
  {
    q: "Do you use n8n, Make or Zapier?",
    a: "Yes, when your team will maintain the workflow and can see it as a diagram. Logic that needs rate limiting, retries, deduplication or a test is written in code, and the workflow tool calls it.",
  },
  {
    q: "Who owns the code?",
    a: "You do. Every project is delivered into your own repositories and cloud accounts, with documentation and a runbook. Nothing runs on infrastructure you don't control.",
  },
  {
    q: "Where are you based, and what time zones do you work with?",
    a: "Kathmandu, Nepal, UTC+5:45. Working hours overlap the full European working day and the early part of the US East Coast morning. US clients get same-day asynchronous responses and scheduled calls in their morning.",
  },
  {
    q: "Can you show me client work?",
    a: "Yes, with the client's name withheld. The Work section describes three client systems in architectural detail, including a support agent platform that works three channels with a learning loop. Metrics that belong to the client aren't published. Two of my own products, an investing copilot and a rehearsal tool for actors, are linked and can be opened.",
  },
  {
    q: "How do I start?",
    a: "Write to malla.srj@mytrya.com or use the contact form with a description of the process: what it is, who does it, how often, and what goes wrong when it's late. I reply within one working day with either a scoping call or a reason it isn't worth automating.",
  },
];

/** The four shown on the home page. */
export const FAQ_HOME = [0, 3, 4, 8].map((i) => FAQ[i]);
