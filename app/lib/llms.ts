import { WORK } from "./work";
import { FAQ } from "./faq";
import { STEPS } from "./process";
import { AVAILABILITY, PERSON, PHILOSOPHY, PRICING, SITE, usd } from "./site";

/** llms.txt and llms-full.txt, generated from the same data as the pages so they can't drift. */
function header() {
  return [
    `# ${SITE.name}`,
    "",
    `> ${SITE.description} Contact: ${SITE.email}.`,
    "",
    `${PHILOSOPHY.line} ${PHILOSOPHY.name}`,
    "",
    `${SITE.name} is run by ${PERSON.name} in ${SITE.locality}, Nepal (UTC+5:45). ${AVAILABILITY.line}. ` +
      `Projects start from ${usd(PRICING.firstProjectFrom)}, fixed price. Reply within ${PRICING.replyWithin}.`,
  ];
}

export function llmsTxt() {
  return [
    ...header(),
    "",
    "## Work",
    ...WORK.map((w) => `- [${w.name}](${SITE.url}/work/${w.slug}): ${w.line}. ${w.origin}, ${w.status}.${w.url ? ` Live at ${w.url}.` : ""}`),
    "",
    "## Optional",
    `- [Full text](${SITE.url}/llms-full.txt)`,
    `- [About](${SITE.url}/about)`,
    `- [How a project runs](${SITE.url}/process)`,
    `- [FAQ](${SITE.url}/faq)`,
    "",
  ].join("\n");
}

export function llmsFullTxt() {
  const out = [...header(), "", "## What we believe", ...PHILOSOPHY.principles.map((p) => `- ${p.title}: ${p.body}`), ""];
  for (const w of WORK) {
    out.push(`## ${w.name}`, `URL: ${SITE.url}/work/${w.slug}`, `${w.origin} · ${w.status} · ${w.year}`, "", w.summary, "");
    out.push("Problem:", ...w.problem, "", "What it does:", ...w.does.map((d) => `- ${d}`), "", w.now, "");
  }
  out.push("## How a project runs", ...STEPS.map((s, i) => `${i + 1}. ${s.title}: ${s.body}`), "");
  out.push("## FAQ", "");
  for (const f of FAQ) out.push(`Q: ${f.q}`, `A: ${f.a}`, "");
  return out.join("\n");
}
