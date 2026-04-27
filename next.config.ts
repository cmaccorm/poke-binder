import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pokemontcg.io",
      },
      {
        protocol: "https",
        hostname: "images.production.sportscardinvestor.com",
      },
      // TODO: Add your own CDN here if you host images elsewhere
      // {
      //   protocol: "https",
      //   hostname: "your-cdn.example.com",
      // },
    ],
  },
};

export default nextConfig;
