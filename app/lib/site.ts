/** Single source of truth for identity. Change here, not in pages. */
export const SITE = {
  name: "Mytrya",
  url: "https://mytrya.com",
  email: "malla.srj@mytrya.com",
  /** Used in <title> templates and the Organization description. */
  tagline: "AI agents, internal tools and automation for small B2B teams",
  description:
    "Mytrya is a one-person AI engineering practice run by Suraj Malla in Kathmandu. It builds AI support agents, internal tools and data pipelines for small B2B software and service companies, on fixed-scope projects.",
  locality: "Kathmandu",
  country: "NP",
  timezone: "Asia/Kathmandu",
  /** Optional scheduling link (Cal.com, Calendly). Empty string hides the button. */
  bookingUrl: "",
  github: "https://github.com/srjmalla",
  /** Add when known; it feeds Person.sameAs for entity disambiguation. */
  linkedin: "",
} as const;

export const PERSON = {
  name: "Suraj Malla",
  givenName: "Suraj",
  familyName: "Malla",
  jobTitle: "AI engineer",
  /** One line, used in bylines and the Person description. */
  bio: "Builds and runs AI agents, internal tools and data pipelines for small B2B teams. Based in Kathmandu.",
} as const;

export const NAV = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/process", label: "Process" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
] as const;

export function absolute(path: string): string {
  return new URL(path, SITE.url).toString();
}
