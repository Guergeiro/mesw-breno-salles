import Button from "@components/Button";
import TablePagination from "@components/TablePagination";
import Languages from "@components/tools/Languages";
import { API_URL } from "@env";
import { useStore } from "@nanostores/solid";
import { PendingResultsStore } from "@stores/pending-results.store";
import { ResultsSelectedStore } from "@stores/results-selected.store";
import { CreatePaginationSchema, ResultSchema } from "shared-schemas";
import {
  FaSolidCircleCheck,
  FaSolidCircleXmark,
  FaSolidSpinner,
} from "solid-icons/fa";
import {
  Accessor,
  Component,
  createMemo,
  createResource,
  createSignal,
  For,
  Match,
  ParentComponent,
  Signal,
  Switch,
} from "solid-js";
import { z } from "zod";

async function getResults(url: URL) {
  const res = await fetch(url);
  return await res.json();
}

function setValue(id: string, value: boolean) {
  ResultsSelectedStore.setKey(id, value);
}

const ResultPagination = CreatePaginationSchema(ResultSchema);
type ResultPagination = z.infer<typeof ResultPagination>;

const ResultsSelection: Component = () => {
  const pageSignal = createSignal(1);
  const [pageSize] = createSignal(5);

  const url = createMemo(() => {
    const [page] = pageSignal;
    const url = new URL("results", API_URL);
    url.searchParams.append("limit", `${pageSize()}`);
    url.searchParams.append("page", `${page()}`);
    return url;
  });

  const [response] = createResource(url, function () {
    return getResults(url());
  });

  const parsedData = createMemo(() => {
    const fallback = {
      data: [] as ResultPagination["data"],
      count: 0,
      page: 1,
    } as const satisfies ResultPagination;

    const parsed = ResultPagination.safeParse(response());
    if (parsed.success === false) {
      return fallback;
    }
    return parsed.data;
  });

  const results = createMemo(() => {
    return parsedData().data;
  });

  const totalItems = createMemo(() => {
    return parsedData().count;
  });

  const resultsSelectedStore = useStore(ResultsSelectedStore);

  const resultsSelected = createMemo(() => {
    const selected: string[] = [];
    for (const [key, value] of Object.entries(resultsSelectedStore())) {
      if (value === true) {
        selected.push(key);
      }
    }

    return selected;
  });

  const hasResultSelected = createMemo(() => {
    return resultsSelected().length !== 0;
  });
  const pendingResults = useStore(PendingResultsStore);

  return (
    <>
      <Table
        totalItems={totalItems}
        pageSize={pageSize}
        pageSignal={pageSignal}
      >
        <For each={results()}>
          {(props) => {
            const result = pendingResults()[props.id] || props;
            return <TableRow result={props} status={result.status} />;
          }}
        </For>
      </Table>

      <Button
        variant="alternative"
        disabled={hasResultSelected() === false}
        onClick={() => {
          ResultsSelectedStore.set({});
        }}
      >
        Clear
      </Button>

      <Button
        variant="default"
        disabled={hasResultSelected() === false}
        onClick={() => {
          console.log("foo");
        }}
      >
        Compare
      </Button>
    </>
  );
};
export default ResultsSelection;

const TableRow: Component<{
  result: ResultSchema;
  status: ResultSchema["status"];
}> = (props) => {
  const resultsSelectedStore = useStore(ResultsSelectedStore);
  const isChecked = createMemo(() => {
    const value = resultsSelectedStore()[props.result.id];
    return value != null;
  });
  const name = createMemo(() => {
    if (typeof props.result.tool === "string") {
      return props.result.tool;
    }
    return props.result.tool.name;
  })
  const languages = createMemo(() => {
    if (typeof props.result.tool === "string") {
      return;
    }
    return props.result.tool.languages;
  });

  return (
    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <th
        scope="row"
        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {props.result.id}
      </th>
      <td class="px-6 py-4">{name()}</td>
      <td class="px-6 py-4">
        <Languages languages={languages()} />
      </td>
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

      <td class="w-4 p-4">
        <div class="flex items-center">
          <input
            id={props.result.id}
            type="checkbox"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
            checked={isChecked()}
            onChange={(e) => {
              setValue(props.result.id, e.currentTarget.checked);
            }}
          />
          <label for={props.result.id} class="sr-only">
            {props.result.id}
          </label>
        </div>
      </td>
    </tr>
  );
};

const Table: ParentComponent<{
  totalItems: Accessor<number>;
  pageSize: Accessor<number>;
  pageSignal: Signal<number>;
}> = (props) => {
  return (
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg my-2">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              ID
            </th>
            <th scope="col" class="px-6 py-3">
              Tool Name
            </th>
            <th scope="col" class="px-6 py-3">
              Languages
            </th>
            <th scope="col" class="px-6 py-3">
              Status
            </th>
            <th scope="col" class="p-4"></th>
          </tr>
        </thead>
        <tbody>{props.children}</tbody>
      </table>
      <TablePagination
        pageSignal={props.pageSignal}
        pageSize={props.pageSize}
        totalItems={props.totalItems}
      />
    </div>
  );
};
