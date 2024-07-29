import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vite";
import { basename } from "node:path";
import { cwd } from "node:process";

const isGitHubPages = true;
const folderName = `${basename(cwd())}/`;
const mode = process.env.NODE_ENV === "production" ? "production" : "development";
const base = mode === "production" && isGitHubPages ? `/${folderName}` : "/";

export default defineConfig({
  root: "sandbox",
  base,
  mode,
  publicDir: "../public",
  plugins: [tsconfigPaths()],
  // resolve: { alias: { "@": new URL("./src", import.meta.url).pathname } },
  build: {
    /*
    lib: {
      entry: resolve(__dirname, "lib/main.js"),
      name: "mtmi",
      filename: "mtmi"
    },
    */
    outDir: "../dist",
    assetsDir: "./"
  }
});
