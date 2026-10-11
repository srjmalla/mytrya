import Link from "next/link";
import { Cta, FaqList, StatusDot, Sun, workUp } from "./components/ui";
import { WORK } from "./lib/work";
import { FAQ_HOME } from "./lib/faq";
import { PERSON, PHILOSOPHY, SITE } from "./lib/site";
import { meta } from "./lib/meta";

export const metadata = meta({
  title: `${SITE.name} · AI employees for small teams`,
  ogTitle: `${SITE.name} · The world changed. Change with it.`,
  description: SITE.description,
  path: "/",
});

const BUILDS = [
  { title: "AI employees", body: "Take a whole job off your team, such as support, and hand off to a person when they should." },
  { title: "Internal tools", body: "Show the people who decide what is actually happening, every morning, without anyone digging." },
  { title: "Automation", body: "The copying, chasing and sorting that eats someone's week, done quietly in the background." },
];

export default function Home() {
  const featured = ["support-agent-platform", "offscript", "nepse-copilot"]
    .map((s) => WORK.find((w) => w.slug === s))
    .filter((w): w is (typeof WORK)[number] => Boolean(w));

  return (
    <>
      <section className="relative overflow-hidden">
        <Sun className="-right-24 -bottom-[300px] h-[600px] w-[600px] sm:-right-10 sm:-bottom-[330px] sm:h-[680px] sm:w-[680px]" />
        <div className="wrap relative pb-24 pt-20 sm:pb-32 sm:pt-28">
          <h1 className="h-display max-w-[13ch] text-[48px] sm:text-[76px]">
            The world changed. Change with it<span className="text-sun">.</span>
          </h1>
          <p className="mt-6 max-w-[42ch] text-[18px] leading-[1.55] text-ink-2 sm:text-[20px]">
            Mytrya builds AI employees that take on the new work, so your team stays calm and keeps growing.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/contact" className="btn btn-ink">Book a call</Link>
            <Link href="/work" className="btn btn-line">See the work</Link>
          </div>
        </div>
      </section>

      <div className="wrap">
        <section className="rule-t py-20 sm:py-28" aria-labelledby="why-h">
          <p className="kicker">Why Mytrya</p>
          <h2 id="why-h" className="h-display mt-4 max-w-[22ch] text-[34px] sm:text-[48px]">{PHILOSOPHY.line}</h2>
          <ul className="mt-12 grid gap-x-10 gap-y-8 md:grid-cols-3">
            {PHILOSOPHY.principles.map((p) => (
              <li key={p.title} className="rule-t pt-6">
                <h3 className="h-section text-[20px]">{p.title}</h3>
                <p className="mt-2 text-[16px] leading-[1.6] text-ink-2">{p.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="rule-t py-20 sm:py-28" aria-labelledby="build-h">
          <p className="kicker">What we build</p>
          <h2 id="build-h" className="h-display mt-4 max-w-[20ch] text-[34px] sm:text-[48px]">Help that works inside the tools you already use.</h2>
          <dl className="mt-12 grid gap-x-10 gap-y-8 md:grid-cols-3">
            {BUILDS.map((b) => (
              <div key={b.title} className="rule-t pt-6">
                <dt className="h-section text-[20px]">{b.title}</dt>
                <dd className="mt-2 text-[16px] leading-[1.6] text-ink-2">{b.body}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="rule-t py-20 sm:py-28" aria-labelledby="work-h">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="kicker">Work</p>
              <h2 id="work-h" className="h-display mt-4 text-[34px] sm:text-[48px]">Running today</h2>
            </div>
            <Link href="/work" className="a text-[15px]">All work</Link>
          </div>
          <ol className="rule-b mt-10">
            {featured.map((w) => (
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
        </section>

        <section className="rule-t py-20 sm:py-28" aria-labelledby="who-h">
          <div className="grid items-center gap-10 md:grid-cols-[minmax(0,300px)_minmax(0,1fr)] md:gap-16">
            <div className="overflow-hidden rounded-[20px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={PERSON.image} alt={`${PERSON.name} in ${SITE.locality}`} width={720} height={720} loading="lazy" className="block aspect-square w-full object-cover" />
            </div>
            <div>
              <p className="kicker">Who you&rsquo;ll work with</p>
              <h2 id="who-h" className="h-display mt-4 text-[34px] sm:text-[48px]">{PERSON.name}</h2>
              <p className="mt-5 max-w-[50ch] text-[17px] leading-[1.65] text-ink-2">
                I run Mytrya from {SITE.locality}. The person on your first call is the person who builds your AI employee
                and looks after it afterwards.
              </p>
              <Link href="/about" className="btn btn-line mt-7">About Mytrya</Link>
            </div>
          </div>
        </section>

        <section className="rule-t py-20 sm:py-28" aria-labelledby="faq-h">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
            <div>
              <p className="kicker">Questions</p>
              <h2 id="faq-h" className="h-display mt-4 text-[34px] sm:text-[48px]">Before you write</h2>
              <Link href="/faq" className="a mt-6 inline-block text-[15px]">All questions</Link>
            </div>
            <FaqList items={FAQ_HOME} />
          </div>
        </section>
      </div>

      <Cta />
    </>
  );
}
