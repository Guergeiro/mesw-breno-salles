import { map } from "nanostores";
import { DecompositionSchema } from "shared-schemas";

export const DecompositionsShowingStore = map<Record<string, DecompositionSchema | null>>({})
