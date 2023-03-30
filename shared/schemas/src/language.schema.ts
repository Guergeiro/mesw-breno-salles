import { z } from "zod";
import { ToolSchema } from "./tool.schema";

const baseSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  slug: z.string(),
});

export type LanguageSchema = z.infer<typeof baseSchema> & {
  tools?: ToolSchema[];
};

export const LanguageSchema: z.ZodType<LanguageSchema> = baseSchema.extend({
  tools: z.lazy(() => ToolSchema.array().optional()),
});
