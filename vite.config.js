import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vite";
import path from "node:path";
import process from "node:process";

const isGitHubPages = true;
const folderName = `${path.basename(process.cwd())}/`;
const mode = process.env.NODE_ENV === "production" ? "production" : "development";
const base = mode === "production" && isGitHubPages ? `/${folderName}` : "/";

export default defineConfig({
  root: "src",
  base,
  mode,
  publicDir: "../public",
  plugins: [tsconfigPaths()],
  // resolve: { alias: { "@": new URL("./src", import.meta.url).pathname } },
  build: {
    outDir: "../dist",
    assetsDir: "./"
  }
});
