import type { MetadataRoute } from "next";
import { PERSON, SITE } from "./lib/site";
import { WORK } from "./lib/work";

export const dynamic = "force-static";

/** Real dates: content pages use their own; the rest use the date they last changed. */
export default function sitemap(): MetadataRoute.Sitemap {
  const built = new Date("2026-10-11");
  const u = (path: string) => `${SITE.url}${path}`;
  return [
    { url: u("/"), lastModified: built, changeFrequency: "monthly", priority: 1, images: [u(PERSON.image)] },
    { url: u("/work"), lastModified: built, changeFrequency: "monthly", priority: 0.9 },
    { url: u("/about"), lastModified: built, changeFrequency: "monthly", priority: 0.8, images: [u(PERSON.image)] },
    { url: u("/process"), lastModified: built, changeFrequency: "yearly", priority: 0.7 },
    { url: u("/faq"), lastModified: built, changeFrequency: "monthly", priority: 0.7 },
    { url: u("/contact"), lastModified: built, changeFrequency: "yearly", priority: 0.8 },
    ...WORK.map((w) => ({ url: u(`/work/${w.slug}`), lastModified: new Date(w.updated), changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}
