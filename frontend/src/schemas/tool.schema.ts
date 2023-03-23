import { z } from "zod";

export const ToolSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  slug: z.string(),
});
export function ExtendToolSchema<InputSchema extends z.ZodObject<any>>(
  input: InputSchema
) {
  return ToolSchema.merge(input);
}
export function InjectToolSchema<InputSchema extends z.ZodObject<any>>(
  input: InputSchema
) {
  return input.merge(ToolSchema);
}
