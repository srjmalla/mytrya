import { PRICING, usd } from "./site";

export type Faq = { q: string; a: string };

/** Site-wide FAQ. Answer-first: the first sentence should work on its own. */
export const FAQ: Faq[] = [
  {
    q: "What does Mytrya Intelligence do?",
    a: "Mytrya helps small teams work through the change AI is bringing. It builds AI employees that take a whole job off a team, along with the internal tools and automation around them. It is run by Suraj Malla.",
  },
  {
    q: "What is an AI employee?",
    a: "An AI employee does a whole job, not just a reply. Give it support, for example, and it reads each case, finds what it needs, answers or asks, follows up, and hands off to a person when it should. It works inside the tools your team already uses.",
  },
  {
    q: "Who is it for?",
    a: "Small teams, roughly 5 to 200 people, where someone spends hours every week on work that follows a pattern: answering the same questions, sorting requests, chasing follow-ups or copying information between systems.",
  },
  {
    q: "How do you keep it from making mistakes?",
    a: "It answers only from your own information, and hands off to a person when the answer isn't there. Anything that can't be undone waits for a person to approve it. Before it goes live you watch it work on real cases without it changing anything.",
  },
  {
    q: "How much does it cost?",
    a: `Projects start from ${usd(PRICING.firstProjectFrom)}, at a fixed price agreed in writing before work starts. The first call, where we work out whether it's worth doing, is free and takes about 30 minutes.`,
  },
  {
    q: "Who owns what you build?",
    a: "You do. Everything is delivered into your own accounts, with documentation and a walkthrough for whoever will look after it.",
  },
  {
    q: "What hours do you work?",
    a: "Working hours cover the full European day and the US East Coast morning. Calls are scheduled in your time zone.",
  },
  {
    q: "How do I start?",
    a: `Use the contact form or write to malla.srj@mytrya.com. Describe the work you'd like taken off your team. You'll get a reply within ${PRICING.replyWithin}.`,
  },
];

/** The ones shown on the home page. */
export const FAQ_HOME = [1, 3, 4, 5].map((i) => FAQ[i]);
