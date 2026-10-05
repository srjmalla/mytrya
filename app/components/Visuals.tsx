/**
 * Small product views for each case file, drawn in HTML from what each system
 * actually does. Content is illustrative; the shapes are the real interfaces'.
 */

function Frame({ title, children, className = "min-h-full" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`window ${className}`} aria-hidden>
      <div className="window-bar !h-8 !text-[11px]">
        <span className="window-dots"><i /><i /><i /></span>
        <span className="ml-1 truncate">{title}</span>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

export function SlackApproval() {
  return (
    <Frame title="#billing-approvals">
      <div className="flex gap-3">
        <span className="grid h-8 w-8 flex-none place-items-center rounded-md bg-lime text-[13px] font-bold text-bg">m</span>
        <div className="min-w-0 text-[13px]">
          <p><span className="font-semibold">support agent</span> <span className="font-mono text-[11px] text-ink-3">14:03</span></p>
          <p className="mt-1 text-ink-2">Trial extension requested · 7 days</p>
          <div className="mt-2 rounded-md border border-line bg-white/[0.02] p-2.5 font-mono text-[11.5px] leading-relaxed text-ink-3">
            account: from session<br />history: 0 extensions<br />reason: setting up board sync
          </div>
          <div className="mt-3 flex gap-2">
            <span className="rounded-md bg-lime px-3 py-1 text-[12px] font-semibold text-bg">Approve</span>
            <span className="rounded-md border border-line-2 px-3 py-1 text-[12px] text-ink-2">Decline</span>
          </div>
        </div>
      </div>
    </Frame>
  );
}

export function KbAnswer() {
  return (
    <Frame title="kb.search → reply">
      <p className="font-mono text-[11.5px] text-ink-3">query · “add a teammate”</p>
      <ul className="mt-2 space-y-1.5 font-mono text-[11.5px]">
        <li className="flex justify-between rounded-md border border-lime/30 bg-lime/[0.06] px-2.5 py-1.5"><span className="text-ink">Inviting your team</span><span className="text-lime">0.93</span></li>
        <li className="flex justify-between rounded-md border border-line px-2.5 py-1.5"><span className="text-ink-2">Roles and permissions</span><span className="text-ink-3">0.71</span></li>
        <li className="flex justify-between rounded-md border border-line px-2.5 py-1.5 opacity-60"><span className="text-ink-3">Billing for seats</span><span className="text-ink-3">0.42</span></li>
      </ul>
      <p className="mt-3 text-[13px] leading-relaxed text-ink-2">Go to Settings → Team and choose Invite… <span className="text-lime underline decoration-lime/40">source</span></p>
    </Frame>
  );
}

export function DraftDiff() {
  return (
    <Frame title="drafts · outcome">
      <div className="grid gap-2 text-[12.5px] leading-relaxed">
        <div className="rounded-md border border-line p-2.5">
          <p className="font-mono text-[11px] text-ink-3">agent drafted</p>
          <p className="mt-1 text-ink-2">Thanks for flagging this. <span className="bg-red/15 text-red line-through decoration-red/60">Please try clearing your cache.</span></p>
        </div>
        <div className="rounded-md border border-line p-2.5">
          <p className="font-mono text-[11px] text-ink-3">human sent</p>
          <p className="mt-1 text-ink-2">Thanks for flagging this. <span className="bg-lime/15 text-lime">It&rsquo;s a known bug; the fix ships Thursday.</span></p>
        </div>
      </div>
      <p className="mt-3 flex flex-wrap gap-1.5"><span className="chip">edited</span><span className="chip">blind judge: human</span><span className="chip !border-amber/40 !text-amber">learning proposed</span></p>
    </Frame>
  );
}

function SupportVisual() {
  return (
    <Frame title="support console · today">
      <ul className="space-y-1.5 text-[12.5px]">
        {[
          ["#4182", "Trial extension", "Waiting on approval", "wait"],
          ["#4183", "Charged twice", "Resolved", "done"],
          ["#4184", "CSV export fails", "Linked to dev item", "done"],
          ["#4186", "SSO roadmap?", "With a person", "human"],
        ].map(([id, s, st, k]) => (
          <li key={id} className="flex items-center justify-between gap-3 rounded-md border border-line px-2.5 py-2">
            <span className="min-w-0 truncate"><span className="font-mono text-[11px] text-ink-3">{id}</span> <span className="text-ink-2">{s}</span></span>
            <span className={`font-mono text-[11px] whitespace-nowrap ${k === "wait" ? "text-amber" : k === "done" ? "text-lime" : "text-ink-3"}`}>{st}</span>
          </li>
        ))}
      </ul>
    </Frame>
  );
}

function NepseVisual() {
  const pts = [38, 41, 39, 44, 47, 45, 50, 49, 54, 58, 55, 61];
  const path = pts.map((y, i) => `${i ? "L" : "M"}${(i / (pts.length - 1)) * 200} ${70 - y}`).join(" ");
  return (
    <Frame title="Telegram · NEPSE Copilot">
      <div className="rounded-lg border border-line bg-white/[0.02] p-3">
        <p className="font-mono text-[11px] text-ink-3">Evening scan · proposed order</p>
        <p className="mt-1 text-[14px] font-medium">BUY 10 × a liquid bank scrip</p>
        <svg viewBox="0 0 200 40" className="mt-2 h-10 w-full" preserveAspectRatio="none"><path d={path} fill="none" stroke="var(--lime)" strokeWidth="1.5" /></svg>
        <p className="mt-1 font-mono text-[11px] text-ink-3">conviction 72 · regime: neutral · fits portfolio</p>
        <div className="mt-3 grid grid-cols-2 gap-2 text-center text-[12px]">
          <span className="rounded-md bg-lime py-1 font-semibold text-bg">Approve</span>
          <span className="rounded-md border border-line-2 py-1 text-ink-2">Skip</span>
        </div>
      </div>
    </Frame>
  );
}

function IntelVisual() {
  const bars = [["Login loop after SSO", 92, true], ["Export timeouts", 61, false], ["Seat billing questions", 44, false], ["Webhook retries", 30, false]] as const;
  return (
    <Frame title="support intelligence · 24h">
      <p className="font-mono text-[11px] text-ink-3">recurring issues · counts computed in code</p>
      <ul className="mt-3 space-y-2.5">
        {bars.map(([l, w, hot]) => (
          <li key={l} className="text-[12px]">
            <div className="flex justify-between"><span className="text-ink-2">{l}</span>{hot ? <span className="font-mono text-[11px] text-amber">3.4× avg</span> : null}</div>
            <div className="mt-1 h-1.5 rounded-full bg-white/[0.06]"><div className={`h-full rounded-full ${hot ? "bg-amber" : "bg-ink-3"}`} style={{ width: `${w}%` }} /></div>
          </li>
        ))}
      </ul>
    </Frame>
  );
}

function OffscriptVisual() {
  return (
    <Frame title="offScript · run">
      <div className="space-y-2 text-[12.5px] leading-relaxed">
        <p><span className="font-mono text-[11px] text-ink-3">MAYA</span><br /><span className="text-ink-2">You said you&rsquo;d be here by nine.</span></p>
        <p className="rounded-md border border-lime/30 bg-lime/[0.05] p-2"><span className="font-mono text-[11px] text-lime">YOU · listening</span><br /><span className="text-ink">I know. I&rsquo;m <span className="text-ink-3">sorry. The train…</span></span></p>
        <div className="flex items-center gap-2 font-mono text-[11px] text-ink-3"><span>coverage 64%</span><span>·</span><span>waiting for the last word</span></div>
      </div>
    </Frame>
  );
}

function NarratelyVisual() {
  return (
    <Frame title="Narrately · chapter 3">
      <p className="text-[13px] leading-[1.75] text-ink-3">
        The house had been empty for a year. <span className="rounded bg-lime/15 px-0.5 text-ink">Dust lay on the piano like snow on a field nobody crossed.</span> She opened the window and the curtains breathed in.
      </p>
      <div className="mt-4 flex items-center gap-3 rounded-lg border border-line bg-white/[0.02] px-3 py-2">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-lime text-[11px] text-bg">❚❚</span>
        <div className="h-1 flex-1 rounded-full bg-white/[0.08]"><div className="h-full w-[38%] rounded-full bg-lime" /></div>
        <span className="font-mono text-[11px] text-ink-3">12:04</span>
      </div>
    </Frame>
  );
}

function SignalVisual() {
  return (
    <Frame title="community signal · export">
      <ul className="space-y-1.5 text-[12.5px]">
        {[["“Any way to send this as a PDF?”", 9], ["“Need reminders before due dates”", 7], ["“Can two tools stay in sync?”", 6], ["“Changing my profile photo”", 3]].map(([t, sc]) => (
          <li key={t as string} className={`flex items-center justify-between gap-3 rounded-md border border-line px-2.5 py-2 ${(sc as number) < 6 ? "opacity-45" : ""}`}>
            <span className="truncate text-ink-2">{t}</span>
            <span className={`font-mono text-[11px] ${(sc as number) >= 6 ? "text-lime" : "text-ink-3"}`}>{sc}</span>
          </li>
        ))}
      </ul>
      <p className="mt-2 font-mono text-[11px] text-ink-3">exported: score ≥ 6</p>
    </Frame>
  );
}

export function WorkVisual({ slug }: { slug: string }) {
  switch (slug) {
    case "support-agent-platform":
      return <SupportVisual />;
    case "nepse-copilot":
      return <NepseVisual />;
    case "support-intelligence":
      return <IntelVisual />;
    case "offscript":
      return <OffscriptVisual />;
    case "narrately":
      return <NarratelyVisual />;
    case "community-signal":
      return <SignalVisual />;
    default:
      return null;
  }
}
