/** Single source of truth for identity. Change here, not in pages. */
export const SITE = {
  name: "Mytrya Intelligence",
  /** The short form people say. Used for the manifest short_name and as the schema alternateName. */
  shortName: "Mytrya",
  url: "https://mytrya.com",
  email: "malla.srj@mytrya.com",
  /** Used in <title> templates and the Organization description. */
  tagline: "AI employees, internal tools and automation for small B2B teams",
  description:
    "Mytrya Intelligence is an AI engineering practice run by Suraj Malla in Kathmandu. It builds AI employees: agents that take a whole job off a team, work on their own, and hand off to a person when they should. The one in production today handles customer support end to end. It also builds internal tools and data pipelines for small B2B software and service companies, on fixed-scope projects.",
  locality: "Kathmandu",
  country: "NP",
  timezone: "Asia/Kathmandu",
  /** Optional scheduling link (Cal.com, Calendly). Empty string hides the button. */
  bookingUrl: "",
  github: "https://github.com/srjmalla",
  /** Add when known; it feeds Person.sameAs for entity disambiguation. */
  linkedin: "https://www.linkedin.com/in/suraj-malla-960456381/",
} as const;

export const PERSON = {
  name: "Suraj Malla",
  givenName: "Suraj",
  familyName: "Malla",
  jobTitle: "AI engineer",
  /** One line, used in bylines and the Person description. */
  bio: "Builds and runs AI employees, internal tools and data pipelines for small B2B teams. Based in Kathmandu.",
  /** Path under /public. Empty until a real photo exists. */
  image: "/suraj-malla.jpg",
  imageWidth: 720,
  imageHeight: 720,
  knowsAbout: [
    "AI employees", "AI agents", "AI customer support", "LLM evaluation", "retrieval-augmented generation", "tool calling",
    "Freshdesk", "Zendesk", "Intercom", "internal tools", "data pipelines", "workflow automation",
    "text-to-speech", "Next.js", "TypeScript", "Postgres", "Redis", "Claude", "Gemini", "OpenAI",
  ],
} as const;

/** Shown in the live line and on the price block. Change here when it changes. */
export const AVAILABILITY = {
  open: true,
  line: "Taking new projects",
  start: "Start within 2 weeks",
} as const;

/** Published so nobody has to ask. USD. */
export const PRICING = {
  firstProjectFrom: 3000,
  typicalLow: 5000,
  typicalHigh: 20000,
  retainerFrom: 600,
  replyWithin: "one working day",
} as const;

export function usd(n: number) {
  return `$${n.toLocaleString("en-US")}`;
}

export const NAV = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/notes", label: "Notes" },
  { href: "/about", label: "About" },
] as const;

export function absolute(path: string): string {
  return new URL(path, SITE.url).toString();
}
