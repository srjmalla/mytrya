/** Single source of truth for identity. Change here, not in pages. */
export const SITE = {
  name: "Mytrya Intelligence",
  /** The short form people say. Used for the manifest short_name and as the schema alternateName. */
  shortName: "Mytrya",
  url: "https://mytrya.com",
  email: "malla.srj@mytrya.com",
  /** Used in <title> templates and the Organization description. */
  tagline: "AI employees for small teams",
  description:
    "Mytrya Intelligence helps small teams work through the change AI is bringing. It builds AI employees that take a whole job off a team, work in the tools the team already uses, and hand off to a person when they should. Run by Suraj Malla.",
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
  bio: "Builds and looks after AI employees for small teams.",
  /** Path under /public. Empty until a real photo exists. */
  image: "/suraj-malla.jpg",
  imageWidth: 720,
  imageHeight: 720,
  knowsAbout: ["AI employees", "AI agents", "AI customer support", "workflow automation", "internal tools"],
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
  replyWithin: "one working day",
} as const;

export function usd(n: number) {
  return `$${n.toLocaleString("en-US")}`;
}

export const NAV = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/process", label: "Process" },
  { href: "/faq", label: "FAQ" },
] as const;

/** The core philosophy. Shown on the home page and the about page. */
export const PHILOSOPHY = {
  line: "AI is changing how work gets done. Mytrya helps you come through it stronger.",
  name: "Mytrya comes from Maitreya, the Buddha who is yet to come. The name is about meeting the future with kindness instead of fear.",
  principles: [
    { title: "Calm in the change", body: "A lotus grows out of mud. Disruption is the ground you grow from, and we help you root in it." },
    { title: "Intelligence that serves", body: "AI should take weight off people, not take away their judgement. The AI employee does the work; you keep the say." },
    { title: "Built to renew", body: "Nothing we build is finished. It keeps learning and adapting as the world moves, so you never have to start over." },
  ],
} as const;

export function absolute(path: string): string {
  return new URL(path, SITE.url).toString();
}
