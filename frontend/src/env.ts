export const API_URL = url();

function url() {
  if (import.meta.env.MODE === "development") {
    return new URL("http://0.0.0.0:3000");
  }
  return new URL("https://brenosalles.com");
}
