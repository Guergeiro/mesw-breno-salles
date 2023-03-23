import Button from "@components/Button";
import { API_URL } from "@env";
import { useStore } from "@nanostores/solid";
import { ResultSchema } from "@schemas/result.schema";
import { createEventSignal } from "@solid-primitives/event-listener";
import {
  FaSolidCircleCheck,
  FaSolidCircleXmark,
  FaSolidSpinner,
} from "solid-icons/fa";
import {
  Component,
  createEffect,
  createMemo,
  createSignal,
  For,
  Match,
  Show,
  Switch,
  untrack,
} from "solid-js";
import { createStore } from "solid-js/store";
import { z } from "zod";
import { PromiseResults, ResultsStore, ValidPromise } from "../ResultsStore";
import { Step, StepsStore } from "../StepsStore";

type ResultSchema = z.infer<typeof ResultSchema>;

const NotificationSchema = ResultSchema.omit({ tool: true });

const sseSource = new EventSource(new URL("results", API_URL));

function isShowing(currentPage: Step) {
  switch (currentPage) {
    case Step.RESULTS_WAITING:
    case Step.FINISHED:
      return true;
    default:
      return false;
  }
}

const ResultsWaiting: Component = () => {
  const resultsStore = useStore(ResultsStore);

  const sse = createEventSignal<Record<string, MessageEvent<string>>>(
    sseSource,
    "message",
    {
      passive: true,
    }
  );

  const fulfilledResults = createMemo(() => {
    const results = resultsStore().filter(function ({ status }) {
      return status === "fulfilled";
    }) as ValidPromise[];
    return results.map(function ({value}) {
      return JSON.parse(JSON.stringify(value)) as ResultSchema;
    })
  })

  const resultsNotifications = createMemo(() => {
    const parsedData = NotificationSchema.safeParse(
      JSON.parse(sse()?.data || "null")
    );
    if (parsedData.success === true) {
      return parsedData.data;
    }
    return null;
  });

  const results = createMemo(() => {
    const newResult = resultsNotifications()
    if (newResult == null) {
      return [...fulfilledResults()];
    }
    return [...fulfilledResults().map(function (result) {
      if (result.id !== newResult.id) {
        return result;
      }
      return {...result, status: newResult.status};
    })]
  })

  const allFinished = createMemo(() => {
    for (const { status } of results()) {
      if (status === "started") {
        return false;
      }
    }
    return true;
  });

  createEffect(() => {
    if (allFinished() === true && results().length !== 0) {
      StepsStore.set(Step.FINISHED)
    }
  })

  const currentPage = useStore(StepsStore);

  return (
    <Show when={isShowing(currentPage())}>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg my-2">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Name
              </th>
              <th scope="col" class="p-4"></th>
            </tr>
          </thead>
          <tbody>
            <For each={results()}>
              {(result) => {
                return (
                  <TableRow name={result.tool.name} status={result.status} />
                );
              }}
            </For>
          </tbody>
        </table>
      </div>

      <Button
        variant="alternative"
        onClick={() => {
          StepsStore.set(Step.TOOLS_SELECTION);
        }}
      >
        New Decomposition
      </Button>
      <Button
        disabled={allFinished() === false}
        onClick={() => {
          console.log("viewing results");
        }}
      >
        View Results
      </Button>
    </Show>
  );
};
export default ResultsWaiting;

const TableRow: Component<{ name: string; status: ResultSchema["status"] }> = (
  props
) => {

  return (
    <>
      <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <th
          scope="row"
          class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {props.name}
        </th>
        <td class="px-6 p-4">
          <Switch>
            <Match when={props.status === "finished"}>
              <FaSolidCircleCheck
                size={24}
                class={"dark:text-green-600 fill-green-600"}
              />
            </Match>
            <Match when={props.status === "started"}>
              <FaSolidSpinner
                size={24}
                class={`rotate-center dark:text-gray-600 fill-blue-600`}
              />
            </Match>
            <Match when={props.status === "failed"}>
              <FaSolidCircleXmark
                size={24}
                class={"dark:text-red-600 fill-red-600"}
              />
            </Match>
          </Switch>
          <span class="sr-only">{props.status}</span>
        </td>
      </tr>
    </>
  );
};
