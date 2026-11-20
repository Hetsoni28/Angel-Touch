import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // The Next.js dev-tools button (development only) defaults to bottom-left, where it
  // covers the portal's Home tab on phones. Top-left keeps the tab bar clear.
  devIndicators: { position: 'top-left' },
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
