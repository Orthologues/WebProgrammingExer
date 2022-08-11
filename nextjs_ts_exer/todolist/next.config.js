/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BASE_URL: process.env.BASE_URL,
    PORT: process.env.PORT
  },
  swcMinify: true,
  webpack(config) {
    config.resolve.fallback = {
    ...config.resolve.fallback, // if you miss it, all the other options in fallback which are specified by next.js will be dropped. Doesn't make much sense, but how it is
      fs: false // the solution
    };
    return config;
  }
}

module.exports = nextConfig
