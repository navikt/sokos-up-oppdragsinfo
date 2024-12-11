/// <reference types="vitest" />
import importMapPlugin from "@eik/rollup-plugin";
import terser from "@rollup/plugin-terser";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import EnvironmentPlugin from "vite-plugin-environment";

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
  server: {
    proxy: {
      ...((mode === "backend" || /^.*-q1$/.test(mode)) && {
        "/oppdrag-api/api/v1": {
          target: /^.*-q1$/.test(mode)
            ? "https://sokos-oppdrag.intern.dev.nav.no"
            : "http://localhost:8080",
          rewrite: (path: string) => path.replace(/^\/oppdrag-api/, ""),
          changeOrigin: true,
          secure: /^.*-q1$/.test(mode),
        },
      }),
      ...(mode === "mock" && {
        "/mockServiceWorker.js": {
          target: "http://localhost:5173",
          rewrite: () => "oppdragsinfo/mockServiceWorker.js",
        },
      }),
    },
  },
  plugins: [
    react(),
    cssInjectedByJsPlugin(),
    EnvironmentPlugin({
      NODE_ENV: process.env.NODE_ENV || "development",
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
