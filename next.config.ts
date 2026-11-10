import type { NextConfig } from "next";

const pagesBuild = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  basePath: pagesBuild ? "/silicon-index" : "",
  assetPrefix: pagesBuild ? "/silicon-index" : "",
  trailingSlash: pagesBuild,
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
