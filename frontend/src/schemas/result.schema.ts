import { z } from "zod";
import { ToolSchema } from "./tool.schema";

export const ResultSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(["started", "finished", "failed"]),
  tool: ToolSchema,
});
export function ExtendResultsSchema<InputSchema extends z.ZodObject<any>>(
  input: InputSchema
) {
  return ResultSchema.merge(input);
}
export function InjectResultsSchema<InputSchema extends z.ZodObject<any>>(
  input: InputSchema
) {
  return input.merge(ResultSchema);
}
