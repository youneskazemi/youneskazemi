import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "سیدیونس کاظمی · توسعه‌دهنده فول‌استک وب";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** FA-first share card — bright gradient (not empty black). */
export default async function OpenGraphImage() {
  // Vazirmatn supports Persian in OG ImageResponse
  let fontData: ArrayBuffer | null = null;
  try {
    fontData = await fetch(
      "https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/fonts/ttf/Vazirmatn-Bold.ttf",
    ).then((r) => r.arrayBuffer());
  } catch {
    fontData = null;
  }

  const fonts = fontData
    ? [
        {
          name: "Vazirmatn",
          data: fontData,
          style: "normal" as const,
          weight: 700 as const,
        },
      ]
    : [];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 56,
          background:
            "linear-gradient(135deg, #0c4a6e 0%, #0f172a 42%, #020617 100%)",
          fontFamily: fontData ? "Vazirmatn" : "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 22,
          }}
        >
          <div
            style={{
              width: 88,
              height: 88,
              borderRadius: 22,
              background: "#0b1220",
              border: "3px solid #38bdf8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#7dd3fc",
              fontSize: 34,
              fontWeight: 700,
            }}
          >
            YK
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <div
              style={{
                color: "#f8fafc",
                fontSize: 48,
                fontWeight: 700,
                lineHeight: 1.2,
              }}
            >
              سیدیونس کاظمی
            </div>
            <div
              style={{
                color: "#7dd3fc",
                fontSize: 28,
                fontWeight: 700,
              }}
            >
              توسعه‌دهنده فول‌استک وب
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
            maxWidth: 1000,
          }}
        >
          <div
            style={{
              color: "#e2e8f0",
              fontSize: 30,
              lineHeight: 1.45,
              fontWeight: 700,
            }}
          >
            فروشگاه WordPress · محصول اختصاصی Next.js و Django
          </div>
          <div
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            {["Next.js", "Django", "WordPress", "Web3"].map((tag) => (
              <div
                key={tag}
                style={{
                  display: "flex",
                  padding: "10px 18px",
                  borderRadius: 999,
                  background: "rgba(15, 23, 42, 0.75)",
                  border: "1px solid rgba(125, 211, 252, 0.35)",
                  color: "#bae6fd",
                  fontSize: 20,
                  fontWeight: 700,
                }}
              >
                {tag}
              </div>
            ))}
          </div>
          <div style={{ color: "#94a3b8", fontSize: 22, fontWeight: 700 }}>
            youneskazemi.ir · Younes Kazemi
          </div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
