import { z } from "zod";
import {
  MakeToolControllerInputSchema,
  MakeToolControllerOutputSchema,
} from "./base-schema";

export const ToolControllerInputSchema = MakeToolControllerInputSchema(
  z.object({
    parameters: z
      .object({
        k_topics: z.number(),
        resolution: z.number(),
      })
      .optional(),
  })
);

export type ToolControllerInput = z.infer<typeof ToolControllerInputSchema>;

export const ToolControllerOutputSchema = MakeToolControllerOutputSchema(
  z
    .object({
      metadata: z.object({
        modularity: z.number(),
        resolution: z.number(),
      }),
      services: z
        .object({
          name: z.string(),
          modules: z.string().array(),
        })
        .array(),
    })
    .array()
);

export type ToolControllerOutput = z.infer<typeof ToolControllerOutputSchema>;
