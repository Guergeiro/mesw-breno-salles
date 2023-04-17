import { z } from "zod";
import { DecompositionSchema } from "./decomposition.schema";

const baseSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  modules: z.string().array(),
});

export type ServiceSchema = z.infer<typeof baseSchema> & {
  decomposition: string | DecompositionSchema;
} & {
  relatedServices?: ServiceSchema[];
} & {
  relationships?: ServiceSchema[];
};

export const ServiceSchema: z.ZodType<ServiceSchema> = baseSchema
  .extend({
    decomposition: z.union([
      z.string().uuid(),
      z.lazy(() => DecompositionSchema),
    ]),
  })
  .extend({
    relatedServices: z.lazy(() => ServiceSchema.array().optional()),
  })
  .extend({
    relationships: z.lazy(() => ServiceSchema.array().optional()),
  });
