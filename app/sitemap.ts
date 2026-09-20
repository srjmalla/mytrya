import type { MetadataRoute } from "next";
import { SITE } from "./lib/site";
import { SERVICES } from "./lib/services";
import { WORK } from "./lib/work";

export const dynamic = "force-static";

const LAST = new Date("2026-09-20");

export default function sitemap(): MetadataRoute.Sitemap {
  const top: MetadataRoute.Sitemap = [
    { url: `${SITE.url}/`, lastModified: LAST, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE.url}/services`, lastModified: LAST, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE.url}/work`, lastModified: LAST, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE.url}/process`, lastModified: LAST, changeFrequency: "yearly", priority: 0.7 },
    { url: `${SITE.url}/about`, lastModified: LAST, changeFrequency: "yearly", priority: 0.7 },
    { url: `${SITE.url}/faq`, lastModified: LAST, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE.url}/contact`, lastModified: LAST, changeFrequency: "yearly", priority: 0.8 },
  ];
  const services = SERVICES.map((s) => ({
    url: `${SITE.url}/services/${s.slug}`, lastModified: LAST, changeFrequency: "monthly" as const, priority: 0.9,
  }));
  const work = WORK.map((w) => ({
    url: `${SITE.url}/work/${w.slug}`, lastModified: LAST, changeFrequency: "yearly" as const, priority: 0.8,
  }));
  return [...top, ...services, ...work];
}
