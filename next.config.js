// next.config.mjs
const isGhActions = process.env.GITHUB_ACTIONS === 'true';
let repo = '';

if (isGhActions && process.env.GITHUB_REPOSITORY) {
  repo = process.env.GITHUB_REPOSITORY.split('/')[1]; // "JasonToups/react-binary-search" -> "react-binary-search"
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // write static site to ./out
  trailingSlash: true,
  images: { unoptimized: true },

  // Serve from sub-path on GitHub Pages
  basePath: isGhActions ? `/${repo}` : '',
  assetPrefix: isGhActions ? `/${repo}/` : '',

  // Minimal rule: import .md files as raw strings
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/i,
      type: 'asset/source', // Webpack 5: returns file contents as a string
    });
    return config;
  },
};

export default nextConfig;
