/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable TypeScript
  typescript: {
    ignoreBuildErrors: false,
  },
  // Enable ESLint
  eslint: {
    ignoreDuringBuilds: false,
  },
  // Image optimization
  images: {
    domains: [],
  },
};

export default nextConfig;
