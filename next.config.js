/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuração básica para Vercel
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  
  // ESLint
  eslint: {
    ignoreDuringBuilds: false
  }
};

module.exports = nextConfig;