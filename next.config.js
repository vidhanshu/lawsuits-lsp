/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          pathname: '/images',
          hostname: 'static.ambitionbox.com',
          protocol: 'https',
        },
        {
          hostname: 'firebasestorage.googleapis.com',
          protocol: 'https',
        },
      ],
    },
  };
  
  module.exports = nextConfig;
  