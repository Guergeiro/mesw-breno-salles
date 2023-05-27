import { map } from "nanostores";
import { ResultSchema } from "shared-schemas";

type Input = Pick<ResultSchema, "id" | "status"> &
  (
    | {
        status: "finished" | "failed";
      }
    | {
        status: "started";
        prevision: number;
      }
  );

export const PendingResultsStore = map<Record<string, Input>>({});

export function SetPendingResult(result: Input) {
  const previousResult = PendingResultsStore.get()[result.id] || {};
  PendingResultsStore.setKey(result.id, { ...previousResult, ...result });
}
