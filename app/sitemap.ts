import type { MetadataRoute } from "next";
import { PERSON, SITE } from "./lib/site";
import { SERVICES } from "./lib/services";
import { WORK } from "./lib/work";
import { NOTES } from "./lib/notes";
import { ACTIVITY } from "./lib/activity";

export const dynamic = "force-static";

/** Real dates: content pages use their own, pages fed by the daily rebuild use the build date. */
export default function sitemap(): MetadataRoute.Sitemap {
  const built = new Date(ACTIVITY.generatedAt);
  const newest = (dates: string[]) => new Date(dates.sort().at(-1)!);
  const u = (path: string) => `${SITE.url}${path}`;
  return [
    { url: u("/"), lastModified: built, changeFrequency: "daily", priority: 1, images: [u(PERSON.image)] },
    { url: u("/work"), lastModified: newest(WORK.map((w) => w.updated)), changeFrequency: "monthly", priority: 0.9 },
    { url: u("/services"), lastModified: newest(SERVICES.map((s) => s.updated)), changeFrequency: "monthly", priority: 0.9 },
    { url: u("/notes"), lastModified: newest(NOTES.map((n) => n.updated)), changeFrequency: "weekly", priority: 0.8 },
    { url: u("/log"), lastModified: built, changeFrequency: "daily", priority: 0.6 },
    { url: u("/process"), lastModified: new Date("2026-10-05"), changeFrequency: "yearly", priority: 0.7 },
    { url: u("/about"), lastModified: built, changeFrequency: "monthly", priority: 0.7, images: [u(PERSON.image)] },
    { url: u("/faq"), lastModified: new Date("2026-10-05"), changeFrequency: "monthly", priority: 0.8 },
    { url: u("/contact"), lastModified: new Date("2026-10-05"), changeFrequency: "yearly", priority: 0.8 },
    ...SERVICES.map((s) => ({ url: u(`/services/${s.slug}`), lastModified: new Date(s.updated), changeFrequency: "monthly" as const, priority: 0.9 })),
    ...WORK.map((w) => ({ url: u(`/work/${w.slug}`), lastModified: new Date(w.updated), changeFrequency: "monthly" as const, priority: 0.8 })),
    ...NOTES.map((n) => ({ url: u(`/notes/${n.slug}`), lastModified: new Date(n.updated), changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}
