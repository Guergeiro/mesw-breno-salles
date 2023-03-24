import { z } from "zod";

export const ToolSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  slug: z.string(),
});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ExtendToolSchema<InputSchema extends z.ZodObject<any>>(
  input: InputSchema
) {
  return ToolSchema.merge(input);
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function InjectToolSchema<InputSchema extends z.ZodObject<any>>(
  input: InputSchema
) {
  return input.merge(ToolSchema);
}
