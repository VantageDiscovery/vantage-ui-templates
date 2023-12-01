/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), tsconfigPaths()],
    server: {
      port: env.VITE_PORT as unknown as number,
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
