import TablePagination from "@components/TablePagination";
import { API_URL } from "@env";
import { ExtendPaginationSchema } from "@schemas/pagination.schema";
import { ToolSchema } from "@schemas/tool.schema";
import {
  Component,
  createMemo,
  createResource,
  createSignal,
  For,
} from "solid-js";
import { z } from "zod";
import { ToolsSelectionStore } from "./ToolsSelectionStore";

async function getTools() {
  const url = new URL("tools", API_URL);
  const res = await fetch(url);
  return await res.json();
}

function getValue(id: string) {
  return ToolsSelectionStore.get()[id] || false;
}

function setValue(id: string, value: boolean) {
  ToolsSelectionStore.setKey(id, value);
}

const ToolPagination = ExtendPaginationSchema(ToolSchema);
type ToolPagination = z.infer<typeof ToolPagination>;

const ToolsSelection: Component = () => {
  const pageSignal = createSignal(1);
  const [pageSize] = createSignal(5);

  const [response] = createResource(getTools);

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
          <For each={tools()}>
            {(tool) => {
              return (
                <>
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {tool.name}
                    </th>
                    <td class="w-4 p-4">
                      <div class="flex items-center">
                        <input
                          id={tool.id}
                          type="checkbox"
                          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          checked={getValue(tool.id)}
                          onChange={({ currentTarget }) => {
                            setValue(tool.id, currentTarget.checked);
                          }}
                        />
                        <label for={tool.id} class="sr-only">
                          {tool.slug}
                        </label>
                      </div>
                    </td>
                  </tr>
                </>
              );
            }}
          </For>
        </tbody>
      </table>
      <TablePagination
        pageSignal={pageSignal}
        pageSize={pageSize}
        totalItems={totalItems}
      />
    </div>
  );
};
export default ToolsSelection;
