import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  serverExternalPackages: ["better-sqlite3"],
  images: {
    qualities: [75, 90],
  },
};

export default nextConfig;
