/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // trailingSlash: true, // 必要に応じて
};

module.exports = nextConfig;
