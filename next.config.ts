import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // SVG project covers in /public — allow optimization path consistency
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
