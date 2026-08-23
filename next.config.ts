import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Disable Turbopack for build to avoid Windows crash */
  turbopack: undefined,
};

export default nextConfig;
