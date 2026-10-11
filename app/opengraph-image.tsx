import { ImageResponse } from "next/og";
import { SITE } from "./lib/site";

export const dynamic = "force-static";
export const alt = `${SITE.name}: the world changed. Change with it.`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#ffffff", color: "#1c1834", fontFamily: "sans-serif", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: -80, bottom: -420, width: 820, height: 820, borderRadius: 999, backgroundImage: "radial-gradient(circle, #ffe2c4 0%, #fff1e4 45%, #ffffff 70%)", border: "1px solid #f3cfae" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 30, fontWeight: 700 }}>
          <svg width="52" height="52" viewBox="0 0 64 64">
            <path d="M32 12c7 8 7 22 0 34-7-12-7-26 0-34z" fill="#e0812f" />
            <path d="M30 46C20 42 12 32 12 22c9 2 16 8 19 16M34 46c10-4 18-14 18-24-9 2-16 8-19 16" fill="none" stroke="#1c1834" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M14 52h36" stroke="#1c1834" strokeWidth="5" strokeLinecap="round" />
          </svg>
          {SITE.name}
        </div>
        <div style={{ display: "flex", fontSize: 92, fontWeight: 800, lineHeight: 1.02, letterSpacing: -4, maxWidth: 820 }}>
          The world changed. Change with it.
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#4f4b63" }}>AI employees for small teams · mytrya.com</div>
      </div>
    ),
    { ...size },
  );
}
