import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3333/api/:path*' // ✅ point to NestJS backend
      }
    ]
  }
}

export default nextConfig
