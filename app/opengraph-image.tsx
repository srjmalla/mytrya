import { ImageResponse } from "next/og";
import { PERSON, SITE } from "./lib/site";

export const dynamic = "force-static";
export const alt = `${SITE.name}: AI support employees and internal tools, by ${PERSON.name}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#08090a", color: "#eef0ec", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 26 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 44, height: 44, borderRadius: 10, background: "#eef0ec", color: "#08090a", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>m</div>
            <span style={{ fontWeight: 600 }}>{SITE.name}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, color: "#c6f24e", fontFamily: "monospace", fontSize: 22 }}>
            <div style={{ width: 12, height: 12, borderRadius: 99, background: "#c6f24e" }} />
            Taking new projects
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 76, fontWeight: 700, lineHeight: 1.02, letterSpacing: -3, maxWidth: 960 }}>
          AI support employees that close the case.
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, fontFamily: "monospace", color: "#a7aba5" }}>
          <span>{PERSON.name} · AI engineer · {SITE.locality}</span>
          <span>mytrya.com</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
