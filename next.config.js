/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Enable static optimization where possible
  poweredByHeader: false,
  compress: true,
}

module.exports = nextConfig
