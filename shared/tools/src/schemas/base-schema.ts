import { z } from "zod";

const idSchema = z.object({
  id: z.string().uuid(),
});

export function MakeToolControllerInputSchema<
  InputSchema extends z.ZodObject<any>
>(schema: InputSchema) {
  return idSchema.merge(schema);
}

export function MakeToolControllerOutputSchema<
  SuccessSchema extends z.ZodArray<any>
>(results: SuccessSchema) {
  return z.discriminatedUnion("status", [
    idSchema.merge(
      z.object({
        status: z.literal("success"),
        results,
      })
    ),
    idSchema.merge(
      z.object({
        status: z.literal("failed"),
        error: z.instanceof(Error),
      })
    ),
  ]);
}
