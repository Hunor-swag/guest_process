/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["svgsilh.com"],
  },
  async redirects() {
    return [];
  },
};

module.exports = nextConfig;
