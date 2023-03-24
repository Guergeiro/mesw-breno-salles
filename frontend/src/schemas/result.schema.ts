import { z } from "zod";
import { ToolSchema } from "./tool.schema";

export const ResultSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(["started", "finished", "failed"]),
  tool: ToolSchema,
});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ExtendResultsSchema<InputSchema extends z.ZodObject<any>>(
  input: InputSchema
) {
  return ResultSchema.merge(input);
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function InjectResultsSchema<InputSchema extends z.ZodObject<any>>(
  input: InputSchema
) {
  return input.merge(ResultSchema);
}
