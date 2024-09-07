import { defineConfig } from 'astro/config';
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
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
