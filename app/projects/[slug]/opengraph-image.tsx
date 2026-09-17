import { ImageResponse } from "next/og";
import { getProjectBySlug } from "@/lib/db/projects";
import { projects as fallbackProjects } from "@/content/projects";

export const runtime = "edge";
export const alt = "Project Case Study — Younes Kazemi";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = { params: Promise<{ slug: string }> };

export default async function OpenGraphImage({ params }: Props) {
  const { slug } = await params;
  let project = null;
  try {
    project = await getProjectBySlug(slug);
  } catch {
    project = fallbackProjects.find((p) => p.slug === slug) || null;
  }

  if (!project) {
    project = fallbackProjects.find((p) => p.slug === slug) || null;
  }

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

  const titleFa = project?.titleFa || project?.title || "نمونه کار";
  const titleEn = project?.title || "Case Study";
  const summaryFa =
    project?.summaryFa || project?.summary || "طراحی و پیاده‌سازی محصول وب";
  const tags = project?.tags?.slice(0, 4) || ["Next.js", "Full-Stack"];
  const accent = project?.accent || "#38bdf8";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 60,
          background:
            "linear-gradient(135deg, #090e17 0%, #0c1424 45%, #050508 100%)",
          fontFamily: fontData ? "Vazirmatn" : "sans-serif",
        }}
      >
        {/* Top Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 18,
                background: "#0b1220",
                border: `2px solid ${accent}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#7dd3fc",
                fontSize: 26,
                fontWeight: 700,
              }}
            >
              YK
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span style={{ color: "#f8fafc", fontSize: 26, fontWeight: 700 }}>
                سیدیونس کاظمی
              </span>
              <span style={{ color: "#7dd3fc", fontSize: 16, fontWeight: 600 }}>
                Portfolio Showcase · Case Study
              </span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "8px 20px",
              borderRadius: 999,
              background: "rgba(255, 255, 255, 0.06)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              color: "#94a3b8",
              fontSize: 18,
              fontWeight: 600,
            }}
          >
            {project?.year || "2026"}
          </div>
        </div>

        {/* Center: Case Study Details */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            maxWidth: 1050,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 20,
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                color: "#ffffff",
                fontSize: 54,
                fontWeight: 700,
                lineHeight: 1.2,
              }}
            >
              {titleFa}
            </span>
            <span
              style={{
                color: "#7dd3fc",
                fontSize: 32,
                fontWeight: 600,
              }}
            >
              {titleEn}
            </span>
          </div>

          <p
            style={{
              color: "#cbd5e1",
              fontSize: 24,
              lineHeight: 1.45,
              fontWeight: 500,
              margin: 0,
            }}
          >
            {summaryFa}
          </p>

          {/* Tags */}
          <div
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              marginTop: 8,
            }}
          >
            {tags.map((tag) => (
              <div
                key={tag}
                style={{
                  display: "flex",
                  padding: "8px 18px",
                  borderRadius: 12,
                  background: "rgba(56, 189, 248, 0.1)",
                  border: "1px solid rgba(56, 189, 248, 0.25)",
                  color: "#bae6fd",
                  fontSize: 19,
                  fontWeight: 600,
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>

        {/* Footer info */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            paddingTop: 18,
            color: "#64748b",
            fontSize: 18,
          }}
        >
          <span>youneskazemi.ir/projects/{slug}</span>
          <span>Next.js · Supabase · Tailwind CSS</span>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
