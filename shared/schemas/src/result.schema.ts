import { z } from "zod";
import { DecompositionSchema } from "./decomposition.schema";
import { ToolSchema } from "./tool.schema";

const baseSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(["started", "finished", "failed"]),
});

export type ResultSchema = z.infer<typeof baseSchema> & {
  decompositions?: DecompositionSchema[];
} & {
  tool: string | ToolSchema;
};

export const ResultSchema: z.ZodType<ResultSchema> = baseSchema
  .extend({
    decompositions: z.lazy(() => DecompositionSchema.array().optional()),
  })
  .extend({
    tool: z.union([z.string().uuid(), z.lazy(() => ToolSchema)]),
  });
