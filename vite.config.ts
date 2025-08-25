/// <reference types="vitest" />
import terser from "@rollup/plugin-terser";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import EnvironmentPlugin from "vite-plugin-environment";

export default defineConfig(({ mode }) => {
  const serverPort = process.env.PORT || 5173;

  return {
    base: "/oppdragsinfo",
    build: {
      rollupOptions: {
        input: resolve(__dirname, "src/App.tsx"),
        preserveEntrySignatures: "exports-only",
        external: ["react", "react-dom"],
        output: {
          entryFileNames: "bundle.js",
          format: "esm",
        },
      },
    },
    css: {
      modules: {
        generateScopedName: "[name]__[local]___[hash:base64:5]",
      },
    },
    server: {
      port: Number(serverPort),
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
          // TODO: sjekke om man fjerne en eller slå disse sammen
          "^/mockServiceWorker\\.js$": {
            target: `http://localhost:${serverPort}`,
            rewrite: () => "/oppdragsinfo/mockServiceWorker.js",
            changeOrigin: false,
          },
          // for å håndtere flere instanser på forskjellige porter
          [`^/mockServiceWorker-${serverPort}\\.js$`]: {
            target: `http://localhost:${serverPort}`,
            rewrite: () => "/oppdragsinfo/mockServiceWorker.js",
            changeOrigin: false,
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
      terser(),
    ],
  };
});
