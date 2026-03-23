/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    quietDeps: true,
    silenceDeprecations: ["mixed-decls", "legacy-js-api"],
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
