/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jabonarte.onrender.com",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // 👈 Agregar Cloudinary
        pathname: "/**",
      },
    ],
    unoptimized: true,
    minimumCacheTTL: 31536000,
  },
  experimental: {
    optimizePackageImports: ["@clerk/nextjs", "@clerk/clerk-react"],
  },
  compress: true,
};

module.exports = nextConfig;
