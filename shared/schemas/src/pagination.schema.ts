import { z } from "zod";

const paginationSchema = z.object({
  count: z.coerce.number(),
  page: z.coerce.number(),
});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function CreatePaginationSchema<InputSchema extends z.ZodType<any>>(
  input: InputSchema
) {
  return paginationSchema.merge(
    z.object({
      data: input.array(),
    })
  );
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PaginationSchema<InputSchema extends z.ZodType<any>> = z.infer<
  ReturnType<typeof CreatePaginationSchema<InputSchema>>
>;
