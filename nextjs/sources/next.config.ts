import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    dirs: ["app", "components", "features", "libs", "prisma"],
  },
};

export default nextConfig;
