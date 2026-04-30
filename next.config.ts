import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";
// added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  // Base path for production
  basePath: isDev ? "" : "/app",

  // 🔥 ADD THIS LINE (important for static assets)
  assetPrefix: isDev ? "" : "/app",

  outputFileTracingRoot: projectRoot,

  turbopack: {
    root: projectRoot,
  },
};

export default nextConfig;
initOpenNextCloudflareForDev();