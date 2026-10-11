import Link from "next/link";
import { Breadcrumbs, Cta, Leaf, StatusDot, workUp } from "../components/ui";
import JsonLd from "../components/JsonLd";
import { WORK, type Work } from "../lib/work";
import { SITE } from "../lib/site";
import { meta, breadcrumbs } from "../lib/meta";

export const metadata = meta({
  title: "Work: AI employees and tools running today",
  description:
    "Systems built and looked after by Mytrya Intelligence: an AI support employee, a rehearsal partner for actors, an investing assistant, an app that reads your books aloud, and internal tools.",
  path: "/work",
});

function Rows({ items }: { items: Work[] }) {
  return (
    <ol className="rule-b">
      {items.map((w) => (
        <li key={w.slug}>
          <Link href={`/work/${w.slug}`} className="row-link gap-x-8 gap-y-2 md:grid-cols-[minmax(0,1fr)_10rem]">
            <span>
              <span className="row-title h-section block text-[22px] transition-colors">{w.name}</span>
              <span className="mt-1.5 block max-w-[60ch] text-[16.5px] leading-snug text-ink-2">{w.line}.</span>
            </span>
            <span className="meta md:pt-1.5 md:text-right"><StatusDot up={workUp(w.status)} label={w.status} /></span>
          </Link>
        </li>
      ))}
    </ol>
  );
}

export default function WorkPage() {
  const client = WORK.filter((w) => w.origin === "Client work");
  const own = WORK.filter((w) => w.origin === "Own product");
  const list = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: WORK.map((w, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE.url}/work/${w.slug}`, name: w.name })),
  };
  return (
    <>
      <div className="wrap pb-16 pt-10">
        <JsonLd data={[breadcrumbs([{ name: "Home", path: "/" }, { name: "Work", path: "/work" }]), list]} />
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Work", href: "/work" }]} />
        <h1 className="h-display mt-8 text-[44px] sm:text-[60px]">Work</h1>
        <p className="mt-5 max-w-[52ch] pb-12 text-[19px] leading-[1.6] text-ink-2">
          Everything here is running today. Clients aren&rsquo;t named; my own products are linked.
        </p>
        <Leaf label="For clients"><Rows items={client} /></Leaf>
        <Leaf label="Own products"><Rows items={own} /></Leaf>
      </div>
      <Cta />
    </>
  );
}
