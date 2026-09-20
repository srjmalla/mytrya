import { SheetHead, Cta, Breadcrumbs } from "../components/Sheet";
import { WorkRow } from "../components/Cards";
import JsonLd from "../components/JsonLd";
import { WORK } from "../lib/work";
import { meta, breadcrumbs } from "../lib/meta";

export const metadata = meta({
  title: "Work",
  description:
    "Five systems built and run by Mytrya: an AI support agent with 13 tools, a stock research tool that grades its own calls, a daily support dashboard, an AI scene partner, and two internal tools. Architecture described in full, clients unnamed.",
  path: "/work",
});

export default function WorkPage() {
  const client = WORK.filter((w) => w.origin === "Client work");
  const own = WORK.filter((w) => w.origin === "Own product");
  return (
    <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8">
      <JsonLd data={breadcrumbs([{ name: "Home", path: "/" }, { name: "Work", path: "/work" }])} />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Work", href: "/work" }]} />
      <h1 className="mt-4 max-w-3xl font-serif text-[34px] leading-[1.12] tracking-[-0.015em] sm:text-[44px]">
        Five systems, each written up as it was built.
      </h1>
      <div className="prose mt-6">
        <p>
          Each case study covers the problem, how data moves through the system, what was built, and the
          decisions that mattered. Client systems are described without naming the client, and metrics that
          belong to a client aren&rsquo;t published. The two products of my own are linked.
        </p>
      </div>

      <section className="mt-12">
        <SheetHead label="Client work" meta={`${client.length} · anonymized`} />
        <ol className="mt-2 border-b rule-hair">
          {client.map((w) => <li key={w.slug} className="border-t rule-hair"><WorkRow w={w} /></li>)}
        </ol>
      </section>
      <section className="mt-12">
        <SheetHead label="Own products" meta={`${own.length} · open them`} />
        <ol className="mt-2 border-b rule-hair">
          {own.map((w) => <li key={w.slug} className="border-t rule-hair"><WorkRow w={w} /></li>)}
        </ol>
      </section>
      <Cta />
    </div>
  );
}
