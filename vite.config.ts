/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig, loadEnv } from "vite";
import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import * as packageJson from "./package.json";
import rollupconfig from "./rollup.config.mjs";
import typescript from "@rollup/plugin-typescript";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    // plugins: [react(), tsconfigPaths(), dts({ rollupTypes: true })],
    plugins: [react(), tsconfigPaths(), rollupconfig],
    server: {
      port: 3000,
    },
    build: {
      lib: {
        entry: resolve("src", "index.ts"),
        name: "vantage_demo_template_test",
        formats: ["es", "umd"],
        fileName: (format) => `vantage_demo_template_test.${format}.js`,
      },
      rollupOptions: {
        external: [...Object.keys(packageJson.peerDependencies)],
      },
    },
    test: {
      globals: true,
      environment: "jsdom",
      coverage: {
        100: true,
      },
    },
  };
});
