import type { Metadata } from "next";
import { SITE } from "./site";

/**
 * Per-page metadata: canonical, OG and Twitter from one call. Page-level openGraph
 * replaces the root's rather than merging, so the image is set here every time.
 */
export function meta(opts: {
  title: string;
  description: string;
  path: string;
  ogTitle?: string;
  type?: "website" | "article";
  published?: string;
  updated?: string;
  /** Overrides the default OG card, e.g. a portrait on /about. */
  image?: { url: string; width: number; height: number; alt: string };
}): Metadata {
  const url = `${SITE.url}${opts.path}`;
  const image = opts.image ?? { url: "/opengraph-image", width: 1200, height: 630, alt: `${SITE.name}` };
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: opts.path },
    openGraph: {
      title: opts.ogTitle ?? opts.title,
      description: opts.description,
      url,
      siteName: SITE.name,
      locale: "en_US",
      images: [image],
      ...(opts.type === "article"
        ? { type: "article", publishedTime: opts.published, modifiedTime: opts.updated }
        : { type: "website" }),
    },
    twitter: { card: opts.image ? "summary" : "summary_large_image", title: opts.ogTitle ?? opts.title, description: opts.description, images: [image.url] },
  };
}

export function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE.url}${it.path}`,
    })),
  };
}
