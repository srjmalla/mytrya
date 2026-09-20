import { SYSTEMS, PRINCIPLES } from "./lib/systems";
import { SheetHead } from "./components/Sheet";
import SystemIndex from "./components/SystemIndex";
import Teardown from "./components/Teardown";

const EMAIL = "malla.srj@mytrya.com";

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-5 sm:px-8">
      {/* ─────────────────────── masthead ─────────────────────── */}
      <header className="border-b rule-heavy pt-6 pb-5">
        <div className="flex items-baseline justify-between gap-6">
          <a
            href="#top"
            className="font-mono text-[12px] font-semibold uppercase tracking-[0.3em] text-ink"
          >
            Mytrya
          </a>
          <nav className="flex gap-5 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-45 sm:gap-7">
            <a href="#systems" className="hover:text-ink">
              Systems
            </a>
            <a href="#approach" className="hover:text-ink">
              Approach
            </a>
            <a href="#contact" className="hover:text-ink">
              Contact
            </a>
          </nav>
        </div>
      </header>

      <section id="top" className="border-b rule-hair py-14 sm:py-20">
        <h1 className="max-w-3xl font-serif text-[34px] leading-[1.12] tracking-[-0.015em] sm:text-[46px] lg:text-[54px]">
          Suraj Nepse builds AI systems that run unattended in production.
        </h1>

        <div className="mt-9 grid gap-x-14 gap-y-7 lg:grid-cols-[minmax(0,1fr)_15rem]">
          <p className="max-w-[58ch] text-[17px] leading-[1.6] text-ink-70">
            Five of them are below. For each: what it does, how the data actually
            moves through it, and the one decision that mattered more than the
            rest. Client systems are described without naming the client.
            There are no metrics on this page I can&rsquo;t source, which is why
            there are fewer of them than you might expect.
          </p>

          <dl className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-45">
            <div className="flex justify-between gap-4 border-t rule-hair py-2">
              <dt>Practice</dt>
              <dd className="text-ink">Mytrya</dd>
            </div>
            <div className="flex justify-between gap-4 border-t rule-hair py-2">
              <dt>Based</dt>
              <dd className="text-ink">Kathmandu</dd>
            </div>
            <div className="flex justify-between gap-4 border-t border-b rule-hair py-2">
              <dt>Work</dt>
              <dd className="text-ink">Agents, pipelines, internal tools</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* ─────────────────────── index ─────────────────────── */}
      <section id="systems" className="scroll-mt-8 pt-12 pb-16">
        <SheetHead label="Index of systems" meta={`${SYSTEMS.length} entries`} />
        <SystemIndex systems={SYSTEMS} />
      </section>

      {/* ─────────────────────── teardowns ─────────────────────── */}
      <section className="pb-4">
        <div className="flex flex-col gap-20">
          {SYSTEMS.map((s) => (
            <Teardown key={s.slug} system={s} />
          ))}
        </div>
      </section>

      {/* ─────────────────────── approach ─────────────────────── */}
      <section id="approach" className="scroll-mt-8 pt-20 pb-16">
        <SheetHead label="Approach" meta="Positions, not a process" />
        <p className="mt-6 max-w-[62ch] text-[17px] leading-[1.6] text-ink-70">
          Not a four-box diagram of discovery, design, build and launch — every
          practice has one of those and none of them predict anything. These are
          the rules the systems above were actually built under. Each one is
          visible in the code of at least two of them.
        </p>

        <ol className="mt-10 grid gap-x-14 gap-y-0 sm:grid-cols-2">
          {PRINCIPLES.map((p) => (
            <li key={p.n} className="border-t rule-hair py-5">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-[10px] lowercase tracking-[0.1em] text-ink-45">
                  {p.n}
                </span>
                <h3 className="font-serif text-[19px] leading-snug text-ink">
                  {p.title}
                </h3>
              </div>
              <p className="mt-2 max-w-[48ch] text-[15.5px] leading-[1.6] text-ink-70">
                {p.body}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* ─────────────────────── contact ─────────────────────── */}
      <section id="contact" className="scroll-mt-8 border-t rule-heavy pt-12 pb-20">
        <div className="grid gap-x-14 gap-y-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div>
            <h2 className="max-w-2xl font-serif text-[28px] leading-[1.15] tracking-[-0.01em] sm:text-[36px]">
              If something in your operation runs on somebody copying data
              between two tabs, that is the thing to talk about.
            </h2>
            <p className="mt-5 max-w-[58ch] text-[17px] leading-[1.6] text-ink-70">
              Write with the actual problem in it — what the process is, who does
              it, how often, and what goes wrong when it&rsquo;s late. I&rsquo;ll
              tell you whether it&rsquo;s worth automating, including when it
              isn&rsquo;t.
            </p>
          </div>
          <div className="lg:pt-2">
            <a
              href={`mailto:${EMAIL}`}
              className="font-mono text-[15px] text-mark underline decoration-1 hover:no-underline sm:text-[16px]"
            >
              {EMAIL}
            </a>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-45">
              Kathmandu · NPT, UTC+5:45
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────── colophon ─────────────────────── */}
      <footer className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t rule-hair py-6 font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink-45">
        <p>© {new Date().getFullYear()} Mytrya — Suraj Nepse</p>
        <p>Newsreader &amp; IBM Plex Mono · Next.js on Vercel</p>
      </footer>
    </div>
  );
}
