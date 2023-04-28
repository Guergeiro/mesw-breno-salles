import Anchor from "@components/Anchor";
import Button from "@components/Button";
import TablePagination from "@components/TablePagination";
import Languages from "@components/tools/Languages";
import { API_URL } from "@env";
import { useStore } from "@nanostores/solid";
import { DecompositionsSelectedStore } from "@stores/decompositions-selected.store";
import { PendingResultsStore } from "@stores/pending-results.store";
import { ResultsSelectedStore } from "@stores/results-selected.store";
import { computed } from "nanostores";
import {
  CreatePaginationSchema,
  DecompositionSchema,
  ResultSchema,
} from "shared-schemas";
import {
  FaSolidAngleDown,
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
  Show,
  Signal,
  Switch,
  JSX,
} from "solid-js";
import { z } from "zod";

async function getResults(url: URL) {
  const res = await fetch(url);
  if (res.ok === false) {
    throw new Error(res.statusText);
  }
  return await res.json();
}

async function getResult(id: string) {
  const url = new URL(`results/${id}`, API_URL);
  const res = await fetch(url);
  if (res.ok === false) {
    throw new Error(res.statusText);
  }
  return await res.json();
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

  const pendingResults = useStore(PendingResultsStore);

  const resultsSelected = useStore(
    computed(ResultsSelectedStore, (store) => {
      const selected: string[] = [];
      for (const [key, value] of Object.entries(store)) {
        if (value === "true") {
          selected.push(key);
        }
      }

      return selected;
    })
  );

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
        class="mr-2"
        variant="alternative"
        disabled={resultsSelected().length === 0}
        onClick={() => {
          ResultsSelectedStore.set({});
        }}
      >
        Clear
      </Button>

      <Anchor
        variant="default"
        href="/compare"
        disabled={resultsSelected().length === 0}
      >
        Compare
      </Anchor>
    </>
  );
};
export default ResultsSelection;

const TableRow: Component<{
  result: ResultSchema;
  status: ResultSchema["status"];
}> = (props) => {
  const decompositionsStore = useStore(DecompositionsSelectedStore);
  const resultSelected = useStore(
    computed(ResultsSelectedStore, (store) => {
      const parentSelected = store[props.result.id] === "true";
      return parentSelected;
    })
  );

  const parentSelected = createMemo(() => {
    if (resultSelected()) {
      return true;
    }

    for (const key of Object.values(decompositionsStore())) {
      if (key == null) {
        continue;
      }
      if (key.result === props.result.id) {
        return true;
      }
    }

    return false;
  });

  const name = createMemo(() => {
    if (typeof props.result.tool === "string") {
      return props.result.tool;
    }
    return props.result.tool.name;
  });
  const languages = createMemo(() => {
    if (typeof props.result.tool === "string") {
      return;
    }
    return props.result.tool.languages;
  });

  const [expanded, setExpanded] = createSignal(false);

  return (
    <>
      <tr
        classList={{
          "bg-white": !expanded(),
          "dark:bg-gray-800": !expanded(),
          "hover:bg-gray-50": !expanded(),
          "hover:dark:bg-gray-600": !expanded(),
          "bg-gray-50": expanded(),
          "dark:bg-gray-600": expanded(),
          "border-b": true,
          "dark:border-gray-700": true,
        }}
      >
        <th
          scope="row"
          class="p-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {props.result.id}
        </th>
        <td class="p-4">
          <Show when={props.result.decompositionsCount > 0}>
            <span
              onClick={() => {
                setExpanded(!expanded());
              }}
            >
              <FaSolidAngleDown
                size={24}
                classList={{
                  "cursor-pointer": true,
                  "rotate-180": expanded(),
                  "transition-transform": true,
                }}
              />
            </span>
          </Show>
        </td>
        <td class="p-4">{name()}</td>
        <td class="p-4">
          <Languages languages={languages()} />
        </td>
        <td class="p-4">
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
                class={"rotate-center dark:text-gray-600 fill-blue-600"}
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
              checked={parentSelected()}
              onChange={(e) => {
                ResultsSelectedStore.setKey(
                  props.result.id,
                  `${e.currentTarget.checked}`
                );
              }}
            />
            <label for={props.result.id} class="sr-only">
              {props.result.id}
            </label>
          </div>
        </td>
      </tr>

      <Show when={expanded() === true}>
        <ExpandableRow result={props.result.id} />
      </Show>
    </>
  );
};

const ExpandableRow: Component<{ result: string }> = (props) => {
  const [response] = createResource(props.result, getResult);

  const parsedData = createMemo(() => {
    const parsed = ResultSchema.safeParse(response());
    if (parsed.success === false) {
      return [];
    }
    return parsed.data.decompositions!;
  });

  const resultSelected = useStore(
    computed(ResultsSelectedStore, (store) => {
      const parentSelected = store[props.result] === "true";
      return parentSelected;
    })
  );

  return (
    <tr>
      <td colspan="6">
        <Show
          when={response.loading === false}
          fallback={() => {
            return (
              <div class="m-4">
                <FaSolidSpinner
                  size={24}
                  class={`rotate-center dark:text-gray-600 fill-blue-600 mx-auto`}
                />
              </div>
            );
          }}
        >
          <ExpandableTable>
            <For each={parsedData()}>
              {(item) => {
                const decompositionSelected = useStore(
                  computed(DecompositionsSelectedStore, (store) => {
                    return store[item.id] != null;
                  })
                );
                const isChecked = createMemo(() => {
                  return resultSelected() || decompositionSelected();
                });
                return (
                  <ExpandableTableRow
                    item={item}
                    checked={isChecked()}
                    onChange={(e) => {
                      if (e.currentTarget.checked) {
                        DecompositionsSelectedStore.setKey(item.id, item);
                      } else {
                        DecompositionsSelectedStore.setKey(item.id, null);
                      }
                    }}
                  />
                );
              }}
            </For>
          </ExpandableTable>
        </Show>
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
            <th scope="col" class="p-4">
              ID
            </th>
            <th scope="col" class="p-4"></th>
            <th scope="col" class="p-4">
              Tool Name
            </th>
            <th scope="col" class="p-4">
              Languages
            </th>
            <th scope="col" class="p-4">
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

const ExpandableTable: ParentComponent = (props) => {
  return (
    <div class="relative overflow-x-auto">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
          <tr>
            <th scope="col" class="p-4">
              ID
            </th>
            <th scope="col" class="p-4">
              Metadata
            </th>
            <th scope="col" class="p-4">
              # Services
            </th>
            <th scope="col" class="p-4"></th>
          </tr>
        </thead>
        <tbody>{props.children}</tbody>
      </table>
    </div>
  );
};

const ExpandableTableRow: Component<{
  onChange: JSX.CustomEventHandlersCamelCase<HTMLInputElement>["onChange"];
  checked: boolean;
  item: DecompositionSchema;
}> = (props) => {
  const metadata = createMemo(() => {
    const out: string[] = [];
    for (const [key, value] of Object.entries(props.item.metadata)) {
      out.push(`[${key}: ${value}]`);
    }
    return out.join(",\n");
  });
  return (
    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <th
        scope="row"
        class="p-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {props.item.id}
      </th>
      <td class="p-4">{metadata()}</td>
      <td class="p-4">{props.item.servicesCount}</td>
      <td class="w-4 p-4">
        <div class="flex items-center">
          <input
            type="checkbox"
            checked={props.checked}
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
            onChange={props.onChange}
          />
        </div>
      </td>
    </tr>
  );
};
