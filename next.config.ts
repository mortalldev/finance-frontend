import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: false, // Re-renders can cause issues with some animations
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/:path*`,
      },
    ]
  },
}

export default nextConfig
