import { z } from "zod";
import { LanguageSchema } from "./language.schema";
import { ResultSchema } from "./result.schema";

const baseSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  slug: z.string(),
});

export type ToolSchema = z.infer<typeof baseSchema> & {
  results?: ResultSchema[];
} & {
  languages?: LanguageSchema[];
};

export const ToolSchema: z.ZodType<ToolSchema> = baseSchema
  .extend({
    results: z.lazy(() => ResultSchema.array().optional()),
  })
  .extend({
    languages: z.lazy(() => LanguageSchema.array().optional()),
  });
