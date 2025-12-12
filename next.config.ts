import type { NextConfig } from "next";
import { routes } from "./src/constants/routes";

const nextConfig: NextConfig = {
  /* config options here */

  //reactStrictMode: false

 async redirects() {
    return [
      {
        source: "/",
        destination: routes.dashboard,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
