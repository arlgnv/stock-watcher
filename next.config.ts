import type { NextConfig } from 'next';

const config: NextConfig = {
  reactCompiler: true,
  typedRoutes: true,
  experimental: {
    typedEnv: true,
  },
};

export default config;
