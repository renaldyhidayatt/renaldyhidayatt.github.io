import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import velite from '@velite/plugin-vite';
import type { ManifestOptions, VitePWAOptions } from 'vite-plugin-pwa'
import { VitePWA } from "vite-plugin-pwa";

const pwaOptions: Partial<VitePWAOptions> = {
  registerType: "autoUpdate",
  base: '/',
  includeAssets: ['favicon.svg', 'favicon_light.ico', 'favicon_dark.ico'],
  manifest: {
    name: 'Renaldy Portofolio',
    short_name: 'Renaldy Portofolio',
    theme_color: '#ffffff',
    icons: [
      {
        src: 'pwa-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: 'pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
  },
  workbox: {
    maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
  },
}



// https://vitejs.dev/config/
export default defineConfig(({ }) => ({
  base: "/",
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    velite(),
    react(),
    VitePWA(pwaOptions),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "#velite": path.resolve(__dirname, ".velite"),
    },
  },
}));
