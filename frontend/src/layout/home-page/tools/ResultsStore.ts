import { ResultSchema } from "@schemas/result.schema";
import { atom } from "nanostores";
import { z } from "zod";

export const ValidPromise = z.object({
  status: z.literal("fulfilled"),
  value: ResultSchema,
});
export type ValidPromise = z.infer<typeof ValidPromise>;

export const InvalidPromise = z.object({
 status: z.literal("rejected"), reason: z.instanceof(Error)
})
export type InvalidPromise = z.infer<typeof InvalidPromise>;

export const PromiseResults = z
  .discriminatedUnion("status", [
    ValidPromise,
    InvalidPromise
  ])
  .array();
export type PromiseResults = z.infer<typeof PromiseResults>

export const ResultsStore = atom<PromiseResults>([]);
