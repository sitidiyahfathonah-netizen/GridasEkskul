import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337'
      },
      {
        protocol: 'https',
        hostname: 'cn17l1l4-1337.asse.devtunnels.ms'
      }
    ]
  }
};

export default nextConfig;
