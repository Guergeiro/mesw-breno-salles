import { map } from "nanostores";
import { ToolSchema } from "shared-schemas";

export const ToolsSelectionStore = map<Record<string, ToolSchema | null>>({});
