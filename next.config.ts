import type { NextConfig } from 'next';
// import withBundleAnalyzer from '@next/bundle-analyzer';

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    optimizeCss: true,
    optimizePackageImports: [
      '@dnd-kit/sortable',
      'quill',
      'quill-delta',
      'quill-delta-to-html',
      'react-organizational-chart',
    ],
  },
  reactCompiler: true,
  cacheComponents: true,
  turbopack: {
    root: __dirname, // або шлях де знаходиться весь код
  },
};

// const bundleAnalyzer = withBundleAnalyzer({
//   enabled: process.env.ANALYZE === 'true',
// });

module.exports = nextConfig;
