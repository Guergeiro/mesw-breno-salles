import TablePagination from "@components/TablePagination";
import Languages from "@components/tools/Languages";
import { API_URL } from "@env";
import { useStore } from "@nanostores/solid";
import { CreatePaginationSchema, ToolSchema } from "shared-schemas";
import {
  Accessor,
  Component,
  createMemo,
  createResource,
  createSignal,
  For,
  ParentComponent,
  Signal,
} from "solid-js";
import { z } from "zod";
import { LanguagesSelectedStore } from "./LanguagesSelectedStore";
import { ToolsSelectionStore } from "./ToolsSelectionStore";

async function getTools(url: URL) {
  const res = await fetch(url);
  return await res.json();
}

function setValue(id: string, value: ToolSchema | null) {
  ToolsSelectionStore.setKey(id, value);
}

const ToolPagination = CreatePaginationSchema(ToolSchema);
type ToolPagination = z.infer<typeof ToolPagination>;

const ToolsSelection: Component = () => {
  const pageSignal = createSignal(1);
  const [pageSize] = createSignal(5);

  const url = createMemo(() => {
    const [page] = pageSignal;
    const url = new URL("tools", API_URL);
    url.searchParams.append("limit", `${pageSize()}`);
    url.searchParams.append("page", `${page()}`);
    return url;
  });

  const [response] = createResource(url, function () {
    return getTools(url());
  });

  const parsedData = createMemo(() => {
    const fallback = {
      data: [] as ToolPagination["data"],
      count: 0,
      page: 1,
    } as const satisfies ToolPagination;

    const parsed = ToolPagination.safeParse(response());
    if (parsed.success === false) {
      return fallback;
    }
    return parsed.data;
  });

  const tools = createMemo(() => {
    return parsedData().data;
  });

  const totalItems = createMemo(() => {
    return parsedData().count;
  });

  return (
    <Table totalItems={totalItems} pageSize={pageSize} pageSignal={pageSignal}>
      <For each={tools()}>
        {(tool) => {
          return <TableRow tool={tool} />;
        }}
      </For>
    </Table>
  );
};
export default ToolsSelection;

const TableRow: Component<{ tool: ToolSchema }> = (props) => {
  const toolStore = useStore(ToolsSelectionStore);

  const isChecked = createMemo(() => {
    const value = toolStore()[props.tool.id];
    return value != null;
  });

  const languagesStore = useStore(LanguagesSelectedStore);

  const isDisabled = createMemo(() => {
    const set = new Set<string>();
    for (const { id } of props.tool.languages || []) {
      set.add(id);
    }
    for (const id of languagesStore()) {
      if (set.has(id) === false) {
        return true;
      }
    }
    return false;
  });

  return (
    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <th
        scope="row"
        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {props.tool.name}
      </th>
      <td class="px-6 p-4">
        <Languages languages={props.tool.languages} />
      </td>
      <td class="w-4 p-4">
        <div class="flex items-center">
          <input
            id={props.tool.id}
            type="checkbox"
            classList={{
              "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600":
                true,
              "cursor-pointer": isDisabled() === false,
            }}
            disabled={isDisabled()}
            checked={isChecked()}
            onChange={({ currentTarget }) => {
              if (currentTarget.checked === true) {
                setValue(props.tool.id, props.tool);
              } else {
                setValue(props.tool.id, null);
              }
            }}
          />
          <label for={props.tool.id} class="sr-only">
            {props.tool.slug}
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
              Underlying Tool
            </th>
            <th scope="col" class="px-6 py-3">
              Languages
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
