import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    optimizeCss: true,
    optimizePackageImports: [
      "@dnd-kit/sortable",
      "quill",
      "quill-delta",
      "quill-delta-to-html",
      "react-organizational-chart",
    ],
  },
  reactCompiler: true,
  cacheComponents: true,
};

export default nextConfig;
