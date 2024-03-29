import { API_URL } from "@env";
import { useStore } from "@nanostores/solid";
import { CurrentUserStore } from "@stores/current-user.store";
import { DecompositionsSelectedStore } from "@stores/decompositions-selected.store";
import { DecompositionsStore } from "@stores/decompositions.store";
import { ForcedGraphMode } from "@stores/forced-graph-mode.store";
import { ResultsSelectedStore } from "@stores/results-selected.store";
import { computed } from "nanostores";
import { CreatePaginationSchema, DecompositionSchema } from "shared-schemas";
import { HiSolidCubeTransparent } from "solid-icons/hi";
import { TbChartCircles, TbSquaresDiagonal, TbZoomReset } from "solid-icons/tb";
import {
  createMemo,
  createReaction,
  createResource,
  createSignal,
  For,
  ParentComponent,
  Show,
} from "solid-js";
import colors from "tailwindcss/colors";
import { z } from "zod";
import { CanZoomResetStore } from "./can-zoom-reset.store";
import { DecompositionsColoursStore } from "./decompositions-colours.store";
import { DecompositionsShowingStore } from "./decompositions-showing.store";
import ServiceCard from "./ServiceCard";
import { ServicesFocusedStore } from "./services-focused.store";
import { ShowModulesStore } from "./show-modules.store";
import { ShowServicesSidebarStore } from "./show-services-sidebar.store";
import ThreeWayComparison from "./ThreeWayComparison";

async function getDecompositions(url: URL, user: string) {
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

const ResultPagination = CreatePaginationSchema(DecompositionSchema);
type ResultPagination = z.infer<typeof ResultPagination>;

const Wrapper: ParentComponent = (props) => {
  const pageSignal = createSignal(1);
  const [pageSize] = createSignal(5);

  const decomposistionsSelected = useStore(
    computed(DecompositionsSelectedStore, (store) => {
      return Object.values(store).filter(function (d) {
        return d != null;
      }) as Array<DecompositionSchema>;
    })
  );

  const url = createMemo(() => {
    const [page] = pageSignal;
    const url = new URL("decompositions", API_URL);
    url.searchParams.append("limit", `${pageSize()}`);
    url.searchParams.append("page", `${page()}`);
    for (const { id } of decomposistionsSelected()) {
      url.searchParams.append("id", id);
    }
    return url;
  });

  const user = useStore(
    computed(CurrentUserStore, (id) => {
      return id || "";
    })
  );

  const [response] = createResource(url, function () {
    return getDecompositions(url(), user());
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

  const track = createReaction(() => {
    const record: Record<string, DecompositionSchema> = {};
    for (const result of results()) {
      record[result.id] = result;
    }
    DecompositionsStore.set(record);
  });

  track(() => results());

  const decompositions = useStore(
    computed(DecompositionsStore, (store) => {
      return Object.values(store).filter(function (d) {
        return d != null;
      }) as Array<DecompositionSchema>;
    })
  );

  const gray200 = createMemo(() => {
    return colors.gray[200];
  });

  const decompositionShowing = useStore(DecompositionsShowingStore);
  const decompositionColours = useStore(DecompositionsColoursStore);
  const canZoomReset = useStore(CanZoomResetStore);
  const graphMode = useStore(ForcedGraphMode);
  const showModules = useStore(ShowModulesStore);
  const showServices = useStore(ShowServicesSidebarStore);
  const servicesFocused = useStore(ServicesFocusedStore);
  const expandServicesDiv = createMemo(() => {
    if (showServices() === false) {
      return false;
    }
    if (servicesFocused().length === 0) {
      return false;
    }
    return true;
  });

  return (
    <>
      <div class="flex flex-col lg:flex-row">
        <div class="w-full lg:w-2/12 mx-auto mb-2">
          <div class="flex flex-col">
            <div class="w-full">
              <h5 class="m-2">Decomposition Selection</h5>
              <div class="flex flex-col sm:grid sm:grid-cols-2 lg:flex lg:flex-col">
                <For each={decompositions()}>
                  {(item) => {
                    const isShowing = createMemo(() => {
                      return decompositionShowing()[item.id] != null;
                    });
                    const style = createMemo(() => {
                      if (isShowing()) {
                        return decompositionColours().get(item.id);
                      }
                      return gray200();
                    });
                    return (
                      <div class="h-full">
                        <label class="relative inline-flex items-center m-2 py-4 cursor-pointer">
                          <input
                            type="checkbox"
                            value={item.id}
                            class="sr-only peer"
                            checked={isShowing()}
                            onChange={(e) => {
                              if (e.currentTarget.checked) {
                                DecompositionsShowingStore.setKey(
                                  item.id,
                                  item
                                );
                              } else {
                                DecompositionsShowingStore.setKey(
                                  item.id,
                                  null
                                );
                              }
                            }}
                          />
                          <div
                            class="w-11 h-6 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[18px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600"
                            style={{ "background-color": style() }}
                          ></div>
                          <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300 truncate text-ellipsis w-full lg:w-1/3 2xl:w-1/2 peer">
                            {item.id}
                          </span>
                          <div
                            role="tooltip"
                            class="absolute z-10 invisible opacity-0 inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm tooltip dark:bg-gray-700 translate-y-7 translate-x-14 lg:peer-hover:visible lg:peer-hover:opacity-100"
                          >
                            {item.id}
                          </div>
                        </label>
                      </div>
                    );
                  }}
                </For>
              </div>
            </div>
            <Show when={expandServicesDiv()}>
              <div
                classList={{
                  "w-full": true,
                  "mx-auto": true,
                }}
              >
                <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-1 gap-2">
                  <For each={servicesFocused()}>
                    {(item) => {
                      return <ServiceCard service={item} />;
                    }}
                  </For>
                </div>
              </div>
            </Show>
          </div>
        </div>

        <div
          classList={{
            "w-full": true,
            "mx-auto": true,
            "lg:w-10/12": true,
          }}
        >
          <div class="mb-5 mx-2">{props.children}</div>
          <div class="flex flex-row">
            <div class="mx-2">
              <a
                href="/results"
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
                }}
                onClick={() => {
                  ResultsSelectedStore.set({});
                  DecompositionsSelectedStore.set({});
                }}
              >
                Go back
              </a>
            </div>
            <div class="mx-2">
              <button
                type="button"
                classList={{
                  "focus:outline-none": true,
                  "focus:ring-4": true,
                  "font-medium": true,
                  "rounded-lg": true,
                  "text-sm": true,
                  "text-gray-900": true,
                  "bg-white": true,
                  border: true,
                  "border-gray-300": true,
                  "hover:bg-blue-800": true,
                  "hover:bg-gray-100": true,
                  "focus:ring-gray-200": true,
                  "dark:bg-gray-800": true,
                  "dark:text-white": true,
                  "dark:border-gray-600": true,
                  "dark:hover:bg-gray-700": true,
                  "dark:hover:border-gray-600": true,
                  "dark:focus:ring-gray-700": true,
                  "p-1": true,
                  "cursor-not-allowed": canZoomReset() === false,
                  "opacity-50": canZoomReset() === false,
                }}
                disabled={canZoomReset() === false}
                onClick={() => {
                  CanZoomResetStore.set(false);
                }}
              >
                <TbZoomReset size={24} />
              </button>
            </div>
            <div class="relative ml-auto mr-2">
              <label class="relative inline-flex h-full items-center cursor-pointer">
                <input
                  type="checkbox"
                  class="sr-only peer"
                  checked={showServices() === true}
                  onChange={(e) => {
                    ShowServicesSidebarStore.set(e.currentTarget.checked);
                  }}
                />
                <div class="mr-3 w-11 h-6 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-2 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 bg-gray-200 dark:bg-gray-700 peer-checked:bg-blue-600"></div>
                <TbChartCircles size={24} />
                <span class="text-sm font-medium text-gray-900 dark:text-gray-300 hidden md:block">
                  Services details
                </span>
              </label>
            </div>
            <div class="relative ml-auto mr-2">
              <label class="relative inline-flex h-full items-center cursor-pointer">
                <input
                  type="checkbox"
                  class="sr-only peer"
                  checked={showModules() === true}
                  onChange={(e) => {
                    ShowModulesStore.set(e.currentTarget.checked);
                  }}
                />
                <div class="mr-3 w-11 h-6 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-2 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 bg-gray-200 dark:bg-gray-700 peer-checked:bg-blue-600"></div>
                <TbSquaresDiagonal size={24} />
                <span class="text-sm font-medium text-gray-900 dark:text-gray-300 hidden md:block">
                  Show modules
                </span>
              </label>
            </div>
            <div class="relative ml-auto mr-2">
              <label class="relative inline-flex h-full items-center cursor-pointer">
                <input
                  type="checkbox"
                  class="sr-only peer"
                  checked={graphMode() === "true"}
                  onChange={(e) => {
                    ForcedGraphMode.set(`${e.currentTarget.checked}`);
                  }}
                />
                <div class="mr-3 w-11 h-6 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-2 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 bg-gray-200 dark:bg-gray-700 peer-checked:bg-blue-600"></div>
                <HiSolidCubeTransparent size={24} />
                <span class="text-sm font-medium text-gray-900 dark:text-gray-300 hidden md:block">
                  3D toggle
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full mx-auto">
        <ThreeWayComparison />
      </div>
    </>
  );
};
export default Wrapper;
