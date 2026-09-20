/**
 * Cloudflare Pages Function: POST /api/contact
 * Receives the contact form, relays it by email through Resend.
 *
 * Secrets (set with `wrangler pages secret put` or in the dashboard):
 *   RESEND_API_KEY   required
 *   CONTACT_TO       optional, defaults to malla.srj@mytrya.com
 *   CONTACT_FROM     optional, must be a Resend-verified sender
 */

interface Env {
  RESEND_API_KEY?: string;
  CONTACT_TO?: string;
  CONTACT_FROM?: string;
}

type Ctx = { request: Request; env: Env };

const MAX = { name: 120, email: 200, company: 160, message: 6000, budget: 60 };

function clean(v: unknown, max: number): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });
}

export async function onRequestPost({ request, env }: Ctx): Promise<Response> {
  let data: Record<string, unknown>;
  try {
    const ct = request.headers.get("content-type") ?? "";
    data = ct.includes("application/json")
      ? await request.json()
      : Object.fromEntries((await request.formData()).entries());
  } catch {
    return json({ ok: false, error: "Could not read the form." }, 400);
  }

  // Honeypot: real users never see this field. Bots fill it. Pretend success.
  if (clean(data.website, 200)) return json({ ok: true });

  // Minimum fill time: the form stamps when it rendered.
  const started = Number(data.started ?? 0);
  if (started && Date.now() - started < 3000) return json({ ok: true });

  const name = clean(data.name, MAX.name);
  const email = clean(data.email, MAX.email);
  const company = clean(data.company, MAX.company);
  const budget = clean(data.budget, MAX.budget);
  const message = clean(data.message, MAX.message);

  if (!name || !email || !message) {
    return json({ ok: false, error: "Name, email and a description are required." }, 400);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ ok: false, error: "That email address doesn't look right." }, 400);
  }

  if (!env.RESEND_API_KEY) {
    return json({ ok: false, error: "Mail isn't configured yet. Email malla.srj@mytrya.com directly." }, 503);
  }

  const to = env.CONTACT_TO ?? "malla.srj@mytrya.com";
  const from = env.CONTACT_FROM ?? "Mytrya site <contact@mytrya.com>";

  const text = [
    `From:    ${name} <${email}>`,
    company ? `Company: ${company}` : null,
    budget ? `Budget:  ${budget}` : null,
    "",
    message,
    "",
    "--",
    `Sent from the mytrya.com contact form · ${new Date().toISOString()}`,
    `IP country: ${request.headers.get("cf-ipcountry") ?? "?"}`,
  ]
    .filter((l) => l !== null)
    .join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      authorization: `Bearer ${env.RESEND_API_KEY}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `[mytrya.com] ${name}${company ? ` · ${company}` : ""}`,
      text,
    }),
  });

  if (!res.ok) {
    return json({ ok: false, error: "Sending failed. Email malla.srj@mytrya.com directly." }, 502);
  }
  return json({ ok: true });
}

export async function onRequest(): Promise<Response> {
  return json({ ok: false, error: "POST only." }, 405);
}
