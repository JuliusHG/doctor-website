import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000", "your-production-domain.com"],
      bodySizeLimit: "2mb",
    },
  },
}

export default nextConfig