import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";
import path from "path";
import { fileURLToPath } from "url";

const currentDir = path.dirname(fileURLToPath(import.meta.url));

export default function createNextConfig(phase: string): NextConfig {
  const isDevServer = phase === PHASE_DEVELOPMENT_SERVER;

  return {
    reactStrictMode: true,
    outputFileTracingRoot: currentDir,
    distDir: isDevServer ? ".next-dev" : ".next",
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "opengraph.githubassets.com",
        },
      ],
    },
  };
}
