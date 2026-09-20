import { ImageResponse } from "next/og";
import { PERSON, SITE } from "./lib/site";

export const dynamic = "force-static";
export const alt = `${SITE.name}: ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", flexDirection: "column",
          justifyContent: "space-between", padding: 72, background: "#f7f5f0", color: "#16181b",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, letterSpacing: 6, textTransform: "uppercase", fontFamily: "monospace" }}>
          <span>{SITE.name}</span>
          <span style={{ color: "#83888d" }}>mytrya.com</span>
        </div>
        <div style={{ fontSize: 62, lineHeight: 1.12, letterSpacing: -1, maxWidth: 980 }}>
          AI agents, internal tools and automation for small B2B teams.
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, fontFamily: "monospace", color: "#4c5155" }}>
          <span>{PERSON.name} · {SITE.locality}</span>
          <span style={{ color: "#9c3b1e" }}>Fixed-scope projects</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
