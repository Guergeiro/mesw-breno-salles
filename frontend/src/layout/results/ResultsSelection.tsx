import TablePagination from "@components/TablePagination";
import Languages from "@components/tools/Languages";
import { API_URL } from "@env";
import { useStore } from "@nanostores/solid";
import { DecompositionsSelectedStore } from "@stores/decompositions-selected.store";
import { PendingResultsStore } from "@stores/pending-results.store";
import { ResultsSelectedStore } from "@stores/results-selected.store";
import { CurrentUserStore } from "@stores/current-user.store";
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

async function getResults(url: URL, user: string) {
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

  const user = useStore(
    computed(CurrentUserStore, (id) => {
      return id || "";
    })
  );

  const [response] = createResource(url, function () {
    return getResults(url(), user());
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

  const decompositionSelected = useStore(
    computed(DecompositionsSelectedStore, (store) => {
      const out: DecompositionSchema[] = [];

      for (const value of Object.values(store)) {
        if (value != null) {
          out.push(value);
        }
      }
      return out;
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
            return <TableRow result={props} />;
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
          "cursor-not-allowed": decompositionSelected().length === 0,
          "opacity-50": decompositionSelected().length === 0,
        }}
        disabled={decompositionSelected().length === 0}
        onClick={() => {
          DecompositionsSelectedStore.set({});
        }}
      >
        Clear
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
          "cursor-not-allowed": decompositionSelected().length === 0,
          "opacity-50": decompositionSelected().length === 0,
        }}
        href="/compare"
        onClick={(e) => {
          if (decompositionSelected().length === 0) {
            e.preventDefault();
          }
        }}
      >
        Compare
      </a>
    </>
  );
};
export default ResultsSelection;

const TableRow: Component<{
  result: ResultSchema;
}> = (props) => {
  const currentResult = useStore(
    computed(PendingResultsStore, (store) => {
      return store[props.result.id];
    })
  );

  const status = createMemo(() => {
    if (currentResult() != null) {
      return currentResult().status;
    }
    return props.result.status;
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

  const decompositionsCount = createMemo(() => {
    return props.result.decompositionsCount ?? 0;
  });

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
          <Show when={decompositionsCount()}>
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
            <Match when={status() === "finished"}>
              <FaSolidCircleCheck
                size={24}
                class={"dark:text-green-600 fill-green-600"}
              />
            </Match>
            <Match when={status() === "started"}>
              <FaSolidSpinner
                size={24}
                class={"rotate-center dark:text-gray-600 fill-blue-600"}
              />
            </Match>
            <Match when={status() === "failed"}>
              <FaSolidCircleXmark
                size={24}
                class={"dark:text-red-600 fill-red-600"}
              />
            </Match>
          </Switch>
          <span class="sr-only">{status()}</span>
        </td>

        <td class="p-4"></td>
      </tr>

      <Show when={expanded() === true}>
        <ExpandableRow result={props.result.id} />
      </Show>
    </>
  );
};

const ExpandableRow: Component<{ result: string }> = (props) => {
  const user = useStore(
    computed(CurrentUserStore, (id) => {
      return id || "";
    })
  );
  const [response] = createResource(props.result, function () {
    return getResult(props.result, user());
  });

  const parsedData = createMemo(() => {
    const parsed = ResultSchema.safeParse(response());
    if (parsed.success === false) {
      return [];
    }
    return parsed.data.decompositions ?? [];
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
              Underlying Tool
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
            <th scope="col" class="p-4 text-center">
              # Services
            </th>
            <th scope="col" class="p-4 text-center">
              Action
            </th>
            <th scope="col" class="p-4 text-center">
              Comparison Selection
            </th>
          </tr>
        </thead>
        <tbody>{props.children}</tbody>
      </table>
    </div>
  );
};

async function exportTxt(url: URL, user: string, id: string) {
  const res = await fetch(url, {
    headers: {
      authorization: `Bearer ${user}`,
    },
  });
  if (res.ok === false) {
    throw new Error(res.statusText);
  }
  const blob = await res.blob();
  const objectBlob = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = objectBlob;
  a.download = `${id}.txt`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(objectBlob);
}

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

  const decompositionSelected = useStore(
    computed(DecompositionsSelectedStore, (store) => {
      const out: DecompositionSchema[] = [];

      for (const value of Object.values(store)) {
        if (value != null) {
          out.push(value);
        }
      }
      return out;
    })
  );

  const canToggle = createMemo(() => {
    if (props.checked === true) {
      return true;
    }
    return decompositionSelected().length < 5;
  });

  const user = useStore(
    computed(CurrentUserStore, (id) => {
      return id || "";
    })
  );

  const url = createMemo(() => {
    return new URL(`decompositions/${props.item.id}/export`, API_URL);
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
      <td class="p-4 text-center">{props.item.servicesCount}</td>
      <td class="p-4 text-center">
        <button
          type="button"
          class="bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300"
          onClick={async () => {
            await exportTxt(url(), user(), props.item.id);
          }}
        >
          Export .txt
        </button>
      </td>
      <td class="w-4 p-4">
        <div class="flex items-center">
          <input
            type="checkbox"
            checked={props.checked}
            classList={{
              "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mx-auto":
                true,
              "cursor-pointer": canToggle(),
            }}
            disabled={canToggle() === false}
            onChange={props.onChange}
          />
        </div>
      </td>
    </tr>
  );
};
