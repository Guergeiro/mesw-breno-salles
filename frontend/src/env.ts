/// <reference types="astro/client" />

export const API_URL = url();

function url() {
  if (import.meta.env.DEV === true) {
    return new URL("http://0.0.0.0:3000");
  }
  return new URL("https://brenosalles.com");
}
