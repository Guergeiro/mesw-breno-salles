import { persistentAtom } from "@nanostores/persistent";

export const ForcedGraphMode = persistentAtom<"true" | "false">("3d", "false");
