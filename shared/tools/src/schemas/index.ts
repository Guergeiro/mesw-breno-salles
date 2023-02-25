import { z } from "zod";
import {
  ToolControllerInputSchema as MiguelBritoInputSchema,
  ToolControllerOutputSchema as MiguelBritoOutputSchema,
  ToolControllerInput as MiguelBritoInput,
  ToolControllerOutput as MiguelBritoOutput,
} from "./miguel-brito";

export const ToolControllerInputSchema = MiguelBritoInputSchema;
export const ToolControllerOutputSchema = MiguelBritoOutputSchema;
export type ToolControllerInput = z.infer<typeof ToolControllerInputSchema>;
export type ToolControllerOutput = z.infer<typeof ToolControllerOutputSchema>;

export {
  MiguelBritoInputSchema,
  MiguelBritoOutputSchema,
  MiguelBritoInput,
  MiguelBritoOutput,
};
