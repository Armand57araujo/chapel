// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react-swc';
// import { VitePWA } from 'vite-plugin-pwa';
// import react from '@vitejs/plugin-react';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      // includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      devOptions: {
        enabled: true
      },
      manifest: {
        name: 'White Chapel Mysteries',
        short_name: 'WCM',
        description: 'A mystery game that reinvents the classic tale of Jack The Ripper!',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        // globPatterns: ['**/*'], // Add appropriate patterns for caching
        runtimeCaching: [
          {
            urlPattern: ({ url }) => {
              return url.pathname.startsWith('/src/assets'); // Fixed the urlPattern function
            },
            handler: 'CacheFirst',
            options: {
              cacheName: 'assets-cache',
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
  ],
  server: {
    port: process.env.PORT || 3000,
    open: true,
    proxy: {
      '/graphql': {
        target: process.env.PORT || 'http://localhost:3001',
        secure: false,
        changeOrigin: true,
      },
    },
  },
});
