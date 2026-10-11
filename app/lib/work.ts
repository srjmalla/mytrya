/**
 * Case files, told as outcomes: the problem, what the system does for the people using it, and where it
 * stands now. No stacks, tools, models or build decisions; how a system is built is not published.
 */
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
  /** Short title for search results and shares (under ~60 characters). */
  seoTitle: string;
  metaDescription: string;
  /** ISO dates: first published on this site, last materially changed. */
  published: string;
  updated: string;
  url?: string;
  /** Path under /public, when a real screenshot exists. */
  image?: { src: string; alt: string; width: number; height: number };
  problem: string[];
  does: string[];
  now: string;
};

export const WORK: Work[] = [
  {
    slug: "support-agent-platform",
    name: "AI support employee",
    line: "An AI member of a support team that takes a case from the first message to closed",
    summary:
      "A software company with two products wanted its support team to stop spending the day on cases the documentation already answered. Mytrya built an AI support employee that does the whole front-line job. It reads each case, finds what it needs to know, answers or asks the customer, reports bugs to engineering, hands off to the right person with a summary, follows up when the customer goes quiet, and closes the case. It works in the helpdesk, in live chat, and in a chat window on the company's own site and apps.",
    origin: "Client work",
    status: "In production",
    year: "2026",
    seoTitle: "AI support employee: a case from first message to closed",
    metaDescription:
      "Case study: an AI support employee for a software company that handles cases end to end across the helpdesk, live chat and the company's own site, and hands off to a person when it should. Built by Mytrya Intelligence.",
    published: "2026-09-20",
    updated: "2026-10-11",
    problem: [
      "Most tickets could be answered from documentation that already existed. A person still had to read each one, find the article, check the account, check whether engineering already knew, write the reply and remember to follow up.",
      "Live chat had turned into a ticket form. Almost nobody answered chats directly, so every chat became one more ticket.",
    ],
    does: [
      "Answers from the company's own documentation, and asks or hands off when the answer isn't there",
      "Reports bugs to engineering and tells the customer when the fix is out",
      "Hands off to the right person with a written summary of what it found",
      "Follows up on its own when a customer goes quiet, then closes the case",
      "Briefs the team each morning on issues that are starting to repeat",
      "Drafts help articles for the questions nobody has written up yet",
    ],
    now: "In production. On tickets a person reviews each reply before it goes out; on chat it answers customers directly. It learns from the replies the team actually sends, and a person approves each lesson before it is used. The client isn't named and its figures aren't published.",
  },
  {
    slug: "offscript",
    name: "offScript",
    line: "A rehearsal partner for actors that reads the other parts and listens to yours",
    summary:
      "offScript lets an actor rehearse a scene alone. Upload a script and it gives every other character a voice, reads their lines with the delivery you ask for, listens while you say yours, and tells you afterwards which lines you don't know yet. You can give it notes the way a director would, ask for a breakdown of the scene, or improvise.",
    origin: "Own product",
    status: "Live",
    year: "2026",
    seoTitle: "offScript: a rehearsal partner for actors",
    metaDescription:
      "offScript is a rehearsal partner for actors: it voices the other characters, takes direction, waits for your line, and shows which lines you still don't know. Built by Mytrya Intelligence.",
    published: "2026-09-20",
    updated: "2026-10-11",
    url: "https://offscript.mytrya.com",
    image: { src: "/work/offscript.png", alt: "offScript home page: a dark stage-lit landing with an actor's quote, a video clip, and an I'm ready button.", width: 1440, height: 900 },
    problem: [
      "Rehearsing alone means reading both parts, so you end up learning your cues instead of your lines.",
      "Ordinary voice assistants don't work for this. They jump in whenever you pause, and in a scene the pause is often the point.",
    ],
    does: [
      "Gives every other character a voice",
      "Reads their lines the way you direct them",
      "Waits for you to finish your line, not for a silence",
      "Shows which lines you still don't own",
      "Breaks down a scene the way a dramaturg would",
      "Lets you improvise a pitch or an interview",
    ],
    now: "Live at offscript.mytrya.com. Works in Chrome or Edge, with headphones.",
  },
  {
    slug: "nepse-copilot",
    name: "NEPSE Copilot",
    line: "An investing assistant for the Nepal Stock Exchange that keeps score of its own ideas",
    summary:
      "NEPSE Copilot helps a family look after several share accounts on the Nepal Stock Exchange in one place. It follows the market every day, explains in plain English or Nepali which shares are worth a look and why, suggests orders that the owner approves with one tap on their phone, and keeps an honest record of whether each idea worked out.",
    origin: "Own product",
    status: "Live · sign-in",
    year: "2026",
    seoTitle: "NEPSE Copilot: an investing assistant that keeps score",
    metaDescription:
      "NEPSE Copilot is an investing assistant for the Nepal Stock Exchange that keeps several family accounts in one view, explains what is worth a look, and checks its own suggestions against the market. Built by Mytrya Intelligence.",
    published: "2026-09-20",
    updated: "2026-10-11",
    url: "https://nepse.mytrya.com",
    problem: [
      "Retail investors in Nepal work from broker screenshots and group chats. The market publishes every trade each day, and almost nobody reads it.",
      "Nothing kept several family accounts in one view, explained what was worth a look in plain language, or kept score of whether its own suggestions were right.",
    ],
    does: [
      "Shows every family member's holdings and IPO applications in one place",
      "Explains which shares are worth a look, with the reasons",
      "Suggests orders, and places nothing until the owner approves it on their phone",
      "Tries strategies on paper, with real fees, before any money moves",
      "Checks each suggestion against what the market did afterwards",
      "Answers questions by voice in English or Nepali",
    ],
    now: "Live and in daily use. Access is by sign-in, so the link opens the sign-in page.",
  },
  {
    slug: "narrately",
    name: "Narrately",
    line: "Your own books, read aloud, with the text on screen",
    summary:
      "Narrately turns books people already own into audiobooks. Upload an EPUB, PDF or text file and it reads it aloud with the current sentence highlighted, skips the copyright pages and the previews of other books, works in Nepali as well as English, and saves books for listening offline.",
    origin: "Own product",
    status: "Live · invite-only",
    year: "2026",
    seoTitle: "Narrately: your own books read aloud",
    metaDescription:
      "Narrately reads your own EPUB, PDF and text files aloud with the sentence highlighted, in Nepali and English, and saves them for offline listening. Built by Mytrya Intelligence.",
    published: "2026-10-05",
    updated: "2026-10-11",
    url: "https://narrately.mytrya.com",
    problem: [
      "Most books people own will never get an audiobook, and almost none in Nepali.",
      "Ordinary text-to-speech reads a file from top to bottom, including the contents pages and the preview of the author's next book, and makes you wait before the first word.",
    ],
    does: [
      "Reads your own EPUB, PDF and text files",
      "Highlights each sentence as it is read",
      "Skips contents pages, copyright notices and previews",
      "Starts playing in about a second",
      "Saves books for offline listening",
      "Monthly plans, paid with eSewa",
    ],
    now: "Live at narrately.mytrya.com, by invitation. Each book stays private to the reader who uploaded it.",
  },
  {
    slug: "support-intelligence",
    name: "Support Intelligence",
    line: "A morning summary of the support desk for people who don't read tickets",
    summary:
      "Leadership at a software company wanted to know what customers were telling support without reading tickets. Support Intelligence reads the previous day's tickets every morning and says what keeps coming up and what it means for product, sales, marketing and operations.",
    origin: "Client work",
    status: "In production",
    year: "2025",
    seoTitle: "Support Intelligence: a daily read of a support desk",
    metaDescription:
      "Support Intelligence reads a support desk every morning and tells leadership what keeps coming up and what it means for each team. Built by Mytrya Intelligence.",
    published: "2026-09-20",
    updated: "2026-10-11",
    problem: [
      "Reading tickets is the only reliable way to hear what customers are saying, and nobody in leadership had the hours.",
      "The existing reports counted tickets. They didn't say what the tickets were about.",
    ],
    does: [
      "Reads yesterday's tickets each morning",
      "Names the issues that keep coming up",
      "Says what each one means for product, sales, marketing and operations",
      "Shows the counts and response times alongside",
    ],
    now: "In daily use since 2025. It is internal to the client, so it isn't linked.",
  },
  {
    slug: "community-signal",
    name: "Community Signal",
    line: "Two small tools that each replaced a weekly manual task",
    summary:
      "Two tools for the same software company. One finds public forum posts where people describe a problem the company's products already solve, so the team can answer them. The other gives a plain summary of what the marketing team is working on.",
    origin: "Client work",
    status: "Internal",
    year: "2025",
    seoTitle: "Community Signal: two tools that replaced weekly chores",
    metaDescription:
      "Two small internal tools: one finds forum posts worth answering, the other summarises what marketing is working on. Each replaced a weekly manual task. Built by Mytrya Intelligence.",
    published: "2026-09-20",
    updated: "2026-10-11",
    problem: [
      "Two questions came up every week: where are people describing a problem we already solve, and what is marketing working on right now?",
      "Both could be answered by hand. Both were answered late.",
    ],
    does: ["Finds forum posts worth answering, best first", "Summarises the marketing team's work in one view"],
    now: "Internal to the client. Each tool saves about an hour of someone's week.",
  },
];

export function getWork(slug: string) {
  return WORK.find((w) => w.slug === slug);
}
