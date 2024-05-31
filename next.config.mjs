/** @type {import('next').NextConfig} */
const nextConfig = {
  // Custom Webpack configuration
  webpack: (config) => {
    // Add a rule to handle .geojson files with raw-loader
    config.module.rules.push({
      test: /\.geojson$/,
      use: 'raw-loader',
    });
    return config;
  },
  // Enable React strict mode for highlighting potential problems
  reactStrictMode: true,
};

// Export the configuration object
export default nextConfig;
