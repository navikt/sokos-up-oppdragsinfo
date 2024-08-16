/// <reference types="vitest" />
import importMapPlugin from "@eik/rollup-plugin";
import terser from "@rollup/plugin-terser";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import { viteMockServe } from "vite-plugin-mock";

const reactUrl = "https://www.nav.no/tms-min-side-assets/react/18/esm/index.js";
const reactDomUrl =
  "https://www.nav.no/tms-min-side-assets/react-dom/18/esm/index.js";

export default defineConfig(({ mode }) => ({
  base: "/oppdragsinfo",
  build: {
    lib: {
      entry: resolve(__dirname, "src/App.tsx"),
      name: "sokos-up-oppdragsinfo",
      formats: ["es"],
      fileName: () => "bundle.js",
    },
  },
  css: {
    modules: {
      generateScopedName: "[name]__[local]___[hash:base64:5]",
    },
  },
  server:
    mode == "local-dev"
      ? {
          proxy: {
            "/oppdrag-api/api/v1": {
              target: "http://localhost:8080",
              rewrite: (path: string) => path.replace(/^\/oppdrag-api/, ""),
              changeOrigin: true,
              secure: false,
            },
          },
        }
      : {},
  plugins: [
    react(),
    cssInjectedByJsPlugin(),
    viteMockServe({
      mockPath: "mock",
      enable: mode === "local-mock",
    }),
    {
      ...importMapPlugin({
        maps: [
          {
            imports: {
              react: reactUrl,
              "react-dom": reactDomUrl,
            },
          },
        ],
      }),
      enforce: "pre",
      apply: "build",
    },
    terser(),
  ],
}));
