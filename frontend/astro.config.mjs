import { defineConfig } from "astro/config";
import node from "@astrojs/node";
import solidJs from "@astrojs/solid-js";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: node({
    mode: "standalone"
  }),
  server: {
    host: "0.0.0.0",
    port: 3000
  },
  integrations: [solidJs(), tailwind(), react()]
});
