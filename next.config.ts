import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // NO standalone — Vercel manages its own output format
  typescript: {
    ignoreBuildErrors: false,
  },
  reactStrictMode: true,
  // Image optimization handled by Vercel natively
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
  },
};

export default nextConfig;
