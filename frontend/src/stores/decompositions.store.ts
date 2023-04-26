import { map } from "nanostores";
import { DecompositionSchema } from "shared-schemas";

export const DecompositionsStore = map<Record<string, DecompositionSchema>>({});
