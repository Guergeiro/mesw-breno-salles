import { createZodDto } from "@anatine/zod-nestjs";
import { z } from "zod";

export const PaginatorSchema = z.object({
  page: z.coerce.number().optional().default(1),
  limit: z.coerce.number().optional().default(10),
});

export class PaginatorQueryDto extends createZodDto(PaginatorSchema) {}
