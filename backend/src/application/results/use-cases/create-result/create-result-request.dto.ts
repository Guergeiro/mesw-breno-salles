import { createZodDto } from "@anatine/zod-nestjs";
import { ToolControllerInput } from "shared-tools";
import { z } from "zod";

const tool = z.object({ tool: z.string().uuid() });

export class CreateResultRequestDto extends createZodDto(
  z.union([tool, tool.and(ToolControllerInput.shape.parameters)])
) {}
