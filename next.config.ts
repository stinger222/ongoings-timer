import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '*', // e.g., '3000', '8000', or '1337'
        pathname: '*', // e.g., '/media/**', or '/**' for any path
      },
    ]
  }
};

export default nextConfig
