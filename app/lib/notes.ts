export type Note = {
  slug: string;
  title: string;
  description: string;
  published: string;
  updated: string;
  tags: string[];
  related: string[];
  body: string[];
  table?: { caption: string; head: string[]; rows: string[][] };
  sources?: { label: string; url: string }[];
};

export const NOTES: Note[] = [
  {
    slug: "no-reply-tool-on-chat",
    title: "Why our support agent has no reply tool on chat",
    description:
      "On chat, the agent's final text is the message, so there is no reply tool to skip. A model that logged replies it never sent stopped once the tool went.",
    published: "2026-10-05",
    updated: "2026-10-05",
    tags: ["support agents", "tool design", "agent reliability"],
    related: ["support-agent-platform", "nepse-copilot"],
    body: [
      "On the chat channel, the AI support employee I built has no reply tool: whatever text the model ends its turn with is the message the visitor sees. I removed the tool because one chat-tuned model kept researching an answer, logging a note that said it had replied, and sending nothing. Two rounds of prompt hardening did not stop it. Taking the tool away did, because a failure that needs the tool cannot happen without it.",
      "## The setup",
      "The agent works for a B2B software vendor with two product brands. It runs on three channels that share one agent loop and one tool layer: helpdesk tickets, the vendor's live chat, and a chat widget of its own that sits on the marketing site and inside the client's apps. There are 20 tools in total, and several of them only exist on one channel. On the chat channel the agent can save a visitor's identity, request a human, open a ticket and add to a ticket. Everywhere else, sending a reply is an explicit tool call, alongside tools for writing an internal note and closing the case.",
      "That split made sense on paper. On tickets, a reply is a deliberate act with consequences, so it should be a named action that shows up in the trace. The agent's free text at the end of a turn is its own working, not something a customer should ever read.",
      "## What went wrong",
      "One model, tuned for chat, did the research properly. It searched the knowledge base, found the right article, and then called the note tool with something to the effect of having answered the customer. It never called the reply tool. The trace looked busy and plausible, and the visitor got silence.",
      "I did what most people do first, which was to tell it more firmly. The first round of prompt changes spelled out that the reply tool was the only way to reach the customer and that a note is internal. The second round was stricter and more explicit about the order of operations. Neither fixed it. The model would comply for a while and then do the same thing again.",
      "My reading of why is not complicated. A chat-tuned model has been trained, over a very large number of conversations, to treat its final message as the thing the user reads. Give it a reply tool as well and there are now two places a reply could plausibly go. Under that ambiguity it sometimes chose the habit it was trained into, wrote its answer as text, recorded that it had answered, and stopped. Prompting was asking it to override that habit on every single turn. A tool surface that agrees with the habit does not need to ask.",
      "## The fix",
      "On chat, the reply tool is gone. The model's final text is the message. There is nothing to forget to call, so the agent cannot research an answer and then fail to send it. The failure did not reappear after the change.",
      "This is the channel where it matters most. Nothing on the first-party chat is reviewed before it is sent, so the grounding rule there is absolute: if no retrieved article contains the answer, there is no answer, and the agent asks diagnostic questions or hands over. Review happens afterwards, in the chat inbox in the console. A silent failure on that channel is a visitor waiting for a reply that was never going to arrive.",
      "## Why tickets keep the explicit tool",
      "On helpdesk tickets the agent works in draft mode. Its reply is posted as a private note, and a person on the team copies it, edits it if they want to, and sends it as themselves. In that world the final text of a turn is not a customer message, and treating it as one would be the bug. The reply has to be a deliberate, separately recorded action, because what happens next depends on it: a draft is marked superseded and rewritten if the customer writes again first, and a draft nobody acts on expires after two weeks.",
      "So the two channels have opposite rules for the same idea, and both are correct for their channel. On chat, the natural output of the model is the message. On tickets, the message is an artefact that a person reviews, and it is produced by a call that can be traced.",
      "## Designing the surface instead of prompting harder",
      "The general lesson I took from this is that a model's tool list is a design, and the cheapest way to prevent a class of mistake is often to make it impossible rather than to forbid it. A prompt describes what you want. The tool surface decides what can happen.",
      "The same project has other examples of the same move. The direct-message assistant in Slack can only read, by construction, because it has no write tools, not because it was told not to write. Ticket and account identifiers come from the assembled context and never from model output, so a hallucinated ID has nowhere to go. In NEPSE Copilot, my own investing tool, the voice mode has 31 tools and none of them approve an order. Approval stays on the Telegram card and the orders page, where you can see what you are tapping.",
      "When I see an agent misbehave now, my first question is whether the tools allow the mistake. If they do, and the mistake is one the model's training pulls it towards, I would rather change the tools than add another paragraph to the prompt. Prompt hardening still has its place for judgement calls, tone and grounding rules, but I no longer rely on it to keep a model away from an action it can take with a single call.",
    ],
  },

  {
    slug: "measuring-ai-support-agent-without-ratings",
    title: "Measuring an AI support agent without asking anyone to rate it",
    description:
      "Read the outcome from what people sent: as-is, edited or replaced. Judge quality apart, with a blind judge in alternating order; a person approves learnings.",
    published: "2026-10-05",
    updated: "2026-10-05",
    tags: ["support agents", "evals", "llm-as-judge"],
    related: ["support-agent-platform", "support-intelligence"],
    body: [
      "I measure the AI support employee by comparing each draft it wrote with the reply a person actually sent, and recording whether the draft was used as-is, edited, or replaced. Whether the draft was any good is a separate question, answered by a blind judge that sees both replies in alternating order. Nobody on the team is asked to rate anything, which matters, because when the console offered a rating, almost nobody used it.",
      "## The rating button nobody pressed",
      "On helpdesk tickets the agent works in draft mode. It posts its suggested reply as a private note, and a person copies it, edits it and sends it as themselves. The console I built for the team had a way to approve or reject each draft. In the first month there were 242 drafts, and exactly one of them was approved or rejected in the console.",
      "That is not a complaint about the team. They work in the helpdesk, where the customer is, and the console is somewhere else. Any measurement that depends on people leaving their real tool to fill in a form will measure who has spare time, not how good the drafts are. I treat the 242 as an adoption fact from the code, not a performance claim.",
      "## Read the outcome from what people did",
      "So the outcome is read back out of the helpdesk. A scheduled reconciliation job looks at the reply that was actually sent on each ticket, compares it with the draft, and records one of three results: used as-is, edited, or replaced. The team does nothing different. Their normal work is the signal.",
      "This also gives the draft lifecycle somewhere to land. If the customer writes again before anyone acts, the draft is marked superseded and rewritten, so it is not compared against a reply to a different message. A draft nobody acts on expires after two weeks rather than lingering as an unknown.",
      "## Adoption is not quality",
      "It is tempting to read used as-is as good and replaced as bad. That is wrong often enough to be dangerous. A person might rewrite a perfectly good draft because they prefer their own phrasing, because they know the customer, or because they had already started typing. A draft might be sent as-is because it was late in the day. A human writing something different is not evidence that the draft was worse.",
      "So adoption and quality are kept as two separate measurements. Adoption tells me whether the drafts fit into how the team works. Quality needs its own judge.",
      "## A blind judge, in alternating order",
      "Quality is decided by a model acting as a judge. It sees the customer's message, the agent's draft and the reply the human sent, without being told which is which, and decides which one is better.",
      "The order of the two replies alternates. A judge that is always shown the agent's reply in the same position develops a position bias, a preference for the first or second option that has nothing to do with content. Alternating the order means that bias, if it is there, is spread across both sides instead of quietly favouring one.",
      "## Asking why, only when the agent lost",
      "When the agent's draft loses, the judge is asked a second question: why did the two replies diverge? That question is deliberately not blind. To be useful, the reason has to be able to say that the human reply mentioned a known bug, or that the draft missed the customer's billing state, and it can only say that if it knows which reply is which. So the verdict is blind and the explanation is not.",
      "Asking only on losses keeps the useful material concentrated. A win tells me little I can act on. A loss with a specific reason is something I can turn into a change.",
      "## From verdicts to learnings, through a person",
      "Judged evaluations go through a distiller, which reads them and proposes candidate learnings: short, general statements of what the agent should do differently. Those candidates appear on an evals page in the console, and a person approves or discards each one. Only approved learnings are injected into the system prompt.",
      "That approval step is the part I would not remove. A distiller left to write straight into the prompt will eventually generalise from one odd ticket, or encode a single colleague's preference as policy. A person reading a short candidate list is a small amount of work, and it is the point where the team's judgement enters the loop. It also means the prompt only changes in ways someone has read.",
      "## What I publish and what I don't",
      "The ticket volumes, the share of drafts sent as-is and the agent-versus-human benchmark results belong to the client, and I don't publish them. What I can describe is the shape of the measurement: outcome from behaviour, quality from a blind and order-balanced judge, explanation only where it is needed, and changes to the agent gated on a human.",
      "The same principle shows up elsewhere in my work. In Support Intelligence, the morning dashboard for the same client, the model names recurring issues but is never asked for a number, because counts and medians are computed in code. In the support agent's morning brief, an emerging issue is arithmetic: at least 3 tickets in 24 hours and at least 3 times the daily average of the previous 14 days. Where a measurement can come from something that actually happened, I take it from there, and I keep the model for the parts that need reading.",
    ],
  },

  {
    slug: "intercom-fin-vs-freshdesk-freddy-vs-custom-ai-support-agent",
    title: "Intercom Fin, Freshdesk Freddy, or a custom AI support agent: how to choose",
    description:
      "Pick Fin or Freddy if your help centre answers most questions and no other system is involved. Go custom when a case needs action in billing, trackers or Slack.",
    published: "2026-10-05",
    updated: "2026-10-05",
    tags: ["support agents", "buying guide", "intercom fin", "freshdesk freddy"],
    related: ["support-agent-platform"],
    body: [
      "Use Intercom Fin or Freshdesk Freddy if your customers' questions are answered by your help centre alone and you are happy for the agent to live inside that vendor's product. Build a custom agent when resolving a case means acting in other systems, such as billing, a dev tracker or Slack, when you want the agent on your own site or inside your product, or when you need to choose the model and keep the data in your own accounts. I build custom agents for a living, and I still tell people on the scoping call when the vendor's agent is the better fit.",
      "## What the vendor agents are good at",
      "Both vendor agents are quick to switch on if you already use the helpdesk. They read your help centre, answer questions on chat and email, and hand over to a person when they cannot help. You pay per use rather than for a build.",
      "As of October 2026, Intercom prices Fin at $0.99 per outcome, which its pricing page counts when a customer confirms the issue is resolved, does not ask for more help after Fin responds, or when Fin completes a workflow, including handoffs. A minimum monthly commitment applies for some customers. Intercom also says Fin works alongside other helpdesks, including Salesforce, HubSpot and Freshworks, so it is no longer only an Intercom choice.",
      "As of October 2026, Freshdesk's pricing page includes the first 500 Freddy AI Agent sessions on its Growth, Pro and Enterprise plans, and charges $49 per 100 sessions after that. A session is a unique interaction between a customer and the AI agent; for email, it is a 72-hour window from the customer's first email.",
      "If most of your tickets are how do I questions with answers already written, those prices are hard to beat with a build. I say as much on the services page on this site: for answers from a help centre inside one product, with no actions in other systems, the vendor's agent will be faster to switch on and cheaper to run.",
      "## Where a custom agent earns its cost",
      "The support agent I run in production for a B2B software vendor with two product brands is a useful example of the other side. Its job is the whole front-line job, not only the reply. Before it speaks it checks the customer's billing account in FastSpring and the dev board in monday.com to see whether engineering already knows about the issue. It can extend trials and apply discounts through an approval step, file bugs for engineering, escalate to the right person in Slack, follow up when the customer goes quiet, and close the case. It has 20 tools across those systems. It also drafts missing knowledge-base articles and briefs the team each morning on emerging issues.",
      "Four things pushed that project towards custom.",
      "First, actions in other systems. Most tickets were answerable from documentation, but answering was only part of the work. Someone still had to check the account, check the dev board and remember to follow up. An agent confined to the help centre could not do those parts.",
      "Second, its own widget. Live chat had become an intake form for tickets, and the chat's built-in AI, the weakest responder, sat in front of the strongest. The agent now runs a first-party chat widget on the marketing site and inside the client's apps, with signed sessions, streaming and an origin allowlist, and escalates by opening a ticket where the team already works.",
      "Third, model choice. Production runs on Claude, development on Gemini, and others are available through OpenRouter, in two tiers, standard and light. The light tier does cheap work like topic labels and reranking. The agent is not tied to one vendor's model, and cost per model shows up in the console's analytics.",
      "Fourth, rehearsal. Every action can be run in dry-run first, a master switch stubs every external system, and each integration has its own write gate, so the systems went live one at a time. Any ticket can be replayed to see exactly what the agent would have done. For actions that move money, that matters more than the reply quality.",
      "## Questions I would ask before choosing",
      "Pull the last few hundred tickets and sort them roughly by what resolving them took. If the answer is mostly finding the right article, start with the vendor agent. If a meaningful share needed someone to look something up in billing, change an account, or tell engineering, the vendor agent will hand those to a person, and that might be fine, or it might be exactly the work you wanted to stop doing by hand.",
      "Ask where your customers actually write to you. If it is inside your product or on a site the helpdesk vendor does not control, check whether the vendor's widget fits there before assuming it will.",
      "Ask who should own the data and the prompt. With a custom build the code sits in your repositories and runs in your cloud accounts. With a vendor agent you are renting their decisions, which is often a reasonable trade.",
      "Finally, ask whether your documentation exists. Neither route helps if it does not. An agent grounded in nothing has nothing to say, and writing the first set of articles is sometimes the better first project.",
      "The trade-off on cost is roughly this: the custom route costs more up front and less per ticket, and you own it. The vendor route costs nothing up front and is priced per outcome or per session. The table below sets the two side by side.",
    ],
    table: {
      caption: "Vendor AI agent or custom build, by what you need",
      head: ["If you need", "Vendor agent (Fin, Freddy)", "Custom agent"],
      rows: [
        ["Answers from your help centre", "Strong, fast to switch on", "Same capability, more work to set up"],
        ["Actions in billing, dev tracker, Slack", "Hands over to a person", "Tools for each system, with approval steps"],
        ["A chat widget on your own site or app", "The vendor's widget, where it fits", "A first-party widget you control"],
        ["Choice of model", "The vendor's choice", "Any model, swappable, cost per model visible"],
        ["Data and code ownership", "Stays with the vendor", "Your repositories and cloud accounts"],
        ["Rehearsing actions before they go live", "Limited to what the vendor offers", "Dry-run default, per-integration write gates, replay"],
        ["Pricing shape", "Per outcome (Fin) or per session (Freddy)", "Build cost up front, lower cost per ticket"],
      ],
    },
    sources: [
      { label: "Intercom pricing (Fin AI Agent, $0.99 per outcome)", url: "https://www.intercom.com/pricing" },
      { label: "Fin pricing and supported helpdesks", url: "https://fin.ai/pricing" },
      { label: "Freshdesk pricing (Freddy AI Agent sessions)", url: "https://www.freshworks.com/freshdesk/pricing/" },
    ],
  },

  {
    slug: "approval-steps-for-ai-agents-that-touch-money",
    title: "Approval steps for AI agents that touch money",
    description:
      "Make money-moving actions requests a person approves, need a second admin to cancel, never act on silence, and take identifiers from context, not the model.",
    published: "2026-10-05",
    updated: "2026-10-05",
    tags: ["support agents", "agent safety", "human in the loop"],
    related: ["support-agent-platform", "nepse-copilot"],
    body: [
      "When an AI agent can touch money, I make those actions requests rather than actions: the agent proposes a trial extension or a discount, and a person approves it in Slack or in a billing queue before anything runs against the billing provider. Cancellations need a second admin to confirm, and the agent never cancels because a customer went quiet. Underneath that, identifiers come from context rather than from the model, dry-run is the default, and each integration has its own write gate.",
      "## The setting",
      "The AI support employee I built for a B2B software vendor with two product brands works in the helpdesk, the vendor's live chat and a chat widget of its own, and it can reach the client's billing provider, FastSpring. Among its 20 tools are looking up a billing account, fetching an invoice, applying a discount and cancelling a subscription, plus requesting a trial extension or a marketplace discount. Those are exactly the tools a support hire needs and exactly the ones you do not want a model to call on a whim.",
      "## Requests, approved where the team already is",
      "Trial extensions and discounts do not run when the agent decides they should. The agent sends a request, and a person approves it, either in Slack or in the billing approvals queue in the console. Only then does anything happen in the billing system.",
      "Putting the approval in Slack matters as much as having one. The team already lives there, and the escalation channel is where they talk to the agent anyway. They can mention it to check a ticket, list open tickets, extend a trial or apply a discount. An approval step in a tool nobody opens turns into a backlog, then into someone approving everything without reading it.",
      "## Cancellation needs two people and an explicit yes",
      "Cancelling an account is the action with the least room for error, so it has two separate guards. From Slack, a cancellation requested by one admin needs a second admin to confirm before it runs. In a retention flow with a customer, the agent cancels a subscription only when the customer says so explicitly. It never cancels on silence. A customer who stops replying halfway through a conversation about cancelling has not asked to cancel, and an agent that treats a timeout as consent will eventually cancel someone who simply went to lunch.",
      "## Identifiers come from context, never from the model",
      "Every ticket ID and account ID the tools act on is read from the assembled context: the ticket, the conversation, the billing account that was looked up. None of them come from model output. If the model produces an account number in its reasoning, that number has nowhere to go, because the tool does not accept it as input.",
      "This removes a whole category of failure that no amount of review catches easily. A discount approved for the right reason but applied to the wrong account looks fine in Slack. The safest version is the one where the wrong account was never an option.",
      "## Dry-run first, one integration at a time",
      "Dry-run is the default state. With it on, the agent goes through the whole run and records every action it would take, and writes nothing. A master stub switch goes further and returns canned data from every external system, so the full loop can be exercised without touching a real account. On top of that, each integration has its own write gate.",
      "That combination is what let the systems go live one at a time. Helpdesk writes could be on while billing stayed stubbed, and billing could be switched on later, after the team had watched it rehearse. I work this way on every project: weekly demos run the real system against real data in dry-run, so the client sees every action before it is allowed to take one.",
      "## A system page that says what the agent can do",
      "The console has a system page that lists every capability with three things: its current state, a plain sentence about what that state means for a customer, and the setting that changes it. A capability might read as the agent can look up a customer's billing account but cannot change it, next to the flag that would allow it to.",
      "It started as five LIVE badges, one per integration. That turned out to be the wrong question. A badge that says the dev board integration is live cannot tell you whether the agent is reading the board or writing to it, and for money it cannot tell you whether the agent can look at an invoice or apply a discount. The person approving requests in Slack needs to know which, and so does whoever is answering a customer's complaint about a charge. Plain sentences answer that question, and a badge cannot.",
      "## The same pattern in my own product",
      "NEPSE Copilot, my investing tool for the Nepal Stock Exchange, follows the same rules with real orders. The evening scan proposes orders, each member gets a Telegram card with Approve and Skip, and approved orders are submitted in the next session through a broker adapter. The voice mode has 31 tools and none of them approve an order. IPO auto-apply sits behind a master switch and needs the member's own credentials. There is a paper account that fills at the next session's open with real one-way fees, so a strategy has a record before anyone trusts it with money.",
      "None of these guards are clever. They are the controls a careful finance team would put on a new hire, written into the tool layer so they hold even when the model does something unexpected. The model's job is to notice that a customer qualifies for a trial extension and write a good request, and the decision to grant it stays with a person on the team.",
    ],
  },
];

export function getNote(slug: string) {
  return NOTES.find((n) => n.slug === slug);
}
