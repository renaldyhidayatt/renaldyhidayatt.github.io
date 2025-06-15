
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import velite from '@velite/plugin-vite';
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "/",
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    velite(),
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "#velite": path.resolve(__dirname, ".velite"),
    },
  },
}));
