import type { NextConfig } from 'next';

import './environment';

const config: NextConfig = {
  reactCompiler: true,
  typedRoutes: true,
  experimental: {
    typedEnv: true,
  },
};

export default config;
