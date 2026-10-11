import { Breadcrumbs, Cta, Leaf } from "../components/ui";
import JsonLd from "../components/JsonLd";
import { STEPS } from "../lib/process";
import { meta, breadcrumbs } from "../lib/meta";

export const metadata = meta({
  title: "How a project runs",
  description: "A free first call, a written plan with a fixed price, a demo every week, and a handover into your own accounts.",
  path: "/process",
});

export default function ProcessPage() {
  const howTo = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How a project with Mytrya Intelligence runs",
    step: STEPS.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.title, text: s.body })),
  };
  return (
    <>
      <div className="wrap pb-16 pt-10">
        <JsonLd data={[breadcrumbs([{ name: "Home", path: "/" }, { name: "Process", path: "/process" }]), howTo]} />
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Process", href: "/process" }]} />
        <h1 className="h-display mt-8 text-[44px] sm:text-[60px]">How a project runs</h1>
        <p className="mt-5 max-w-[52ch] pb-12 text-[19px] leading-[1.6] text-ink-2">
          Four steps, a fixed price, and nothing goes live until you&rsquo;ve watched it work.
        </p>
        {STEPS.map((s, i) => (
          <Leaf key={s.title} label={`Step ${i + 1}`}>
            <h2 className="h-section text-[26px]">{s.title}</h2>
            <p className="prose-note mt-3">{s.body}</p>
            <p className="mt-4 text-[15px] font-semibold text-sun-ink">{s.output}</p>
          </Leaf>
        ))}
      </div>
      <Cta title="Step one is a thirty-minute call." />
    </>
  );
}
