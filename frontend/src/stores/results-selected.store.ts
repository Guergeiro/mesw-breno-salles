import { persistentMap } from "@nanostores/persistent";

export const ResultsSelectedStore = persistentMap<Record<string, string>>(
  "results-selected",
  {}
);
