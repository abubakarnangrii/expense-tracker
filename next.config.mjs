/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.unsplash.com"],
  },
  env: {
    NEXT_PUBLIC_DB_URL: process.env.NEXT_PUBLIC_DB_URL,
  },
};

export default nextConfig;
