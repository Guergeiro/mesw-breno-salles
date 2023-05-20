import { useStore } from "@nanostores/solid";
import { PendingResultsStore } from "@stores/pending-results.store";
import { ResultSchema } from "shared-schemas";
import {
  FaSolidCircleCheck,
  FaSolidCircleXmark,
  FaSolidSpinner,
} from "solid-icons/fa";
import {
  Component,
  createMemo,
  createReaction,
  For,
  Match,
  ParentComponent,
  Show,
  Switch,
} from "solid-js";
import { HomePageStep, HomePageStepsStore } from "../home-page-steps.store";

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

  return (
    <Show when={isShowing()}>
      <Table>
        <For each={pendingResultsArray()}>
          {(item) => {
            return <TableRow result={item} />;
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
  return (
    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <th
        scope="row"
        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {name()}
      </th>
      <td class="px-6 p-4">
        <Switch>
          <Match when={props.result.status === "finished"}>
            <FaSolidCircleCheck
              size={24}
              class={"dark:text-green-600 fill-green-600"}
            />
          </Match>
          <Match when={props.result.status === "started"}>
            <FaSolidSpinner
              size={24}
              class={`rotate-center dark:text-gray-600 fill-blue-600`}
            />
          </Match>
          <Match when={props.result.status === "failed"}>
            <FaSolidCircleXmark
              size={24}
              class={"dark:text-red-600 fill-red-600"}
            />
          </Match>
        </Switch>
        <span class="sr-only">{props.result.status}</span>
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
              Name
            </th>
            <th scope="col" class="p-4"></th>
          </tr>
        </thead>
        <tbody>{props.children}</tbody>
      </table>
    </div>
  );
};
