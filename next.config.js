/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

/** @type {import('next').NextConfig} */

module.exports = {
  // 1. Core configurations
  trailingSlash: true,
  reactStrictMode: false,

  // 2. Deployment: Static Export
  output: 'export',
  
  // 3. Optimization: Disable server-side image optimization
  // (Required for static export on shared hosting)
  images: {
    unoptimized: true
  },

  // 4. Custom Webpack for ApexCharts
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision')
    }

    return config
  }
}