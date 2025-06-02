/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Optimización para Clerk en el cliente
      config.optimization.splitChunks = {
        ...config.optimization.splitChunks,
        cacheGroups: {
          ...config.optimization.splitChunks.cacheGroups,
          clerk: {
            test: /[\\/]node_modules[\\/]@clerk[\\/]/,
            name: "clerk",
            priority: 10,
            chunks: "async", // Cambiar de 'all' a 'async' para cargar solo cuando se necesite
          },
        },
      };
    }
    return config;
  },

  compress: true,
  trailingSlash: false,
};

module.exports = nextConfig;
