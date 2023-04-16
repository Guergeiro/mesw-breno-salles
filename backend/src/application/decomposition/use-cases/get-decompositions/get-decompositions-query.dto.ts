import { createZodDto } from "@anatine/zod-nestjs";
import { PaginatorSchema } from "@common/paginator/paginator-query.dto";
import { z } from "zod";

const getDecompositionsSchema = z.object({
  result: z.string().uuid()
}).merge(PaginatorSchema);

export class GetDecompositionsQueryDto extends createZodDto(getDecompositionsSchema) {}
