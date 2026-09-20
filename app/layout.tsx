import type { Metadata } from "next";
import { IBM_Plex_Mono, Newsreader } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import JsonLd from "./components/JsonLd";
import { PERSON, SITE } from "./lib/site";

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} · ${SITE.tagline}`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: PERSON.name, url: `${SITE.url}/about` }],
  creator: PERSON.name,
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "en_US",
    url: SITE.url,
    title: `${SITE.name} · ${SITE.tagline}`,
    description: SITE.description,
  },
  twitter: { card: "summary_large_image" },
};

const ORG = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE.url}/#organization`,
  name: SITE.name,
  url: SITE.url,
  logo: `${SITE.url}/opengraph-image`,
  description: SITE.description,
  email: SITE.email,
  founder: { "@id": `${SITE.url}/about#person` },
  numberOfEmployees: { "@type": "QuantitativeValue", value: 1 },
  address: { "@type": "PostalAddress", addressLocality: SITE.locality, addressCountry: SITE.country },
  areaServed: "Worldwide",
  knowsAbout: [
    "AI agents", "customer support automation", "Freshdesk", "Zendesk", "Intercom",
    "internal tools", "data pipelines", "workflow automation", "n8n", "Make",
    "Next.js", "TypeScript", "Postgres", "Claude", "Gemini",
  ],
  contactPoint: { "@type": "ContactPoint", contactType: "sales", email: SITE.email, availableLanguage: ["en"] },
  sameAs: [SITE.github, SITE.linkedin].filter(Boolean),
};

const WEBSITE = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE.url}/#website`,
  url: SITE.url,
  name: SITE.name,
  publisher: { "@id": `${SITE.url}/#organization` },
  inLanguage: "en",
};

const PERSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE.url}/about#person`,
  name: PERSON.name,
  givenName: PERSON.givenName,
  familyName: PERSON.familyName,
  jobTitle: PERSON.jobTitle,
  description: PERSON.bio,
  url: `${SITE.url}/about`,
  email: SITE.email,
  worksFor: { "@id": `${SITE.url}/#organization` },
  address: { "@type": "PostalAddress", addressLocality: SITE.locality, addressCountry: SITE.country },
  sameAs: [SITE.github, SITE.linkedin].filter(Boolean),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${plexMono.variable} ${newsreader.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <JsonLd data={[ORG, WEBSITE, PERSON_LD]} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
