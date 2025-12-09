/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'raw.githubusercontent.com',
      'apod.nasa.gov',
    ],
    formats: ['image/webp', 'image/avif'],
  },
  // Compresión
  compress: true,
  // PWA
  reactStrictMode: true,
};

module.exports = nextConfig;