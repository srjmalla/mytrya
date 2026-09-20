export type Step = { n: string; title: string; body: string[]; output: string };

export const STEPS: Step[] = [
  {
    n: "1",
    title: "Scoping call",
    body: [
      "Thirty minutes, free. You describe the process: what it is, who does it, how often, what goes wrong when it's late. I ask about the systems it touches and what documentation exists.",
      "Sometimes the answer is that it isn't worth automating yet, or that writing the documentation is the better first project. I say so on the call.",
    ],
    output: "A yes, a no, or a smaller first project.",
  },
  {
    n: "2",
    title: "Written spec and fixed price",
    body: [
      "A short document: what the system will do, which systems it reads and writes, what it will not do, how we'll know it works, and what it costs. You review it. We change it until it's right.",
    ],
    output: "A spec you can hold me to, and a price that doesn't move.",
  },
  {
    n: "3",
    title: "Build, with weekly dry-run demos",
    body: [
      "Every system I build has a dry-run mode from the first week. Each demo shows the real system running against real data and writing nothing. You see every action it would take before it's allowed to take it.",
      "Integrations go live one at a time, each behind its own flag.",
    ],
    output: "A working system you've watched rehearse.",
  },
  {
    n: "4",
    title: "Handover",
    body: [
      "The code lands in your repositories and runs in your cloud accounts. You get documentation, a runbook for when it misbehaves, and a walkthrough with whoever will own it.",
      "After that, ongoing tuning is an optional retainer. Many systems don't need one.",
    ],
    output: "A repo, a runbook, and a system your team can run without me.",
  },
];

export const PRINCIPLES: { title: string; body: string }[] = [
  {
    title: "Dry-run is the default",
    body: "Anything that can write to a system ships with a mode that shows the full trace and writes nothing. That mode is on until you turn it off, one integration at a time.",
  },
  {
    title: "Grounded or escalated",
    body: "An agent may state what it retrieved and cite where it came from. It may not approximate. When there is nothing to ground an answer in, escalating to a person is the correct output.",
  },
  {
    title: "Numbers are computed, not generated",
    body: "Counts, medians, returns and thresholds are computed in code where a test can check them. Models describe and classify. They don't add up.",
  },
  {
    title: "Read the structure that already exists",
    body: "Scripts have scene headings, tickets have fields, boards have columns. Parsing them is exact and free. Asking a model to infer them costs the whole document and returns a guess.",
  },
  {
    title: "Cost is part of the spec",
    body: "Caps per window, shared in-flight requests, and work deferred until someone actually opens the page. A system whose bill grows with curiosity gets switched off.",
  },
  {
    title: "Assume the source will disappear",
    body: "Rate limits are measured, not assumed. The old path stays as a fallback. An unexpected response shape is treated as an outage and reported, never interpreted as data.",
  },
  {
    title: "Identifiers come from context",
    body: "Ticket IDs, account IDs and record keys are read from the assembled context, never from model output. A hallucinated ID has nowhere to go.",
  },
];
