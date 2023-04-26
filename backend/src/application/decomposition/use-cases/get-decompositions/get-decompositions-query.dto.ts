import { createZodDto } from "@anatine/zod-nestjs";
import { PaginatorSchema } from "@common/paginator/paginator-query.dto";
import { z } from "zod";

const id = z.string().uuid();

const getDecompositionsSchema = z
  .object({
    id: z
      .union([id, id.array()])
      .transform((val) => {
        if (Array.isArray(val)) {
          return val;
        }
        return [val];
      })
      .optional(),
  })
  .merge(PaginatorSchema);

export class GetDecompositionsQueryDto extends createZodDto(
  getDecompositionsSchema
) {}
