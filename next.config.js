/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["raw.githubusercontent.com", "images.secretlab.co"],
  },
};

module.exports = nextConfig;
