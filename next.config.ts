import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async headers() {
    return [
      {
        // Apply these headers to all routes in the application.
        source: '/:path*',
        headers: [
          { key: 'referrer-policy', value: 'no-referrer' },
]}]}};

export default nextConfig;
