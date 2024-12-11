/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["appy.agency, placehold.co"],
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cabanyalflats.appy.agency",
        port: "",
        pathname: "/assets/**",
      },
      {
        protocol: "https",
        hostname: "admin.cabanyalflats.com",
        port: "",
        pathname: "/assets/**",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
