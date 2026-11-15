import { ImageResponse } from "next/og";
import { SITE } from "./lib/site";

export const dynamic = "force-static";
export const alt = `${SITE.name}: the world is changing. Rise with it.`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#0b0e14", color: "#eef0f4", fontFamily: "sans-serif", overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 30, fontWeight: 600 }}>
          <svg width="52" height="52" viewBox="0 0 64 64">
            <path d="M10 50V18l14 20 14-26v38" fill="none" stroke="#eef0f4" strokeWidth="6" strokeLinecap="square" />
            <rect x="46" y="12" width="9" height="9" fill="#c8f03c" />
            <path d="M50.5 30v20" stroke="#eef0f4" strokeWidth="6" strokeLinecap="square" />
          </svg>
          {SITE.name}
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 96, fontWeight: 600, lineHeight: 1.02, letterSpacing: -4 }}>
          <span>The world is changing.</span>
          <span style={{ display: "flex" }}>Rise with it<span style={{ color: "#c8f03c" }}>.</span></span>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#aab1c0" }}>AI for your business, built to last · mytrya.com</div>
      </div>
    ),
    { ...size },
  );
}
