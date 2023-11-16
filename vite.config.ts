import importMapPlugin from "@eik/rollup-plugin";
import terser from "@rollup/plugin-terser";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { ConfigEnv } from "vite";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import { viteMockServe } from "vite-plugin-mock";
import EnvironmentPlugin from "vite-plugin-environment";
import { UserConfigExport } from "vitest/config";

const reactUrl = "https://www.nav.no/tms-min-side-assets/react/18/esm/index.js";
const reactDomUrl = "https://www.nav.no/tms-min-side-assets/react-dom/18/esm/index.js";

export default ({ command }: ConfigEnv): UserConfigExport => ({
  plugins: [
    react(),
    cssInjectedByJsPlugin(),
    EnvironmentPlugin({
      NODE_ENV: process.env.NODE_ENV || "development",
    }),
    viteMockServe({
      mockPath: "mock",
      localEnabled: command === "serve",
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
  build: {
    lib: {
      entry: resolve(__dirname, "src/App.tsx"),
      name: "sokos-mikrofrontend-template",
      formats: ["es"],
      fileName: () => `bundle.js`,
    },
  },
  css: {
    modules: {
      generateScopedName: "[name]__[local]___[hash:base64:5]",
    },
  },
});
