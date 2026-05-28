import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    viewTransition: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
      },
    ],
  },
};

export default nextConfig;
