/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337", // Puerto de tu backend
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
