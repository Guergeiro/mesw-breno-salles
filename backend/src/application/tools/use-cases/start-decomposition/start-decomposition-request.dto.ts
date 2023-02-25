import { createZodDto } from "@anatine/zod-nestjs";
import { ToolControllerInputSchema } from "shared-tools";

export class StartDecompositionRequestDto extends createZodDto(
  ToolControllerInputSchema.omit({ id: true })
) {}
