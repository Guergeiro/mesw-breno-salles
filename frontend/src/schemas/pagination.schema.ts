import { z } from "zod";

export const PaginationSchema = z.object({
  count: z.coerce.number(),
  page: z.coerce.number(),
});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ExtendPaginationSchema<InputSchema extends z.ZodObject<any>>(
  input: InputSchema
) {
  return PaginationSchema.merge(
    z.object({
      data: input.array(),
    })
  );
}
