/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jabonarte.onrender.com",
        pathname: "/uploads/**", // o '/*' si quieres permitir todo
      },
    ],
  },
};

module.exports = nextConfig;
