/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig, loadEnv } from "vite";
import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import * as packageJson from "./package.json";
import dts from "vite-plugin-dts";
import libCss from "vite-plugin-libcss";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      react(),
      tsconfigPaths(),
      dts({
        rollupTypes: true,

      }),
      libCss(),
    ],
    server: {
      port: 3000,
    },
    build: {
      lib: {
        entry: resolve("src", "index.ts"),
        name: "vantage-ui-templates",
        formats: ["es", "umd"],
        fileName: (format) => `vantageUiTemplates.${format}.js`,
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
