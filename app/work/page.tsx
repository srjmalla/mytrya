import Link from "next/link";
import { Breadcrumbs, Cta, Leaf, StatusDot, workUp } from "../components/ui";
import JsonLd from "../components/JsonLd";
import { WORK, type Work } from "../lib/work";
import { SITE } from "../lib/site";
import { meta, breadcrumbs } from "../lib/meta";

export const metadata = meta({
  title: "Case files: AI systems built and run in production",
  description:
    "Six systems built and run by Mytrya Intelligence: an AI support employee that handles cases end to end, an investing copilot that grades its own calls, a daily support dashboard, an AI scene partner, an app that reads your books aloud, and two internal tools.",
  path: "/work",
});

function Rows({ items }: { items: Work[] }) {
  return (
    <ol className="rule-b">
      {items.map((w) => (
        <li key={w.slug}>
          <Link href={`/work/${w.slug}`} className="row-link gap-x-6 gap-y-1 px-1 md:grid-cols-[3.5rem_minmax(0,1fr)_11rem]">
            <span className="meta pt-1">{w.year}</span>
            <span>
              <span className="row-title h-section text-[23px]">{w.name}</span>
              <span className="mt-1.5 block max-w-[64ch] text-[17px] leading-snug text-ink-2">{w.line}</span>
              <span className="meta mt-2 block">{w.stack}</span>
            </span>
            <span className="meta md:pt-1 md:text-right">
              <StatusDot up={workUp(w.status)} label={w.status} />
              {w.url ? <span className="block">{w.url.replace("https://", "")} ↗</span> : null}
            </span>
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
        <h1 className="h-display mt-8 max-w-[18ch] text-[44px] sm:text-[60px]">Case files</h1>
        <p className="mt-6 max-w-[62ch] pb-12 text-[19px] leading-[1.6] text-ink-2">
          Every system here is one I built and run. Each file covers the problem, how data moves, what was built and the
          decisions that mattered, including the ones that didn&rsquo;t work the first time. Client names and client-owned
          metrics are withheld; my own products are linked so you can open them.
        </p>
        <Leaf label="Client work" note={<p>{client.length} systems · client not named</p>}>
          <Rows items={client} />
        </Leaf>
        <Leaf label="Own products" note={<p>{own.length} products · live, open them</p>}>
          <Rows items={own} />
        </Leaf>
      </div>
      <Cta />
    </>
  );
}
