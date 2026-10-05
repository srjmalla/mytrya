import { ImageResponse } from "next/og";

export const dynamic = "force-static";

/** Square logo for structured data and profiles: the wordmark's initial on paper. */
export function GET() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#08090a" }}>
        <div style={{ display: "flex", fontSize: 300, fontWeight: 700, color: "#eef0ec", letterSpacing: -12, fontFamily: "sans-serif" }}>
          m<span style={{ color: "#c6f24e" }}>.</span>
        </div>
      </div>
    ),
    { width: 512, height: 512 },
  );
}
