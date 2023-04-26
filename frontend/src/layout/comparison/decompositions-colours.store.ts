import { DecompositionsSelectedStore } from "@stores/decompositions-selected.store";
import { computed } from "nanostores";
import colors from "tailwindcss/colors";
import hexRgb from "hex-rgb";
import rgbHex from "rgb-hex";

type Colour = {
  [key: number]:
    | string
    | {
        [key: number]: string;
      };
};

const excludedPallets = [50, 100, 200, 300];

function extractAllTailwindColours(obj: Colour) {
  const colours: string[] = [];

  for (const firstLevel of Object.values(obj)) {
    if (typeof firstLevel === "string") {
      continue;
    }
    if (typeof firstLevel === "object") {
      for (const [key, value] of Object.entries(firstLevel)) {
        if (excludedPallets.includes(parseInt(key))) {
          continue;
        }
        colours.push(value);
      }
    }
  }

  return colours;
}

const colours = extractAllTailwindColours(colors as unknown as Colour);

export function getRandomColor() {
  return colours[Math.floor(Math.random() * colours.length)];
}

export function mixColors(colors: string[]) {
  const colorsInRgb = colors.map(function (color) {
    return hexRgb(color);
  });
  const [redSum, greenSum, blueSum] = colorsInRgb.reduce(
    function (prev, { red, green, blue }) {
      prev[0] += red;
      prev[1] += green;
      prev[2] += blue;
      return prev;
    },
    [0, 0, 0]
  );

  const newRed = redSum / colorsInRgb.length;
  const newGreen = greenSum / colorsInRgb.length;
  const newBlue = blueSum / colorsInRgb.length;
  const hex = rgbHex(newRed, newGreen, newBlue);
  return hex;
}

export const DecompositionsColoursStore = computed(
  DecompositionsSelectedStore,
  (store) => {
    const map = new Map<string, string>();

    for (const key of Object.keys(store)) {
      const colour = map.get(key) ?? getRandomColor();
      map.set(key, colour);
    }
    return map;
  }
);
