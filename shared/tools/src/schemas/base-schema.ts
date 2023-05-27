import { z } from "zod";

const idSchema = z.object({
  id: z.string().uuid(),
});

export function MakeToolControllerInputSchema<
  InputSchema extends z.ZodObject<any> // eslint-disable-line @typescript-eslint/no-explicit-any
>(schema: InputSchema) {
  return idSchema.merge(schema);
}

export function MakeToolControllerOutputSchema<
  SuccessSchema extends z.ZodArray<any> // eslint-disable-line @typescript-eslint/no-explicit-any
>(results: SuccessSchema) {
  return z.discriminatedUnion("status", [
    z
      .object({
        status: z.literal("success"),
        results,
      })
      .merge(idSchema),
    z
      .object({
        status: z.literal("failed"),
        error: z.instanceof(Error),
      })
      .merge(idSchema),
    z
      .object({
        status: z.literal("started"),
        prevision: z.coerce.number(),
      })
      .merge(idSchema),
  ]);
}
