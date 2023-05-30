import { API_URL } from "@env";
import { useStore } from "@nanostores/solid";
import { createTimer } from "@solid-primitives/timer";
import { CurrentUserStore } from "@stores/current-user.store";
import { PendingResultsStore } from "@stores/pending-results.store";
import { computed } from "nanostores";
import { ResultSchema } from "shared-schemas";
import { FaSolidSpinner } from "solid-icons/fa";
import {
  Component,
  createMemo,
  createReaction,
  createResource,
  createSignal,
  For,
  ParentComponent,
  Show,
} from "solid-js";
import { HomePageStep, HomePageStepsStore } from "../home-page-steps.store";

async function getResult(id: string, user: string) {
  const url = new URL(`results/${id}`, API_URL);
  const res = await fetch(url, {
    headers: {
      authorization: `Bearer ${user}`,
    },
  });
  if (res.ok === false) {
    throw new Error(res.statusText);
  }
  return await res.json();
}

const ResultsWaiting: Component = () => {
  const pendingResults = useStore(PendingResultsStore);

  const pendingResultsArray = createMemo(() => {
    return Object.values(pendingResults());
  });

  const allFinished = createMemo(() => {
    if (pendingResultsArray().length === 0) {
      return false;
    }
    for (const { status } of pendingResultsArray()) {
      if (status === "started") {
        return false;
      }
    }
    return true;
  });

  const track = createReaction(() => {
    HomePageStepsStore.set(HomePageStep.FINISHED);
  });

  track(() => allFinished());

  const currentPage = useStore(HomePageStepsStore);

  const isShowing = createMemo(() => {
    switch (currentPage()) {
      case HomePageStep.RESULTS_WAITING:
      case HomePageStep.FINISHED:
        return true;
      default:
        return false;
    }
  });

  const user = useStore(
    computed(CurrentUserStore, (id) => {
      return id || "";
    })
  );

  return (
    <Show when={isShowing()}>
      <Table>
        <For each={pendingResultsArray()}>
          {(item) => {
            const [response] = createResource(item.id, function () {
              return getResult(item.id, user());
            });

            const parsedData = createMemo(() => {
              const parsed = ResultSchema.safeParse(response());
              if (parsed.success) {
                return parsed.data;
              }
              return {} as ResultSchema;
            });
            return (
              <Show
                when={response.loading === false}
                fallback={
                  <div class="m-4">
                    {" "}
                    <FaSolidSpinner
                      size={24}
                      class={`rotate-center dark:text-gray-600 fill-blue-600 mx-auto`}
                    />{" "}
                  </div>
                }
              >
                <TableRow result={parsedData()} />
              </Show>
            );
          }}
        </For>
      </Table>
      <button
        type="button"
        classList={{
          "focus:outline-none": true,
          "focus:ring-4": true,
          "font-medium": true,
          "rounded-lg": true,
          "text-sm": true,
          "px-5": true,
          "py-2.5": true,
          "text-gray-900": true,
          "bg-white": true,
          border: true,
          "border-gray-200": true,
          "hover:bg-gray-100": true,
          "hover:text-blue-700": true,
          "focus:ring-gray-200": true,
          "dark:focus:ring-gray-700": true,
          "dark:bg-gray-800": true,
          "dark:text-gray-400": true,
          "dark:border-gray-600": true,
          "dark:hover:text-white": true,
          "dark:hover:bg-gray-700": true,
          "mr-2": true,
        }}
        class="mr-2"
        onClick={() => {
          HomePageStepsStore.set(HomePageStep.TOOLS_SELECTION);
        }}
      >
        New Decomposition
      </button>
      <a
        classList={{
          "focus:outline-none": true,
          "focus:ring-4": true,
          "font-medium": true,
          "rounded-lg": true,
          "text-sm": true,
          "px-5": true,
          "py-2.5": true,
          "text-white": true,
          "bg-blue-700": true,
          "hover:bg-blue-800": true,
          "focus:ring-blue-300": true,
          "dark:bg-blue-600": true,
          "dark:hover:bg-blue-700": true,
          "dark:focus:ring-blue-800": true,
          "cursor-not-allowed": allFinished() === false,
          "opacity-50": allFinished() === false,
        }}
        href="/results"
        onClick={(e) => {
          if (allFinished() === false) {
            e.preventDefault();
          }
        }}
      >
        View Results
      </a>
    </Show>
  );
};
export default ResultsWaiting;

const TableRow: Component<{ result: ResultSchema }> = (props) => {
  const name = createMemo(() => {
    if (typeof props.result.tool === "string") {
      return props.result.tool;
    }
    return props.result.tool.name;
  });

  const currentResult = useStore(
    computed(PendingResultsStore, (store) => {
      return store[props.result.id];
    })
  );

  const [increaseAmount] = createSignal(500);

  const hasStarted = createMemo(() => {
    const res = currentResult();
    if (res.status !== "started") {
      return false;
    }
    if (res.prevision === 0) {
      return false;
    }
    return increaseAmount();
  });

  const [currentTime, setCurrentTime] = createSignal(0);

  createTimer(
    () => {
      setCurrentTime(currentTime() + increaseAmount());
    },
    () => {
      return hasStarted();
    },
    setInterval
  );

  const percentage = createMemo(() => {
    const res = currentResult();
    if (res.status !== "started") {
      return 100;
    }
    if (res.prevision === Infinity) {
      return 0;
    }
    const predictedPercentage = Math.floor(
      (currentTime() * 100) / res.prevision
    );
    if (predictedPercentage > 99) {
      return 99;
    }
    return predictedPercentage;
  });

  return (
    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <th
        scope="row"
        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {name()}
      </th>
      <td class="px-6 p-4">
        <div class="w-full bg-gray-200 rounded-full dark:bg-gray-700">
          <div
            classList={{
              "text-xs font-medium text-center p-0.5 leading-none rounded-full transition-all":
                true,
              "bg-green-600 text-green-100":
                currentResult().status === "finished",
              "bg-red-600 text-red-100": currentResult().status === "failed",
              "bg-blue-600 text-blue-100": currentResult().status === "started",
            }}
            style={{
              width: `${percentage()}%`,
            }}
          >
            {percentage()}%
          </div>
        </div>
        <span class="sr-only">{currentResult().status}</span>
      </td>
    </tr>
  );
};

const Table: ParentComponent = (props) => {
  return (
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg my-2">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              Underlying Tool
            </th>
            <th scope="col" class="p-4"></th>
          </tr>
        </thead>
        <tbody>{props.children}</tbody>
      </table>
    </div>
  );
};
