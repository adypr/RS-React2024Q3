import path from 'path';

export default {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(process.cwd(), 'styles')],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }

    return config;
  },
};
