import { readFile, writeFile } from "node:fs/promises";

const override = {
  main: "./dist/index.js",
  module: "./dist/index.mjs",
  types: "./dist/index.d.ts",
};

async function prepublish() {
  const json = JSON.parse(await readFile("package.json", "utf8"));
  const newJson = { ...json, ...override };
  await writeFile("package.json", JSON.stringify(newJson));
}

prepublish().catch(console.error);
