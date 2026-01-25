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
      "react-dnd",
      "zod",
      "@elysiajs/cors",
      "@elysiajs/eden",
      "drizzle-orm",
      "drizzle-kit",
      "elysia-rate-limit",
      "elysia-ip",
      "elysiajs-helmet",
      "@elysiajs/opentelemetry",
      "@elysiajs/server-timing",
      "elysiajs-compression",
      "elysia",
      "leaflet",
      "react-leaflet",
      "sonner",
    ],
  },
  reactCompiler: true,
  cacheComponents: true,
};

export default nextConfig;
