"use client";

import { useState } from "react";
import { SITE } from "../lib/site";

type State = { status: "idle" | "sending" | "sent" | "error"; error?: string };

const BUDGETS = ["Not sure yet", "Under $3k", "$3k–$10k", "$10k–$30k", "Over $30k"];

export default function ContactForm() {
  const [state, setState] = useState<State>({ status: "idle" });
  const [started] = useState(() => Date.now());

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setState({ status: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...data, started }),
      });
      const body = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (res.ok && body.ok) {
        setState({ status: "sent" });
        form.reset();
      } else {
        setState({ status: "error", error: body.error ?? "Sending failed." });
      }
    } catch {
      setState({ status: "error", error: "Network error." });
    }
  }

  if (state.status === "sent") {
    return (
      <div className="border rule-heavy p-6" role="status">
        <p className="font-serif text-[22px] leading-snug">Received.</p>
        <p className="mt-2 text-[15px] leading-relaxed text-ink-70">
          I reply within one working day. If it&rsquo;s urgent, write to{" "}
          <a href={`mailto:${SITE.email}`} className="text-mark underline">{SITE.email}</a>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5" noValidate>
      {/* Honeypot: hidden from people, visible to bots. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" name="name" required autoComplete="name" />
        <Field label="Work email" name="email" type="email" required autoComplete="email" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Company" name="company" autoComplete="organization" hint="Optional" />
        <div>
          <label htmlFor="budget" className="field-label">
            Budget <span className="text-ink-45">· optional</span>
          </label>
          <select id="budget" name="budget" className="field" defaultValue="">
            <option value="">Choose one</option>
            {BUDGETS.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="message" className="field-label">
          The process
        </label>
        <p className="mb-2 text-[13.5px] leading-snug text-ink-45">
          What it is, who does it, how often, and what goes wrong when it&rsquo;s late. Which systems it touches.
        </p>
        <textarea id="message" name="message" required rows={7} className="field" />
      </div>

      {state.status === "error" ? (
        <p role="alert" className="text-[14px] text-mark">
          {state.error} You can also email{" "}
          <a href={`mailto:${SITE.email}`} className="underline">{SITE.email}</a>.
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" className="btn btn-primary btn-lg" disabled={state.status === "sending"}>
          {state.status === "sending" ? "Sending…" : "Send"}
        </button>
        <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-45">
          Reply within one working day
        </p>
      </div>
    </form>
  );
}

function Field({
  label, name, type = "text", required, autoComplete, hint,
}: {
  label: string; name: string; type?: string; required?: boolean; autoComplete?: string; hint?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="field-label">
        {label} {hint ? <span className="text-ink-45">· {hint}</span> : null}
      </label>
      <input id={name} name={name} type={type} required={required} autoComplete={autoComplete} className="field" />
    </div>
  );
}
