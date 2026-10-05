import type { Metadata } from "next";
import { JetBrains_Mono, Schibsted_Grotesk, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import JsonLd from "./components/JsonLd";
import { PERSON, PRICING, SITE } from "./lib/site";

const grotesk = Schibsted_Grotesk({ variable: "--font-grotesk", subsets: ["latin"] });
const serif = Source_Serif_4({ variable: "--font-serif4", subsets: ["latin"], style: ["normal", "italic"] });
const mono = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"], weight: ["400", "500"] });

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
  alternates: { types: { "application/rss+xml": `${SITE.url}/feed.xml` } },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "en_US",
    url: SITE.url,
    title: `${SITE.name} · ${SITE.tagline}`,
    description: SITE.description,
    images: ["/opengraph-image"],
  },
  twitter: { card: "summary_large_image", images: ["/opengraph-image"] },
};

const ORG = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  "@id": `${SITE.url}/#organization`,
  name: SITE.name,
  url: SITE.url,
  logo: `${SITE.url}/logo.png`,
  image: `${SITE.url}/opengraph-image`,
  priceRange: `$${PRICING.typicalLow.toLocaleString("en-US")}–$${PRICING.typicalHigh.toLocaleString("en-US")}`,
  description: SITE.description,
  email: SITE.email,
  founder: { "@id": `${SITE.url}/about#person` },
  numberOfEmployees: { "@type": "QuantitativeValue", value: 1 },
  address: { "@type": "PostalAddress", addressLocality: SITE.locality, addressCountry: SITE.country },
  areaServed: "Worldwide",
  knowsAbout: PERSON.knowsAbout,
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
  knowsAbout: PERSON.knowsAbout,
  hasOccupation: { "@type": "Occupation", name: "AI engineer", occupationLocation: { "@type": "City", name: SITE.locality } },
  ...(PERSON.image ? { image: `${SITE.url}${PERSON.image}` } : {}),
  address: { "@type": "PostalAddress", addressLocality: SITE.locality, addressCountry: SITE.country },
  sameAs: [SITE.github, SITE.linkedin].filter(Boolean),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${grotesk.variable} ${serif.variable} ${mono.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        <JsonLd data={[ORG, WEBSITE, PERSON_LD]} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
