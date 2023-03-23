import { Accessor, Component, createMemo, Show, Signal } from "solid-js";

export type TablePaginationProps = {
  pageSignal: Signal<number>;
  pageSize: Accessor<number>;
  totalItems: Accessor<number>;
};

const TablePagination: Component<TablePaginationProps> = (props) => {
  const [page, setPage] = props.pageSignal;

  const firstPage = createMemo(() => {
    return 1;
  });

  const lastPage = createMemo(() => {
    return Math.ceil(props.totalItems() / props.pageSize());
  });

  function handleButtonClick(value: number) {
    if (value < firstPage()) {
      return;
    }
    if (value > lastPage()) {
      return;
    }
    setPage(value);
  }

  return (
    <>
      <nav
        class="flex items-center justify-between p-3"
        aria-label="Table navigation"
      >
        <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
          Showing{" "}
          <span class="font-semibold text-gray-900 dark:text-white">
            {page()}-{props.pageSize()}
          </span>{" "}
          of{" "}
          <span class="font-semibold text-gray-900 dark:text-white">
            {props.totalItems()}
          </span>
        </span>
        <ul class="inline-flex items-center -space-x-px">
          <li>
            <button
              disabled={page() - 1 === 0}
              onClick={() => {
                handleButtonClick(page() - 1);
              }}
              type="button"
              class="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span class="sr-only">Previous</span>
              <svg
                class="w-5 h-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </li>
          <li>
            <button
              type="button"
              disabled={page() - 1 === 0}
              class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <Show when={page() - 1 !== 0} fallback={"-"}>
                {page() - 1}
              </Show>
            </button>
          </li>
          <li>
            <button
              type="button"
              class="z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
            >
              {page()}
            </button>
          </li>
          <li>
            <button
              type="button"
              disabled={page() + 1 > lastPage()}
              class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <Show when={page() + 1 < lastPage()} fallback={"-"}>
                {page() + 1}
              </Show>
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                handleButtonClick(page() + 1);
              }}
              disabled={page() + 1 > lastPage()}
              type="button"
              class="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span class="sr-only">Next</span>
              <svg
                class="w-5 h-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};
export default TablePagination;
