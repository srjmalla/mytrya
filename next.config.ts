import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: the site is served from Cloudflare Pages, with the contact
  // form handled by a Pages Function in /functions.
  output: "export",
  trailingSlash: false,
  images: { unoptimized: true },
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
