import { z } from "zod";
import { ResultSchema } from "./result.schema";
import { ServiceSchema } from "./service.schema";

const baseSchema = z.object({
  id: z.string().uuid(),
  metadata: z.object({
    modularity: z.coerce.number().optional(),
    resolution: z.coerce.number().optional(),
  }),
  servicesCount: z.coerce.number(),
});

export type DecompositionSchema = z.infer<typeof baseSchema> & {
  result: string | ResultSchema;
} & {
  services?: ServiceSchema[];
};

export const DecompositionSchema: z.ZodType<DecompositionSchema> = baseSchema
  .extend({
    result: z.union([z.string().uuid(), z.lazy(() => ResultSchema)]),
  })
  .extend({
    services: z.lazy(() => ServiceSchema.array().optional()),
  });
