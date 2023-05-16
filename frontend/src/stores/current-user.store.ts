import { persistentAtom } from "@nanostores/persistent";

export const CurrentUserStore = persistentAtom<string>("current-user");
