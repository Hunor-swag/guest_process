/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ["svgsilh.com"],
  },
  async redirects() {
    return [];
  },
};

module.exports = nextConfig;
