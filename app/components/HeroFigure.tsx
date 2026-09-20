/**
 * A system map drawn in SVG: three channels feed one agent, which acts in four
 * systems. Labels are the real ones from the support agent platform under Work.
 * Motion is a slow dash along the wires, disabled under prefers-reduced-motion.
 */
export default function HeroFigure() {
  const left = [
    { y: 52, label: "Helpdesk", sub: "tickets" },
    { y: 132, label: "Live chat", sub: "vendor" },
    { y: 212, label: "Chat widget", sub: "your site" },
  ];
  const right = [
    { y: 32, label: "Billing", sub: "refund · extend" },
    { y: 96, label: "Dev board", sub: "search · create" },
    { y: 160, label: "Knowledge base", sub: "retrieve · cite" },
    { y: 224, label: "Slack", sub: "escalate" },
  ];
  const core = { x: 160, y: 92, w: 116, h: 88 };
  const cx = core.x + core.w / 2;
  const cy = core.y + core.h / 2;

  return (
    <svg
      viewBox="0 0 440 280"
      role="img"
      aria-label="Three channels, a helpdesk, live chat and a chat widget, feed one agent loop, which reads and acts in billing, a dev board, a knowledge base and Slack, with dry-run on by default."
      className="fig block h-auto w-full"
    >
      {/* wires: left channels into the agent */}
      {left.map((n) => {
        const x1 = 112;
        const y1 = n.y + 16;
        const d = `M${x1} ${y1} C ${x1 + 30} ${y1}, ${core.x - 30} ${cy}, ${core.x} ${cy}`;
        return (
          <g key={n.label}>
            <path d={d} className="fig-line" />
            <path d={d} className="fig-flow" />
          </g>
        );
      })}
      {/* wires: agent into the systems */}
      {right.map((n) => {
        const x2 = 320;
        const y2 = n.y + 16;
        const d = `M${core.x + core.w} ${cy} C ${core.x + core.w + 30} ${cy}, ${x2 - 30} ${y2}, ${x2} ${y2}`;
        return (
          <g key={n.label}>
            <path d={d} className="fig-line" />
            <path d={d} className="fig-flow" />
          </g>
        );
      })}

      {/* left nodes */}
      {left.map((n) => (
        <g key={n.label}>
          <rect x="12" y={n.y} width="100" height="32" className="fig-node" />
          <text x="22" y={n.y + 14} className="fig-strong">{n.label}</text>
          <text x="22" y={n.y + 25} className="fig-dim">{n.sub}</text>
        </g>
      ))}

      {/* right nodes */}
      {right.map((n) => (
        <g key={n.label}>
          <rect x="320" y={n.y} width="108" height="32" className="fig-node" />
          <text x="330" y={n.y + 14} className="fig-strong">{n.label}</text>
          <text x="330" y={n.y + 25} className="fig-dim">{n.sub}</text>
        </g>
      ))}

      {/* the agent */}
      <rect x={core.x} y={core.y} width={core.w} height={core.h} className="fig-core" />
      <text x={cx} y={core.y + 22} textAnchor="middle" className="fig-core-text">Agent loop</text>
      <text x={cx} y={core.y + 36} textAnchor="middle" className="fig-core-text" opacity="0.6">20 tools</text>
      <line x1={core.x + 14} x2={core.x + core.w - 14} y1={core.y + 48} y2={core.y + 48} className="fig-core-line" />
      <text x={cx} y={core.y + 64} textAnchor="middle" className="fig-core-text" opacity="0.6">grounded · cited</text>
      <text x={cx} y={core.y + 76} textAnchor="middle" className="fig-core-text" opacity="0.6">or escalated</text>

      {/* dry-run tag */}
      <rect x={core.x + 8} y={core.y + core.h + 12} width={core.w - 16} height="20" className="fig-node" />
      <circle cx={core.x + 20} cy={core.y + core.h + 22} r="3" className="fig-live" />
      <text x={core.x + 29} y={core.y + core.h + 25.5} className="fig-mark">dry-run · on</text>

      {/* caption */}
      <text x="12" y="270" className="fig-dim">Fig. 1 · one system under Work, as built</text>
    </svg>
  );
}
