import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import velite from '@velite/plugin-vite';

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
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "#velite": path.resolve(__dirname, ".velite"),
    },
  },
}));
