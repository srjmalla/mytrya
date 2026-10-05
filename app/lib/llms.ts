import { SERVICES } from "./services";
import { WORK } from "./work";
import { NOTES } from "./notes";
import { FAQ } from "./faq";
import { ACTIVITY } from "./activity";
import { AVAILABILITY, PERSON, PRICING, SITE, usd } from "./site";

/** llms.txt and llms-full.txt, generated from the same data as the pages so they can't drift. */
function header() {
  return [
    `# ${SITE.name}`,
    "",
    `> ${SITE.description} Contact: ${SITE.email}.`,
    "",
    `${SITE.name} is run by ${PERSON.name}, an AI engineer in ${SITE.locality}, Nepal (UTC+5:45). ${AVAILABILITY.line}. ` +
      `First projects from ${usd(PRICING.firstProjectFrom)}; most projects ${usd(PRICING.typicalLow)} to ${usd(PRICING.typicalHigh)}, fixed price. ` +
      `Reply within ${PRICING.replyWithin}. Last rebuilt ${ACTIVITY.generatedAt.slice(0, 10)}.`,
  ];
}

export function llmsTxt() {
  return [
    ...header(),
    "",
    "## Services",
    ...SERVICES.map((s) => `- [${s.name}](${SITE.url}/services/${s.slug}): ${s.answer[0]} From ${usd(s.priceFrom)}.`),
    "",
    "## Case files",
    ...WORK.map((w) => `- [${w.name}](${SITE.url}/work/${w.slug}): ${w.line}. ${w.origin}, ${w.status}.${w.url ? ` Live at ${w.url}.` : ""}`),
    "",
    "## Notes",
    ...NOTES.map((n) => `- [${n.title}](${SITE.url}/notes/${n.slug}): ${n.description}`),
    "",
    "## Optional",
    `- [Full text of every page](${SITE.url}/llms-full.txt)`,
    `- [Build log](${SITE.url}/log): changes shipped to ${PERSON.name}'s own products, rebuilt daily`,
    `- [How a project runs](${SITE.url}/process)`,
    `- [FAQ](${SITE.url}/faq)`,
    `- [About ${PERSON.name}](${SITE.url}/about)`,
    "",
  ].join("\n");
}

export function llmsFullTxt() {
  const out = [...header(), ""];
  for (const s of SERVICES) {
    out.push(`## Service: ${s.name}`, `URL: ${SITE.url}/services/${s.slug}`, `From ${usd(s.priceFrom)}`, "", ...s.answer, "");
    out.push("Good fit when:", ...s.fit.map((x) => `- ${x}`), "", "Not the right call when:", ...s.notFit.map((x) => `- ${x}`), "");
    out.push("What gets built:", ...s.builds.map((x) => `- ${x}`), "", "Safety:", ...s.safety.map((x) => `- ${x}`), "");
    for (const f of s.faqs) out.push(`Q: ${f.q}`, `A: ${f.a}`, "");
  }
  for (const w of WORK) {
    out.push(`## Case file: ${w.name}`, `URL: ${SITE.url}/work/${w.slug}`, `${w.origin} · ${w.status} · ${w.year} · ${w.stack}`, "", w.summary, "");
    out.push(...w.facts.map((f) => `- ${f.k}: ${f.v}`), "", "Problem:", ...w.problem, "", "What was built:", ...w.built.map((b) => `- ${b}`), "");
    for (const d of w.decisions) out.push(`### ${d.heading}`, ...d.body, "");
    out.push(`Disclosure: ${w.disclosure}`, "");
  }
  for (const n of NOTES) {
    out.push(`## Note: ${n.title}`, `URL: ${SITE.url}/notes/${n.slug} · published ${n.published}`, "", ...n.body.map((p) => p.replace(/^## /, "### ")), "");
  }
  out.push("## FAQ", "");
  for (const f of FAQ) out.push(`Q: ${f.q}`, `A: ${f.a}`, "");
  return out.join("\n");
}
