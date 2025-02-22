/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: function (config) {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    });
    return config;
  },
  images: {
    remotePatterns: [
      // ジモニッチ Assets
      // {
      //   protocol: 'https',
      //   hostname: process.env.NEXT_PUBLIC_ASSETS_HOSTNAME || '',
      //   port: '',
      //   pathname: '/uploads/**',
      // },
    ],
  },
};

module.exports = nextConfig;
