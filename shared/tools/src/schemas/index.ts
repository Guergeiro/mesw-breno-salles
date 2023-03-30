import { z } from "zod";
import {
  ToolControllerInput as MiguelBritoInput,
  ToolControllerOutput as MiguelBritoOutput,
} from "./miguel-brito";

export const ToolControllerInput = MiguelBritoInput;
export const ToolControllerOutput = MiguelBritoOutput;
export type ToolControllerInput = z.infer<typeof ToolControllerInput>;
export type ToolControllerOutput = z.infer<typeof ToolControllerOutput>;

export { MiguelBritoInput, MiguelBritoOutput };
