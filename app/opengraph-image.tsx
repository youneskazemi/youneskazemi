import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Younes Kazemi — Full-stack Web Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Clean OG card — monogram + name (no AI logo raster). */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#050508",
          padding: 64,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              background: "#070a0e",
              border: "2px solid rgba(56,189,248,0.45)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#38bdf8",
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: -1,
            }}
          >
            YK
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}
          >
            <div style={{ color: "#f4f4f5", fontSize: 36, fontWeight: 650 }}>
              Younes Kazemi
            </div>
            <div style={{ color: "#7dd3fc", fontSize: 22, fontWeight: 500 }}>
              Full-stack Web Developer
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            maxWidth: 900,
          }}
        >
          <div style={{ color: "#a1a1aa", fontSize: 28, lineHeight: 1.35 }}>
            WordPress shops & custom Next.js + Django products
          </div>
          <div style={{ color: "#52525b", fontSize: 22 }}>
            youneskazemi.ir · Next · Django · WordPress
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
