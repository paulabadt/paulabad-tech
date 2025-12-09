
// next.config.js
/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    // Permite cargar avatares remotos de la API de Rick and Morty
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rickandmortyapi.com',
        port: '',
        pathname: '/api/character/avatar/**',
      },
    ],
    // O, si prefieres algo más simple:
    // domains: ['rickandmortyapi.com'],
  },
};
