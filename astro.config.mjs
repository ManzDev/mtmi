import { defineConfig } from 'astro/config';
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: "https://manzdev.github.io",
  base: "/mtmi",
  trailingSlash: "ignore",
  integrations: [
    icon({
      svgOptions: {
        multipass: true
      }
    })
  ],
  markdown: {
    syntaxHighlight: "prism"
  }
});
