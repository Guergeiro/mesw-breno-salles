import { map } from "nanostores";
import { ResultSchema } from "shared-schemas";

type Input = Pick<ResultSchema, "id" | "status"> & Partial<ResultSchema>;

export const PendingResultsStore = map<Record<string, ResultSchema>>({});

export function SetPendingResult(result: Input) {
  const previousResult = PendingResultsStore.get()[result.id] || {};
  PendingResultsStore.setKey(result.id, { ...previousResult, ...result });
}
