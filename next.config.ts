import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";
// added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

// Use this file's location (`import.meta.url`), not `__dirname`, so it stays correct after Next
// transpiles config—wrong tracing/turbopack root can skip writing `.next/routes-manifest.json`.
const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  // Production (Webflow Cloud) serves this app under /app — local dev uses / so localhost:3000 works.
  basePath: process.env.NODE_ENV === "development" ? "" : "/app",
  // Avoid inferring workspace root from a parent folder lockfile (e.g. ~/package-lock.json).
  outputFileTracingRoot: projectRoot,
  turbopack: {
    root: projectRoot,
  },
};

export default nextConfig;
initOpenNextCloudflareForDev();
