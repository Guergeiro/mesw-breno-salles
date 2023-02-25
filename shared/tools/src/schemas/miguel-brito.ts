import { z } from "zod";
import {
  MakeToolControllerInputSchema,
  MakeToolControllerOutputSchema,
} from "./base-schema";

const parameters = z.union([
  z.object({
    k_topics: z.number(),
  }),
  z.object({
    resolution: z.number(),
  }),
  z.object({
    k_topics: z.number(),
    resolution: z.number(),
  }),
]);

export const ToolControllerInputSchema = MakeToolControllerInputSchema(
  z.object({
    parameters: parameters.optional(),
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
