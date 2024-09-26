import { build } from "velite";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export", // Enable static HTML export
  images: {
    unoptimized: true, // Disable Next.js image optimization
  },
  webpack: (config) => {
    config.plugins.push(new VeliteWebpackPlugin());
    return config;
  },
};

class VeliteWebpackPlugin {
  static started = false;
  
  constructor(/** @type {import('velite').Options} */ options = {}) {
    this.options = options;
  }

  apply(/** @type {import('webpack').Compiler} */ compiler) {
    compiler.hooks.beforeCompile.tapPromise("VeliteWebpackPlugin", async () => {
      if (VeliteWebpackPlugin.started) return;
      VeliteWebpackPlugin.started = true;

      const isDev = compiler.options.mode === "development";
      this.options.watch = this.options.watch ?? isDev;
      this.options.clean = this.options.clean ?? !isDev;

      await build(this.options); // Run Velite build process
    });
  }
}

export default nextConfig;
