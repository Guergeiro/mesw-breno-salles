import { z } from "zod";
import { ResultSchema } from "./result.schema";

const baseSchema = z.object({
  id: z.string().uuid(),
  metadata: z.object({
    modularity: z.coerce.number().optional(),
    resolution: z.coerce.number().optional(),
  }),
  services: z
    .object({
      id: z.string().uuid(),
      name: z.string(),
      modules: z.string().array(),
    })
    .array(),
});

export type DecompositionSchema = z.infer<typeof baseSchema> & {
  result: string | ResultSchema;
};

export const DecompositionSchema: z.ZodType<DecompositionSchema> = baseSchema.extend({
  result: z.union([z.string().uuid(), z.lazy(() => ResultSchema)]),
});
