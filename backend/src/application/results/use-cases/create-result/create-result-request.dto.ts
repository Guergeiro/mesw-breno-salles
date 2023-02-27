import { createZodDto } from "@anatine/zod-nestjs";
import { ToolControllerInputSchema } from "shared-tools";
import { z } from "zod";

export class CreateResultRequestDto extends createZodDto(
  ToolControllerInputSchema.omit({ id: true }).merge(
    z.object({ tool: z.string().uuid() })
  )
) {}
