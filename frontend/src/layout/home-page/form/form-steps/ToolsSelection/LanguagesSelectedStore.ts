import { atom } from "nanostores";
import { ToolsSelectionStore } from "./ToolsSelectionStore";

export const LanguagesSelectedStore = atom<string[]>([]);

ToolsSelectionStore.subscribe((store) => {
  const newArray = new Set<string>();
  for (const value of Object.values(store)) {
    for (const { id } of value?.languages || []) {
      newArray.add(id);
    }
  }
  LanguagesSelectedStore.set([...newArray.values()]);
});
