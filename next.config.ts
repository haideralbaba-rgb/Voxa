import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ['lucide-react', 'motion'],
  },
  images: {
    // Project artwork ships as local SVG scenes, so no remote patterns are needed.
    // Add remotePatterns here when real client photography is wired up.
    formats: ['image/avif', 'image/webp'],
  },
}

export default nextConfig
