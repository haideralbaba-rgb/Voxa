import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  allowedDevOrigins: ['*.e2b.app'],
  experimental: {
    optimizePackageImports: ['lucide-react', 'motion'],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
}

export default nextConfig
