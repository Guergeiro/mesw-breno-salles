import {
  persistentMap,
} from "@nanostores/persistent";
import { DecompositionSchema } from "shared-schemas";

export const DecompositionsSelectedStore = persistentMap<
  Record<string, DecompositionSchema | null>
>(
  "decompositions-selected",
  {},
  {
    encode(value) {
      return JSON.stringify(value);
    },
    decode(str) {
      return JSON.parse(str);
    },
  }
);
