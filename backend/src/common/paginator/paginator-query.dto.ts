import { createZodDto } from "@anatine/zod-nestjs";
import { z } from "zod";

const paginatorSchema = z.object({
  page: z.coerce.number().optional().default(1),
  limit: z.coerce.number().optional().default(10),
});

export class PaginatorQueryDto extends createZodDto(paginatorSchema) {}
