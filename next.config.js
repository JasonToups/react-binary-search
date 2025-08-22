/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  distDir: 'out',
  images: {
    unoptimized: true,
  },
  // Ensure all assets are properly handled
  assetPrefix: '',
  webpack: (config, { isServer, dev }) => {
    // Handle markdown files
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    });

    // Optimize for static export
    if (!isServer && !dev) {
      // Completely disable code splitting
      config.optimization.splitChunks = false;
      config.optimization.runtimeChunk = false;

      // Force single entry point
      if (Array.isArray(config.entry)) {
        config.entry = config.entry[0];
      }

      // Override output to force single file
      config.output.filename = 'static/js/[name].js';
      config.output.chunkFilename = 'static/js/[name].js';

      // Disable dynamic imports
      config.plugins = config.plugins.filter((plugin) => {
        return plugin.constructor.name !== 'ChunkRenamePlugin';
      });
    }

    return config;
  },
};

export default nextConfig;
