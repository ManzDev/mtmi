// @ts-check

import { defineConfig } from "tsdown";
import { resolve } from "node:path";
import { readFileSync, writeFileSync } from "node:fs";
import { rolldownPluginDtsMinifyLite } from 'rolldown-plugin-dts-minify-lite';

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  minify: true,
  plugins: [
    rolldownPluginDtsMinifyLite({ keepJsDocs: true })
  ],
  alias: {
    "@": resolve("./src")
  },
  outExtensions: ({ format }) => ({
    js: format === "es" ? ".js" : ".cjs",
  }),
  hooks: {
    "build:done": async () => {
      for (const file of ["badges.json", "badges.full.json"]) {
        const json = JSON.parse(readFileSync(`public/${file}`, "utf-8"));
        writeFileSync(`dist/${file}`, JSON.stringify(json));
      }
    }
  }
});
