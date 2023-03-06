import { defineConfig } from "astro/config";
import node from "@astrojs/node";
import solidJs from "@astrojs/solid-js";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: node({
    mode: "standalone"
  }),
  server: {
    host: true,
    port: 3000
  },
  integrations: [solidJs()]
});
