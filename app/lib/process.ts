export type Step = { title: string; body: string; output: string };

export const STEPS: Step[] = [
  {
    title: "A first call",
    body: "Thirty minutes, free. You describe the work you'd like taken off your team. Sometimes the honest answer is that it isn't worth automating yet, and I'll say so.",
    output: "A yes, a no, or a smaller first step.",
  },
  {
    title: "A written plan and a fixed price",
    body: "A short document: what we'll build, what it won't do, how we'll know it works, and what it costs. We change it until it's right.",
    output: "A plan you can hold me to, and a price that doesn't move.",
  },
  {
    title: "Build, with a demo every week",
    body: "Each week you see it working on your real cases without changing anything. It is switched on one part at a time, only when you're happy.",
    output: "Something you've watched work before it goes live.",
  },
  {
    title: "Handover",
    body: "It runs in your own accounts. You get documentation and a walkthrough for whoever will look after it. Ongoing care afterwards is optional.",
    output: "A system your team can run without me.",
  },
];
