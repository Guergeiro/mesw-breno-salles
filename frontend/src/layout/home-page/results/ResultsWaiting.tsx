import Button from "@components/Button";
import { useStore } from "@nanostores/solid";
import { PendingResultsStore } from "@stores/pending-results.store";
import { ResultsSelectedStore } from "@stores/results-selected.store";
import { ResultSchema } from "shared-schemas";
import {
  FaSolidCircleCheck,
  FaSolidCircleXmark,
  FaSolidSpinner,
} from "solid-icons/fa";
import {
  Component,
  createEffect,
  createMemo,
  For,
  Match,
  ParentComponent,
  Show,
  Switch,
} from "solid-js";
import { HomePageStep, HomePageStepsStore } from "../home-page-steps.store";

function isShowing(currentPage: HomePageStep) {
  switch (currentPage) {
    case HomePageStep.RESULTS_WAITING:
    case HomePageStep.FINISHED:
      return true;
    default:
      return false;
  }
}

function addToSelectedResultsStore(results: ResultSchema[]) {
  const finished = results.filter(function (result) {
    return result.status === "finished";
  });
  for (const { id } of finished) {
    ResultsSelectedStore.setKey(id, "true");
  }
}

const ResultsWaiting: Component = () => {
  const pendingResults = useStore(PendingResultsStore);

  const pendingResultsArray = createMemo(() => {
    return Object.values(pendingResults());
  });

  const allFinished = createMemo(() => {
    for (const { status } of pendingResultsArray()) {
      if (status === "started") {
        return false;
      }
    }
    return true;
  });

  createEffect(() => {
    if (allFinished() === true) {
      // StepsStore.set(Step.FINISHED);
      // addToSelectedResultsStore(pendingResultsArray());
    }
  });

  const currentPage = useStore(HomePageStepsStore);

  return (
    <Show when={isShowing(currentPage())}>
      <Table>
        <For each={pendingResultsArray()}>
          {(props) => {
            const { id } = props;
            const result = pendingResults()[id];
            const name = createMemo(() => {
              if (typeof result.tool === "string") {
                return result.tool;
              }
              return result.tool.name;
            });
            return <TableRow name={name()} status={result.status} />;
          }}
        </For>
      </Table>
      <Button
        class="mr-2"
        variant="alternative"
        onClick={() => {
          HomePageStepsStore.set(HomePageStep.TOOLS_SELECTION);
        }}
      >
        New Decomposition
      </Button>
      <Button variant="default" disabled={allFinished() === false}>
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
