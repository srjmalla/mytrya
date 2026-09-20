import type { Metadata } from "next";
import { SITE } from "./site";

/** Consistent per-page metadata: canonical, OG and Twitter derived from one call. */
export function meta(opts: { title: string; description: string; path: string; ogTitle?: string }): Metadata {
  const url = `${SITE.url}${opts.path}`;
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: opts.path },
    openGraph: {
      title: opts.ogTitle ?? `${opts.title} · ${SITE.name}`,
      description: opts.description,
      url,
      siteName: SITE.name,
      type: "website",
    },
    twitter: { card: "summary_large_image", title: opts.ogTitle ?? opts.title, description: opts.description },
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
