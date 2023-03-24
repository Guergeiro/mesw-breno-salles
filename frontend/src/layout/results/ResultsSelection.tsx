import TablePagination from "@components/TablePagination";
import { API_URL } from "@env";
import { ExtendPaginationSchema } from "@schemas/pagination.schema";
import { ResultSchema } from "@schemas/result.schema";
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
  Switch,
} from "solid-js";
import { z } from "zod";

async function getResults() {
  const url = new URL("results", API_URL);
  const res = await fetch(url);
  return await res.json();
}

const ResultPagination = ExtendPaginationSchema(ResultSchema);
type ResultPagination = z.infer<typeof ResultPagination>;

const ResultsSelection: Component = () => {
  const [response] = createResource(getResults);

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

  return (
    <Table totalItems={totalItems}>
      <For each={results()}>
        {(result) => {
          return (
            <>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {result.id}
                </th>
                <td class="px-6 py-4">{result.tool.name}</td>
                <td class="px-6 p-4">
                  <Switch>
                    <Match when={result.status === "finished"}>
                      <FaSolidCircleCheck
                        size={24}
                        class={"dark:text-green-600 fill-green-600"}
                      />
                    </Match>
                    <Match when={result.status === "started"}>
                      <FaSolidSpinner
                        size={24}
                        class={`rotate-center dark:text-gray-600 fill-blue-600`}
                      />
                    </Match>
                    <Match when={result.status === "failed"}>
                      <FaSolidCircleXmark
                        size={24}
                        class={"dark:text-red-600 fill-red-600"}
                      />
                    </Match>
                  </Switch>
                  <span class="sr-only">{result.status}</span>
                </td>

                <td class="w-4 p-4">
                  <div class="flex items-center">
                    <input
                      id={result.id}
                      type="checkbox"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      checked={false}
                      onChange={({ currentTarget }) => {
                        console.log(currentTarget)
                        // setValue(tool.id, currentTarget.checked);
                      }}
                    />
                    <label for={result.id} class="sr-only">
                      {result.id}
                    </label>
                  </div>
                </td>
              </tr>
            </>
          );
        }}
      </For>
    </Table>
  );
};
export default ResultsSelection;

const Table: ParentComponent<{ totalItems: Accessor<number> }> = (props) => {
  const pageSignal = createSignal(1);
  const [pageSize] = createSignal(5);

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
              Status
            </th>
            <th scope="col" class="p-4"></th>
          </tr>
        </thead>
        <tbody>{props.children}</tbody>
      </table>
      <TablePagination
        pageSignal={pageSignal}
        pageSize={pageSize}
        totalItems={props.totalItems}
      />
    </div>
  );
};
